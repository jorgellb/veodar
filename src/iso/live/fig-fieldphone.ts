import { translateAlong } from '../iso-kit.mjs';
import { tr, clamp01, coilZ, ease, helpers, lerp, pulse, span, type Factory, type Proj, type Vec3 } from './runtime';

const CYCLE = 12.6;
const OFFLINE: [number, number] = [3.5, 8.7];
// One report per row: when its fields fill, when the tapper sends it, where it goes.
const PARTS = [
  { id: '0142', show: 0, fill: [0.3, 1.5], tap: 1.8, queued: false, fly: [1.95, 2.8] },
  { id: '0143', show: 3.2, fill: [3.9, 5.0], tap: 5.3, queued: true, fly: [5.45, 6.0], sync: [9.0, 9.8] },
  { id: '0144', show: 6.2, fill: [6.5, 7.4], tap: 7.7, queued: true, fly: [7.85, 8.4], sync: [9.5, 10.3] },
] as const;

const create: Factory = (root, M) => {
  const P = M.P as Proj;
  const h = helpers(root, P);
  const bars = h.qa<SVGRectElement>('[data-bar]');
  const fields = h.qa<SVGRectElement>('[data-field]');
  const checks = h.qa<SVGCircleElement>('[data-check]');
  const title = h.q<SVGTextElement>('[data-part="title"]');
  const net = h.q<SVGTextElement>('[data-part="net"]');
  const photo = h.q('[data-part="photo"]');
  const btn = h.q<SVGRectElement>('[data-part="btn"]');
  const btnText = h.q<SVGTextElement>('[data-part="btn-text"]');
  const plunger = h.q('[data-part="plunger"]');
  const spring = h.q('[data-part="tap-spring"]');
  const beacon = h.q('[data-part="beacon"]');
  const rx = h.q('[data-part="rx"]');
  const waves = h.qa('[data-wave]');
  const cards = h.qa('[data-card]');
  const rows = h.qa('[data-row]');
  const rowText = h.qa<SVGTextElement>('[data-row-text]');
  const T = M.tap;
  const text = (el: Element, value: string) => {
    if (el.textContent !== value) el.textContent = value;
  };
  const fly = (a: Vec3, b: Vec3, f: number, lift: number): Vec3 => [lerp(a[0], b[0], f), lerp(a[1], b[1], f), lerp(a[2], b[2], f) + Math.sin(f * Math.PI) * lift];

  const apply = (t: number) => {
    const u = t % CYCLE;
    const online = u < OFFLINE[0] || u >= OFFLINE[1];
    const idx = u < PARTS[1].show ? 0 : u < PARTS[2].show ? 1 : 2;
    const part = PARTS[idx];

    // Coverage: bars drop and come back one by one; the mast radiates only when online.
    const level = online ? (u >= OFFLINE[1] ? clamp01((u - OFFLINE[1]) / 0.5) * 4 : 4) : (1 - clamp01((u - OFFLINE[0]) / 0.4)) * 4;
    bars.forEach((bar, i) => bar.setAttribute('fill-opacity', level > i + 0.5 ? '0.9' : '0.18'));
    h.on(beacon, online);
    waves.forEach((wave, i) => {
      const phase = (u * 0.9 - i * 0.22) % 1;
      wave.setAttribute('opacity', online ? (Math.max(0, Math.sin(phase * Math.PI)) * 0.85).toFixed(2) : '0');
    });

    // Screen of the current report.
    text(title, tr(`Parte ${part.id}`, `Report ${part.id}`));
    text(net, online ? tr('Avería · Almacén 2', 'Fault · Warehouse 2') : tr('Sin cobertura · se guarda aquí', 'No signal · saved here'));
    net.setAttribute('data-t', online ? 'dim' : 'acc');
    const filled = span(u, part.fill[0], part.fill[1]) * 3;
    fields.forEach((field, i) => field.setAttribute('width', (clamp01(filled - i) * Number(field.dataset.w)).toFixed(2)));
    checks.forEach((check, i) => check.setAttribute('opacity', filled >= i + 1 ? '1' : '0'));
    photo.setAttribute('opacity', ease(span(u, part.fill[1] - 0.3, part.fill[1])).toFixed(2));
    const ready = u >= part.fill[1];
    const sent = u >= part.tap;
    const delivered = sent && (!part.queued || ('sync' in part && u >= part.sync[1]));
    btn.setAttribute('data-t', ready && !sent ? 'acc' : delivered ? 'hi' : 'mid');
    text(btnText, !sent ? tr('ENVIAR', 'SEND') : delivered ? tr('ENVIADO', 'SENT') : tr('EN COLA', 'QUEUED'));
    btnText.setAttribute('fill', ready && !sent ? '#1a0a03' : delivered ? '#16142c' : '#f4f0e6');

    // Tapper.
    let press = 0;
    for (const p of PARTS) press = Math.max(press, pulse(u, p.tap - 0.16, p.tap + 0.2, 0.12));
    const dz = -(T.rest - T.press) * press;
    plunger.setAttribute('transform', translateAlong(P, [0, 0, dz]));
    const coil = coilZ(T.rest + 4 + dz, T.arm, T.x, T.y, 2.3, 6, P);
    spring.innerHTML = `<path class="iso-line" data-tone="lo" d="${coil.back}"/><path class="iso-line" data-tone="mid" d="${coil.front}"/>`;

    // Reports in flight, waiting in the queue, or dropping into the office slot.
    let queued = 0;
    let arrived = 0;
    PARTS.forEach((p, i) => {
      const el = cards[i];
      if (u < p.fly[0] || u > CYCLE - 0.8) {
        el.setAttribute('opacity', '0');
        if (u > CYCLE - 0.8 && u >= p.fly[0]) arrived += 1;
        return;
      }
      const slotQ: Vec3 = [M.queue[0], M.queue[1], M.queue[2] + (i - 1) * (M.cardH + 0.5)];
      let pos: Vec3;
      let alpha = 1;
      if (!p.queued) {
        const f = ease(span(u, p.fly[0], p.fly[1]));
        pos = fly(M.spawn, M.slot, f, 26);
        alpha = Math.min(span(u, p.fly[0], p.fly[0] + 0.12), 1 - span(f, 0.86, 1));
        if (f >= 1) arrived += 1;
      } else if (u < p.sync[0]) {
        const f = ease(span(u, p.fly[0], p.fly[1]));
        pos = fly(M.spawn, slotQ, f, 18);
        alpha = span(u, p.fly[0], p.fly[0] + 0.12);
        if (f >= 1) queued += 1;
      } else {
        const f = ease(span(u, p.sync[0], p.sync[1]));
        pos = fly(slotQ, M.slot, f, 30);
        alpha = 1 - span(f, 0.86, 1);
        if (f >= 1) arrived += 1;
        else if (f <= 0) queued += 1;
      }
      el.setAttribute('transform', translateAlong(P, pos));
      el.setAttribute('opacity', alpha.toFixed(2));
    });

    // Office screen: one row per report received.
    const order = [PARTS[0], PARTS[1], PARTS[2]];
    const fadeAll = 1 - span(u, CYCLE - 0.8, CYCLE - 0.2);
    rows.forEach((row, i) => {
      const p = order[i];
      const when = p.queued && 'sync' in p ? p.sync[1] : p.fly[1];
      row.setAttribute('opacity', (ease(span(u, when - 0.1, when + 0.2)) * fadeAll).toFixed(2));
      text(rowText[i], tr(`${p.id} recibido`, `${p.id} received`));
    });
    h.on(rx, PARTS.some((p) => Math.abs(u - (p.queued && 'sync' in p ? p.sync[1] : p.fly[1])) < 0.25));

    let say = '';
    if (u < PARTS[0].tap) say = tr('Cobertura 4/4 · rellenando el parte 0142', 'Signal 4/4 · filling in report 0142');
    else if (u < OFFLINE[0]) say = tr('Parte 0142 enviado · recibido en oficina', 'Report 0142 sent · received at the office');
    else if (u < OFFLINE[1])
      say = queued
        ? tr(`Sin cobertura · ${queued} ${queued === 1 ? 'parte' : 'partes'} en cola`, `No signal · ${queued} ${queued === 1 ? 'report' : 'reports'} queued`)
        : tr('Sin cobertura · el parte se guarda en el teléfono', 'No signal · the report is saved on the phone');
    else if (u < PARTS[2].sync![1]) say = tr('Vuelve la cobertura · sincronizando la cola', 'Signal is back · syncing the queue');
    else say = tr('Todo recibido en oficina · 3 de 3, ninguno perdido', 'All received at the office · 3 of 3, none lost');
    h.say(say);
    void arrived;
  };
  return { apply, still: 7.0 };
};

export default create;
