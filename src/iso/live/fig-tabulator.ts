// Python: four cards per run. Each is cleaned and matched; the repeated one drops out.
import { lineOnTop } from '../iso-kit.mjs';
import { tr, ease, fade, helpers, lerp, polar, shift, span, write, type Factory, type Proj } from './runtime';

const RUN = 11.4;
const GAP = 1.4; // seconds between cards
const RIDE = 4.6; // seconds on the belt
const DUPLICATE = 2; // the third card repeats an earlier one

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const cards = h.qa('[data-card]').map((el) => ({ el, raw: el.querySelector('[data-part="raw"]'), tidy: el.querySelector('[data-part="tidy"]') }));
  const hand = h.q('[data-part="hand"]');
  const lamps = { clean: h.q('[data-part="clean"]'), cross: h.q('[data-part="cross"]'), timer: h.q('[data-part="timer"]') };
  const count = { ok: h.q('[data-part="n-ok"]'), dup: h.q('[data-part="n-dup"]'), bar: h.q('[data-part="bar"]') };
  const fullBar = Number(count.bar.getAttribute('width')) / 0.75;
  const T = M.timer;

  const apply = (t: number) => {
    const u = t % RUN;
    let cleaning = false;
    let matching = false;
    let repeated = false;
    let arrived = 0;
    let dropped = 0;
    let cleaned = 0;
    cards.forEach(({ el, raw, tidy }, i) => {
      const v = u - 0.5 - i * GAP;
      if (v < 0) return fade(el, 0);
      if (v > RIDE + 1.2) {
        // Already through: it counts, but it is no longer on the belt.
        cleaned++;
        if (i === DUPLICATE) dropped = 1;
        else arrived++;
        return fade(el, 0);
      }
      const side = i % 2 ? 14 : -14; // sheets come from the back, cards from the front
      const onBelt = span(v, 0.5, RIDE);
      let x = v < 0.5 ? lerp(M.feed, M.start, ease(v / 0.5)) : lerp(M.start, M.end, onBelt);
      let y = v < 0.5 ? lerp(side, 0, ease(v / 0.5)) : 0;
      let alpha = span(v, 0, 0.2);
      const isClean = x > M.clean;
      if (isClean) cleaned++;
      if (Math.abs(x - M.clean) < 7) cleaning = true;
      if (Math.abs(x - M.cross) < 7) {
        matching = true;
        repeated = repeated || i === DUPLICATE;
      }
      if (i === DUPLICATE && x > M.drop) {
        const fall = span(x, M.drop, M.drop + 14);
        x = M.drop;
        y = 24 * ease(fall);
        alpha = 1 - span(fall, 0.7, 1);
        if (fall >= 1) dropped = 1;
      } else if (onBelt >= 1) {
        alpha = 1 - span(v, RIDE, RIDE + 0.4);
        arrived++;
      }
      shift(el, P, [x, y, 0]);
      fade(el, alpha);
      fade(raw, isClean ? 0 : 1);
      fade(tidy, isClean ? 1 : 0);
    });
    h.on(lamps.clean, cleaning);
    h.on(lamps.cross, matching && !repeated);
    h.on(lamps.cross, matching && repeated, 'data-err');
    h.on(lamps.timer, u < 0.6);
    const a = (u / RUN) * Math.PI * 2;
    hand.innerHTML = `<path class="iso-line" data-tone="lit" d="${lineOnTop([T.x, T.y], polar(T.x, T.y, T.r, a), T.z, P)}"/>`;
    write(count.ok, String(9 + arrived));
    write(count.dup, String(1 + dropped));
    count.bar.setAttribute('width', (fullBar * (0.5 + 0.125 * (arrived + dropped))).toFixed(1));
    h.say(
      u < 0.6
        ? tr('El temporizador lanza la pasada', 'The timer starts the run')
        : arrived + dropped >= 4
          ? tr('Informe listo · 3 registros, 1 duplicado', 'Report ready · 3 records, 1 duplicate')
          : repeated && matching
            ? tr('Cruce: este registro ya estaba', 'Matching: this record was already there')
            : cleaning
              ? tr('Limpieza: mismo formato para todos', 'Cleaning: one format for all')
              : tr(`Pasada en curso · ${cleaned} de 4 limpios`, `Run in progress · ${cleaned} of 4 clean`),
    );
  };
  return { apply, still: 4.4 };
};

export default create;
