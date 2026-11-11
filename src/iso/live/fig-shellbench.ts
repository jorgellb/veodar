// Tauri: the window asks, the core does. Each order travels the bridge to its socket:
// reading files lights the data, printing reaches the printer, and wiping the disk
// stops at a capped socket because the board never allowed it. Then the press turns
// the bench into one installer per system.
import { tr, along, ease, fade, helpers, ride, shift, span, type Factory, type Proj } from './runtime';

const CYCLE = 17;
// [command, when its button is pressed]
const ORDERS: [number, number][] = [
  [0, 0.5],
  [1, 3.8],
  [3, 7.2],
];
// When each installer leaves the press, the farthest first.
const OUT = [13, 12.2, 11.4];

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const q = (name: string) => h.q(`[data-part="${name}"]`);
  const bead = h.q('[data-bead]');
  const routes = (M.routes as number[][][]).map((r) => along(r));
  const lines = { core: along(M.core), press: along(M.press), print: along(M.print) };
  const tiles = [0, 1, 2, 3].map((i) => q(`tile-${i}`));
  const cmds = [0, 1, 2].map((i) => q(`cmd-${i}`));
  const lamps = { deny: q('deny'), data: q('data'), usb: q('usb'), printing: q('printing'), pressing: q('pressing') };
  const wires = { bridge: q('bridge'), core: q('core-line'), print: q('print-line'), press: q('press-line') };
  const sheet = q('sheet');
  const packs = [0, 1, 2].map((i) => q(`pack-${i}`));
  const reach = M.packs as number[];

  const apply = (t: number) => {
    const u = t % CYCLE;
    const live = u < 15.6;
    bead.setAttribute('opacity', '0');
    let onBridge = false;
    tiles.forEach((el) => fade(el, 0));
    for (const [cmd, at] of ORDERS) {
      if (u < at || u >= at + 2.6) continue;
      fade(tiles[cmd], Math.min(span(u, at, at + 0.15), 1 - span(u, at + 2.3, at + 2.6)));
      onBridge = u < at + 2.2;
      if (u >= at + 0.2 && u < at + 1.2) ride(bead, routes[cmd], span(u, at + 0.2, at + 1.2));
      // The order with no permission comes back the way it went.
      if (cmd === 3 && u >= at + 1.4 && u < at + 2.2) ride(bead, routes[cmd], span(u, at + 1.4, at + 2.2), true);
    }
    h.on(wires.bridge, onBridge);
    // 1 · Read files: the data answers.
    h.on(cmds[0], u >= 1.7 && u < 3.2);
    if (u >= 1.7 && u < 2.3) ride(bead, lines.core, span(u, 1.7, 2.3));
    h.on(wires.core, u >= 1.7 && u < 2.6);
    h.on(lamps.data, u >= 2.3 && u < 3.4);
    // 2 · Print: out of the port, to the printer.
    h.on(cmds[1], u >= 5 && u < 6.6);
    h.on(lamps.usb, u >= 5 && u < 6.2);
    if (u >= 5.1 && u < 5.9) ride(bead, lines.print, span(u, 5.1, 5.9));
    h.on(wires.print, u >= 5.1 && u < 6.1);
    h.on(lamps.printing, u >= 5.9 && u < 7);
    const printed = ease(span(u, 5.9, 6.7));
    fade(sheet, u < 5.9 ? 0 : live ? span(u, 5.9, 6.2) : 1 - span(u, 15.6, 16));
    shift(sheet, P, [0, -8 * (1 - printed), 0]);
    // 3 · Wipe the disk: not on the board, so it never crosses.
    h.on(lamps.deny, u >= 8.4 && u < 10);
    // 4 · The press: one installer per system.
    if (u >= 10.6 && u < 11.4) ride(bead, lines.press, span(u, 10.6, 11.4));
    h.on(wires.press, u >= 10.6 && u < 11.6);
    h.on(lamps.pressing, u >= 11.2 && u < 14.2);
    packs.forEach((el, i) => {
      const out = ease(span(u, OUT[i], OUT[i] + 0.8));
      fade(el, u < OUT[i] ? 0 : live ? span(u, OUT[i], OUT[i] + 0.2) : 1 - span(u, 15.6, 16));
      shift(el, P, [-reach[i] * (1 - out), 0, 0]);
    });
    h.say(
      u < 0.5 || u >= 15.6
        ? tr('En espera', 'Idle')
        : u < 1.7
          ? tr('La ventana pide leer un archivo', 'The window asks to read a file')
          : u < 3.8
            ? tr('Permitido · el núcleo lee los datos', 'Allowed · the core reads the data')
            : u < 5
              ? tr('La ventana pide imprimir', 'The window asks to print')
              : u < 7.2
                ? tr('Permitido · llega a la impresora', 'Allowed · the core reaches the printer')
                : u < 8.4
                  ? tr('La ventana pide borrar el disco', 'The window asks to wipe the disk')
                  : u < 10.6
                    ? tr('No está en el cuadro · la orden no cruza', 'Not on the board · the order stays out')
                    : tr('La prensa saca un instalador por sistema', 'The press makes one installer per system'),
    );
  };
  return { apply, still: 8.9 };
};

export default create;
