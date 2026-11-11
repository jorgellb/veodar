// Axum: four requests come down the tower. The first passes access, limit and shape,
// and the router sends it to its handler. The other three are turned aside, each at
// its layer, to the sign with its answer. Then the third handler pushes changes down
// the open line to a screen.
import { tr, along, ease, fade, helpers, ride, span, type Factory, type Proj } from './runtime';

const CYCLE = 19;
// [start, the layer where it stops (3 = it passes them all)]
const REQUESTS: [number, number][] = [
  [0.4, 3],
  [5.6, 0],
  [8, 1],
  [11, 2],
];
const STEP = 0.7;
const LIVE_FROM = 14.2;
const LIVE_TO = 18.2;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const q = (name: string) => h.q(`[data-part="${name}"]`);
  const beads = h.qa('[data-bead]');
  const down = (M.down as number[][][]).map((r) => along(r));
  const refuse = (M.refuse as number[][][]).map((r) => along(r));
  const out = (M.out as number[][][]).map((r) => along(r));
  const live = along(M.live);
  const pass = [0, 1, 2].map((n) => q(`pass-${n}`));
  const signs = [0, 1, 2].map((n) => q(`sign-${n}`));
  const wires = { down: [0, 1, 2, 3].map((n) => q(`down-${n}`)), floor: q('floor-line'), refuse: [0, 1, 2].map((n) => q(`refuse-${n}`)), out: [0, 1, 2].map((n) => q(`out-${n}`)), live: q('live-line') };
  const pointer = q('pointer');
  const done = [0, 1, 2].map((i) => q(`done-${i}`));
  const bars = [0, 1, 2].map((j) => q(`bar-${j}`));
  // The angle of the pointer for each handler, on the hub's top (0 is +x).
  const TURNS = [38, 22, 12];

  const apply = (t: number) => {
    const u = t % CYCLE;
    beads.forEach((b) => b.setAttribute('opacity', '0'));
    const lit = { down: [false, false, false, false], refuse: [false, false, false], pass: [false, false, false], sign: [false, false, false] };
    let say = '';
    for (const [start, stop] of REQUESTS) {
      if (u < start || u >= start + 4.6) continue;
      const v = u - start;
      // One stretch per layer: the bead reaches the check, the layer answers.
      for (let n = 0; n < 3; n++) {
        if (n > stop) break;
        const from = n * (STEP + 0.3);
        if (v >= from && v < from + STEP) {
          ride(beads[0], down[n], span(v, from, from + STEP));
          lit.down[n] = true;
        }
        const judged = from + STEP;
        if (n < stop) lit.pass[n] = v >= judged && v < judged + 1.6;
        else if (stop < 3 && n === stop) {
          lit.sign[n] = v >= judged + 0.7 && v < judged + 2.6;
          if (v >= judged && v < judged + 0.7) {
            ride(beads[0], refuse[n], span(v, judged, judged + 0.7));
            lit.refuse[n] = true;
          }
        }
      }
      if (stop === 3) {
        if (v >= 3 && v < 3.9) {
          ride(beads[0], down[3], span(v, 3, 3.9));
          lit.down[3] = true;
        }
        if (v >= 3.9 && v < 4.6) ride(beads[0], out[0], span(v, 3.9, 4.6));
        say = v < 3 ? tr('La petición pasa las tres capas', 'The request clears all three layers') : tr('El distribuidor la lleva a su manejador', 'The router takes it to its handler');
      } else {
        const names = [tr('Sin credenciales · 401', 'No credentials · 401'), tr('Demasiadas peticiones · 429', 'Too many requests · 429'), tr('Forma incorrecta · 422', 'Wrong shape · 422')];
        say = v < stop * (STEP + 0.3) + STEP ? tr('Otra petición baja por la torre', 'Another request comes down the tower') : names[stop];
      }
    }
    wires.down.forEach((el, n) => h.on(el, lit.down[n]));
    h.on(wires.floor, lit.down[3]);
    wires.refuse.forEach((el, n) => h.on(el, lit.refuse[n]));
    pass.forEach((el, n) => h.on(el, lit.pass[n]));
    signs.forEach((el, n) => h.on(el, lit.sign[n]));
    // The router and the handler of the request that got through.
    const routed = u >= 4.3 && u < 5.2;
    h.on(wires.out[0], routed);
    h.on(done[0], u >= 5 && u < 6.6);
    // The open line: the third handler keeps sending.
    const open = u >= LIVE_FROM && u < LIVE_TO;
    pointer.setAttribute('transform', `rotate(${TURNS[open ? 2 : 0]})`);
    h.on(wires.live, open);
    h.on(done[2], open);
    if (open) beads.forEach((b, n) => ride(b, live, ((u - LIVE_FROM) / 1.5 + n / 3) % 1));
    bars.forEach((el, j) => fade(el, u < LIVE_FROM + 0.9 + j * 1 ? 0 : open ? span(u, LIVE_FROM + 0.9 + j, LIVE_FROM + 1.1 + j) : 1 - span(u, LIVE_TO, LIVE_TO + 0.4)));
    h.say(open ? tr('Línea abierta · los cambios llegan solos', 'Open line · changes arrive by themselves') : say || (routed || (u >= 5 && u < 5.6) ? tr('200 · responde el manejador', '200 · the handler responds') : tr('En espera', 'Idle')));
  };
  return { apply, still: 9.6 };
};

export default create;
