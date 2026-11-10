// Fibre network behind the whole page: a jittered mesh of nodes, a trunk of
// fibre that threads every [data-node] card from top to bottom, and packets of
// data that run the trunk and hop across the mesh. Geometry lives in document
// coordinates; one fixed canvas draws the visible slice each frame.

type Pt = { x: number; y: number };
type Node = Pt & { hub: boolean; flash: number; layer: 0 | 1 };
type Edge = { a: number; b: number; layer: 0 | 1 };
type Path = { pts: Pt[]; acc: number[]; len: number; width: number };
type Packet = { path: number; s: number; speed: number; life: number; trail: number };
type Hopper = { from: number; to: number; s: number; len: number; speed: number; hops: number };
type Rect = { x: number; y: number; w: number; h: number };

const ACCENT = '255, 90, 31';
const INK = '22, 20, 44';
const CREAM = '244, 240, 230';

export function startNetwork(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d', { alpha: true })!;
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  let dpr = 1;
  let vw = 0;
  let vh = 0;
  let docH = 0;
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let adj: number[][] = [];
  let rows: Map<number, number[]> = new Map();
  let paths: Path[] = [];
  let ports: { p: Pt; dark: boolean }[] = [];
  let packets: Packet[] = [];
  let hoppers: Hopper[] = [];
  let darks: Rect[] = [];
  let hubFrom = 0;
  let hubTo = 0;
  const ROW = 160;
  let pointer: Pt | null = null;
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

  function sample(p0: Pt, c0: Pt, c1: Pt, p1: Pt, step = 8): Pt[] {
    const approx = Math.hypot(p1.x - p0.x, p1.y - p0.y) + 1;
    const n = Math.max(4, Math.ceil(approx / step));
    const out: Pt[] = [];
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const u = 1 - t;
      out.push({
        x: u * u * u * p0.x + 3 * u * u * t * c0.x + 3 * u * t * t * c1.x + t * t * t * p1.x,
        y: u * u * u * p0.y + 3 * u * u * t * c0.y + 3 * u * t * t * c1.y + t * t * t * p1.y,
      });
    }
    return out;
  }
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
    vw = innerWidth;
    vh = innerHeight;
    dpr = Math.min(1.5, devicePixelRatio || 1);
    canvas.width = Math.round(vw * dpr);
    canvas.height = Math.round(vh * dpr);
    docH = document.documentElement.scrollHeight;
    darks = [...document.querySelectorAll('[data-dark]')].map(docRect);
    const anchors = [...document.querySelectorAll('main [data-node], footer [data-node]')]
      .map(docRect)
      .filter((r) => r.w > 40 && r.h > 40)
      .sort((a, b) => a.y - b.y || a.x - b.x);

    // Mesh: a jittered grid, denser inside dark sections, empty under cards.
    nodes = [];
    edges = [];
    const grids: { cell: number; area: Rect; layer: 0 | 1 }[] = [{ cell: vw < 700 ? 96 : 128, area: { x: 0, y: 0, w: vw, h: docH }, layer: 1 }];
    grids.push({ cell: vw < 700 ? 150 : 190, area: { x: 0, y: 0, w: vw, h: docH }, layer: 0 });
    for (const d of darks) grids.push({ cell: vw < 700 ? 70 : 84, area: d, layer: 1 });
    for (const { cell, area, layer } of grids) {
      const cols = Math.ceil(area.w / cell) + 1;
      const rowsN = Math.ceil(area.h / cell) + 1;
      const index: number[][] = [];
      for (let gy = 0; gy < rowsN; gy++) {
        index.push([]);
        for (let gx = 0; gx < cols; gx++) {
          const p = {
            x: area.x + (gx + 0.5 + (rand() - 0.5) * 0.7) * cell,
            y: area.y + (gy + 0.5 + (rand() - 0.5) * 0.7) * cell,
          };
          const skip = rand() < 0.16 || (layer === 1 && anchors.some((r) => inside(p, r, 14))) || (cell < 100 && !inside(p, area));
          if (skip) {
            index[gy].push(-1);
            continue;
          }
          index[gy].push(nodes.length);
          nodes.push({ ...p, hub: rand() < 0.07, flash: 0, layer });
        }
      }
      const link = (a: number, b: number) => {
        if (a < 0 || b < 0) return;
        if (Math.hypot(nodes[a].x - nodes[b].x, nodes[a].y - nodes[b].y) > cell * 1.75) return;
        edges.push({ a, b, layer });
      };
      for (let gy = 0; gy < rowsN; gy++)
        for (let gx = 0; gx < cols; gx++) {
          const i = index[gy][gx];
          if (i < 0) continue;
          if (gx + 1 < cols && rand() < 0.62) link(i, index[gy][gx + 1]);
          if (gy + 1 < rowsN && rand() < 0.62) link(i, index[gy + 1][gx]);
          if (gy + 1 < rowsN && gx + 1 < cols && rand() < 0.22) link(i, index[gy + 1][gx + 1]);
          if (gy + 1 < rowsN && gx > 0 && rand() < 0.16) link(i, index[gy + 1][gx - 1]);
        }
    }

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

    // Hubs: labelled systems in the hero, each on its own fibre into the machine.
    hubFrom = paths.length;
    const target = document.querySelector('[data-hub-target]');
    if (target) {
      const t = docRect(target);
      const hubs = [...document.querySelectorAll<HTMLElement>('[data-hub]')].filter((el) => el.offsetParent !== null);
      const side = (dir: string) =>
        hubs
          .filter((el) => el.dataset.hub === dir)
          .map((el) => ({ r: docRect(el), dir }))
          .sort((a, b) => a.r.x + a.r.w / 2 - (b.r.x + b.r.w / 2));
      // The outermost hub takes the outermost port and the lowest tray, so no two fibres cross.
      const plug = (list: { r: Rect; dir: string }[], from: number, to: number) =>
        list.forEach(({ r, dir }, i) => {
          const share = list.length > 1 ? i / (list.length - 1) : 0.5;
          const rank = dir === 'out' ? list.length - 1 - i : i;
          const port = { x: t.x + t.w * (from + (to - from) * share), y: t.y - 6 };
          const start = { x: r.x + r.w / 2, y: r.y + r.h + 3 };
          const pts = routed(start, port.y - 22 - rank * 13, port);
          paths.push(makePath(dir === 'out' ? pts.reverse() : pts, 1.2));
          ports.push({ p: port, dark: isDark(port) });
        });
      plug(side('in'), 0.2, 0.44);
      plug(side('out'), 0.56, 0.8);
    }
    hubTo = paths.length;

    // Feeders: every port plugs into the nearest mesh node.
    for (const { p } of ports) {
      let best = -1;
      let bd = 240;
      nodes.forEach((n, i) => {
        if (n.layer !== 1) return;
        const d = Math.hypot(n.x - p.x, n.y - p.y);
        if (d < bd && Math.abs(n.y - p.y) < 180) {
          bd = d;
          best = i;
        }
      });
      if (best >= 0) {
        const n = nodes[best];
        paths.push(makePath(sample(p, { x: p.x, y: p.y + (n.y > p.y ? 30 : -30) }, { x: n.x, y: n.y }, n, 6), 0.8));
      }
    }

    adj = nodes.map(() => []);
    edges.forEach((e, i) => {
      adj[e.a].push(i);
      adj[e.b].push(i);
    });
    rows = new Map();
    edges.forEach((e, i) => {
      const y0 = Math.min(nodes[e.a].y, nodes[e.b].y);
      const y1 = Math.max(nodes[e.a].y, nodes[e.b].y);
      for (let r = Math.floor(y0 / ROW); r <= Math.floor(y1 / ROW); r++) {
        if (!rows.has(r)) rows.set(r, []);
        rows.get(r)!.push(i);
      }
    });

    // Trunk packets spaced along each fibre of the bundle.
    packets = [];
    paths.forEach((path, i) => {
      const hub = i >= hubFrom && i < hubTo;
      const gap = i === 0 ? 300 : hub ? 210 : i < 3 ? 420 : 520;
      for (let s = rand() * gap; s < path.len; s += gap * (0.7 + rand() * 0.6)) {
        packets.push({ path: i, s, speed: i === 0 ? 170 : hub ? 130 + rand() * 50 : i < 3 ? 120 + rand() * 60 : 70 + rand() * 40, life: 1, trail: i === 0 ? 46 : hub ? 40 : 28 });
      }
    });
    hoppers = [];
  }

  function spawnHopper(sy: number) {
    const lo = Math.floor((sy - 100) / ROW);
    const hi = Math.floor((sy + vh + 100) / ROW);
    const r = lo + Math.floor(rand() * (hi - lo + 1));
    const list = rows.get(r);
    if (!list?.length) return;
    const e = edges[list[Math.floor(rand() * list.length)]];
    if (e.layer !== 1) return;
    const [from, to] = rand() < 0.5 ? [e.a, e.b] : [e.b, e.a];
    hoppers.push({ from, to, s: 0, len: Math.hypot(nodes[to].x - nodes[from].x, nodes[to].y - nodes[from].y), speed: 90 + rand() * 90, hops: 3 + Math.floor(rand() * 5) });
  }

  function draw(dt: number) {
    const sy = scrollY;
    const far = 0.55;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, vw, vh);
    const visibleDarks = darks.filter((d) => d.y < sy + vh && d.y + d.h > sy);

    const pass = (dark: boolean) => {
      const line = dark ? CREAM : INK;
      const k = dark ? 1.25 : 1;
      // Far layer (parallax), then near mesh.
      for (const layer of [0, 1] as const) {
        const off = layer === 0 ? sy * far : sy;
        const top = layer === 0 ? sy * far - 40 : sy - 40;
        const lo = Math.floor(top / ROW);
        const hi = Math.floor((top + vh + 80) / ROW);
        const seen = new Set<number>();
        ctx.beginPath();
        for (let r = lo; r <= hi; r++)
          for (const i of rows.get(r) ?? []) {
            if (seen.has(i)) continue;
            seen.add(i);
            const e = edges[i];
            if (e.layer !== layer) continue;
            const a = nodes[e.a];
            const b = nodes[e.b];
            ctx.moveTo(a.x, a.y - off);
            ctx.lineTo(b.x, b.y - off);
          }
        ctx.strokeStyle = `rgba(${line}, ${(layer === 0 ? 0.035 : 0.07) * k})`;
        ctx.lineWidth = layer === 0 ? 0.6 : 0.8;
        ctx.stroke();
      }
      // Nodes of the near layer within view.
      for (const n of nodes) {
        const y = n.y - (n.layer === 0 ? sy * far : sy);
        if (y < -10 || y > vh + 10) continue;
        const near = n.layer === 1;
        let boost = n.flash;
        if (pointer && near) {
          const d = Math.hypot(n.x - pointer.x, n.y - pointer.y);
          if (d < 170) {
            boost = Math.max(boost, 1 - d / 170);
            ctx.beginPath();
            ctx.moveTo(n.x, y);
            ctx.lineTo(pointer.x, pointer.y - sy);
            ctx.strokeStyle = `rgba(${ACCENT}, ${(1 - d / 170) * 0.35})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
        const r = (near ? (n.hub ? 2.4 : 1.5) : 1) + boost * 1.6;
        ctx.beginPath();
        ctx.arc(n.x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = boost > 0.05 ? `rgba(${ACCENT}, ${0.35 + boost * 0.6})` : `rgba(${line}, ${(near ? (n.hub ? 0.32 : 0.2) : 0.1) * k})`;
        ctx.fill();
        if (near && n.hub) {
          ctx.beginPath();
          ctx.arc(n.x, y, 5.5 + boost * 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${line}, ${0.12 * k})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
      // Trunk, branches and feeders.
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
        grad.addColorStop(0, `rgba(${ACCENT}, 0.85)`);
        grad.addColorStop(1, `rgba(${ACCENT}, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = pk.path === 0 ? 2 : 1.4;
        ctx.stroke();
        glow(head.x, y, pk.path === 0 ? 22 : 15);
        ctx.beginPath();
        ctx.arc(head.x, y, pk.path === 0 ? 1.8 : 1.3, 0, Math.PI * 2);
        ctx.fillStyle = dark ? '#fff4ec' : `rgb(${ACCENT})`;
        ctx.fill();
      }
      for (const hp of hoppers) {
        const a = nodes[hp.from];
        const b = nodes[hp.to];
        const t = hp.s / hp.len;
        const x = a.x + (b.x - a.x) * t;
        const y = a.y + (b.y - a.y) * t - sy;
        const t0 = Math.max(0, t - 26 / hp.len);
        const tx = a.x + (b.x - a.x) * t0;
        const ty = a.y + (b.y - a.y) * t0 - sy;
        // Quieter on paper, where they cross body text; full glow on the dark bands.
        const grad = ctx.createLinearGradient(x, y, tx, ty);
        grad.addColorStop(0, `rgba(${ACCENT}, ${dark ? 0.8 : 0.42})`);
        grad.addColorStop(1, `rgba(${ACCENT}, 0)`);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = dark ? 1.2 : 1;
        ctx.stroke();
        if (dark) glow(x, y, 14);
        ctx.beginPath();
        ctx.arc(x, y, dark ? 1.2 : 1, 0, Math.PI * 2);
        ctx.fillStyle = dark ? '#fff4ec' : `rgba(${ACCENT}, 0.7)`;
        ctx.fill();
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
    for (const pk of packets) {
      pk.s += pk.speed * dt;
      if (pk.s > paths[pk.path].len + pk.trail) pk.s = 0;
    }
    for (const n of nodes) if (n.flash > 0) n.flash = Math.max(0, n.flash - dt * 1.6);
    for (let i = hoppers.length - 1; i >= 0; i--) {
      const hp = hoppers[i];
      hp.s += hp.speed * dt;
      if (hp.s < hp.len) continue;
      nodes[hp.to].flash = 1;
      hp.hops -= 1;
      const options = adj[hp.to].map((e) => edges[e]).filter((e) => e.layer === 1 && (e.a === hp.from || e.b === hp.from) === false);
      if (hp.hops <= 0 || !options.length) {
        hoppers.splice(i, 1);
        continue;
      }
      const e = options[Math.floor(rand() * options.length)];
      const next = e.a === hp.to ? e.b : e.a;
      hp.from = hp.to;
      hp.to = next;
      hp.s = 0;
      hp.len = Math.hypot(nodes[next].x - nodes[hp.from].x, nodes[next].y - nodes[hp.from].y);
    }
    const want = Math.round((vw * vh) / 52000);
    if (hoppers.length < want && rand() < dt * 6) spawnHopper(sy);
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
  new ResizeObserver(() => {
    if (Math.abs(document.documentElement.scrollHeight - docH) > 4) rebuild();
  }).observe(document.body);
  addEventListener('scroll', () => !frame && draw(0), { passive: true });
  document.addEventListener('visibilitychange', run);
  still.addEventListener('change', () => (still.matches ? draw(0) : run()));
  if (fine.matches) {
    addEventListener('pointermove', (e) => (pointer = { x: e.clientX, y: e.clientY + scrollY }), { passive: true });
    document.documentElement.addEventListener('pointerleave', () => (pointer = null));
  }
}
