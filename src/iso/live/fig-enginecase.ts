// Electron: the window asks to save, the barrier lifts and the engine room writes the
// file. Then the foreign add-on tries to get through and the barrier stays down. At
// the end, the application is weighed packed with its engine, and beside it a parcel
// with the application alone.
import { tr, along, ease, fade, helpers, ride, shift, span, type Factory, type Proj } from './runtime';

const CYCLE = 18;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const q = (name: string) => h.q(`[data-part="${name}"]`);
  const bead = h.q('[data-bead]');
  const routes = { call: along(M.call), cross: along(M.cross), store: along(M.store) };
  const tiles = [q('tile-0'), q('tile-1')];
  const bar = { down: q('bar-down'), up: q('bar-up'), open: q('open'), deny: q('deny') };
  const lamps = { engine: q('engine'), files: q('files') };
  const wires = { call: q('call-line'), cross: q('cross-line'), store: q('store-line') };
  const packed = { crate: q('crate'), parcel: q('parcel'), big: q('needle-big'), small: q('needle-small') };
  const [crateDrop, parcelDrop] = M.drops as number[];
  const needle = (el: Element, deg: number) => el.setAttribute('transform', `rotate(${deg.toFixed(1)} 8 9)`);

  const apply = (t: number) => {
    const u = t % CYCLE;
    const live = u < 16.6;
    bead.setAttribute('opacity', '0');
    // 1 · A declared call: save.
    fade(tiles[0], u >= 0.5 && u < 4.6 ? Math.min(span(u, 0.5, 0.65), 1 - span(u, 4.3, 4.6)) : 0);
    if (u >= 0.7 && u < 1.7) ride(bead, routes.call, span(u, 0.7, 1.7));
    const lifted = u < 3.4 ? span(u, 1.7, 2) : 1 - span(u, 3.4, 3.7);
    fade(bar.up, u < 1.7 ? 0 : lifted);
    fade(bar.down, u < 1.7 ? 1 : 1 - lifted);
    h.on(bar.open, u >= 1.8 && u < 3.5);
    if (u >= 2 && u < 3) ride(bead, routes.cross, span(u, 2, 3));
    h.on(wires.cross, u >= 2 && u < 3.2);
    h.on(lamps.engine, u >= 3 && u < 4.8);
    if (u >= 3.3 && u < 3.9) ride(bead, routes.store, span(u, 3.3, 3.9));
    h.on(wires.store, u >= 3.3 && u < 4.1);
    h.on(lamps.files, u >= 3.9 && u < 5);
    // 2 · The add-on tries the same door.
    fade(tiles[1], u >= 6 && u < 9.6 ? Math.min(span(u, 6, 6.15), 1 - span(u, 9.3, 9.6)) : 0);
    if (u >= 6.3 && u < 7.3) ride(bead, routes.call, span(u, 6.3, 7.3));
    if (u >= 7.8 && u < 8.8) ride(bead, routes.call, span(u, 7.8, 8.8), true);
    h.on(bar.deny, u >= 7.3 && u < 9.4);
    h.on(wires.call, (u >= 0.7 && u < 1.9) || (u >= 6.3 && u < 8.9));
    // 3 · Packed for shipping.
    const crate = ease(span(u, 10.6, 11.6));
    fade(packed.crate, u < 10.6 ? 0 : live ? span(u, 10.6, 10.9) : 1 - span(u, 16.6, 17));
    shift(packed.crate, P, [0, 0, crateDrop * (1 - crate)]);
    needle(packed.big, -70 + 118 * (live ? ease(span(u, 11.4, 12.2)) : 1 - ease(span(u, 16.6, 17.2))));
    const parcel = ease(span(u, 13, 13.8));
    fade(packed.parcel, u < 13 ? 0 : live ? span(u, 13, 13.3) : 1 - span(u, 16.6, 17));
    shift(packed.parcel, P, [0, 0, parcelDrop * (1 - parcel)]);
    needle(packed.small, -70 + 32 * (live ? ease(span(u, 13.6, 14.3)) : 1 - ease(span(u, 16.6, 17.2))));
    h.say(
      u < 0.5 || u >= 16.6
        ? tr('En espera', 'Idle')
        : u < 1.7
          ? tr('La ventana pide guardar', 'The window asks to save')
          : u < 3
            ? tr('Está declarado · la barrera se levanta', 'It is declared · the barrier lifts')
            : u < 6
              ? tr('La sala de máquinas escribe el archivo', 'The engine room writes the file')
              : u < 7.3
                ? tr('Un añadido ajeno prueba el mismo puente', 'A foreign add-on tries the same bridge')
                : u < 10.6
                  ? tr('No está declarado · no cruza', 'Not declared · it does not cross')
                  : u < 13
                    ? tr('La app viaja con su motor dentro', 'The app travels with its engine inside')
                    : tr('La misma app, sin llevar el motor', 'The same app, without the engine inside'),
    );
  };
  return { apply, still: 14.8 };
};

export default create;
