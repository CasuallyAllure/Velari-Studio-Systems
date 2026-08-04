import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const backgroundDir = join(root, 'public/assets/showcase/backgrounds');
const sourceDir = join(root, 'public/assets/showcase/source-diverse');
const outputDir = join(root, 'public/assets/showcase/panels-diverse');

mkdirSync(sourceDir, { recursive: true });
mkdirSync(outputDir, { recursive: true });

const backgrounds = [
  '01-property-higgsfield.png',
  '02-dental-higgsfield.png',
  '03-restaurant-higgsfield.png',
  '04-plumbing-higgsfield.png',
  '05-electrical-higgsfield.png',
  '06-industrial-higgsfield.png',
  '07-transport-higgsfield.png',
  '08-hvac-higgsfield.png',
];

const dataUri = (name) =>
  `data:image/png;base64,${readFileSync(join(backgroundDir, name)).toString('base64')}`;

const svg = (body, extraDefs = '') => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <filter id="soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="3"/></filter>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000" flood-opacity=".26"/>
    </filter>
    ${extraDefs}
  </defs>
  ${body}
</svg>`;

const property = svg(`
  <rect width="1600" height="900" fill="#e9e3d7"/>
  <image href="${dataUri(backgrounds[0])}" x="660" y="0" width="940" height="900" preserveAspectRatio="xMidYMid slice"/>
  <rect x="660" width="940" height="900" fill="#273027" opacity=".20"/>
  <g fill="#20241e" font-family="Georgia, 'Times New Roman', serif">
    <text x="72" y="76" font-family="Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="6">HAVENROW</text>
    <text x="72" y="278" font-size="78">Homes with</text>
    <text x="72" y="360" font-size="78" font-style="italic">a point of view.</text>
    <text x="76" y="424" font-family="Arial, sans-serif" font-size="17" opacity=".64">Thoughtful residences across the Bay Area.</text>
  </g>
  <g font-family="Arial, sans-serif" font-size="12" letter-spacing="2.5" fill="#20241e">
    <text x="72" y="820">COLLECTION</text><text x="220" y="820">NEIGHBORHOODS</text><text x="410" y="820">JOURNAL</text>
  </g>
  <rect x="72" y="502" width="218" height="58" rx="29" fill="#364536"/>
  <text x="181" y="538" text-anchor="middle" fill="#f4efe5" font-family="Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="2">EXPLORE HOMES</text>
  <g transform="translate(1232 660)" filter="url(#shadow)">
    <rect width="286" height="164" fill="#f0eadf"/>
    <text x="24" y="36" fill="#384137" font-family="Arial, sans-serif" font-size="10" letter-spacing="3">FEATURED · PACIFIC HEIGHTS</text>
    <text x="24" y="88" fill="#20241e" font-family="Georgia, serif" font-size="32">Jackson House</text>
    <text x="24" y="122" fill="#20241e" font-family="Arial, sans-serif" font-size="14" opacity=".62">4 bed · 3 bath · 2,840 sq ft</text>
    <text x="250" y="132" fill="#20241e" font-family="Arial, sans-serif" font-size="24">→</text>
  </g>`);

const dental = svg(`
  <rect width="1600" height="900" fill="#f7f9f8"/>
  <rect x="0" y="0" width="1600" height="92" fill="#ffffff"/>
  <text x="68" y="57" fill="#223036" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="4">ARC DENTAL</text>
  <g fill="#506168" font-family="Arial, sans-serif" font-size="13">
    <text x="1040" y="56">SERVICES</text><text x="1142" y="56">OUR TEAM</text><text x="1248" y="56">PATIENTS</text>
  </g>
  <rect x="1370" y="27" width="162" height="42" rx="21" fill="#8da5ad"/>
  <text x="1451" y="53" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5">BOOK A VISIT</text>
  <g transform="translate(84 184)">
    <text x="0" y="0" fill="#7a949d" font-family="Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="4">MODERN FAMILY DENTISTRY</text>
    <text x="0" y="92" fill="#1e2c31" font-family="Arial, sans-serif" font-size="72" font-weight="300">Care that feels</text>
    <text x="0" y="172" fill="#1e2c31" font-family="Arial, sans-serif" font-size="72" font-weight="300">clear and human.</text>
    <text x="4" y="236" fill="#526168" font-family="Arial, sans-serif" font-size="18">Gentle treatment, transparent plans, and a calmer visit.</text>
    <rect x="0" y="294" width="196" height="58" rx="8" fill="#263a42"/>
    <text x="98" y="330" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5">MEET THE TEAM</text>
  </g>
  <clipPath id="dentalClip"><circle cx="1240" cy="482" r="326"/></clipPath>
  <image href="${dataUri(backgrounds[1])}" x="866" y="126" width="748" height="712" preserveAspectRatio="xMidYMid slice" clip-path="url(#dentalClip)"/>
  <circle cx="1240" cy="482" r="326" fill="none" stroke="#b8c7cb" stroke-width="2"/>
  <g transform="translate(884 692)" filter="url(#shadow)">
    <rect width="320" height="108" rx="16" fill="#fff"/>
    <circle cx="52" cy="54" r="28" fill="#dce5e6"/>
    <path d="M42 52h20M52 42v20" stroke="#526d76" stroke-width="2"/>
    <text x="94" y="45" fill="#25353b" font-family="Arial, sans-serif" font-size="15" font-weight="700">New patient?</text>
    <text x="94" y="70" fill="#607177" font-family="Arial, sans-serif" font-size="13">Start with a 45-minute visit.</text>
  </g>`);

const restaurant = svg(`
  <image href="${dataUri(backgrounds[2])}" width="1600" height="900" preserveAspectRatio="xMidYMid slice"/>
  <rect width="1600" height="900" fill="#3a1116" opacity=".74"/>
  <rect x="38" y="38" width="1524" height="824" fill="none" stroke="#f4dec3" stroke-opacity=".62"/>
  <text x="70" y="84" fill="#f4dec3" font-family="Georgia, serif" font-size="24" letter-spacing="4">EMBER &amp; GRAIN</text>
  <g fill="#f4dec3" font-family="Arial, sans-serif" font-size="11" letter-spacing="2.5">
    <text x="1172" y="82">MENU</text><text x="1260" y="82">STORY</text><text x="1350" y="82">VISIT</text>
  </g>
  <rect x="1430" y="55" width="102" height="42" fill="#d3a158"/>
  <text x="1481" y="81" text-anchor="middle" fill="#351116" font-family="Arial, sans-serif" font-size="10" font-weight="700" letter-spacing="1.5">RESERVE</text>
  <text x="800" y="302" text-anchor="middle" fill="#f8ead8" font-family="Georgia, serif" font-size="26" font-style="italic">San Francisco · Seasonal dining</text>
  <text x="800" y="430" text-anchor="middle" fill="#fff4e5" font-family="Georgia, serif" font-size="112">Gather around</text>
  <text x="800" y="544" text-anchor="middle" fill="#fff4e5" font-family="Georgia, serif" font-size="112" font-style="italic">the good fire.</text>
  <line x1="654" y1="612" x2="946" y2="612" stroke="#d3a158" stroke-width="2"/>
  <text x="800" y="660" text-anchor="middle" fill="#f4dec3" font-family="Arial, sans-serif" font-size="13" letter-spacing="3">DINNER · TUESDAY–SUNDAY · 5PM–LATE</text>
  <text x="70" y="816" fill="#f4dec3" font-family="Arial, sans-serif" font-size="11" letter-spacing="2">214 VALENCIA STREET</text>
  <text x="1530" y="816" text-anchor="end" fill="#f4dec3" font-family="Arial, sans-serif" font-size="11" letter-spacing="2">PRIVATE DINING ↗</text>`);

const plumbing = svg(`
  <rect width="1600" height="900" fill="#f6f3ed"/>
  <rect width="1600" height="44" fill="#102d42"/>
  <text x="58" y="28" fill="#fff" font-family="Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="1.5">LICENSED · INSURED · SERVING THE BAY SINCE 1998</text>
  <text x="1542" y="28" text-anchor="end" fill="#fff" font-family="Arial, sans-serif" font-size="11">24/7 EMERGENCY: (415) 555-0142</text>
  <rect y="44" width="1600" height="94" fill="#fff"/>
  <circle cx="84" cy="91" r="24" fill="#c36e3b"/>
  <path d="M74 91h20M84 81v20" stroke="#fff" stroke-width="4"/>
  <text x="124" y="99" fill="#102d42" font-family="Arial, sans-serif" font-size="24" font-weight="800">COPPERLINE PLUMBING</text>
  <g fill="#294353" font-family="Arial, sans-serif" font-size="13" font-weight="700">
    <text x="1020" y="98">RESIDENTIAL</text><text x="1148" y="98">COMMERCIAL</text><text x="1278" y="98">SERVICE AREA</text>
  </g>
  <rect x="1418" y="71" width="124" height="44" rx="5" fill="#c36e3b"/>
  <text x="1480" y="98" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif" font-size="11" font-weight="800">GET A QUOTE</text>
  <g transform="translate(0 138)">
    <rect width="780" height="570" fill="#e8eef0"/>
    <text x="70" y="118" fill="#c36e3b" font-family="Arial, sans-serif" font-size="13" font-weight="800" letter-spacing="2">PLUMBING THAT SHOWS UP.</text>
    <text x="70" y="210" fill="#102d42" font-family="Arial, sans-serif" font-size="68" font-weight="800">Fast fixes.</text>
    <text x="70" y="282" fill="#102d42" font-family="Arial, sans-serif" font-size="68" font-weight="800">Straight answers.</text>
    <text x="72" y="344" fill="#405866" font-family="Arial, sans-serif" font-size="18">Real arrival windows, upfront pricing, clean work.</text>
    <rect x="70" y="400" width="210" height="62" rx="5" fill="#102d42"/>
    <text x="175" y="438" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif" font-size="12" font-weight="800">SCHEDULE SERVICE</text>
    <text x="316" y="438" fill="#102d42" font-family="Arial, sans-serif" font-size="13" font-weight="700">OR CALL (415) 555-0142 →</text>
  </g>
  <image href="${dataUri(backgrounds[3])}" x="780" y="138" width="820" height="570" preserveAspectRatio="xMidYMid slice"/>
  <g transform="translate(64 746)">
    ${[
      ['4.9 ★','LOCAL RATING'],
      ['60 MIN','AVG. ARRIVAL'],
      ['25 YRS','BAY AREA'],
      ['100%','WORK GUARANTEE'],
    ].map(([value,label],i)=>`<g transform="translate(${i*380} 0)">
      <text x="0" y="42" fill="#102d42" font-family="Arial, sans-serif" font-size="32" font-weight="800">${value}</text>
      <text x="0" y="70" fill="#59717d" font-family="Arial, sans-serif" font-size="10" font-weight="700" letter-spacing="2">${label}</text>
    </g>`).join('')}
  </g>`);

const electrical = svg(`
  <rect width="1600" height="900" fill="#111214"/>
  <g opacity=".16" stroke="#f4c928">
    ${Array.from({length:17},(_,i)=>`<line x1="${i*100}" y1="0" x2="${i*100}" y2="900"/>`).join('')}
    ${Array.from({length:10},(_,i)=>`<line x1="0" y1="${i*100}" x2="1600" y2="${i*100}"/>`).join('')}
  </g>
  <image href="${dataUri(backgrounds[4])}" x="1010" y="100" width="520" height="700" preserveAspectRatio="xMidYMid slice" opacity=".62"/>
  <rect x="1010" y="100" width="520" height="700" fill="none" stroke="#f4c928" stroke-width="3"/>
  <text x="64" y="76" fill="#f4c928" font-family="'Courier New', monospace" font-size="18" font-weight="700" letter-spacing="3">VOLT/WORKS_</text>
  <text x="1518" y="76" text-anchor="end" fill="#bfc1c4" font-family="'Courier New', monospace" font-size="12">CA LIC. #1042381</text>
  <g transform="translate(64 204)">
    <text fill="#f4c928" font-family="'Courier New', monospace" font-size="13">COMMERCIAL ELECTRICAL / SF BAY</text>
    <text y="104" fill="#f5f5f3" font-family="Arial, sans-serif" font-size="90" font-weight="900">BUILT TO</text>
    <text y="194" fill="#f5f5f3" font-family="Arial, sans-serif" font-size="90" font-weight="900">STAY ON.</text>
    <text y="258" fill="#aeb0b2" font-family="'Courier New', monospace" font-size="16">INSTALLATION. RETROFIT. MAINTENANCE.</text>
    <rect y="320" width="238" height="62" fill="#f4c928"/>
    <text x="119" y="359" text-anchor="middle" fill="#111214" font-family="'Courier New', monospace" font-size="13" font-weight="700">START A PROJECT →</text>
  </g>
  <g transform="translate(64 744)">
    <rect width="860" height="88" fill="#1d1f22" stroke="#3d3f42"/>
    <text x="24" y="34" fill="#f4c928" font-family="'Courier New', monospace" font-size="11">CURRENT CAPACITY</text>
    <text x="24" y="66" fill="#fff" font-family="'Courier New', monospace" font-size="16">Q3 COMMERCIAL PROJECTS: 04 SLOTS AVAILABLE</text>
    <rect x="694" y="34" width="132" height="18" fill="#303235"/>
    <rect x="694" y="34" width="94" height="18" fill="#f4c928"/>
  </g>`);

const industrial = svg(`
  <rect width="1600" height="900" fill="#d75a2a"/>
  <image href="${dataUri(backgrounds[5])}" x="640" y="0" width="960" height="900" preserveAspectRatio="xMidYMid slice"/>
  <rect x="640" width="960" height="900" fill="#111" opacity=".36"/>
  <rect x="0" y="0" width="640" height="900" fill="#d75a2a"/>
  <text x="48" y="72" fill="#141414" font-family="Arial, sans-serif" font-size="26" font-weight="900">FORGEWORKS®</text>
  <text x="592" y="72" text-anchor="end" fill="#141414" font-family="'Courier New', monospace" font-size="12">EST. 1974 / OAKLAND CA</text>
  <text x="48" y="254" fill="#141414" font-family="Arial, sans-serif" font-size="72" font-weight="900">THE FLOOR</text>
  <text x="48" y="330" fill="#141414" font-family="Arial, sans-serif" font-size="72" font-weight="900">DOESN'T WAIT.</text>
  <text x="52" y="412" fill="#35180f" font-family="'Courier New', monospace" font-size="16">FABRICATION / ASSEMBLY / FINISHING</text>
  <rect x="48" y="474" width="220" height="60" fill="#141414"/>
  <text x="158" y="512" text-anchor="middle" fill="#fff" font-family="'Courier New', monospace" font-size="12" font-weight="700">VIEW CAPABILITIES</text>
  <g transform="translate(48 690)">
    ${[['12','CELLS'],['99.2','QUALITY'],['24/6','OUTPUT']].map(([n,l],i)=>`<g transform="translate(${i*180} 0)">
      <text fill="#141414" font-family="Arial, sans-serif" font-size="52" font-weight="900">${n}</text>
      <text y="30" fill="#35180f" font-family="'Courier New', monospace" font-size="11">${l}</text>
    </g>`).join('')}
  </g>
  <rect x="640" y="688" width="960" height="212" fill="#121212" opacity=".90"/>
  <text x="694" y="742" fill="#d75a2a" font-family="'Courier New', monospace" font-size="12">LIVE PRODUCTION / CELL B-04</text>
  <text x="694" y="812" fill="#fff" font-family="Arial, sans-serif" font-size="42" font-weight="800">Batch 238 is on plan.</text>
  <text x="1518" y="812" text-anchor="end" fill="#fff" font-family="'Courier New', monospace" font-size="16">76% COMPLETE</text>`);

const transport = svg(`
  <rect width="1600" height="900" fill="#eef3ff"/>
  <rect width="1600" height="86" fill="#1746d1"/>
  <text x="64" y="55" fill="#fff" font-family="Arial, sans-serif" font-size="22" font-weight="800">NORTHBOUND</text>
  <g fill="#dfe7ff" font-family="Arial, sans-serif" font-size="12" font-weight="700">
    <text x="1130" y="54">NETWORK</text><text x="1236" y="54">SERVICES</text><text x="1332" y="54">TRACK</text>
  </g>
  <rect x="1412" y="23" width="130" height="42" rx="21" fill="#ff594d"/>
  <text x="1477" y="50" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif" font-size="11" font-weight="800">GET A RATE</text>
  <g transform="translate(64 146)">
    <text fill="#1746d1" font-family="Arial, sans-serif" font-size="13" font-weight="800" letter-spacing="2">WESTERN REGIONAL FREIGHT</text>
    <text y="84" fill="#10235b" font-family="Arial, sans-serif" font-size="68" font-weight="800">Every load,</text>
    <text y="156" fill="#10235b" font-family="Arial, sans-serif" font-size="68" font-weight="800">visible end to end.</text>
    <text y="210" fill="#53658f" font-family="Arial, sans-serif" font-size="17">Live routes, responsive dispatch, fewer unknowns.</text>
  </g>
  <g transform="translate(64 446)" filter="url(#shadow)">
    <rect width="1472" height="356" rx="24" fill="#fff"/>
    <text x="32" y="46" fill="#52658e" font-family="Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="2">LIVE NETWORK · 42 LOADS</text>
    <path d="M80 218C300 18 522 330 746 142S1110 72 1384 192" fill="none" stroke="#cad5f6" stroke-width="8"/>
    <path d="M80 218C300 18 522 330 746 142S1110 72 1384 192" fill="none" stroke="#1746d1" stroke-width="5" stroke-dasharray="2 18" stroke-linecap="round"/>
    ${[[80,218,'SF'],[354,138,'OAK'],[746,142,'SAC'],[1058,104,'RNO'],[1384,192,'SLC']].map(([x,y,c],i)=>`<g transform="translate(${x} ${y})">
      <circle r="${i===0?28:20}" fill="${i===0?'#ff594d':'#1746d1'}"/>
      <text y="5" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif" font-size="10" font-weight="800">${c}</text>
    </g>`).join('')}
  </g>`);

const hvac = svg(`
  <rect width="1600" height="900" fill="#dce9e7"/>
  <image href="${dataUri(backgrounds[7])}" x="0" y="0" width="1600" height="900" preserveAspectRatio="xMidYMid slice"/>
  <rect width="1600" height="900" fill="#0e3e42" opacity=".52"/>
  <rect x="44" y="36" width="1512" height="76" rx="20" fill="#eaf3f1" fill-opacity=".92"/>
  <text x="78" y="83" fill="#123b3e" font-family="Arial, sans-serif" font-size="18" font-weight="800">AEROSTATE</text>
  <text x="200" y="83" fill="#5f7978" font-family="Arial, sans-serif" font-size="11" letter-spacing="2">HOME COMFORT</text>
  <g fill="#315b5d" font-family="Arial, sans-serif" font-size="12" font-weight="700">
    <text x="1164" y="82">SERVICES</text><text x="1260" y="82">MEMBERSHIP</text>
  </g>
  <rect x="1400" y="54" width="122" height="42" rx="21" fill="#ef7e5f"/>
  <text x="1461" y="80" text-anchor="middle" fill="#fff" font-family="Arial, sans-serif" font-size="10" font-weight="800">BOOK SERVICE</text>
  <g transform="translate(80 206)">
    <rect width="730" height="520" rx="36" fill="#edf5f3" fill-opacity=".92"/>
    <text x="52" y="68" fill="#ef7e5f" font-family="Arial, sans-serif" font-size="12" font-weight="800" letter-spacing="2">SMARTER HOME SERVICE</text>
    <text x="52" y="156" fill="#123b3e" font-family="Arial, sans-serif" font-size="62" font-weight="700">Comfort without</text>
    <text x="52" y="226" fill="#123b3e" font-family="Arial, sans-serif" font-size="62" font-weight="700">the guesswork.</text>
    <text x="56" y="282" fill="#587273" font-family="Arial, sans-serif" font-size="17">Clear options, prepared technicians, useful updates.</text>
    <g transform="translate(52 342)">
      <rect width="626" height="112" rx="22" fill="#fff"/>
      <circle cx="58" cy="56" r="28" fill="#d9ebe7"/>
      <path d="M47 56h22M58 45v22" stroke="#2d6d6e" stroke-width="2"/>
      <text x="106" y="49" fill="#173f42" font-family="Arial, sans-serif" font-size="17" font-weight="800">Preventive visit</text>
      <text x="106" y="76" fill="#648082" font-family="Arial, sans-serif" font-size="13">Recommended · 90 minutes</text>
      <text x="586" y="66" text-anchor="end" fill="#173f42" font-family="Arial, sans-serif" font-size="22">→</text>
    </g>
  </g>
  <g transform="translate(990 648)">
    <rect width="500" height="134" rx="28" fill="#123b3e" fill-opacity=".92"/>
    <text x="32" y="44" fill="#9bc3be" font-family="Arial, sans-serif" font-size="11" font-weight="700" letter-spacing="2">MEMBER CARE</text>
    <text x="32" y="84" fill="#fff" font-family="Arial, sans-serif" font-size="24" font-weight="700">Equipment history attached.</text>
    <text x="32" y="110" fill="#bdd3d0" font-family="Arial, sans-serif" font-size="13">Your technician arrives ready.</text>
  </g>`);

const panels = [
  ['01-property-editorial', property],
  ['02-dental-clinical', dental],
  ['03-restaurant-editorial', restaurant],
  ['04-plumbing-conversion', plumbing],
  ['05-electrical-technical', electrical],
  ['06-industrial-brutalist', industrial],
  ['07-transport-saas', transport],
  ['08-hvac-service', hvac],
];

for (const [name, source] of panels) {
  const svgPath = join(sourceDir, `${name}.svg`);
  const pngPath = join(outputDir, `${name}.png`);
  writeFileSync(svgPath, source);
  execFileSync('rsvg-convert', ['-w', '1600', '-h', '900', '-o', pngPath, svgPath]);
  console.log(pngPath);
}
