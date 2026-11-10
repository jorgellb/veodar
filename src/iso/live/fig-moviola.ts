import { lineOnTop } from '../iso-kit.mjs';
import { clamp01, ease, helpers, polar, span, type Factory, type Proj } from './runtime';

const PLAY = 9.4;
const CYCLE = 11;
const SCENES = [
  { name: 'Escena 1 · el dolor', caption: 'Cada lunes, doscientos correos.' },
  { name: 'Escena 2 · el momento', caption: 'Un clic. La IA los ordena.' },
  { name: 'Escena 3 · la promesa', caption: 'Y tu equipo, a lo importante.' },
];

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const view = h.q('[data-part="view"]');
  const tc = h.q<SVGTextElement>('[data-part="tc"]');
  const playhead = h.q('[data-part="playhead"]');
  const clips = h.qa('[data-clip]');
  const reels = h.qa('[data-reel]');
  const jog = h.q('[data-part="jog"]');
  const lamp = h.q('[data-part="play"]');
  const W = M.screen.w as number;
  const cx = W / 2;

  const scene1 = (p: number) => {
    let html = `<rect class="scr-s" x="${cx - 17}" y="8" width="34" height="31" rx="2.4"/>`;
    const rows = Math.min(5, Math.floor(p * 7));
    for (let i = 0; i < rows; i++) {
      const y = 11 + i * 5.4;
      html += `<rect class="scr-f" x="${cx - 14}" y="${y}" width="28" height="4" rx="1"/><circle class="scr-f" data-t="acc" cx="${cx - 11.6}" cy="${y + 2}" r=".9"/><path class="scr-s" data-t="dim" d="M${cx - 9} ${y + 2}h${[14, 18, 11, 16, 13][i]}"/>`;
    }
    const count = Math.round(p * 204);
    html += `<circle class="scr-f scr-glow" data-t="acc" cx="${cx + 17}" cy="8" r="4.2"/><text x="${cx + 17}" y="9.2" font-size="3" text-anchor="middle" font-weight="600" fill="#1a0a03">${count}</text>`;
    return html;
  };
  const scene2 = (p: number) => {
    const merge = ease(span(p, 0.42, 0.7));
    let html = `<rect class="scr-s" x="${cx - 17}" y="8" width="34" height="31" rx="2.4"/>`;
    for (let i = 0; i < 5; i++) {
      const y0 = 11 + i * 5.4;
      const y = y0 + (19 - y0) * merge;
      html += `<rect class="scr-f" x="${cx - 14}" y="${y.toFixed(2)}" width="28" height="4" rx="1" opacity="${(1 - merge * 0.8).toFixed(2)}"/>`;
    }
    if (merge > 0.5) {
      const a = (merge - 0.5) * 2;
      html += `<g opacity="${a.toFixed(2)}"><rect class="scr-f" data-t="hi" x="${cx - 13}" y="14" width="26" height="13" rx="2"/><path d="M${cx - 5} 20.6l3.2 3.2 6.4-6.8" fill="none" stroke="#ff5a1f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></g>`;
    }
    // Button and the cursor that clicks it.
    html += `<rect class="scr-f" data-t="acc" x="${cx - 9}" y="31.4" width="18" height="5" rx="2.5"/>`;
    const travel = ease(span(p, 0.05, 0.36));
    const mx = cx + 22 - travel * 20;
    const my = 40 - travel * 6.4;
    const click = span(p, 0.36, 0.56);
    if (click > 0 && click < 1) html += `<circle cx="${cx + 2}" cy="33.9" r="${(2 + click * 7).toFixed(2)}" fill="none" stroke="#ff5a1f" stroke-width="1" opacity="${(1 - click).toFixed(2)}"/>`;
    html += `<path class="scr-f" data-t="hi" d="M${mx.toFixed(2)} ${my.toFixed(2)}l0 6 1.7-1.5 1.2 2.7 1.1-.5-1.2-2.6 2.2-.1z"/>`;
    return html;
  };
  const scene3 = (p: number) => {
    const draw = ease(span(p, 0.05, 0.45));
    const pts = [
      [cx - 9, 11],
      [cx, 27],
      [cx + 9, 11],
    ];
    const s = draw * 2;
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    if (s <= 1) d += `L${pts[0][0] + (pts[1][0] - pts[0][0]) * s} ${pts[0][1] + (pts[1][1] - pts[0][1]) * s}`;
    else d += `L${pts[1][0]} ${pts[1][1]}L${pts[1][0] + (pts[2][0] - pts[1][0]) * (s - 1)} ${pts[1][1] + (pts[2][1] - pts[1][1]) * (s - 1)}`;
    const word = ease(span(p, 0.4, 0.62));
    const cta = ease(span(p, 0.6, 0.8));
    return (
      `<path class="scr-glow" d="${d}" fill="none" stroke="#ff5a1f" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>` +
      `<text class="scr-t" x="${cx}" y="35" font-size="6.4" text-anchor="middle" style="font-family:Georgia,serif;letter-spacing:-.02em" opacity="${word.toFixed(2)}">veodar</text>` +
      `<rect class="scr-s" data-t="hi" x="${cx - 11}" y="37.4" width="22" height="4" rx="2" opacity="${cta.toFixed(2)}"/>`
    );
  };
  const painters = [scene1, scene2, scene3];

  const apply = (t: number) => {
    const u = t % CYCLE;
    const playing = u < PLAY;
    const f = playing ? u / PLAY : 1 - ease(span(u, PLAY + 0.5, CYCLE - 0.2));
    playhead.setAttribute('transform', `translate(${(f * M.tw).toFixed(2)} 0)`);
    let idx = 0;
    (M.clips as number[][]).forEach(([a], i) => {
      if (f >= a) idx = i;
    });
    clips.forEach((clip, i) => clip.setAttribute('data-t', i === idx && playing ? 'acc' : 'mid'));
    const [a, b] = M.clips[idx];
    const p = clamp01((f - a) / (b - a));
    const fade = Math.min(1, p * 9, (1 - p) * 9 + 0.001);
    const caption = playing
      ? `<text class="scr-t" x="${cx}" y="${M.screen.h - 2.6}" font-size="2.7" text-anchor="middle">${SCENES[idx].caption}</text>`
      : '';
    view.innerHTML = `<g opacity="${(playing ? Math.max(0.05, fade) : 0.25).toFixed(2)}">${painters[idx](playing ? p : 0.999)}</g>${caption}`;
    const secs = Math.round(f * 30);
    const label = `00:${String(secs).padStart(2, '0')} / 00:30`;
    if (tc.textContent !== label) tc.textContent = label;

    // Reels and jog wheel turn with the playhead (and spin back on rewind).
    const turn = f * 16;
    reels.forEach((el, i) => {
      const [x, y] = el.dataset.reel!.split(',').map(Number);
      let d = '';
      for (let k = 0; k < 3; k++) {
        const ang = turn * (i ? 1.25 : 1) + (k * Math.PI * 2) / 3;
        d += lineOnTop(polar(x, y, 2.2, ang), polar(x, y, 8.4, ang), M.reelZ, P);
      }
      el.innerHTML = `<path class="iso-line" data-tone="mid" d="${d}"/>`;
    });
    const J = M.jog;
    jog.innerHTML = `<path class="iso-line" data-tone="hi" style="stroke-width:1.5px" d="${lineOnTop(polar(J.x, J.y, 2, turn * 0.6), polar(J.x, J.y, J.r - 3.6, turn * 0.6), J.z, P)}"/>`;
    h.on(lamp, playing);
    h.say(playing ? `${label.slice(0, 5)} · ${SCENES[idx].name}` : 'Rebobinando · listo para exportar en vertical');
  };
  return { apply, still: PLAY * 0.52 };
};

export default create;
