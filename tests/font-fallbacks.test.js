// Fallback fonts: the stylesheet built from the measured scales. What a browser does
// with it is checked by scripts/font-swap-check.mjs; these tests cover the rules that
// are easy to break by hand.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { describe, it } from 'node:test';
import { BOUNDS, SIZES, css, stepOf } from '../scripts/font-fallbacks-css.mjs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const data = JSON.parse(read('scripts/font-fallbacks.json'));
const globalCss = read('src/styles/global.css');
const sheet = css(data, globalCss);
const faces = sheet
  .split('\n')
  .filter((line) => line.startsWith('@font-face'))
  .map((line) => ({
    family: line.match(/font-family:"([^"]+)"/)[1],
    range: line.match(/unicode-range:([^;]+);/)[1],
    weight: line.match(/font-weight:([^;]+);/)?.[1] ?? '',
    style: line.match(/font-style:([^;]+);/)?.[1] ?? '',
    scale: Number(line.match(/size-adjust:([\d.]+)%/)[1]),
  }));

describe('stepOf', () => {
  it('picks the step whose range holds the font size', () => {
    assert.equal(stepOf(16), SIZES[0]);
    assert.equal(stepOf(BOUNDS[0] - 0.1), SIZES[0]);
    assert.equal(stepOf(BOUNDS[0]), SIZES[1]);
    assert.equal(stepOf(43.2), 41);
    assert.equal(stepOf(200), SIZES.at(-1));
  });

  it('measures every step inside its own range', () => {
    for (const size of SIZES) assert.equal(stepOf(size), size);
  });
});

describe('the stylesheet in the repo', () => {
  it('is the one the script writes from the JSON and global.css', () => {
    assert.equal(read('src/styles/font-fallbacks.css'), sheet, 'run `npm run fonts:fallbacks` and commit the result');
  });
});

describe('css', () => {
  it('gives every set its digits and its text, with the same descriptors', () => {
    const sets = Map.groupBy(
      faces.filter((face) => face.style !== 'italic'),
      (face) => `${face.family}|${face.weight}`,
    );
    for (const [key, rules] of sets) {
      assert.deepEqual(rules.map((face) => face.range.startsWith('U+30-39')).sort(), [false, true], `${key} needs one rule for digits and one for the rest`);
    }
  });

  it('has a Times and a Noto family for every step, and both weights of the body fonts', () => {
    const families = new Set(faces.map((face) => face.family));
    for (const size of SIZES) assert.ok(families.has(`Fraunces Times ${size}`) && families.has(`Fraunces Noto ${size}`), `step ${size}`);
    for (const family of ['Geist Arial', 'Geist Roboto']) {
      assert.deepEqual([...new Set(faces.filter((face) => face.family === family).map((face) => face.weight))].sort(), ['100 499', '500 900']);
    }
  });

  it('keeps every scale in a plausible range', () => {
    for (const face of faces) assert.ok(face.scale > 60 && face.scale < 140, `${face.family} ${face.range}: ${face.scale}%`);
  });

  it('moves each heading class to wider steps as the viewport grows', () => {
    for (const name of ['h-hero', 'h-xl', 'h-lg']) {
      const steps = [...sheet.matchAll(new RegExp(`(?:min-width:(\\d+)px\\)\\{)?\\.${name}\\{--display-fallback:"Fraunces Times (\\d+)"`, 'g'))].map((found) => ({ from: Number(found[1] ?? 0), size: Number(found[2]) }));
      assert.ok(steps.length > 0, name);
      for (let index = 1; index < steps.length; index++) {
        assert.ok(steps[index].from > steps[index - 1].from && steps[index].size > steps[index - 1].size, `${name}: ${JSON.stringify(steps)}`);
      }
    }
  });

  it('works out the breakpoints of a class from its clamp()', () => {
    // 2rem = 32 px is in the first step, so there is no base rule; the font reaches 34 px
    // (second step) at 34 / 5vw = 680 px wide and 49 px (third) at 980 px, and stops at 3.5rem = 56 px.
    const rules = css(data, '.h-hero { font-size: clamp(2rem, 5vw, 3.5rem); } .h-xl { font-size: clamp(1rem, 1vw, 1.5rem); } .h-lg { font-size: clamp(1rem, 1vw, 1.5rem); }')
      .split('\n')
      .filter((line) => line.includes('--display-fallback'));
    assert.deepEqual(rules, [
      `@media (min-width:680px){.h-hero{--display-fallback:"Fraunces Times ${SIZES[1]}","Fraunces Noto ${SIZES[1]}"}}`,
      `@media (min-width:980px){.h-hero{--display-fallback:"Fraunces Times ${SIZES[2]}","Fraunces Noto ${SIZES[2]}"}}`,
    ]);
  });

  it('says which heading class has no clamp() to read', () => {
    assert.throws(() => css(data, '.h-hero { font-size: clamp(2rem, 5vw, 3.5rem); } .h-xl { font-size: 3rem; }'), /h-xl/);
  });

  it('says which measurement is missing', () => {
    assert.throws(() => css({ ...data, display: { ...data.display, noto: {} } }, globalCss), /noto/);
  });
});
