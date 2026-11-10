// Manipulador Morse: the key taps H-O-L-A; the signal lamp flashes with each
// press and the register inks dots and dashes on a tape that keeps moving.
import { G, coilZ, k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 440;
const PLATE = { x: -104, y: -48, w: 208, d: 96, r: 10 };
const PIVOT = { x: -58, z: 22 };
const LEVER = { back: -82, front: -26, h: 3.2, w: 4.6 };
const TILT = 0.105;
const LEVELS = 6;
const LAMP = { x: 44, y: -24 };
const TAPE = { x0: 48, x1: 98, y: 22, z: 6.4 };

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [LAMP.x, LAMP.y, 52], [-26, 0, 36]], W, H, { pad: 22, azimuth: 50, elevation: 30 });
const { at, S, L, D, slab, cyl, screws, base, label, lamp } = kitFor(P);

const out = [base(PLATE)];

// Signal lamp on a stand (back right).
out.push(cyl(LAMP.x, LAMP.y, 11, 0, 2, "lo", { steps: 40 }));
out.push(cyl(LAMP.x, LAMP.y, 8.4, 2, 3.4, "mid", { steps: 40, bevel: 0.4 }));
out.push(cyl(LAMP.x, LAMP.y, 2.4, 5.4, 25, "mid", { steps: 18, crease: "none" }));
out.push(cyl(LAMP.x, LAMP.y, 7.6, 30, 9, "mid", { steps: 40, bevel: 0.5, inner: L(k.sideArc(LAMP.x, LAMP.y, 7.6, 33, P, 28), { tone: "faint" }) }));
out.push(cyl(LAMP.x, LAMP.y, 8.4, 39, 1.6, "mid", { steps: 40 }));
out.push(`<g data-part="lens" class="veo-lamp">${S(G.sphereOf([LAMP.x, LAMP.y, 44.6], 6.4, P), { tone: "hi", crease: "none" })}</g>`);
out.push(`<g data-part="halo" opacity="0"><circle cx="${at([LAMP.x, LAMP.y, 44.6])[0].toFixed(1)}" cy="${at([LAMP.x, LAMP.y, 44.6])[1].toFixed(1)}" r="22" fill="url(#tg-glow)"/></g>`);

// Wooden base of the key with brass trunnions.
const board = { x: -90, y: -20, w: 72, d: 40, r: 4 };
out.push(slab(board, 0, 6, "mid", { steps: 5, bevel: 0.8, seam: 3 }));
out.push(...screws(k.corners(board, 4), 6, 1.2, 0.45));
out.push(slab({ x: PIVOT.x - 3, y: -13, w: 6, d: 4, r: 1 }, 6, PIVOT.z - 3, "mid", { steps: 2, bevel: 0.3 }));
// Contact post under the front of the lever.
out.push(cyl(-34, 0, 3, 6, 1.4, "lo", { steps: 18 }));
out.push(cyl(-34, 0, 1.5, 7.4, 8.4, "hi", { steps: 14, crease: "lo" }));
out.push(D([at([-34, 0, 15.8])], { size: 0.6, tone: "hi" }));
// Back stop screw.
out.push(cyl(-86, 0, 1.6, 6, 20, "mid", { steps: 14, crease: "none" }));
out.push(cyl(-86, 0, 2.8, 26, 2.4, "mid", { steps: 18 }));

// Lever variants: tilt level 0 (up) … LEVELS-1 (pressed). Each carries its spring and knob.
const LF = G.frameOf([0, -LEVER.w / 2, 0], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
const rot = ([x, z], a) => {
  const dx = x - PIVOT.x;
  const dz = z - PIVOT.z;
  return [PIVOT.x + dx * Math.cos(a) + dz * Math.sin(a), PIVOT.z - dx * Math.sin(a) + dz * Math.cos(a)];
};
const variants = [];
for (let level = 0; level < LEVELS; level++) {
  const a = (TILT * level) / (LEVELS - 1);
  const poly = [
    [LEVER.back, PIVOT.z - LEVER.h / 2],
    [LEVER.front, PIVOT.z - LEVER.h / 2],
    [LEVER.front, PIVOT.z + LEVER.h / 2],
    [LEVER.back, PIVOT.z + LEVER.h / 2],
  ].map((p) => rot(p, a));
  const lever = G.prismOf(LF, poly, 0, LEVER.w, P);
  const [sx, sz] = rot([-76, PIVOT.z - LEVER.h / 2], a);
  const spring = coilZ(6, sz, sx, 0, 2.4, 6, P);
  const [kx, kz] = rot([LEVER.front + 3, PIVOT.z + LEVER.h / 2], a);
  const knob = [
    S(k.cylinder(kx, 0, 2.6, kz, 3, P, 18), { tone: "mid", crease: "none" }),
    S(k.cylinder(kx, 0, 7, kz + 3, 5.4, P, 40, 0.5), { tone: "hi", crease: "lo", inner: L(k.knurl(kx, 0, 7, kz + 3.4, kz + 8.4, 44, P, 0.3), { tone: "lo" }) }),
    L(k.ring(kx, 0, 4.2, kz + 8.4, P, 32), { tone: "faint" }),
  ].join("");
  variants.push(
    `<g data-level="${level}"${level ? ' style="display:none"' : ""}>${L(spring.back, { tone: "lo" })}${S(lever, { tone: "hi", crease: "lo" })}${L(spring.front, { tone: "mid" })}${knob}</g>`,
  );
}
out.push(`<g data-part="lever">${variants.join("")}</g>`);
// Near trunnion and the pivot pin end over the lever.
out.push(slab({ x: PIVOT.x - 3, y: 9, w: 6, d: 4, r: 1 }, 6, PIVOT.z - 3, "mid", { steps: 2, bevel: 0.3 }));
const PF = G.frameAlong([PIVOT.x, -14, PIVOT.z], [0, 1, 0]);
out.push(S(G.disc(22, 28, 1.5, PF, P, {}), { tone: "hi", crease: "lo" }));
out.push(S(G.disc(28, 29.4, 2.6, PF, P, {}), { tone: "mid", crease: "none" }));

// Wire from the key to the lamp, along the plate.
out.push(k.wireSvg(at([board.x + board.w, -6, 3]), at([LAMP.x - 8.4, LAMP.y, 3]), { via: [at([board.x + board.w + 6, -6, 0.6]), at([20, -6, 0.6]), at([20, LAMP.y, 0.6])], tone: "mid", size: 1 }));

// Register: box with two spools; the tape leaves on a guide table.
const reg = { x: 10, y: 4, w: 36, d: 30, r: 3 };
out.push(slab(reg, 0, 18, "mid", { steps: 4, bevel: 0.6, seam: 5 }));
for (const x of [20, 37]) {
  out.push(cyl(x, 14, 7.4, 18, 1.4, "lo", { steps: 36 }));
  out.push(cyl(x, 14, 5.6, 19.4, 4, "hi", { steps: 36, bevel: 0.4, crease: "lo" }));
  out.push(`<g data-spool="${x}"></g>`);
}
out.push(...screws(k.corners(reg, 3), 18, 0.9, 0.4));
const guide = { x: reg.x + reg.w - 2, y: TAPE.y - 7, w: TAPE.x1 - reg.x - reg.w + 4, d: 14, r: 1.6 };
out.push(slab(guide, 0, TAPE.z - 0.4, "mid", { steps: 3, bevel: 0.4 }));
const tape = { x: TAPE.x0 - 4, y: TAPE.y - 3.4, w: TAPE.x1 - TAPE.x0 + 4, d: 6.8, r: 0.4 };
const tapePaths = k.slabOf(tape, TAPE.z - 0.4, 0.4, P, 1, 0);
out.push(S(tapePaths, { tone: "hi", crease: "none" }));
out.push(`<clipPath id="tg-tape"><path d="${tapePaths.top}"/></clipPath><g clip-path="url(#tg-tape)"><g data-part="marks"></g></g>`);
// Inker wheel at the exit.
const IF = G.frameAlong([TAPE.x0 - 1, TAPE.y - 3.6, TAPE.z + 2.2], [0, 1, 0]);
out.push(S(G.disc(0, 7.2, 2.2, IF, P, {}), { tone: "mid", crease: "none" }));

out.push(label({ x: -96, y: 30, w: 54, d: 12, r: 1 }, "INFO@VEODAR"));
out.push(lamp(-22, -14, 6, 1.6, "contact"));

const glow = `<defs><radialGradient id="tg-glow"><stop offset="0" stop-color="#ff5a1f" stop-opacity=".55"/><stop offset=".45" stop-color="#ff5a1f" stop-opacity=".18"/><stop offset="1" stop-color="#ff5a1f" stop-opacity="0"/></radialGradient></defs>`;

save("telegraph", {
  width: W,
  height: H,
  label:
    "Un manipulador Morse sobre una placa: una palanca sobre muñones con un muelle y un pomo, un contacto debajo, una lámpara de señal que destella con cada pulsación y un registrador que imprime puntos y rayas en una cinta que avanza.",
  body: [glow, ...out],
  motion: { P, levels: LEVELS, tape: TAPE },
});
