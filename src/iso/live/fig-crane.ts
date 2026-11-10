import { depthOf, extrude, iso, segment, slabOf, solidSvg } from '../iso-kit.mjs';
import { isEn, tr, ease, helpers, lerp, span, type Factory, type Proj, type Vec3 } from './runtime';

// Three lifts, one per floor. Progress and the certified amount follow from the
// number of slabs set; the structure budget is fixed.
const BUDGET = 312000;
const START = 0.5;
const LIFT = 5.6;
const PH = { toStack: [0, 1.4], lower: [1.4, 2.1], hoist: [2.3, 3.0], toBuilding: [3.0, 4.4], set: [4.4, 5.1], release: 5.1, rise: [5.3, 5.6] };
const DONE = START + 3 * LIFT;
const RESET = DONE + 1.4;
const CYCLE = RESET + 0.8;
const JIB = { len: 72, back: 24, zb: 86.4, zt: 91.2, head: 101 };
const HIGH = 66; // hook height while travelling
const SLING = 8;

const money = (v: number) => (isEn() ? `€${Math.round(v).toLocaleString('en-US')}` : `${Math.round(v).toLocaleString('es-ES', { useGrouping: true })} €`);

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const { mast: MAST, bld: BLD, stack: STACK, floor: FLOOR, slab: SLAB } = M;
  const load = h.q('[data-part="load"]');
  const jib = h.q('[data-part="jib"]');
  const stacked = [0, 1, 2].map((i) => h.q(`[data-stacked="${i}"]`));
  const slabs = [0, 1, 2].map((i) => h.q(`[data-slab="${i}"]`));
  const cols = [0, 1, 2].map((i) => h.q(`[data-cols="${i}"]`));
  const beacon = h.q('[data-part="beacon"]');
  const portal = h.q('[data-part="portal"]');
  const pctText = h.q<SVGTextElement>('[data-part="pct"]');
  const certText = h.q<SVGTextElement>('[data-part="cert"]');
  const bar = h.q('[data-part="bar"]');
  const barMax = Number(h.q('[data-part="bar"]').previousElementSibling?.getAttribute('width') ?? 20);
  const setText = (el: SVGTextElement, text: string) => {
    if (el.textContent !== text) el.textContent = text;
  };

  const polar = (x: number, y: number) => ({ a: Math.atan2(y - MAST.y, x - MAST.x), r: Math.hypot(x - MAST.x, y - MAST.y) });
  const atStack = polar(STACK.x + STACK.w / 2, STACK.y + STACK.d / 2);
  const atBuild = polar(BLD.x + BLD.w / 2, BLD.y + BLD.d / 2);
  const floorZ = (f: number) => 2 + f * (FLOOR + SLAB);
  const stackTop = (i: number) => 2.2 + i * (SLAB + 1.2) + SLAB;

  // Crane pose at loop time u: slew angle, trolley radius, hook height, and which slab hangs.
  const poseAt = (u: number) => {
    let a = atBuild.a;
    let r = atBuild.r;
    let z = HIGH;
    let carrying = -1;
    for (let k = 0; k < 3; k++) {
      const s = u - (START + k * LIFT);
      if (s < 0) break;
      const pick = 2 - k; // the top slab of the stack
      const zs = stackTop(pick) + SLING;
      const zb = floorZ(k) + FLOOR + SLAB + SLING;
      const go = ease(span(s, PH.toStack[0], PH.toStack[1]));
      const back = ease(span(s, PH.toBuilding[0], PH.toBuilding[1]));
      a = lerp(lerp(atBuild.a, atStack.a, go), atBuild.a, back);
      r = lerp(lerp(atBuild.r, atStack.r, go), atBuild.r, back);
      const down = ease(span(s, PH.lower[0], PH.lower[1]));
      const up = ease(span(s, PH.hoist[0], PH.hoist[1]));
      const set = ease(span(s, PH.set[0], PH.set[1]));
      const rise = ease(span(s, PH.rise[0], PH.rise[1]));
      z = lerp(lerp(lerp(lerp(HIGH, zs, down), HIGH, up), zb, set), HIGH, rise);
      if (s >= PH.lower[1] && s < PH.release) carrying = pick;
    }
    return { a, r, z, carrying };
  };

  const box = (s0: number, s1: number, n0: number, n1: number, z0: number, z1: number, a: number) => {
    const d = [Math.cos(a), Math.sin(a)];
    const n = [-Math.sin(a), Math.cos(a)];
    const p = (s: number, m: number) => [MAST.x + d[0] * s + n[0] * m, MAST.y + d[1] * s + n[1] * m];
    return extrude([p(s0, n0), p(s1, n0), p(s1, n1), p(s0, n1)], z0, z1 - z0, P);
  };

  let jibKey = '';
  let loadKey = '';
  const apply = (t: number) => {
    const u = t % CYCLE;
    const resetting = u >= RESET;
    const back = resetting ? span(u, RESET, RESET + 0.6) : 0;
    const pose = resetting ? { a: atBuild.a, r: atBuild.r, z: HIGH, carrying: -1 } : poseAt(u);
    const placed = resetting ? 3 : [0, 1, 2].filter((k) => u >= START + k * LIFT + PH.release).length;

    // Building and stack.
    slabs.forEach((el, k) => el.setAttribute('opacity', (k < placed ? 1 - back : 0).toFixed(2)));
    cols.forEach((el, f) => {
      if (f === 0) return;
      const s = u - (START + (f - 1) * LIFT);
      const grow = resetting ? 1 - back : ease(span(s, PH.release + 0.1, PH.release + 0.7));
      el.setAttribute('opacity', grow.toFixed(2));
    });
    stacked.forEach((el, i) => {
      const takenBy = 2 - i;
      const taken = !resetting && u >= START + takenBy * LIFT + PH.lower[1];
      el.setAttribute('opacity', resetting ? back.toFixed(2) : taken ? '0' : '1');
    });

    // Hook, slings and the hanging slab.
    const hx = MAST.x + Math.cos(pose.a) * pose.r;
    const hy = MAST.y + Math.sin(pose.a) * pose.r;
    const lk = `${hx.toFixed(1)},${hy.toFixed(1)},${pose.z.toFixed(1)},${pose.carrying}`;
    if (lk !== loadKey) {
      loadKey = lk;
      let svg = '';
      if (pose.carrying >= 0) {
        const bz = pose.z - SLING - SLAB;
        svg += solidSvg(slabOf({ x: hx - BLD.w / 2, y: hy - BLD.d / 2, w: BLD.w, d: BLD.d, r: 0.4 }, bz, SLAB, P, 2, 0.2), { tone: 'hi', crease: 'lo', lit: true });
        const top = bz + SLAB;
        svg += `<path class="iso-line" data-tone="mid" d="${[
          [-1, -1],
          [1, -1],
          [1, 1],
          [-1, 1],
        ]
          .map(([sx, sy]) => segment([hx, hy, pose.z - 0.8], [hx + sx * (BLD.w / 2 - 3), hy + sy * (BLD.d / 2 - 3), top], P))
          .join('')}"/>`;
      }
      svg += solidSvg(extrude([[hx - 1.6, hy - 1.6], [hx + 1.6, hy - 1.6], [hx + 1.6, hy + 1.6], [hx - 1.6, hy + 1.6]], pose.z, 3, P), { tone: 'hi', crease: 'lo' });
      const n = [-Math.sin(pose.a), Math.cos(pose.a)];
      svg += `<path class="iso-line" data-tone="hi" d="${[-0.8, 0.8].map((m) => segment([hx + n[0] * m, hy + n[1] * m, pose.z + 3], [hx + n[0] * m, hy + n[1] * m, JIB.zb - 2], P)).join('')}"/>`;
      load.innerHTML = svg;
    }

    // The slewing part: head post, cab, counter-jib with its weight, jib lattice, trolley, ties.
    const jk = `${pose.a.toFixed(4)},${pose.r.toFixed(2)}`;
    if (jk !== jibKey) {
      jibKey = jk;
      const a = pose.a;
      const d = [Math.cos(a), Math.sin(a)];
      const nn = [-Math.sin(a), Math.cos(a)];
      const at = (s: number, m: number, z: number): Vec3 => [MAST.x + d[0] * s + nn[0] * m, MAST.y + d[1] * s + nn[1] * m, z];
      const parts: { d: number; svg: string }[] = [];
      const lines: string[] = [];
      for (let s = 3; s < JIB.len; s += 6) {
        const e = Math.min(JIB.len, s + 6);
        for (const m of [-1.8, 1.8]) {
          lines.push(segment(at(s, m, JIB.zb), at(e, m, JIB.zb), P));
          lines.push(segment(at(s, m, JIB.zb), at(s + 3, 0, JIB.zt), P));
          lines.push(segment(at(s + 3, 0, JIB.zt), at(e, m, JIB.zb), P));
        }
        lines.push(segment(at(s, -1.8, JIB.zb), at(s, 1.8, JIB.zb), P));
        lines.push(segment(at(s + 3, 0, JIB.zt), at(Math.min(JIB.len, s + 9), 0, JIB.zt), P));
      }
      lines.push(segment(at(JIB.len, -1.8, JIB.zb), at(JIB.len, 1.8, JIB.zb), P));
      const counter: string[] = [];
      for (let s = -3; s > -JIB.back; s -= 4) {
        for (const m of [-2.2, 2.2]) counter.push(segment(at(s, m, JIB.zb), at(Math.max(-JIB.back, s - 4), m, JIB.zb), P));
        counter.push(segment(at(s, -2.2, JIB.zb), at(s, 2.2, JIB.zb), P));
      }
      const ties = segment([MAST.x, MAST.y, JIB.head], at(46, 0, JIB.zt), P) + segment([MAST.x, MAST.y, JIB.head], at(-JIB.back + 2, 0, JIB.zb + 1), P);
      parts.push({ d: depthOf([MAST.x, MAST.y, JIB.zb], P), svg: `<path class="iso-line" data-tone="mid" d="${counter.join('')}"/>` });
      parts.push({ d: depthOf(at(-JIB.back + 3.5, 0, 84), P), svg: solidSvg(box(-JIB.back, -JIB.back + 7, -3, 3, 79, JIB.zb + 1.6, a), { tone: 'mid', crease: 'lo' }) });
      parts.push({ d: depthOf(at(3, 5.4, 86), P), svg: solidSvg(box(0.5, 6, 3.4, 7.6, MAST.top + 0.4, MAST.top + 7, a), { tone: 'hi', crease: 'lo' }) });
      parts.push({ d: depthOf(at(JIB.len / 2, 0, JIB.zb), P), svg: `<path class="iso-line" data-tone="hi" d="${lines.join('')}"/>` });
      parts.push({ d: depthOf(at(pose.r, 0, JIB.zb - 1), P) + 0.01, svg: solidSvg(box(pose.r - 2.4, pose.r + 2.4, -2.6, 2.6, JIB.zb - 2.4, JIB.zb - 0.2, a), { tone: 'hi', crease: 'lo', lit: pose.carrying >= 0 }) });
      parts.push({ d: Infinity, svg: `<path class="iso-line" data-tone="lo" d="${ties}"/>` });
      jib.innerHTML = parts
        .sort((p, q) => p.d - q.d)
        .map((p) => p.svg)
        .join('');
    }

    // Site office: progress, certified amount, buyer portal light.
    const pct = Math.round((placed / 3) * 100);
    setText(pctText, `${pct} %`);
    setText(certText, money((BUDGET * placed) / 3));
    bar.setAttribute('width', ((barMax * placed) / 3).toFixed(2));
    const lastSet = placed > 0 && !resetting ? START + (placed - 1) * LIFT + PH.release : -9;
    h.on(portal, u - lastSet >= 0 && u - lastSet < 1.4 && Math.floor(u * 4) % 2 === 0);
    h.on(beacon, Math.floor(u * 1.5) % 2 === 0);

    // Readout.
    const k = Math.min(2, Math.max(0, Math.floor((u - START) / LIFT)));
    const s = u - (START + k * LIFT);
    if (resetting) h.say(tr('Nueva obra · 3 forjados en acopio', 'New job · 3 slabs staged'));
    else if (u >= DONE) h.say(tr(`100 % · ${money(BUDGET)} certificados`, `100% · ${money(BUDGET)} billed`));
    else if (u < START) h.say(tr('Grúa lista · 3 forjados en acopio', 'Crane ready · 3 slabs staged'));
    else if (s < PH.toStack[1]) h.say(tr(`Forjado ${k + 1} · al acopio`, `Slab ${k + 1} · to the stack`));
    else if (s < PH.toBuilding[0]) h.say(tr(`Forjado ${k + 1} · izando`, `Slab ${k + 1} · hoisting`));
    else if (s < PH.release) h.say(tr(`Forjado ${k + 1} · a la planta ${k + 1}`, `Slab ${k + 1} · to floor ${k + 1}`));
    else h.say(tr(`Planta ${k + 1} lista · ${pct} % · portal al día`, `Floor ${k + 1} done · ${pct}% · portal updated`));
  };
  return { apply, still: START + LIFT + 3.6 };
};

export default create;
