// SwiftUI: the slider changes one value and everything drawn from it follows: the
// pieces in the frame rearrange, then the phone and the widget show the same.
import { tr, along, ease, fade, helpers, ride, shift, span, write, type Factory, type Proj } from './runtime';

const CYCLE = 12;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const [bead, second] = h.qa('[data-bead]');
  const routes = { frame: along(M.toFrame), phone: along(M.toPhone), widget: along(M.toWidget) };
  const q = <E extends Element = SVGGElement>(name: string) => h.q<E>(`[data-part="${name}"]`);
  const slider = q('slider');
  const texts = { count: q<SVGTextElement>('count'), phone: q<SVGTextElement>('p-count'), widget: q<SVGTextElement>('w-count') };
  const frame = { rows: q('rows'), empty: q('empty'), badge: q('badge') };
  const phone = { rows: q('p-rows'), empty: q('p-empty') };
  const bar = q<SVGRectElement>('w-bar');
  const lamps = { state: q('state'), shown: q('shown') };
  const wires = { frame: q('to-frame'), phone: q('to-phone'), widget: q('to-widget') };
  const travel = M.slide as number;
  // A change that goes one way at `out` and comes back at `back`, each taking `len` seconds.
  const swing = (u: number, out: number, back: number, len: number) => (u < back ? ease(span(u, out, out + len)) : 1 - ease(span(u, back, back + len)));

  const apply = (t: number) => {
    const u = t % CYCLE;
    bead.setAttribute('opacity', '0');
    second.setAttribute('opacity', '0');
    // The value: three orders, then none, then three again.
    const value = swing(u, 3.6, 9, 0.8);
    shift(slider, P, [travel * value, 0, 0]);
    write(texts.count, value > 0.5 ? '0' : '3');
    h.on(lamps.state, (u >= 3.6 && u < 4.6) || (u >= 9 && u < 10));
    // The frame: the rows sink and the piece that says "nothing here" comes up.
    const inFrame = swing(u, 4.4, 9.8, 0.8);
    fade(frame.rows, 1 - inFrame);
    shift(frame.rows, P, [0, 0, -3 * inFrame]);
    fade(frame.empty, inFrame);
    shift(frame.empty, P, [0, 0, -3 * (1 - inFrame)]);
    h.on(frame.badge, inFrame < 0.5);
    // The phone and the widget, drawn from the same description.
    const onPhone = swing(u, 5.2, 10.4, 0.4);
    fade(phone.rows, 1 - onPhone);
    fade(phone.empty, onPhone);
    write(texts.phone, onPhone > 0.5 ? '0' : '3');
    h.on(lamps.shown, (u >= 5.4 && u < 6.6) || (u >= 10.6 && u < 11.6));
    const onWidget = u >= 6.6 && u < 11;
    write(texts.widget, onWidget ? '0' : '3');
    bar.setAttribute('width', onWidget ? '0' : '12');
    // The signal that carries each change.
    for (const [from, toFrame, toPhone, toWidget] of [
      [3.9, 4.6, 5.4, 6.6],
      [9.3, 10, 10.6, 11],
    ]) {
      if (u >= from && u < toFrame) ride(bead, routes.frame, span(u, from, toFrame));
      if (u >= toFrame - 0.2 && u < toPhone) ride(second, routes.phone, span(u, toFrame - 0.2, toPhone));
      if (u >= toPhone && u < toWidget) ride(bead, routes.widget, span(u, toPhone, toWidget));
    }
    h.on(wires.frame, (u >= 3.9 && u < 5) || (u >= 9.3 && u < 10.4));
    h.on(wires.phone, (u >= 4.4 && u < 5.8) || (u >= 9.8 && u < 11));
    h.on(wires.widget, (u >= 5.4 && u < 7) || (u >= 10.6 && u < 11.4));
    h.say(
      u < 3.6 || u >= 10.8
        ? tr('Estado: 3 pedidos', 'State: 3 orders')
        : u < 4.4
          ? tr('Cambia el estado: 0 pedidos', 'The state changes: 0 orders')
          : u < 5.4
            ? tr('El bastidor se recompone solo', 'The frame recomposes itself')
            : u < 6.6
              ? tr('El teléfono muestra la pantalla vacía', 'The phone shows the empty screen')
              : u < 9
                ? tr('El widget muestra lo mismo', 'The widget shows the same')
                : tr('Vuelven los pedidos · misma descripción', 'The orders return · same description'),
    );
  };
  return { apply, still: 2 };
};

export default create;
