// .NET: a desk of windows. Three windows stand in cascade on it: stock, customers and,
// in front, the order form, which marks the field that does not add up and totals the
// rest. The session comes from the directory tower, the rows from the data server and
// the report leaves by the printer. To the right, a jack lifts the old module up to
// the level of the new base and slides it across: the application moves to current
// .NET a module at a time.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const DESK = { x: -82, y: -40, w: 92, d: 48, r: 3, h: 3 };
const PANE = { x: -76, y: -32, w: 44, h: 28, t: 1.8, dx: 18, dy: 12 };
const TITLES = ["almacén", "clientes", "pedido"];
const TOWER = { x: -120, y: -46, w: 20, d: 18, r: 2, h: 30 };
const DATA = { x: 92, y: -28, r: 11 };
const PRINTER = { x: 16, y: -14, w: 34, d: 22, r: 2.5, h: 11 };
const JACK = { x: 62, y: 18, w: 28, d: 24, r: 2 };
const LIFT = { x: 64, y: 20, w: 24, d: 20, r: 1.5, z: 7.5, rise: 5 };
const MODULE = { x: 66, y: 22, w: 20, d: 16, r: 1, h: 8, slide: 29 };
const NEW = { x: 93, y: 16, w: 25, d: 28, r: 2, h: 14 };

const LOGIN = [
  [TOWER.x + TOWER.w, -36, 3],
  [TOWER.x + TOWER.w + 2, -36, 0.9],
  [DESK.x - 0.4, -36, 0.9],
];
const ROWS = [
  [DATA.x - DATA.r, DATA.y, 0.9],
  [DESK.x + DESK.w + 0.4, DATA.y, 0.9],
];
const PRINT = [
  [DESK.x + DESK.w + 0.4, -3, 0.9],
  [PRINTER.x - 0.4, -3, 0.9],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [TOWER.x, TOWER.y, TOWER.h + 10], [DATA.x + DATA.r, DATA.y, 30]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, slab, cyl, screws, base, label, lamp, top, faceY, faceX, screen, platters, cable, shadow, pick, thumb, windowBar } = kitFor(P, { lod });
  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);
  const bulb = (x, y, z, r, part, on = false, ok = false) => {
    const svg = lamp(x, y, z, r, part, on);
    return ok ? svg.replace('class="veo-lamp"', 'class="veo-lamp" data-tone="ok"') : svg;
  };

  // ── The desk and its three windows ─────────────────────────────────────
  const desk = (plan = DESK) => slab(plan, 0, DESK.h, "mid", { steps: 5, bevel: 0.7, seam: 1.2 }) + L(k.planOutline(k.insetPlan(plan, 2.6), DESK.h, P, 4), { tone: "faint" });
  const gw = PANE.w - 2.4;
  const gh = PANE.h - 2.4;
  const uis = {
    stock: () => windowBar(gw, TITLES[0]) + `<rect class="scr-f" x="3" y="7.6" width="4" height="${gh - 10.6}" rx=".6"/><rect class="scr-f" data-t="mid" x="9" y="7.6" width="4" height="${gh - 10.6}" rx=".6"/><rect class="scr-f" x="15" y="7.6" width="4" height="${gh - 10.6}" rx=".6"/>`,
    customers: ({ hooks = true, rows = 0 } = {}) =>
      windowBar(gw, TITLES[1]) +
      [0, 1].map((j) => {
        const row = `<path class="scr-s" data-t="hi" d="M3 ${8 + j * 2.6}h${j ? 9 : 12}"/>`;
        return hooks ? `<g data-part="row-${j}" opacity="0">${row}</g>` : j < rows ? row : "";
      }).join("") +
      pick(`<path class="scr-s" data-t="dim" d="M3 13.6h${gw - 6}M3 16.4h${gw - 6}M3 19.2h${gw - 6}"/>`),
    order: ({ hooks = true, state = "ok" } = {}) => {
      const out = [windowBar(gw, TITLES[2])];
      [0, 1, 2].forEach((i) => {
        const y = 7.4 + i * 4.8;
        out.push(pick(`<path class="scr-s" data-t="dim" d="M3 ${y + 1.7}h8"/>`), `<rect class="scr-f" x="14" y="${y}" width="18" height="3.4" rx=".8"/>`, `<path class="scr-s" data-t="hi" d="M15.6 ${y + 1.7}h${[10, 7, 4][i]}"/>`);
      });
      const wrong = `<rect class="scr-s" data-t="acc" x="14" y="17" width="18" height="3.4" rx=".8"/><path class="scr-s" data-t="acc" d="M35.4 17.4v1.8M35.4 20.2v.2"/>`;
      const right = `<path class="scr-s" data-t="hi" d="M34.2 18.8l1.2 1.2l2.2-2.6"/><rect class="scr-f" data-t="acc" x="${gw - 17}" y="22" width="14" height="3.2" rx="1"/>`;
      const user = `<circle class="scr-f" data-t="acc" cx="${gw - 3.2}" cy="2.7" r="1.2"/>`;
      out.push(hooks ? `<g data-part="invalid" opacity="0">${wrong}</g><g data-part="valid" opacity="0">${right}</g><g data-part="session" opacity="0">${user}</g>` : (state === "wrong" ? wrong : right) + user);
      return out.join("");
    },
  };
  const pane = (n, ui) => {
    const x = PANE.x + PANE.dx * n;
    const y = PANE.y + PANE.dy * n;
    return (
      slab({ x: x + 7, y: y - 1.6, w: PANE.w - 14, d: 5, r: 1 }, DESK.h, 1, "mid", { steps: 3, bevel: 0.2 }) +
      slab({ x, y, w: PANE.w, d: PANE.t, r: 0.9 }, DESK.h + 1, PANE.h, "hi", { steps: 2, bevel: 0.4, crease: "lo" }) +
      faceY(x + 1.2, y + PANE.t, DESK.h + PANE.h - 0.2, screen(gw, gh, ui, 1))
    );
  };
  const panes = (opts = {}) => pane(0, uis.stock()) + pane(1, uis.customers(opts)) + pane(2, uis.order(opts));

  // ── The directory tower: who gets in ───────────────────────────────────
  const tower = ({ hooks = true, on = false } = {}) => {
    const out = [slab(TOWER, 0, TOWER.h, "mid", { steps: 5, bevel: 0.8, seam: 4 })];
    out.push(faceY(TOWER.x + 2, TOWER.y + TOWER.d, TOWER.h - 3, `<text class="ui-t" x="8" y="2.6" font-size="2.3" text-anchor="middle" opacity=".85">DIRECTORIO</text><rect class="ui-f" data-t="hi" x="2" y="6" width="12" height="1.8" rx=".9"/>${pick(`<path class="ui-s" data-t="lo" d="M2 11h12M2 13.6h12M2 16.2h12M2 18.8h12"/>`)}`));
    // A card half out of the slot.
    out.push(slab({ x: TOWER.x + 5.4, y: TOWER.y + TOWER.d, w: 9.2, d: 4.6, r: 0.6 }, TOWER.h - 10.8, 0.8, "hi", { steps: 2, bevel: 0, crease: "lo", lit: true }));
    out.push(cyl(TOWER.x + 6, TOWER.y + 6, 0.9, TOWER.h, 8, "mid", { steps: 10, crease: "none" }), cyl(TOWER.x + 6, TOWER.y + 6, 1.7, TOWER.h + 8, 1.6, "hi", { steps: 12, crease: "lo" }));
    out.push(bulb(TOWER.x + TOWER.w - 5.4, TOWER.y + TOWER.d - 5.4, TOWER.h, 1.8, hooks ? "login" : "", on, true));
    return out.join("");
  };

  // ── The printer and the report ─────────────────────────────────────────
  const printer = ({ hooks = true, printed = false } = {}) => {
    const out = [slab({ x: PRINTER.x + 6, y: PRINTER.y + 1, w: 22, d: 2, r: 0.5 }, PRINTER.h - 2, 9, "hi", { steps: 1, bevel: 0, crease: "lo" })];
    out.push(slab(PRINTER, 0, PRINTER.h, "mid", { steps: 5, bevel: 0.8, seam: 3 }));
    out.push(faceY(PRINTER.x + 5, PRINTER.y + PRINTER.d, 7.6, `<rect class="ui-f" data-t="hi" width="24" height="1.8" rx=".9"/>`));
    out.push(L(k.planOutline({ x: PRINTER.x + 4, y: PRINTER.y + 5, w: 26, d: 12, r: 1.5 }, PRINTER.h, P, 3), { tone: "faint" }));
    out.push(slab({ x: PRINTER.x + 4, y: PRINTER.y + PRINTER.d, w: 26, d: 16, r: 1.2 }, 0, 1.2, "lo", { steps: 3, bevel: 0.2 }));
    const y0 = PRINTER.y + PRINTER.d;
    const sheet =
      slab({ x: PRINTER.x + 7, y: y0 + 0.6, w: 20, d: 13.6, r: 0.5 }, 1.2, 0.5, "hi", { steps: 1, bevel: 0, crease: "lo" }) +
      L([3, 5.2, 7.4].map((dy) => k.lineOnTop([PRINTER.x + 9.4, y0 + dy], [PRINTER.x + 24.4, y0 + dy], 1.72, P)).join(""), { tone: "mid", free: true, fine: true }) +
      L(k.lineOnTop([PRINTER.x + 17, y0 + 11], [PRINTER.x + 24.4, y0 + 11], 1.72, P), { tone: "lit", free: true });
    out.push(hooks ? `<g data-part="sheet" opacity="0">${sheet}</g>` : printed ? sheet : "");
    out.push(bulb(PRINTER.x + PRINTER.w - 5, PRINTER.y + PRINTER.d - 4.6, PRINTER.h, 1.6, hooks ? "printing" : "", printed, true));
    return out.join("");
  };

  // ── The jack: the old module goes up to the new base ───────────────────
  const jackBase = () => slab(JACK, 0, 2, "lo", { steps: 4, bevel: 0.3 }) + screws(k.corners(JACK, 3), 2, 0.9, 0.42).join("");
  const piston = () => cyl(JACK.x + JACK.w / 2, JACK.y + JACK.d / 2, 2.8, 2, LIFT.z - 2 + 0.4, "hi", { steps: 16, crease: "lo" });
  const sleeve = () => cyl(JACK.x + JACK.w / 2, JACK.y + JACK.d / 2, 4.4, 2, 4, "mid", { steps: 20, bevel: 0.3 }) + L(k.sideArc(JACK.x + JACK.w / 2, JACK.y + JACK.d / 2, 4.4, 4, P, 16), { tone: "lo", fine: true });
  const deck = () => slab(LIFT, LIFT.z, 1.5, "hi", { steps: 3, bevel: 0.3, crease: "lo" });
  const module = () => {
    const z = LIFT.z + 1.5;
    return (
      slab(MODULE, z, MODULE.h, "mid", { steps: 4, bevel: 0.6, seam: z + 2.4 }) +
      faceY(MODULE.x + 2, MODULE.y + MODULE.d, z + MODULE.h - 1.6, `<text class="ui-t" x="8" y="3" font-size="2.5" text-anchor="middle" opacity=".85">ANTIGUO</text>${pick(`<path class="ui-s" data-t="lo" d="M2 4.6h12"/>`)}`) +
      faceX(MODULE.x + MODULE.w, MODULE.y + MODULE.d - 2, z + MODULE.h - 2, pick(`<path class="ui-s" data-t="lo" d="M0 0h12M0 2h12M0 4h12"/>`))
    );
  };
  const newBase = ({ hooks = true, on = false } = {}) => {
    const out = [slab(NEW, 0, NEW.h, "hi", { steps: 5, bevel: 0.8, crease: "lo", seam: 4 })];
    out.push(faceY(NEW.x + 2.5, NEW.y + NEW.d, NEW.h - 3, `<rect class="ui-s" data-t="lo" width="20" height="5.4" rx=".8"/><text class="ui-t" x="10" y="3.8" font-size="2.5" text-anchor="middle" opacity=".85">.NET ACTUAL</text>`));
    out.push(L(k.lineOnTop([NEW.x + 1, NEW.y + 8], [NEW.x + NEW.w - 3, NEW.y + 8], NEW.h, P) + k.lineOnTop([NEW.x + 1, NEW.y + 20], [NEW.x + NEW.w - 3, NEW.y + 20], NEW.h, P), { tone: "mid", free: true, fine: true }));
    out.push(bulb(NEW.x + NEW.w - 4, NEW.y + NEW.d - 3.6, NEW.h, 1.5, hooks ? "moved" : "", on, true));
    return out.join("");
  };

  const data = (hooks = true) => platters(DATA.x, DATA.y, DATA.r, 0, { count: 3, h: 6.4, part: hooks ? "data" : undefined });

  const body = [
    base(PLATE),
    tower(),
    wire(LOGIN, "login-line"),
    data(),
    wire(ROWS, "rows-line"),
    desk(),
    panes(),
    wire(PRINT, "print-line"),
    printer(),
    jackBase(),
    `<g data-part="piston">${piston()}</g>`,
    sleeve(),
    `<g data-part="lift">${deck()}<g data-part="module-a">${module()}</g></g>`,
    newBase(),
    `<g data-part="module-b" opacity="0">${module()}</g>`,
    label({ x: -118, y: 37, w: 78, d: 11, r: 1 }, "FORMULARIO · INFORME · MIGRACIÓN"),
    `<g data-part="beads"><g data-bead="0" opacity="0"><circle class="veo-bead" r="2.3"/></g></g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const move = (by, svg) => `<g transform="${k.translateAlong(P, by)}">${svg}</g>`;
  const front = { x: PANE.x + PANE.dx * 2 - 6, y: PANE.y + PANE.dy * 2 - 8, w: PANE.w + 12, d: 18, r: 3 };
  const parts = {
    windows: part([shadow({ ...DESK, r: 4 }), desk(), panes({ hooks: false, rows: 2 })], [...k.boxCorners(DESK, 0, DESK.h), [PANE.x, PANE.y, DESK.h + PANE.h + 3]], 10),
    report: part([shadow({ x: PRINTER.x, y: PRINTER.y, w: PRINTER.w, d: PRINTER.d + 16, r: 4 }), printer({ hooks: false, printed: true })], [...k.boxCorners({ x: PRINTER.x, y: PRINTER.y, w: PRINTER.w, d: PRINTER.d + 16 }, 0, 4), [PRINTER.x, PRINTER.y, PRINTER.h + 9]], 12),
    lift: part(
      [shadow({ x: JACK.x, y: NEW.y, w: NEW.x + NEW.w - JACK.x, d: NEW.d, r: 4 }), jackBase(), move([0, 0, LIFT.rise], piston()), sleeve(), move([0, 0, LIFT.rise], deck() + module()), newBase({ hooks: false })],
      [...k.boxCorners({ x: JACK.x, y: NEW.y, w: NEW.x + NEW.w - JACK.x, d: NEW.d }, 0, 4), [MODULE.x, MODULE.y, LIFT.z + LIFT.rise + MODULE.h + 4]],
      10,
    ),
    domain: part([shadow({ ...TOWER, d: TOWER.d + 6, r: 4 }), tower({ hooks: false, on: true }), wire([LOGIN[0], LOGIN[1], [TOWER.x + TOWER.w + 12, -36, 0.9]], "", true)], [...k.boxCorners({ ...TOWER, w: TOWER.w + 12, d: TOWER.d + 6 }, 0, 4), [TOWER.x, TOWER.y, TOWER.h + 10]], 12),
    detail: part([shadow({ ...front, r: 4 }), desk(front), pane(2, uis.order({ hooks: false, state: "wrong" }))], [...k.boxCorners(front, 0, DESK.h), [PANE.x + PANE.dx * 2, PANE.y + PANE.dy * 2, DESK.h + PANE.h + 3]], 10),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("cascade", {
  width: W,
  height: H,
  label:
    "Una mesa de ventanas sobre una placa: tres ventanas en cascada, almacén, clientes y, delante, el formulario de un pedido con un campo marcado. A la izquierda, una torre de directorio con una tarjeta en su ranura; al fondo a la derecha, un servidor de datos. Junto a la mesa, una impresora de la que sale un informe. Delante, a la derecha, un gato sube un módulo antiguo hasta la altura de una base nueva.",
  body: full.body,
  motion: { P, login: flat(LOGIN), rows: flat(ROWS), print: flat(PRINT), rise: LIFT.rise, slide: MODULE.slide },
  thumb: small.body
    .join("")
    .replace('<g data-part="invalid" opacity="0">', "<g>")
    .replace('<g data-part="session" opacity="0">', "<g>")
    .replace(/<g data-part="row-(\d)" opacity="0">/g, "<g>")
    .replace('<g data-part="sheet" opacity="0">', "<g>")
    .replace('<g data-part="piston">', `<g transform="${k.translateAlong(P, [0, 0, LIFT.rise])}">`)
    .replace('<g data-part="lift">', `<g transform="${k.translateAlong(P, [0, 0, LIFT.rise])}">`),
  parts: full.parts,
});
