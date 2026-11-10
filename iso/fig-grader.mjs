// Agroalimentación: a fruit grader. Oranges from a grower's bin roll along two
// rails that spread apart; each one sinks as the gap widens and drops through
// where the gap exceeds its diameter, into the crate for its size. A camera
// reads each piece first and an air jet blows the blemished one off the line.
// The screen keeps the lot traced to grower and field.
import { k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 480;
const PLATE = { x: -106, y: -62, w: 212, d: 120, r: 10 };
const RAILS = { x0: -60, x1: 60, y: -8, z: 26, g0: 4, g1: 15 };
const SIZES = [7, 10, 13]; // fruit diameters, small to large
const gapAt = (x) => RAILS.g0 + ((x - RAILS.x0) / (RAILS.x1 - RAILS.x0)) * (RAILS.g1 - RAILS.g0);
const dropX = (d) => RAILS.x0 + ((d - RAILS.g0) / (RAILS.g1 - RAILS.g0)) * (RAILS.x1 - RAILS.x0);
const CRATE = { w: 20, d: 18, h: 10, ahead: 5 };
const HOPPER = { x: -96, y: -22, w: 26, d: 26, h: 20 };
const CAM_X = -50;
const JET_X = -42;
const REJECT = { x: -50, y: 10, w: 18, d: 14, h: 5 };
const SCREEN = { x: 42, y: -58, w: 44, d: 12, h: 30 };

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [CAM_X, RAILS.y, RAILS.z + 22], [SCREEN.x + SCREEN.w, SCREEN.y, SCREEN.h + 2]], W, H, {
  pad: 20,
  azimuth: 50,
  elevation: 30,
});
const { at, S, L, D, slab, cyl, screws, base, label, ruler, lamp, faceY, screen } = kitFor(P);
const crateX = (d) => dropX(d) + CRATE.ahead;

const out = [
  `<defs><radialGradient id="veo-orange" cx="36%" cy="32%" r="72%"><stop offset="0" stop-color="#ffc08f"/><stop offset=".55" stop-color="#ff7a2e"/><stop offset="1" stop-color="#cf4f16"/></radialGradient></defs>`,
  base(PLATE),
];

// ── Traceability screen (back right) ─────────────────────────────────────
out.push(slab({ ...SCREEN, r: 2 }, 0, SCREEN.h, "mid", { steps: 4, bevel: 0.6, seam: 6 }));
out.push(...screws(k.corners({ ...SCREEN, r: 2 }, 3), SCREEN.h, 0.8, 0.4));
const SW = SCREEN.w - 4;
out.push(
  faceY(
    SCREEN.x + 2,
    SCREEN.y + SCREEN.d,
    SCREEN.h - 2,
    screen(
      SW,
      20,
      `<text class="scr-t" data-t="dim" x="2" y="3.8" font-size="1.9">TRAZABILIDAD · LOTE 0412</text>` +
        `<text class="scr-t" x="2" y="8" font-size="2.3" font-weight="600">SOCIO 118 · PARC. 7</text>` +
        `<text class="scr-t" data-t="acc" data-part="read" x="2" y="12.2" font-size="2.2">—</text>` +
        `<path class="scr-s" data-t="dim" d="M2 14h${SW - 4}"/>` +
        SIZES.map((_, i) => `<text class="scr-t" data-t="dim" x="${2 + i * 12}" y="18" font-size="2">CAL ${3 - i}</text><text class="scr-t" data-part="n${i}" x="${10.4 + i * 12}" y="18" font-size="2.2" font-weight="600">0</text>`).join(""),
      1.2,
    ),
  ),
);
out.push(k.wireSvg(at([SCREEN.x, SCREEN.y + 6, 2]), at([CAM_X + 6, RAILS.y - 16, 2]), { via: [at([CAM_X + 6, SCREEN.y + 6, 0.6])], tone: "mid", size: 1 }));

// ── Grower's bin and feed chute (left) ───────────────────────────────────
out.push(slab({ x: HOPPER.x, y: HOPPER.y, w: HOPPER.w, d: HOPPER.d, r: 1.2 }, 0, HOPPER.h, "mid", { steps: 3, bevel: 0.4, seam: 6 }));
const slats = [];
for (let z = 4; z < HOPPER.h; z += 4) slats.push(k.segment([HOPPER.x + 1, HOPPER.y + HOPPER.d, z], [HOPPER.x + HOPPER.w - 1, HOPPER.y + HOPPER.d, z], P));
out.push(L(slats.join(""), { tone: "lo" }));
out.push(faceY(HOPPER.x + 2, HOPPER.y + HOPPER.d, HOPPER.h - 1.4, `<rect class="ui-f" data-t="paper" width="17" height="6" rx=".6"/><text class="ui-t" x="1.2" y="2.6" font-size="1.9" font-weight="600">SOCIO 118</text><text class="ui-t" x="1.2" y="5" font-size="1.7">PARCELA 7</text>`));
// Fruit heaped in the bin.
const heap = [];
const fruit = (x, y, z, r) => {
  const [cx, cy] = at([x, y, z]);
  const rr = r * P.scale;
  const [hx, hy] = [cx - rr * 0.35, cy - rr * 0.38];
  return `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${rr.toFixed(2)}" fill="url(#veo-orange)" stroke="#8a3410" stroke-width=".6"/><circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="${(rr * 0.22).toFixed(2)}" fill="#fff" opacity=".45"/>`;
};
const heapPts = [];
for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) heapPts.push([HOPPER.x + 5 + i * 5.4, HOPPER.y + 5 + j * 5.4, HOPPER.h + 3 + ((i + j) % 2) * 1.6]);
heapPts.sort((a, b) => k.depthOf(a, P) - k.depthOf(b, P)).forEach(([x, y, z]) => heap.push(fruit(x, y, z, 3.4)));
out.push(heap.join(""));
out.push(slab({ x: HOPPER.x + HOPPER.w - 2, y: RAILS.y - 4, w: RAILS.x0 - (HOPPER.x + HOPPER.w) + 4, d: 8, r: 0.6 }, RAILS.z - 3, 1.4, "mid", { steps: 2, bevel: 0.2 }));
out.push(slab({ x: HOPPER.x + HOPPER.w - 1, y: RAILS.y - 3, w: 2, d: 6, r: 0.4 }, HOPPER.h, RAILS.z - 3 - HOPPER.h, "mid", { steps: 1, bevel: 0.1 }));

// ── Crates (back halves), reject tray, supports and the far rail ────────
const crateHalf = (cx, front) => {
  const x = cx - CRATE.w / 2;
  const y = RAILS.y - CRATE.d / 2;
  const t = 1.2;
  const walls = front
    ? [
        { x, y: y + CRATE.d - t, w: CRATE.w, d: t },
        { x: x + CRATE.w - t, y, w: t, d: CRATE.d },
      ]
    : [
        { x, y, w: CRATE.w, d: t },
        { x, y, w: t, d: CRATE.d },
      ];
  const parts = walls.map((w) => slab({ ...w, r: 0.2 }, 1, CRATE.h - 1, "hi", { steps: 1, bevel: 0, crease: "lo" }));
  if (!front) parts.unshift(slab({ x, y, w: CRATE.w, d: CRATE.d, r: 0.6 }, 0, 1, "mid", { steps: 2, bevel: 0.1 }));
  return `<g class="veo-swatch" style="--sw:#e7cf9f">${parts.join("")}</g>`;
};
SIZES.forEach((d) => out.push(crateHalf(crateX(d), false)));
out.push(slab({ x: REJECT.x, y: REJECT.y, w: REJECT.w, d: REJECT.d, r: 1 }, 0, 1, "lo", { steps: 2, bevel: 0.2 }));
for (const w of [
  { x: REJECT.x, y: REJECT.y, w: REJECT.w, d: 1 },
  { x: REJECT.x, y: REJECT.y, w: 1, d: REJECT.d },
])
  out.push(slab({ ...w, r: 0.2 }, 1, REJECT.h - 1, "mid", { steps: 1, bevel: 0 }));
for (const x of [RAILS.x0 + 2, RAILS.x1 - 2]) {
  for (const y of [RAILS.y - 14, RAILS.y + 14]) out.push(slab({ x: x - 1.2, y: y - 1.2, w: 2.4, d: 2.4, r: 0.3 }, 0, RAILS.z - 4, "mid", { steps: 1, bevel: 0.1 }));
  out.push(slab({ x: x - 1.4, y: RAILS.y - 15, w: 2.8, d: 30, r: 0.4 }, RAILS.z - 4.2, 2, "mid", { steps: 1, bevel: 0.1 }));
}
const rail = (side) => {
  const off = (x) => side * (gapAt(x) / 2);
  const ring = [
    [RAILS.x0, RAILS.y + off(RAILS.x0) - 0.9],
    [RAILS.x1, RAILS.y + off(RAILS.x1) - 0.9],
    [RAILS.x1, RAILS.y + off(RAILS.x1) + 0.9],
    [RAILS.x0, RAILS.y + off(RAILS.x0) + 0.9],
  ];
  return S(k.extrude(ring, RAILS.z - 2.2, 2.2, P), { tone: "hi", crease: "lo" });
};
out.push(rail(-1));
// Air jet behind the far rail, pointing at the line.
out.push(slab({ x: JET_X - 2, y: RAILS.y - 18, w: 4, d: 4, r: 0.6 }, 0, RAILS.z, "mid", { steps: 1, bevel: 0.2 }));
out.push(slab({ x: JET_X - 1.2, y: RAILS.y - 16, w: 2.4, d: 9, r: 0.6 }, RAILS.z + 2, 2.2, "hi", { steps: 2, bevel: 0.2, crease: "lo" }));
out.push(`<g data-part="puff"></g>`);

// ── Fruit in flight (sorted live) ────────────────────────────────────────
out.push(`<g data-part="fruit"></g>`);

SIZES.forEach((d, i) => {
  out.push(crateHalf(crateX(d), true));
  out.push(
    faceY(
      crateX(d) - CRATE.w / 2 + 2,
      RAILS.y + CRATE.d / 2,
      CRATE.h - 1.6,
      `<rect class="ui-f" data-t="paper" width="11" height="5.6" rx=".4"/><text class="ui-t" x="1" y="2.3" font-size="1.8" font-weight="600">CAL ${3 - i}</text>${[0, 1, 1.6, 2.6, 3.2, 4.2, 5, 5.6, 6.6, 7.4, 8.4]
        .map((x) => `<path class="ui-s" data-t="hi" d="M${1 + x} 3.2v1.8"/>`)
        .join("")}`,
    ),
  );
});
for (const w of [
  { x: REJECT.x, y: REJECT.y + REJECT.d - 1, w: REJECT.w, d: 1 },
  { x: REJECT.x + REJECT.w - 1, y: REJECT.y, w: 1, d: REJECT.d },
])
  out.push(slab({ ...w, r: 0.2 }, 1, REJECT.h - 1, "mid", { steps: 1, bevel: 0 }));
out.push(L(k.planOutline({ ...REJECT, r: 1 }, REJECT.h, P, 2), { tone: "red" }));
out.push(faceY(REJECT.x + 2, REJECT.y + REJECT.d, REJECT.h - 1.4, `<text class="ui-t" font-size="2" style="fill:#e5484d">DESTRÍO</text>`));
out.push(rail(1));

// Camera hood over the start of the rails.
for (const y of [RAILS.y - 12, RAILS.y + 12]) out.push(slab({ x: CAM_X - 1.2, y: y - 1.2, w: 2.4, d: 2.4, r: 0.3 }, 0, RAILS.z + 16, "mid", { steps: 1, bevel: 0.1 }));
out.push(slab({ x: CAM_X - 5, y: RAILS.y - 13.2, w: 10, d: 26.4, r: 1.4 }, RAILS.z + 16, 4, "hi", { steps: 3, bevel: 0.4, crease: "lo", seam: RAILS.z + 18 }));
out.push(cyl(CAM_X, RAILS.y, 2.6, RAILS.z + 12.6, 3.4, "mid", { steps: 22 }));
out.push(`<g data-part="flash" class="veo-lamp">${cyl(CAM_X, RAILS.y, 4.4, RAILS.z + 12, 0.8, "hi", { steps: 26, crease: "lo" })}</g>`);

// ── Front: label, ruler ──────────────────────────────────────────────────
out.push(label({ x: -100, y: 30, w: 44, d: 14, r: 1.2 }, "VEODAR · AG-12"));
out.push(ruler({ x: -26, y: 38, w: 90, d: 7, r: 1 }));

save("grader", {
  width: W,
  height: H,
  label:
    "Una calibradora de fruta sobre una placa: las naranjas del cajón de un socio ruedan por dos raíles que se separan; cada una baja a medida que el hueco crece y cae por donde el hueco supera su diámetro, a la caja de su calibre. Una cámara lee cada pieza y un soplador aparta la que tiene un defecto. La pantalla mantiene el lote trazado hasta el socio y la parcela.",
  body: out,
  motion: { P, rails: RAILS, sizes: SIZES, crate: CRATE, cam: CAM_X, jet: JET_X, reject: REJECT, start: RAILS.x0 - 2 },
});
