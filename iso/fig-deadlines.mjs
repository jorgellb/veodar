// Despachos: a deadline belt. Case files ride carriers on a rail graduated in
// business days; each working day the belt moves one slot toward TODAY, and on
// weekends it does not move. A court notice prints, its deadline is counted in
// business days and its file joins the belt; files that reach today are stamped
// as filed and drop into the box.
import { k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 480;
const PLATE = { x: -104, y: -60, w: 208, d: 116, r: 10 };
const RAIL = { x0: -70, x1: 80, y: 2, d: 14, h: 6, slot: 12, first: -62 };
const BOX = { x: -98, y: 0, w: 24, d: 20, h: 8 };
const DESK = { x: -18, y: -56, w: 44, d: 12, h: 30 };
const PRN = { x: 44, y: -54, w: 26, d: 16, r: 2, h: 12 };
const STAMP = { x: RAIL.first, post: -8, z: 34 };
const FOLDERS = ["2207", "2214", "2219", "2230", "2231"];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [DESK.x, DESK.y, DESK.h + 4], [STAMP.x, STAMP.post, STAMP.z + 8]], W, H, {
  pad: 20,
  azimuth: 50,
  elevation: 30,
});
const { at, S, L, D, slab, cyl, screws, base, label, ruler, lamp, faceY, faceX, screen } = kitFor(P);

const out = [base(PLATE)];

// ── Desk with the screen and the weekday strip (back) ────────────────────
out.push(slab({ ...DESK, r: 2 }, 0, DESK.h, "mid", { steps: 4, bevel: 0.6, seam: 6 }));
out.push(...screws(k.corners({ ...DESK, r: 2 }, 3), DESK.h, 0.8, 0.4));
const SW = DESK.w - 4;
out.push(
  faceY(
    DESK.x + 2,
    DESK.y + DESK.d,
    DESK.h - 2,
    screen(
      SW,
      15,
      `<text class="scr-t" data-t="dim" x="2" y="3.8" font-size="1.9">AGENDA DE PLAZOS</text>` +
        `<text class="scr-t" data-part="day" x="2" y="8.6" font-size="3.4" font-weight="600">HOY · LUN</text><text class="scr-t" data-t="acc" data-part="kind" x="${SW - 2}" y="8.6" font-size="2.2" text-anchor="end">HÁBIL</text>` +
        `<text class="scr-t" data-part="event" x="2" y="12.8" font-size="2"></text>`,
      1.2,
    ),
  ),
);
const DAYS = ["L", "M", "X", "J", "V", "S", "D"];
DAYS.forEach((d, i) => {
  const x = DESK.x + 6 + i * 5.4;
  out.push(lamp(x, DESK.y + 4, DESK.h, 1.3, `wd${i}`));
});
out.push(
  faceY(
    DESK.x + 2,
    DESK.y + DESK.d,
    9,
    DAYS.map((d, i) => `<text class="ui-t" x="${4 + i * 5.4}" y="2.4" font-size="2.4" text-anchor="middle"${i > 4 ? ' style="fill:#e5484d"' : ""}>${d}</text>`).join(""),
  ),
);

// ── Notice printer (back right) ──────────────────────────────────────────
out.push(slab(PRN, 0, PRN.h, "mid", { steps: 4, bevel: 0.6, seam: 4 }));
out.push(...screws(k.corners(PRN, 2.6), PRN.h, 0.8, 0.4));
out.push(L(k.planOutline({ x: PRN.x + 5, y: PRN.y + 6, w: 16, d: 2.4, r: 1 }, PRN.h, P, 2), { tone: "hi" }));
out.push(`<g data-part="notice"></g>`);
out.push(lamp(PRN.x + PRN.w - 4, PRN.y + 4, PRN.h, 1.3, "inbox"));
out.push(faceY(PRN.x + 2, PRN.y + PRN.d, PRN.h - 2.6, `<text class="ui-t" font-size="2.2">NOTIFICACIONES</text>`));
out.push(k.wireSvg(at([PRN.x, PRN.y + 8, 2]), at([DESK.x + DESK.w, DESK.y + 6, 2]), { via: [at([DESK.x + DESK.w + 6, PRN.y + 8, 0.6]), at([DESK.x + DESK.w + 6, DESK.y + 6, 0.6])], tone: "mid", size: 1 }));

// ── Stamp post and arm (behind the rail at the TODAY end) ────────────────
out.push(slab({ x: STAMP.x - 3, y: STAMP.post - 3, w: 6, d: 6, r: 1 }, 0, 2, "lo", { steps: 2, bevel: 0.2 }));
out.push(slab({ x: STAMP.x - 1.6, y: STAMP.post - 1.6, w: 3.2, d: 3.2, r: 0.5 }, 2, STAMP.z, "mid", { steps: 2, bevel: 0.2, seam: 18 }));
out.push(slab({ x: STAMP.x - 2, y: STAMP.post - 1.6, w: 4, d: RAIL.y + RAIL.d / 2 - STAMP.post + 6, r: 0.6 }, STAMP.z, 3, "mid", { steps: 2, bevel: 0.3 }));

// ── The rail, graduated in business days ────────────────────────────────
out.push(slab({ x: RAIL.x0, y: RAIL.y, w: RAIL.x1 - RAIL.x0, d: RAIL.d, r: 1.4 }, 0, RAIL.h, "mid", { steps: 3, bevel: 0.5, seam: 2 }));
out.push(L(k.segment([RAIL.x0 + 2, RAIL.y + RAIL.d / 2, RAIL.h], [RAIL.x1 - 2, RAIL.y + RAIL.d / 2, RAIL.h], P), { tone: "faint" }));
const labels = [];
for (let s = 0; s < 12; s++) {
  const x = RAIL.first + s * RAIL.slot;
  labels.push(`<text class="ui-t" x="${x - RAIL.x0}" y="3" font-size="2.4" text-anchor="middle"${s === 0 ? ' style="fill:#ff5a1f;font-weight:600"' : ""}>${s === 0 ? "HOY" : s}</text>`);
  out.push(L(k.lineOnTop([x, RAIL.y + 1], [x, RAIL.y + 3], RAIL.h, P), { tone: s === 0 ? "lit" : "mid" }));
}
out.push(faceY(RAIL.x0, RAIL.y + RAIL.d, RAIL.h - 1, labels.join("")));
out.push(faceX(RAIL.x1, RAIL.y + RAIL.d - 1, RAIL.h - 1, `<text class="ui-t" y="3" font-size="2.2">DÍAS HÁBILES</text>`));

// Filed box at the TODAY end: back half before the files, front half after.
out.push(slab({ x: BOX.x, y: BOX.y, w: BOX.w, d: BOX.d, r: 1 }, 0, 1, "lo", { steps: 2, bevel: 0.2 }));
for (const w of [
  { x: BOX.x, y: BOX.y, w: BOX.w, d: 1 },
  { x: BOX.x, y: BOX.y, w: 1, d: BOX.d },
])
  out.push(slab({ ...w, r: 0.2 }, 1, BOX.h - 1, "mid", { steps: 1, bevel: 0 }));

// ── Case files on carriers (depth-sorted live) ───────────────────────────
const folder = (id, i) => {
  const tabY = -4.4 + (i % 3) * 1.4;
  return (
    `<g data-item="${i}" data-x="0" data-y="${RAIL.y + RAIL.d / 2}" data-z="${RAIL.h}"><g data-folder="${i}" opacity="0">` +
    slab({ x: -4, y: RAIL.y + 1.2, w: 8, d: RAIL.d - 2.4, r: 0.6 }, RAIL.h, 1.2, "mid", { steps: 2, bevel: 0.2 }) +
    slab({ x: -1.2, y: RAIL.y + 2, w: 2.4, d: RAIL.d - 4, r: 0.3 }, RAIL.h + 1.2, 13, "hi", { steps: 1, bevel: 0.2, crease: "lo" }) +
    `<g data-tab="${i}">${slab({ x: -1, y: RAIL.y + RAIL.d / 2 + tabY, w: 2, d: 3.4, r: 0.3 }, RAIL.h + 14.2, 2.2, "hi", { steps: 1, bevel: 0.1, crease: "lo" })}</g>` +
    faceX(1.2, RAIL.y + RAIL.d - 2.6, RAIL.h + 13, `<text class="ui-t" y="2.6" font-size="2.2" font-weight="600">${id}</text><path class="ui-s" d="M0 4.4h6M0 6.2h4"/>`) +
    `</g></g>`
  );
};
out.push(`<g data-stack>${FOLDERS.map(folder).join("")}</g>`);

for (const w of [
  { x: BOX.x, y: BOX.y + BOX.d - 1, w: BOX.w, d: 1 },
  { x: BOX.x + BOX.w - 1, y: BOX.y, w: 1, d: BOX.d },
])
  out.push(slab({ ...w, r: 0.2 }, 1, BOX.h - 1, "mid", { steps: 1, bevel: 0 }));
out.push(faceY(BOX.x + 2, BOX.y + BOX.d, BOX.h - 2, `<text class="ui-t" font-size="2.2">PRESENTADOS</text>`));

// Stamp head (moves) over the TODAY slot.
out.push(
  `<g data-part="stamp">${slab({ x: STAMP.x - 0.8, y: RAIL.y + RAIL.d / 2 + 2.6, w: 1.6, d: 1.6, r: 0.3 }, 23.4, STAMP.z - 23.4, "hi", { steps: 1, bevel: 0.1 })}${slab(
    { x: STAMP.x - 3.4, y: RAIL.y + RAIL.d / 2 + 1.2, w: 6.8, d: 4.6, r: 1 },
    21.2,
    2.4,
    "hi",
    { steps: 3, bevel: 0.4, crease: "lo" },
  )}${slab({ x: STAMP.x - 3, y: RAIL.y + RAIL.d / 2 + 1.6, w: 6, d: 3.8, r: 0.8 }, 20.4, 0.8, "hi", { steps: 2, bevel: 0.1, lit: true })}</g>`,
);

// ── Front: label, ruler ──────────────────────────────────────────────────
out.push(label({ x: -98, y: 30, w: 44, d: 14, r: 1.2 }, "VEODAR · LX-11"));
out.push(ruler({ x: -40, y: 38, w: 80, d: 7, r: 1 }));

save("deadlines", {
  width: W,
  height: H,
  label:
    "Una cinta de plazos sobre una placa: los expedientes viajan sobre carros por un raíl graduado en días hábiles; cada día laborable la cinta avanza un puesto hacia hoy y el fin de semana no se mueve. Una impresora saca una notificación, se cuenta su plazo en días hábiles y su expediente entra en la cinta; los que llegan a hoy reciben el sello de presentado y caen a la caja.",
  body: out,
  motion: {
    P,
    rail: RAIL,
    box: BOX,
    stamp: STAMP,
    folders: FOLDERS,
    paper: { x0: PRN.x + 6, x1: PRN.x + 20, y: PRN.y + 7.2, z: PRN.h },
  },
});
