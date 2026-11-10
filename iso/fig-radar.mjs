// Radar de búsquedas: the scope sweeps the questions people ask; each echo is
// a site that answers, and the nearer the centre, the higher it ranks.
import { G, k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 460;
const PLATE = { x: -98, y: -56, w: 196, d: 112, r: 10 };
const SCOPE = { x: -36, y: 0, r: 32, z: 20 };
const MAST = { x: 72, y: -14 };

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [MAST.x, MAST.y, 76], [MAST.x - 28, MAST.y, 74], [MAST.x + 28, MAST.y, 74]], W, H, {
  pad: 22,
  azimuth: 48,
  elevation: 32,
});
const { at, S, L, D, slab, cyl, screws, base, label, ruler, knob, lamp, slot } = kitFor(P);

const out = [base(PLATE)];

// Console housing.
const con = { x: -82, y: -46, w: 100, d: 92, r: 6 };
out.push(slab(con, 0, SCOPE.z, "mid", { steps: 6, bevel: 0.8, seam: 6 }));
for (let i = 0; i < 7; i++) out.push(L(slot("y", con.y + con.d, con.x + 16 + i * 6, con.x + 19 + i * 6, 3, 12, 1), { tone: "lo" }));
out.push(...screws(k.corners(con, 4), SCOPE.z, 1.4, 0.5));

// Scope: knurled bezel, glass face, range rings, crosshair and ticks.
const top = SCOPE.z + 4;
out.push(cyl(SCOPE.x, SCOPE.y, SCOPE.r + 4, SCOPE.z, 4, "mid", { steps: 72, bevel: 0.6 }));
out.push(L(k.knurl(SCOPE.x, SCOPE.y, SCOPE.r + 4, SCOPE.z + 0.6, top, 120, P, 0.3), { tone: "lo" }));
out.push(`<g class="veo-dark">${cyl(SCOPE.x, SCOPE.y, SCOPE.r, top, 0.4, "hi", { steps: 72, crease: "lo" })}</g>`);
const face = top + 0.4;
out.push(`<g class="veo-on-dark">`);
for (const r of [9, 18, 27]) out.push(L(k.ring(SCOPE.x, SCOPE.y, r, face, P, 72), { tone: r === 27 ? "mid" : "faint" }));
out.push(L(k.lineOnTop([SCOPE.x - SCOPE.r + 1, SCOPE.y], [SCOPE.x + SCOPE.r - 1, SCOPE.y], face, P) + k.lineOnTop([SCOPE.x, SCOPE.y - SCOPE.r + 1], [SCOPE.x, SCOPE.y + SCOPE.r - 1], face, P), { tone: "faint" }));
const ticks = k.radialTicks(SCOPE.x, SCOPE.y, SCOPE.r - 0.6, 72, 6, face, [1.2, 2.6], P);
out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
out.push(D([at([SCOPE.x, SCOPE.y, face])], { size: 0.7, tone: "hi" }));
out.push(`</g><g data-part="sweep"></g><g data-part="blips"></g>`);

// Controls on the right of the console.
out.push(knob(6, -26, 4.4, SCOPE.z, 5, { pointer: 1.2 }));
out.push(knob(6, -8, 4.4, SCOPE.z, 5, { pointer: -0.6 }));
out.push(knob(6, 10, 3.4, SCOPE.z, 4, { pointer: 0.3 }));
out.push(lamp(6, 28, SCOPE.z, 1.8, "found"));
out.push(lamp(-1, 34, SCOPE.z, 1.4, "power"));

// Cable from the mast to the console's right face.
out.push(k.wireSvg(at([MAST.x - 12, MAST.y, 1]), at([con.x + con.w, MAST.y, 5]), { via: [at([MAST.x - 12, MAST.y, 0.6]), at([con.x + con.w + 8, MAST.y, 0.6])], tone: "mid", size: 1 }));

// Mast with its gearbox; the antenna bar turns on top.
out.push(cyl(MAST.x, MAST.y, 14, 0, 2, "lo", { steps: 48 }));
out.push(cyl(MAST.x, MAST.y, 11, 2, 5, "mid", { steps: 48, bevel: 0.5 }));
out.push(...screws(k.circleRing(MAST.x, MAST.y, 8.6, 6).map(([x, y]) => [x, y]), 7, 0.9, 0.45));
out.push(cyl(MAST.x, MAST.y, 3.6, 7, 52, "mid", { steps: 24, crease: "none", inner: L(k.sideArc(MAST.x, MAST.y, 3.6, 30, P, 16), { tone: "faint" }) }));
out.push(cyl(MAST.x, MAST.y, 7, 59, 8, "hi", { steps: 40, bevel: 0.5, crease: "lo", inner: L(k.sideArc(MAST.x, MAST.y, 7, 63, P, 24), { tone: "faint" }) }));
out.push(cyl(MAST.x, MAST.y, 4.4, 67, 2, "mid", { steps: 28 }));
out.push(`<g data-part="antenna"></g>`);

out.push(label({ x: 26, y: 26, w: 54, d: 12, r: 1 }, "SEO · GEO"));
out.push(ruler({ x: -82, y: 47, w: 100, d: 6, r: 1 }));

save("radar", {
  width: W,
  height: H,
  label:
    "Un radar sobre una placa: una consola con pantalla redonda, anillos de distancia y un barrido que gira, y un mástil con una antena de barra que gira a la vez; los ecos son las webs que responden a una búsqueda y el de Veodar se acerca al centro barrido a barrido.",
  body: out,
  motion: { P, scope: { ...SCOPE, face }, mast: { ...MAST, z: 69 } },
});
