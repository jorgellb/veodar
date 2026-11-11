// SwiftUI: a composing bench. The screen is set with loose pieces inside a frame, the
// way type is set in a forme; the pieces come from a case and an old one-piece plate
// lies beside it, being replaced block by block. A state unit with a slider feeds the
// frame: when the value changes, the pieces rearrange themselves, and the phone and the
// widget on the right show the same result.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const FRAME = { x: -44, y: -10, w: 46, d: 58, r: 2 };
const RIM = 2.4;
const FLOOR = 1.6;
const PIECE = { x: FRAME.x + 6, w: 34, h: 4 };
const ROWS = [6, 17, 28];
const CASE = { x: -116, y: -48, w: 60, d: 30, r: 2 };
const OLD = { x: -116, y: -2, w: 42, d: 50, r: 2, h: 3 };
const STATE = { x: -36, y: -48, w: 42, d: 22, r: 2, h: 14 };
const SLOT = { x0: STATE.x + 8, x1: STATE.x + 30, y: STATE.y + 8 };
const DOCK = { x: 52, y: 6, w: 44, d: 22, r: 3, h: 5 };
const PHONE = { x: DOCK.x + 6, y: DOCK.y + 9, z: DOCK.h, w: 28, h: 54, t: 3.4 };
const WIDGET = { x: 100, y: -24, w: 23, d: 3, r: 1.2, z: 7, h: 23 };

const TO_FRAME = [
  [-21, STATE.y + STATE.d, 3],
  [-21, -24, 0.9],
  [-21, FRAME.y, 0.9],
  [-21, FRAME.y, 2],
];
const TO_PHONE = [
  [0, STATE.y + STATE.d, 3],
  [0, -22, 0.9],
  [28, -22, 0.9],
  [28, 17, 0.9],
  [DOCK.x, 17, 0.9],
  [DOCK.x, 17, 3],
];
const TO_WIDGET = [
  [DOCK.x + DOCK.w, 17, 3],
  [DOCK.x + DOCK.w + 2, 17, 0.9],
  [111, 17, 0.9],
  [111, -15, 0.9],
  [111, -15, 1.8],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [PHONE.x, PHONE.y, 62], [PHONE.x + PHONE.w, PHONE.y, 62], [CASE.x, CASE.y, 16]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, D, slab, cyl, screws, base, label, lamp, faceY, screen, cable, shadow, pick, thumb, handset } = kitFor(P, { lod });
  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);
  const lines = (x, y, z, lens, tone = "mid") =>
    L(lens.map((len, i) => k.lineOnTop([x, y + i * 2.6], [x + len, y + i * 2.6], z, P)).join(""), { tone, free: true, fine: true });

  // ── The frame: a bed with a rim, and the pieces of one screen in it ────
  const piece = (y, d, { lit = false, tone = "hi" } = {}) => slab({ x: PIECE.x, y: FRAME.y + y, w: PIECE.w, d, r: 1.2 }, FLOOR, PIECE.h, tone, { steps: 3, bevel: 0.4, crease: "lo", lit });
  const row = (y) => piece(y, 9) + lines(PIECE.x + 8, FRAME.y + y + 3.2, FLOOR + PIECE.h, [14, 9]) + L(k.ring(PIECE.x + 4, FRAME.y + y + 4.5, 1.6, FLOOR + PIECE.h, P, 14), { tone: "mid", fine: true });
  const frame = ({ hooks = true } = {}) => {
    const z = FLOOR;
    const out = [slab(FRAME, 0, FLOOR, "lo", { steps: 3, bevel: 0.2 })];
    out.push(slab({ x: FRAME.x, y: FRAME.y, w: FRAME.w, d: RIM, r: 0.6 }, 0, 6, "mid", { steps: 2, bevel: 0.3 }));
    out.push(slab({ x: FRAME.x, y: FRAME.y, w: RIM, d: FRAME.d, r: 0.6 }, 0, 6, "mid", { steps: 2, bevel: 0.3 }));
    // The title, with the badge that carries the value.
    out.push(piece(-4 + 8.4, 7.6), lines(PIECE.x + 3, FRAME.y + 7.4, z + PIECE.h, [13], "hi"));
    out.push(`<g${hooks ? ' data-part="badge"' : ""} class="veo-lamp" data-on="">${cyl(PIECE.x + PIECE.w - 5, FRAME.y + 8.2, 2.2, z + PIECE.h, 1.2, "hi", { steps: 16, crease: "lo" })}</g>`);
    // What the value decides: three rows, or one piece that says there is nothing.
    const rows = ROWS.map((y) => row(y + 8)).join("");
    const empty =
      piece(14, 31, { tone: "hi" }) +
      L(k.ring(PIECE.x + PIECE.w / 2, FRAME.y + 26, 5, z + PIECE.h, P, 24), { tone: "mid" }) +
      L(k.lineOnTop([PIECE.x + 10, FRAME.y + 36], [PIECE.x + 24, FRAME.y + 36], z + PIECE.h, P), { tone: "mid", free: true });
    out.push(hooks ? `<g data-part="empty" opacity="0">${empty}</g><g data-part="rows">${rows}</g>` : rows);
    out.push(piece(47.4, 6.4), lines(PIECE.x + 11, FRAME.y + 50.6, z + PIECE.h, [12], "hi"));
    out.push(slab({ x: FRAME.x + FRAME.w - RIM, y: FRAME.y, w: RIM, d: FRAME.d, r: 0.6 }, 0, 6, "mid", { steps: 2, bevel: 0.3 }));
    out.push(slab({ x: FRAME.x, y: FRAME.y + FRAME.d - RIM, w: FRAME.w, d: RIM, r: 0.6 }, 0, 6, "mid", { steps: 2, bevel: 0.3 }));
    out.push(...screws([[FRAME.x + FRAME.w - 1.2, FRAME.y + FRAME.d - 1.2], [FRAME.x + 1.2, FRAME.y + FRAME.d - 1.2]], 6, 0.7, 0.36));
    return out.join("");
  };

  // ── The case the pieces come from ──────────────────────────────────────
  const partsCase = () => {
    const out = [slab(CASE, 0, 2, "lo", { steps: 3, bevel: 0.2 })];
    const wall = (plan) => slab(plan, 0, 7, "mid", { steps: 2, bevel: 0.3 });
    out.push(wall({ x: CASE.x, y: CASE.y, w: CASE.w, d: 2, r: 0.5 }), wall({ x: CASE.x, y: CASE.y, w: 2, d: CASE.d, r: 0.5 }));
    const cols = [CASE.x + 2, CASE.x + 21.4, CASE.x + 40.8];
    const back = CASE.y + 2;
    const front = CASE.y + 16;
    // Back row: a button, a switch and a slider.
    out.push(slab({ x: cols[0] + 2.4, y: back + 3, w: 14, d: 6, r: 3 }, 2, 3, "hi", { steps: 6, bevel: 0.4, crease: "lo", lit: true }));
    out.push(slab({ x: cols[1] + 3.4, y: back + 3.4, w: 12, d: 5.6, r: 2.8 }, 2, 2.4, "hi", { steps: 6, bevel: 0.3, crease: "lo" }), cyl(cols[1] + 12.4, back + 6.2, 2.2, 4.4, 1.2, "mid", { steps: 16 }));
    out.push(slab({ x: cols[2] + 2.4, y: back + 5, w: 13, d: 2, r: 1 }, 2, 1.6, "hi", { steps: 3, bevel: 0.2, crease: "lo" }), cyl(cols[2] + 7, back + 6, 2, 3.6, 1.6, "mid", { steps: 14 }));
    out.push(wall({ x: CASE.x, y: CASE.y + 14, w: CASE.w, d: 1.4, r: 0.4 }));
    for (const x of cols.slice(1)) out.push(wall({ x: x - 0.7, y: CASE.y, w: 1.4, d: CASE.d, r: 0.4 }));
    // Front row: a list row, a card and two small ones.
    out.push(slab({ x: cols[0] + 1.6, y: front + 3, w: 15, d: 7, r: 1.2 }, 2, 3.4, "hi", { steps: 3, bevel: 0.4, crease: "lo" }), lines(cols[0] + 4, front + 5.2, 5.4, [9, 6]));
    out.push(slab({ x: cols[1] + 4, y: front + 2, w: 10, d: 10, r: 1.6 }, 2, 3.4, "hi", { steps: 4, bevel: 0.4, crease: "lo" }));
    out.push(slab({ x: cols[2] + 2.4, y: front + 2.4, w: 6, d: 9, r: 1 }, 2, 3.4, "hi", { steps: 3, bevel: 0.3, crease: "lo" }), slab({ x: cols[2] + 10, y: front + 2.4, w: 6, d: 9, r: 1 }, 2, 5, "hi", { steps: 3, bevel: 0.3, crease: "lo" }));
    out.push(wall({ x: CASE.x + CASE.w - 2, y: CASE.y, w: 2, d: CASE.d, r: 0.5 }), wall({ x: CASE.x, y: CASE.y + CASE.d - 2, w: CASE.w, d: 2, r: 0.5 }));
    return out.join("");
  };

  // ── The old plate: one piece, engraved, with one block already replaced ─
  const oldPlate = () => {
    const out = [slab(OLD, 0, OLD.h, "mid", { steps: 4, bevel: 0.5, seam: 1.2 })];
    const inset = (y, d) => k.planOutline({ x: OLD.x + 5, y: OLD.y + y, w: OLD.w - 10, d, r: 1 }, OLD.h, P, 3);
    out.push(L(inset(5, 6) + inset(13.5, 8) + inset(33.5, 8) + inset(43.4, 4.4), { tone: "lo" }));
    out.push(lines(OLD.x + 8, OLD.y + 16.4, OLD.h, [12, 8], "lo"), lines(OLD.x + 8, OLD.y + 36.4, OLD.h, [14, 9], "lo"));
    out.push(...screws(k.corners(OLD, 2.6), OLD.h, 0.9, 0.4));
    // The middle row: cut out, with a loose piece in its place.
    out.push(L(inset(23, 9), { tone: "hi" }));
    out.push(slab({ x: OLD.x + 5.6, y: OLD.y + 23.6, w: OLD.w - 11.2, d: 7.8, r: 1 }, OLD.h, 2.6, "hi", { steps: 3, bevel: 0.4, crease: "lo", lit: true }));
    return out.join("");
  };

  // ── The state unit: a value in a window and the slider that changes it ─
  const state = ({ hooks = true, on = false } = {}) => {
    const out = [slab(STATE, 0, STATE.h, "mid", { steps: 4, bevel: 0.7, seam: 4 })];
    out.push(
      faceY(
        STATE.x + 4,
        STATE.y + STATE.d,
        STATE.h - 2.6,
        `<text class="ui-t" x="0" y="3.4" font-size="2.6" opacity=".7">ESTADO</text>` + `<g transform="translate(18 0.4)">${screen(12, 9.6, `<text class="scr-t" data-part="count" x="6" y="7.4" font-size="6.6" font-weight="600" text-anchor="middle">3</text>`, 1.2)}</g>`,
      ),
    );
    out.push(L(k.planOutline({ x: SLOT.x0 - 3, y: SLOT.y - 2, w: SLOT.x1 - SLOT.x0 + 6, d: 4, r: 2 }, STATE.h, P, 4), { tone: "hi" }));
    out.push(L(k.lineOnTop([SLOT.x0, SLOT.y + 4.4], [SLOT.x0, SLOT.y + 6], STATE.h, P) + k.lineOnTop([SLOT.x1, SLOT.y + 4.4], [SLOT.x1, SLOT.y + 6], STATE.h, P), { tone: "mid", free: true, fine: true }));
    const knob = cyl(SLOT.x0, SLOT.y, 2.9, STATE.h, 4.6, "hi", { steps: 20, bevel: 0.4, crease: "lo" }) + D([at([SLOT.x0, SLOT.y, STATE.h + 4.6])], { size: 0.5, tone: "hi" });
    out.push(hooks ? `<g data-part="slider">${knob}</g>` : knob);
    out.push(...screws([[STATE.x + STATE.w - 3.4, STATE.y + 3.4], [STATE.x + 3.4, STATE.y + 3.4]], STATE.h, 0.9, 0.42));
    out.push(lamp(STATE.x + STATE.w - 6, STATE.y + STATE.d - 6, STATE.h, 1.8, hooks ? "state" : "", on));
    return out.join("");
  };

  // ── What comes out: the phone, and the widget beside it ────────────────
  const gw = PHONE.w - 2.6;
  const phoneUi = ({ hooks = true } = {}) => {
    const out = [pick(`<text class="scr-t" data-t="dim" x="2.6" y="4.5" font-size="2.2">9:41</text>`)];
    out.push(`<text class="scr-t" x="2.4" y="11.4" font-size="3.2" font-weight="600">Pedidos</text>`);
    out.push(`<circle class="scr-f" data-t="acc" cx="${gw - 5}" cy="10.2" r="2.6"/><text data-part="p-count" x="${gw - 5}" y="11.5" font-size="3.2" font-weight="700" text-anchor="middle" fill="#1a0a03">3</text>`);
    const rows = [0, 1, 2].map((i) => `<rect class="scr-f" x="2.4" y="${15 + i * 8}" width="${gw - 4.8}" height="6.4" rx="1.6"/><circle class="scr-s" cx="5.8" cy="${18.2 + i * 8}" r="1.4"/><path class="scr-s" data-t="hi" d="M9.4 ${18.2 + i * 8}h${[11, 9, 12][i]}"/>`).join("");
    const empty = `<rect class="scr-s" data-t="dim" x="2.4" y="15" width="${gw - 4.8}" height="22.4" rx="1.6"/><circle class="scr-s" cx="${gw / 2}" cy="24" r="3.6"/><path class="scr-s" data-t="hi" d="M${gw / 2 - 5} 31.6h10"/>`;
    out.push(hooks ? `<g data-part="p-empty" opacity="0">${empty}</g><g data-part="p-rows">${rows}</g>` : rows);
    out.push(`<rect class="scr-f" data-t="hi" x="2.4" y="41" width="${gw - 4.8}" height="5.4" rx="2.7"/>`, `<rect class="scr-f" data-t="mid" x="${gw / 2 - 4.6}" y="48.7" width="9.2" height="1" rx=".5"/>`);
    return out.join("");
  };
  const phone = (opts) =>
    slab(DOCK, 0, DOCK.h, "mid", { steps: 5, bevel: 0.7, seam: 2 }) +
    screws([[DOCK.x + 4, DOCK.y + 4], [DOCK.x + DOCK.w - 4, DOCK.y + 4]], DOCK.h, 0.9, 0.4).join("") +
    handset(PHONE, phoneUi(opts), { kind: "a" }) +
    lamp(DOCK.x + DOCK.w - 5, DOCK.y + DOCK.d - 4.5, DOCK.h, 1.8, opts?.hooks === false ? "" : "shown", opts?.hooks === false);
  const widget = ({ hooks = true } = {}) => {
    const cx = WIDGET.x + WIDGET.w / 2;
    const sw = WIDGET.w - 3;
    return (
      slab({ x: cx - 8, y: WIDGET.y - 4, w: 16, d: 12, r: 2.4 }, 0, 2, "mid", { steps: 4, bevel: 0.4 }) +
      cyl(cx, WIDGET.y + 1.5, 1.7, 2, WIDGET.z - 2, "mid", { steps: 12, crease: "none" }) +
      slab(WIDGET, WIDGET.z, WIDGET.h, "hi", { steps: 4, bevel: 0.5, crease: "lo" }) +
      faceY(
        WIDGET.x + 1.5,
        WIDGET.y + WIDGET.d,
        WIDGET.z + WIDGET.h - 1.5,
        screen(
          sw,
          sw,
          `<text class="scr-t" data-part="w-count" x="3" y="11.6" font-size="9.4" font-weight="600">3</text>` + `<path class="scr-s" data-t="dim" d="M3 15.4h9"/><rect class="scr-f" data-t="acc" data-part="w-bar" x="3" y="17" width="12" height="1.6" rx=".8"/>`,
          4,
        ),
      )
    );
  };

  const body = [
    base(PLATE),
    partsCase(),
    state(),
    wire(TO_FRAME, "to-frame"),
    wire(TO_PHONE, "to-phone"),
    oldPlate(),
    frame(),
    widget(),
    wire(TO_WIDGET, "to-widget"),
    phone(),
    label({ x: 8, y: 40, w: 46, d: 11, r: 1 }, "ESTADO · VISTA"),
    `<g data-part="beads">${[0, 1].map((i) => `<g data-bead="${i}" opacity="0"><circle class="veo-bead" r="2.3"/></g>`).join("")}</g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const stub = (points, on = true) => wire(points, "", on);
  const parts = {
    frame: part([shadow({ ...FRAME, r: 4 }), stub([[-21, -22, 0.9], [-21, FRAME.y, 0.9], [-21, FRAME.y, 2]]), frame({ hooks: false })], k.boxCorners({ ...FRAME, y: FRAME.y - 8, d: FRAME.d + 8 }, 0, 8), 14),
    case: part([shadow({ ...CASE, r: 4 }), partsCase()], k.boxCorners(CASE, 0, 9), 16),
    plate: part([shadow({ ...OLD, r: 4 }), oldPlate()], k.boxCorners(OLD, 0, 7), 16),
    preview: part(
      [shadow({ x: DOCK.x, y: DOCK.y - 8, w: 74, d: 30, r: 5 }), `<g transform="${k.translateAlong(P, [4, 26, 0])}">${widget({ hooks: false })}</g>`, stub([[DOCK.x + DOCK.w, 17, 3], [DOCK.x + DOCK.w + 2, 17, 0.9], [115, 17, 0.9], [115, 11, 0.9], [115, 11, 1.8]]), phone({ hooks: false })],
      [...k.boxCorners({ x: DOCK.x, y: DOCK.y - 4, w: 76, d: 26 }, 0, 6), [PHONE.x, PHONE.y, DOCK.h + PHONE.h], [PHONE.x + PHONE.w, PHONE.y, DOCK.h + PHONE.h]],
      14,
    ),
    detail: part(
      [shadow({ x: STATE.x, y: STATE.y + 4, w: STATE.w, d: STATE.d + 4, r: 4 }), state({ hooks: false, on: true }), stub([TO_FRAME[0], TO_FRAME[1], [-21, -14, 0.9]]), stub([TO_PHONE[0], TO_PHONE[1], [14, -22, 0.9]])],
      k.boxCorners({ x: STATE.x, y: STATE.y, w: STATE.w + 10, d: STATE.d + 12 }, 0, STATE.h + 6),
      14,
    ),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("composer", {
  width: W,
  height: H,
  label:
    "Un componedor de pantallas sobre una placa: al fondo, una caja con piezas sueltas —un botón, un interruptor, una fila— y una unidad de estado con una ventanilla y un deslizador; delante, una placa antigua de una sola pieza con un bloque ya sustituido y un bastidor donde las piezas forman una pantalla. A la derecha, un teléfono de pie y un widget. Al mover el deslizador cambia el valor y las piezas del bastidor se recolocan solas; el teléfono y el widget muestran lo mismo.",
  body: full.body,
  motion: { P, toFrame: flat(TO_FRAME), toPhone: flat(TO_PHONE), toWidget: flat(TO_WIDGET), slide: SLOT.x1 - SLOT.x0 },
  thumb: small.body.join("").replace('data-part="to-frame"', 'data-on=""').replace('data-part="shown" class="veo-lamp"', 'class="veo-lamp" data-on=""'),
  parts: full.parts,
});
