// Swift: each probe tries one thing only the device can do, what the app saves reaches
// the tablet and the watch, and the press signs the build.
import { tr, along, ease, fade, helpers, ride, shift, span, type Factory, type Proj } from './runtime';

const CYCLE = 15;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const [bead, second] = h.qa('[data-bead]');
  const routes = { nfc: along(M.nfc), face: along(M.face), sync: along(M.sync), watch: along(M.watch) };
  const q = (name: string) => h.q(`[data-part="${name}"]`);
  const found = { photo: q('photo'), tag: q('tag'), face: q('face'), pad: q('pad-new'), watch: q('watch-new'), mark: q('mark') };
  const lamps = { cam: q('cam'), nfc: q('nfc'), bio: q('bio'), signed: q('signed') };
  const traces = { coil: q('coil'), ring: q('ring') };
  const wires = { nfc: q('nfc-line'), face: q('face-line'), sync: q('sync'), watch: q('sync-watch') };
  const stamp = q('stamp');
  const drop = M.press as number;

  const apply = (t: number) => {
    const u = t % CYCLE;
    const live = u < 13.6;
    // What stays on the screens once found, until the loop starts again.
    const kept = (el: Element, from: number) => fade(el, u < from ? 0 : live ? span(u, from, from + 0.4) : 1 - span(u, 13.6, 14.1));
    bead.setAttribute('opacity', '0');
    second.setAttribute('opacity', '0');
    // 1 · The camera.
    h.on(lamps.cam, u >= 0.6 && u < 2 && (u < 1.4 || u >= 1.55));
    kept(found.photo, 1.6);
    // 2 · The NFC tag.
    const reading = u >= 2.6 && u < 4.2;
    h.on(lamps.nfc, reading);
    h.on(traces.coil, reading);
    ride(bead, routes.nfc, span(u, 2.9, 3.6));
    h.on(wires.nfc, u >= 2.9 && u < 4);
    kept(found.tag, 3.6);
    // 3 · The face.
    const looking = u >= 4.6 && u < 6.2;
    h.on(lamps.bio, looking);
    h.on(traces.ring, looking);
    if (u >= 4.6) ride(bead, routes.face, span(u, 4.9, 5.6));
    h.on(wires.face, u >= 4.9 && u < 6);
    kept(found.face, 5.6);
    // 4 · The rest of the family gets the same report.
    ride(second, routes.sync, span(u, 6.6, 7.8));
    h.on(wires.sync, u >= 6.6 && u < 8.2);
    kept(found.pad, 7.8);
    if (u >= 7.8) ride(second, routes.watch, span(u, 7.8, 8.8));
    h.on(wires.watch, u >= 7.8 && u < 9.2);
    kept(found.watch, 8.8);
    // 5 · The press signs the build.
    const press = u < 9.4 ? 0 : u < 10 ? ease(span(u, 9.4, 10)) : u < 10.4 ? 1 : 1 - ease(span(u, 10.4, 11));
    shift(stamp, P, [0, 0, -drop * press]);
    kept(found.mark, 10);
    h.on(lamps.signed, u >= 10 && live);
    h.say(
      u < 0.6 || !live
        ? tr('En espera', 'Idle')
        : u < 2.6
          ? tr('Cámara · foto adjunta al parte', 'Camera · photo attached to the report')
          : u < 4.6
            ? tr('NFC · etiqueta leída', 'NFC · tag read')
            : u < 6.6
              ? tr('Rostro reconocido · sesión abierta', 'Face recognized · signed in')
              : u < 9.4
                ? tr('La tableta y el reloj reciben el parte', 'Tablet and watch get the report')
                : tr('Compilación firmada · lista para publicar', 'Build signed · ready to publish'),
    );
  };
  return { apply, still: 9 };
};

export default create;
