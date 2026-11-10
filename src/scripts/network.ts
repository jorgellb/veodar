// Fibre behind the whole page: a trunk that threads every [data-node] card from
// top to bottom, the fibres from the hero chips into its scene, and packets of
// data running along them. (There used to be a mesh of nodes behind it all; it
// was removed to keep the background calm.) Geometry lives in document
// coordinates; one fixed canvas draws the visible slice each frame.

type Pt = { x: number; y: number };
type Path = { pts: Pt[]; acc: number[]; len: number; width: number };
type Packet = { path: number; s: number; speed: number; life: number; trail: number; bright?: boolean };
type Rect = { x: number; y: number; w: number; h: number };

const ACCENT = '255, 90, 31';
const INK = '22, 20, 44';
const CREAM = '244, 240, 230';

export function startNetwork(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d', { alpha: true })!;
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  let dpr = 1;
  let vw = 0;
  let vh = 0;
  let docH = 0;
  let paths: Path[] = [];
  let ports: { p: Pt; dark: boolean }[] = [];
  let packets: Packet[] = [];
  let darks: Rect[] = [];
  let hubFrom = 0;
  let hubTo = 0;
  let sockets: Pt[] = [];
  const hubPath = new Map<string, number>();
  let frame = 0;
  let last = 0;

  // Glow sprite for packets.
  const sprite = document.createElement('canvas');
  sprite.width = sprite.height = 64;
  {
    const g = sprite.getContext('2d')!;
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, `rgba(${ACCENT}, 0.9)`);
    grad.addColorStop(0.25, `rgba(${ACCENT}, 0.35)`);
    grad.addColorStop(1, `rgba(${ACCENT}, 0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
  }

  // Deterministic random so the network doesn't reshuffle on every resize.
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  // Layout box in document coordinates; offsets ignore entrance transforms.
  const docRect = (el: Element): Rect => {
    const node = el as HTMLElement;
    let x = 0;
    let y = 0;
    for (let cur: HTMLElement | null = node; cur; cur = cur.offsetParent as HTMLElement | null) {
      x += cur.offsetLeft;
      y += cur.offsetTop;
    }
    return { x, y, w: node.offsetWidth, h: node.offsetHeight };
  };
  const inside = (p: Pt, r: Rect, pad = 0) => p.x > r.x - pad && p.x < r.x + r.w + pad && p.y > r.y - pad && p.y < r.y + r.h + pad;

  // No gap longer than `step`, so a long straight run still draws when its ends are off screen.
  const densify = (pts: Pt[], step = 22): Pt[] => {
    const out: Pt[] = [pts[0]];
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1];
      const b = pts[i];
      const n = Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / step);
      for (let j = 1; j <= n; j++) out.push({ x: a.x + ((b.x - a.x) * j) / n, y: a.y + ((b.y - a.y) * j) / n });
    }
    return out;
  };
  // Fibre laid like in a cable tray: down, across at `level`, down into the port.
  const elbow = (a: Pt, corner: Pt, b: Pt, r: number): Pt[] => {
    const d1 = Math.hypot(corner.x - a.x, corner.y - a.y) || 1;
    const d2 = Math.hypot(b.x - corner.x, b.y - corner.y) || 1;
    const rr = Math.min(r, d1 / 2, d2 / 2);
    const p0 = { x: corner.x + ((a.x - corner.x) / d1) * rr, y: corner.y + ((a.y - corner.y) / d1) * rr };
    const p1 = { x: corner.x + ((b.x - corner.x) / d2) * rr, y: corner.y + ((b.y - corner.y) / d2) * rr };
    const out: Pt[] = [];
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      const u = 1 - t;
      out.push({ x: u * u * p0.x + 2 * u * t * corner.x + t * t * p1.x, y: u * u * p0.y + 2 * u * t * corner.y + t * t * p1.y });
    }
    return out;
  };
  const routed = (start: Pt, level: number, port: Pt, r = 30): Pt[] => {
    const c1 = { x: start.x, y: level };
    const c2 = { x: port.x, y: level };
    return [start, ...elbow(start, c1, c2, r), ...elbow(c1, c2, port, r), port];
  };
  const makePath = (raw: Pt[], width: number): Path => {
    const pts = densify(raw);
    const acc = [0];
    for (let i = 1; i < pts.length; i++) acc.push(acc[i - 1] + Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y));
    return { pts, acc, len: acc[acc.length - 1], width };
  };
  const at = (path: Path, s: number): Pt => {
    const { pts, acc } = path;
    let lo = 0;
    let hi = acc.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (acc[mid] < s) lo = mid;
      else hi = mid;
    }
    const t = (s - acc[lo]) / (acc[hi] - acc[lo] || 1);
    return { x: pts[lo].x + (pts[hi].x - pts[lo].x) * t, y: pts[lo].y + (pts[hi].y - pts[lo].y) * t };
  };

  function build() {
    seed = 7;
    // The canvas covers the viewport minus any classic scrollbar, so size it from
    // clientWidth: innerWidth includes the scrollbar, and the browser would squeeze
    // the drawing by that much (fibres drifting left toward the right edge).
    vw = document.documentElement.clientWidth;
    vh = document.documentElement.clientHeight;
    dpr = Math.min(1.5, devicePixelRatio || 1);
    canvas.width = Math.round(vw * dpr);
    canvas.height = Math.round(vh * dpr);
    docH = document.documentElement.scrollHeight;
    darks = [...document.querySelectorAll('[data-dark]')].map(docRect);
    const anchors = [...document.querySelectorAll('main [data-node], footer [data-node]')]
      .map(docRect)
      .filter((r) => r.w > 40 && r.h > 40)
      .sort((a, b) => a.y - b.y || a.x - b.x);

    // Spine: one trunk straight down the free channel of each section (the gap
    // between its columns, or the page gutter on narrow screens), with
    // right-angled drops into every card. It never runs behind a headline.
    paths = [];
    ports = [];
    const isDark = (p: Pt) => darks.some((d) => inside(p, d));
    const desktop = vw >= 1024;
    const pad = vw >= 768 ? 40 : 20;
    const box0 = Math.max(pad, (vw - 1320) / 2 + pad);
    const box1 = vw - box0;
    const sections = [...document.querySelectorAll<HTMLElement>('[data-spine]')]
      .map((el) => ({ y: docRect(el).y, f: Number(el.dataset.spine) }))
      .sort((m, n) => m.y - n.y);
    const spineAt = (y: number) => {
      if (!desktop) return box0 / 2;
      let f = 0.5;
      for (const sec of sections) if (y >= sec.y) f = sec.f;
      return box0 + (box1 - box0) * f;
    };
    const rowsOf: Rect[][] = [];
    for (const r of anchors) {
      const row = rowsOf.find((g) => g.some((o) => r.y < o.y + o.h * 0.6 && o.y < r.y + r.h * 0.6));
      if (row) row.push(r);
      else rowsOf.push([r]);
    }
    type Stop = { y: number; x: number; row?: Rect[] };
    const stops: Stop[] = [
      ...sections.map((sec) => ({ y: sec.y + 44, x: spineAt(sec.y) })),
      ...rowsOf.map((row) => {
        const y = Math.min(...row.map((r) => r.y));
        return { y, x: spineAt(y), row };
      }),
    ].sort((m, n) => m.y - n.y);

    const trunk: Pt[] = [];
    let cur: Pt | null = null;
    const startEl = document.querySelector<HTMLElement>('[data-trunk-start]');
    if (startEl) {
      const r = docRect(startEl);
      cur = { x: r.x + r.w * Number(startEl.dataset.trunkStart || 0.5), y: r.y + r.h };
      trunk.push(cur);
    }
    const jog = (x: number, y: number) => {
      if (!cur || Math.abs(cur.x - x) < 2 || y < cur.y + 20) return;
      const c1 = { x: cur.x, y };
      const c2 = { x, y };
      const end = { x, y: y + 34 };
      trunk.push(...elbow(cur, c1, c2, 26), ...elbow(c1, c2, end, 26), end);
      cur = end;
    };
    for (const stop of stops) {
      if (!stop.row) {
        jog(stop.x, stop.y);
        continue;
      }
      const top = stop.y;
      const sx = stop.x;
      const on = stop.row.find((r) => r.x + 12 < sx && sx < r.x + r.w - 12);
      if (!cur) {
        cur = { x: sx, y: on ? on.y + 8 : 84 };
        trunk.push(cur);
      } else jog(sx, Math.max(cur.y + 22, top - 96));
      const from: Pt = cur!;
      for (const r of stop.row) {
        if (r === on) continue;
        const lead = Math.max(8, Math.min(24, (r.y - from.y) * 0.5));
        const port = { x: r.x + r.w / 2, y: r.y - 6 };
        const level = r.y - lead;
        paths.push(makePath(routed({ x: from.x, y: level - 14 }, level, port, 14), 1));
        ports.push({ p: port, dark: isDark(port) });
      }
      if (on) {
        const inPort = { x: from.x, y: on.y - 6 };
        if (from.y < on.y - 8) ports.push({ p: inPort, dark: isDark(inPort) });
        cur = { x: from.x, y: on.y + on.h + 6 };
        ports.push({ p: cur, dark: isDark(cur) });
      } else cur = { x: from.x, y: Math.max(...stop.row.map((r) => r.y + r.h)) };
      trunk.push(cur);
    }
    if (!cur) {
      cur = { x: spineAt(0), y: 84 };
      trunk.push(cur);
    }
    trunk.push({ x: cur.x, y: docH + 40 });
    paths.unshift(makePath(trunk, 2));
    // Two side fibres of the bundle.
    for (const off of [-4, 4]) paths.splice(1, 0, makePath(trunk.map((q) => ({ x: q.x + off, y: q.y })), 1));

    // Hubs: every labelled chip in the hero drops a fibre into its own socket on the scene's piers.
    // The sockets stand in the same order as the chips, edge of the window inward, so no two fibres cross.
    hubFrom = paths.length;
    hubPath.clear();
    sockets = [];
    const target = document.querySelector<HTMLElement>('[data-hub-target]');
    if (target?.dataset.ports) {
      const t = docRect(target);
      const portOf = JSON.parse(target.dataset.ports) as Record<string, [number, number]>;
      for (const el of document.querySelectorAll<HTMLElement>('[data-hub]')) {
        const id = el.dataset.id;
        if (el.offsetParent === null || !id || !portOf[id]) continue;
        const r = docRect(el);
        const port = { x: t.x + t.w * portOf[id][0], y: t.y + t.h * portOf[id][1] };
        const start = { x: r.x + r.w / 2, y: r.y + r.h + 3 };
        const pts = routed(start, port.y - 26, port, 22);
        hubPath.set(id, paths.length);
        paths.push(makePath(el.dataset.hub === 'out' ? pts.reverse() : pts, 1.2));
        sockets.push(port);
      }
    }
    hubTo = paths.length;

    // Trunk packets spaced along each fibre of the bundle.
    packets = [];
    paths.forEach((path, i) => {
      const hub = i >= hubFrom && i < hubTo;
      const gap = i === 0 ? 300 : hub ? 210 : i < 3 ? 420 : 520;
      for (let s = rand() * gap; s < path.len; s += gap * (0.7 + rand() * 0.6)) {
        packets.push({ path: i, s, speed: i === 0 ? 170 : hub ? 130 + rand() * 50 : i < 3 ? 120 + rand() * 60 : 70 + rand() * 40, life: 1, trail: i === 0 ? 46 : hub ? 40 : 28 });
      }
    });
  }

  function draw(dt: number) {
    const sy = scrollY;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, vw, vh);
    const visibleDarks = darks.filter((d) => d.y < sy + vh && d.y + d.h > sy);

    const pass = (dark: boolean) => {
      const line = dark ? CREAM : INK;
      const k = dark ? 1.25 : 1;
      // Trunk, branches and the hero fibres.
      paths.forEach((path, i) => {
        const first = path.pts[0];
        const lastP = path.pts[path.pts.length - 1];
        if (Math.max(first.y, lastP.y) < sy - 60 || Math.min(first.y, lastP.y) > sy + vh + 60) return;
        ctx.beginPath();
        let drawing = false;
        for (const p of path.pts) {
          const y = p.y - sy;
          if (y < -60 || y > vh + 60) {
            drawing = false;
            continue;
          }
          if (!drawing) ctx.moveTo(p.x, y);
          else ctx.lineTo(p.x, y);
          drawing = true;
        }
        const hub = i >= hubFrom && i < hubTo;
        ctx.strokeStyle = `rgba(${line}, ${(i === 0 ? 0.18 : hub ? 0.26 : i < 3 ? 0.1 : 0.14) * k})`;
        ctx.lineWidth = path.width;
        ctx.stroke();
      });
      // Connectors where fibre meets a card.
      for (const { p } of ports) {
        const y = p.y - sy;
        if (y < -10 || y > vh + 10) continue;
        ctx.beginPath();
        ctx.roundRect(p.x - 7, y - 3.5, 14, 7, 3.5);
        ctx.fillStyle = dark ? 'rgb(18,16,38)' : 'rgb(251,248,241)';
        ctx.fill();
        ctx.strokeStyle = `rgba(${line}, ${0.4 * k})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(p.x, y, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT}, 0.9)`;
        ctx.fill();
      }
      // Packets.
      const glow = (x: number, y: number, size: number) => ctx.drawImage(sprite, x - size / 2, y - size / 2, size, size);
      for (const pk of packets) {
        const path = paths[pk.path];
        const head = at(path, pk.s);
        const y = head.y - sy;
        if (y < -40 || y > vh + 40) continue;
        ctx.beginPath();
        const steps = 6;
        for (let j = 0; j <= steps; j++) {
          const p = at(path, Math.max(0, pk.s - (pk.trail * j) / steps));
          if (j) ctx.lineTo(p.x, p.y - sy);
          else ctx.moveTo(p.x, p.y - sy);
        }
        const tail = at(path, Math.max(0, pk.s - pk.trail));
        const grad = ctx.createLinearGradient(head.x, y, tail.x, tail.y - sy);
        grad.addColorStop(0, `rgba(${ACCENT}, ${pk.bright ? 1 : 0.85})`);
        grad.addColorStop(1, `rgba(${ACCENT}, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = pk.bright ? 2.8 : pk.path === 0 ? 2 : 1.4;
        ctx.stroke();
        glow(head.x, y, pk.bright ? 40 : pk.path === 0 ? 22 : 15);
        ctx.beginPath();
        ctx.arc(head.x, y, pk.bright ? 2.8 : pk.path === 0 ? 1.8 : 1.3, 0, Math.PI * 2);
        ctx.fillStyle = dark ? '#fff4ec' : `rgb(${ACCENT})`;
        ctx.fill();
      }
      // Sockets on the hero scene: a small ember where each fibre lands.
      for (const p of sockets) {
        const y = p.y - sy;
        if (y > -20 && y < vh + 20) glow(p.x, y, 16);
      }
    };

    if (!visibleDarks.length) pass(false);
    else {
      ctx.save();
      ctx.beginPath();
      for (const d of visibleDarks) ctx.rect(d.x, d.y - sy, d.w, d.h);
      ctx.clip();
      pass(true);
      ctx.restore();
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, vw, vh);
      for (const d of visibleDarks) ctx.rect(d.x, d.y - sy, d.w, d.h);
      ctx.clip('evenodd');
      pass(false);
      ctx.restore();
    }

    if (dt <= 0) return;
    // Advance.
    for (let i = packets.length - 1; i >= 0; i--) {
      const pk = packets[i];
      pk.s += pk.speed * dt;
      if (pk.s <= paths[pk.path].len + pk.trail) continue;
      if (pk.bright) packets.splice(i, 1);
      else pk.s = 0;
    }
  }

  const loop = (now: number) => {
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0.016;
    last = now;
    draw(dt);
    frame = document.visibilityState === 'visible' && !still.matches ? requestAnimationFrame(loop) : 0;
  };
  const run = () => {
    if (frame || still.matches || document.visibilityState !== 'visible') return;
    last = 0;
    frame = requestAnimationFrame(loop);
  };

  let pending = 0;
  const rebuild = () => {
    clearTimeout(pending);
    pending = window.setTimeout(() => {
      build();
      if (!frame) draw(0);
    }, 160);
  };

  build();
  draw(0);
  run();
  addEventListener('resize', rebuild);
  // The hero scene asks for one bright packet along a chip's fibre, timed to its own story.
  document.addEventListener('nexus:pulse', (event) => {
    const { id, dur } = (event as CustomEvent<{ id: string; dur: number }>).detail;
    const index = hubPath.get(id);
    if (index === undefined || still.matches) return;
    packets.push({ path: index, s: 0, speed: paths[index].len / dur, life: 1, trail: 110, bright: true });
  });
  // Content growing changes the height; a scrollbar appearing changes the width
  // without any window resize event.
  new ResizeObserver(() => {
    const root = document.documentElement;
    if (Math.abs(root.scrollHeight - docH) > 4 || root.clientWidth !== vw) rebuild();
  }).observe(document.body);
  addEventListener('scroll', () => !frame && draw(0), { passive: true });
  document.addEventListener('visibilitychange', run);
  still.addEventListener('change', () => (still.matches ? draw(0) : run()));
}
