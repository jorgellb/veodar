// Programador de levas: a pinned drum turns once per cycle; each track's pin
// lifts the roller of its microswitch and lights the lamp of that step.
import { G, k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 460;
const PLATE = { x: -112, y: -56, w: 224, d: 112, r: 10 };
const AX = { y: 4, z: 30 };
const R = 14;
const X0 = -74;
const X1 = 46;
const TRACKS = [-56, -26, 4, 34];
const ROLL = { a: -0.32, r: 1.9 };
const PIN = 3;
const LEVELS = 7;

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [70, 4, 66], [-70, -34, 52]], W, H, { pad: 22, azimuth: 52, elevation: 30 });
const { at, S, L, D, slab, cyl, screws, base, label, ruler, lamp, slot } = kitFor(P);

const out = [base(PLATE)];

// Rear rail on posts with the four microswitch bodies.
for (const x of [-70, 38]) out.push(cyl(x, -31, 2.6, 0, 36, "mid", { steps: 16, crease: "none" }));
out.push(slab({ x: -78, y: -35, w: 124, d: 8, r: 1.4 }, 36, 4, "mid", { steps: 3, bevel: 0.4 }));
const pivotY = -20;
const pivotZ = 46;
TRACKS.forEach((x) => {
  const body = { x: x - 7, y: -33, w: 14, d: 13, r: 1.6 };
  out.push(slab(body, 40, 10, "mid", { steps: 3, bevel: 0.5, seam: 44 }));
  out.push(D([at([x - 4, -33 + 13, 47.5]), at([x + 4, -33 + 13, 47.5])], { size: 0.45 }));
  out.push(L(slot("y", body.y + body.d, x - 3, x + 3, 41.5, 43.5, 0.8), { tone: "lo" }));
  out.push(cyl(x, -27, 1.4, 50, 1.6, "hi", { steps: 14, crease: "lo" }));
});

// Left bearing block (far end), the drum, the right block (near end).
out.push(slab({ x: -84, y: -8, w: 8, d: 24, r: 1.5 }, 0, AX.z + 8, "mid", { steps: 3, bevel: 0.5, seam: 6 }));
const F = G.frameAlong([X0, AX.y, AX.z], [1, 0, 0]);
const grooves = TRACKS.flatMap((x) => [G.arcOf(F, x - X0 - 4, R, P), G.arcOf(F, x - X0 + 4, R, P)]).join("");
out.push(S(G.solidOf([[0, R], [X1 - X0, R]], F, P, {}), { tone: "hi", crease: "lo", inner: L(grooves, { tone: "faint" }) }));
out.push(`<g data-part="pins"></g>`);
out.push(slab({ x: 48, y: -8, w: 8, d: 24, r: 1.5 }, 0, AX.z + 8, "mid", { steps: 3, bevel: 0.5, seam: 6 }));
out.push(L(k.sideRing([56, AX.y, AX.z], 5.2, "x", P, 32) + k.sideRing([56, AX.y, AX.z], 3, "x", P, 24), { tone: "lo" }));
const shaft = G.frameAlong([56, AX.y, AX.z], [1, 0, 0]);
out.push(S(G.disc(0, 6, 2.4, shaft, P, {}), { tone: "mid", crease: "none" }));

// Gearbox with the drive gear and a finned motor on top.
const box = { x: 62, y: -12, w: 16, d: 32, r: 2 };
out.push(slab(box, 0, 46, "mid", { steps: 3, bevel: 0.5, seam: 8 }));
out.push(...screws([[66, -8], [74, -8], [66, 16], [74, 16]], 46, 1, 0.45));
const gearF = G.frameAlong([78, AX.y, AX.z], [1, 0, 0]);
out.push(S(G.disc(0, 2.6, 13, gearF, P, {}), { tone: "hi", crease: "lo" }));
out.push(`<g data-part="gear"></g>`);
out.push(cyl(70, 4, 8.4, 46, 1.4, "lo", { steps: 36 }));
out.push(cyl(70, 4, 7, 47.4, 15, "mid", { steps: 40, bevel: 0.4 }));
out.push(L(k.knurl(70, 4, 7, 49, 60, 30, P, 0.3), { tone: "lo" }));
out.push(cyl(70, 4, 4.6, 62.4, 2.4, "hi", { steps: 30, crease: "lo" }));

// Levers and rollers, pre-built at each lift level.
const rollerAt = (x, lift) => {
  const rr = R + ROLL.r + lift;
  return [x, AX.y + rr * Math.sin(ROLL.a), AX.z + rr * Math.cos(ROLL.a)];
};
TRACKS.forEach((x, i) => {
  const variants = [];
  for (let level = 0; level < LEVELS; level++) {
    const lift = (PIN * level) / (LEVELS - 1);
    const [, ry, rz] = rollerAt(x, lift);
    const LF = G.frameOf([x - 1.3, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]);
    const lever = G.prismOf(LF, [
      [pivotY, pivotZ - 1.2],
      [ry, rz + 0.4],
      [ry, rz + 2.2],
      [pivotY, pivotZ + 1.2],
    ], 0, 2.6, P);
    const roll = G.disc(0, 3.4, ROLL.r, G.frameAlong([x - 1.7, ry, rz], [1, 0, 0]), P, {});
    variants.push(
      `<g data-level="${level}"${level ? ' style="display:none"' : ""}>${S(lever, { tone: "hi", crease: "lo" })}${S(roll, { tone: "mid", crease: "none" })}${D([at([x + 1.7, ry, rz])], { size: 0.5, tone: "hi" })}</g>`,
    );
  }
  out.push(`<g data-part="lever-${i}">${variants.join("")}</g>`);
});

// Front panel: one lamp per step, with dots counting the step.
const panel = { x: -68, y: 30, w: 108, d: 16, r: 2 };
out.push(slab(panel, 0, 9, "mid", { steps: 4, bevel: 0.5, seam: 3 }));
TRACKS.forEach((x, i) => {
  out.push(lamp(x, 37, 9, 2.4, `step-${i}`));
  out.push(D(Array.from({ length: i + 1 }, (_, j) => at([x + 6 + j * 2, 37, 9])), { size: 0.5, tone: "hi" }));
});
out.push(...screws(k.corners(panel, 2.8), 9, 0.9, 0.4));

out.push(label({ x: 52, y: 32, w: 50, d: 12, r: 1 }, "PROCESO · 4"));
out.push(ruler({ x: -60, y: 49, w: 100, d: 5, r: 1 }));

save("sequencer", {
  width: W,
  height: H,
  label:
    "Un programador de levas sobre una placa: un tambor con cuatro pistas de pines gira movido por un motor y un engranaje; cada pin levanta el rodillo de un microinterruptor y enciende la lámpara de su paso.",
  body: out,
  motion: { P, axis: { ...AX, x0: X0, x1: X1 }, R, tracks: TRACKS, roll: ROLL, pin: PIN, levels: LEVELS, gear: { x: 80.6, ...AX, r: 13 } },
});
