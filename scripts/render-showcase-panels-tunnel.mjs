import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const backgrounds = join(root, 'public/assets/showcase/backgrounds');
const sources = join(root, 'public/assets/showcase/source-tunnel');
const outputs = join(root, 'public/assets/showcase/panels-tunnel-ready');

mkdirSync(sources, { recursive: true });
mkdirSync(outputs, { recursive: true });

const files = [
  '01-property-higgsfield.png',
  '02-dental-higgsfield.png',
  '03-restaurant-higgsfield.png',
  '04-plumbing-higgsfield.png',
  '05-electrical-higgsfield.png',
  '06-industrial-higgsfield.png',
  '07-transport-higgsfield.png',
  '08-hvac-higgsfield.png',
];

const imageData = (name) =>
  `data:image/png;base64,${readFileSync(join(backgrounds, name)).toString('base64')}`;

const defs = `
  <defs>
    <filter id="blur" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="7"/>
    </filter>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="22" stdDeviation="30" flood-color="#000" flood-opacity=".5"/>
    </filter>
    <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#080706" stop-opacity=".82"/>
      <stop offset=".5" stop-color="#16120e" stop-opacity=".48"/>
      <stop offset="1" stop-color="#080706" stop-opacity=".82"/>
    </linearGradient>
    <linearGradient id="surface" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#d8d1c7" stop-opacity=".18"/>
      <stop offset=".4" stop-color="#746d64" stop-opacity=".10"/>
      <stop offset="1" stop-color="#090806" stop-opacity=".72"/>
    </linearGradient>
    <linearGradient id="bone" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f1ede5" stop-opacity=".96"/>
      <stop offset="1" stop-color="#c8bfb3" stop-opacity=".90"/>
    </linearGradient>
    <style>
      .serif { font-family: Georgia, "Times New Roman", serif; fill: #f2eee6; font-weight: 400; }
      .serifDark { font-family: Georgia, "Times New Roman", serif; fill: #181511; font-weight: 400; }
      .sans { font-family: "Helvetica Neue", Arial, sans-serif; fill: #eee9df; }
      .sansDark { font-family: "Helvetica Neue", Arial, sans-serif; fill: #181511; }
      .caps { font-family: "Helvetica Neue", Arial, sans-serif; fill: #c9c1b6; font-size: 12px; font-weight: 600; letter-spacing: 4px; }
      .capsDark { font-family: "Helvetica Neue", Arial, sans-serif; fill: #383129; font-size: 12px; font-weight: 600; letter-spacing: 4px; }
      .gold { fill: #d2aa5b; }
      .line { stroke: #e7e0d6; stroke-opacity: .34; stroke-width: 1; }
      .lineDark { stroke: #2b251f; stroke-opacity: .32; stroke-width: 1; }
    </style>
  </defs>`;

function frame(background, index, brand, section, content, { light = false } = {}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  ${defs}
  <image href="${imageData(background)}" x="-25" y="-25" width="1650" height="950"
    preserveAspectRatio="xMidYMid slice" filter="url(#blur)"/>
  <rect width="1600" height="900" fill="url(#wash)"/>
  <g transform="translate(120 80)" filter="url(#shadow)">
    <rect width="1360" height="740" rx="34" fill="${light ? 'url(#bone)' : 'url(#surface)'}"
      stroke="${light ? '#1d1915' : '#eee8de'}" stroke-opacity="${light ? '.34' : '.48'}" stroke-width="1.4"/>
    <g class="${light ? 'sansDark' : 'sans'}">
      <text x="42" y="54" font-size="14" font-weight="600" letter-spacing="5">${brand}</text>
      <text x="680" y="54" text-anchor="middle" font-size="10" letter-spacing="4" opacity=".68">${section}</text>
      <text x="1318" y="54" text-anchor="end" font-size="11" letter-spacing="3" opacity=".68">${index} / 08</text>
    </g>
    <line x1="42" y1="88" x2="1318" y2="88" class="${light ? 'lineDark' : 'line'}"/>
    ${content}
    <line x1="42" y1="674" x2="1318" y2="674" class="${light ? 'lineDark' : 'line'}"/>
    <circle cx="48" cy="706" r="5" fill="#d2aa5b"/>
    <text class="${light ? 'capsDark' : 'caps'}" x="68" y="710">VELARI SYSTEMS · BUILT AROUND THE WORK</text>
    <text class="${light ? 'capsDark' : 'caps'}" x="1318" y="710" text-anchor="end">DESIGN · DEVELOPMENT · OPERATIONS</text>
  </g>
</svg>`;
}

const property = frame(files[0], '01', 'NORTHLINE', 'PROPERTY INTELLIGENCE', `
  <g transform="translate(680 345)">
    <circle r="218" fill="#080706" fill-opacity=".36" stroke="#e8e1d7" stroke-opacity=".32"/>
    <circle r="170" fill="none" stroke="#eee7dc" stroke-opacity=".14" stroke-width="30"/>
    <circle r="170" fill="none" stroke="#d2aa5b" stroke-width="30" stroke-linecap="round"
      stroke-dasharray="1026 1068" transform="rotate(-90)"/>
    <text class="serif" y="-2" text-anchor="middle" font-size="102">96%</text>
    <text class="caps" y="42" text-anchor="middle">OCCUPIED</text>
  </g>
  <text class="serif" x="72" y="174" font-size="52">A living portfolio.</text>
  <text class="sans" x="74" y="210" font-size="16" opacity=".68">Leasing, maintenance, and resident care—one clear view.</text>
  <g transform="translate(1010 204)">
    <text class="caps" x="0" y="0">OPEN WORK ORDERS</text>
    <text class="serif" x="0" y="82" font-size="82">14</text>
    <text class="sans" x="4" y="116" font-size="15" opacity=".68">Four scheduled today</text>
  </g>`);

const dental = frame(files[1], '02', 'ARC DENTAL', 'CARE COORDINATION', `
  <text class="serifDark" x="72" y="174" font-size="52">Precision feels like calm.</text>
  <text class="sansDark" x="75" y="210" font-size="16" opacity=".62">One patient journey, visible from every room.</text>
  <g transform="translate(680 380)">
    <circle r="220" fill="#fff" fill-opacity=".22" stroke="#2a251f" stroke-opacity=".24"/>
    <circle r="172" fill="none" stroke="#9b7740" stroke-opacity=".62" stroke-width="2" stroke-dasharray="4 13"/>
    <path d="M-48-112c-36 22-51 70-38 116 9 31 31 51 39 91 6 32 21 56 47 56s41-24 47-56c8-40 30-60 39-91 13-46-2-94-38-116-28-17-43 14-48 14s-20-31-48-14z"
      fill="#f7f3eb" fill-opacity=".54" stroke="#2c261f" stroke-opacity=".52" stroke-width="2"/>
    <line x1="-214" y1="0" x2="214" y2="0" stroke="#9b7740" stroke-opacity=".4"/>
    <line x1="0" y1="-214" x2="0" y2="214" stroke="#9b7740" stroke-opacity=".4"/>
  </g>
  <text class="capsDark" x="680" y="626" text-anchor="middle">TREATMENT PLAN · REVIEWED</text>`, { light: true });

const restaurant = frame(files[2], '03', 'EMBER &amp; GRAIN', 'RESERVATIONS', `
  <text class="serif" x="680" y="178" text-anchor="middle" font-size="54">Tonight, paced beautifully.</text>
  <text class="sans" x="680" y="214" text-anchor="middle" font-size="16" opacity=".66">128 covers · 06 waiting · 18 minute average</text>
  <g transform="translate(680 420)">
    ${[
      [-340,-112,30],[-226,-112,34],[-102,-112,30],[30,-112,34],[162,-112,30],[286,-112,34],
      [-286,22,34],[-150,22,30],[-8,22,40],[146,22,30],[286,22,34],
      [-340,156,30],[-216,156,34],[-82,156,30],[52,156,34],[188,156,30],[318,156,34],
    ].map(([x,y,r], i) => `<g transform="translate(${x} ${y})">
      <circle r="${r}" fill="${i === 8 ? '#d2aa5b' : '#e8e1d7'}" fill-opacity="${i === 8 ? '.82' : '.10'}"
        stroke="#eee7dd" stroke-opacity=".34"/>
      <text class="${i === 8 ? 'sansDark' : 'sans'}" y="5" text-anchor="middle" font-size="12">${r > 32 ? '4' : '2'}</text>
    </g>`).join('')}
  </g>`);

const plumbing = frame(files[3], '04', 'COPPERLINE', 'COMMERCIAL SERVICE', `
  <text class="serif" x="72" y="174" font-size="52">Every line has a next step.</text>
  <text class="sans" x="75" y="210" font-size="16" opacity=".66">Pressure, dispatch, and the right technician—already connected.</text>
  <g transform="translate(80 390)">
    <path d="M0 92h246V-18h248v110h250V14h250v148h196" fill="none" stroke="#aa6f39" stroke-width="24" stroke-linejoin="round"/>
    <path d="M0 92h246V-18h248v110h250V14h250v148h196" fill="none" stroke="#efc57f" stroke-opacity=".48" stroke-width="3"/>
    ${[[246,92],[494,92],[744,92],[994,92],[994,162]].map(([x,y], i) => `<g>
      <circle cx="${x}" cy="${y}" r="28" fill="#15110e" stroke="#d4ad69" stroke-width="3"/>
      <circle cx="${x}" cy="${y}" r="8" fill="${i === 3 ? '#d4ad69' : '#eee8df'}"/>
    </g>`).join('')}
  </g>
  <text class="caps" x="1080" y="614">TECHNICIAN ASSIGNED · ETA 18 MIN</text>`);

const electrical = frame(files[4], '05', 'VOLTWORKS', 'LOAD / INSPECTION', `
  <text class="serif" x="680" y="174" text-anchor="middle" font-size="52">Power, measured before it moves.</text>
  <g transform="translate(96 288)">
    ${[0,1,2,3].map(i => `<line x1="0" y1="${i*88}" x2="1168" y2="${i*88}" class="line"/>`).join('')}
    ${[0,1,2,3,4,5,6,7].map(i => `<line x1="${i*167}" y1="0" x2="${i*167}" y2="264" class="line"/>`).join('')}
    <polyline points="0,230 84,206 170,220 256,156 342,178 428,112 514,146 600,82 686,116 772,68 858,100 944,46 1030,80 1168,28"
      fill="none" stroke="#d2aa5b" stroke-width="4"/>
    <polyline points="0,260 84,246 170,250 256,222 342,234 428,196 514,208 600,170 686,184 772,150 858,166 944,132 1030,146 1168,118"
      fill="none" stroke="#e9e2d8" stroke-opacity=".48" stroke-width="2"/>
  </g>
  <text class="serif" x="1280" y="608" text-anchor="end" font-size="58">82%</text>
  <text class="caps" x="1280" y="636" text-anchor="end">CREW LOAD</text>`);

const industrial = frame(files[5], '06', 'FORGEWORKS', 'PRODUCTION INTELLIGENCE', `
  <text class="serif" x="72" y="174" font-size="52">The floor tells you what comes next.</text>
  <text class="sans" x="75" y="210" font-size="16" opacity=".66">Cell B-04 · Batch 238 · On plan</text>
  <g transform="translate(96 372)">
    <line x1="0" y1="0" x2="1168" y2="0" stroke="#e8e1d8" stroke-opacity=".26" stroke-width="6"/>
    <line x1="0" y1="0" x2="554" y2="0" stroke="#d2aa5b" stroke-width="6"/>
    ${[
      [0,'01','MATERIAL','COMPLETE'],
      [390,'02','MACHINE','RUNNING'],
      [778,'03','QUALITY','QUEUED'],
      [1168,'04','PACKOUT','WAITING'],
    ].map(([x,n,title,state], i) => `<g transform="translate(${x} 0)">
      <circle r="${i === 1 ? 28 : 22}" fill="${i < 2 ? '#d2aa5b' : '#17130f'}" stroke="#e8e1d8" stroke-opacity=".5"/>
      <text class="${i < 2 ? 'sansDark' : 'sans'}" y="5" text-anchor="middle" font-size="11" font-weight="600">${n}</text>
      <text class="serif" x="${i === 3 ? 0 : 0}" y="82" text-anchor="${i === 3 ? 'end' : i === 0 ? 'start' : 'middle'}" font-size="28">${title}</text>
      <text class="caps" y="116" text-anchor="${i === 3 ? 'end' : i === 0 ? 'start' : 'middle'}">${state}</text>
    </g>`).join('')}
  </g>`);

const transport = frame(files[6], '07', 'NORTHBOUND', 'FLEET / LOGISTICS', `
  <text class="serif" x="680" y="174" text-anchor="middle" font-size="52">Freight in motion. Answers at a glance.</text>
  <g transform="translate(90 406)">
    <path d="M0 92C210-86 402 250 598 62S970-10 1180 96" fill="none" stroke="#e6dfd5" stroke-opacity=".28" stroke-width="3"/>
    <path d="M0 92C210-86 402 250 598 62S970-10 1180 96" fill="none" stroke="#d2aa5b" stroke-width="5" stroke-dasharray="1 20" stroke-linecap="round"/>
    ${[[0,92,'SF'],[244,40,'OAK'],[598,62,'SAC'],[884,26,'RNO'],[1180,96,'SLC']].map(([x,y,city],i)=>`<g transform="translate(${x} ${y})">
      <circle r="${i === 0 ? 30 : 22}" fill="${i === 0 ? '#d2aa5b' : '#15120f'}" stroke="#eee7dd" stroke-opacity=".52"/>
      <text class="${i === 0 ? 'sansDark' : 'sans'}" y="5" text-anchor="middle" font-size="11" font-weight="600">${city}</text>
    </g>`).join('')}
  </g>
  <text class="caps" x="680" y="620" text-anchor="middle">42 LOADS · 05 HUBS · ON SCHEDULE</text>`);

const hvac = frame(files[7], '08', 'AEROSTATE', 'FIELD SERVICE', `
  <text class="serif" x="680" y="178" text-anchor="middle" font-size="52">Service arrives already prepared.</text>
  <text class="sans" x="680" y="214" text-anchor="middle" font-size="16" opacity=".66">Rooftop Unit 06 · History and parts already attached</text>
  <g transform="translate(330 274)">
    <rect width="700" height="292" rx="30" fill="#ebe6dd" fill-opacity=".88" stroke="#fff" stroke-opacity=".42"/>
    <text class="capsDark" x="350" y="50" text-anchor="middle">RECOMMENDED NEXT STEP</text>
    <circle cx="74" cy="138" r="18" fill="#d2aa5b"/>
    <text class="serifDark" x="112" y="128" font-size="38">Preventive visit</text>
    <text class="sansDark" x="114" y="160" font-size="15" opacity=".64">90 minutes · Same-week availability</text>
    <line x1="58" y1="202" x2="642" y2="202" class="lineDark"/>
    <text class="capsDark" x="58" y="246">CONTINUE TO SCHEDULE</text>
    <text class="sansDark" x="642" y="248" text-anchor="end" font-size="26">→</text>
  </g>`);

const rendered = [
  ['01-property-single-panel', property],
  ['02-dental-single-panel', dental],
  ['03-restaurant-single-panel', restaurant],
  ['04-plumbing-single-panel', plumbing],
  ['05-electrical-single-panel', electrical],
  ['06-industrial-single-panel', industrial],
  ['07-transport-single-panel', transport],
  ['08-hvac-single-panel', hvac],
];

for (const [name, svg] of rendered) {
  const svgPath = join(sources, `${name}.svg`);
  const pngPath = join(outputs, `${name}.png`);
  writeFileSync(svgPath, svg);
  execFileSync('rsvg-convert', ['-w', '1600', '-h', '900', '-o', pngPath, svgPath]);
  console.log(pngPath);
}
