// Industria: a short production line. Bushings drop from a chute onto a belt,
// pass under a vision camera that measures their diameter, and a pneumatic
// pusher sends the one outside tolerance to the reject bin. A signal tower and
// the shift panel keep count; OEE comes from the same counts.
import { G, k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 480;
const PLATE = { x: -112, y: -64, w: 224, d: 128, r: 10 };
const BT = 18; // belt top
const BELT = { x0: -86, x1: 52, y0: -10, y1: 10 };
const CAM_X = -26;
const PUSH_X = 18;
const CHUTE_X = -77;
const BIN = { x: 6, y: 16, w: 26, d: 24, r: 2, h: 12 };
const TRAY = { x: 57, y: -16, w: 30, d: 32, r: 2, h: 10 };
const HMI = { x: 60, y: -58, w: 38, d: 15, r: 2, h: 46 };
const CAB = { x: -104, y: -58, w: 38, d: 16, r: 1.5, h: 34 };
const PIECE = { r: 4.2, h: 5 };

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -18, 0), [CAM_X, -26, 58], [CAM_X, 26, 58], [CAB.x, CAB.y, 56], [HMI.x + HMI.w, HMI.y, HMI.h]],
  W,
  H,
  { pad: 20, azimuth: 50, elevation: 30 },
);
const { at, S, L, D, slab, cyl, screws, base, label, ruler, lamp, faceY, screen } = kitFor(P);
const axisY = (x, y, z) => G.frameAlong([x, y, z], [0, 1, 0]);

const out = [base(PLATE)];

// ── Back left: control cabinet with a signal tower ──────────────────────
out.push(slab(CAB, 0, CAB.h, "mid", { steps: 4, bevel: 0.7, seam: 3 }));
out.push(
  faceY(
    CAB.x + 2.4,
    CAB.y + CAB.d,
    CAB.h - 2.4,
    `<rect class="ui-s" width="${CAB.w - 4.8}" height="${CAB.h - 7}" rx="1"/><path class="ui-s" data-t="lo" d="M${(CAB.w - 4.8) / 2} 0v${CAB.h - 7}"/>` +
      [0, 1, 2, 3, 4].map((i) => `<path class="ui-s" data-t="lo" d="M4 ${16 + i * 2.2}h9"/>`).join("") +
      `<rect class="ui-f" x="${CAB.w - 13}" y="11" width="2.2" height="7" rx="1"/><rect class="ui-f" x="${(CAB.w - 4.8) / 2 - 3.4}" y="11" width="2.2" height="7" rx="1"/>` +
      `<text class="ui-t" x="4" y="6" font-size="2.4">PLC · L2</text>`,
  ),
);
out.push(...screws(k.corners(CAB, 3), CAB.h, 0.9, 0.4));
const TOWER = { x: CAB.x + CAB.w - 8, y: CAB.y + 8 };
out.push(cyl(TOWER.x, TOWER.y, 3.6, CAB.h, 1.2, "lo", { steps: 24 }));
out.push(cyl(TOWER.x, TOWER.y, 1.1, CAB.h + 1.2, 4, "mid", { steps: 14, crease: "none" }));
["st-g", "st-a", "st-r"].forEach((part, i) => {
  const z = CAB.h + 5.2 + i * 4.4;
  out.push(`<g data-part="${part}" class="veo-lamp">${cyl(TOWER.x, TOWER.y, 2.9, z, 4.2, "hi", { steps: 24, crease: "lo" })}</g>`);
});
out.push(cyl(TOWER.x, TOWER.y, 2.4, CAB.h + 18.4, 1.1, "mid", { steps: 22 }));
out.push(lamp(CAB.x + 7, CAB.y + 6, CAB.h, 1.6, "power"));
out.push(lamp(CAB.x + 13, CAB.y + 6, CAB.h, 1.6, "air"));

// ── Back right: the shift panel (HMI) ───────────────────────────────────
out.push(slab({ x: HMI.x + 6, y: HMI.y + 2, w: HMI.w - 12, d: HMI.d - 4, r: 1.5 }, 0, 6, "lo", { steps: 3, bevel: 0.4 }));
out.push(slab(HMI, 6, HMI.h - 6, "mid", { steps: 4, bevel: 0.7, seam: 10 }));
out.push(...screws(k.corners(HMI, 3), HMI.h, 0.9, 0.4));
const SW = HMI.w - 6;
const SH = 25;
const bars = [0.62, 0.8, 0.74, 0.9, 0.86, 0.7]
  .map((v, i) => `<rect class="scr-f" data-t="mid" x="${SW - 15 + i * 2.1}" y="${21.6 - v * 6}" width="1.4" height="${v * 6}" rx=".3"/>`)
  .join("");
out.push(
  faceY(
    HMI.x + 3,
    HMI.y + HMI.d,
    HMI.h - 3,
    screen(
      SW,
      SH,
      `<text class="scr-t" data-t="dim" x="2.6" y="4.6" font-size="2.3">LÍNEA 2 · TURNO</text>` +
        `<text class="scr-t" data-t="dim" x="2.6" y="10" font-size="2.2">OK</text><text class="scr-t" data-part="ok" x="14" y="10" font-size="3.4" font-weight="600" text-anchor="end">412</text>` +
        `<text class="scr-t" data-t="dim" x="18" y="10" font-size="2.2">NOK</text><text class="scr-t" data-t="acc" data-part="nok" x="${SW - 2.6}" y="10" font-size="3.4" font-weight="600" text-anchor="end">9</text>` +
        `<path class="scr-s" data-t="dim" d="M2.6 12.6h${SW - 5.2}"/>` +
        `<text class="scr-t" data-t="dim" x="2.6" y="16.6" font-size="2.2">OEE</text><text class="scr-t" data-part="oee" x="2.6" y="22" font-size="4.6" font-weight="600">0,87</text>` +
        bars +
        `<rect class="scr-f" data-part="verdict" x="${SW - 15}" y="13.8" width="12.4" height="2.6" rx="1"/>`,
      1.4,
    ),
  ),
);
out.push(D([at([HMI.x + 8, HMI.y + HMI.d, 12]), at([HMI.x + 13, HMI.y + HMI.d, 12])], { size: 0.9, tone: "hi" }));

// Cables: cabinet → gantry, gantry → panel, cabinet → pusher (air).
out.push(k.wireSvg(at([CAB.x + CAB.w, CAB.y + 10, 2]), at([CAM_X - 3, -23, 2]), { via: [at([CAM_X - 10, CAB.y + 10, 0.6]), at([CAM_X - 10, -23, 0.6])], tone: "mid", size: 1 }));
out.push(k.wireSvg(at([CAM_X + 3, -23, 4]), at([HMI.x + 8, HMI.y + 2, 4]), { via: [at([CAM_X + 12, -23, 0.6]), at([CAM_X + 12, -48, 0.6]), at([HMI.x - 6, -48, 0.6])], tone: "lo", size: 1 }));

// ── Gantry back post (behind the belt) ──────────────────────────────────
const post = (y) => [
  slab({ x: CAM_X - 5, y: y - 1, w: 10, d: 8, r: 1 }, 0, 1.6, "lo", { steps: 3, bevel: 0.3 }),
  slab({ x: CAM_X - 3, y, w: 6, d: 6, r: 0.8 }, 1.6, 52, "mid", { steps: 3, bevel: 0.4, seam: 30 }),
];
out.push(...post(-27));

// ── Pusher (behind the belt) ─────────────────────────────────────────────
const PZ = BT + 4;
out.push(slab({ x: PUSH_X - 8, y: -46, w: 16, d: 10, r: 1.2 }, 0, PZ - 5, "mid", { steps: 3, bevel: 0.5, seam: 3 }));
out.push(...screws([[PUSH_X - 5, -43], [PUSH_X + 5, -43]], PZ - 5, 0.8, 0.4));
out.push(slab({ x: PUSH_X - 5.5, y: -44, w: 11, d: 3, r: 0.6 }, PZ - 5.5, 11, "mid", { steps: 2, bevel: 0.3 }));
out.push(S(G.disc(0, 15, 4.2, axisY(PUSH_X, -41, PZ), P, {}), { tone: "hi", crease: "lo" }));
out.push(slab({ x: PUSH_X - 5.5, y: -26, w: 11, d: 3, r: 0.6 }, PZ - 5.5, 11, "mid", { steps: 2, bevel: 0.3 }));
out.push(L([-1, 1].map((s) => k.segment([PUSH_X + s * 4.6, -41, PZ + 4.6], [PUSH_X + s * 4.6, -26, PZ + 4.6], P)).join(""), { tone: "lo" }));
out.push(
  `<g data-part="push">${S(G.disc(0, 11, 1.3, axisY(PUSH_X, -23, PZ), P, {}), { tone: "mid", crease: "none" })}${slab(
    { x: PUSH_X - 6, y: -12.4, w: 12, d: 2.2, r: 0.6 },
    BT + 0.6,
    7,
    "hi",
    { steps: 2, bevel: 0.3, crease: "lo" },
  )}</g>`,
);
out.push(k.wireSvg(at([PUSH_X - 4, -46, 2]), at([CAB.x + CAB.w, CAB.y + 4, 3]), { via: [at([PUSH_X - 4, -52, 0.6]), at([CAB.x + CAB.w + 6, -52, 0.6])], tone: "faint", size: 0.9 }));

// ── Belt: legs, motor, frame, rubber ─────────────────────────────────────
for (const x of [BELT.x0 + 6, BELT.x1 - 6]) {
  for (const y of [-8, 8]) {
    out.push(cyl(x, y, 3.4, 0, 1, "lo", { steps: 20 }));
    out.push(cyl(x, y, 1.9, 1, 7.6, "mid", { steps: 16, crease: "none" }));
  }
  out.push(slab({ x: x - 1.5, y: -9, w: 3, d: 18, r: 0.5 }, 4, 2, "mid", { steps: 2, bevel: 0.2 }));
}
out.push(S(G.disc(0, 10, 4.6, G.frameAlong([BELT.x1 - 4, -12, 12.6], [0, -1, 0]), P, {}), { tone: "mid", crease: "lo" }));
out.push(S(G.disc(10, 11.4, 3.4, G.frameAlong([BELT.x1 - 4, -12, 12.6], [0, -1, 0]), P, {}), { tone: "lo", crease: "none" }));
out.push(slab({ x: BELT.x1 - 8, y: -20, w: 8, d: 6, r: 0.8 }, 17, 3, "mid", { steps: 2, bevel: 0.3 }));
const rail = (y) => slab({ x: BELT.x0 - 2, y, w: BELT.x1 - BELT.x0 + 4, d: 2.6, r: 0.8 }, 8.6, BT + 1.6 - 8.6, "mid", { steps: 3, bevel: 0.4, seam: 12 });
out.push(rail(BELT.y0 - 2.6));
out.push(slab({ x: BELT.x0, y: BELT.y0, w: BELT.x1 - BELT.x0, d: BELT.y1 - BELT.y0, r: 1.8 }, 15, BT - 15, "mid", { steps: 4, bevel: 0.3, crease: "none", className: "veo-dark" }));
out.push(`<g class="veo-on-dark" data-part="cleats"></g>`);

// Chute over the start of the belt.
out.push(slab({ x: CHUTE_X - 3, y: -30, w: 6, d: 5, r: 0.8 }, 0, 44, "mid", { steps: 3, bevel: 0.4, seam: 20 }));
out.push(slab({ x: CHUTE_X - 2.4, y: -25, w: 4.8, d: 18, r: 0.5 }, 38, 3, "mid", { steps: 2, bevel: 0.2 }));
out.push(slab({ x: CHUTE_X - 7, y: -7, w: 14, d: 14, r: 2 }, BT + 9, 18, "hi", { steps: 4, bevel: 0.5, crease: "lo", seam: BT + 15 }));
out.push(slab({ x: CHUTE_X - 10, y: -10, w: 20, d: 20, r: 3 }, BT + 27, 4, "mid", { steps: 4, bevel: 0.5 }));
out.push(L(k.planOutline({ x: CHUTE_X - 7, y: -7, w: 14, d: 14, r: 2 }, BT + 31, P, 4), { tone: "lo" }));
out.push(D([at([CHUTE_X, 0, BT + 31])], { size: 0.5 }));

// Bins: back halves before the parts, front halves after.
const binHalf = (B, front) => {
  const t = 1.6;
  const walls = front
    ? [
        { x: B.x, y: B.y + B.d - t, w: B.w, d: t, r: 0.5 },
        { x: B.x + B.w - t, y: B.y, w: t, d: B.d, r: 0.5 },
      ]
    : [
        { x: B.x, y: B.y, w: B.w, d: B.d, r: B.r, floor: true },
        { x: B.x, y: B.y, w: B.w, d: t, r: 0.5 },
        { x: B.x, y: B.y, w: t, d: B.d, r: 0.5 },
      ];
  return walls.map((w) => (w.floor ? slab(w, 0, 1.2, "lo", { steps: 3, bevel: 0.2 }) : slab(w, 1.2, B.h - 1.2, "mid", { steps: 2, bevel: 0.2 }))).join("");
};
out.push(binHalf(BIN, false), binHalf(TRAY, false));

// ── The parts (depth-sorted live) ────────────────────────────────────────
const piece = (i) =>
  `<g data-item="${i}" data-x="0" data-y="0" data-z="${BT}"><g data-piece="${i}" opacity="0">${cyl(0, 0, PIECE.r, BT, PIECE.h, "hi", { steps: 30, bevel: 0.4, crease: "lo" })}${L(
    k.ring(0, 0, 2.9, BT + PIECE.h, P, 26) + k.ring(0, 0, 1.7, BT + PIECE.h, P, 22),
    { tone: "mid" },
  )}</g></g>`;
out.push(`<g data-stack>${[0, 1, 2, 3, 4, 5].map(piece).join("")}</g>`);

out.push(binHalf(BIN, true), binHalf(TRAY, true));
out.push(L(k.planOutline(BIN, BIN.h, P, 3), { tone: "red" }));
out.push(faceY(BIN.x + 3, BIN.y + BIN.d, BIN.h - 3.4, `<text class="ui-t" font-size="3" style="fill:#e5484d">NOK</text>`));
out.push(faceY(TRAY.x + 3, TRAY.y + TRAY.d, TRAY.h - 3.2, `<text class="ui-t" font-size="2.8">OK</text>`));
out.push(rail(BELT.y1));
out.push(L([BELT.x0 + 1, BELT.x1 - 1].map((x) => k.sideRing([x, BELT.y1 + 2.6, BT - 2], 1.8, "y", P, 16)).join(""), { tone: "lo" }));
out.push(D([BELT.x0 + 1, BELT.x1 - 1].map((x) => at([x, BELT.y1 + 2.6, BT - 2])), { size: 0.5 }));

// ── Gantry front post, beam and the camera ──────────────────────────────
out.push(...post(21));
out.push(slab({ x: CAM_X - 4, y: -28, w: 8, d: 56, r: 1.2 }, 53.6, 6, "mid", { steps: 3, bevel: 0.5, seam: 56.6 }));
out.push(...screws([[CAM_X, -24], [CAM_X, 24]], 59.6, 0.9, 0.4));
out.push(`<g data-part="beam" opacity="0"></g>`);
out.push(slab({ x: CAM_X - 6, y: -6, w: 12, d: 12, r: 1.6 }, 40, 13.6, "hi", { steps: 4, bevel: 0.5, crease: "lo", seam: 44 }));
out.push(cyl(CAM_X, 0, 3.6, 35, 5, "mid", { steps: 24, bevel: 0.3 }));
out.push(`<g data-part="flash" class="veo-lamp">${cyl(CAM_X, 0, 6.4, 33.4, 1.6, "hi", { steps: 32, crease: "lo" })}</g>`);
out.push(L(k.ring(CAM_X, 0, 2.2, 35, P, 20), { tone: "hi" }));
out.push(D([at([CAM_X + 4, 6, 48])], { size: 0.7, tone: "hi" }));

// ── Front: label, ruler, emergency stop ─────────────────────────────────
out.push(label({ x: -104, y: 38, w: 48, d: 14, r: 1.2 }, "VEODAR · QC-02"));
out.push(ruler({ x: -44, y: 50, w: 92, d: 7, r: 1 }));
const ES = { x: 78, y: 40, w: 16, d: 14, r: 1.6 };
out.push(slab(ES, 0, 6, "mid", { steps: 3, bevel: 0.5, seam: 2 }));
out.push(cyl(ES.x + 8, ES.y + 7, 4.6, 6, 1, "lo", { steps: 24 }));
out.push(`<g class="veo-lamp" data-err>${cyl(ES.x + 8, ES.y + 7, 3.8, 7, 3.2, "hi", { steps: 26, bevel: 0.5, crease: "lo" })}</g>`);

save("qcline", {
  width: W,
  height: H,
  label:
    "Una línea de producción sobre una placa: unos casquillos caen de una tolva a una cinta, pasan bajo una cámara de visión que mide su diámetro y un empujador neumático aparta al cajón rojo el que se sale de tolerancia; una baliza y el panel del turno llevan la cuenta y el OEE.",
  body: out,
  motion: {
    P,
    BT,
    belt: BELT,
    cam: CAM_X,
    push: PUSH_X,
    chute: CHUTE_X,
    bin: { x: BIN.x + BIN.w / 2, y: BIN.y + BIN.d / 2 },
    tray: { x: TRAY.x, y: TRAY.y, w: TRAY.w, d: TRAY.d },
    pieceH: PIECE.h,
  },
});
