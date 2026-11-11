// Next.js: a terraced model of an application. The public level has a storefront
// anyone can reach; the private level sits above it behind a gate; and everything
// stands on a technical base with the server and the data. A riser carries each
// request down to the base and its answer back up.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const PODIUM = { x: -100, y: -46, w: 196, d: 92, r: 5 };
const PUB = { x: -92, y: -42, w: 128, d: 66, r: 4 };
const PRIV = { x: -86, y: -38, w: 72, d: 36, r: 3 };
const Z0 = 7; // top of the base
const Z1 = 22; // public level
const Z2 = 40; // private level
const SHOW = { x: -6, y: -38, w: 38, d: 5, r: 1.6, h: 28 };
const DESK = { x: -46, y: -34, w: 26, d: 14, r: 2, h: 10 };
const GATE = { x: -66, y: -7, w: 16, lift: 12 };
const SERVER = { x: 56, y: -38, w: 30, d: 20, r: 2, h: 32 };
const DB = { x: 71, y: 16, r: 12 };
// Where requests travel, in world points. A visitor walks; data rides the riser.
const WALK_IN = [
  [-30, 52, 0.5],
  [-30, 47, 4],
  [-30, 31.5, 12.5],
  [-30, 26.5, 17.5],
  [-30, 16, Z1 + 0.5],
];
const TO_SHOP = [[-30, 16, Z1 + 0.5], [13, 16, Z1 + 0.5], [13, -11, Z1 + 0.5]];
const TO_GATE = [[-30, 16, Z1 + 0.5], [-58, 16, Z1 + 0.5], [-58, 5.5, 28.5], [-58, 0.5, 34.5], [-58, -3.5, Z2 + 0.5]];
const TO_DESK = [[-58, -3.5, Z2 + 0.5], [-58, -14, Z2 + 0.5], [-33, -14, Z2 + 0.5], [-33, -19, Z2 + 0.5]];
const RISER_PRIV = [
  [-20, -27, Z2 + 0.9],
  [-14.4, -27, Z2 + 0.9],
  [-13.4, -27, Z1 + 0.9],
  [33, -27, Z1 + 0.9],
  [33, -10, Z1 + 0.9],
];
const RISER_PUB = [
  [28, -32.4, Z1 + 0.9],
  [33, -32.4, Z1 + 0.9],
  [33, -27, Z1 + 0.9],
];
const RISER_DOWN = [
  [33, -10, Z1 + 0.9],
  [36.6, -10, Z1 + 0.9],
  [37.4, -10, Z0 + 0.9],
  [62, -10, Z0 + 0.9],
  [62, -17.4, Z0 + 0.9],
];
const TO_DB = [
  [71, -17.4, Z0 + 0.9],
  [71, 4.6, Z0 + 0.9],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [PRIV.x, PRIV.y, 66], [SHOW.x + SHOW.w, SHOW.y, 54], [GATE.x, GATE.y, 68]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, D, slab, cyl, screws, base, lamp, faceY, faceX, screen, platters, cable, shadow, pick } = kitFor(P, { lod });
  const engraved = (x, y, z, text, size = 3) => faceY(x, y, z, `<text class="ui-t" font-size="${size}" letter-spacing=".3" opacity=".62">${text}</text>`);

  // ── The three levels ───────────────────────────────────────────────────
  const podium = (plan = PODIUM) => slab(plan, 0, Z0, "mid", { steps: 5, bevel: 0.7, seam: 2.5 });
  const pub = (plan = PUB) => slab(plan, Z0, Z1 - Z0, "mid", { steps: 5, bevel: 0.7, seam: Z0 + 4 }) + L(k.planOutline(k.insetPlan(plan, 3), Z1, P, 4), { tone: "faint" });
  const priv = (plan = PRIV) => slab(plan, Z1, Z2 - Z1, "mid", { steps: 4, bevel: 0.7, seam: Z1 + 4 }) + L(k.planOutline(k.insetPlan(plan, 3), Z2, P, 4), { tone: "faint" });
  const steps = (x, y0, z, w, rise, count) =>
    Array.from({ length: count }, (_, i) => slab({ x, y: y0 + i * 5, w, d: 5, r: 0.5 }, z, rise * (count - i), "mid", { steps: 1, bevel: 0.2 })).join("");

  // ── Private level: the account desk and the gate in front of it ────────
  const desk = ({ open = false, hooks = true } = {}) => {
    const hook = (name) => (hooks ? ` data-part="${name}"` : "");
    return (
      slab(DESK, Z2, DESK.h, "mid", { steps: 3, bevel: 0.5, seam: Z2 + 3 }) +
      faceY(
        DESK.x + 2,
        DESK.y + DESK.d,
        Z2 + DESK.h - 1.4,
        screen(
          22,
          7.4,
          `<g${hook("acct")} opacity="${open ? 1 : 0.14}"><circle class="scr-f" data-t="acc" cx="3.6" cy="3.7" r="2"/><path class="scr-s" data-t="hi" d="M8 2.6h11"/><path class="scr-s" d="M8 5h7"/></g>`,
          1,
        ),
      ) +
      screws(k.corners(DESK, 2.6), Z2 + DESK.h, 0.7, 0.38).join("")
    );
  };
  const gate = ({ lift = 0, ok = false, hooks = true } = {}) => {
    const out = [];
    const post = (x) => cyl(x, GATE.y + 1, 2.6, Z2, 1, "lo", { steps: 16 }) + cyl(x, GATE.y + 1, 1.7, Z2 + 1, 22, "mid", { steps: 14, crease: "none" });
    out.push(post(GATE.x - 2));
    const panel = { x: GATE.x, y: GATE.y, w: GATE.w, d: 2, r: 0.5 };
    const bars = [3, 6.5, 10, 13].map((u) => k.segment([GATE.x + u, GATE.y + 2, Z2 + 1.5 + lift], [GATE.x + u, GATE.y + 2, Z2 + 9 + lift], P)).join("");
    out.push(`<g${hooks ? ' data-part="gate"' : ""}>${slab(panel, Z2 + lift, 10.5, "hi", { steps: 1, bevel: 0.2, crease: "lo", lit: true })}${L(bars, { tone: "lit" })}</g>`);
    out.push(post(GATE.x + GATE.w + 2));
    out.push(slab({ x: GATE.x - 4.4, y: GATE.y - 1, w: GATE.w + 8.8, d: 4, r: 0.8 }, Z2 + 23, 2.2, "mid", { steps: 2, bevel: 0.3 }));
    // The reader that checks the session, with its lamp.
    out.push(slab({ x: GATE.x + GATE.w + 6, y: GATE.y - 2, w: 6, d: 6, r: 1 }, Z2, 8, "mid", { steps: 2, bevel: 0.3, seam: Z2 + 2.5 }));
    out.push(`<g data-part="lock" class="veo-lamp"${ok ? ' data-on="" data-tone="ok"' : ""}>${cyl(GATE.x + GATE.w + 9, GATE.y + 1, 1.9, Z2 + 8, 1.6, "hi", { steps: 16, crease: "lo" })}</g>`);
    return out.join("");
  };

  // ── Public level: the storefront ───────────────────────────────────────
  const shop = ({ hooks = true } = {}) => {
    const sw = SHOW.w - 6;
    const tiles = Array.from(
      { length: 6 },
      (_, i) =>
        `<g${hooks ? ` data-tile="${i}"` : ""}><rect class="scr-f" data-t="mid" x="${2.4 + (i % 3) * 9.4}" y="${6.4 + Math.floor(i / 3) * 8.2}" width="8" height="5" rx=".8"/>` +
        `<path class="scr-s" data-t="${i === 1 ? "acc" : "hi"}" d="M${2.6 + (i % 3) * 9.4} ${12.6 + Math.floor(i / 3) * 8.2}h${i === 1 ? 5 : 3.6}"/></g>`,
    ).join("");
    return (
      slab(SHOW, Z1, SHOW.h, "hi", { steps: 3, bevel: 0.5, crease: "lo" }) +
      faceY(SHOW.x + 3, SHOW.y + SHOW.d, Z1 + SHOW.h - 2.4, screen(sw, 23, `<path class="scr-s" data-t="dim" d="M0 4.4h${sw}"/><circle class="scr-f" data-t="acc" cx="2.6" cy="2.2" r=".9"/>${pick(`<rect class="scr-f" data-t="mid" x="6" y="1.2" width="12" height="2" rx=".8"/>`)}${tiles}`, 1.4)) +
      slab({ x: SHOW.x - 2, y: SHOW.y - 1, w: SHOW.w + 4, d: 14, r: 1.2 }, Z1 + SHOW.h, 2, "mid", { steps: 2, bevel: 0.4 }) +
      // A plinth with three products, in front of the window.
      slab({ x: 0, y: -24, w: 26, d: 8, r: 1 }, Z1, 3, "mid", { steps: 2, bevel: 0.3 }) +
      [0, 1, 2].map((i) => slab({ x: 2.5 + i * 8, y: -22.5, w: 5, d: 5, r: 0.8 }, Z1 + 3, [5, 3.4, 4.2][i], "hi", { steps: 2, bevel: 0.3, crease: "lo" })).join("")
    );
  };
  const junction = (on = false) =>
    slab({ x: 30, y: -13, w: 6, d: 6, r: 1 }, Z1, 3, "mid", { steps: 2, bevel: 0.3 }) +
    `<g data-part="pub" class="veo-lamp"${on ? ' data-on=""' : ""}>${cyl(33, -10, 1.6, Z1 + 3, 1.4, "hi", { steps: 14, crease: "lo" })}</g>`;

  // ── The base: server and data ──────────────────────────────────────────
  const server = (on = false) => {
    const face = SERVER.y + SERVER.d;
    const slots = [0, 1, 2, 3].map((i) => `<rect class="ui-s" data-t="lo" x="2" y="${3 + i * 6.4}" width="${SERVER.w - 8}" height="4.4" rx=".8"/><path class="ui-s" data-t="lo" d="M4.6 ${5.2 + i * 6.4}h10"/><circle class="ui-f" data-t="${i === 1 ? "acc" : "hi"}" cx="${SERVER.w - 9}" cy="${5.2 + i * 6.4}" r=".8"/>`).join("");
    return (
      slab(SERVER, Z0, SERVER.h, "mid", { steps: 4, bevel: 0.6, seam: Z0 + 3 }) +
      faceY(SERVER.x + 2, face, Z0 + SERVER.h - 2, pick(slots, `<rect class="ui-s" data-t="lo" x="2" y="3" width="${SERVER.w - 8}" height="24" rx=".8"/>`)) +
      screws(k.corners(SERVER, 3), Z0 + SERVER.h, 0.8, 0.4).join("") +
      lamp(SERVER.x + 8, SERVER.y + 8, Z0 + SERVER.h, 1.8, "srv", on)
    );
  };
  const data = () => platters(DB.x, DB.y, DB.r, Z0, { count: 3, h: 6, part: "db" });

  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);

  const body = [
    base(PLATE),
    podium(),
    engraved(-94, PODIUM.y + PODIUM.d, Z0 - 1.6, "SERVIDOR · DATOS", 2.6),
    pub(),
    engraved(-86, PUB.y + PUB.d, Z1 - 3, "PÚBLICO", 3.4),
    priv(),
    engraved(-48, PRIV.y + PRIV.d, Z2 - 3, "PRIVADO", 3.4),
    desk(),
    wire(RISER_PRIV.slice(0, 2), "riser-a"),
    gate(),
    wire(RISER_PRIV.slice(1), "riser-b"),
    steps(-66, -2, Z1, 16, 6, 2),
    shop(),
    wire(RISER_PUB, "riser-pub"),
    junction(),
    steps(-40, 24, Z0, 20, 5, 2),
    wire(RISER_DOWN, "riser-c"),
    server(),
    wire(TO_DB, "to-db"),
    data(),
    slab({ x: -40, y: 46, w: 20, d: 4, r: 0.5 }, 0, 3.5, "mid", { steps: 1, bevel: 0.2 }),
    `<g data-part="beads">${[0, 1].map((i) => `<g data-bead="${i}" opacity="0"><circle class="veo-bead" r="${i ? 1.9 : 2.5}"${i ? ' data-dim=""' : ""}/></g>`).join("")}</g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  // Small cut-outs of the model, each standing on the piece of floor it needs.
  const cut = (plan, z0, z1, tone = "mid") => slab(plan, z0, z1 - z0, tone, { steps: 3, bevel: 0.5 });
  const pubFloor = { x: -12, y: -42, w: 48, d: 38, r: 3 };
  const privFloor = { x: -84, y: -38, w: 60, d: 36, r: 3 };
  const baseFloor = { x: 48, y: -44, w: 46, d: 76, r: 3 };
  const riserFloors = [{ x: -40, y: -22, w: 100, d: 26, r: 3 }, { x: -40, y: -22, w: 76.6, d: 26, r: 3 }, { x: -40, y: -22, w: 26, d: 26, r: 3 }];
  const riserRun = [[-34, -10, Z2 + 0.9], [-14.4, -10, Z2 + 0.9], [-13.4, -10, Z1 + 0.9], [33, -10, Z1 + 0.9]];
  const parts = {
    public: part([shadow(pubFloor, Z0), cut(pubFloor, Z0, Z1), shop({ hooks: false }), wire(RISER_PUB, "", true), junction(true)], [...k.boxCorners(pubFloor, Z0, Z1), [SHOW.x, SHOW.y, Z1 + SHOW.h + 3]]),
    gate: part([shadow(privFloor, Z1), cut(privFloor, Z1, Z2), desk({ hooks: false }), gate({ hooks: false }), steps(-66, -2, Z1, 16, 6, 2)], [...k.boxCorners({ ...privFloor, d: 46 }, Z1, Z2), [GATE.x, GATE.y, Z2 + 26]]),
    base: part([shadow(baseFloor), cut(baseFloor, 0, Z0), server(true), wire(TO_DB, "", true), data()], [...k.boxCorners(baseFloor, 0, Z0), [SERVER.x, SERVER.y, Z0 + SERVER.h + 3]]),
    riser: part(
      [shadow(riserFloors[0]), cut(riserFloors[0], 0, Z0), cut(riserFloors[1], Z0, Z1), cut(riserFloors[2], Z1, Z2), wire(riserRun, "", true), junction(true), wire(RISER_DOWN.slice(0, 4), "", true)],
      k.boxCorners(riserFloors[0], 0, Z2 + 2),
    ),
    detail: part([shadow(privFloor, Z1), cut(privFloor, Z1, Z2), desk({ open: true, hooks: false }), gate({ lift: GATE.lift, ok: true, hooks: false }), steps(-66, -2, Z1, 16, 6, 2)], [...k.boxCorners({ ...privFloor, d: 46 }, Z1, Z2), [GATE.x, GATE.y, Z2 + 26]]),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("storeys", {
  width: W,
  height: H,
  label:
    "Una maqueta en terrazas sobre una placa: una base técnica con el servidor y la base de datos; encima, el nivel público con un escaparate; y más arriba, el nivel privado, al que se llega por una escalera cerrada por una compuerta con su lector. Un montante baja de cada nivel a la base: la petición pública se sirve desde el escaparate y la privada no pasa la compuerta hasta que el lector comprueba la sesión.",
  body: full.body,
  motion: {
    P,
    lift: GATE.lift,
    walkIn: flat(WALK_IN),
    toShop: flat(TO_SHOP),
    toGate: flat(TO_GATE),
    toDesk: flat(TO_DESK),
    pubData: flat([...RISER_PUB, RISER_PRIV[4], ...RISER_DOWN.slice(1), TO_DB[0], TO_DB[1]]),
    privData: flat([...RISER_PRIV, ...RISER_DOWN.slice(1), TO_DB[0], TO_DB[1]]),
  },
  thumb: small.body,
  parts: full.parts,
});
