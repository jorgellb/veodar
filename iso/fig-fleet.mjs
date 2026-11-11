// Kotlin: a station for the devices a company really has. A rack holds a phone, a
// warehouse handheld with its scanner head and a tablet; a console hands all three the
// same version. In front, the background mechanism keeps turning with the screens off
// and sends the pending reports one by one; to the right, the peripherals the app
// drives: a scanner reading a code and a printer putting out its label.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const RACK = { x: -98, y: -46, w: 140, d: 20, r: 3, h: 6 };
const FRONT = RACK.y + RACK.d;
const PHONE = { x: -90, y: -39, z: RACK.h, w: 28, h: 52, t: 3.4 };
const HAND = { x: -50, y: -40.5, w: 26, d: 6, r: 1.6, z: RACK.h, h: 46 };
const TABLET = { x: -12, y: -39, w: 46, d: 3.4, r: 1.6, z: RACK.h, h: 34 };
const SLOTS = [-76, -37, 11];
const CONSOLE = { x: -118, y: 8, w: 46, d: 26, r: 3, h: 8 };
const WORKER = { x: -40, y: 8, w: 46, d: 26, r: 3, h: 10 };
const GEAR = { x: 13, y: 13, r: 8 };
const SMALL = { x: 25.6, y: 7.4, r: 3.6 };
const DB = { x: 96, y: -32, r: 12 };
const PRINTER = { x: 44, y: 12, w: 30, d: 24, r: 3, h: 14 };
const SCANNER = { x: 86, y: 8, w: 14, d: 12, r: 2, h: 9 };
const CARD = { x: 82, y: 28, w: 22, d: 14, r: 1 };

const TO_RACK = [
  [-94, CONSOLE.y, 3],
  [-94, CONSOLE.y - 2, 0.9],
  [-94, FRONT + 2, 0.9],
  [-94, FRONT, 2],
];
const TO_WORKER = [
  [-17, FRONT, 2],
  [-17, FRONT + 3, 0.9],
  [-17, WORKER.y, 0.9],
  [-17, WORKER.y, 3],
];
const TO_DB = [
  [WORKER.x + WORKER.w, 14, 3],
  [WORKER.x + WORKER.w + 2, 14, 0.9],
  [30, 14, 0.9],
  [30, -12, 0.9],
  [DB.x, -12, 0.9],
  [DB.x, DB.y + DB.r, 0.9],
  [DB.x, DB.y + DB.r, 2.4],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [PHONE.x, PHONE.y, 62], [HAND.x + HAND.w, HAND.y, 64]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, D, slab, cyl, screws, base, label, lamp, knob, top, faceY, screen, platters, cable, shadow, pick, thumb, handset } = kitFor(P, { lod });
  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);
  const bulb = (x, y, z, r, part, on = false, ok = false) => {
    const svg = lamp(x, y, z, r, part, on);
    return ok ? svg.replace('class="veo-lamp"', 'class="veo-lamp" data-tone="ok"') : svg;
  };
  // A sheet of dark glass over a screen: the page raises its opacity to switch it off.
  const off = (i, w, h, r, hooks) => (hooks ? `<rect data-part="off-${i}" width="${w}" height="${h}" rx="${r}" fill="#16142c" opacity="0"/>` : "");
  const fresh = (i, svg, hooks, on) => (hooks ? `<g data-part="new-${i}" opacity="0">${svg}</g>` : on ? svg : "");

  // ── The rack and its three devices ─────────────────────────────────────
  const phone = ({ hooks = true, on = false } = {}) => {
    const gw = PHONE.w - 2.6;
    const gh = PHONE.h - 2.6;
    const ui =
      `<path class="scr-s" data-t="hi" d="M2.6 9.4h10"/>` +
      [0, 1].map((i) => `<rect class="scr-f" x="2.4" y="${13 + i * 8}" width="${gw - 4.8}" height="6.4" rx="1.6"/>${pick(`<path class="scr-s" data-t="dim" d="M5 ${16.2 + i * 8}h${[11, 8][i]}"/>`)}`).join("") +
      fresh(0, `<rect class="scr-f" data-t="acc" x="2.4" y="29" width="${gw - 4.8}" height="6.4" rx="1.6"/>`, hooks, on) +
      `<path class="scr-s" d="M${gw / 2 - 8.2} ${gh - 3.4}l2.3-1.4v2.8z"/><circle class="scr-s" cx="${gw / 2}" cy="${gh - 3.4}" r="1.25"/><rect class="scr-s" x="${gw / 2 + 6}" y="${gh - 4.5}" width="2.3" height="2.3" rx=".3"/>` +
      off(0, gw, gh, 1.8, hooks);
    return handset(PHONE, ui, { kind: "b" });
  };
  const handheld = ({ hooks = true, on = false } = {}) => {
    const out = [slab(HAND, HAND.z, HAND.h, "hi", { steps: 3, bevel: 0.5, crease: "lo", seam: HAND.z + 20 })];
    const fy = HAND.y + HAND.d;
    const bars = [1.4, 2.6, 4.4, 5.4, 7.4, 9, 10, 12.2, 13.4, 15, 16.4]
      .map((x, i) => `<path class="scr-s" data-t="hi" d="M${3 + x} 4.4v${i % 3 ? 7 : 8.4}"/>`)
      .join("");
    out.push(
      faceY(
        HAND.x + 2,
        fy,
        HAND.z + HAND.h - 2.4,
        screen(22, 20, pick(bars, `<path class="scr-s" data-t="hi" d="M5 4.4v8M8 4.4v8M12 4.4v8M15 4.4v8M18 4.4v8"/>`) + `<path class="scr-s" data-t="dim" d="M4 16h14"/>` + fresh("scan", `<path class="scr-s" data-t="acc" d="M2.4 8.4h17.2"/>`, hooks, on) + off(1, 22, 20, 1.4, hooks), 1.4),
      ),
    );
    // The keys under its screen, and the scanner head on top.
    const keys = [];
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) keys.push(`<rect class="ui-f" x="${c * 5.2}" y="${r * 4.2}" width="3.8" height="2.8" rx=".8"/>`);
    out.push(pick(faceY(HAND.x + 3.4, fy, HAND.z + 20.6, keys.join(""))));
    out.push(slab({ x: HAND.x - 2, y: HAND.y - 1, w: HAND.w + 4, d: HAND.d + 2, r: 2 }, HAND.z + HAND.h, 7, "mid", { steps: 4, bevel: 0.6, seam: HAND.z + HAND.h + 3 }));
    out.push(faceY(HAND.x + 4, fy + 1, HAND.z + HAND.h + 5.4, `<rect class="ui-f" data-t="hi" width="18" height="3.4" rx="1.2"/>`));
    return out.join("");
  };
  const tablet = ({ hooks = true, on = false } = {}) => {
    const sw = TABLET.w - 3.2;
    const sh = TABLET.h - 3.2;
    return (
      slab(TABLET, TABLET.z, TABLET.h, "hi", { steps: 3, bevel: 0.5, crease: "lo" }) +
      faceY(
        TABLET.x + 1.6,
        TABLET.y + TABLET.d,
        TABLET.z + TABLET.h - 1.6,
        screen(
          sw,
          sh,
          `<path class="scr-s" data-t="dim" d="M16 0v${sh}"/>` +
            [0, 1, 2].map((i) => `<rect class="scr-f" x="2.4" y="${4.6 + i * 6.6}" width="11.4" height="5" rx="1.2"/>`).join("") +
            `<rect class="scr-s" data-t="dim" x="19" y="4.6" width="12" height="9.4" rx="1.2"/>` +
            pick(`<path class="scr-s" data-t="dim" d="M19 17.6h20M19 21h14"/>`) +
            fresh(2, `<rect class="scr-f" data-t="acc" x="19" y="24.4" width="20" height="4" rx="2"/>`, hooks, on) +
            off(2, sw, sh, 2, hooks),
          2,
        ),
      )
    );
  };
  const rack = ({ hooks = true, on = false } = {}) => {
    const out = [slab(RACK, 0, RACK.h, "mid", { steps: 5, bevel: 0.7, seam: 2.4 })];
    for (const [x, w] of [[PHONE.x - 1.5, PHONE.w + 3], [HAND.x - 1.5, HAND.w + 3], [TABLET.x - 1.5, TABLET.w + 3]]) out.push(L(k.planOutline({ x, y: RACK.y + 5, w, d: 9, r: 1.6 }, RACK.h, P, 3), { tone: "lo", fine: true }));
    out.push(...screws([[RACK.x + 4, RACK.y + 4], [RACK.x + RACK.w - 4, RACK.y + 4], [RACK.x + RACK.w - 4, FRONT - 4]], RACK.h, 0.9, 0.4));
    out.push(phone({ hooks, on }), handheld({ hooks, on }), tablet({ hooks, on }));
    SLOTS.forEach((x, i) => out.push(bulb(x, FRONT - 3.6, RACK.h, 1.7, hooks ? `slot-${i}` : "", on, true)));
    return out.join("");
  };

  // ── The console that hands out a version ───────────────────────────────
  const console_ = ({ hooks = true, on = false } = {}) => {
    const out = [slab(CONSOLE, 0, CONSOLE.h, "mid", { steps: 5, bevel: 0.7, seam: 3 })];
    const scr = { x: CONSOLE.x + 6, y: CONSOLE.y + 3, w: 30, d: 3, r: 1 };
    out.push(slab(scr, CONSOLE.h, 18, "hi", { steps: 3, bevel: 0.4, crease: "lo" }));
    const done = (i) => `<rect class="scr-f" data-t="acc" x="${4 + i * 7.4}" y="9.2" width="5" height="3.4" rx="1"/>`;
    out.push(
      faceY(
        scr.x + 1.4,
        scr.y + scr.d,
        CONSOLE.h + 16.6,
        screen(
          27.2,
          15.2,
          `<text class="scr-t" x="4" y="6.4" font-size="3.4" font-weight="600">v2.4</text>` + [0, 1, 2].map((i) => `<rect class="scr-s" data-t="dim" x="${4 + i * 7.4}" y="9.2" width="5" height="3.4" rx="1"/>` + (hooks ? `<g data-part="inst-${i}" opacity="0">${done(i)}</g>` : on ? done(i) : "")).join(""),
          1.2,
        ),
      ),
    );
    out.push(knob(CONSOLE.x + 34, CONSOLE.y + 17, 3.6, CONSOLE.h, 5, { pointer: 0.7 }));
    out.push(bulb(CONSOLE.x + 12, CONSOLE.y + 19, CONSOLE.h, 2.2, hooks ? "send" : "", on));
    out.push(...screws([[CONSOLE.x + 4, CONSOLE.y + CONSOLE.d - 4], [CONSOLE.x + CONSOLE.w - 4, CONSOLE.y + CONSOLE.d - 4]], CONSOLE.h, 0.9, 0.4));
    return out.join("");
  };

  // ── The background mechanism: two wheels under glass and a tray of jobs ─
  const wheel = (c, teeth, name, hooks) => {
    const spokes = [];
    for (let i = 0; i < teeth; i++) {
      const a = (i / teeth) * Math.PI * 2;
      const [cx, sx] = [Math.cos(a), Math.sin(a)];
      spokes.push(`<path class="ui-s" data-t="hi" d="M${(c.x + cx * (c.r - 1.2)).toFixed(2)} ${(c.y + sx * (c.r - 1.2)).toFixed(2)}L${(c.x + cx * (c.r + 0.8)).toFixed(2)} ${(c.y + sx * (c.r + 0.8)).toFixed(2)}"/>`);
      if (i % 2 === 0 && !thumb) spokes.push(`<path class="ui-s" data-t="lo" d="M${(c.x + cx * 1.6).toFixed(2)} ${(c.y + sx * 1.6).toFixed(2)}L${(c.x + cx * (c.r - 1.6)).toFixed(2)} ${(c.y + sx * (c.r - 1.6)).toFixed(2)}"/>`);
    }
    return `<g${hooks ? ` data-part="${name}"` : ""}><circle class="ui-s" data-t="hi" cx="${c.x}" cy="${c.y}" r="${c.r - 1.2}"/>${spokes.join("")}<circle class="ui-f" data-t="hi" cx="${c.x}" cy="${c.y}" r="1.2"/></g>`;
  };
  const token = (i, { lit = false, part } = {}) =>
    `<g${part ? ` data-part="${part}"` : ""}>${slab({ x: WORKER.x + 33.4 + i * 3.8, y: WORKER.y + 5, w: 2.4, d: 13, r: 0.5 }, WORKER.h + 1.4, 6.6, "hi", { steps: 1, bevel: 0.2, crease: "lo", lit })}</g>`;
  const worker = ({ hooks = true, on = false } = {}) => {
    const out = [slab(WORKER, 0, WORKER.h, "mid", { steps: 5, bevel: 0.7, seam: 4 })];
    out.push(top(WORKER.x + 3, WORKER.y + 2.6, WORKER.h + 0.02, `<rect class="ui-s" data-t="lo" x="1" y="1.4" width="29" height="21" rx="2.4"/>${wheel(GEAR, 12, "gear", hooks)}${wheel(SMALL, 7, "gear-b", hooks)}`));
    // The tray of pending jobs, standing on edge.
    out.push(slab({ x: WORKER.x + 32, y: WORKER.y + 3.4, w: 12, d: 16.4, r: 1 }, WORKER.h, 1.4, "lo", { steps: 2, bevel: 0 }));
    for (let i = 0; i < 3; i++) out.push(token(i, { lit: i === 2 && (hooks || on), part: hooks ? `job-${i}` : undefined }));
    out.push(bulb(WORKER.x + 36, WORKER.y + WORKER.d - 3.4, WORKER.h, 1.7, hooks ? "work" : "", on));
    out.push(...screws([[WORKER.x + 3.4, WORKER.y + WORKER.d - 3.4]], WORKER.h, 0.9, 0.4));
    return out.join("");
  };

  // ── The peripherals: a printer with its label and a scanner over a code ─
  const printer = ({ hooks = true, on = false } = {}) => {
    const out = [slab(PRINTER, 0, PRINTER.h, "mid", { steps: 5, bevel: 0.7, seam: 5 })];
    out.push(slab({ x: PRINTER.x + 4, y: PRINTER.y + 3, w: PRINTER.w - 8, d: 12, r: 3 }, PRINTER.h, 2.6, "mid", { steps: 5, bevel: 0.5 }));
    out.push(faceY(PRINTER.x + 6, PRINTER.y + PRINTER.d, 9.4, `<rect class="ui-f" data-t="hi" width="18" height="2" rx="1"/>`));
    const strip =
      slab({ x: PRINTER.x + 8, y: PRINTER.y + PRINTER.d, w: 14, d: 9, r: 0.6 }, 7.6, 0.5, "hi", { steps: 1, bevel: 0, crease: "lo", lit: true }) +
      L(k.lineOnTop([PRINTER.x + 10.4, PRINTER.y + PRINTER.d + 3], [PRINTER.x + 19.6, PRINTER.y + PRINTER.d + 3], 8.12, P) + k.lineOnTop([PRINTER.x + 10.4, PRINTER.y + PRINTER.d + 5.4], [PRINTER.x + 16.6, PRINTER.y + PRINTER.d + 5.4], 8.12, P), { tone: "mid", free: true, fine: true });
    out.push(hooks ? `<g data-part="strip" opacity="0">${strip}</g>` : on ? strip : "");
    out.push(bulb(PRINTER.x + PRINTER.w - 5, PRINTER.y + PRINTER.d - 4.4, PRINTER.h, 1.7, hooks ? "print" : "", on));
    return out.join("");
  };
  const scanner = ({ hooks = true, on = false } = {}) => {
    const out = [slab(SCANNER, 0, SCANNER.h, "hi", { steps: 4, bevel: 0.6, crease: "lo", seam: 3 })];
    out.push(faceY(SCANNER.x + 2.4, SCANNER.y + SCANNER.d, 7, `<rect class="ui-f" data-t="hi" width="9.2" height="3.6" rx="1"/>`));
    out.push(bulb(SCANNER.x + 7, SCANNER.y + 5, SCANNER.h, 1.6, hooks ? "read" : "", on));
    out.push(slab(CARD, 0, 0.8, "hi", { steps: 2, bevel: 0.2, crease: "lo" }));
    const bars = [];
    for (const dx of [3, 5, 6.4, 8.6, 10, 12.4, 13.6, 15.4, 17.4, 19]) bars.push(k.lineOnTop([CARD.x + dx, CARD.y + 3], [CARD.x + dx, CARD.y + CARD.d - 3], 0.82, P));
    out.push(L(bars.join(""), { tone: "hi", free: true }));
    // The line of light it throws across the code.
    const beam = L(k.lineOnTop([CARD.x + 2, CARD.y + 7], [CARD.x + CARD.w - 2, CARD.y + 7], 0.84, P) + k.segment([SCANNER.x + 7, SCANNER.y + SCANNER.d, 5.2], [CARD.x + 11, CARD.y + 7, 0.84], P), { tone: "hi", free: true });
    out.push(`<g${hooks ? ' data-part="beam"' : ""} class="veo-trace"${hooks ? "" : on ? ' data-on=""' : ""}${hooks ? ' opacity="0"' : on ? "" : ' opacity="0"'}>${beam}</g>`);
    return out.join("");
  };
  const database = (hooks = true) => platters(DB.x, DB.y, DB.r, 0, { count: 3, h: 6.4, part: hooks ? "db" : undefined });

  const body = [
    base(PLATE),
    rack(),
    database(),
    wire(TO_RACK, "to-rack"),
    wire(TO_WORKER, "to-worker"),
    wire(TO_DB, "to-db"),
    console_(),
    worker(),
    scanner(),
    printer(),
    label({ x: -46, y: 40, w: 60, d: 11, r: 1 }, "PARQUE · SEGUNDO PLANO"),
    `<g data-part="beads">${[0, 1].map((i) => `<g data-bead="${i}" opacity="0"><circle class="veo-bead" r="2.3"/></g>`).join("")}</g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const stub = (points, on = true) => wire(points, "", on);
  const still = { hooks: false, on: true };
  const parts = {
    rack: part([shadow({ ...RACK, r: 4 }), rack(still)], k.boxCorners(RACK, 0, 62), 12),
    worker: part([shadow({ ...WORKER, r: 4 }), worker(still)], k.boxCorners(WORKER, 0, WORKER.h + 9), 18),
    periph: part([shadow({ x: PRINTER.x, y: SCANNER.y, w: 62, d: 38, r: 5 }), scanner(still), printer(still)], k.boxCorners({ x: PRINTER.x, y: SCANNER.y, w: 62, d: 38 }, 0, PRINTER.h + 3), 16),
    console: part([shadow({ ...CONSOLE, r: 4 }), stub([[-94, CONSOLE.y - 12, 0.9], [-94, CONSOLE.y - 2, 0.9], [-94, CONSOLE.y, 3]]), console_(still)], k.boxCorners({ ...CONSOLE, y: CONSOLE.y - 10, d: CONSOLE.d + 10 }, 0, CONSOLE.h + 20), 14),
    detail: part(
      [shadow({ x: WORKER.x, y: WORKER.y - 8, w: WORKER.w + 12, d: WORKER.d + 8, r: 4 }), stub([[-17, WORKER.y - 12, 0.9], [-17, WORKER.y, 0.9], [-17, WORKER.y, 3]]), stub([TO_DB[0], TO_DB[1], [22, 14, 0.9]]), worker(still)],
      k.boxCorners({ x: WORKER.x, y: WORKER.y - 12, w: WORKER.w + 18, d: WORKER.d + 12 }, 0, WORKER.h + 9),
      14,
    ),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("fleet", {
  width: W,
  height: H,
  label:
    "Una estación del parque de dispositivos sobre una placa: al fondo, un bastidor con un teléfono, un terminal de almacén con su cabezal lector y una tableta, cada uno con su piloto; a la izquierda, la consola que les reparte la versión. Delante, una caja con dos ruedas bajo un cristal y una bandeja de trabajos: el mecanismo de fondo, unido a una base de datos. A la derecha, un lector sobre un código de barras y una impresora de la que sale una etiqueta.",
  body: full.body,
  motion: { P, toRack: flat(TO_RACK), toWorker: flat(TO_WORKER), toDb: flat(TO_DB), gear: [GEAR.x, GEAR.y], small: [SMALL.x, SMALL.y] },
  thumb: small.body
    .join("")
    .replace(/data-part="slot-(\d)" class="veo-lamp"/g, 'class="veo-lamp" data-on=""')
    .replace(/<g data-part="new-(0|2)" opacity="0">/g, "<g>")
    .replace('data-part="to-db"', 'data-on=""')
    .replace('data-part="work" class="veo-lamp"', 'class="veo-lamp" data-on=""'),
  parts: full.parts,
});
