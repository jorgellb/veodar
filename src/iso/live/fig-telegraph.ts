import { iso, lineOnTop } from '../iso-kit.mjs';
import { helpers, type Factory, type Proj } from './runtime';

const CODE: Record<string, string> = { H: '....', O: '---', L: '.-..', A: '.-' };
const WORD = 'HOLA';
const UNIT = 0.17;
const SPEED = 11; // tape units per second

type Ev = { on: number; off: number; letter: number; sym: string };
const events: Ev[] = [];
let clock = 0.5;
[...WORD].forEach((ch, li) => {
  [...CODE[ch]].forEach((sym, si) => {
    const len = sym === '.' ? UNIT : UNIT * 3;
    events.push({ on: clock, off: clock + len, letter: li, sym });
    clock += len + UNIT;
    if (si === CODE[ch].length - 1) clock += UNIT * 2;
  });
});
const END = clock;
const CYCLE = END + 3.2;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const levels = [...h.q('[data-part="lever"]').children] as SVGGElement[];
  const lens = h.q('[data-part="lens"]');
  const halo = h.q('[data-part="halo"]');
  const contact = h.q('[data-part="contact"]');
  const marks = h.q('[data-part="marks"]');
  const spools = h.qa('[data-spool]');
  const T = M.tape;
  let shown = 0;

  const apply = (t: number) => {
    const u = t % CYCLE;
    // Key position: a fast eased press per event.
    let press = 0;
    let lit = 0;
    for (const e of events) {
      if (u >= e.on - 0.05 && u <= e.off + 0.05) {
        const a = Math.min(1, (u - (e.on - 0.05)) / 0.05);
        const b = Math.min(1, (e.off + 0.05 - u) / 0.05);
        press = Math.max(press, Math.min(a, b));
      }
      if (u >= e.on && u <= e.off + 0.12) lit = Math.max(lit, u <= e.off ? 1 : 1 - (u - e.off) / 0.12);
    }
    const level = Math.round(press * (M.levels - 1));
    if (level !== shown) {
      levels[shown].style.display = 'none';
      levels[level].style.display = '';
      shown = level;
    }
    h.on(lens, lit > 0.5);
    h.on(contact, press > 0.9);
    halo.setAttribute('opacity', lit.toFixed(2));

    // Tape: each press inks a mark at the wheel, then the tape carries it.
    const fade = u > END + 2.4 ? 1 - (u - END - 2.4) / 0.8 : 1;
    let d = '';
    for (const e of events) {
      if (u < e.on) break;
      const end = Math.min(u, e.off);
      const x0 = T.x0 + (u - end) * SPEED;
      const x1 = T.x0 + (u - e.on) * SPEED;
      if (x0 > T.x1 + 6) continue;
      d += lineOnTop([x0, T.y], [x1, T.y], T.z + 0.02, P);
    }
    marks.innerHTML = d ? `<path class="iso-line" data-tone="hi" opacity="${fade.toFixed(2)}" style="stroke-width:2.2px;stroke-linecap:round" d="${d}"/>` : '';

    // Spools turn while the tape runs.
    const ang = u * 2.4;
    spools.forEach((el, i) => {
      const x = Number((el as SVGGElement).dataset.spool);
      let lines = '';
      for (let k = 0; k < 3; k++) {
        const b = ang * (i ? 1.4 : 1) + (k * Math.PI * 2) / 3;
        const [ax, ay] = iso([x + Math.cos(b) * 1.4, 14 + Math.sin(b) * 1.4, 23.4], P);
        const [bx, by] = iso([x + Math.cos(b) * 4.6, 14 + Math.sin(b) * 4.6, 23.4], P);
        lines += `M${ax.toFixed(1)} ${ay.toFixed(1)}L${bx.toFixed(1)} ${by.toFixed(1)}`;
      }
      el.innerHTML = `<path class="iso-line" data-tone="mid" d="${lines}"/>`;
    });

    // Readout: letters sent so far and the one in progress.
    const current = events.find((e) => u >= e.on && u <= e.off);
    const letters = [...WORD].filter((_, li) => events.filter((e) => e.letter === li).every((e) => e.off <= u)).join('');
    const inLetter = current ? current.letter : -1;
    const pattern = inLetter >= 0 ? CODE[WORD[inLetter]].replace(/\./g, '·').replace(/-/g, '–').split('').join(' ') : '';
    h.say(u >= END ? 'HOLA enviado · ahora te toca a ti' : `Transmitiendo: ${letters || '…'}${pattern ? `  ${pattern}` : ''}`);
  };
  return { apply, still: END + 0.4 };
};

export default create;
