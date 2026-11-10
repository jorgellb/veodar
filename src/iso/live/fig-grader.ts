import { depthOf, iso, segment } from '../iso-kit.mjs';
import { tr, ease, helpers, lerp, span, type Factory, type Proj, type Vec3 } from './runtime';

// Eight oranges from grower 118. Size decides where each one drops; the fifth
// has a blemish and is blown off before the sizing section.
const FRUITS = [{ d: 10 }, { d: 7 }, { d: 13 }, { d: 10 }, { d: 7, bad: true }, { d: 13 }, { d: 7 }, { d: 10 }];
const START = 0.5;
const SPAWN = 1.25;
const V = 26;
const GRAVITY = 180;
const RESET = 14.2;
const CYCLE = 15;
const SLOTS = [
  [-4, -3],
  [4, -3],
  [0, 3.4],
];
const mmOf = (d: number) => 40 + d * 3;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const { rails: R, sizes: SIZES, crate: CRATE, cam: CAM_X, jet: JET_X, reject: REJECT } = M;
  const layer = h.q('[data-part="fruit"]');
  const puff = h.q('[data-part="puff"]');
  const flash = h.q('[data-part="flash"]');
  const readText = h.q<SVGTextElement>('[data-part="read"]');
  const counts = [0, 1, 2].map((i) => h.q<SVGTextElement>(`[data-part="n${i}"]`));
  const gapAt = (x: number) => R.g0 + ((Math.max(R.x0, Math.min(R.x1, x)) - R.x0) / (R.x1 - R.x0)) * (R.g1 - R.g0);
  const dropX = (d: number) => R.x0 + ((d - R.g0) / (R.g1 - R.g0)) * (R.x1 - R.x0);
  const onRails = (x: number, r: number) => R.z + Math.sqrt(Math.max(0, r * r - (gapAt(x) / 2) ** 2));
  const setText = (el: SVGTextElement, text: string) => {
    if (el.textContent !== text) el.textContent = text;
  };
  const slotOf = (i: number) => FRUITS.slice(0, i).filter((f) => f.d === FRUITS[i].d && !f.bad).length;

  // Where fruit i is, s seconds after it leaves the bin, and how far it has rolled.
  const placeOf = (i: number, s: number): { at: Vec3; roll: number; landed: boolean } => {
    const f = FRUITS[i];
    const r = f.d / 2;
    const x = M.start + V * s;
    if (f.bad) {
      const sJet = (JET_X - M.start) / V;
      if (s < sJet) return { at: [x, R.y, onRails(x, r)], roll: V * s, landed: false };
      const b = span(s, sJet, sJet + 0.55);
      const land: Vec3 = [REJECT.x + REJECT.w / 2, REJECT.y + REJECT.d / 2, 1 + r];
      const z0 = onRails(JET_X, r);
      return { at: [lerp(JET_X, land[0], b), lerp(R.y, land[1], ease(b)), lerp(z0, land[2], b * b) + Math.sin(Math.PI * b) * 6], roll: V * sJet, landed: b >= 1 };
    }
    const xd = dropX(f.d);
    const sDrop = (xd - M.start) / V;
    if (s < sDrop) return { at: [x, R.y, onRails(x, r)], roll: V * s, landed: false };
    const tf = s - sDrop;
    const z0 = R.z;
    const [ox, oy] = SLOTS[slotOf(i) % SLOTS.length];
    const land: Vec3 = [xd + CRATE.ahead + ox, R.y + oy, 1 + r + Math.floor(slotOf(i) / SLOTS.length) * f.d * 0.8];
    const tLand = Math.sqrt((2 * (z0 - land[2])) / GRAVITY);
    const k = Math.min(1, tf / tLand);
    return { at: [lerp(xd, land[0], k), lerp(R.y, land[1], k), Math.max(land[2], z0 - 0.5 * GRAVITY * tf * tf)], roll: V * sDrop + 6 * k, landed: k >= 1 };
  };

  const fruitSvg = (p: Vec3, r: number, roll: number, bad: boolean) => {
    const [cx, cy] = iso(p, P);
    const rr = r * P.scale;
    const a = roll / r;
    const sx = cx + Math.cos(a) * rr * 0.55;
    const sy = cy + Math.sin(a) * rr * 0.4 - rr * 0.1;
    return (
      `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rr.toFixed(2)}" fill="url(#veo-orange)" stroke="#8a3410" stroke-width=".6"/>` +
      `<circle cx="${(cx - rr * 0.35).toFixed(1)}" cy="${(cy - rr * 0.38).toFixed(1)}" r="${(rr * 0.22).toFixed(2)}" fill="#fff" opacity=".45"/>` +
      `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${Math.max(0.6, rr * 0.12).toFixed(2)}" fill="#3f6b2a"/>` +
      (bad ? `<circle cx="${(cx + rr * 0.2).toFixed(1)}" cy="${(cy + rr * 0.15).toFixed(1)}" r="${(rr * 0.32).toFixed(2)}" fill="#5a2d12" opacity=".75"/>` : '')
    );
  };

  const apply = (t: number) => {
    const u = t % CYCLE;
    const fade = 1 - span(u, RESET, RESET + 0.6);
    const shown: { d: number; svg: string }[] = [];
    let inspecting = false;
    let lastRead = -1;
    let blowing = 0;
    const landed = [0, 0, 0];
    let culled = 0;
    FRUITS.forEach((f, i) => {
      const s = u - (START + i * SPAWN);
      if (s < 0) return;
      const { at, roll, landed: done } = placeOf(i, s);
      const xNow = M.start + V * s;
      if (Math.abs(xNow - CAM_X) < 2.6 && !done) inspecting = true;
      if (xNow >= CAM_X) lastRead = i;
      if (f.bad) {
        const sJet = (JET_X - M.start) / V;
        blowing = Math.max(blowing, s >= sJet && s < sJet + 0.35 ? 1 - (s - sJet) / 0.35 : 0);
        if (done) culled++;
      } else if (done) landed[SIZES.indexOf(f.d)]++;
      const appear = Math.min(1, s / 0.25);
      shown.push({ d: depthOf(at, P), svg: `<g opacity="${(appear * fade).toFixed(2)}">${fruitSvg(at, f.d / 2, roll, !!f.bad)}</g>` });
    });
    layer.innerHTML = shown
      .sort((a, b) => a.d - b.d)
      .map((x) => x.svg)
      .join('');

    // Air puff from the jet nozzle.
    if (blowing > 0) {
      const o: Vec3 = [JET_X, R.y - 7, R.z + 3.1];
      puff.innerHTML = `<path class="iso-line" data-tone="mid" style="stroke-opacity:${blowing.toFixed(2)}" d="${[-1.4, 0, 1.4].map((dx) => segment([o[0] + dx, o[1], o[2]], [o[0] + dx * 1.8, o[1] + 6 + blowing * 4, o[2] - 0.4], P)).join('')}"/>`;
    } else puff.innerHTML = '';
    h.on(flash, inspecting);

    // Screen: last reading and counts per caliber.
    if (u >= RESET || lastRead < 0) setText(readText, '—');
    else {
      const f = FRUITS[lastRead];
      const cal = 3 - SIZES.indexOf(f.d);
      setText(readText, f.bad ? `Ø ${mmOf(f.d)} mm · ${tr('DEFECTO', 'BLEMISH')}` : `Ø ${mmOf(f.d)} mm → ${tr('CAL', 'SIZE')} ${cal}`);
    }
    counts.forEach((el, i) => setText(el, String(u >= RESET ? 0 : landed[i])));

    const total = landed.reduce((a, b) => a + b, 0);
    if (u >= RESET || (total + culled === FRUITS.length && u > START + FRUITS.length * SPAWN))
      h.say(tr(`Lote 0412 · ${total} calibradas · ${culled} destrío`, `Lot 0412 · ${total} graded · ${culled} culled`));
    else if (lastRead < 0) h.say(tr('Socio 118 · parcela 7 · entrando', 'Grower 118 · field 7 · feeding'));
    else {
      const f = FRUITS[lastRead];
      h.say(
        f.bad
          ? tr(`Pieza ${lastRead + 1} · defecto · al destrío`, `Piece ${lastRead + 1} · blemish · culled`)
          : tr(`Pieza ${lastRead + 1} · Ø ${mmOf(f.d)} mm · calibre ${3 - SIZES.indexOf(f.d)}`, `Piece ${lastRead + 1} · Ø ${mmOf(f.d)} mm · size ${3 - SIZES.indexOf(f.d)}`),
      );
    }
  };
  return { apply, still: 8.6 };
};

export default create;
