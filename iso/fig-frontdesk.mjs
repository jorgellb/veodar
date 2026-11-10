// Salud: a front-desk scheduling board. Each row is a time slot with a card in
// it; the 10:30 rail runs past the board on both sides. When an appointment is
// cancelled its card slides off the right end, the slot is offered on the
// patient's phone, and once confirmed the first card of the waitlist (queued on
// the same rail) slides in. The consent is signed on the phone and filed in a
// records cabinet that opens with a key and prints every access.
import { k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 480;
const PLATE = { x: -106, y: -60, w: 212, d: 116, r: 10 };
const BOARD = { x: -42, y: -50, w: 70, d: 4, z0: 4, z1: 62 };
const FACE_Y = BOARD.y + BOARD.d; // front face of the board
const ROWS = ["09:00", "09:30", "10:00", "10:30", "11:00"];
const ROW_Z = [46, 38, 30, 22, 14]; // ledge tops
const FREE = 3; // the 10:30 row
const CARD = { w: 14, d: 1.6, h: 6.4, x: 2 };
const LEDGE = { d: 3.4, h: 1.2 };
const WAIT_X = [-56, -72, -88]; // waitlist card centres, first in line nearest the board
const RAIL = { x0: -100, x1: 46 };
const TRAY = { x: 34, y: -52, w: 16, d: 14, h: 4 };
const CAB = { x: 54, y: -54, w: 32, d: 24, r: 1.5, h: 44 };
const STAND = { x: -74, y: 0, w: 26, d: 14, r: 2 };
const PH = { x: -71, y: 5, w: 20, d: 2.2, z: 5, h: 36 };

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [BOARD.x, BOARD.y, BOARD.z1 + 2], [CAB.x + CAB.w, CAB.y, CAB.h + 10]], W, H, {
  pad: 20,
  azimuth: 50,
  elevation: 30,
});
const { at, S, L, D, slab, cyl, screws, base, label, ruler, lamp, faceY, screen } = kitFor(P);

const out = [base(PLATE)];

// ── Wires: board → phone (offers), phone → cabinet (signed documents) ───
const ROUTES = {
  offer: [[BOARD.x - 3, FACE_Y + 3, 0.6], [-58, FACE_Y + 3, 0.6], [-58, STAND.y, 0.6]],
  file: [[STAND.x + STAND.w, STAND.y + 7, 0.6], [CAB.x + 8, STAND.y + 7, 0.6], [CAB.x + 8, CAB.y + CAB.d, 0.6]],
};
out.push(k.wireSvg(at(ROUTES.offer[0]), at(ROUTES.offer.at(-1)), { via: ROUTES.offer.slice(1, -1).map(at), tone: "mid", size: 1 }));
out.push(k.wireSvg(at(ROUTES.file[0]), at(ROUTES.file.at(-1)), { via: ROUTES.file.slice(1, -1).map(at), tone: "mid", size: 1 }));

// ── Records cabinet (back right) with a log printer on top ──────────────
out.push(slab(CAB, 0, CAB.h, "mid", { steps: 4, bevel: 0.7, seam: 2 }));
out.push(...screws(k.corners(CAB, 3), CAB.h, 0.9, 0.4));
const CF = CAB.y + CAB.d; // cabinet front face
const DRAWERS = [
  [2.4, 14.2],
  [15.6, 27.4],
  [28.8, 40.6],
];
DRAWERS.forEach(([z0, z1], i) => {
  if (i === 1) return; // the middle drawer is drawn live, it opens
  out.push(slab({ x: CAB.x + 2, y: CF, w: CAB.w - 4, d: 1.2, r: 0.4 }, z0, z1 - z0, "hi", { steps: 2, bevel: 0.3, crease: "lo" }));
  out.push(
    faceY(
      CAB.x + 2,
      CF + 1.2,
      z1,
      `<rect class="ui-s" x="${(CAB.w - 4) / 2 - 4}" y="2" width="8" height="3" rx=".4"/><rect class="ui-f" x="${(CAB.w - 4) / 2 - 5}" y="${z1 - z0 - 4}" width="10" height="1.6" rx=".8"/>`,
    ),
  );
});
out.push(`<g data-part="drawer"></g>`);
// Lock with a keyhole, and the key in it.
out.push(
  faceY(
    CAB.x + CAB.w - 7,
    CF,
    CAB.h - 1.4,
    `<circle class="ui-f" data-t="hi" cx="2.6" cy="2.6" r="2.2"/><circle class="ui-f" cx="2.6" cy="2.2" r=".7"/><path class="ui-s" d="M2.6 2.6v1.4"/>`,
  ),
);
out.push(`<g data-part="key" opacity=".25">${slab({ x: CAB.x + CAB.w - 5.3, y: CF, w: 1.6, d: 3.4, r: 0.3 }, CAB.h - 4.6, 1.8, "hi", { steps: 1, bevel: 0, crease: "lo" })}${slab({ x: CAB.x + CAB.w - 6.1, y: CF + 3.4, w: 3.2, d: 1, r: 0.4 }, CAB.h - 5.4, 3.4, "hi", { steps: 2, bevel: 0.2, crease: "lo" })}</g>`);
const PRN = { x: CAB.x + 4, y: CAB.y + 4, w: 18, d: 13, r: 1.6 };
out.push(slab(PRN, CAB.h, 6, "hi", { steps: 3, bevel: 0.4, crease: "lo", seam: CAB.h + 2 }));
out.push(L(k.planOutline({ x: PRN.x + 3.4, y: PRN.y + 3.4, w: 11, d: 2.4, r: 1 }, CAB.h + 6, P, 2), { tone: "hi" }));
out.push(`<g data-part="log"></g>`);
out.push(lamp(CAB.x + CAB.w - 6, CAB.y + 6, CAB.h, 1.5, "access"));

// ── Cancel tray (right of the board) ─────────────────────────────────────
out.push(slab({ x: TRAY.x, y: TRAY.y, w: TRAY.w, d: TRAY.d, r: 1 }, 0, 0.8, "lo", { steps: 2, bevel: 0.2 }));
for (const w of [
  { x: TRAY.x, y: TRAY.y, w: TRAY.w, d: 1 },
  { x: TRAY.x, y: TRAY.y, w: 1, d: TRAY.d },
])
  out.push(slab({ ...w, r: 0.2 }, 0.8, TRAY.h, "mid", { steps: 1, bevel: 0 }));

// ── The board ────────────────────────────────────────────────────────────
out.push(slab({ x: BOARD.x - 3, y: BOARD.y - 4, w: BOARD.w + 6, d: 14, r: 1.6 }, 0, BOARD.z0, "mid", { steps: 3, bevel: 0.5, seam: 2 }));
out.push(...screws([[BOARD.x, BOARD.y + 6], [BOARD.x + BOARD.w, BOARD.y + 6]], BOARD.z0, 0.9, 0.4));
out.push(slab({ x: BOARD.x, y: BOARD.y, w: BOARD.w, d: BOARD.d, r: 0.8 }, BOARD.z0, BOARD.z1 - BOARD.z0, "hi", { steps: 3, bevel: 0.4, crease: "lo" }));
const face = [];
face.push(`<text class="ui-t" x="3" y="4.6" font-size="3" font-weight="600">AGENDA</text><path class="ui-s" data-t="lo" d="M3 6.6h${BOARD.w - 6}"/>`);
ROWS.forEach((time, i) => {
  // Time and light sit on the row's own ledge, like the card beside them.
  const base = BOARD.z1 - ROW_Z[i];
  face.push(`<text class="ui-t" x="3" y="${base - 1}" font-size="2.6">${time}</text>`);
  face.push(`<path class="ui-s" data-t="faint" d="M3 ${base + 0.4}h${BOARD.w - 6}"/>`);
  face.push(`<circle class="ui-f" data-led="${i}" cx="${BOARD.w - 4}" cy="${base - 2.6}" r="1.2"/>`);
});
out.push(faceY(BOARD.x, FACE_Y, BOARD.z1, face.join("")));
// Ledges for the rows (the 10:30 one is the long rail, drawn below).
const ledge = (x0, x1, z) => slab({ x: x0, y: FACE_Y, w: x1 - x0, d: LEDGE.d, r: 0.4 }, z - LEDGE.h, LEDGE.h, "mid", { steps: 1, bevel: 0.2 });
const card = (x, z, text) =>
  slab({ x: x - CARD.w / 2, y: FACE_Y + 0.4, w: CARD.w, d: CARD.d, r: 0.4 }, z, CARD.h, "hi", { steps: 1, bevel: 0.2, crease: "lo" }) +
  faceY(
    x - CARD.w / 2 + 1.2,
    FACE_Y + 0.4 + CARD.d,
    z + CARD.h - 1,
    `${text ? `<text class="ui-t" x="0" y="2.8" font-size="2.6" font-weight="600">${text}</text>` : `<rect class="ui-f" data-t="hi" width="2.6" height="2.6" rx="1.3" y=".4"/>`}<path class="ui-s" d="M4.4 1.2h6.4M4.4 3h4"/>`,
  );
ROWS.forEach((_, i) => {
  if (i === FREE) return;
  out.push(ledge(BOARD.x + 1.5, BOARD.x + BOARD.w - 1.5, ROW_Z[i]));
  out.push(card(CARD.x, ROW_Z[i], ""));
});
// The long 10:30 rail on two posts, with the waitlist plate.
const RZ = ROW_Z[FREE];
for (const x of [RAIL.x0 + 2, RAIL.x1 - 3]) {
  out.push(cyl(x, FACE_Y + LEDGE.d / 2, 2.6, 0, 0.8, "lo", { steps: 18 }));
  out.push(slab({ x: x - 1, y: FACE_Y + 0.7, w: 2, d: 2, r: 0.4 }, 0.8, RZ - LEDGE.h - 0.8, "mid", { steps: 1, bevel: 0.1 }));
}
out.push(ledge(RAIL.x0, RAIL.x1, RZ));
out.push(slab({ x: -96, y: FACE_Y + LEDGE.d, w: 46, d: 0.6, r: 0.2 }, RZ - 7.4, 6, "hi", { steps: 1, bevel: 0, crease: "lo" }));
out.push(faceY(-94.4, FACE_Y + LEDGE.d + 0.6, RZ - 2.6, `<text class="ui-t" font-size="2.3">LISTA DE ESPERA →</text>`));
// Cards on the rail: the 10:30 appointment and the waitlist, all moved live.
out.push(`<g data-card="slot">${card(0, RZ, "")}</g>`);
WAIT_X.forEach((_, i) => out.push(`<g data-card="w${i}">${card(0, RZ, `#${i + 1}`)}</g>`));

// ── Phone on its stand: the patient's side ───────────────────────────────
out.push(slab(STAND, 0, 4, "mid", { steps: 3, bevel: 0.5, seam: 2 }));
out.push(slab({ x: PH.x, y: STAND.y + 2, w: PH.w, d: 3, r: 0.8 }, 4, 3, "lo", { steps: 2, bevel: 0.3 }));
out.push(slab({ x: PH.x, y: PH.y, w: PH.w, d: PH.d, r: 0.8 }, PH.z, PH.h, "hi", { steps: 3, bevel: 0.4, crease: "lo" }));
const SW = PH.w - 2.4;
out.push(
  faceY(
    PH.x + 1.2,
    PH.y + PH.d,
    PH.z + PH.h - 1.2,
    screen(
      SW,
      PH.h - 2.4,
      `<text class="scr-t" data-t="dim" x="1.6" y="3.2" font-size="1.6">9:41</text>` +
        `<text class="scr-t" data-t="dim" x="1.6" y="6.8" font-size="1.6">CLÍNICA</text>` +
        `<text class="scr-t" data-part="title" x="1.6" y="11.6" font-size="1.9" font-weight="600">Sin avisos</text>` +
        `<text class="scr-t" data-t="acc" data-part="sub" x="1.6" y="14.8" font-size="1.8"></text>` +
        `<g data-part="doc" opacity="0"><path class="scr-s" data-t="dim" d="M1.6 17.4h${SW - 3.2}M1.6 19.2h${SW - 6}M1.6 21h${SW - 4.4}"/><path class="scr-s" data-t="dim" d="M1.6 27.4h${SW - 3.2}"/>` +
        `<path class="scr-s" data-t="hi" data-part="sig" pathLength="1" stroke-dasharray="1 1" stroke-dashoffset="1" d="M2.6 26.6c1.4-3 2.6-3.4 3 -1.2s1.2 1.8 2.4-.8 2-2.2 2.2-.2 1.4.6 2.6-1.2 1.6-.4 2 .8"/></g>` +
        `<rect class="scr-f" data-part="chip" x="1.6" y="${PH.h - 9}" width="${SW - 3.2}" height="3.8" rx="1.9"/>` +
        `<text class="scr-t" data-part="chiptext" x="${SW / 2}" y="${PH.h - 6.4}" font-size="1.8" text-anchor="middle"></text>`,
      1.4,
    ),
  ),
);

// Pulses on the wires.
out.push(`<g data-part="beads"></g>`);

// ── Front: label, ruler ──────────────────────────────────────────────────
out.push(label({ x: -100, y: 26, w: 44, d: 14, r: 1.2 }, "VEODAR · CL-05"));
out.push(ruler({ x: -40, y: 32, w: 70, d: 7, r: 1 }));
// A desk bell and a pen tray by the phone: it is a front desk after all.
out.push(cyl(-30, 8, 5.4, 0, 1.2, "mid", { steps: 28 }));
out.push(cyl(-30, 8, 4.2, 1.2, 3, "hi", { steps: 28, bevel: 1.2, crease: "lo" }));
out.push(cyl(-30, 8, 0.8, 4.2, 1.4, "mid", { steps: 12 }));
out.push(slab({ x: -20, y: 2, w: 16, d: 6, r: 2 }, 0, 1.6, "mid", { steps: 3, bevel: 0.3 }));
out.push(slab({ x: -18, y: 4, w: 12, d: 1.2, r: 0.5 }, 1.6, 1.2, "hi", { steps: 2, bevel: 0.2, crease: "lo" }));

save("frontdesk", {
  width: W,
  height: H,
  label:
    "Una agenda de recepción sobre una placa: cada fila es una hora con su tarjeta. Al cancelarse la cita de las 10:30, su tarjeta sale por la derecha, el hueco se ofrece en el móvil del paciente y, al confirmar, entra la primera tarjeta de la lista de espera, que aguarda en el mismo carril. El consentimiento se firma en el móvil y se archiva en un armario que solo se abre con llave e imprime cada acceso.",
  body: out,
  motion: {
    P,
    faceY: FACE_Y,
    rz: RZ,
    card: CARD,
    waitX: WAIT_X,
    rail: RAIL,
    tray: { x: TRAY.x + TRAY.w / 2, z: 1 },
    routes: ROUTES,
    cab: { x: CAB.x, w: CAB.w, front: CF, z0: DRAWERS[1][0], z1: DRAWERS[1][1] },
    log: { x0: PRN.x + 4, x1: PRN.x + 14, y: PRN.y + 4.6, z: CAB.h + 6 },
  },
});
