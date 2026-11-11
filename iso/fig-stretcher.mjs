// Jetpack Compose: an extending frame. A crank drives a jaw along the bed and the
// screen between the jaws widens; at two marks of the rule in front its pieces
// rearrange: one column, then list and detail, then a side menu as well. A meter at the
// back reads the width class, a theme unit holds the brand colours and, to the right,
// an old engraved panel is plugged in through an adapter.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const BED = { x: -76, y: -28, w: 124, d: 58, r: 2, h: 4 };
const GLASS = { x: -70, y: -22, d: 46 };
const WIDTHS = [36, 66, 104];
const JAW = { w: 6, h: 5 };
const RULE = { x: -74, y: 33, w: 122, d: 9, r: 1, h: 1.2 };
const MARKS = [-20, 16];
const GEARBOX = { x: -114, y: -42, w: 26, d: 22, r: 3, h: 8 };
const CRANK = { x: GEARBOX.x + 13, y: GEARBOX.y + 11, r: 9 };
const METER = { x: -46, y: -47, w: 30, d: 7, r: 2, z: 9, h: 26 };
const NEEDLE = { x: 13, y: 18 };
const THEME = { x: 50, y: -46, w: 40, d: 20, r: 3, h: 10 };
const ADAPTER = { x: 54, y: 8, w: 12, d: 16, r: 2, h: 6 };
const OLD = { x: 72, y: 2, w: 36, d: 28, r: 2, h: 3 };
const THEME_LINE = [
  [62, THEME.y + THEME.d, 3],
  [62, -23, 0.9],
  [62, -12, 0.9],
  [BED.x + BED.w, -12, 0.9],
  [BED.x + BED.w, -12, 2.4],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [METER.x, METER.y, 40], [THEME.x + THEME.w, THEME.y, 30]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod, shown = 0) {
  const { at, L, D, slab, cyl, screws, base, label, lamp, top, faceY, screen, cable, shadow, pick, thumb } = kitFor(P, { lod });
  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);
  const brand = (svg) => svg.replace("<rect ", '<rect data-brand="" ').replace("<circle ", '<circle data-brand="" ');

  // ── The three arrangements of the same screen, each for one width ──────
  const rows = (x, w, sel = -1) => [10, 17.5, 25, 32.5].map((y, i) => `<rect class="scr-f"${i === sel ? ' data-t="mid"' : ""} x="${x}" y="${y}" width="${w}" height="6" rx="1.4"/>${pick(`<path class="scr-s" data-t="dim" d="M${x + 2.4} ${y + 3}h${w * 0.5}"/>`)}`).join("");
  const dots = (x, y, dx, dy) => [0, 1, 2].map((i) => (i === 0 ? brand(`<circle class="scr-f" data-t="acc" cx="${x + dx * i}" cy="${y + dy * i}" r="1.2"/>`) : `<circle class="scr-f" data-t="mid" cx="${x + dx * i}" cy="${y + dy * i}" r="1.2"/>`)).join("");
  const layouts = [
    // Compact: one column and a bar of sections at the bottom.
    () => `<rect class="scr-f" data-t="mid" x="2" y="2" width="32" height="6" rx="1.4"/>${rows(2, 32)}<rect class="scr-f" x="2" y="40" width="32" height="4.4" rx="1.4"/>${dots(9, 42.2, 9, 0)}`,
    // Medium: the list on the left, what is selected on the right.
    () =>
      `<rect class="scr-f" data-t="mid" x="2" y="2" width="62" height="6" rx="1.4"/>${rows(2, 26, 1)}` +
      `<rect class="scr-s" data-t="dim" x="31" y="10" width="33" height="14" rx="1.4"/>${pick(`<path class="scr-s" data-t="dim" d="M31 27.4h28M31 30.6h20"/>`)}` +
      brand(`<rect class="scr-f" data-t="acc" x="31" y="34.2" width="14" height="4.2" rx="2.1"/>`) +
      `<rect class="scr-f" x="2" y="40" width="62" height="4.4" rx="1.4"/>${dots(24, 42.2, 9, 0)}`,
    // Expanded: the sections move to a rail on the side.
    () =>
      `<rect class="scr-f" x="2" y="2" width="8" height="42.4" rx="1.6"/>${dots(6, 8, 0, 7)}` +
      `<rect class="scr-f" data-t="mid" x="12" y="2" width="90" height="6" rx="1.4"/>${rows(12, 30, 1)}<rect class="scr-f" x="12" y="40" width="30" height="4.4" rx="1.4"/>` +
      `<rect class="scr-s" data-t="dim" x="45" y="10" width="30" height="20" rx="1.4"/>${pick(`<path class="scr-s" data-t="dim" d="M78 12h22M78 15.4h16M78 18.8h20M78 22.2h12M45 33.6h44M45 36.8h30"/>`, `<path class="scr-s" data-t="dim" d="M78 13h20M78 18h14"/>`)}` +
      brand(`<rect class="scr-f" data-t="acc" x="45" y="39.6" width="16" height="4.6" rx="2.3"/>`),
  ];

  // ── The bed, the fixed jaw, the screen and the jaw that travels ────────
  const frame = ({ hooks = true, state = shown } = {}) => {
    const out = [slab(BED, 0, BED.h, "mid", { steps: 5, bevel: 0.6, seam: 1.6 })];
    // The lead screw in its groove, along the back.
    out.push(L(k.lineOnTop([BED.x + 6, -25.6], [BED.x + BED.w - 3, -25.6], BED.h, P) + k.lineOnTop([BED.x + 6, -24.2], [BED.x + BED.w - 3, -24.2], BED.h, P), { tone: "lo", free: true }));
    const thread = [];
    for (let x = BED.x + 8; x < BED.x + BED.w - 4; x += 3) thread.push(k.lineOnTop([x, -25.6], [x + 0.9, -24.2], BED.h, P));
    out.push(L(thread.join(""), { tone: "faint" }));
    out.push(L(k.lineOnTop([BED.x + 6, 26.4], [BED.x + BED.w - 3, 26.4], BED.h, P), { tone: "lo", free: true, fine: true }));
    const width = WIDTHS[state];
    const glass = hooks
      ? `<rect class="scr" data-part="glass" width="${WIDTHS[0]}" height="${GLASS.d}" rx="2.4"/>` + layouts.map((draw, i) => `<g data-part="lay-${i}"${i ? ' opacity="0"' : ""}>${draw()}</g>`).join("")
      : `<rect class="scr" width="${width}" height="${GLASS.d}" rx="2.4"/>${layouts[state]()}`;
    out.push(top(GLASS.x, GLASS.y, BED.h + 0.02, glass));
    out.push(slab({ x: BED.x, y: BED.y, w: JAW.w, d: BED.d, r: 1.2 }, BED.h, JAW.h, "mid", { steps: 3, bevel: 0.5, seam: BED.h + 2 }));
    out.push(...screws([[BED.x + 3, BED.y + 5], [BED.x + 3, BED.y + BED.d - 5]], BED.h + JAW.h, 0.9, 0.4));
    return out.join("");
  };
  const jaw = ({ hooks = true, state = shown } = {}) => {
    const x = GLASS.x + WIDTHS[0];
    const solid =
      slab({ x, y: BED.y, w: JAW.w, d: BED.d, r: 1.2 }, BED.h, JAW.h, "hi", { steps: 3, bevel: 0.5, crease: "lo", seam: BED.h + 2 }) +
      D([at([x + 3, BED.y + 5, BED.h + JAW.h]), at([x + 3, BED.y + BED.d - 5, BED.h + JAW.h])], { size: 0.5 }) +
      // The pointer that rides over the rule.
      slab({ x: x + 1.4, y: BED.y + BED.d, w: 3.2, d: 7.4, r: 0.8 }, RULE.h + 0.4, 2.2, "hi", { steps: 2, bevel: 0.3, crease: "lo", lit: true });
    return hooks ? `<g data-part="jaw">${solid}</g>` : `<g transform="${k.translateAlong(P, [WIDTHS[state] - WIDTHS[0], 0, 0])}">${solid}</g>`;
  };

  // ── The rule of widths, with a lamp for each class ─────────────────────
  const rule = ({ hooks = true, state = shown } = {}) => {
    const out = [slab(RULE, 0, RULE.h, "lo", { steps: 3, bevel: 0.2, crease: "none" })];
    const ticks = k.topTicks(RULE.x + 4, RULE.x + RULE.w - 4, 3, 4, RULE.y + 0.6, RULE.h, [1.4, 2.6], P);
    out.push(L(ticks.minor, { tone: "lo", fine: true }), L(ticks.major, { tone: "mid", fine: true }));
    out.push(L(MARKS.map((x) => k.lineOnTop([x, RULE.y], [x, RULE.y + RULE.d], RULE.h, P)).join(""), { tone: "hi", free: true }));
    [["COMPACTO", -66], ["MEDIO", -14], ["AMPLIO", 22]].forEach(([text, x]) => out.push(k.faceTextSvg(k.topMatrix([x, RULE.y + 7.2], RULE.h, P), text, { size: 2.3, tone: "hi" })));
    [-36, 2, 40].forEach((x, i) => out.push(lamp(x, RULE.y + 5.6, RULE.h, 1.4, hooks ? `zone-${i}` : "", hooks ? i === 0 : i === state)));
    return out.join("");
  };

  // ── The crank that moves the jaw ───────────────────────────────────────
  const crank = ({ hooks = true } = {}) => {
    const out = [slab(GEARBOX, 0, GEARBOX.h, "mid", { steps: 5, bevel: 0.7, seam: 3 })];
    out.push(cyl(CRANK.x, CRANK.y, 3, GEARBOX.h, 2, "mid", { steps: 16 }), cyl(CRANK.x, CRANK.y, CRANK.r, GEARBOX.h + 2, 1.6, "hi", { steps: 34, bevel: 0.3, crease: "lo" }));
    const spokes = [0, 60, 120].map((a) => `<path class="ui-s" data-t="lo" d="M${CRANK.r} ${CRANK.r}m${(Math.cos((a * Math.PI) / 180) * 7).toFixed(2)} ${(Math.sin((a * Math.PI) / 180) * 7).toFixed(2)}l${(-Math.cos((a * Math.PI) / 180) * 14).toFixed(2)} ${(-Math.sin((a * Math.PI) / 180) * 14).toFixed(2)}"/>`).join("");
    out.push(top(CRANK.x - CRANK.r, CRANK.y - CRANK.r, GEARBOX.h + 3.62, `<g${hooks ? ' data-part="crank"' : ""}>${pick(spokes)}<circle class="ui-f" data-t="hi" cx="${CRANK.r + 6.2}" cy="${CRANK.r}" r="1.7"/></g><circle class="ui-s" data-t="hi" cx="${CRANK.r}" cy="${CRANK.r}" r="1.6"/>`));
    out.push(...screws([[GEARBOX.x + 3.4, GEARBOX.y + GEARBOX.d - 3.4], [GEARBOX.x + GEARBOX.w - 3.4, GEARBOX.y + GEARBOX.d - 3.4]], GEARBOX.h, 0.9, 0.4));
    // The shaft into the bed.
    out.push(slab({ x: GEARBOX.x + GEARBOX.w, y: -26.4, w: BED.x - GEARBOX.x - GEARBOX.w, d: 3, r: 1.2 }, 2.4, 2.6, "hi", { steps: 3, bevel: 0.3, crease: "lo" }));
    return out.join("");
  };

  // ── The meter that reads the width class ───────────────────────────────
  const meter = ({ hooks = true, state = shown } = {}) => {
    const cx = METER.x + METER.w / 2;
    const out = [slab({ x: cx - 9, y: METER.y - 2, w: 18, d: 11, r: 2.4 }, 0, 2, "mid", { steps: 4, bevel: 0.4 }), cyl(cx, METER.y + 3.5, 2, 2, METER.z - 2, "mid", { steps: 12, crease: "none" })];
    out.push(slab(METER, METER.z, METER.h, "mid", { steps: 4, bevel: 0.6, seam: METER.z + 4 }));
    const arc = (from, to, r = 11) => {
      const p = (deg) => `${(NEEDLE.x + Math.sin((deg * Math.PI) / 180) * r).toFixed(2)} ${(NEEDLE.y - Math.cos((deg * Math.PI) / 180) * r).toFixed(2)}`;
      return `M${p(from)}A${r} ${r} 0 0 1 ${p(to)}`;
    };
    const angle = [-50, 0, 50][state];
    out.push(
      faceY(
        METER.x + 2,
        METER.y + METER.d,
        METER.z + METER.h - 2,
        `<rect class="ui-f" data-t="paper" width="26" height="22" rx="2"/><rect class="ui-s" data-t="lo" width="26" height="22" rx="2"/>` +
          `<path class="ui-s" data-t="hi" d="${arc(-70, -28)}${arc(-22, 22)}${arc(28, 70)}"/>` +
          pick(`<path class="ui-s" data-t="lo" d="${[-70, -50, -28, -22, 0, 22, 28, 50, 70].map((a) => `M${(NEEDLE.x + Math.sin((a * Math.PI) / 180) * 11).toFixed(2)} ${(NEEDLE.y - Math.cos((a * Math.PI) / 180) * 11).toFixed(2)}L${(NEEDLE.x + Math.sin((a * Math.PI) / 180) * 13).toFixed(2)} ${(NEEDLE.y - Math.cos((a * Math.PI) / 180) * 13).toFixed(2)}`).join("")}"/>`) +
          `<g${hooks ? ' data-part="needle"' : ""} transform="rotate(${hooks ? -50 : angle} ${NEEDLE.x} ${NEEDLE.y})"><path class="ui-s" data-t="acc" d="M${NEEDLE.x} ${NEEDLE.y}V${NEEDLE.y - 10}"/></g><circle class="ui-f" data-t="hi" cx="${NEEDLE.x}" cy="${NEEDLE.y}" r="1.5"/>`,
      ),
    );
    out.push(...screws([[METER.x + 3, METER.y + 3.5], [METER.x + METER.w - 3, METER.y + 3.5]], METER.z + METER.h, 0.8, 0.38));
    return out.join("");
  };

  // ── The theme unit: brand colours as cartridges, one of them in use ────
  const theme = ({ hooks = true, alt = false } = {}) => {
    const out = [slab(THEME, 0, THEME.h, "mid", { steps: 5, bevel: 0.7, seam: 4 })];
    [0, 1, 2].forEach((i) => {
      const plan = { x: THEME.x + 6 + i * 11, y: THEME.y + 6, w: 8, d: 8, r: 1.2 };
      out.push(L(k.planOutline({ x: plan.x - 1, y: plan.y - 1, w: 10, d: 10, r: 1.6 }, THEME.h, P, 3), { tone: "lo", fine: true }));
      const solid = slab(plan, THEME.h, 9, "hi", { steps: 3, bevel: 0.4, crease: "lo" });
      const up = hooks ? i === 0 : alt ? i === 1 : i === 0;
      const tone = i === 0 ? ' data-on=""' : i === 1 ? ' data-tone="ok" data-on=""' : "";
      out.push(`<g${hooks ? ` data-part="sw-${i}"` : ""} class="veo-lamp"${tone}${!hooks && up ? ` transform="${k.translateAlong(P, [0, 0, 4])}"` : ""}>${solid}</g>`);
    });
    out.push(...screws([[THEME.x + THEME.w - 3.4, THEME.y + 3.4], [THEME.x + THEME.w - 3.4, THEME.y + THEME.d - 3.4]], THEME.h, 0.9, 0.4));
    return out.join("");
  };

  // ── The adapter, and the old panel it lets in ──────────────────────────
  const adapter = ({ hooks = true, on = false } = {}) => {
    const out = [wire([[BED.x + BED.w, 16, 2.4], [ADAPTER.x, 16, 3]], hooks ? "old-a" : "", on), wire([[ADAPTER.x + ADAPTER.w, 16, 3], [OLD.x, 16, 2]], hooks ? "old-b" : "", on)];
    out.push(slab(ADAPTER, 0, ADAPTER.h, "hi", { steps: 4, bevel: 0.6, crease: "lo", seam: 2.4 }));
    out.push(lamp(ADAPTER.x + 6, ADAPTER.y + 8, ADAPTER.h, 1.8, hooks ? "adapt" : "", on));
    out.push(slab(OLD, 0, OLD.h, "mid", { steps: 4, bevel: 0.5, seam: 1.2 }));
    const inset = (y, d) => k.planOutline({ x: OLD.x + 4, y: OLD.y + y, w: OLD.w - 8, d, r: 1 }, OLD.h, P, 3);
    out.push(L(inset(4, 5) + inset(11, 6) + inset(19, 6), { tone: "lo" }));
    out.push(L(k.lineOnTop([OLD.x + 7, OLD.y + 14], [OLD.x + 20, OLD.y + 14], OLD.h, P) + k.lineOnTop([OLD.x + 7, OLD.y + 22], [OLD.x + 17, OLD.y + 22], OLD.h, P), { tone: "lo", free: true, fine: true }));
    out.push(...screws(k.corners(OLD, 2.4), OLD.h, 0.9, 0.4));
    return out.join("");
  };

  const body = [
    base(PLATE),
    crank(),
    meter(),
    theme(),
    wire(THEME_LINE, "theme-line"),
    frame(),
    jaw(),
    adapter(),
    rule(),
    label({ x: -122, y: 40, w: 44, d: 11, r: 1 }, "DISEÑO ADAPTABLE"),
    `<g data-part="beads"><g data-bead="0" opacity="0"><circle class="veo-bead" r="2.3"/></g></g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const stub = (points, on = true) => wire(points, "", on);
  const still = { hooks: false, state: 1 };
  const parts = {
    frame: part([shadow({ ...BED, r: 4 }), frame(still), jaw(still)], k.boxCorners({ ...BED, d: BED.d + 6 }, 0, BED.h + JAW.h), 14),
    scale: part(
      [shadow({ ...RULE, y: RULE.y - 4, d: RULE.d + 4, r: 2 }), rule(still), `<g transform="${k.translateAlong(P, [WIDTHS[1] - WIDTHS[0], 0, 0])}">${slab({ x: GLASS.x + WIDTHS[0] + 1.4, y: BED.y + BED.d - 5, w: 3.2, d: 12.4, r: 0.8 }, RULE.h + 0.4, 2.2, "hi", { steps: 2, bevel: 0.3, crease: "lo", lit: true })}</g>`],
      k.boxCorners({ ...RULE, y: RULE.y - 6, d: RULE.d + 6 }, 0, 4),
      14,
    ),
    theme: part([shadow({ ...THEME, r: 4 }), theme({ hooks: false, alt: true }), stub([THEME_LINE[0], THEME_LINE[1], [62, -14, 0.9]])], k.boxCorners({ ...THEME, d: THEME.d + 12 }, 0, THEME.h + 14), 16),
    adapter: part([shadow({ x: ADAPTER.x - 6, y: OLD.y, w: 60, d: OLD.d, r: 4 }), adapter({ hooks: false, on: true })], k.boxCorners({ x: ADAPTER.x - 6, y: OLD.y, w: 60, d: OLD.d }, 0, ADAPTER.h + 3), 16),
    detail: part([shadow({ x: METER.x - 2, y: METER.y - 2, w: METER.w + 4, d: 14, r: 4 }), meter(still)], [...k.boxCorners({ x: METER.x, y: METER.y - 2, w: METER.w, d: 12 }, 0, METER.z + METER.h)], 16),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb", 1);
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("stretcher", {
  width: W,
  height: H,
  label:
    "Un bastidor extensible sobre una placa: una bancada con una mordaza fija y otra móvil, entre las que queda la pantalla; una manivela a la izquierda mueve la mordaza y, delante, una regla marca tres anchos: compacto, medio y amplio. Al ensancharse, la pantalla se reordena: una columna, luego lista y detalle, luego además un menú lateral. Detrás, un indicador de aguja señala el ancho, y una unidad de tema guarda los colores de marca. A la derecha, un panel antiguo entra a través de un adaptador.",
  body: full.body,
  motion: { P, widths: WIDTHS, theme: flat(THEME_LINE), needle: [NEEDLE.x, NEEDLE.y], crank: [CRANK.r, CRANK.r] },
  thumb: small.body
    .join("")
    .replace('<g data-part="jaw">', `<g transform="${k.translateAlong(P, [WIDTHS[1] - WIDTHS[0], 0, 0])}">`)
    .replace(`data-part="glass" width="${WIDTHS[0]}"`, `width="${WIDTHS[1]}"`)
    .replace('<g data-part="lay-0">', '<g opacity="0">')
    .replace('<g data-part="lay-1" opacity="0">', "<g>")
    .replace(/rotate\(-50 /, "rotate(0 ")
    .replace('data-part="zone-0" class="veo-lamp" data-on=""', 'class="veo-lamp"')
    .replace('data-part="zone-1" class="veo-lamp"', 'class="veo-lamp" data-on=""'),
  parts: full.parts,
});
