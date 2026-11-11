// .NET: the session arrives from the directory and the rows from the data server; the
// order form marks the field that does not add up, and once it is right the report
// leaves by the printer. Then the jack lifts the old module to the new base and
// slides it across.
import { tr, along, ease, fade, helpers, ride, shift, span, type Factory, type Proj } from './runtime';

const CYCLE = 18;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const q = (name: string) => h.q(`[data-part="${name}"]`);
  const bead = h.q('[data-bead]');
  const routes = { login: along(M.login), rows: along(M.rows), print: along(M.print) };
  const form = { session: q('session'), invalid: q('invalid'), valid: q('valid'), rows: [q('row-0'), q('row-1')] };
  const lamps = { login: q('login'), data: q('data'), printing: q('printing'), moved: q('moved') };
  const wires = { login: q('login-line'), rows: q('rows-line'), print: q('print-line') };
  const sheet = q('sheet');
  const jack = { piston: q('piston'), lift: q('lift'), a: q('module-a'), b: q('module-b') };
  const rise = M.rise as number;
  const slide = M.slide as number;

  const apply = (t: number) => {
    const u = t % CYCLE;
    const live = u < 16.4;
    const out = 1 - span(u, 16.4, 16.8);
    bead.setAttribute('opacity', '0');
    // 1 · Who it is, and the data.
    if (u >= 0.4 && u < 1.3) ride(bead, routes.login, span(u, 0.4, 1.3));
    h.on(wires.login, u >= 0.4 && u < 1.5);
    h.on(lamps.login, u >= 1.3 && live);
    fade(form.session, u < 1.3 ? 0 : live ? span(u, 1.3, 1.6) : out);
    if (u >= 1.8 && u < 2.7) ride(bead, routes.rows, span(u, 1.8, 2.7));
    h.on(wires.rows, u >= 1.8 && u < 2.9);
    h.on(lamps.data, u >= 1.8 && u < 3.1);
    form.rows.forEach((el, j) => fade(el, u < 2.7 + j * 0.3 ? 0 : live ? span(u, 2.7 + j * 0.3, 2.9 + j * 0.3) : out));
    // 2 · The form: wrong, then right.
    fade(form.invalid, u < 3.4 ? 0 : Math.min(span(u, 3.4, 3.6), 1 - span(u, 5.2, 5.4)));
    fade(form.valid, u < 5.4 ? 0 : live ? span(u, 5.4, 5.7) : out);
    // 3 · The report.
    if (u >= 6.2 && u < 7) ride(bead, routes.print, span(u, 6.2, 7));
    h.on(wires.print, u >= 6.2 && u < 7.2);
    h.on(lamps.printing, u >= 7 && u < 8.6);
    fade(sheet, u < 7 ? 0 : live ? span(u, 7, 7.3) : out);
    shift(sheet, P, [0, -9 * (1 - ease(span(u, 7, 7.9))), 0]);
    // 4 · The jack and the old module.
    const up = u < 13 ? ease(span(u, 9, 10.6)) : 1 - ease(span(u, 13, 14.2));
    shift(jack.piston, P, [0, 0, rise * up]);
    shift(jack.lift, P, [0, 0, rise * up]);
    const across = u >= 10.9 && u < 16.8;
    fade(jack.a, across ? 0 : u < 10.9 ? 1 : span(u, 16.8, 17.1));
    fade(jack.b, across ? (u < 16.4 ? 1 : out) : 0);
    shift(jack.b, P, [slide * ease(span(u, 10.9, 12.3)), 0, rise]);
    h.on(lamps.moved, u >= 12.3 && live);
    h.say(
      u < 0.4 || u >= 16.4
        ? tr('En espera', 'Idle')
        : u < 1.8
          ? tr('La sesión llega del directorio', 'The session comes from the directory')
          : u < 3.4
            ? tr('Las filas llegan del servidor de datos', 'The rows come from the data server')
            : u < 5.4
              ? tr('La ventana marca el campo que no cuadra', 'The window marks the field that is wrong')
              : u < 6.2
                ? tr('Corregido · el total se calcula solo', 'Fixed · the total works itself out')
                : u < 9
                  ? tr('El informe sale por la impresora', 'The report comes out of the printer')
                  : u < 10.9
                    ? tr('El gato sube el módulo antiguo', 'The jack lifts the old module')
                    : tr('Pasa a la base nueva sin parar el resto', 'On to the new base, nothing else stops'),
    );
  };
  return { apply, still: 4.4 };
};

export default create;
