// Kotlin: the console hands one version to the three devices; with their screens off
// the background mechanism sends the pending reports; then the handheld reads a code
// and the printer puts out its label.
import { tr, along, fade, helpers, ride, span, type Factory, type Proj } from './runtime';

const CYCLE = 16;
// When each pending report leaves the tray.
const SENDS = [5.2, 6.6, 8];

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const [bead, second] = h.qa('[data-bead]');
  const routes = { rack: along(M.toRack), worker: along(M.toWorker), db: along(M.toDb) };
  const q = (name: string) => h.q(`[data-part="${name}"]`);
  const three = (name: string) => [0, 1, 2].map((i) => q(`${name}-${i}`));
  const slots = three('slot');
  const installed = three('inst');
  const screensOff = three('off');
  const jobs = three('job');
  const fresh = [q('new-0'), q('new-2')];
  const scanLine = q('new-scan');
  const gears = { big: q('gear'), small: q('gear-b') };
  const lamps = { send: q('send'), work: q('work'), print: q('print'), read: q('read'), db: q('db') };
  const wires = { rack: q('to-rack'), worker: q('to-worker'), db: q('to-db') };
  const strip = q('strip');
  const beam = q('beam');
  const [gx, gy] = M.gear as number[];
  const [sx, sy] = M.small as number[];
  let angle = 0;

  const apply = (t: number, dt: number) => {
    const u = t % CYCLE;
    const live = u < 14.6;
    bead.setAttribute('opacity', '0');
    second.setAttribute('opacity', '0');
    // 1 · One version for the three of them.
    h.on(lamps.send, u >= 0.5 && u < 1.8);
    ride(bead, routes.rack, span(u, 0.6, 1.6));
    h.on(wires.rack, u >= 0.6 && u < 2);
    [1.6, 2.1, 2.6].forEach((at, i) => {
      h.on(slots[i], u >= at && live);
      fade(installed[i], u < at ? 0 : live ? span(u, at, at + 0.3) : 0);
    });
    fresh.forEach((el, i) => fade(el, u < [1.6, 2.6][i] ? 0 : live ? span(u, [1.6, 2.6][i], [1.9, 2.9][i]) : 0));
    // 2 · Screens off: the work goes on underneath.
    const dark = u < 3.6 ? 0 : u < 9.6 ? span(u, 3.6, 4.2) : 1 - span(u, 9.6, 10.2);
    screensOff.forEach((el) => fade(el, dark * 0.9));
    const working = u >= 4.2 && u < 9.6;
    if (working) angle = (angle + dt * 50) % 360;
    gears.big.setAttribute('transform', `rotate(${angle.toFixed(1)} ${gx} ${gy})`);
    gears.small.setAttribute('transform', `rotate(${((-angle * 12) / 7).toFixed(1)} ${sx} ${sy})`);
    h.on(lamps.work, working);
    ride(second, routes.worker, span(u, 4.2, 5));
    h.on(wires.worker, u >= 4.2 && u < 5.2);
    let sent = 0;
    SENDS.forEach((at, i) => {
      const job = jobs[2 - i];
      fade(job, u < at ? 1 : u < 15 ? 1 - span(u, at, at + 0.3) : span(u, 15, 15.4));
      if (u >= at && u < at + 1.2) ride(bead, routes.db, span(u, at, at + 1.2));
      if (u >= at + 1.2) sent++;
    });
    h.on(wires.db, u >= SENDS[0] && u < 9.4);
    h.on(lamps.db, SENDS.some((at) => u >= at + 1.2 && u < at + 1.5));
    // 3 · The peripherals: a code is read and its label comes out.
    const reading = u >= 10.4 && u < 11.6;
    fade(beam, reading ? 1 : 0);
    h.on(beam, reading);
    h.on(lamps.read, reading);
    fade(scanLine, u >= 10.4 && u < 12.8 ? 1 : 0);
    h.on(lamps.print, u >= 11.4 && u < 12.8);
    fade(strip, u < 11.4 ? 0 : live ? span(u, 11.4, 12) : 1 - span(u, 14.6, 15));
    h.say(
      u < 0.5 || !live
        ? tr('En espera', 'Idle')
        : u < 1.6
          ? tr('La consola reparte la versión 2.4', 'The console hands out version 2.4')
          : u < 3.6
            ? tr('Instalada en teléfono, terminal y tableta', 'Installed on phone, handheld and tablet')
            : u < 4.2
              ? tr('Se apagan las pantallas', 'The screens go off')
              : u < 9.6
                ? tr(`Segundo plano · ${sent} de 3 partes enviados`, `Background · ${sent} of 3 reports sent`)
                : u < 10.4
                  ? tr('Pantallas encendidas · nada pendiente', 'Screens on · nothing pending')
                  : u < 11.4
                    ? tr('El terminal lee un código', 'The handheld reads a code')
                    : tr('La impresora saca la etiqueta', 'The printer puts out the label'),
    );
  };
  return { apply, still: 3 };
};

export default create;
