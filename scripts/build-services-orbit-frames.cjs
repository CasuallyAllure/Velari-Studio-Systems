const path = require('node:path');
const fs = require('node:fs/promises');
const sharp = require('sharp');

const projectRoot = path.resolve(__dirname, '..');
const sourceDir = path.join(projectRoot, 'public/assets/services-orbit/source');
const outputDir = path.join(projectRoot, 'public/assets/services-orbit');

const frames = [
  {
    source: '01-brand-systems-higgsfield-v1.png',
    output: '01-brand-systems.png',
    number: '01',
    label: 'IDENTITY',
    title: 'Brand systems',
    description: 'Logo, color, type, and voice—built as one unmistakable system.',
  },
  {
    source: '02-websites-higgsfield-v2.png',
    output: '02-websites.png',
    number: '02',
    label: 'DIGITAL',
    title: 'Websites',
    description: 'Editorial design, responsive development, and a clear way in.',
  },
  {
    source: '03-photography-creative-higgsfield-v1.png',
    output: '03-photography-creative.png',
    number: '03',
    label: 'ORIGINAL CONTENT',
    title: 'Photography + creative',
    description: 'Original imagery directed around the story of the brand.',
  },
  {
    source: '04-portals-ordering-higgsfield-v2.png',
    output: '04-portals-ordering.png',
    number: '04',
    label: 'EXPERIENCE',
    title: 'Portals + ordering',
    description: 'Booking, payments, memberships, and direct ordering.',
  },
  {
    source: '05-ai-intake-reception-higgsfield-v1.png',
    output: '05-ai-intake-reception.png',
    number: '05',
    label: 'INTELLIGENCE',
    title: 'AI intake + reception',
    description: 'Answer, qualify, collect, and hand off cleanly.',
  },
  {
    source: '06-automation-integrations-higgsfield-v1.png',
    output: '06-automation-integrations.png',
    number: '06',
    label: 'OPERATIONS',
    title: 'Automation + integrations',
    description: 'Forms, calendars, payments, and email—connected.',
  },
];

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function overlaySvg(frame) {
  return Buffer.from(`
    <svg width="2560" height="1440" viewBox="0 0 2560 1440" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#080706" stop-opacity="0.88"/>
          <stop offset="0.48" stop-color="#080706" stop-opacity="0.42"/>
          <stop offset="1" stop-color="#080706" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="topFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#080706" stop-opacity="0.52"/>
          <stop offset="1" stop-color="#080706" stop-opacity="0"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#000000" flood-opacity="0.72"/>
        </filter>
      </defs>

      <rect width="1510" height="590" fill="url(#shade)"/>
      <rect width="2560" height="420" fill="url(#topFade)"/>

      <g transform="translate(268 166)" filter="url(#shadow)">
        <circle cx="11" cy="10" r="7" fill="#c59a53"/>
        <text x="36" y="19"
          fill="#d2aa68"
          font-family="Arial, Helvetica, sans-serif"
          font-size="25"
          font-weight="700"
          letter-spacing="5.5">${frame.number} / ${escapeXml(frame.label)}</text>

        <text x="0" y="116"
          fill="#f4efe7"
          font-family="Georgia, 'Times New Roman', serif"
          font-size="76"
          font-weight="400"
          letter-spacing="-2">${escapeXml(frame.title)}</text>

        <line x1="0" y1="158" x2="676" y2="158" stroke="#c59a53" stroke-width="2" opacity="0.85"/>

        <text x="0" y="215"
          fill="#d2ccc2"
          font-family="Arial, Helvetica, sans-serif"
          font-size="28"
          font-weight="400"
          letter-spacing="0.3">${escapeXml(frame.description)}</text>
      </g>

      <g transform="translate(2190 1294)" opacity="0.82">
        <line x1="-170" y1="0" x2="-34" y2="0" stroke="#c59a53" stroke-width="2"/>
        <text x="0" y="8"
          fill="#efe8dc"
          font-family="Arial, Helvetica, sans-serif"
          font-size="22"
          font-weight="700"
          letter-spacing="5">VELARI</text>
      </g>
    </svg>
  `);
}

async function build() {
  await fs.mkdir(outputDir, { recursive: true });

  for (const frame of frames) {
    const input = path.join(sourceDir, frame.source);
    const output = path.join(outputDir, frame.output);

    await sharp(input)
      .resize(2560, 1440, { fit: 'cover', position: 'centre' })
      .composite([{ input: overlaySvg(frame), blend: 'over' }])
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(output);

    console.log(path.relative(projectRoot, output));
  }
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
