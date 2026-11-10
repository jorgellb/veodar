// Energía: a solar test bench. A lamp travels along an arc rail like the sun;
// four single-axis trackers turn to face it. Each row reports its output to the
// inverter; when one row stops producing, the alarm lights, a work order prints,
// and the dial shows the plant's total dropping until the row is fixed.
import { k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 480;
const PLATE = { x: -106, y: -62, w: 212, d: 120, r: 10 };
const TRACK = { xs: [-66, -40, -14, 12], y0: -46, y1: 6, z: 14, posts: [-40, -20, 0] };
const ARC = { cx: -27, y: -54, cz: 4, r: 74, from: 160, to: 20 };
const INV = { x: 46, y: -14, w: 42, d: 16, r: 2, h: 30 };
const DIAL = { x: 66, y: 30, r: 13, z: 7 };
const MET = { x: 76, y: -48 };

const P = k.fitProjection(
  [...k.boxCorners(PLATE, -18, 0), [ARC.cx, ARC.y, ARC.cz + ARC.r + 6], [ARC.cx - ARC.r, ARC.y, 30], [ARC.cx + ARC.r, ARC.y, 30], [MET.x, MET.y, 46]],
  W,
  H,
  { pad: 20, azimuth: 50, elevation: 30 },
);
const { at, S, L, D, slab, cyl, screws, base, label, ruler, lamp, top, faceY, screen } = kitFor(P);

const out = [base(PLATE)];

// ── The sun rail (behind the array): two arcs with ties, on three posts ─
const arcPt = (deg, dr = 0, dy = 0) => {
  const a = (deg * Math.PI) / 180;
  return [ARC.cx + Math.cos(a) * (ARC.r + dr), ARC.y + dy, ARC.cz + Math.sin(a) * (ARC.r + dr)];
};
const rail = [];
for (let d = ARC.from; d > ARC.to; d -= 4) {
  for (const dr of [-1.6, 1.6]) rail.push(k.segment(arcPt(d, dr), arcPt(Math.max(ARC.to, d - 4), dr), P));
  rail.push(k.segment(arcPt(d, -1.6), arcPt(d, 1.6), P));
}
for (const d of [ARC.from, ARC.to]) {
  const [x, , zTop] = arcPt(d, -1.6);
  out.push(slab({ x: x - 1.5, y: ARC.y - 1.5, w: 3, d: 3, r: 0.4 }, 0, zTop, "mid", { steps: 1, bevel: 0.2 }));
  out.push(slab({ x: x - 4, y: ARC.y - 4, w: 8, d: 8, r: 0.8 }, 0, 1.4, "lo", { steps: 2, bevel: 0.2 }));
}
out.push(slab({ x: ARC.cx - 1.5, y: ARC.y - 4.5, w: 3, d: 3, r: 0.4 }, 0, ARC.cz + ARC.r - 2, "mid", { steps: 1, bevel: 0.2 }));
out.push(L(k.segment([ARC.cx, ARC.y - 3, ARC.cz + ARC.r - 2], [ARC.cx, ARC.y, ARC.cz + ARC.r - 1.6], P), { tone: "mid" }));
out.push(L(rail.join(""), { tone: "mid" }));
out.push(`<g data-part="sun"></g>`);

// ── Weather station (back right): mast, pyranometer, anemometer ─────────
out.push(cyl(MET.x, MET.y, 3.6, 0, 1.2, "lo", { steps: 22 }));
out.push(cyl(MET.x, MET.y, 0.9, 1.2, 38, "mid", { steps: 12, crease: "none" }));
out.push(slab({ x: MET.x - 6, y: MET.y - 0.6, w: 6, d: 1.2, r: 0.2 }, 30, 1, "mid", { steps: 1, bevel: 0 }));
out.push(cyl(MET.x - 6, MET.y, 1.6, 31, 1, "mid", { steps: 16 }));
out.push(cyl(MET.x - 6, MET.y, 1.1, 32, 1, "hi", { steps: 16, bevel: 0.5, crease: "lo" }));
out.push(`<g data-part="cups"></g>`);
out.push(slab({ x: MET.x - 3, y: MET.y + 1, w: 6, d: 3, r: 0.5 }, 8, 7, "hi", { steps: 2, bevel: 0.3, crease: "lo" }));

// ── Trackers, back row first; each panel is live, in its own slot ───────
const order = TRACK.xs.map((x, i) => ({ x, i })).sort((a, b) => k.depthOf([a.x, 0, 0], P) - k.depthOf([b.x, 0, 0], P));
for (const { x, i } of order) {
  for (const y of TRACK.posts) {
    out.push(slab({ x: x - 2.2, y: y - 2.2, w: 4.4, d: 4.4, r: 0.6 }, 0, 1.2, "lo", { steps: 2, bevel: 0.1 }));
    out.push(slab({ x: x - 1.1, y: y - 1.1, w: 2.2, d: 2.2, r: 0.3 }, 1.2, TRACK.z - 2.4, "mid", { steps: 1, bevel: 0.1 }));
    out.push(slab({ x: x - 1.8, y: y - 1.4, w: 3.6, d: 2.8, r: 0.4 }, TRACK.z - 1.6, 1.2, "mid", { steps: 2, bevel: 0.1 }));
  }
  out.push(slab({ x: x + 1.2, y: -23.4, w: 4, d: 5, r: 0.6 }, TRACK.z - 6, 4.6, "hi", { steps: 2, bevel: 0.3, crease: "lo" }));
  out.push(`<g data-part="fault${i}" class="veo-lamp">${cyl(x + 3.2, -18.6, 0.8, TRACK.z - 6, 0.6, "hi", { steps: 12 })}</g>`);
  out.push(L(k.segment([x, TRACK.y0, TRACK.z], [x, TRACK.y1, TRACK.z], P), { tone: "mid" }));
  out.push(`<g data-panel="${i}"></g>`);
}

// Row cables to the inverter, on the ground.
TRACK.xs.forEach((x, i) =>
  out.push(k.wireSvg(at([x + 2, 2, 0.6]), at([INV.x, INV.y + 4 + i * 2.6, 2]), { via: [at([x + 2, 12 + i * 2.2, 0.6]), at([INV.x - 6, 12 + i * 2.2, 0.6]), at([INV.x - 6, INV.y + 4 + i * 2.6, 0.6])], tone: "faint", size: 0.8, ends: "to" })),
);

// ── Inverter cabinet with screen, alarm and work-order printer ───────────
out.push(slab(INV, 0, INV.h, "mid", { steps: 4, bevel: 0.7, seam: 4 }));
out.push(...screws(k.corners(INV, 3), INV.h, 0.9, 0.4));
const vents = [];
for (let z = 5; z < 11; z += 1.6) vents.push(k.segment([INV.x + INV.w, INV.y + 3, z], [INV.x + INV.w, INV.y + INV.d - 3, z], P));
out.push(L(vents.join(""), { tone: "lo" }));
const SW = INV.w - 4;
const bars = [0, 1, 2, 3]
  .map((i) => `<rect class="scr-f" data-t="hi" data-bar="${i}" x="${SW - 16 + i * 3.8}" y="7" width="2.6" height="8" rx=".4"/><text class="scr-t" data-t="dim" x="${SW - 14.7 + i * 3.8}" y="17.4" font-size="1.5" text-anchor="middle">S${i + 1}</text>`)
  .join("");
out.push(
  faceY(
    INV.x + 2,
    INV.y + INV.d,
    INV.h - 2,
    screen(
      SW,
      22,
      `<text class="scr-t" data-t="dim" x="2" y="3.8" font-size="1.9">PLANTA · INVERSOR</text>` +
        `<text class="scr-t" data-part="kw" x="2" y="11.6" font-size="5.4" font-weight="600">0</text><text class="scr-t" data-t="dim" x="2" y="14.6" font-size="1.8">kW</text>` +
        bars +
        `<rect class="scr-f" data-part="alarmrow" x="2" y="18.6" width="${SW - 4}" height="2.8" rx=".6"/><text class="scr-t" data-part="alarm" x="3" y="20.6" font-size="1.7"></text>`,
      1.2,
    ),
  ),
);
out.push(`<g data-part="alarmlamp" class="veo-lamp">${cyl(INV.x + 6, INV.y + 5, 1.8, INV.h, 1.6, "hi", { steps: 18, crease: "lo" })}</g>`);
out.push(cyl(INV.x + 6, INV.y + 5, 2.8, INV.h, 0.6, "mid", { steps: 18 }));
const PRN = { x: INV.x + 16, y: INV.y + 2, w: 18, d: 11, r: 1.4 };
out.push(slab(PRN, INV.h, 5, "hi", { steps: 3, bevel: 0.4, crease: "lo", seam: INV.h + 2 }));
out.push(L(k.planOutline({ x: PRN.x + 3.4, y: PRN.y + 3.6, w: 11, d: 2.2, r: 1 }, INV.h + 5, P, 2), { tone: "hi" }));
out.push(`<g data-part="order"></g>`);

// ── Total output dial (front right) ──────────────────────────────────────
out.push(cyl(DIAL.x, DIAL.y, DIAL.r + 2, 0, DIAL.z - 1, "mid", { steps: 40, bevel: 0.6 }));
out.push(cyl(DIAL.x, DIAL.y, DIAL.r, DIAL.z - 1, 1, "hi", { steps: 40, crease: "lo" }));
const SPAN = 1.5 * Math.PI;
const FROM = -0.75 * Math.PI;
const ticks = k.radialTicks(DIAL.x, DIAL.y, DIAL.r - 1, 25, 5, DIAL.z, [1.2, 2.6], P, FROM, SPAN);
out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
out.push(top(DIAL.x - 4, DIAL.y + 4.6, DIAL.z + 0.02, `<text class="ui-t" font-size="2" style="fill:var(--anatomy-mid)">kW · 0–500</text>`));
out.push(`<g data-part="needle"></g>`);

// ── Front: label, ruler ──────────────────────────────────────────────────
out.push(label({ x: -100, y: 32, w: 44, d: 14, r: 1.2 }, "VEODAR · EN-09"));
out.push(ruler({ x: -44, y: 40, w: 70, d: 7, r: 1 }));

save("solar", {
  width: W,
  height: H,
  label:
    "Un banco de pruebas solar sobre una placa: una lámpara recorre un raíl en arco como el sol y cuatro seguidores de un eje giran para mirarla; cada fila manda su producción al inversor. Cuando una fila deja de producir, se enciende la alarma, se imprime una orden de trabajo y el reloj muestra cómo baja la producción total hasta que se repara.",
  body: out,
  motion: {
    P,
    track: TRACK,
    arc: ARC,
    met: MET,
    dial: { ...DIAL, from: FROM, span: SPAN },
    paper: { x0: PRN.x + 4, x1: PRN.x + 14, y: PRN.y + 4.7, z: INV.h + 5 },
  },
});
