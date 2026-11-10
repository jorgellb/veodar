// Puesto de trabajo: a desktop app that keeps working when the network goes.
// A knife switch is the network; while it is open every change is saved on
// the local disk, and when it closes the changes travel out along the cable.
import { G, k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 470;
const PLATE = { x: -108, y: -58, w: 216, d: 116, r: 10 };
const MON = { x: -70, y: -40, w: 92, d: 5, r: 2.5, z0: 22, h: 60 };
const SCR = { x: MON.x + 3, y: MON.y + MON.d, z: MON.z0 + MON.h - 3, w: MON.w - 6, h: MON.h - 6 };
const DISK = { x: 40, y: -48, w: 50, d: 46, r: 3, h: 12, cx: 65, cy: -25, pr: 17 };
const SW = { x: 44, y: 16, w: 46, d: 18, r: 2, px: 53, pz: 13, len: 27, y0: 25 };
const JACK = { x: 94, y: 18, w: 9, d: 14, r: 1.5 };
const LEVELS = 6;
const OPEN = 0.95;

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [MON.x, MON.y, MON.z0 + MON.h + 2], [MON.x + MON.w, MON.y, MON.z0 + MON.h + 2]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});
const { at, S, L, D, slab, cyl, screws, base, label, lamp, slot, faceY, screen } = kitFor(P);

const out = [base(PLATE)];

// Cables on the plate: monitor → disk, disk → switch, switch → wall jack.
const cableA = [
  [DISK.cx, DISK.y + DISK.d, 4],
  [DISK.cx, DISK.y + DISK.d + 5, 0.8],
  [SW.px, DISK.y + DISK.d + 5, 0.8],
  [SW.px, SW.y, 3],
];
const cableB = [
  [SW.x + SW.w, SW.y0, 3],
  [JACK.x - 4, SW.y0, 0.8],
  [JACK.x, SW.y0, 5],
];
for (const pts of [cableA, cableB]) {
  const flat = pts.map(at);
  out.push(k.wireSvg(flat[0], flat[flat.length - 1], { via: flat.slice(1, -1), tone: "mid", size: 1.1 }));
}
out.push(k.wireSvg(at([-12, -28, 1]), at([DISK.x, -30, 5]), { via: [at([10, -28, 0.8]), at([30, -30, 0.8])], tone: "lo", size: 1 }));

// ── Monitor ──────────────────────────────────────────────────────────────
const mx = MON.x + MON.w / 2;
out.push(cyl(mx, MON.y + 2, 14, 0, 1.8, "lo", { steps: 40 }));
out.push(cyl(mx, MON.y + 2, 11, 1.8, 1.6, "mid", { steps: 40, bevel: 0.4 }));
out.push(slab({ x: mx - 3.5, y: MON.y - 1, w: 7, d: 4, r: 1 }, 3.4, MON.z0 - 1, "mid", { steps: 2, bevel: 0.3 }));
out.push(slab(MON, MON.z0, MON.h, "hi", { steps: 4, bevel: 0.6, crease: "lo" }));

const ui = [];
// Window chrome.
ui.push(`<path class="scr-s" data-t="dim" d="M0 6.4h${SCR.w}M19 6.4v${SCR.h - 13}M0 ${SCR.h - 6.6}h${SCR.w}"/>`);
[3.2, 6, 8.8].forEach((x, i) => ui.push(`<circle class="scr-f" data-t="${i === 0 ? "acc" : "mid"}" cx="${x}" cy="3.3" r=".95"/>`));
ui.push(`<text class="scr-t" data-t="dim" x="14" y="4.3" font-size="2.5">Planos · pieza 14-B</text>`);
// Sidebar files.
for (let i = 0; i < 6; i++) {
  if (i === 1) ui.push(`<rect class="scr-f" x="1.4" y="${8 + i * 5.2}" width="16.2" height="4.4" rx="1"/>`);
  ui.push(`<path class="scr-s" data-t="${i === 1 ? "hi" : "dim"}" d="M3.4 ${10.3 + i * 5.2}h${[9, 11, 7, 10, 8, 6][i]}"/>`);
}
// Drawing area: grid dots, the part outline (drawn live), its bore and a dimension.
const dots = [];
for (let gx = 0; gx < 9; gx++) for (let gy = 0; gy < 5; gy++) dots.push(`<circle class="scr-f" data-t="mid" cx="${25 + gx * 7}" cy="${11.5 + gy * 7}" r=".28"/>`);
ui.push(dots.join(""));
ui.push(`<path class="scr-s" data-t="hi" data-part="cad" d=""/>`);
ui.push(`<g data-part="bore" opacity="0"><circle class="scr-s" data-t="acc" cx="56" cy="27" r="5"/><path class="scr-s" data-t="dim" d="M49 27h14M56 20v14"/></g>`);
ui.push(`<g data-part="dim" opacity="0"><path class="scr-s" data-t="dim" d="M32 43.2h44M32 42v2.4M76 42v2.4"/><text class="scr-t" data-t="dim" x="54" y="42.2" font-size="2.2" text-anchor="middle">44,0</text></g>`);
// Status bar.
ui.push(`<circle data-part="status-dot" class="scr-f" data-t="acc" cx="3.4" cy="${SCR.h - 3.3}" r="1.1"/>`);
ui.push(`<text class="scr-t" data-part="status" x="6.4" y="${SCR.h - 2.3}" font-size="2.6">Al día</text>`);
ui.push(`<text class="scr-t" data-t="dim" x="${SCR.w - 3}" y="${SCR.h - 2.3}" font-size="2.3" text-anchor="end">v2.4 · firmada</text>`);
out.push(faceY(SCR.x, SCR.y, SCR.z, screen(SCR.w, SCR.h, ui.join(""), 1.6)));
out.push(D([at([mx, MON.y + MON.d, MON.z0 + 1.4])], { size: 0.6, tone: "hi" }));

// ── Keyboard and mouse ───────────────────────────────────────────────────
const kb = { x: -56, y: -12, w: 62, d: 19, r: 2 };
out.push(slab(kb, 0, 3, "mid", { steps: 3, bevel: 0.5 }));
out.push(D(k.dotGrid(kb.x + 4, kb.y + 3.6, 15, 4, 3.9, 3, P), { size: 0.62, tone: "lo" }));
out.push(L(k.planOutline({ x: kb.x + 18, y: kb.y + 14.4, w: 26, d: 2.4, r: 1 }, 3, P, 2), { tone: "lo" }));
out.push(slab({ x: 14, y: -9, w: 9, d: 14, r: 4.2 }, 0, 3.4, "hi", { steps: 6, bevel: 0.5, crease: "lo" }));
out.push(L(k.lineOnTop([18.5, -9], [18.5, -3], 3.4, P), { tone: "lo" }));

// ── Local disk: platter and read arm are drawn live ──────────────────────
out.push(slab(DISK, 0, DISK.h, "mid", { steps: 4, bevel: 0.7, seam: 4 }));
out.push(...screws(k.corners(DISK, 3.2), DISK.h, 0.9, 0.4));
out.push(cyl(DISK.cx, DISK.cy, DISK.pr + 2, DISK.h, 0.8, "lo", { steps: 56 }));
out.push(cyl(DISK.cx, DISK.cy, DISK.pr, DISK.h + 0.8, 1.6, "hi", { steps: 64, bevel: 0.5, crease: "lo" }));
out.push(L(k.ring(DISK.cx, DISK.cy, DISK.pr - 3, DISK.h + 2.4, P, 56) + k.ring(DISK.cx, DISK.cy, 7, DISK.h + 2.4, P, 40), { tone: "faint" }));
out.push(`<g data-part="platter"></g>`);
out.push(cyl(DISK.cx, DISK.cy, 3.6, DISK.h + 2.4, 1.2, "mid", { steps: 24 }));
out.push(cyl(DISK.x + DISK.w - 7, DISK.y + DISK.d - 7, 3, DISK.h, 2.4, "mid", { steps: 20 }));
out.push(`<g data-part="arm"></g>`);
out.push(lamp(DISK.x + 7, DISK.y + DISK.d - 6, DISK.h, 1.6, "disk"));
for (let i = 0; i < 5; i++) out.push(L(slot("y", DISK.y + DISK.d, DISK.x + 14 + i * 5, DISK.x + 16.6 + i * 5, 3, 9, 0.9), { tone: "lo" }));

// ── Knife switch: the network ────────────────────────────────────────────
out.push(slab(SW, 0, 5, "mid", { steps: 3, bevel: 0.5, seam: 2 }));
out.push(...screws(k.corners(SW, 2.6), 5, 0.8, 0.4));
// Jaw (two clips) at the far end, hinge block at the near one.
const jawX = SW.px + SW.len;
out.push(slab({ x: jawX - 2, y: SW.y0 - 3.4, w: 5, d: 1.6, r: 0.4 }, 5, 10, "mid", { steps: 1, bevel: 0 }));
const BF = G.frameOf([0, SW.y0 - 1.2, 0], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
const blades = [];
for (let level = 0; level < LEVELS; level++) {
  const a = (OPEN * level) / (LEVELS - 1);
  const rot = (dx, dz) => [SW.px + dx * Math.cos(a) - dz * Math.sin(a), SW.pz + dx * Math.sin(a) + dz * Math.cos(a)];
  const blade = G.prismOf(BF, [rot(-2, -1.3), rot(SW.len + 2, -1.3), rot(SW.len + 2, 1.3), rot(-2, 1.3)], 0, 2.4, P);
  const [hx, hz] = rot(SW.len + 5.4, 0);
  blades.push(
    `<g data-level="${level}"${level ? ' style="display:none"' : ""}>${S(blade, { tone: "hi", crease: "lo" })}${S(G.sphereOf([hx, SW.y0, hz], 3, P), { tone: "hi", crease: "none" })}</g>`,
  );
}
out.push(slab({ x: SW.px - 3, y: SW.y0 - 3.6, w: 6, d: 1.8, r: 0.4 }, 5, 11, "mid", { steps: 1, bevel: 0 }));
out.push(`<g data-part="blade">${blades.join("")}</g>`);
out.push(slab({ x: SW.px - 3, y: SW.y0 + 1.8, w: 6, d: 1.8, r: 0.4 }, 5, 11, "mid", { steps: 1, bevel: 0 }));
out.push(slab({ x: jawX - 2, y: SW.y0 + 1.8, w: 5, d: 1.6, r: 0.4 }, 5, 10, "mid", { steps: 1, bevel: 0 }));
out.push(D([at([SW.px, SW.y0 + 3.6, SW.pz])], { size: 0.6, tone: "hi" }));

// Wall jack with the network lamp.
out.push(slab(JACK, 0, 12, "mid", { steps: 2, bevel: 0.4 }));
out.push(lamp(JACK.x + JACK.w / 2, JACK.y + JACK.d / 2, 12, 2, "net"));

out.push(label({ x: -100, y: 30, w: 58, d: 12, r: 1 }, "TAURI · RUST"));
out.push(`<g data-part="beads">${[0, 1, 2].map((i) => `<g data-bead="${i}" opacity="0"><circle class="veo-bead" r="2"/></g>`).join("")}</g>`);

save("workstation", {
  width: W,
  height: H,
  label:
    "Un puesto de escritorio: monitor con una aplicación de planos, teclado, un disco local cuyo plato gira y un interruptor de cuchilla que hace de red. Con la cuchilla abierta los cambios se guardan en el disco; al cerrarla viajan por el cable hasta la toma.",
  body: out,
  motion: {
    P,
    levels: LEVELS,
    disk: { x: DISK.cx, y: DISK.cy, r: DISK.pr, z: DISK.h + 2.45, pivot: [DISK.x + DISK.w - 7, DISK.y + DISK.d - 7] },
    route: [...cableA, ...cableB].map(at),
    cad: [
      [28, 40],
      [28, 16],
      [44, 16],
      [44, 11],
      [66, 11],
      [66, 22],
      [76, 22],
      [76, 40],
      [28, 40],
    ],
  },
});
