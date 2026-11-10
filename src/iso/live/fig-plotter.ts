import { iso, pathOf, translateAlong } from '../iso-kit.mjs';
import { tr, clamp01, helpers, span, type Factory, type Proj } from './runtime';

const DRAW = 78; // sheet units per second with the pen down
const TRAVEL = 190; // and with the pen up
const HOLD = 2.0;

type Step = { el: number; pts: number[][]; t0: number; t1: number; len: number; acc: number[]; weight: number; from: number[]; move0: number };

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const ink = h.q('[data-part="ink"]');
  const live = h.q('[data-part="live"]');
  const fill = h.q('[data-part="fill"]');
  const bridge = h.q('[data-part="bridge"]');
  const truck = h.q('[data-part="truck"]');
  const carriage = h.q('[data-part="carriage"]');
  const pen = h.q('[data-part="pen"]');
  const xy = h.q<SVGTextElement>('[data-part="xy"]');
  const busy = h.q('[data-part="busy"]');
  const elements = M.elements as { name: string; weight?: number; fill?: boolean; strokes: number[][][] }[];

  // Lay every stroke on one timeline: travel to its start, then draw it.
  const steps: Step[] = [];
  let clock = 0.5;
  let at: number[] = M.home;
  elements.forEach((element, el) => {
    for (const pts of element.strokes) {
      const acc = [0];
      for (let i = 1; i < pts.length; i++) acc.push(acc[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
      const len = acc[acc.length - 1];
      const move0 = clock;
      clock += Math.hypot(pts[0][0] - at[0], pts[0][1] - at[1]) / TRAVEL + 0.06;
      steps.push({ el, pts, t0: clock, t1: clock + len / DRAW, len, acc, weight: element.weight ?? 1.25, from: at, move0 });
      clock += len / DRAW + 0.05;
      at = pts[pts.length - 1];
    }
  });
  const END = clock;
  const CYCLE = END + HOLD + 1.2;
  const fillAt = steps.filter((s) => elements[s.el].fill).pop()!.t1;

  const partial = (step: Step, f: number) => {
    const s = clamp01(f) * step.len;
    const out: number[][] = [step.pts[0]];
    for (let i = 1; i < step.pts.length; i++) {
      if (step.acc[i] <= s) out.push(step.pts[i]);
      else {
        const t = (s - step.acc[i - 1]) / (step.acc[i] - step.acc[i - 1] || 1);
        out.push([step.pts[i - 1][0] + (step.pts[i][0] - step.pts[i - 1][0]) * t, step.pts[i - 1][1] + (step.pts[i][1] - step.pts[i - 1][1]) * t]);
        break;
      }
    }
    return out;
  };
  const dOf = (pts: number[][]) => pathOf(pts.map(([x, y]) => iso([x, y, M.z], P)));
  const stroke = (d: string, weight: number) => `<path class="iso-line" data-tone="hi" style="stroke-width:${weight}px" d="${d}"/>`;
  const done = steps.map((s) => stroke(dOf(s.pts), s.weight));
  let inked = -1;

  const apply = (t: number) => {
    const u = t % CYCLE;
    // Completed strokes are static markup, rebuilt only when the count changes.
    const count = steps.filter((s) => u >= s.t1).length;
    if (count !== inked) {
      inked = count;
      ink.innerHTML = done.slice(0, count).join('');
    }
    const fade = 1 - span(u, END + HOLD, END + HOLD + 0.6);
    ink.setAttribute('opacity', fade.toFixed(2));
    fill.setAttribute('opacity', (span(u, fillAt, fillAt + 0.5) * fade).toFixed(2));

    // Where the pen is.
    let pos: number[] = M.home;
    let down = false;
    let name = tr('Hoja nueva · rejilla de 12 columnas', 'New sheet · 12-column grid');
    const current = steps.find((s) => u < s.t1);
    if (u >= END) {
      const back = span(u, END + 0.2, END + 1.4);
      const lastPt = steps[steps.length - 1].pts.slice(-1)[0];
      pos = [lastPt[0] + (M.home[0] - lastPt[0]) * back, lastPt[1] + (M.home[1] - lastPt[1]) * back];
      name = tr('Esquema completo · listo para prototipo', 'Layout complete · ready for prototyping');
      live.innerHTML = '';
    } else if (current) {
      name = elements[current.el].name;
      if (u >= current.t0) {
        const pts = partial(current, (u - current.t0) / (current.t1 - current.t0));
        pos = pts[pts.length - 1];
        down = true;
        live.innerHTML = stroke(dOf(pts), current.weight);
      } else {
        const f = clamp01((u - current.move0) / Math.max(0.01, current.t0 - 0.06 - current.move0));
        const e = f * f * (3 - 2 * f);
        pos = [current.from[0] + (current.pts[0][0] - current.from[0]) * e, current.from[1] + (current.pts[0][1] - current.from[1]) * e];
        live.innerHTML = '';
      }
    }
    const bx = pos[0] - M.pen;
    bridge.setAttribute('transform', translateAlong(P, [bx, 0, 0]));
    truck.setAttribute('transform', translateAlong(P, [bx, 0, 0]));
    carriage.setAttribute('transform', translateAlong(P, [bx, pos[1], 0]));
    pen.setAttribute('transform', translateAlong(P, [0, 0, down ? 0 : 3]));
    h.on(busy, down);
    const label = `X${String(Math.round(pos[0] + 72)).padStart(3, '0')} Y${String(Math.round(pos[1] + 34)).padStart(3, '0')}`;
    if (xy.textContent !== label) xy.textContent = label;
    h.say(name);
  };
  return { apply, still: END + 0.6 };
};

export default create;
