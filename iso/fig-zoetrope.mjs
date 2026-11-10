// Zoótropo: twelve frames of a bouncing ball ride a spinning drum; the viewer
// screen plays them back with squash, stretch and the easing curve that drives
// them. Animation is frames plus a curve — the machine shows both.
import { k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 460;
const PLATE = { x: -106, y: -56, w: 212, d: 112, r: 10 };
const DRUM = { x: -46, y: -6, r: 31, z0: 11, z1: 43 };
const MOTOR = { x: -86, y: 36 };
const MON = { x: 12, y: -34, w: 80, d: 5, r: 2.5, z0: 16, h: 52 };
const SCR = { x: MON.x + 3, y: MON.y + MON.d, z: MON.z0 + MON.h - 3, w: MON.w - 6, h: MON.h - 6 };
const TRACK = { x: -8, y: 34, w: 100, d: 9, r: 1.4 };
const FRAMES = 12;

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [MON.x, MON.y, MON.z0 + MON.h + 2], [MON.x + MON.w, MON.y, MON.z0 + MON.h + 2]], W, H, {
  pad: 22,
  azimuth: 48,
  elevation: 30,
});
const { at, S, L, D, slab, cyl, screws, base, label, lamp, top, faceY, screen } = kitFor(P);

const out = [base(PLATE)];

// Motor, belt and the drum's bearing.
out.push(cyl(DRUM.x, DRUM.y, 34, 0, 3, "lo", { steps: 64 }));
const dx = DRUM.x - MOTOR.x;
const dy = DRUM.y - MOTOR.y;
const len = Math.hypot(dx, dy);
const nx = -dy / len;
const ny = dx / len;
out.push(
  L(
    k.segment([MOTOR.x + nx * 4, MOTOR.y + ny * 4, 6.4], [DRUM.x + nx * 12, DRUM.y + ny * 12, 6.4], P) +
      k.segment([MOTOR.x - nx * 4, MOTOR.y - ny * 4, 6.4], [DRUM.x - nx * 12, DRUM.y - ny * 12, 6.4], P),
    { tone: "mid" },
  ),
);
out.push(cyl(DRUM.x, DRUM.y, 12, 3, 6, "mid", { steps: 40, bevel: 0.4, inner: L(k.sideArc(DRUM.x, DRUM.y, 12, 6.4, P, 28), { tone: "lo" }) }));
out.push(cyl(MOTOR.x, MOTOR.y, 9, 0, 2, "lo", { steps: 32 }));
out.push(cyl(MOTOR.x, MOTOR.y, 7, 2, 2.4, "mid", { steps: 32 }));
out.push(cyl(MOTOR.x, MOTOR.y, 4, 4.4, 3.4, "hi", { steps: 24, crease: "lo", inner: L(k.sideArc(MOTOR.x, MOTOR.y, 4, 6.4, P, 16), { tone: "lo" }) }));
out.push(cyl(MOTOR.x, MOTOR.y, 6.4, 7.8, 11, "mid", { steps: 30, bevel: 0.4, inner: L(k.knurl(MOTOR.x, MOTOR.y, 6.4, 9.4, 17.4, 26, P, 0.3), { tone: "lo" }) }));
out.push(cyl(MOTOR.x, MOTOR.y, 4, 18.8, 2, "hi", { steps: 22, crease: "lo" }));

// Drum: turntable disc and the wall; frames and slits are drawn live on it.
out.push(cyl(DRUM.x, DRUM.y, DRUM.r + 2.4, 9, 2, "mid", { steps: 72, bevel: 0.4 }));
out.push(cyl(DRUM.x, DRUM.y, DRUM.r, DRUM.z0, DRUM.z1 - DRUM.z0, "hi", { steps: 80, bevel: 0.6, crease: "lo", inner: L(k.sideArc(DRUM.x, DRUM.y, DRUM.r, 27, P, 56), { tone: "faint" }) }));
out.push(L(k.ring(DRUM.x, DRUM.y, DRUM.r - 2.6, DRUM.z1, P, 72), { tone: "mid" }));
out.push(`<g data-part="drum-top"></g>`);
out.push(cyl(DRUM.x, DRUM.y, 3, DRUM.z1, 1.6, "mid", { steps: 20 }));
out.push(`<g data-part="drum"></g>`);

// Viewer screen on a stand.
const mx = MON.x + MON.w / 2;
out.push(cyl(mx, MON.y + 2, 13, 0, 1.8, "lo", { steps: 40 }));
out.push(cyl(mx, MON.y + 2, 10, 1.8, 1.6, "mid", { steps: 40, bevel: 0.4 }));
out.push(slab({ x: mx - 3.5, y: MON.y - 1, w: 7, d: 4, r: 1 }, 3.4, MON.z0 - 1, "mid", { steps: 2, bevel: 0.3 }));
out.push(slab(MON, MON.z0, MON.h, "hi", { steps: 4, bevel: 0.6, crease: "lo" }));
const G = { x: 46, y: 6, s: 24 }; // easing graph box inside the screen
const ui = [
  `<text class="scr-t" data-t="dim" x="3" y="5" font-size="2.6">vista previa · 24 fps</text>`,
  `<path class="scr-s" data-t="dim" d="M3 ${SCR.h - 6}h38"/>`,
  `<g data-part="view"></g>`,
  `<path class="scr-s" data-t="dim" d="M${G.x} ${G.y}v${G.s}h${G.s}"/>`,
  `<path class="scr-s" data-t="hi" data-part="curve" d=""/>`,
  `<g data-part="curve-dot"><circle class="scr-f scr-glow" data-t="acc" r="1.5"/></g>`,
  `<text class="scr-t" data-part="frame" x="${G.x}" y="${G.y + G.s + 6}" font-size="3">01/12</text>`,
  `<text class="scr-t" data-t="dim" x="${G.x}" y="${G.y + G.s + 10.4}" font-size="2.3">ease-out</text>`,
];
out.push(faceY(SCR.x, SCR.y, SCR.z, screen(SCR.w, SCR.h, ui.join(""), 1.6)));

// Timeline strip with keyframes and a playhead.
out.push(slab(TRACK, 0, 1.6, "mid", { steps: 2, bevel: 0.3 }));
const ticks = k.topTicks(TRACK.x + 4, TRACK.x + TRACK.w - 4, (TRACK.w - 8) / 24, 2, TRACK.y + 0.6, 1.6, [1.6, 3], P);
out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
const keys = [0, 0.5, 1].map((f) => TRACK.x + 4 + f * (TRACK.w - 8));
out.push(
  top(
    0,
    0,
    1.62,
    keys.map((x) => `<path class="ui-f" data-t="hi" d="M${x} ${TRACK.y + 4.2}l1.7 1.7 -1.7 1.7 -1.7 -1.7z"/>`).join(""),
  ),
);
out.push(`<g data-part="playhead">${slab({ x: TRACK.x + 3, y: TRACK.y - 1, w: 2, d: TRACK.d + 2, r: 0.6 }, 1.6, 3, "hi", { steps: 1, bevel: 0, crease: "lo", lit: true })}</g>`);
out.push(lamp(TRACK.x - 8, TRACK.y + 4.5, 0, 1.8, "rec"));

out.push(label({ x: -98, y: 40, w: 52, d: 11, r: 1 }, "12 FOTOGRAMAS"));

save("zoetrope", {
  width: W,
  height: H,
  label:
    "Un zoótropo movido por un motor y una correa: el tambor lleva doce fotogramas de una pelota que bota; una pantalla los reproduce con aplastamiento y estiramiento junto a su curva de aceleración, y una pista con fotogramas clave marca el compás.",
  body: out,
  motion: {
    P,
    drum: DRUM,
    frames: FRAMES,
    view: { ground: SCR.h - 6, x: 22, lift: 27, r: 4 },
    graph: G,
    track: { x0: 1, x1: TRACK.w - 8 },
  },
});
