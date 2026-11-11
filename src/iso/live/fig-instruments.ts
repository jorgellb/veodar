// React: a key asks for a state, the wheel takes it and the three screens follow at once.
import { lineOnTop } from '../iso-kit.mjs';
import { tr, along, ease, helpers, polar, pulse, ride, shift, span, write, type Factory, type Proj } from './runtime';

const STEP = 3.6;
const MATCH = [
  [0, 1, 2, 3, 4],
  [0, 2],
  [1, 3, 4],
];
const IDS = ['#0138', '#0138', '#0139'];

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const needle = h.q('[data-part="needle"]');
  const keys = [0, 1, 2].map((i) => h.q(`[data-part="key-${i}"]`));
  const detents = [0, 1, 2].map((i) => h.q(`[data-part="det-${i}"]`));
  const lamps = [0, 1, 2].map((i) => h.q(`[data-part="scr-${i}"]`));
  const wires = [0, 1, 2].map((i) => h.q(`[data-part="wire-${i}"]`));
  const beads = h.qa('[data-bead]');
  const routes = (M.routes as number[][][]).map(along);
  const chips = h.qa<SVGRectElement>('[data-chip]');
  const knobs = h.qa<SVGCircleElement>('[data-knob]');
  const labels = h.qa('[data-flabel]');
  const rows = h.qa('[data-row]');
  const sel = h.q<SVGRectElement>('[data-part="sel"]');
  const recId = h.q('[data-part="rec-id"]');
  const pill = h.q('[data-part="rec-pill"]');
  const W = M.wheel;
  let angle = M.detents[0] as number;
  let speed = 0;
  let shown = -1;

  const show = (state: number) => {
    if (state === shown) return;
    shown = state;
    chips.forEach((chip, i) => {
      chip.setAttribute('data-t', i === state ? 'acc' : '');
      chip.classList.toggle('scr-glow', i === state);
    });
    knobs.forEach((knob, i) => knob.setAttribute('cx', i === state ? '8.3' : '4.7'));
    labels.forEach((label, i) => label.setAttribute('data-t', i === state ? 'hi' : ''));
    rows.forEach((row, i) => row.setAttribute('opacity', MATCH[state].includes(i) ? '1' : '.16'));
    sel.setAttribute('y', String(7.6 + MATCH[state][0] * 5.2));
    write(recId, IDS[state]);
    pill.setAttribute('data-t', state === 2 ? 'mid' : 'acc');
    pill.classList.toggle('scr-glow', state !== 2);
  };

  const apply = (t: number, dt: number) => {
    const u = t % (STEP * 3);
    const state = Math.floor(u / STEP);
    const v = u % STEP;
    keys.forEach((key, i) => shift(key, P, [0, 0, i === state ? -1.5 * pulse(v, 0, 0.4, 0.12) : 0]));
    // The wheel follows the key with a little spring.
    const target = M.detents[state] as number;
    if (dt > 0) {
      speed += (70 * (target - angle) - 2 * Math.sqrt(70) * 0.8 * speed) * dt;
      angle += speed * dt;
    } else angle = target;
    needle.innerHTML = `<path class="iso-line" data-tone="hi" d="${lineOnTop([W.x, W.y], polar(W.x, W.y, W.r, angle), W.z, P)}"/>`;
    detents.forEach((lamp, i) => h.on(lamp, i === state && v > 0.4));
    const sent = span(v, 0.5, 1.2);
    beads.forEach((bead, i) => ride(bead, routes[i], sent));
    wires.forEach((wire) => h.on(wire, sent > 0 && sent < 1));
    show(v >= 1.2 ? state : (state + 2) % 3);
    lamps.forEach((lamp) => h.on(lamp, v >= 1.2 && v < 1.75));
    const name = [tr('todos', 'all'), tr('pendientes', 'pending'), tr('enviados', 'shipped')][state];
    h.say(
      v < 0.5
        ? tr(`Clic en «${name}»`, `Click on “${name}”`)
        : v < 1.2
          ? tr('El estado cambia una vez, para todas', 'The state changes once, for all of them')
          : tr(`Filtro: ${name} · ${MATCH[state].length} pedidos · detalle ${IDS[state]}`, `Filter: ${name} · ${MATCH[state].length} orders · record ${IDS[state]}`),
    );
  };
  return { apply, still: STEP + 2 };
};

export default create;
