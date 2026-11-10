// Plotter de wireframes: a pen on a gantry draws a landing page on a sheet with
// a twelve-column grid — navigation, headline, copy, call to action, image and
// cards — one stroke at a time, in the order a designer decides them.
import { k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 470;
const PLATE = { x: -108, y: -60, w: 216, d: 120, r: 10 };
const BED = { x: -88, y: -48, w: 150, d: 96, r: 3, h: 5 };
const PAPER = { x: -78, y: -39, w: 126, d: 78, r: 0.8 };
const Z = BED.h + 0.5;
const PEN = 10; // pen sits this far in front (+x) of the bridge centre
const HOME = [-70, -34];

// Strokes in sheet coordinates (world x, y). Closed shapes repeat their first point.
const rect = (x0, y0, x1, y1) => [
  [x0, y0],
  [x1, y0],
  [x1, y1],
  [x0, y1],
  [x0, y0],
];
const ELEMENTS = [
  { name: "Navegación", strokes: [rect(-72, -34, -66, -29), [[-34, -31.5], [-24, -31.5]], [[-19, -31.5], [-9, -31.5]], [[-4, -31.5], [6, -31.5]], rect(28, -34, 42, -29)] },
  { name: "Titular", weight: 2.2, strokes: [[[-72, -20], [-24, -20]], [[-72, -13], [-36, -13]]] },
  { name: "Texto", strokes: [[[-72, -5], [-28, -5]], [[-72, -1], [-33, -1]], [[-72, 3], [-42, 3]]] },
  { name: "Botón · llamada a la acción", fill: true, strokes: [rect(-72, 9, -46, 17)] },
  { name: "Imagen", strokes: [rect(-14, -22, 42, 15), [[-14, -22], [42, 15]], [[42, -22], [-14, 15]]] },
  { name: "Tarjetas", strokes: [rect(-72, 23, -37, 35), rect(-32, 23, 3, 35), rect(8, 23, 42, 35)] },
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [-88, -48, 30], [62, -48, 30]], W, H, { pad: 22, azimuth: 46, elevation: 36 });
const { at, S, L, D, slab, cyl, screws, base, label, knob, lamp, faceY, screen } = kitFor(P);

const out = [base(PLATE)];

// Bed, sheet with its column grid, corner clamps.
out.push(slab(BED, 0, BED.h, "mid", { steps: 4, bevel: 0.7, seam: 2 }));
out.push(slab(PAPER, BED.h, 0.5, "hi", { steps: 2, bevel: 0, crease: "lo" }));
const cols = [];
for (let i = 0; i <= 12; i++) {
  const x = -72 + (i * 114) / 12;
  cols.push(k.lineOnTop([x, PAPER.y + 2], [x, PAPER.y + PAPER.d - 2], Z, P));
}
out.push(L(cols.join(""), { tone: "faint" }));
out.push(`<g data-part="fill" opacity="0"><path fill="#ff5a1f" d="${k.onTop(rect(-72, 9, -46, 17), Z, P, true)}"/></g>`);
out.push(`<g data-part="ink"></g><g data-part="live"></g>`);
for (const [x, y] of k.corners(PAPER, 0)) out.push(slab({ x: x - 3, y: y - 3, w: 6, d: 6, r: 1 }, BED.h, 1.4, "mid", { steps: 2, bevel: 0.3 }));

// Rails along x on both edges of the bed.
const railY = [BED.y, BED.y + BED.d - 4];
out.push(slab({ x: BED.x, y: railY[0], w: BED.w, d: 4, r: 1 }, BED.h, 4, "mid", { steps: 2, bevel: 0.4 }));

// Gantry: built at x = 0 and moved live. Trucks, bridge with a belt line, then the carriage and pen.
const bridge = [];
bridge.push(slab({ x: -6, y: railY[0] - 1, w: 12, d: 6, r: 1 }, BED.h + 4, 5, "mid", { steps: 2, bevel: 0.4 }));
bridge.push(slab({ x: -4, y: railY[0] - 2, w: 8, d: BED.d + 4, r: 1.5 }, BED.h + 9, 6, "mid", { steps: 3, bevel: 0.5, seam: BED.h + 12 }));
bridge.push(L(k.lineOnTop([0, railY[0] + 3], [0, railY[1] + 1], BED.h + 15, P), { tone: "faint" }));
const carriage = [];
carriage.push(slab({ x: -7, y: -7, w: 14, d: 14, r: 2 }, BED.h + 7, 12, "hi", { steps: 3, bevel: 0.5, crease: "lo", seam: BED.h + 15 }));
carriage.push(D([at([7, -3.6, BED.h + 13]), at([7, 3.6, BED.h + 13])], { size: 0.5, tone: "hi" }));
carriage.push(slab({ x: 7, y: -2.4, w: PEN - 7 + 2.4, d: 4.8, r: 1 }, BED.h + 10, 3, "mid", { steps: 2, bevel: 0.3 }));
const pen = [
  cyl(PEN, 0, 0.8, Z, 3, "hi", { steps: 10, crease: "none", lit: true }),
  cyl(PEN, 0, 1.7, Z + 3, 15, "hi", { steps: 16, crease: "lo" }),
  cyl(PEN, 0, 2.2, Z + 18, 2, "mid", { steps: 16 }),
];
carriage.push(`<g data-part="pen">${pen.join("")}</g>`);

out.push(`<g data-part="bridge">${bridge.join("")}</g>`);
out.push(slab({ x: BED.x, y: railY[1], w: BED.w, d: 4, r: 1 }, BED.h, 4, "mid", { steps: 2, bevel: 0.4 }));
out.push(`<g data-part="truck">${slab({ x: -6, y: railY[1] - 1, w: 12, d: 6, r: 1 }, BED.h + 4, 5, "mid", { steps: 2, bevel: 0.4 })}</g>`);
out.push(`<g data-part="carriage">${carriage.join("")}</g>`);

// Controller with a coordinate screen, a jog knob and spare pens.
const box = { x: 70, y: -22, w: 30, d: 44, r: 3 };
out.push(slab(box, 0, 16, "mid", { steps: 4, bevel: 0.6, seam: 5 }));
out.push(knob(box.x + 15, box.y + 12, 5, 16, 5, { pointer: 0.7 }));
out.push(lamp(box.x + 8, box.y + 28, 16, 1.7, "busy"));
out.push(...screws(k.corners(box, 3), 16, 0.8, 0.4));
out.push(faceY(box.x + 3, box.y + box.d, 13.4, screen(24, 9, `<text class="scr-t" data-part="xy" x="2.2" y="6.2" font-size="3.2">X000 Y000</text>`, 1.2)));
for (const [i, x] of [76, 84, 92].entries()) {
  out.push(cyl(x, -44, 2.6, 0, 3, "lo", { steps: 16 }));
  out.push(cyl(x, -44, 1.6, 3, 14 - i * 2, "hi", { steps: 14, crease: "lo" }));
}

out.push(label({ x: -100, y: 49, w: 56, d: 9, r: 1 }, "REJILLA · 12 COL"));

save("plotter", {
  width: W,
  height: H,
  label:
    "Un plotter de pórtico dibuja el esquema de una página web sobre una hoja con rejilla de doce columnas: navegación, titular, texto, botón, imagen y tres tarjetas, trazo a trazo.",
  body: out,
  motion: { P, z: Z, pen: PEN, home: HOME, elements: ELEMENTS },
});
