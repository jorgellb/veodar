import { iso, lineOnTop } from '../iso-kit.mjs';
import { tr, ease, helpers, polar, span, type Factory, type Proj } from './runtime';

const CYCLE = 10.4;
const SAVES = [3.0, 4.2, 5.4];
const OPEN: [number, number] = [1.2, 6.2];
const SYNC: [number, number] = [6.9, 8.7];

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const cad = h.q<SVGPathElement>('[data-part="cad"]');
  const bore = h.q('[data-part="bore"]');
  const dim = h.q('[data-part="dim"]');
  const status = h.q<SVGTextElement>('[data-part="status"]');
  const statusDot = h.q('[data-part="status-dot"]');
  const platter = h.q('[data-part="platter"]');
  const arm = h.q('[data-part="arm"]');
  const diskLamp = h.q('[data-part="disk"]');
  const netLamp = h.q('[data-part="net"]');
  const blades = [...h.q('[data-part="blade"]').children] as SVGGElement[];
  const beads = h.qa('[data-bead]');
  const D = M.disk;
  let shown = 0;

  // CAD outline revealed by length.
  const pts = M.cad as number[][];
  const acc = [0];
  for (let i = 1; i < pts.length; i++) acc.push(acc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const total = acc[acc.length - 1];
  const outline = (f: number) => {
    const s = f * total;
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      if (acc[i] <= s) d += `L${pts[i][0]} ${pts[i][1]}`;
      else {
        const t = (s - acc[i - 1]) / (acc[i] - acc[i - 1]);
        if (t > 0) d += `L${(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t).toFixed(2)} ${(pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t).toFixed(2)}`;
        break;
      }
    }
    return d;
  };

  // Cable route by length, for the sync beads.
  const route = M.route as number[][];
  const racc = [0];
  for (let i = 1; i < route.length; i++) racc.push(racc[i - 1] + Math.hypot(route[i][0] - route[i - 1][0], route[i][1] - route[i - 1][1]));
  const onRoute = (f: number) => {
    const s = Math.max(0, Math.min(1, f)) * racc[racc.length - 1];
    let i = 1;
    while (i < racc.length - 1 && racc[i] < s) i++;
    const t = (s - racc[i - 1]) / (racc[i] - racc[i - 1] || 1);
    return [route[i - 1][0] + (route[i][0] - route[i - 1][0]) * t, route[i - 1][1] + (route[i][1] - route[i - 1][1]) * t];
  };

  const text = (el: Element, value: string) => {
    if (el.textContent !== value) el.textContent = value;
  };

  const apply = (t: number) => {
    const u = t % CYCLE;
    const fade = 1 - span(u, CYCLE - 0.5, CYCLE - 0.1);
    // Network switch.
    const open = ease(span(u, OPEN[0], OPEN[0] + 0.5)) * (1 - ease(span(u, OPEN[1], OPEN[1] + 0.5)));
    const level = Math.round(open * (M.levels - 1));
    if (level !== shown) {
      blades[shown].style.display = 'none';
      blades[level].style.display = '';
      shown = level;
    }
    const online = open < 0.05;
    h.on(netLamp, online);

    // The user keeps drawing whatever the network does.
    const drawn = ease(span(u, 2.0, 5.6));
    cad.setAttribute('d', outline(drawn));
    cad.setAttribute('opacity', fade.toFixed(2));
    bore.setAttribute('opacity', (ease(span(u, 4.4, 4.9)) * fade).toFixed(2));
    dim.setAttribute('opacity', (ease(span(u, 5.5, 5.9)) * fade).toFixed(2));

    // Disk: the platter always turns; a save swings the arm and blinks the lamp.
    const saving = SAVES.some((s) => u >= s && u < s + 0.45);
    const ang = t * 2.6;
    let marks = '';
    for (let j = 0; j < 3; j++) marks += lineOnTop(polar(D.x, D.y, 7.4, ang + (j * Math.PI * 2) / 3), polar(D.x, D.y, D.r - 3.4, ang + (j * Math.PI * 2) / 3), D.z, P);
    platter.innerHTML = `<path class="iso-line" data-tone="lo" d="${marks}"/>`;
    const sweep = 10.5 + Math.sin(t * 1.1) * 2.2 + (saving ? -3 : 0);
    const a0 = Math.atan2(D.pivot[0] - D.x, -(D.pivot[1] - D.y));
    const head = polar(D.x, D.y, sweep, a0 - 0.5);
    const [hx, hy] = iso([head[0], head[1], D.z + 1.2], P);
    arm.innerHTML = `<path class="iso-line" data-tone="hi" style="stroke-width:2px" d="${lineOnTop(D.pivot, head, D.z + 1.2, P)}"/><circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="1.5" fill="var(--anatomy-paper)" stroke="var(--anatomy-hi)" stroke-width=".8"/>`;
    h.on(diskLamp, saving);

    // Sync: three changes leave the disk one after another.
    const saved = SAVES.filter((s) => u >= s).length;
    let uploaded = 0;
    beads.forEach((bead, i) => {
      const start = SYNC[0] + i * 0.42;
      const f = span(u, start, start + 0.9);
      if (f >= 1) uploaded += 1;
      if (f <= 0 || f >= 1) return bead.setAttribute('opacity', '0');
      const [x, y] = onRoute(ease(f));
      bead.setAttribute('opacity', '1');
      bead.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
    });

    let line: string;
    let say: string;
    if (u < OPEN[0]) {
      line = tr('Al día', 'Up to date');
      say = tr('Con red · todo sincronizado', 'Online · everything synced');
    } else if (u < OPEN[1] + 0.5) {
      line = saved ? tr(`Local · ${saved} ${saved === 1 ? 'cambio' : 'cambios'}`, `Local · ${saved} ${saved === 1 ? 'change' : 'changes'}`) : tr('Sin red · sigue en local', 'Offline · still local');
      say = saved
        ? tr(`Sin red · ${saved} ${saved === 1 ? 'cambio guardado' : 'cambios guardados'} en el disco`, `Offline · ${saved} ${saved === 1 ? 'change' : 'changes'} saved to disk`)
        : tr('Se cae la red · la aplicación sigue abierta', 'The network drops · the app stays open');
    } else if (uploaded < 3) {
      line = tr(`Sincronizando ${uploaded}/3`, `Syncing ${uploaded}/3`);
      say = tr(`Vuelve la red · subiendo ${uploaded} de 3`, `Network back · uploading ${uploaded} of 3`);
    } else {
      line = tr('Al día · 3 subidos', 'Up to date · 3 uploaded');
      say = tr('Sincronizado · nada se perdió en el corte', 'Synced · nothing lost in the outage');
    }
    text(status, line);
    statusDot.setAttribute('fill-opacity', online ? '1' : '0.35');
    h.say(say);
  };
  return { apply, still: 4.6 };
};

export default create;
