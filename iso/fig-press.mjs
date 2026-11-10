// Prensa de marca: one die, three pieces. A card, a letterhead and an app icon
// slide under the ram and come out with the same mark at their own size; the
// colour chips and the type plate in front are the tokens the mark is cut from.
import { k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 470;
const PLATE = { x: -106, y: -56, w: 212, d: 112, r: 10 };
const BED = { x: -22, y: -24, w: 44, d: 44, r: 3, h: 14 };
const HEAD = { x: -25, y: -27, w: 50, d: 40, r: 3, z: 50, h: 22 };
const RAM = { rest: 34, travel: 18.9 };
const IN = { x: -80, y: -18, w: 54, d: 32, r: 2 };
const OUT = { x: 26, y: -28, w: 72, d: 58, r: 2 };
const Z = BED.h;
const PIECES = [
  { name: "card", w: 26, d: 16, r: 1.2, mark: 1, out: [56, 12] },
  { name: "letter", w: 30, d: 23, r: 0.8, mark: 1.35, out: [60, -13] },
  { name: "icon", w: 15, d: 15, r: 3.6, mark: 0.85, out: [84, 14] },
];
const CHIPS = [
  { x: -30, c: "#16142c" },
  { x: -15, c: "#fbf8f1" },
  { x: 0, c: "#ff5a1f" },
  { x: 15, c: "#cdebd6" },
  { x: 30, c: "#e2d9f8" },
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [0, -7, 86], [HEAD.x, HEAD.y, 74]], W, H, { pad: 22, azimuth: 50, elevation: 30 });
const { at, S, L, D, slab, cyl, screws, base, lamp, top } = kitFor(P);

const out = [base(PLATE)];

// Trays either side of the bed, flush with it so pieces slide across.
out.push(slab(IN, 0, Z, "mid", { steps: 3, bevel: 0.5, seam: 5 }));
out.push(L(k.planOutline(k.insetPlan(IN, 3), Z, P, 3), { tone: "faint" }));
for (let i = 0; i < 4; i++) out.push(slab({ x: -78, y: -9 + i * 0.6, w: 24, d: 16, r: 1.2 }, Z + i * 1.1, 0.9, "hi", { steps: 2, bevel: 0, crease: "lo" }));
out.push(slab(OUT, 0, Z, "mid", { steps: 3, bevel: 0.5, seam: 5 }));
out.push(L(k.planOutline(k.insetPlan(OUT, 3), Z, P, 3), { tone: "faint" }));
out.push(...screws(k.corners(OUT, 5), Z, 0.9, 0.4));

// Back columns, then the bed with its guide rails.
for (const x of [-17, 17]) out.push(cyl(x, -19, 3.4, 0, HEAD.z, "mid", { steps: 20, crease: "none", inner: L(k.sideArc(x, -19, 3.4, 30, P, 14), { tone: "faint" }) }));
out.push(slab(BED, 0, BED.h, "mid", { steps: 4, bevel: 0.7, seam: 5 }));
out.push(L(k.planOutline({ x: -15, y: -10.5, w: 30, d: 21, r: 1.4 }, Z, P, 3), { tone: "lo" }));
for (const y of [-13.4, 12]) out.push(slab({ x: IN.x + 4, y, w: OUT.x + 16 - IN.x, d: 1.4, r: 0.4 }, Z, 1.2, "mid", { steps: 1, bevel: 0 }));

// Pieces: each is built on the bed centre and moved live; its mark shows once stamped.
const mark = (s) =>
  `<g transform="scale(${s})"><path class="ui-s" data-t="acc" style="stroke-width:1.9px" d="M-4.4 -3.4 0 3.8 4.4 -3.4"/><path class="ui-s" data-t="hi" style="stroke-width:1.1px" d="M-2 -3.4 0 0 2 -3.4"/></g>`;
for (const piece of PIECES) {
  const plan = { x: -piece.w / 2, y: -piece.d / 2, w: piece.w, d: piece.d, r: piece.r };
  const extra = piece.name === "letter" ? L(k.lineOnTop([plan.x + 4, plan.y + 4], [plan.x + 12, plan.y + 4], Z + 1, P), { tone: "lo", free: true }) : "";
  out.push(
    `<g data-piece="${piece.name}" opacity="0"><path class="iso-halo" d="${k.haloOf(k.insetPlan(plan, 1), Z, 0.1, P)}" style="filter:blur(2px)"/>${slab(plan, Z, 1, "hi", {
      steps: 4,
      bevel: 0.3,
      crease: "lo",
    })}${extra}${top(0, piece.name === "letter" ? 2 : 0, Z + 1.02, mark(piece.mark), 'data-mark opacity="0"')}</g>`,
  );
}

// Ram: rod and die, drawn before the head that swallows the rod.
out.push(
  `<g data-part="ram">${cyl(0, 0, 4.4, RAM.rest + 4, HEAD.z + 20 - RAM.rest, "hi", { steps: 24, crease: "none" })}${slab({ x: -13, y: -10, w: 26, d: 20, r: 2 }, RAM.rest, 4, "mid", {
    steps: 3,
    bevel: 0.5,
    seam: RAM.rest + 2,
  })}${D(k.corners({ x: -13, y: -10, w: 26, d: 20 }, 2.6).map(([x, y]) => at([x, y, RAM.rest + 4])), { size: 0.45 })}</g>`,
);
out.push(slab(HEAD, HEAD.z, HEAD.h, "mid", { steps: 4, bevel: 0.8, seam: HEAD.z + 6 }));
out.push(...screws(k.corners(HEAD, 4), HEAD.z + HEAD.h, 1, 0.45));
const wheel = { x: 0, y: -7, z: HEAD.z + HEAD.h };
out.push(cyl(wheel.x, wheel.y, 4, wheel.z, 3, "mid", { steps: 20 }));
out.push(cyl(wheel.x, wheel.y, 13, wheel.z + 3, 2.2, "hi", { steps: 56, bevel: 0.5, crease: "lo" }));
out.push(L(k.ring(wheel.x, wheel.y, 10, wheel.z + 5.2, P, 48), { tone: "lo" }));
out.push(`<g data-part="wheel"></g>`);
out.push(cyl(wheel.x, wheel.y, 2.4, wheel.z + 5.2, 1.4, "mid", { steps: 18 }));
out.push(lamp(HEAD.x + 7, HEAD.y + HEAD.d - 6, HEAD.z + HEAD.h, 1.6, "press"));

// Tokens in front: colour chips on a strip and a type plate.
const strip = { x: -42, y: 30, w: 84, d: 15, r: 2 };
out.push(slab(strip, 0, 3, "mid", { steps: 3, bevel: 0.5 }));
for (const chip of CHIPS) {
  out.push(`<g class="veo-swatch" style="--sw:${chip.c}">${cyl(chip.x, 37.5, 5, 3, 2.6, "hi", { steps: 28, bevel: 0.3, crease: "lo" })}</g>`);
}
out.push(`<g data-part="chip-ring" opacity="0">${L(k.ring(0, 37.5, 6.6, 3.02, P, 32), { tone: "lit" })}</g>`);
const type = { x: -98, y: 22, w: 44, d: 26, r: 2 };
out.push(slab(type, 0, 2.4, "mid", { steps: 3, bevel: 0.5 }));
out.push(L(k.planOutline(k.insetPlan(type, 2.4), 2.4, P, 3), { tone: "faint" }));
out.push(top(type.x + 6, type.y + 17, 2.42, `<text class="ui-t" font-size="13" font-family="Georgia, serif" style="font-family:Georgia,serif">Aa</text><path class="ui-s" data-t="lo" d="M24 -8h10M24 -4h7M24 0h9"/>`));
out.push(D([at([type.x + type.w - 3, type.y + 3, 2.4])], { size: 0.45 }));

save("press", {
  width: W,
  height: H,
  label:
    "Una prensa de estampación: una tarjeta, un papel de carta y un icono de app pasan uno tras otro bajo el pistón y salen con la misma marca a su tamaño; delante, cinco fichas de color y una placa tipográfica son los tokens de la marca.",
  body: out,
  motion: { P, z: Z, ram: RAM, feed: [-37, 0], pieces: PIECES.map(({ name, out: o }) => ({ name, out: o })), wheel: { ...wheel, z: wheel.z + 5.25, r: 10 } },
});
