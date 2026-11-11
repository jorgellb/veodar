// Expo: a version is built, tried on the team's phone, reviewed by the store and
// installed; then a small fix takes the direct line and arrives when the app opens.
import { tr, along, clamp01, ease, fade, helpers, ride, shift, span, write, type Factory, type Proj, type Vec3 } from './runtime';

const CYCLE = 17;
// When the version reaches each point of its path (seconds into the loop).
const STOPS = [3.4, 4.6, 5, 6.4, 8.8, 9.4];

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const [bead, second] = h.qa('[data-bead]');
  const q = <E extends Element = SVGGElement>(name: string) => h.q<E>(`[data-part="${name}"]`);
  const pack = q('pack');
  const path = M.pack as Vec3[];
  const routes = { test: along(M.test), fix: along(M.fix), direct: along(M.direct), store: along(M.store) };
  const bars = h.qa<SVGRectElement>('[data-bar]');
  const lamps = { build: q('build'), test: q('test'), review: q('review'), listed: q('listed'), rx: q('rx') };
  const wires = { test: q('test-line'), store: q('store-line'), direct: q('direct') };
  const ways = { store: q('way-store'), direct: q('way-direct') };
  const ver = q<SVGTextElement>('ver');
  const fresh = q('fresh');
  const tried = q('test-ok');

  // The version's place at a moment: it waits under the arch while it is reviewed.
  const place = (u: number): Vec3 => {
    if (u <= STOPS[0]) return path[0];
    for (let i = 1; i < STOPS.length; i++) {
      const [from, to] = i === 4 ? [8, STOPS[4]] : [STOPS[i - 1], STOPS[i]];
      if (u < to) {
        const f = ease(clamp01((u - from) / (to - from)));
        return [0, 1, 2].map((axis) => path[i - 1][axis] + (path[i][axis] - path[i - 1][axis]) * f) as Vec3;
      }
    }
    return path[path.length - 1];
  };

  const apply = (t: number) => {
    const u = t % CYCLE;
    const live = u < 16.2;
    bead.setAttribute('opacity', '0');
    second.setAttribute('opacity', '0');
    // 1 · The build: three stages fill in turn.
    bars.forEach((bar, i) => bar.setAttribute('width', (live ? 20 * span(u, 0.4 + i * 0.6, 1 + i * 0.6) * (i === 2 ? 0.6 : 1) : 0).toFixed(1)));
    h.on(lamps.build, u >= 0.4 && u < 3);
    // 2 · A copy for the team's phone.
    ride(bead, routes.test, span(u, 2.2, 3.4));
    h.on(wires.test, u >= 2.2 && u < 3.8);
    h.on(lamps.test, u >= 3.4 && live);
    fade(tried, u < 3.4 ? 0 : live ? span(u, 3.4, 3.8) : 0);
    // 3 · The version: belt, switch, review, shelf.
    shift(pack, P, place(u));
    fade(pack, u < 3 ? 0 : u < 15.5 ? span(u, 3, 3.4) : 1 - span(u, 15.5, 16));
    h.on(lamps.review, u >= 6.4 && u < 8 && Math.floor(u * 3) % 2 === 0);
    h.on(lamps.listed, u >= 9.4 && u < 15.5);
    // 4 · The phone installs it from the store.
    ride(second, routes.store, span(u, 9.4, 10.4));
    h.on(wires.store, u >= 9.4 && u < 10.8);
    // 5 · A small fix: the switch turns and it takes the direct line.
    const direct = u >= 11 && u < 15.8;
    fade(ways.store, direct ? 0 : 1);
    fade(ways.direct, direct ? 1 : 0);
    if (u >= 11.2 && u < 12.2) ride(bead, routes.fix, span(u, 11.2, 12.2));
    if (u >= 12.2) ride(bead, routes.direct, span(u, 12.2, 13.6));
    h.on(wires.direct, u >= 12.2 && u < 14);
    h.on(lamps.rx, u >= 13.6 && u < 15.5);
    fade(fresh, u < 13.6 ? 0 : u < 15.5 ? span(u, 13.6, 14) : 1 - span(u, 15.5, 16));
    write(ver, u < 10.4 || !live ? 'v1.4.0' : u < 13.6 ? 'v1.5.0' : tr('v1.5.0 · act. 1', 'v1.5.0 · upd. 1'));
    h.say(
      u < 0.4 || u >= 15.5
        ? tr('En espera', 'Idle')
        : u < 2.2
          ? tr('Compilando la versión 1.5.0', 'Building version 1.5.0')
          : u < 3.4
            ? tr('Copia de pruebas · al teléfono del equipo', 'Test build · to the team phone')
            : u < 6.4
              ? tr('La versión va hacia la tienda', 'The version heads for the store')
              : u < 8
                ? tr('Revisión de la tienda', 'Store review')
                : u < 9.4
                  ? tr('Aprobada · en el estante', 'Approved · on the shelf')
                  : u < 11
                    ? tr('El teléfono instala la 1.5.0', 'The phone installs 1.5.0')
                    : u < 13.6
                      ? tr('Una corrección · por la vía directa', 'A fix · down the direct line')
                      : tr('Llega al abrir la app · sin tienda', 'Arrives when the app opens · no store'),
    );
  };
  return { apply, still: 10.6 };
};

export default create;
