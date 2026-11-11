// JavaScript: the module drops into its socket and the calculator, the form and the
// result start talking to each other.
import { isEn, tr, along, ease, helpers, ride, shift, span, write, type Factory, type Proj } from './runtime';

const CYCLE = 10;
const TOTAL = 1240;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const chip = h.q('[data-part="chip"]');
  const seat = h.q('[data-part="seat"]');
  const traces = ['t-calc', 't-form', 't-out'].map((name) => h.q(`[data-part="${name}"]`));
  const lead = h.q('[data-part="lead"]');
  const calc = h.q('[data-part="calc"]');
  const total = h.q('[data-part="total"]');
  const fields = [0, 1, 2].map((i) => h.q(`[data-part="fld-${i}"]`));
  const marks = h.qa('[data-mark]');
  const send = h.q('[data-part="send"]');
  const go = h.q('[data-part="go"]');
  const bead = h.q('[data-bead]');
  const toCalc = along([...M.toCalc]);
  const toForm = along(M.toForm);
  const toOut = along(M.toOut);
  const number = (value: number) => Math.round(value).toLocaleString(isEn() ? 'en-US' : 'es-ES');

  const apply = (t: number) => {
    const u = t % CYCLE;
    const down = ease(span(u, 1, 2)) - ease(span(u, 8.6, 9.4));
    shift(chip, P, [0, 0, -M.hover * down]);
    const seated = down > 0.97;
    h.on(seat, seated);
    bead.setAttribute('opacity', '0');
    ride(bead, toCalc, span(u, 2.1, 2.7));
    if (u >= 3.4 && u < 4) ride(bead, toForm, span(u, 3.4, 4));
    if (u >= 4.7 && u < 5.6) ride(bead, toOut, span(u, 4.7, 5.6));
    h.on(traces[0], seated && u >= 2.1);
    h.on(traces[1], seated && u >= 3.4);
    h.on(traces[2], seated && u >= 4.7);
    h.on(lead, seated && u >= 5.1);
    write(calc, seated && u >= 2.7 ? number(TOTAL * ease(span(u, 2.7, 3.3))) : '0');
    // The form: two fields pass, the third is missing until someone fills it in.
    const state = [u >= 4 ? 1 : 0, u >= 4.25 ? 1 : 0, u >= 6.3 ? 1 : u >= 4.5 ? 2 : 0].map((value) => (seated ? value : 0));
    fields.forEach((field, i) => {
      h.on(field, state[i] === 1);
      if (state[i] === 1) field.setAttribute('data-tone', 'ok');
      else field.removeAttribute('data-tone');
      h.on(field, state[i] === 2 && Math.floor(u * 4) % 2 === 0, 'data-err');
    });
    const shown = seated && u >= 5.6;
    write(total, shown ? number(TOTAL) : '—');
    marks.forEach((mark, i) => mark.setAttribute('data-t', !shown ? '' : state[i] === 1 ? 'hi' : state[i] === 2 ? 'acc' : ''));
    const ready = shown && state.every((value) => value === 1);
    h.on(send, ready);
    go.setAttribute('data-t', ready ? 'acc' : 'mid');
    go.classList.toggle('scr-glow', ready);
    h.say(
      u < 1
        ? tr('La página funciona · el zócalo está libre', 'The page works · the socket is free')
        : u < 2.1
          ? tr('El módulo baja a su zócalo', 'The module drops into its socket')
          : u < 3.4
            ? tr(`Cálculo: ${number(TOTAL)}`, `Calculation: ${number(TOTAL)}`)
            : u < 6.3
              ? tr('Validación: falta 1 campo', 'Validation: 1 field missing')
              : u < 8.6
                ? tr('Todo correcto · se puede enviar', 'All good · ready to send')
                : tr('Se retira el módulo · la página sigue', 'Module removed · the page carries on'),
    );
  };
  return { apply, still: 5.8 };
};

export default create;
