// Astro: three sheets of content go under the head one after another and come out as pages.
import { tr, ease, fade, helpers, lerp, pulse, shift, span, write, type Factory, type Proj } from './runtime';

const PAGE = 4.4; // seconds per sheet
const PAGES = 3;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const sheet = h.q('[data-part="sheet"]');
  const raw = h.q('[data-part="raw"]');
  const page = h.q('[data-part="page"]');
  const mark = h.q('[data-part="isle-mark"]');
  const platen = h.q('[data-part="platen"]');
  const press = h.q('[data-part="press"]');
  const isle = h.q('[data-part="isle"]');
  const count = h.q('[data-part="scr-count"]');
  const scrIsle = h.q('[data-part="scr-isle"]');
  const drop = M.up - M.down;

  const apply = (t: number) => {
    const u = t % (PAGE * PAGES);
    const n = Math.floor(u / PAGE);
    const v = u % PAGE;
    const withIsland = n === PAGES - 1;
    const x = v < 1.9 ? lerp(M.start, M.press, ease(span(v, 0.05, 0.9))) : lerp(M.press, M.end, ease(span(v, 1.9, 3.4)));
    shift(sheet, P, [x - M.start, 0, 0]);
    fade(sheet, span(v, 0, 0.25) * (1 - span(v, 3.35, 3.7)));
    const down = pulse(v, 0.95, 1.85, 0.32);
    shift(platen, P, [0, 0, -drop * down]);
    h.on(press, down > 0.6);
    const composed = v > 1.4;
    fade(raw, composed ? 0 : 1);
    fade(page, composed ? 1 : 0);
    fade(mark, composed && withIsland ? 1 : 0);
    h.on(isle, withIsland && Math.abs(x - M.isle) < 13 && v > 1.9);
    const done = n + (v > 3.4 ? 1 : 0);
    write(count, `${done}/${PAGES}`);
    fade(scrIsle, withIsland && v > 3.4 ? 1 : 0);
    h.say(
      v < 0.9
        ? tr(`Hoja ${n + 1} de ${PAGES} · entra el contenido`, `Sheet ${n + 1} of ${PAGES} · content goes in`)
        : v < 1.9
          ? tr('El cabezal compone la página', 'The head composes the page')
          : withIsland
            ? tr(`Página ${n + 1} · lleva una parte interactiva`, `Page ${n + 1} · carries an interactive part`)
            : tr(`Página ${n + 1} lista para servir`, `Page ${n + 1} ready to serve`),
    );
  };
  return { apply, still: 1.4 };
};

export default create;
