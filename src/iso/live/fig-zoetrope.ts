import { iso, pathOf, translateAlong } from '../iso-kit.mjs';
import { helpers, type Factory, type Proj, type Vec3 } from './runtime';

const CYCLE = 1.8; // one bounce = one turn of the drum = twelve frames

// Height of the ball over one bounce and how much it deforms.
const height = (p: number) => 4 * p * (1 - p);
const shape = (p: number) => {
  const edge = Math.min(p, 1 - p);
  if (edge < 0.045) return { sx: 1.28, sy: 0.7 };
  if (edge < 0.2) return { sx: 0.9, sy: 1.16 };
  return { sx: 1, sy: 1 };
};

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const drum = h.q('[data-part="drum"]');
  const drumTop = h.q('[data-part="drum-top"]');
  const view = h.q('[data-part="view"]');
  const curve = h.q<SVGPathElement>('[data-part="curve"]');
  const curveDot = h.q('[data-part="curve-dot"]');
  const frameText = h.q<SVGTextElement>('[data-part="frame"]');
  const playhead = h.q('[data-part="playhead"]');
  const rec = h.q('[data-part="rec"]');
  const D = M.drum;
  const N = M.frames as number;
  const V = M.view;
  const G = M.graph;
  const a0 = (P.azimuth * Math.PI) / 180;
  const view2 = [Math.cos(a0), Math.sin(a0)];
  const on = (ang: number, z: number, r = D.r): Vec3 => [D.x + Math.cos(ang) * r, D.y + Math.sin(ang) * r, z];

  // The easing curve never changes: draw it once.
  const pts: string[] = [];
  for (let i = 0; i <= 24; i++) pts.push(`${(G.x + (i / 24) * G.s).toFixed(2)} ${(G.y + G.s - height(i / 24) * (G.s - 3)).toFixed(2)}`);
  curve.setAttribute('d', `M${pts.join('L')}`);
  h.on(rec, true);
  let lastFrame = -1;

  const apply = (t: number) => {
    const u = (t % CYCLE) / CYCLE;
    const theta = -u * Math.PI * 2;

    // Drum: slits above, frame cards below, only on the side that faces us.
    let slits = '';
    let cards = '';
    let balls = '';
    for (let i = 0; i < N; i++) {
      const a = theta + (i / N) * Math.PI * 2;
      const facing = Math.cos(a) * view2[0] + Math.sin(a) * view2[1];
      if (facing > 0.1) {
        const alpha = Math.min(1, (facing - 0.1) * 3.2).toFixed(2);
        slits += `<path class="iso-line" data-tone="hi" opacity="${alpha}" style="stroke-width:2.4px;stroke-linecap:butt" d="${pathOf([iso(on(a, 31), P), iso(on(a, 40), P)])}"/>`;
      }
      const mid = a + Math.PI / N;
      const f2 = Math.cos(mid) * view2[0] + Math.sin(mid) * view2[1];
      if (f2 > 0.16) {
        const alpha = Math.min(1, (f2 - 0.16) * 3).toFixed(2);
        const w = 0.19;
        const quad = [on(mid - w, 14), on(mid + w, 14), on(mid + w, 25.5), on(mid - w, 25.5)].map((p) => iso(p, P));
        cards += `<path d="${pathOf(quad, true)}" fill="#fffefb" stroke="var(--anatomy-mid)" stroke-width=".7" opacity="${alpha}"/>`;
        const [bx, by] = iso(on(mid, 15.6 + height(i / N) * 8), P);
        balls += `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="1.5" fill="#ff5a1f" opacity="${alpha}"/>`;
      }
    }
    drum.innerHTML = cards + balls + slits;
    // A mark on the lid so the turn reads from above too.
    const lid = [iso(on(theta, D.z1, 6), P), iso(on(theta, D.z1, D.r - 3.4), P)];
    drumTop.innerHTML = `<path class="iso-line" data-tone="mid" d="${pathOf(lid)}"/>`;

    // Viewer: stepped playback with ghosts of the two previous frames.
    const frame = Math.floor(u * N) % N;
    if (frame !== lastFrame) {
      lastFrame = frame;
      let html = '';
      for (let g = 2; g >= 0; g--) {
        const p = ((frame - g + N) % N) / N;
        const { sx, sy } = shape(p);
        const cy = V.ground - V.r * sy - height(p) * V.lift;
        html += `<ellipse class="scr-f${g === 0 ? ' scr-glow' : ''}" data-t="acc" cx="${V.x}" cy="${cy.toFixed(2)}" rx="${(V.r * sx).toFixed(2)}" ry="${(V.r * sy).toFixed(2)}" opacity="${[1, 0.3, 0.13][g]}"/>`;
      }
      const sh = 1 - height(frame / N) * 0.6;
      html += `<ellipse class="scr-f" data-t="mid" cx="${V.x}" cy="${V.ground + 1.4}" rx="${(V.r * 1.2 * sh).toFixed(2)}" ry=".7" opacity="${(0.25 + sh * 0.5).toFixed(2)}"/>`;
      view.innerHTML = html;
      const p = frame / N;
      curveDot.setAttribute('transform', `translate(${(G.x + p * G.s).toFixed(2)} ${(G.y + G.s - height(p) * (G.s - 3)).toFixed(2)})`);
      frameText.textContent = `${String(frame + 1).padStart(2, '0')}/${N}`;
      const { sy } = shape(p);
      h.say(`Fotograma ${String(frame + 1).padStart(2, '0')}/${N} · ${sy < 1 ? 'aplasta' : sy > 1 ? 'estira' : 'en el aire'} · escala ${sy.toFixed(2).replace('.', ',')}`);
    }
    playhead.setAttribute('transform', translateAlong(P, [M.track.x0 + u * M.track.x1, 0, 0]));
  };
  return { apply, still: CYCLE * 0.42 };
};

export default create;
