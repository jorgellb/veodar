// WordPress: the cartridge docks, the bus carries the news and the site gains its block.
import { tr, along, ease, fade, helpers, ride, shift, span, type Factory, type Proj } from './runtime';

const CYCLE = 10;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const cart = h.q('[data-part="cart"]');
  const link = h.q('[data-part="link"]');
  const slot = h.q('[data-part="slot"]');
  const widget = h.q('[data-part="widget"]');
  const row = h.q('[data-part="row"]');
  const buses = [h.q('[data-part="bus-a"]'), h.q('[data-part="bus-b"]')];
  const beads = h.qa('[data-bead]');
  const routes = (M.routes as number[][][]).map(along);

  const apply = (t: number) => {
    const u = t % CYCLE;
    const docking = ease(span(u, 1.2, 2.8)) * (1 - ease(span(u, 8.2, 9.2)));
    shift(cart, P, [-M.travel * docking, 0, 0]);
    const docked = docking > 0.985;
    h.on(link, docked);
    beads.forEach((bead, i) => ride(bead, routes[i], span(u, 3.0 + i * 0.12, 3.9 + i * 0.12)));
    buses.forEach((bus) => h.on(bus, docked && u > 3.0));
    const active = ease(span(u, 3.9, 4.4)) * (1 - span(u, 8.2, 8.6));
    fade(widget, active);
    fade(slot, 1 - active);
    fade(row, active);
    h.say(
      u < 1.2
        ? tr('Conector libre · la web funciona igual', 'Connector free · the site works as before')
        : u < 2.8
          ? tr('Entra el cartucho de la función', 'The feature cartridge goes in')
          : u < 3.9
            ? tr('Conectado · avisando a la web y al panel', 'Connected · telling the site and the panel')
            : u < 8.2
              ? tr('Plugin activo · reservas en la página', 'Plugin active · bookings on the page')
              : tr('Plugin retirado · nada más cambia', 'Plugin removed · nothing else changes'),
    );
  };
  return { apply, still: 6 };
};

export default create;
