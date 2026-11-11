// React Native: a bench with one console and two outputs. What is keyed in at the
// console runs down a trunk to a bridge and leaves on two lines at once, one to each
// phone. Each dock has a small module of its own for what only that phone can do, and
// a monitor beside the console shows the same logic running on the web.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const CONSOLE = { x: -64, y: -48, w: 60, d: 16, r: 2, h: 36 };
const KEYS = { x: -58, y: -28, w: 48, d: 11, r: 1.5, h: 2.6 };
const MONITOR = { x: -116, y: -44, w: 36, d: 3, r: 1, z: 9, h: 25 };
const BRIDGE = { x: -9, y: -6, w: 12, d: 10, r: 2, h: 5 };
const DOCKS = [
  { x: -100, y: 14, w: 44, d: 22, r: 3 },
  { x: 50, y: 14, w: 44, d: 22, r: 3 },
];
const DOCK_H = 5;
const PHONE = { w: 28, h: 54, t: 3.4 };
const phoneOf = (dock) => ({ x: dock.x + 6, y: dock.y + 9, z: DOCK_H, ...PHONE });
const nativeOf = (dock) => ({ x: dock.x + dock.w + 4, y: dock.y + 3, w: 14, d: 14, r: 2 });
const NATIVE_H = 8;

const TRUNK = [
  [-34, KEYS.y + KEYS.d, 1.4],
  [-34, -11, 0.9],
  [-3, -11, 0.9],
  [-3, BRIDGE.y, 0.9],
  [-3, BRIDGE.y, 3],
];
const OUT_A = [
  [BRIDGE.x, -1, 3],
  [BRIDGE.x - 2, -1, 0.9],
  [-62, -1, 0.9],
  [-62, DOCKS[0].y, 0.9],
  [-62, DOCKS[0].y, 3],
];
const OUT_B = [
  [BRIDGE.x + BRIDGE.w, -1, 3],
  [BRIDGE.x + BRIDGE.w + 2, -1, 0.9],
  [30, -1, 0.9],
  [30, 25, 0.9],
  [DOCKS[1].x, 25, 0.9],
  [DOCKS[1].x, 25, 3],
];
const nativeLine = (dock) => {
  const n = nativeOf(dock);
  return [
    [n.x, n.y + 7, 4],
    [dock.x + dock.w, n.y + 7, 3],
  ];
};
const WEB = [
  [-60, CONSOLE.y + CONSOLE.d, 3],
  [-60, -29, 0.9],
  [-98, -29, 0.9],
  [-98, -37, 0.9],
  [-98, -37, 2],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [MONITOR.x, MONITOR.y, 40], [DOCKS[0].x + 6, DOCKS[0].y + 9, 62], [DOCKS[1].x + 34, DOCKS[1].y + 9, 62]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, D, slab, cyl, screws, base, label, ruler, lamp, faceY, screen, cable, shadow, pick, thumb, handset } = kitFor(P, { lod });
  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);

  // ── What both phones show: the same report, drawn by the same code ─────
  const gw = PHONE.w - 2.6;
  const gh = PHONE.h - 2.6;
  const row = (y, len, done) =>
    `<rect class="scr-f" x="2.4" y="${y}" width="${gw - 4.8}" height="6.2" rx="1.6"/>` +
    (done ? `<circle class="scr-f" data-t="hi" cx="5.8" cy="${y + 3.1}" r="1.5"/>` : `<circle class="scr-s" cx="5.8" cy="${y + 3.1}" r="1.5"/>`) +
    `<path class="scr-s" data-t="hi" d="M9.4 ${y + 2.5}h${len}"/>` +
    pick(`<path class="scr-s" data-t="dim" d="M9.4 ${y + 4.5}h${len * 0.6}"/>`);
  const ui = (kind, { live = true, fresh = false } = {}) => {
    const out = [pick(`<text class="scr-t" data-t="dim" x="2.6" y="4.5" font-size="2.2">9:41</text>`)];
    out.push(`<text class="scr-t" x="2.4" y="11" font-size="3.1" font-weight="600">Parte 0142</text>`, pick(`<path class="scr-s" data-t="dim" d="M2.4 13.4h11"/>`));
    out.push(row(15.6, 10, true), row(23, 12, false));
    // The row the change adds, and the badge the native module leaves on it.
    const added =
      `<rect class="scr-f" data-t="acc" x="2.4" y="30.4" width="${gw - 4.8}" height="6.2" rx="1.6"/>` +
      `<circle class="scr-f" data-t="hi" cx="5.8" cy="33.5" r="1.5" opacity=".9"/><path d="M9.4 32.9h9" fill="none" stroke="#1a0a03" stroke-width=".8" stroke-linecap="round"/>`;
    out.push(live ? `<g data-new="" opacity="0">${added}</g>` : fresh ? added : "");
    if (live) out.push(`<g data-scan="" opacity="0"><rect x="${gw - 8.4}" y="31.5" width="4.6" height="4" rx=".8" fill="#1a0a03"/><path d="M${gw - 7.4} 32.5v2M${gw - 6.3} 32.5v2M${gw - 5.2} 32.5v2" stroke="#ff5a1f" stroke-width=".55"/></g>`);
    // Only the chrome differs: one has a wide button and a bar, the other a round one and three keys.
    if (kind === "a") {
      out.push(`<rect class="scr-f" data-t="hi" x="2.4" y="40.2" width="${gw - 4.8}" height="5.4" rx="2.7"/>`, `<rect class="scr-f" data-t="mid" x="${gw / 2 - 4.6}" y="${gh - 2.7}" width="9.2" height="1" rx=".5"/>`);
    } else {
      out.push(`<circle class="scr-f" data-t="hi" cx="${gw - 6}" cy="42.4" r="3.4"/>`);
      out.push(
        `<path class="scr-s" d="M${gw / 2 - 8.2} ${gh - 3.4}l2.3-1.4v2.8z"/><circle class="scr-s" cx="${gw / 2}" cy="${gh - 3.4}" r="1.25"/><rect class="scr-s" x="${gw / 2 + 6}" y="${gh - 4.5}" width="2.3" height="2.3" rx=".3"/>`,
      );
    }
    return out.join("");
  };

  // ── A dock with its phone, and the small module only that phone uses ───
  const dock = (i, { live = true, fresh = false } = {}) => {
    const plan = DOCKS[i];
    const out = [slab(plan, 0, DOCK_H, "mid", { steps: 5, bevel: 0.7, seam: 2 })];
    out.push(L(k.planOutline({ x: plan.x + 4, y: plan.y + 7, w: 32, d: 7.4, r: 2 }, DOCK_H, P, 4), { tone: "lo", fine: true }));
    out.push(...screws([[plan.x + 4, plan.y + 4], [plan.x + plan.w - 4, plan.y + 4]], DOCK_H, 0.9, 0.4));
    out.push(handset(phoneOf(plan), ui(i ? "b" : "a", { live, fresh }), { kind: i ? "b" : "a" }));
    out.push(lamp(plan.x + plan.w - 5, plan.y + plan.d - 4.5, DOCK_H, 1.8, `dock-${i}`, !live && fresh));
    return out.join("");
  };
  const native = (i, { on = false, hooks = true } = {}) => {
    const plan = nativeOf(DOCKS[i]);
    const out = [slab(plan, 0, NATIVE_H, "hi", { steps: 4, bevel: 0.6, crease: "lo", seam: 3 })];
    // A lens on top and a short aerial: the camera and the radio of the phone.
    out.push(cyl(plan.x + 6, plan.y + 7.4, 3.6, NATIVE_H, 1.2, "mid", { steps: 22 }));
    out.push(`<g${hooks ? ` data-part="nat-${i}"` : ""} class="veo-lamp"${on ? ' data-on=""' : ""}>${cyl(plan.x + 6, plan.y + 7.4, 2.3, NATIVE_H + 1.2, 1.4, "hi", { steps: 18, crease: "lo" })}</g>`);
    out.push(cyl(plan.x + 11.4, plan.y + 3, 0.7, NATIVE_H, 7, "mid", { steps: 8, crease: "none" }), D([at([plan.x + 11.4, plan.y + 3, NATIVE_H + 7.4])], { size: 0.7, tone: "hi", keep: true }));
    return out.join("");
  };

  // ── The console: one screen of code and a keyboard ─────────────────────
  const consoleUnit = ({ hooks = true, lit = false } = {}) => {
    const out = [slab(CONSOLE, 0, CONSOLE.h, "mid", { steps: 4, bevel: 0.7, seam: 6 })];
    const sw = CONSOLE.w - 10;
    const lines = [10, 22, 17, 26, 14, 20];
    const code = lines
      .map((len, i) => (i === 3 ? "" : `<path class="scr-s" data-t="dim" d="M${4 + (i % 3 === 1 ? 3 : 0)} ${5 + i * 3.4}h${len}"/>`))
      .join("");
    const hot = `<path class="scr-s" data-t="acc" d="M7 15.2h26"/>`;
    out.push(
      faceY(
        CONSOLE.x + 5,
        CONSOLE.y + CONSOLE.d,
        CONSOLE.h - 5,
        screen(sw, 24, pick(code, `<path class="scr-s" data-t="dim" d="M4 5h10M7 8.4h22M4 11.8h17M4 18.6h14"/>`) + (hooks ? `<g data-part="code" opacity="0">${hot}</g><path class="scr-s" data-t="dim" data-part="code-rest" d="M7 15.2h26"/>` : lit ? hot : `<path class="scr-s" data-t="dim" d="M7 15.2h26"/>`), 1.6),
      ),
    );
    out.push(...screws(k.corners(CONSOLE, 3.4), CONSOLE.h, 0.9, 0.42));
    out.push(lamp(CONSOLE.x + CONSOLE.w - 8, CONSOLE.y + 8, CONSOLE.h, 2, hooks ? "src" : "", lit));
    // The keyboard: three rows of keys on a low slab.
    out.push(slab(KEYS, 0, KEYS.h, "mid", { steps: 3, bevel: 0.4 }));
    for (let r = 0; r < 3; r++) {
      out.push(L(k.lineOnTop([KEYS.x + 4 + r, KEYS.y + 2.8 + r * 2.8], [KEYS.x + KEYS.w - 5 + r, KEYS.y + 2.8 + r * 2.8], KEYS.h, P), { tone: r === 2 ? "mid" : "lo", free: true, fine: true }));
    }
    out.push(slab({ x: KEYS.x + 14, y: KEYS.y + 1.6, w: 22, d: 7.6, r: 1 }, KEYS.h, 0.9, "hi", { steps: 2, bevel: 0.2, crease: "lo" }));
    return out.join("");
  };

  // ── The bridge: one line in, two out ───────────────────────────────────
  const bridge = ({ on = false, hooks = true } = {}) =>
    slab(BRIDGE, 0, BRIDGE.h, "hi", { steps: 4, bevel: 0.6, crease: "lo", seam: 2 }) +
    `<g${hooks ? ' data-part="bridge"' : ""} class="veo-lamp"${on ? ' data-on=""' : ""}>${cyl(BRIDGE.x + BRIDGE.w / 2, BRIDGE.y + BRIDGE.d / 2, 2.2, BRIDGE.h, 1.5, "hi", { steps: 18, crease: "lo" })}</g>`;

  // ── The monitor: the same logic, on the web ────────────────────────────
  const monitor = ({ hooks = true, fresh = false } = {}) => {
    const cx = MONITOR.x + MONITOR.w / 2;
    const out = [slab({ x: cx - 9, y: MONITOR.y - 3, w: 18, d: 10, r: 2 }, 0, 2, "mid", { steps: 4, bevel: 0.4 })];
    out.push(cyl(cx, MONITOR.y + 1.5, 1.8, 2, MONITOR.z - 2, "mid", { steps: 12, crease: "none" }));
    out.push(slab(MONITOR, MONITOR.z, MONITOR.h, "hi", { steps: 3, bevel: 0.4, crease: "lo" }));
    const sw = MONITOR.w - 3;
    const added = `<rect class="scr-f" data-t="acc" x="18.4" y="13.2" width="12.6" height="5" rx="1.2"/>`;
    out.push(
      faceY(
        MONITOR.x + 1.5,
        MONITOR.y + MONITOR.d,
        MONITOR.z + MONITOR.h - 1.5,
        screen(
          sw,
          MONITOR.h - 3,
          `<path class="scr-s" data-t="dim" d="M0 4h${sw}"/><circle class="scr-f" data-t="mid" cx="2.4" cy="2" r=".7"/>` +
            pick(`<circle class="scr-f" data-t="mid" cx="4.8" cy="2" r=".7"/><rect class="scr-f" x="9" y="1" width="16" height="2" rx="1"/>`) +
            `<rect class="scr-f" x="2.4" y="6.6" width="12.6" height="5" rx="1.2"/><rect class="scr-f" x="18.4" y="6.6" width="12.6" height="5" rx="1.2"/><rect class="scr-f" x="2.4" y="13.2" width="12.6" height="5" rx="1.2"/>` +
            (hooks ? `<g data-part="web-new" opacity="0">${added}</g>` : fresh ? added : ""),
          1.2,
        ),
      ),
    );
    return out.join("");
  };

  // ── Spare modules in a tray: a lens and a reader coil, waiting their turn ─
  const spares = () => {
    const tray = { x: 70, y: -27, w: 44, d: 17, r: 2 };
    const out = [slab(tray, 0, 2, "lo", { steps: 3, bevel: 0.3 }), L(k.planOutline(k.insetPlan(tray, 2), 2, P, 3), { tone: "faint" })];
    out.push(slab({ x: tray.x + 5, y: tray.y + 3.5, w: 12, d: 10, r: 1.6 }, 2, 5, "hi", { steps: 3, bevel: 0.4, crease: "lo" }));
    out.push(cyl(tray.x + 11, tray.y + 8.5, 2.6, 7, 1, "mid", { steps: 18 }), cyl(tray.x + 11, tray.y + 8.5, 1.5, 8, 1, "hi", { steps: 14, crease: "lo" }));
    out.push(slab({ x: tray.x + 25, y: tray.y + 3.5, w: 12, d: 10, r: 1.6 }, 2, 5, "hi", { steps: 3, bevel: 0.4, crease: "lo" }));
    out.push(L(k.ring(tray.x + 31, tray.y + 8.5, 3.4, 7, P, 20) + k.ring(tray.x + 31, tray.y + 8.5, 2.2, 7, P, 16), { tone: "mid", fine: true }), D([at([tray.x + 31, tray.y + 8.5, 7])], { size: 0.6, tone: "hi" }));
    return out.join("");
  };

  const body = [
    base(PLATE),
    wire(WEB.slice(1), "web"),
    monitor(),
    consoleUnit(),
    wire(WEB.slice(0, 2), "web-b"),
    wire(TRUNK, "trunk"),
    bridge(),
    wire(OUT_A, "out-0"),
    wire(OUT_B, "out-1"),
    dock(0),
    wire(nativeLine(DOCKS[0]), "nat-line-0"),
    native(0),
    ruler({ x: -30, y: 42, w: 70, d: 6, r: 1 }),
    label({ x: 44, y: -46, w: 66, d: 11, r: 1 }, "UN CÓDIGO · DOS SISTEMAS"),
    spares(),
    dock(1),
    wire(nativeLine(DOCKS[1]), "nat-line-1"),
    native(1),
    `<g data-part="beads">${[0, 1, 2].map((i) => `<g data-bead="${i}" opacity="0"><circle class="veo-bead" r="2.3"/></g>`).join("")}</g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const stub = (points, on = true) => wire(points, "", on);
  const still = { live: false, fresh: true };
  const parts = {
    // The two docks side by side: on the bench they stand further apart.
    phones: part(
      [
        shadow({ x: DOCKS[0].x, y: DOCKS[0].y, w: 92, d: 22, r: 4 }),
        stub([[-62, 4, 0.9], [-62, DOCKS[0].y, 0.9], [-62, DOCKS[0].y, 3]]),
        dock(0, still),
        `<g transform="${k.translateAlong(P, [-102, 0, 0])}">${dock(1, still)}</g>`,
      ],
      k.boxCorners({ x: DOCKS[0].x, y: DOCKS[0].y, w: 92, d: 22 }, 0, DOCK_H + PHONE.h),
      16,
    ),
    native: part(
      [
        shadow({ x: DOCKS[1].x + 34, y: DOCKS[1].y + 1, w: 30, d: 18, r: 4 }),
        stub([[DOCKS[1].x + 48, DOCKS[1].y + 10, 4], [DOCKS[1].x + 40, DOCKS[1].y + 10, 0.9], [DOCKS[1].x + 33, DOCKS[1].y + 10, 0.9]]),
        cyl(DOCKS[1].x + 32, DOCKS[1].y + 10, 2.2, 0, 2.4, "hi", { steps: 14, crease: "lo" }),
        native(1, { on: true, hooks: false }),
      ],
      k.boxCorners({ x: DOCKS[1].x + 30, y: DOCKS[1].y + 1, w: 34, d: 18 }, 0, NATIVE_H + 9),
      20,
    ),
    source: part([shadow({ x: CONSOLE.x, y: CONSOLE.y + 4, w: CONSOLE.w, d: 30, r: 3 }), consoleUnit({ hooks: false, lit: true })], k.boxCorners({ ...CONSOLE, d: 32 }, 0, CONSOLE.h + 4), 14),
    web: part(
      [shadow({ x: MONITOR.x + 4, y: MONITOR.y - 4, w: 28, d: 14, r: 4 }), monitor({ hooks: false, fresh: true }), stub([[-86, -29, 0.9], [-98, -29, 0.9], [-98, -37, 0.9], [-98, -37, 2]])],
      [...k.boxCorners({ x: MONITOR.x, y: MONITOR.y - 3, w: MONITOR.w, d: 16 }, 0, MONITOR.z + MONITOR.h + 2)],
      16,
    ),
    detail: part(
      [shadow({ x: BRIDGE.x - 6, y: BRIDGE.y - 6, w: BRIDGE.w + 12, d: BRIDGE.d + 10, r: 4 }), stub([[-22, -11, 0.9], [-3, -11, 0.9], [-3, BRIDGE.y, 0.9], [-3, BRIDGE.y, 3]]), bridge({ on: true, hooks: false }), stub([OUT_A[0], OUT_A[1], [-30, -1, 0.9]]), stub([OUT_B[0], OUT_B[1], [24, -1, 0.9]])],
      k.boxCorners({ x: -30, y: -13, w: 54, d: 20 }, 0, 8),
      16,
    ),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("twinbench", {
  width: W,
  height: H,
  label:
    "Un banco de doble salida sobre una placa: al fondo, una consola con su teclado y, a su lado, un monitor; delante, un puente del que salen dos cables hacia dos bases, cada una con un teléfono de pie y un pequeño módulo propio. Lo que se escribe en la consola baja al puente y llega a la vez a los dos teléfonos, que muestran la misma pantalla con los controles de su sistema; el monitor enseña la misma lógica en la web.",
  body: full.body,
  motion: { P, trunk: flat(TRUNK), outs: [flat(OUT_A), flat(OUT_B)], natives: DOCKS.map((dock) => flat(nativeLine(dock))), web: flat([...WEB]) },
  thumb: small.body
    .join("")
    .replace(/<g data-new="" opacity="0">/g, "<g>")
    .replace(/data-part="dock-(\d)" class="veo-lamp"/g, 'class="veo-lamp" data-on=""')
    .replace(/data-part="out-(\d)"/g, 'data-on=""'),
  parts: full.parts,
});
