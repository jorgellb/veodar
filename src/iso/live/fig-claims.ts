import { depthOf, iso, lineOnTop, pathOf, segment, slabOf, solidSvg } from '../iso-kit.mjs';
import { tr, ease, helpers, lerp, span, type Factory, type Proj, type Vec3 } from './runtime';

// Two claims per loop. The first matches its policy; the second finds it lapsed.
const CLAIMS = [
  { no: '0912', card: 5, start: 0.5, ok: true },
  { no: '0913', card: 12, start: 7.4, ok: false },
];
// Offsets inside one claim.
const STEP = { arrive: [0, 0.9], spin: [1.5, 3.6], checks: [3.9, 4.4, 4.9], file: [5.4, 6.1] };
const RESET = 14;
const CYCLE = 15;
const TAU = Math.PI * 2;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const { ax: AX, card: CARD, mail: MAIL, pad: PAD, folder: FOLDER, review: REVIEW, env: ENV } = M;
  const cards = h.q('[data-part="cards"]');
  const scan = h.q('[data-part="scan"]');
  const envs = h.q('[data-part="envs"]');
  const lamps = [0, 1, 2].map((i) => h.q(`[data-part="c${i}"]`));
  const claimText = h.q<SVGTextElement>('[data-part="claim"]');
  const polText = h.q<SVGTextElement>('[data-part="pol"]');
  const f1 = h.q<SVGTextElement>('[data-part="f1"]');
  const f2 = h.q<SVGTextElement>('[data-part="f2"]');
  const N: number = CARD.n;
  const theta = (k: number) => (k * TAU) / N;
  const setText = (el: SVGTextElement, text: string) => {
    if (el.textContent !== text) el.textContent = text;
  };

  // Drum angle: the loop starts with the second claim's card on top, so the end
  // of one loop is the start of the next.
  const mod = (a: number) => ((a % TAU) + TAU) % TAU;
  const psi0 = Math.PI / 2 - theta(CLAIMS[1].card);
  const dA = mod(theta(CLAIMS[1].card) - theta(CLAIMS[0].card)) + 2 * TAU;
  const dB = mod(theta(CLAIMS[0].card) - theta(CLAIMS[1].card)) + 2 * TAU;
  const drumAt = (u: number) => {
    const a = ease(span(u, CLAIMS[0].start + STEP.spin[0], CLAIMS[0].start + STEP.spin[1]));
    const b = ease(span(u, CLAIMS[1].start + STEP.spin[0], CLAIMS[1].start + STEP.spin[1]));
    return psi0 + dA * a + dB * b;
  };

  // Cards lying flat catch the light; cards on edge read a shade darker.
  const shadeOf = (phi: number) => {
    const f = Math.abs(Math.cos(phi));
    const mix = (a: number, b: number) => Math.round(a + (b - a) * f).toString(16).padStart(2, '0');
    return `#${mix(0xff, 0xec)}${mix(0xfe, 0xe6)}${mix(0xfb, 0xd8)}`;
  };
  const cardPath = (k: number, phi: number, lit: boolean) => {
    const at = (x: number, r: number) => iso([x, AX.y + r * Math.cos(phi), AX.z + r * Math.sin(phi)], P);
    const tab = CARD.x0 + 2 + (k % 4) * 8;
    const outline = [
      [CARD.x0, CARD.r0],
      [CARD.x1, CARD.r0],
      [CARD.x1, CARD.r1],
      [tab + 8, CARD.r1],
      [tab + 7, CARD.r1 + 3],
      [tab + 1, CARD.r1 + 3],
      [tab, CARD.r1],
      [CARD.x0, CARD.r1],
    ].map(([x, r]) => at(x, r));
    const lines = [12, 15.5, 19].map((r, i) => pathOf([at(CARD.x0 + 3, r), at(CARD.x0 + 3 + [22, 14, 18][i], r)])).join('');
    return (
      `<path d="${pathOf(outline, true)}" fill="${lit ? '#ffd9c7' : shadeOf(phi)}" stroke="${lit ? '#ff5a1f' : 'var(--anatomy-mid)'}" stroke-width="${lit ? 1.1 : 0.7}" vector-effect="non-scaling-stroke"/>` +
      `<path d="${lines}" fill="none" stroke="var(--anatomy-lo)" stroke-width=".6" vector-effect="non-scaling-stroke"/>`
    );
  };

  // Where claim i's envelope is at loop time u, or null before it arrives.
  const envAt = (i: number, u: number): { at: Vec3; alpha: number } | null => {
    const c = CLAIMS[i];
    const s = u - c.start;
    if (s < 0) return null;
    const padAt: Vec3 = [PAD.x + PAD.w / 2 + 2, PAD.y + PAD.d / 2, PAD.h];
    const a = span(s, STEP.arrive[0], STEP.arrive[1]);
    if (a < 1) return { at: [lerp(MAIL.x + MAIL.w + 2, padAt[0], ease(a)), padAt[1], padAt[2]], alpha: Math.min(1, a * 3) };
    const dest: Vec3 = c.ok ? [FOLDER.x + FOLDER.w / 2, FOLDER.y + FOLDER.d / 2 + 1, 1] : [REVIEW.x + REVIEW.w / 2, REVIEW.y + REVIEW.d / 2, 1];
    const f = ease(span(s, STEP.file[0], STEP.file[1]));
    return { at: [lerp(padAt[0], dest[0], f), lerp(padAt[1], dest[1], f), lerp(padAt[2], dest[2], f) + Math.sin(Math.PI * f) * 18], alpha: 1 };
  };
  const envelope = ([x, y, z]: Vec3, lit: boolean) => {
    const plan = { x: x - ENV.w / 2, y: y - ENV.d / 2, w: ENV.w, d: ENV.d, r: 0.4 };
    const top = z + ENV.h;
    return (
      solidSvg(slabOf(plan, z, ENV.h, P, 2, 0), { tone: 'hi', crease: 'lo', lit }) +
      `<path class="iso-line" data-tone="mid" d="${lineOnTop([plan.x + 0.6, plan.y + 0.6], [x, y + 1], top, P)}${lineOnTop([x, y + 1], [plan.x + ENV.w - 0.6, plan.y + 0.6], top, P)}"/>`
    );
  };

  let drumKey = '';
  let envKey = '';
  const apply = (t: number) => {
    const u = t % CYCLE;
    const fade = 1 - span(u, RESET, RESET + 0.6);

    // Which claim is on stage, and what the checks say.
    const active = u >= CLAIMS[1].start ? 1 : u >= CLAIMS[0].start ? 0 : -1;
    const c = active >= 0 ? CLAIMS[active] : null;
    const s = c ? u - c.start : -1;
    const onTop = !!c && s >= STEP.spin[1] && u < RESET;

    // Drum and cards, painted back to front.
    const psi = drumAt(u);
    const key = `${psi.toFixed(3)}|${onTop ? c!.card : -1}`;
    if (key !== drumKey) {
      drumKey = key;
      const list = Array.from({ length: N }, (_, k) => {
        const phi = theta(k) + psi;
        const mid = (CARD.r0 + CARD.r1) / 2;
        return { k, phi, d: depthOf([(CARD.x0 + CARD.x1) / 2, AX.y + mid * Math.cos(phi), AX.z + mid * Math.sin(phi)], P) };
      }).sort((a, b) => a.d - b.d);
      cards.innerHTML = list.map(({ k, phi }) => cardPath(k, phi, onTop && k === c!.card)).join('');
    }

    // Scan line under the reader bridge while an envelope passes beneath it.
    const scanning = !!c && s >= 0.05 && s < 0.6;
    scan.innerHTML = scanning
      ? `<path class="iso-line" data-tone="red" style="stroke-width:1.4px" d="${segment([PAD.x + 3.1, PAD.y + 0.6, PAD.h + ENV.h + 0.05], [PAD.x + 3.1, PAD.y + PAD.d - 0.6, PAD.h + ENV.h + 0.05], P)}"/><path class="iso-line" data-tone="red" style="stroke-opacity:.35" d="${segment([PAD.x + 3.1, PAD.y + PAD.d / 2, 12], [PAD.x + 3.1, PAD.y + 2, PAD.h + 1], P)}${segment([PAD.x + 3.1, PAD.y + PAD.d / 2, 12], [PAD.x + 3.1, PAD.y + PAD.d - 2, PAD.h + 1], P)}"/>`
      : '';

    // Envelopes: in flight, then resting in the folder or the review tray.
    const placed = CLAIMS.map((_, i) => envAt(i, u));
    const ek = placed.map((p) => (p ? p.at.map((v) => v.toFixed(1)).join(',') + p.alpha.toFixed(2) : '-')).join(';') + fade.toFixed(2);
    if (ek !== envKey) {
      envKey = ek;
      envs.innerHTML = placed
        .map((p, i) => (p ? `<g opacity="${(p.alpha * fade).toFixed(2)}">${envelope(p.at, active === i && s < STEP.file[0])}</g>` : ''))
        .join('');
    }

    // Comparator lamps and screens.
    lamps.forEach((el, i) => {
      const lit = !!c && u < RESET && s >= STEP.checks[i];
      const fails = !!c && !c.ok;
      if (fails && i > 0) {
        h.on(el, false);
        h.on(el, false, 'data-err');
        return;
      }
      el.setAttribute('data-tone', 'ok');
      h.on(el, lit && !fails);
      h.on(el, lit && fails, 'data-err');
    });
    const pol = c ? (c.ok ? tr('40-2213 · HOGAR', '40-2213 · HOME') : tr('40-1187 · AUTO', '40-1187 · AUTO')) : '—';
    setText(claimText, c && u < RESET ? `${tr('PARTE', 'CLAIM')} ${c.no}` : '—');
    setText(polText, onTop ? pol : '—');
    setText(f1, !onTop ? '' : c!.ok ? (s >= STEP.checks[1] ? tr('Agua ✓', 'Water ✓') : '') : s >= STEP.checks[0] ? tr('Vencida', 'Lapsed') : '');
    setText(f2, onTop && c!.ok && s >= STEP.checks[2] ? tr('Franq. 150 €', 'Deduct. €150') : '');

    if (u >= RESET || !c) {
      h.say(u >= RESET ? tr('2 partes · 1 listo · 1 a revisión', '2 claims · 1 ready · 1 to review') : tr('Buzón de partes · esperando', 'Claims inbox · waiting'));
    } else if (s < STEP.spin[0]) h.say(tr(`Parte ${c.no} · leyendo la póliza`, `Claim ${c.no} · reading the policy`));
    else if (s < STEP.spin[1]) h.say(tr(`Buscando la póliza ${c.ok ? '40-2213' : '40-1187'}`, `Finding policy ${c.ok ? '40-2213' : '40-1187'}`));
    else if (!c.ok) h.say(tr('Póliza 40-1187 vencida · a revisión', 'Policy 40-1187 lapsed · to review'));
    else if (s < STEP.file[0]) h.say(tr('Vigente · agua cubierta · franq. 150 €', 'In force · water covered · €150 deduct.'));
    else h.say(tr(`Expediente ${c.no} listo para tramitar`, `File ${c.no} ready for the handler`));
  };
  return { apply, still: 5.2 };
};

export default create;
