// WebAssembly: an encapsulating press. The Rust core goes under the ram as an ingot
// and comes out sealed in a capsule. Three of them, all alike, run down the lane and
// each drops into a dock: the one before a browser window, the one before a desktop
// app and the one before a server. To the right, a capsule in its glass box: data
// goes in by one port, the result comes out by the other and nothing else gets through.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const LANE_Z = 3;
const SEAT = { x: -95, y: -26 };
const LANE1 = { x: -101, y: -36, w: 12, d: 52, r: 1.2 };
const LANE2 = { x: -101, y: 16, w: 163, d: 12, r: 1.2 };
const RUN = 22;
const DOCK_Y = 9;
const DOCKS = [-46, 4, 46];
const SCREEN = { y: -22, w: 40, h: 26, neck: 6 };
const SERVER = { x: 34, y: -28, w: 24, d: 26, r: 2, h: 30 };
const POSTS = [-111, -85];
const BEAM = { x: -112, y: -31, w: 34, d: 10, r: 1.5, z: 26, h: 5 };
const RAM = { r: 6.2, z: 15, h: 9, stroke: -3.6 };
const BOX = { x: 74, y: -24, w: 42, d: 38, r: 2.5, h: 3 };
const GLASS = { x: 78, y: -20, w: 34, d: 24, r: 2, h: 16 };
const INSIDE = { x: 95, y: -8 };
const PORTS = [84, 106];

const IN_LINE = [
  [PORTS[0], 30, 0.9],
  [PORTS[0], BOX.y + BOX.d + 0.4, 0.9],
  [PORTS[0], BOX.y + BOX.d - 4, BOX.h + 1.6],
  [PORTS[0], GLASS.y + GLASS.d - 4, BOX.h + 0.5],
  [INSIDE.x - 4, INSIDE.y + 2, BOX.h + 0.5],
];
const OUT_LINE = [
  [INSIDE.x + 4, INSIDE.y + 2, BOX.h + 0.5],
  [PORTS[1], GLASS.y + GLASS.d - 4, BOX.h + 0.5],
  [PORTS[1], BOX.y + BOX.d - 4, BOX.h + 1.6],
  [PORTS[1], BOX.y + BOX.d + 0.4, 0.9],
  [PORTS[1], 30, 0.9],
];
const ESCAPE = [
  [INSIDE.x + 4, INSIDE.y, BOX.h + 8],
  [GLASS.x + GLASS.w - 0.6, INSIDE.y, BOX.h + 8],
];
const linkOf = (i) => (i < 2 ? [[DOCKS[i], 2, 0.9], [DOCKS[i], SCREEN.y + 6, 0.9]] : [[DOCKS[i], 2, 0.9], [DOCKS[i], SERVER.y + SERVER.d + 0.6, 0.9], [DOCKS[i], SERVER.y + SERVER.d, 3]]);

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [BEAM.x, BEAM.y, 38], [SERVER.x + SERVER.w, SERVER.y, 34]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, slab, cyl, base, label, lamp, top, faceY, faceX, cable, shadow, pick, thumb, display, windowBar } = kitFor(P, { lod });
  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);
  const bulb = (x, y, z, r, part, on = false, ok = false) => {
    const svg = lamp(x, y, z, r, part, on);
    return ok ? svg.replace('class="veo-lamp"', 'class="veo-lamp" data-tone="ok"') : svg;
  };

  // ── The capsule: the same one everywhere ───────────────────────────────
  const capsule = (x, y, z = LANE_Z) =>
    cyl(x, y, 4.6, z, 7.4, "hi", { steps: 26, bevel: 1.2, crease: "lo" }) + L(k.sideArc(x, y, 4.6, z + 2.6, P, 22) + k.sideArc(x, y, 4.6, z + 4.4, P, 22), { tone: "lit" }) + cyl(x, y, 1.8, z + 7.4, 0.9, "mid", { steps: 12 });
  const ingot = () => slab({ x: SEAT.x - 4.4, y: SEAT.y - 4.4, w: 8.8, d: 8.8, r: 1 }, LANE_Z, 6, "hi", { steps: 3, bevel: 0.4, crease: "lo", lit: true });

  // ── The press ──────────────────────────────────────────────────────────
  const lane = (plan) => slab(plan, 0, LANE_Z, "lo", { steps: 3, bevel: 0.3, seam: 1.2 });
  const lane1 = (plan = LANE1) => lane(plan) + L(k.lineOnTop([plan.x + 2, plan.y + 2], [plan.x + 2, plan.y + plan.d - 2], LANE_Z, P) + k.lineOnTop([plan.x + plan.w - 2, plan.y + 2], [plan.x + plan.w - 2, plan.y + plan.d - 2], LANE_Z, P), { tone: "mid", free: true, fine: true }) + L(k.ring(SEAT.x, SEAT.y, 5.4, LANE_Z, P, 28), { tone: "mid", fine: true });
  const plinth = () => slab({ x: -116, y: -40, w: 42, d: 22, r: 2.5 }, 0, 1.2, "lo", { steps: 4, bevel: 0.2 });
  const post = (x) => slab({ x, y: -30, w: 6, d: 8, r: 1.2 }, 0, BEAM.z, "mid", { steps: 3, bevel: 0.5, seam: 5 });
  const ram = () => cyl(SEAT.x, SEAT.y, 2, RAM.z + RAM.h, 8, "lo", { steps: 14, crease: "none" }) + cyl(SEAT.x, SEAT.y, RAM.r, RAM.z, RAM.h, "hi", { steps: 30, bevel: 0.6, crease: "lo" }) + L(k.sideArc(SEAT.x, SEAT.y, RAM.r, RAM.z + 2.4, P, 24), { tone: "mid", fine: true });
  const beam = ({ hooks = true, on = false } = {}) =>
    slab(BEAM, BEAM.z, BEAM.h, "mid", { steps: 4, bevel: 0.6, seam: BEAM.z + 1.6 }) +
    faceY(BEAM.x + 5, BEAM.y + BEAM.d, BEAM.z + BEAM.h - 0.6, `<text class="ui-t" x="12" y="3.1" font-size="2.7" text-anchor="middle" opacity=".85">RUST → WASM</text>`) +
    bulb(BEAM.x + BEAM.w - 5, BEAM.y + 5, BEAM.z + BEAM.h, 1.7, hooks ? "sealing" : "", on);

  // ── The lane, its three docks and what stands behind each ──────────────
  const lane2 = (plan = LANE2) => lane(plan) + L(k.lineOnTop([plan.x + 2, plan.y + 2], [plan.x + plan.w - 2, plan.y + 2], LANE_Z, P) + k.lineOnTop([plan.x + 2, plan.y + plan.d - 2], [plan.x + plan.w - 2, plan.y + plan.d - 2], LANE_Z, P), { tone: "mid", free: true, fine: true });
  const dock = (i, { hooks = true, on = false } = {}) => {
    const x = DOCKS[i];
    const out = [slab({ x: x - 6, y: 2, w: 12, d: 14.4, r: 1.2 }, 0, LANE_Z, "lo", { steps: 3, bevel: 0.3, seam: 1.2 })];
    out.push(cyl(x, DOCK_Y, 6, LANE_Z, 0.9, "mid", { steps: 26 }), L(k.ring(x, DOCK_Y, 4.7, LANE_Z + 0.9, P, 26), { tone: "hi", fine: true }));
    out.push(bulb(x + 10, 7, 0, 1.8, hooks ? `dock-${i}` : "", on, true));
    return out.join("");
  };
  const gw = SCREEN.w - 2.4;
  const answer = (i, hooks, shown) => {
    const mark = `<rect class="scr-f" data-t="acc" x="${i ? 13 : 4}" y="15.2" width="${i ? 20 : 22}" height="4.4" rx="1"/>`;
    return hooks ? `<g data-part="result-${i}" opacity="0">${mark}</g>` : shown ? mark : "";
  };
  const browserUi = ({ hooks = true, shown = false } = {}) =>
    `<rect class="scr-f" x="3" y="2.2" width="${gw - 6}" height="3.6" rx="1.8"/>${pick(`<circle class="scr-f" data-t="mid" cx="5.4" cy="4" r=".8"/><path class="scr-s" data-t="dim" d="M8 4h14"/>`)}<path class="scr-s" data-t="hi" d="M4 10h18"/>${pick(`<path class="scr-s" data-t="dim" d="M4 12.6h26"/>`)}${answer(0, hooks, shown)}`;
  const appUi = ({ hooks = true, shown = false } = {}) =>
    `${windowBar(gw, "app")}<rect class="scr-f" x="2" y="7" width="8.6" height="14.4" rx="1"/>${pick(`<path class="scr-s" data-t="dim" d="M4 9.6h4.6M4 12h4.6M4 14.4h4.6"/>`)}<path class="scr-s" data-t="hi" d="M13 10h14"/>${pick(`<path class="scr-s" data-t="dim" d="M13 12.6h20"/>`)}${answer(1, hooks, shown)}`;
  const screenAt = (i, opts) => display({ x: DOCKS[i] - SCREEN.w / 2, y: SCREEN.y, w: SCREEN.w, h: SCREEN.h, neck: SCREEN.neck }, i ? appUi(opts) : browserUi(opts));
  const server = ({ hooks = true, on = false } = {}) => {
    const out = [slab(SERVER, 0, SERVER.h, "mid", { steps: 5, bevel: 0.8, seam: 3 })];
    const units = [0, 1, 2, 3].map((n) => `<rect class="ui-s" data-t="lo" y="${n * 6.2}" width="18" height="4.6" rx=".6"/>${pick(`<circle class="ui-f" data-t="hi" cx="2.4" cy="${n * 6.2 + 2.3}" r=".6"/><path class="ui-s" data-t="lo" d="M5.4 ${n * 6.2 + 2.3}h9"/>`)}`).join("");
    out.push(faceY(SERVER.x + 3, SERVER.y + SERVER.d, SERVER.h - 3, units));
    out.push(faceX(SERVER.x + SERVER.w, SERVER.y + SERVER.d - 3, SERVER.h - 4, pick(`<path class="ui-s" data-t="lo" d="M0 0h20M0 3h20M0 6h20M0 9h20"/>`)));
    out.push(bulb(SERVER.x + SERVER.w - 6, SERVER.y + SERVER.d - 6, SERVER.h, 1.8, hooks ? "result-2" : "", on, true));
    return out.join("");
  };

  // ── The glass box: two ports and nothing else ──────────────────────────
  const boxBase = () => {
    const out = [slab(BOX, 0, BOX.h, "mid", { steps: 5, bevel: 0.6, seam: 1.2 })];
    PORTS.forEach((x, n) => {
      out.push(slab({ x: x - 3.4, y: BOX.y + BOX.d - 7.4, w: 6.8, d: 6.8, r: 1.4 }, BOX.h, 2.4, "hi", { steps: 3, bevel: 0.3, crease: "lo" }));
      // An arrow on each port: one points in, the other out.
      const y0 = BOX.y + BOX.d - 6;
      const tip = n ? y0 + 4 : y0;
      out.push(L(k.lineOnTop([x, y0], [x, y0 + 4], BOX.h + 2.4, P) + k.lineOnTop([x - 1.4, tip + (n ? -1.6 : 1.6)], [x, tip], BOX.h + 2.4, P) + k.lineOnTop([x + 1.4, tip + (n ? -1.6 : 1.6)], [x, tip], BOX.h + 2.4, P), { tone: "hi", free: true }));
    });
    return out.join("");
  };
  const glass = ({ hooks = true, blocked = false } = {}) => {
    const cross = faceX(GLASS.x + GLASS.w, INSIDE.y + 4, BOX.h + 12, `<path class="ui-s" data-t="acc" d="M1 1l6 6M7 1l-6 6"/>`);
    return (
      `<g opacity=".55" class="veo-glass">${slab(GLASS, BOX.h, GLASS.h, "hi", { steps: 4, bevel: 0.5, crease: "lo" })}</g>` +
      L(k.planOutline(k.insetPlan(GLASS, 1.6), BOX.h + GLASS.h, P, 4), { tone: "faint" }) +
      (hooks ? `<g data-part="blocked" opacity="0">${cross}</g>` : blocked ? cross : "")
    );
  };
  const inside = ({ hooks = true, on = false } = {}) => capsule(INSIDE.x, INSIDE.y, BOX.h) + `<g${hooks ? ' data-part="running"' : ""} class="veo-lamp"${on ? ' data-on=""' : ""}>${cyl(INSIDE.x, INSIDE.y, 1.8, BOX.h + 7.4, 0.9, "hi", { steps: 12, crease: "lo" })}</g>`;
  const terminals = () => PORTS.map((x) => cyl(x, 30, 2.6, 0, 1.4, "mid", { steps: 16 })).join("");

  const body = [
    base(PLATE),
    plinth(),
    post(POSTS[0]),
    screenAt(0),
    screenAt(1),
    server(),
    lane1(),
    `<g data-part="ingot" opacity="0">${ingot()}</g>`,
    `<g data-part="sealed" opacity="0">${capsule(SEAT.x, SEAT.y)}</g>`,
    `<g data-part="ram">${ram()}</g>`,
    post(POSTS[1]),
    beam(),
    boxBase(),
    wire(IN_LINE.slice(2), "in-run"),
    wire(OUT_LINE.slice(0, 3), "out-run"),
    inside(),
    glass(),
    wire(IN_LINE.slice(0, 3), "in-line"),
    wire(OUT_LINE.slice(2), "out-line"),
    terminals(),
    ...[0, 1, 2].map((i) => wire(linkOf(i), `link-${i}`)),
    ...[0, 1, 2].map((i) => dock(i)),
    lane2(),
    ...[0, 1, 2].map((i) => `<g data-part="capsule-${i}" opacity="0">${capsule(SEAT.x, SEAT.y)}</g>`),
    label({ x: 56, y: 38, w: 62, d: 11, r: 1 }, "UNA CÁPSULA · TRES BASES"),
    `<g data-part="beads"><g data-bead="0" opacity="0"><circle class="veo-bead" r="2.3"/></g></g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const move = (by, svg) => `<g transform="${k.translateAlong(P, by)}">${svg}</g>`;
  const docked = (i) => move([DOCKS[i] - SEAT.x, DOCK_Y - SEAT.y, 0.9], capsule(SEAT.x, SEAT.y));
  const strip = (x0, x1) => ({ x: x0, y: LANE2.y, w: x1 - x0, d: LANE2.d, r: 1.2 });
  const parts = {
    browser: part(
      [shadow({ x: DOCKS[0] - 22, y: SCREEN.y - 4, w: 44, d: 48, r: 4 }), screenAt(0, { hooks: false, shown: true }), wire(linkOf(0), "", true), dock(0, { hooks: false, on: true }), lane2(strip(DOCKS[0] - 22, DOCKS[0] + 22)), docked(0)],
      [...k.boxCorners({ x: DOCKS[0] - 22, y: SCREEN.y, w: 44, d: 50 }, 0, 4), [DOCKS[0] - 20, SCREEN.y, SCREEN.neck + SCREEN.h + 3]],
      10,
    ),
    docks: part(
      [shadow({ x: DOCKS[0] - 14, y: 0, w: DOCKS[2] - DOCKS[0] + 30, d: 30, r: 4 }), ...[0, 1, 2].map((i) => dock(i, { hooks: false, on: true })), lane2(strip(DOCKS[0] - 14, DOCKS[2] + 16)), ...[0, 1, 2].map(docked)],
      k.boxCorners({ x: DOCKS[0] - 14, y: 0, w: DOCKS[2] - DOCKS[0] + 30, d: 30 }, 0, 14),
      10,
    ),
    press: part(
      [shadow({ x: -116, y: -40, w: 42, d: 40, r: 4 }), plinth(), post(POSTS[0]), lane1({ ...LANE1, d: 36 }), capsule(SEAT.x, SEAT.y), move([0, 0, RAM.stroke * 0.5], ram()), post(POSTS[1]), beam({ hooks: false, on: true })],
      [...k.boxCorners({ x: -116, y: -40, w: 42, d: 40 }, 0, 4), [BEAM.x, BEAM.y, BEAM.z + BEAM.h + 4]],
      10,
    ),
    sandbox: part(
      [shadow({ ...BOX, d: BOX.d + 10, r: 4 }), boxBase(), wire(IN_LINE.slice(2), "", true), wire(OUT_LINE.slice(0, 3)), inside({ hooks: false, on: true }), glass({ hooks: false }), wire(IN_LINE.slice(0, 3), "", true), wire(OUT_LINE.slice(2)), terminals()],
      [...k.boxCorners({ ...BOX, d: BOX.d + 10 }, 0, 4), [GLASS.x, GLASS.y, BOX.h + GLASS.h + 3]],
      10,
    ),
    detail: part([shadow({ x: SEAT.x - 9, y: SEAT.y - 9, w: 18, d: 18, r: 9 }), cyl(SEAT.x, SEAT.y, 7.6, 0, 1.4, "lo", { steps: 30 }), L(k.ring(SEAT.x, SEAT.y, 5.6, 1.4, P, 28), { tone: "mid" }), capsule(SEAT.x, SEAT.y, 1.4)], k.boxCorners({ x: SEAT.x - 8, y: SEAT.y - 8, w: 16, d: 16 }, 0, 10), 16),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("capsule", {
  width: W,
  height: H,
  label:
    "Una encapsuladora sobre una placa. A la izquierda, una prensa con su pistón sobre el inicio de una vía: de ella sale una cápsula. La vía recorre el frente y tiene tres bases redondas; detrás de cada una hay, por orden, una pantalla con una página web, otra con una aplicación de escritorio y un servidor. A la derecha, una cápsula dentro de una caja de cristal con dos puertos: por uno entran los datos y por el otro sale el resultado.",
  body: full.body,
  motion: {
    P,
    lanes: [RUN - SEAT.y, DOCK_Y - RUN],
    docks: DOCKS.map((x) => x - SEAT.x),
    stroke: RAM.stroke,
    in: flat(IN_LINE),
    out: flat(OUT_LINE),
    escape: flat(ESCAPE),
  },
  thumb: small.body
    .join("")
    .replace('<g data-part="capsule-0" opacity="0">', `<g transform="${k.translateAlong(P, [DOCKS[0] - SEAT.x, DOCK_Y - SEAT.y, 0.9])}">`)
    .replace('<g data-part="capsule-1" opacity="0">', `<g transform="${k.translateAlong(P, [DOCKS[1] - SEAT.x - 22, RUN - SEAT.y, 0])}">`)
    .replace('<g data-part="sealed" opacity="0">', "<g>")
    .replace('<g data-part="result-0" opacity="0">', "<g>")
    .replace('<g data-part="dock-0" class="veo-lamp" data-tone="ok">', '<g class="veo-lamp" data-tone="ok" data-on="">'),
  parts: full.parts,
});
