// Retail: one shelf, two channels. A sale at the register and an online order
// both take a unit of the same product off the same shelf; each sale travels
// along the sync line to the stock display on top of the shelf, which drops
// once per sale. At the minimum, a label printer issues the restock proposal.
import { k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 480;
const PLATE = { x: -100, y: -60, w: 200, d: 112, r: 10 };
const SHELF = { x: -36, y: -50, w: 68, d: 18, top: 56 };
const LEVELS = [4, 21.6, 39.6]; // shelf tops: plinth, middle, upper
const PROD = { w: 10, d: 11, h: 13 };
const SLOT_X = [-30, -16, -2, 12];
const DISPLAY = { x: -18, y: -48, w: 32, d: 10, r: 1.6, z: SHELF.top, h: 18 };
const COUNTER = { x: -92, y: -24, w: 44, d: 30, r: 2, h: 20 };
const BAG = { x: -62, y: -18, w: 11, d: 9, h: 11 };
const PHONE_STAND = { x: 46, y: -14, w: 26, d: 14, r: 2 };
const CARTON = { x: 24, y: 12, w: 24, d: 18, r: 1, h: 11 };
const PRINTER = { x: 42, y: -54, w: 20, d: 14, r: 2, h: 11 };
const HUB = { x: 36, y: -30, w: 9, d: 8, r: 1.2, h: 6 };

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -18, 0), [DISPLAY.x, DISPLAY.y, DISPLAY.z + DISPLAY.h + 4], [DISPLAY.x + DISPLAY.w, DISPLAY.y, DISPLAY.z + DISPLAY.h + 4]],
  W,
  H,
  { pad: 20, azimuth: 50, elevation: 30 },
);
const { at, S, L, D, slab, cyl, screws, base, label, ruler, lamp, top, faceY, screen } = kitFor(P);
const kraft = (inner) => `<g class="veo-swatch" style="--sw:#ead6b0">${inner}</g>`;
const product = (inner) => `<g class="veo-swatch" style="--sw:#f3c3b4">${inner}</g>`;

const out = [base(PLATE)];

// ── Sync line on the floor (drawn first, under everything) ──────────────
const ROUTES = {
  pos: [[COUNTER.x + COUNTER.w, -2, 0.6], [-38, -2, 0.6], [-38, -14, 0.6], [HUB.x + 4.5, -14, 0.6], [HUB.x + 4.5, HUB.y + HUB.d, 0.6]],
  web: [[PHONE_STAND.x, -7, 0.6], [HUB.x + 4.5, -7, 0.6], [HUB.x + 4.5, HUB.y + HUB.d, 0.6]],
  up: [[HUB.x, HUB.y + 4, 3], [SHELF.x + SHELF.w + 0.6, HUB.y + 4, 3], [SHELF.x + SHELF.w + 0.6, -42, 3], [SHELF.x + SHELF.w + 0.6, -42, SHELF.top + 2], [DISPLAY.x + DISPLAY.w, -42, SHELF.top + 2]],
};
out.push(k.wireSvg(at(ROUTES.pos[0]), at(ROUTES.pos.at(-1)), { via: ROUTES.pos.slice(1, -1).map(at), tone: "mid", size: 1 }));
out.push(k.wireSvg(at(ROUTES.web[0]), at([HUB.x + 4.5, -14, 0.6]), { via: [at(ROUTES.web[1])], tone: "mid", size: 1, ends: "from" }));

// ── Label printer (back right) ───────────────────────────────────────────
out.push(slab(PRINTER, 0, PRINTER.h, "mid", { steps: 4, bevel: 0.6, seam: 4 }));
out.push(...screws(k.corners(PRINTER, 2.6), PRINTER.h, 0.8, 0.4));
out.push(L(k.planOutline({ x: PRINTER.x + 4, y: PRINTER.y + 4, w: 12, d: 2.6, r: 1 }, PRINTER.h, P, 2), { tone: "hi" }));
out.push(`<g data-part="paper"></g>`);
out.push(lamp(PRINTER.x + PRINTER.w - 4, PRINTER.y + PRINTER.d - 4, PRINTER.h, 1.4, "print"));
out.push(k.wireSvg(at([PRINTER.x, PRINTER.y + 8, 2]), at([HUB.x + 4.5, HUB.y, 2]), { via: [at([PRINTER.x - 3, PRINTER.y + 8, 0.6]), at([PRINTER.x - 3, HUB.y - 4, 0.6]), at([HUB.x + 4.5, HUB.y - 4, 0.6])], tone: "faint", size: 0.9, ends: "from" }));

// ── The shelf ────────────────────────────────────────────────────────────
const sx0 = SHELF.x;
const sx1 = SHELF.x + SHELF.w;
const sy0 = SHELF.y;
const sy1 = SHELF.y + SHELF.d;
out.push(slab({ x: sx0, y: sy0, w: SHELF.w, d: SHELF.d, r: 1 }, 0, LEVELS[0], "mid", { steps: 3, bevel: 0.4, seam: 2 }));
out.push(slab({ x: sx0, y: sy0, w: SHELF.w, d: 2, r: 0.4 }, LEVELS[0], SHELF.top - LEVELS[0], "hi", { steps: 2, bevel: 0.2, crease: "lo" }));
// Pegboard holes on the back panel, between the shelves.
const pegs = [];
for (let z = LEVELS[0] + 3; z < SHELF.top - 1; z += 3.4) for (let x = sx0 + 4; x < sx1 - 3; x += 3.4) pegs.push(at([x, sy0 + 2, z]));
out.push(D(pegs, { size: 0.32, tone: "lo" }));
out.push(slab({ x: sx0, y: sy0, w: 2, d: SHELF.d, r: 0.4 }, LEVELS[0], SHELF.top - LEVELS[0], "mid", { steps: 2, bevel: 0.2 }));

// Products on the shelf (the eight units of Ref 2041, and some neighbours on top).
const slots = [];
[LEVELS[1], LEVELS[0]].forEach((z) => SLOT_X.forEach((x) => slots.push({ x, y: sy0 + 4, z })));
const box = (x, y, z) =>
  product(S(k.slabOf({ x, y, w: PROD.w, d: PROD.d, r: 0.5 }, z, PROD.h, P, 3, 0.3), { tone: "hi", crease: "lo" })) +
  faceY(x + 1.6, y + PROD.d, z + PROD.h - 3, `<rect class="ui-f" data-t="paper" width="${PROD.w - 3.2}" height="4.2" rx=".4"/><path class="ui-s" data-t="lo" d="M1 1.5h4.4M1 2.9h2.6"/>`) +
  L(k.lineOnTop([x + 1.2, y + PROD.d / 2], [x + PROD.w - 1.2, y + PROD.d / 2], z + PROD.h, P), { tone: "lo" });
// Paint bottom-up: each board goes down before the units that stand on it.
const board = (z, i) => [
  slab({ x: sx0 + 2, y: sy0 + 2, w: SHELF.w - 4, d: SHELF.d - 2, r: 0.4 }, z - 1.6, 1.6, "mid", { steps: 2, bevel: 0.2 }),
  faceY(
    sx0 + 2,
    sy1,
    z - 0.1,
    SLOT_X.map((x) => `<rect class="ui-f" data-t="paper" x="${x - sx0 - 2 + 1}" y=".2" width="8" height="1.3" rx=".2"/>`).join("") +
      (i === 0 ? `<text class="ui-t" x="${SLOT_X[3] - sx0 - 2 + 1.6}" y="1.25" font-size="1.1">4,90</text>` : ""),
  ),
];
const unit = (i) => `<g data-slot="${i}">${box(slots[i].x, slots[i].y, slots[i].z)}</g>`;
for (const i of [4, 5, 6, 7]) out.push(unit(i));
out.push(...board(LEVELS[1], 0));
for (const i of [0, 1, 2, 3]) out.push(unit(i));
out.push(...board(LEVELS[2], 1));
// Upper shelf: other products, so the shelf reads as a shop.
for (const [j, x] of [-26, -17, -8].entries()) {
  out.push(cyl(x, sy0 + 9, 3.6, LEVELS[2], 10, "hi", { steps: 24, bevel: 0.3, crease: "lo" }));
  out.push(cyl(x, sy0 + 9, 3.8, LEVELS[2] + 10, 1.6, j === 1 ? "mid" : "lo", { steps: 24 }));
}
out.push(kraft(S(k.slabOf({ x: 4, y: sy0 + 4, w: 12, d: 11, r: 0.5 }, LEVELS[2], 8, P, 3, 0.3), { tone: "hi", crease: "lo" })));
out.push(kraft(S(k.slabOf({ x: 18, y: sy0 + 5, w: 10, d: 10, r: 0.5 }, LEVELS[2], 12, P, 3, 0.3), { tone: "hi", crease: "lo" })));
out.push(slab({ x: sx1 - 2, y: sy0, w: 2, d: SHELF.d, r: 0.4 }, LEVELS[0], SHELF.top - LEVELS[0], "mid", { steps: 2, bevel: 0.2 }));
out.push(slab({ x: sx0, y: sy0, w: SHELF.w, d: SHELF.d, r: 0.6 }, SHELF.top, 1.8, "mid", { steps: 2, bevel: 0.3 }));

// Stock display on top of the shelf.
out.push(slab(DISPLAY, DISPLAY.z + 1.8, DISPLAY.h, "mid", { steps: 4, bevel: 0.6, seam: DISPLAY.z + 6 }));
out.push(...screws(k.corners(DISPLAY, 2.4), DISPLAY.z + 1.8 + DISPLAY.h, 0.7, 0.35));
const DW = DISPLAY.w - 4;
const segs = Array.from({ length: 8 }, (_, i) => `<rect class="scr-f" data-seg="${i}" x="${DW - 11.4 + (i % 4) * 2.6}" y="${i < 4 ? 7.6 : 10.6}" width="2" height="2.2" rx=".3"/>`).join("");
out.push(
  faceY(
    DISPLAY.x + 2,
    DISPLAY.y + DISPLAY.d,
    DISPLAY.z + 1.8 + DISPLAY.h - 2,
    screen(
      DW,
      14,
      `<text class="scr-t" data-t="dim" x="2" y="3.8" font-size="2">REF 2041 · STOCK</text>` +
        `<text class="scr-t" data-part="stock" x="2" y="11.6" font-size="7.4" font-weight="600">8</text>` +
        `<text class="scr-t" data-t="dim" data-part="min" x="${DW - 11.4}" y="5.4" font-size="1.9">mín 3</text>` +
        segs,
      1.2,
    ),
  ),
);
out.push(`<g data-part="reorder" class="veo-lamp">${cyl(DISPLAY.x + DISPLAY.w - 4.5, DISPLAY.y + 4, 1.6, DISPLAY.z + 1.8 + DISPLAY.h, 1.6, "hi", { steps: 18, crease: "lo" })}</g>`);
out.push(cyl(DISPLAY.x + 5, DISPLAY.y + 5, 1.4, DISPLAY.z + 1.8 + DISPLAY.h, 0.8, "lo", { steps: 14 }));

// Sync hub at the foot of the shelf, and the riser up to the display.
out.push(slab(HUB, 0, HUB.h, "mid", { steps: 3, bevel: 0.4, seam: 2 }));
out.push(lamp(HUB.x + HUB.w / 2, HUB.y + HUB.d / 2, HUB.h, 1.3, "sync"));
out.push(k.wireSvg(at(ROUTES.up[0]), at(ROUTES.up.at(-1)), { via: ROUTES.up.slice(1, -1).map(at), tone: "mid", size: 0.9 }));

// ── Register counter (front left) ────────────────────────────────────────
out.push(slab({ x: COUNTER.x + 2, y: COUNTER.y + 2, w: COUNTER.w - 4, d: COUNTER.d - 4, r: 1.5 }, 0, 2, "lo", { steps: 3, bevel: 0.3 }));
out.push(slab(COUNTER, 2, COUNTER.h - 2, "mid", { steps: 4, bevel: 0.6, seam: 10 }));
out.push(L(k.planOutline(k.insetPlan(COUNTER, 2.4), COUNTER.h, P, 3), { tone: "faint" }));
const MON = { x: COUNTER.x + 4, y: COUNTER.y + 9 };
out.push(slab({ x: MON.x + 6, y: MON.y - 2, w: 10, d: 7, r: 1 }, COUNTER.h, 1.2, "lo", { steps: 3, bevel: 0.3 }));
out.push(slab({ x: MON.x + 9.6, y: MON.y, w: 2.8, d: 2.4, r: 0.5 }, COUNTER.h + 1.2, 6, "mid", { steps: 2, bevel: 0.2 }));
out.push(slab({ x: MON.x, y: MON.y + 2.4, w: 22, d: 2.4, r: 0.8 }, COUNTER.h + 5.2, 15, "mid", { steps: 3, bevel: 0.4 }));
out.push(
  faceY(
    MON.x + 1.4,
    MON.y + 4.8,
    COUNTER.h + 5.2 + 13.6,
    screen(
      19.2,
      12.2,
      `<text class="scr-t" data-t="dim" x="1.6" y="3.4" font-size="1.9">TPV · CAJA 1</text><text class="scr-t" data-part="ticket" x="1.6" y="7.6" font-size="2.6" font-weight="600">Venta 0087</text><text class="scr-t" data-t="acc" data-part="tline" x="1.6" y="10.6" font-size="1.9">1 × Ref 2041</text>`,
      1,
    ),
  ),
);
// Card terminal with its keypad.
const PAD = { x: COUNTER.x + 30, y: COUNTER.y + 18, w: 8, d: 10, r: 1.2 };
out.push(slab(PAD, COUNTER.h, 2.4, "hi", { steps: 3, bevel: 0.4, crease: "lo" }));
out.push(top(PAD.x + 1.4, PAD.y + 1.2, COUNTER.h + 2.42, `<rect class="ui-f" data-t="hi" width="5.2" height="2.8" rx=".4"/>`));
const keys = [];
for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) keys.push(at([PAD.x + 1.8 + c * 2.2, PAD.y + 5.6 + r * 1.5, COUNTER.h + 2.42]));
out.push(D(keys, { size: 0.42, tone: "mid" }));
out.push(`<g data-part="cardok" class="veo-lamp" data-tone="ok">${cyl(PAD.x + 6.4, PAD.y + 2.6, 0.7, COUNTER.h + 2.4, 0.5, "hi", { steps: 12 })}</g>`);

// Paper bag, back half (the unit sold at the register drops into it).
const bagBack = [
  slab({ x: BAG.x, y: BAG.y, w: BAG.w, d: 1, r: 0.2 }, COUNTER.h, BAG.h, "hi", { steps: 1, bevel: 0, crease: "lo" }),
  slab({ x: BAG.x, y: BAG.y, w: 1, d: BAG.d, r: 0.2 }, COUNTER.h, BAG.h, "hi", { steps: 1, bevel: 0, crease: "lo" }),
  slab({ x: BAG.x, y: BAG.y, w: BAG.w, d: BAG.d, r: 0.3 }, COUNTER.h, 0.6, "mid", { steps: 2, bevel: 0 }),
];
out.push(kraft(bagBack.join("")));

// ── Phone on its stand (front right): the online store ──────────────────
out.push(slab(PHONE_STAND, 0, 4, "mid", { steps: 3, bevel: 0.5, seam: 2 }));
out.push(slab({ x: PHONE_STAND.x + 3, y: PHONE_STAND.y + 2, w: 20, d: 3, r: 0.8 }, 4, 3, "lo", { steps: 2, bevel: 0.3 }));
const PH = { x: PHONE_STAND.x + 3, y: PHONE_STAND.y + 5, w: 20, d: 2.2, z: 5, h: 34 };
out.push(slab({ x: PH.x, y: PH.y, w: PH.w, d: PH.d, r: 0.8 }, PH.z, PH.h, "hi", { steps: 3, bevel: 0.4, crease: "lo" }));
out.push(
  faceY(
    PH.x + 1.2,
    PH.y + PH.d,
    PH.z + PH.h - 1.2,
    screen(
      PH.w - 2.4,
      PH.h - 2.4,
      `<text class="scr-t" data-t="dim" x="1.6" y="3.2" font-size="1.6">9:41</text>` +
        `<text class="scr-t" data-t="dim" x="1.6" y="6.6" font-size="1.6">TIENDA ONLINE</text>` +
        `<rect class="scr-f" x="1.6" y="8.2" width="${PH.w - 5.6}" height="9.4" rx="1.2"/>` +
        `<rect class="scr-f" data-t="mid" x="${(PH.w - 2.4) / 2 - 3}" y="9.6" width="6" height="6.6" rx=".6"/>` +
        `<text class="scr-t" data-part="order" x="1.6" y="21.2" font-size="2" font-weight="600">Pedido —</text>` +
        `<text class="scr-t" data-t="dim" x="1.6" y="24" font-size="1.6">1 × Ref 2041</text>` +
        `<rect class="scr-f" data-part="paid" x="1.6" y="26.2" width="${PH.w - 5.6}" height="3.8" rx="1.9"/>` +
        `<text class="scr-t" data-part="paidtext" x="${(PH.w - 2.4) / 2}" y="28.8" font-size="1.8" text-anchor="middle">Pagar</text>`,
      1.4,
    ),
  ),
);

// Shipping carton, back half (online orders are packed here).
const cartonHalf = (front) => {
  const t = 1;
  const walls = front
    ? [
        { x: CARTON.x, y: CARTON.y + CARTON.d - t, w: CARTON.w, d: t },
        { x: CARTON.x + CARTON.w - t, y: CARTON.y, w: t, d: CARTON.d },
      ]
    : [
        { x: CARTON.x, y: CARTON.y, w: CARTON.w, d: t },
        { x: CARTON.x, y: CARTON.y, w: t, d: CARTON.d },
      ];
  const parts = walls.map((w) => S(k.slabOf({ ...w, r: 0.2 }, 0.6, CARTON.h, P, 1, 0), { tone: "hi", crease: "lo" }));
  if (!front) parts.unshift(S(k.slabOf({ ...CARTON }, 0, 0.6, P, 2, 0), { tone: "mid" }));
  if (!front) parts.push(S(k.slabOf({ x: CARTON.x - 0.4, y: CARTON.y - 7, w: CARTON.w + 0.8, d: 7, r: 0.2 }, CARTON.h + 0.6, 0.5, P, 1, 0), { tone: "hi", crease: "lo" }));
  return kraft(parts.join(""));
};
out.push(cartonHalf(false));

// ── The unit in flight ───────────────────────────────────────────────────
out.push(`<g data-part="fly" opacity="0">${box(-PROD.w / 2, -PROD.d / 2, 0)}</g>`);

out.push(kraft(slab({ x: BAG.x, y: BAG.y + BAG.d - 1, w: BAG.w, d: 1, r: 0.2 }, COUNTER.h, BAG.h, "hi", { steps: 1, bevel: 0, crease: "lo" }) + slab({ x: BAG.x + BAG.w - 1, y: BAG.y, w: 1, d: BAG.d, r: 0.2 }, COUNTER.h, BAG.h, "hi", { steps: 1, bevel: 0, crease: "lo" })));
out.push(L(k.segment([BAG.x + 3, BAG.y + BAG.d, COUNTER.h + BAG.h], [BAG.x + 3, BAG.y + BAG.d, COUNTER.h + BAG.h + 3], P) + k.segment([BAG.x + 3, BAG.y + BAG.d, COUNTER.h + BAG.h + 3], [BAG.x + 8, BAG.y + BAG.d, COUNTER.h + BAG.h + 3], P) + k.segment([BAG.x + 8, BAG.y + BAG.d, COUNTER.h + BAG.h + 3], [BAG.x + 8, BAG.y + BAG.d, COUNTER.h + BAG.h], P), { tone: "mid" }));
out.push(cartonHalf(true));
out.push(faceY(CARTON.x + 2, CARTON.y + CARTON.d, CARTON.h - 2, `<text class="ui-t" font-size="2.4">#1043</text>`, `data-part="cartonlabel"`));

// Pulses on the sync line, drawn above everything on the floor.
out.push(`<g data-part="beads"></g>`);

// ── Front: label and ruler ───────────────────────────────────────────────
out.push(label({ x: -92, y: 18, w: 44, d: 14, r: 1.2 }, "VEODAR · RT-04"));
out.push(ruler({ x: -36, y: 38, w: 56, d: 7, r: 1 }));
// A second unit of something else waiting by the register, and a price gun.
out.push(slab({ x: 58, y: 14, w: 16, d: 10, r: 1.4 }, 0, 3, "mid", { steps: 3, bevel: 0.4 }));
out.push(slab({ x: 60, y: 16, w: 8, d: 6, r: 1 }, 3, 3.6, "hi", { steps: 3, bevel: 0.3, crease: "lo" }));
out.push(slab({ x: 66, y: 17.2, w: 6, d: 3.6, r: 0.8 }, 3, 1.6, "mid", { steps: 2, bevel: 0.2 }));
out.push(D([at([62, 19, 6.6])], { size: 0.6, tone: "hi" }));

save("shelf", {
  width: W,
  height: H,
  label:
    "Una estantería de tienda sobre una placa, con ocho unidades del mismo producto: una venta en el TPV y un pedido en la tienda online sacan unidades del mismo estante; cada venta viaja por la línea de sincronización hasta el contador de stock, que baja una vez por venta, y al llegar al mínimo una impresora saca la propuesta de reposición.",
  body: out,
  motion: {
    P,
    slots,
    prod: PROD,
    routes: ROUTES,
    bag: { x: BAG.x + BAG.w / 2, y: BAG.y + BAG.d / 2, z: COUNTER.h + 0.6 },
    carton: { x: CARTON.x + CARTON.w / 2, y: CARTON.y + CARTON.d / 2, z: 0.6 },
    paper: { x0: PRINTER.x + 4.6, x1: PRINTER.x + 15.4, y: PRINTER.y + 5.3, z: PRINTER.h },
  },
});
