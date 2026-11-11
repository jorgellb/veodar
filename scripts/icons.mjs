// Writes the PNG icons from the same drawing as public/favicon.svg:
//   node scripts/icons.mjs
// apple-touch-icon.png (180, full bleed: iOS rounds it and has no transparency),
// icon-192.png / icon-512.png (rounded, for the web manifest and schema.org logo) and
// icon-maskable-512.png (full bleed, mark inside the safe zone).
import sharp from 'sharp';

const mark =
  '<path d="M8.2 10.4 16 23.4l7.8-13" fill="none" stroke="#ff5a1f" stroke-width="3.1" stroke-linecap="round" stroke-linejoin="round"/>' +
  '<path d="M12.6 10.4 16 16.2l3.4-5.8" fill="none" stroke="#f4f0e6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>';
const rounded = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="1" y="1" width="30" height="30" rx="9" fill="#16142c"/>${mark}</svg>`;
// The mark is centred on (16, 16.9); `scale` shrinks it around the middle of the square.
const bleed = (scale) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#16142c"/><g transform="translate(16 16) scale(${scale}) translate(-16 -16.9)">${mark}</g></svg>`;

const out = [
  ['public/apple-touch-icon.png', bleed(0.92), 180],
  ['public/icon-192.png', rounded, 192],
  ['public/icon-512.png', rounded, 512],
  ['public/icon-maskable-512.png', bleed(0.72), 512],
];
for (const [file, svg, size] of out) {
  await sharp(Buffer.from(svg), { density: 72 * (size / 32) * 2 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(file);
  console.log(file, size);
}
