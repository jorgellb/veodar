// Node.js: a switchboard. A message comes in on a line, is checked at the board and
// leaves on the cord of the system it is for. Work that takes longer waits its turn
// in a tray of pending jobs instead of blocking the line.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const BOARD = { x: -78, y: -46, w: 96, d: 14, r: 2, h: 60 };
const DESK = { x: -78, y: -32, w: 96, d: 18, r: 2, h: 18 };
const FRONT = DESK.y + DESK.d; // the desk's front face
const WALL = { x: -122, y: -30, w: 10, d: 16, r: 1.5, h: 22 };
const TRAY = { x: -112, y: 10, w: 44, d: 22, r: 2, h: 5 };
const PLUGS = [0, -20, -40];
const ERP = { x: 64, y: -30, r: 12 };
const CRM = { x: 84, y: -10, w: 24, d: 20, r: 2, h: 7 };
const MAIL = { x: 54, y: 22, w: 24, d: 20, r: 2, h: 7 };
const drop = (x) => [
  [x, -22, 20.4],
  [x, FRONT + 0.6, 18.6],
  [x, FRONT + 1.4, 0.9],
];
const CORDS = [
  [...drop(0), [0, -6, 0.9], [40, -6, 0.9], [40, -30, 0.9], [52.4, -30, 0.9]],
  [...drop(-20), [-20, 2, 0.9], [84, 2, 0.9]],
  [...drop(-40), [-40, 32, 0.9], [54, 32, 0.9]],
];
const LINE_IN = [
  [WALL.x + WALL.w, -22, 8],
  [-106, -22, 0.9],
  [-106, -8, 0.9],
  [-60, -8, 0.9],
  [-60, FRONT + 0.7, 0.9],
  [-60, FRONT + 0.7, 11],
];
const LINE_QUEUE = [
  [-70, FRONT + 0.7, 7],
  [-70, FRONT + 0.7, 0.9],
  [-70, -3, 0.9],
  [-84, -3, 0.9],
  [-84, TRAY.y, 0.9],
  [-84, TRAY.y, 3],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [BOARD.x, BOARD.y, 64], [BOARD.x + BOARD.w, BOARD.y, 64]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, D, slab, cyl, screws, base, label, lamp, faceY, faceX, screen, platters, cable, shadow, pick } = kitFor(P, { lod });
  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);

  // ── The board: a panel of jacks over a desk with three plugs ───────────
  const board = ({ hooks = true } = {}) => {
    const out = [slab(BOARD, 0, BOARD.h, "mid", { steps: 4, bevel: 0.7, seam: 54 })];
    const pw = BOARD.w - 8;
    // Jacks in three rows of seven; the lit one is where a call is being routed.
    const jacks = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 7; col++) {
        const cx = 8 + col * 12;
        const cy = 11 + row * 9.6;
        jacks.push(`<circle class="ui-s" cx="${cx}" cy="${cy}" r="2.2"/><circle class="ui-f" data-t="hi" cx="${cx}" cy="${cy}" r=".8"/>` + pick(`<circle class="ui-f"${hooks ? ` data-jack="${row}-${col}"` : ""} cx="${cx}" cy="${cy - 4}" r=".9"/>`));
      }
    }
    out.push(
      faceY(
        BOARD.x + 4,
        FRONT - DESK.d,
        BOARD.h - 4,
        `<rect class="ui-s" data-t="lo" width="${pw}" height="${BOARD.h - DESK.h - 8}" rx="1.4"/><text class="ui-t" x="3" y="4.6" font-size="2.6" opacity=".7">API · WEBHOOKS</text>${jacks.join("")}`,
      ),
    );
    out.push(...screws(k.corners(BOARD, 3.4), BOARD.h, 0.9, 0.42));
    // Status lamps on top: delivered, queued, rejected.
    out.push(lamp(BOARD.x + 62, BOARD.y + 7, BOARD.h, 2, "st-ok").replace('class="veo-lamp"', 'class="veo-lamp" data-tone="ok"'));
    out.push(lamp(BOARD.x + 73, BOARD.y + 7, BOARD.h, 2, "st-queue"));
    out.push(lamp(BOARD.x + 84, BOARD.y + 7, BOARD.h, 2, "st-err"));
    // The desk, with the jacks for the line and the tray on its front.
    out.push(slab(DESK, 0, DESK.h, "mid", { steps: 4, bevel: 0.7, seam: 4 }));
    for (const [x, z] of [[-60, 11], [-70, 7]]) out.push(L(k.sideRing([x, FRONT, z], 2.4, "y", P, 20), { tone: "mid" }), D([at([x, FRONT, z])], { size: 0.8, tone: "hi", keep: true }));
    out.push(L(k.planOutline({ x: DESK.x + 6, y: DESK.y + 3, w: 22, d: 10, r: 1.2 }, DESK.h, P, 3), { tone: "lo", fine: true }));
    for (const x of [DESK.x + 12, DESK.x + 20]) out.push(cyl(x, DESK.y + 8, 1.4, DESK.h, 2.6, "hi", { steps: 12, crease: "lo" }));
    return out.join("");
  };
  const plugs = () => PLUGS.map((x, i) => cyl(x, -22, 3, DESK.h, 0.8, "lo", { steps: 18 }) + `<g data-part="plug-${i}" class="veo-lamp">${cyl(x, -22, 1.9, DESK.h + 0.8, 2.4, "hi", { steps: 16, crease: "lo" })}</g>`).join("");

  // ── The line the messages come in on ───────────────────────────────────
  const wall = () =>
    slab(WALL, 0, WALL.h, "mid", { steps: 3, bevel: 0.5, seam: 4 }) +
    faceX(WALL.x + WALL.w, WALL.y + WALL.d - 3, 13, `<rect class="ui-s" data-t="lo" width="10" height="10" rx="1.4"/><circle class="ui-s" cx="5" cy="5" r="2.6"/><circle class="ui-f" data-t="hi" cx="5" cy="5" r=".9"/>`) +
    lamp(WALL.x + 5, WALL.y + 8, WALL.h, 1.8, "in");

  // ── The tray of pending jobs ───────────────────────────────────────────
  const token = (i, { lit = false, part } = {}) =>
    `<g${part ? ` data-part="${part}"` : ""}>${slab({ x: TRAY.x + 5 + i * 9.4, y: TRAY.y + 4, w: 5.6, d: 14, r: 0.7 }, 2, 12, "hi", { steps: 2, bevel: 0.3, crease: "lo", lit })}${L(
      k.segment([TRAY.x + 10.6 + i * 9.4, TRAY.y + 7, 10], [TRAY.x + 10.6 + i * 9.4, TRAY.y + 14, 10], P),
      { tone: lit ? "lit" : "lo", fine: true },
    )}</g>`;
  const tray = ({ live = true, queued = false } = {}) => {
    const out = [slab({ ...TRAY, d: 3 }, 0, TRAY.h, "mid", { steps: 2, bevel: 0.4 })];
    out.push(slab({ ...TRAY, y: TRAY.y + 3, d: TRAY.d - 6 }, 0, 2, "lo", { steps: 2, bevel: 0 }));
    out.push(token(0), token(1));
    out.push(live ? `<g data-part="job">${token(2, { lit: true })}</g>` : queued ? token(2, { lit: true }) : "");
    out.push(slab({ ...TRAY, y: TRAY.y + TRAY.d - 3, d: 3 }, 0, TRAY.h, "mid", { steps: 2, bevel: 0.4 }));
    out.push(slab({ x: TRAY.x + TRAY.w - 8, y: TRAY.y, w: 8, d: TRAY.d, r: 1.4 }, 0, 7, "mid", { steps: 3, bevel: 0.4 }));
    out.push(lamp(TRAY.x + TRAY.w - 4, TRAY.y + TRAY.d / 2, 7, 1.8, "queue", queued));
    return out.join("");
  };

  // ── The three systems the cords go to ──────────────────────────────────
  const erp = () => platters(ERP.x, ERP.y, ERP.r, 0, { count: 3, h: 6.4, part: "sys-0" });
  const crm = () => {
    const out = [slab(CRM, 0, CRM.h, "mid", { steps: 3, bevel: 0.5, seam: 2.5 })];
    for (let i = 0; i < 5; i++) out.push(slab({ x: CRM.x + 3 + i * 4, y: CRM.y + 3, w: 1.2, d: 14, r: 0.3 }, CRM.h, i === 2 ? 9.4 : 6.6, "hi", { steps: 1, bevel: 0, crease: "lo" }));
    out.push(`<g data-part="sys-1" class="veo-lamp">${cyl(CRM.x + 20, CRM.y + 16, 1.8, CRM.h, 1.6, "hi", { steps: 16, crease: "lo" })}</g>`);
    return out.join("");
  };
  const mail = () => {
    const out = [slab(MAIL, 0, MAIL.h, "mid", { steps: 3, bevel: 0.5, seam: 2.5 })];
    const env = { x: MAIL.x + 3, y: MAIL.y + 3, w: 18, d: 12, r: 1 };
    out.push(slab(env, MAIL.h, 1.4, "hi", { steps: 2, bevel: 0.3, crease: "lo" }));
    out.push(L(k.onTop([[env.x, env.y], [env.x + 9, env.y + 6.4], [env.x + 18, env.y]], MAIL.h + 1.42, P), { tone: "hi" }));
    out.push(`<g data-part="sys-2" class="veo-lamp">${cyl(MAIL.x + 20, MAIL.y + 17.4, 1.8, MAIL.h, 1.6, "hi", { steps: 16, crease: "lo" })}</g>`);
    return out.join("");
  };

  const body = [
    base(PLATE),
    wire(LINE_IN.slice(0, 5), "line-in"),
    wall(),
    erp(),
    board(),
    wire(LINE_IN.slice(4), "line-in-b"),
    wire(LINE_QUEUE, "line-queue"),
    plugs(),
    ...CORDS.map((points, i) => wire(points, `cord-${i}`)),
    crm(),
    tray(),
    mail(),
    label({ x: -30, y: 40, w: 56, d: 11, r: 1 }, "MENSAJES · COLA"),
    `<g data-part="beads">${[0, 1].map((i) => `<g data-bead="${i}" opacity="0"><circle class="veo-bead" r="2.3"/></g>`).join("")}</g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const stub = (points, on = true) => wire(points, "", on);
  const parts = {
    panel: part([shadow({ x: BOARD.x, y: BOARD.y + 4, w: BOARD.w, d: 30, r: 3 }), board({ hooks: false }), plugs()], k.boxCorners({ ...BOARD, d: 32 }, 0, BOARD.h + 4), 14),
    inbound: part(
      [shadow({ x: WALL.x, y: -30, w: 44, d: 26, r: 3 }), stub([LINE_IN[0], LINE_IN[1], [-106, -8, 0.9], [-88, -8, 0.9]]), wall().replace('data-part="in" class="veo-lamp"', 'class="veo-lamp" data-on=""'), cyl(-86, -8, 2.6, 0, 3, "hi", { steps: 16, crease: "lo" })],
      k.boxCorners({ x: WALL.x, y: -30, w: 40, d: 26 }, 0, WALL.h + 4),
      20,
    ),
    systems: part(
      [shadow({ x: 40, y: -38, w: 66, d: 76, r: 4 }), stub([[40, -30, 0.9], [52.4, -30, 0.9]], false), erp(), stub([[70, 2, 0.9], [84, 2, 0.9]]), crm().replace('data-part="sys-1" class="veo-lamp"', 'class="veo-lamp" data-on=""'), stub([[42, 32, 0.9], [54, 32, 0.9]], false), mail()],
      k.boxCorners({ x: 40, y: -42, w: 68, d: 84 }, 0, 24),
    ),
    queue: part([shadow(TRAY), tray({ live: false })], k.boxCorners(TRAY, 0, 15), 20),
    detail: part([shadow(TRAY), stub([[-84, -3, 0.9], [-84, TRAY.y, 0.9], [-84, TRAY.y, 3]]), tray({ live: false, queued: true })], k.boxCorners({ ...TRAY, y: -4, d: TRAY.d + 14 }, 0, 15), 18),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("switchboard", {
  width: W,
  height: H,
  label:
    "Una centralita sobre una placa: un cuadro de clavijas sobre una mesa con tres conectores, de los que salen tres cables hacia tres sistemas —una base de datos, un fichero de clientes y una bandeja de correo—. Por la izquierda entra la línea de mensajes; delante, una bandeja guarda los trabajos pendientes. Cada mensaje se comprueba en el cuadro y sale por el cable de su sistema, o espera turno en la bandeja.",
  body: full.body,
  motion: { P, lineIn: flat(LINE_IN), lineQueue: flat(LINE_QUEUE), cords: CORDS.map(flat) },
  thumb: small.body.join("").replace('data-part="queue" class="veo-lamp"', 'class="veo-lamp" data-on=""'),
  parts: full.parts,
});
