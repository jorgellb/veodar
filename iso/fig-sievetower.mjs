// Axum: a tower of layers. A request drops into the hopper at the top and comes down
// a step at a time: access, limit, shape. At each step a lamp says it may go on; the
// one that fails is turned aside to a sign with its answer (401, 429, 422) and never
// reaches the logic. What passes all three arrives at the router, a hub whose pointer
// sends it to its handler. The third handler keeps a line open to a screen and pushes
// each change down it as it happens.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const BACK = { x: -104, y: -42 };
// Bottom to top; the request meets them top to bottom.
const DECKS = [
  { name: "FORMA", w: 66, d: 52, z: 0, code: "422" },
  { name: "LÍMITE", w: 52, d: 38, z: 10, code: "429" },
  { name: "ACCESO", w: 38, d: 24, z: 20, code: "401" },
].map((deck) => ({ ...deck, x: BACK.x, y: BACK.y, r: 2.5, h: 10 }));
const LANE = BACK.x + 7;
const front = (i) => DECKS[i].y + DECKS[i].d;
const right = (i) => DECKS[i].x + DECKS[i].w;
const topOf = (i) => DECKS[i].z + DECKS[i].h;
const CHECK = [2, 1, 0].map((i) => [LANE, front(i) - 3, topOf(i) + 0.5]);
const HOPPER = { x: BACK.x + 24, y: BACK.y + 9, r: 6.5 };
const HUB = { x: -62, y: 36, r: 7.5, h: 5 };
const HANDLERS = [-16, 24, 64];
const HANDLER = { y: 14, w: 28, d: 18, r: 2.5, h: 12 };
const NAMES = ["/pedidos", "/clientes", "/stock"];
const TRUNK = 42;
const LIVE = { x: 76, y: -34, w: 40, h: 26, neck: 6 };

// The way down, in the stretches the bead rides one after another.
const DOWN = [
  [[HOPPER.x - 4, HOPPER.y + 3, topOf(2) + 3], [HOPPER.x - 7, HOPPER.y + 6, topOf(2) + 0.5], [LANE, HOPPER.y + 6, topOf(2) + 0.5], CHECK[0]],
  [CHECK[0], [LANE, front(2) + 0.4, topOf(2) + 0.5], [LANE, front(2) + 0.4, topOf(1) + 0.6], CHECK[1]],
  [CHECK[1], [LANE, front(1) + 0.4, topOf(1) + 0.5], [LANE, front(1) + 0.4, topOf(0) + 0.6], CHECK[2]],
  [CHECK[2], [LANE, front(0) + 0.4, topOf(0) + 0.5], [LANE, front(0) + 0.4, 0.9], [LANE, HUB.y, 0.9], [HUB.x - HUB.r, HUB.y, 0.9]],
];
// Where each refusal goes: along its own step, off its edge and to its sign.
const SIGNS = [2, 1, 0].map((i, n) => {
  const [, y] = CHECK[n];
  const floor = i ? topOf(i - 1) : 0;
  return { i, x: right(i) + 2, y: y - 6, z: floor, code: DECKS[i].code, path: [CHECK[n], [right(i) + 0.4, y, topOf(i) + 0.5], [right(i) + 0.4, y, floor + 0.7], [right(i) + 7, y, floor + 0.7]] };
});
const OUT = HANDLERS.map((x) => [
  [HUB.x + HUB.r, HUB.y, 0.9],
  [-48, HUB.y, 0.9],
  [-48, TRUNK, 0.9],
  [x + HANDLER.w / 2, TRUNK, 0.9],
  [x + HANDLER.w / 2, HANDLER.y + HANDLER.d + 0.6, 0.9],
]);
const LIVE_LINE = [
  [HANDLERS[2] + 14, HANDLER.y, 4],
  [HANDLERS[2] + 14, HANDLER.y - 2, 0.9],
  [HANDLERS[2] + 14, -24, 0.9],
  [LIVE.x + 12, -24, 0.9],
  [LIVE.x + 12, LIVE.y + 5, 0.9],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [BACK.x, BACK.y, 42], [LIVE.x + LIVE.w, LIVE.y, 36]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, D, slab, cyl, base, label, lamp, top, faceY, cable, shadow, pick, thumb, display, windowBar } = kitFor(P, { lod });
  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);
  const bulb = (x, y, z, r, part, on = false, ok = false) => {
    const svg = lamp(x, y, z, r, part, on);
    return ok ? svg.replace('class="veo-lamp"', 'class="veo-lamp" data-tone="ok"') : svg;
  };
  // What each layer looks at, drawn on its step.
  const MARK = {
    ACCESO: `<circle class="ui-s" data-t="hi" cx="3" cy="3" r="2"/><path class="ui-s" data-t="hi" d="M5 3h5M8 3v1.8M10 3v1.8"/>`,
    LÍMITE: `<path class="ui-s" data-t="hi" d="M1 5.6V3.4M3.6 5.6V1.8M6.2 5.6V.6"/><path class="ui-s" data-t="acc" d="M0 1.4h9.6"/>`,
    FORMA: `<path class="ui-s" data-t="hi" d="M0 .6h9.6v5H6.4V3.4H3.2v2.2H0z"/>`,
  };

  // ── One layer: a step of the tower ─────────────────────────────────────
  const deck = (i, { hooks = true, pass = false, bare = false } = {}) => {
    const d = DECKS[i];
    const zt = topOf(i);
    const out = [slab(d, d.z, d.h, i === 1 ? "hi" : "mid", { steps: 5, bevel: 0.8, seam: d.z + 3, crease: "lo" })];
    out.push(faceY(d.x + 12, front(i), zt - 2.2, `<rect class="ui-s" data-t="lo" width="22" height="5.4" rx=".8"/><text class="ui-t" x="11" y="3.8" font-size="2.8" text-anchor="middle" opacity=".85">${d.name}</text>`));
    // The sieve: holes on what shows of the step.
    const strip = bare ? { x: d.x + 36, y: d.y + 3, w: d.w - 39, d: d.d - 6 } : { x: d.x + 36, y: front(i) - 11.4, w: d.w - 39, d: 5 };
    if (!thumb && strip.w > 4) out.push(D(k.dotGrid(strip.x, strip.y, Math.floor(strip.w / 3.4), Math.floor(strip.d / 3.4) + 1, 3.4, zt, P), { size: 0.4, tone: "lo" }));
    const n = 2 - i;
    out.push(top(LANE + 15, front(i) - 11, zt + 0.02, MARK[d.name]));
    out.push(bulb(LANE + 9, front(i) - 8.4, zt, 1.8, hooks ? `pass-${n}` : "", pass, true));
    return out.join("");
  };
  const hopper = () => {
    const z = topOf(2);
    return cyl(HOPPER.x, HOPPER.y, 4, z, 3, "mid", { steps: 20 }) + cyl(HOPPER.x, HOPPER.y, HOPPER.r, z + 3, 3.4, "hi", { steps: 30, bevel: 0.5, crease: "lo" }) + cyl(HOPPER.x, HOPPER.y, HOPPER.r - 1.6, z + 6.4, 0.05, "hi", { steps: 30, className: "veo-dark", crease: "none" });
  };
  const sign = (n, { hooks = true, on = false } = {}) => {
    const s = SIGNS[n];
    const plate = `<g${hooks ? ` data-part="sign-${n}"` : ""} class="veo-lamp"${on ? ' data-on=""' : ""}>${slab({ x: s.x, y: s.y, w: 11, d: 1.6, r: 0.5 }, s.z, 7.6, "hi", { steps: 1, bevel: 0.2, crease: "lo" })}</g>`;
    return plate + faceY(s.x, s.y + 1.6, s.z + 7.6, `<text class="ui-t" x="5.5" y="5.2" font-size="4" font-weight="600" text-anchor="middle">${s.code}</text>`);
  };
  const tower = (opts = {}) => [deck(0, opts), deck(1, opts), sign(2, opts), deck(2, opts), sign(1, opts), hopper(), sign(0, opts)].join("");

  // ── The router: a hub whose pointer picks the handler ──────────────────
  const hub = ({ hooks = true, turn = 0 } = {}) => {
    const out = [cyl(HUB.x, HUB.y, HUB.r + 1.4, 0, 1, "lo", { steps: 30 }), cyl(HUB.x, HUB.y, HUB.r, 1, HUB.h - 1, "hi", { steps: 34, bevel: 0.5, crease: "lo" })];
    const t = k.radialTicks(HUB.x, HUB.y, HUB.r - 0.6, 24, 4, HUB.h, [1, 1.9], P);
    out.push(L(t.minor, { tone: "lo", fine: true }), L(t.major, { tone: "mid", fine: true }));
    const pointer = `<path class="ui-s" data-t="acc" d="M0 0h5.4"/><path class="ui-f" data-t="acc" d="M5.2 -1.3l2.2 1.3l-2.2 1.3z"/>`;
    out.push(top(HUB.x, HUB.y, HUB.h + 0.02, hooks ? `<g data-part="pointer">${pointer}</g>` : `<g transform="rotate(${turn})">${pointer}</g>`));
    out.push(cyl(HUB.x, HUB.y, 1.6, HUB.h, 1.2, "mid", { steps: 12 }));
    return out.join("");
  };

  // ── The handlers ───────────────────────────────────────────────────────
  const handler = (i, { hooks = true, on = false } = {}) => {
    const plan = { x: HANDLERS[i], y: HANDLER.y, w: HANDLER.w, d: HANDLER.d, r: HANDLER.r };
    const out = [slab(plan, 0, HANDLER.h, "mid", { steps: 5, bevel: 0.8, seam: 3 })];
    out.push(faceY(plan.x + 3, plan.y + plan.d, HANDLER.h - 2.4, `<rect class="ui-s" data-t="lo" width="22" height="5.6" rx=".8"/><text class="ui-t" x="11" y="3.9" font-size="2.7" text-anchor="middle" opacity=".85">${NAMES[i]}</text>`));
    out.push(L(k.planOutline(k.insetPlan(plan, 3.2), HANDLER.h, P, 3), { tone: "faint" }));
    out.push(pick(L(k.lineOnTop([plan.x + 6, plan.y + 6.6], [plan.x + 16, plan.y + 6.6], HANDLER.h, P) + k.lineOnTop([plan.x + 6, plan.y + 9.4], [plan.x + 12, plan.y + 9.4], HANDLER.h, P), { tone: "lo", free: true, fine: true })));
    out.push(bulb(plan.x + plan.w - 6, plan.y + plan.d - 5.6, HANDLER.h, 1.9, hooks ? `done-${i}` : "", on, true));
    return out.join("");
  };

  // ── The open line: a screen that hears each change as it happens ───────
  const gw = LIVE.w - 2.4;
  const liveUi = ({ hooks = true, bars = 0 } = {}) => {
    const out = [windowBar(gw, "en vivo")];
    [9, 14, 8, 17, 12, 15].forEach((h, j) => {
      const bar = `<rect class="scr-f" data-t="${j === 5 ? "acc" : "hi"}" x="${4 + j * 5.6}" y="${21.4 - h}" width="3.6" height="${h}" rx=".6"/>`;
      out.push(j < 3 ? bar : hooks ? `<g data-part="bar-${j - 3}" opacity="0">${bar}</g>` : j - 3 < bars ? bar : "");
    });
    out.push(pick(`<path class="scr-s" data-t="dim" d="M3 21.6h${gw - 6}"/>`));
    return out.join("");
  };
  const liveScreen = (opts) => display(LIVE, liveUi(opts));

  const body = [
    base(PLATE),
    label({ x: -28, y: -50, w: 76, d: 11, r: 1 }, "ACCESO · LÍMITE · FORMA · RUTA"),
    liveScreen(),
    wire(LIVE_LINE, "live-line"),
    wire(DOWN[3].slice(2), "floor-line"),
    tower(),
    ...DOWN.map((points, n) => wire(n === 3 ? points.slice(0, 3) : points, `down-${n}`)),
    ...SIGNS.map((s, n) => wire(s.path, `refuse-${n}`)),
    hub(),
    ...[2, 1, 0].map((i) => wire(OUT[i], `out-${i}`)),
    ...[0, 1, 2].map((i) => handler(i)),
    `<g data-part="beads">${[0, 1, 2].map((n) => `<g data-bead="${n}" opacity="0"><circle class="veo-bead" r="2.3"/></g>`).join("")}</g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const move = (by, svg) => `<g transform="${k.translateAlong(P, by)}">${svg}</g>`;
  const row = { x: HANDLERS[0] - 4, y: HANDLER.y - 2, w: HANDLERS[2] + HANDLER.w - HANDLERS[0] + 8, d: TRUNK - HANDLER.y + 6, r: 4 };
  const parts = {
    router: part(
      [shadow({ x: HUB.x - 12, y: HUB.y - 10, w: 30, d: 20, r: 8 }), wire([[HUB.x - 18, HUB.y, 0.9], [HUB.x - HUB.r, HUB.y, 0.9]], "", true), hub({ hooks: false, turn: 35 }), wire([[HUB.x + HUB.r, HUB.y, 0.9], [-48, HUB.y, 0.9], [-48, TRUNK, 0.9], [-36, TRUNK, 0.9]], "", true)],
      k.boxCorners({ x: HUB.x - 18, y: HUB.y - 9, w: 46, d: 18 }, 0, HUB.h + 3),
      14,
    ),
    tower: part([shadow({ ...DECKS[0], r: 4 }), tower({ hooks: false, pass: true }), ...DOWN.slice(0, 3).map((points) => wire(points, "", true))], [...k.boxCorners(DECKS[0], 0, 10), [BACK.x, BACK.y, 40]], 12),
    handlers: part([shadow(row), ...[2, 1, 0].map((i) => wire(OUT[i].slice(2), "", i === 0)), ...[0, 1, 2].map((i) => handler(i, { hooks: false, on: i === 0 }))], k.boxCorners(row, 0, HANDLER.h + 3), 10),
    live: part(
      [shadow({ x: LIVE.x - 4, y: LIVE.y - 4, w: LIVE.w + 8, d: 12, r: 4 }), liveScreen({ hooks: false, bars: 3 }), wire([[LIVE.x - 26, -24, 0.9], ...LIVE_LINE.slice(3)], "", true), move([LIVE.x - 54 - HANDLERS[2], -33 - HANDLER.y, 0], shadow({ x: HANDLERS[2], y: HANDLER.y, w: HANDLER.w, d: HANDLER.d, r: 4 }) + handler(2, { hooks: false, on: true }))],
      [...k.boxCorners({ x: LIVE.x - 54, y: -36, w: LIVE.w + 54, d: 22 }, 0, 10), [LIVE.x, LIVE.y, LIVE.neck + LIVE.h + 3]],
      12,
    ),
    detail: part(
      [shadow({ ...DECKS[0], r: 4 }), deck(0, { hooks: false, bare: true }), wire([[LANE, DECKS[0].y + 8, topOf(0) + 0.5], CHECK[2]], "", true), wire(SIGNS[2].path, "", true), sign(2, { hooks: false, on: true })],
      [...k.boxCorners({ ...DECKS[0], w: DECKS[0].w + 14 }, 0, 12)],
      12,
    ),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("sievetower", {
  width: W,
  height: H,
  label:
    "Una torre de tres capas escalonadas sobre una placa: acceso arriba, límite en medio y forma abajo, con una tolva en lo alto. Un cable baja de escalón en escalón; en cada uno hay una luz y, a su derecha, un cartel con la respuesta de quien no pasa: 401, 429 y 422. Al pie, un distribuidor redondo con una aguja reparte lo que llega entre tres manejadores en fila. Del tercero sale una línea hasta una pantalla que muestra datos en vivo.",
  body: full.body,
  motion: { P, down: DOWN.map(flat), refuse: SIGNS.map((s) => flat(s.path)), out: OUT.map(flat), live: flat(LIVE_LINE) },
  thumb: small.body
    .join("")
    .replace('<g data-part="pass-0" class="veo-lamp" data-tone="ok">', '<g class="veo-lamp" data-tone="ok" data-on="">')
    .replace('<g data-part="sign-1" class="veo-lamp">', '<g class="veo-lamp" data-on="">')
    .replace(/<g data-part="bar-(\d)" opacity="0">/g, "<g>"),
  parts: full.parts,
});
