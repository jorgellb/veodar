// React: an instrument desk. Three screens, filters, list and record, hang off one
// wheel that holds the shared state. Turn the wheel and the three follow at once.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const SX = [-85, 0, 85]; // centre of each screen
const MON = { y: -44, w: 54, d: 5, r: 2, z: 14, h: 40 };
const SW = MON.w - 6;
const SH = MON.h - 6;
const WHEEL = { x: 0, y: 24, base: 24, r: 15 };
const HUB = { x: -10, y: -12, w: 20, d: 10, r: 1.6, h: 6 };
const DETENTS = [1.56, 2.36, 3.16]; // one per state, on the side of the wheel that faces the viewer
const KEYS = { x: -98, y: 8, w: 34, d: 20, r: 2.4, h: 6 };
const routeOf = (i) => [
  [[-6, 0, 6][i], HUB.y, 3],
  [[-6, 0, 6][i], -24, 0.9],
  [SX[i], -24, 0.9],
  [SX[i], MON.y + 9, 0.9],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [SX[0] - MON.w / 2, MON.y, MON.z + MON.h + 2], [SX[2] + MON.w / 2, MON.y, MON.z + MON.h + 2]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, D, slab, cyl, screws, base, label, ruler, lamp, faceY, screen, cable, shadow, pick } = kitFor(P, { lod });

  // What each screen shows. `state` fixes a still picture; the page drives the rest.
  const ROWS = [18, 13, 20, 11, 16];
  const MATCH = [
    [0, 1, 2, 3, 4],
    [0, 2],
    [1, 3, 4],
  ];
  const ui = {
    filters: (state) =>
      `<rect class="scr-f" data-t="mid" x="3" y="3" width="16" height="2.4" rx=".8"/>` +
      [0, 1, 2]
        .map(
          (i) =>
            `<rect class="scr-f" x="3" y="${9 + i * 6}" width="7" height="3.4" rx="1.7"/><circle class="scr-f" data-t="hi" data-knob="${i}" cx="${i === state ? 8.3 : 4.7}" cy="${10.7 + i * 6}" r="1.2"/>` +
            `<path class="scr-s" data-t="${i === state ? "hi" : ""}" data-flabel="${i}" d="M13 ${10.7 + i * 6}h${[14, 20, 17][i]}"/>`,
        )
        .join("") +
      [0, 1, 2].map((i) => `<rect class="scr-f${i === state ? " scr-glow" : ""}" data-t="${i === state ? "acc" : ""}" data-chip="${i}" x="${3 + i * 15}" y="27.4" width="13" height="4" rx="2"/>`).join(""),
    list: (state) =>
      `<path class="scr-s" data-t="dim" d="M0 6h${SW}"/><rect class="scr-f" data-t="mid" x="3" y="2" width="14" height="2.4" rx=".8"/>` +
      `<rect class="scr-f" data-part="sel" x="1.6" y="${7.6 + MATCH[state][0] * 5.2}" width="${SW - 3.2}" height="4.6" rx="1"/>` +
      ROWS.map(
        (len, i) =>
          `<g data-row="${i}"${MATCH[state].includes(i) ? "" : ' opacity=".16"'}><circle class="scr-f" data-t="${MATCH[1].includes(i) ? "acc" : "mid"}" cx="4.4" cy="${9.9 + i * 5.2}" r="1"/>` +
          `<path class="scr-s" data-t="hi" d="M8 ${9.9 + i * 5.2}h${len}"/>` +
          pick(`<rect class="scr-f" data-t="mid" x="${SW - 12}" y="${8.5 + i * 5.2}" width="8.6" height="2.8" rx="1.4"/>`) +
          `</g>`,
      ).join(""),
    record: (state) =>
      `<rect class="scr-f" data-t="mid" x="3" y="3" width="10" height="10" rx="1.6"/>` +
      `<text class="scr-t" data-part="rec-id" x="16" y="8" font-size="4.4" font-weight="600">#${["0138", "0138", "0139"][state]}</text>` +
      pick(`<path class="scr-s" data-t="dim" d="M16 11.6h20"/>`) +
      [0, 1, 2].map((i) => `<path class="scr-s" data-t="dim" d="M3 ${18.6 + i * 4.4}h8"/><path class="scr-s" data-t="hi" data-field="${i}" d="M14 ${18.6 + i * 4.4}h${[22, 15, 26][i]}"/>`).join("") +
      `<rect class="scr-f${state === 2 ? "" : " scr-glow"}" data-t="${state === 2 ? "mid" : "acc"}" data-part="rec-pill" x="${SW - 17}" y="3.6" width="14" height="4.4" rx="2.2"/>`,
  };
  const KINDS = ["filters", "list", "record"];

  const monitor = (i, state = 0, hooks = true) => {
    const x = SX[i] - MON.w / 2;
    let inner = ui[KINDS[i]](state);
    if (!hooks) inner = inner.replace(/ data-(?:part|row|chip|knob|flabel|field)="[^"]*"/g, "");
    return (
      slab({ x: SX[i] - 12, y: MON.y - 3, w: 24, d: 14, r: 2 }, 0, 2, "lo", { steps: 3, bevel: 0.4 }) +
      slab({ x: SX[i] - 3, y: MON.y, w: 6, d: 4, r: 0.8 }, 2, MON.z - 1, "mid", { steps: 2, bevel: 0.3 }) +
      slab({ ...MON, x }, MON.z, MON.h, "hi", { steps: 4, bevel: 0.6, crease: "lo" }) +
      `<g data-screen="${KINDS[i]}">${faceY(x + 3, MON.y + MON.d, MON.z + MON.h - 3, screen(SW, SH, inner, 1.6))}</g>` +
      lamp(SX[i] + 8, MON.y + 7, 2, 1.5, `scr-${i}`)
    );
  };

  // ── The state: a hub that feeds the three screens and the wheel that sets it ──
  const hub = () => slab(HUB, 0, HUB.h, "mid", { steps: 3, bevel: 0.5, seam: 2 }) + screws(k.corners(HUB, 2.6), HUB.h, 0.8, 0.4).join("");
  const wheel = (state = 0, hooks = true) => {
    const out = [];
    out.push(cyl(WHEEL.x, WHEEL.y, WHEEL.base, 0, 5, "mid", { steps: 72, bevel: 0.6 }));
    const ticks = k.radialTicks(WHEEL.x, WHEEL.y, WHEEL.base - 2.4, 36, 3, 5, [1.2, 2.4], P, 0.76, 3.2);
    out.push(L(ticks.minor, { tone: "lo", fine: true }), L(ticks.major, { tone: "mid", fine: true }));
    DETENTS.forEach((a, i) => {
      const [x, y] = [WHEEL.x + Math.sin(a) * (WHEEL.base - 4.6), WHEEL.y - Math.cos(a) * (WHEEL.base - 4.6)];
      out.push(`<g data-part="det-${i}" class="veo-lamp"${i === state && !hooks ? ' data-on=""' : ""}>${cyl(x, y, 1.7, 5, 1.4, "hi", { steps: 14, crease: "lo" })}</g>`);
    });
    out.push(cyl(WHEEL.x, WHEEL.y, WHEEL.r, 5, 9, "hi", { steps: 64, bevel: 0.6, crease: "lo", lit: true, inner: L(k.knurl(WHEEL.x, WHEEL.y, WHEEL.r, 6.6, 12.4, 64, P, 0.3), { tone: "lit", fine: true }) }));
    out.push(L(k.ring(WHEEL.x, WHEEL.y, WHEEL.r - 3.4, 14, P, 48), { tone: "lit", fine: true }));
    const a = DETENTS[state];
    const tip = [WHEEL.x + Math.sin(a) * (WHEEL.r - 1.6), WHEEL.y - Math.cos(a) * (WHEEL.r - 1.6)];
    out.push(`<g${hooks ? ' data-part="needle"' : ""}>${L(k.lineOnTop([WHEEL.x, WHEEL.y], tip, 14.05, P), { tone: "hi" })}</g>`);
    out.push(cyl(WHEEL.x, WHEEL.y, 2.6, 14, 1.6, "hi", { steps: 20, crease: "lo" }));
    return out.join("");
  };
  // Three keys: what the person presses. Each one asks the wheel for a state.
  const keys = (down = -1) => {
    const out = [slab(KEYS, 0, KEYS.h, "mid", { steps: 4, bevel: 0.6, seam: 2 })];
    [0, 1, 2].forEach((i) => {
      const x = KEYS.x + 7 + i * 10;
      out.push(cyl(x, KEYS.y + 10, 3.9, KEYS.h, 0.8, "lo", { steps: 22 }));
      out.push(`<g data-part="key-${i}">${cyl(x, KEYS.y + 10, 3, KEYS.h + 0.8, i === down ? 0.9 : 2.4, "hi", { steps: 22, bevel: 0.3, crease: "lo" })}</g>`);
    });
    return out.join("");
  };
  const keyWire = () => cable([[KEYS.x + KEYS.w, KEYS.y + 6, 3], [-30, KEYS.y + 6, 0.9], [-30, -7, 0.9], [HUB.x, -7, 3]]);
  const wires = (on = false) =>
    [0, 1, 2]
      .map((i) => cable(routeOf(i), `wire-${i}`))
      .join("")
      .replace(/class="veo-cable"/g, `class="veo-cable"${on ? ' data-on=""' : ""}`) + cable([[0, HUB.y + HUB.d, 3], [0, 4, 0.9], [0, 6, 3]]);

  const body = [
    base(PLATE),
    wires(),
    ...[0, 1, 2].map((i) => monitor(i)),
    keyWire(),
    hub(),
    keys(),
    wheel(),
    label({ x: -118, y: 36, w: 60, d: 11, r: 1 }, "ESTADO · COMPARTIDO"),
    ruler({ x: 40, y: 38, w: 76, d: 6, r: 1 }),
    `<g data-part="beads">${[0, 1, 2].map((i) => `<g data-bead="${i}" opacity="0"><circle class="veo-bead" r="2.2"/></g>`).join("")}</g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const one = (i, state) => part([shadow({ x: SX[i] - 26, y: MON.y - 2, w: 52, d: 14, r: 3 }), monitor(i, state, false)], k.boxCorners({ x: SX[i] - MON.w / 2, y: MON.y - 3, w: MON.w, d: 14 }, 0, MON.z + MON.h + 2), 14);
  const stub = (on) => cable([[0, HUB.y + HUB.d, 3], [0, 4, 0.9], [0, 6, 3]]).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);
  const dialBox = k.boxCorners({ x: -WHEEL.base, y: HUB.y, w: WHEEL.base * 2, d: WHEEL.y + WHEEL.base - HUB.y }, 0, 16);
  const parts = {
    list: one(1, 1),
    dial: part([shadow({ x: -22, y: 2, w: 44, d: 44, r: 20 }), stub(false), hub(), wheel(0, false)], dialBox, 20),
    filters: one(0, 1),
    record: one(2, 1),
    detail: part([shadow({ x: -22, y: 2, w: 44, d: 44, r: 20 }), stub(true), hub(), wheel(1, false)], dialBox, 20),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("instruments", {
  width: W,
  height: H,
  label:
    "Una mesa de instrumentos sobre una placa: tres pantallas en fila —filtros, listado y detalle de un registro— unidas por cable a un mismo cubo de estado. Delante, una rueda moleteada con tres posiciones cambia ese estado y las tres pantallas se actualizan a la vez.",
  body: full.body,
  motion: { P, wheel: { x: WHEEL.x, y: WHEEL.y, r: WHEEL.r - 1.6, z: 14.05 }, detents: DETENTS, routes: [0, 1, 2].map((i) => flat(routeOf(i))) },
  thumb: small.body.join("").replace('data-part="det-0" class="veo-lamp"', 'data-part="det-0" class="veo-lamp" data-on=""'),
  parts: full.parts,
});
