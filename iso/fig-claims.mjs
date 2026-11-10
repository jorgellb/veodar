// Seguros: a rotary policy card file. A claim envelope comes out of the mail
// unit onto a reader pad; its policy number turns the drum until that policy's
// card is on top; a comparator lights its three checks (in force, cover,
// deductible) and the claim goes into the file folder for the handler, or to
// the review tray when a check fails.
import { G, k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 480;
const PLATE = { x: -104, y: -60, w: 208, d: 116, r: 10 };
const AX = { y: -16, z: 38, x0: -26, x1: 18 }; // drum axle
const CARD = { x0: -22, x1: 14, r0: 6, r1: 22, n: 16 };
const MAIL = { x: -98, y: 4, w: 30, d: 24, r: 2, h: 18 };
const PAD = { x: -62, y: 8, w: 26, d: 18, r: 1.6, h: 2 };
const CMP = { x: 36, y: -54, w: 50, d: 18, r: 2, h: 28 };
const FOLDER = { x: 28, y: 10, w: 32, d: 24, r: 1 };
const REVIEW = { x: 68, y: 12, w: 26, d: 22, r: 1, h: 6 };
const ENV = { w: 16, d: 11, h: 0.8 };

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -18, 0), [AX.x0, AX.y, AX.z + CARD.r1 + 4], [AX.x1, AX.y, AX.z + CARD.r1 + 4], [CMP.x + CMP.w, CMP.y, CMP.h + 6]],
  W,
  H,
  { pad: 20, azimuth: 50, elevation: 30 },
);
const { at, S, L, D, slab, cyl, screws, base, label, ruler, lamp, faceY, screen } = kitFor(P);
const alongX = (o) => G.frameOf(o, [1, 0, 0], [0, 1, 0], [0, 0, 1]);

const out = [base(PLATE)];

// ── Comparator (back right) ──────────────────────────────────────────────
out.push(slab(CMP, 0, CMP.h, "mid", { steps: 4, bevel: 0.7, seam: 4 }));
out.push(...screws(k.corners(CMP, 3), CMP.h, 0.9, 0.4));
const CHECKS = ["VIGENTE", "COBERTURA", "FRANQUICIA"];
CHECKS.forEach((_, i) => out.push(lamp(CMP.x + 9 + i * 16, CMP.y + CMP.d - 5, CMP.h, 2, `c${i}`)));
out.push(
  faceY(
    CMP.x + 2,
    CMP.y + CMP.d,
    CMP.h - 1.6,
    CHECKS.map((t, i) => `<text class="ui-t" x="${7 + i * 16}" y="2.4" font-size="1.9" text-anchor="middle">${t}</text>`).join("") +
      `<g transform="translate(0 4)">${screen(
        CMP.w - 4,
        16,
        `<text class="scr-t" data-t="dim" x="2" y="3.8" font-size="2">PÓLIZA</text><text class="scr-t" data-part="pol" x="2" y="8.4" font-size="3.2" font-weight="600">—</text>` +
          `<text class="scr-t" data-t="acc" data-part="f1" x="2" y="12.6" font-size="2.2"></text><text class="scr-t" data-part="f2" x="${CMP.w - 6}" y="12.6" font-size="2.2" text-anchor="end"></text>`,
        1.2,
      )}</g>`,
  ),
);
out.push(k.wireSvg(at([CMP.x, CMP.y + 9, 2]), at([AX.x1 + 6, AX.y - 8, 2]), { via: [at([AX.x1 + 6, CMP.y + 9, 0.6])], tone: "mid", size: 1 }));

// ── The card file: base, left bearing, axle ──────────────────────────────
out.push(slab({ x: AX.x0 - 10, y: AX.y - 13, w: AX.x1 - AX.x0 + 22, d: 26, r: 2 }, 0, 3, "mid", { steps: 3, bevel: 0.5, seam: 1.5 }));
out.push(...screws([[AX.x0 - 6, AX.y - 9], [AX.x0 - 6, AX.y + 9], [AX.x1 + 8, AX.y - 9], [AX.x1 + 8, AX.y + 9]], 3, 0.8, 0.4));
const bearing = (x) => [
  slab({ x: x - 2, y: AX.y - 3, w: 4, d: 6, r: 0.8 }, 3, AX.z - 6, "mid", { steps: 2, bevel: 0.3, seam: 12 }),
  S(G.disc(-2.4, 2.4, 5, alongX([x, AX.y, AX.z]), P, {}), { tone: "hi", crease: "lo" }),
];
out.push(...bearing(AX.x0 - 4));
out.push(S(G.disc(AX.x0 - 6.4, AX.x1 + 10, 1.4, alongX([0, AX.y, AX.z]), P, {}), { tone: "mid", crease: "none" }));
out.push(S(G.disc(AX.x0 - 1, AX.x0 + 1.2, 7, alongX([0, AX.y, AX.z]), P, {}), { tone: "mid", crease: "lo" }));

// Cards are drawn live: they turn with the drum.
out.push(`<g data-part="cards"></g>`);

out.push(S(G.disc(CARD.x1 + 1, CARD.x1 + 3.2, 7, alongX([0, AX.y, AX.z]), P, {}), { tone: "mid", crease: "lo" }));
out.push(...bearing(AX.x1 + 6));
// Crank knob on the end of the axle.
out.push(S(G.disc(AX.x1 + 10, AX.x1 + 15, 4.4, alongX([0, AX.y, AX.z]), P, {}), { tone: "hi", crease: "lo" }));
out.push(L(k.sideRing([AX.x1 + 15, AX.y, AX.z], 2.2, "x", P, 18), { tone: "lo" }));
out.push(D([at([AX.x1 + 15, AX.y, AX.z])], { size: 0.5 }));
// Reading window: a bridge over the top of the drum.
out.push(slab({ x: CARD.x0 - 6, y: AX.y - 1.4, w: 2.4, d: 2.8, r: 0.5 }, 3, AX.z + CARD.r1 + 2, "mid", { steps: 1, bevel: 0.2 }));
out.push(slab({ x: CARD.x0 - 6, y: AX.y - 1.4, w: CARD.x1 - CARD.x0 + 12, d: 2.8, r: 0.6 }, AX.z + CARD.r1 + 5, 2.2, "mid", { steps: 2, bevel: 0.3 }));
out.push(L(k.segment([CARD.x0 + 4, AX.y + 1.4, AX.z + CARD.r1 + 5], [CARD.x0 + 4, AX.y + 1.4, AX.z + CARD.r1 + 2.5], P) + k.segment([CARD.x1 - 4, AX.y + 1.4, AX.z + CARD.r1 + 5], [CARD.x1 - 4, AX.y + 1.4, AX.z + CARD.r1 + 2.5], P), { tone: "lit" }));

// ── Mail unit and reader pad (front left) ────────────────────────────────
out.push(slab(MAIL, 0, MAIL.h, "mid", { steps: 4, bevel: 0.6, seam: 5 }));
out.push(...screws(k.corners(MAIL, 2.6), MAIL.h, 0.8, 0.4));
out.push(L(k.planOutline({ x: MAIL.x + 4, y: MAIL.y + 6, w: 20, d: 2.4, r: 1 }, MAIL.h, P, 2), { tone: "hi" }));
out.push(
  faceY(
    MAIL.x + 2,
    MAIL.y + MAIL.d,
    MAIL.h - 2,
    screen(
      MAIL.w - 4,
      10,
      `<text class="scr-t" data-t="dim" x="1.6" y="3.4" font-size="1.8">ENTRADA</text><text class="scr-t" data-part="claim" x="1.6" y="7.6" font-size="2.4" font-weight="600">—</text>`,
      1,
    ),
  ),
);
out.push(slab(PAD, 0, PAD.h, "lo", { steps: 3, bevel: 0.3 }));
out.push(L(k.planOutline(k.insetPlan(PAD, 2), PAD.h, P, 2), { tone: "faint" }));
// Reader bridge over the pad: two posts and a beam; the scan line is live.
for (const y of [PAD.y - 2, PAD.y + PAD.d + 0.6]) out.push(slab({ x: PAD.x + 2, y, w: 2.2, d: 1.6, r: 0.3 }, 0, 12, "mid", { steps: 1, bevel: 0.1 }));
out.push(`<g data-part="scan"></g>`);
out.push(slab({ x: PAD.x + 1.4, y: PAD.y - 2.4, w: 3.4, d: PAD.d + 5.4, r: 0.6 }, 12, 2.4, "hi", { steps: 2, bevel: 0.3, crease: "lo" }));

// ── Folder and review tray (front right), back halves ───────────────────
out.push(slab(FOLDER, 0, 1, "mid", { steps: 2, bevel: 0.2 }));
out.push(slab({ x: FOLDER.x, y: FOLDER.y - 1, w: FOLDER.w, d: 1, r: 0.3 }, 1, 12, "hi", { steps: 1, bevel: 0, crease: "lo" }));
out.push(faceY(FOLDER.x + 2, FOLDER.y, 11, `<text class="ui-t" font-size="2.2">EXPEDIENTES</text>`));
out.push(slab({ x: REVIEW.x, y: REVIEW.y, w: REVIEW.w, d: REVIEW.d, r: REVIEW.r }, 0, 1, "lo", { steps: 2, bevel: 0.2 }));
for (const w of [
  { x: REVIEW.x, y: REVIEW.y, w: REVIEW.w, d: 1 },
  { x: REVIEW.x, y: REVIEW.y, w: 1, d: REVIEW.d },
])
  out.push(slab({ ...w, r: 0.2 }, 1, REVIEW.h - 1, "mid", { steps: 1, bevel: 0 }));

// Claims in flight and filed.
out.push(`<g data-part="envs"></g>`);

for (const w of [
  { x: REVIEW.x, y: REVIEW.y + REVIEW.d - 1, w: REVIEW.w, d: 1 },
  { x: REVIEW.x + REVIEW.w - 1, y: REVIEW.y, w: 1, d: REVIEW.d },
])
  out.push(slab({ ...w, r: 0.2 }, 1, REVIEW.h - 1, "mid", { steps: 1, bevel: 0 }));
out.push(L(k.planOutline({ ...REVIEW }, REVIEW.h, P, 2), { tone: "red" }));
out.push(faceY(REVIEW.x + 2, REVIEW.y + REVIEW.d, REVIEW.h - 1.6, `<text class="ui-t" font-size="2.2" style="fill:#e5484d">REVISIÓN</text>`));

// ── Front: label, ruler ──────────────────────────────────────────────────
out.push(label({ x: -98, y: 36, w: 44, d: 14, r: 1.2 }, "VEODAR · SG-06"));
out.push(ruler({ x: -44, y: 40, w: 66, d: 7, r: 1 }));

save("claims", {
  width: W,
  height: H,
  label:
    "Un fichero giratorio de pólizas sobre una placa: un parte de siniestro sale del buzón a un lector, su número de póliza hace girar el tambor hasta la ficha correspondiente, un comparador enciende sus tres comprobaciones —vigencia, cobertura y franquicia— y el parte pasa a la carpeta de expedientes, o a la bandeja de revisión si una comprobación falla.",
  body: out,
  motion: { P, ax: AX, card: CARD, mail: MAIL, pad: PAD, folder: FOLDER, review: REVIEW, env: ENV },
});
