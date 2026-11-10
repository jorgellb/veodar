// Fig. 01 · Línea de triaje con IA.
// A card magazine feeds documents onto a belt; a reader head (the model) scores
// each one; a dial gauge shows the confidence against a threshold; a shuttle
// routes the card to its tray, and anything under the threshold goes to the
// review tray, where a spring stamp (the person) presses before it is filed.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import * as k from "../src/iso/iso-kit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "../src/generated");
mkdirSync(OUT, { recursive: true });

const WIDTH = 1000;
const HEIGHT = 560;

// ── World ────────────────────────────────────────────────────────────────
const PLATE = { x: -188, y: -76, w: 374, d: 152, r: 12 };
const BELT_TOP = 18;
const CARD = { w: 24, d: 20, h: 1.4 };
const CARD_REST = [-142, 0, BELT_TOP];
const MAG = { x: -162, y: -22, w: 38, d: 44 };
const STACK_Z = 20.2;
const STACK_COUNT = 7;
const STACK_TOP = STACK_Z + STACK_COUNT * 2 - 0.6;
const BELT = { x: -124, y: -17, w: 188, d: 34, r: 5 };
const GANTRY_X = -40;
const LENS = { r: 6.5, z0: 42, z1: 50 };
const SHUTTLE_X = 92;
const LANES = [
  { name: "ERP", y: -45 },
  { name: "Soporte", y: -15 },
  { name: "CRM", y: 15 },
  { name: "Revisión", y: 45 },
];
const TRAY_X = 144;
const TRAY_FLOOR = 16;
const STAMP = { x: TRAY_X, y: LANES[3].y, rest: 27, press: 19.6, arm: 58 };
const GAUGE = { x: -92, y: 44, r: 14, z: 12, h: 7 };
const KNOB = { x: -66, y: 54, r: 4.6, z: 9, h: 5 };
const ARC = { from: -0.75 * Math.PI, span: 1.5 * Math.PI };

const P = k.fitProjection(
  [
    ...k.boxCorners(PLATE, -18, 0),
    [GANTRY_X, -40, 82],
    [GANTRY_X, 40, 82],
    [174, 45, 70],
    [-150, -22, 60],
  ],
  WIDTH,
  HEIGHT,
  { pad: 26, azimuth: 50, elevation: 30 },
);

// ── Helpers ──────────────────────────────────────────────────────────────
const at = (point) => k.iso(point, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => (d ? k.lineSvg(d, style) : "");
const D = (points, style) => k.dotsSvg(points, style);
const slab = (plan, z, h, tone, { steps = 4, bevel = 0.5, crease, lit, seam, className } = {}) =>
  S(k.slabOf(plan, z, h, P, steps, bevel), {
    tone,
    crease,
    lit,
    className,
    inner: seam === undefined ? "" : L(k.sideSeam(plan, seam, P, steps), { tone: "faint" }),
  });
const cyl = (x, y, r, z, h, tone, { steps = 28, bevel = 0, crease, lit } = {}) =>
  S(k.cylinder(x, y, r, z, h, P, steps, bevel), { tone, crease, lit });
const screws = (points, z, r = 1.7) => [
  L(points.map(([x, y]) => k.ring(x, y, r, z, P, 14)).join(""), { tone: "lo" }),
  D(points.map(([x, y]) => at([x, y, z])), { size: 0.55 }),
];
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
// A closed slot on a vertical face (normal ±y at `y`), from x0..x1 and z0..z1.
const slotOnY = (x0, x1, y, z0, z1, r = 1.2) => {
  const pts = [];
  const corners = [
    [x1 - r, z1 - r, 0],
    [x0 + r, z1 - r, 0.25],
    [x0 + r, z0 + r, 0.5],
    [x1 - r, z0 + r, 0.75],
  ];
  for (const [cx, cz, turn] of corners) {
    for (let i = 0; i <= 4; i++) {
      const a = (turn + i / 16) * Math.PI * 2;
      pts.push(at([cx + Math.cos(a) * r, y, cz + Math.sin(a) * r]));
    }
  }
  return k.pathOf(pts, true);
};
const slotOnX = (x, y0, y1, z0, z1, r = 1.2) => {
  const pts = [];
  const corners = [
    [y1 - r, z1 - r, 0],
    [y0 + r, z1 - r, 0.25],
    [y0 + r, z0 + r, 0.5],
    [y1 - r, z0 + r, 0.75],
  ];
  for (const [cy, cz, turn] of corners) {
    for (let i = 0; i <= 4; i++) {
      const a = (turn + i / 16) * Math.PI * 2;
      pts.push(at([x, cy + Math.cos(a) * r, cz + Math.sin(a) * r]));
    }
  }
  return k.pathOf(pts, true);
};
export function coilZ(z0, z1, cx, cy, radius, turns, proj) {
  const count = Math.max(12, Math.round(turns * 18));
  const [vx, vy] = k.towardViewer(proj);
  const back = [];
  const front = [];
  let run = [];
  let near = null;
  for (let i = 0; i <= count; i++) {
    const share = i / count;
    const angle = share * turns * Math.PI * 2;
    const flat = k.iso([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle), z0 + (z1 - z0) * share], proj);
    const facing = Math.cos(angle) * vx + Math.sin(angle) * vy > 0;
    if (near === null) near = facing;
    if (facing !== near) {
      run.push(flat);
      (near ? front : back).push(k.pathOf(run));
      run = [flat];
      near = facing;
      continue;
    }
    run.push(flat);
  }
  if (run.length > 1) (near ? front : back).push(k.pathOf(run));
  return { back: back.join(""), front: front.join("") };
}

// Items above the base are depth-sorted live in the page; each carries its key point.
const stack = [];
const item = (key, svg, part) => stack.push({ key, svg, part });

// ── Base ─────────────────────────────────────────────────────────────────
function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(PLATE, -18, 14, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(PLATE, 22))) {
    out.push(cyl(x, y, 7.2, -18, 1.6, "lo", { steps: 28 }));
    out.push(cyl(x, y, 5.4, -16.4, 4.4, "mid", { steps: 28 }));
  }
  out.push(slab(PLATE, -12, 12, "mid", { steps: 8, bevel: 1.6, seam: -5 }));
  out.push(L(k.planOutline(k.insetPlan(PLATE, 5), 0, P), { tone: "lo" }));
  out.push(...screws(k.corners(PLATE, 10), 0, 2.2));

  // Ruler strip along the front edge.
  const strip = { x: -112, y: PLATE.y + PLATE.d - 13, w: 196, d: 7, r: 1 };
  out.push(slab(strip, 0, 0.6, "lo", { steps: 3, bevel: 0, crease: "none" }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.8, 0.6, [2, 3.8], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));

  // Label plate, front left.
  const label = { x: -176, y: 44, w: 50, d: 15, r: 1.2 };
  out.push(slab(label, 0, 0.8, "lo", { steps: 3, bevel: 0, crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.6), 0.8, P, 3), { tone: "faint" }));
  out.push(k.faceTextSvg(k.topMatrix([label.x + 4.2, label.y + 6.4], 0.8, P), "VEODAR · L-01", { size: 3.1, tone: "hi" }));
  for (const [inset, len] of [
    [9.6, 34],
    [12, 24],
  ]) {
    out.push(L(k.lineOnTop([label.x + 4.2, label.y + inset], [label.x + 4.2 + len, label.y + inset], 0.8, P), { tone: "lo", free: true }));
  }
  out.push(D([at([label.x + label.w - 3.2, label.y + 3.2, 0.8]), at([label.x + label.w - 3.2, label.y + label.d - 3.2, 0.8])], { size: 0.45 }));

  // Controller box behind the gantry, with vents and status dots.
  const box = { x: -66, y: -66, w: 44, d: 18, r: 2 };
  out.push(slab(box, 0, 15, "mid", { steps: 4, bevel: 0.6, seam: 4 }));
  for (let i = 0; i < 5; i++) out.push(L(slotOnY(box.x + 6 + i * 5.6, box.x + 9 + i * 5.6, box.y + box.d, 6.5, 12), { tone: "lo" }));
  out.push(D([0, 1, 2].map((i) => at([box.x + box.w - 10 + i * 3.4, box.y + box.d - 4, 15])), { size: 0.7, tone: "hi" }));
  out.push(...screws(k.corners(box, 3), 15, 1.2));

  // Shuttle rails along y, end stops and a ruler between them.
  for (const x of [76, 103]) {
    out.push(slab({ x, y: -62, w: 5, d: 124, r: 1 }, 0, 6, "mid", { steps: 3, bevel: 0.4 }));
    out.push(D([-56, 0, 56].map((y) => at([x + 2.5, y, 6])), { size: 0.45 }));
  }
  const rule = { x: 84, y: -58, w: 15, d: 116, r: 1 };
  out.push(slab(rule, 0, 0.6, "lo", { steps: 3, bevel: 0, crease: "none" }));
  const rt = k.topTicks(rule.y + 3, rule.y + rule.d - 3, 3, 5, rule.x + 0.8, 0.6, [2.4, 4.6], P, "y");
  out.push(L(rt.minor, { tone: "lo" }), L(rt.major, { tone: "mid" }));
  for (const lane of LANES) {
    out.push(L(k.lineOnTop([rule.x + 0.8, lane.y], [rule.x + 9, lane.y], 0.6, P), { tone: "hi" }));
  }
  return out.join("");
}

// ── Conveyor (below the card plane) ──────────────────────────────────────
let beltTop = "";
function conveyor() {
  const out = [];
  // Legs under the rails.
  for (const [x, y] of byDepth([
    [-112, -19],
    [52, -19],
    [-112, 19],
    [52, 19],
    [-36, -19],
    [-36, 19],
  ])) {
    out.push(cyl(x, y, 4, 0, 1.4, "lo", { steps: 20 }));
    out.push(cyl(x, y, 2.4, 1.4, 6.8, "mid", { steps: 18, crease: "none" }));
  }
  out.push(slab({ x: -124, y: -21, w: 190, d: 4, r: 1 }, 8, 10, "mid", { steps: 3, bevel: 0.4 }));
  const beltPaths = k.slabOf(BELT, 13, 5, P, 6, 0.5);
  beltTop = beltPaths.top;
  out.push(S(beltPaths, { tone: "hi", crease: "lo" }));
  // Cleats: drawn once, moved along x and clipped to the belt top in the page.
  const cleats = [];
  for (let x = BELT.x - 12; x <= BELT.x + BELT.w + 12; x += 12) {
    cleats.push(k.lineOnTop([x, BELT.y + 1.2], [x, BELT.y + BELT.d - 1.2], BELT_TOP, P));
  }
  out.push(
    `<clipPath id="plant-belt"><path d="${beltTop}"/></clipPath><g clip-path="url(#plant-belt)"><g data-part="cleats">${L(cleats.join(""), { tone: "lo" })}</g></g>`,
  );
  // Scan spot on the belt under the lens.
  out.push(
    `<g data-part="spot" opacity="0">${L(k.ring(GANTRY_X, 0, 15.5, BELT_TOP + 0.02, P, 48), { tone: "lit" })}${L(
      k.ring(GANTRY_X, 0, 12.6, BELT_TOP + 0.02, P, 48),
      { tone: "lit", dotted: true },
    )}</g>`,
  );
  // Front rail with roller hubs.
  const front = { x: -124, y: 17, w: 190, d: 4, r: 1 };
  out.push(slab(front, 8, 10, "mid", { steps: 3, bevel: 0.4 }));
  const hubs = [-118, -88, -58, -28, 2, 32, 58];
  out.push(L(hubs.map((x) => k.sideRing([x, 21, 13], 2.2, "y", P, 18)).join(""), { tone: "lo" }));
  out.push(D(hubs.map((x) => at([x, 21, 13])), { size: 0.5 }));
  // Dead plate between belt and shuttle.
  out.push(slab({ x: 63, y: -12, w: 10, d: 24, r: 1 }, 14, 4, "mid", { steps: 3, bevel: 0.4 }));
  return out.join("");
}

// ── Magazine (inbox) ─────────────────────────────────────────────────────
function magazine() {
  // Pedestal and back parts.
  const back = [];
  back.push(slab({ ...MAG, r: 2 }, 0, BELT_TOP, "mid", { steps: 4, bevel: 0.6, seam: 6 }));
  back.push(L(k.planOutline(k.insetPlan({ ...MAG, r: 2 }, 3), BELT_TOP, P, 3), { tone: "faint" }));
  back.push(slab({ x: MAG.x, y: MAG.y, w: 5, d: MAG.d, r: 1 }, BELT_TOP, 30, "mid", { steps: 3, bevel: 0.4 }));
  back.push(slab({ x: MAG.x + 5, y: MAG.y, w: 31, d: 4, r: 1 }, BELT_TOP, 30, "mid", { steps: 3, bevel: 0.4 }));
  item([-150, -20, 30], back.join(""));

  // The waiting stack, the weight plate, its rod, spring and bridge.
  const cards = [];
  for (let i = 0; i < STACK_COUNT; i++) {
    const z = STACK_Z + i * 2;
    cards.push(slab({ x: -154, y: -10, w: CARD.w, d: CARD.d, r: 1.2 }, z, CARD.h, "hi", { steps: 3, bevel: 0, crease: "lo" }));
  }
  const weight = { x: -153, y: -9, w: 22, d: 18, r: 1.4 };
  cards.push(slab(weight, STACK_TOP + 0.6, 3, "mid", { steps: 3, bevel: 0.5 }));
  const spring = coilZ(STACK_TOP + 3.6, 47.6, -142, 0, 3.4, 5, P);
  cards.push(L(spring.back, { tone: "lo" }));
  cards.push(cyl(-142, 0, 1.3, STACK_TOP + 3.6, 58 - STACK_TOP - 3.6, "hi", { steps: 14, crease: "none" }));
  cards.push(L(spring.front, { tone: "mid" }));
  item([-142, 0, 34], cards.join(""));

  const bridge = { x: -146, y: MAG.y, w: 8, d: MAG.d, r: 1 };
  item(
    [-142, 2, 50],
    [
      slab(bridge, 47.6, 3, "mid", { steps: 3, bevel: 0.4 }),
      ...screws(
        [
          [-142, MAG.y + 3],
          [-142, MAG.y + MAG.d - 3],
        ],
        50.6,
        1,
      ),
      cyl(-142, 0, 3.8, 50.6, 1.4, "mid", { steps: 22 }),
      cyl(-142, 0, 3.2, 52, 5, "mid", { steps: 24, bevel: 0.3 }),
      L(k.knurl(-142, 0, 3.2, 52, 57, 26, P), { tone: "lo" }),
    ].join(""),
  );

  // Near side wall with a viewing slot, and the gate over the exit slot.
  const near = [];
  near.push(slab({ x: MAG.x + 5, y: MAG.y + MAG.d - 4, w: 31, d: 4, r: 1 }, BELT_TOP, 30, "mid", { steps: 3, bevel: 0.4 }));
  near.push(L(slotOnY(MAG.x + 12, MAG.x + 30, MAG.y + MAG.d, STACK_Z + 1, STACK_TOP + 2, 1.6), { tone: "lo" }));
  near.push(D([at([MAG.x + 8, MAG.y + MAG.d, 44]), at([MAG.x + 33, MAG.y + MAG.d, 44])], { size: 0.5 }));
  item([-142, 20, 32], near.join(""));
  item(
    [-125.5, 0, 34],
    [
      slab({ x: -127, y: MAG.y + 4, w: 3, d: MAG.d - 8, r: 0.6 }, 22.5, 25.5, "mid", { steps: 2, bevel: 0.3 }),
      L(slotOnX(-124, -10, 10, 30, 42, 1.4), { tone: "lo" }),
    ].join(""),
  );
}

// ── Gantry with the reader head ──────────────────────────────────────────
function gantry() {
  const post = (y) =>
    [
      cyl(GANTRY_X, y, 5.4, 0, 3, "lo", { steps: 26 }),
      cyl(GANTRY_X, y, 3.4, 3, 69, "mid", { steps: 22, crease: "none" }),
      L(k.sideArc(GANTRY_X, y, 3.4, 30, P, 16), { tone: "faint" }),
      L(k.sideArc(GANTRY_X, y, 3.4, 54, P, 16), { tone: "faint" }),
    ].join("");
  item([GANTRY_X, -38, 36], post(-38));

  const head = [];
  const beam = { x: GANTRY_X - 6, y: -42, w: 12, d: 84, r: 2 };
  head.push(slab(beam, 72, 8, "mid", { steps: 4, bevel: 0.6, seam: 76 }));
  head.push(...screws([-36, 36].map((y) => [GANTRY_X, y]), 80, 1.3));
  head.push(L(k.planOutline(k.insetPlan({ x: GANTRY_X - 4, y: -26, w: 8, d: 52, r: 1 }, 0), 80, P, 3), { tone: "faint" }));
  const block = { x: GANTRY_X - 10, y: -11, w: 20, d: 22, r: 2.2 };
  head.push(slab(block, 50, 22, "hi", { steps: 4, bevel: 0.6, crease: "lo", seam: 64 }));
  for (let i = 0; i < 4; i++) head.push(L(slotOnX(block.x + block.w, -7 + i * 4, -5 + i * 4, 54, 61, 0.9), { tone: "lo" }));
  head.push(D([at([block.x + block.w, 7.5, 68]), at([block.x + block.w, -7.5, 68])], { size: 0.5 }));
  head.push(cyl(GANTRY_X, 0, LENS.r + 1.6, LENS.z1 - 2, 2, "mid", { steps: 30 }));
  head.push(cyl(GANTRY_X, 0, LENS.r, LENS.z0, LENS.z1 - LENS.z0 - 2, "hi", { steps: 30, crease: "lo" }));
  head.push(L(k.sideArc(GANTRY_X, 0, LENS.r, LENS.z0 + 2.6, P, 22), { tone: "faint" }));
  head.push(L(k.knurl(GANTRY_X, 0, LENS.r, LENS.z0 + 3.4, LENS.z1 - 2.4, 24, P), { tone: "faint" }));
  const leds = k.circleRing(GANTRY_X, 0, LENS.r - 1.6, 12).map(([x, y]) => at([x, y, LENS.z0]));
  head.push(`<g data-part="leds">${D(leds, { size: 0.75, tone: "lo" })}</g>`);
  item([GANTRY_X, 0, 60], head.join(""));
  item([GANTRY_X, 38, 36], post(38));
}

// ── Gauge desk with the threshold knob ───────────────────────────────────
function gaugeDesk() {
  const out = [];
  const desk = { x: GAUGE.x - 20, y: GAUGE.y - 18, w: 62, d: 36, r: 3 };
  out.push(slab(desk, 0, GAUGE.z, "mid", { steps: 5, bevel: 0.7, seam: 5 }));
  out.push(L(k.planOutline(k.insetPlan(desk, 3), GAUGE.z, P, 4), { tone: "faint" }));
  out.push(...screws(k.corners(desk, 3.4), GAUGE.z, 1.1));
  const top = GAUGE.z + GAUGE.h;
  out.push(S(k.cylinder(GAUGE.x, GAUGE.y, GAUGE.r, GAUGE.z, GAUGE.h, P, 64, 0.8), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(GAUGE.x, GAUGE.y, GAUGE.r, top - 3, top, 72, P, 0.3), { tone: "lo" }));
  out.push(L(k.sideArc(GAUGE.x, GAUGE.y, GAUGE.r, top - 3, P, 40), { tone: "faint" }));
  out.push(L(k.ring(GAUGE.x, GAUGE.y, GAUGE.r - 2, top, P, 64), { tone: "lo" }));
  const t = k.radialTicks(GAUGE.x, GAUGE.y, GAUGE.r - 2.6, 20, 5, top, [1.1, 2.4], P, ARC.from, ARC.span);
  out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }));
  out.push(`<g data-part="threshold"></g>`);
  out.push(`<g data-part="needle"></g>`);
  out.push(L(k.ring(GAUGE.x, GAUGE.y, 1.3, top + 0.2, P, 16), { tone: "hi" }));
  out.push(D([at([GAUGE.x, GAUGE.y, top + 0.2])], { size: 0.6, tone: "hi" }));
  // Crown on the +x side.
  out.push(slab({ x: GAUGE.x + GAUGE.r - 0.4, y: GAUGE.y - 1.6, w: 3, d: 3.2, r: 0.6 }, GAUGE.z + 2, 3, "mid", { steps: 2 }));
  // Threshold knob.
  const ktop = KNOB.z + KNOB.h;
  out.push(cyl(KNOB.x, KNOB.y, KNOB.r + 1.4, GAUGE.z, 1, "lo", { steps: 24 }));
  out.push(cyl(KNOB.x, KNOB.y, KNOB.r, GAUGE.z + 1, KNOB.h, "mid", { steps: 28, bevel: 0.3 }));
  out.push(L(k.knurl(KNOB.x, KNOB.y, KNOB.r, GAUGE.z + 1, GAUGE.z + 1 + KNOB.h, 30, P), { tone: "lo" }));
  out.push(`<g data-part="knob"></g>`);
  item([GAUGE.x, GAUGE.y, 10], out.join(""));
  return { top, ktop: GAUGE.z + 1 + KNOB.h };
}

// ── Motor ────────────────────────────────────────────────────────────────
function motor() {
  const out = [];
  out.push(slab({ x: 36, y: 21, w: 8, d: 6, r: 1 }, 9, 6, "mid", { steps: 2, bevel: 0.3 }));
  out.push(cyl(40, 34, 11, 0, 2, "lo", { steps: 32 }));
  out.push(cyl(40, 34, 9, 2, 16, "mid", { steps: 36, bevel: 0.4 }));
  out.push(L(k.knurl(40, 34, 9, 4, 16, 40, P, 0.3), { tone: "lo" }));
  out.push(L(k.sideArc(40, 34, 9, 4, P, 26), { tone: "faint" }));
  out.push(L(k.sideArc(40, 34, 9, 16, P, 26), { tone: "faint" }));
  out.push(cyl(40, 34, 6.4, 18, 3, "hi", { steps: 30, crease: "lo" }));
  out.push(L(k.ring(40, 34, 3.4, 21, P, 20), { tone: "lo" }));
  out.push(D([at([40, 34, 21])], { size: 0.6, tone: "hi" }));
  item([40, 34, 10], out.join(""));
}

// ── Shuttle ──────────────────────────────────────────────────────────────
function shuttle() {
  const body = [];
  for (const [x, y] of byDepth([
    [78.5, -10],
    [105.5, -10],
    [78.5, 10],
    [105.5, 10],
  ])) {
    body.push(slab({ x: x - 4, y: y - 4, w: 8, d: 8, r: 1 }, 4, 6, "mid", { steps: 2, bevel: 0.3 }));
  }
  const deck = { x: 72, y: -15, w: 40, d: 30, r: 2.2 };
  body.push(slab(deck, 10, BELT_TOP - 10, "mid", { steps: 4, bevel: 0.6, seam: 13 }));
  body.push(slab({ x: 74, y: -14.4, w: 36, d: 2.4, r: 0.6 }, BELT_TOP, 4, "mid", { steps: 2, bevel: 0.3 }));
  body.push(L(k.planOutline({ x: 76, y: -11, w: 32, d: 22, r: 1.4 }, BELT_TOP, P, 3), { tone: "faint" }));
  body.push(D([at([75, 12, BELT_TOP]), at([109, 12, BELT_TOP])], { size: 0.45 }));
  const near = [
    slab({ x: 74, y: 12, w: 36, d: 2.4, r: 0.6 }, BELT_TOP, 4, "mid", { steps: 2, bevel: 0.3 }),
    // Handle on the near face with a knurled knob.
    slab({ x: 89, y: 15, w: 6, d: 3, r: 0.6 }, 12, 3, "mid", { steps: 2 }),
    cyl(92, 20, 2.8, 11, 5, "mid", { steps: 20 }),
  ];
  item([SHUTTLE_X, 0, 13], `<g data-part="shuttle-body">${body.join("")}</g>`, "shuttle-body");
  item([SHUTTLE_X, 13.2, 20], `<g data-part="shuttle-near">${near.join("")}</g>`, "shuttle-near");
}

// ── Trays ────────────────────────────────────────────────────────────────
function trays() {
  LANES.forEach((lane, index) => {
    const y = lane.y;
    const ped = { x: TRAY_X - 22, y: y - 13, w: 44, d: 26, r: 2 };
    const back = [
      slab(ped, 0, TRAY_FLOOR, "mid", { steps: 4, bevel: 0.6, seam: 5 }),
      slab({ x: TRAY_X - 20, y: y - 13, w: 42, d: 2, r: 0.6 }, TRAY_FLOOR, 6, "mid", { steps: 2, bevel: 0.3 }),
      slab({ x: TRAY_X - 13, y: y - 9.5, w: CARD.w, d: CARD.d - 1, r: 1.2 }, TRAY_FLOOR, CARD.h, "hi", { steps: 3, bevel: 0, crease: "lo" }),
    ];
    for (const inset of [4, 7]) {
      back.push(L(k.lineOnTop([TRAY_X - 9, y - 9.5 + inset], [TRAY_X + 4, y - 9.5 + inset], TRAY_FLOOR + CARD.h, P), { tone: "lo", free: true }));
    }
    item([TRAY_X, y - 4, 10], back.join(""));
    const front = [
      slab({ x: TRAY_X + 19, y: y - 11, w: 3, d: 22, r: 0.6 }, TRAY_FLOOR, 6, "mid", { steps: 2, bevel: 0.3 }),
      slab({ x: TRAY_X - 20, y: y + 11, w: 42, d: 2, r: 0.6 }, TRAY_FLOOR, 6, "mid", { steps: 2, bevel: 0.3 }),
    ];
    // Lane plate on the near face: a closed slot with a lit dot when this lane fires.
    front.push(L(slotOnY(TRAY_X - 14, TRAY_X + 6, y + 13, 5, 11, 1.2), { tone: "lo" }));
    front.push(`<g data-part="lane-${index}" opacity="0">${D([at([TRAY_X + 12, y + 13, 8])], { size: 1.4, tone: "hi" })}</g>`);
    front.push(D([at([TRAY_X + 12, y + 13, 8])], { size: 0.5, tone: "lo" }));
    item([TRAY_X + 6, y + 12, 18], front.join(""));
  });
}

// ── Review stamp ─────────────────────────────────────────────────────────
function stampPress() {
  const out = [];
  const px = 174;
  out.push(cyl(px, STAMP.y, 5.4, 0, 3, "lo", { steps: 24 }));
  out.push(cyl(px, STAMP.y, 3.2, 3, STAMP.arm + 6 - 3, "mid", { steps: 22, crease: "none" }));
  out.push(L(k.sideArc(px, STAMP.y, 3.2, 30, P, 16), { tone: "faint" }));
  const arm = { x: STAMP.x - 7, y: STAMP.y - 5, w: px + 5 - (STAMP.x - 7), d: 10, r: 2 };
  out.push(slab(arm, STAMP.arm, 6, "mid", { steps: 4, bevel: 0.5 }));
  out.push(...screws([[px, STAMP.y]], STAMP.arm + 6, 1.4));
  out.push(cyl(STAMP.x, STAMP.y, 3, STAMP.arm - 2, 2, "mid", { steps: 20 }));
  // Lamp on the arm.
  out.push(`<g data-part="lamp">${cyl(160, STAMP.y, 2.4, STAMP.arm + 6, 2.6, "hi", { steps: 20, crease: "lo" })}</g>`);
  out.push(`<g data-part="stamp-spring"></g>`);
  // The moving plunger: rod and head, built at rest and translated in z.
  const plunger = [
    cyl(STAMP.x, STAMP.y, 1.2, STAMP.rest + 6, STAMP.arm - 2 - STAMP.rest - 6, "hi", { steps: 14, crease: "none" }),
    slab({ x: STAMP.x - 8, y: STAMP.y - 8, w: 16, d: 16, r: 2 }, STAMP.rest + 1.6, 4.4, "mid", { steps: 4, bevel: 0.5, seam: STAMP.rest + 3.4 }),
    slab({ x: STAMP.x - 7, y: STAMP.y - 7, w: 14, d: 14, r: 1.6 }, STAMP.rest, 1.6, "hi", { steps: 4, bevel: 0, crease: "lo" }),
  ];
  out.push(`<g data-part="plunger">${plunger.join("")}</g>`);
  item([STAMP.x + 6, STAMP.y + 2, 40], out.join(""));
}

// ── The moving card ──────────────────────────────────────────────────────
function card() {
  const [cx, cy, cz] = CARD_REST;
  const plan = { x: cx - CARD.w / 2, y: cy - CARD.d / 2, w: CARD.w, d: CARD.d, r: 1.2 };
  const top = cz + CARD.h;
  const out = [`<path class="iso-halo" d="${k.haloOf(k.insetPlan(plan, 1), cz, 0.1, P)}" style="filter:blur(2.5px)"/>`];
  out.push(slab(plan, cz, CARD.h, "hi", { steps: 3, bevel: 0.4, crease: "lo", lit: true }));
  for (const [inset, len] of [
    [4.4, 14],
    [7.4, 11],
    [10.4, 13],
  ]) {
    out.push(L(k.lineOnTop([plan.x + 3, plan.y + inset], [plan.x + 3 + len, plan.y + inset], top, P), { tone: "mid", free: true }));
  }
  out.push(L(k.planOutline({ x: plan.x + plan.w - 8, y: plan.y + 3, w: 5, d: 5, r: 0.6 }, top, P, 2), { tone: "mid" }));
  out.push(
    `<g data-part="mark" opacity="0">${L(k.ring(cx + 4, cy + 4.4, 3.6, top + 0.02, P, 28), { tone: "hi" })}${L(
      k.lineOnTop([cx + 2.2, cy + 4.6], [cx + 3.6, cy + 6], top + 0.02, P) + k.lineOnTop([cx + 3.6, cy + 6], [cx + 6.2, cy + 2.8], top + 0.02, P),
      { tone: "hi" },
    )}</g>`,
  );
  item(CARD_REST.map((v, i) => v + (i === 2 ? 0.7 : 0)), `<g data-part="card">${out.join("")}</g>`, "card");
}

// ── Assemble ─────────────────────────────────────────────────────────────
const below = [base(), conveyor()].join("");
magazine();
gantry();
const { top: gaugeTop, ktop } = gaugeDesk();
motor();
shuttle();
trays();
stampPress();
card();

stack.sort((a, b) => k.depthOf(a.key, P) - k.depthOf(b.key, P));
const stackSvg = stack
  .map(
    (entry, index) =>
      `<g data-item="${index}" data-x="${entry.key[0]}" data-y="${entry.key[1]}" data-z="${entry.key[2]}"${entry.part ? ` data-moves="${entry.part}"` : ""}>${entry.svg}</g>`,
  )
  .join("");

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  className: "plant-svg",
  label:
    "Una línea de triaje sobre una placa: un cargador suelta tarjetas a una cinta, un cabezal lector con lente las puntúa, un reloj comparador marca la confianza frente a un umbral rojo, un carro las lleva a una de cuatro bandejas y, si la confianza no llega al umbral, un sello de muelle las revisa antes de archivarlas.",
  body: [below, `<g data-stack>${stackSvg}</g>`],
});

writeFileSync(join(OUT, "plant.svg"), svg);
writeFileSync(
  join(OUT, "plant.json"),
  JSON.stringify({
    P,
    rest: CARD_REST,
    lanes: LANES,
    gantryX: GANTRY_X,
    shuttleX: SHUTTLE_X,
    trayX: TRAY_X,
    trayFloor: TRAY_FLOOR + CARD.h + 0.2,
    beltTop: BELT_TOP,
    magExit: -112,
    stamp: { ...STAMP, coilR: 2.6 },
    gauge: { x: GAUGE.x, y: GAUGE.y, r: GAUGE.r, top: gaugeTop, from: ARC.from, span: ARC.span },
    knob: { x: KNOB.x, y: KNOB.y, r: KNOB.r, top: ktop },
    cleatStep: 12,
  }),
);
console.log(`wrote plant.svg (${(svg.length / 1024).toFixed(0)} KB, ${stack.length} stack items)`);
