import { iso, lineOnTop, pathOf, segment, translateAlong } from '../iso-kit.mjs';
import { tr, ease, helpers, lerp, polar, span, type Factory, type Proj } from './runtime';

const CYCLE = 14;
// Each step changes one option; the price follows from the same formula every time.
const STEPS = [
  { at: 0.4, mod: 1, tier: 1, door: false, finish: false },
  { at: 2.0, mod: 2, tier: 1, door: false, finish: false },
  { at: 3.7, mod: 3, tier: 1, door: false, finish: false },
  { at: 5.6, mod: 3, tier: 2, door: false, finish: false },
  { at: 7.5, mod: 3, tier: 2, door: true, finish: false },
  { at: 9.2, mod: 3, tier: 2, door: true, finish: true },
];
const PRINT = 10.6;
const RESET = 12.8;
const price = (s: (typeof STEPS)[number]) => 120 + s.mod * 140 * s.tier + (s.door ? 45 * s.mod * s.tier : 0) + (s.finish ? 60 : 0);
const euros = (n: number) => (document.documentElement.lang === 'en' ? `€${Math.round(n).toLocaleString('en-US')}` : `${Math.round(n).toLocaleString('es-ES').replace(/\./g, ' ')} €`);

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const cells = new Map(h.qa('[data-cell]').map((el) => [el.dataset.cell!, el]));
  const doors = new Map(h.qa('[data-door]').map((el) => [el.dataset.door!, el]));
  const knob = h.q('[data-part="knob"]');
  const slides = new Map(h.qa('[data-slide]').map((el) => [el.dataset.slide!, el]));
  const priceText = h.q<SVGTextElement>('[data-part="price"]');
  const specText = h.q<SVGTextElement>('[data-part="spec"]');
  const paperEl = h.q('[data-part="paper"]');
  const ready = h.q('[data-part="ready"]');
  const presence = new Map<string, number>();
  const K = M.knob;
  let paperKey = '';

  const stateAt = (u: number) => {
    let i = 0;
    for (let j = 0; j < STEPS.length; j++) if (u >= STEPS[j].at) i = j;
    return i;
  };

  const apply = (t: number, dt: number) => {
    const u = t % CYCLE;
    const resetting = u >= RESET;
    const idx = resetting ? 0 : stateAt(u);
    const step = STEPS[idx];
    const prev = STEPS[Math.max(0, idx - 1)];
    const since = u - step.at;

    // Parts ease in and out toward the current option set.
    const follow = (key: string, target: number) => {
      const now = presence.get(key) ?? 0;
      const next = dt > 0 ? now + (target - now) * (1 - Math.exp(-dt * 6.5)) : target;
      presence.set(key, next);
      return next;
    };
    for (const [key, el] of cells) {
      const [i, tier] = key.split('-').map(Number);
      const p = follow(`c${key}`, i < step.mod && tier < step.tier ? 1 : 0);
      el.setAttribute('opacity', Math.min(1, p * 1.6).toFixed(2));
      el.setAttribute('transform', translateAlong(P, [0, 0, (1 - p) * 14]));
    }
    for (const [key, el] of doors) {
      const [i, tier] = key.split('-').map(Number);
      const p = follow(`d${key}`, step.door && i < step.mod && tier < step.tier ? 1 : 0);
      el.setAttribute('opacity', Math.min(1, p * 1.6).toFixed(2));
      el.setAttribute('transform', translateAlong(P, [0, (1 - p) * 9, 0]));
      h.on(el, step.finish && p > 0.5);
    }

    // Controls lead each change by a beat.
    const lead = (value: (s: (typeof STEPS)[number]) => number) => lerp(value(prev), value(step), ease(span(since, -0.05, 0.4)));
    const m = resetting ? lerp(3, 1, ease(span(u, RESET, RESET + 0.5))) : lead((s) => s.mod);
    const a = -0.9 + ((m - 1) / 2) * 1.8;
    const tip = polar(K.x, K.y, K.r - 0.9, a);
    const [tx, ty] = iso([tip[0], tip[1], K.z], P);
    knob.innerHTML = `<path class="iso-line" data-tone="hi" style="stroke-width:1.5px" d="${lineOnTop([K.x, K.y], tip, K.z, P)}"/><circle cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r="1.1" fill="#ff5a1f"/>`;
    const slide = (key: string, value: (s: (typeof STEPS)[number]) => number) => {
      const v = resetting ? lerp(value(STEPS[STEPS.length - 1]), 0, ease(span(u, RESET, RESET + 0.5))) : lead(value);
      slides.get(key)!.setAttribute('transform', translateAlong(P, [0, -v * M.slide, 0]));
    };
    slide('tier', (s) => s.tier - 1);
    slide('door', (s) => (s.door ? 1 : 0));
    slide('finish', (s) => (s.finish ? 1 : 0));

    // Price rolls from the previous total to the new one.
    const shown = resetting ? price(STEPS[0]) : lerp(price(prev), price(step), ease(span(since, 0.1, 0.75)));
    const label = euros(Math.round(shown / 5) * 5);
    if (priceText.textContent !== label) priceText.textContent = label;
    const spec = tr(
      `${step.mod} mód · ${step.tier} alt${step.door ? ' · puertas' : ''}${step.finish ? ' · naranja' : ''}`,
      `${step.mod} mod · ${step.tier} high${step.door ? ' · doors' : ''}${step.finish ? ' · orange' : ''}`,
    );
    if (specText.textContent !== spec) specText.textContent = spec;

    // Quote: paper feeds out of the slot once the configuration is final.
    const feed = resetting ? 0 : ease(span(u, PRINT, PRINT + 1.0));
    const key = feed.toFixed(2);
    if (key !== paperKey) {
      paperKey = key;
      const p = M.paper;
      const topZ = p.z + feed * 17;
      const quad = [iso([p.x0, p.y, p.z], P), iso([p.x1, p.y, p.z], P), iso([p.x1, p.y, topZ], P), iso([p.x0, p.y, topZ], P)];
      let marks = '';
      [15, 11, 7].forEach((z, i) => {
        if (topZ - p.z > z + 0.5) marks += segment([p.x0 + 3, p.y, topZ - z + 1], [p.x0 + 3 + [20, 14, 17][i], p.y, topZ - z + 1], P);
      });
      paperEl.innerHTML = feed > 0.02 ? `<path d="${pathOf(quad, true)}" fill="#fffefb" stroke="var(--anatomy-mid)" stroke-width=".7"/>${marks ? `<path class="iso-line" data-tone="hi" d="${marks}"/>` : ''}` : '';
    }
    h.on(ready, feed > 0.98);

    h.say(
      resetting
        ? tr('Nueva configuración', 'New configuration')
        : u >= PRINT
          ? tr(`Presupuesto impreso · ${euros(price(step))} · pedido al ERP`, `Quote printed · ${euros(price(step))} · order sent to the ERP`)
          : tr(
              `${step.mod} ${step.mod === 1 ? 'módulo' : 'módulos'} · ${step.tier} ${step.tier === 1 ? 'altura' : 'alturas'}${step.door ? ' · con puertas' : ''}${step.finish ? ' · acabado naranja' : ''} → ${euros(price(step))}`,
              `${step.mod} ${step.mod === 1 ? 'module' : 'modules'} · ${step.tier} ${step.tier === 1 ? 'height' : 'heights'}${step.door ? ' · with doors' : ''}${step.finish ? ' · orange finish' : ''} → ${euros(price(step))}`,
            ),
    );
  };
  return { apply, still: 8.6 };
};

export default create;
