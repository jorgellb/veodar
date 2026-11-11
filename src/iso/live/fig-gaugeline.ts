// Rust: a piece that fits goes under the gauge and into the cell, where the single key
// decides which arm may come down on it; a faulty one is knocked onto the tray before
// it gets there. Then the cartridge slots into the existing machine and the port reads
// the scale.
import { tr, along, ease, fade, helpers, pulse, ride, shift, span, type Factory, type Proj } from './runtime';

const CYCLE = 18;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const q = (name: string) => h.q(`[data-part="${name}"]`);
  const bead = h.q('[data-bead]');
  const routes = { read: along(M.read), feed: along(M.feed) };
  const go = M.go as Record<string, number>;
  const pieces = { good: q('good'), bad: q('bad') };
  const gauge = { pass: q('pass'), reject: q('reject'), ram: q('ram') };
  const cell = { key: q('key'), headA: q('head-a'), headB: q('head-b'), armA: q('arm-a'), armB: q('arm-b') };
  const done = q('done');
  const insert = { cartridge: q('cartridge'), lamp: q('slotted') };
  const port = { lamp: q('reading'), read: q('read-line'), feed: q('feed-line') };

  const apply = (t: number) => {
    const u = t % CYCLE;
    bead.setAttribute('opacity', '0');
    // 1 · The piece that fits: under the gauge, one arm, then the other.
    const x = u < 2.4 ? go.pressA * span(u, 0.4, 2.4) : u < 4.8 ? go.pressA + (go.pressB - go.pressA) * ease(span(u, 4, 4.8)) : go.pressB + (go.end - go.pressB) * ease(span(u, 5.8, 6.8));
    fade(pieces.good, u < 0.4 ? 0 : u < 6.5 ? span(u, 0.4, 0.6) : 1 - span(u, 6.5, 6.8));
    shift(pieces.good, P, [x, 0, 0]);
    h.on(gauge.pass, u >= 0.4 && x > go.stop - 6 && x < go.stop + 22);
    // The key: at the first arm, then at the second, then back.
    const turn = ease(span(u, 3.4, 4.2)) - ease(span(u, 6.8, 7.6));
    shift(cell.key, P, [go.key * turn, 0, 0]);
    h.on(cell.armA, turn < 0.02);
    h.on(cell.armB, turn > 0.98);
    shift(cell.headA, P, [0, 0, go.head * pulse(u, 2.5, 3.3, 0.25)]);
    shift(cell.headB, P, [0, 0, go.head * pulse(u, 4.9, 5.7, 0.25)]);
    fade(done, u < 6.6 ? 0 : pulse(u, 6.6, 8.4, 0.3));
    // 2 · The faulty one: it stops at the gauge and is knocked onto the tray.
    const slide = ease(span(u, 9.7, 10.7));
    fade(pieces.bad, u < 7.6 ? 0 : u < 16.4 ? span(u, 7.6, 7.8) : 1 - span(u, 16.4, 16.8));
    shift(pieces.bad, P, [go.stop * span(u, 7.6, 9.2), go.tray * slide, go.drop * span(u, 9.9, 10.3)]);
    h.on(gauge.reject, u >= 9.2 && u < 11.4);
    shift(gauge.ram, P, [0, go.ram * pulse(u, 9.5, 10.2, 0.22), 0]);
    // 3 · The cartridge slots into the machine that was already there.
    const docked = ease(span(u, 11.4, 12.2)) - ease(span(u, 16.6, 17.4));
    shift(insert.cartridge, P, [0, (M.out as number) * (1 - docked), 0]);
    h.on(insert.lamp, docked > 0.98);
    // 4 · The port reads the scale and hands the figure to the cell.
    ride(bead, routes.read, span(u, 13, 14));
    h.on(port.read, u >= 13 && u < 14.2);
    h.on(port.lamp, u >= 14 && u < 15.6);
    if (u >= 14.2) ride(bead, routes.feed, span(u, 14.2, 15));
    h.on(port.feed, u >= 14.2 && u < 15.2);
    h.say(
      u < 0.4 || u >= 16.4
        ? tr('En espera', 'Idle')
        : u < 2.4
          ? tr('La pieza cabe bajo el calibre', 'The piece fits under the gauge')
          : u < 3.4
            ? tr('Baja el brazo que tiene la llave', 'The arm holding the key comes down')
            : u < 4.8
              ? tr('La llave pasa al otro brazo', 'The key passes to the other arm')
              : u < 5.8
                ? tr('Ahora baja el segundo, nunca los dos', 'Now the second one, never both')
                : u < 7.6
                  ? tr('Sale un bloque macizo', 'A solid block comes out')
                  : u < 9.2
                    ? tr('Llega una pieza defectuosa', 'A faulty piece arrives')
                    : u < 11.4
                      ? tr('El calibre la rechaza antes de entrar', 'The gauge rejects it before the machine')
                      : u < 13
                        ? tr('El cartucho encaja en lo que ya existe', 'The cartridge slots into what exists')
                        : tr('El puerto lee la báscula', 'The port reads the scale'),
    );
  };
  return { apply, still: 9.9 };
};

export default create;
