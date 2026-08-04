import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const showcase = join(root, 'public/assets/showcase');
const temporary = mkdtempSync(join(tmpdir(), 'velari-contact-'));

const toDataUri = (path) =>
  `data:image/png;base64,${readFileSync(path).toString('base64')}`;

function renderContactSheet({
  columns,
  height,
  images,
  output,
  rows,
  width,
}) {
  const cellWidth = width / columns;
  const cellHeight = height / rows;
  const imageElements = images.map((path, index) => {
    const x = (index % columns) * cellWidth;
    const y = Math.floor(index / columns) * cellHeight;
    return `<image href="${toDataUri(path)}" x="${x}" y="${y}" width="${cellWidth}" height="${cellHeight}"/>`;
  }).join('\n');

  const grid = [
    ...Array.from({ length: columns - 1 }, (_, index) =>
      `<path d="M${(index + 1) * cellWidth} 0v${height}"/>`),
    ...Array.from({ length: rows - 1 }, (_, index) =>
      `<path d="M0 ${(index + 1) * cellHeight}h${width}"/>`),
  ].join('\n');

  const source = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="#0b0907"/>
    ${imageElements}
    <g fill="none" stroke="#f0ede6" stroke-opacity=".18" stroke-width="2">${grid}</g>
  </svg>`;

  const sourcePath = join(temporary, `${output.split('/').pop()}.svg`);
  writeFileSync(sourcePath, source);
  execFileSync('rsvg-convert', ['-w', String(width), '-h', String(height), '-o', output, sourcePath]);
}

const desktopNames = [
  '01-property.png',
  '02-dental.png',
  '03-restaurant.png',
  '04-trades.png',
  '05-industrial.png',
  '06-logistics.png',
  '07-retail.png',
  '08-research-labs.png',
  '09-construction.png',
];

const mobileNames = [
  '01-property-mobile.png',
  '02-dental-mobile.png',
  '03-restaurant-mobile.png',
  '04-trades-mobile.png',
  '05-industrial-mobile.png',
  '06-logistics-mobile.png',
  '07-retail-mobile.png',
  '08-research-labs-mobile.png',
  '09-construction-mobile.png',
];

try {
  renderContactSheet({
    columns: 3,
    rows: 3,
    width: 1920,
    height: 1080,
    images: desktopNames.map((name) => join(showcase, 'animos-final-v2', name)),
    output: join(showcase, 'lookdev/animos-final-v2-contact.png'),
  });

  renderContactSheet({
    columns: 3,
    rows: 3,
    width: 1170,
    height: 2532,
    images: mobileNames.map((name) => join(showcase, 'mobile-previews-v2', name)),
    output: join(showcase, 'lookdev/mobile-previews-v2-contact.png'),
  });
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
