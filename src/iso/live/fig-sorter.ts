import { extrude, lineOnTop, segment, solidSvg, translateAlong } from '../iso-kit.mjs';
import { tr, ease, helpers, lerp, pulse, span, type Factory, type Proj, type Vec3 } from './runtime';

// Six parcels, each with the route printed on its label. Arm, chute, cage and the
// board count all follow from that route. Order and spacing are chosen so each arm
// swings on its own and never sweeps a parcel bound for another route.
const ROUTE = [1, 2, 0, 1, 2, 0];
const DEPART = ['10:40', '11:05', '11:30'];
const SPAWN = 1.6;
const V = 26;
const X0 = -100;
const ARM = { len: 30, half: 0.8, h: 5, swing: (40 * Math.PI) / 180 };
const RESET = 14.6;
const CYCLE = 15.6;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const BT: number = M.BT;
  const { dx: DX, cage: CAGE, chute: CHUTE, box: BOX } = M as {
    dx: number[];
    cage: { y: number; d: number; floor: number };
    chute: { y0: number; y1: number; z1: number };
    box: { w: number; d: number; h: number };
  };
  const parcels = h.qa('[data-parcel]');
  const holders = parcels.map((el) => el.parentElement!);
  const arms = h.q('[data-part="arms"]');
  const laser = h.q('[data-part="laser"]');
  const read = h.q('[data-part="read"]');
  const live = h.q('[data-part="live"]');
  const counts = [0, 1, 2].map((i) => h.q<SVGTextElement>(`[data-part="c${i}"]`));
  const rows = [0, 1, 2].map((i) => h.q(`[data-part="row${i}"]`));
  h.on(live, true);

  const slotOf = (i: number) => ROUTE.slice(0, i).filter((r) => r === ROUTE[i]).length;
  const contactOf = (r: number) => DX[r] - 7;
  const chuteZ = (y: number) => BT - 0.8 + ((y - CHUTE.y0) / (CHUTE.y1 - CHUTE.y0)) * (CHUTE.z1 - (BT - 0.8));

  // Where parcel i is, s seconds after it entered.
  const placeOf = (i: number, s: number): Vec3 => {
    const r = ROUTE[i];
    const cx = DX[r] + 1;
    const tC = (contactOf(r) - X0) / V;
    if (s < tC) return [X0 + V * s, 0, BT];
    const a = span(s, tC, tC + 0.45);
    if (a < 1) return [lerp(contactOf(r), cx, ease(a)), lerp(0, CHUTE.y0 + 1, ease(a)), BT];
    const b = span(s, tC + 0.45, tC + 0.95);
    if (b < 1) {
      const y = lerp(CHUTE.y0 + 1, CHUTE.y1 - 1, b);
      return [cx, y, chuteZ(y)];
    }
    const c = ease(span(s, tC + 0.95, tC + 1.3));
    const slot = slotOf(i);
    const target: Vec3 = [cx - 5.5 + slot * 11, CAGE.y + CAGE.d / 2 + 1, CAGE.floor];
    return [lerp(cx, target[0], c), lerp(CHUTE.y1 - 1, target[1], c), lerp(chuteZ(CHUTE.y1 - 1), target[2], c)];
  };
  const doneAt = (i: number) => (contactOf(ROUTE[i]) - X0) / V + 1.3;

  let armKey = '';
  const apply = (t: number) => {
    const u = t % CYCLE;
    const fade = 1 - span(u, RESET, RESET + 0.6);

    // Parcels and their sort keys.
    const keys = new Map<Element, Vec3>();
    const swing = [0, 0, 0];
    const settled = [0, 0, 0];
    let scanning = -1;
    let lastRead = -1;
    for (let i = 0; i < parcels.length; i++) {
      const s = u - i * SPAWN;
      const el = parcels[i];
      if (s < 0) {
        el.setAttribute('opacity', '0');
        keys.set(holders[i], [X0, 0, BT]);
        continue;
      }
      const at = placeOf(i, s);
      const enter = span(at[0], X0, X0 + 8);
      el.setAttribute('opacity', (Math.min(enter, 1) * fade).toFixed(2));
      el.setAttribute('transform', translateAlong(P, [at[0], at[1], at[2] - BT]));
      keys.set(holders[i], [at[0], at[1], at[2] + 0.1]);
      const tC = (contactOf(ROUTE[i]) - X0) / V;
      swing[ROUTE[i]] = Math.max(swing[ROUTE[i]], pulse(s, tC - 0.45, tC + 0.4, 0.2));
      if (Math.abs(at[0] - M.scan) < 4.5 && at[1] === 0) scanning = i;
      if (at[0] >= M.scan || at[1] > 0) lastRead = i;
      if (s >= doneAt(i)) settled[ROUTE[i]]++;
    }
    h.sort(keys);

    // Swing arms: a plate that pivots on the back rail and sweeps across the rollers.
    const key = swing.map((v) => v.toFixed(3)).join();
    if (key !== armKey) {
      armKey = key;
      arms.innerHTML = DX.map((dx, r) => {
        const a = swing[r] * ARM.swing;
        const px = dx - 14;
        const py = -12.6;
        const [cx, cy] = [Math.cos(a), Math.sin(a)];
        const [nx, ny] = [-cy, cx];
        const ring = [
          [px + nx * ARM.half, py + ny * ARM.half],
          [px + cx * ARM.len + nx * ARM.half, py + cy * ARM.len + ny * ARM.half],
          [px + cx * ARM.len - nx * ARM.half, py + cy * ARM.len - ny * ARM.half],
          [px - nx * ARM.half, py - ny * ARM.half],
        ];
        return solidSvg(extrude(ring, BT + 0.6, ARM.h, P), { tone: 'hi', crease: 'lo', lit: swing[r] > 0.02 });
      }).join('');
    }

    // The laser line falls on whatever is under the arch.
    if (scanning >= 0) {
      const z = BT + BOX.h + 0.05;
      const x = M.scan;
      laser.innerHTML =
        `<path class="iso-line" data-tone="red" style="stroke-width:1.4px" d="${lineOnTop([x, -BOX.d / 2], [x, BOX.d / 2], z, P)}"/>` +
        `<path class="iso-line" data-tone="red" style="stroke-opacity:.35" d="${segment([x, -2, 38], [x, -BOX.d / 2, z], P)}${segment([x, 2, 38], [x, BOX.d / 2, z], P)}"/>`;
      laser.setAttribute('opacity', '1');
    } else {
      laser.setAttribute('opacity', '0');
    }
    h.on(read, scanning >= 0);

    for (let r = 0; r < 3; r++) {
      const label = `${settled[r]}/2`;
      if (counts[r].textContent !== label) counts[r].textContent = label;
      rows[r].setAttribute('data-t', lastRead >= 0 && ROUTE[lastRead] === r && u < RESET ? 'mid' : '');
    }

    const done = settled.reduce((a, b) => a + b, 0);
    if (u >= RESET || done === parcels.length) {
      h.say(tr(`3 rutas listas · ${done} bultos clasificados`, `3 routes ready · ${done} parcels sorted`));
    } else if (lastRead < 0) {
      h.say(tr('Entrada abierta · esperando bulto', 'Infeed open · waiting for a parcel'));
    } else {
      const n = String(231 + lastRead).padStart(4, '0');
      const r = ROUTE[lastRead];
      h.say(tr(`Bulto ${n} → ruta ${r + 1} · sale ${DEPART[r]}`, `Parcel ${n} → route ${r + 1} · leaves ${DEPART[r]}`));
    }
  };
  return { apply, still: 4.5 };
};

export default create;
