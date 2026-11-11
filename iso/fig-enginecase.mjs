// Electron: an application that travels with its own engine. An open case with two
// chambers: on the left the engine room, the process that touches the system (the
// engine, the files, the port); on the right the window, which is a web page on a
// screen. A wall stands between them, with one narrow bridge and a barrier on it: what
// was declared crosses, and what a foreign add-on tries is turned back. To the right,
// the same application packed for shipping, engine and all, beside a parcel that
// carries only the application.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const CASE = { x: -114, y: -40, w: 126, d: 66, r: 2 };
const FZ = 1.6;
const WALL = 14;
const WALL_X = -52;
const GAP = [-12, -2];
const LOW = 9;
const SCREEN = { x: -44, y: -31, z: FZ, w: 46, h: 28, neck: 5 };
const ENGINE = { x: -106, y: -33, w: 32, d: 22, r: 2, h: 9.4 };
const WHEEL = { x: -66, y: -25, r: 6.4 };
const FILES = { x: -94, y: 9, r: 8 };
const PORT = { x: -76, y: 5, w: 11, d: 10, r: 1.5, h: 6 };
const LANE = -7;
const GATE = { x: -45.6, y: -1.6, len: 9.6, z: 6.6 };
const BIG = { x: 34, y: -28, w: 40, d: 34, r: 2 };
const CRATE = { x: 38, y: -24, w: 32, d: 26, r: 1, h: 22, drop: 12 };
const SMALL = { x: 88, y: -8, w: 26, d: 22, r: 2 };
const PARCEL = { x: 94, y: -3, w: 14, d: 12, r: 1, h: 7, drop: 9 };

const CALL = [
  [SCREEN.x + SCREEN.w / 2, SCREEN.y + 6, FZ + 0.9],
  [SCREEN.x + SCREEN.w / 2, LANE, FZ + 0.9],
  [GATE.x, LANE, FZ + 0.9],
];
const CROSS = [
  [GATE.x, LANE, FZ + 0.9],
  [WALL_X - 8, LANE, FZ + 1.9],
  [-84, LANE, FZ + 0.9],
  [-84, ENGINE.y + ENGINE.d + 0.6, FZ + 0.9],
];
const STORE = [
  [-98, ENGINE.y + ENGINE.d + 0.6, FZ + 0.9],
  [-98, FILES.y - FILES.r, FZ + 0.9],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [SCREEN.x, SCREEN.y, FZ + SCREEN.neck + SCREEN.h + 3], [CRATE.x + CRATE.w, CRATE.y, 32]], W, H, {
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

  // ── The case: a floor, two tall walls behind, two low ones in front ────
  const shellBack = (plan = CASE) =>
    slab(plan, 0, FZ, "lo", { steps: 3, bevel: 0.3 }) +
    slab({ x: plan.x, y: plan.y, w: plan.w, d: 2.4, r: 0.8 }, FZ, WALL - FZ, "mid", { steps: 2, bevel: 0.4, seam: 6 }) +
    slab({ x: plan.x, y: plan.y, w: 2.4, d: plan.d, r: 0.8 }, FZ, WALL - FZ, "mid", { steps: 2, bevel: 0.4, seam: 6 });
  const shellFront = (plan = CASE, names = true) => {
    const out = [slab({ x: plan.x + plan.w - 2, y: plan.y, w: 2, d: plan.d, r: 0.6 }, FZ, 2.8, "mid", { steps: 2, bevel: 0.3 }), slab({ x: plan.x, y: plan.y + plan.d - 2, w: plan.w, d: 2, r: 0.6 }, FZ, 2.8, "mid", { steps: 2, bevel: 0.3 })];
    if (names) {
      out.push(faceY(plan.x + 8, plan.y + plan.d, 3.6, `<text class="ui-t" x="0" y="2.5" font-size="2.6" opacity=".8">PRINCIPAL · NODE</text>`));
      out.push(faceY(WALL_X + 12, plan.y + plan.d, 3.6, `<text class="ui-t" x="0" y="2.5" font-size="2.6" opacity=".8">VENTANA · WEB</text>`));
    }
    return out.join("");
  };
  const wallBack = () => slab({ x: WALL_X, y: CASE.y + 2.4, w: 2.4, d: GAP[0] - CASE.y - 2.4, r: 0.6 }, FZ, LOW - FZ, "hi", { steps: 2, bevel: 0.3, crease: "lo" });
  const wallFront = () =>
    slab({ x: WALL_X, y: GAP[1], w: 2.4, d: CASE.y + CASE.d - 2 - GAP[1], r: 0.6 }, FZ, LOW - FZ, "hi", { steps: 2, bevel: 0.3, crease: "lo" }) +
    faceX(WALL_X + 2.4, GAP[1] + 23, LOW - 0.8, `<text class="ui-t" x="10.6" y="2.6" font-size="2.2" text-anchor="middle" opacity=".85">SOLO PASAN</text><text class="ui-t" x="10.6" y="5.6" font-size="2" text-anchor="middle" opacity=".7">guardar · imprimir</text>${pick(`<rect class="ui-s" data-t="lo" width="21.2" height="6.8" rx=".6"/>`)}`);

  // ── The engine room ────────────────────────────────────────────────────
  const engine = ({ hooks = true, on = false } = {}) => {
    const zt = FZ + ENGINE.h;
    const out = [slab(ENGINE, FZ, ENGINE.h, "mid", { steps: 5, bevel: 0.7, seam: FZ + 3 })];
    out.push(faceY(ENGINE.x + 3, ENGINE.y + ENGINE.d, zt - 2.2, pick(`<path class="ui-s" data-t="lo" d="M0 0h26M0 2.2h26M0 4.4h26"/>`)));
    [ENGINE.x + 7, ENGINE.x + 17].forEach((x) => out.push(cyl(x, ENGINE.y + 8, 4.4, zt, 4.6, "hi", { steps: 22, bevel: 0.5, crease: "lo" }), cyl(x, ENGINE.y + 8, 1.6, zt + 4.6, 1.2, "mid", { steps: 12 })));
    out.push(...screws([[ENGINE.x + 3, ENGINE.y + 18.6], [ENGINE.x + 12, ENGINE.y + 18.6]], zt, 0.9, 0.42));
    out.push(bulb(ENGINE.x + ENGINE.w - 5, ENGINE.y + ENGINE.d - 5, zt, 1.8, hooks ? "engine" : "", on, true));
    // The shaft and its wheel.
    out.push(slab({ x: ENGINE.x + ENGINE.w, y: WHEEL.y - 1.2, w: WHEEL.x - ENGINE.x - ENGINE.w, d: 2.4, r: 0.8 }, FZ + 2.4, 2.4, "lo", { steps: 2, bevel: 0 }));
    out.push(cyl(WHEEL.x, WHEEL.y, WHEEL.r, FZ, 6, "hi", { steps: 28, bevel: 0.4, crease: "lo" }), L(k.knurl(WHEEL.x, WHEEL.y, WHEEL.r, FZ, FZ + 6, 28, P), { tone: "lo", fine: true }), cyl(WHEEL.x, WHEEL.y, 2, FZ + 6, 1.2, "mid", { steps: 12 }));
    return out.join("");
  };
  const system = (hooks = true, on = false) => {
    const out = [platters(FILES.x, FILES.y, FILES.r, FZ, { count: 2, h: 4.6, part: hooks ? "files" : undefined })];
    if (!hooks && on) out.push(`<g class="veo-lamp" data-on="">${cyl(FILES.x, FILES.y, 1.9, FZ + 10.5, 1.6, "hi", { steps: 16, crease: "lo" })}</g>`);
    out.push(slab(PORT, FZ, PORT.h, "hi", { steps: 3, bevel: 0.5, crease: "lo" }), faceY(PORT.x + 2, PORT.y + PORT.d, FZ + PORT.h - 1.6, `<rect class="ui-f" data-t="hi" width="7" height="2.6" rx=".5"/>`));
    return out.join("");
  };

  // ── The window ─────────────────────────────────────────────────────────
  const gw = SCREEN.w - 2.4;
  const ui = ({ hooks = true, hit = -1 } = {}) => {
    const out = [windowBar(gw, "app")];
    out.push(`<rect class="scr-f" data-t="mid" x="3" y="8.4" width="17" height="6.6" rx="1.2"/><text class="scr-t" x="11.5" y="12.8" font-size="2.8" text-anchor="middle">Guardar</text>`);
    out.push(pick(`<path class="scr-s" data-t="dim" d="M3 18.6h17M3 21.2h12"/>`));
    out.push(`<rect class="scr-s" data-t="dim" x="23.6" y="8.4" width="${gw - 26.6}" height="14.4" rx="1.2" stroke-dasharray="1.6 1.4"/><text class="scr-t" data-t="dim" x="${23.6 + (gw - 26.6) / 2}" y="16.6" font-size="2.6" text-anchor="middle">añadido</text>`);
    const rings = [`<rect class="scr-s" data-t="acc" x="3" y="8.4" width="17" height="6.6" rx="1.2"/>`, `<rect class="scr-s" data-t="acc" x="23.6" y="8.4" width="${gw - 26.6}" height="14.4" rx="1.2"/>`];
    rings.forEach((ring, i) => out.push(hooks ? `<g data-part="tile-${i}" opacity="0">${ring}</g>` : hit === i ? ring : ""));
    return out.join("");
  };
  const windowOn = (opts) => display(SCREEN, ui(opts));

  // ── The bridge and its barrier ─────────────────────────────────────────
  const gangway = () => slab({ x: WALL_X - 8, y: GAP[0] + 1.6, w: 18.4, d: GAP[1] - GAP[0] - 3.2, r: 0.8 }, FZ, 1, "mid", { steps: 2, bevel: 0.2 }) + L(k.lineOnTop([WALL_X - 7, LANE - 2.2], [WALL_X + 9.4, LANE - 2.2], FZ + 1, P) + k.lineOnTop([WALL_X - 7, LANE + 2.2], [WALL_X + 9.4, LANE + 2.2], FZ + 1, P), { tone: "lo", free: true, fine: true });
  const gate = ({ hooks = true, up = false, no = false } = {}) => {
    const out = [cyl(GATE.x, GATE.y, 2.6, FZ, 1.2, "lo", { steps: 18 }), cyl(GATE.x, GATE.y, 1.6, FZ + 1.2, GATE.z - FZ, "mid", { steps: 14, crease: "none" })];
    const down = slab({ x: GATE.x - 1.1, y: GATE.y - GATE.len, w: 2.2, d: GATE.len + 1.4, r: 0.9 }, GATE.z, 1.9, "hi", { steps: 3, bevel: 0.3, crease: "lo", lit: true });
    const raised = slab({ x: GATE.x - 1.1, y: GATE.y - 1.6, w: 2.2, d: 2.2, r: 0.9 }, GATE.z, GATE.len, "hi", { steps: 3, bevel: 0.3, crease: "lo" });
    out.push(hooks ? `<g data-part="bar-down">${down}</g><g data-part="bar-up" opacity="0">${raised}</g>` : up ? raised : down);
    out.push(`<g${hooks ? ' data-part="open"' : ""} class="veo-lamp" data-tone="ok"${!hooks && up ? ' data-on=""' : ""}>${cyl(GATE.x, GATE.y, 1.5, GATE.z + 2.1, 1.5, "hi", { steps: 14, crease: "lo" })}</g>`);
    out.push(bulb(WALL_X + 1.2, GAP[0] - 2.4, LOW, 1.2, hooks ? "deny" : "", no));
    return out.join("");
  };

  // ── Packed for shipping: with the engine, and without it ───────────────
  const dial = (x, y, name, turn, hooks) => {
    const needle = `<path class="ui-s" data-t="acc" d="M8 9V3.4"/>`;
    return (
      slab({ x, y, w: 16, d: 3, r: 1.2 }, 0, 12.6, "hi", { steps: 2, bevel: 0.4, crease: "lo" }) +
      faceY(x, y + 3, 12.6, `<path class="ui-s" data-t="hi" d="M2 9a6 6 0 0 1 12 0"/>${pick(`<path class="ui-s" data-t="lo" d="M3.2 6.2l.9.6M8 3v1.1M12.8 6.2l-.9.6"/>`)}${hooks ? `<g data-part="${name}" transform="rotate(-70 8 9)">${needle}</g>` : `<g transform="rotate(${turn} 8 9)">${needle}</g>`}<circle class="ui-f" data-t="hi" cx="8" cy="9" r=".8"/>`)
    );
  };
  const platform = (plan) => slab(plan, 0, 3, "mid", { steps: 4, bevel: 0.5, seam: 1.2 }) + L(k.planOutline(k.insetPlan(plan, 2.4), 3, P, 3), { tone: "faint" });
  const crate = () => {
    const out = [slab(CRATE, 3, CRATE.h, "hi", { steps: 3, bevel: 0.5, crease: "lo" })];
    const zt = 3 + CRATE.h;
    out.push(L([8, 24].map((dx) => k.lineOnTop([CRATE.x + dx, CRATE.y + 0.4], [CRATE.x + dx, CRATE.y + CRATE.d - 0.4], zt, P)).join(""), { tone: "mid", free: true, fine: true }));
    out.push(faceY(CRATE.x, CRATE.y + CRATE.d, zt, `${pick(`<path class="ui-s" data-t="lo" d="M8 0v22M24 0v22"/>`)}<rect class="ui-s" data-t="mid" x="9.6" y="7" width="12.8" height="6.4" rx=".8"/><text class="ui-t" x="16" y="11" font-size="2.3" text-anchor="middle" opacity=".85">APP + MOTOR</text>`));
    return out.join("");
  };
  const parcel = () => slab(PARCEL, 3, PARCEL.h, "hi", { steps: 3, bevel: 0.4, crease: "lo", lit: true }) + faceY(PARCEL.x, PARCEL.y + PARCEL.d, 3 + PARCEL.h, `<text class="ui-t" x="7" y="4.4" font-size="2.6" text-anchor="middle" opacity=".85">APP</text>`) + L(k.lineOnTop([PARCEL.x + 7, PARCEL.y + 0.4], [PARCEL.x + 7, PARCEL.y + PARCEL.d - 0.4], 3 + PARCEL.h, P), { tone: "mid", free: true, fine: true });

  const room = [engine(), system()];
  const body = [
    base(PLATE),
    shellBack(),
    ...room,
    wire(STORE, "store-line"),
    wallBack(),
    windowOn(),
    wallFront(),
    gangway(),
    wire(CALL, "call-line"),
    wire(CROSS, "cross-line"),
    gate(),
    shellFront(),
    platform(BIG),
    `<g data-part="crate" opacity="0">${crate()}</g>`,
    dial(BIG.x + 12, BIG.y + BIG.d + 2, "needle-big", 0, true),
    platform(SMALL),
    `<g data-part="parcel" opacity="0">${parcel()}</g>`,
    dial(SMALL.x + 5, SMALL.y + SMALL.d + 2, "needle-small", 0, true),
    label({ x: -112, y: 36, w: 74, d: 11, r: 1 }, "PRINCIPAL · PUENTE · VENTANA"),
    `<g data-part="beads"><g data-bead="0" opacity="0"><circle class="veo-bead" r="2.3"/></g></g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const left = { x: CASE.x, y: CASE.y, w: WALL_X + 2.4 - CASE.x, d: CASE.d, r: 2 };
  const rightSide = { x: WALL_X, y: CASE.y, w: CASE.x + CASE.w - WALL_X, d: 40, r: 2 };
  const span = { x: WALL_X - 16, y: GAP[0] - 12, w: 34, d: 50, r: 2 };
  const parts = {
    renderer: part([shadow({ ...rightSide, r: 4 }), slab(rightSide, 0, FZ, "lo", { steps: 3, bevel: 0.3 }), windowOn({ hooks: false, hit: 0 })], [...k.boxCorners(rightSide, 0, 3), [SCREEN.x, SCREEN.y, FZ + SCREEN.neck + SCREEN.h + 2]], 10),
    main: part([shadow({ ...left, r: 4 }), shellBack(left), engine({ hooks: false, on: true }), system(false, true), wire(STORE, "", true), shellFront(left, false)], k.boxCorners(left, 0, WALL + 2), 10),
    bridge: part(
      [shadow({ ...span, r: 4 }), slab(span, 0, FZ, "lo", { steps: 3, bevel: 0.3 }), slab({ x: WALL_X, y: span.y, w: 2.4, d: GAP[0] - span.y, r: 0.6 }, FZ, LOW - FZ, "hi", { steps: 2, bevel: 0.3, crease: "lo" }), wallFront(), gangway(), wire([[span.x + span.w - 1, LANE, FZ + 0.9], CALL[2]], "", true), wire([CROSS[0], CROSS[1], [span.x + 1, LANE, FZ + 0.9]], "", true), gate({ hooks: false, up: true })],
      [...k.boxCorners(span, 0, LOW), [GATE.x, GATE.y, GATE.z + GATE.len + 2]],
      10,
    ),
    crate: part(
      [shadow({ x: BIG.x, y: BIG.y, w: SMALL.x + SMALL.w - BIG.x, d: BIG.d + 6, r: 4 }), platform(BIG), crate(), dial(BIG.x + 12, BIG.y + BIG.d + 2, "", 48, false), platform(SMALL), parcel(), dial(SMALL.x + 5, SMALL.y + SMALL.d + 2, "", -38, false)],
      [...k.boxCorners({ x: BIG.x, y: BIG.y, w: SMALL.x + SMALL.w - BIG.x, d: BIG.d + 6 }, 0, 4), [CRATE.x, CRATE.y, 3 + CRATE.h + 2]],
      10,
    ),
    detail: part(
      [shadow({ ...CASE, r: 4 }), shellBack(), engine({ hooks: false }), system(false), wire(STORE), wallBack(), windowOn({ hooks: false }), wallFront(), gangway(), wire(CALL), wire(CROSS), gate({ hooks: false }), shellFront()],
      [...k.boxCorners(CASE, 0, WALL), [SCREEN.x, SCREEN.y, FZ + SCREEN.neck + SCREEN.h + 2]],
      10,
    ),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("enginecase", {
  width: W,
  height: H,
  label:
    "Una caja abierta con dos cámaras sobre una placa. En la de la izquierda, la sala de máquinas: un motor con su volante, dos discos de archivos y un puerto. En la de la derecha, la ventana: una pantalla con un botón de guardar y un recuadro para un añadido ajeno. Las separa un tabique con un único puente estrecho y una barrera. A la derecha, dos básculas: en una, la caja de embalaje con la aplicación y su motor; en la otra, un paquete pequeño solo con la aplicación.",
  body: full.body,
  motion: { P, call: flat(CALL), cross: flat(CROSS), store: flat(STORE), drops: [CRATE.drop, PARCEL.drop] },
  thumb: small.body
    .join("")
    .replace('<g data-part="crate" opacity="0">', "<g>")
    .replace('<g data-part="parcel" opacity="0">', "<g>")
    .replace('data-part="needle-big" transform="rotate(-70 8 9)"', 'transform="rotate(48 8 9)"')
    .replace('data-part="needle-small" transform="rotate(-70 8 9)"', 'transform="rotate(-38 8 9)"')
    .replace('<g data-part="tile-0" opacity="0">', "<g>"),
  parts: full.parts,
});
