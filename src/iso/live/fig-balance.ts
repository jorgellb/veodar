import { cylinder, iso, lineOnTop, pathOf, ring, segment, slabOf, solidSvg, translateAlong } from '../iso-kit.mjs';
import { isEn, tr, ease, helpers, lerp, span, type Factory, type Proj, type Vec3 } from './runtime';

// Four bank transactions and their invoices. The third one is short by 10.
const PAIRS = [
  { mov: 1210, fra: 1210, no: '2231' },
  { mov: 845.5, fra: 845.5, no: '2232' },
  { mov: 2000, fra: 1990, no: '2240' },
  { mov: 312.4, fra: 312.4, no: '2241' },
];
const START = 0.6;
const EACH = 3.2;
const T = { ticket: [0, 0.8], invoice: [0.2, 1.0], verdict: 2.0, out: [2.3, 3.0] };
const RESET = 13.6;
const CYCLE = 14.4;
const DEG = Math.PI / 180;
const LEFT_ONLY = 12 * DEG; // tilt with only the transaction on the scale
const PER_EURO = 1 * DEG;
const MAX_TILT = 10 * DEG;
// Beam dynamics: an underdamped balance, summed over each change of load.
const W0 = 7;
const ZETA = 0.24;
const WD = W0 * Math.sqrt(1 - ZETA * ZETA);
const step = (tau: number) => (tau <= 0 ? 0 : 1 - Math.exp(-ZETA * W0 * tau) * (Math.cos(WD * tau) + ((ZETA * W0) / WD) * Math.sin(WD * tau)));

const money = (v: number) =>
  isEn()
    ? `€${v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : `${v.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true })} €`;
const settled = (p: (typeof PAIRS)[number]) => Math.sign(p.mov - p.fra) * Math.min(MAX_TILT, Math.abs(p.mov - p.fra) * PER_EURO);

// Convex hull of screen points, for the beam's outline.
function hull(points: number[][]) {
  const pts = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: number[], a: number[], b: number[]) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const half = (list: number[][]) => {
    const out: number[][] = [];
    for (const p of list) {
      while (out.length >= 2 && cross(out[out.length - 2], out[out.length - 1], p) <= 0) out.pop();
      out.push(p);
    }
    return out;
  };
  const lower = half(pts);
  const upper = half([...pts].reverse());
  return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const { bal: BAL, sc: SC } = M;
  const pans = h.q('[data-part="pans"]');
  const items = h.q('[data-part="items"]');
  const beam = h.q('[data-part="beam"]');
  const needle = h.q('[data-part="needle"]');
  const okLamp = h.q('[data-part="okl"]');
  const revLamp = h.q('[data-part="revl"]');
  const movText = h.q<SVGTextElement>('[data-part="mov"]');
  const fraLabel = h.q<SVGTextElement>('[data-part="fral"]');
  const fraText = h.q<SVGTextElement>('[data-part="fra"]');
  const difText = h.q<SVGTextElement>('[data-part="dif"]');
  const setText = (el: SVGTextElement, text: string) => {
    if (el.textContent !== text) el.textContent = text;
  };

  // Pieces built once at the origin and moved with transforms.
  const panSvg = solidSvg(cylinder(0, 0, 10, 0, 1.2, P, 32, 0.3), { tone: 'hi', crease: 'lo' }) + `<path class="iso-line" data-tone="lo" d="${ring(0, 0, 7.6, 1.2, P, 32)}"/>`;
  const ticketSvg =
    solidSvg(slabOf({ x: -6, y: -3.5, w: 12, d: 7, r: 0.3 }, 0, 0.5, P, 1, 0), { tone: 'hi', crease: 'lo' }) +
    `<path class="iso-line" data-tone="mid" d="${lineOnTop([-4.6, -1.4], [3, -1.4], 0.5, P)}${lineOnTop([-4.6, 0.6], [1, 0.6], 0.5, P)}${lineOnTop([-4.6, 2.2], [4.4, 2.2], 0.5, P)}"/>`;
  const invoiceSvg =
    solidSvg(slabOf({ x: -6, y: -4.5, w: 12, d: 9, r: 0.3 }, 0, 0.6, P, 1, 0), { tone: 'hi', crease: 'lo', lit: true }) +
    `<path class="iso-line" data-tone="mid" d="${lineOnTop([-4.6, -2.8], [0, -2.8], 0.6, P)}${lineOnTop([-4.6, -0.6], [4.4, -0.6], 0.6, P)}${lineOnTop([-4.6, 1.2], [4.4, 1.2], 0.6, P)}${lineOnTop([1, 3], [4.4, 3], 0.6, P)}"/>`;
  pans.innerHTML = `<g data-pan="l">${panSvg}</g><g data-pan="r">${panSvg}</g><g data-part="strings"></g>`;
  const panL = h.q('[data-pan="l"]');
  const panR = h.q('[data-pan="r"]');
  const strings = h.q('[data-part="strings"]');

  const tiltAt = (u: number) => {
    let theta = 0;
    PAIRS.forEach((p, i) => {
      const t0 = START + i * EACH;
      const target = settled(p);
      theta += LEFT_ONLY * step(u - (t0 + T.ticket[1])) + (target - LEFT_ONLY) * step(u - (t0 + T.invoice[1])) - target * step(u - (t0 + T.out[0]));
    });
    return theta;
  };

  // The beam: an oriented box, its visible faces found by their screen winding.
  const beamSvg = (theta: number) => {
    const c: Vec3 = [0, BAL.y, BAL.pivotZ];
    const a: Vec3 = [Math.cos(theta), 0, Math.sin(theta)];
    const u: Vec3 = [0, 1, 0];
    const v: Vec3 = [-Math.sin(theta), 0, Math.cos(theta)];
    const half = [BAL.L + 2, 1.4, 1.6];
    const pt = (sa: number, su: number, sv: number) => {
      const p: Vec3 = [0, 1, 2].map((i) => c[i] + a[i] * sa * half[0] + u[i] * su * half[1] + v[i] * sv * half[2]) as Vec3;
      return iso(p, P);
    };
    // Faces as [corners counter-clockwise seen from outside, normal].
    const faces: [number[][], Vec3][] = [
      [[pt(-1, -1, 1), pt(1, -1, 1), pt(1, 1, 1), pt(-1, 1, 1)], v],
      [[pt(-1, 1, -1), pt(-1, 1, 1), pt(1, 1, 1), pt(1, 1, -1)], u],
      [[pt(1, -1, -1), pt(1, 1, -1), pt(1, 1, 1), pt(1, -1, 1)], a],
      [[pt(-1, -1, -1), pt(-1, -1, 1), pt(-1, 1, 1), pt(-1, 1, -1)], [-a[0], 0, -a[2]]],
      [[pt(-1, -1, -1), pt(1, -1, -1), pt(1, -1, 1), pt(-1, -1, 1)], [0, -1, 0]],
      [[pt(-1, -1, -1), pt(-1, 1, -1), pt(1, 1, -1), pt(1, -1, -1)], [-v[0], 0, -v[2]]],
    ];
    const area = (q: number[][]) => q.reduce((s, p, i) => s + p[0] * q[(i + 1) % q.length][1] - q[(i + 1) % q.length][0] * p[1], 0);
    const sign = Math.sign(area(faces[0][0])); // the top is always in view
    const shown = faces.filter(([q]) => Math.sign(area(q)) === sign);
    const shades = ['', '', '', ''];
    let top = '';
    for (const [q, n] of shown) {
      const d = pathOf(q, true);
      if (n[2] > 0.7) top += d;
      else shades[Math.abs(n[1]) > Math.abs(n[0]) ? 2 : 1] += d;
    }
    const all = shown.flatMap(([q]) => q);
    const paths = { fill: pathOf(hull(all), true), outline: pathOf(hull(all), true), top, shades, crease: shown.map(([q]) => pathOf(q, true)).join('') };
    const ends = [-1, 1].map((s) => iso([c[0] + a[0] * s * BAL.L, c[1], c[2] + a[2] * s * BAL.L], P));
    return solidSvg(paths, { tone: 'hi', crease: 'faint' }) + `<circle cx="${ends[0][0].toFixed(1)}" cy="${ends[0][1].toFixed(1)}" r="1" fill="var(--anatomy-hi)"/><circle cx="${ends[1][0].toFixed(1)}" cy="${ends[1][1].toFixed(1)}" r="1" fill="var(--anatomy-hi)"/>`;
  };

  let beamKey = '';
  let itemKey = '';
  const apply = (t: number) => {
    const u = t % CYCLE;
    const fade = 1 - span(u, RESET, RESET + 0.6);
    const theta = u >= RESET ? tiltAt(u) * fade : tiltAt(u);

    // Beam ends and pans.
    // Positive tilt: the left (transaction) side goes down.
    const endL: Vec3 = [-BAL.L * Math.cos(theta), BAL.y, BAL.pivotZ - BAL.L * Math.sin(theta)];
    const endR: Vec3 = [BAL.L * Math.cos(theta), BAL.y, BAL.pivotZ + BAL.L * Math.sin(theta)];
    const panAt = (e: Vec3): Vec3 => [e[0], e[1], e[2] - BAL.hang];
    const pl = panAt(endL);
    const pr = panAt(endR);
    const bk = theta.toFixed(4);
    if (bk !== beamKey) {
      beamKey = bk;
      panL.setAttribute('transform', translateAlong(P, pl));
      panR.setAttribute('transform', translateAlong(P, pr));
      const rim = (e: Vec3, p: Vec3) =>
        [90, 210, 330]
          .map((deg) => segment(e, [p[0] + Math.cos(deg * (Math.PI / 180)) * 8.6, p[1] + Math.sin(deg * (Math.PI / 180)) * 8.6, p[2] + 1.2], P))
          .join('');
      strings.innerHTML = `<path class="iso-line" data-tone="mid" d="${rim(endL, pl)}${rim(endR, pr)}"/>`;
      beam.innerHTML = beamSvg(theta);
      const tip = [Math.sin(theta) * (SC.r1 - 0.6), SC.y + 0.4, SC.z - Math.cos(theta) * (SC.r1 - 0.6)] as Vec3;
      needle.innerHTML = `<path class="iso-line" data-tone="lit" style="stroke-width:1.4px" d="${segment([0, SC.y + 0.4, SC.z - 2], tip, P)}"/><circle cx="${iso([0, SC.y + 0.4, SC.z - 2], P)[0].toFixed(1)}" cy="${iso([0, SC.y + 0.4, SC.z - 2], P)[1].toFixed(1)}" r="1.4" fill="var(--anatomy-hi)"/>`;
    }

    // Tickets and invoices: in flight, on the pans, then off to the ledger or review.
    const parts: string[] = [];
    let active = -1;
    PAIRS.forEach((p, i) => {
      const s = u - (START + i * EACH);
      if (s < 0 || u >= RESET + 0.6) return;
      active = i;
      const match = p.mov === p.fra;
      const dest: Vec3 = match ? [M.book.x, M.book.y, M.book.z] : [M.review.x, M.review.y, M.review.z];
      const place = (from: Vec3, on: Vec3, win: number[], side: number): Vec3 | null => {
        const fIn = span(s, win[0], win[1]);
        const fOut = span(s, T.out[0], T.out[1]);
        if (fOut > 0) {
          const e = ease(fOut);
          const d: Vec3 = [dest[0] + side * 3, dest[1] - side * 1, dest[2] + (side > 0 ? 0.6 : 0)];
          return [lerp(on[0], d[0], e), lerp(on[1], d[1], e), lerp(on[2], d[2], e) + Math.sin(Math.PI * e) * 14];
        }
        const e = ease(fIn);
        return [lerp(from[0], on[0], e), lerp(from[1], on[1], e), lerp(from[2], on[2], e) + Math.sin(Math.PI * e) * 16];
      };
      const tk = place([M.printer.x, M.printer.y, M.printer.z], [pl[0], pl[1], pl[2] + 1.2], T.ticket, -1);
      const iv = place([M.tray.x, M.tray.y, M.tray.z], [pr[0], pr[1], pr[2] + 1.2], T.invoice, 1);
      const gone = match ? 1 - span(s, T.out[1], T.out[1] + 0.4) : 1;
      if (gone <= 0) return;
      const alpha = (gone * fade).toFixed(2);
      if (tk && s >= T.ticket[0]) parts.push(`<g opacity="${alpha}" transform="${translateAlong(P, tk)}">${ticketSvg}</g>`);
      if (iv && s >= T.invoice[0]) parts.push(`<g opacity="${alpha}" transform="${translateAlong(P, iv)}">${invoiceSvg}</g>`);
    });
    const ik = parts.join('').length + ':' + u.toFixed(2);
    if (ik !== itemKey) {
      itemKey = ik;
      items.innerHTML = parts.join('');
    }

    // Screen and lamps.
    const p = active >= 0 && u < RESET ? PAIRS[active] : null;
    const s = p ? u - (START + active * EACH) : -1;
    setText(movText, p && s >= T.ticket[1] ? money(p.mov) : '—');
    setText(fraLabel, p ? `${tr('FRA', 'INV')} ${p.no}` : tr('FRA', 'INV'));
    setText(fraText, p && s >= T.invoice[1] ? money(p.fra) : '—');
    const judged = !!p && s >= T.verdict;
    setText(difText, judged ? money(Math.abs(p!.mov - p!.fra)) : '—');
    h.on(okLamp, judged && p!.mov === p!.fra);
    h.on(revLamp, judged && p!.mov !== p!.fra, 'data-err');

    if (u >= RESET || !p) {
      h.say(u >= RESET ? tr('3 conciliados · 1 a revisión', '3 reconciled · 1 to review') : tr('Conciliación · esperando movimiento', 'Reconciliation · waiting for a transaction'));
    } else if (!judged) h.say(tr(`${money(p.mov)} frente a fra. ${p.no}`, `${money(p.mov)} vs invoice ${p.no}`));
    else if (p.mov === p.fra) h.say(tr(`Cuadra · factura ${p.no} conciliada`, `Match · invoice ${p.no} reconciled`));
    else h.say(tr(`Diferencia de ${money(Math.abs(p.mov - p.fra))} · a revisión`, `${money(Math.abs(p.mov - p.fra))} difference · to review`));
  };
  return { apply, still: START + 2 * EACH + 2.2 };
};

export default create;
