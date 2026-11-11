// WordPress: an assembly bench. A modular site stands at the back, its admin panel
// lies in front, and a feature cartridge rides a rail into a side connector. When it
// docks, the new block appears on the site and the panel lists it as active.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const SITE = { x: -114, y: -44, w: 84, d: 5, r: 1.5 };
const ROWS = [
  { z: 12, h: 12 },
  { z: 25, h: 30 },
  { z: 56, h: 10 },
];
const ADMIN = { x: -110, y: 10, w: 48, d: 32, r: 3, h: 9 };
const HEAD = { x: 6, y: -16, w: 22, d: 32, r: 2, h: 18 };
const CART = { x: 62, y: -11, w: 40, d: 22, r: 2, z: 3, h: 11 };
const TRAVEL = CART.x - (HEAD.x + HEAD.w);
const RACK = { x: 74, y: -48, w: 44, d: 16, r: 2, h: 4 };
const CABLE_A = [
  [6, -6, 4],
  [0, -6, 0.9],
  [0, -30, 0.9],
  [-72, -30, 0.9],
  [-72, -34, 2],
];
const CABLE_B = [
  [0, -6, 0.9],
  [0, 26, 0.9],
  [-58, 26, 0.9],
  [-62, 26, 3],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [SITE.x, SITE.y, 68], [SITE.x + SITE.w, SITE.y, 68], [RACK.x + RACK.w, RACK.y, 28]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, D, slab, cyl, screws, base, label, ruler, lamp, top, faceY, faceX, screen, cable, shadow, pick } = kitFor(P, { lod });

  // ── The site: three stacked modules on a stand ─────────────────────────
  const site = ({ active = false, hooks = true } = {}) => {
    const out = [];
    const hook = (name) => (hooks ? ` data-part="${name}"` : "");
    out.push(slab({ x: -90, y: -48, w: 36, d: 14, r: 2 }, 0, 2, "lo", { steps: 3, bevel: 0.4 }));
    out.push(slab({ x: -76, y: -45, w: 8, d: 4, r: 0.8 }, 2, 10, "mid", { steps: 2, bevel: 0.3 }));
    const face = SITE.y + SITE.d;
    const sw = SITE.w - 6;
    const ui = [
      // Footer module: three cards.
      [0, 1, 2].map((i) => `<rect class="scr-f" data-t="${i === 1 ? "mid" : ""}" x="${3 + i * 25}" y="2" width="22" height="5" rx="1"/>`).join(""),
      // Body module: headline, text, button; on the right, the place for the new feature.
      `<rect class="scr-f" data-t="hi" x="4" y="4.5" width="30" height="3.2" rx=".8"/><rect class="scr-f" data-t="hi" x="4" y="9.4" width="21" height="3.2" rx=".8"/>` +
        pick(`<path class="scr-s" data-t="dim" d="M4 16.5h34M4 19.3h28"/>`) +
        `<rect class="scr-f" data-t="mid" x="4" y="21.4" width="14" height="3.6" rx="1.8"/>` +
        `<rect class="scr-s" data-t="dim"${hook("slot")} x="46" y="3" width="28" height="21" rx="1.6" stroke-dasharray="1.6 1.8"${active ? ' opacity="0"' : ""}/>` +
        `<g${hook("widget")} opacity="${active ? 1 : 0}"><rect class="scr-f scr-glow" data-t="acc" x="46" y="3" width="28" height="5" rx="1.4"/>` +
        Array.from({ length: 12 }, (_, i) => `<rect class="scr-f" data-t="${i === 6 ? "acc" : "mid"}" x="${46.6 + (i % 4) * 7}" y="${9.6 + Math.floor(i / 4) * 5}" width="5.8" height="3.8" rx=".7"/>`).join("") +
        `</g>`,
      // Header module: mark and navigation.
      `<circle class="scr-f" data-t="acc" cx="4" cy="3.5" r="1.3"/>` + pick(`<path class="scr-s" data-t="dim" d="M46 3.5h6M55 3.5h6M64 3.5h6"/>`) + `<rect class="scr-f" data-t="mid" x="8" y="2.4" width="12" height="2.2" rx=".8"/>`,
    ];
    ROWS.forEach((row, i) => {
      out.push(slab(SITE, row.z, row.h, "hi", { steps: 3, bevel: 0.5, crease: "lo" }));
      out.push(faceY(SITE.x + 3, face, row.z + row.h - 1.5, screen(sw, row.h - 3, ui[i], 1.2)));
    });
    out.push(D([at([SITE.x + SITE.w - 3, face, 13.5])], { size: 0.6, tone: "hi" }));
    return out.join("");
  };

  // ── The admin panel: a console with its screen on top ──────────────────
  const admin = ({ active = false, hooks = true } = {}) => {
    const out = [];
    const hook = (name) => (hooks ? ` data-part="${name}"` : "");
    out.push(slab(ADMIN, 0, ADMIN.h, "mid", { steps: 4, bevel: 0.6, seam: 3 }));
    const rows = [0, 1, 2]
      .map(
        (i) =>
          `<rect class="scr-f" data-t="mid" x="2.4" y="${6.4 + i * 4.6}" width="2.6" height="2.6" rx=".6"/><path class="scr-s" d="M7 ${7.7 + i * 4.6}h${[13, 9, 11][i]}"/>` +
          `<rect class="scr-f" x="27" y="${6.2 + i * 4.6}" width="6" height="3" rx="1.5"/><circle class="scr-f" data-t="hi" cx="${i === 1 ? 28.5 : 31.5}" cy="${7.7 + i * 4.6}" r="1.1"/>`,
      )
      .join("");
    const fresh =
      `<g${hook("row")} opacity="${active ? 1 : 0}"><rect class="scr-f" data-t="acc" x="2.4" y="20.2" width="2.6" height="2.6" rx=".6"/><path class="scr-s" data-t="hi" d="M7 21.5h12"/>` +
      `<rect class="scr-f scr-glow" data-t="acc" x="27" y="20" width="6" height="3" rx="1.5"/><circle cx="31.5" cy="21.5" r="1.1" fill="#16142c"/></g>`;
    out.push(top(ADMIN.x + 3, ADMIN.y + 3, ADMIN.h + 0.05, screen(36, 26, `<rect class="scr-f" data-t="mid" x="2.4" y="2" width="14" height="2.2" rx=".8"/>${rows}${fresh}`, 1.4)));
    for (const y of [ADMIN.y + 8, ADMIN.y + 16, ADMIN.y + 24]) {
      out.push(cyl(ADMIN.x + ADMIN.w - 5, y, 2.4, ADMIN.h, 0.7, "lo", { steps: 18 }));
      out.push(cyl(ADMIN.x + ADMIN.w - 5, y, 1.7, ADMIN.h + 0.7, 1.3, "hi", { steps: 18, crease: "lo" }));
    }
    return out.join("");
  };

  // ── The connector: a head with contacts, two cheeks and the rails ──────
  const rails = (end = 116) =>
    [-9, 6].map((y) => slab({ x: 28, y, w: end - 28, d: 3, r: 0.6 }, 0, 3, "mid", { steps: 2, bevel: 0.3 })).join("") +
    slab({ x: end - 2, y: -10, w: 4, d: 20, r: 0.8 }, 0, 6, "mid", { steps: 2, bevel: 0.3 });
  const cheek = (y) => slab({ x: 28, y, w: 28, d: 3, r: 0.8 }, 0, 9, "mid", { steps: 2, bevel: 0.3 });
  const head = ({ on = false } = {}) => {
    const out = [slab(HEAD, 0, HEAD.h, "mid", { steps: 4, bevel: 0.6, seam: 4 })];
    // Contact strip on the face the cartridge meets.
    const pins = Array.from({ length: 9 }, (_, i) => `<path class="scr-s" data-t="${i % 4 === 0 ? "acc" : ""}" d="M${2.4 + i * 2.2} 1.4v3.6"/>`).join("");
    out.push(faceX(HEAD.x + HEAD.w, 11, 13.6, screen(22, 6.4, pick(pins), 1)));
    out.push(...screws(k.corners(HEAD, 3.2), HEAD.h, 0.9, 0.42));
    out.push(L(k.planOutline({ x: HEAD.x + 5, y: HEAD.y + 14, w: 12, d: 12, r: 1.2 }, HEAD.h, P, 3), { tone: "faint" }));
    out.push(lamp(HEAD.x + 11, HEAD.y + 7, HEAD.h, 2.2, "link", on));
    return out.join("");
  };

  // ── The cartridge: the lit part ────────────────────────────────────────
  const cartridge = (dx = 0, { lit = true } = {}) => {
    const body = { ...CART, x: CART.x + dx };
    const out = [slab(body, CART.z, CART.h, "hi", { steps: 4, bevel: 0.7, crease: "lo", lit })];
    const zt = CART.z + CART.h;
    out.push(L(k.planOutline({ x: body.x + 6, y: -7, w: 20, d: 14, r: 1.2 }, zt, P, 3), { tone: "mid" }));
    out.push(L(k.lineOnTop([body.x + 9, -3], [body.x + 22, -3], zt, P) + k.lineOnTop([body.x + 9, 1], [body.x + 18, 1], zt, P), { tone: "lo", free: true, fine: true }));
    out.push(L([1.4, 3.2, 5].map((u) => k.lineOnTop([body.x + u, -8], [body.x + u, 8], zt, P)).join(""), { tone: "lo", fine: true }));
    for (const u of [31, 34, 37]) out.push(slab({ x: body.x + u, y: -8, w: 1.4, d: 16, r: 0.4 }, zt, 1.2, "hi", { steps: 1, bevel: 0, crease: "none", lit }));
    out.push(D([at([body.x + 29, 7, zt])], { size: 0.7, tone: "hi", keep: true }));
    return out.join("");
  };

  // ── Spare cartridges in a rack ─────────────────────────────────────────
  const rack = () => {
    const out = [slab(RACK, 0, RACK.h, "lo", { steps: 3, bevel: 0.4 })];
    [0, 1, 2].forEach((i) => {
      const plan = { x: RACK.x + 4 + i * 13, y: RACK.y + 3, w: 9, d: 10, r: 1 };
      out.push(slab(plan, RACK.h, [22, 18, 22][i], "mid", { steps: 3, bevel: 0.4, seam: RACK.h + 5 }));
      out.push(L(k.planOutline(k.insetPlan(plan, 2), RACK.h + [22, 18, 22][i], P, 2), { tone: "lo", fine: true }));
    });
    return out.join("");
  };

  const cables = (on = false) => [cable(CABLE_A, "bus-a"), cable(CABLE_B, "bus-b")].map((svg) => (on ? svg.replace('class="veo-cable"', 'class="veo-cable" data-on=""') : svg)).join("");

  const body = [
    base(PLATE),
    cables(),
    site(),
    rack(),
    rails(),
    cheek(-16),
    head(),
    `<g data-part="cart">${cartridge(0)}</g>`,
    cheek(13),
    admin(),
    ruler({ x: 30, y: 22, w: 84, d: 6, r: 1 }),
    label({ x: 60, y: 36, w: 56, d: 11, r: 1 }, "PLUGIN · A MEDIDA"),
    `<g data-part="beads">${[0, 1].map((i) => `<g data-bead="${i}" opacity="0"><circle class="veo-bead" r="2.2"/></g>`).join("")}</g>`,
  ];

  // Each module on its own, for the page of the technology.
  const docked = [shadow({ x: 8, y: -14, w: 74, d: 28, r: 3 }), rails(82), cheek(-16), head({ on: true }), cartridge(-TRAVEL), cheek(13)];
  const parts = {
    cartridge: { body: [shadow({ x: CART.x - 2, y: CART.y - 2, w: CART.w + 4, d: CART.d + 4, r: 3 }, CART.z), cartridge(0)], frame: frameOf(k.boxCorners(CART, CART.z - 2, CART.z + CART.h + 2), P, 14) },
    socket: { body: [shadow({ x: 8, y: -14, w: 106, d: 28, r: 3 }), rails(), cheek(-16), head(), cheek(13)], frame: frameOf(k.boxCorners({ x: 6, y: -16, w: 112, d: 32 }, 0, 22), P, 16) },
    admin: { body: [shadow(ADMIN), admin({ active: true, hooks: false })], frame: frameOf(k.boxCorners(ADMIN, 0, ADMIN.h + 3), P, 14) },
    site: { body: [shadow({ x: SITE.x, y: -48, w: SITE.w, d: 14, r: 2 }), site({ active: true, hooks: false })], frame: frameOf(k.boxCorners({ x: SITE.x, y: -48, w: SITE.w, d: 14 }, 0, 68), P, 10) },
    detail: { body: docked, frame: frameOf(k.boxCorners({ x: 6, y: -16, w: 78, d: 32 }, 0, 24), P, 16) },
  };

  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("cartridge", {
  width: W,
  height: H,
  label:
    "Un banco de ensamblaje sobre una placa: al fondo, una web formada por tres módulos apilados; delante, su panel de administración; a la derecha, un cartucho de funcionalidad que avanza por un carril hasta un conector lateral. Al encajar, el bloque nuevo aparece en la web y el panel lo muestra activo.",
  body: full.body,
  motion: { P, travel: TRAVEL, routes: [flat(CABLE_A), flat([CABLE_A[0], ...CABLE_B])] },
  thumb: small.body
    .join("")
    .replace('<g data-part="cart">', `<g transform="${k.translateAlong(P, [-TRAVEL, 0, 0])}">`)
    .replace(/(<g data-part="(?:widget|row)" opacity=")0"/g, '$11"')
    .replace(/(data-part="slot"[^>]*)\/>/, '$1 opacity="0"/>')
    .replace('data-part="link" class="veo-lamp"', 'data-part="link" class="veo-lamp" data-on=""'),
  parts: full.parts,
});
