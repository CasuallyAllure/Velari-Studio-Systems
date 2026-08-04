import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const backgrounds = join(root, 'public/assets/showcase/backgrounds');
const sources = join(root, 'public/assets/showcase/source-v2');
const outputs = join(root, 'public/assets/showcase/panels-v2');

mkdirSync(sources, { recursive: true });
mkdirSync(outputs, { recursive: true });

const files = {
  property: '01-property-higgsfield.png',
  dental: '02-dental-higgsfield.png',
  restaurant: '03-restaurant-higgsfield.png',
  plumbing: '04-plumbing-higgsfield.png',
  electrical: '05-electrical-higgsfield.png',
  industrial: '06-industrial-higgsfield.png',
  transport: '07-transport-higgsfield.png',
  hvac: '08-hvac-higgsfield.png',
};

const imageData = (name) =>
  `data:image/png;base64,${readFileSync(join(backgrounds, name)).toString('base64')}`;

const commonDefs = `
  <defs>
    <filter id="blur2" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="2"/></filter>
    <filter id="blur8" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="8"/></filter>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="28" flood-color="#000" flood-opacity=".38"/>
    </filter>
    <linearGradient id="darkWash" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#090806" stop-opacity=".88"/>
      <stop offset=".55" stop-color="#17130f" stop-opacity=".38"/>
      <stop offset="1" stop-color="#070605" stop-opacity=".72"/>
    </linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#eee8dc" stop-opacity=".17"/>
      <stop offset=".48" stop-color="#827a70" stop-opacity=".10"/>
      <stop offset="1" stop-color="#090806" stop-opacity=".62"/>
    </linearGradient>
    <linearGradient id="bone" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f0ece3" stop-opacity=".96"/>
      <stop offset="1" stop-color="#c9c1b5" stop-opacity=".90"/>
    </linearGradient>
    <style>
      .serif { font-family: Georgia, "Times New Roman", serif; fill: #f1ede4; font-weight: 400; }
      .serif-dark { font-family: Georgia, "Times New Roman", serif; fill: #1a1713; font-weight: 400; }
      .sans { font-family: "Helvetica Neue", Arial, sans-serif; fill: #eee9df; }
      .sans-dark { font-family: "Helvetica Neue", Arial, sans-serif; fill: #1a1713; }
      .caps { font-family: "Helvetica Neue", Arial, sans-serif; fill: #c8c0b5; font-size: 12px; font-weight: 600; letter-spacing: 3.5px; }
      .caps-dark { font-family: "Helvetica Neue", Arial, sans-serif; fill: #37312a; font-size: 12px; font-weight: 600; letter-spacing: 3.5px; }
      .muted { fill: #b9b1a6; }
      .gold { fill: #c9a45c; }
      .gold-stroke { stroke: #c9a45c; }
      .hair { stroke: #ddd5c9; stroke-opacity: .38; stroke-width: 1; }
      .hair-dark { stroke: #2a251f; stroke-opacity: .35; stroke-width: 1; }
    </style>
  </defs>`;

function shell(background, content, { blur = 2, imageOpacity = 1, washOpacity = 1 } = {}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  ${commonDefs}
  <image href="${imageData(background)}" x="-35" y="-35" width="1670" height="970"
    preserveAspectRatio="xMidYMid slice" filter="url(#blur${blur})" opacity="${imageOpacity}"/>
  <rect width="1600" height="900" fill="url(#darkWash)" opacity="${washOpacity}"/>
  ${content}
</svg>`;
}

const header = (brand, section, index, dark = false) => `
  <g class="${dark ? 'sans-dark' : 'sans'}">
    <text x="66" y="62" font-size="15" font-weight="600" letter-spacing="5">${brand}</text>
    <text x="800" y="61" text-anchor="middle" font-size="10" letter-spacing="4" opacity=".7">${section}</text>
    <text x="1532" y="62" text-anchor="end" font-size="11" letter-spacing="3" opacity=".7">${index} / 08</text>
  </g>`;

const footer = (dark = false) => `
  <g transform="translate(66 814)">
    <line x1="0" y1="0" x2="1468" y2="0" class="${dark ? 'hair-dark' : 'hair'}"/>
    <circle cx="5" cy="35" r="5" fill="#c9a45c"/>
    <text class="${dark ? 'caps-dark' : 'caps'}" x="26" y="39">VELARI SYSTEMS · BUILT AROUND THE WORK</text>
    <text class="${dark ? 'caps-dark' : 'caps'}" x="1468" y="39" text-anchor="end">DESIGN  ·  DEVELOPMENT  ·  OPERATIONS</text>
  </g>`;

const property = shell(
  files.property,
  `${header('NORTHLINE', 'PROPERTY INTELLIGENCE', '01')}
  <g transform="translate(66 142)">
    <text class="caps gold" x="0" y="0">PORTFOLIO VIEW</text>
    <text class="serif" x="0" y="86" font-size="76">A living map of</text>
    <text class="serif" x="0" y="166" font-size="76">every residence.</text>
    <text class="sans muted" x="4" y="214" font-size="17">Occupancy, leasing, maintenance, and resident care.</text>
    <rect x="0" y="258" width="218" height="56" rx="28" fill="#c9a45c"/>
    <text class="sans-dark" x="109" y="293" text-anchor="middle" font-size="12" font-weight="600" letter-spacing="2">OPEN PORTFOLIO</text>
  </g>
  <g transform="translate(832 130)" filter="url(#shadow)">
    <rect width="700" height="610" rx="32" fill="url(#glass)" stroke="#e4ddd2" stroke-opacity=".48"/>
    <text class="caps" x="38" y="48">RESIDENCE MAP · 48 UNITS</text>
    <text class="sans" x="662" y="48" text-anchor="end" font-size="13" fill="#c9a45c">96% OCCUPIED</text>
    ${Array.from({ length: 5 }, (_, row) =>
      Array.from({ length: 6 }, (_, col) => {
        const active = ![[0, 4], [3, 1]].some(([r, c]) => r === row && c === col);
        return `<rect x="${42 + col * 101}" y="${88 + row * 82}" width="82" height="58" rx="8"
          fill="${active ? '#d8d0c4' : '#c9a45c'}" fill-opacity="${active ? '.12' : '.68'}"
          stroke="#eee7dc" stroke-opacity=".28"/>`;
      }).join('')
    ).join('')}
    <line x1="38" y1="522" x2="662" y2="522" class="hair"/>
    <text class="caps" x="38" y="565">OPEN WORK ORDERS</text>
    <text class="serif" x="38" y="604" font-size="34">14</text>
    <text class="sans muted" x="132" y="602" font-size="14">Four scheduled today</text>
    <circle cx="636" cy="584" r="19" fill="#c9a45c"/>
    <path d="M628 584h16M638 576l8 8-8 8" stroke="#18140f" stroke-width="2" fill="none"/>
  </g>
  ${footer()}`,
  { blur: 8 },
);

const dental = shell(
  files.dental,
  `${header('ARC DENTAL', 'CARE COORDINATION', '02')}
  <rect x="54" y="116" width="1492" height="636" rx="36" fill="url(#bone)" filter="url(#shadow)"/>
  <g transform="translate(102 166)">
    <text class="caps-dark" x="0" y="0">PATIENT FLOW · TODAY</text>
    <text class="serif-dark" x="0" y="92" font-size="70">Precision feels</text>
    <text class="serif-dark" x="0" y="164" font-size="70">like calm.</text>
    <text class="sans-dark" x="3" y="212" font-size="17" opacity=".68">Rooms, treatment, follow-up, and time—held together.</text>
    <g transform="translate(0 274)">
      <rect width="440" height="72" rx="16" fill="#fff" fill-opacity=".48" stroke="#2b261f" stroke-opacity=".15"/>
      <text class="caps-dark" x="22" y="27">NEXT APPOINTMENT</text>
      <text class="sans-dark" x="22" y="54" font-size="18">10:40 · Room 03 · Confirmed</text>
    </g>
    <g transform="translate(0 364)">
      <rect width="440" height="72" rx="16" fill="#fff" fill-opacity=".24" stroke="#2b261f" stroke-opacity=".15"/>
      <text class="caps-dark" x="22" y="27">CHAIR UTILIZATION</text>
      <text class="serif-dark" x="22" y="59" font-size="28">87%</text>
      <rect x="128" y="42" width="280" height="7" rx="4" fill="#2a251f" fill-opacity=".12"/>
      <rect x="128" y="42" width="244" height="7" rx="4" fill="#9b7740"/>
    </g>
  </g>
  <g transform="translate(940 176)">
    <circle cx="236" cy="236" r="214" fill="#29241e" fill-opacity=".08" stroke="#2a251f" stroke-opacity=".25"/>
    <circle cx="236" cy="236" r="166" fill="none" stroke="#9b7740" stroke-opacity=".65" stroke-width="2" stroke-dasharray="4 12"/>
    <path d="M185 126c-34 20-50 68-38 112 8 30 31 50 39 89 6 31 21 54 50 54s44-23 50-54c8-39 31-59 39-89 12-44-4-92-38-112-28-16-46 13-51 13s-23-29-51-13z"
      fill="#f5f1e9" fill-opacity=".35" stroke="#2a251f" stroke-opacity=".5" stroke-width="2"/>
    <line x1="28" y1="236" x2="444" y2="236" stroke="#9b7740" stroke-opacity=".42"/>
    <line x1="236" y1="28" x2="236" y2="444" stroke="#9b7740" stroke-opacity=".42"/>
    <text class="caps-dark" x="236" y="492" text-anchor="middle">TREATMENT PLAN · REVIEWED</text>
  </g>
  ${footer(true)}`,
  { blur: 2, washOpacity: 0.35 },
);

const restaurant = shell(
  files.restaurant,
  `${header('EMBER &amp; GRAIN', 'RESERVATIONS / SERVICE', '03')}
  <g transform="translate(80 172)">
    <text class="caps gold" x="0" y="0">TONIGHT · SAN FRANCISCO</text>
    <text class="serif" x="0" y="108" font-size="102">128</text>
    <text class="serif" x="0" y="174" font-size="50">covers, paced.</text>
    <text class="sans muted" x="5" y="218" font-size="17">A reservation system designed around the room.</text>
  </g>
  <g transform="translate(770 132)">
    <rect width="760" height="598" rx="34" fill="#0b0907" fill-opacity=".48" stroke="#e4ddd2" stroke-opacity=".42"/>
    <text class="caps" x="38" y="48">DINING ROOM · LIVE</text>
    ${[
      [125, 120, 30, '2'], [235, 120, 34, '4'], [360, 120, 30, '2'], [480, 120, 34, '4'], [620, 120, 30, '2'],
      [165, 270, 34, '4'], [300, 270, 30, '2'], [430, 270, 34, '4'], [570, 270, 34, '4'],
      [125, 420, 30, '2'], [250, 420, 34, '4'], [390, 420, 30, '2'], [520, 420, 34, '4'], [650, 420, 30, '2'],
    ].map(([x,y,r,n], i) => `<g><circle cx="${x}" cy="${y}" r="${r}" fill="${i === 7 || i === 11 ? '#c9a45c' : '#ddd5c9'}" fill-opacity="${i === 7 || i === 11 ? '.68' : '.10'}" stroke="#eee7dc" stroke-opacity=".32"/><text class="sans" x="${x}" y="${y+5}" text-anchor="middle" font-size="13">${n}</text></g>`).join('')}
    <line x1="38" y1="514" x2="722" y2="514" class="hair"/>
    <text class="caps" x="38" y="558">WAITLIST</text>
    <text class="serif" x="172" y="565" font-size="34">06</text>
    <text class="sans muted" x="240" y="560" font-size="14">18 min average</text>
    <rect x="526" y="532" width="196" height="48" rx="24" fill="#c9a45c"/>
    <text class="sans-dark" x="624" y="562" text-anchor="middle" font-size="12" font-weight="600" letter-spacing="2">OPEN SERVICE</text>
  </g>
  ${footer()}`,
);

const plumbing = shell(
  files.plumbing,
  `${header('COPPERLINE', 'COMMERCIAL SERVICE', '04')}
  <g transform="translate(74 150)">
    <text class="caps gold" x="0" y="0">PRESSURE NETWORK · LIVE</text>
    <text class="serif" x="0" y="86" font-size="72">Every line has</text>
    <text class="serif" x="0" y="160" font-size="72">a clear next step.</text>
  </g>
  <g transform="translate(80 382)">
    <path d="M0 120h260V20h260v100h258v-72h260v144h320" fill="none" stroke="#b98249" stroke-width="18" stroke-linejoin="round"/>
    <path d="M0 120h260V20h260v100h258v-72h260v144h320" fill="none" stroke="#f0c281" stroke-opacity=".42" stroke-width="3"/>
    ${[[260,120],[520,120],[778,120],[1038,120],[1038,192]].map(([x,y], i)=>`<g><circle cx="${x}" cy="${y}" r="25" fill="#17130f" stroke="#d4ae6a" stroke-width="3"/><circle cx="${x}" cy="${y}" r="7" fill="${i===3?'#d4ae6a':'#eee8dd'}"/></g>`).join('')}
    <g transform="translate(1120 16)">
      <rect width="356" height="208" rx="24" fill="url(#glass)" stroke="#e4ddd2" stroke-opacity=".44"/>
      <text class="caps" x="24" y="42">PRIORITY SERVICE</text>
      <text class="serif" x="24" y="94" font-size="34">Commercial leak</text>
      <text class="sans muted" x="24" y="126" font-size="15">Unit 12 · Technician assigned</text>
      <rect x="24" y="150" width="148" height="38" rx="19" fill="#c9a45c"/>
      <text class="sans-dark" x="98" y="174" text-anchor="middle" font-size="11" letter-spacing="2">ETA 18 MIN</text>
    </g>
  </g>
  ${footer()}`,
);

const electrical = shell(
  files.electrical,
  `${header('VOLTWORKS', 'LOAD / INSPECTION', '05')}
  <g transform="translate(70 146)">
    <text class="caps gold" x="0" y="0">PROJECT CONTROL · PIER 7</text>
    <text class="serif" x="0" y="92" font-size="72">Power, measured</text>
    <text class="serif" x="0" y="166" font-size="72">before it moves.</text>
  </g>
  <g transform="translate(70 378)">
    <rect width="980" height="340" rx="28" fill="#0a0907" fill-opacity=".50" stroke="#ded7cc" stroke-opacity=".34"/>
    <text class="caps" x="30" y="48">LIVE LOAD PROFILE</text>
    <polyline points="30,238 96,214 164,226 232,164 300,182 368,122 436,148 504,96 572,126 640,84 708,112 776,68 844,94 930,56"
      fill="none" stroke="#c9a45c" stroke-width="3"/>
    <polyline points="30,270 96,252 164,258 232,224 300,238 368,198 436,210 504,174 572,190 640,154 708,172 776,138 844,154 930,126"
      fill="none" stroke="#e8e2d8" stroke-opacity=".45" stroke-width="2"/>
    ${[0,1,2,3,4,5,6].map(i=>`<line x1="${30+i*150}" y1="74" x2="${30+i*150}" y2="292" class="hair"/>`).join('')}
    <text class="caps" x="30" y="318">06:00</text><text class="caps" x="930" y="318" text-anchor="end">18:00</text>
  </g>
  <g transform="translate(1102 378)">
    <circle cx="190" cy="170" r="148" fill="#0a0907" fill-opacity=".52" stroke="#ded7cc" stroke-opacity=".34"/>
    <circle cx="190" cy="170" r="112" fill="none" stroke="#eee8dd" stroke-opacity=".16" stroke-width="22"/>
    <circle cx="190" cy="170" r="112" fill="none" stroke="#c9a45c" stroke-width="22" stroke-dasharray="574 704" stroke-linecap="round" transform="rotate(-90 190 170)"/>
    <text class="serif" x="190" y="166" text-anchor="middle" font-size="58">82%</text>
    <text class="caps" x="190" y="202" text-anchor="middle">CREW LOAD</text>
  </g>
  ${footer()}`,
);

const industrial = shell(
  files.industrial,
  `${header('FORGEWORKS', 'PRODUCTION INTELLIGENCE', '06')}
  <g transform="translate(70 142)">
    <text class="caps gold" x="0" y="0">CELL B-04 · BATCH 238</text>
    <text class="serif" x="0" y="92" font-size="76">The floor tells you</text>
    <text class="serif" x="0" y="170" font-size="76">what comes next.</text>
  </g>
  <g transform="translate(70 410)">
    ${[
      ['01', 'MATERIAL', 'Complete', 1],
      ['02', 'MACHINE', 'Running', .76],
      ['03', 'QUALITY', 'Queued', .22],
      ['04', 'PACKOUT', 'Waiting', .06],
    ].map(([n,l,s,p], i)=>`<g transform="translate(${i*370} 0)">
      <rect width="338" height="236" fill="${i===1?'#ded7cc':'#0c0a08'}" fill-opacity="${i===1?'.88':'.52'}" stroke="#ded7cc" stroke-opacity=".32"/>
      <text class="${i===1?'caps-dark':'caps'}" x="24" y="38">${n}</text>
      <text class="${i===1?'serif-dark':'serif'}" x="24" y="94" font-size="34">${l}</text>
      <text class="${i===1?'sans-dark':'sans'}" x="24" y="128" font-size="14" opacity=".68">${s}</text>
      <rect x="24" y="180" width="290" height="7" rx="4" fill="${i===1?'#2a251f':'#eee8dd'}" fill-opacity=".14"/>
      <rect x="24" y="180" width="${290*p}" height="7" rx="4" fill="#c9a45c"/>
      <text class="${i===1?'caps-dark':'caps'}" x="314" y="212" text-anchor="end">${Math.round(p*100)}%</text>
    </g>`).join('')}
  </g>
  ${footer()}`,
);

const transport = shell(
  files.transport,
  `${header('NORTHBOUND', 'FLEET / LOGISTICS', '07')}
  <g transform="translate(70 140)">
    <text class="caps gold" x="0" y="0">REGIONAL NETWORK · LIVE</text>
    <text class="serif" x="0" y="86" font-size="72">Freight in motion.</text>
    <text class="serif" x="0" y="160" font-size="72">Answers at a glance.</text>
  </g>
  <g transform="translate(86 388)">
    <path d="M40 190C250 8 488 296 710 128S1124 54 1420 176" fill="none" stroke="#e7dfd4" stroke-opacity=".26" stroke-width="3"/>
    <path d="M40 190C250 8 488 296 710 128S1124 54 1420 176" fill="none" stroke="#c9a45c" stroke-width="4" stroke-dasharray="1 20" stroke-linecap="round"/>
    ${[
      [40,190,'SF','42'],[322,136,'OAK','12'],[710,128,'SAC','08'],[1040,104,'RNO','03'],[1420,176,'SLC','01']
    ].map(([x,y,city,count],i)=>`<g transform="translate(${x} ${y})">
      <circle r="${i===0?27:20}" fill="${i===0?'#c9a45c':'#17130f'}" stroke="#e8e1d7" stroke-opacity=".52"/>
      <text class="${i===0?'sans-dark':'sans'}" y="5" text-anchor="middle" font-size="11" font-weight="600">${city}</text>
      <rect x="-50" y="38" width="100" height="42" rx="21" fill="#0b0907" fill-opacity=".65" stroke="#ddd5c9" stroke-opacity=".25"/>
      <text class="caps" x="0" y="64" text-anchor="middle">${count} LOADS</text>
    </g>`).join('')}
  </g>
  <g transform="translate(1110 146)">
    <rect width="420" height="164" rx="24" fill="url(#glass)" stroke="#e4ddd2" stroke-opacity=".42"/>
    <text class="caps" x="24" y="42">ROUTE NB-204</text>
    <text class="serif" x="24" y="89" font-size="30">Oakland → Reno</text>
    <text class="sans muted" x="24" y="126" font-size="14">On schedule · Arrival 18:40</text>
  </g>
  ${footer()}`,
);

const hvac = shell(
  files.hvac,
  `${header('AEROSTATE', 'FIELD SERVICE', '08')}
  <g transform="translate(76 156)">
    <text class="caps gold" x="0" y="0">EQUIPMENT CARE · SAN FRANCISCO</text>
    <text class="serif" x="0" y="90" font-size="74">Service arrives</text>
    <text class="serif" x="0" y="166" font-size="74">already prepared.</text>
    <text class="sans muted" x="4" y="214" font-size="17">History, parts, scheduling, and updates before the visit.</text>
  </g>
  <g transform="translate(874 104)" filter="url(#shadow)">
    <rect width="650" height="674" rx="42" fill="url(#glass)" stroke="#e8e1d7" stroke-opacity=".58" stroke-width="1.5"/>
    <text class="caps" x="325" y="62" text-anchor="middle">ROOFTOP UNIT 06 · MEMBER CARE</text>
    <text class="serif" x="325" y="136" text-anchor="middle" font-size="46">Choose the next step.</text>
    <text class="sans muted" x="325" y="174" text-anchor="middle" font-size="16">Your equipment history is already attached.</text>
    ${[
      ['Preventive visit', 'Recommended · 90 minutes'],
      ['System diagnostic', 'Performance and airflow'],
      ['Priority repair', 'Same-day response'],
    ].map(([title,detail],i)=>`<g transform="translate(48 ${220+i*104})">
      <rect width="554" height="82" rx="22" fill="${i===0?'#e7e1d7':'#13100d'}" fill-opacity="${i===0?'.84':'.42'}" stroke="#e7e1d7" stroke-opacity=".34"/>
      <circle cx="38" cy="41" r="12" fill="${i===0?'#c9a45c':'#e7e1d7'}" fill-opacity="${i===0?'1':'.18'}"/>
      <text class="${i===0?'sans-dark':'sans'}" x="68" y="35" font-size="17" font-weight="500">${title}</text>
      <text class="${i===0?'sans-dark':'sans'}" x="68" y="58" font-size="13" opacity=".62">${detail}</text>
      <text class="${i===0?'sans-dark':'sans'}" x="520" y="48" text-anchor="middle" font-size="18">→</text>
    </g>`).join('')}
    <rect x="48" y="560" width="554" height="64" rx="32" fill="#c9a45c"/>
    <text class="sans-dark" x="325" y="599" text-anchor="middle" font-size="13" font-weight="600" letter-spacing="2.4">CONTINUE TO SCHEDULE</text>
  </g>
  ${footer()}`,
  { blur: 2 },
);

const rendered = [
  ['01-property-map-v2', property],
  ['02-dental-scan-v2', dental],
  ['03-restaurant-reservations-v2', restaurant],
  ['04-plumbing-network-v2', plumbing],
  ['05-electrical-load-v2', electrical],
  ['06-industrial-timeline-v2', industrial],
  ['07-transport-route-v2', transport],
  ['08-hvac-service-modal-v2', hvac],
];

for (const [name, svg] of rendered) {
  const svgPath = join(sources, `${name}.svg`);
  const pngPath = join(outputs, `${name}.png`);
  writeFileSync(svgPath, svg);
  execFileSync('rsvg-convert', ['-w', '1600', '-h', '900', '-o', pngPath, svgPath]);
  console.log(pngPath);
}
