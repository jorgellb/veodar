// Expo: a shipping dock. A build machine turns the project into a version; a belt
// carries it to a switch that sends it one of two ways: past the store's counter,
// under the review arch and onto the shelf the phone installs from, or down the direct
// line, for the small fixes that reach the phone when the app is opened. A second
// phone, the team's, gets every build to try before anyone else.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const BUILDER = { x: -112, y: -46, w: 46, d: 30, r: 3, h: 34 };
const BELT_H = 4.4;
const BELT1 = { x: -66, y: -38, w: 58, d: 14, r: 1.5 };
const SWITCH = { x: 4, y: -31, r: 12 };
const BELT2 = { x: 16, y: -38, w: 60, d: 14, r: 1.5 };
const ARCH = { x: 44, back: -41, front: -21, h: 22 };
const SHELF = { x: 78, y: -46, w: 38, d: 26, r: 2 };
const PHONE = { x: 74, y: -2, w: 32, d: 48 };
const DOCK = { x: 70, y: -6, w: 40, d: 56, r: 8 };
const PUCK = { x: 56, y: 14, w: 12, d: 12, r: 2, h: 5 };
const TEST_DOCK = { x: -116, y: 16, w: 44, d: 22, r: 3 };
const TEST_PHONE = { x: -110, y: 25, z: 5, w: 28, h: 54, t: 3.4 };
const PACK = { w: 12, d: 10, h: 8 };

// Where the version travels (the middle of its underside), and the lines the beads ride.
const PACK_PATH = [
  [-60, -31, BELT_H],
  [-8, -31, BELT_H],
  [SWITCH.x, -31, BELT_H],
  [ARCH.x, -31, BELT_H],
  [72, -31, BELT_H],
  [94, -30, 6],
];
const TEST = [
  [-78, -16, 2],
  [-78, -13, 0.9],
  [-64, -13, 0.9],
  [-64, 27, 0.9],
  [-72, 27, 0.9],
  [-72, 27, 3],
];
const DIRECT = [
  [SWITCH.x, SWITCH.y + SWITCH.r - 0.5, 2.4],
  [SWITCH.x, -17, 0.9],
  [SWITCH.x, 20, 0.9],
  [PUCK.x, 20, 0.9],
  [PUCK.x, 20, 3],
];
const STORE_LINE = [
  [98, SHELF.y + SHELF.d, 3],
  [98, -17, 0.9],
  [98, DOCK.y, 0.9],
  [98, DOCK.y, 2],
];
const FIX = [
  [-60, -31, BELT_H + 2.4],
  [-8, -31, BELT_H + 2.4],
  [SWITCH.x, -31, BELT_H + 2.4],
  [SWITCH.x, SWITCH.y + SWITCH.r - 1, BELT_H + 1],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [BUILDER.x, BUILDER.y, 46], [TEST_PHONE.x, TEST_PHONE.y, 62]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, D, slab, cyl, screws, base, label, lamp, knob, faceY, faceX, screen, cable, shadow, pick, thumb, handset, handsetFlat } = kitFor(P, { lod });
  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);
  const lit = (svg, on) => (on ? svg.replace('class="veo-lamp"', 'class="veo-lamp" data-on=""') : svg);

  // ── The build machine: the project goes in at the top, a version comes out ─
  const builder = ({ hooks = true, on = false } = {}) => {
    const out = [slab(BUILDER, 0, BUILDER.h, "mid", { steps: 4, bevel: 0.7, seam: 6 })];
    const cx = BUILDER.x + 15;
    const cy = BUILDER.y + 13;
    // The hopper, with the project showing at its mouth.
    out.push(cyl(cx, cy, 6, BUILDER.h, 3, "mid", { steps: 22 }), cyl(cx, cy, 9.5, BUILDER.h + 3, 4.6, "mid", { steps: 28, bevel: 0.5 }));
    out.push(L(k.ring(cx, cy, 7.6, BUILDER.h + 7.6, P, 28), { tone: "lo" }));
    out.push(slab({ x: cx - 4.5, y: cy - 3, w: 9, d: 6, r: 0.8 }, BUILDER.h + 6, 6, "hi", { steps: 2, bevel: 0.3, crease: "lo" }));
    out.push(L(k.lineOnTop([cx - 2.6, cy - 1], [cx + 2.6, cy - 1], BUILDER.h + 12, P) + k.lineOnTop([cx - 2.6, cy + 1], [cx + 1, cy + 1], BUILDER.h + 12, P), { tone: "mid", free: true, fine: true }));
    // Its screen: three stages, each with a bar.
    const bars = [0, 1, 2]
      .map(
        (i) =>
          `<rect class="scr-f" x="3" y="${3.4 + i * 4.6}" width="20" height="2.6" rx="1.3"/>` +
          (hooks ? `<rect class="scr-f" data-t="${i === 2 ? "acc" : "hi"}" data-bar="${i}" x="3" y="${3.4 + i * 4.6}" width="0" height="2.6" rx="1.3"/>` : on ? `<rect class="scr-f" data-t="${i === 2 ? "acc" : "hi"}" x="3" y="${3.4 + i * 4.6}" width="${[20, 20, 12][i]}" height="2.6" rx="1.3"/>` : ""),
      )
      .join("");
    out.push(faceY(BUILDER.x + 5, BUILDER.y + BUILDER.d, BUILDER.h - 7, screen(26, 17, bars, 1.4)));
    // The mouth the version leaves by, over the belt.
    out.push(faceX(BUILDER.x + BUILDER.w, BELT1.y + BELT1.d - 1, 17, `<rect class="ui-f" data-t="hi" width="12" height="${17 - BELT_H}" rx="1.4"/><path class="ui-s" data-t="lo" d="M0 3.2h12M0 6.4h12"/>`));
    out.push(...screws(k.corners(BUILDER, 3.4), BUILDER.h, 0.9, 0.42));
    out.push(lit(lamp(BUILDER.x + BUILDER.w - 7, BUILDER.y + BUILDER.d - 7, BUILDER.h, 2, hooks ? "build" : ""), on));
    return out.join("");
  };

  // ── A belt: a low bed with its rollers ─────────────────────────────────
  const belt = (plan) => {
    const out = [slab(plan, 0, BELT_H, "lo", { steps: 3, bevel: 0.3, seam: 1.4 })];
    out.push(L(k.planOutline(k.insetPlan(plan, 1.6), BELT_H, P, 3), { tone: "lo", fine: true }));
    const marks = [];
    for (let x = plan.x + 5; x < plan.x + plan.w - 2; x += 5) marks.push(k.lineOnTop([x, plan.y + 2.4], [x, plan.y + plan.d - 2.4], BELT_H, P));
    out.push(L(marks.join(""), { tone: "faint" }));
    return out.join("");
  };

  // ── The switch: a turntable whose arrow says which way the next one goes ─
  const arrow = (dx, dy) => {
    const [x, y] = [SWITCH.x, SWITCH.y];
    const tip = [x + dx * 8, y + dy * 8];
    return (
      k.lineOnTop([x - dx * 4, y - dy * 4], tip, BELT_H + 0.02, P) +
      k.lineOnTop(tip, [tip[0] - dx * 3.4 - dy * 2.6, tip[1] - dy * 3.4 - dx * 2.6], BELT_H + 0.02, P) +
      k.lineOnTop(tip, [tip[0] - dx * 3.4 + dy * 2.6, tip[1] - dy * 3.4 + dx * 2.6], BELT_H + 0.02, P)
    );
  };
  const turntable = ({ hooks = true, way = "store" } = {}) => {
    const out = [cyl(SWITCH.x, SWITCH.y, SWITCH.r, 0, BELT_H - 1.2, "mid", { steps: 40, bevel: 0.4 }), cyl(SWITCH.x, SWITCH.y, SWITCH.r - 1.6, BELT_H - 1.2, 1.2, "hi", { steps: 40, crease: "lo" })];
    out.push(L(k.ring(SWITCH.x, SWITCH.y, SWITCH.r - 3.4, BELT_H, P, 36), { tone: "faint" }));
    const store = `<g class="veo-trace" data-on="">${L(arrow(1, 0), { tone: "hi" })}</g>`;
    const direct = `<g class="veo-trace" data-on="">${L(arrow(0, 1), { tone: "hi" })}</g>`;
    out.push(hooks ? `<g data-part="way-store">${store}</g><g data-part="way-direct" opacity="0">${direct}</g>` : way === "store" ? store : direct);
    return out.join("");
  };
  const lever = () => knob(24, -15, 3.6, 0, 5, { pointer: 0.9 });

  // ── The store: the review arch over the belt, and the shelf behind it ──
  const post = (y) => cyl(ARCH.x, y, 1.9, 0, ARCH.h, "mid", { steps: 14, crease: "none" }) + cyl(ARCH.x, y, 3.2, 0, 1.4, "lo", { steps: 18 });
  const beam = ({ hooks = true, on = false } = {}) =>
    slab({ x: ARCH.x - 3.2, y: ARCH.back - 2.6, w: 6.4, d: ARCH.front - ARCH.back + 5.2, r: 1.6 }, ARCH.h, 4, "mid", { steps: 3, bevel: 0.5, seam: ARCH.h + 2 }) +
    L(k.segment([ARCH.x + 3.2, ARCH.back + 3, ARCH.h + 0.2], [ARCH.x + 3.2, ARCH.front - 3, ARCH.h + 0.2], P), { tone: "mid", fine: true }) +
    lit(lamp(ARCH.x, (ARCH.back + ARCH.front) / 2, ARCH.h + 4, 2, hooks ? "review" : ""), on);
  const shelf = ({ hooks = true, on = false } = {}) => {
    const out = [slab({ x: SHELF.x + 2, y: SHELF.y, w: SHELF.w - 4, d: 7, r: 1.5 }, 0, 26, "mid", { steps: 3, bevel: 0.5, seam: 6 })];
    out.push(slab({ ...SHELF, y: SHELF.y + 6 }, 0, 6, "mid", { steps: 4, bevel: 0.6, seam: 2 }).replace(/$/, ""));
    // A ledge with two versions already on sale.
    out.push(slab({ x: SHELF.x + 5, y: SHELF.y + 7, w: SHELF.w - 10, d: 4, r: 0.6 }, 16, 1, "lo", { steps: 2, bevel: 0 }));
    for (const dx of [7, 20]) out.push(slab({ x: SHELF.x + dx, y: SHELF.y + 7.4, w: 8, d: 3.2, r: 0.5 }, 17, 5, "hi", { steps: 2, bevel: 0.2, crease: "lo" }));
    out.push(lit(lamp(SHELF.x + SHELF.w - 5, SHELF.y + SHELF.d + 2, 6, 1.8, hooks ? "listed" : "").replace('class="veo-lamp"', 'class="veo-lamp" data-tone="ok"'), on));
    return out.join("");
  };

  // ── A version: a sealed box. Built at the origin, moved by the page ────
  const box = (litBox = false) => {
    const plan = { x: -PACK.w / 2, y: -PACK.d / 2, w: PACK.w, d: PACK.d, r: 1 };
    return (
      slab(plan, 0, PACK.h, "hi", { steps: 2, bevel: 0.4, crease: "lo", lit: litBox }) +
      L(k.lineOnTop([0, plan.y], [0, plan.y + plan.d], PACK.h, P) + k.segment([0, plan.y + plan.d, PACK.h], [0, plan.y + plan.d, PACK.h - 3], P), { tone: "mid", free: true, fine: true })
    );
  };
  const boxAt = ([x, y, z], litBox = false) => `<g transform="${k.translateAlong(P, [x, y, z])}">${box(litBox)}</g>`;

  // ── The phone the version ends on, lying on its dock ───────────────────
  const gw = PHONE.w - 2.6;
  const gh = PHONE.d - 2.6;
  const phoneUi = ({ hooks = true, fresh = false } = {}) => {
    const out = [`<rect class="scr-f" data-t="hi" x="3" y="6" width="9" height="9" rx="2.4"/>`];
    out.push(`<text class="scr-t" x="14.4" y="10.4" font-size="3" font-weight="600">Mi app</text>`);
    out.push(`<text class="scr-t" data-t="dim" data-part="ver" x="14.4" y="14.4" font-size="2.5">v1.4.0</text>`);
    for (let i = 0; i < 3; i++) out.push(`<rect class="scr-f" x="3" y="${19.5 + i * 6.4}" width="${gw - 6}" height="4.8" rx="1.4"/>`, pick(`<path class="scr-s" data-t="dim" d="M5.4 ${21.9 + i * 6.4}h${[12, 16, 9][i]}"/>`));
    const badge = `<rect class="scr-f" data-t="acc" x="3" y="${gh - 8}" width="${gw - 6}" height="5" rx="2.5"/>`;
    out.push(hooks ? `<g data-part="fresh" opacity="0">${badge}</g>` : fresh ? badge : "");
    return out.join("");
  };
  const phone = (opts) =>
    slab(DOCK, 0, 3, "mid", { steps: 6, bevel: 0.6, seam: 1.4 }) + handsetFlat(PHONE, 3, phoneUi(opts)) + L(k.planOutline({ x: DOCK.x + 3, y: DOCK.y + DOCK.d - 5.6, w: DOCK.w - 6, d: 2.6, r: 1.3 }, 3, P, 3), { tone: "lo", fine: true });
  const puck = ({ hooks = true, on = false } = {}) =>
    slab(PUCK, 0, PUCK.h, "hi", { steps: 4, bevel: 0.6, crease: "lo", seam: 2 }) +
    `<g${hooks ? ' data-part="rx"' : ""} class="veo-lamp"${on ? ' data-on=""' : ""}>${cyl(PUCK.x + 6, PUCK.y + 6, 2.3, PUCK.h, 1.5, "hi", { steps: 18, crease: "lo" })}</g>`;

  // ── The team's phone: every build, to try before anyone else ───────────
  const code = () => {
    // A square code to scan: the way a test build is opened.
    const cells = [];
    const on = [0, 1, 2, 4, 6, 8, 10, 12, 13, 15, 17, 18, 19, 21, 23, 24];
    for (const i of on) cells.push(`<rect class="scr-f" data-t="hi" x="${5.4 + (i % 5) * 2.9}" y="${16 + Math.floor(i / 5) * 2.9}" width="2.4" height="2.4" rx=".3"/>`);
    return cells.join("");
  };
  const tester = ({ hooks = true, on = false } = {}) => {
    const ui =
      `<text class="scr-t" x="2.6" y="10.6" font-size="2.9" font-weight="600">PRUEBA</text>` +
      `<rect class="scr-s" data-t="dim" x="3.6" y="14.2" width="18.2" height="18.2" rx="1.6"/>` +
      pick(code(), `<rect class="scr-f" data-t="hi" x="6.4" y="17" width="5" height="5"/><rect class="scr-f" data-t="hi" x="14" y="17" width="5" height="5"/><rect class="scr-f" data-t="hi" x="6.4" y="24.6" width="5" height="5"/>`) +
      (hooks ? `<g data-part="test-ok" opacity="0"><rect class="scr-f" data-t="acc" x="2.6" y="38" width="20.2" height="5.4" rx="2.7"/></g>` : on ? `<rect class="scr-f" data-t="acc" x="2.6" y="38" width="20.2" height="5.4" rx="2.7"/>` : "") +
      `<rect class="scr-f" data-t="mid" x="8.1" y="48.7" width="9.2" height="1" rx=".5"/>`;
    return (
      slab(TEST_DOCK, 0, 5, "mid", { steps: 5, bevel: 0.7, seam: 2 }) +
      screws([[TEST_DOCK.x + 4, TEST_DOCK.y + 4], [TEST_DOCK.x + TEST_DOCK.w - 4, TEST_DOCK.y + 4]], 5, 0.9, 0.4).join("") +
      handset(TEST_PHONE, ui, { kind: "a" }) +
      lit(lamp(TEST_DOCK.x + TEST_DOCK.w - 5, TEST_DOCK.y + TEST_DOCK.d - 4.5, 5, 1.8, hooks ? "test" : ""), on)
    );
  };

  const body = [
    base(PLATE),
    builder(),
    wire(TEST, "test-line"),
    belt(BELT1),
    turntable(),
    belt(BELT2),
    post(ARCH.back),
    shelf(),
    `<g data-part="pack" opacity="0">${box(true)}</g>`,
    post(ARCH.front),
    beam(),
    lever(),
    wire(STORE_LINE, "store-line"),
    wire(DIRECT, "direct"),
    tester(),
    label({ x: -44, y: 38, w: 82, d: 11, r: 1 }, "COMPILAR · PUBLICAR · ACTUALIZAR"),
    puck(),
    phone(),
    `<g data-part="beads">${[0, 1].map((i) => `<g data-bead="${i}" opacity="0"><circle class="veo-bead" r="2.3"/></g>`).join("")}</g>`,
  ];

  const part = (body, boxPoints, pad = 18) => ({ body, frame: frameOf(boxPoints, P, pad) });
  const stub = (points, on = true) => wire(points, "", on);
  const parts = {
    tester: part(
      [shadow({ ...TEST_DOCK, r: 4 }), stub([[-58, 27, 0.9], [-72, 27, 0.9], [-72, 27, 3]]), tester({ hooks: false, on: true })],
      k.boxCorners({ x: TEST_DOCK.x, y: TEST_DOCK.y, w: 58, d: TEST_DOCK.d }, 0, 60),
      14,
    ),
    builder: part(
      [shadow({ x: BUILDER.x, y: BUILDER.y + 4, w: 72, d: 28, r: 4 }), builder({ hooks: false, on: true }), belt({ ...BELT1, w: 28 }), boxAt([-52, -31, BELT_H], true)],
      k.boxCorners({ x: BUILDER.x, y: BUILDER.y, w: 74, d: BUILDER.d }, 0, BUILDER.h + 12),
      14,
    ),
    store: part(
      [shadow({ x: 26, y: SHELF.y, w: 90, d: 30, r: 4 }), belt({ ...BELT2, x: 28, w: 48 }), post(ARCH.back), shelf({ hooks: false, on: true }), boxAt(PACK_PATH[5], true), post(ARCH.front), beam({ hooks: false })],
      k.boxCorners({ x: 28, y: SHELF.y, w: 88, d: 28 }, 0, 30),
      14,
    ),
    ota: part(
      [
        shadow({ x: SWITCH.x - 12, y: SWITCH.y - 12, w: 54, d: 44, r: 5 }),
        turntable({ hooks: false, way: "direct" }),
        stub([DIRECT[0], DIRECT[1], [SWITCH.x, -4, 0.9], [26, -4, 0.9], [26, -4, 3]]),
        `<g transform="${k.translateAlong(P, [26 - PUCK.x, -10 - PUCK.y, 0])}">${puck({ hooks: false, on: true })}</g>`,
      ],
      k.boxCorners({ x: SWITCH.x - 12, y: SWITCH.y - 12, w: 52, d: 44 }, 0, 8),
      16,
    ),
    detail: part(
      [
        shadow({ x: -24, y: SWITCH.y - 12, w: 62, d: 34, r: 5 }),
        belt({ ...BELT1, x: -24, w: 16 }),
        turntable({ hooks: false, way: "direct" }),
        belt({ ...BELT2, w: 18 }),
        stub([DIRECT[0], DIRECT[1], [SWITCH.x, -6, 0.9]]),
        lever(),
      ],
      k.boxCorners({ x: -24, y: SWITCH.y - 12, w: 60, d: 36 }, 0, 8),
      16,
    ),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("dispatch", {
  width: W,
  height: H,
  label:
    "Un muelle de expedición sobre una placa: a la izquierda, una compiladora con una tolva por la que entra el proyecto; de ella sale una cinta hasta una plataforma giratoria que reparte por dos caminos. Uno sigue por otra cinta, pasa bajo el arco de revisión y acaba en el estante de la tienda, de donde lo instala un teléfono tumbado en su base. El otro baja por un cable directo hasta ese mismo teléfono. Delante, el teléfono de pruebas del equipo recibe cada compilación antes que nadie.",
  body: full.body,
  motion: { P, pack: PACK_PATH, test: flat(TEST), fix: flat(FIX), direct: flat(DIRECT), store: flat(STORE_LINE) },
  thumb: small.body
    .join("")
    .replace('<g data-part="pack" opacity="0">', `<g transform="${k.translateAlong(P, PACK_PATH[5])}">`)
    .replace('data-part="listed" class="veo-lamp"', 'class="veo-lamp" data-on=""')
    .replace('data-part="direct"', 'data-on=""')
    .replace('data-part="rx" class="veo-lamp"', 'class="veo-lamp" data-on=""'),
  parts: full.parts,
});
