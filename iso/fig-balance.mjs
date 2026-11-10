// Banca: a reconciliation balance. A ticker printer issues each bank
// transaction; the matching invoice comes off the tray; both are weighed on a
// beam balance. Equal amounts leave the beam level and the pair is posted to the
// ledger; a difference tips the beam and the pair goes to review.
import { k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 480;
const PLATE = { x: -104, y: -60, w: 208, d: 116, r: 10 };
const BAL = { y: -14, pivotZ: 52, L: 40, hang: 24 };
const PRINTER = { x: -98, y: -38, w: 24, d: 20, r: 2, h: 14 };
const TRAY = { x: 70, y: -12, w: 22, d: 18, r: 1.4 };
const BOOK = { x: -18, y: 18, w: 34, d: 22 };
const REVIEW = { x: 30, y: 18, w: 26, d: 20, r: 1, h: 6 };
const DESK = { x: 56, y: -56, w: 40, d: 12, r: 2, h: 30 };

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -18, 0), [-BAL.L - 12, BAL.y, BAL.pivotZ + 10], [BAL.L + 12, BAL.y, BAL.pivotZ + 10], [DESK.x, DESK.y, DESK.h + 4]],
  W,
  H,
  { pad: 20, azimuth: 50, elevation: 30 },
);
const { at, S, L, D, slab, cyl, screws, base, label, ruler, lamp, faceY, screen } = kitFor(P);

const out = [base(PLATE)];

// ── Screen desk (back left) ──────────────────────────────────────────────
out.push(slab(DESK, 0, DESK.h, "mid", { steps: 4, bevel: 0.6, seam: 6 }));
out.push(...screws(k.corners(DESK, 2.6), DESK.h, 0.8, 0.4));
const SW = DESK.w - 4;
out.push(
  faceY(
    DESK.x + 2,
    DESK.y + DESK.d,
    DESK.h - 2,
    screen(
      SW,
      20,
      `<text class="scr-t" data-t="dim" x="2" y="3.8" font-size="1.9">CONCILIACIÓN</text>` +
        `<text class="scr-t" data-t="dim" x="2" y="8" font-size="1.9">MOV</text><text class="scr-t" data-part="mov" x="${SW - 2}" y="8" font-size="2.4" font-weight="600" text-anchor="end">—</text>` +
        `<text class="scr-t" data-t="dim" data-part="fral" x="2" y="11.8" font-size="1.9">FRA</text><text class="scr-t" data-part="fra" x="${SW - 2}" y="11.8" font-size="2.4" font-weight="600" text-anchor="end">—</text>` +
        `<path class="scr-s" data-t="dim" d="M2 13.6h${SW - 4}"/>` +
        `<text class="scr-t" data-t="dim" x="2" y="17.6" font-size="1.9">DIF</text><text class="scr-t" data-t="acc" data-part="dif" x="${SW - 2}" y="17.6" font-size="2.4" font-weight="600" text-anchor="end">—</text>`,
      1.2,
    ),
  ),
);
out.push(`<g data-part="okl" class="veo-lamp" data-tone="ok">${cyl(DESK.x + 8, DESK.y + 6, 1.8, DESK.h, 1.6, "hi", { steps: 18, crease: "lo" })}</g>`);
out.push(cyl(DESK.x + 8, DESK.y + 6, 2.8, DESK.h, 0.6, "mid", { steps: 18 }));
out.push(`<g data-part="revl" class="veo-lamp">${cyl(DESK.x + 16, DESK.y + 6, 1.8, DESK.h, 1.6, "hi", { steps: 18, crease: "lo" })}</g>`);
out.push(cyl(DESK.x + 16, DESK.y + 6, 2.8, DESK.h, 0.6, "mid", { steps: 18 }));
out.push(k.wireSvg(at([DESK.x, DESK.y + 6, 2]), at([14, BAL.y - 11, 2]), { via: [at([14, DESK.y + 6, 0.6])], tone: "mid", size: 1 }));

// ── Ticker printer (left) ────────────────────────────────────────────────
out.push(slab(PRINTER, 0, PRINTER.h, "mid", { steps: 4, bevel: 0.6, seam: 4 }));
out.push(...screws(k.corners(PRINTER, 2.4), PRINTER.h, 0.8, 0.4));
out.push(L(k.planOutline({ x: PRINTER.x + PRINTER.w - 6, y: PRINTER.y + 4, w: 2.4, d: 12, r: 1 }, PRINTER.h, P, 2), { tone: "hi" }));
out.push(cyl(PRINTER.x + 7, PRINTER.y + 10, 5, PRINTER.h, 1.4, "lo", { steps: 26 }));
out.push(cyl(PRINTER.x + 7, PRINTER.y + 10, 4, PRINTER.h + 1.4, 4, "hi", { steps: 26, crease: "lo" }));
out.push(L(k.ring(PRINTER.x + 7, PRINTER.y + 10, 1.4, PRINTER.h + 5.4, P, 16), { tone: "mid" }));
out.push(faceY(PRINTER.x + 2, PRINTER.y + PRINTER.d, PRINTER.h - 2.4, `<text class="ui-t" font-size="2.2">BANCO · API</text>`));

// ── Invoice tray (right) with a stack of invoices ───────────────────────
out.push(slab(TRAY, 0, 1.2, "lo", { steps: 2, bevel: 0.2 }));
out.push(slab({ x: TRAY.x, y: TRAY.y, w: 1, d: TRAY.d, r: 0.2 }, 1.2, 5, "mid", { steps: 1, bevel: 0 }));
out.push(slab({ x: TRAY.x, y: TRAY.y, w: TRAY.w, d: 1, r: 0.2 }, 1.2, 5, "mid", { steps: 1, bevel: 0 }));
for (let i = 0; i < 4; i++) out.push(slab({ x: TRAY.x + 3, y: TRAY.y + 3, w: 16, d: 12, r: 0.3 }, 1.2 + i * 0.7, 0.7, "hi", { steps: 1, bevel: 0, crease: "lo" }));
out.push(faceY(TRAY.x + 2, TRAY.y + TRAY.d, 1.2, `<text class="ui-t" y="-.6" font-size="2.2">FACTURAS</text>`));

// ── Ledger (front) and review tray back half ─────────────────────────────
const page = (x) => [
  slab({ x, y: BOOK.y, w: BOOK.w / 2 - 0.6, d: BOOK.d, r: 0.6 }, 0, 2.2, "hi", { steps: 2, bevel: 0.2, crease: "lo" }),
  L(
    [5, 8.5, 12, 15.5].map((y) => k.lineOnTop([x + 2.4, BOOK.y + y], [x + BOOK.w / 2 - 3.4, BOOK.y + y], 2.2, P)).join(""),
    { tone: "lo" },
  ),
];
out.push(slab({ x: BOOK.x - 1, y: BOOK.y - 1, w: BOOK.w + 2, d: BOOK.d + 2, r: 1 }, 0, 1, "mid", { steps: 2, bevel: 0.2 }));
out.push(...page(BOOK.x), ...page(BOOK.x + BOOK.w / 2 + 0.6));
out.push(faceY(BOOK.x + 1, BOOK.y + BOOK.d + 1, 0.8, `<text class="ui-t" y="-.4" font-size="2.2">LIBRO MAYOR</text>`));
out.push(slab({ x: REVIEW.x, y: REVIEW.y, w: REVIEW.w, d: REVIEW.d, r: REVIEW.r }, 0, 1, "lo", { steps: 2, bevel: 0.2 }));
for (const w of [
  { x: REVIEW.x, y: REVIEW.y, w: REVIEW.w, d: 1 },
  { x: REVIEW.x, y: REVIEW.y, w: 1, d: REVIEW.d },
])
  out.push(slab({ ...w, r: 0.2 }, 1, REVIEW.h - 1, "mid", { steps: 1, bevel: 0 }));

// ── The balance: base with levelling feet and a spirit level, the pillar ─
const BB = { x: -24, y: BAL.y - 11, w: 48, d: 22, r: 3 };
for (const [x, y] of k.corners(BB, 4)) {
  out.push(cyl(x, y, 2.4, 0, 1, "lo", { steps: 18 }));
  out.push(cyl(x, y, 1.4, 1, 1.4, "mid", { steps: 14 }));
}
out.push(slab(BB, 2.4, 4, "mid", { steps: 4, bevel: 0.6, seam: 4.2 }));
out.push(cyl(12, BAL.y + 5, 3.4, 6.4, 0.8, "lo", { steps: 22 }));
out.push(L(k.ring(12, BAL.y + 5, 1.6, 7.2, P, 18), { tone: "mid" }));
out.push(D([at([12.4, BAL.y + 5, 7.2])], { size: 0.8, tone: "hi" }));
out.push(cyl(0, BAL.y, 6, 6.4, 2, "lo", { steps: 28 }));
out.push(cyl(0, BAL.y, 2.6, 8.4, BAL.pivotZ - 12, "hi", { steps: 22, crease: "lo" }));
out.push(slab({ x: -5, y: BAL.y - 4, w: 10, d: 8, r: 1.2 }, BAL.pivotZ - 4, 2.4, "mid", { steps: 3, bevel: 0.3 }));
out.push(slab({ x: -1.6, y: BAL.y - 4, w: 3.2, d: 8, r: 0.4 }, BAL.pivotZ - 1.6, 1.6, "mid", { steps: 1, bevel: 0 }));

// Pans, strings and beam are live.
out.push(`<g data-part="pans"></g>`);
out.push(`<g data-part="items"></g>`);
out.push(`<g data-part="beam"></g>`);

// Scale plate in front of the pillar and the needle over it.
const SC = { y: BAL.y + 3.2, z: BAL.pivotZ, r0: 17, r1: 21 };
const arc = [];
for (let i = -6; i <= 6; i++) {
  const a = (i * 2.5 * Math.PI) / 180;
  const r1 = i % 3 === 0 ? SC.r1 + 1.4 : SC.r1;
  arc.push(k.segment([Math.sin(a) * SC.r0, SC.y, SC.z - Math.cos(a) * SC.r0], [Math.sin(a) * r1, SC.y, SC.z - Math.cos(a) * r1], P));
}
out.push(slab({ x: -9, y: SC.y - 0.6, w: 18, d: 0.6, r: 0.2 }, SC.z - SC.r1 - 3, 8, "hi", { steps: 1, bevel: 0, crease: "lo" }));
out.push(L(arc.join(""), { tone: "mid" }));
out.push(L(k.segment([0, SC.y, SC.z - SC.r0], [0, SC.y, SC.z - SC.r1 - 1.6], P), { tone: "hi" }));
out.push(`<g data-part="needle"></g>`);

for (const w of [
  { x: REVIEW.x, y: REVIEW.y + REVIEW.d - 1, w: REVIEW.w, d: 1 },
  { x: REVIEW.x + REVIEW.w - 1, y: REVIEW.y, w: 1, d: REVIEW.d },
])
  out.push(slab({ ...w, r: 0.2 }, 1, REVIEW.h - 1, "mid", { steps: 1, bevel: 0 }));
out.push(L(k.planOutline({ ...REVIEW }, REVIEW.h, P, 2), { tone: "red" }));
out.push(faceY(REVIEW.x + 2, REVIEW.y + REVIEW.d, REVIEW.h - 1.6, `<text class="ui-t" font-size="2.2" style="fill:#e5484d">REVISIÓN</text>`));

// ── Front: label, ruler ──────────────────────────────────────────────────
out.push(label({ x: -98, y: 30, w: 44, d: 14, r: 1.2 }, "VEODAR · BK-07"));
out.push(ruler({ x: 64, y: 24, w: 32, d: 7, r: 1 }));

save("balance", {
  width: W,
  height: H,
  label:
    "Una balanza de conciliación sobre una placa: una impresora saca cada movimiento del banco y de la bandeja sale su factura; los dos se pesan en una balanza de brazos. Si los importes son iguales, el brazo queda nivelado y el par se anota en el libro mayor; si hay diferencia, el brazo se inclina y el par va a revisión.",
  body: out,
  motion: {
    P,
    bal: BAL,
    sc: SC,
    printer: { x: PRINTER.x + PRINTER.w - 4.8, y: PRINTER.y + 10, z: PRINTER.h },
    tray: { x: TRAY.x + 11, y: TRAY.y + 9, z: 4 },
    book: { x: BOOK.x + BOOK.w / 2, y: BOOK.y + BOOK.d / 2, z: 2.2 },
    review: { x: REVIEW.x + REVIEW.w / 2, y: REVIEW.y + REVIEW.d / 2, z: 1 },
  },
});
