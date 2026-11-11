// SQLite: the database that lives in the device, drawn as the cabinet a phone rests
// on. Each table is a drawer of index cards. Every change is first noted on the paper
// strip of a journal and then filed; a search pulls the right card out without leaving
// the device. To the right, the changes wait in a tray behind a barrier and cross to
// the office when the connection comes back. A lock on the side keeps it all shut.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const CAB = { x: -70, y: -30, w: 72, d: 40, r: 3, h: 22 };
const FACE = CAB.y + CAB.d;
const PHONE = { x: -62, y: -26, w: 56, d: 30 };
const DRAWERS = [-66, -44, -22];
const DRAWER = { w: 20, h: 15, z: 4, out: 17 };
const JOURNAL = { x: -114, y: -22, w: 26, d: 22, r: 3, h: 12 };
const STRIP = { x: -108, y: JOURNAL.y + JOURNAL.d, w: 14, d: 26 };
const LOCK = { x: 5, y: -24, w: 12, d: 16, r: 2, h: 15 };
const TRACK = { x: 22, y: -7, w: 68, d: 14, r: 1.5, h: 2 };
const GATE = { x: 56, y: 12, len: 24, z: 10 };
const DB = { x: 106, y: 0, r: 12 };
const QUEUE = [0, 1, 2].map((i) => [30 + i * 0.6, -3.6 + i * 0.5, TRACK.h + i * 1.3]);
const TRAVEL = 62;

const JOURNAL_LINE = [
  [JOURNAL.x + JOURNAL.w, -12, 3],
  [JOURNAL.x + JOURNAL.w + 2, -12, 0.9],
  [CAB.x - 1, -12, 0.9],
  [CAB.x, -12, 3],
];
const OUT_LINE = [
  [CAB.x + CAB.w, 3, 3],
  [CAB.x + CAB.w + 2, 3, 0.9],
  [TRACK.x, 3, 0.9],
  [TRACK.x, 3, 1.6],
];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [CAB.x, CAB.y, 36], [GATE.x, GATE.y, 38]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, D, slab, cyl, screws, base, label, lamp, faceY, faceX, platters, cable, shadow, pick, thumb, handsetFlat } = kitFor(P, { lod });
  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);
  const bulb = (x, y, z, r, part, on = false, ok = false) => {
    const svg = lamp(x, y, z, r, part, on);
    return ok ? svg.replace('class="veo-lamp"', 'class="veo-lamp" data-tone="ok"') : svg;
  };

  // ── The phone, lying on its database ───────────────────────────────────
  const gw = PHONE.w - 2.6;
  const gh = PHONE.d - 2.6;
  const ui = ({ hooks = true, saved = false } = {}) => {
    const out = [`<text class="scr-t" x="3" y="7.4" font-size="3.4" font-weight="600">Parte 0142</text>`];
    out.push(pick(`<path class="scr-s" data-t="dim" d="M3 10.6h16"/>`));
    [0, 1, 2].forEach((i) => out.push(`<rect class="scr-f" x="${3 + i * 16.4}" y="14" width="14.6" height="${gh - 17}" rx="1.6"/>`, pick(`<path class="scr-s" data-t="dim" d="M${5.4 + i * 16.4} 17.6h8M${5.4 + i * 16.4} 20.2h6"/>`)));
    const mark = `<rect class="scr-f" data-t="acc" x="${gw - 17}" y="3" width="14" height="5.4" rx="2.7"/>`;
    out.push(hooks ? `<g data-part="saved" opacity="0">${mark}</g>` : saved ? mark : "");
    const found = `<rect class="scr-s" data-t="acc" x="19.4" y="14" width="14.6" height="${gh - 17}" rx="1.6"/>`;
    out.push(hooks ? `<g data-part="found" opacity="0">${found}</g>` : "");
    return out.join("");
  };

  // ── The cabinet: three drawers, one table each ─────────────────────────
  const front = (x, name) =>
    `<g>${faceY(x, FACE, DRAWER.z + DRAWER.h, `<rect class="ui-s" data-t="mid" width="${DRAWER.w}" height="${DRAWER.h}" rx="1.2"/><rect class="ui-s" data-t="lo" x="3" y="2.4" width="14" height="3.8" rx=".6"/><text class="ui-t" x="10" y="5.3" font-size="2.2" text-anchor="middle" opacity=".75">${name}</text>`)}${slab(
      { x: x + 6, y: FACE, w: 8, d: 1.8, r: 0.7 },
      DRAWER.z + 4,
      1.8,
      "hi",
      { steps: 2, bevel: 0.3, crease: "lo" },
    )}</g>`;
  const cabinet = ({ hooks = true, saved = false, open = false } = {}) => {
    const out = [slab(CAB, 0, CAB.h, "mid", { steps: 5, bevel: 0.8, seam: 2 })];
    out.push(...screws([[CAB.x + 3.4, CAB.y + 3.4], [CAB.x + CAB.w - 3.4, CAB.y + 3.4], [CAB.x + CAB.w - 3.4, FACE - 3.4]], CAB.h, 0.9, 0.42));
    out.push(front(DRAWERS[0], "PARTES"), front(DRAWERS[2], "FOTOS"));
    // The middle drawer's front when it is shut; when it opens the page swaps it for the drawer itself.
    out.push(hooks ? `<g data-part="shut">${front(DRAWERS[1], "CLIENTES")}</g>` : open ? faceY(DRAWERS[1], FACE, DRAWER.z + DRAWER.h, `<rect class="ui-f" data-t="hi" width="${DRAWER.w}" height="${DRAWER.h}" rx="1.2"/>`) : front(DRAWERS[1], "CLIENTES"));
    out.push(handsetFlat(PHONE, CAB.h, ui({ hooks, saved }), { kind: "b" }));
    return out.join("");
  };

  // ── The open drawer: cards on edge, each with its tab ──────────────────
  const drawer = ({ hooks = true, hit = false } = {}) => {
    const x = DRAWERS[1];
    const out = [slab({ x: x + 0.6, y: FACE, w: DRAWER.w - 1.2, d: DRAWER.out, r: 0.8 }, DRAWER.z, 2, "lo", { steps: 2, bevel: 0 })];
    out.push(slab({ x: x + 0.6, y: FACE, w: 1.4, d: DRAWER.out, r: 0.4 }, DRAWER.z, DRAWER.h - 4, "mid", { steps: 1, bevel: 0.2 }));
    const count = thumb ? 4 : 6;
    for (let i = 0; i < count; i++) {
      const y = FACE + 1.6 + i * (thumb ? 3.4 : 2.3);
      const card = slab({ x: x + 2.6, y, w: DRAWER.w - 5.2, d: 1, r: 0.3 }, DRAWER.z + 2, 8.6, "hi", { steps: 1, bevel: 0, crease: "lo" }) + slab({ x: x + 3.6 + ((i * 4) % 9), y, w: 4, d: 1, r: 0.3 }, DRAWER.z + 10.6, 1.8, "hi", { steps: 1, bevel: 0, crease: "lo" });
      const found = i === (thumb ? 2 : 3);
      if (!found) out.push(card);
      else {
        const lit = slab({ x: x + 2.6, y, w: DRAWER.w - 5.2, d: 1, r: 0.3 }, DRAWER.z + 2, 8.6, "hi", { steps: 1, bevel: 0, crease: "lo", lit: true }) + slab({ x: x + 6.6, y, w: 4, d: 1, r: 0.3 }, DRAWER.z + 10.6, 1.8, "hi", { steps: 1, bevel: 0, crease: "lo", lit: true });
        out.push(hooks ? `<g data-part="hit">${lit}</g>` : hit ? `<g transform="${k.translateAlong(P, [0, 0, 4.6])}">${lit}</g>` : card);
      }
    }
    out.push(slab({ x: x + DRAWER.w - 2, y: FACE, w: 1.4, d: DRAWER.out, r: 0.4 }, DRAWER.z, DRAWER.h - 4, "mid", { steps: 1, bevel: 0.2 }));
    // Its front, at the end, with the handle.
    out.push(slab({ x, y: FACE + DRAWER.out, w: DRAWER.w, d: 1.6, r: 0.6 }, DRAWER.z, DRAWER.h, "hi", { steps: 2, bevel: 0.3, crease: "lo" }));
    out.push(faceY(x, FACE + DRAWER.out + 1.6, DRAWER.z + DRAWER.h, `<rect class="ui-s" data-t="lo" x="3" y="2.4" width="14" height="3.8" rx=".6"/><text class="ui-t" x="10" y="5.3" font-size="2.2" text-anchor="middle" opacity=".75">CLIENTES</text>`));
    out.push(slab({ x: x + 6, y: FACE + DRAWER.out + 1.6, w: 8, d: 1.8, r: 0.7 }, DRAWER.z + 4, 1.8, "hi", { steps: 2, bevel: 0.3, crease: "lo" }));
    return out.join("");
  };

  // ── The journal: every change is noted here before it counts as saved ──
  const journal = ({ hooks = true, on = false } = {}) => {
    const out = [slab(JOURNAL, 0, JOURNAL.h, "mid", { steps: 5, bevel: 0.7, seam: 4 })];
    out.push(cyl(JOURNAL.x + 13, JOURNAL.y + 8, 6.4, JOURNAL.h, 4.4, "hi", { steps: 26, bevel: 0.4, crease: "lo" }), cyl(JOURNAL.x + 13, JOURNAL.y + 8, 2, JOURNAL.h + 4.4, 1.2, "mid", { steps: 14 }));
    out.push(faceY(JOURNAL.x + 5, JOURNAL.y + JOURNAL.d, 4.4, `<rect class="ui-f" data-t="hi" width="16" height="1.8" rx=".9"/>`));
    out.push(bulb(JOURNAL.x + JOURNAL.w - 4.6, JOURNAL.y + JOURNAL.d - 4.6, JOURNAL.h, 1.7, hooks ? "noted" : "", on));
    // The strip, with one line per change.
    out.push(slab({ ...STRIP, r: 0.5 }, 0.2, 0.5, "hi", { steps: 1, bevel: 0, crease: "lo" }));
    const line = (i, len) => k.lineOnTop([STRIP.x + 2, STRIP.y + 3 + i * 3.2], [STRIP.x + 2 + len, STRIP.y + 3 + i * 3.2], 0.72, P);
    out.push(L([9, 7, 10, 6, 9].map((len, i) => line(i, len)).join(""), { tone: "mid", free: true, fine: true }));
    const entry = L(line(5, 10) + line(6, 7), { tone: "lit", free: true });
    out.push(hooks ? `<g data-part="entry" opacity="0">${entry}</g>` : on ? entry : "");
    return out.join("");
  };

  // ── The lock on the side, with its key ─────────────────────────────────
  const lock = ({ hooks = true, on = false } = {}) => {
    const out = [slab(LOCK, 0, LOCK.h, "hi", { steps: 4, bevel: 0.6, crease: "lo", seam: 4 })];
    out.push(faceY(LOCK.x + 2, LOCK.y + LOCK.d, 12.4, `<circle class="ui-s" data-t="hi" cx="4" cy="4" r="3.4"/><circle class="ui-f" data-t="hi" cx="4" cy="3.2" r="1.1"/><path class="ui-s" data-t="hi" d="M4 3.6v2.6"/>`));
    // The key, in the lock: its stem and its bow.
    out.push(slab({ x: LOCK.x + 5.4, y: LOCK.y + LOCK.d, w: 1.2, d: 5, r: 0.4 }, 8, 1.2, "mid", { steps: 1, bevel: 0 }));
    out.push(slab({ x: LOCK.x + 3.6, y: LOCK.y + LOCK.d + 5, w: 4.8, d: 1.4, r: 0.6 }, 6.2, 4.8, "hi", { steps: 2, bevel: 0.3, crease: "lo" }));
    out.push(bulb(LOCK.x + 6, LOCK.y + 6, LOCK.h, 1.7, hooks ? "locked" : "", on || hooks, true));
    return out.join("");
  };

  // ── The way out: a tray, a track, a barrier and the office beyond it ───
  const track = () => {
    const out = [slab(TRACK, 0, TRACK.h, "lo", { steps: 3, bevel: 0.3 })];
    out.push(L(k.lineOnTop([TRACK.x + 3, TRACK.y + 3], [TRACK.x + TRACK.w - 3, TRACK.y + 3], TRACK.h, P) + k.lineOnTop([TRACK.x + 3, TRACK.y + TRACK.d - 3], [TRACK.x + TRACK.w - 3, TRACK.y + TRACK.d - 3], TRACK.h, P), { tone: "lo", free: true, fine: true }));
    out.push(slab({ x: TRACK.x, y: TRACK.y, w: 18, d: TRACK.d, r: 1.5 }, TRACK.h, 0.8, "mid", { steps: 2, bevel: 0.2 }));
    return out.join("");
  };
  const change = (i, { hooks = true } = {}) => {
    const [x, y, z] = QUEUE[i];
    const solid = slab({ x, y, w: 10, d: 7.4, r: 0.8 }, z + 0.8, 1.1, "hi", { steps: 2, bevel: 0.2, crease: "lo", lit: true }) + L(k.lineOnTop([x + 2, y + 2.4], [x + 7.4, y + 2.4], z + 1.92, P) + k.lineOnTop([x + 2, y + 4.6], [x + 5.6, y + 4.6], z + 1.92, P), { tone: "mid", free: true, fine: true });
    return hooks ? `<g data-part="out-${i}" opacity="0">${solid}</g>` : solid;
  };
  const gate = ({ hooks = true, up = false } = {}) => {
    const out = [cyl(GATE.x, GATE.y, 4.4, 0, 2, "lo", { steps: 22 }), cyl(GATE.x, GATE.y, 2.4, 2, GATE.z + 1, "mid", { steps: 16, crease: "none" })];
    const down = slab({ x: GATE.x - 1.5, y: GATE.y - GATE.len, w: 3, d: GATE.len + 2, r: 1.2 }, GATE.z, 2.4, "hi", { steps: 3, bevel: 0.4, crease: "lo" }) + L([4, 9, 14, 19].map((dy) => k.lineOnTop([GATE.x - 1.5, GATE.y - dy], [GATE.x + 1.5, GATE.y - dy - 1.6], GATE.z + 2.4, P)).join(""), { tone: "mid", free: true, fine: true });
    const raised = slab({ x: GATE.x - 1.5, y: GATE.y - 2.2, w: 3, d: 2.6, r: 1.1 }, GATE.z, GATE.len + 1, "hi", { steps: 3, bevel: 0.4, crease: "lo" });
    out.push(hooks ? `<g data-part="bar-down">${down}</g><g data-part="bar-up" opacity="0">${raised}</g>` : up ? raised : down);
    out.push(cyl(GATE.x, GATE.y, 3, GATE.z + 3, 1.6, "mid", { steps: 18 }));
    out.push(`<g${hooks ? ' data-part="signal"' : ""} class="veo-lamp" data-tone="ok"${!hooks && up ? ' data-on=""' : ""}>${cyl(GATE.x, GATE.y, 2, GATE.z + 4.6, 1.8, "hi", { steps: 16, crease: "lo" })}</g>`);
    return out.join("");
  };
  const office = (hooks = true) => platters(DB.x, DB.y, DB.r, 0, { count: 3, h: 6.4, part: hooks ? "office" : undefined });

  const body = [
    base(PLATE),
    journal(),
    wire(JOURNAL_LINE, "journal-line"),
    cabinet(),
    lock(),
    `<g data-part="drawer" opacity="0">${drawer()}</g>`,
    wire(OUT_LINE, "out-line"),
    track(),
    office(),
    change(0),
    change(1),
    change(2),
    gate(),
    label({ x: 26, y: 34, w: 74, d: 11, r: 1 }, "GUARDAR · BUSCAR · SINCRONIZAR"),
    `<g data-part="beads"><g data-bead="0" opacity="0"><circle class="veo-bead" r="2.3"/></g></g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const stub = (points, on = true) => wire(points, "", on);
  const parts = {
    cabinet: part([shadow({ ...CAB, r: 4 }), cabinet({ hooks: false, saved: true })], k.boxCorners(CAB, 0, CAB.h + 5), 14),
    sync: part(
      [shadow({ x: TRACK.x, y: TRACK.y - 6, w: 96, d: 28, r: 5 }), track(), office(false), change(0, { hooks: false }), change(1, { hooks: false }), `<g transform="${k.translateAlong(P, [44, 0, -1.3 * 2])}">${change(2, { hooks: false })}</g>`, gate({ hooks: false, up: true })],
      [...k.boxCorners({ x: TRACK.x, y: -14, w: 98, d: 30 }, 0, 6), [GATE.x, GATE.y, GATE.z + GATE.len + 2]],
      14,
    ),
    index: part(
      [shadow({ x: DRAWERS[1] - 2, y: FACE - 2, w: DRAWER.w + 4, d: DRAWER.out + 6, r: 3 }), slab({ x: DRAWERS[1] - 3, y: FACE - 6, w: DRAWER.w + 6, d: 6, r: 1 }, 0, CAB.h, "mid", { steps: 3, bevel: 0.6 }), drawer({ hooks: false, hit: true })],
      k.boxCorners({ x: DRAWERS[1] - 3, y: FACE - 6, w: DRAWER.w + 6, d: DRAWER.out + 10 }, 0, CAB.h + 2),
      14,
    ),
    lock: part([shadow({ ...LOCK, d: LOCK.d + 8, r: 3 }), lock({ hooks: false, on: true })], k.boxCorners({ ...LOCK, d: LOCK.d + 8 }, 0, LOCK.h + 3), 20),
    detail: part(
      [shadow({ x: JOURNAL.x, y: JOURNAL.y, w: JOURNAL.w + 6, d: JOURNAL.d + STRIP.d, r: 4 }), journal({ hooks: false, on: true }), stub([JOURNAL_LINE[0], JOURNAL_LINE[1], [JOURNAL.x + JOURNAL.w + 12, -12, 0.9]])],
      k.boxCorners({ x: JOURNAL.x, y: JOURNAL.y, w: JOURNAL.w + 12, d: JOURNAL.d + STRIP.d }, 0, JOURNAL.h + 6),
      14,
    ),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("cardvault", {
  width: W,
  height: H,
  label:
    "Una cajonera de datos sobre una placa: un teléfono tumbado sobre un mueble de tres cajones —partes, clientes y fotos—, uno de ellos abierto, con sus fichas de canto. A la izquierda, un diario con una tira de papel donde se apunta cada cambio; en un lateral, una cerradura con su llave. A la derecha, una bandeja con los cambios pendientes, una vía, una barrera y, al otro lado, la base de datos de la oficina: cuando vuelve la conexión la barrera se levanta y los cambios cruzan.",
  body: full.body,
  motion: { P, journal: flat([...JOURNAL_LINE].reverse()), out: flat(OUT_LINE), open: DRAWER.out, travel: TRAVEL, rise: 4.6 },
  thumb: small.body
    .join("")
    .replace('<g data-part="drawer" opacity="0">', "<g>")
    .replace('<g data-part="shut">', '<g opacity="0">')
    .replace('<g data-part="hit">', `<g transform="${k.translateAlong(P, [0, 0, 4.6])}">`)
    .replace(/<g data-part="out-(\d)" opacity="0">/g, "<g>"),
  parts: full.parts,
});
