// Push notifications: an event goes through both relays and lights a banner on the
// phones that allowed it; the third finds it in the app's inbox; a tap opens the order.
import { tr, along, fade, helpers, pulse, ride, span, type Factory, type Proj } from './runtime';

const CYCLE = 14;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const [bead, second] = h.qa('[data-bead]');
  const routes = { bus: along(M.bus), branch: along(M.branch), flights: (M.flights as number[][][]).map(along), drop: along(M.drop) };
  const q = (name: string) => h.q(`[data-part="${name}"]`);
  const lamps = { key: q('key'), seg: q('seg'), relays: [q('relay-0'), q('relay-1')], granted: [q('ok-0'), q('ok-1')] };
  const wires = { bus: q('bus'), branch: q('branch'), select: q('select') };
  const waves = [0, 1].map((i) => [0, 1, 2].map((n) => h.q(`[data-wave="${i}-${n}"]`)));
  const banners = [q('banner-0'), q('banner-1')];
  const first = { lock: q('lock'), order: q('order') };
  const event = q('event');
  const mail = q('mail');
  lamps.granted.forEach((lamp) => h.on(lamp, true));

  const apply = (t: number) => {
    const u = t % CYCLE;
    const live = u < 12.4;
    const kept = (el: Element, from: number) => fade(el, u < from ? 0 : live ? span(u, from, from + 0.3) : 1 - span(u, 12.4, 12.9));
    bead.setAttribute('opacity', '0');
    second.setAttribute('opacity', '0');
    // 1 · The event, and who it is for.
    h.on(lamps.key, u >= 0.5 && u < 1.8);
    kept(event, 0.5);
    h.on(lamps.seg, u >= 0.5 && u < 3.6);
    h.on(wires.select, u >= 0.5 && u < 1.4);
    // 2 · To both relays.
    ride(bead, routes.bus, span(u, 1.2, 2.2));
    ride(second, routes.branch, span(u, 1.8, 2.4));
    h.on(wires.bus, u >= 1.2 && u < 2.6);
    h.on(wires.branch, u >= 1.8 && u < 2.8);
    lamps.relays.forEach((lamp, i) => h.on(lamp, (u >= 2.2 && u < 3.6) || (i === 0 && u >= 3.7 && u < 4.9)));
    // 3 · On the air, twice from the first relay: its second phone gave no permission.
    waves.forEach((rings, i) =>
      rings.forEach((ring, n) => fade(ring, Math.max(pulse(u, 2.3 + n * 0.2, 3.1 + n * 0.2, 0.25), i === 0 ? pulse(u, 3.7 + n * 0.2, 4.5 + n * 0.2, 0.25) : 0))),
    );
    if (u >= 2.5 && u < 3.5) {
      ride(bead, routes.flights[0], span(u, 2.5, 3.5));
      ride(second, routes.flights[1], span(u, 2.5, 3.5));
    }
    if (u >= 3.8 && u < 4.8) ride(bead, routes.flights[2], span(u, 3.8, 4.8));
    if (u >= 4.8) ride(bead, routes.drop, span(u, 4.8, 5.4));
    banners.forEach((el) => kept(el, 3.5));
    kept(mail, 5.4);
    // 4 · A tap on the banner opens the order.
    const tapped = u >= 6.7 && u < 6.85;
    if (tapped) fade(banners[0], 0.35);
    const opened = u < 7 ? 0 : live ? span(u, 7, 7.4) : 1 - span(u, 12.4, 12.9);
    fade(first.lock, 1 - opened);
    fade(first.order, opened);
    h.say(
      u < 0.5 || !live
        ? tr('En espera', 'Idle')
        : u < 2.2
          ? tr('Evento: el pedido 1042 sale a reparto', 'Event: order 1042 is out for delivery')
          : u < 3.5
            ? tr('Pasa por los relés de Apple y de Google', "Through Apple's and Google's relays")
            : u < 4.8
              ? tr('Aviso en pantalla · 2 de 3 teléfonos', 'On screen · 2 of 3 phones')
              : u < 6.6
                ? tr('Sin permiso · queda en el buzón de la app', "No permission · kept in the app's inbox")
                : tr('Un toque abre el pedido 1042', 'A tap opens order 1042'),
    );
  };
  return { apply, still: 5.8 };
};

export default create;
