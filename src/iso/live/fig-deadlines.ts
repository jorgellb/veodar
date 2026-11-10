import { iso, pathOf, segment, translateAlong } from '../iso-kit.mjs';
import { isEn, tr, ease, helpers, lerp, pulse, span, type Factory, type Proj, type Vec3 } from './runtime';

// One week on the belt. Remaining business days move only on working days.
const WEEK = [
  { es: 'LUN', en: 'MON', d: 0, work: true },
  { es: 'MAR', en: 'TUE', d: 1, work: true },
  { es: 'MIÉ', en: 'WED', d: 2, work: true },
  { es: 'JUE', en: 'THU', d: 3, work: true },
  { es: 'VIE', en: 'FRI', d: 4, work: true },
  { es: 'SÁB', en: 'SAT', d: 5, work: false },
  { es: 'DOM', en: 'SUN', d: 6, work: false },
  { es: 'LUN', en: 'MON', d: 0, work: true },
];
const LONG: Record<string, [string, string]> = {
  LUN: ['Lunes', 'Monday'],
  MAR: ['Martes', 'Tuesday'],
  MIÉ: ['Miércoles', 'Wednesday'],
  JUE: ['Jueves', 'Thursday'],
  VIE: ['Viernes', 'Friday'],
  SÁB: ['Sábado', 'Saturday'],
  DOM: ['Domingo', 'Sunday'],
};
const START = 0.6;
const DAY = 1.7;
const SHIFT = 0.5;
const NOTICE = { day: 1, print: [0.25, 0.85], join: [0.9, 1.4], term: 5 };
// Files on the belt: business days left at the start of the week.
const FILES = [
  { rem: 1, from: 0 },
  { rem: 3, from: 0 },
  { rem: 7, from: 0 },
  { rem: 8, from: 0 },
  { rem: NOTICE.term, from: NOTICE.day },
];
const RESET = START + WEEK.length * DAY + 0.2;
const CYCLE = RESET + 0.8;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const { rail: RAIL, box: BOX } = M;
  const items = h.qa('[data-stack] > [data-item]');
  const folders = h.qa('[data-folder]');
  const tabs = h.qa('[data-tab]');
  const stamp = h.q('[data-part="stamp"]');
  const notice = h.q('[data-part="notice"]');
  const inbox = h.q('[data-part="inbox"]');
  const weekday = [0, 1, 2, 3, 4, 5, 6].map((i) => h.q(`[data-part="wd${i}"]`));
  const dayText = h.q<SVGTextElement>('[data-part="day"]');
  const kindText = h.q<SVGTextElement>('[data-part="kind"]');
  const eventText = h.q<SVGTextElement>('[data-part="event"]');
  const ids: string[] = M.folders;
  const setText = (el: SVGTextElement, text: string) => {
    if (el.textContent !== text) el.textContent = text;
  };
  const dayStart = (d: number) => START + d * DAY;
  const shiftOf = (d: number, u: number) => (WEEK[d].work ? ease(span(u, dayStart(d), dayStart(d) + SHIFT)) : 0);
  // Remaining business days for file f, continuous while the belt moves.
  const remaining = (f: number, u: number) => {
    let r = FILES[f].rem;
    for (let d = Math.max(1, FILES[f].from + 1); d < WEEK.length; d++) r -= shiftOf(d, u);
    return Math.max(0, r);
  };
  // The working day on which file f reaches today, or -1.
  const dueDay = (f: number) => {
    let r = FILES[f].rem;
    for (let d = FILES[f].from + 1; d < WEEK.length; d++) if (WEEK[d].work && --r === 0) return d;
    return -1;
  };
  const due = FILES.map((_, f) => dueDay(f));

  let paperKey = '';
  const apply = (t: number) => {
    const u = t % CYCLE;
    const fade = 1 - span(u, RESET, RESET + 0.6);
    const day = Math.min(WEEK.length - 1, Math.max(0, Math.floor((u - START) / DAY)));
    const w = WEEK[day];
    const s = u - dayStart(day);

    // Files on the belt, stamped and dropped once they reach today.
    const keys = new Map<Element, Vec3>();
    let stamping = 0;
    let filedToday = -1;
    FILES.forEach((file, f) => {
      const el = folders[f];
      let alpha = fade;
      let x = RAIL.first + remaining(f, u) * RAIL.slot;
      let dy = 0;
      let dz = 0;
      if (file.from > 0) {
        const t0 = dayStart(file.from);
        const join = span(u, t0 + NOTICE.join[0], t0 + NOTICE.join[1]);
        if (u < t0 + NOTICE.join[0]) alpha = 0;
        alpha *= Math.min(1, join * 2);
        dz = (1 - ease(join)) * 14;
      }
      if (due[f] >= 0) {
        const t0 = dayStart(due[f]) + SHIFT;
        stamping = Math.max(stamping, pulse(u, t0 + 0.1, t0 + 0.55, 0.12));
        if (u >= t0 && u < t0 + 1.2) filedToday = f;
        const drop = span(u, t0 + 0.65, t0 + 1.15);
        if (drop > 0) {
          x = lerp(RAIL.first, BOX.x + BOX.w / 2, ease(drop));
          dy = (BOX.y + BOX.d / 2 - (RAIL.y + RAIL.d / 2)) * drop;
          dz = -(RAIL.h - 1) * drop * drop;
        }
      }
      el.setAttribute('opacity', alpha.toFixed(2));
      el.setAttribute('transform', translateAlong(P, [x, dy, dz]));
      keys.set(items[f], [x, RAIL.y + RAIL.d / 2 + dy, RAIL.h + dz]);
      const r = remaining(f, u);
      h.on(tabs[f].firstElementChild, r > 0.01 && r <= 2.01, 'data-lit');
    });
    h.sort(keys);
    stamp.setAttribute('transform', translateAlong(P, [0, 0, 7 * (1 - stamping)]));

    // The court notice printed on Tuesday.
    const t1 = dayStart(NOTICE.day);
    const feed = u >= RESET ? 0 : ease(span(u, t1 + NOTICE.print[0], t1 + NOTICE.print[1])) * (1 - span(u, t1 + 1.2, t1 + 1.5));
    h.on(inbox, feed > 0.02);
    const pk = feed.toFixed(2);
    if (pk !== paperKey) {
      paperKey = pk;
      const p = M.paper;
      const topZ = p.z + feed * 12;
      const quad = [iso([p.x0, p.y, p.z], P), iso([p.x1, p.y, p.z], P), iso([p.x1, p.y, topZ], P), iso([p.x0, p.y, topZ], P)];
      let marks = '';
      [9.5, 6.5].forEach((z, i) => {
        if (topZ - p.z > z + 0.5) marks += segment([p.x0 + 1.4, p.y, topZ - z + 1], [p.x0 + 1.4 + [8, 5][i], p.y, topZ - z + 1], P);
      });
      notice.innerHTML = feed > 0.02 ? `<path d="${pathOf(quad, true)}" fill="#fffefb" stroke="var(--anatomy-mid)" stroke-width=".7"/>${marks ? `<path class="iso-line" data-tone="hi" d="${marks}"/>` : ''}` : '';
    }

    // Screen and weekday strip.
    const name = isEn() ? w.en : w.es;
    weekday.forEach((el, i) => h.on(el, u < RESET && i === w.d));
    setText(dayText, `${tr('HOY', 'TODAY')} · ${name}`);
    setText(kindText, w.work ? tr('HÁBIL', 'WORKDAY') : tr('INHÁBIL', 'NO COUNT'));
    const event =
      filedToday >= 0
        ? `${ids[filedToday]} ${tr('PRESENTADO', 'FILED')}`
        : day === NOTICE.day && s >= NOTICE.print[1]
          ? `2231 · +${NOTICE.term} ${tr('HÁBILES', 'BUSINESS DAYS')}`
          : !w.work
            ? tr('PLAZOS PARADOS', 'DEADLINES PAUSED')
            : '';
    setText(eventText, event);

    const longName = tr(LONG[w.es][0], LONG[w.es][1]);
    if (u >= RESET) h.say(tr('Semana cerrada · 2 presentados en plazo', 'Week closed · 2 filed on time'));
    else if (filedToday >= 0) h.say(tr(`${longName} · ${ids[filedToday]} vence hoy · presentado`, `${longName} · ${ids[filedToday]} due today · filed`));
    else if (day === NOTICE.day && s >= NOTICE.print[0]) h.say(tr(`${longName} · notificación 2231 · ${NOTICE.term} días hábiles`, `${longName} · notice 2231 · ${NOTICE.term} business days`));
    else if (!w.work) h.say(tr(`${longName} · inhábil, el plazo no corre`, `${longName} · no business day, no countdown`));
    else h.say(tr(`${longName} · ${FILES.filter((_, f) => remaining(f, u) > 0.01).length} expedientes en plazo`, `${longName} · ${FILES.filter((_, f) => remaining(f, u) > 0.01).length} files on track`));
  };
  return { apply, still: dayStart(1) + 1.0 };
};

export default create;
