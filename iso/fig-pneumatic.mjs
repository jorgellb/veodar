// Correo neumático de peticiones: a capsule (the request) rides glass tubes
// from the browser terminal to the API, down to the database and back.
import { G, k, kitFor, save } from "./lib.mjs";

const W = 760;
const H = 460;
const PLATE = { x: -134, y: -50, w: 268, d: 100, r: 10 };
const C = { x: -90, top: 26 };
const A = { x: 0, top: 28 };
const D = { x: 90, top: 30 };
const OUT_Z = 46;
const BACK_Z = 38;
const R_TUBE = 3.2;

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [-96, -5, OUT_Z + 4], [84, -5, OUT_Z + 4]], W, H, {
  pad: 22,
  azimuth: 54,
  elevation: 30,
});
const { at, S, L, D: dots, slab, cyl, screws, base, label, ruler, lamp, slot, faceY, screen } = kitFor(P);
const KS = G.scaleOf(P);

const out = [base(PLATE)];

// ── Client terminal ──────────────────────────────────────────────────────
const term = { x: -110, y: -18, w: 40, d: 32, r: 3 };
out.push(slab(term, 0, C.top, "mid", { steps: 4, bevel: 0.6, seam: 5 }));
out.push(
  faceY(
    -106,
    term.y + term.d,
    22,
    screen(
      32,
      14,
      `<path class="scr-s" data-t="dim" d="M0 3.4h32"/><circle class="scr-f" data-t="acc" cx="2.6" cy="1.8" r=".8"/>` +
        [22, 16, 19, 12].map((len, i) => `<g data-line="${i}" opacity="0"><path class="scr-s" data-t="${i === 0 ? "hi" : ""}" d="M3 ${5.8 + i * 2.2}h${len}"/></g>`).join(""),
      1.4,
    ),
  ),
);
out.push(dots([at([-72, term.y + term.d, 5])], { size: 0.6, tone: "hi" }));
const kb = { x: -108, y: 18, w: 36, d: 12, r: 1.6 };
out.push(slab(kb, 0, 2.4, "mid", { steps: 3, bevel: 0.4 }));
out.push(dots(k.dotGrid(kb.x + 3, kb.y + 3, 11, 3, 3, 2.4, P), { size: 0.55, tone: "lo" }));
out.push(...screws(k.corners(term, 3), C.top, 1, 0.45));

// ── API station with an instrument box ───────────────────────────────────
const api = { x: -22, y: -18, w: 44, d: 28, r: 3 };
out.push(slab(api, 0, A.top, "mid", { steps: 4, bevel: 0.6, seam: 6 }));
for (const r of [7.5, 5.2, 2.8]) out.push(L(k.sideRing([0, api.y + api.d, 14], r, "y", P, 32), { tone: r === 7.5 ? "mid" : "lo" }));
out.push(L(k.segment([-7.5, api.y + api.d, 14], [7.5, api.y + api.d, 14], P) + k.segment([0, api.y + api.d, 6.5], [0, api.y + api.d, 21.5], P), { tone: "lo" }));
out.push(lamp(-16, -13, A.top, 1.8, "api-lamp"));
out.push(dots([at([16, -13, A.top]), at([16, -9.6, A.top])], { size: 0.5, tone: "mid" }));
const inst = { x: -15, y: 13, w: 30, d: 18, r: 2.4 };
out.push(slab(inst, 0, 10, "mid", { steps: 4, bevel: 0.5 }));
out.push(cyl(0, 22, 8.6, 10, 4, "hi", { steps: 48, bevel: 0.5, crease: "lo" }));
out.push(L(k.ring(0, 22, 7, 14, P, 48), { tone: "lo" }));
const t = k.radialTicks(0, 22, 6.6, 20, 5, 14, [0.9, 2], P, -0.75 * Math.PI, 1.5 * Math.PI);
out.push(L(t.minor, { tone: "lo" }), L(t.major, { tone: "mid" }), `<g data-part="needle"></g>`);
out.push(dots([at([0, 22, 14.1])], { size: 0.6, tone: "hi" }));

// ── Database: three stacked platters ─────────────────────────────────────
const DB = { x: D.x, y: 0, r: 17 };
[
  [0, 8.6],
  [10, 8.6],
  [20, 8.6],
].forEach(([z, h], i) => {
  if (i) out.push(cyl(DB.x, DB.y, DB.r - 2, z - 1.4, 1.4, "lo", { steps: 56 }));
  out.push(cyl(DB.x, DB.y, DB.r, z, h, "hi", { steps: 64, bevel: 0.6, crease: "lo", inner: L(k.sideArc(DB.x, DB.y, DB.r, z + h / 2, P, 40), { tone: "faint" }) }));
  out.push(dots([at([DB.x + DB.r * 0.62, DB.y + DB.r * 0.78, z + h / 2])], { size: 0.6, tone: i === 1 ? "hi" : "mid" }));
});
out.push(cyl(DB.x, DB.y, 9, 28.6, 1.4, "mid", { steps: 40 }));
out.push(L(k.ring(DB.x, DB.y, 13.4, 28.6, P, 56), { tone: "faint" }));
out.push(lamp(DB.x + 10, DB.y - 8, 28.6, 1.6, "db-lamp"));

// ── Tubes ────────────────────────────────────────────────────────────────
const route = (x0, y, z0, z, x1, z1) =>
  G.resample(
    G.fillet(
      [
        [x0, y, z0],
        [x0, y, z],
        [x1, y, z],
        [x1, y, z1],
      ],
      7,
      10,
    ),
    1.5,
  );
const routes = [
  route(-96, -5, C.top + 3, OUT_Z, -8, A.top + 3),
  route(8, -5, A.top + 3, OUT_Z, 84, D.top + 3),
  route(96, 5, D.top + 3, BACK_Z, 8, A.top + 3),
  route(-8, 5, A.top + 3, BACK_Z, -84, C.top + 3),
];
// Port collars on the station tops.
const ports = [
  [-96, -5, C.top],
  [-84, 5, C.top],
  [-8, -5, A.top],
  [8, -5, A.top],
  [8, 5, A.top],
  [-8, 5, A.top],
  [84, -5, D.top],
  [96, 5, D.top],
];
for (const [x, y, z] of ports) {
  out.push(cyl(x, y, R_TUBE + 2.2, z, 1, "lo", { steps: 24 }));
  out.push(cyl(x, y, R_TUBE + 1.2, z + 1, 2, "mid", { steps: 24, bevel: 0.3 }));
}
// Supports under the runs (back first).
for (const [x, y, z] of [
  [-52, -5, OUT_Z],
  [48, -5, OUT_Z],
  [-52, 5, BACK_Z],
  [48, 5, BACK_Z],
]) {
  out.push(cyl(x, y, 3.4, 0, 1.4, "lo", { steps: 18 }));
  out.push(cyl(x, y, 1.6, 1.4, z - R_TUBE - 2.4, "mid", { steps: 14, crease: "none" }));
}

const wTube = 2 * R_TUBE * KS;
const pathOf = (pts) => k.pathOf(pts.map(at));
const tubeSvg = (pts, i) =>
  `<g class="veo-tube">` +
  `<path class="veo-tube-edge" d="${pathOf(pts)}" style="stroke-width:${(wTube + 1.4).toFixed(2)}"/>` +
  `<path class="veo-tube-glass" d="${pathOf(pts)}" style="stroke-width:${wTube.toFixed(2)}"/>` +
  `<path class="veo-capsule" data-part="cap-${i}" d="" style="stroke-width:${(wTube * 0.72).toFixed(2)}"/>` +
  `<path class="veo-tube-glint" d="${k.pathOf(pts.map(at).map(([x, y]) => [x, y - wTube * 0.24]))}"/>` +
  `</g>`;
routes.forEach((pts, i) => {
  out.push(tubeSvg(pts, i));
  // Clamp bands over the support points of this run.
  const z = i < 2 ? OUT_Z : BACK_Z;
  const y = i < 2 ? -5 : 5;
  for (const x of [-52, 48]) {
    const along = pts.some(([px, , pz]) => Math.abs(px - x) < 1 && Math.abs(pz - z) < 0.5);
    if (!along) continue;
    out.push(slab({ x: x - 1.6, y: y - R_TUBE - 1, w: 3.2, d: 2 * R_TUBE + 2, r: 0.6 }, z - R_TUBE - 1, 2 * R_TUBE + 2, "mid", { steps: 2, bevel: 0.2 }));
  }
});

out.push(label({ x: -128, y: 34, w: 50, d: 11, r: 1 }, "HTTP · 200"));
out.push(ruler({ x: 30, y: 40, w: 96, d: 6, r: 1 }));

save("pneumatic", {
  width: W,
  height: H,
  label:
    "Un correo neumático sobre una placa: una terminal de navegador, una estación de API con un reloj de latencia y una base de datos de tres platos, unidas por tubos de cristal; una cápsula lleva la petición de ida y la respuesta de vuelta.",
  body: out,
  motion: {
    P,
    routes: routes.map((pts) => pts.map(([x, y, z]) => [Math.round(x * 10) / 10, Math.round(y * 10) / 10, Math.round(z * 10) / 10])),
    gauge: { x: 0, y: 22, r: 6.6, top: 14.1 },
  },
});
