// JavaScript: a web page laid out as a board with one empty socket. A small module
// drops into it and joins a calculator to a form: the figure is worked out, the
// fields are checked and the result shows on a screen.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const BOARD = { x: -104, y: -42, w: 148, d: 84, r: 4, h: 4 };
const ZB = BOARD.h;
const CALC = { x: -98, y: -26, w: 36, d: 52, r: 2.4, h: 5 };
const SOCKET = { x: -44, y: -14, w: 32, d: 26, r: 2, h: 2.4 };
const CHIP = { x: -41, y: -11, w: 26, d: 20, r: 1.6, h: 5 };
const HOVER = 18; // how far above its seat the module waits
const SEAT = ZB + 0.7;
const FORM = { x: -2, y: -2, w: 40, d: 38, r: 2.4, h: 3 };
const MON = { x: 58, y: -46, w: 54, d: 5, r: 2, z: 14, h: 36 };
const T_CALC = [[SOCKET.x, -4], [CALC.x + CALC.w, -4]];
const T_FORM = [[SOCKET.x + SOCKET.w, 6], [FORM.x, 6]];
const T_OUT = [[SOCKET.x + SOCKET.w, -9], [44, -9]];
const LEAD = [
  [48, -9, 2.4],
  [56, -9, 0.9],
  [85, -9, 0.9],
  [85, -37, 0.9],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [MON.x, MON.y, MON.z + MON.h + 2], [MON.x + MON.w, MON.y, MON.z + MON.h + 2], [CHIP.x, CHIP.y, SEAT + HOVER + CHIP.h + 2]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, D, slab, cyl, screws, base, label, lamp, top, faceY, screen, cable, shadow, pick } = kitFor(P, { lod });
  const trace = (points, part, on = false) => `<g${part ? ` data-part="${part}"` : ""} class="veo-trace"${on ? ' data-on=""' : ""}>${L(k.onTop(points, ZB + 0.04, P), { tone: on ? "lit" : "mid" })}</g>`;

  // ── The page: a board with its layout printed on it ────────────────────
  const board = (plan = BOARD) => {
    const out = [slab(plan, 0, ZB, "mid", { steps: 5, bevel: 0.6, seam: 1.4 })];
    out.push(L(k.planOutline(k.insetPlan(plan, 2.4), ZB, P, 4), { tone: "faint" }));
    return out.join("");
  };
  const layout = () => {
    const out = [];
    // Header: a mark and the navigation.
    out.push(L(k.planOutline({ x: -100, y: -39, w: 140, d: 8, r: 1.4 }, ZB, P, 3), { tone: "lo" }));
    out.push(D([at([-96, -35, ZB])], { size: 1, tone: "hi", keep: true }));
    out.push(L([0, 1, 2, 3].map((i) => k.lineOnTop([-4 + i * 11, -35], [3 + i * 11, -35], ZB, P)).join(""), { tone: "mid", free: true, fine: true }));
    // Text block above the form.
    out.push(L([-24, -20.5, -17, -13.5].map((y, i) => k.lineOnTop([0, y], [[36, 30, 34, 22][i], y], ZB, P)).join(""), { tone: "lo", free: true, fine: true }));
    out.push(L(k.lineOnTop([0, -27.4], [20, -27.4], ZB, P), { tone: "hi", free: true }));
    return out.join("");
  };
  const edge = () => slab({ x: 42, y: -13, w: 6, d: 8, r: 0.8 }, 0, ZB + 1.6, "mid", { steps: 2, bevel: 0.3 }) + D([at([45, -9, ZB + 1.6])], { size: 0.7, tone: "hi" });

  // ── The calculator ─────────────────────────────────────────────────────
  const calculator = ({ value = "0", hooks = true } = {}) => {
    const out = [slab(CALC, ZB, CALC.h, "mid", { steps: 4, bevel: 0.6, seam: ZB + 1.6 })];
    const zt = ZB + CALC.h;
    out.push(top(CALC.x + 3, CALC.y + 3, zt + 0.05, screen(30, 10, `<text class="scr-t"${hooks ? ' data-part="calc"' : ""} x="27.4" y="7.4" font-size="6" font-weight="600" text-anchor="end">${value}</text>`, 1.2)));
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 3; col++) {
        const accent = row === 3 && col === 2;
        out.push(slab({ x: CALC.x + 4 + col * 10, y: CALC.y + 17 + row * 8.4, w: 8, d: 6.4, r: 1.2 }, zt, 1.3, "hi", { steps: 2, bevel: 0.3, crease: "lo", lit: accent }));
      }
    }
    return out.join("");
  };

  // ── The form: three fields, each with its check, and the send key ──────
  const form = ({ state = [0, 0, 0], ready = false, hooks = true } = {}) => {
    const out = [slab(FORM, ZB, FORM.h, "mid", { steps: 4, bevel: 0.6, seam: ZB + 1 })];
    const zt = ZB + FORM.h;
    [0, 1, 2].forEach((i) => {
      const y = FORM.y + 4 + i * 8.4;
      out.push(L(k.planOutline({ x: FORM.x + 4, y, w: 25, d: 5.6, r: 1.2 }, zt, P, 3), { tone: "mid" }));
      out.push(L(k.lineOnTop([FORM.x + 6.4, y + 2.8], [FORM.x + 6.4 + [14, 18, 10][i], y + 2.8], zt, P), { tone: "lo", free: true, fine: true }));
      const tone = state[i] === 1 ? ' data-on="" data-tone="ok"' : state[i] === 2 ? ' data-err=""' : "";
      out.push(`<g data-part="fld-${i}" class="veo-lamp"${tone}>${cyl(FORM.x + 34.4, y + 2.8, 1.7, zt, 1.3, "hi", { steps: 14, crease: "lo" })}</g>`);
    });
    out.push(`<g${hooks ? ' data-part="send"' : ""} class="veo-lamp"${ready ? ' data-on=""' : ""}>${slab({ x: FORM.x + 4, y: FORM.y + 29.6, w: 17, d: 5.6, r: 2.6 }, zt, 1.5, "hi", { steps: 4, bevel: 0.3, crease: "lo" })}</g>`);
    return out.join("");
  };

  // ── The socket and the module that goes in it ──────────────────────────
  const socketBack = () => {
    const out = [];
    const inner = { x: SOCKET.x + 3, y: SOCKET.y + 3, w: SOCKET.w - 6, d: SOCKET.d - 6, r: 1 };
    out.push(slab(inner, ZB, 0.6, "mid", { steps: 2, bevel: 0, crease: "none", className: "veo-dark" }));
    out.push(`<g class="veo-on-dark">${D(k.dotGrid(inner.x + 2.4, inner.y + 2.2, 8, 2, 3, ZB + 0.62, P).map(([x, y]) => [x, y]), { size: 0.5, tone: "hi" })}${D(k.dotGrid(inner.x + 2.4, inner.y + inner.d - 5.2, 8, 2, 3, ZB + 0.62, P), { size: 0.5, tone: "hi" })}</g>`);
    out.push(slab({ x: SOCKET.x, y: SOCKET.y, w: SOCKET.w, d: 3, r: 0.8 }, ZB, SOCKET.h, "mid", { steps: 2, bevel: 0.3 }));
    out.push(slab({ x: SOCKET.x, y: SOCKET.y, w: 3, d: SOCKET.d, r: 0.8 }, ZB, SOCKET.h, "mid", { steps: 2, bevel: 0.3 }));
    return out.join("");
  };
  const socketFront = (on = false) =>
    slab({ x: SOCKET.x + SOCKET.w - 3, y: SOCKET.y, w: 3, d: SOCKET.d, r: 0.8 }, ZB, SOCKET.h, "mid", { steps: 2, bevel: 0.3 }) +
    slab({ x: SOCKET.x, y: SOCKET.y + SOCKET.d - 3, w: SOCKET.w, d: 3, r: 0.8 }, ZB, SOCKET.h, "mid", { steps: 2, bevel: 0.3 }) +
    `<g data-part="seat" class="veo-lamp"${on ? ' data-on=""' : ""}>${cyl(SOCKET.x + SOCKET.w - 1.5, SOCKET.y + SOCKET.d - 1.5, 1.5, ZB + SOCKET.h, 1.2, "hi", { steps: 14, crease: "lo" })}</g>`;
  const chip = (lift = HOVER) => {
    const z = SEAT + lift;
    const out = [];
    const legs = (y) => [0, 1, 2, 3, 4].map((i) => slab({ x: CHIP.x + 2.4 + i * 4.9, y, w: 2, d: 1.5, r: 0.3 }, z - 0.4, 3, "hi", { steps: 1, bevel: 0, crease: "lo" })).join("");
    out.push(legs(CHIP.y - 1.5));
    out.push(slab(CHIP, z, CHIP.h, "hi", { steps: 4, bevel: 0.6, crease: "lo", lit: true }));
    out.push(slab({ x: CHIP.x + 3, y: CHIP.y + 3, w: CHIP.w - 6, d: CHIP.d - 6, r: 1 }, z + CHIP.h, 0.4, "mid", { steps: 2, bevel: 0, crease: "none", className: "veo-dark" }));
    const zt = z + CHIP.h + 0.42;
    out.push(`<g class="veo-on-dark">${L(k.lineOnTop([CHIP.x + 9, CHIP.y + 8], [CHIP.x + 19, CHIP.y + 8], zt, P) + k.lineOnTop([CHIP.x + 9, CHIP.y + 11.4], [CHIP.x + 16, CHIP.y + 11.4], zt, P), { tone: "mid", free: true })}</g>`);
    out.push(`<circle class="veo-bead" cx="${at([CHIP.x + 6, CHIP.y + 6.4, zt])[0].toFixed(1)}" cy="${at([CHIP.x + 6, CHIP.y + 6.4, zt])[1].toFixed(1)}" r="1.5"/>`);
    out.push(legs(CHIP.y + CHIP.d));
    return out.join("");
  };

  // ── The screen where the result shows ──────────────────────────────────
  const monitor = ({ value = "—", state = [0, 0, 0], hooks = true } = {}) => {
    const mx = MON.x + MON.w / 2;
    const sw = MON.w - 6;
    const hook = (name) => (hooks ? ` data-part="${name}"` : "");
    const marks = [0, 1, 2]
      .map((i) => `<circle class="scr-f"${hooks ? ` data-mark="${i}"` : ""} data-t="${state[i] === 1 ? "hi" : state[i] === 2 ? "acc" : ""}" cx="${6 + i * 6}" cy="23" r="1.9"/>`)
      .join("");
    return (
      cyl(mx, MON.y + 2, 11, 0, 1.8, "lo", { steps: 36 }) +
      cyl(mx, MON.y + 2, 8.4, 1.8, 1.4, "mid", { steps: 36, bevel: 0.4 }) +
      slab({ x: mx - 3, y: MON.y - 1, w: 6, d: 4, r: 0.8 }, 3.2, MON.z - 2.2, "mid", { steps: 2, bevel: 0.3 }) +
      slab(MON, MON.z, MON.h, "hi", { steps: 4, bevel: 0.6, crease: "lo" }) +
      faceY(
        MON.x + 3,
        MON.y + MON.d,
        MON.z + MON.h - 3,
        screen(
          sw,
          MON.h - 6,
          `<text class="scr-t" data-t="dim" x="4" y="6.4" font-size="2.6">TOTAL</text><text class="scr-t"${hook("total")} x="${sw - 4}" y="15.6" font-size="8.4" font-weight="600" text-anchor="end">${value}</text>` +
            `<path class="scr-s" data-t="dim" d="M4 19h${sw - 8}"/>${marks}<rect class="scr-f"${hook("go")} data-t="mid" x="${sw - 19}" y="21" width="15" height="4.2" rx="2.1"/>`,
          1.6,
        ),
      )
    );
  };

  const body = [
    base(PLATE),
    cable(LEAD, "lead"),
    monitor(),
    board(),
    layout(),
    trace(T_CALC, "t-calc"),
    trace(T_FORM, "t-form"),
    trace(T_OUT, "t-out"),
    edge(),
    calculator(),
    socketBack(),
    `<g data-part="chip">${chip()}</g>`,
    socketFront(),
    form(),
    label({ x: 56, y: 38, w: 56, d: 11, r: 1 }, "MÓDULO · JS"),
    `<g data-part="beads"><g data-bead="0" opacity="0"><circle class="veo-bead" r="2"/></g></g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const piece = (plan) => ({ ...plan, x: plan.x - 6, y: plan.y - 6, w: plan.w + 12, d: plan.d + 12, r: 3 });
  const calcFloor = piece(CALC);
  const formFloor = piece(FORM);
  const sockFloor = { x: SOCKET.x - 22, y: SOCKET.y - 8, w: SOCKET.w + 34, d: SOCKET.d + 16, r: 3 };
  const stubs = (on) => trace([[SOCKET.x, -4], [sockFloor.x + 2, -4]], "", on) + trace([[SOCKET.x + SOCKET.w, 6], [sockFloor.x + sockFloor.w - 2, 6]], "", on);
  const parts = {
    calculator: part([shadow(calcFloor), board(calcFloor), calculator({ value: "1240", hooks: false })], k.boxCorners(calcFloor, 0, 12)),
    form: part([shadow(formFloor), board(formFloor), form({ state: [1, 1, 2], hooks: false })], k.boxCorners(formFloor, 0, 10)),
    board: part([shadow(BOARD), board(), layout(), trace(T_CALC), trace(T_FORM), trace(T_OUT), edge(), socketBack(), socketFront()], k.boxCorners(BOARD, 0, 8), 14),
    chip: part([shadow({ x: CHIP.x + 2, y: CHIP.y + 2, w: CHIP.w - 4, d: CHIP.d - 4, r: 3 }, ZB), chip(8)], k.boxCorners({ ...CHIP, y: CHIP.y - 2, d: CHIP.d + 4 }, ZB, SEAT + 8 + CHIP.h + 2), 22),
    detail: part([shadow(sockFloor), board(sockFloor), stubs(true), socketBack(), chip(0), socketFront(true)], k.boxCorners(sockFloor, 0, 14), 16),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat3 = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));
const flat2 = (points) => flat3(points.map(([x, y]) => [x, y, ZB + 0.3]));

save("chipslot", {
  width: W,
  height: H,
  label:
    "Una página web tendida como una placa: lleva impresos su cabecera y sus textos, y sobre ella hay una calculadora, un formulario de tres campos y un zócalo vacío. Un módulo pequeño baja hasta el zócalo y une las dos piezas: la calculadora obtiene la cifra, el formulario marca qué campo falta y el resultado aparece en una pantalla.",
  body: full.body,
  motion: { P, hover: HOVER, toCalc: flat2(T_CALC), toForm: flat2(T_FORM), toOut: [...flat2(T_OUT), ...flat3(LEAD)] },
  thumb: small.body
    .join("")
    .replace('<g data-part="chip">', `<g transform="${k.translateAlong(P, [0, 0, -HOVER])}">`)
    .replace('data-part="seat" class="veo-lamp"', 'class="veo-lamp" data-on=""'),
  parts: full.parts,
});
