import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const backgroundRoot = join(projectRoot, 'public/assets/showcase/backgrounds');
const sourceRoot = join(projectRoot, 'public/assets/showcase/source');
const outputRoot = join(projectRoot, 'public/assets/showcase/panels');

mkdirSync(sourceRoot, { recursive: true });
mkdirSync(outputRoot, { recursive: true });

const panels = [
  {
    id: '01-property-management',
    background: '01-property-higgsfield.png',
    blur: 9,
    side: 'right',
    brand: 'NORTHLINE',
    category: 'PROPERTY OPERATIONS',
    lines: ['Every building,', 'in rhythm.'],
    summary: 'Leasing, maintenance, and resident care—one composed operating view.',
    primary: 'Open portfolio',
    metrics: [
      ['OCCUPANCY', '96%', '+2.4% this quarter'],
      ['COLLECTIONS', '98.7%', 'On schedule'],
      ['OPEN WORK', '14', '4 due today'],
    ],
    queue: ['Residence 04', 'Leasing', 'Ready'],
  },
  {
    id: '02-dental-practice',
    background: '02-dental-higgsfield.png',
    blur: 2,
    side: 'left',
    brand: 'ARC DENTAL',
    category: 'PATIENT EXPERIENCE',
    lines: ['Care, precisely', 'scheduled.'],
    summary: 'A quieter way to coordinate patients, rooms, treatment, and follow-up.',
    primary: 'View today',
    metrics: [
      ['CHAIR TIME', '87%', 'Balanced'],
      ['CONFIRMED', '22', '3 awaiting reply'],
      ['FOLLOW-UP', '08', 'Due this week'],
    ],
    queue: ['Patient flow', 'Room 03', 'On time'],
  },
  {
    id: '03-restaurant',
    background: '03-restaurant-higgsfield.png',
    blur: 2,
    side: 'right',
    brand: 'EMBER & GRAIN',
    category: 'DINING OPERATIONS',
    lines: ['A full house,', 'without the chaos.'],
    summary: 'Reservations, pacing, menus, and guest notes designed around service.',
    primary: 'Open service',
    metrics: [
      ['COVERS', '128', 'Tonight'],
      ['WAITLIST', '06', '18 min average'],
      ['TABLE PACE', '1h 42m', 'On target'],
    ],
    queue: ['Dining room', '7:30 service', '86% seated'],
  },
  {
    id: '04-plumbing',
    background: '04-plumbing-higgsfield.png',
    blur: 2,
    side: 'left',
    brand: 'COPPERLINE',
    category: 'SERVICE DISPATCH',
    lines: ['Dispatch before', 'damage spreads.'],
    summary: 'Calls become scoped jobs, the right technician, and a clear customer ETA.',
    primary: 'Open dispatch',
    metrics: [
      ['ACTIVE JOBS', '18', 'Across 6 zones'],
      ['ON-TIME', '94%', 'This month'],
      ['EMERGENCY', '02', 'Assigned'],
    ],
    queue: ['Commercial leak', 'Unit 12', 'ETA 18 min'],
  },
  {
    id: '05-electrical',
    background: '05-electrical-higgsfield.png',
    blur: 2,
    side: 'right',
    brand: 'VOLTWORKS',
    category: 'PROJECT CONTROL',
    lines: ['Every circuit,', 'accounted for.'],
    summary: 'Estimates, crews, inspections, and closeout documentation in one system.',
    primary: 'Review projects',
    metrics: [
      ['PROJECTS', '12', '4 in rough-in'],
      ['INSPECTIONS', '05', 'This week'],
      ['CREW LOAD', '82%', 'Healthy'],
    ],
    queue: ['Pier 7 retrofit', 'Inspection', 'Thursday'],
  },
  {
    id: '06-industrial',
    background: '06-industrial-higgsfield.png',
    blur: 2,
    side: 'left',
    brand: 'FORGEWORKS',
    category: 'PRODUCTION INTELLIGENCE',
    lines: ['The floor tells you', 'what comes next.'],
    summary: 'Live production, quality, downtime, and material flow without the noise.',
    primary: 'View production',
    metrics: [
      ['OUTPUT', '1,284', 'Units today'],
      ['QUALITY', '99.2%', 'Within spec'],
      ['DOWNTIME', '18m', '-12% weekly'],
    ],
    queue: ['Cell B-04', 'Batch 238', 'Running'],
  },
  {
    id: '07-transport',
    background: '07-transport-higgsfield.png',
    blur: 2,
    side: 'right',
    brand: 'NORTHBOUND',
    category: 'FLEET & LOGISTICS',
    lines: ['Freight in motion.', 'Answers at a glance.'],
    summary: 'Dispatch, tracking, documents, and exceptions kept on the same route.',
    primary: 'Open fleet',
    metrics: [
      ['IN TRANSIT', '42', '6 arriving today'],
      ['ON-TIME', '97.4%', 'Past 30 days'],
      ['EXCEPTIONS', '03', 'Being resolved'],
    ],
    queue: ['Route NB-204', 'Oakland → Reno', 'On schedule'],
  },
  {
    id: '08-hvac-field-service',
    background: '08-hvac-higgsfield.png',
    blur: 2,
    side: 'left',
    brand: 'AEROSTATE',
    category: 'FIELD SERVICE',
    lines: ['Service arrives', 'already prepared.'],
    summary: 'Equipment history, scheduling, parts, and customer updates before the visit.',
    primary: 'Open schedule',
    metrics: [
      ['VISITS', '16', 'Today'],
      ['FIRST-TIME FIX', '91%', '+4.1% monthly'],
      ['HEALTH ALERTS', '05', '2 urgent'],
    ],
    queue: ['Rooftop Unit 06', 'Preventive care', '10:40 AM'],
  },
];

const escapeXml = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function wrapText(value, maxCharacters = 54) {
  const lines = [];
  let line = '';

  for (const word of value.split(' ')) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length > maxCharacters && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) lines.push(line);
  return lines.slice(0, 2);
}

function makeSvg(panel) {
  const backgroundPath = join(backgroundRoot, panel.background);
  const background = readFileSync(backgroundPath).toString('base64');
  const panelOnRight = panel.side === 'right';
  const glassX = panelOnRight ? 914 : 70;
  const copyX = panelOnRight ? 74 : 860;
  const copyWidth = panelOnRight ? 700 : 660;
  const line1 = escapeXml(panel.lines[0]);
  const line2 = escapeXml(panel.lines[1]);
  const summaryLines = wrapText(panel.summary);
  const metricRows = panel.metrics
    .map(([label, value, detail], index) => {
      const y = 360 + index * 112;
      return `
        <g transform="translate(${glassX + 36} ${y})">
          <text class="label" x="0" y="0">${escapeXml(label)}</text>
          <text class="metric" x="0" y="45">${escapeXml(value)}</text>
          <text class="detail" x="190" y="43">${escapeXml(detail)}</text>
          ${index < panel.metrics.length - 1 ? '<line x1="0" y1="74" x2="508" y2="74" class="rule"/>' : ''}
        </g>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <filter id="soft" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="${panel.blur}"/>
    </filter>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="28" flood-color="#000000" flood-opacity=".38"/>
    </filter>
    <linearGradient id="wash" x1="${panelOnRight ? '0' : '1'}" y1="0" x2="${panelOnRight ? '1' : '0'}" y2="0">
      <stop offset="0" stop-color="#090806" stop-opacity=".82"/>
      <stop offset=".52" stop-color="#15120e" stop-opacity=".25"/>
      <stop offset="1" stop-color="#090806" stop-opacity=".52"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#d8d1c6" stop-opacity=".16"/>
      <stop offset=".4" stop-color="#5e5a54" stop-opacity=".10"/>
      <stop offset="1" stop-color="#090806" stop-opacity=".58"/>
    </linearGradient>
    <linearGradient id="button" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#d3ae65"/>
      <stop offset="1" stop-color="#aa8142"/>
    </linearGradient>
    <style>
      .serif { font-family: Georgia, "Times New Roman", serif; fill: #f0ede6; }
      .sans { font-family: "Helvetica Neue", Arial, sans-serif; fill: #ece8df; }
      .label { font-family: "Helvetica Neue", Arial, sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 3px; fill: #c8c1b6; }
      .metric { font-family: Georgia, "Times New Roman", serif; font-size: 38px; fill: #f0ede6; }
      .detail { font-family: "Helvetica Neue", Arial, sans-serif; font-size: 15px; fill: #b4aea4; }
      .rule { stroke: #ddd6cb; stroke-opacity: .18; stroke-width: 1; }
    </style>
  </defs>

  <image href="data:image/png;base64,${background}" x="-35" y="-35" width="1670" height="970"
    preserveAspectRatio="xMidYMid slice" filter="url(#soft)"/>
  <rect width="1600" height="900" fill="url(#wash)"/>
  <rect width="1600" height="900" fill="#0c0a08" opacity=".10"/>

  <g class="sans">
    <text x="72" y="66" font-size="16" font-weight="600" letter-spacing="6">${escapeXml(panel.brand)}</text>
    <text x="800" y="64" font-size="11" letter-spacing="4" text-anchor="middle" fill="#beb7ac">SYSTEMS / 08</text>
    <circle cx="1528" cy="58" r="24" fill="#171410" fill-opacity=".45" stroke="#d7d0c5" stroke-opacity=".42"/>
    <path d="M1519 54h18M1519 62h18" stroke="#ece8df" stroke-width="1.5" opacity=".78"/>
  </g>

  <g transform="translate(${copyX} 0)">
    <text class="label" x="0" y="206" fill="#cba45a">${escapeXml(panel.category)}</text>
    <text class="serif" x="0" y="292" font-size="78" letter-spacing="-2">${line1}</text>
    <text class="serif" x="0" y="374" font-size="78" letter-spacing="-2">${line2}</text>
    <text class="sans" x="4" y="426" font-size="18" fill="#c4beb4">
      <tspan x="4" dy="0">${escapeXml(summaryLines[0])}</tspan>
      ${summaryLines[1] ? `<tspan x="4" dy="28">${escapeXml(summaryLines[1])}</tspan>` : ''}
    </text>
    <g transform="translate(0 510)">
      <rect width="218" height="58" rx="29" fill="url(#button)" filter="url(#shadow)"/>
      <text class="sans" x="109" y="36" text-anchor="middle" font-size="13" font-weight="600" letter-spacing="2.2" fill="#17120b">${escapeXml(panel.primary.toUpperCase())}</text>
      <rect x="236" width="168" height="58" rx="29" fill="#171410" fill-opacity=".42" stroke="#d7d0c5" stroke-opacity=".38"/>
      <text class="sans" x="320" y="36" text-anchor="middle" font-size="12" letter-spacing="2" fill="#e4ded4">VIEW SYSTEM</text>
    </g>
  </g>

  <g filter="url(#shadow)">
    <rect x="${glassX}" y="138" width="580" height="574" rx="34" fill="url(#glass)" stroke="#ded7cc" stroke-opacity=".50" stroke-width="1.5"/>
    <rect x="${glassX + 13}" y="151" width="554" height="548" rx="25" fill="none" stroke="#ffffff" stroke-opacity=".07"/>
  </g>
  <g class="sans">
    <text x="${glassX + 36}" y="188" font-size="11" letter-spacing="3.5" fill="#c5beb3">LIVE OPERATING VIEW</text>
    <circle cx="${glassX + 512}" cy="184" r="5" fill="#caa45c"/>
    <text x="${glassX + 36}" y="252" font-size="25" font-weight="500">${escapeXml(panel.queue[0])}</text>
    <text x="${glassX + 36}" y="286" font-size="15" fill="#bdb6ab">${escapeXml(panel.queue[1])}</text>
    <rect x="${glassX + 386}" y="238" width="148" height="42" rx="21" fill="#e8e3d9" fill-opacity=".11" stroke="#d7d0c5" stroke-opacity=".35"/>
    <text x="${glassX + 460}" y="264" text-anchor="middle" font-size="12" letter-spacing="1.5" fill="#e8e3d9">${escapeXml(panel.queue[2].toUpperCase())}</text>
  </g>
  ${metricRows}

  <g transform="translate(70 796)">
    <rect width="1460" height="62" rx="31" fill="#12100d" fill-opacity=".58" stroke="#d9d2c7" stroke-opacity=".24"/>
    <circle cx="33" cy="31" r="6" fill="#caa45c"/>
    <text class="label" x="57" y="36">VELARI SYSTEMS · BUSINESS INFRASTRUCTURE</text>
    <text class="label" x="1110" y="36">DESIGN</text>
    <line x1="1190" y1="21" x2="1190" y2="41" class="rule"/>
    <text class="label" x="1220" y="36">DEVELOPMENT</text>
    <text class="sans" x="1408" y="37" font-size="20" text-anchor="middle" fill="#caa45c">↗</text>
  </g>
</svg>`;
}

for (const panel of panels) {
  const svgPath = join(sourceRoot, `${panel.id}.svg`);
  const pngPath = join(outputRoot, `${panel.id}.png`);
  writeFileSync(svgPath, makeSvg(panel));
  execFileSync('rsvg-convert', ['-w', '1600', '-h', '900', '-o', pngPath, svgPath]);
  console.log(pngPath);
}
