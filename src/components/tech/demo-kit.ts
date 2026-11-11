// What the examples of the technology pages share: finding their own box,
// their translated strings, a pause that respects "reduce motion", the announcements
// for screen readers and the reset button of the frame (DemoFrame.astro).
export type Demo<T> = {
  root: HTMLElement;
  T: T;
  $: <E extends Element = HTMLElement>(selector: string) => E;
  $$: <E extends Element = HTMLElement>(selector: string) => E[];
  /** Says something to screen readers (the frame has a polite live region). */
  say: (text: string) => void;
  /** Waits, unless the visitor asked for less motion: then every step is immediate. */
  wait: (ms: number) => Promise<void>;
  /** Runs when the visitor presses "start again". */
  onReset: (fn: () => void) => void;
  /** True while a newer run has replaced the one that is asking. */
  stale: (run: number) => boolean;
  newRun: () => number;
};

export function demo<T = Record<string, string>>(id: string): Demo<T> | null {
  const root = document.querySelector<HTMLElement>(`[data-demo="${id}"]`);
  if (!root) return null;
  const live = root.querySelector<HTMLElement>('[data-demo-live]');
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  let run = 0;
  root.querySelector('[data-demo-reset]')?.addEventListener('click', () => {
    run++;
    root.dispatchEvent(new CustomEvent('dm:reset'));
  });
  return {
    root,
    T: JSON.parse(root.dataset.strings ?? '{}') as T,
    $: (selector) => root.querySelector(selector)!,
    $$: (selector) => [...root.querySelectorAll(selector)] as never,
    say: (text) => {
      if (live) live.textContent = text;
    },
    wait: (ms) => new Promise((done) => setTimeout(done, still.matches ? 0 : ms)),
    onReset: (fn) => root.addEventListener('dm:reset', fn),
    stale: (mine) => mine !== run,
    newRun: () => ++run,
  };
}

/** A step of a pipeline: idle, run, ok, warn or err, with an optional note beside it. */
export function setStep(el: Element | null | undefined, state: 'idle' | 'run' | 'ok' | 'warn' | 'err', note = '') {
  if (!el) return;
  el.setAttribute('data-state', state);
  const small = el.querySelector('small');
  if (small) small.textContent = note;
}

/** Fills {name} places in a translated string. */
export const fill = (text: string, values: Record<string, string | number>) => text.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));

export const escapeHtml = (text: string) => text.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]!);

/**
 * Redraws `box` without dropping the keyboard. If focus was inside it, it goes back to
 * the control with the same data-* hook (the same button, drawn again) or, when that
 * control is gone, to the first match of `fallback`.
 */
export function redraw(box: HTMLElement, render: () => void, fallback = 'button, select, input, [tabindex]') {
  const active = document.activeElement instanceof HTMLElement && box.contains(document.activeElement) ? document.activeElement : null;
  // The hook is the last data-* attribute that is not about looks: data-close="0142", data-add…
  const hook = active ? [...active.attributes].filter((attr) => attr.name.startsWith('data-') && attr.name !== 'data-tone').pop() : undefined;
  render();
  if (!active) return;
  const same = hook ? box.querySelector<HTMLElement>(`[${hook.name}="${CSS.escape(hook.value)}"]`) : null;
  (same ?? box.querySelector<HTMLElement>(fallback))?.focus();
}
