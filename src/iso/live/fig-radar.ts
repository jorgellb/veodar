import { extrude, iso, lineOnTop, ring, ringOf, solidSvg } from '../iso-kit.mjs';
import { helpers, polar, type Factory, type Proj } from './runtime';

const SWEEP = 3.2; // seconds per turn
const QUERIES = [
  { q: 'automatizar facturas con IA', pos: 7 },
  { q: 'agencia agentes IA España', pos: 5 },
  { q: 'conectar ERP con IA', pos: 3 },
  { q: 'desarrollo app móvil empresa', pos: 2 },
  { q: 'automatizaciones con IA', pos: 1 },
];
// Other sites' echoes: [ring position, bearing].
const ECHOES: [number, number][] = [
  [1.2, 0.6],
  [2.4, 2.1],
  [3.1, 4.4],
  [4.3, 1.4],
  [5.6, 3.2],
  [6.2, 5.6],
  [7.4, 0.2],
  [4.8, 5.1],
  [2.9, 3.7],
];
const BEARING = 2.65;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const sweepEl = h.q('[data-part="sweep"]');
  const blipsEl = h.q('[data-part="blips"]');
  const antenna = h.q('[data-part="antenna"]');
  const found = h.q('[data-part="found"]');
  h.on(h.q('[data-part="power"]'), true);
  const S = M.scope;
  const A = M.mast;
  const rOf = (pos: number) => 3 + pos * 3.3;

  const rot = (plan: { x: number; y: number; w: number; d: number; r: number }, a: number) =>
    ringOf(plan, 2).map(([px, py]: number[]) => {
      const c = Math.cos(a);
      const s = Math.sin(a);
      return [A.x + px * c - py * s, A.y + px * s + py * c];
    });

  const apply = (t: number) => {
    const turn = t / SWEEP;
    const theta = (turn % 1) * Math.PI * 2;
    const sweepIndex = Math.floor(turn);
    const query = QUERIES[sweepIndex % QUERIES.length];
    const prev = QUERIES[(sweepIndex + QUERIES.length - 1) % QUERIES.length];

    // Sweep: a lit line with a fading trail.
    let trail = '';
    const wedge = (a0: number, a1: number) => {
      const pts = [iso([S.x, S.y, S.face + 0.05], P)];
      for (let i = 0; i <= 3; i++) pts.push(iso([...polar(S.x, S.y, S.r - 1.2, a0 + ((a1 - a0) * i) / 3), S.face + 0.05] as [number, number, number], P));
      return 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L') + 'Z';
    };
    for (let j = 0; j < 16; j++) {
      const op = (1 - j / 16) ** 1.6 * 0.5;
      trail += `<path fill="#ff5a1f" opacity="${op.toFixed(3)}" d="${wedge(theta - (j + 1) * 0.06, theta - j * 0.06)}"/>`;
    }
    trail += `<path class="iso-line" data-tone="lit" style="stroke-width:1.6px" d="${lineOnTop([S.x, S.y], polar(S.x, S.y, S.r - 1.2, theta), S.face + 0.05, P)}"/>`;
    sweepEl.innerHTML = trail;

    // Echoes glow when the sweep passes and fade like phosphor.
    const since = (bearing: number) => {
      const d = (theta - bearing + Math.PI * 4) % (Math.PI * 2);
      return (d / (Math.PI * 2)) * SWEEP;
    };
    let dots = '';
    for (const [pos, b] of ECHOES) {
      const glow = Math.exp(-since(b) / 1.1);
      const [x, y] = iso([...polar(S.x, S.y, rOf(pos), b), S.face + 0.1] as [number, number, number], P);
      dots += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.5" fill="#f4f0e6" opacity="${(0.18 + glow * 0.8).toFixed(2)}"/>`;
    }
    // Our echo: the rank of this sweep's query; it moves in as the sweep reaches it.
    const reached = since(BEARING) < (theta / (Math.PI * 2)) * SWEEP + 1e-6;
    const pos = reached ? query.pos : prev.pos;
    const glow = Math.exp(-since(BEARING) / 1.6);
    const ours = polar(S.x, S.y, rOf(pos), BEARING);
    const [ox, oy] = iso([ours[0], ours[1], S.face + 0.1], P);
    dots += `<path class="iso-line" data-tone="lit" opacity="${(0.35 + glow * 0.65).toFixed(2)}" d="${ring(ours[0], ours[1], 2.6, S.face + 0.1, P, 20)}"/>`;
    dots += `<circle class="veo-bead" cx="${ox.toFixed(1)}" cy="${oy.toFixed(1)}" r="${(1.7 + glow * 0.8).toFixed(2)}"/>`;
    blipsEl.innerHTML = dots;
    h.on(found, glow > 0.35);

    // Antenna bar turns with the sweep.
    const a = theta - Math.PI / 2;
    const bar = extrude(rot({ x: -27, y: -2.6, w: 54, d: 5.2, r: 1.2 }, a), A.z, 4.4, P, { bevel: 0.4 });
    const horn = extrude(rot({ x: -5, y: 2.6, w: 10, d: 4.6, r: 1 }, a), A.z + 0.6, 3.2, P, { bevel: 0.3 });
    antenna.innerHTML = solidSvg(horn, { tone: 'mid' }) + solidSvg(bar, { tone: 'hi', crease: 'lo' });

    const deg = Math.round((theta * 180) / Math.PI);
    h.say(`Barrido ${String(deg).padStart(3, '0')}° · “${query.q}” · posición ${pos}`);
  };
  return { apply, still: SWEEP * 4 + 1.3 };
};

export default create;
