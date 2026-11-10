// Inmobiliaria y construcción: a tower crane builds a three-storey frame.
// Each lift takes a slab from the stack and sets it on the columns; the next
// floor's columns rise; the site office adds up progress and the month's
// certified amount from the same count, and marks the buyer portal updated.
import { k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 480;
const PLATE = { x: -106, y: -62, w: 212, d: 120, r: 10 };
const MAST = { x: -36, y: -34, half: 3.4, top: 84 };
const BLD = { x: 12, y: -44, w: 36, d: 24 };
const FLOOR = 13;
const SLAB = 2;
const COLS = [
  [BLD.x + 1, BLD.y + 1],
  [BLD.x + BLD.w / 2 - 1.2, BLD.y + 1],
  [BLD.x + BLD.w - 3.4, BLD.y + 1],
  [BLD.x + 1, BLD.y + BLD.d - 3.4],
  [BLD.x + BLD.w / 2 - 1.2, BLD.y + BLD.d - 3.4],
  [BLD.x + BLD.w - 3.4, BLD.y + BLD.d - 3.4],
];
const STACK = { x: -84, y: 6, w: 36, d: 24 };
const OFFICE = { x: 40, y: 14, w: 46, d: 20, r: 1.2, h: 18 };

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -18, 0), [MAST.x, MAST.y, 104], [MAST.x + 72, MAST.y, 92], [MAST.x, MAST.y + 72, 92], [MAST.x - 26, MAST.y, 92]],
  W,
  H,
  { pad: 18, azimuth: 50, elevation: 30 },
);
const { at, S, L, D, slab, cyl, screws, base, label, ruler, lamp, faceY, screen } = kitFor(P);

const out = [base(PLATE)];

// ── Crane footing, ballast and the lattice mast ─────────────────────────
out.push(slab({ x: MAST.x - 11, y: MAST.y - 11, w: 22, d: 22, r: 1.2 }, 0, 2.4, "mid", { steps: 3, bevel: 0.4, seam: 1.2 }));
for (const [dx, dy] of [
  [-8, -8],
  [4, -8],
  [-8, 4],
  [4, 4],
])
  out.push(slab({ x: MAST.x + dx, y: MAST.y + dy, w: 4, d: 4, r: 0.4 }, 2.4, 3, "lo", { steps: 1, bevel: 0.2 }));
const mh = MAST.half;
const corner = [
  [MAST.x - mh, MAST.y - mh],
  [MAST.x + mh, MAST.y - mh],
  [MAST.x + mh, MAST.y + mh],
  [MAST.x - mh, MAST.y + mh],
];
const mast = [];
for (const [x, y] of corner) mast.push(k.segment([x, y, 5.4], [x, y, MAST.top], P));
for (let z = 5.4; z < MAST.top - 1; z += 6) {
  for (let i = 0; i < 4; i++) {
    const [ax, ay] = corner[i];
    const [bx, by] = corner[(i + 1) % 4];
    mast.push(k.segment([ax, ay, z], [bx, by, z + 6], P));
    mast.push(k.segment([ax, ay, z], [bx, by, z], P));
  }
}
out.push(L(mast.join(""), { tone: "mid" }));
// Slewing ring and the tower head.
out.push(cyl(MAST.x, MAST.y, 5.4, MAST.top, 2.2, "mid", { steps: 30 }));
out.push(slab({ x: MAST.x - 1.4, y: MAST.y - 1.4, w: 2.8, d: 2.8, r: 0.3 }, MAST.top + 2.2, 15, "hi", { steps: 1, bevel: 0.2, crease: "lo" }));
out.push(lamp(MAST.x, MAST.y, MAST.top + 17.2, 1.2, "beacon"));

// ── The slab stack (front left) ──────────────────────────────────────────
out.push(slab({ x: STACK.x - 2, y: STACK.y - 2, w: STACK.w + 4, d: STACK.d + 4, r: 0.6 }, 0, 1, "lo", { steps: 2, bevel: 0.1 }));
for (let i = 0; i < 3; i++) {
  out.push(slab({ x: STACK.x + 4, y: STACK.y + 2 + i * 9, w: STACK.w - 8, d: 2, r: 0.2 }, 1 + i * 0, 1.2, "mid", { steps: 1, bevel: 0 }));
}
[0, 1, 2].forEach((i) =>
  out.push(`<g data-stacked="${i}">${slab({ ...STACK, r: 0.6 }, 2.2 + i * (SLAB + 1.2), SLAB, "hi", { steps: 2, bevel: 0.2, crease: "lo" })}${i < 2 ? slab({ x: STACK.x + 4, y: STACK.y + 2, w: STACK.w - 8, d: 2, r: 0.2 }, 2.2 + i * (SLAB + 1.2) + SLAB, 1.2, "mid", { steps: 1, bevel: 0 }) : ""}</g>`),
);

// ── The building: foundation, then floor by floor, bottom up ────────────
out.push(slab({ x: BLD.x - 2, y: BLD.y - 2, w: BLD.w + 4, d: BLD.d + 4, r: 0.6 }, 0, 2, "mid", { steps: 2, bevel: 0.2, seam: 1 }));
const colsAt = (z0) =>
  [...COLS]
    .sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P))
    .map(([x, y]) => slab({ x, y, w: 2.4, d: 2.4, r: 0.2 }, z0, FLOOR, "hi", { steps: 1, bevel: 0.1, crease: "lo" }))
    .join("");
const z = (floor) => 2 + floor * (FLOOR + SLAB);
for (let f = 0; f < 3; f++) {
  out.push(`<g data-cols="${f}"${f > 0 ? ' opacity="0"' : ""}>${colsAt(z(f))}</g>`);
  out.push(`<g data-slab="${f}" opacity="0">${slab({ ...BLD, r: 0.4 }, z(f) + FLOOR, SLAB, "hi", { steps: 2, bevel: 0.2, crease: "lo" })}${L(k.planOutline(k.insetPlan({ ...BLD, r: 0.4 }, 2), z(f) + FLOOR + SLAB, P, 2), { tone: "faint" })}</g>`);
}

// ── Site office (front right) ────────────────────────────────────────────
for (const [x, y] of k.corners(OFFICE, 2)) out.push(slab({ x: x - 1.4, y: y - 1.4, w: 2.8, d: 2.8, r: 0.3 }, 0, 1.6, "lo", { steps: 1, bevel: 0 }));
out.push(slab(OFFICE, 1.6, OFFICE.h, "hi", { steps: 3, bevel: 0.5, crease: "lo", seam: 1.6 + OFFICE.h - 3 }));
const ribs = [];
for (let x = OFFICE.x + 4; x < OFFICE.x + OFFICE.w - 2; x += 4) ribs.push(k.segment([x, OFFICE.y + OFFICE.d, 2.4], [x, OFFICE.y + OFFICE.d, 4.4], P));
out.push(L(ribs.join(""), { tone: "faint" }));
const OW = OFFICE.w - 18;
out.push(
  faceY(
    OFFICE.x + 3,
    OFFICE.y + OFFICE.d,
    1.6 + OFFICE.h - 2.6,
    screen(
      OW,
      12.4,
      `<text class="scr-t" data-t="dim" x="1.8" y="3.4" font-size="1.8">ESTRUCTURA</text><text class="scr-t" data-part="pct" x="${OW - 1.8}" y="6" font-size="4" font-weight="600" text-anchor="end">0 %</text>` +
        `<rect class="scr-f" x="1.8" y="7.4" width="${OW - 3.6}" height="1.4" rx=".7"/><rect class="scr-f" data-t="acc" data-part="bar" x="1.8" y="7.4" width="0" height="1.4" rx=".7"/>` +
        `<text class="scr-t" data-t="dim" x="1.8" y="11.2" font-size="1.7">CERT.</text><text class="scr-t" data-part="cert" x="${OW - 1.8}" y="11.2" font-size="2" text-anchor="end">0 €</text>`,
      1,
    ),
  ),
);
out.push(slab({ x: OFFICE.x + OFFICE.w - 12, y: OFFICE.y + OFFICE.d, w: 8, d: 0.6, r: 0.2 }, 1.6, 13, "mid", { steps: 1, bevel: 0 }));
out.push(D([at([OFFICE.x + OFFICE.w - 10.6, OFFICE.y + OFFICE.d + 0.6, 8])], { size: 0.6, tone: "hi" }));
out.push(lamp(OFFICE.x + 6, OFFICE.y + 5, 1.6 + OFFICE.h, 1.4, "portal"));
out.push(faceY(OFFICE.x + 3, OFFICE.y + OFFICE.d, 4.6, `<text class="ui-t" font-size="2">CASETA DE OBRA</text>`));

// ── Site details: sales sign for the development, a pallet of blocks ────
const SIGN = { x: -4, y: 4 };
for (const dx of [0, 20]) out.push(slab({ x: SIGN.x + dx, y: SIGN.y, w: 1.6, d: 1.6, r: 0.3 }, 0, 22, "mid", { steps: 1, bevel: 0.1 }));
out.push(slab({ x: SIGN.x - 2, y: SIGN.y + 1.6, w: 25.6, d: 0.8, r: 0.2 }, 12, 10, "hi", { steps: 1, bevel: 0, crease: "lo" }));
out.push(
  faceY(
    SIGN.x - 0.6,
    SIGN.y + 2.4,
    21,
    `<text class="ui-t" x="0" y="3" font-size="2.6" font-weight="600">PROMOCIÓN</text><text class="ui-t" x="0" y="6.2" font-size="2">VENTA SOBRE PLANO</text><rect class="ui-f" data-t="acc" x="0" y="7.4" width="10" height="1.2" rx=".6"/>`,
  ),
);
const PAL = { x: 56, y: -38, w: 16, d: 14 };
out.push(slab({ ...PAL, r: 0.3 }, 0, 1.6, "lo", { steps: 1, bevel: 0.1 }));
for (let r = 0; r < 3; r++)
  for (let c = 0; c < 2; c++) out.push(slab({ x: PAL.x + 1 + c * 7.2, y: PAL.y + 1 + r * 4.2, w: 6.8, d: 3.8, r: 0.2 }, 1.6, 4, "hi", { steps: 1, bevel: 0.1, crease: "lo" }));

// ── Crane parts that turn: hook, load, jib (live, drawn over the site) ──
out.push(`<g data-part="load"></g>`);
out.push(`<g data-part="jib"></g>`);

// ── Front: label, ruler ──────────────────────────────────────────────────
out.push(label({ x: -100, y: 38, w: 44, d: 14, r: 1.2 }, "VEODAR · OB-08"));
out.push(ruler({ x: -44, y: 44, w: 60, d: 7, r: 1 }));

save("crane", {
  width: W,
  height: H,
  label:
    "Una grúa torre sobre una placa levanta tres forjados desde una pila hasta un edificio en construcción; tras cada forjado suben los pilares de la planta siguiente y la pantalla de la caseta de obra suma el avance de la estructura y el importe certificado, y avisa al portal del comprador.",
  body: out,
  motion: { P, mast: MAST, bld: BLD, stack: STACK, floor: FLOOR, slab: SLAB },
});
