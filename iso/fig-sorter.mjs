// Logística: a parcel sorter. Boxes come through a strip curtain onto a roller
// conveyor, pass under a scanning arch that reads their label, and a swing arm
// steers each one down a gravity chute into the roll cage of its route. A board
// at the back counts parcels per route and shows each departure time.
import { G, k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 480;
const PLATE = { x: -114, y: -66, w: 228, d: 134, r: 10 };
const BT = 16; // top of the rollers
const CONV = { x0: -98, x1: 80, y0: -10, y1: 10 };
const SCAN_X = -58;
const DX = [-18, 24, 66]; // diverter stations, one per route
const CAGE = { y: 32, w: 24, d: 22, floor: 4.2, top: 28 };
const CHUTE = { y0: 11, y1: 31, z1: 8.6 };
const BOARD = { x: 60, y: -62, w: 44, d: 14, r: 2, h: 46 };
const BOX = { w: 10, d: 9, h: 7 };
const ROUTES = ["R1", "R2", "R3"];

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -18, 0), [SCAN_X, -21, 50], [SCAN_X, 19, 50], [BOARD.x + BOARD.w, BOARD.y, BOARD.h], [-94, -14, 36]],
  W,
  H,
  { pad: 20, azimuth: 50, elevation: 30 },
);
const { at, S, L, D, slab, cyl, screws, base, label, ruler, lamp, faceY, screen } = kitFor(P);
const alongX = (o = [0, 0, 0]) => G.frameOf(o, [1, 0, 0], [0, 1, 0], [0, 0, 1]);
const alongY = (o) => G.frameOf(o, [0, 1, 0], [1, 0, 0], [0, 0, 1]);

const out = [base(PLATE)];

// ── Route board (back right) ─────────────────────────────────────────────
out.push(slab({ x: BOARD.x + 8, y: BOARD.y + 3, w: BOARD.w - 16, d: BOARD.d - 6, r: 1.2 }, 0, 8, "lo", { steps: 3, bevel: 0.4 }));
out.push(slab(BOARD, 8, BOARD.h - 8, "mid", { steps: 4, bevel: 0.7, seam: 14 }));
out.push(...screws(k.corners(BOARD, 3), BOARD.h, 0.9, 0.4));
const SW = BOARD.w - 6;
const rows = ROUTES.map((r, i) => {
  const y = 10 + i * 5.6;
  return (
    `<rect class="scr-f" data-part="row${i}" x="1.6" y="${y - 4}" width="${SW - 3.2}" height="5" rx="1"/>` +
    `<text class="scr-t" x="3" y="${y}" font-size="2.9" font-weight="600">${r}</text>` +
    `<text class="scr-t" data-part="c${i}" x="${SW / 2 + 1}" y="${y}" font-size="2.9" text-anchor="end">0/2</text>` +
    `<text class="scr-t" data-t="dim" data-part="eta${i}" x="${SW - 3}" y="${y}" font-size="2.6" text-anchor="end">${["10:40", "11:05", "11:30"][i]}</text>`
  );
}).join("");
out.push(
  faceY(
    BOARD.x + 3,
    BOARD.y + BOARD.d,
    BOARD.h - 3,
    screen(
      SW,
      27,
      `<text class="scr-t" data-t="dim" x="3" y="4.4" font-size="2.2">RUTA</text><text class="scr-t" data-t="dim" x="${SW / 2 + 1}" y="4.4" font-size="2.2" text-anchor="end">BULTOS</text><text class="scr-t" data-t="dim" x="${SW - 3}" y="4.4" font-size="2.2" text-anchor="end">SALIDA</text>` +
        rows,
      1.4,
    ),
  ),
);
out.push(lamp(BOARD.x + BOARD.w - 6, BOARD.y + 5, BOARD.h, 1.6, "live"));
out.push(k.wireSvg(at([SCAN_X + 3, -23, 2]), at([BOARD.x + 9, BOARD.y + 4, 3]), { via: [at([SCAN_X + 3, -52, 0.6]), at([BOARD.x - 4, -52, 0.6])], tone: "mid", size: 1 }));
out.push(k.wireSvg(at([BOARD.x + 4, BOARD.y + BOARD.d, 3]), at([DX[2] - 8, -27, 2]), { via: [at([BOARD.x + 4, -36, 0.6]), at([DX[0] - 8, -36, 0.6]), at([DX[0] - 8, -30, 0.6])], tone: "faint", size: 0.9, ends: "from" }));

// ── Scanner arch: back post ──────────────────────────────────────────────
const archPost = (y) => [
  slab({ x: SCAN_X - 5, y: y - 1.5, w: 10, d: 7, r: 1 }, 0, 1.6, "lo", { steps: 3, bevel: 0.3 }),
  slab({ x: SCAN_X - 3, y, w: 6, d: 4, r: 0.8 }, 1.6, 37, "mid", { steps: 3, bevel: 0.4, seam: 20 }),
];
out.push(...archPost(-21));

// ── Infeed curtain frame: back post ──────────────────────────────────────
out.push(slab({ x: -96, y: -16, w: 3, d: 3, r: 0.6 }, 0, 34, "mid", { steps: 2, bevel: 0.3 }));

// ── Diverter actuators and pivots (behind the conveyor) ─────────────────
for (const dx of DX) {
  const px = dx - 14;
  out.push(slab({ x: px - 4, y: -31, w: 14, d: 7, r: 1 }, 0, BT - 4, "mid", { steps: 3, bevel: 0.4, seam: 5 }));
  out.push(S(G.disc(0, 12, 2.8, alongY([px + 3, -26, BT - 1]), P, {}), { tone: "hi", crease: "lo" }));
  out.push(S(G.disc(12, 15.4, 1, alongY([px + 3, -26, BT - 1]), P, {}), { tone: "mid", crease: "none" }));
  out.push(cyl(px, -12.6, 3.2, 0, 1, "lo", { steps: 22 }));
  out.push(cyl(px, -12.6, 2.1, 1, BT + 5, "mid", { steps: 20, crease: "none" }));
}

// ── Conveyor: legs, frame, rollers ───────────────────────────────────────
for (const x of [CONV.x0 + 6, -22, 32, CONV.x1 - 6]) {
  for (const y of [-8, 8]) {
    out.push(cyl(x, y, 3, 0, 1, "lo", { steps: 18 }));
    out.push(slab({ x: x - 1.3, y: y - 1.3, w: 2.6, d: 2.6, r: 0.5 }, 1, 8.4, "mid", { steps: 2, bevel: 0.2 }));
  }
  out.push(slab({ x: x - 1.2, y: -8, w: 2.4, d: 16, r: 0.4 }, 4, 1.8, "mid", { steps: 2, bevel: 0.2 }));
}
out.push(slab({ x: 2, y: -7, w: 14, d: 14, r: 1.5 }, 3, 6, "mid", { steps: 3, bevel: 0.4, seam: 6 }));
out.push(S(G.disc(0, 6, 3.2, alongX([16, 0, 6]), P, {}), { tone: "hi", crease: "lo" }));
out.push(slab({ x: CONV.x0 - 1, y: CONV.y0 - 2.6, w: CONV.x1 - CONV.x0 + 2, d: 2.6, r: 0.6 }, 9, BT + 2.6 - 9, "mid", { steps: 2, bevel: 0.3, seam: 12 }));
for (let x = CONV.x0 + 3; x <= CONV.x1 - 3; x += 6) {
  out.push(S(G.disc(-9.4, 9.4, 1.5, alongY([x, 0, BT - 1.5]), P, {}), { tone: "hi", crease: "lo" }));
}

// Gravity chutes from the conveyor's front edge down to each cage.
const chute = (cx) => {
  const span = [cx - 9, cx + 9];
  const zTop = BT - 0.8;
  const bed = [
    [CHUTE.y0, zTop],
    [CHUTE.y1, CHUTE.z1],
    [CHUTE.y1, CHUTE.z1 - 1.4],
    [CHUTE.y0, zTop - 1.4],
  ];
  const guard = [
    [CHUTE.y0, zTop],
    [CHUTE.y1, CHUTE.z1],
    [CHUTE.y1, CHUTE.z1 + 3.2],
    [CHUTE.y0, zTop + 3.2],
  ];
  const parts = [];
  parts.push(slab({ x: cx - 7, y: CHUTE.y1 - 3, w: 2.2, d: 2.2, r: 0.4 }, 0, CHUTE.z1 - 1.4, "mid", { steps: 2, bevel: 0.2 }));
  parts.push(slab({ x: cx + 5, y: CHUTE.y1 - 3, w: 2.2, d: 2.2, r: 0.4 }, 0, CHUTE.z1 - 1.4, "mid", { steps: 2, bevel: 0.2 }));
  parts.push(S(G.prismOf(alongX(), guard, span[0] - 1.2, span[0], P), { tone: "mid" }));
  parts.push(S(G.prismOf(alongX(), bed, span[0], span[1], P), { tone: "mid" }));
  const lines = [];
  for (let t = 0.08; t < 0.98; t += 0.12) {
    const y = CHUTE.y0 + (CHUTE.y1 - CHUTE.y0) * t;
    const z = zTop + (CHUTE.z1 - zTop) * t + 0.05;
    lines.push(k.segment([span[0] + 0.8, y, z], [span[1] - 0.8, y, z], P));
  }
  parts.push(L(lines.join(""), { tone: "lo" }));
  parts.push(S(G.prismOf(alongX(), guard, span[1], span[1] + 1.2, P), { tone: "mid" }));
  return parts.join("");
};

// Roll cages: the back half sorts behind the parcels inside, the front half in front.
const mesh = (a0, a1, step, fixed, axis, z0, z1, zStep) => {
  const lines = [];
  for (let a = a0 + step; a < a1 - 0.5; a += step) lines.push(k.segment(axis === "x" ? [a, fixed, z0] : [fixed, a, z0], axis === "x" ? [a, fixed, z1] : [fixed, a, z1], P));
  for (let z = z0 + zStep; z < z1 - 0.5; z += zStep) lines.push(k.segment(axis === "x" ? [a0, fixed, z] : [fixed, a0, z], axis === "x" ? [a1, fixed, z] : [fixed, a1, z], P));
  return L(lines.join(""), { tone: "lo" });
};
const cageBack = (cx) => {
  const x0 = cx - CAGE.w / 2;
  const x1 = cx + CAGE.w / 2;
  const y0 = CAGE.y;
  const y1 = CAGE.y + CAGE.d;
  const parts = [];
  for (const [x, y] of [[x0 + 2, y0 + 2], [x1 - 2, y0 + 2], [x0 + 2, y1 - 2], [x1 - 2, y1 - 2]]) {
    parts.push(cyl(x, y, 1.6, 0.4, 1.8, "mid", { steps: 16 }));
    parts.push(slab({ x: x - 1.2, y: y - 1.2, w: 2.4, d: 2.4, r: 0.4 }, 2.2, 0.8, "lo", { steps: 2, bevel: 0 }));
  }
  parts.push(slab({ x: x0, y: y0, w: CAGE.w, d: CAGE.d, r: 1 }, 3, CAGE.floor - 3, "mid", { steps: 3, bevel: 0.3 }));
  parts.push(mesh(y0, y1, 4.4, x0, "y", CAGE.floor, CAGE.top, 4.8));
  parts.push(mesh(x0, x1, 4, y0, "x", CAGE.floor, CAGE.top, 4.8));
  parts.push(slab({ x: x0, y: y0, w: 1.4, d: 1.4, r: 0.3 }, CAGE.floor, CAGE.top - CAGE.floor, "mid", { steps: 1, bevel: 0 }));
  parts.push(slab({ x: x1 - 1.4, y: y0, w: 1.4, d: 1.4, r: 0.3 }, CAGE.floor, CAGE.top - CAGE.floor, "mid", { steps: 1, bevel: 0 }));
  return parts.join("");
};
const cageFront = (cx, route) => {
  const x0 = cx - CAGE.w / 2;
  const x1 = cx + CAGE.w / 2;
  const y0 = CAGE.y;
  const y1 = CAGE.y + CAGE.d;
  const parts = [];
  parts.push(mesh(y0, y1, 4.4, x1, "y", CAGE.floor, CAGE.top, 4.8));
  parts.push(mesh(x0, x1, 4, y1, "x", CAGE.floor + 9.6, CAGE.top, 4.8));
  parts.push(slab({ x: x0, y: y1 - 1.4, w: 1.4, d: 1.4, r: 0.3 }, CAGE.floor, CAGE.top - CAGE.floor, "mid", { steps: 1, bevel: 0 }));
  parts.push(slab({ x: x1 - 1.4, y: y1 - 1.4, w: 1.4, d: 1.4, r: 0.3 }, CAGE.floor, CAGE.top - CAGE.floor, "mid", { steps: 1, bevel: 0 }));
  parts.push(L(k.planOutline({ x: x0 + 0.7, y: y0 + 0.7, w: CAGE.w - 1.4, d: CAGE.d - 1.4, r: 0.3 }, CAGE.top, P, 2), { tone: "mid" }));
  parts.push(slab({ x: x0 + 1.4, y: y1 - 1.2, w: CAGE.w - 2.8, d: 1, r: 0.3 }, CAGE.floor + 8.6, 1, "mid", { steps: 1, bevel: 0 }));
  const plate = { x: cx - 5, y: y1, w: 10, d: 0.8, r: 0.2 };
  parts.push(slab(plate, CAGE.top - 7, 6.4, "hi", { steps: 1, bevel: 0, crease: "lo" }));
  parts.push(faceY(plate.x + 2, y1 + 0.8, CAGE.top - 1.8, `<text class="ui-t" font-size="3.6" font-weight="600">${route}</text>`));
  return parts.join("");
};

// ── Stack: chutes, cages and parcels, sorted live ────────────────────────
const items = [];
DX.forEach((dx, r) => {
  const cx = dx + 1;
  items.push({ key: [cx, CHUTE.y0, BT - 1], svg: chute(cx) });
  items.push({ key: [cx, CAGE.y, 0], svg: cageBack(cx) });
  items.push({ key: [cx + CAGE.w / 2, CAGE.y + CAGE.d, 0], svg: cageFront(cx, ROUTES[r]) });
});
const parcel = (i) => {
  const plan = { x: -BOX.w / 2, y: -BOX.d / 2, w: BOX.w, d: BOX.d, r: 0.6 };
  const top = BT + BOX.h;
  const label = `<rect class="ui-f" data-t="paper" x="0" y="0" width="4.6" height="3.6" rx=".3"/>${[0.6, 1.2, 1.5, 2.1, 2.7, 3.0, 3.6]
    .map((x) => `<path class="ui-s" data-t="hi" d="M${x + 0.2} .7v1.6"/>`)
    .join("")}<path class="ui-s" data-t="lo" d="M.6 3h2.6"/>`;
  return {
    key: [0, 0, BT],
    parcel: i,
    svg: `<g data-parcel="${i}" opacity="0"><g class="veo-swatch" style="--sw:#ead6b0">${S(k.slabOf(plan, BT, BOX.h, P, 3, 0.3), { tone: "hi", crease: "lo" })}</g>${L(
      k.lineOnTop([-BOX.w / 2 + 0.4, 0], [BOX.w / 2 - 0.4, 0], top, P),
      { tone: "mid" },
    )}<g class="ui" transform="${k.topMatrix([-0.6, -BOX.d / 2 + 0.9], top + 0.02, P)}">${label}</g></g>`,
  };
};
for (let i = 0; i < 6; i++) items.push(parcel(i));
out.push(
  `<g data-stack>${items
    .map(
      (it, i) =>
        `<g data-item="${i}" data-x="${it.key[0]}" data-y="${it.key[1]}" data-z="${it.key[2]}"${it.parcel !== undefined ? ` data-moves="p${it.parcel}"` : ""}>${it.svg}</g>`,
    )
    .join("")}</g>`,
);

// Swing arms are redrawn live on top of the conveyor, just behind the parcels they push:
// they sit in the stack order through a slot drawn before it, so paint them here and
// lift the stack above them in the page.
out.splice(out.length - 1, 0, `<g data-part="arms"></g>`);
// Pivot caps above the arms.
for (const dx of DX) out.splice(out.length - 1, 0, cyl(dx - 14, -12.6, 2.6, BT + 6, 1, "mid", { steps: 20, bevel: 0.2 }));

// Front frame rail: flush with the rollers so parcels slide off onto the chutes.
out.push(slab({ x: CONV.x0 - 1, y: CONV.y1, w: CONV.x1 - CONV.x0 + 2, d: 2, r: 0.6 }, 9, BT - 0.6 - 9, "mid", { steps: 2, bevel: 0.3, seam: 12 }));
out.push(L([CONV.x0 + 3, CONV.x1 - 3].map((x) => k.sideRing([x, CONV.y1 + 2, BT - 1.5], 1.3, "y", P, 14)).join(""), { tone: "lo" }));

// ── Scanner arch: front post, housing, laser ─────────────────────────────
out.push(`<g data-part="laser" opacity="0"></g>`);
out.push(...archPost(15));
const HOUSING = { x: SCAN_X - 6, y: -23, w: 12, d: 42, r: 2 };
out.push(slab(HOUSING, 38, 8, "hi", { steps: 4, bevel: 0.6, crease: "lo", seam: 42 }));
out.push(...screws(k.corners(HOUSING, 2.6), 46, 0.8, 0.4));
out.push(cyl(SCAN_X, -4, 3, 46, 2.4, "mid", { steps: 22, bevel: 0.3 }));
out.push(`<g data-part="read" class="veo-lamp" data-tone="ok">${cyl(SCAN_X, 10, 1.8, 46, 1.8, "hi", { steps: 18, crease: "lo" })}</g>`);
out.push(faceY(HOUSING.x + 1.6, HOUSING.y + HOUSING.d, 44.6, `<text class="ui-t" font-size="2.2">SCAN</text>`));

// Infeed curtain: front post, header and the strips parcels push through.
out.push(slab({ x: -96, y: 13, w: 3, d: 3, r: 0.6 }, 0, 34, "mid", { steps: 2, bevel: 0.3 }));
out.push(slab({ x: -97, y: -17, w: 5, d: 34, r: 0.8 }, 34, 3.4, "mid", { steps: 2, bevel: 0.3 }));
const strips = [];
for (let y = -12; y <= 11; y += 3.3) strips.push(k.segment([-94.5, y, 33.8], [-94.5, y, BT + 8.5], P));
out.push(L(strips.join(""), { tone: "faint" }));

// ── Front: label, ruler, a handheld scanner in its cradle ───────────────
out.push(label({ x: -106, y: 24, w: 46, d: 14, r: 1.2 }, "VEODAR · SR-03"));
out.push(ruler({ x: -106, y: 46, w: 62, d: 7, r: 1 }));
out.push(slab({ x: -54, y: 44, w: 16, d: 12, r: 1.6 }, 0, 4, "mid", { steps: 3, bevel: 0.4, seam: 2 }));
out.push(slab({ x: -51, y: 46.5, w: 10, d: 5, r: 1.2 }, 4, 3.4, "hi", { steps: 3, bevel: 0.4, crease: "lo" }));
out.push(slab({ x: -43, y: 47, w: 3.6, d: 4, r: 0.8 }, 7.4, 2, "mid", { steps: 2, bevel: 0.3 }));
out.push(D([at([-48, 49, 7.4])], { size: 0.7, tone: "hi" }));

save("sorter", {
  width: W,
  height: H,
  label:
    "Un clasificador de paquetería sobre una placa: las cajas entran por una cortina de lamas a un transportador de rodillos, pasan bajo un arco que lee su etiqueta y un brazo desviador manda cada una por una rampa a la jaula de su ruta; un panel cuenta los bultos de cada ruta y su hora de salida.",
  body: out,
  motion: { P, BT, conv: CONV, scan: SCAN_X, dx: DX, cage: CAGE, chute: CHUTE, box: BOX },
});
