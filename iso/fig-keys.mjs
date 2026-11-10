// Cuadro de llaves: each credential hangs on its own hook. A key leaves only to
// open one system, the printer logs it, and it goes back. The admin key never leaves.
import { G, k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 480;
const PLATE = { x: -112, y: -56, w: 224, d: 112, r: 10 };
const BOARD = { x: -100, y: -38, w: 128, d: 8, r: 2 };
const FACE = BOARD.y + BOARD.d;
const HOOK_Z = 58;
const XS = [-84, -60, -36, -12, 12];
const KEY_Y = FACE + 3.2;
const BOX = { x: 44, y: -40, w: 44, d: 30, r: 2.4 };
const BOX_Z = 46;
const SLOT = { x: 66, y: -25 };
const PRN = { x: 42, y: 12, w: 38, d: 24, r: 3 };

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [BOARD.x, BOARD.y, 82], [BOARD.x + BOARD.w, BOARD.y, 82], [SLOT.x, SLOT.y, 82]], W, H, {
  pad: 22,
  azimuth: 46,
  elevation: 26,
});
const { at, S, L, D, slab, cyl, screws, base, label, lamp, faceY, screen } = kitFor(P);

const out = [base(PLATE)];

// The board with its hooks, tag plates and keys.
out.push(slab(BOARD, 0, 80, "mid", { steps: 4, bevel: 0.8, seam: 74 }));
out.push(slab({ x: BOARD.x - 2, y: BOARD.y - 2, w: BOARD.w + 4, d: BOARD.d + 4, r: 2.6 }, 80, 3, "mid", { steps: 4, bevel: 0.6 }));
for (const x of [BOARD.x + 8, BOARD.x + BOARD.w - 16]) out.push(slab({ x, y: FACE, w: 8, d: 10, r: 1 }, 0, 6, "mid", { steps: 2, bevel: 0.3 }));
out.push(...screws([[BOARD.x + 6, FACE], [BOARD.x + BOARD.w - 6, FACE]].map(([x]) => [x, BOARD.y + 4]), 83, 1, 0.45));

const keyParts = (x) => {
  const F = G.frameOf([0, KEY_Y - 0.6, 0], [0, 1, 0], [1, 0, 0], [0, 0, 1]);
  const head = G.prismOf(F, k.circleRing(x, HOOK_Z - 5.2, 5, 28).map(([u, v]) => [u, v]), 0, 1.2, P);
  const blade = G.prismOf(F, [[x - 1.3, HOOK_Z - 10], [x + 1.3, HOOK_Z - 10], [x + 1.3, HOOK_Z - 30], [x - 1.3, HOOK_Z - 30]], 0, 1.2, P);
  const bit = G.prismOf(F, [[x + 1.3, HOOK_Z - 23], [x + 5, HOOK_Z - 23], [x + 5, HOOK_Z - 30], [x + 1.3, HOOK_Z - 30]], 0, 1.2, P);
  const yf = KEY_Y + 0.6;
  const seg = (a, b) => k.segment([a[0], yf, a[1]], [b[0], yf, b[1]], P);
  const notches = seg([x + 3, HOOK_Z - 23], [x + 3, HOOK_Z - 26]) + seg([x + 5, HOOK_Z - 26.6], [x + 3.6, HOOK_Z - 26.6]);
  const hole = k.sideRing([x, yf, HOOK_Z - 2.4], 1.5, "y", P, 18);
  return (tone, lit) =>
    S(blade, { tone, crease: "lo", lit }) + S(bit, { tone, crease: "lo", lit, inner: L(notches, { tone: "lo" }) }) + S(head, { tone, crease: "lo", lit, inner: L(hole, { tone: "lo" }) });
};

XS.forEach((x, i) => {
  // Tag plate under the hook; the admin hook carries a seal.
  out.push(slab({ x: x - 7, y: FACE, w: 14, d: 0.8, r: 0.3 }, HOOK_Z - 44, 6, i === 4 ? "hi" : "mid", { steps: 1, bevel: 0 }));
  out.push(L(k.segment([x - 4.6, FACE + 0.8, HOOK_Z - 40], [x + 3, FACE + 0.8, HOOK_Z - 40], P), { tone: "lo", free: true }));
  out.push(D(Array.from({ length: i + 1 }, (_, j) => at([x - 4.6 + j * 2, FACE + 0.8, HOOK_Z - 42])), { size: 0.45, tone: "hi" }));
  // Hook: a short pin out of the board with a ball end.
  const HF = G.frameAlong([x, FACE, HOOK_Z], [0, 1, 0]);
  out.push(S(G.disc(0, 1, 2.6, HF, P, {}), { tone: "mid", crease: "none" }));
  out.push(S(G.disc(1, 6.4, 1.1, HF, P, {}), { tone: "mid", crease: "none" }));
  // Key hanging (hidden while it is away).
  const draw = keyParts(x);
  out.push(`<g data-part="hang-${i}">${draw("hi", false)}</g>`);
  out.push(S(G.sphereOf([x, FACE + 6.6, HOOK_Z], 1.5, P), { tone: "mid", crease: "none" }));
  if (i === 4) {
    out.push(slab({ x: x + 3, y: KEY_Y - 0.4, w: 5, d: 0.6, r: 0.3 }, HOOK_Z - 18, 6, "lo", { steps: 1, bevel: 0 }));
    out.push(L(k.segment([x + 5.5, KEY_Y + 0.2, HOOK_Z - 12], [x + 2.4, KEY_Y + 0.2, HOOK_Z - 7], P), { tone: "mid" }));
  }
});

// System box with the lock on top: nearer than the board, so drawn after it.
out.push(slab(BOX, 0, BOX_Z, "mid", { steps: 4, bevel: 0.6, seam: 8 }));
out.push(
  faceY(
    BOX.x + 5,
    BOX.y + BOX.d,
    BOX_Z - 8,
    screen(
      BOX.w - 10,
      16,
      `<text class="scr-t" data-part="sys" x="3" y="7" font-size="3.6" font-weight="600">BLOQUEADO</text><text class="scr-t" data-t="acc" data-part="sys2" x="3" y="12.4" font-size="2.5">sin llave no hay acceso</text>`,
      1.4,
    ),
  ),
);
const lockPlate = { x: SLOT.x - 8, y: SLOT.y - 6, w: 16, d: 12, r: 2 };
out.push(slab(lockPlate, BOX_Z, 1.6, "hi", { steps: 3, bevel: 0.4, crease: "lo" }));
out.push(L(k.planOutline({ x: SLOT.x - 1.6, y: SLOT.y - 0.7, w: 3.2, d: 1.4, r: 0.6 }, BOX_Z + 1.6, P, 2), { tone: "hi" }));
out.push(...screws(k.corners(lockPlate, 2), BOX_Z + 1.6, 0.8, 0.4));
out.push(lamp(BOX.x + BOX.w - 7, BOX.y + 7, BOX_Z, 2, "open"));
out.push(...screws(k.corners(BOX, 3.4), BOX_Z, 1, 0.45));

// Printer with its paper slot; the paper is drawn live.
out.push(slab(PRN, 0, 14, "mid", { steps: 4, bevel: 0.6, seam: 4 }));
out.push(L(k.planOutline({ x: PRN.x + 6, y: PRN.y + 9, w: 26, d: 3, r: 1 }, 14, P, 2), { tone: "hi" }));
out.push(lamp(PRN.x + PRN.w - 6, PRN.y + PRN.d - 5, 14, 1.4, "print"));
out.push(...screws(k.corners(PRN, 3), 14, 0.8, 0.4));
out.push(`<g data-part="paper"></g>`);

// The travelling key, built at the first hook; moved as a whole.
out.push(`<g data-part="mover" style="display:none"><g data-part="mover-key">${keyParts(0)("hi", true)}</g></g>`);

out.push(label({ x: -104, y: 30, w: 54, d: 12, r: 1 }, "CREDENCIALES"));

save("keys", {
  width: W,
  height: H,
  label:
    "Un cuadro de llaves sobre una placa: cinco ganchos con una llave cada uno; una llave sale de su gancho, entra en la cerradura de la caja del sistema, una impresora registra el acceso y la llave vuelve; la llave de administrador, precintada, no sale nunca.",
  body: out,
  motion: {
    P,
    xs: XS,
    hookZ: HOOK_Z,
    keyY: KEY_Y,
    slot: { ...SLOT, z: BOX_Z + 1.6 },
    paper: { x0: PRN.x + 7, x1: PRN.x + 31, y: PRN.y + 10.5, z: 14 },
    names: ["ERP", "CRM", "Correo", "Nube", "Admin"],
  },
});
