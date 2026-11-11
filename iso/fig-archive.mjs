// IA generativa: an archive and a core. A query raises the folders it needs out of
// the file box, the glowing core prepares an answer with its references on a screen,
// and a push button lets a person pass it or send it back. The core is the same one
// as in the hero scene of the home page: an orb between two gyroscope rings.
import { k, kitFor, frameOf, gyroRing, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const BOX = { x: -118, y: -36, w: 46, d: 46, r: 2.4, h: 22 };
const FOLDERS = 7;
const PICKED = [2, 5]; // the folders a query consults
const RISE = 12;
const CORE = { x: 0, y: -6, r: 34, orbZ: 47, orbR: 12.5, rings: [17.5, 22.5] };
const MON = { x: 54, y: -46, w: 60, d: 5, r: 2, z: 14, h: 44 };
const REVIEW = { x: 56, y: 14, w: 44, d: 26, r: 2.6, h: 9, bx: 70, by: 27 };
const CABLE_DOCS = [
  [BOX.x + BOX.w, -10, 3],
  [-66, -10, 0.9],
  [-33.4, -10, 0.9],
];
const CABLE_ANSWER = [
  [29.4, -23, 0.9],
  [84, -23, 0.9],
  [84, -37, 0.9],
];
const CABLE_REVIEW = [
  [24, 18, 0.9],
  [24, 27, 0.9],
  [REVIEW.x, 27, 0.9],
  [REVIEW.x, 27, 3],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [CORE.x, CORE.y, CORE.orbZ + CORE.rings[1] + 3], [MON.x + MON.w, MON.y, MON.z + MON.h + 2], [BOX.x, BOX.y, 40]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});
const KS = k.cameraOf(P).k; // screen units per world unit

function scene(lod) {
  const { at, L, D, slab, cyl, screws, base, label, lamp, faceY, screen, cable, shadow, pick, thumb } = kitFor(P, { lod });
  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);

  // ── The archive: an open file box of hanging folders ───────────────────
  const folder = (i, lift = 0, lit = false) => {
    const y = BOX.y + 6 + i * 5;
    const z0 = 2 + lift;
    const tab = { x: BOX.x + 7 + (i % 3) * 11, y, w: 9, d: 1.4, r: 0.3 };
    return (
      slab({ x: BOX.x + 4, y, w: BOX.w - 8, d: 1.4, r: 0.3 }, z0, 23, "hi", { steps: 1, bevel: 0, crease: "lo", lit }) +
      slab(tab, z0 + 23, 2.6, "hi", { steps: 1, bevel: 0, crease: "lo", lit }) +
      L(k.segment([tab.x + 2, y + 1.4, z0 + 24.4], [tab.x + 7, y + 1.4, z0 + 24.4], P), { tone: lit ? "lit" : "lo", fine: true })
    );
  };
  const archive = ({ raised = false, hooks = true } = {}) => {
    const t = 2;
    const out = [slab(BOX, 0, 1.6, "lo", { steps: 3, bevel: 0.2 })];
    out.push(slab({ ...BOX, d: t, r: 0.5 }, 1.6, BOX.h - 1.6, "mid", { steps: 2, bevel: 0.3 }));
    out.push(slab({ ...BOX, w: t, r: 0.5 }, 1.6, BOX.h - 1.6, "mid", { steps: 2, bevel: 0.3 }));
    for (let i = 0; i < FOLDERS; i++) {
      const at = PICKED.indexOf(i);
      if (at < 0) out.push(folder(i));
      else out.push(hooks ? `<g data-part="doc-${at}">${folder(i, 0, true)}</g>` : folder(i, raised ? RISE : 0, true));
    }
    out.push(slab({ ...BOX, x: BOX.x + BOX.w - t, w: t, r: 0.5 }, 1.6, BOX.h - 1.6, "mid", { steps: 2, bevel: 0.3 }));
    out.push(slab({ ...BOX, y: BOX.y + BOX.d - t, d: t, r: 0.5 }, 1.6, BOX.h - 1.6, "mid", { steps: 2, bevel: 0.3, seam: 6 }));
    // A label holder on the front.
    out.push(faceY(BOX.x + 12, BOX.y + BOX.d, 16, `<rect class="ui-s" data-t="lo" width="22" height="7" rx="1"/><path class="ui-s" data-t="lo" d="M3 3.5h12"/>`));
    return out.join("");
  };

  // ── The core: platform, drum, collar and the orb between its rings ─────
  const defs =
    `<defs><radialGradient id="ai-orb" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#fff3e6"/><stop offset=".3" stop-color="#ffb07a"/><stop offset=".66" stop-color="#ff5a1f"/><stop offset="1" stop-color="#a8350b"/></radialGradient>` +
    `<radialGradient id="ai-halo"><stop offset="0" stop-color="#ff5a1f" stop-opacity=".5"/><stop offset=".5" stop-color="#ff5a1f" stop-opacity=".14"/><stop offset="1" stop-color="#ff5a1f" stop-opacity="0"/></radialGradient></defs>`;
  const core = ({ hooks = true } = {}) => {
    const out = [defs];
    out.push(cyl(CORE.x, CORE.y, CORE.r, 0, 4, "mid", { steps: 88, bevel: 0.7 }));
    out.push(L(k.ring(CORE.x, CORE.y, CORE.r - 4, 4, P, 80), { tone: "faint" }));
    out.push(D(k.circleRing(CORE.x, CORE.y, CORE.r - 8, 8).map(([x, y]) => at([x, y, 4])), { size: 0.8, tone: "mid" }));
    out.push(cyl(CORE.x, CORE.y, 19, 4, 11, "mid", { steps: 64, bevel: 0.6, inner: L(k.knurl(CORE.x, CORE.y, 19, 6, 13, 60, P, 0.3), { tone: "lo", fine: true }) }));
    out.push(cyl(CORE.x, CORE.y, 12, 15, 4.4, "hi", { steps: 48, bevel: 0.5, crease: "lo" }));
    out.push(L(k.ring(CORE.x, CORE.y, 8, 19.4, P, 40), { tone: "lit" }));
    const C = [CORE.x, CORE.y, CORE.orbZ];
    const [cx, cy] = at(C).map((v) => Math.round(v * 10) / 10);
    const r = Math.round(CORE.orbR * KS * 10) / 10;
    const a = gyroRing(C, CORE.rings[0], 1.08, 0.5, P, thumb ? 32 : 64);
    const b = gyroRing(C, CORE.rings[1], -0.86, 1.7, P, thumb ? 32 : 64);
    const hook = (name) => (hooks ? ` data-part="${name}"` : "");
    out.push(`<g${hook("rings-back")}><path class="ai-ring" data-back="" d="${a.back}"/><path class="ai-ring" data-back="" data-acc="" d="${b.back}"/></g>`);
    out.push(`<circle${hook("halo")} cx="${cx}" cy="${cy}" r="${Math.round(r * 2.4)}" fill="url(#ai-halo)" opacity=".7"/>`);
    out.push(`<circle class="ai-orb" cx="${cx}" cy="${cy}" r="${r}" fill="url(#ai-orb)"/>`);
    out.push(`<g${hook("rings-front")}><path class="ai-ring" d="${a.front}"/><path class="ai-ring" data-acc="" d="${b.front}"/></g>`);
    return out.join("");
  };

  // ── The answer: a screen with the text and the references it leans on ──
  const answer = ({ shown = true, hooks = true } = {}) => {
    const mx = MON.x + MON.w / 2;
    const sw = MON.w - 6;
    const hook = (name) => (hooks ? ` data-part="${name}"` : "");
    const lines = [34, 40, 30, 22]
      .map((len, i) => `<g${hooks ? ` data-ans="${i}"` : ""}${shown ? "" : ' opacity="0"'}><path class="scr-s" data-t="hi" d="M5 ${15 + i * 4.2}h${len}"/></g>`)
      .join("");
    const refs = [0, 1]
      .map(
        (i) =>
          `<g${hooks ? ` data-ref="${i}"` : ""}><rect class="scr-f${shown ? " scr-glow" : ""}" data-t="${shown ? "acc" : ""}" x="${5 + i * 13}" y="32" width="11" height="4.6" rx="2.3"/>` +
          `<text x="${10.5 + i * 13}" y="35.5" font-size="2.9" font-weight="600" text-anchor="middle" fill="#16142c">${i + 1}</text></g>`,
      )
      .join("");
    return (
      cyl(mx, MON.y + 2, 12, 0, 1.8, "lo", { steps: 36 }) +
      cyl(mx, MON.y + 2, 9, 1.8, 1.4, "mid", { steps: 36, bevel: 0.4 }) +
      slab({ x: mx - 3, y: MON.y - 1, w: 6, d: 4, r: 0.8 }, 3.2, MON.z - 2.2, "mid", { steps: 2, bevel: 0.3 }) +
      slab(MON, MON.z, MON.h, "hi", { steps: 4, bevel: 0.6, crease: "lo" }) +
      faceY(
        MON.x + 3,
        MON.y + MON.d,
        MON.z + MON.h - 3,
        screen(sw, MON.h - 6, `<g${hook("ask")}><rect class="scr-f" x="${sw - 34}" y="3" width="31" height="6.4" rx="3.2"/><path class="scr-s" data-t="dim" d="M${sw - 30} 6.2h23"/></g>${lines}${refs}<g${hook("none")} opacity="0"><path class="scr-s" data-t="dim" d="M5 15h26M5 19.2h14"/></g>`, 1.6),
      ) +
      D([at([mx, MON.y + MON.d, MON.z + 1.4])], { size: 0.6, tone: "hi" })
    );
  };

  // ── The review control: a person passes the answer or holds it ─────────
  const review = ({ pressed = false, ok = false, hooks = true } = {}) => {
    const out = [slab(REVIEW, 0, REVIEW.h, "mid", { steps: 4, bevel: 0.6, seam: 3 })];
    out.push(...screws(k.corners(REVIEW, 3), REVIEW.h, 0.8, 0.4));
    out.push(cyl(REVIEW.bx, REVIEW.by, 7.4, REVIEW.h, 1, "lo", { steps: 36 }));
    out.push(`<g${hooks ? ' data-part="button"' : ""}>${cyl(REVIEW.bx, REVIEW.by, 5.8, REVIEW.h + 1, pressed ? 1.4 : 3.4, "hi", { steps: 36, bevel: 0.5, crease: "lo" })}</g>`);
    out.push(lamp(REVIEW.x + 30, REVIEW.y + 8, REVIEW.h, 1.9, "rv-wait"));
    out.push(lamp(REVIEW.x + 30, REVIEW.y + 18, REVIEW.h, 1.9, "rv-ok", ok).replace('class="veo-lamp"', 'class="veo-lamp" data-tone="ok"'));
    out.push(L(k.planOutline({ x: REVIEW.x + 36, y: REVIEW.y + 5, w: 5, d: 16, r: 1 }, REVIEW.h, P, 2), { tone: "lo", fine: true }));
    return out.join("");
  };

  const body = [
    base(PLATE),
    wire(CABLE_DOCS, "wire-docs"),
    wire(CABLE_ANSWER, "wire-answer"),
    wire(CABLE_REVIEW, "wire-review"),
    answer({ shown: true }),
    archive(),
    core(),
    review(),
    label({ x: -116, y: 36, w: 62, d: 11, r: 1 }, "RESPUESTA · CON FUENTES"),
    `<g data-part="beads">${[0, 1].map((i) => `<g data-bead="${i}" opacity="0"><circle class="veo-bead" r="2.2"/></g>`).join("")}</g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const reviewBox = k.boxCorners(REVIEW, 0, REVIEW.h + 5);
  const parts = {
    cabinet: part([shadow(BOX), archive({ raised: true, hooks: false })], k.boxCorners(BOX, 0, 42), 16),
    core: part([shadow({ x: CORE.x - 30, y: CORE.y - 30, w: 60, d: 60, r: 30 }), core({ hooks: false })], [...k.boxCorners({ x: CORE.x - CORE.r, y: CORE.y - CORE.r, w: CORE.r * 2, d: CORE.r * 2 }, 0, 4), [CORE.x, CORE.y, CORE.orbZ + CORE.rings[1] + 2]], 14),
    answer: part([shadow({ x: MON.x, y: MON.y, w: MON.w, d: 14, r: 3 }), answer({ shown: true, hooks: false })], k.boxCorners({ x: MON.x, y: MON.y - 4, w: MON.w, d: 16 }, 0, MON.z + MON.h + 2), 14),
    review: part([shadow(REVIEW), review({ hooks: false })], reviewBox, 22),
    detail: part([shadow(REVIEW), wire([[40, 27, 0.9], [REVIEW.x, 27, 0.9], [REVIEW.x, 27, 3]], "", true), review({ pressed: true, ok: true, hooks: false })], [...reviewBox, [40, 27, 0]], 22),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("archive", {
  width: W,
  height: H,
  label:
    "Un archivo y un núcleo sobre una placa: a la izquierda, una caja de carpetas colgantes; en el centro, un núcleo con un orbe encendido entre dos anillos; a la derecha, una pantalla con la respuesta y sus referencias numeradas; delante, un mando con un pulsador de revisión. La consulta levanta las carpetas que necesita, el núcleo prepara la respuesta citando esas fuentes y una persona la deja pasar con el pulsador.",
  body: full.body,
  motion: {
    P,
    rise: RISE,
    core: { c: [CORE.x, CORE.y, CORE.orbZ], rings: CORE.rings },
    press: 2,
    docs: flat(CABLE_DOCS),
    answer: flat(CABLE_ANSWER),
    review: flat(CABLE_REVIEW),
  },
  thumb: small.body
    .join("")
    .replace(/<g data-part="doc-(\d)">/g, `<g transform="${k.translateAlong(P, [0, 0, RISE])}">`)
    .replace('data-part="rv-ok" class="veo-lamp"', 'class="veo-lamp" data-on=""'),
  parts: full.parts,
});
