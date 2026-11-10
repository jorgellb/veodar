import { cylinder, iso, pathOf, segment, slabOf, solidSvg } from '../iso-kit.mjs';
import { tr, ease, helpers, lerp, span, type Factory, type Proj, type Vec3 } from './runtime';

// Eight sessions, four students. Student 04 misses three and ends at 62.5 %.
const PRESENT = [
  [1, 1, 1, 1],
  [1, 1, 1, 0],
  [1, 1, 1, 1],
  [1, 0, 1, 0],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 0, 1],
  [1, 1, 1, 0],
];
const N = PRESENT.length;
const START = 0.6;
const EACH = 1.1;
const SWEEP = 0.8;
const VERDICT = START + N * EACH + 0.3;
const PRINT = (j: number) => [VERDICT + 0.5 + j * 1.0, VERDICT + 1.1 + j * 1.0];
const RESET = 13.4;
const CYCLE = 14.2;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const { rack: RACK, cards: CARDS, card: CARD, clock: CLOCK, tubes: TUBES, min: MIN, tray: TRAY } = M;
  const reader = h.q('[data-part="reader"]');
  const hands = h.q('[data-part="hands"]');
  const feed = h.q('[data-part="feed"]');
  const certs = h.q('[data-part="certs"]');
  const tick = h.q('[data-part="tick"]');
  const print = h.q('[data-part="print"]');
  const sessText = h.q<SVGTextElement>('[data-part="sess"]');
  const leds = h.qa('[data-led]');
  const liquids = [0, 1, 2, 3].map((i) => h.q(`[data-liquid="${i}"]`));
  const passLamps = [0, 1, 2, 3].map((i) => h.q(`[data-part="pass${i}"]`));
  const totals = [0, 1, 2, 3].map((i) => PRESENT.reduce((s, row) => s + row[i], 0) / N);
  const passing = [0, 1, 2, 3].filter((i) => totals[i] >= MIN);
  const failing = [0, 1, 2, 3].filter((i) => totals[i] < MIN);
  const setText = (el: SVGTextElement, text: string) => {
    if (el.textContent !== text) el.textContent = text;
  };
  // When the reader head passes each card within a sweep.
  const passAt = (k: number, i: number) => START + k * EACH + ((CARDS[i] - (RACK.x0 + 2)) / (RACK.x1 - 2 - (RACK.x0 + 2))) * SWEEP;

  let levelKey = '';
  let readerKey = '';
  let paperKey = '';
  const apply = (t: number) => {
    const u = t % CYCLE;
    const fade = 1 - span(u, RESET, RESET + 0.6);
    const k = Math.min(N - 1, Math.max(0, Math.floor((u - START) / EACH)));
    const inSession = u >= START && u < START + N * EACH;
    const s = u - (START + k * EACH);
    const done = u < START ? 0 : Math.min(N, Math.floor((u - START) / EACH) + (s >= SWEEP ? 1 : 0));

    // Reader head sweeping the rail, with its light line on the cards.
    const sweep = inSession ? span(s, 0, SWEEP) : 0;
    const rx = lerp(RACK.x0 + 2, RACK.x1 - 2, ease(sweep));
    const rk = rx.toFixed(1) + (inSession && sweep > 0 && sweep < 1);
    if (rk !== readerKey) {
      readerKey = rk;
      let svg = solidSvg(slabOf({ x: rx - 3, y: RACK.face + 0.4, w: 6, d: 4.4, r: 0.6 }, RACK.z + 2.4, 4, P, 2, 0.3), { tone: 'hi', crease: 'lo', lit: inSession && sweep > 0 && sweep < 1 });
      if (inSession && sweep > 0 && sweep < 1) {
        svg += `<path class="iso-line" data-tone="red" style="stroke-width:1.3px" d="${segment([rx, RACK.face + 1.4, RACK.z + 2.4], [rx, RACK.face + 1.4, CARD.z - 1], P)}"/>`;
      }
      reader.innerHTML = svg;
    }

    // LEDs under the cards: lit once the reader has seen the student this session.
    leds.forEach((el, i) => {
      const seen = inSession && PRESENT[k][i] === 1 && u >= passAt(k, i);
      el.setAttribute('data-t', seen ? 'acc' : '');
    });
    h.on(tick, inSession && s < 0.25);

    // Tube levels: one step per attended session, rising as the reader passes.
    const levels = [0, 1, 2, 3].map((i) =>
      u >= RESET ? totals[i] * fade : PRESENT.reduce((sum, row, kk) => sum + (row[i] ? ease(span(u, passAt(kk, i), passAt(kk, i) + 0.35)) : 0), 0) / N,
    );
    const lk = levels.map((v) => v.toFixed(3)).join();
    if (lk !== levelKey) {
      levelKey = lk;
      liquids.forEach((el, i) => {
        const hgt = TUBES.h * levels[i];
        el.innerHTML = hgt > 0.2 ? solidSvg(cylinder(TUBES.xs[i], TUBES.y, TUBES.r - 0.8, TUBES.z0, hgt, P, 24), { tone: 'hi', crease: 'lo' }) : '';
      });
    }

    // Clock: the hour hand advances one hour per session, from nine o'clock.
    const frac = inSession ? done + span(s, 0, SWEEP) : done;
    const hourA = ((9 + frac) / 12) * Math.PI * 2;
    const minA = frac * Math.PI * 2;
    const hand = (a: number, r: number) => segment([CLOCK.x, CLOCK.y + 0.1, CLOCK.z], [CLOCK.x + Math.sin(a) * r, CLOCK.y + 0.1, CLOCK.z + Math.cos(a) * r], P);
    const [cx, cy] = iso([CLOCK.x, CLOCK.y + 0.1, CLOCK.z], P);
    hands.innerHTML = `<path class="iso-line" data-tone="hi" style="stroke-width:1.8px" d="${hand(hourA, 5.6)}"/><path class="iso-line" data-tone="lit" style="stroke-width:1.2px" d="${hand(minA, 8.4)}"/><circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="1" fill="var(--anatomy-hi)"/>`;
    setText(sessText, `${tr('SESIÓN', 'SESSION')} ${u >= RESET ? 0 : done}/${N}`);

    // Verdict lamps and certificates.
    const judged = u >= VERDICT && u < RESET;
    passLamps.forEach((el, i) => {
      el.setAttribute('data-tone', 'ok');
      h.on(el, judged && totals[i] >= MIN);
      h.on(el, judged && totals[i] < MIN && Math.floor(u * 3) % 2 === 0, 'data-err');
    });
    const printing = passing.findIndex((_, j) => u >= PRINT(j)[0] && u < PRINT(j)[1] + 0.3);
    const f = printing >= 0 ? ease(span(u, PRINT(printing)[0], PRINT(printing)[1])) : 0;
    h.on(print, printing >= 0);
    const landed = u >= RESET ? 0 : passing.filter((_, j) => u >= PRINT(j)[1] + 0.3).length;
    const pk = `${f.toFixed(2)}|${landed}|${fade.toFixed(2)}`;
    if (pk !== paperKey) {
      paperKey = pk;
      const p = M.paper;
      const topZ = p.z + f * 16;
      const quad: number[][] = [iso([p.x0, p.y, p.z], P), iso([p.x1, p.y, p.z], P), iso([p.x1, p.y, topZ], P), iso([p.x0, p.y, topZ], P)];
      const [sx, sy] = iso([(p.x0 + p.x1) / 2, p.y, topZ - 5], P);
      feed.innerHTML =
        f > 0.02
          ? `<path d="${pathOf(quad, true)}" fill="#fffefb" stroke="var(--anatomy-mid)" stroke-width=".7"/>${topZ - p.z > 7 ? `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="1.8" fill="#ff5a1f"/>` : ''}`
          : '';
      let stack = '';
      for (let j = 0; j < landed; j++) {
        const z = 1 + j * 0.8;
        const plan = { x: TRAY.x + 4 + j * 0.6, y: TRAY.y + 3 - j * 0.4, w: 18, d: 12, r: 0.3 };
        stack += solidSvg(slabOf(plan, z, 0.6, P, 1, 0), { tone: 'hi', crease: 'lo' });
        const [ax, ay] = iso([plan.x + 13.6, plan.y + 8.6, z + 0.6], P);
        stack += `<circle cx="${ax.toFixed(1)}" cy="${ay.toFixed(1)}" r="1.6" fill="#ff5a1f"/>`;
      }
      certs.innerHTML = `<g opacity="${fade.toFixed(2)}">${stack}</g>`;
    }

    const pct = (v: number) => `${Math.round(v * 1000) / 10}`.replace('.', tr(',', '.'));
    if (u >= RESET || u < START) h.say(tr('Curso nuevo · 4 alumnos · mínimo 75 %', 'New course · 4 students · 75% minimum'));
    else if (inSession) {
      const n = PRESENT[k].reduce((a, b) => a + b, 0);
      h.say(tr(`Sesión ${k + 1}/${N} · ${n} de 4 presentes`, `Session ${k + 1}/${N} · ${n} of 4 present`));
    } else if (u < VERDICT + 0.5) h.say(tr('Curso cerrado · calculando asistencia', 'Course closed · computing attendance'));
    else
      h.say(
        tr(
          `${landed} certificados · aviso: 0${failing[0] + 1} al ${pct(totals[failing[0]])} %`,
          `${landed} certificates · alert: 0${failing[0] + 1} at ${pct(totals[failing[0]])}%`,
        ),
      );
  };
  return { apply, still: VERDICT + 2.2 };
};

export default create;
