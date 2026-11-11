// Signed updates: the seal and the handover. On the left a press stamps a seal on each
// new version, with the key that never leaves the strongbox beside it. The version
// stops at the rack, first in the test channel and then in the stable one, and rides
// the lane to the workstation. There a verifier looks at the seal: the version whose
// seal is broken goes to the tray; the one that passes drops into the second bay, and
// a switch hands control to it. If it does not start, the switch slides back.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const LANE = { x: -112, y: -8, w: 156, d: 14, r: 1.5, h: 2 };
const MID = -1;
const PACK = { x: -106, y: MID - 6, w: 12, d: 12, r: 1.2, h: 7 };
const COLUMN = { x: -106, y: -30, w: 12, d: 12, r: 1.6, h: 26 };
const ARM = { x: -104.5, y: -18, w: 9, d: 22, r: 1.2, z: 19, h: 5 };
const HEAD = { x: -100, y: MID, r: 4.6, z: 12.4, h: 6, stroke: -2.4 };
const SAFE = { x: -123, y: 12, w: 17, d: 14, r: 2, h: 11 };
const RACK = { x: -78, y: -32, w: 58, d: 13, h: 18 };
const BAYS = [
  { name: "PRUEBAS", x: RACK.x + 1.5 },
  { name: "ESTABLE", x: RACK.x + 30 },
];
const CHECK = { x: 24, top: 17 };
const TRAY = { x: 7, y: LANE.y + LANE.d, w: 20, d: 24, r: 1.5, h: 5 };
const DOCK = { x: 44, y: -13, w: 46, d: 23, r: 1.5 };
const SLOTS = [50, 71];
const RAIL = { x: 50, y: 13, w: 36, d: 6, r: 3 };
const KNOB = { old: 77, fresh: 56 };
const SCREEN = { x: 46, y: -38, w: 44, h: 24, neck: 6 };
// How far the version travels from under the press.
const GO = { test: BAYS[0].x + 8 - PACK.x, stable: BAYS[1].x + 8 - PACK.x, tamper: -14 - PACK.x, check: CHECK.x - 1 - PACK.w - PACK.x, bay: SLOTS[0] - PACK.x, tray: 21, knob: KNOB.fresh - KNOB.old };

const KEY_LINE = [
  [SAFE.x + SAFE.w, SAFE.y + 7, 3],
  [SAFE.x + SAFE.w + 2, SAFE.y + 7, 0.9],
  [HEAD.x, SAFE.y + 7, 0.9],
  [HEAD.x, LANE.y + LANE.d + 0.4, 0.9],
];
const SCREEN_LINE = [
  [DOCK.x + 24, DOCK.y, 3],
  [DOCK.x + 24, DOCK.y - 2, 0.9],
  [DOCK.x + 24, SCREEN.y + 6, 0.9],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [COLUMN.x, COLUMN.y, 36], [SCREEN.x + SCREEN.w, SCREEN.y, 34]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, slab, cyl, screws, base, label, lamp, top, faceY, faceX, cable, shadow, pick, thumb, display, windowBar } = kitFor(P, { lod });
  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);
  const bulb = (x, y, z, r, part, on = false, ok = false) => {
    const svg = lamp(x, y, z, r, part, on);
    return ok ? svg.replace('class="veo-lamp"', 'class="veo-lamp" data-tone="ok"') : svg;
  };

  // ── A version, with its seal on top ────────────────────────────────────
  const pack = ({ hooks = true, seal = "whole", plan = PACK } = {}) => {
    const zt = LANE.h + PACK.h;
    const cx = plan.x + plan.w / 2;
    const cy = plan.y + plan.d / 2;
    const out = [slab(plan, LANE.h, PACK.h, "hi", { steps: 3, bevel: 0.5, crease: "lo" })];
    out.push(L(k.lineOnTop([cx, plan.y + 0.5], [cx, plan.y + plan.d - 0.5], zt, P), { tone: "lo", free: true, fine: true }));
    out.push(faceY(plan.x + 2, plan.y + plan.d, zt - 1.4, pick(`<path class="ui-s" data-t="lo" d="M0 0h8M0 2h5"/>`)));
    const whole = cyl(cx, cy, 3.4, zt, 0.9, "hi", { steps: 22, crease: "lo", lit: true }) + L(k.ring(cx, cy, 2, zt + 0.9, P, 18), { tone: "lit" });
    const broken = L(k.ring(cx, cy, 3.4, zt + 0.04, P, 22) + k.lineOnTop([cx - 2.1, cy - 2.1], [cx + 2.1, cy + 2.1], zt + 0.04, P) + k.lineOnTop([cx + 2.1, cy - 2.1], [cx - 2.1, cy + 2.1], zt + 0.04, P), { tone: "lit", free: true });
    out.push(hooks ? `<g data-part="seal" opacity="0">${whole}</g><g data-part="broken" opacity="0">${broken}</g>` : seal === "whole" ? whole : seal === "broken" ? broken : "");
    return out.join("");
  };

  const lane = (plan = LANE) => {
    const out = [slab(plan, 0, LANE.h, "lo", { steps: 3, bevel: 0.3, seam: 0.9 })];
    out.push(L(k.lineOnTop([plan.x + 3, plan.y + 2], [plan.x + plan.w - 1, plan.y + 2], LANE.h, P) + k.lineOnTop([plan.x + 3, plan.y + plan.d - 2], [plan.x + plan.w - 1, plan.y + plan.d - 2], LANE.h, P), { tone: "mid", free: true, fine: true }));
    return out.join("");
  };

  // ── The press and the strongbox with the key ───────────────────────────
  const column = () => slab(COLUMN, 0, COLUMN.h, "mid", { steps: 4, bevel: 0.6, seam: 6 }) + faceY(COLUMN.x + 3, COLUMN.y + COLUMN.d, 16, pick(`<rect class="ui-s" data-t="lo" width="6" height="9" rx=".8"/><path class="ui-s" data-t="lo" d="M1.4 2.4h3.2M1.4 4.4h3.2M1.4 6.4h3.2"/>`));
  const head = () => cyl(HEAD.x, HEAD.y, 1.4, HEAD.z + HEAD.h, 6, "lo", { steps: 12, crease: "none" }) + cyl(HEAD.x, HEAD.y, HEAD.r, HEAD.z, HEAD.h, "hi", { steps: 26, bevel: 0.5, crease: "lo" }) + L(k.sideArc(HEAD.x, HEAD.y, HEAD.r, HEAD.z + 2, P, 20), { tone: "mid", fine: true });
  const arm = ({ hooks = true, on = false } = {}) => slab(ARM, ARM.z, ARM.h, "mid", { steps: 3, bevel: 0.5, seam: ARM.z + 2 }) + bulb(ARM.x + ARM.w / 2, ARM.y + ARM.d - 4, ARM.z + ARM.h, 1.7, hooks ? "sealing" : "", on);
  const safe = () => {
    const out = [slab(SAFE, 0, SAFE.h, "hi", { steps: 4, bevel: 0.7, crease: "lo", seam: 3 })];
    out.push(faceY(SAFE.x + 2, SAFE.y + SAFE.d, SAFE.h - 1.6, `<rect class="ui-s" data-t="mid" width="14" height="8.8" rx="1"/><circle class="ui-s" data-t="hi" cx="5" cy="4.4" r="1.9"/><path class="ui-s" data-t="hi" d="M6.9 4.4h5M9.6 4.4v1.7M11.9 4.4v1.7"/>`));
    out.push(...screws([[SAFE.x + 3, SAFE.y + 3], [SAFE.x + SAFE.w - 3, SAFE.y + 3]], SAFE.h, 0.9, 0.42));
    return out.join("");
  };

  // ── The rack: one compartment per channel ──────────────────────────────
  const rack = ({ hooks = true, on = -1 } = {}) => {
    const out = [slab({ x: RACK.x, y: RACK.y, w: RACK.w, d: RACK.d, r: 0.6 }, 0, 1.4, "lo", { steps: 2, bevel: 0.2 })];
    out.push(slab({ x: RACK.x, y: RACK.y, w: RACK.w, d: 1.4, r: 0.4 }, 1.4, RACK.h - 5.4, "mid", { steps: 1, bevel: 0.2 }));
    const wall = (x) => slab({ x, y: RACK.y, w: 1.5, d: RACK.d, r: 0.4 }, 1.4, RACK.h - 5.4, "mid", { steps: 1, bevel: 0.2 });
    out.push(wall(RACK.x));
    BAYS.forEach((bay, i) => {
      // A version already in the channel.
      out.push(slab({ x: bay.x + 7, y: RACK.y + 3, w: 12, d: 8, r: 1 }, 1.4, 6, "hi", { steps: 2, bevel: 0.3, crease: "lo" }));
      out.push(wall(i ? RACK.x + RACK.w - 1.5 : RACK.x + 28.2));
    });
    out.push(slab({ x: RACK.x, y: RACK.y, w: RACK.w, d: RACK.d, r: 0.6 }, RACK.h - 4, 4, "hi", { steps: 2, bevel: 0.4, crease: "lo" }));
    BAYS.forEach((bay, i) => {
      out.push(faceY(bay.x + 2, RACK.y + RACK.d, RACK.h - 0.6, `<text class="ui-t" x="11" y="2.5" font-size="2.5" text-anchor="middle" opacity=".85">${bay.name}</text>`));
      out.push(bulb(bay.x + 22, RACK.y + 4, RACK.h, 1.6, hooks ? `channel-${i}` : "", on === i, true));
    });
    return out.join("");
  };

  // ── The verifier and the tray for what it turns down ───────────────────
  const post = () => slab({ x: CHECK.x, y: -20, w: 4.4, d: 4.4, r: 0.9 }, 0, CHECK.top, "mid", { steps: 2, bevel: 0.4 });
  const beam = ({ hooks = true, state = "" } = {}) => {
    const out = [cyl(CHECK.x + 2.2, MID, 3.6, CHECK.top - 4.4, 4.4, "hi", { steps: 22, bevel: 0.4, crease: "lo" })];
    out.push(cyl(CHECK.x + 2.2, MID, 2.2, CHECK.top - 4.5, 0.1, "hi", { steps: 18, className: "veo-dark", crease: "none" }));
    out.push(slab({ x: CHECK.x - 0.8, y: -20, w: 6, d: 27, r: 1 }, CHECK.top, 3.6, "mid", { steps: 3, bevel: 0.5, seam: CHECK.top + 1.6 }));
    out.push(bulb(CHECK.x + 2.2, -10, CHECK.top + 3.6, 1.5, hooks ? "pass" : "", state === "ok", true));
    out.push(bulb(CHECK.x + 2.2, 3, CHECK.top + 3.6, 1.5, hooks ? "refuse" : "", state === "no"));
    return out.join("");
  };
  const trayBack = () => slab(TRAY, 0, 1.2, "lo", { steps: 3, bevel: 0.2 }) + slab({ x: TRAY.x, y: TRAY.y, w: 1.2, d: TRAY.d, r: 0.4 }, 1.2, TRAY.h - 1.2, "mid", { steps: 1, bevel: 0.2 });
  const trayFront = () =>
    slab({ x: TRAY.x + TRAY.w - 1.2, y: TRAY.y, w: 1.2, d: TRAY.d, r: 0.4 }, 1.2, TRAY.h - 1.2, "mid", { steps: 1, bevel: 0.2 }) +
    slab({ x: TRAY.x, y: TRAY.y + TRAY.d - 1.2, w: TRAY.w, d: 1.2, r: 0.4 }, 1.2, TRAY.h - 1.2, "mid", { steps: 1, bevel: 0.2 }) +
    faceY(TRAY.x + 4, TRAY.y + TRAY.d, 4.4, `<path class="ui-s" data-t="hi" d="M1.6 .4l2.4 2.4M4 .4L1.6 2.8"/>${pick(`<path class="ui-s" data-t="lo" d="M6.2 1.6h6"/>`)}`);

  // ── The workstation: two bays and the switch that hands over ───────────
  const dockBack = ({ hooks = true, active = "old" } = {}) => {
    const out = [slab(DOCK, 0, LANE.h, "lo", { steps: 3, bevel: 0.3 })];
    out.push(slab({ x: DOCK.x, y: DOCK.y, w: DOCK.w, d: 3, r: 0.6 }, LANE.h, 8, "mid", { steps: 2, bevel: 0.3, seam: 5 }));
    out.push(bulb(SLOTS[0] + 6, DOCK.y + 1.5, LANE.h + 8, 1.3, hooks ? "active-new" : "", active === "new", true));
    out.push(bulb(SLOTS[1] + 6, DOCK.y + 1.5, LANE.h + 8, 1.3, hooks ? "active-old" : "", active === "old" || hooks, true));
    return out.join("");
  };
  const dockFront = () =>
    slab({ x: 65, y: DOCK.y + 3, w: 2, d: DOCK.d - 5, r: 0.5 }, LANE.h, 3, "mid", { steps: 1, bevel: 0.2 }) +
    pack({ hooks: false, seal: "whole", plan: { ...PACK, x: SLOTS[1] } }) +
    slab({ x: DOCK.x + DOCK.w - 2, y: DOCK.y, w: 2, d: DOCK.d, r: 0.5 }, LANE.h, 8, "mid", { steps: 1, bevel: 0.3 }) +
    slab({ x: DOCK.x, y: DOCK.y + DOCK.d - 2, w: DOCK.w, d: 2, r: 0.5 }, LANE.h, 3, "mid", { steps: 1, bevel: 0.2 });
  const rail = () =>
    slab(RAIL, 0, 2.4, "lo", { steps: 5, bevel: 0.3 }) +
    L(k.lineOnTop([KNOB.fresh, RAIL.y + 3], [KNOB.old, RAIL.y + 3], 2.4, P), { tone: "mid", free: true }) +
    top(SLOTS[0], RAIL.y + 8, 0.05, `<text class="ui-t" x="6" y="3" font-size="3" text-anchor="middle" opacity=".75">NUEVA</text>`) +
    top(SLOTS[1], RAIL.y + 8, 0.05, `<text class="ui-t" x="6" y="3" font-size="3" text-anchor="middle" opacity=".75">ACTUAL</text>`);
  const knob = () => cyl(KNOB.old, RAIL.y + 3, 3.2, 2.4, 4.4, "hi", { steps: 22, bevel: 0.6, crease: "lo", lit: true }) + L(k.knurl(KNOB.old, RAIL.y + 3, 3.2, 2.4, 6.2, 18, P), { tone: "lit", fine: true });
  const gw = SCREEN.w - 2.4;
  const ui = ({ hooks = true, state = "old" } = {}) => {
    const out = [windowBar(gw, "app")];
    const version = (text, acc) => `<text class="scr-t"${acc ? ' data-t="acc"' : ""} x="${gw / 2}" y="16" font-size="6.4" font-weight="600" text-anchor="middle">${text}</text>`;
    const failed = `<path class="scr-s" data-t="acc" d="M${gw / 2 - 4} 9.4l8 8M${gw / 2 + 4} 9.4l-8 8"/>`;
    if (hooks) out.push(`<g data-part="ver-old">${version("v 2.4")}</g><g data-part="ver-new" opacity="0">${version("v 2.5", true)}</g><g data-part="ver-fail" opacity="0">${failed}</g>`);
    else out.push(state === "new" ? version("v 2.5", true) : state === "fail" ? failed : version("v 2.4"));
    return out.join("");
  };
  const screenOn = (opts) => display(SCREEN, ui(opts));

  const body = [
    base(PLATE),
    column(),
    rack(),
    screenOn(),
    wire(SCREEN_LINE, "screen-line"),
    post(),
    lane(),
    dockBack(),
    trayBack(),
    `<g data-part="pack" opacity="0">${pack()}</g>`,
    `<g data-part="head">${head()}</g>`,
    arm(),
    beam(),
    trayFront(),
    wire(KEY_LINE, "key-line"),
    safe(),
    dockFront(),
    rail(),
    `<g data-part="knob">${knob()}</g>`,
    label({ x: -118, y: 37, w: 72, d: 11, r: 1 }, "SELLO · CANAL · VERIFICACIÓN"),
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const move = (by, svg) => `<g transform="${k.translateAlong(P, by)}">${svg}</g>`;
  const piece = (x0, x1) => ({ ...LANE, x: x0, w: x1 - x0 });
  const parts = {
    signer: part(
      [shadow({ x: SAFE.x, y: COLUMN.y, w: 40, d: 56, r: 4 }), column(), lane(piece(-112, -84)), pack({ hooks: false }), move([0, 0, HEAD.stroke * 0.4], head()), arm({ hooks: false, on: true }), wire(KEY_LINE, "", true), safe()],
      [...k.boxCorners({ x: SAFE.x, y: COLUMN.y, w: 40, d: 56 }, 0, 4), [COLUMN.x, COLUMN.y, COLUMN.h + 4]],
      10,
    ),
    shelf: part(
      [shadow({ x: RACK.x - 2, y: RACK.y, w: RACK.w + 4, d: 40, r: 4 }), rack({ hooks: false, on: 1 }), lane(piece(RACK.x - 2, RACK.x + RACK.w + 2)), move([GO.stable, 0, 0], pack({ hooks: false }))],
      [...k.boxCorners({ x: RACK.x - 2, y: RACK.y, w: RACK.w + 4, d: 40 }, 0, 4), [RACK.x, RACK.y, RACK.h + 4]],
      10,
    ),
    verifier: part(
      [shadow({ x: TRAY.x - 6, y: -22, w: 34, d: 52, r: 4 }), post(), lane(piece(TRAY.x - 8, CHECK.x + 12)), trayBack(), move([GO.check, 0, 0], pack({ hooks: false })), beam({ hooks: false, state: "ok" }), trayFront()],
      [...k.boxCorners({ x: TRAY.x - 8, y: -22, w: 38, d: 52 }, 0, 4), [CHECK.x, -20, CHECK.top + 7]],
      10,
    ),
    swap: part(
      [shadow({ x: DOCK.x, y: SCREEN.y - 2, w: DOCK.w, d: 62, r: 4 }), screenOn({ hooks: false, state: "new" }), wire(SCREEN_LINE, "", true), dockBack({ hooks: false, active: "new" }), move([GO.bay, 0, 0], pack({ hooks: false })), dockFront(), rail(), move([GO.knob, 0, 0], knob())],
      [...k.boxCorners({ x: DOCK.x, y: SCREEN.y, w: DOCK.w, d: 64 }, 0, 4), [SCREEN.x, SCREEN.y, SCREEN.neck + SCREEN.h + 3]],
      10,
    ),
    detail: part([shadow({ x: PACK.x - 2, y: PACK.y - 2, w: PACK.w + 4, d: PACK.d + 4, r: 3 }), lane(piece(PACK.x - 5, PACK.x + PACK.w + 5)), pack({ hooks: false })], k.boxCorners({ x: PACK.x - 5, y: LANE.y, w: PACK.w + 10, d: LANE.d }, 0, LANE.h + PACK.h + 2), 12),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");

save("sealgate", {
  width: W,
  height: H,
  label:
    "Un puesto de sello y relevo sobre una placa. A la izquierda, una prensa sobre el inicio de una vía y, delante, una caja fuerte con la llave. A continuación, un estante con dos huecos, pruebas y estable. La vía sigue hasta un verificador con una lente y una bandeja para lo que rechaza, y termina en un puesto con dos ranuras, nueva y actual, un interruptor deslizante delante y una pantalla detrás que muestra la versión en uso.",
  body: full.body,
  motion: { P, go: GO, stroke: HEAD.stroke },
  thumb: small.body
    .join("")
    .replace('<g data-part="pack" opacity="0">', `<g transform="${k.translateAlong(P, [GO.stable, 0, 0])}">`)
    .replace('<g data-part="seal" opacity="0">', "<g>")
    .replace('<g data-part="channel-1" class="veo-lamp" data-tone="ok">', '<g class="veo-lamp" data-tone="ok" data-on="">')
    .replace('<g data-part="active-old" class="veo-lamp" data-tone="ok" data-on="">', '<g class="veo-lamp" data-tone="ok" data-on="">'),
  parts: full.parts,
});
