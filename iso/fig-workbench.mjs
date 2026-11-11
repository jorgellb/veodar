// The technologies index: Veodar's workbench. Four modules wait at the back of the
// bench, content, interface, connections and data, and each project pulls forward
// the ones it needs and links them. No two projects assemble the same set.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const LANES = [-78, -26, 26, 78];
const MOD = { w: 40, d: 26, r: 3, h: 10 };
const PARK = -46; // back edge of a module at rest
const DOCK = -2; // back edge of a module in its bay
const TRAVEL = DOCK - PARK;
const BED = { x: -114, y: -8, w: 228, d: 38, r: 3, h: 3 };
const SHELF = { x: -114, y: -50, w: 228, d: 34, r: 3, h: 1.6 };
const SEL = { x: 92, y: 42, r: 6 };
const LINKS = [-52, 0, 52];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [LANES[1] - 20, PARK, 44], [LANES[3] + 20, PARK, 36]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, D, slab, cyl, screws, base, label, ruler, lamp, knob, faceY, screen, platters, shadow, pick, thumb } = kitFor(P, { lod });
  const NAMES = ["CONTENIDO", "INTERFAZ", "CONEXIONES", "DATOS"];

  // ── A module: the same block for all four, with its own top ────────────
  const block = (i, y, lit = false) => {
    const plan = { x: LANES[i] - MOD.w / 2, y, w: MOD.w, d: MOD.d, r: MOD.r };
    return (
      slab(plan, 0, MOD.h, "hi", { steps: 4, bevel: 0.7, crease: "lo", seam: 3, lit }) +
      faceY(plan.x + 4, y + MOD.d, MOD.h - 2.6, `<text class="ui-t" font-size="3.3" letter-spacing=".3" opacity=".7">${NAMES[i]}</text>`) +
      // The tab its neighbour links to.
      slab({ x: plan.x + MOD.w, y: y + MOD.d / 2 - 3, w: 2.4, d: 6, r: 0.6 }, 3, 4, "mid", { steps: 2, bevel: 0.2 })
    );
  };
  const tops = [
    // Content: a few sheets with their lines.
    (y) => {
      const out = [];
      const x = LANES[0] - 13;
      const n = thumb ? 2 : 4;
      for (let i = 0; i < n; i++) out.push(slab({ x: x + i * 0.4, y: y + 4 - i * 0.2, w: 24, d: 18, r: 0.8 }, MOD.h + i * 1.2, 0.9, "hi", { steps: 2, bevel: 0, crease: "lo" }));
      const zt = MOD.h + (n - 1) * 1.2 + 0.92;
      out.push(L(k.lineOnTop([x + 4, y + 7.4], [x + 14, y + 7.4], zt, P), { tone: "hi", free: true }));
      out.push(L([10.6, 13.4, 16.2].map((dy, j) => k.lineOnTop([x + 4, y + dy], [x + 4 + [17, 13, 15][j], y + dy], zt, P)).join(""), { tone: "mid", free: true, fine: true }));
      return out.join("");
    },
    // Interface: a small screen with a window on it.
    (y) => {
      const x = LANES[1] - 15;
      return (
        slab({ x: LANES[1] - 5, y: y + 6, w: 10, d: 6, r: 1 }, MOD.h, 1.6, "mid", { steps: 2, bevel: 0.3 }) +
        slab({ x, y: y + 7, w: 30, d: 3.4, r: 1.2 }, MOD.h + 1.6, 22, "hi", { steps: 3, bevel: 0.4, crease: "lo" }) +
        faceY(
          x + 2,
          y + 10.4,
          MOD.h + 21.6,
          screen(
            26,
            18,
            `<path class="scr-s" data-t="dim" d="M0 3.6h26"/><circle class="scr-f" data-t="acc" cx="2.4" cy="1.8" r=".8"/><rect class="scr-f" data-t="hi" x="2.6" y="6" width="12" height="2.6" rx=".7"/>` +
              pick(`<path class="scr-s" data-t="dim" d="M2.6 11h10M2.6 13.6h8"/>`) +
              `<rect class="scr-f" data-t="mid" x="17" y="6" width="6.6" height="8.4" rx="1"/><rect class="scr-f" data-t="acc" x="2.6" y="14.2" width="7" height="2.4" rx="1.2"/>`,
            1.2,
          ),
        )
      );
    },
    // Connections: three jacks and a lead between two of them.
    (y) => {
      const out = [];
      const xs = [LANES[2] - 11, LANES[2], LANES[2] + 11];
      for (const x of xs) {
        out.push(cyl(x, y + 11, 3.6, MOD.h, 0.9, "lo", { steps: 20 }));
        out.push(cyl(x, y + 11, 2.4, MOD.h + 0.9, 3.4, "hi", { steps: 18, bevel: 0.3, crease: "lo" }));
        out.push(D([at([x, y + 11, MOD.h + 4.3])], { size: 0.8, tone: "hi", keep: true }));
      }
      const loop = [[xs[0], y + 13.4, MOD.h + 3], [xs[0], y + 19, MOD.h + 0.7], [xs[2], y + 19, MOD.h + 0.7], [xs[2], y + 13.4, MOD.h + 3]];
      const d = k.pathOf(loop.map(at));
      out.push(`<g class="veo-cable"><path class="veo-cable-edge" d="${d}"/><path class="veo-cable-core" d="${d}"/></g>`);
      return out.join("");
    },
    // Data: three platters.
    (y) => platters(LANES[3], y + 12, 10, MOD.h, { count: 3, h: 5.4, gap: 1.1 }),
  ];
  const module = (i, y = PARK, lit = false) => block(i, y, lit) + tops[i](y);

  // ── The bench: a shelf at the back, the assembly bed at the front ──────
  const bench = () => {
    const out = [slab(SHELF, 0, SHELF.h, "lo", { steps: 4, bevel: 0.3 })];
    out.push(slab(BED, 0, BED.h, "mid", { steps: 4, bevel: 0.5, seam: 1 }));
    for (const x of LANES) out.push(L(k.planOutline({ x: x - MOD.w / 2 - 1.5, y: DOCK - 1.5, w: MOD.w + 3, d: MOD.d + 3, r: MOD.r + 1 }, BED.h, P, 4), { tone: "lo", fine: true }));
    out.push(...screws([[BED.x + 4, BED.y + 4], [BED.x + BED.w - 4, BED.y + 4], [BED.x + 4, BED.y + BED.d - 4], [BED.x + BED.w - 4, BED.y + BED.d - 4]], BED.h, 1, 0.42));
    return out.join("");
  };
  const link = (i, on = false) =>
    cyl(LINKS[i], DOCK + MOD.d / 2, 2.6, BED.h, 0.8, "lo", { steps: 16 }) +
    cyl(LINKS[i], DOCK + MOD.d / 2, 1.4, BED.h + 0.8, 3.4, "mid", { steps: 12, crease: "none" }) +
    `<g data-part="link-${i}" class="veo-lamp"${on ? ' data-on=""' : ""}>${cyl(LINKS[i], DOCK + MOD.d / 2, 2.1, BED.h + 4.2, 1.6, "hi", { steps: 16, crease: "lo" })}</g>`;

  // The selector that names the project being assembled.
  const selector = () =>
    knob(SEL.x, SEL.y, SEL.r, 0, 6, { pointer: -0.9 })
      .replace('<path class="iso-line" data-tone="hi"', '<path class="iso-line" data-part="sel" data-tone="hi"') +
    ["A", "B", "C"].map((letter, i) => k.faceTextSvg(k.topMatrix([SEL.x - 13 + i * 3.4, SEL.y - 9 + i * 7.4], 0.05, P), letter, { size: 3, tone: "hi" })).join("");

  // Still pictures show a project assembled: interface, connections and data docked.
  const docked = [false, true, true, true];
  const body = (still) => {
    const out = [base(PLATE), bench()];
    LANES.forEach((_, i) => {
      const y = still && docked[i] ? DOCK : PARK;
      out.push(`<g data-part="mod-${i}">${module(i, still ? y : PARK, still && docked[i] && i === 1)}</g>`);
      if (i < 3) out.push(link(i, still && docked[i] && docked[i + 1]));
    });
    out.push(selector(), ruler({ x: -112, y: 40, w: 96, d: 6, r: 1 }), label({ x: 4, y: 37, w: 68, d: 11, r: 1 }, "ENSAMBLAJE · POR PROYECTO"));
    return out;
  };

  return { body: body(false), still: body(true) };
}

const full = scene("full");
const small = scene("thumb");

save("workbench", {
  width: W,
  height: H,
  label:
    "El banco de trabajo de Veodar: al fondo esperan cuatro módulos —contenido, interfaz, conexiones y datos— y delante hay una bancada con cuatro huecos. Cada proyecto trae al frente los módulos que necesita y enciende los enlaces entre los que quedan juntos: unas veces dos, otras tres, otras los cuatro.",
  body: full.body,
  motion: { P, travel: TRAVEL, knob: { x: SEL.x, y: SEL.y, r: SEL.r - 0.8, z: 6 } },
  thumb: small.still,
});
