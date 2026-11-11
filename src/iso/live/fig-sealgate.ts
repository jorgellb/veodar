// Signed updates: three versions leave the press. The first is altered on the way and
// the verifier turns it down. The second passes, takes control and does not start, so
// the switch slides back. The third passes, starts and stays in charge.
import { tr, ease, fade, helpers, pulse, shift, span, type Factory, type Proj } from './runtime';

const CYCLE = 22;
// Each act: when it starts and how it ends.
const ACTS: { at: number; end: 'refused' | 'rollback' | 'kept' }[] = [
  { at: 0.4, end: 'refused' },
  { at: 7, end: 'rollback' },
  { at: 14.2, end: 'kept' },
];

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const q = (name: string) => h.q(`[data-part="${name}"]`);
  const go = M.go as Record<string, number>;
  const pack = { el: q('pack'), seal: q('seal'), broken: q('broken') };
  const press = { head: q('head'), lamp: q('sealing'), key: q('key-line') };
  const channels = [q('channel-0'), q('channel-1')];
  const check = { pass: q('pass'), refuse: q('refuse') };
  const dock = { fresh: q('active-new'), old: q('active-old'), knob: q('knob'), line: q('screen-line') };
  const versions = { old: q('ver-old'), fresh: q('ver-new'), fail: q('ver-fail') };

  const apply = (t: number) => {
    const u = t % CYCLE;
    let x = 0;
    let y = 0;
    let shown = 0;
    let sealed = 0;
    let broken = 0;
    let stamp = 0;
    let handed = 0;
    let failed = 0;
    let lamps = { test: false, stable: false, pass: false, refuse: false };
    let say = tr('En espera', 'Idle');
    for (const { at, end } of ACTS) {
      const v = u - at;
      if (v < 0 || v >= 6.8) continue;
      // Sealed under the press, then one stop per channel.
      stamp = pulse(v, 0.3, 1.1, 0.3);
      sealed = span(v, 0.65, 0.8);
      x = go.test * ease(span(v, 1.2, 1.9)) + (go.stable - go.test) * ease(span(v, 2.3, 3));
      lamps.test = v >= 1.9 && v < 2.5;
      lamps.stable = v >= 3 && v < 3.6;
      shown = span(v, 0, 0.2);
      say = v < 1.2 ? tr('La prensa sella la versión nueva', 'The press seals the new version') : v < 2.3 ? tr('Primero, al canal de pruebas', 'First, to the test channel') : tr('Después, al canal estable', 'Then, to the stable channel');
      if (v < 3.4) continue;
      if (end === 'refused') {
        x = go.stable + (go.check - go.stable) * ease(span(v, 3.4, 4.6));
        broken = span(v, 3.85, 4);
        sealed = 1 - broken;
        lamps.refuse = v >= 4.6 && v < 6.2;
        y = go.tray * ease(span(v, 4.9, 5.7));
        shown = 1 - span(v, 6.3, 6.7);
        say = v < 3.85 ? say : v < 4.6 ? tr('Alguien altera el archivo por el camino', 'Someone alters the file on the way') : tr('Sello roto · el verificador la rechaza', 'Broken seal · the verifier turns it down');
        continue;
      }
      x = go.stable + (go.bay - go.stable) * ease(span(v, 3.4, 4.8));
      lamps.pass = v >= 4 && v < 4.9;
      if (v >= 3.4) say = v < 4.8 ? tr('Sello válido · pasa a la segunda ranura', 'Valid seal · on to the second bay') : say;
      if (end === 'rollback') {
        handed = ease(span(v, 5, 5.3)) - ease(span(v, 6.2, 6.5));
        failed = v >= 5.3 && v < 6.3 ? 1 : 0;
        shown = 1 - span(v, 6.5, 6.8);
        if (v >= 4.8) say = v < 5.3 ? tr('El relevo le da el mando', 'The switch hands it control') : v < 6.2 ? tr('No arranca', 'It does not start') : tr('El relevo vuelve solo a la anterior', 'The switch slides back to the old one');
      } else {
        handed = ease(span(v, 5, 5.3));
        if (v >= 4.8) say = v < 5.3 ? tr('El relevo le da el mando', 'The switch hands it control') : tr('Arranca · queda la versión nueva', 'It starts · the new version stays');
      }
    }
    // The last act stays as it ended until the loop restarts.
    const last = ACTS[2].at + 6.8;
    if (u >= last) {
      const leaving = 1 - span(u, 21, 21.5);
      x = go.bay;
      shown = leaving;
      sealed = 1;
      handed = leaving;
      say = u < 21 ? tr('Arranca · queda la versión nueva', 'It starts · the new version stays') : tr('En espera', 'Idle');
    }
    fade(pack.el, shown);
    shift(pack.el, P, [x, y, 0]);
    fade(pack.seal, sealed);
    fade(pack.broken, broken);
    shift(press.head, P, [0, 0, (M.stroke as number) * stamp]);
    h.on(press.lamp, stamp > 0.5);
    h.on(press.key, stamp > 0.1);
    h.on(channels[0], lamps.test);
    h.on(channels[1], lamps.stable);
    h.on(check.pass, lamps.pass);
    h.on(check.refuse, lamps.refuse);
    shift(dock.knob, P, [go.knob * handed, 0, 0]);
    h.on(dock.fresh, handed > 0.9);
    h.on(dock.old, handed < 0.1);
    h.on(dock.line, handed > 0.5 && handed < 1);
    fade(versions.fail, failed);
    fade(versions.fresh, failed ? 0 : handed);
    fade(versions.old, failed ? 0 : 1 - handed);
    h.say(say);
  };
  return { apply, still: 20 };
};

export default create;
