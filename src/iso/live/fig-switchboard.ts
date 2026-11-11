// Node.js: a message is delivered, a long job waits in the tray, a bad one is turned away.
import { tr, along, fade, helpers, ride, span, type Factory, type Proj } from './runtime';

const CYCLE = 15;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const [bead, second] = h.qa('[data-bead]');
  const lineIn = along(M.lineIn);
  const lineQueue = along(M.lineQueue);
  const cords = (M.cords as number[][][]).map(along);
  const q = (name: string) => h.q(`[data-part="${name}"]`);
  const lamps = { in: q('in'), ok: q('st-ok'), queue: q('st-queue'), err: q('st-err'), tray: q('queue') };
  const systems = [0, 1, 2].map((i) => q(`sys-${i}`));
  const plugs = [0, 1, 2].map((i) => q(`plug-${i}`));
  const wires = { in: [q('line-in'), q('line-in-b')], queue: q('line-queue'), cords: [0, 1, 2].map((i) => q(`cord-${i}`)) };
  const job = q('job');

  const apply = (t: number) => {
    const u = t % CYCLE;
    const arriving = (u >= 0.3 && u < 1.5) || (u >= 4.2 && u < 5.4) || (u >= 6.9 && u < 8.1);
    bead.setAttribute('opacity', '0');
    second.setAttribute('opacity', '0');
    // 1 · An order: checked and delivered to the customer file.
    ride(bead, lineIn, span(u, 0.3, 1.5));
    if (u >= 1.9 && u < 3) ride(bead, cords[1], span(u, 1.9, 3));
    // 2 · A report that takes long: it goes to the tray.
    if (u >= 4.2 && u < 5.4) ride(bead, lineIn, span(u, 4.2, 5.4));
    if (u >= 5.8 && u < 6.6) ride(bead, lineQueue, span(u, 5.8, 6.6));
    // 3 · A message with no signature: it stops at the board.
    if (u >= 6.9 && u < 8.1) ride(bead, lineIn, span(u, 6.9, 8.1));
    // 4 · The tray is served when the line is free.
    if (u >= 9.6 && u < 10.8) ride(second, cords[0], span(u, 9.6, 10.8));
    const queued = u >= 6.6 && u < 9.6;
    fade(job, queued ? 1 : 0);
    h.on(lamps.in, arriving);
    wires.in.forEach((wire) => h.on(wire, arriving));
    h.on(wires.queue, u >= 5.8 && u < 6.6);
    wires.cords.forEach((wire, i) => h.on(wire, (i === 1 && u >= 1.9 && u < 4) || (i === 0 && u >= 9.6 && u < 11.8)));
    plugs.forEach((plug, i) => h.on(plug, (i === 1 && u >= 1.5 && u < 4) || (i === 0 && u >= 9.6 && u < 11.8)));
    h.on(systems[1], u >= 3 && u < 4);
    h.on(systems[0], u >= 10.8 && u < 11.8);
    h.on(systems[2], false);
    h.on(lamps.ok, (u >= 3 && u < 4) || (u >= 10.8 && u < 11.8));
    h.on(lamps.queue, queued);
    h.on(lamps.tray, queued);
    h.on(lamps.err, u >= 8.1 && u < 9.2, 'data-err');
    h.say(
      u < 1.5
        ? tr('Entra un pedido', 'An order comes in')
        : u < 3
          ? tr('Comprobado · sale hacia el CRM', 'Checked · on its way to the CRM')
          : u < 4.2
            ? tr('Pedido 1042 → CRM actualizado', 'Order 1042 → CRM updated')
            : u < 6.6
              ? tr('Un informe largo · a la bandeja', 'A long report · into the tray')
              : u < 8.1
                ? tr('En cola: 1 trabajo · la línea sigue libre', 'Queued: 1 job · the line stays free')
                : u < 9.6
                  ? tr('Mensaje sin firma · rechazado', 'Unsigned message · rejected')
                  : u < 11.8
                    ? tr('Sale el trabajo de la cola', 'The queued job goes out')
                    : tr('En espera · nada pendiente', 'Idle · nothing pending'),
    );
  };
  return { apply, still: 7.4 };
};

export default create;
