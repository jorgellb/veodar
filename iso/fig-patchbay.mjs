// Centralita de redirecciones: every old URL gets a patch cable to its new
// address before launch. Unpatched jacks blink red (a 404 waiting to happen);
// when all six are in, the site goes live and the traffic dial does not dip.
import { k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 470;
const PLATE = { x: -106, y: -56, w: 212, d: 112, r: 10 };
const CAB = { x: -86, y: -34, w: 172, d: 14, r: 3, h: 72 };
const FY = CAB.y + CAB.d;
const XS = [0, 1, 2, 3, 4, 5].map((i) => -60 + i * 24);
const Z_OLD = 50;
const Z_NEW = 20;
const PERM = [1, 0, 3, 5, 2, 4];
const GAUGE = { x: -66, y: 24, r: 14, z: 10, h: 6 };
const BOX = { x: 22, y: 8, w: 66, d: 26, r: 3, h: 22 };

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [CAB.x, CAB.y, CAB.h + 2], [CAB.x + CAB.w, CAB.y, CAB.h + 2]], W, H, { pad: 22, azimuth: 55, elevation: 28 });
const { at, S, L, D, slab, cyl, screws, base, label, lamp, top, faceY, screen } = kitFor(P);

const out = [base(PLATE)];

// Cabinet with both rows of jacks drawn on its face.
out.push(slab(CAB, 0, CAB.h, "mid", { steps: 4, bevel: 0.8, seam: 6 }));
out.push(...screws([[CAB.x + 5, CAB.y + 7], [CAB.x + CAB.w - 5, CAB.y + 7]], CAB.h, 1, 0.45));
const face = [];
face.push(`<rect class="ui-s" data-t="lo" x="6" y="5" width="${CAB.w - 12}" height="${CAB.h - 12}" rx="2"/>`);
face.push(`<path class="ui-s" data-t="faint" d="M6 ${CAB.h / 2 - 1}h${CAB.w - 12}"/>`);
face.push(`<text class="ui-t" x="10" y="11.4" font-size="2.9" style="fill:var(--anatomy-mid)">URL ANTIGUAS</text>`);
face.push(`<text class="ui-t" x="10" y="${CAB.h / 2 + 5.4}" font-size="2.9" style="fill:var(--anatomy-mid)">URL NUEVAS</text>`);
XS.forEach((x, i) => {
  const lx = x - CAB.x;
  for (const [row, z] of [
    ["old", Z_OLD],
    ["new", Z_NEW],
  ]) {
    const ly = CAB.h - z;
    face.push(`<circle class="ui-f" data-t="paper" cx="${lx}" cy="${ly}" r="4.6"/><circle class="ui-s" data-t="hi" cx="${lx}" cy="${ly}" r="4.6"/><circle cx="${lx}" cy="${ly}" r="2.3" style="fill:var(--anatomy-hi)"/>`);
    face.push(`<rect class="ui-s" data-t="lo" x="${lx - 7}" y="${ly + 6.6}" width="14" height="3.6" rx=".8"/><path class="ui-s" data-t="lo" d="M${lx - 5} ${ly + 8.4}h${[7, 9, 6, 8, 10, 7][i]}"/>`);
    face.push(`<circle data-lamp="${row}-${i}" cx="${lx + 7.4}" cy="${ly - 5.4}" r="1.5" style="fill:var(--anatomy-faint);stroke:var(--anatomy-mid);stroke-width:.5px"/>`);
  }
});
out.push(faceY(CAB.x, FY, CAB.h, face.join("")));
out.push(`<g data-part="cables"></g>`);

// Traffic dial on a pedestal.
const desk = { x: GAUGE.x - 20, y: GAUGE.y - 18, w: 40, d: 36, r: 3 };
out.push(slab(desk, 0, GAUGE.z, "mid", { steps: 4, bevel: 0.6, seam: 4 }));
out.push(...screws(k.corners(desk, 3), GAUGE.z, 0.8, 0.4));
const gt = GAUGE.z + GAUGE.h;
out.push(cyl(GAUGE.x, GAUGE.y, GAUGE.r, GAUGE.z, GAUGE.h, "hi", { steps: 64, bevel: 0.7, crease: "lo", inner: L(k.knurl(GAUGE.x, GAUGE.y, GAUGE.r, gt - 3, gt, 70, P, 0.3), { tone: "lo" }) }));
out.push(L(k.ring(GAUGE.x, GAUGE.y, GAUGE.r - 2, gt, P, 64), { tone: "lo" }));
const FROM = -0.75 * Math.PI;
const SPAN = 1.5 * Math.PI;
const ticks = k.radialTicks(GAUGE.x, GAUGE.y, GAUGE.r - 2.6, 20, 5, gt, [1.1, 2.4], P, FROM, SPAN);
out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
// Red zone: where the needle would fall if links broke.
const zone = [];
for (let i = 0; i <= 10; i++) {
  const a = FROM + (i / 10) * SPAN * 0.3;
  zone.push([GAUGE.x + Math.sin(a) * (GAUGE.r - 5.4), GAUGE.y - Math.cos(a) * (GAUGE.r - 5.4)]);
}
out.push(`<path d="${k.onTop(zone, gt, P)}" fill="none" stroke="#e5484d" stroke-width="2.2" stroke-linecap="round"/>`);
out.push(`<g data-part="needle"></g>`);
out.push(D([at([GAUGE.x, GAUGE.y, gt + 0.2])], { size: 0.7, tone: "hi" }));
out.push(top(GAUGE.x, desk.y + desk.d - 3.4, GAUGE.z + 0.02, `<text class="ui-t" font-size="2.3" text-anchor="middle" style="fill:var(--anatomy-mid)">TRÁFICO ORGÁNICO</text>`));

// Counter unit with the launch lamp.
out.push(slab(BOX, 0, BOX.h, "mid", { steps: 4, bevel: 0.7, seam: 5 }));
out.push(...screws(k.corners(BOX, 3), BOX.h, 0.8, 0.4));
out.push(lamp(BOX.x + BOX.w - 8, BOX.y + 8, BOX.h, 2.6, "live"));
out.push(top(BOX.x + BOX.w - 8, BOX.y + 17, BOX.h + 0.02, `<text class="ui-t" font-size="2.2" text-anchor="middle" style="fill:var(--anatomy-mid)">EN VIVO</text>`));
const sw = BOX.w - 10;
out.push(
  faceY(
    BOX.x + 5,
    BOX.y + BOX.d,
    BOX.h - 2.5,
    screen(
      sw,
      17,
      `<text class="scr-t" data-part="count" x="3" y="8.2" font-size="6" font-weight="600">301 · 0/6</text><text class="scr-t" data-t="acc" data-part="broken" x="3" y="13.8" font-size="2.9">6 sin destino</text>`,
      1.4,
    ),
  ),
);

save("patchbay", {
  width: W,
  height: H,
  label:
    "Una centralita con dos filas de seis conectores: URL antiguas arriba y nuevas abajo. Un latiguillo une cada URL antigua con su destino; los conectores sin cable parpadean en rojo, y con los seis puestos el sitio se lanza y el reloj de tráfico no cae.",
  body: out,
  motion: {
    P,
    xs: XS,
    fy: FY,
    zOld: Z_OLD,
    zNew: Z_NEW,
    perm: PERM,
    gauge: { x: GAUGE.x, y: GAUGE.y, r: GAUGE.r, top: gt + 0.2, from: FROM, span: SPAN },
  },
});
