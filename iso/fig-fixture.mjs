// Swift: a test bench for one device. The phone lies in a cradle and three probes
// try what only the device can do: a lens over it for the camera, a coil for NFC and a
// ring that reads a face. What the app saves travels on to the rest of the family, a
// tablet and a watch, and a press at the front signs the build before it goes out.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const CRADLE = { x: -76, y: -36, w: 46, d: 72, r: 9, h: 5 };
const PHONE = { x: -71, y: -31, w: 36, d: 62 };
const SCREEN_Z = CRADLE.h + 3.42;
const POST = { x: -92, y: -22 };
const ARM = { x: -95, y: -26, w: 46, d: 8, r: 2, z: 31, h: 4 };
const LENS = { x: -53, y: -22 };
const NFC = { x: -22, y: -37, w: 22, d: 20, r: 3, h: 3 };
const FACE = { x: -4, y: 26 };
const TABLET = { x: 30, y: -42, w: 52, d: 3.4, r: 1.4, z: 8, h: 37 };
const WATCH = { x: 104, y: -24, r: 9 };
const PRESS = { x: 44, y: 10, w: 42, d: 30, r: 3, h: 4 };
const STAMP = { x: 60, y: 24, rest: 16, down: 7.6 };
const BUILD = { x: 50, y: 15, w: 20, d: 18, r: 1.6 };

const NFC_LINE = [
  [NFC.x, -27, 2],
  [NFC.x - 2, -27, 0.9],
  [CRADLE.x + CRADLE.w, -27, 0.9],
  [CRADLE.x + CRADLE.w, -27, 3],
];
const FACE_LINE = [
  [FACE.x - 6, FACE.y, 2],
  [FACE.x - 9, FACE.y, 0.9],
  [CRADLE.x + CRADLE.w, FACE.y, 0.9],
  [CRADLE.x + CRADLE.w, FACE.y, 3],
];
const SYNC = [
  [CRADLE.x + CRADLE.w, -8, 3],
  [CRADLE.x + CRADLE.w + 2, -8, 0.9],
  [12, -8, 0.9],
  [12, -27, 0.9],
  [50, -27, 0.9],
  [50, -34, 0.9],
  [50, -34, 2],
];
const SYNC_WATCH = [
  [68, -38, 1.6],
  [70, -38, 0.9],
  [86, -38, 0.9],
  [86, WATCH.y, 0.9],
  [WATCH.x - WATCH.r, WATCH.y, 0.9],
  [WATCH.x - WATCH.r, WATCH.y, 2.4],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [TABLET.x, TABLET.y, 50], [POST.x, POST.y, 40]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, D, slab, cyl, screws, base, label, ruler, lamp, top, faceY, screen, cable, shadow, pick, thumb, handsetFlat } = kitFor(P, { lod });
  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);
  const bulb = (x, y, z, r, part, on = false, ok = false) => {
    const svg = lamp(x, y, z, r, part, on);
    return ok ? svg.replace('class="veo-lamp"', 'class="veo-lamp" data-tone="ok"') : svg;
  };

  // ── The phone in its cradle. What each probe finds shows on the report ─
  const gw = PHONE.w - 2.6;
  const ui = ({ hooks = true, done = false } = {}) => {
    const show = (name, svg) => (hooks ? `<g data-part="${name}" opacity="0">${svg}</g>` : done ? svg : "");
    const out = [pick(`<text class="scr-t" data-t="dim" x="3" y="5.6" font-size="2.4">9:41</text>`)];
    out.push(`<text class="scr-t" x="3" y="12.6" font-size="3.4" font-weight="600">Inspección 27</text>`);
    // The photo the camera attaches.
    out.push(`<rect class="scr-s" data-t="dim" x="3" y="16" width="15" height="11.6" rx="1.4"/>`, pick(`<path class="scr-s" data-t="dim" d="M21 19h9M21 22.4h7M21 25.8h9.4"/>`));
    out.push(show("photo", `<rect class="scr-f" data-t="mid" x="3" y="16" width="15" height="11.6" rx="1.4"/><path class="scr-s" data-t="hi" d="M4.6 25.6l3.6-4.4 2.6 2.8 1.8-1.7 3.6 3.3"/><circle class="scr-f" data-t="acc" cx="14.2" cy="19.2" r="1.2"/>`));
    // Two rows: the tag read over NFC and the signature the face unlocks.
    [31, 39.6].forEach((y, i) => {
      out.push(`<rect class="scr-f" x="3" y="${y}" width="${gw - 6}" height="6.6" rx="1.8"/>`, `<path class="scr-s" data-t="hi" d="M6 ${y + 3.3}h${i ? 9 : 12}"/>`);
      out.push(show(i ? "face" : "tag", `<circle class="scr-f" data-t="acc" cx="${gw - 6.6}" cy="${y + 3.3}" r="1.7"/>`));
    });
    out.push(`<rect class="scr-f" data-t="hi" x="3" y="50" width="${gw - 6}" height="5.8" rx="2.9"/>`);
    return out.join("");
  };
  const cradle = (opts) => {
    const out = [slab(CRADLE, 0, CRADLE.h, "mid", { steps: 6, bevel: 0.8, seam: 2 })];
    out.push(...screws(k.corners(CRADLE, 3.2), CRADLE.h, 0.9, 0.4));
    out.push(handsetFlat(PHONE, CRADLE.h, ui(opts)));
    out.push(slab({ x: PHONE.x + PHONE.w - 0.4, y: PHONE.y + 16, w: 1, d: 9, r: 0.4 }, CRADLE.h + 1.2, 1.4, "mid", { steps: 1, bevel: 0 }));
    return out.join("");
  };

  // ── The camera probe: a post, an arm and a lens looking down ───────────
  const post = () => cyl(POST.x, POST.y, 5.6, 0, 3, "lo", { steps: 24 }) + cyl(POST.x, POST.y, 2.8, 3, ARM.z - 1, "mid", { steps: 16, crease: "none" });
  const lens = ({ hooks = true, on = false } = {}) =>
    cyl(LENS.x, LENS.y, 3.6, 19, ARM.z - 19, "mid", { steps: 22, crease: "lo" }) +
    cyl(LENS.x, LENS.y, 4.6, 16.6, 2.4, "hi", { steps: 24, crease: "lo" }) +
    `<g${hooks ? ' data-part="cam"' : ""} class="veo-lamp"${on ? ' data-on=""' : ""}>${cyl(LENS.x, LENS.y, 3, 15.4, 1.2, "hi", { steps: 20, crease: "lo" })}</g>` +
    slab(ARM, ARM.z, ARM.h, "mid", { steps: 3, bevel: 0.5, seam: ARM.z + 2 }) +
    screws([[POST.x, POST.y]], ARM.z + ARM.h, 1.2, 0.45).join("") +
    cyl(LENS.x, LENS.y, 2.6, ARM.z + ARM.h, 1.4, "mid", { steps: 18 });

  // ── The NFC probe: a coil in a pad, with a tag on it ───────────────────
  const nfc = ({ hooks = true, on = false } = {}) => {
    const out = [slab(NFC, 0, NFC.h, "mid", { steps: 4, bevel: 0.5, seam: 1.2 })];
    const [cx, cy] = [NFC.x + 9.4, NFC.y + 10];
    const rings = [3, 5, 7].map((r) => k.ring(cx, cy, r, NFC.h, P, 28)).join("");
    out.push(`<g${hooks ? ' data-part="coil"' : ""} class="veo-trace"${on ? ' data-on=""' : ""}>${L(rings, { tone: "mid" })}</g>`);
    out.push(slab({ x: cx - 3.4, y: cy - 4.6, w: 6.8, d: 9.2, r: 1 }, NFC.h, 0.8, "hi", { steps: 2, bevel: 0.2, crease: "lo" }));
    out.push(bulb(NFC.x + NFC.w - 3.6, NFC.y + NFC.d - 3.6, NFC.h, 1.6, hooks ? "nfc" : "", on));
    return out.join("");
  };

  // ── The face probe: a ring on a post, with the points it measures ──────
  const face = ({ hooks = true, on = false } = {}) => {
    const out = [cyl(FACE.x, FACE.y, 5.4, 0, 2.4, "mid", { steps: 24, bevel: 0.3 }), cyl(FACE.x, FACE.y, 1.5, 2.4, 6, "mid", { steps: 10, crease: "none" })];
    const centre = [FACE.x, FACE.y, 15.4];
    out.push(`<g${hooks ? ' data-part="ring"' : ""} class="veo-trace"${on ? ' data-on=""' : ""}>${L(k.sideRing(centre, 7.2, "y", P, 32) + k.sideRing(centre, 5.6, "y", P, 28), { tone: "hi" })}</g>`);
    const dots = [
      [-2.6, 2.2],
      [2.6, 2.2],
      [0, -0.4],
      [-2.2, -3],
      [2.2, -3],
      [0, 4.6],
    ].map(([dx, dz]) => at([FACE.x + dx * 0.85, FACE.y, 15.4 + dz * 0.85]));
    out.push(D(dots, { size: 0.55, tone: "hi" }));
    out.push(bulb(FACE.x + 10, FACE.y + 2, 0, 1.6, hooks ? "bio" : "", on));
    return out.join("");
  };

  // ── The family: a tablet on its stand and a watch on its puck ──────────
  const tablet = ({ hooks = true, done = false } = {}) => {
    const cx = TABLET.x + TABLET.w / 2;
    const out = [slab({ x: cx - 13, y: TABLET.y - 4, w: 26, d: 12, r: 2.4 }, 0, 2, "mid", { steps: 4, bevel: 0.4 })];
    out.push(cyl(cx, TABLET.y + 1.7, 2, 2, TABLET.z - 2, "mid", { steps: 12, crease: "none" }));
    out.push(slab(TABLET, TABLET.z, TABLET.h, "hi", { steps: 3, bevel: 0.5, crease: "lo" }));
    const sw = TABLET.w - 3.4;
    const sh = TABLET.h - 3.4;
    const fresh = `<rect class="scr-f" data-t="acc" x="2.4" y="21.4" width="16" height="5.4" rx="1.4"/>`;
    out.push(
      faceY(
        TABLET.x + 1.7,
        TABLET.y + TABLET.d,
        TABLET.z + TABLET.h - 1.7,
        screen(
          sw,
          sh,
          `<path class="scr-s" data-t="dim" d="M21 0v${sh}"/>` +
            [0, 1].map((i) => `<rect class="scr-f" x="2.4" y="${7 + i * 7.2}" width="16" height="5.4" rx="1.4"/>`).join("") +
            (hooks ? `<g data-part="pad-new" opacity="0">${fresh}</g>` : done ? fresh : "") +
            `<rect class="scr-s" data-t="dim" x="24" y="7" width="13" height="10" rx="1.2"/>` +
            pick(`<path class="scr-s" data-t="dim" d="M24 20.6h20M24 24h14M24 27.4h18"/><path class="scr-s" data-t="hi" d="M2.4 3.8h9"/>`) +
            `<rect class="scr-f" data-t="mid" x="39.6" y="7" width="6.6" height="10" rx="1.2"/>`,
          2,
        ),
      ),
    );
    return out.join("");
  };
  const watch = ({ hooks = true, done = false } = {}) => {
    const { x, y, r } = WATCH;
    const out = [cyl(x, y, r, 0, 3, "mid", { steps: 30, bevel: 0.4 })];
    // The strap, lying to both sides, and the case on the puck.
    out.push(slab({ x: x - 4.2, y: y - 15, w: 8.4, d: 30, r: 2 }, 3, 1, "lo", { steps: 3, bevel: 0 }));
    const body = { x: x - 6, y: y - 7, w: 12, d: 14, r: 3.4 };
    out.push(slab(body, 3, 3.6, "hi", { steps: 6, bevel: 0.5, crease: "lo" }));
    const dot = `<circle class="scr-f" data-t="acc" cx="4.7" cy="5.7" r="1.6"/>`;
    out.push(top(body.x + 1.3, body.y + 1.3, 6.62, screen(9.4, 11.4, `<circle class="scr-s" data-t="dim" cx="4.7" cy="5.7" r="3"/>` + (hooks ? `<g data-part="watch-new" opacity="0">${dot}</g>` : done ? dot : ""), 2.4)));
    out.push(cyl(x + 6.6, y - 2, 0.9, 4, 1.6, "mid", { steps: 8, crease: "none" }));
    return out.join("");
  };

  // ── The press that signs the build ─────────────────────────────────────
  const press = ({ hooks = true, signed = false } = {}) => {
    const out = [slab(PRESS, 0, PRESS.h, "mid", { steps: 5, bevel: 0.7, seam: 1.6 })];
    out.push(...screws([[PRESS.x + PRESS.w - 4, PRESS.y + 4], [PRESS.x + PRESS.w - 4, PRESS.y + PRESS.d - 4]], PRESS.h, 0.9, 0.4));
    // The build: a flat sealed pack, and the mark the stamp leaves on it.
    out.push(slab(BUILD, PRESS.h, 3.4, "hi", { steps: 3, bevel: 0.4, crease: "lo" }));
    const mark = L(k.ring(STAMP.x, STAMP.y, 4.4, PRESS.h + 3.42, P, 24) + k.ring(STAMP.x, STAMP.y, 2.6, PRESS.h + 3.42, P, 18), { tone: "lit" });
    out.push(hooks ? `<g data-part="mark" opacity="0">${mark}</g>` : signed ? mark : "");
    // Column, arm and the stamp that comes down.
    const col = { x: PRESS.x + PRESS.w - 9, y: PRESS.y + 14 };
    out.push(cyl(col.x, col.y, 3.4, PRESS.h, 28, "mid", { steps: 18, crease: "none" }));
    const head =
      cyl(STAMP.x, STAMP.y, 1.5, STAMP.rest + 4, 30 - STAMP.rest - 4 + PRESS.h, "hi", { steps: 10, crease: "none" }) +
      cyl(STAMP.x, STAMP.y, 5.2, STAMP.rest, 4, "mid", { steps: 24, bevel: 0.4 }) +
      L(k.sideArc(STAMP.x, STAMP.y, 5.2, STAMP.rest + 2, P, 18), { tone: "faint" });
    out.push(hooks ? `<g data-part="stamp">${head}</g>` : `<g transform="${k.translateAlong(P, [0, 0, signed ? 3 : 0])}">${head}</g>`);
    out.push(slab({ x: STAMP.x - 5, y: col.y - 4, w: col.x - STAMP.x + 9, d: 8, r: 2 }, PRESS.h + 28, 4, "mid", { steps: 3, bevel: 0.5, seam: PRESS.h + 30 }));
    out.push(cyl(STAMP.x, STAMP.y, 2.4, PRESS.h + 32, 1.4, "mid", { steps: 16 }));
    out.push(bulb(PRESS.x + 5.4, PRESS.y + PRESS.d - 5.4, PRESS.h, 1.8, hooks ? "signed" : "", signed, true));
    return out.join("");
  };

  const body = [
    base(PLATE),
    post(),
    wire(SYNC, "sync"),
    tablet(),
    wire(NFC_LINE, "nfc-line"),
    nfc(),
    cradle(),
    lens(),
    wire(FACE_LINE, "face-line"),
    face(),
    wire(SYNC_WATCH, "sync-watch"),
    watch(),
    press(),
    ruler({ x: -120, y: 43, w: 62, d: 6, r: 1 }),
    label({ x: -40, y: 40, w: 64, d: 11, r: 1 }, "CÁMARA · NFC · BIOMETRÍA"),
    `<g data-part="beads">${[0, 1].map((i) => `<g data-bead="${i}" opacity="0"><circle class="veo-bead" r="2.3"/></g>`).join("")}</g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const stub = (points, on = true) => wire(points, "", on);
  const still = { hooks: false, done: true };
  const parts = {
    phone: part([shadow({ ...CRADLE, r: 10 }), cradle(still)], k.boxCorners(CRADLE, 0, 10), 16),
    probes: part(
      [
        shadow({ x: NFC.x - 2, y: NFC.y, w: 30, d: 44, r: 5 }),
        stub([NFC_LINE[0], NFC_LINE[1], [NFC.x - 8, -27, 0.9]]),
        nfc({ hooks: false, on: true }),
        `<g transform="${k.translateAlong(P, [-4, -22, 0])}">${stub([FACE_LINE[0], FACE_LINE[1], [FACE.x - 16, FACE.y, 0.9]])}${face({ hooks: false, on: true })}</g>`,
      ],
      [...k.boxCorners({ x: NFC.x - 8, y: NFC.y, w: 36, d: 48 }, 0, 4), [FACE.x - 4, FACE.y - 22, 24]],
      16,
    ),
    family: part(
      [shadow({ x: TABLET.x + 8, y: TABLET.y - 4, w: 84, d: 30, r: 5 }), tablet(still), stub(SYNC_WATCH), watch(still)],
      [...k.boxCorners({ x: TABLET.x, y: TABLET.y - 4, w: 86, d: 34 }, 0, 4), [TABLET.x, TABLET.y, TABLET.z + TABLET.h], [TABLET.x + TABLET.w, TABLET.y, TABLET.z + TABLET.h]],
      14,
    ),
    seal: part([shadow({ ...PRESS, r: 4 }), press({ hooks: false, signed: true })], k.boxCorners(PRESS, 0, PRESS.h + 34), 14),
    detail: part(
      [
        shadow({ x: POST.x - 6, y: CRADLE.y, w: 100, d: 72, r: 10 }),
        post(),
        stub(NFC_LINE),
        nfc({ hooks: false, on: true }),
        cradle(still),
        lens({ hooks: false, on: true }),
        stub(FACE_LINE),
        face({ hooks: false, on: true }),
      ],
      [...k.boxCorners({ x: POST.x - 6, y: CRADLE.y, w: 100, d: 72 }, 0, 6), [POST.x, POST.y, ARM.z + ARM.h + 2]],
      12,
    ),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("fixture", {
  width: W,
  height: H,
  label:
    "Un banco de pruebas sobre una placa: un teléfono tumbado en su cuna, con tres sondas alrededor: una lente sobre un brazo, que prueba la cámara; una bobina con una etiqueta, que prueba el NFC; y un aro sobre un pie, que lee el rostro. Lo que la app guarda viaja por un cable a una tableta sobre su soporte y a un reloj en su base de carga. Delante, una prensa sella la compilación antes de publicarla.",
  body: full.body,
  motion: { P, nfc: flat(NFC_LINE), face: flat(FACE_LINE), sync: flat(SYNC), watch: flat(SYNC_WATCH), press: STAMP.rest - STAMP.down },
  thumb: small.body
    .join("")
    .replace(/<g data-part="(photo|tag|face|pad-new|watch-new)" opacity="0">/g, "<g>")
    .replace('data-part="cam" class="veo-lamp"', 'class="veo-lamp" data-on=""')
    .replace('data-part="sync"', 'data-on=""')
    .replace('data-part="sync-watch"', 'data-on=""'),
  parts: full.parts,
});
