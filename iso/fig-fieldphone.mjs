// Parte de campo: a phone on a test cradle files work reports. With coverage
// each report flies straight to the office; without it, reports wait in a
// queue tray and are delivered when the mast lights up again.
import { G, coilZ, k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 470;
const PLATE = { x: -106, y: -62, w: 212, d: 122, r: 10 };
const PHONE = { x: -80, y: -46, w: 50, d: 94, r: 7 };
const SCR = { x: PHONE.x + 2.6, y: PHONE.y + 2.6, w: PHONE.w - 5.2, h: PHONE.d - 5.2, z: 9.55 };
const BTN = { x: 3.4, y: 75, w: SCR.w - 6.8, h: 9.4 };
const TAP = { x: SCR.x + SCR.w / 2, y: SCR.y + BTN.y + BTN.h / 2, rest: 17, press: 9.8, arm: 33 };
const QUEUE = { x: -14, y: 4, w: 32, d: 26, r: 2 };
const SERVER = { x: 40, y: -34, w: 54, d: 40, r: 3, h: 34 };
const MAST = { x: 14, y: -46 };
const CARD = { w: 15, d: 10, h: 1.2 };
const SPAWN = [SCR.x + SCR.w / 2, SCR.y + 26, 11.5];
const SLOT = [SERVER.x + SERVER.w / 2, SERVER.y + 12, SERVER.h + 0.4];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [MAST.x, MAST.y, 74], [SERVER.x + SERVER.w, SERVER.y, 40]], W, H, {
  pad: 22,
  azimuth: 48,
  elevation: 35,
});
const { at, S, L, D, slab, cyl, screws, base, label, ruler, lamp, slot, top, faceY, screen } = kitFor(P);

const out = [base(PLATE)];

// ── Mast (behind everything) ─────────────────────────────────────────────
out.push(cyl(MAST.x, MAST.y, 8, 0, 2, "lo", { steps: 32 }));
out.push(cyl(MAST.x, MAST.y, 5.6, 2, 3.4, "mid", { steps: 32, bevel: 0.4 }));
out.push(cyl(MAST.x, MAST.y, 1.7, 5.4, 56, "mid", { steps: 14, crease: "none", inner: L(k.sideArc(MAST.x, MAST.y, 1.7, 32, P, 10), { tone: "faint" }) }));
out.push(
  [9, 15, 21]
    .map((r, i) => `<g data-wave="${i}" opacity="0">${L(k.ring(MAST.x, MAST.y, r, 63, P, 48), { tone: "lit" })}</g>`)
    .join(""),
);
out.push(cyl(MAST.x, MAST.y, 3, 61.4, 1.4, "mid", { steps: 20 }));
out.push(`<g data-part="beacon" class="veo-lamp">${S(G.sphereOf([MAST.x, MAST.y, 66], 3.4, P), { tone: "hi", crease: "none" })}</g>`);
out.push(k.wireSvg(at([MAST.x + 5.6, MAST.y, 1]), at([SERVER.x, MAST.y + 8, 6]), { via: [at([MAST.x + 12, MAST.y, 0.6]), at([MAST.x + 12, MAST.y + 8, 0.6])], tone: "mid", size: 1 }));

// ── Phone on its cradle ──────────────────────────────────────────────────
const cradle = { x: PHONE.x - 4, y: PHONE.y - 4, w: PHONE.w + 8, d: PHONE.d + 8, r: 9 };
out.push(slab(cradle, 0, 5, "mid", { steps: 6, bevel: 0.8, seam: 2 }));
out.push(...screws(k.corners(cradle, 3), 5, 0.9, 0.4));
out.push(slab(PHONE, 5, 4.5, "hi", { steps: 6, bevel: 0.6, crease: "lo", seam: 7.2 }));
out.push(slab({ x: PHONE.x + PHONE.w - 0.4, y: PHONE.y + 22, w: 1, d: 10, r: 0.4 }, 6.4, 1.6, "mid", { steps: 1, bevel: 0 }));

const ui = [];
// Status bar: clock, signal bars.
ui.push(`<text class="scr-t" data-t="dim" x="3.4" y="5.6" font-size="2.6">9:41</text>`);
for (let i = 0; i < 4; i++) {
  const h = 1.1 + i * 0.85;
  ui.push(`<rect class="scr-f" data-t="hi" data-bar="${i}" x="${SCR.w - 12.4 + i * 2.3}" y="${5.6 - h}" width="1.5" height="${h}" rx=".3"/>`);
}
ui.push(`<text class="scr-t" data-part="title" x="3.4" y="13.2" font-size="3.7" font-weight="600">Parte 0142</text>`);
ui.push(`<text class="scr-t" data-t="dim" data-part="net" x="3.4" y="17.6" font-size="2.2">Avería · Almacén 2</text>`);
[14, 20, 11].forEach((len, i) => {
  const y = 21.4 + i * 12.2;
  ui.push(`<rect class="scr-f" x="3.4" y="${y}" width="${SCR.w - 6.8}" height="9.6" rx="2"/>`);
  ui.push(`<path class="scr-s" data-t="dim" d="M6 ${y + 3.4}h${len * 0.5}"/>`);
  ui.push(`<rect class="scr-f" data-t="mid" data-field="${i}" x="6" y="${y + 5.2}" width="0" height="1.8" rx=".6" data-w="${len}"/>`);
  ui.push(`<circle class="scr-f" data-t="acc" data-check="${i}" cx="${SCR.w - 7.6}" cy="${y + 4.8}" r="1.7" opacity="0"/>`);
});
ui.push(
  `<g data-part="photo" opacity="0"><rect class="scr-s" x="3.4" y="59" width="15" height="11.6" rx="1.4"/><path class="scr-s" data-t="hi" d="M5 68.4l3.6-4.6 2.6 3 1.8-1.8 3.4 3.4"/><circle class="scr-f" data-t="acc" cx="14.6" cy="62.2" r="1.1"/><path class="scr-s" data-t="dim" d="M21.4 62h17M21.4 65.4h12M21.4 68.8h15"/></g>`,
);
ui.push(
  `<rect class="scr-f" data-part="btn" x="${BTN.x}" y="${BTN.y}" width="${BTN.w}" height="${BTN.h}" rx="${BTN.h / 2}"/><text data-part="btn-text" x="${SCR.w / 2}" y="${BTN.y + 6.3}" font-size="2.9" font-weight="600" text-anchor="middle" fill="#1a0a03">ENVIAR</text>`,
);
out.push(top(SCR.x, SCR.y, SCR.z, screen(SCR.w, SCR.h, ui.join(""), 5)));

// ── Queue tray ───────────────────────────────────────────────────────────
out.push(slab(QUEUE, 0, 2.4, "lo", { steps: 3, bevel: 0.3 }));
out.push(L(k.planOutline(k.insetPlan(QUEUE, 2.4), 2.4, P, 3), { tone: "faint" }));
out.push(slab({ x: QUEUE.x, y: QUEUE.y, w: QUEUE.w, d: 1.6, r: 0.4 }, 2.4, 3, "mid", { steps: 1, bevel: 0 }));
out.push(slab({ x: QUEUE.x, y: QUEUE.y, w: 1.6, d: QUEUE.d, r: 0.4 }, 2.4, 3, "mid", { steps: 1, bevel: 0 }));

// ── Tapper: post, arm and spring plunger over the send button ────────────
const post = { x: TAP.x + 31, y: TAP.y };
out.push(`<g data-part="tap-spring"></g>`);
out.push(
  `<g data-part="plunger">${cyl(TAP.x, TAP.y, 1.1, TAP.rest + 4, TAP.arm - TAP.rest - 4, "hi", { steps: 12, crease: "none" })}${cyl(TAP.x, TAP.y, 2.8, TAP.rest + 1.4, 2.6, "mid", { steps: 20 })}${cyl(TAP.x, TAP.y, 2.2, TAP.rest, 1.4, "hi", { steps: 20, crease: "lo" })}</g>`,
);
out.push(cyl(post.x, post.y, 5.4, 0, 3, "lo", { steps: 24 }));
out.push(cyl(post.x, post.y, 2.8, 3, TAP.arm + 2, "mid", { steps: 18, crease: "none" }));
const arm = { x: TAP.x - 5, y: TAP.y - 4, w: post.x - TAP.x + 10, d: 8, r: 2 };
out.push(slab(arm, TAP.arm, 5, "mid", { steps: 3, bevel: 0.5 }));
out.push(...screws([[post.x, post.y]], TAP.arm + 5, 1.2, 0.45));
out.push(cyl(TAP.x, TAP.y, 2.6, TAP.arm + 5, 1.6, "mid", { steps: 18 }));

// ── Office server ────────────────────────────────────────────────────────
out.push(slab(SERVER, 0, SERVER.h, "mid", { steps: 4, bevel: 0.7, seam: 6 }));
out.push(L(k.planOutline({ x: SLOT[0] - 10, y: SLOT[1] - 2, w: 20, d: 4, r: 1.4 }, SERVER.h, P, 3), { tone: "hi" }));
out.push(lamp(SERVER.x + SERVER.w - 7, SERVER.y + SERVER.d - 7, SERVER.h, 1.8, "rx"));
out.push(...screws(k.corners(SERVER, 3.4), SERVER.h, 0.9, 0.4));
const sv = { w: SERVER.w - 12, h: 20 };
const rows = [0, 1, 2]
  .map(
    (i) =>
      `<g data-row="${i}" opacity="0"><circle class="scr-f" data-t="acc" cx="3.6" cy="${4.6 + i * 5.6}" r="1.1"/><text class="scr-t" x="6.6" y="${5.7 + i * 5.6}" font-size="2.8" data-row-text="${i}">0142 recibido</text></g>`,
  )
  .join("");
out.push(faceY(SERVER.x + 6, SERVER.y + SERVER.d, SERVER.h - 5, screen(sv.w, sv.h, rows, 1.4)));
for (let i = 0; i < 4; i++) out.push(L(slot("x", SERVER.x + SERVER.w, SERVER.y + 8 + i * 6, SERVER.y + 11 + i * 6, 8, 24, 1), { tone: "lo" }));

out.push(label({ x: 36, y: 34, w: 58, d: 12, r: 1 }, "OFFLINE-FIRST"));

// ── The three reports, built at the origin and moved live ────────────────
const card = { x: -CARD.w / 2, y: -CARD.d / 2, w: CARD.w, d: CARD.d, r: 1 };
for (let i = 0; i < 3; i++) {
  out.push(
    `<g data-card="${i}" opacity="0">${slab(card, 0, CARD.h, "hi", { steps: 2, bevel: 0.3, crease: "lo", lit: true })}${L(
      k.lineOnTop([card.x + 2, card.y + 3], [card.x + 10, card.y + 3], CARD.h, P) + k.lineOnTop([card.x + 2, card.y + 5.6], [card.x + 8, card.y + 5.6], CARD.h, P),
      { tone: "mid", free: true },
    )}</g>`,
  );
}

save("fieldphone", {
  width: W,
  height: H,
  label:
    "Un teléfono sobre una base de pruebas rellena partes de trabajo; un pulsador de muelle toca Enviar. Con cobertura el parte vuela al servidor de la oficina; sin cobertura espera en una bandeja de cola y sale cuando el mástil vuelve a emitir.",
  body: out,
  motion: { P, tap: TAP, spawn: SPAWN, slot: SLOT, queue: [QUEUE.x + QUEUE.w / 2 + 1, QUEUE.y + QUEUE.d / 2 + 1, 2.4], cardH: CARD.h, mast: MAST },
});
