// Push notifications: a notification board. An event is keyed in at the console, a
// selector says who it is for and two relays, one per family of phones, put it on the
// air. The phones that allowed it light a banner; the one that did not finds the notice
// in the app's inbox, a tray at the front. A tap on the banner opens the screen the
// notice was about.
import { k, kitFor, frameOf, save } from "./lib.mjs";

const W = 760;
const H = 470;
const PLATE = { x: -128, y: -54, w: 256, d: 108, r: 10 };
const CONSOLE = { x: -116, y: -42, w: 46, d: 30, r: 3, h: 10 };
const SELECTOR = { x: -112, y: 8, w: 38, d: 28, r: 3, h: 8 };
const RELAYS = [
  { x: -58, y: -44, w: 22, d: 18, r: 2 },
  { x: -28, y: -44, w: 22, d: 18, r: 2 },
];
const RELAY_H = 30;
const mast = (relay) => [relay.x + 15.6, relay.y + 6.4];
const DOCK = { x: 30, y: -8, w: 94, d: 22, r: 3, h: 5 };
const PHONES = [34, 64, 94].map((x) => ({ x, y: DOCK.y + 9, z: DOCK.h, w: 26, h: 52, t: 3.4 }));
const INBOX = { x: 94, y: 22, w: 26, d: 18, r: 2, h: 4 };

const BUS = [
  [CONSOLE.x + CONSOLE.w, -26, 3],
  [CONSOLE.x + CONSOLE.w + 2, -26, 0.9],
  [-64, -26, 0.9],
  [-64, -20, 0.9],
  [-47, -20, 0.9],
  [-47, -26, 0.9],
  [-47, -26, 2],
];
const BRANCH = [
  [-47, -20, 0.9],
  [-17, -20, 0.9],
  [-17, -26, 0.9],
  [-17, -26, 2],
];
const SELECT = [
  [-93, SELECTOR.y, 3],
  [-93, SELECTOR.y - 2, 0.9],
  [-93, -10, 0.9],
  [-93, CONSOLE.y + CONSOLE.d, 2],
];
const tip = (i) => [...mast(RELAYS[i]), RELAY_H + 13.6];
const topOf = (i) => [PHONES[i].x + 13, PHONES[i].y + 1.7, DOCK.h + 53];
// Through the air: from each relay to the phones of its family, and down into the inbox.
const FLIGHTS = [
  [tip(0), topOf(0)],
  [tip(1), topOf(1)],
  [tip(0), topOf(2)],
];
const DROP = [topOf(2), [INBOX.x + 13, INBOX.y + 9, INBOX.h + 2]];

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [RELAYS[0].x, RELAYS[0].y, 48], [PHONES[2].x + 26, PHONES[2].y, 60]], W, H, {
  pad: 22,
  azimuth: 52,
  elevation: 30,
});

function scene(lod) {
  const { at, L, D, slab, cyl, screws, base, label, lamp, knob, slot, faceY, screen, cable, shadow, pick, thumb, handset } = kitFor(P, { lod });
  const wire = (points, part, on = false) => cable(points, part).replace('class="veo-cable"', `class="veo-cable"${on ? ' data-on=""' : ""}`);

  // ── The console: one key per kind of event ─────────────────────────────
  const consoleUnit = ({ hooks = true, on = false } = {}) => {
    const out = [slab(CONSOLE, 0, CONSOLE.h, "mid", { steps: 5, bevel: 0.7, seam: 4 })];
    const glyphs = [
      // A parcel, a calendar page and a tag.
      (x, y, z) => k.planOutline({ x: x + 2.6, y: y + 2.6, w: 4.8, d: 4.8, r: 0.5 }, z, P, 2) + k.lineOnTop([x + 2.6, y + 5], [x + 7.4, y + 5], z, P),
      (x, y, z) => k.planOutline({ x: x + 2.4, y: y + 2.8, w: 5.2, d: 4.6, r: 0.6 }, z, P, 2) + k.lineOnTop([x + 2.4, y + 4.4], [x + 7.6, y + 4.4], z, P),
      (x, y, z) => k.ring(x + 5, y + 5, 2.4, z, P, 14),
    ];
    [0, 1, 2].forEach((i) => {
      const plan = { x: CONSOLE.x + 5 + i * 12.6, y: CONSOLE.y + 6, w: 10, d: 10, r: 1.6 };
      const lit = i === 0 && (hooks || on);
      const key = slab(plan, CONSOLE.h, 3, "hi", { steps: 4, bevel: 0.5, crease: "lo", lit: i === 0 && on && !hooks }) + L(glyphs[i](plan.x, plan.y, CONSOLE.h + 3), { tone: "mid", fine: true });
      out.push(hooks && lit ? `<g data-part="key" class="veo-lamp">${key}</g>` : key);
    });
    const line = `<path class="scr-s" data-t="acc" d="M3 3.3h20"/>`;
    out.push(faceY(CONSOLE.x + 4, CONSOLE.y + CONSOLE.d, CONSOLE.h - 1.6, screen(38, 6.6, `<path class="scr-s" data-t="dim" d="M3 3.3h20M26 3.3h8"/>` + (hooks ? `<g data-part="event" opacity="0">${line}</g>` : on ? line : ""), 1.2)));
    out.push(...screws([[CONSOLE.x + CONSOLE.w - 3.4, CONSOLE.y + 3.4], [CONSOLE.x + CONSOLE.w - 3.4, CONSOLE.y + CONSOLE.d - 3.4]], CONSOLE.h, 0.9, 0.42));
    return out.join("");
  };

  // ── The selector: who the notice is for ────────────────────────────────
  const selector = ({ hooks = true, on = false } = {}) => {
    const out = [slab(SELECTOR, 0, SELECTOR.h, "mid", { steps: 5, bevel: 0.7, seam: 3 })];
    const [cx, cy] = [SELECTOR.x + 15, SELECTOR.y + 14];
    out.push(L(k.ring(cx, cy, 9.4, SELECTOR.h, P, 32), { tone: "lo", fine: true }));
    out.push(D([-2.2, -1.1, 0].map((a) => at([cx + Math.sin(a) * 9.4, cy - Math.cos(a) * 9.4, SELECTOR.h])), { size: 0.7, tone: "hi", keep: true }));
    out.push(knob(cx, cy, 6, SELECTOR.h, 6, { pointer: -1.1 }));
    out.push(lamp(SELECTOR.x + SELECTOR.w - 6, SELECTOR.y + SELECTOR.d - 6, SELECTOR.h, 1.8, hooks ? "seg" : "", on));
    out.push(faceY(SELECTOR.x + 5, SELECTOR.y + SELECTOR.d, 6.4, `<text class="ui-t" x="0" y="3" font-size="2.6" opacity=".7">DESTINO</text>`));
    out.push(...screws([[SELECTOR.x + SELECTOR.w - 3.4, SELECTOR.y + 3.4]], SELECTOR.h, 0.9, 0.42));
    return out.join("");
  };

  // ── The relays: one per family of phones, each with its aerial ─────────
  const relay = (i, { hooks = true, on = false } = {}) => {
    const plan = RELAYS[i];
    const [mx, my] = mast(plan);
    const out = [slab(plan, 0, RELAY_H, "mid", { steps: 4, bevel: 0.7, seam: 6 })];
    out.push(
      faceY(plan.x + 3, plan.y + plan.d, RELAY_H - 3, `<rect class="ui-s" data-t="lo" width="16" height="6.4" rx="1.2"/><text class="ui-t" x="8" y="4.6" font-size="3" text-anchor="middle" opacity=".8">${i ? "FCM" : "APNS"}</text>` + pick(`<path class="ui-s" data-t="lo" d="M1 11h14M1 13.6h14M1 16.2h14"/>`)),
    );
    for (let s = 0; s < 3; s++) out.push(L(slot("x", plan.x + plan.w, plan.y + 4 + s * 4.4, plan.y + 6.6 + s * 4.4, 8, 22, 0.9), { tone: "lo", fine: true }));
    out.push(lamp(plan.x + 5, plan.y + plan.d - 5, RELAY_H, 1.8, hooks ? `relay-${i}` : "", on));
    // The aerial, and the rings it sends out.
    out.push(cyl(mx, my, 2.6, RELAY_H, 1.4, "mid", { steps: 16 }), cyl(mx, my, 0.8, RELAY_H + 1.4, 11, "mid", { steps: 8, crease: "none" }));
    out.push(cyl(mx, my, 1.7, RELAY_H + 12.4, 1.4, "hi", { steps: 14, crease: "lo" }));
    const rings = [4.6, 8, 11.4].map((r, n) => `<g${hooks ? ` data-wave="${i}-${n}" opacity="0"` : ""}>${L(k.ring(mx, my, r, RELAY_H + 13.2, P, 30), { tone: "lit" })}</g>`);
    if (hooks || on) out.push(...(hooks ? rings : rings.slice(0, 2)));
    out.push(...screws([[plan.x + plan.w - 3, plan.y + plan.d - 3]], RELAY_H, 0.8, 0.4));
    return out.join("");
  };

  // ── The phones: two that allowed notices, one that did not ─────────────
  const gw = 23.4;
  const banner = `<rect class="scr-f" data-t="hi" x="1.8" y="19.4" width="${gw - 3.6}" height="9.6" rx="2.2"/><rect class="scr-f" data-t="acc" x="3.2" y="21" width="3.4" height="3.4" rx=".9"/><path d="M8.2 22h9.6M8.2 24.6h11.6M3.4 27h13" fill="none" stroke="#16142c" stroke-width=".8" stroke-linecap="round"/>`;
  const lockUi = (i, { hooks = true, on = false } = {}) => {
    const clock = `<text class="scr-t" x="${gw / 2}" y="13.4" font-size="6.2" font-weight="600" text-anchor="middle">9:41</text>${pick(`<path class="scr-s" data-t="dim" d="M${gw / 2 - 5} 16.2h10"/>`)}`;
    if (i === 2) {
      // No permission: nothing on the lock screen, only the mark of a silenced bell.
      return clock + `<circle class="scr-s" data-t="dim" cx="${gw / 2}" cy="39" r="3.6"/><path class="scr-s" data-t="dim" d="M${gw / 2 - 2.6} 41.6l5.2-5.2"/>` + `<rect class="scr-f" data-t="mid" x="${gw / 2 - 4.6}" y="46.7" width="9.2" height="1" rx=".5"/>`;
    }
    const shown = hooks ? `<g data-part="banner-${i}" opacity="0">${banner}</g>` : on ? banner : "";
    const chrome = i === 1 ? `<circle class="scr-s" cx="${gw / 2}" cy="46" r="1.25"/>` : `<rect class="scr-f" data-t="mid" x="${gw / 2 - 4.6}" y="46.7" width="9.2" height="1" rx=".5"/>`;
    if (i === 1 || !hooks) return clock + shown + chrome;
    // The first phone is the one that gets tapped: its lock screen gives way to the order.
    const order =
      `<path class="scr-s" data-t="hi" d="M2.6 9h11"/><rect class="scr-f" data-t="acc" x="2.2" y="12.4" width="${gw - 4.4}" height="7" rx="1.8"/>` +
      `<rect class="scr-s" data-t="dim" x="2.2" y="22" width="${gw - 4.4}" height="13" rx="1.6"/><path class="scr-s" data-t="hi" d="M5 31l4-4.4 3.4 2.6 5-5"/>` +
      `<rect class="scr-f" x="2.2" y="37.6" width="${gw - 4.4}" height="5" rx="1.4"/>`;
    return `<g data-part="lock">${clock}${shown}</g><g data-part="order" opacity="0">${order}</g>${chrome}`;
  };
  const phone = (i, opts) => handset(PHONES[i], lockUi(i, opts), { kind: i === 1 ? "b" : "a" });
  const dock = (opts) => {
    const out = [slab(DOCK, 0, DOCK.h, "mid", { steps: 5, bevel: 0.7, seam: 2 })];
    out.push(...screws([[DOCK.x + 3, DOCK.y + 3.4], [DOCK.x + DOCK.w - 3, DOCK.y + 3.4]], DOCK.h, 0.9, 0.4));
    [0, 1, 2].forEach((i) => {
      out.push(phone(i, opts));
      const granted = i !== 2;
      out.push(lamp(PHONES[i].x + 13, DOCK.y + DOCK.d - 4, DOCK.h, 1.6, opts?.hooks === false ? "" : `ok-${i}`, granted && opts?.hooks === false && opts?.on).replace('class="veo-lamp"', granted ? 'class="veo-lamp" data-tone="ok"' : 'class="veo-lamp"'));
    });
    return out.join("");
  };

  // ── The inbox: where the notice waits for whoever gave no permission ───
  const inbox = ({ hooks = true, on = false } = {}) => {
    const out = [slab(INBOX, 0, 1.6, "lo", { steps: 3, bevel: 0.2 })];
    out.push(slab({ x: INBOX.x, y: INBOX.y, w: INBOX.w, d: 1.8, r: 0.5 }, 0, INBOX.h, "mid", { steps: 2, bevel: 0.3 }), slab({ x: INBOX.x, y: INBOX.y, w: 1.8, d: INBOX.d, r: 0.5 }, 0, INBOX.h, "mid", { steps: 2, bevel: 0.3 }));
    const env = { x: INBOX.x + 5, y: INBOX.y + 4, w: 16, d: 10.4, r: 0.8 };
    const note = slab(env, 1.6, 1.2, "hi", { steps: 2, bevel: 0.2, crease: "lo", lit: true }) + L(k.onTop([[env.x, env.y], [env.x + 8, env.y + 5.4], [env.x + 16, env.y]], 2.82, P), { tone: "lit" });
    out.push(hooks ? `<g data-part="mail" opacity="0">${note}</g>` : on ? note : "");
    out.push(slab({ x: INBOX.x + INBOX.w - 1.8, y: INBOX.y, w: 1.8, d: INBOX.d, r: 0.5 }, 0, INBOX.h, "mid", { steps: 2, bevel: 0.3 }), slab({ x: INBOX.x, y: INBOX.y + INBOX.d - 1.8, w: INBOX.w, d: 1.8, r: 0.5 }, 0, INBOX.h, "mid", { steps: 2, bevel: 0.3 }));
    return out.join("");
  };

  const body = [
    base(PLATE),
    relay(0),
    relay(1),
    consoleUnit(),
    wire(BUS, "bus"),
    wire(BRANCH, "branch"),
    wire(SELECT, "select"),
    selector(),
    dock(),
    inbox(),
    label({ x: -60, y: 38, w: 70, d: 11, r: 1 }, "EVENTO · PERMISO · PANTALLA"),
    `<g data-part="beads">${[0, 1].map((i) => `<g data-bead="${i}" opacity="0"><circle class="veo-bead" r="2.3"/></g>`).join("")}</g>`,
  ];

  const part = (body, box, pad = 18) => ({ body, frame: frameOf(box, P, pad) });
  const stub = (points, on = true) => wire(points, "", on);
  const still = { hooks: false, on: true };
  const span = { x: RELAYS[0].x, y: RELAYS[0].y, w: 52, d: 18 };
  const parts = {
    relays: part(
      [shadow({ ...span, r: 4 }), relay(0, still), relay(1, still), stub([[-64, -20, 0.9], [-47, -20, 0.9], [-47, -26, 0.9], [-47, -26, 2]]), stub(BRANCH)],
      [...k.boxCorners({ ...span, x: span.x - 6, w: span.w + 6, d: 26 }, 0, 4), ...k.boxCorners(span, RELAY_H, RELAY_H + 15)],
      16,
    ),
    console: part([shadow({ ...CONSOLE, r: 4 }), consoleUnit(still), stub([BUS[0], BUS[1], [CONSOLE.x + CONSOLE.w + 10, -26, 0.9]])], k.boxCorners({ ...CONSOLE, w: CONSOLE.w + 10 }, 0, CONSOLE.h + 4), 16),
    selector: part([shadow({ ...SELECTOR, r: 4 }), stub([[-93, SELECTOR.y - 10, 0.9], [-93, SELECTOR.y - 2, 0.9], [-93, SELECTOR.y, 3]]), selector(still)], k.boxCorners({ ...SELECTOR, y: SELECTOR.y - 10, d: SELECTOR.d + 10 }, 0, SELECTOR.h + 7), 16),
    phone: part(
      [shadow({ x: DOCK.x, y: DOCK.y, w: 34, d: DOCK.d, r: 4 }), slab({ x: DOCK.x, y: DOCK.y, w: 34, d: DOCK.d, r: 3 }, 0, DOCK.h, "mid", { steps: 5, bevel: 0.7, seam: 2 }), phone(0, still), lamp(PHONES[0].x + 13, DOCK.y + DOCK.d - 4, DOCK.h, 1.6, "", true).replace('class="veo-lamp"', 'class="veo-lamp" data-tone="ok"')],
      k.boxCorners({ x: DOCK.x, y: DOCK.y, w: 34, d: DOCK.d }, 0, DOCK.h + 53),
      14,
    ),
    detail: part(
      [
        shadow({ x: DOCK.x + 58, y: DOCK.y, w: 36, d: 48, r: 4 }),
        slab({ x: DOCK.x + 58, y: DOCK.y, w: 36, d: DOCK.d, r: 3 }, 0, DOCK.h, "mid", { steps: 5, bevel: 0.7, seam: 2 }),
        phone(2, still),
        lamp(PHONES[2].x + 13, DOCK.y + DOCK.d - 4, DOCK.h, 1.6, "", false),
        inbox(still),
      ],
      [...k.boxCorners({ x: DOCK.x + 58, y: DOCK.y, w: 36, d: 48 }, 0, 5), [PHONES[2].x, PHONES[2].y, DOCK.h + 53], [PHONES[2].x + 26, PHONES[2].y, DOCK.h + 53]],
      14,
    ),
  };
  return { body, parts };
}

const full = scene("full");
const small = scene("thumb");
const flat = (points) => points.map((point) => k.iso(point, P).map((v) => Math.round(v * 10) / 10));

save("annunciator", {
  width: W,
  height: H,
  label:
    "Un cuadro de avisos sobre una placa: a la izquierda, una consola con tres teclas de evento y, delante, un selector de destinatarios; en el centro, dos relés con antena, uno para cada familia de teléfonos; a la derecha, tres teléfonos de pie en una base. Al pulsar una tecla, el aviso pasa por los relés y enciende una franja en la pantalla de los dos teléfonos que lo permitieron; el tercero, sin permiso, lo recibe en el buzón de la app, una bandeja delante de él. Un toque en la franja abre el pedido.",
  body: full.body,
  motion: { P, bus: flat(BUS), branch: flat([BUS[4], ...BRANCH.slice(1)]), flights: FLIGHTS.map(flat), drop: flat(DROP) },
  thumb: small.body
    .join("")
    .replace(/<g data-part="banner-(\d)" opacity="0">/g, "<g>")
    .replace('<g data-part="mail" opacity="0">', "<g>")
    .replace(/<g data-wave="(\d)-(0|1)" opacity="0">/g, "<g>")
    .replace(/data-part="relay-(\d)" class="veo-lamp"/g, 'class="veo-lamp" data-on=""')
    .replace('data-part="bus"', 'data-on=""')
    .replace('data-part="branch"', 'data-on=""'),
  parts: full.parts,
});
