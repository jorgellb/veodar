// Hostelería: a hotel model. Twenty rooms on the façade light up when occupied.
// Bookings arrive through three channels on a channel manager; each one lights
// a room and the availability shown for every channel drops together. A
// checkout goes to housekeeping and comes back on sale once marked clean; the
// guest's phone gets answers and online check-in.
import { k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 480;
const PLATE = { x: -104, y: -60, w: 208, d: 116, r: 10 };
const HOTEL = { x: -34, y: -54, w: 60, d: 22, lobby: 10, floor: 10, floors: 4 };
const ROOF = HOTEL.lobby + HOTEL.floor * HOTEL.floors;
const CM = { x: -98, y: -8, w: 36, d: 20, r: 2, h: 14 };
const DESK = { x: 38, y: 0, w: 28, d: 12, r: 1.4, h: 10 };
const PHONE = { x: 72, y: -6, w: 22, d: 14 };
const CHANNELS = ["BOOKING", "EXPEDIA", "WEB"];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [HOTEL.x, HOTEL.y, ROOF + 12], [HOTEL.x + HOTEL.w, HOTEL.y, ROOF + 12]], W, H, {
  pad: 20,
  azimuth: 50,
  elevation: 30,
});
const { at, S, L, D, slab, cyl, screws, base, label, ruler, lamp, faceY, faceX, screen } = kitFor(P);
const FRONT = HOTEL.y + HOTEL.d;

const out = [base(PLATE)];

// ── The hotel ────────────────────────────────────────────────────────────
out.push(slab({ x: HOTEL.x - 2, y: HOTEL.y - 2, w: HOTEL.w + 4, d: HOTEL.d + 4, r: 1 }, 0, 1.2, "mid", { steps: 2, bevel: 0.2 }));
out.push(slab({ x: HOTEL.x, y: HOTEL.y, w: HOTEL.w, d: HOTEL.d, r: 0.8 }, 1.2, ROOF - 1.2, "hi", { steps: 2, bevel: 0.3, crease: "lo", seam: HOTEL.lobby }));
// Façade: floor lines, room windows (live), lobby door.
const COLS = 5;
const winW = 7;
const winH = 6;
const pitch = (HOTEL.w - 6) / COLS;
const face = [];
for (let f = 1; f <= HOTEL.floors; f++) face.push(`<path class="ui-s" data-t="faint" d="M0 ${ROOF - (HOTEL.lobby + f * HOTEL.floor)}h${HOTEL.w}"/>`);
for (let f = 0; f < HOTEL.floors; f++) {
  for (let c = 0; c < COLS; c++) {
    const x = 3 + c * pitch + (pitch - winW) / 2;
    const y = ROOF - (HOTEL.lobby + (f + 1) * HOTEL.floor) + 2;
    face.push(`<rect class="ui-f" data-room="${f * COLS + c}" x="${x.toFixed(2)}" y="${y}" width="${winW}" height="${winH}" rx=".5"/><rect class="ui-s" x="${x.toFixed(2)}" y="${y}" width="${winW}" height="${winH}" rx=".5"/><path class="ui-s" data-t="lo" d="M${(x + winW / 2).toFixed(2)} ${y}v${winH}"/>`);
  }
}
const doorX = HOTEL.w / 2 - 5;
face.push(`<rect class="ui-f" data-t="hi" x="${doorX}" y="${ROOF - 9}" width="10" height="9" rx=".6"/><path class="ui-s" data-t="faint" d="M${doorX + 5} ${ROOF - 9}v9"/>`);
face.push(`<rect class="ui-f" x="4" y="${ROOF - 8}" width="14" height="5" rx=".5"/><rect class="ui-f" x="${HOTEL.w - 18}" y="${ROOF - 8}" width="14" height="5" rx=".5"/>`);
out.push(faceY(HOTEL.x, FRONT, ROOF, face.join("")));
// Side: two windows per floor, some lit.
const side = [];
for (let f = 0; f < HOTEL.floors; f++)
  for (let c = 0; c < 2; c++)
    side.push(`<rect class="ui-f"${(f + c) % 2 ? ' data-t="acc"' : ' data-t="hi"'} x="${4 + c * 9}" y="${ROOF - (HOTEL.lobby + (f + 1) * HOTEL.floor) + 2}" width="5" height="${winH}" rx=".5"/>`);
out.push(faceX(HOTEL.x + HOTEL.w, FRONT, ROOF, side.join("")));
// Balconies under each window row, and the entrance canopy.
for (let f = 1; f < HOTEL.floors; f++) {
  out.push(slab({ x: HOTEL.x + 2, y: FRONT, w: HOTEL.w - 4, d: 2.2, r: 0.3 }, HOTEL.lobby + f * HOTEL.floor - 0.6, 0.8, "mid", { steps: 1, bevel: 0 }));
}
out.push(slab({ x: HOTEL.x + doorX - 4, y: FRONT, w: 18, d: 6, r: 0.6 }, 10, 1.2, "mid", { steps: 2, bevel: 0.2 }));
for (const dx of [-3, 13]) out.push(slab({ x: HOTEL.x + doorX + dx, y: FRONT + 5, w: 1, d: 1, r: 0.2 }, 0, 10, "mid", { steps: 1, bevel: 0 }));
// Roof: parapet, sign, machines.
out.push(slab({ x: HOTEL.x, y: HOTEL.y, w: HOTEL.w, d: HOTEL.d, r: 0.8 }, ROOF, 1.4, "mid", { steps: 2, bevel: 0.2 }));
out.push(slab({ x: HOTEL.x + 6, y: HOTEL.y + 4, w: 10, d: 7, r: 0.6 }, ROOF + 1.4, 4, "mid", { steps: 2, bevel: 0.2 }));
out.push(cyl(HOTEL.x + 44, HOTEL.y + 8, 3.4, ROOF + 1.4, 6, "hi", { steps: 22, crease: "lo" }));
for (const dx of [18, 38]) out.push(slab({ x: HOTEL.x + dx, y: FRONT - 2.2, w: 1, d: 1, r: 0.2 }, ROOF + 1.4, 3, "mid", { steps: 1, bevel: 0 }));
out.push(slab({ x: HOTEL.x + 17, y: FRONT - 2, w: 23, d: 0.8, r: 0.2 }, ROOF + 4.4, 7, "hi", { steps: 1, bevel: 0, crease: "lo" }));
out.push(faceY(HOTEL.x + 18.4, FRONT - 1.2, ROOF + 10.6, `<text class="ui-t" x="0" y="4.6" font-size="5" font-weight="700" letter-spacing=".4">HOTEL</text>`));
out.push(`<g data-part="sign" class="veo-lamp">${cyl(HOTEL.x + 42, FRONT - 1.6, 0.9, ROOF + 10.2, 1, "hi", { steps: 12 })}</g>`);

// Housekeeping cart beside the hotel.
const CART = { x: HOTEL.x + HOTEL.w + 4, y: -52, w: 12, d: 7 };
for (const [x, y] of k.corners({ ...CART, r: 0 }, 1.2)) out.push(cyl(x, y, 1, 0, 1.4, "mid", { steps: 12 }));
out.push(slab({ ...CART, r: 0.6 }, 1.4, 9, "hi", { steps: 2, bevel: 0.3, crease: "lo", seam: 6 }));
out.push(slab({ x: CART.x + 1, y: CART.y + 1, w: 5, d: 5, r: 0.4 }, 10.4, 3, "lo", { steps: 1, bevel: 0.2 }));
out.push(L(k.segment([CART.x + CART.w, CART.y + 1, 10.4], [CART.x + CART.w + 3, CART.y + 1, 13], P) + k.segment([CART.x + CART.w + 3, CART.y + 1, 13], [CART.x + CART.w + 3, CART.y + CART.d - 1, 13], P) + k.segment([CART.x + CART.w + 3, CART.y + CART.d - 1, 13], [CART.x + CART.w, CART.y + CART.d - 1, 10.4], P), { tone: "mid" }));
out.push(`<g data-part="clean" class="veo-lamp" data-tone="ok">${cyl(CART.x + CART.w - 3, CART.y + 3.5, 1.2, 10.4, 1, "hi", { steps: 14 })}</g>`);

// ── Channel manager (front left) ─────────────────────────────────────────
out.push(slab(CM, 0, CM.h, "mid", { steps: 4, bevel: 0.6, seam: 4 }));
out.push(...screws(k.corners(CM, 2.6), CM.h, 0.8, 0.4));
CHANNELS.forEach((_, i) => {
  const x = CM.x + 6 + i * 11;
  out.push(L(k.planOutline({ x: x - 3.6, y: CM.y + 4, w: 7.2, d: 2, r: 0.8 }, CM.h, P, 2), { tone: "hi" }));
  out.push(lamp(x, CM.y + 12, CM.h, 1.3, `ch${i}`));
});
out.push(`<g data-part="cards"></g>`);
const SW = CM.w - 4;
out.push(
  faceY(
    CM.x + 2,
    CM.y + CM.d,
    CM.h - 1.6,
    screen(
      SW,
      11,
      `<text class="scr-t" data-t="dim" x="1.6" y="3" font-size="1.6">DISPONIBLES · UN INVENTARIO</text>` +
        CHANNELS.map((c, i) => `<text class="scr-t" data-t="dim" x="${SW / 6 + (i * SW) / 3}" y="6" font-size="1.5" text-anchor="middle">${c}</text><text class="scr-t" data-part="av${i}" x="${SW / 6 + (i * SW) / 3}" y="9.6" font-size="2.8" font-weight="600" text-anchor="middle">6</text>`).join(""),
      1,
    ),
  ),
);
out.push(k.wireSvg(at([CM.x + CM.w, CM.y + 6, 2]), at([HOTEL.x, FRONT - 6, 2]), { via: [at([HOTEL.x - 8, CM.y + 6, 0.6]), at([HOTEL.x - 8, FRONT - 6, 0.6])], tone: "mid", size: 1 }));

// ── Reception desk with bell, and the guest's phone (front right) ───────
out.push(slab({ ...DESK }, 0, DESK.h, "hi", { steps: 3, bevel: 0.5, crease: "lo", seam: 3 }));
out.push(slab({ x: DESK.x - 1, y: DESK.y - 1, w: DESK.w + 2, d: DESK.d + 2, r: 1.6 }, DESK.h, 1.2, "mid", { steps: 3, bevel: 0.3 }));
out.push(cyl(DESK.x + 8, DESK.y + 6, 3.4, DESK.h + 1.2, 0.8, "mid", { steps: 24 }));
out.push(cyl(DESK.x + 8, DESK.y + 6, 2.8, DESK.h + 2, 2.4, "hi", { steps: 24, bevel: 1.2, crease: "lo" }));
out.push(cyl(DESK.x + 8, DESK.y + 6, 0.6, DESK.h + 4.4, 1, "mid", { steps: 10 }));
out.push(slab({ x: DESK.x + 15, y: DESK.y + 3, w: 9, d: 6, r: 0.6 }, DESK.h + 1.2, 1, "lo", { steps: 1, bevel: 0.1 }));
out.push(faceY(DESK.x + 2, DESK.y + DESK.d, DESK.h - 2.4, `<text class="ui-t" font-size="2.2">RECEPCIÓN</text>`));
out.push(k.wireSvg(at([DESK.x, DESK.y + 6, 2]), at([HOTEL.x + HOTEL.w, FRONT - 4, 2]), { via: [at([HOTEL.x + HOTEL.w + 4, DESK.y + 6, 0.6]), at([HOTEL.x + HOTEL.w + 4, FRONT - 4, 0.6])], tone: "faint", size: 0.9 }));
out.push(slab({ ...PHONE, r: 2 }, 0, 4, "mid", { steps: 3, bevel: 0.5, seam: 2 }));
const PH = { x: PHONE.x + 2, y: PHONE.y + 5, w: 18, d: 2.2, z: 5, h: 32 };
out.push(slab({ x: PH.x, y: PHONE.y + 2, w: PH.w, d: 3, r: 0.8 }, 4, 3, "lo", { steps: 2, bevel: 0.3 }));
out.push(slab({ x: PH.x, y: PH.y, w: PH.w, d: PH.d, r: 0.8 }, PH.z, PH.h, "hi", { steps: 3, bevel: 0.4, crease: "lo" }));
const PW = PH.w - 2.4;
out.push(
  faceY(
    PH.x + 1.2,
    PH.y + PH.d,
    PH.z + PH.h - 1.2,
    screen(
      PW,
      PH.h - 2.4,
      `<text class="scr-t" data-t="dim" x="1.4" y="3" font-size="1.6">HOTEL · CHAT</text>` +
        `<g data-part="q" opacity="0"><rect class="scr-f" data-t="mid" x="1.4" y="5" width="${PW - 4}" height="5.4" rx="1.4"/><text class="scr-t" x="2.4" y="8.6" font-size="1.5">Breakfast time?</text></g>` +
        `<g data-part="a" opacity="0"><rect class="scr-f" data-t="acc" x="3" y="12" width="${PW - 4.4}" height="5.4" rx="1.4"/><text class="scr-t" x="4" y="15.6" font-size="1.5" style="fill:#1a0a03">7:00–10:30 ☕</text></g>` +
        `<g data-part="ci" opacity="0"><rect class="scr-f" data-t="hi" x="1.4" y="20.4" width="${PW - 2.8}" height="6.6" rx="1.4"/><text class="scr-t" x="2.4" y="23.4" font-size="1.5" style="fill:#16142c">Check-in ✓</text><text class="scr-t" x="2.4" y="25.8" font-size="1.3" style="fill:#16142c">ID · 2 guests</text></g>`,
      1.4,
    ),
  ),
);

// Planters by the entrance.
for (const dx of [-8, 22]) {
  const x = HOTEL.x + doorX + dx;
  out.push(cyl(x, FRONT + 8, 2.4, 0, 3.4, "mid", { steps: 20 }));
  out.push(cyl(x, FRONT + 8, 2.8, 3.4, 3.6, "hi", { steps: 20, bevel: 1.4, crease: "lo" }));
}

// ── Front: label, ruler ──────────────────────────────────────────────────
out.push(label({ x: -98, y: 30, w: 44, d: 14, r: 1.2 }, "VEODAR · HT-13"));
out.push(ruler({ x: -42, y: 36, w: 74, d: 7, r: 1 }));

save("hotel", {
  width: W,
  height: H,
  label:
    "La maqueta de un hotel sobre una placa: las veinte habitaciones de la fachada se encienden cuando están ocupadas. Las reservas llegan por tres canales a un gestor de canales; cada una enciende una habitación y la disponibilidad de todos los canales baja a la vez. Una salida pasa a limpieza y vuelve a la venta al marcarse limpia, y el móvil del huésped recibe respuestas y el check-in online.",
  body: out,
  motion: {
    P,
    cm: CM,
    hotel: { x: HOTEL.x, front: FRONT },
    route: [
      [CM.x + CM.w, CM.y + 6, 0.6],
      [HOTEL.x - 8, CM.y + 6, 0.6],
      [HOTEL.x - 8, FRONT - 6, 0.6],
      [HOTEL.x, FRONT - 6, 0.6],
    ],
  },
});
