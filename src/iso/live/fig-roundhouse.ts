// Tokio: one bridge, many tracks. The bridge turns to whichever track has its light
// on, does one step of that task and moves on; a task done in two steps drops a token
// into the channel. The fifth track never lights: its clock runs out and the task is
// cancelled without anyone having waited for it. At the end the lever stops the
// service and the bridge parks.
import { extrude, lineOnTop, lineSvg, solidSvg } from '../iso-kit.mjs';
import { tr, ease, fade, helpers, shift, span, type Factory, type Proj } from './runtime';

const CYCLE = 18;
// The tracks the bridge serves, in order: each task takes two visits.
const ORDER = [0, 2, 1, 3, 0, 2, 1, 3];
const at = (k: number) => 1 + 1.2 * k;
const TURN = 0.7;
const DWELL = 0.6;
const TIMEOUT = 11;
const STOP = 13.8;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const q = (name: string) => h.q(`[data-part="${name}"]`);
  const [cx, cy] = M.c as [number, number];
  const angles = M.angles as number[];
  const deck = M.deck as { len: number; wid: number; z: number; h: number };
  const slow = M.slow as number;
  const bridge = q('bridge');
  const ready = angles.map((_, i) => (i === slow ? null : q(`ready-${i}`)));
  const pips = angles.map((_, i) => [0, 1].map((j) => q(`pip-${i}-${j}`)));
  const tokens = [0, 1, 2, 3].map((j) => q(`token-${j}`));
  const clock = { hand: q('hand'), lamp: q('timeout'), late: q('late'), cancel: q('cancel'), line: q('clock-line') };
  const lever = { up: q('lever-up'), down: q('lever-down'), lamp: q('stopped'), line: q('stop-line') };
  const received = q('received');

  const rad = (deg: number) => (deg * Math.PI) / 180;
  const polar = (r: number, deg: number, side = 0): [number, number] => [cx + r * Math.cos(rad(deg)) - side * Math.sin(rad(deg)), cy + r * Math.sin(rad(deg)) + side * Math.cos(rad(deg))];
  const rect = ([x, y]: [number, number], len: number, wid: number, deg: number) => {
    const [ux, uy] = [Math.cos(rad(deg)), Math.sin(rad(deg))];
    return [
      [-len / 2, -wid / 2],
      [len / 2, -wid / 2],
      [len / 2, wid / 2],
      [-len / 2, wid / 2],
    ].map(([l, w]) => [x + ux * l - uy * w, y + uy * l + ux * w]);
  };
  // The same bridge iso/fig-roundhouse.mjs draws, at any angle.
  const bridgeSvg = (deg: number) => {
    const top = deck.z + deck.h;
    const rails = [-2.7, 2.7].map((side) => lineOnTop(polar(-21, deg, side), polar(21, deg, side), top, P)).join('');
    return (
      solidSvg(extrude(rect([cx, cy], deck.len, deck.wid, deg), deck.z, deck.h, P), { tone: 'hi', crease: 'lo' }) +
      lineSvg(rails, { tone: 'mid' }) +
      solidSvg(extrude(rect(polar(17.5, deg), 6, 6, deg), top, 1.3, P), { tone: 'hi', lit: true })
    );
  };
  let drawn = NaN;
  const turnTo = (deg: number) => {
    const next = Math.round(deg * 4) / 4;
    if (next === drawn) return;
    drawn = next;
    bridge.innerHTML = bridgeSvg(next);
  };
  const angleAt = (u: number) => {
    if (u >= STOP + 0.4) {
      const last = angles[ORDER[ORDER.length - 1]];
      return last + (360 - last) * ease(span(u, STOP + 0.4, STOP + 1.8));
    }
    let k = -1;
    while (k + 1 < ORDER.length && u >= at(k + 1) - TURN) k++;
    if (k < 0) return 0;
    const from = k ? angles[ORDER[k - 1]] : 0;
    return from + (angles[ORDER[k]] - from) * ease(span(u, at(k) - TURN, at(k)));
  };

  const apply = (t: number) => {
    const u = t % CYCLE;
    const live = u < 16.6;
    turnTo(angleAt(u));
    // Which visit is under way, if any.
    const serving = ORDER.findIndex((_, k) => u >= at(k) && u < at(k) + DWELL);
    ready.forEach((el, i) => h.on(el, ORDER.some((s, k) => s === i && u >= at(k) - 1 && u < at(k) + DWELL - 0.1)));
    ORDER.forEach((s, k) => {
      const nth = ORDER.slice(0, k).filter((v) => v === s).length;
      fade(pips[s][nth], u < at(k) + 0.25 ? 0 : live ? span(u, at(k) + 0.25, at(k) + 0.45) : 1 - span(u, 16.6, 17));
      if (nth !== 1) return;
      // A finished task: its token goes down the channel.
      const token = tokens[ORDER.slice(0, k).filter((v, n) => ORDER.slice(0, n).includes(v)).length];
      const start = at(k) + 0.5;
      fade(token, u < start ? 0 : Math.min(span(u, start, start + 0.15), 1 - span(u, start + 1.3, start + 1.5)));
      shift(token, P, [(M.run as number) * ease(span(u, start, start + 1.4)), 0, 0]);
    });
    h.on(received, ORDER.some((s, k) => ORDER.slice(0, k).includes(s) && u >= at(k) + 1.8 && u < at(k) + 2.5));
    // The clock of the track that never answers.
    clock.hand.setAttribute('transform', `rotate(${(360 * Math.min(1, span(u, 0.4, TIMEOUT))).toFixed(1)} 9 10.4)`);
    const late = u >= TIMEOUT && u < 16.6;
    h.on(clock.lamp, late && u < TIMEOUT + 2.6);
    h.on(clock.late, late && u < TIMEOUT + 2.6);
    h.on(clock.line, late && u < TIMEOUT + 1);
    fade(clock.cancel, u < TIMEOUT ? 0 : live ? span(u, TIMEOUT, TIMEOUT + 0.3) : 1 - span(u, 16.6, 17));
    // The lever: stop in good order.
    const pulled = u < 16.8 ? span(u, STOP, STOP + 0.25) : 1 - span(u, 16.8, 17.1);
    fade(lever.down, u < STOP ? 0 : pulled);
    fade(lever.up, u < STOP ? 1 : 1 - pulled);
    h.on(lever.lamp, u >= STOP + 0.2 && u < 16.8);
    h.on(lever.line, u >= STOP + 0.2 && u < STOP + 1.2);
    h.say(
      u < 0.3 || u >= 16.6
        ? tr('En espera', 'Idle')
        : u >= STOP
          ? tr('Parada ordenada · el puente aparca', 'Graceful stop · the bridge parks')
          : u >= TIMEOUT
            ? tr('Vía 5 · tiempo agotado, tarea cancelada', 'Track 5 · timed out, task canceled')
            : serving >= 0
              ? ORDER.slice(0, serving).includes(ORDER[serving])
                ? tr(`Vía ${ORDER[serving] + 1} · tarea terminada`, `Track ${ORDER[serving] + 1} · task finished`)
                : tr(`El puente atiende la vía ${ORDER[serving] + 1}`, `The bridge serves track ${ORDER[serving] + 1}`)
              : u < at(ORDER.length - 1)
                ? tr('Gira a la siguiente vía lista', 'Turning to the next ready track')
                : tr('La vía 5 no responde · nadie la espera', 'Track 5 is silent · nobody waits for it'),
    );
  };
  return { apply, still: 4.9 };
};

export default create;
