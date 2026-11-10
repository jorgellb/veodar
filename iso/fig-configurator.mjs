// Configurador: a modular cabinet grows and changes as four controls move —
// modules, tiers, doors, finish — and the price on the screen is recomputed
// from the same rules each time. At the end the quote is printed.
import { k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 480;
const PLATE = { x: -106, y: -60, w: 212, d: 120, r: 10 };
const STAGE = { x: -94, y: -50, w: 102, d: 46, r: 3, h: 6 };
const CELL = { w: 28, d: 26, h: 29.4, gap: 30, x0: -88, y0: -42, pitch: 30 };
const DESK = { x: -70, y: 16, w: 112, d: 30, r: 3, h: 10 };
const PRICE = { x: 30, y: -40, w: 64, d: 28, r: 3, h: 34 };
const CONTROLS = [
  { key: "mod", label: "MÓDULOS", x: -52 },
  { key: "tier", label: "ALTURAS", x: -24 },
  { key: "door", label: "PUERTAS", x: 0 },
  { key: "finish", label: "ACABADO", x: 24 },
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [CELL.x0, CELL.y0, STAGE.h + 62], [PRICE.x + PRICE.w, PRICE.y, 60]], W, H, {
  pad: 22,
  azimuth: 50,
  elevation: 30,
});
const { at, S, L, D, slab, cyl, screws, base, lamp, top, faceY, screen } = kitFor(P);

const out = [base(PLATE)];

// Price unit (back right) with its screen and the quote slot on top.
out.push(slab(PRICE, 0, PRICE.h, "mid", { steps: 4, bevel: 0.7, seam: 6 }));
out.push(...screws(k.corners(PRICE, 3.4), PRICE.h, 0.9, 0.4));
out.push(L(k.planOutline({ x: PRICE.x + 16, y: PRICE.y + 8, w: 32, d: 3.4, r: 1.2 }, PRICE.h, P, 2), { tone: "hi" }));
out.push(`<g data-part="paper"></g>`);
out.push(lamp(PRICE.x + PRICE.w - 7, PRICE.y + PRICE.d - 6, PRICE.h, 1.7, "ready"));
const ps = { w: PRICE.w - 10, h: 24 };
out.push(
  faceY(
    PRICE.x + 5,
    PRICE.y + PRICE.d,
    PRICE.h - 5,
    screen(
      ps.w,
      ps.h,
      `<text class="scr-t" data-t="dim" x="3" y="5.4" font-size="2.6">presupuesto</text><text class="scr-t" data-part="price" x="${ps.w - 3}" y="16" font-size="10" font-weight="600" text-anchor="end">260 €</text><text class="scr-t" data-t="acc" data-part="spec" x="3" y="21.6" font-size="2.5">1 mód · 1 alt</text>`,
      1.4,
    ),
  ),
);

// Stage and the cabinet cells; each cell and door is its own group.
out.push(slab(STAGE, 0, STAGE.h, "mid", { steps: 4, bevel: 0.7, seam: 2.4 }));
out.push(L(k.planOutline(k.insetPlan(STAGE, 3), STAGE.h, P, 3), { tone: "faint" }));
for (let i = 0; i < 3; i++) {
  for (let t = 0; t < 2; t++) {
    const x = CELL.x0 + i * CELL.pitch;
    const z = STAGE.h + t * CELL.gap;
    const plan = { x, y: CELL.y0, w: CELL.w, d: CELL.d, r: 1.2 };
    const fy = CELL.y0 + CELL.d;
    const open = faceY(
      x + 2.6,
      fy,
      z + CELL.h - 2.6,
      `<rect width="${CELL.w - 5.2}" height="${CELL.h - 5.2}" rx="1" style="fill:var(--anatomy-shade-0)"/><path class="ui-s" data-t="lo" d="M0 ${(CELL.h - 5.2) / 2}h${CELL.w - 5.2}"/><rect class="ui-s" width="${CELL.w - 5.2}" height="${CELL.h - 5.2}" rx="1"/>`,
    );
    out.push(`<g data-cell="${i}-${t}" opacity="0">${slab(plan, z, CELL.h, "hi", { steps: 3, bevel: 0.5, crease: "lo" })}${open}</g>`);
    const door = { x: x + 1.6, y: fy, w: CELL.w - 3.2, d: 1.5, r: 0.5 };
    out.push(
      `<g data-door="${i}-${t}" class="veo-lamp" opacity="0">${slab(door, z + 1.6, CELL.h - 3.2, "hi", { steps: 1, bevel: 0.3, crease: "lo" })}${D(
        [at([x + CELL.w - 6, fy + 1.5, z + CELL.h / 2])],
        { size: 0.8, tone: "hi" },
      )}</g>`,
    );
  }
}

// Control desk: a rotary selector and three slide switches, each engraved.
out.push(slab(DESK, 0, DESK.h, "mid", { steps: 4, bevel: 0.7, seam: 4 }));
out.push(...screws(k.corners(DESK, 3), DESK.h, 0.8, 0.4));
const cy = DESK.y + 12;
for (const c of CONTROLS) {
  out.push(top(c.x, DESK.y + 26, DESK.h + 0.02, `<text class="ui-t" font-size="2.3" text-anchor="middle" style="fill:var(--anatomy-mid)">${c.label}</text>`));
  if (c.key === "mod") {
    out.push(cyl(c.x, cy, 7.4, DESK.h, 0.8, "lo", { steps: 32 }));
    const t = k.radialTicks(c.x, cy, 7.2, 2, 1, DESK.h + 0.8, [0, 1.6], P, -0.9, 1.8);
    out.push(L(t.major, { tone: "hi" }));
    out.push(cyl(c.x, cy, 5, DESK.h + 0.8, 4.6, "mid", { steps: 30, bevel: 0.3, inner: L(k.knurl(c.x, cy, 5, DESK.h + 1.2, DESK.h + 5.4, 28, P), { tone: "lo" }) }));
    out.push(`<g data-part="knob"></g>`);
  } else {
    out.push(L(k.planOutline({ x: c.x - 2, y: cy - 7, w: 4, d: 14, r: 2 }, DESK.h, P, 4), { tone: "hi" }));
    out.push(
      `<g data-slide="${c.key}">${slab({ x: c.x - 3.6, y: cy + 1.4, w: 7.2, d: 5.2, r: 1.4 }, DESK.h, 3.4, "hi", { steps: 3, bevel: 0.4, crease: "lo" })}${L(
        k.lineOnTop([c.x - 2, cy + 4], [c.x + 2, cy + 4], DESK.h + 3.4, P),
        { tone: "lo" },
      )}</g>`,
    );
  }
}

save("configurator", {
  width: W,
  height: H,
  label:
    "Un configurador de producto: un mueble modular crece de uno a tres módulos, gana una segunda altura, puertas y acabado según se mueven cuatro mandos; una pantalla recalcula el precio y al final se imprime el presupuesto.",
  body: out,
  motion: {
    P,
    knob: { x: CONTROLS[0].x, y: cy, z: DESK.h + 5.4, r: 5 },
    slide: 8.4,
    paper: { x0: PRICE.x + 17, x1: PRICE.x + 47, y: PRICE.y + 9.7, z: PRICE.h },
  },
});
