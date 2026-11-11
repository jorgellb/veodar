// WebAssembly: the press seals the Rust core into a capsule, three times over, and
// each capsule runs down the lane into its dock: the web page, the desktop app, the
// server. Then the one in the glass box takes data by one port, gives the result by
// the other, and what tries to leave any other way stops at the glass.
import { tr, along, ease, fade, helpers, pulse, ride, shift, span, type Factory, type Proj } from './runtime';

const CYCLE = 20;
// When each capsule is sealed.
const SEALED = [0.5, 4.2, 7.9];
const LEG = [0.8, 0.5, 0.45];

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const q = (name: string) => h.q(`[data-part="${name}"]`);
  const bead = h.q('[data-bead]');
  const routes = { in: along(M.in), out: along(M.out), escape: along(M.escape) };
  const press = { ingot: q('ingot'), sealed: q('sealed'), ram: q('ram'), lamp: q('sealing') };
  const capsules = [0, 1, 2].map((i) => q(`capsule-${i}`));
  const docks = [0, 1, 2].map((i) => ({ lamp: q(`dock-${i}`), link: q(`link-${i}`), result: q(`result-${i}`) }));
  const box = { running: q('running'), blocked: q('blocked'), in: [q('in-line'), q('in-run')], out: [q('out-line'), q('out-run')] };
  const [forward, back] = M.lanes as number[];
  const reach = M.docks as number[];

  const apply = (t: number) => {
    const u = t % CYCLE;
    const live = u < 18.2;
    bead.setAttribute('opacity', '0');
    let stamping = 0;
    let onSeat = 0;
    let ingot = 0;
    let docked = -1;
    SEALED.forEach((at, i) => {
      const leave = at + 1;
      // The ingot waits, the ram comes down, and what is left on the seat is a capsule.
      ingot = Math.max(ingot, u >= at - 0.4 && u < at + 0.3 ? Math.min(span(u, at - 0.4, at - 0.2), 1 - span(u, at + 0.2, at + 0.3)) : 0);
      stamping = Math.max(stamping, pulse(u, at, at + 0.8, 0.3));
      onSeat = Math.max(onSeat, u >= at + 0.25 && u < leave + 0.15 ? Math.min(span(u, at + 0.25, at + 0.35), 1 - span(u, leave, leave + 0.15)) : 0);
      // Then it travels: down the first lane, along the second, into its dock.
      const a = ease(span(u, leave, leave + LEG[0]));
      const b = ease(span(u, leave + LEG[0], leave + LEG[0] + LEG[1] + i * 0.25));
      const arrive = leave + LEG[0] + LEG[1] + i * 0.25;
      const c = ease(span(u, arrive, arrive + LEG[2]));
      fade(capsules[i], u < leave ? 0 : live ? span(u, leave, leave + 0.15) : 1 - span(u, 18.2, 18.6));
      shift(capsules[i], P, [reach[i] * b, forward * a + back * c, 0.9 * c]);
      const inDock = u >= arrive + LEG[2] && live;
      if (inDock) docked = i;
      h.on(docks[i].lamp, inDock);
      h.on(docks[i].link, inDock && u < arrive + LEG[2] + 1.2);
      if (i < 2) fade(docks[i].result, u < arrive + LEG[2] + 0.3 ? 0 : live ? span(u, arrive + LEG[2] + 0.3, arrive + LEG[2] + 0.6) : 1 - span(u, 18.2, 18.6));
      else h.on(docks[i].result, inDock && u >= arrive + LEG[2] + 0.3);
    });
    fade(press.ingot, ingot);
    fade(press.sealed, onSeat);
    shift(press.ram, P, [0, 0, (M.stroke as number) * stamping]);
    h.on(press.lamp, stamping > 0.5);
    // The glass box.
    if (u >= 12.4 && u < 13.4) ride(bead, routes.in, span(u, 12.4, 13.4));
    box.in.forEach((el) => h.on(el, u >= 12.4 && u < 13.6));
    h.on(box.running, u >= 13.4 && u < 14.6);
    if (u >= 14.4 && u < 15.4) ride(bead, routes.out, span(u, 14.4, 15.4));
    box.out.forEach((el) => h.on(el, u >= 14.4 && u < 15.6));
    if (u >= 16 && u < 16.5) ride(bead, routes.escape, span(u, 16, 16.5));
    if (u >= 16.5 && u < 17) ride(bead, routes.escape, span(u, 16.5, 17), true);
    fade(box.blocked, u < 16.4 ? 0 : pulse(u, 16.4, 17.8, 0.25));
    const seal = SEALED.findIndex((at) => u >= at - 0.4 && u < at + 1);
    h.say(
      u >= 18.2 || u < 0.1
        ? tr('En espera', 'Idle')
        : seal >= 0
          ? tr('El núcleo en Rust se sella en cápsula', 'The Rust core is sealed into a capsule')
          : u >= 16
            ? tr('Nada más cruza el cristal', 'Nothing else gets through the glass')
            : u >= 12.4
              ? tr('Entran los datos, sale el resultado', 'Data goes in, the result comes out')
              : docked === 2
                ? tr('Y la misma en el servidor', 'And the same one on the server')
                : docked === 1 && u >= SEALED[1] + 2.5 && u < SEALED[2] - 0.4
                  ? tr('La misma, en la app de escritorio', 'The same one, in the desktop app')
                  : docked === 0 && u < SEALED[1] - 0.4
                    ? tr('La cápsula encaja en la página web', 'The capsule fits the web page')
                    : tr('Otra cápsula igual va a su base', 'An identical capsule heads for its dock'),
    );
  };
  return { apply, still: 11.9 };
};

export default create;
