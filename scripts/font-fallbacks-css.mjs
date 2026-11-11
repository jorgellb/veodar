// The stylesheet scripts/font-fallbacks.mjs writes, as a pure function of the measured
// scales and of global.css, so tests/font-fallbacks.test.js can cover it.
//
// Each fallback is a local font with size-adjust, split in two @font-face rules: the
// digits, scaled so that "0" is as wide as in the real font (the ch unit, used in every
// max-width of a heading or lead, is the width of that "0"), and everything else, scaled
// so that the site's own text comes out as wide as in the real font.
//
// Fraunces has an optical-size axis: its letters get narrower as the size grows, most
// of all between 60 and 90 px. So the display fallbacks come in steps, one per range of
// font sizes, and each heading class picks its step by viewport width.

/** Font sizes (px) each display step is measured at, and where one step gives way to the next. */
export const SIZES = [28, 41, 56, 62, 69, 74, 77, 84, 98];
export const BOUNDS = [34, 49, 59, 65.5, 71.5, 75, 80, 88.5];
/** Heading classes sized with clamp(rem, vw, rem) in global.css. Anything else uses the first step. */
export const CLASSES = ['h-hero', 'h-xl', 'h-lg'];

/**
 * Local fonts behind each fallback. Times New Roman and Arial are on Windows, macOS and
 * iOS; Liberation and Tinos/Arimo have their metrics on Linux and ChromeOS; Noto Serif
 * and Roboto are Android's. local() matches a font's full name or its PostScript name,
 * and which of the two a system exposes varies, so each font is listed under both.
 */
const ROBOTO = ['Roboto', 'Roboto Regular', 'Roboto-Regular'];
export const LOCAL = {
  times: {
    regular: ['Times New Roman', 'TimesNewRomanPSMT', 'Liberation Serif', 'Tinos'],
    italic: ['Times New Roman Italic', 'TimesNewRomanPS-ItalicMT', 'Liberation Serif Italic', 'Tinos Italic'],
  },
  noto: { regular: ['Noto Serif', 'NotoSerif', 'NotoSerif-Regular'], italic: ['Noto Serif Italic', 'NotoSerif-Italic'] },
  arial: { regular: ['Arial', 'ArialMT', 'Liberation Sans', 'Arimo'], bold: ['Arial Bold', 'Arial-BoldMT', 'Liberation Sans Bold', 'Arimo Bold'] },
  // Android's Roboto is one variable file and its bold has no name of its own, so the bold set scales the regular.
  roboto: { regular: ROBOTO, bold: ROBOTO },
};
export const NAMES = { times: 'Fraunces Times', noto: 'Fraunces Noto', arial: 'Geist Arial', roboto: 'Geist Roboto' };

const DIGITS = 'U+30-39';
const TEXT = 'U+20-2F,U+3A-7E,U+A0-FF,U+2013-2014,U+2018-201D,U+2026';

export const local = (names) => names.map((name) => `local("${name}")`).join(',');
/** The step that covers a font size. */
export const stepOf = (px) => SIZES[BOUNDS.filter((bound) => px >= bound).length];
/** Font-family list of the display fallbacks for one step. */
export const displayStack = (size) => `"${NAMES.times} ${size}","${NAMES.noto} ${size}"`;

const percent = (value) => `${Math.round(value * 10000) / 100}%`;

/** One @font-face rule: a local font scaled by `scale`, reporting the real font's ascent and descent. */
function rule(family, names, range, scale, metrics, descriptors = '') {
  return `@font-face{font-family:"${family}";src:${local(names)};unicode-range:${range};${descriptors}size-adjust:${percent(scale)};ascent-override:${percent(metrics.ascent / scale)};descent-override:${percent(metrics.descent / scale)};line-gap-override:0%}`;
}

/**
 * The whole stylesheet. `data` is scripts/font-fallbacks.json; `sheet` is the text of
 * global.css, read for the font-size of each heading class.
 */
export function css(data, sheet) {
  const lines = [
    '/* Written by scripts/font-fallbacks.mjs: do not edit by hand (npm run fonts:fallbacks).',
    '   Local fonts scaled to take the same room as Fraunces and Geist while those load,',
    '   so lines break in the same places and nothing moves when they arrive. */',
  ];
  for (const size of SIZES) {
    for (const platform of ['times', 'noto']) {
      const scale = data.display?.[platform]?.[size];
      if (!scale) throw new Error(`Falta la medida de ${platform} a ${size} px`);
      const family = `${NAMES[platform]} ${size}`;
      lines.push(rule(family, LOCAL[platform].regular, DIGITS, scale.digits, data.metrics.display), rule(family, LOCAL[platform].regular, TEXT, scale.letters, data.metrics.display));
      // No italic digits: an emphasised word is all the italic a heading has.
      if (scale.italic) lines.push(rule(family, LOCAL[platform].italic, TEXT, scale.italic, data.metrics.display, 'font-style:italic;'));
    }
  }
  for (const platform of ['arial', 'roboto']) {
    const scale = data.body?.[platform];
    if (!scale) throw new Error(`Falta la medida de ${platform}`);
    // Both rules of a set carry the same font-weight: Chrome only combines rules whose descriptors match.
    for (const [weight, names, digits, letters] of [
      ['100 499', LOCAL[platform].regular, scale.digits, scale.letters],
      ['500 900', LOCAL[platform].bold, scale.boldDigits, scale.boldLetters],
    ]) {
      lines.push(rule(NAMES[platform], names, DIGITS, digits, data.metrics.body, `font-weight:${weight};`), rule(NAMES[platform], names, TEXT, letters, data.metrics.body, `font-weight:${weight};`));
    }
  }
  // Each heading class picks the step that matches its font size at every viewport width.
  for (const name of CLASSES) {
    const size = sheet.match(new RegExp(`\\.${name}\\s*\\{[^}]*font-size:\\s*clamp\\(([\\d.]+)rem,\\s*([\\d.]+)vw,\\s*([\\d.]+)rem\\)`));
    if (!size) throw new Error(`No encuentro el font-size con clamp() de .${name} en global.css`);
    const [min, slope, max] = [Number(size[1]) * 16, Number(size[2]), Number(size[3]) * 16];
    if (stepOf(min) !== SIZES[0]) lines.push(`.${name}{--display-fallback:${displayStack(stepOf(min))}}`);
    for (const bound of BOUNDS) {
      if (bound > min && bound <= max) lines.push(`@media (min-width:${Math.ceil((bound * 100) / slope)}px){.${name}{--display-fallback:${displayStack(stepOf(bound))}}}`);
    }
  }
  return `${lines.join('\n')}\n`;
}
