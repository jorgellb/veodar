// Cuadro de relés del agente: each relay is a tool the agent may call. A
// permission jumper on top decides whether the coil can pull its armature;
// the key switch is the credential that powers the whole rail.
import { G, k, kitFor, save } from "./lib.mjs";

const W = 720;
const H = 460;
const PLATE = { x: -122, y: -64, w: 244, d: 128, r: 10 };
const TOOLS = ["leer_correo", "clasificar", "crear_borrador", "consultar_erp", "enviar_pago"];
const XS = TOOLS.map((_, i) => -76 + i * 36);
const ALLOWED = [true, true, true, true, false];
const TOP = 20;
const ARM_Z = 34.2;
const KEY = { x: 98, y: 38, z: 14 };
const BLOCK = { x: -112, y: 30, w: 196, d: 14, r: 2 };

const P = k.fitProjection([...k.boxCorners(PLATE, -18, 0), [XS[0], -18, 38], [XS[4], -18, 38]], W, H, {
  pad: 22,
  azimuth: 57,
  elevation: 32,
});
const { at, S, L, D, slab, cyl, screws, base, label, ruler, lamp, slot } = kitFor(P);

const out = [base(PLATE)];

// Ribbon from the agent controller to the terminal block, flat on the plate.
const ribbon = { x: -111, y: -30, w: 8, d: 61, r: 0.6 };
out.push(slab(ribbon, 0, 0.6, "lo", { steps: 2, bevel: 0, crease: "none" }));
for (let i = 1; i < 6; i++) out.push(L(k.lineOnTop([ribbon.x + i * 1.33, ribbon.y], [ribbon.x + i * 1.33, ribbon.y + ribbon.d], 0.6, P), { tone: "faint" }));

// Agent controller with a chip.
const ctl = { x: -114, y: -58, w: 54, d: 28, r: 2.4 };
out.push(slab(ctl, 0, 12, "mid", { steps: 4, bevel: 0.6, seam: 4 }));
const chip = { x: -100, y: -51, w: 24, d: 14, r: 1 };
out.push(slab(chip, 12, 2.4, "hi", { steps: 2, bevel: 0.3, crease: "lo" }));
const pins = [];
for (let i = 0; i < 9; i++) {
  pins.push(at([chip.x + 2 + i * 2.5, chip.y - 1, 12]), at([chip.x + 2 + i * 2.5, chip.y + chip.d + 1, 12]));
}
out.push(D(pins, { size: 0.42, tone: "mid" }));
out.push(L(k.ring(chip.x + 4, chip.y + 4, 1.2, 14.4, P, 12), { tone: "lo" }));
out.push(`<g data-part="cpu" class="veo-lamp">${cyl(ctl.x + ctl.w - 8, ctl.y + 8, 2, 12, 1.4, "hi", { steps: 18, crease: "lo" })}</g>`);
for (let i = 0; i < 5; i++) out.push(L(slot("y", ctl.y + ctl.d, ctl.x + 6 + i * 5, ctl.x + 8.6 + i * 5, 3.5, 9, 0.9), { tone: "lo" }));
out.push(...screws(k.corners(ctl, 3.2), 12, 1.1));

// DIN rail with end clamps.
const rail = { x: -96, y: -16, w: 180, d: 12, r: 1 };
out.push(slab(rail, 0, 2, "lo", { steps: 2, bevel: 0.3 }));
out.push(slab({ x: rail.x, y: rail.y, w: rail.w, d: 1.8, r: 0.4 }, 2, 2, "mid", { steps: 2, bevel: 0.2 }));
for (const x of [rail.x - 5, rail.x + rail.w + 1]) {
  out.push(slab({ x, y: -18, w: 4, d: 16, r: 1 }, 0, 8, "mid", { steps: 2, bevel: 0.3 }));
  out.push(D([at([x + 2, -10, 8])], { size: 0.5 }));
}

// Relay modules.
XS.forEach((x, i) => {
  const g = [];
  const body = { x: x - 14, y: -20, w: 28, d: 30, r: 2 };
  g.push(slab(body, 2, TOP - 2, "mid", { steps: 4, bevel: 0.6, seam: 8 }));
  g.push(L(k.planOutline(k.insetPlan(body, 2.4), TOP, P, 3), { tone: "faint" }));
  // Yoke at the back, bobbin with its coil split around the core.
  g.push(slab({ x: x - 8, y: -18.5, w: 16, d: 3, r: 0.6 }, TOP, 13.4, "mid", { steps: 2, bevel: 0.3 }));
  // Bobbin along x: left flange, back half of the winding, core, front half, right flange.
  g.push(slab({ x: x - 7.6, y: -14.4, w: 2.2, d: 12.8, r: 0.6 }, TOP, 12.4, "mid", { steps: 2, bevel: 0.3 }));
  const F = G.frameAlong([x - 5.4, -8, 26.2], [1, 0, 0]);
  const wind = G.disc(0, 10.8, 4.5, F, P, {});
  const coil = k.coil(x - 5.2, x + 5.2, [-8, 26.2], 4.55, 10, "x", P);
  g.push(`<g data-part="coil-${i}" class="veo-coil">${S(wind, { tone: "hi", crease: "none", inner: L(coil.front, { tone: "mid" }) })}</g>`);
  g.push(slab({ x: x + 5.4, y: -14.4, w: 2.2, d: 12.8, r: 0.6 }, TOP, 12.4, "mid", { steps: 2, bevel: 0.3 }));
  g.push(L(k.lineOnTop([x - 7.6, -1.6], [x + 7.6, -1.6], TOP, P), { tone: "faint" }));
  // Armature plate hinged on the yoke; it drops when the coil pulls.
  g.push(
    `<g data-part="arm-${i}">${slab({ x: x - 8.5, y: -19, w: 17, d: 7.6, r: 0.8 }, ARM_Z, 1.6, "hi", {
      steps: 2,
      bevel: 0.3,
      crease: "lo",
    })}${D([at([x - 5, -15.5, ARM_Z + 1.6]), at([x + 5, -15.5, ARM_Z + 1.6])], { size: 0.5, tone: "hi" })}${slab({ x: x - 2, y: -12, w: 4, d: 3, r: 0.5 }, ARM_Z - 1, 2.6, "hi", { steps: 2, bevel: 0, crease: "lo" })}</g>`,
  );
  // Front strip: lamp, terminal screw, permission jumper.
  g.push(lamp(x - 8, 6, TOP, 2.1, `lamp-${i}`));
  g.push(...screws([[x, 6]], TOP, 1.5, 0.5));
  g.push(L(k.ring(x + 8, 2.6, 1.1, TOP, P, 12) + k.ring(x + 8, 7.4, 1.1, TOP, P, 12), { tone: "lo" }));
  if (ALLOWED[i]) {
    g.push(slab({ x: x + 5.6, y: 0.4, w: 4.8, d: 9.2, r: 1.2 }, TOP, 3.4, "hi", { steps: 3, bevel: 0.3, crease: "lo" }));
  } else {
    g.push(D([at([x + 8, 2.6, TOP]), at([x + 8, 7.4, TOP])], { size: 0.6, tone: "hi" }));
  }
  out.push(g.join(""));
});

// Wires from the terminal block to each relay, and their signal beads.
const wires = XS.map((x) => [
  [x, BLOCK.y, 6],
  [x, 22, 1.2],
  [x, 13, 1.2],
  [x, 10, 5],
]);
wires.forEach((pts) => {
  const flat = pts.map(at);
  out.push(k.wireSvg(flat[0], flat[flat.length - 1], { via: flat.slice(1, -1), tone: "mid", size: 1 }));
});
out.push(XS.map((_, i) => `<g data-part="bead-${i}" opacity="0"><circle class="veo-bead" r="1.9" cx="0" cy="0"/></g>`).join(""));

// Terminal block with a screw per wire.
out.push(slab(BLOCK, 0, 10, "mid", { steps: 4, bevel: 0.6, seam: 4 }));
out.push(...screws(XS.map((x) => [x, BLOCK.y + 7]), 10, 1.8, 0.55));
out.push(...screws([[BLOCK.x + 4, BLOCK.y + 7]], 10, 1.8, 0.55));
for (const x of XS) out.push(L(k.lineOnTop([x + 5, BLOCK.y + 4], [x + 5, BLOCK.y + 10], 10, P), { tone: "faint" }));

// Key switch: the credential that powers the rail.
const ped = { x: KEY.x - 14, y: KEY.y - 14, w: 28, d: 28, r: 3 };
out.push(slab(ped, 0, 10, "mid", { steps: 4, bevel: 0.6, seam: 4 }));
out.push(...screws(k.corners(ped, 3.2), 10, 1, 0.45));
out.push(cyl(KEY.x, KEY.y, 8, 10, 1.2, "lo", { steps: 32 }));
out.push(cyl(KEY.x, KEY.y, 6, 11.2, KEY.z - 11.2, "hi", { steps: 32, bevel: 0.4, crease: "lo" }));
out.push(L(k.radialTicks(KEY.x, KEY.y, 7.6, 4, 1, 11.2, [0, 1.2], P, -Math.PI / 2, Math.PI / 2).major, { tone: "mid" }));
out.push(`<g data-part="key"></g>`);
out.push(lamp(KEY.x - 8, KEY.y + 9, 10, 1.8, "master"));

out.push(label({ x: -112, y: 48, w: 54, d: 12, r: 1 }, "AGENTE · MCP"));
out.push(ruler({ x: -30, y: 52, w: 96, d: 6, r: 1 }));

save("relays", {
  width: W,
  height: H,
  label:
    "Un cuadro de relés sobre una placa: cinco relés en un carril, uno por herramienta del agente, con un puente de permiso encima; una llave enciende el carril, los relés con permiso cierran su armadura y encienden su lámpara, y el que no tiene puente se bloquea.",
  body: out,
  motion: {
    P,
    tools: TOOLS,
    allowed: ALLOWED,
    wires: wires.map((pts) => pts.map(at)),
    key: { ...KEY, top: KEY.z },
    armDrop: 1.9,
  },
});
