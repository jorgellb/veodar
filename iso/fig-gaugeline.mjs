// Rust: a line where what is wrong never reaches the machine. A height gauge stands
// before the cell: the piece that fits goes under it, the faulty one is knocked onto a
// tray. Inside the cell two arms share a single key on a rail, and only the arm holding
// it may come down on the piece. What leaves the line is one solid block. To the right,
// a cartridge that slots into a machine that already exists, and a port reading a scale.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const TRACK = { x: -120, y: -10, w: 162, d: 14, r: 1.5, h: 3 };
const LANE = -3;
const START = -116;
const FEED = { x: -121, y: -36, w: 22, d: 16, r: 1.5 };
const RAM = { x: -83, y: -20, w: 7.5, d: 9 };
const HOUSING = { x: -87, y: -34, w: 15, d: 14, r: 2, h: 10 };
const GAUGE = { x: -74, clear: 10.2, top: 21 };
const TRAY = { x: -91, y: 4, w: 23, d: 28, r: 1.5, h: 6 };
const PRESS = [-30, 2];
const COL = { y: -34, d: 12, w: 10, h: 27 };
const ARM = { y: -22, d: 24, z: 20.5, h: 5 };
const PALLET = { x: 48, y: -17, w: 30, d: 26, r: 1.5 };
const BLOCK = { x: 51, y: -12, w: 24, d: 16, r: 1, h: 12 };
const HOST = { x: 90, y: -46, w: 30, d: 26, r: 2.5, h: 24 };
const BENCH = { x: 96, y: -20, w: 18, d: 30, r: 1, h: 6 };
const CART = { x: 98, y: -20, w: 14, d: 14, r: 1, h: 6.4, out: 13 };
const PORT = { x: 28, y: 16, w: 16, d: 14, r: 2, h: 10 };
const SCALE = { x: 84, y: 22, w: 28, d: 22, r: 2, h: 5 };
// How far each thing travels (the page moves the groups by these).
const GO = { pressA: PRESS[0] - 4 - START, pressB: PRESS[1] - 4 - START, end: TRACK.x + TRACK.w - 8 - START, stop: GAUGE.x - 9 - START, tray: 27, drop: -1.8, key: PRESS[1] - PRESS[0], head: -3.8, ram: 9 };

const READ_LINE = [
  [SCALE.x, 33, 2.4],
  [SCALE.x - 2, 33, 0.9],
  [66, 33, 0.9],
  [66, 23, 0.9],
  [PORT.x + PORT.w + 2, 23, 0.9],
  [PORT.x + PORT.w, 23, 4.6],
];
const FEED_LINE = [
  [PORT.x, 23, 4.6],
  [PORT.x - 2, 23, 0.9],
  [14, 23, 0.9],
  [14, TRACK.y + TRACK.d + 1, 0.9],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [PRESS[0], COL.y, 40], [HOST.x, HOST.y, 30]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, D, slab, cyl, screws, base, label, lamp, top, faceY, faceX, screen, cable, shadow, pick, thumb } = kitFor(P, { lod });
  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);
  const bulb = (x, y, z, r, part, on = false, ok = false) => {
    const svg = lamp(x, y, z, r, part, on);
    return ok ? svg.replace('class="veo-lamp"', 'class="veo-lamp" data-tone="ok"') : svg;
  };

  // ── The pieces: the one that fits, and the one with a burr that does not ──
  const piece = (x, { tall = false } = {}) => {
    const plan = { x, y: LANE - 4, w: 8, d: 8, r: 1 };
    if (!tall) return slab(plan, TRACK.h, 6, "hi", { steps: 3, bevel: 0.4, crease: "lo" }) + L(k.planOutline({ x: x + 2, y: LANE - 2, w: 4, d: 4, r: 0.8 }, TRACK.h + 6, P, 3), { tone: "mid", fine: true });
    return slab(plan, TRACK.h, 7.4, "hi", { steps: 3, bevel: 0.4, crease: "lo", lit: true }) + slab({ x: x + 1.2, y: LANE - 2, w: 4, d: 4.6, r: 0.8 }, TRACK.h + 7.4, 2, "hi", { steps: 2, bevel: 0.2, crease: "lo", lit: true });
  };

  // ── Where the pieces come from ─────────────────────────────────────────
  const feed = () => {
    const out = [slab(FEED, 0, 1.4, "lo", { steps: 3, bevel: 0.3 })];
    [
      [FEED.x + 2.4, FEED.y + 2.6, 6],
      [FEED.x + 12, FEED.y + 2, 6],
      [FEED.x + 6.6, FEED.y + 8.4, 6],
    ].forEach(([x, y, h]) => out.push(slab({ x, y, w: 7, d: 6.4, r: 0.9 }, 1.4, h, "hi", { steps: 2, bevel: 0.3, crease: "lo" })));
    return out.join("");
  };

  // ── The track ──────────────────────────────────────────────────────────
  const track = (plan = TRACK) => {
    const out = [slab(plan, 0, TRACK.h, "lo", { steps: 3, bevel: 0.3, seam: 1.2 })];
    out.push(L(k.lineOnTop([plan.x + 3, plan.y + 2.4], [plan.x + plan.w - 3, plan.y + 2.4], TRACK.h, P) + k.lineOnTop([plan.x + 3, plan.y + plan.d - 2.4], [plan.x + plan.w - 3, plan.y + plan.d - 2.4], TRACK.h, P), { tone: "mid", free: true, fine: true }));
    const rollers = [];
    for (let x = plan.x + 8; x < plan.x + plan.w - 4; x += 8) rollers.push(k.lineOnTop([x, plan.y + 3.4], [x, plan.y + plan.d - 3.4], TRACK.h, P));
    out.push(L(rollers.join(""), { tone: "lo", free: true, fine: true }));
    return out.join("");
  };

  // ── The gauge: a post, a beam over the track and a blade the piece must clear ──
  const post = () => slab({ x: GAUGE.x, y: -19, w: 4, d: 4, r: 0.8 }, 0, GAUGE.top, "mid", { steps: 2, bevel: 0.4 });
  const beam = ({ hooks = true, no = false } = {}) => {
    const out = [slab({ x: GAUGE.x, y: -9.5, w: 1, d: 13, r: 0.3 }, GAUGE.clear, GAUGE.top - GAUGE.clear, "hi", { steps: 1, bevel: 0, crease: "lo" })];
    out.push(faceX(GAUGE.x + 1, 3.5, GAUGE.top, `<path class="ui-s" data-t="hi" d="M2.4 8.8V4.6h8.2v4.2"/>${pick(`<path class="ui-s" data-t="lo" d="M2.4 2.6h8.2M2.4 1.6v2M6.5 1.9v1.4M10.6 1.6v2"/>`)}`));
    out.push(slab({ x: GAUGE.x - 1, y: -19, w: 5, d: 26, r: 1 }, GAUGE.top, 3.5, "mid", { steps: 3, bevel: 0.5, seam: GAUGE.top + 1.6 }));
    out.push(...screws([[GAUGE.x + 1.5, -17]], GAUGE.top + 3.5, 1, 0.42));
    out.push(bulb(GAUGE.x + 1.5, -8, GAUGE.top + 3.5, 1.5, hooks ? "pass" : "", false, true));
    out.push(bulb(GAUGE.x + 1.5, 2.5, GAUGE.top + 3.5, 1.5, hooks ? "reject" : "", no));
    return out.join("");
  };

  // ── The ram that knocks the faulty piece off, and the tray it lands on ──
  const housing = () => slab(HOUSING, 0, HOUSING.h, "mid", { steps: 4, bevel: 0.6, seam: 3 }) + screws([[HOUSING.x + 3, HOUSING.y + 3], [HOUSING.x + HOUSING.w - 3, HOUSING.y + 3]], HOUSING.h, 0.9, 0.42).join("") + slab({ x: RAM.x + 2.8, y: RAM.y, w: 2, d: RAM.d, r: 0.5 }, 5.4, 2, "lo", { steps: 1, bevel: 0 });
  const ram = () => slab({ ...RAM, r: 1 }, 4, 5.6, "hi", { steps: 2, bevel: 0.4, crease: "lo" });
  const trayBack = () => slab({ x: TRAY.x, y: TRAY.y, w: TRAY.w, d: TRAY.d, r: TRAY.r }, 0, 1.2, "lo", { steps: 3, bevel: 0.2 }) + slab({ x: TRAY.x, y: TRAY.y, w: 1.2, d: TRAY.d, r: 0.4 }, 1.2, TRAY.h - 1.2, "mid", { steps: 1, bevel: 0.2 });
  const trayFront = () =>
    slab({ x: TRAY.x + TRAY.w - 1.2, y: TRAY.y, w: 1.2, d: TRAY.d, r: 0.4 }, 1.2, TRAY.h - 1.2, "mid", { steps: 1, bevel: 0.2 }) +
    slab({ x: TRAY.x, y: TRAY.y + TRAY.d - 1.2, w: TRAY.w, d: 1.2, r: 0.4 }, 1.2, TRAY.h - 1.2, "mid", { steps: 1, bevel: 0.2 }) +
    faceY(TRAY.x + 5, TRAY.y + TRAY.d, 5.2, `<path class="ui-s" data-t="hi" d="M1.6 .4l2.6 2.6M4.2 .4L1.6 3"/>${pick(`<path class="ui-s" data-t="lo" d="M6.4 1.7h6"/>`)}`);

  // ── The cell: two arms, one key ────────────────────────────────────────
  const floor = () => slab({ x: -42, y: -38, w: 56, d: 30, r: 3 }, 0, 0.8, "lo", { steps: 4, bevel: 0, crease: "none" }) + L(k.planOutline({ x: -40, y: -36, w: 52, d: 26, r: 2 }, 0.8, P, 4), { tone: "faint" });
  const column = (cx) => {
    const plan = { x: cx - COL.w / 2, y: COL.y, w: COL.w, d: COL.d, r: 1.6 };
    return slab(plan, 0, COL.h, "mid", { steps: 4, bevel: 0.6, seam: 6 }) + faceY(cx - 3, COL.y + COL.d, 17, pick(`<rect class="ui-s" data-t="lo" width="6" height="9" rx=".8"/><path class="ui-s" data-t="lo" d="M1.4 2.4h3.2M1.4 4.4h3.2M1.4 6.4h3.2"/>`));
  };
  const rail = () => {
    const x0 = PRESS[0] - COL.w / 2;
    const out = [slab({ x: x0, y: -30.4, w: PRESS[1] - PRESS[0] + COL.w, d: 3, r: 0.8 }, COL.h, 1.4, "lo", { steps: 2, bevel: 0.2 })];
    out.push(L(k.lineOnTop([x0 + 2, -28.9], [x0 + PRESS[1] - PRESS[0] + COL.w - 2, -28.9], COL.h + 1.4, P), { tone: "mid", free: true, fine: true }));
    return out.join("");
  };
  const key = (cx = PRESS[0]) => {
    const out = [slab({ x: cx - 4, y: -33, w: 8, d: 8, r: 1.8 }, COL.h + 1.4, 3.6, "hi", { steps: 4, bevel: 0.5, crease: "lo", lit: true })];
    out.push(top(cx - 4, -33, COL.h + 5.02, `<circle class="ui-s" data-t="hi" cx="4" cy="3.2" r="1.5"/><path class="ui-s" data-t="hi" d="M4 4.7v2.2M4 6h1.3"/>`));
    return out.join("");
  };
  const head = (cx) => cyl(cx, LANE, 1.3, 19, 6, "lo", { steps: 12, crease: "none" }) + cyl(cx, LANE, 4.2, 13, 6, "hi", { steps: 24, bevel: 0.5, crease: "lo" }) + L(k.sideArc(cx, LANE, 4.2, 15.4, P, 20), { tone: "mid", fine: true });
  const arm = (cx, name, { hooks = true, on = false } = {}) => {
    const plan = { x: cx - 4, y: ARM.y, w: 8, d: ARM.d, r: 1.2 };
    const out = [slab(plan, ARM.z, ARM.h, "mid", { steps: 3, bevel: 0.5, seam: ARM.z + 2 })];
    out.push(L(k.lineOnTop([cx - 2.4, ARM.y + 3], [cx - 2.4, ARM.y + ARM.d - 8], ARM.z + ARM.h, P) + k.lineOnTop([cx + 2.4, ARM.y + 3], [cx + 2.4, ARM.y + ARM.d - 8], ARM.z + ARM.h, P), { tone: "lo", free: true, fine: true }));
    out.push(bulb(cx, ARM.y + ARM.d - 4, ARM.z + ARM.h, 1.7, hooks ? name : "", on, true));
    return out.join("");
  };

  // ── What leaves the line: one solid block ──────────────────────────────
  const pallet = () => {
    const out = [slab(PALLET, 0, 2.4, "lo", { steps: 3, bevel: 0.3, seam: 1.2 })];
    const slats = [];
    for (let y = PALLET.y + 4; y < PALLET.y + PALLET.d - 2; y += 4.5) slats.push(k.lineOnTop([PALLET.x + 2, y], [PALLET.x + PALLET.w - 2, y], 2.4, P));
    out.push(L(slats.join(""), { tone: "lo", free: true, fine: true }));
    return out.join("");
  };
  const block = (lit = false) =>
    slab(BLOCK, 2.4, BLOCK.h, "hi", { steps: 4, bevel: 0.7, crease: "lo", lit }) +
    faceY(BLOCK.x + 2, BLOCK.y + BLOCK.d, 2.4 + BLOCK.h - 2.4, `<rect class="ui-s" data-t="lo" width="20" height="4.4" rx=".7"/><text class="ui-t" x="10" y="3.15" font-size="2.2" text-anchor="middle" opacity=".8">1 EJECUTABLE</text>`) +
    L(k.planOutline(k.insetPlan(BLOCK, 2.6), 2.4 + BLOCK.h, P, 3), { tone: "faint" });

  // ── The cartridge and the machine it slots into ────────────────────────
  const host = ({ hooks = true, on = false } = {}) => {
    const out = [slab(HOST, 0, HOST.h, "mid", { steps: 5, bevel: 0.8, seam: 3 })];
    out.push(faceY(HOST.x + 3, HOST.y + HOST.d, HOST.h - 2.4, `<rect class="ui-f" data-t="hi" x="4" y="7.6" width="16" height="8.6" rx="1"/>${pick(`<path class="ui-s" data-t="lo" d="M0 5.6h24"/>`)}<text class="ui-t" x="12" y="3.6" font-size="2.5" text-anchor="middle" opacity=".8">PYTHON · NODE</text>`));
    out.push(faceX(HOST.x + HOST.w, HOST.y + HOST.d - 3, HOST.h - 4, pick(`<path class="ui-s" data-t="lo" d="M0 0h20M0 3h20M0 6h20M0 9h20"/>`)));
    out.push(...screws([[HOST.x + 4, HOST.y + 4], [HOST.x + HOST.w - 4, HOST.y + 4]], HOST.h, 1, 0.45));
    out.push(bulb(HOST.x + HOST.w - 6, HOST.y + HOST.d - 5, HOST.h, 1.9, hooks ? "slotted" : "", on, true));
    return out.join("");
  };
  const bench = () => slab(BENCH, 0, BENCH.h, "lo", { steps: 3, bevel: 0.3, seam: 2.4 }) + L(k.lineOnTop([BENCH.x + 1.6, BENCH.y + 1], [BENCH.x + 1.6, BENCH.y + BENCH.d - 2], BENCH.h, P) + k.lineOnTop([BENCH.x + BENCH.w - 1.6, BENCH.y + 1], [BENCH.x + BENCH.w - 1.6, BENCH.y + BENCH.d - 2], BENCH.h, P), { tone: "mid", free: true, fine: true });
  const cartridge = () =>
    slab(CART, BENCH.h, CART.h, "hi", { steps: 3, bevel: 0.5, crease: "lo", lit: true }) +
    faceY(CART.x + 2, CART.y + CART.d, BENCH.h + CART.h - 1.4, `<rect class="ui-s" data-t="hi" width="10" height="3.6" rx=".6"/>${pick(`<path class="ui-s" data-t="hi" d="M2 1.8h6"/>`)}`) +
    L(k.lineOnTop([CART.x + 3, CART.y + 3], [CART.x + CART.w - 3, CART.y + 3], BENCH.h + CART.h, P) + k.lineOnTop([CART.x + 3, CART.y + 5.4], [CART.x + CART.w - 5, CART.y + 5.4], BENCH.h + CART.h, P), { tone: "mid", free: true, fine: true });

  // ── The port and the scale it reads ────────────────────────────────────
  const port = ({ hooks = true, on = false } = {}) => {
    const out = [slab(PORT, 0, PORT.h, "hi", { steps: 4, bevel: 0.6, crease: "lo", seam: 2.6 })];
    out.push(faceX(PORT.x + PORT.w, PORT.y + PORT.d, PORT.h, `<circle class="ui-s" data-t="hi" cx="7" cy="5.4" r="2.9"/>${pick(`<circle class="ui-f" data-t="hi" cx="6" cy="5" r=".5"/><circle class="ui-f" data-t="hi" cx="8" cy="5" r=".5"/><circle class="ui-f" data-t="hi" cx="7" cy="6.5" r=".5"/>`)}`));
    out.push(faceY(PORT.x + 2, PORT.y + PORT.d, PORT.h - 2, `<text class="ui-t" x="6" y="3.2" font-size="2.6" text-anchor="middle" opacity=".8">PUERTO</text>${pick(`<path class="ui-s" data-t="lo" d="M1 5h10"/>`)}`));
    out.push(bulb(PORT.x + PORT.w / 2, PORT.y + PORT.d / 2, PORT.h, 1.9, hooks ? "reading" : "", on));
    return out.join("");
  };
  const scale = () => {
    const out = [slab(SCALE, 0, SCALE.h, "mid", { steps: 4, bevel: 0.6, seam: 2 })];
    out.push(slab({ x: SCALE.x + 3, y: SCALE.y + 2.5, w: 22, d: 15, r: 1.5 }, SCALE.h, 1.4, "hi", { steps: 3, bevel: 0.3, crease: "lo" }));
    out.push(L(k.planOutline({ x: SCALE.x + 6, y: SCALE.y + 5.5, w: 16, d: 9, r: 1 }, SCALE.h + 1.4, P, 3), { tone: "faint" }));
    out.push(cyl(SCALE.x + 14, SCALE.y + 10, 5, SCALE.h + 1.4, 5.4, "mid", { steps: 26, bevel: 0.5 }), cyl(SCALE.x + 14, SCALE.y + 10, 1.6, SCALE.h + 6.8, 1.6, "mid", { steps: 14 }));
    out.push(faceY(SCALE.x + 4, SCALE.y + SCALE.d, 4.3, screen(13, 3.4, `<path class="scr-s" data-t="hi" d="M2 1.7h5"/><path class="scr-s" data-t="acc" d="M9 1.7h2"/>`, 0.7)));
    return out.join("");
  };

  const body = [
    base(PLATE),
    feed(),
    floor(),
    housing(),
    `<g data-part="ram">${ram()}</g>`,
    post(),
    column(PRESS[0]),
    column(PRESS[1]),
    rail(),
    `<g data-part="key">${key()}</g>`,
    track(),
    trayBack(),
    wire(FEED_LINE, "feed-line"),
    `<g data-part="bad" opacity="0">${piece(START, { tall: true })}</g>`,
    `<g data-part="good" opacity="0">${piece(START)}</g>`,
    beam(),
    `<g data-part="head-a">${head(PRESS[0])}</g>`,
    arm(PRESS[0], "arm-a"),
    `<g data-part="head-b">${head(PRESS[1])}</g>`,
    arm(PRESS[1], "arm-b"),
    trayFront(),
    pallet(),
    block(),
    `<g data-part="done" opacity="0">${block(true)}</g>`,
    host(),
    bench(),
    `<g data-part="cartridge">${cartridge()}</g>`,
    port(),
    wire(READ_LINE, "read-line"),
    scale(),
    label({ x: -58, y: 37, w: 72, d: 11, r: 1 }, "CALIBRE · LLAVE ÚNICA · UN BLOQUE"),
    `<g data-part="beads"><g data-bead="0" opacity="0"><circle class="veo-bead" r="2.3"/></g></g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const move = (by, svg) => `<g transform="${k.translateAlong(P, by)}">${svg}</g>`;
  const cellTrack = { x: -44, y: TRACK.y, w: 60, d: TRACK.d, r: 1.5 };
  const gaugeTrack = { x: -104, y: TRACK.y, w: 46, d: TRACK.d, r: 1.5 };
  const parts = {
    binary: part([shadow({ ...PALLET, r: 3 }), pallet(), block(true)], k.boxCorners(PALLET, 0, BLOCK.h + 4), 16),
    cell: part(
      [
        shadow({ x: -44, y: -38, w: 60, d: 46, r: 4 }),
        floor(),
        column(PRESS[0]),
        column(PRESS[1]),
        rail(),
        key(),
        track(cellTrack),
        move([GO.pressA, 0, 0], piece(START)),
        move([0, 0, GO.head], head(PRESS[0])),
        arm(PRESS[0], "", { hooks: false, on: true }),
        head(PRESS[1]),
        arm(PRESS[1], "", { hooks: false }),
      ],
      [...k.boxCorners({ x: -44, y: -38, w: 60, d: 46 }, 0, COL.h + 6)],
      12,
    ),
    insert: part(
      [shadow({ x: HOST.x, y: HOST.y, w: HOST.w, d: HOST.d + BENCH.d, r: 4 }), host({ hooks: false, on: true }), bench(), cartridge()],
      [...k.boxCorners(HOST, 0, HOST.h + 3), ...k.boxCorners(BENCH, 0, BENCH.h)],
      12,
    ),
    port: part(
      [shadow({ x: PORT.x, y: PORT.y, w: SCALE.x + SCALE.w - PORT.x, d: 28, r: 4 }), port({ hooks: false, on: true }), wire(READ_LINE, "", true), scale()],
      [...k.boxCorners(PORT, 0, PORT.h + 3), ...k.boxCorners(SCALE, 0, 12)],
      14,
    ),
    detail: part(
      [
        shadow({ x: -104, y: -34, w: 46, d: 66, r: 4 }),
        housing(),
        move([0, GO.ram * 0.4, 0], ram()),
        post(),
        track(gaugeTrack),
        trayBack(),
        move([GO.stop, 0, 0], piece(START, { tall: true })),
        beam({ hooks: false, no: true }),
        trayFront(),
      ],
      [...k.boxCorners({ x: -104, y: -34, w: 46, d: 66 }, 0, 8), [GAUGE.x, -19, GAUGE.top + 8]],
      12,
    ),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("gaugeline", {
  width: W,
  height: H,
  label:
    "Una línea de montaje sobre una placa. A la izquierda, un calibre de altura sobre la vía: la pieza que cabe pasa por debajo y la defectuosa, más alta, se desvía a una bandeja. En el centro, una celda con dos brazos y una sola llave sobre un carril: solo baja sobre la pieza el brazo que tiene la llave. Al final de la vía sale un bloque macizo. A la derecha, un cartucho que encaja en una máquina que ya existe y un puerto conectado a una báscula.",
  body: full.body,
  motion: { P, read: flat(READ_LINE), feed: flat(FEED_LINE), go: GO, out: CART.out },
  thumb: small.body
    .join("")
    .replace('<g data-part="good" opacity="0">', `<g transform="${k.translateAlong(P, [GO.pressA, 0, 0])}">`)
    .replace('<g data-part="bad" opacity="0">', `<g transform="${k.translateAlong(P, [GO.stop, 0, 0])}">`)
    .replace('<g data-part="head-a">', `<g transform="${k.translateAlong(P, [0, 0, GO.head])}">`)
    .replace('<g data-part="arm-a" class="veo-lamp" data-tone="ok">', '<g class="veo-lamp" data-tone="ok" data-on="">')
    .replace('<g data-part="reject" class="veo-lamp">', '<g class="veo-lamp" data-on="">'),
  parts: full.parts,
});
