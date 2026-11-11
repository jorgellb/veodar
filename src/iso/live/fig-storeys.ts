// Next.js: one public request and one private request, each with its trip to the base.
import { tr, along, ease, fade, helpers, ride, shift, span, type Factory, type Proj } from './runtime';

const CYCLE = 15.5;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const [walker, packet] = h.qa('[data-bead]');
  const tiles = h.qa('[data-tile]');
  const acct = h.q('[data-part="acct"]');
  const gate = h.q('[data-part="gate"]');
  const lock = h.q('[data-part="lock"]');
  const pub = h.q('[data-part="pub"]');
  const srv = h.q('[data-part="srv"]');
  const db = h.q('[data-part="db"]');
  const wires = ['riser-a', 'riser-b', 'riser-pub', 'riser-c', 'to-db'].map((name) => h.q(`[data-part="${name}"]`));
  const walkIn = along(M.walkIn);
  const toShop = along(M.toShop);
  const toGate = along(M.toGate);
  const toDesk = along(M.toDesk);
  const pubData = along(M.pubData);
  const privData = along(M.privData);

  const apply = (t: number) => {
    const u = t % CYCLE;
    // ── A public request: straight to the storefront ──
    ride(walker, walkIn, span(u, 0.3, 1.4));
    if (u >= 1.4 && u < 2.6) ride(walker, toShop, span(u, 1.4, 2.6));
    const pubGo = span(u, 2.7, 3.8);
    const pubBack = span(u, 3.9, 4.9);
    ride(packet, pubData, pubGo);
    if (u >= 3.9 && u < 4.9) ride(packet, pubData, pubBack, true);
    const served = u >= 4.9;
    tiles.forEach((tile, i) => fade(tile, served ? span(u, 4.9 + i * 0.07, 5.2 + i * 0.07) * 0.84 + 0.16 : 0.16));
    // ── A private request: up the stairs, and no further without a session ──
    if (u >= 6.2 && u < 7.2) ride(walker, walkIn, span(u, 6.2, 7.2));
    if (u >= 7.2 && u < 8.4) ride(walker, toGate, span(u, 7.2, 8.4));
    const waiting = u >= 8.4 && u < 9.6;
    const allowed = u >= 9.6 && u < 14.4;
    h.on(lock, waiting ? Math.floor(u * 5) % 2 === 0 : allowed);
    if (allowed) lock.setAttribute('data-tone', 'ok');
    else lock.removeAttribute('data-tone');
    const lift = ease(span(u, 9.6, 10.2)) * (1 - ease(span(u, 14.4, 15)));
    shift(gate, P, [0, 0, M.lift * lift]);
    if (waiting) ride(walker, toGate, 0.999);
    if (u >= 10.2 && u < 11) ride(walker, toDesk, span(u, 10.2, 11));
    if (u >= 11.1 && u < 12.2) ride(packet, privData, span(u, 11.1, 12.2));
    if (u >= 12.3 && u < 13.3) ride(packet, privData, span(u, 12.3, 13.3), true);
    fade(acct, u >= 13.3 && u < 14.6 ? 0.14 + 0.86 * span(u, 13.3, 13.6) : 0.14);
    if (u >= 13.3 || (u >= 5 && u < 6.2)) walker.setAttribute('opacity', '0');
    // Lamps and risers follow whichever packet is travelling.
    const pubTrip = u >= 2.7 && u < 4.9;
    const privTrip = u >= 11.1 && u < 13.3;
    h.on(pub, pubTrip || privTrip);
    h.on(srv, (u > 3.4 && u < 4.3) || (u > 11.8 && u < 12.7));
    h.on(db, (u > 3.7 && u < 4.1) || (u > 12.1 && u < 12.5));
    wires.forEach((wire, i) => h.on(wire, i === 2 ? pubTrip : i < 2 ? privTrip : pubTrip || privTrip));
    h.say(
      u < 2.7
        ? tr('Petición pública · al escaparate', 'Public request · to the storefront')
        : u < 4.9
          ? tr('El servidor prepara la página', 'The server renders the page')
          : u < 6.2
            ? tr('Catálogo servido · sin iniciar sesión', 'Catalog served · no sign-in')
            : u < 8.4
              ? tr('Petición privada · sube a «Mi cuenta»', 'Private request · up to “My account”')
              : u < 9.6
                ? tr('El control comprueba la sesión', 'The control checks the session')
                : u < 11.1
                  ? tr('Sesión válida · compuerta abierta', 'Valid session · gate open')
                  : u < 13.3
                    ? tr('Los datos de la cuenta, desde la base', "The account's data, from the base")
                    : tr('Cuenta servida solo a su dueño', 'Account served to its owner only'),
    );
  };
  return { apply, still: 10.6 };
};

export default create;
