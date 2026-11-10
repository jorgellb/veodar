// El taller: the hero scene, drawn straight on the dark hero with no card.
// Left island: the client's systems. Centre: the AI core, an orb inside two
// gyroscope rings, with a push-button for human confirmation. Right island:
// what gets built. Each island has a pier with four sockets where the page's
// fibres plug in, one per chip; traces carry the work across the island, floor
// cables join the islands to the core, and the trunk leaves from its front.
import { G, k, kitFor, save } from "./lib.mjs";

const W = 1240;
const H = 430;
const ISLAND = 104;
const PAD = 30;
const ZI = 2.5; // top of an island
const Z0 = 4.5; // top of a pad
const CL = [-112, 112];
const CR = [112, -112];
const S = 26;
const CORE = { r: 58, orbZ: 62, orbR: 23, ring: [30, 37] };
const REVIEW = { x: 10, y: 45 };
const PIER = { reach: 22, half: 31, post: 16, stem: 8.6 };

// Island coordinates: u runs from the pier into the island, v along the pier.
// The right island is the left one mirrored, so a slot means the same on both.
const place = {
  L: ([u, v]) => [CL[0] + u, CL[1] + v],
  R: ([u, v]) => [CR[0] + v, CR[1] + u],
};
const rect = (side, u, v, du, dv, r) => (side === "L" ? { x: CL[0] + u, y: CL[1] + v, w: du, d: dv, r } : { x: CR[0] + v, y: CR[1] + u, w: dv, d: du, r });
const SLOT = { back: [-S, -S], side: [-S, S], inner: [S, -S], front: [S, S] };
const SYSTEMS = { erp: "back", crm: "side", documentos: "inner", correo: "front" };
const PRODUCTS = { web: "back", agentes: "side", escritorio: "inner", movil: "front" };
// Sockets stand on the pier in the same order as the chips above them on the
// page: the outermost chip owns the socket nearest the island's outer corner,
// which is what keeps the fibres from crossing.
const SOCKET_U = -(ISLAND / 2 + PIER.post);
const SOCKET_V = { side: 22, front: 6, inner: -6, back: -22 };
const SOCKET_TOP = ZI + 0.9 + PIER.stem + 1.4;
const JUNCTION = [44, -44];
const half = PAD / 2;
const margin = ISLAND / 2 - 5;
// Traces: socket → pad, and pad → junction box.
const FEED = {
  side: [[SOCKET_U, SOCKET_V.side], [-S - half, SOCKET_V.side]],
  back: [[SOCKET_U, SOCKET_V.back], [-S - half, SOCKET_V.back]],
  front: [[SOCKET_U, SOCKET_V.front], [S, SOCKET_V.front], [S, S - half]],
  inner: [[SOCKET_U, SOCKET_V.inner], [S, SOCKET_V.inner], [S, -S + half]],
};
const LEAD = {
  back: [[-S, -S - half], [-S, -margin], [JUNCTION[0], -margin], JUNCTION],
  inner: [[S, -S - half], [S, -margin], [JUNCTION[0], -margin], JUNCTION],
  front: [[S + half, S], [margin, S], [margin, JUNCTION[1]], JUNCTION],
  side: [[-S, S + half], [-S, margin], [margin, margin], [margin, JUNCTION[1]], JUNCTION],
};
const posOf = (side, slot) => place[side](SLOT[slot]);
const socketAt = (side, slot) => place[side]([SOCKET_U, SOCKET_V[slot]]);

const P = k.fitProjection(
  [
    [CL[0] - 52, CL[1] + 52, 0],
    [CR[0] + 52, CR[1] - 52, 0],
    [...place.L([-(ISLAND / 2 + PIER.reach), PIER.half]), 0],
    [...place.R([-(ISLAND / 2 + PIER.reach), PIER.half]), 0],
    [CL[0] - 52, CL[1] - 52, 34],
    [CR[0] - 52, CR[1] - 52, 34],
    [0, 0, CORE.orbZ + CORE.ring[1] + 4],
    [70, 70, 0],
  ],
  W,
  H,
  { pad: 14, azimuth: 45, elevation: 30 },
);
const { at, L, D, slab, cyl, screws, faceY, screen } = kitFor(P);
const out = [];
const flat = (pts, z = 0.3) => pts.map(([x, y]) => at([x, y, z]));
const round1 = (pts) => pts.map(([x, y]) => [Math.round(x * 10) / 10, Math.round(y * 10) / 10]);

// ── Floor: a grid that fades into the hero ───────────────────────────────
const grid = [];
for (let v = -260; v <= 260; v += 20) {
  grid.push(k.segment([v, -260, 0], [v, 260, 0], P), k.segment([-260, v, 0], [260, v, 0], P));
}
const [ox, oy] = at([0, 0, 0]);
out.push(
  `<defs>` +
    `<radialGradient id="nx-fade" gradientUnits="userSpaceOnUse" cx="${ox}" cy="${oy}" r="${W * 0.5}" gradientTransform="translate(0 ${oy}) scale(1 .42) translate(0 ${-oy})"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>` +
    `<mask id="nx-mask"><rect width="${W}" height="${H}" fill="url(#nx-fade)"/></mask>` +
    `<radialGradient id="nx-orb" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#fff3e6"/><stop offset=".28" stop-color="#ffb07a"/><stop offset=".62" stop-color="#ff5a1f"/><stop offset="1" stop-color="#8a2606"/></radialGradient>` +
    `<radialGradient id="nx-halo"><stop offset="0" stop-color="#ff5a1f" stop-opacity=".75"/><stop offset=".45" stop-color="#ff5a1f" stop-opacity=".22"/><stop offset="1" stop-color="#ff5a1f" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="nx-beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a1f" stop-opacity="0"/><stop offset="1" stop-color="#ff5a1f" stop-opacity=".6"/></linearGradient>` +
    `</defs>`,
);
out.push(`<g mask="url(#nx-mask)"><path class="nx-grid" d="${grid.join("")}"/></g>`);

// ── Floor cables: island junction → core, core → island, and the trunk ───
const JL = place.L(JUNCTION);
const JR = place.R(JUNCTION);
const edge = (a) => Math.sqrt(CORE.r * CORE.r - a * a) - 1;
const cableL = [JL, [-24, JL[1]], [-24, edge(24)]];
const cableR = [[edge(24), -24], [JR[0], -24], JR];
// The trunk runs toward the viewer (straight down on screen) to the bottom edge.
const t0 = CORE.r * Math.SQRT1_2 - 1;
let t1 = t0;
while (at([t1, t1, 0])[1] < H + 2) t1 += 1;
const trunk = [[t0, t0], [t1, t1]];
const cable = (pts) => {
  const d = k.pathOf(flat(pts));
  return `<path class="nx-cable-edge" d="${d}"/><path class="nx-cable" d="${d}"/>`;
};
out.push(cable(cableL), cable(cableR), cable(trunk));

// ── Islands ──────────────────────────────────────────────────────────────
const lampAt = (x, y, z, part) => `<g data-part="${part}" class="veo-lamp">${cyl(x, y, 1.9, z, 1.6, "hi", { steps: 16, crease: "lo" })}</g>`;
const padOf = ([cx, cy]) => {
  const plan = { x: cx - PAD / 2, y: cy - PAD / 2, w: PAD, d: PAD, r: 4 };
  return slab(plan, ZI, Z0 - ZI, "mid", { steps: 4, bevel: 0.5 }) + L(k.planOutline(k.insetPlan(plan, 2.4), Z0, P, 3), { tone: "faint" });
};
const island = ([cx, cy]) => {
  const plan = { x: cx - ISLAND / 2, y: cy - ISLAND / 2, w: ISLAND, d: ISLAND, r: 9 };
  return (
    `<path class="iso-halo" d="${k.haloOf(plan, -2, 4, P)}"/>` +
    slab(plan, 0, ZI, "lo", { steps: 6, bevel: 0.8 }) +
    L(k.planOutline(k.insetPlan(plan, 3.2), ZI, P, 5), { tone: "faint" })
  );
};
// A socket: collar, stem and a cap the page's fibre drops into. The cap lights when work passes.
const socket = (side, slot, id) => {
  const [x, y] = socketAt(side, slot);
  return (
    cyl(x, y, 3.2, ZI, 0.9, "lo", { steps: 18 }) +
    cyl(x, y, 1.5, ZI + 0.9, PIER.stem, "mid", { steps: 12, crease: "none" }) +
    `<g data-part="sock-${id}" class="veo-lamp">${cyl(x, y, 2.6, ZI + 0.9 + PIER.stem, 1.4, "hi", { steps: 16, crease: "lo" })}</g>` +
    D([at([x, y, SOCKET_TOP])], { size: 0.9, tone: "hi" })
  );
};
// The pier: a tab on the island's outer back edge carrying the four sockets, farthest first.
const pier = (side, who) => {
  const plan = rect(side, -(ISLAND / 2 + PIER.reach), -PIER.half, PIER.reach + 3, PIER.half * 2, 4);
  const idOf = Object.fromEntries(Object.entries(who).map(([id, slot]) => [slot, id]));
  return (
    `<path class="iso-halo" d="${k.haloOf(plan, -2, 4, P)}"/>` +
    slab(plan, 0, ZI, "lo", { steps: 4, bevel: 0.8 }) +
    L(k.planOutline(k.insetPlan(plan, 2.6), ZI, P, 3), { tone: "faint" }) +
    screws([-26.5, 26.5].map((v) => place[side]([-(ISLAND / 2 + 5.5), v])), ZI + 0.02, 1.2, 0.45).join("") +
    ["back", "inner", "front", "side"].map((slot) => socket(side, slot, idOf[slot])).join("")
  );
};
const onIsland = (side, pts) => k.onTop(pts.map(place[side]), ZI + 0.05, P);
const traceSvg = (side) =>
  L(Object.values(LEAD).map((pts) => onIsland(side, pts)).join(""), { tone: "lo" }) +
  // Feeds start at the collar's rim, not under the post.
  L(Object.values(FEED).map((pts) => onIsland(side, [[pts[0][0] + 3.3, pts[0][1]], ...pts.slice(1)])).join(""), { tone: "lo" });
const junction = ([x, y], part) =>
  slab({ x: x - 6, y: y - 6, w: 12, d: 12, r: 2 }, ZI, 5, "mid", { steps: 2, bevel: 0.4 }) + lampAt(x, y, 7.5, part);

// Left island: the systems the client already has.
out.push(pier("L", SYSTEMS), island(CL), traceSvg("L"));
{
  // ERP (back): a three-platter database.
  const [cx, cy] = posOf("L", SYSTEMS.erp);
  out.push(padOf([cx, cy]));
  for (let i = 0; i < 3; i++) {
    const z = Z0 + i * 8.2;
    if (i) out.push(cyl(cx, cy, 8.4, z - 1.2, 1.2, "lo", { steps: 36 }));
    out.push(cyl(cx, cy, 10.6, z, 7, "hi", { steps: 44, bevel: 0.4, crease: "lo", inner: L(k.sideArc(cx, cy, 10.6, z + 3.5, P, 28), { tone: "faint" }) }));
  }
  out.push(lampAt(cx, cy, Z0 + 23.4, "src-erp"));
}
{
  // CRM (outer side): a card file with one card standing proud.
  const [cx, cy] = posOf("L", SYSTEMS.crm);
  out.push(padOf([cx, cy]));
  out.push(slab({ x: cx - 12, y: cy - 8, w: 24, d: 16, r: 2 }, Z0, 6, "mid", { steps: 3, bevel: 0.5 }));
  for (let i = 0; i < 5; i++) {
    out.push(slab({ x: cx - 9.4 + i * 4.4, y: cy - 6, w: 1.2, d: 12, r: 0.3 }, Z0 + 6, i === 2 ? 9 : 6.4, "hi", { steps: 1, bevel: 0, crease: "lo" }));
  }
  out.push(lampAt(cx + 9, cy + 11.4, Z0, "src-crm"));
}
{
  // Documentos (inner side): a stack of sheets.
  const [cx, cy] = posOf("L", SYSTEMS.documentos);
  out.push(padOf([cx, cy]));
  for (let i = 0; i < 5; i++) out.push(slab({ x: cx - 9 + i * 0.5, y: cy - 11 + i * 0.4, w: 18, d: 22, r: 0.8 }, Z0 + i * 1.5, 1.1, "hi", { steps: 2, bevel: 0, crease: "lo" }));
  const zt = Z0 + 4 * 1.5 + 1.12;
  out.push(L([4, 8, 12, 16].map((dy, i) => k.lineOnTop([cx - 5, cy - 9 + dy], [cx - 5 + [12, 9, 11, 6][i], cy - 9 + dy], zt, P)).join(""), { tone: "mid", free: true }));
  out.push(lampAt(cx + 10, cy + 11.4, Z0, "src-documentos"));
}
{
  // Correo (front): a tray with an envelope on it.
  const [cx, cy] = posOf("L", SYSTEMS.correo);
  out.push(padOf([cx, cy]));
  out.push(slab({ x: cx - 11, y: cy - 9, w: 22, d: 18, r: 2 }, Z0, 8, "mid", { steps: 3, bevel: 0.5, seam: Z0 + 3 }));
  out.push(`<g data-part="obj-correo">${slab({ x: cx - 9, y: cy - 6.5, w: 18, d: 13, r: 1 }, Z0 + 8, 1.4, "hi", { steps: 2, bevel: 0.3, crease: "lo" })}${L(k.onTop([[cx - 9, cy - 6.5], [cx, cy + 0.6], [cx + 9, cy - 6.5]], Z0 + 9.42, P), { tone: "hi" })}</g>`);
  out.push(lampAt(cx + 8, cy + 11.4, Z0, "src-correo"));
}
out.push(junction(JL, "junction-in"));

// ── Core ─────────────────────────────────────────────────────────────────
out.push(`<path class="iso-halo" d="${k.ring(0, 0, CORE.r + 4, 0, P, 64)}"/>`);
out.push(cyl(0, 0, CORE.r, 0, 4, "lo", { steps: 96, bevel: 0.8 }));
out.push(L(k.ring(0, 0, CORE.r - 4.5, 4, P, 96), { tone: "faint" }));
// Glands where the two cables and the trunk meet the platform.
for (const [gx, gy] of [[-24, Math.sqrt(54.5 ** 2 - 24 ** 2)], [Math.sqrt(54.5 ** 2 - 24 ** 2), -24], [54.5 * Math.SQRT1_2, 54.5 * Math.SQRT1_2]]) {
  out.push(cyl(gx, gy, 2.3, 4, 1.1, "mid", { steps: 14 }), D([at([gx, gy, 5.1])], { size: 0.7, tone: "hi" }));
}
out.push(`<g data-part="ticks"></g>`);
out.push(D(k.circleRing(0, 0, 40, 8).map(([x, y]) => at([x, y, 4])), { size: 0.9, tone: "mid" }));
out.push(cyl(0, 0, 30, 4, 12, "mid", { steps: 72, bevel: 0.6, inner: L(k.knurl(0, 0, 30, 6.4, 13.6, 84, P, 0.3), { tone: "lo" }) + L(k.sideArc(0, 0, 30, 6.4, P, 48) + k.sideArc(0, 0, 30, 13.6, P, 48), { tone: "faint" }) }));
out.push(L(k.ring(0, 0, 24, 16, P, 64), { tone: "faint" }));
out.push(cyl(0, 0, 17, 16, 5, "hi", { steps: 56, bevel: 0.5, crease: "lo" }));
out.push(`<g data-part="emitter">${L(k.ring(0, 0, 11.5, 21, P, 48), { tone: "lit" })}</g>`);
// Human confirmation: a button and its lamp on a small console at the front.
const rc = { x: REVIEW.x - 9, y: REVIEW.y - 7, w: 18, d: 14, r: 2 };
out.push(slab(rc, 4, 7, "mid", { steps: 3, bevel: 0.5, seam: 7 }));
out.push(cyl(REVIEW.x - 3, REVIEW.y, 4.4, 11, 0.9, "lo", { steps: 22 }));
out.push(`<g data-part="button">${cyl(REVIEW.x - 3, REVIEW.y, 3.4, 11.9, 2.8, "hi", { steps: 22, bevel: 0.3, crease: "lo" })}</g>`);
out.push(lampAt(REVIEW.x + 5, REVIEW.y, 11, "review"));
// Beam, rings behind, halo, orb, rings in front: the last four are live.
const [cxs, cys] = at([0, 0, CORE.orbZ]);
const [, collarY] = at([0, 0, 21]);
const orbR = CORE.orbR * G.scaleOf(P);
out.push(`<path data-part="beam" fill="url(#nx-beam)" opacity=".5" d="M${cxs - orbR * 0.62} ${cys}L${cxs + orbR * 0.62} ${cys}L${cxs + orbR * 0.4} ${collarY}L${cxs - orbR * 0.4} ${collarY}Z"/>`);
out.push(`<g data-part="rings-back"></g>`);
out.push(`<circle data-part="halo" cx="${cxs}" cy="${cys}" r="${orbR * 2.5}" fill="url(#nx-halo)" opacity=".5"/>`);
out.push(`<circle class="nx-orb" cx="${cxs}" cy="${cys}" r="${orbR}" fill="url(#nx-orb)"/>`);
out.push(`<circle data-part="shine" cx="${cxs}" cy="${cys}" r="${orbR}" fill="#fff6ea" opacity="0"/>`);
out.push(`<g data-part="rings-front"></g>`);

// ── Right island: what gets built ────────────────────────────────────────
out.push(pier("R", PRODUCTS), island(CR), traceSvg("R"));
out.push(junction(JR, "junction-out"));
{
  // Web (back): a browser window.
  const [cx, cy] = posOf("R", PRODUCTS.web);
  out.push(padOf([cx, cy]));
  out.push(slab({ x: cx - 9, y: cy - 4, w: 18, d: 8, r: 1.4 }, Z0, 1.6, "mid", { steps: 2, bevel: 0.3 }));
  out.push(slab({ x: cx - 15, y: cy - 1.6, w: 30, d: 3.2, r: 1.2 }, Z0 + 1.6, 23, "hi", { steps: 2, bevel: 0.4, crease: "lo" }));
  const w = 26.8;
  const h = 20;
  out.push(
    faceY(
      cx - 13.4,
      cy + 1.6,
      Z0 + 23.1,
      screen(
        w,
        h,
        `<path class="scr-s" data-t="dim" d="M0 3.6h${w}"/><circle class="scr-f" data-t="acc" cx="2" cy="1.8" r=".7"/><circle class="scr-f" data-t="mid" cx="4" cy="1.8" r=".7"/>` +
          `<g data-part="ui-web"><rect class="scr-f" data-t="hi" data-step="0" x="2.4" y="5.8" width="13" height="2.6" rx=".6"/><rect class="scr-f" data-t="mid" data-step="1" x="2.4" y="10" width="9" height="1.4" rx=".5"/><rect class="scr-f" data-t="acc" data-step="2" x="2.4" y="13.2" width="7" height="3.2" rx="1.6"/><rect class="scr-s" data-step="1" x="17.4" y="5.8" width="7" height="10.6" rx="1"/></g>`,
        1.2,
      ),
    ),
  );
  // On the pad's left corner: the front one sits right behind the phone's top edge.
  out.push(lampAt(cx - 10, cy + 11.4, Z0, "dst-web"));
}
{
  // Escritorio (inner side): a monitor on a stand.
  const [cx, cy] = posOf("R", PRODUCTS.escritorio);
  out.push(padOf([cx, cy]));
  out.push(cyl(cx, cy, 7, Z0, 1.4, "mid", { steps: 28 }));
  out.push(slab({ x: cx - 2, y: cy - 1.4, w: 4, d: 2.8, r: 0.6 }, Z0 + 1.4, 6, "mid", { steps: 2, bevel: 0 }));
  out.push(slab({ x: cx - 14, y: cy - 1.6, w: 28, d: 3.2, r: 1.2 }, Z0 + 6.4, 19, "hi", { steps: 2, bevel: 0.4, crease: "lo" }));
  const w = 24.8;
  const h = 16;
  out.push(
    faceY(
      cx - 12.4,
      cy + 1.6,
      Z0 + 23.9,
      screen(
        w,
        h,
        `<path class="scr-s" data-t="dim" d="M0 3.2h${w}M7 3.2v${h - 3.2}"/><path class="scr-s" data-t="dim" d="M1.6 6h3.6M1.6 8.6h3.6M1.6 11.2h3.6"/>` +
          `<g data-part="ui-escritorio"><path class="scr-s" data-t="hi" data-step="0" d="M10 13V7h5V5h6v4h2.4v4z"/><circle class="scr-s" data-t="acc" data-step="1" cx="16" cy="10" r="1.6"/><path class="scr-s" data-t="acc" data-step="2" d="M19.4 12.4l1.2 1.2 2.2-2.6"/></g>`,
        1.2,
      ),
    ),
  );
  out.push(lampAt(cx + 10, cy + 11.4, Z0, "dst-escritorio"));
}
{
  // Agentes IA (outer side): a console with a small orb of its own.
  const [cx, cy] = posOf("R", PRODUCTS.agentes);
  out.push(padOf([cx, cy]));
  out.push(slab({ x: cx - 11, y: cy - 9, w: 22, d: 18, r: 2 }, Z0, 11, "mid", { steps: 3, bevel: 0.5, seam: Z0 + 3 }));
  out.push(
    faceY(
      cx - 9,
      cy + 9,
      Z0 + 9.6,
      screen(
        18,
        7.4,
        `<g data-part="ui-agentes">${[0, 1, 2]
          .map((i) => `<g data-step="${i}"><path class="scr-s" data-t="acc" d="M1.8 ${1.9 + i * 2}l.7.7 1.3-1.5"/><path class="scr-s" d="M5.4 ${2 + i * 2}h${[9, 6.5, 8][i]}"/></g>`)
          .join("")}</g>`,
        1,
      ),
    ),
  );
  out.push(cyl(cx - 3, cy - 2, 3, Z0 + 11, 1, "lo", { steps: 18 }));
  out.push(cyl(cx - 3, cy - 2, 1.1, Z0 + 12, 6, "hi", { steps: 10, crease: "none" }));
  const [ax, ay] = at([cx - 3, cy - 2, Z0 + 21]);
  const ar = 3.8 * G.scaleOf(P);
  out.push(`<circle data-part="agent-halo" cx="${ax}" cy="${ay}" r="${ar * 2.4}" fill="url(#nx-halo)" opacity=".25"/><circle class="nx-orb" cx="${ax}" cy="${ay}" r="${ar}" fill="url(#nx-orb)"/>`);
  out.push(lampAt(cx + 7, cy + 5, Z0 + 11, "dst-agentes"));
}
{
  // App móvil (front): a phone on a dock.
  const [cx, cy] = posOf("R", PRODUCTS.movil);
  out.push(padOf([cx, cy]));
  out.push(slab({ x: cx - 10, y: cy - 4.5, w: 20, d: 9, r: 2 }, Z0, 2.2, "mid", { steps: 3, bevel: 0.4 }));
  out.push(slab({ x: cx - 7.6, y: cy - 1.5, w: 15.2, d: 3, r: 1.4 }, Z0 + 2.2, 27, "hi", { steps: 3, bevel: 0.4, crease: "lo" }));
  const w = 12.4;
  const h = 23.6;
  out.push(
    faceY(
      cx - 6.2,
      cy + 1.5,
      Z0 + 27.5,
      screen(
        w,
        h,
        `<path class="scr-s" data-t="dim" d="M4.4 1.8h3.6"/><rect class="scr-f" x="1.6" y="9" width="${w - 3.2}" height="3" rx=".8"/><rect class="scr-f" x="1.6" y="13.2" width="${w - 3.2}" height="3" rx=".8"/><rect class="scr-f" x="1.6" y="17.4" width="${w - 3.2}" height="3" rx=".8"/>` +
          `<g data-part="ui-movil"><rect class="scr-f scr-glow" data-t="acc" data-step="0" x="1.6" y="3.8" width="${w - 3.2}" height="4" rx="1.2"/><path data-step="1" d="M3.2 5.8h5" stroke="#1a0a03" stroke-width=".9" fill="none"/></g>`,
        2.2,
      ),
    ),
  );
  out.push(lampAt(cx - 10, cy + 11.4, Z0, "dst-movil"));
}
out.push(`<g data-part="beads"></g>`);

// Routes for the live beads, as screen polylines, and the socket each chip's fibre lands on.
const onScreen = (side, pts) => flat(pts.map(place[side]), ZI + 0.2);
const feedIn = {};
const routeIn = {};
const routeOut = {};
const feedOut = {};
const ports = {};
for (const [id, slot] of Object.entries(SYSTEMS)) {
  feedIn[id] = round1(onScreen("L", FEED[slot]));
  routeIn[id] = round1([...onScreen("L", LEAD[slot]), ...flat(cableL, 0.5)]);
  ports[id] = round1([at([...socketAt("L", slot), SOCKET_TOP])])[0];
}
for (const [id, slot] of Object.entries(PRODUCTS)) {
  routeOut[id] = round1([...flat(cableR, 0.5), ...onScreen("R", [...LEAD[slot]].reverse())]);
  feedOut[id] = round1(onScreen("R", [...FEED[slot]].reverse()));
  ports[id] = round1([at([...socketAt("R", slot), SOCKET_TOP])])[0];
}

save("nexus", {
  width: W,
  height: H,
  label:
    "El taller de Veodar: a la izquierda, una isla con los sistemas de la empresa —ERP, CRM, documentos y correo—; en el centro, un núcleo de IA con un orbe encendido entre dos anillos y un pulsador de confirmación humana; a la derecha, otra isla con lo que se construye —una web, un agente, un puesto de escritorio y una app móvil—. Cada isla tiene una regleta de cuatro conectores donde enchufan las fibras de la página, y cables por el suelo llevan cada tarea de un sistema al núcleo y del núcleo a un producto.",
  body: out,
  motion: {
    P,
    w: W,
    h: H,
    ports,
    feedIn,
    routeIn,
    routeOut,
    feedOut,
    trunk: round1(flat(trunk, 0.5)),
    core: { orbZ: CORE.orbZ, rings: CORE.ring, tickR: CORE.r - 9, tickZ: 4.02 },
    button: 1.9,
    anchors: {
      // Where the two HTML notes attach: the top of the rings, and the foot of the console's front corner.
      core: round1([at([0, 0, CORE.orbZ + CORE.ring[1]])])[0],
      review: round1([at([REVIEW.x + 9, REVIEW.y + 7, 4])])[0],
      // Front corner of each island, for the captions shown when the page's chips are hidden.
      left: round1([at([CL[0] + ISLAND / 2, CL[1] + ISLAND / 2, 0])])[0],
      right: round1([at([CR[0] + ISLAND / 2, CR[1] + ISLAND / 2, 0])])[0],
    },
  },
});
