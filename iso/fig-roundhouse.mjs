// Tokio: a roundhouse. Five tracks fan out from a pit, each with a wagon that is a
// task, and a single turntable bridge serves them all: it turns to the track whose
// light is on, does one step of its work and moves to the next one that is ready. The
// track whose light never comes on is not waited for; a clock beside it runs out and
// the task is cancelled. Each finished task drops a token into the channel, which
// carries it to whoever consumes it. At the back, the lever that stops the service:
// the bridge finishes what it had in hand and parks.
// The plate is narrower than in the other scenes: a fan of tracks is as deep as it is
// wide, and on the usual plate it would be drawn too small.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -104, y: -54, w: 208, d: 108, r: 10 };
const C = { x: -34, y: 12 };
const PIT = 25;
const ANGLES = [146, 181, 216, 251, 286];
const SLOW = 4;
const TRACK = { from: 28, to: 57, wid: 9 };
const WAGON = { at: 42, len: 16, wid: 8, h: 6.2 };
const LAMP = 60.5;
const DECK = { len: 46, wid: 9, z: 1, h: 2.4 };
const CLOCK = { x: -7, y: -47, w: 18, d: 3.4, h: 20 };
const CHANNEL = { x: C.x + 28, y: C.y - 5, w: 62, d: 10, r: 1 };
const CONSUMER = { x: CHANNEL.x + CHANNEL.w, y: C.y - 14, w: 30, d: 28, r: 3, h: 14 };
const TOKEN = { x: CHANNEL.x + 2, y: CHANNEL.y + 2.4, w: 7, d: 5.2, r: 0.9, run: CHANNEL.w - 11 };
const LEVER = { x: 52, y: -45, w: 24, d: 16, r: 2.5, h: 9 };
const STOP_LINE = [
  [LEVER.x, -37, 3],
  [LEVER.x - 2, -37, 0.9],
  [16, -37, 0.9],
  [16, -9, 0.9],
  [-8.6, -2.2, 0.9],
];

const rad = (deg) => (deg * Math.PI) / 180;
const polar = (r, deg, side = 0) => [C.x + r * Math.cos(rad(deg)) - side * Math.sin(rad(deg)), C.y + r * Math.sin(rad(deg)) + side * Math.cos(rad(deg))];
/** A rectangle lying along a direction: `len` along it, `wid` across, centred on a point. */
const rect = ([cx, cy], len, wid, deg) => {
  const [ux, uy] = [Math.cos(rad(deg)), Math.sin(rad(deg))];
  return [
    [-len / 2, -wid / 2],
    [len / 2, -wid / 2],
    [len / 2, wid / 2],
    [-len / 2, wid / 2],
  ].map(([l, w]) => [cx + ux * l - uy * w, cy + uy * l + ux * w]);
};

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [CLOCK.x, CLOCK.y, 30], [LEVER.x + LEVER.w, LEVER.y, 26]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

// The bridge at an angle. The page builds it again as it turns (src/iso/live/fig-roundhouse.ts runs the same sum).
const bridgeSvg = (deg) => {
  const top = DECK.z + DECK.h;
  const rails = [-2.7, 2.7].map((side) => k.lineOnTop(polar(-21, deg, side), polar(21, deg, side), top, P)).join("");
  return (
    k.solidSvg(k.extrude(rect([C.x, C.y], DECK.len, DECK.wid, deg), DECK.z, DECK.h, P), { tone: "hi", crease: "lo" }) +
    k.lineSvg(rails, { tone: "mid", free: true }) +
    k.solidSvg(k.extrude(rect(polar(17.5, deg), 6, 6, deg), top, 1.3, P), { tone: "hi", lit: true })
  );
};

function scene(lod) {
  const { at, S, L, D, slab, cyl, base, label, lamp, top, faceY, cable, shadow, pick, thumb } = kitFor(P, { lod });
  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);
  const bulb = (x, y, z, r, part, on = false, ok = false) => {
    const svg = lamp(x, y, z, r, part, on);
    return ok ? svg.replace('class="veo-lamp"', 'class="veo-lamp" data-tone="ok"') : svg;
  };

  // ── The pit and its hub ────────────────────────────────────────────────
  const pit = () => {
    const out = [cyl(C.x, C.y, PIT + 2.4, 0, 0.8, "lo", { steps: 56 }), cyl(C.x, C.y, PIT, 0.8, 0.2, "mid", { steps: 56, crease: "none" })];
    out.push(L(k.ring(C.x, C.y, PIT - 2.6, 1, P, 56), { tone: "mid", fine: true }));
    const t = k.radialTicks(C.x, C.y, PIT - 0.4, 36, 3, 1, [1.2, 2.2], P);
    out.push(L(t.minor, { tone: "lo", fine: true }), L(t.major, { tone: "mid", fine: true }));
    return out.join("");
  };
  const hub = () => cyl(C.x, C.y, 3.9, DECK.z + DECK.h, 1.5, "mid", { steps: 20, bevel: 0.3 }) + cyl(C.x, C.y, 1.5, DECK.z + DECK.h + 1.5, 1.1, "hi", { steps: 12, crease: "lo" });

  // ── A track with its wagon: a task ─────────────────────────────────────
  const stall = (i, { hooks = true, ready = false, pips = 0, cancelled = false } = {}) => {
    const deg = ANGLES[i];
    const mid = (TRACK.from + TRACK.to) / 2;
    const out = [S(k.extrude(rect(polar(mid, deg), TRACK.to - TRACK.from, TRACK.wid, deg), 0, 1.4, P), { tone: "lo" })];
    out.push(L([-2.6, 2.6].map((side) => k.lineOnTop(polar(TRACK.from + 1.5, deg, side), polar(TRACK.to - 1.5, deg, side), 1.4, P)).join(""), { tone: "mid", free: true, fine: true }));
    out.push(L([30.5, 53.5].map((r) => k.lineOnTop(polar(r, deg, -3.8), polar(r, deg, 3.8), 1.4, P)).join(""), { tone: "lo", free: true, fine: true }));
    const [lx, ly] = polar(LAMP, deg);
    const lampSvg = i === SLOW ? bulb(lx, ly, 0, 2.2, hooks ? "late" : "", cancelled) : bulb(lx, ly, 0, 2.2, hooks ? `ready-${i}` : "", ready, true);
    const [nx, ny] = polar(LAMP, deg, deg > 200 ? -6.4 : 6.4);
    const number = top(nx - 1.4, ny - 1.8, 0.05, `<text class="ui-t" x="1.4" y="2.9" font-size="3.6" text-anchor="middle" opacity=".7">${i + 1}</text>`);
    // Whichever of the lamp and the wagon is farther goes first.
    const far = k.depthOf([lx, ly, 0], P) < k.depthOf([...polar(WAGON.at, deg), 0], P);
    if (far) out.push(lampSvg, number);
    const roof = 1.4 + WAGON.h;
    out.push(S(k.extrude(rect(polar(WAGON.at, deg), WAGON.len, WAGON.wid, deg), 1.4, WAGON.h, P), { tone: "hi", crease: "lo" }));
    out.push(L([-6, 6].map((l) => k.lineOnTop(polar(WAGON.at + l, deg, -4), polar(WAGON.at + l, deg, 4), roof, P)).join(""), { tone: "lo", free: true, fine: true }));
    [-2.9, 2.9].forEach((l, j) => {
      const ring = rect(polar(WAGON.at + l, deg), 3.8, 3.8, deg);
      out.push(L(k.onTop(ring, roof, P, true), { tone: "mid", fine: true }));
      const done = S(k.extrude(ring, roof, 0.8, P), { tone: "hi", lit: true });
      out.push(hooks ? `<g data-part="pip-${i}-${j}" opacity="0">${done}</g>` : j < pips ? done : "");
    });
    if (i === SLOW) {
      const cross = L(k.lineOnTop(polar(WAGON.at - 6.4, deg, -3.2), polar(WAGON.at + 6.4, deg, 3.2), roof + 0.06, P) + k.lineOnTop(polar(WAGON.at - 6.4, deg, 3.2), polar(WAGON.at + 6.4, deg, -3.2), roof + 0.06, P), { tone: "lit", free: true });
      out.push(hooks ? `<g data-part="cancel" opacity="0">${cross}</g>` : cancelled ? cross : "");
    }
    if (!far) out.push(lampSvg, number);
    return out.join("");
  };
  const order = [...ANGLES.keys()].sort((a, b) => k.depthOf([...polar(WAGON.at, ANGLES[a]), 0], P) - k.depthOf([...polar(WAGON.at, ANGLES[b]), 0], P));

  // ── The clock: how long anyone is waited for ───────────────────────────
  const [sx, sy] = polar(LAMP, ANGLES[SLOW]);
  const CLOCK_LINE = [
    [CLOCK.x + 2, CLOCK.y + 1.7, 0.9],
    [sx + 3, sy, 0.9],
  ];
  const clock = ({ hooks = true, turn = 0, out: late = false } = {}) => {
    const out = [slab({ x: CLOCK.x + 2, y: CLOCK.y - 1.5, w: CLOCK.w - 4, d: 6, r: 1.4 }, 0, 1.2, "lo", { steps: 3, bevel: 0.2 })];
    out.push(slab({ x: CLOCK.x, y: CLOCK.y, w: CLOCK.w, d: CLOCK.d, r: 1.3 }, 1.2, CLOCK.h, "hi", { steps: 2, bevel: 0.4, crease: "lo" }));
    const hand = `<path class="ui-s" data-t="acc" d="M9 10.4V4"/>`;
    out.push(
      faceY(
        CLOCK.x,
        CLOCK.y + CLOCK.d,
        1.2 + CLOCK.h,
        `<circle class="ui-s" data-t="hi" cx="9" cy="10.4" r="7.4"/>${pick(`<path class="ui-s" data-t="lo" d="M9 3.6v1.4M15.8 10.4h-1.4M9 17.2v-1.4M2.2 10.4h1.4"/>`)}${hooks ? `<g data-part="hand">${hand}</g>` : `<g transform="rotate(${turn} 9 10.4)">${hand}</g>`}<circle class="ui-f" data-t="hi" cx="9" cy="10.4" r=".9"/>`,
      ),
    );
    out.push(bulb(CLOCK.x + CLOCK.w / 2, CLOCK.y + 1.7, 1.2 + CLOCK.h, 1.3, hooks ? "timeout" : "", late));
    return out.join("");
  };

  // ── The lever that stops the service in good order ─────────────────────
  const lever = ({ hooks = true, down = false } = {}) => {
    const out = [slab(LEVER, 0, LEVER.h, "mid", { steps: 5, bevel: 0.7, seam: 2.6 })];
    out.push(faceY(LEVER.x + 3, LEVER.y + LEVER.d, LEVER.h - 2, `<rect class="ui-s" data-t="lo" width="18" height="5" rx=".8"/><text class="ui-t" x="9" y="3.6" font-size="2.7" text-anchor="middle" opacity=".85">PARADA</text>`));
    out.push(slab({ x: LEVER.x + 8.4, y: LEVER.y + 3, w: 7.2, d: 10, r: 1.4 }, LEVER.h, 0.9, "lo", { steps: 3, bevel: 0.2 }));
    const cx = LEVER.x + 12;
    const up = slab({ x: cx - 1.3, y: LEVER.y + 4.6, w: 2.6, d: 2.6, r: 0.8 }, LEVER.h + 0.9, 9, "hi", { steps: 2, bevel: 0.2, crease: "lo" }) + cyl(cx, LEVER.y + 5.9, 2.5, LEVER.h + 9.9, 3, "hi", { steps: 18, bevel: 0.5, crease: "lo" });
    const lying = slab({ x: cx - 1.3, y: LEVER.y + 6, w: 2.6, d: 10, r: 0.8 }, LEVER.h + 0.9, 2.6, "hi", { steps: 2, bevel: 0.2, crease: "lo" }) + cyl(cx, LEVER.y + 17, 2.5, LEVER.h + 0.7, 3, "hi", { steps: 18, bevel: 0.5, crease: "lo", lit: true });
    out.push(bulb(LEVER.x + LEVER.w - 4.4, LEVER.y + 4.4, LEVER.h, 1.5, hooks ? "stopped" : "", down));
    out.push(hooks ? `<g data-part="lever-up">${up}</g><g data-part="lever-down" opacity="0">${lying}</g>` : down ? lying : up);
    return out.join("");
  };

  // ── The channel and whoever consumes what comes down it ────────────────
  const gutter = () => slab(CHANNEL, 0, 1, "lo", { steps: 3, bevel: 0.2 }) + slab({ x: CHANNEL.x, y: CHANNEL.y, w: CHANNEL.w, d: 1.2, r: 0.3 }, 1, 2.4, "mid", { steps: 1, bevel: 0.2 });
  const lip = () => slab({ x: CHANNEL.x, y: CHANNEL.y + CHANNEL.d - 1.2, w: CHANNEL.w, d: 1.2, r: 0.3 }, 1, 2.4, "mid", { steps: 1, bevel: 0.2 });
  const token = () => slab(TOKEN, 1, 3, "hi", { steps: 2, bevel: 0.3, crease: "lo", lit: true });
  const consumer = ({ hooks = true, on = false } = {}) => {
    const out = [slab(CONSUMER, 0, CONSUMER.h, "mid", { steps: 5, bevel: 0.8, seam: 3 })];
    out.push(faceY(CONSUMER.x + 3, CONSUMER.y + CONSUMER.d, CONSUMER.h - 2.4, pick(`<rect class="ui-s" data-t="lo" width="24" height="8" rx=".8"/><path class="ui-s" data-t="lo" d="M3 2.8h18M3 5.2h11"/>`)));
    out.push(L(k.planOutline(k.insetPlan(CONSUMER, 3.4), CONSUMER.h, P, 3), { tone: "faint" }));
    out.push(bulb(CONSUMER.x + CONSUMER.w - 6, CONSUMER.y + CONSUMER.d - 6, CONSUMER.h, 1.9, hooks ? "received" : "", on, true));
    return out.join("");
  };

  const body = [
    base(PLATE),
    wire(CLOCK_LINE, "clock-line"),
    clock(),
    lever(),
    wire(STOP_LINE, "stop-line"),
    pit(),
    ...order.map((i) => stall(i)),
    `<g data-part="bridge">${bridgeSvg(0)}</g>`,
    hub(),
    gutter(),
    ...[0, 1, 2, 3].map((j) => `<g data-part="token-${j}" opacity="0">${token()}</g>`),
    lip(),
    consumer(),
    label({ x: 16, y: 37, w: 64, d: 11, r: 1 }, "UN PUENTE · MUCHAS VÍAS"),
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const move = (by, svg) => `<g transform="${k.translateAlong(P, by)}">${svg}</g>`;
  const fan = (list) => list.flatMap((i) => [[...polar(TRACK.from - 3, ANGLES[i]), 0], [...polar(LAMP + 5, ANGLES[i]), 0]]);
  const parts = {
    stalls: part([0, 1, 2].sort((a, b) => order.indexOf(a) - order.indexOf(b)).map((i) => stall(i, { hooks: false, ready: i === 1, pips: i === 0 ? 2 : i === 1 ? 1 : 0 })), [...fan([0, 1, 2]), [...polar(WAGON.at, ANGLES[2]), 10]], 14),
    table: part([shadow({ x: C.x - PIT - 2, y: C.y - PIT - 2, w: PIT * 2 + 4, d: PIT * 2 + 4, r: PIT }), pit(), bridgeSvg(ANGLES[1]), hub()], k.boxCorners({ x: C.x - PIT - 2, y: C.y - PIT - 2, w: PIT * 2 + 4, d: PIT * 2 + 4 }, 0, 5), 12),
    channel: part(
      [shadow({ x: CHANNEL.x, y: CONSUMER.y, w: CHANNEL.w + CONSUMER.w, d: CONSUMER.d, r: 4 }), gutter(), move([8, 0, 0], token()), move([27, 0, 0], token()), move([TOKEN.run, 0, 0], token()), lip(), consumer({ hooks: false, on: true })],
      [...k.boxCorners(CHANNEL, 0, 4), ...k.boxCorners(CONSUMER, 0, CONSUMER.h + 3)],
      14,
    ),
    clock: part(
      [shadow({ x: CLOCK.x - 1, y: CLOCK.y - 2, w: CLOCK.w + 2, d: 8, r: 3 }), clock({ hooks: false, turn: 300 }), `<g transform="${k.translateAlong(P, [CLOCK.x + 30 - LEVER.x, CLOCK.y - 8 - LEVER.y, 0])}">${shadow({ ...LEVER, r: 4 })}${lever({ hooks: false, down: true })}</g>`],
      [...k.boxCorners({ x: CLOCK.x, y: CLOCK.y - 8, w: 54, d: 30 }, 0, 10), [CLOCK.x, CLOCK.y, CLOCK.h + 4]],
      12,
    ),
    detail: part([3, 4].sort((a, b) => order.indexOf(a) - order.indexOf(b)).map((i) => stall(i, { hooks: false, ready: i === 3, pips: i === 3 ? 1 : 0 })), [...fan([3, 4]), [...polar(WAGON.at, ANGLES[4]), 10]], 14),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");

save("roundhouse", {
  width: W,
  height: H,
  label:
    "Una rotonda de vías sobre una placa: cinco vías numeradas salen en abanico de un foso redondo, cada una con un vagón y una luz en su extremo. En el foso, un único puente giratorio apunta a la vía que tiene la luz encendida. Al fondo, junto a la vía que no responde, un reloj con su aguja y, más a la derecha, una palanca de parada. Delante, un canal lleva las fichas de las tareas terminadas hasta una caja que las recibe.",
  body: full.body,
  motion: { P, c: [C.x, C.y], angles: ANGLES, deck: DECK, slow: SLOW, run: TOKEN.run },
  thumb: small.body
    .join("")
    .replace(`<g data-part="bridge">${bridgeSvg(0)}</g>`, `<g>${bridgeSvg(ANGLES[2])}</g>`)
    .replace('<g data-part="pip-2-0" opacity="0">', "<g>")
    .replace('<g data-part="pip-0-0" opacity="0">', "<g>")
    .replace('<g data-part="pip-0-1" opacity="0">', "<g>")
    .replace('<g data-part="ready-2" class="veo-lamp" data-tone="ok">', '<g class="veo-lamp" data-tone="ok" data-on="">')
    .replace('<g data-part="token-0" opacity="0">', `<g transform="${k.translateAlong(P, [24, 0, 0])}">`),
  parts: full.parts,
});
