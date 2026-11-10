// Educación: an attendance bench. Each session a reader sweeps the student
// cards; every student present raises their glass tube one step. After the last
// session, students above the minimum get a certificate printed; the one below
// it lights a red lamp and the tutor is notified.
import { k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 480;
const PLATE = { x: -104, y: -60, w: 208, d: 116, r: 10 };
const RACK = { x: -98, y: -54, w: 46, d: 4, h: 46 };
const CARD_X = [-91.5, -80.5, -69.5, -58.5];
const CARD = { w: 9, h: 13, z: 22 };
const CLOCK = { x: -42, y: -52, w: 28, d: 16, h: 34 };
const TUBES = { xs: [-2, 13, 28, 43], y: -32, z0: 4.6, h: 38, r: 4 };
const MIN = 0.75;
const PRN = { x: 54, y: 4, w: 30, d: 18, r: 2, h: 10 };
const TRAY = { x: 56, y: 28, w: 26, d: 18 };

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [RACK.x, RACK.y, RACK.h + 4], [TUBES.xs[3], TUBES.y, TUBES.z0 + TUBES.h + 4]], W, H, {
  pad: 20,
  azimuth: 50,
  elevation: 30,
});
const { at, S, L, D, slab, cyl, screws, base, label, ruler, lamp, faceY, faceX, screen } = kitFor(P);

const out = [base(PLATE)];

// ── Card rack with its reader rail (back left) ──────────────────────────
for (const x of [RACK.x + 3, RACK.x + RACK.w - 7]) out.push(slab({ x, y: RACK.y - 4, w: 4, d: 12, r: 0.8 }, 0, 2, "lo", { steps: 2, bevel: 0.2 }));
out.push(slab({ x: RACK.x, y: RACK.y, w: RACK.w, d: RACK.d, r: 0.8 }, 2, RACK.h - 2, "hi", { steps: 2, bevel: 0.4, crease: "lo" }));
const FY = RACK.y + RACK.d;
out.push(faceY(RACK.x + 2.4, FY, RACK.h - 2, `<text class="ui-t" font-size="2.6" font-weight="600">ASISTENCIA</text><path class="ui-s" data-t="lo" d="M0 1.6h${RACK.w - 5}"/>`));
CARD_X.forEach((x, i) => {
  out.push(slab({ x: x - CARD.w / 2, y: FY, w: CARD.w, d: 1.2, r: 0.3 }, CARD.z, CARD.h, "hi", { steps: 1, bevel: 0.2, crease: "lo" }));
  out.push(
    faceY(
      x - CARD.w / 2 + 1,
      FY + 1.2,
      CARD.z + CARD.h - 1,
      `<rect class="ui-f" width="3.4" height="4" rx=".6"/><text class="ui-t" x="${CARD.w - 2}" y="3" font-size="2.4" font-weight="600" text-anchor="end">0${i + 1}</text><path class="ui-s" d="M0 6h${CARD.w - 2}M0 8h${CARD.w - 4}"/>`,
    ),
  );
  out.push(slab({ x: x - CARD.w / 2 - 0.6, y: FY, w: CARD.w + 1.2, d: 2, r: 0.3 }, CARD.z - 0.6, 4, "mid", { steps: 1, bevel: 0.1 }));
  out.push(faceY(x - 1, FY + 2, CARD.z - 2.4, `<circle class="ui-f" data-led="${i}" cx="1" cy="1" r="1.1"/>`));
});
out.push(slab({ x: RACK.x - 2, y: FY, w: RACK.w + 4, d: 3, r: 0.6 }, RACK.h - 8, 2.4, "mid", { steps: 2, bevel: 0.2 }));
out.push(`<g data-part="reader"></g>`);

// ── Session clock (back middle) ──────────────────────────────────────────
out.push(slab({ x: CLOCK.x, y: CLOCK.y, w: CLOCK.w, d: CLOCK.d, r: 2 }, 0, CLOCK.h, "mid", { steps: 4, bevel: 0.6, seam: 6 }));
out.push(...screws(k.corners({ ...CLOCK, r: 2 }, 3), CLOCK.h, 0.8, 0.4));
const CF = CLOCK.y + CLOCK.d;
const CC = { x: CLOCK.x + CLOCK.w / 2, z: CLOCK.h - 13 };
const ticks = [];
for (let i = 0; i < 12; i++) {
  const a = (i * Math.PI) / 6;
  const r0 = i % 3 === 0 ? 7.4 : 8.4;
  ticks.push(`M${(Math.sin(a) * r0).toFixed(2)} ${(-Math.cos(a) * r0).toFixed(2)}L${(Math.sin(a) * 9.4).toFixed(2)} ${(-Math.cos(a) * 9.4).toFixed(2)}`);
}
out.push(
  faceY(
    CC.x,
    CF,
    CC.z,
    `<circle class="ui-f" data-t="paper" r="10.6"/><circle class="ui-s" data-t="hi" r="10.6"/><path class="ui-s" data-t="hi" d="${ticks.join("")}"/>`,
  ),
);
out.push(`<g data-part="hands"></g>`);
out.push(
  faceY(
    CLOCK.x + 3,
    CF,
    9,
    screen(CLOCK.w - 6, 6.4, `<text class="scr-t" data-part="sess" x="${(CLOCK.w - 6) / 2}" y="4.4" font-size="2.6" text-anchor="middle">SESIÓN 0/8</text>`, 1),
  ),
);
out.push(lamp(CLOCK.x + CLOCK.w - 5, CLOCK.y + 5, CLOCK.h, 1.4, "tick"));
out.push(k.wireSvg(at([CLOCK.x, CLOCK.y + 8, 2]), at([RACK.x + RACK.w, RACK.y + 2, 2]), { via: [at([RACK.x + RACK.w + 4, CLOCK.y + 8, 0.6]), at([RACK.x + RACK.w + 4, RACK.y + 2, 0.6])], tone: "mid", size: 1 }));
out.push(k.wireSvg(at([CLOCK.x + CLOCK.w, CLOCK.y + 8, 2]), at([TUBES.xs[0] - 8, TUBES.y - 4, 2]), { via: [at([TUBES.xs[0] - 8, CLOCK.y + 8, 0.6])], tone: "mid", size: 1 }));

// ── Attendance tubes on their stand ──────────────────────────────────────
const STAND = { x: TUBES.xs[0] - 9, y: TUBES.y - 8, w: TUBES.xs[3] - TUBES.xs[0] + 18, d: 18, r: 2 };
out.push(slab(STAND, 0, TUBES.z0, "mid", { steps: 4, bevel: 0.6, seam: 2 }));
const minZ = TUBES.z0 + TUBES.h * MIN;
const order = TUBES.xs.map((x, i) => ({ x, i })).sort((a, b) => k.depthOf([a.x, TUBES.y, 0], P) - k.depthOf([b.x, TUBES.y, 0], P));
for (const { x, i } of order) {
  out.push(cyl(x, TUBES.y, TUBES.r + 1.4, TUBES.z0 - 0.4, 1.2, "lo", { steps: 28 }));
  out.push(`<g data-liquid="${i}" class="veo-lamp" data-on></g>`);
  // Glass: silhouette, rims and a highlight, so the liquid shows through.
  const [vx, vy] = k.towardViewer(P);
  const side = [-vy, vx];
  const len = Math.hypot(side[0], side[1]);
  const sx = (side[0] / len) * TUBES.r;
  const sy = (side[1] / len) * TUBES.r;
  const top = TUBES.z0 + TUBES.h;
  out.push(
    L(
      k.segment([x + sx, TUBES.y + sy, TUBES.z0], [x + sx, TUBES.y + sy, top], P) +
        k.segment([x - sx, TUBES.y - sy, TUBES.z0], [x - sx, TUBES.y - sy, top], P) +
        k.ring(x, TUBES.y, TUBES.r, top, P, 28),
      { tone: "hi" },
    ),
  );
  out.push(L(k.segment([x + sx * 0.4 + 1, TUBES.y + sy * 0.4 + 1, TUBES.z0 + 3], [x + sx * 0.4 + 1, TUBES.y + sy * 0.4 + 1, top - 4], P), { tone: "faint" }));
  out.push(L(k.ring(x, TUBES.y, TUBES.r + 0.2, minZ, P, 28), { tone: "red" }));
  out.push(cyl(x, TUBES.y, TUBES.r + 0.8, top, 1.4, "mid", { steps: 24 }));
}
out.push(faceY(STAND.x + 2, STAND.y + STAND.d, TUBES.z0 - 0.6, TUBES.xs.map((x, i) => `<text class="ui-t" x="${x - STAND.x - 2}" y="2.6" font-size="2.4" text-anchor="middle">0${i + 1}</text>`).join("")));
TUBES.xs.forEach((x, i) => out.push(lamp(x + 6.4, TUBES.y + 6.4, TUBES.z0, 1.2, `pass${i}`)));
out.push(faceX(STAND.x + STAND.w, STAND.y + STAND.d - 2, TUBES.z0 - 0.6, `<text class="ui-t" y="2.6" font-size="2.2" style="fill:#e5484d">MÍN 75 %</text>`));

// ── Certificate printer and tray (front right) ──────────────────────────
out.push(slab(PRN, 0, PRN.h, "mid", { steps: 4, bevel: 0.6, seam: 4 }));
out.push(...screws(k.corners(PRN, 2.6), PRN.h, 0.8, 0.4));
out.push(L(k.planOutline({ x: PRN.x + 5, y: PRN.y + 7, w: 20, d: 2.4, r: 1 }, PRN.h, P, 2), { tone: "hi" }));
out.push(`<g data-part="feed"></g>`);
out.push(lamp(PRN.x + PRN.w - 4, PRN.y + 4, PRN.h, 1.3, "print"));
out.push(slab({ ...TRAY, r: 1 }, 0, 1, "lo", { steps: 2, bevel: 0.2 }));
out.push(faceY(TRAY.x + 2, TRAY.y + TRAY.d, 1, `<text class="ui-t" y="-.4" font-size="2.2">CERTIFICADOS</text>`));
out.push(`<g data-part="certs"></g>`);

// ── Front: label, ruler ──────────────────────────────────────────────────
out.push(label({ x: -98, y: 30, w: 44, d: 14, r: 1.2 }, "VEODAR · ED-10"));
out.push(ruler({ x: -44, y: 38, w: 80, d: 7, r: 1 }));

save("attendance", {
  width: W,
  height: H,
  label:
    "Un banco de asistencia sobre una placa: en cada sesión un lector recorre las tarjetas de cuatro alumnos y el tubo de cada alumno presente sube un paso. Tras la última sesión, quien supera el mínimo del 75 % recibe un certificado impreso y quien no llega enciende una luz roja y avisa al tutor.",
  body: out,
  motion: {
    P,
    rack: { x0: RACK.x, x1: RACK.x + RACK.w, face: FY, z: RACK.h - 8 },
    cards: CARD_X,
    card: CARD,
    clock: { x: CC.x, y: CF, z: CC.z },
    tubes: TUBES,
    min: MIN,
    paper: { x0: PRN.x + 6, x1: PRN.x + 24, y: PRN.y + 8.2, z: PRN.h },
    tray: TRAY,
  },
});
