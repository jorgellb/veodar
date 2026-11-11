// Astro: a page press. Sheets of content leave a tray, pass under a composing head
// and come out as finished pages that stack by a screen. A small side module only
// wakes up for the pages that carry an interactive part.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const TRAY = { x: -118, y: -22, w: 36, d: 44, r: 3, h: 7 };
const BED = { x: -76, y: -14, w: 150, d: 28, r: 2, h: 10 };
const GX = -20; // the head stands over this x
const HEAD = { x: GX - 11, y: -12, w: 22, d: 24, r: 1.6, h: 9 };
const HEAD_UP = 25;
const HEAD_DOWN = BED.h + 1;
const SHEET = { w: 20, d: 20, h: 0.9 };
const START = -64; // where a sheet lands on the bed
const END = 84; // where it leaves it
const STACK = { x: 80, y: -17, w: 30, d: 34, r: 2, h: 5 };
const MON = { x: 58, y: -46, w: 58, d: 5, r: 2, z: 12, h: 42 };
const ISLE = { x: 18, y: 14, w: 30, d: 17, r: 2.4, h: 15 };

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [GX - 7, -27, 58], [GX + 7, 27, 58], [MON.x + MON.w, MON.y, MON.z + MON.h + 2]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, D, slab, cyl, screws, base, label, ruler, lamp, knob, faceY, screen, shadow, pick } = kitFor(P, { lod });

  // ── Content tray: a stack of sheets waiting ────────────────────────────
  const tray = () => {
    const out = [slab(TRAY, 0, TRAY.h, "mid", { steps: 4, bevel: 0.6, seam: 2.5 })];
    for (let i = 0; i < 5; i++) out.push(slab({ x: TRAY.x + 7 + i * 0.4, y: TRAY.y + 8 - i * 0.3, w: 22, d: 28, r: 0.8 }, TRAY.h + i * 1.3, 1, "hi", { steps: 2, bevel: 0, crease: "lo" }));
    const zt = TRAY.h + 4 * 1.3 + 1.02;
    const x0 = TRAY.x + 12;
    out.push(L([5, 9, 13, 17, 21].map((dy, i) => k.lineOnTop([x0, TRAY.y + 8 + dy], [x0 + [14, 11, 13, 8, 12][i], TRAY.y + 8 + dy], zt, P)).join(""), { tone: "mid", free: true, fine: true }));
    out.push(L(k.lineOnTop([x0, TRAY.y + 11.4], [x0 + 9, TRAY.y + 11.4], zt, P), { tone: "hi", free: true }));
    // A feed lip toward the bed.
    out.push(slab({ x: TRAY.x + TRAY.w, y: -10, w: 6, d: 20, r: 0.8 }, 0, 8, "mid", { steps: 2, bevel: 0.3 }));
    return out.join("");
  };

  // ── The bed the sheets travel on, with its two guides ──────────────────
  const bed = (x0 = BED.x, x1 = BED.x + BED.w) => {
    const plan = { ...BED, x: x0, w: x1 - x0 };
    return (
      slab(plan, 0, BED.h, "mid", { steps: 3, bevel: 0.5, seam: 3 }) +
      slab({ x: x0, y: BED.y, w: x1 - x0, d: 2, r: 0.5 }, BED.h, 1.2, "mid", { steps: 1, bevel: 0 }) +
      L(k.lineOnTop([x0 + 3, 0], [x1 - 3, 0], BED.h, P), { tone: "faint" })
    );
  };
  const guide = (x0 = BED.x, x1 = BED.x + BED.w) => slab({ x: x0, y: BED.y + BED.d - 2, w: x1 - x0, d: 2, r: 0.5 }, BED.h, 1.2, "mid", { steps: 1, bevel: 0 });

  // ── A sheet: raw content on one side of the press, a composed page on the other ──
  const sheet = (x, { composed = false, island = false, hooks = false, lit = false } = {}) => {
    const plan = { x: x - SHEET.w / 2, y: -SHEET.d / 2, w: SHEET.w, d: SHEET.d, r: 0.8 };
    const zt = BED.h + SHEET.h + 0.02;
    const line = (dy, len, x0 = 3) => k.lineOnTop([plan.x + x0, plan.y + dy], [plan.x + x0 + len, plan.y + dy], zt, P);
    const raw = L([4, 7, 10, 13, 16].map((dy, i) => line(dy, [13, 10, 14, 8, 11][i])).join(""), { tone: "mid", free: true });
    const block = (bx, by, w, d) => k.planOutline({ x: plan.x + bx, y: plan.y + by, w, d, r: 0.5 }, zt, P, 2);
    const page =
      L(block(2.4, 2.4, 15.2, 4) + block(2.4, 8, 7, 9.4), { tone: "hi" }) +
      L(line(9.4, 5.4, 11.4) + line(12, 4, 11.4) + line(14.6, 5.4, 11.4), { tone: "mid", free: true }) +
      `<g${hooks ? ' data-part="isle-mark"' : ""}${island ? "" : ' opacity="0"'}>${L(block(11.4, 15.4, 6.2, 2.2), { tone: "lit" })}</g>`;
    return (
      slab(plan, BED.h, SHEET.h, "hi", { steps: 2, bevel: 0, crease: "lo", lit }) +
      `<g${hooks ? ' data-part="raw"' : ""}${composed ? ' opacity="0"' : ""}>${raw}</g>` +
      `<g${hooks ? ' data-part="page"' : ""}${composed ? "" : ' opacity="0"'}>${page}</g>`
    );
  };

  // ── The composing head: a gantry, a platen that comes down, a wheel on top ──
  const column = (y) =>
    slab({ x: GX - 8, y: y - 1, w: 16, d: 10, r: 1 }, 0, 1.6, "lo", { steps: 3, bevel: 0.3 }) + slab({ x: GX - 6, y, w: 12, d: 8, r: 0.9 }, 1.6, 44.4, "mid", { steps: 3, bevel: 0.4, seam: 24 });
  const platen = (z) => {
    const out = [];
    for (const y of [-7, 7]) out.push(cyl(GX + 7, y, 1.5, z + HEAD.h, 46 - z - HEAD.h, "mid", { steps: 12, crease: "none" }));
    out.push(slab(HEAD, z, HEAD.h, "hi", { steps: 4, bevel: 0.6, crease: "lo" }));
    out.push(L(k.sideSeam(HEAD, z + 2.2, P, 4), { tone: "lo", fine: true }));
    out.push(...screws(k.corners(HEAD, 3), z + HEAD.h, 0.8, 0.4));
    return out.join("");
  };
  const beam = ({ on = false } = {}) => {
    const plan = { x: GX - 12, y: -28, w: 24, d: 56, r: 1.6 };
    return (
      slab(plan, 46, 8, "mid", { steps: 4, bevel: 0.6, seam: 49 }) +
      knob(GX, 0, 6, 54, 5, { pointer: 0.9 }) +
      lamp(GX + 5, 20, 54, 1.9, "press", on) +
      screws([[GX - 7, -23], [GX + 7, -23], [GX - 7, 23]], 54, 1, 0.42).join("")
    );
  };

  // ── Output: the stack of finished pages and the screen that shows them ──
  const stack = ({ hooks = true } = {}) => {
    const out = [slab(STACK, 0, STACK.h, "mid", { steps: 4, bevel: 0.6, seam: 2 })];
    for (let i = 0; i < 4; i++) out.push(slab({ x: STACK.x + 5, y: -10, w: SHEET.w, d: SHEET.d, r: 0.8 }, STACK.h + i * 1.2, 0.9, "hi", { steps: 2, bevel: 0, crease: "lo", lit: i === 3 }));
    const zt = STACK.h + 3 * 1.2 + 0.92;
    const px = STACK.x + 5;
    const block = (bx, by, w, d) => k.planOutline({ x: px + bx, y: -10 + by, w, d, r: 0.5 }, zt, P, 2);
    out.push(`<g${hooks ? ' data-part="top-page"' : ""}>${L(block(2.4, 2.4, 15.2, 4) + block(2.4, 8, 7, 9.4), { tone: "hi" })}${L(k.lineOnTop([px + 11.4, -0.6], [px + 16.8, -0.6], zt, P) + k.lineOnTop([px + 11.4, 2], [px + 15.4, 2], zt, P), { tone: "mid", free: true, fine: true })}</g>`);
    return out.join("");
  };
  const monitor = ({ island = false, hooks = true } = {}) => {
    const mx = MON.x + MON.w / 2;
    const sw = MON.w - 6;
    const sh = MON.h - 6;
    const hook = (name) => (hooks ? ` data-part="${name}"` : "");
    const ui =
      `<path class="scr-s" data-t="dim" d="M0 5.4h${sw}"/><circle class="scr-f" data-t="acc" cx="3" cy="2.7" r="1"/><circle class="scr-f" data-t="mid" cx="6" cy="2.7" r="1"/>` +
      `<g${hook("scr-page")}><rect class="scr-f" data-t="hi" x="4" y="9" width="26" height="3.4" rx=".8"/><rect class="scr-f" data-t="hi" x="4" y="14" width="17" height="3.4" rx=".8"/>` +
      pick(`<path class="scr-s" data-t="dim" d="M4 22h22M4 25h18M4 28h20"/>`) +
      `<rect class="scr-f" data-t="mid" x="33" y="9" width="15" height="12" rx="1.2"/></g>` +
      `<g${hook("scr-isle")} opacity="${island ? 1 : 0}"><rect class="scr-f scr-glow" data-t="acc" x="33" y="24" width="15" height="5.4" rx="2.7"/></g>` +
      `<text class="scr-t" data-t="dim"${hook("scr-count")} x="${sw - 3}" y="3.9" font-size="2.6" text-anchor="end">1/3</text>`;
    return (
      cyl(mx, MON.y + 2, 12, 0, 1.8, "lo", { steps: 36 }) +
      cyl(mx, MON.y + 2, 9, 1.8, 1.4, "mid", { steps: 36, bevel: 0.4 }) +
      slab({ x: mx - 3, y: MON.y - 1, w: 6, d: 4, r: 0.8 }, 3.2, MON.z - 2.2, "mid", { steps: 2, bevel: 0.3 }) +
      slab(MON, MON.z, MON.h, "hi", { steps: 4, bevel: 0.6, crease: "lo" }) +
      faceY(MON.x + 3, MON.y + MON.d, MON.z + MON.h - 3, screen(sw, sh, ui, 1.6)) +
      D([at([mx, MON.y + MON.d, MON.z + 1.4])], { size: 0.6, tone: "hi" })
    );
  };

  // ── The side module: interaction, only where a page asks for it ────────
  // It clips onto the front of the bed and reaches over the guide with a reader head.
  const island = ({ on = false } = {}) =>
    slab({ x: ISLE.x + 9, y: 7, w: 12, d: 9, r: 1 }, 12.4, 2.6, "hi", { steps: 2, bevel: 0.3, crease: "lo" }) +
    slab(ISLE, 0, ISLE.h, "mid", { steps: 4, bevel: 0.6, seam: 3 }) +
    screws(k.corners(ISLE, 3), ISLE.h, 0.8, 0.4).join("") +
    L(k.planOutline({ x: ISLE.x + 4, y: ISLE.y + 4, w: 11, d: 9, r: 1 }, ISLE.h, P, 3), { tone: "lo" }) +
    cyl(ISLE.x + 9.5, ISLE.y + 8.5, 2.6, ISLE.h, 0.7, "lo", { steps: 18 }) +
    cyl(ISLE.x + 9.5, ISLE.y + 8.5, 1.8, ISLE.h + 0.7, 1.5, "hi", { steps: 18, crease: "lo" }) +
    lamp(ISLE.x + 22, ISLE.y + 8.5, ISLE.h, 2, "isle", on);

  const body = [
    base(PLATE),
    monitor(),
    tray(),
    column(-27),
    bed(),
    `<g data-part="sheet" opacity="0">${sheet(START, { hooks: true })}</g>`,
    guide(),
    `<g data-part="platen">${platen(HEAD_UP)}</g>`,
    column(19),
    beam(),
    stack(),
    island(),
    ruler({ x: -70, y: 38, w: 84, d: 6, r: 1 }),
    label({ x: 62, y: 38, w: 54, d: 11, r: 1 }, "CONTENIDO · HTML"),
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const press = (z, on, x) => [column(-27), bed(GX - 34, GX + 34), sheet(x, { composed: on }), guide(GX - 34, GX + 34), platen(z), column(19), beam({ on })];
  const parts = {
    head: part([shadow({ x: GX - 32, y: -24, w: 64, d: 48, r: 3 }), ...press(HEAD_UP, false, GX)], k.boxCorners({ x: GX - 34, y: -28, w: 68, d: 56 }, 0, 62)),
    tray: part([shadow({ x: TRAY.x + 2, y: TRAY.y + 2, w: TRAY.w + 6, d: TRAY.d - 4, r: 3 }), tray()], k.boxCorners({ ...TRAY, w: TRAY.w + 6 }, 0, 16), 20),
    pages: part([shadow({ x: MON.x, y: -44, w: MON.w, d: 58, r: 3 }), monitor({ hooks: false }), stack({ hooks: false })], k.boxCorners({ x: MON.x, y: MON.y, w: MON.w, d: 64 }, 0, MON.z + MON.h + 2)),
    island: part([shadow({ x: ISLE.x - 16, y: -12, w: ISLE.w + 32, d: 42, r: 3 }), bed(ISLE.x - 18, ISLE.x + ISLE.w + 18), sheet(ISLE.x + 15, { composed: true, island: true }), guide(ISLE.x - 18, ISLE.x + ISLE.w + 18), island({ on: true })], k.boxCorners({ x: ISLE.x - 18, y: -14, w: ISLE.w + 36, d: 46 }, 0, ISLE.h + 5), 20),
    detail: part([shadow({ x: GX - 32, y: -24, w: 64, d: 48, r: 3 }), ...press(HEAD_DOWN, true, GX)], k.boxCorners({ x: GX - 34, y: -28, w: 68, d: 56 }, 0, 62)),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");

save("pagepress", {
  width: W,
  height: H,
  label:
    "Una imprenta de páginas sobre una placa: una bandeja con hojas de contenido, una cama por la que avanza cada hoja, un cabezal que baja a componerla y, al otro lado, la pila de páginas terminadas junto a la pantalla que las muestra. Un módulo lateral se enciende solo cuando la página lleva una parte interactiva.",
  body: full.body,
  motion: { P, start: START, press: GX, isle: ISLE.x + 15, end: END, up: HEAD_UP, down: HEAD_DOWN },
  // The thumbnail shows a page just composed, still under the head.
  thumb: small.body
    .join("")
    .replace('<g data-part="sheet" opacity="0">', `<g transform="${k.translateAlong(P, [GX + 30 - START, 0, 0])}">`)
    .replace('<g data-part="raw">', '<g opacity="0">')
    .replace('<g data-part="page" opacity="0">', "<g>"),
  parts: full.parts,
});
