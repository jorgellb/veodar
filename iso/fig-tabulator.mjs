// Python: a data sorter. Cards from two sources, a pile of sheets and a file box,
// ride one belt through a cleaning station and a matching station. The repeated ones
// drop into a bin and the rest stack up as an ordered report. A timer starts each run.
import { G, k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const BT = 16; // belt top
const BELT = { x0: -70, x1: 56, y0: -9, y1: 9 };
const CLEAN_X = -36;
const CROSS_X = 8;
const DROP_X = 26;
const SHEETS = { x: -120, y: -44, w: 34, d: 28, r: 2, h: 6 };
const BOX = { x: -120, y: 12, w: 34, d: 28, r: 2, h: 12 };
const FEED = { x: -86, y: -22, w: 16, d: 44, r: 1.4, h: BT - 1 };
const BIN = { x: 15, y: 14, w: 22, d: 22, r: 2, h: 10 };
const OUT = { x: 62, y: -16, w: 34, d: 32, r: 2, h: 6 };
const MON = { x: 58, y: -46, w: 46, d: 5, r: 2, z: 14, h: 30 };
const TIMER = { x: -62, y: 26, w: 28, d: 22, r: 2.4, h: 9, cx: -48, cy: 37, r0: 8.4 };
const CARD = { w: 12, d: 12, h: 0.9 };

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [CLEAN_X, -22, 50], [CLEAN_X, 22, 50], [MON.x + MON.w, MON.y, MON.z + MON.h + 2], [SHEETS.x, SHEETS.y, 16]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, S, L, D, slab, cyl, screws, base, label, lamp, faceY, screen, cable, shadow, pick, thumb } = kitFor(P, { lod });
  const pile = thumb ? 2 : 5; // sheets in a stack
  const axisY = (x, y, z) => G.frameAlong([x, y, z], [0, 1, 0]);

  // ── Two sources: a pile of sheets and a box of cards ───────────────────
  const sheets = () => {
    const out = [slab(SHEETS, 0, SHEETS.h, "mid", { steps: 4, bevel: 0.6, seam: 2 })];
    for (let i = 0; i < pile; i++) out.push(slab({ x: SHEETS.x + 6 + i * 0.4, y: SHEETS.y + 4 - i * 0.2, w: 22, d: 20, r: 0.8 }, SHEETS.h + i * 1.2, 0.9, "hi", { steps: 2, bevel: 0, crease: "lo" }));
    const zt = SHEETS.h + (pile - 1) * 1.2 + 0.92;
    const x0 = SHEETS.x + 7.6;
    const y0 = SHEETS.y + 3.2;
    // A spreadsheet: a grid of rows and columns.
    const grid = [4, 8, 12, 16].map((dy) => k.lineOnTop([x0 + 1.6, y0 + dy], [x0 + 20.4, y0 + dy], zt, P)).join("") + [8, 14].map((dx) => k.lineOnTop([x0 + dx, y0 + 1.6], [x0 + dx, y0 + 18.4], zt, P)).join("");
    out.push(L(grid, { tone: "lo", fine: true }));
    return out.join("");
  };
  const box = () => {
    const t = 1.8;
    const out = [slab(BOX, 0, 1.4, "lo", { steps: 3, bevel: 0.2 })];
    out.push(slab({ ...BOX, d: t, r: 0.5 }, 1.4, BOX.h - 1.4, "mid", { steps: 2, bevel: 0.3 }));
    out.push(slab({ ...BOX, w: t, r: 0.5 }, 1.4, BOX.h - 1.4, "mid", { steps: 2, bevel: 0.3 }));
    for (let i = 0; i < 6; i += thumb ? 2 : 1) out.push(slab({ x: BOX.x + 5 + i * 4.4, y: BOX.y + 4, w: 1.1, d: 20, r: 0.3 }, 1.4, i === 3 || (thumb && i === 2) ? 17 : 13.6, "hi", { steps: 1, bevel: 0, crease: "lo" }));
    out.push(slab({ ...BOX, x: BOX.x + BOX.w - t, w: t, r: 0.5 }, 1.4, BOX.h - 1.4, "mid", { steps: 2, bevel: 0.3 }));
    out.push(slab({ ...BOX, y: BOX.y + BOX.d - t, d: t, r: 0.5 }, 1.4, BOX.h - 1.4, "mid", { steps: 2, bevel: 0.3, seam: 5 }));
    return out.join("");
  };
  // The table that brings both sources to the start of the belt.
  const feed = () =>
    slab(FEED, 0, FEED.h, "mid", { steps: 3, bevel: 0.5, seam: 4 }) +
    L(k.onTop([[FEED.x + 3, FEED.y + 4], [FEED.x + FEED.w - 2, -3]], FEED.h, P) + k.onTop([[FEED.x + 3, FEED.y + FEED.d - 4], [FEED.x + FEED.w - 2, 3]], FEED.h, P), { tone: "lo" });

  // ── The belt ───────────────────────────────────────────────────────────
  const rail = (y, x0 = BELT.x0 - 2, x1 = BELT.x1 + 2) => slab({ x: x0, y, w: x1 - x0, d: 2.6, r: 0.8 }, 8.6, BT + 1.4 - 8.6, "mid", { steps: 3, bevel: 0.4, seam: 12 });
  const legs = (xs) =>
    xs
      .map((x) => [-8, 8].map((y) => cyl(x, y, 3.2, 0, 1, "lo", { steps: 18 }) + cyl(x, y, 1.8, 1, 7.6, "mid", { steps: 14, crease: "none" })).join("") + slab({ x: x - 1.5, y: -9, w: 3, d: 18, r: 0.5 }, 4, 2, "mid", { steps: 2, bevel: 0.2 }))
      .join("");
  const rubber = (x0 = BELT.x0, x1 = BELT.x1) => slab({ x: x0, y: BELT.y0, w: x1 - x0, d: BELT.y1 - BELT.y0, r: 1.6 }, 15, BT - 15, "mid", { steps: 3, bevel: 0.3, crease: "none", className: "veo-dark" });
  const belt = (x0, x1) => rail(BELT.y0 - 2.6, x0 === undefined ? undefined : x0 - 2, x1 === undefined ? undefined : x1 + 2) + rubber(x0, x1);

  // ── A record card: as it arrives, and after cleaning ───────────────────
  const card = (x, y, { clean = false, hooks = false, lit = false } = {}) => {
    const plan = { x: x - CARD.w / 2, y: y - CARD.d / 2, w: CARD.w, d: CARD.d, r: 1 };
    const zt = BT + CARD.h + 0.02;
    const line = (dy, x0, len) => k.lineOnTop([plan.x + x0, plan.y + dy], [plan.x + x0 + len, plan.y + dy], zt, P);
    const raw = L(line(3, 2, 6.4) + line(6, 3.4, 4) + line(9, 1.6, 7.6), { tone: "mid", free: true }) + D([at([plan.x + 9.6, plan.y + 5.6, zt])], { size: 0.8, tone: "hi", keep: true });
    const tidy = L(line(3, 3.4, 6.6) + line(6, 3.4, 6.6) + line(9, 3.4, 6.6), { tone: "hi", free: true }) + L(k.lineOnTop([plan.x + 1.8, plan.y + 2.4], [plan.x + 1.8, plan.y + 9.6], zt, P), { tone: "lit" });
    return (
      slab(plan, BT, CARD.h, "hi", { steps: 2, bevel: 0, crease: "lo", lit }) +
      `<g${hooks ? ' data-part="raw"' : ""}${clean ? ' opacity="0"' : ""}>${raw}</g>` +
      `<g${hooks ? ' data-part="tidy"' : ""}${clean ? "" : ' opacity="0"'}>${tidy}</g>`
    );
  };

  // ── Stations: an arch over the belt each ───────────────────────────────
  const post = (x, y) => slab({ x: x - 4, y: y - 1, w: 8, d: 8, r: 1 }, 0, 1.6, "lo", { steps: 3, bevel: 0.3 }) + slab({ x: x - 3, y, w: 6, d: 6, r: 0.8 }, 1.6, 40.4, "mid", { steps: 3, bevel: 0.4, seam: 26 });
  const beam = (x, part, on) => slab({ x: x - 4.4, y: -22, w: 8.8, d: 42, r: 1.2 }, 42, 6, "mid", { steps: 3, bevel: 0.5, seam: 44.4 }) + lamp(x, 12, 48, 1.9, part, on) + screws([[x, -17]], 48, 0.9, 0.4).join("");
  const brush = (x) => {
    const out = [];
    for (const y of [-7.6, 7.6]) out.push(slab({ x: x - 1, y: y - 1, w: 2, d: 2, r: 0.4 }, 23.4, 18.6, "mid", { steps: 1, bevel: 0 }));
    out.push(S(G.disc(0, 17, 3.7, axisY(x, -8.5, 21.2), P, {}), { tone: "hi", crease: "lo" }));
    const bristles = Array.from({ length: 7 }, (_, i) => k.segment([x - 3, -7 + i * 2.3, 20], [x + 3, -7 + i * 2.3, 20.6], P)).join("");
    out.push(L(bristles, { tone: "lo", fine: true }));
    return out.join("");
  };
  const reader = (x) => cyl(x, 0, 5.4, 30, 12, "hi", { steps: 32, bevel: 0.5, crease: "lo" }) + cyl(x, 0, 3.4, 27.4, 2.6, "mid", { steps: 24 }) + L(k.sideArc(x, 0, 5.4, 36, P, 20), { tone: "faint" });

  // ── The bin where the repeated cards land ──────────────────────────────
  const bin = (front) => {
    const t = 1.6;
    const walls = front
      ? [
          { x: BIN.x, y: BIN.y + BIN.d - t, w: BIN.w, d: t, r: 0.5 },
          { x: BIN.x + BIN.w - t, y: BIN.y, w: t, d: BIN.d, r: 0.5 },
        ]
      : [
          { x: BIN.x, y: BIN.y, w: BIN.w, d: BIN.d, r: BIN.r, floor: true },
          { x: BIN.x, y: BIN.y, w: BIN.w, d: t, r: 0.5 },
          { x: BIN.x, y: BIN.y, w: t, d: BIN.d, r: 0.5 },
        ];
    return walls.map((w) => (w.floor ? slab(w, 0, 1.2, "lo", { steps: 3, bevel: 0.2 }) : slab(w, 1.2, BIN.h - 1.2, "mid", { steps: 2, bevel: 0.2 }))).join("");
  };

  // ── Output: the ordered report and the counter ─────────────────────────
  const report = ({ hooks = true } = {}) => {
    const out = [slab(OUT, 0, OUT.h, "mid", { steps: 4, bevel: 0.6, seam: 2 })];
    for (let i = 0; i < pile; i++) out.push(slab({ x: OUT.x + 6, y: OUT.y + 5, w: 22, d: 22, r: 0.8 }, OUT.h + i * 1.1, 0.9, "hi", { steps: 2, bevel: 0, crease: "lo", lit: i === pile - 1 }));
    const zt = OUT.h + (pile - 1) * 1.1 + 0.92;
    const x0 = OUT.x + 6;
    const y0 = OUT.y + 5;
    out.push(L([5, 9, 13, 17].map((dy) => k.lineOnTop([x0 + 3, y0 + dy], [x0 + 19, y0 + dy], zt, P)).join(""), { tone: "hi", free: true }));
    out.push(L(k.lineOnTop([x0 + 3, y0 + 2.6], [x0 + 3, y0 + 19.4], zt, P), { tone: "lit" }));
    const sw = MON.w - 6;
    const mx = MON.x + MON.w / 2;
    const hook = (name) => (hooks ? ` data-part="${name}"` : "");
    out.push(cyl(mx, MON.y + 2, 10, 0, 1.8, "lo", { steps: 32 }), slab({ x: mx - 3, y: MON.y - 1, w: 6, d: 4, r: 0.8 }, 1.8, MON.z - 0.8, "mid", { steps: 2, bevel: 0.3 }));
    out.push(slab(MON, MON.z, MON.h, "hi", { steps: 4, bevel: 0.6, crease: "lo" }));
    out.push(
      faceY(
        MON.x + 3,
        MON.y + MON.d,
        MON.z + MON.h - 3,
        screen(
          sw,
          MON.h - 6,
          `<text class="scr-t" data-t="dim" x="3" y="5.6" font-size="2.5">REGISTROS</text><text class="scr-t"${hook("n-ok")} x="${sw - 3}" y="6.4" font-size="4.6" font-weight="600" text-anchor="end">12</text>` +
            `<path class="scr-s" data-t="dim" d="M3 9.6h${sw - 6}"/>` +
            `<text class="scr-t" data-t="dim" x="3" y="15" font-size="2.5">DUPLICADOS</text><text class="scr-t" data-t="acc"${hook("n-dup")} x="${sw - 3}" y="15.8" font-size="4.6" font-weight="600" text-anchor="end">2</text>` +
            `<rect class="scr-f" data-t="mid" x="3" y="19" width="${sw - 6}" height="2.4" rx="1.2"/><rect class="scr-f scr-glow" data-t="acc"${hook("bar")} x="3" y="19" width="${(sw - 6) * 0.75}" height="2.4" rx="1.2"/>`,
          1.4,
        ),
      ),
    );
    return out.join("");
  };

  // ── The timer that starts each run ─────────────────────────────────────
  const timer = ({ on = false, hooks = true } = {}) => {
    const out = [slab(TIMER, 0, TIMER.h, "mid", { steps: 4, bevel: 0.6, seam: 3 })];
    out.push(cyl(TIMER.cx, TIMER.cy, TIMER.r0 + 1.4, TIMER.h, 1, "lo", { steps: 44 }));
    out.push(cyl(TIMER.cx, TIMER.cy, TIMER.r0, TIMER.h + 1, 2.2, "hi", { steps: 48, bevel: 0.4, crease: "lo" }));
    const zt = TIMER.h + 3.22;
    const ticks = k.radialTicks(TIMER.cx, TIMER.cy, TIMER.r0 - 1, 24, 6, zt, [0.9, 2], P);
    out.push(L(ticks.minor, { tone: "lo", fine: true }), L(ticks.major, { tone: "mid" }));
    out.push(`<g${hooks ? ' data-part="hand"' : ""}>${L(k.lineOnTop([TIMER.cx, TIMER.cy], [TIMER.cx + 4.2, TIMER.cy - 4.6], zt, P), { tone: "lit" })}</g>`);
    out.push(D([at([TIMER.cx, TIMER.cy, zt])], { size: 0.8, tone: "hi", keep: true }));
    out.push(lamp(TIMER.x + 5.4, TIMER.y + 5.4, TIMER.h, 1.7, "timer", on));
    return out.join("");
  };

  const motor = () => slab({ x: BELT.x0 - 2, y: 12, w: 14, d: 9, r: 1.2 }, 0, 13, "mid", { steps: 3, bevel: 0.4, seam: 4 }) + L([0, 1, 2].map((i) => k.segment([BELT.x0 + 1 + i * 3, 21, 4], [BELT.x0 + 1 + i * 3, 21, 10], P)).join(""), { tone: "lo", fine: true });
  const lead = () => cable([[TIMER.x + 8, TIMER.y, 3], [TIMER.x + 8, 21.6, 0.9], [BELT.x0 + 12, 21.6, 0.9]]);

  const body = [
    base(PLATE),
    sheets(),
    report(),
    post(CLEAN_X, -22),
    post(CROSS_X, -22),
    legs(thumb ? [BELT.x1 - 6] : [BELT.x0 + 6, -14, BELT.x1 - 6]),
    feed(),
    belt(),
    bin(false),
    `<g data-part="cards">${[0, 1, 2, 3]
      .map((i) => `<g data-card="${i}"${i > 1 ? ' opacity="0"' : ` transform="${k.translateAlong(P, [[-12, -56][i], 0, 0])}"`}>${card(0, 0, { clean: i === 0, hooks: true })}</g>`)
      .join("")}</g>`,
    rail(BELT.y1),
    bin(true),
    brush(CLEAN_X),
    reader(CROSS_X),
    post(CLEAN_X, 16),
    post(CROSS_X, 16),
    beam(CLEAN_X, "clean"),
    beam(CROSS_X, "cross"),
    lead(),
    motor(),
    box(),
    timer(),
    label({ x: 58, y: 38, w: 60, d: 11, r: 1 }, "LIMPIAR · CRUZAR · ORDENAR"),
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const station = (x, on, cardX, clean) => [
    shadow({ x: x - 24, y: -22, w: 48, d: 44, r: 3 }),
    post(x, -22),
    legs([x - 16, x + 16]),
    belt(x - 24, x + 24),
    card(cardX, 0, { clean }),
    rail(BELT.y1, x - 26, x + 26),
    brush(x),
    post(x, 16),
    beam(x, "", on),
  ];
  const parts = {
    trays: part([shadow({ x: SHEETS.x, y: SHEETS.y, w: 50, d: 84, r: 4 }), sheets(), feed(), box()], k.boxCorners({ x: SHEETS.x, y: SHEETS.y, w: 50, d: 84 }, 0, 20)),
    clean: part(station(CLEAN_X, false, CLEAN_X - 14, false), k.boxCorners({ x: CLEAN_X - 26, y: -24, w: 52, d: 48 }, 0, 52)),
    report: part([shadow({ x: MON.x, y: MON.y + 2, w: MON.w, d: 60, r: 3 }), report({ hooks: false })], k.boxCorners({ x: MON.x, y: MON.y, w: MON.w, d: 64 }, 0, MON.z + MON.h + 2)),
    timer: part([shadow(TIMER), timer({ on: true, hooks: false })], k.boxCorners(TIMER, 0, TIMER.h + 6), 22),
    detail: part(station(CLEAN_X, true, CLEAN_X + 10, true), k.boxCorners({ x: CLEAN_X - 26, y: -24, w: 52, d: 48 }, 0, 52)),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");

save("tabulator", {
  width: W,
  height: H,
  label:
    "Una clasificadora de datos sobre una placa: a la izquierda, una pila de hojas de cálculo y una caja de fichas; ambas alimentan una cinta que pasa bajo una estación de limpieza, con un rodillo de cepillo, y una estación de cruce, con un lector. Las fichas repetidas caen a un cajón y el resto se apila como informe ordenado junto a un contador. Un temporizador pone en marcha cada pasada.",
  body: full.body,
  motion: {
    P,
    feed: FEED.x + FEED.w / 2,
    start: BELT.x0 + 8,
    clean: CLEAN_X,
    cross: CROSS_X,
    drop: DROP_X,
    end: OUT.x + 17,
    timer: { x: TIMER.cx, y: TIMER.cy, r: TIMER.r0 - 2.4, z: TIMER.h + 3.22 },
  },
  thumb: small.body,
  parts: full.parts,
});
