// React Native: one change at the console reaches both phones at once, each dock's
// own module reads a code and the same rule shows up on the web.
import { tr, along, fade, helpers, ride, span, type Factory, type Proj } from './runtime';

const CYCLE = 13;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const beads = h.qa('[data-bead]');
  const trunk = along(M.trunk);
  const outs = (M.outs as number[][][]).map(along);
  const natives = (M.natives as number[][][]).map(along);
  const web = along(M.web);
  const q = (name: string) => h.q(`[data-part="${name}"]`);
  const code = q('code');
  const codeRest = q('code-rest');
  const fresh = h.qa('[data-new]');
  const scans = h.qa('[data-scan]');
  const webNew = q('web-new');
  const lamps = { src: q('src'), bridge: q('bridge'), docks: [q('dock-0'), q('dock-1')], natives: [q('nat-0'), q('nat-1')] };
  const wires = { trunk: q('trunk'), outs: [q('out-0'), q('out-1')], natives: [q('nat-line-0'), q('nat-line-1')], web: [q('web'), q('web-b')] };

  const apply = (t: number) => {
    const u = t % CYCLE;
    beads.forEach((bead) => bead.setAttribute('opacity', '0'));
    // 1 · A change is keyed in.
    const typing = u >= 0.4 && u < 2.8;
    fade(code, u < 0.4 ? 0 : typing ? span(u, 0.4, 0.8) : 1 - span(u, 2.8, 3.2));
    fade(codeRest, u >= 0.4 && u < 3.2 ? 0 : 1);
    h.on(lamps.src, typing);
    // 2 · Down the trunk, then out on both lines at the same moment.
    ride(beads[0], trunk, span(u, 1.8, 2.8));
    h.on(wires.trunk, u >= 1.8 && u < 4);
    h.on(lamps.bridge, u >= 2.8 && u < 4);
    if (u >= 2.8) {
      ride(beads[0], outs[0], span(u, 2.8, 4));
      ride(beads[1], outs[1], span(u, 2.8, 4));
    }
    wires.outs.forEach((wire) => h.on(wire, u >= 2.8 && u < 4.4));
    const shown = u >= 4 && u < 11.4;
    fresh.forEach((el) => fade(el, u < 4 ? 0 : shown ? span(u, 4, 4.4) : 1 - span(u, 11.4, 11.9)));
    lamps.docks.forEach((lamp) => h.on(lamp, shown));
    // 3 · What only the phone can do: each dock's module reads a code.
    const reading = u >= 6 && u < 7.2;
    natives.forEach((route, i) => {
      if (reading) ride(beads[i], route, span(u, 6.2, 7));
      h.on(lamps.natives[i], reading);
      h.on(wires.natives[i], reading);
    });
    scans.forEach((el) => fade(el, u >= 7 && u < 11.4 ? span(u, 7, 7.3) : 0));
    // 4 · The same rule on the web.
    ride(beads[2], web, span(u, 7.8, 9));
    wires.web.forEach((wire) => h.on(wire, u >= 7.8 && u < 9.2));
    fade(webNew, u < 9 ? 0 : u < 11.4 ? span(u, 9, 9.4) : 1 - span(u, 11.4, 11.9));
    h.say(
      u < 0.4 || u >= 11.4
        ? tr('En espera', 'Idle')
        : u < 1.8
          ? tr('Un cambio en el código', 'A change in the code')
          : u < 4
            ? tr('Baja al puente · sale por dos líneas', 'Down to the bridge · out on two lines')
            : u < 6
              ? tr('La misma pantalla en iPhone y Android', 'The same screen on iPhone and Android')
              : u < 7.8
                ? tr('Módulo nativo: la cámara lee un código', 'Native module: the camera reads a code')
                : u < 9
                  ? tr('La misma regla viaja a la web', 'The same rule travels to the web')
                  : tr('App y web al día · un solo cambio', 'App and web up to date · one change'),
    );
  };
  return { apply, still: 5 };
};

export default create;
