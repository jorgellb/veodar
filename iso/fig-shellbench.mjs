// Tauri: a bench in two layers. Below, the core: one long, solid body with the data,
// the port and the drum that does the sums. Above, the window: a screen standing on it.
// What the window asks for travels along a bridge to a row of sockets, one per named
// command, under the board that lists which of them are allowed; the fourth socket is
// capped, so that order never reaches the core. In front, the press that turns the
// same bench into one installer for each system.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const CORE = { x: -104, y: -34, w: 150, d: 44, r: 3, h: 12 };
const TOP = CORE.h;
const FACE = CORE.y + CORE.d;
const SCREEN = { x: -96, y: -22, z: TOP, w: 44, h: 28, neck: 5 };
const BOARD = { x: -39, y: -21, w: 36, d: 3, h: 25 };
const SOCKETS = [-34, -25, -16, -7];
const ROW = -9;
const DATA = { x: 23, y: -15, r: 9 };
const DRUM = { x: 7, y: -26, r: 5.4 };
const USB = { x: 33, y: -32, w: 10, d: 9, r: 1.5, h: 6 };
const PRESS = { x: -26, y: 28, w: 26, d: 18, r: 2.5, h: 10.5 };
const BELT = { x: 0, y: 31, w: 94, d: 13, r: 1.5, h: 1.6 };
const PACKS = [12, 40, 68];
const PACK = { y: 33, w: 16, d: 9, h: 8 };
const PRINTER = { x: 78, y: -42, w: 34, d: 22, r: 2.5, h: 11 };
const ROWS = ["LEER ARCHIVOS", "IMPRIMIR", "PUERTO USB", "BORRAR DISCO"];

const BRIDGE = [
  [-62, -13, TOP + 0.9],
  [-44, -13, TOP + 0.9],
  [-44, ROW, TOP + 0.9],
  [SOCKETS[0] - 3, ROW, TOP + 0.9],
];
const CORE_LINE = [
  [SOCKETS[3] + 3, ROW, TOP + 0.9],
  [9, ROW, TOP + 0.9],
  [9, DATA.y, TOP + 0.9],
  [DATA.x - DATA.r, DATA.y, TOP + 0.9],
];
const PRESS_LINE = [
  [-50, FACE, 4],
  [-50, FACE + 2, 0.9],
  [-50, PRESS.y + 10, 0.9],
  [PRESS.x, PRESS.y + 10, 0.9],
];
const PRINT_LINE = [
  [USB.x + USB.w, -28, TOP + 2.4],
  [CORE.x + CORE.w, -28, TOP + 0.9],
  [CORE.x + CORE.w + 2, -28, 0.9],
  [PRINTER.x, -28, 0.9],
];
const routeTo = (i) => [...BRIDGE, [SOCKETS[i], ROW, TOP + 1.4]];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [SCREEN.x, SCREEN.y, TOP + SCREEN.neck + SCREEN.h + 3], [CORE.x + CORE.w, CORE.y, 30]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, slab, cyl, screws, base, label, lamp, top, faceY, faceX, platters, cable, shadow, pick, thumb, display, windowBar } = kitFor(P, { lod });
  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);
  const bulb = (x, y, z, r, part, on = false, ok = false) => {
    const svg = lamp(x, y, z, r, part, on);
    return ok ? svg.replace('class="veo-lamp"', 'class="veo-lamp" data-tone="ok"') : svg;
  };

  // ── The lower layer: the core, one solid body ──────────────────────────
  const core = (plan = CORE) => {
    const out = [slab(plan, 0, CORE.h, "mid", { steps: 6, bevel: 0.9, seam: 3 })];
    out.push(L(k.planOutline(k.insetPlan(plan, 3), TOP, P, 4), { tone: "faint" }));
    return out.join("");
  };
  const plate = () =>
    faceY(CORE.x + 8, FACE, 9.4, `<rect class="ui-s" data-t="lo" width="34" height="5.4" rx=".8"/><text class="ui-t" x="17" y="3.8" font-size="2.7" text-anchor="middle" opacity=".85">NÚCLEO · RUST</text>`) +
    faceY(CORE.x + 52, FACE, 9, pick(`<path class="ui-s" data-t="lo" d="M0 0h22M0 2.2h22M0 4.4h22"/>`)) +
    drawer();
  const drawer = () => faceY(CORE.x + 122, FACE, 9.6, `<rect class="ui-s" data-t="mid" width="22" height="6" rx=".8"/>${pick(`<path class="ui-s" data-t="hi" d="M8 3h6"/>`)}`);
  // What the core reaches on the machine: here, a printer.
  const printer = ({ hooks = true, printed = false } = {}) => {
    const out = [slab({ x: PRINTER.x + 6, y: PRINTER.y + 1, w: 22, d: 2, r: 0.5 }, PRINTER.h - 2, 9, "hi", { steps: 1, bevel: 0, crease: "lo" })];
    out.push(slab(PRINTER, 0, PRINTER.h, "mid", { steps: 5, bevel: 0.8, seam: 3 }));
    out.push(faceY(PRINTER.x + 5, PRINTER.y + PRINTER.d, 7.6, `<rect class="ui-f" data-t="hi" width="24" height="1.8" rx=".9"/>`));
    out.push(L(k.planOutline({ x: PRINTER.x + 4, y: PRINTER.y + 5, w: 26, d: 12, r: 1.5 }, PRINTER.h, P, 3), { tone: "faint" }));
    out.push(slab({ x: PRINTER.x + 4, y: PRINTER.y + PRINTER.d, w: 26, d: 14, r: 1.2 }, 0, 1.2, "lo", { steps: 3, bevel: 0.2 }));
    const sheet = slab({ x: PRINTER.x + 7, y: PRINTER.y + PRINTER.d + 0.6, w: 20, d: 11.6, r: 0.5 }, 1.2, 0.5, "hi", { steps: 1, bevel: 0, crease: "lo" }) + L([3, 5.4, 7.8].map((dy, i) => k.lineOnTop([PRINTER.x + 9.4, PRINTER.y + PRINTER.d + dy], [PRINTER.x + (i === 2 ? 19 : 24.4), PRINTER.y + PRINTER.d + dy], 1.72, P)).join(""), { tone: "mid", free: true, fine: true });
    out.push(hooks ? `<g data-part="sheet" opacity="0">${sheet}</g>` : printed ? sheet : "");
    out.push(bulb(PRINTER.x + PRINTER.w - 5, PRINTER.y + PRINTER.d - 4.6, PRINTER.h, 1.6, hooks ? "printing" : "", printed, true));
    return out.join("");
  };
  const engine = ({ hooks = true, on = false } = {}) => {
    const out = [];
    out.push(cyl(DRUM.x, DRUM.y, DRUM.r + 1.2, TOP, 1, "lo", { steps: 22 }), cyl(DRUM.x, DRUM.y, DRUM.r, TOP + 1, 6, "hi", { steps: 26, bevel: 0.4, crease: "lo" }));
    out.push(L(k.knurl(DRUM.x, DRUM.y, DRUM.r, TOP + 1, TOP + 7, 26, P), { tone: "lo", fine: true }), cyl(DRUM.x, DRUM.y, 1.6, TOP + 7, 1.4, "mid", { steps: 12 }));
    out.push(slab(USB, TOP, USB.h, "hi", { steps: 3, bevel: 0.5, crease: "lo" }));
    out.push(faceY(USB.x + 1.5, USB.y + USB.d, TOP + USB.h - 1.4, `<rect class="ui-f" data-t="hi" width="7" height="2.6" rx=".5"/>`));
    out.push(bulb(USB.x + USB.w / 2, USB.y + 4, TOP + USB.h, 1.4, hooks ? "usb" : "", false, true));
    out.push(platters(DATA.x, DATA.y, DATA.r, TOP, { count: 2, h: 5, part: hooks ? "data" : undefined }));
    if (!hooks && on) out.push(`<g class="veo-lamp" data-on="">${cyl(DATA.x, DATA.y, 1.9, TOP + 11.3, 1.6, "hi", { steps: 16, crease: "lo" })}</g>`);
    return out.join("");
  };

  // ── The upper layer: the window ────────────────────────────────────────
  const gw = SCREEN.w - 2.4;
  const tiles = [
    [3, 8.4],
    [gw / 2 + 0.9, 8.4],
    [3, 16.8],
    [gw / 2 + 0.9, 16.8],
  ];
  const tw = gw / 2 - 3.9;
  const ui = ({ hooks = true, hit = -1 } = {}) => {
    const out = [windowBar(gw, "app")];
    tiles.forEach(([x, y], i) => {
      out.push(`<rect class="scr-f" x="${x}" y="${y}" width="${tw}" height="6.6" rx="1.2"/>`, pick(`<path class="scr-s" data-t="${i === 3 ? "dim" : "hi"}" d="M${x + 2.4} ${y + 3.3}h${i % 2 ? 8 : 10}"/>`));
      const ring = `<rect class="scr-s" data-t="acc" x="${x}" y="${y}" width="${tw}" height="6.6" rx="1.2"/>`;
      out.push(hooks ? `<g data-part="tile-${i}" opacity="0">${ring}</g>` : hit === i ? ring : "");
    });
    return out.join("");
  };
  const windowOn = (opts) => display(SCREEN, ui(opts));

  // ── The board: which commands the window may give ──────────────────────
  const board = ({ hooks = true, no = false } = {}) => {
    const out = [slab({ x: BOARD.x - 1, y: BOARD.y - 1.5, w: BOARD.w + 2, d: BOARD.d + 3, r: 1.2 }, TOP, 1.4, "lo", { steps: 3, bevel: 0.2 })];
    out.push(slab({ x: BOARD.x, y: BOARD.y, w: BOARD.w, d: BOARD.d, r: 0.9 }, TOP + 1.4, BOARD.h, "hi", { steps: 2, bevel: 0.4, crease: "lo" }));
    const rows = ROWS.map((name, i) => {
      const y = 2.4 + i * 5.5;
      const allowed = i < 3;
      const toggle = allowed
        ? `<rect class="ui-f" data-t="hi" x="${BOARD.w - 11}" y="${y}" width="7.4" height="3.2" rx="1.6"/><circle class="ui-f" data-t="paper" cx="${BOARD.w - 5.3}" cy="${y + 1.6}" r="1.1"/>`
        : `<rect class="ui-s" data-t="lo" x="${BOARD.w - 11}" y="${y}" width="7.4" height="3.2" rx="1.6"/><circle class="ui-f" data-t="hi" cx="${BOARD.w - 9.3}" cy="${y + 1.6}" r="1.1"/>`;
      return `<text class="ui-t" x="2.6" y="${y + 2.5}" font-size="2.1" opacity="${allowed ? 0.85 : 0.5}">${name}</text>${toggle}${i < 3 ? pick(`<path class="ui-s" data-t="faint" d="M2.6 ${y + 4.35}h${BOARD.w - 6.2}"/>`) : ""}`;
    });
    out.push(faceY(BOARD.x, BOARD.y + BOARD.d, TOP + 1.4 + BOARD.h, rows.join("")));
    out.push(bulb(BOARD.x + BOARD.w - 4, BOARD.y + 1.5, TOP + 1.4 + BOARD.h, 1.2, hooks ? "deny" : "", no));
    return out.join("");
  };
  const sockets = ({ hooks = true, lit = -1 } = {}) =>
    SOCKETS.map((x, i) => {
      const seat = slab({ x: x - 3.2, y: ROW - 3.2, w: 6.4, d: 6.4, r: 1.4 }, TOP, 1.2, "lo", { steps: 3, bevel: 0.2 });
      if (i === 3) return seat + slab({ x: x - 2.2, y: ROW - 2.2, w: 4.4, d: 4.4, r: 1 }, TOP + 1.2, 1, "mid", { steps: 2, bevel: 0.2 }) + L(k.lineOnTop([x - 1.2, ROW - 1.2], [x + 1.2, ROW + 1.2], TOP + 2.2, P) + k.lineOnTop([x + 1.2, ROW - 1.2], [x - 1.2, ROW + 1.2], TOP + 2.2, P), { tone: "hi", free: true });
      return seat + bulb(x, ROW, TOP + 1.2, 1.5, hooks ? `cmd-${i}` : "", lit === i, true);
    }).join("");

  // ── The press and the installers that come off it ──────────────────────
  const press = ({ hooks = true, on = false } = {}) => {
    const out = [slab(PRESS, 0, PRESS.h, "mid", { steps: 5, bevel: 0.8, seam: 3 })];
    out.push(faceX(PRESS.x + PRESS.w, PRESS.y + PRESS.d, PRESS.h, `<rect class="ui-f" data-t="hi" x="3" y="1.6" width="12" height="7.6" rx=".8"/>`));
    out.push(faceY(PRESS.x + 3, PRESS.y + PRESS.d, PRESS.h - 2.6, pick(`<rect class="ui-s" data-t="lo" width="20" height="6" rx=".8"/><path class="ui-s" data-t="lo" d="M3 2h14M3 4h9"/>`)));
    out.push(cyl(PRESS.x + 9, PRESS.y + 8, 5.4, PRESS.h, 2.4, "hi", { steps: 24, bevel: 0.4, crease: "lo" }), cyl(PRESS.x + 9, PRESS.y + 8, 1.8, PRESS.h + 2.4, 1.6, "mid", { steps: 12 }));
    out.push(bulb(PRESS.x + PRESS.w - 5, PRESS.y + PRESS.d - 5, PRESS.h, 1.7, hooks ? "pressing" : "", on));
    return out.join("");
  };
  const belt = () => slab(BELT, 0, BELT.h, "lo", { steps: 3, bevel: 0.3 }) + L(k.lineOnTop([BELT.x + 3, BELT.y + 2], [BELT.x + BELT.w - 3, BELT.y + 2], BELT.h, P) + k.lineOnTop([BELT.x + 3, BELT.y + BELT.d - 2], [BELT.x + BELT.w - 3, BELT.y + BELT.d - 2], BELT.h, P), { tone: "mid", free: true, fine: true });
  const MARKS = [`<rect class="ui-s" data-t="hi" x="5.6" y="1.6" width="4.4" height="4.4" rx=".5"/>`, `<circle class="ui-s" data-t="hi" cx="7.8" cy="3.8" r="2.4"/>`, `<path class="ui-s" data-t="hi" d="M7.8 1.4l2.8 4.8h-5.6z"/>`];
  const pack = (i) => {
    const x = PACKS[i];
    const plan = { x, y: PACK.y, w: PACK.w, d: PACK.d, r: 1 };
    return (
      slab(plan, BELT.h, PACK.h, "hi", { steps: 3, bevel: 0.4, crease: "lo" }) +
      faceY(x + 0.2, PACK.y + PACK.d, BELT.h + PACK.h - 0.3, MARKS[i]) +
      L(k.lineOnTop([x + PACK.w / 2, PACK.y + 0.6], [x + PACK.w / 2, PACK.y + PACK.d - 0.6], BELT.h + PACK.h, P), { tone: "mid", free: true, fine: true })
    );
  };

  const body = [
    base(PLATE),
    core(),
    plate(),
    windowOn(),
    wire(BRIDGE, "bridge"),
    board(),
    engine(),
    wire(CORE_LINE, "core-line"),
    sockets(),
    wire(PRINT_LINE, "print-line"),
    printer(),
    wire(PRESS_LINE, "press-line"),
    press(),
    belt(),
    ...PACKS.map((_, i) => `<g data-part="pack-${i}" opacity="0">${pack(i)}</g>`),
    label({ x: -118, y: 37, w: 72, d: 11, r: 1 }, "VENTANA · PERMISOS · NÚCLEO"),
    `<g data-part="beads"><g data-bead="0" opacity="0"><circle class="veo-bead" r="2.3"/></g></g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const under = (x, w) => ({ x, y: CORE.y, w, d: CORE.d, r: 3 });
  const parts = {
    window: part([shadow(under(CORE.x, 62)), core(under(CORE.x, 62)), windowOn({ hooks: false, hit: 0 })], [...k.boxCorners(under(CORE.x, 62), 0, TOP), [SCREEN.x, SCREEN.y, TOP + SCREEN.neck + SCREEN.h + 2]], 12),
    core: part([shadow(under(-8, 54)), core(under(-8, 54)), drawer(), engine({ hooks: false, on: true })], k.boxCorners(under(-8, 54), 0, TOP + 16), 12),
    gate: part([shadow(under(-46, 50)), core(under(-46, 50)), board({ hooks: false }), sockets({ hooks: false })], [...k.boxCorners(under(-46, 50), 0, TOP), [BOARD.x, BOARD.y, TOP + BOARD.h + 5]], 12),
    bundles: part(
      [shadow({ x: PRESS.x, y: PRESS.y, w: BELT.x + BELT.w - PRESS.x, d: PRESS.d, r: 4 }), press({ hooks: false, on: true }), belt(), pack(0), pack(1), pack(2)],
      [...k.boxCorners(PRESS, 0, PRESS.h + 5), ...k.boxCorners(BELT, 0, 10)],
      12,
    ),
    detail: part(
      [shadow(under(-68, 62)), core(under(-68, 62)), wire([[-66, -13, TOP + 0.9], ...BRIDGE.slice(1)], "", true), sockets({ hooks: false, lit: 1 }), `<g transform="translate(${k.iso([-52, -13, TOP + 1.4], P).map((v) => v.toFixed(1)).join(" ")})"><circle class="veo-bead" r="3"/></g>`],
      k.boxCorners(under(-68, 62), 0, TOP + 6),
      12,
    ),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("shellbench", {
  width: W,
  height: H,
  label:
    "Un banco de dos capas sobre una placa. Abajo, el núcleo: un cuerpo macizo y alargado con un tambor, dos discos de datos y un puerto del que sale un cable hasta una impresora. Encima, a la izquierda, la ventana: una pantalla con cuatro botones. Entre las dos, un puente lleva cada orden hasta una fila de zócalos bajo un cuadro de permisos con cuatro interruptores; el cuarto zócalo está tapado y esa orden no llega al núcleo. Delante, una prensa de la que salen tres instaladores, uno por sistema.",
  body: full.body,
  motion: { P, routes: [0, 1, 2, 3].map((i) => flat(routeTo(i))), core: flat(CORE_LINE), press: flat(PRESS_LINE), print: flat(PRINT_LINE), packs: PACKS.map((x) => x - BELT.x) },
  thumb: small.body
    .join("")
    .replace('<g data-part="tile-0" opacity="0">', "<g>")
    .replace('<g data-part="cmd-0" class="veo-lamp" data-tone="ok">', '<g class="veo-lamp" data-tone="ok" data-on="">')
    .replace(/<g data-part="pack-(\d)" opacity="0">/g, "<g>"),
  parts: full.parts,
});
