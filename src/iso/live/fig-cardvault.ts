// SQLite: a change is noted in the journal and filed in its drawer; a search pulls a
// card out without leaving the device; with no connection the changes wait in the
// tray, and they cross to the office when the barrier lifts.
import { tr, along, ease, fade, helpers, ride, shift, span, type Factory, type Proj } from './runtime';

const CYCLE = 16;
// When each pending change lands in the tray, and when it leaves once the barrier is up.
const QUEUED = [8, 8.6, 9.2];
const LEAVES = [11.6, 11, 10.4];

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const bead = h.q('[data-bead]');
  const routes = { journal: along(M.journal), out: along(M.out) };
  const q = (name: string) => h.q(`[data-part="${name}"]`);
  const phone = { saved: q('saved'), found: q('found') };
  const drawer = { box: q('drawer'), shut: q('shut'), hit: q('hit') };
  const entry = q('entry');
  const lamps = { noted: q('noted'), signal: q('signal'), office: q('office') };
  const wires = { journal: q('journal-line'), out: q('out-line') };
  const changes = [0, 1, 2].map((i) => q(`out-${i}`));
  const bar = { down: q('bar-down'), up: q('bar-up') };
  const travel = M.travel as number;
  const rise = M.rise as number;
  // 0 shut, 1 open: opens over 0.6 s at `from`, shuts over 0.6 s before `to`.
  const opening = (u: number, from: number, to: number) => (u < from || u >= to ? 0 : Math.min(ease(span(u, from, from + 0.6)), 1 - ease(span(u, to - 0.6, to))));

  const apply = (t: number) => {
    const u = t % CYCLE;
    const live = u < 15.2;
    bead.setAttribute('opacity', '0');
    // 1 · A report is saved: first the journal.
    fade(phone.saved, u < 0.6 ? 0 : live ? span(u, 0.6, 0.9) : 0);
    ride(bead, routes.journal, span(u, 0.8, 1.8));
    h.on(wires.journal, u >= 0.8 && u < 2.2);
    h.on(lamps.noted, u >= 1.8 && u < 3);
    fade(entry, u < 1.8 ? 0 : live ? span(u, 1.8, 2.1) : 0);
    // 2 · Then its drawer; later a search opens it again and one card comes up.
    const open = Math.max(opening(u, 2.4, 4.6), opening(u, 5.2, 7.6));
    fade(drawer.box, open);
    fade(drawer.shut, 1 - open);
    shift(drawer.box, P, [0, -(1 - open) * 6, 0]);
    shift(drawer.hit, P, [0, 0, rise * Math.min(ease(span(u, 6, 6.4)), 1 - ease(span(u, 6.8, 7.1)))]);
    fade(phone.found, u >= 5.2 && u < 7.6 ? span(u, 5.2, 5.5) : 0);
    // 3 · No connection: the changes pile up behind the barrier.
    let waiting = 0;
    changes.forEach((el, i) => {
      const moved = ease(span(u, LEAVES[i], LEAVES[i] + 1.2));
      fade(el, u < QUEUED[i] ? 0 : u < LEAVES[i] + 1 ? span(u, QUEUED[i], QUEUED[i] + 0.3) : 1 - span(u, LEAVES[i] + 1, LEAVES[i] + 1.2));
      shift(el, P, [travel * moved, 0, -1.3 * i * moved]);
      if (u >= QUEUED[i] && u < LEAVES[i]) waiting++;
      if (u >= QUEUED[i] - 0.5 && u < QUEUED[i]) ride(bead, routes.out, span(u, QUEUED[i] - 0.5, QUEUED[i]));
    });
    h.on(wires.out, u >= QUEUED[0] - 0.5 && u < QUEUED[2] + 0.3);
    // 4 · The connection returns: the barrier lifts and they cross.
    const online = u >= 10 && u < 14.6;
    const lifted = u < 14.6 ? span(u, 10, 10.4) : 1 - span(u, 14.6, 15);
    fade(bar.up, lifted);
    fade(bar.down, 1 - lifted);
    h.on(lamps.signal, online);
    h.on(lamps.office, LEAVES.some((at) => u >= at + 1 && u < at + 1.4));
    h.say(
      u < 0.6 || u >= 14.6
        ? tr('En espera', 'Idle')
        : u < 1.8
          ? tr('El cambio se apunta en el diario', 'The change is noted in the journal')
          : u < 5.2
            ? tr('Guardado en su cajón, dentro del teléfono', 'Filed in its drawer, inside the phone')
            : u < 7.6
              ? tr('Búsqueda sin salir del dispositivo', 'Search without leaving the device')
              : u < 10
                ? tr(`Sin conexión · ${waiting} en la cola`, `No connection · ${waiting} in the queue`)
                : u < 13
                  ? tr('Vuelve la conexión · los cambios cruzan', 'Connection is back · the changes cross')
                  : tr('Todo sincronizado con la oficina', 'All synced with the office'),
    );
  };
  return { apply, still: 6.5 };
};

export default create;
