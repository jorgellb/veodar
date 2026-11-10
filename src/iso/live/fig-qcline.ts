import { iso, lineOnTop, pathOf, ring, translateAlong } from '../iso-kit.mjs';
import { tr, fmt, ease, helpers, lerp, span, type Factory, type Proj, type Vec3 } from './runtime';

// The shift model: every number on the panel and in the readout comes from here.
const COUNT = 6;
const SPAWN = 1.6; // seconds between parts
const V = 22; // belt speed, units per second
const DROP = 0.3; // time to fall from the chute onto the belt
const BAD = 3;
const DIAMETER = [24.02, 23.97, 24.05, 24.31, 23.99, 24.01];
const NOMINAL = 24;
const TOLERANCE = 0.1;
const AVAILABILITY = 0.94;
const PERFORMANCE = 0.95;
const BASE = { ok: 412, nok: 9 };
const RESET = 16.2;
const CYCLE = 17;

const okOf = (i: number) => Math.abs(DIAMETER[i] - NOMINAL) <= TOLERANCE;

// Convex hull of screen points (monotone chain), for the camera's light cone.
function hull(points: number[][]) {
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: number[], a: number[], b: number[]) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: number[][] = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper: number[][] = [];
  for (const p of pts.reverse()) {
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const BT: number = M.BT;
  const belt = M.belt as { x0: number; x1: number; y0: number; y1: number };
  const items = h.qa('[data-stack] > [data-item]');
  const pieces = h.qa('[data-piece]');
  const cleats = h.q('[data-part="cleats"]');
  const beam = h.q('[data-part="beam"]');
  const push = h.q('[data-part="push"]');
  const flash = h.q('[data-part="flash"]');
  const [green, amber, red] = ['st-g', 'st-a', 'st-r'].map((name) => h.q(`[data-part="${name}"]`));
  const power = h.q('[data-part="power"]');
  const air = h.q('[data-part="air"]');
  const okText = h.q<SVGTextElement>('[data-part="ok"]');
  const nokText = h.q<SVGTextElement>('[data-part="nok"]');
  const oeeText = h.q<SVGTextElement>('[data-part="oee"]');
  const verdict = h.q('[data-part="verdict"]');
  h.on(power, true);

  // Light cone from the ring light down to the belt, drawn once.
  const circle = (r: number, z: number) => Array.from({ length: 24 }, (_, i) => iso([M.cam + Math.cos((i / 24) * Math.PI * 2) * r, Math.sin((i / 24) * Math.PI * 2) * r, z], P));
  const cone = hull([...circle(6.4, 33.4), ...circle(9, BT)]);
  beam.innerHTML = `<path d="${pathOf(cone, true)}" fill="#ff5a1f" fill-opacity=".1" stroke="none"/><path class="iso-line" data-tone="lit" d="${ring(M.cam, 0, 8.2, BT + 0.05, P, 36)}"/>`;

  const tCam = (M.cam - M.chute) / V + DROP;
  const tPush = (M.push - M.chute) / V + DROP;
  const tEnd = (belt.x1 - M.chute) / V + DROP;
  const slots = Array.from({ length: COUNT }, (_, i) => i).filter(okOf);
  const spotOf = (i: number): Vec3 => {
    const j = slots.indexOf(i);
    return [M.tray.x + 9 + (j % 2) * 12, M.tray.y + 7.4 + Math.floor(j / 2) * 9.4, 1.2];
  };

  // Where part i is at local time s (seconds since it left the chute).
  const placeOf = (i: number, s: number): { at: Vec3; seen: number } => {
    if (s < DROP) return { at: [M.chute, 0, BT + (1 - ease(s / DROP)) * 9], seen: Math.min(1, (s / DROP) * 1.4) };
    const along = M.chute + V * (s - DROP);
    if (!okOf(i) && s >= tPush) {
      const out = ease(span(s, tPush, tPush + 0.28));
      const fall = span(s, tPush + 0.24, tPush + 0.66);
      const y = lerp(0, belt.y1 + 3, out) + (M.bin.y - belt.y1 - 3) * ease(fall);
      return { at: [M.push + (M.bin.x - M.push) * fall, y, BT - (BT - 1.2) * fall * fall], seen: 1 };
    }
    if (s >= tEnd) {
      const f = span(s, tEnd, tEnd + 0.45);
      const spot = spotOf(i);
      return { at: [lerp(belt.x1, spot[0], ease(f)), lerp(0, spot[1], ease(f)), BT - (BT - spot[2]) * f * f], seen: 1 };
    }
    return { at: [along, 0, BT], seen: 1 };
  };

  let cleatKey = '';
  const apply = (t: number) => {
    const u = t % CYCLE;
    const fade = 1 - span(u, RESET, RESET + 0.6);
    const running = u < RESET;

    // Rubber cleats move with the belt.
    const offset = running ? (V * u) % 10 : 0;
    const key = offset.toFixed(1);
    if (key !== cleatKey) {
      cleatKey = key;
      let d = '';
      for (let x = belt.x0 + 3 + offset; x < belt.x1 - 2; x += 10) d += lineOnTop([x, belt.y0 + 1.2], [x, belt.y1 - 1.2], BT + 0.02, P);
      cleats.innerHTML = `<path class="iso-line" d="${d}"/>`;
    }

    // Parts.
    const keys = new Map<Element, Vec3>();
    let inspecting = false;
    let pushing = 0;
    let last = -1;
    let ok = BASE.ok;
    let nok = BASE.nok;
    for (let i = 0; i < COUNT; i++) {
      const s = u - i * SPAWN;
      const el = pieces[i];
      if (s < 0) {
        el.setAttribute('opacity', '0');
        keys.set(items[i], [M.chute, 0, BT]);
        continue;
      }
      const { at, seen } = placeOf(i, s);
      el.setAttribute('opacity', (seen * fade).toFixed(2));
      el.setAttribute('transform', translateAlong(P, [at[0], at[1], at[2] - BT]));
      keys.set(items[i], at);
      if (Math.abs(s - tCam) < 0.14) inspecting = true;
      if (s >= tCam) {
        last = i;
        if (okOf(i)) ok++;
        else nok++;
      }
      h.on(el, !okOf(i) && s >= tCam, 'data-bad');
      if (!okOf(i)) pushing = Math.max(pushing, Math.min(ease(span(s, tPush - 0.06, tPush + 0.18)), 1 - ease(span(s, tPush + 0.5, tPush + 0.9))));
    }
    h.sort(keys);

    push.setAttribute('transform', translateAlong(P, [0, pushing * 15, 0]));
    beam.setAttribute('opacity', inspecting ? '1' : '0');
    h.on(flash, inspecting);
    h.on(green, running);
    h.on(amber, inspecting);
    const lastBad = last >= 0 && !okOf(last);
    h.on(red, lastBad && running && Math.floor(u * 4) % 2 === 0);
    h.on(air, pushing > 0.05);

    const quality = ok / (ok + nok);
    const oee = AVAILABILITY * PERFORMANCE * quality;
    if (okText.textContent !== String(ok)) okText.textContent = String(ok);
    if (nokText.textContent !== String(nok)) nokText.textContent = String(nok);
    const oeeLabel = fmt(oee, 2);
    if (oeeText.textContent !== oeeLabel) oeeText.textContent = oeeLabel;
    verdict.setAttribute('data-t', last < 0 ? 'mid' : lastBad ? 'acc' : 'hi');

    if (!running) {
      h.say(tr(`Turno · OK ${ok} · NOK ${nok} · OEE ${oeeLabel}`, `Shift · OK ${ok} · NOK ${nok} · OEE ${oeeLabel}`));
    } else if (last < 0) {
      h.say(tr('Línea en marcha · esperando pieza', 'Line running · waiting for a part'));
    } else {
      const n = String(413 + last).padStart(4, '0');
      const d = fmt(DIAMETER[last], 2);
      h.say(
        okOf(last)
          ? tr(`Pieza ${n} · Ø ${d} mm · OK`, `Part ${n} · Ø ${d} mm · OK`)
          : tr(`Pieza ${n} · Ø ${d} mm · fuera de tolerancia`, `Part ${n} · Ø ${d} mm · out of tolerance`),
      );
    }
  };
  return { apply, still: 9.55 };
};

export default create;
