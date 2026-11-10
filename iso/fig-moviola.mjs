// Mesa de montaje: a thirty-second launch video in three scenes — the pain,
// the moment, the promise. The playhead runs the timeline on the desk and the
// monitor plays what is under it; reels and jog wheel turn while it plays.
import { k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 470;
const PLATE = { x: -106, y: -58, w: 212, d: 116, r: 10 };
const DESK = { x: -90, y: -4, w: 152, d: 50, r: 3, h: 12 };
const TL = { x: DESK.x + 6, y: DESK.y + 4, w: DESK.w - 12, h: DESK.d - 8 };
const MON = { x: -62, y: -46, w: 88, d: 5, r: 2.5, z0: 18, h: 56 };
const SCR = { x: MON.x + 3, y: MON.y + MON.d, z: MON.z0 + MON.h - 3, w: MON.w - 6, h: MON.h - 6 };
const REELS = { x: 40, y: -50, w: 54, d: 30, r: 3, h: 10 };
const JOG = { x: 80, y: 22, r: 10 };
const CLIPS = [
  [0, 0.33],
  [0.345, 0.66],
  [0.675, 1],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [MON.x, MON.y, MON.z0 + MON.h + 2], [MON.x + MON.w, MON.y, MON.z0 + MON.h + 2]], W, H, {
  pad: 22,
  azimuth: 50,
  elevation: 32,
});
const { at, S, L, D, slab, cyl, screws, base, label, lamp, top, faceY, screen } = kitFor(P);

const out = [base(PLATE)];

// Monitor.
const mx = MON.x + MON.w / 2;
out.push(cyl(mx, MON.y + 2, 13, 0, 1.8, "lo", { steps: 40 }));
out.push(cyl(mx, MON.y + 2, 10, 1.8, 1.6, "mid", { steps: 40, bevel: 0.4 }));
out.push(slab({ x: mx - 3.5, y: MON.y - 1, w: 7, d: 4, r: 1 }, 3.4, MON.z0 - 1, "mid", { steps: 2, bevel: 0.3 }));
out.push(slab(MON, MON.z0, MON.h, "hi", { steps: 4, bevel: 0.6, crease: "lo" }));
out.push(
  faceY(
    SCR.x,
    SCR.y,
    SCR.z,
    screen(
      SCR.w,
      SCR.h,
      `<g data-part="view"></g><text class="scr-t" data-t="dim" data-part="tc" x="${SCR.w - 3}" y="5" font-size="2.7" text-anchor="end">00:00 / 00:30</text><circle class="scr-f" data-t="acc" cx="3.6" cy="4" r="1.1"/><text class="scr-t" data-t="dim" x="6.4" y="5" font-size="2.7">REC</text>`,
      1.6,
    ),
  ),
);

// Reel unit behind the desk: two reels, film between them through a gate.
out.push(slab(REELS, 0, REELS.h, "mid", { steps: 4, bevel: 0.6, seam: 4 }));
const reels = [REELS.x + 14, REELS.x + 40].map((x) => ({ x, y: REELS.y + 15 }));
out.push(L(k.lineOnTop([reels[0].x, reels[0].y + 9.6], [reels[1].x, reels[1].y + 9.6], REELS.h + 3, P), { tone: "hi" }));
for (const r of reels) {
  out.push(cyl(r.x, r.y, 11, REELS.h, 0.8, "lo", { steps: 40 }));
  out.push(cyl(r.x, r.y, 9.6, REELS.h + 0.8, 2.2, "hi", { steps: 48, bevel: 0.4, crease: "lo" }));
  out.push(L(k.ring(r.x, r.y, 6, REELS.h + 3, P, 32), { tone: "faint" }));
  out.push(`<g data-reel="${r.x},${r.y}"></g>`);
  out.push(cyl(r.x, r.y, 1.8, REELS.h + 3, 1.4, "mid", { steps: 16 }));
}
out.push(slab({ x: REELS.x + 24, y: REELS.y + 22, w: 6, d: 5, r: 1 }, REELS.h, 4.4, "mid", { steps: 2, bevel: 0.3 }));
out.push(lamp(REELS.x + 27, REELS.y + 6, REELS.h, 1.6, "play"));

// Desk with the timeline panel on top.
out.push(slab(DESK, 0, DESK.h, "mid", { steps: 4, bevel: 0.7, seam: 5 }));
const ui = [];
const tw = TL.w - 6;
for (let i = 0; i <= 30; i++) ui.push(`<path class="scr-s" data-t="${i % 5 ? "dim" : "hi"}" d="M${3 + (i / 30) * tw} 2.4v${i % 5 ? 1.4 : 2.6}"/>`);
CLIPS.forEach(([a, b], i) => ui.push(`<rect class="scr-f" data-clip="${i}" data-t="mid" x="${3 + a * tw}" y="7.4" width="${(b - a) * tw}" height="9" rx="1.4"/>`));
CLIPS.forEach(([a], i) => ui.push(`<text class="scr-t" x="${5 + a * tw}" y="13.4" font-size="2.6" fill="#16142c" style="fill:#16142c">${["dolor", "momento", "promesa"][i]}</text>`));
// Voice-over as a row of bars, music as one long clip, captions as short ones.
const bars = [];
for (let i = 0; i < 58; i++) {
  const hgt = 1.2 + Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)) * 5.4;
  bars.push(`M${5 + (i / 58) * (tw - 6)} ${23.4 - hgt / 2}v${hgt}`);
}
ui.push(`<rect class="scr-f" x="3" y="18.6" width="${tw}" height="9.6" rx="1.4"/><path class="scr-s" d="${bars.join("")}"/>`);
[
  [0.02, 0.26],
  [0.36, 0.55],
  [0.7, 0.96],
].forEach(([a, b]) => ui.push(`<rect class="scr-s" data-t="dim" x="${3 + a * tw}" y="30.6" width="${(b - a) * tw}" height="5.4" rx="1.2"/>`));
ui.push(`<g data-part="playhead"><path class="scr-s scr-glow" data-t="acc" d="M3 1v${TL.h - 2}"/><path class="scr-f" data-t="acc" d="M1.2 0h3.6v2.2l-1.8 1.8-1.8-1.8z"/></g>`);
out.push(top(TL.x, TL.y, DESK.h + 0.02, screen(TL.w, TL.h, ui.join(""), 1.6)));
out.push(...screws([[DESK.x + 3, DESK.y + 3], [DESK.x + DESK.w - 3, DESK.y + DESK.d - 3]], DESK.h, 0.8, 0.4));

// Jog wheel.
out.push(cyl(JOG.x, JOG.y, JOG.r + 2, 0, 2, "lo", { steps: 40 }));
out.push(cyl(JOG.x, JOG.y, JOG.r, 2, 6, "mid", { steps: 48, bevel: 0.5, inner: L(k.knurl(JOG.x, JOG.y, JOG.r, 3, 8, 52, P, 0.3), { tone: "lo" }) }));
out.push(L(k.ring(JOG.x, JOG.y, JOG.r - 3, 8, P, 36), { tone: "faint" }));
out.push(`<g data-part="jog"></g>`);

out.push(label({ x: 24, y: 49, w: 62, d: 8, r: 1 }, "REMOTION · 30 S"));

save("moviola", {
  width: W,
  height: H,
  label:
    "Una mesa de montaje: sobre el tablero, una línea de tiempo con tres clips —dolor, momento, promesa—, locución y subtítulos, y un cabezal que la recorre; un monitor reproduce la escena que hay bajo el cabezal mientras giran las bobinas y la rueda.",
  body: out,
  motion: { P, tw, clips: CLIPS, screen: { w: SCR.w, h: SCR.h }, reelZ: REELS.h + 3.05, jog: { ...JOG, z: 8.05 } },
});
