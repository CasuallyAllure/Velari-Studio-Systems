const path = require('node:path');
const fs = require('node:fs/promises');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const sourceDir = path.join(root, 'public/assets/services-orbit/source');
const outputDir = path.join(root, 'public/assets/services-orbit/v2');
const conceptDir = path.join(root, 'public/assets/showcase/concepts/property');

const W = 2560;
const H = 1440;

const frames = [
  {
    id: '01',
    source: '01-brand-systems-higgsfield-v1.png',
    output: '01-brand-systems.png',
  },
  {
    id: '02',
    source: '02-websites-higgsfield-v2.png',
    output: '02-websites.png',
  },
  {
    id: '03',
    source: '03-photography-creative-higgsfield-v1.png',
    output: '03-photography-creative.png',
  },
  {
    id: '04',
    source: '04-portals-ordering-higgsfield-v2.png',
    output: '04-portals-ordering.png',
  },
  {
    id: '05',
    source: '05-ai-intake-reception-higgsfield-v1.png',
    output: '05-ai-intake-reception.png',
  },
  {
    id: '06',
    source: '06-automation-integrations-higgsfield-v1.png',
    output: '06-automation-integrations.png',
  },
];

function svgBuffer(markup, width = W, height = H) {
  return Buffer.from(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${markup}</svg>`,
  );
}

function maskSvg(width, height, radius) {
  return svgBuffer(
    `<rect width="${width}" height="${height}" rx="${radius}" fill="#fff"/>`,
    width,
    height,
  );
}

async function roundedImage(input, width, height, radius, options = {}) {
  return sharp(input)
    .resize(width, height, {
      fit: options.fit || 'cover',
      position: options.position || 'centre',
      background: options.background || '#0c1011',
    })
    .composite([{ input: maskSvg(width, height, radius), blend: 'dest-in' }])
    .png()
    .toBuffer();
}

function defs() {
  return `
    <defs>
      <linearGradient id="blackLeft" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#070707" stop-opacity="0.94"/>
        <stop offset="0.52" stop-color="#070707" stop-opacity="0.52"/>
        <stop offset="1" stop-color="#070707" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="blackBottom" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#070707" stop-opacity="0"/>
        <stop offset="1" stop-color="#070707" stop-opacity="0.9"/>
      </linearGradient>
      <linearGradient id="ivoryGlass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f4efe7" stop-opacity="0.22"/>
        <stop offset="1" stop-color="#d8c9b5" stop-opacity="0.08"/>
      </linearGradient>
      <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="7" stdDeviation="12" flood-color="#000" flood-opacity="0.72"/>
      </filter>
    </defs>
  `;
}

function pill(x, y, width, text, options = {}) {
  const fill = options.fill || '#0b0b0b';
  const stroke = options.stroke || '#c49a58';
  const color = options.color || '#f4efe7';
  return `
    <g transform="translate(${x} ${y})">
      <rect width="${width}" height="62" rx="31" fill="${fill}" fill-opacity="${options.opacity || 0.78}" stroke="${stroke}" stroke-opacity="0.7"/>
      <text x="${width / 2}" y="40" text-anchor="middle" fill="${color}" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="700" letter-spacing="2.2">${text}</text>
    </g>
  `;
}

function brandOverlay() {
  return svgBuffer(`
    ${defs()}
    <rect width="1500" height="680" fill="url(#blackLeft)"/>
    <g transform="translate(188 136)" filter="url(#shadow)">
      <text x="0" y="0" fill="#cda45f" font-family="'Courier New', monospace" font-size="27" font-weight="700" letter-spacing="6">01 / BRAND SYSTEMS</text>
      <text x="0" y="118" fill="#f5efe5" font-family="Didot, Georgia, serif" font-size="91" font-style="italic">Identity, made</text>
      <text x="0" y="213" fill="#f5efe5" font-family="Didot, Georgia, serif" font-size="91">unmistakably yours.</text>
      <line x1="0" y1="260" x2="760" y2="260" stroke="#cda45f" stroke-width="2"/>
      <text x="0" y="318" fill="#ddd4c7" font-family="Arial, Helvetica, sans-serif" font-size="31">From the mark to the full visual language.</text>
    </g>
    ${pill(188, 1138, 238, 'LOGO DIRECTION')}
    ${pill(446, 1138, 224, 'COLOR + TYPE')}
    ${pill(690, 1138, 272, 'BRAND GUIDELINES')}
    <text x="2290" y="1305" fill="#eee6da" font-family="'Courier New', monospace" font-size="23" letter-spacing="6">VELARI / 01</text>
  `);
}

function websitesOverlay() {
  return svgBuffer(`
    ${defs()}
    <rect width="1320" height="390" fill="url(#blackLeft)"/>
    <g transform="translate(158 112)" filter="url(#shadow)">
      <text x="0" y="0" fill="#d3a259" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="800" letter-spacing="7">02 / CUSTOM WEBSITES</text>
      <text x="0" y="112" fill="#f4efe7" font-family="'Arial Narrow', 'Helvetica Neue', Arial, sans-serif" font-size="105" font-weight="800" letter-spacing="-3">DESIGNED TO BE</text>
      <text x="0" y="215" fill="#f4efe7" font-family="'Arial Narrow', 'Helvetica Neue', Arial, sans-serif" font-size="105" font-weight="300" letter-spacing="-3">REMEMBERED.</text>
    </g>
    <g transform="translate(178 1170)">
      <text x="0" y="0" fill="#f2eadf" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="700">STRATEGY</text>
      <text x="225" y="0" fill="#cda45f" font-family="Arial, Helvetica, sans-serif" font-size="31">+</text>
      <text x="278" y="0" fill="#f2eadf" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="700">DESIGN</text>
      <text x="454" y="0" fill="#cda45f" font-family="Arial, Helvetica, sans-serif" font-size="31">+</text>
      <text x="507" y="0" fill="#f2eadf" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="700">DEVELOPMENT</text>
      <text x="805" y="0" fill="#cda45f" font-family="Arial, Helvetica, sans-serif" font-size="31">+</text>
      <text x="858" y="0" fill="#f2eadf" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="700">E-COMMERCE</text>
    </g>
    <line x1="178" y1="1212" x2="1274" y2="1212" stroke="#d0a45e" stroke-width="2"/>
    <text x="178" y="1272" fill="#d7d0c7" font-family="Arial, Helvetica, sans-serif" font-size="29">Responsive on every screen. Clear inquiry built in.</text>
  `);
}

function photographyOverlay() {
  return svgBuffer(`
    ${defs()}
    <rect width="1270" height="500" fill="url(#blackLeft)"/>
    <rect y="1040" width="2560" height="400" fill="url(#blackBottom)"/>
    <g transform="translate(176 124)" filter="url(#shadow)">
      <text x="0" y="0" fill="#caa15f" font-family="'Courier New', monospace" font-size="27" letter-spacing="6">ROLL 03 / ORIGINAL CONTENT</text>
      <text x="0" y="120" fill="#f5efe5" font-family="Bodoni 72, Didot, Georgia, serif" font-size="88">Photography that</text>
      <text x="0" y="218" fill="#f5efe5" font-family="Bodoni 72, Didot, Georgia, serif" font-size="88" font-style="italic">belongs to the brand.</text>
    </g>
    <g transform="translate(184 1184)">
      <text x="0" y="0" fill="#f0e8dc" font-family="'Courier New', monospace" font-size="27">ART DIRECTION</text>
      <line x1="252" y1="-8" x2="332" y2="-8" stroke="#caa15f" stroke-width="2"/>
      <text x="366" y="0" fill="#f0e8dc" font-family="'Courier New', monospace" font-size="27">PRODUCTS + SPACES</text>
      <line x1="704" y1="-8" x2="784" y2="-8" stroke="#caa15f" stroke-width="2"/>
      <text x="818" y="0" fill="#f0e8dc" font-family="'Courier New', monospace" font-size="27">CAMPAIGN IMAGERY</text>
    </g>
    <text x="184" y="1268" fill="#cfc6b9" font-family="Arial, Helvetica, sans-serif" font-size="31">Original visual assets—directed, photographed, and launch-ready.</text>
    <text transform="translate(2468 1010) rotate(-90)" fill="#d3a45f" font-family="'Courier New', monospace" font-size="22" letter-spacing="7">VELARI CREATIVE STUDIO</text>
  `);
}

function portalsOverlay() {
  return svgBuffer(`
    ${defs()}
    <rect width="1320" height="1440" fill="url(#blackLeft)"/>
    <g transform="translate(165 135)" filter="url(#shadow)">
      <rect x="-36" y="-64" width="950" height="520" rx="42" fill="#090909" fill-opacity="0.68" stroke="#d5b071" stroke-opacity="0.35"/>
      <text x="0" y="0" fill="#d3aa68" font-family="'Avenir Next', Arial, sans-serif" font-size="25" font-weight="700" letter-spacing="6">04 / PORTALS + ORDERING</text>
      <text x="0" y="108" fill="#f5f0e8" font-family="'Avenir Next', Arial, sans-serif" font-size="75" font-weight="600">Make it effortless</text>
      <text x="0" y="194" fill="#f5f0e8" font-family="'Avenir Next', Arial, sans-serif" font-size="75" font-weight="300">to book, buy,</text>
      <text x="0" y="280" fill="#f5f0e8" font-family="'Avenir Next', Arial, sans-serif" font-size="75" font-weight="300">and come back.</text>
      <text x="0" y="363" fill="#d7d0c7" font-family="'Avenir Next', Arial, sans-serif" font-size="29">Customer tools that feel like part of the site.</text>
    </g>
    ${pill(168, 1154, 228, 'CLIENT PORTAL', { fill: '#efe6d8', color: '#111', stroke: '#efe6d8', opacity: 0.96 })}
    ${pill(416, 1154, 240, 'BOOK + PAY')}
    ${pill(676, 1154, 228, 'MEMBERSHIPS')}
    ${pill(924, 1154, 246, 'DIRECT ORDERING')}
  `);
}

function aiOverlay() {
  return svgBuffer(`
    ${defs()}
    <rect width="1510" height="440" fill="url(#blackLeft)"/>
    <g transform="translate(164 112)" filter="url(#shadow)">
      <text x="0" y="0" fill="#cea45e" font-family="'Courier New', monospace" font-size="26" letter-spacing="6">05 / AI INTAKE + RECEPTION</text>
      <text x="0" y="110" fill="#f5efe7" font-family="'Helvetica Neue', Arial, sans-serif" font-size="79" font-weight="300">Every inquiry answered.</text>
      <text x="0" y="200" fill="#f5efe7" font-family="'Helvetica Neue', Arial, sans-serif" font-size="79" font-weight="700">Every handoff organized.</text>
    </g>
    <g transform="translate(170 1154)">
      <rect width="1330" height="128" rx="28" fill="url(#ivoryGlass)" stroke="#eee2d0" stroke-opacity="0.34"/>
      <circle cx="54" cy="64" r="13" fill="#cfa257"/>
      <text x="88" y="54" fill="#f1e9de" font-family="'Courier New', monospace" font-size="24" font-weight="700">WEBSITE ASSISTANT</text>
      <text x="88" y="87" fill="#cfc7bc" font-family="Arial, Helvetica, sans-serif" font-size="23">approved answers + detail collection</text>
      <line x1="455" y1="30" x2="455" y2="98" stroke="#eee2d0" stroke-opacity="0.25"/>
      <text x="500" y="54" fill="#f1e9de" font-family="'Courier New', monospace" font-size="24" font-weight="700">AI PHONE RECEPTION</text>
      <text x="500" y="87" fill="#cfc7bc" font-family="Arial, Helvetica, sans-serif" font-size="23">calls answered + appointments captured</text>
      <line x1="950" y1="30" x2="950" y2="98" stroke="#eee2d0" stroke-opacity="0.25"/>
      <text x="995" y="54" fill="#f1e9de" font-family="'Courier New', monospace" font-size="24" font-weight="700">HUMAN HANDOFF</text>
      <text x="995" y="87" fill="#cfc7bc" font-family="Arial, Helvetica, sans-serif" font-size="23">qualified, summarized, scheduled</text>
    </g>
  `);
}

function automationOverlay() {
  return svgBuffer(`
    ${defs()}
    <rect width="1600" height="460" fill="url(#blackLeft)"/>
    <rect y="1060" width="2560" height="380" fill="url(#blackBottom)"/>
    <g transform="translate(150 105)" filter="url(#shadow)">
      <text x="0" y="0" fill="#c99e59" font-family="'Courier New', monospace" font-size="25" letter-spacing="7">06 / AUTOMATION + INTEGRATIONS</text>
      <text x="0" y="116" fill="#f5efe7" font-family="'Arial Narrow', 'Helvetica Neue', Arial, sans-serif" font-size="93" font-weight="800" letter-spacing="-2">CONNECT THE WORK</text>
      <text x="0" y="210" fill="#f5efe7" font-family="'Arial Narrow', 'Helvetica Neue', Arial, sans-serif" font-size="93" font-weight="300" letter-spacing="-2">YOU ALREADY DO.</text>
    </g>
    <g transform="translate(150 1185)">
      <text x="0" y="0" fill="#f3ece1" font-family="'Courier New', monospace" font-size="27">FORM</text>
      <text x="128" y="0" fill="#c99e59" font-family="Arial, sans-serif" font-size="34">→</text>
      <text x="190" y="0" fill="#f3ece1" font-family="'Courier New', monospace" font-size="27">CRM</text>
      <text x="302" y="0" fill="#c99e59" font-family="Arial, sans-serif" font-size="34">→</text>
      <text x="364" y="0" fill="#f3ece1" font-family="'Courier New', monospace" font-size="27">CALENDAR</text>
      <text x="574" y="0" fill="#c99e59" font-family="Arial, sans-serif" font-size="34">→</text>
      <text x="636" y="0" fill="#f3ece1" font-family="'Courier New', monospace" font-size="27">PAYMENT</text>
      <text x="820" y="0" fill="#c99e59" font-family="Arial, sans-serif" font-size="34">→</text>
      <text x="882" y="0" fill="#f3ece1" font-family="'Courier New', monospace" font-size="27">FOLLOW-UP</text>
    </g>
    <text x="150" y="1276" fill="#d3cbc0" font-family="Arial, Helvetica, sans-serif" font-size="31">Cleaner connections between the tools your business already trusts.</text>
  `);
}

function portalTabletSvg() {
  return svgBuffer(`
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f7f2e9"/>
        <stop offset="1" stop-color="#e8dfd1"/>
      </linearGradient>
    </defs>
    <rect width="470" height="610" rx="34" fill="url(#bg)"/>
    <text x="34" y="48" fill="#171717" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="3">MEMBER PORTAL</text>
    <rect x="32" y="76" width="406" height="118" rx="24" fill="#171717"/>
    <text x="56" y="111" fill="#cfa45f" font-family="Arial, sans-serif" font-size="14" font-weight="700" letter-spacing="2">NEXT RESERVATION</text>
    <text x="56" y="153" fill="#f4efe7" font-family="Georgia, serif" font-size="31">Thursday · 7:30 PM</text>
    <circle cx="394" cy="135" r="20" fill="#cfa45f"/>
    <path d="M385 135h18m-7-7 7 7-7 7" fill="none" stroke="#171717" stroke-width="3"/>
    <rect x="32" y="218" width="194" height="148" rx="22" fill="#fff" stroke="#d6c9b6"/>
    <text x="52" y="253" fill="#766b5d" font-family="Arial, sans-serif" font-size="13" letter-spacing="2">MEMBERSHIP</text>
    <text x="52" y="304" fill="#171717" font-family="Georgia, serif" font-size="32">Active</text>
    <text x="52" y="338" fill="#8a7c69" font-family="Arial, sans-serif" font-size="16">Renews Aug 18</text>
    <rect x="244" y="218" width="194" height="148" rx="22" fill="#cfa45f"/>
    <text x="264" y="253" fill="#302310" font-family="Arial, sans-serif" font-size="13" letter-spacing="2">ACCOUNT CREDIT</text>
    <text x="264" y="310" fill="#17120c" font-family="Georgia, serif" font-size="40">$180</text>
    <rect x="32" y="390" width="406" height="82" rx="22" fill="#fff" stroke="#d6c9b6"/>
    <circle cx="70" cy="431" r="18" fill="#171717"/>
    <path d="M62 431h16m-8-8v16" stroke="#f3eadf" stroke-width="2"/>
    <text x="104" y="425" fill="#171717" font-family="Arial, sans-serif" font-size="18" font-weight="700">Book a service</text>
    <text x="104" y="450" fill="#887b6b" font-family="Arial, sans-serif" font-size="14">Choose a date and time</text>
    <rect x="32" y="494" width="196" height="76" rx="38" fill="#171717"/>
    <text x="130" y="541" text-anchor="middle" fill="#f4efe7" font-family="Arial, sans-serif" font-size="17" font-weight="700">ORDER AGAIN</text>
    <rect x="244" y="494" width="194" height="76" rx="38" fill="none" stroke="#171717"/>
    <text x="341" y="541" text-anchor="middle" fill="#171717" font-family="Arial, sans-serif" font-size="17" font-weight="700">PAYMENTS</text>
  `, 470, 610);
}

function portalPhoneSvg() {
  return svgBuffer(`
    <rect width="230" height="480" rx="30" fill="#f6f0e6"/>
    <text x="24" y="46" fill="#171717" font-family="Arial, sans-serif" font-size="15" font-weight="700" letter-spacing="2">YOUR ORDER</text>
    <rect x="22" y="72" width="186" height="152" rx="22" fill="#171717"/>
    <circle cx="115" cy="133" r="36" fill="#cfa45f"/>
    <path d="M93 133h44m-22-22v44" stroke="#171717" stroke-width="4"/>
    <text x="115" y="196" text-anchor="middle" fill="#f5eee4" font-family="Arial, sans-serif" font-size="15">Ready for pickup</text>
    <text x="24" y="264" fill="#887a69" font-family="Arial, sans-serif" font-size="13">2 ITEMS</text>
    <text x="24" y="296" fill="#171717" font-family="Georgia, serif" font-size="25">Dinner package</text>
    <line x1="24" y1="320" x2="206" y2="320" stroke="#d3c4b0"/>
    <text x="24" y="356" fill="#887a69" font-family="Arial, sans-serif" font-size="13">TOTAL</text>
    <text x="24" y="392" fill="#171717" font-family="Georgia, serif" font-size="32">$86.00</text>
    <rect x="22" y="416" width="186" height="46" rx="23" fill="#cfa45f"/>
    <text x="115" y="445" text-anchor="middle" fill="#17120c" font-family="Arial, sans-serif" font-size="14" font-weight="700">VIEW DETAILS</text>
  `, 230, 480);
}

function aiVoiceSvg() {
  return svgBuffer(`
    <rect width="390" height="470" rx="34" fill="#f2ede4"/>
    <text x="30" y="48" fill="#171717" font-family="'Courier New', monospace" font-size="16" font-weight="700" letter-spacing="2">LIVE WEBSITE INTAKE</text>
    <text x="30" y="83" fill="#7f7465" font-family="Arial, sans-serif" font-size="15">Visitor is describing a project</text>
    <path d="M30 166 C60 118, 83 214, 112 166 S165 118, 193 166 S248 214, 278 166 S330 118, 360 166" fill="none" stroke="#c79a53" stroke-width="6"/>
    <circle cx="30" cy="166" r="6" fill="#c79a53"/>
    <circle cx="360" cy="166" r="6" fill="#c79a53"/>
    <rect x="28" y="232" width="334" height="70" rx="18" fill="#171717"/>
    <text x="50" y="260" fill="#cda45f" font-family="Arial, sans-serif" font-size="13" letter-spacing="2">NEED</text>
    <text x="50" y="285" fill="#f3ede4" font-family="Arial, sans-serif" font-size="17">Website + intake flow</text>
    <rect x="28" y="320" width="160" height="104" rx="18" fill="#fff"/>
    <text x="48" y="350" fill="#837767" font-family="Arial, sans-serif" font-size="12" letter-spacing="2">TIMELINE</text>
    <text x="48" y="392" fill="#171717" font-family="Georgia, serif" font-size="28">4–6 weeks</text>
    <rect x="202" y="320" width="160" height="104" rx="18" fill="#cda45f"/>
    <text x="222" y="350" fill="#33240f" font-family="Arial, sans-serif" font-size="12" letter-spacing="2">STATUS</text>
    <text x="222" y="392" fill="#17120c" font-family="Georgia, serif" font-size="28">Qualified</text>
  `, 390, 470);
}

function aiPhoneSvg() {
  return svgBuffer(`
    <rect width="250" height="430" rx="38" fill="#f3ede3"/>
    <circle cx="125" cy="86" r="36" fill="#171717"/>
    <path d="M107 85c18-26 18 26 36 0" fill="none" stroke="#cda45f" stroke-width="5" stroke-linecap="round"/>
    <text x="125" y="148" text-anchor="middle" fill="#171717" font-family="'Courier New', monospace" font-size="15" font-weight="700">AI RECEPTION</text>
    <text x="125" y="180" text-anchor="middle" fill="#847767" font-family="Arial, sans-serif" font-size="14">Call answered · 00:42</text>
    <rect x="24" y="216" width="202" height="68" rx="18" fill="#fff"/>
    <text x="42" y="246" fill="#837767" font-family="Arial, sans-serif" font-size="12" letter-spacing="2">CALLER NEEDS</text>
    <text x="42" y="270" fill="#171717" font-family="Arial, sans-serif" font-size="15" font-weight="700">New website estimate</text>
    <rect x="24" y="302" width="202" height="68" rx="18" fill="#fff"/>
    <text x="42" y="332" fill="#837767" font-family="Arial, sans-serif" font-size="12" letter-spacing="2">NEXT STEP</text>
    <text x="42" y="356" fill="#171717" font-family="Arial, sans-serif" font-size="15" font-weight="700">Consultation booked</text>
    <circle cx="125" cy="400" r="15" fill="#cda45f"/>
  `, 250, 430);
}

function aiHandoffSvg() {
  return svgBuffer(`
    <rect width="390" height="470" rx="34" fill="#f2ede4"/>
    <text x="30" y="48" fill="#171717" font-family="'Courier New', monospace" font-size="16" font-weight="700" letter-spacing="2">HUMAN HANDOFF</text>
    <rect x="28" y="78" width="334" height="92" rx="20" fill="#171717"/>
    <circle cx="70" cy="124" r="24" fill="#cda45f"/>
    <text x="70" y="131" text-anchor="middle" fill="#17120c" font-family="Arial, sans-serif" font-size="16" font-weight="700">AM</text>
    <text x="110" y="116" fill="#f3ede4" font-family="Arial, sans-serif" font-size="18" font-weight="700">Alex Morgan</text>
    <text x="110" y="143" fill="#bdb4a7" font-family="Arial, sans-serif" font-size="14">Qualified website lead</text>
    <text x="30" y="216" fill="#7e7263" font-family="Arial, sans-serif" font-size="13" letter-spacing="2">PROJECT SUMMARY</text>
    <text x="30" y="252" fill="#171717" font-family="Georgia, serif" font-size="25">Brand refresh + website</text>
    <text x="30" y="286" fill="#171717" font-family="Georgia, serif" font-size="25">with customer intake</text>
    <line x1="30" y1="316" x2="360" y2="316" stroke="#cfc1ae"/>
    <text x="30" y="352" fill="#7e7263" font-family="Arial, sans-serif" font-size="13" letter-spacing="2">CONSULTATION</text>
    <text x="30" y="388" fill="#171717" font-family="Georgia, serif" font-size="27">Thursday · 11:30 AM</text>
    <rect x="28" y="412" width="334" height="42" rx="21" fill="#cda45f"/>
    <text x="195" y="439" text-anchor="middle" fill="#17120c" font-family="Arial, sans-serif" font-size="14" font-weight="700">SUMMARY SENT TO YOUR TEAM</text>
  `, 390, 470);
}

function automationPanelSvg(width, height, label, title, body, variant = 'default') {
  const visual =
    variant === 'calendar'
      ? `
        <g transform="translate(22 ${Math.max(86, height * 0.42)})">
          ${Array.from({ length: 12 }, (_, index) => {
            const col = index % 4;
            const row = Math.floor(index / 4);
            const active = index === 6;
            return `<rect x="${col * 38}" y="${row * 34}" width="26" height="22" rx="5" fill="${active ? '#c99e59' : '#ded7cc'}"/>`;
          }).join('')}
        </g>
      `
      : variant === 'payment'
        ? `
          <circle cx="${width / 2}" cy="${height * 0.58}" r="${Math.min(width, height) * 0.18}" fill="none" stroke="#c99e59" stroke-width="8"/>
          <path d="M${width / 2 - 28} ${height * 0.58}l18 18 40-44" fill="none" stroke="#171717" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
        `
        : variant === 'email'
          ? `
            <g transform="translate(30 ${height * 0.48})">
              <rect width="${width - 60}" height="${height * 0.26}" rx="16" fill="#ece6dc"/>
              <path d="M18 18l${(width - 96) / 2} ${(height * 0.26 - 36) / 2}L${width - 78} 18" fill="none" stroke="#c99e59" stroke-width="4"/>
            </g>
          `
          : variant === 'crm'
            ? `
              <g transform="translate(30 ${height * 0.43})">
                <rect width="${width - 60}" height="${height * 0.12}" rx="12" fill="#171717"/>
                <circle cx="28" cy="${height * 0.06}" r="13" fill="#c99e59"/>
                <rect x="58" y="${height * 0.038}" width="${width * 0.28}" height="8" rx="4" fill="#f4efe7"/>
                <rect x="58" y="${height * 0.075}" width="${width * 0.18}" height="7" rx="3.5" fill="#9d9488"/>
                <rect y="${height * 0.15}" width="${(width - 72) / 2}" height="${height * 0.17}" rx="14" fill="#eee8de"/>
                <rect x="${(width - 48) / 2}" y="${height * 0.15}" width="${(width - 72) / 2}" height="${height * 0.17}" rx="14" fill="#d7ad67"/>
              </g>
            `
            : `
              <g transform="translate(24 ${height * 0.5})">
                <rect width="${width - 48}" height="${height * 0.1}" rx="8" fill="#e4ddd2"/>
                <rect y="${height * 0.14}" width="${(width - 48) * 0.68}" height="${height * 0.1}" rx="8" fill="#e4ddd2"/>
                <circle cx="${width - 72}" cy="${height * 0.19}" r="15" fill="#c99e59"/>
              </g>
            `;

  return svgBuffer(`
    <rect width="${width}" height="${height}" rx="${Math.max(14, width * 0.045)}" fill="#f5f0e8"/>
    <circle cx="${width - 24}" cy="24" r="8" fill="#c99e59"/>
    <text x="22" y="30" fill="#8a7e6f" font-family="'Courier New', monospace" font-size="${Math.max(11, width * 0.042)}" font-weight="700" letter-spacing="1.5">${label}</text>
    <text x="22" y="${Math.max(62, height * 0.28)}" fill="#171717" font-family="Arial, Helvetica, sans-serif" font-size="${Math.max(16, width * 0.064)}" font-weight="700">${title}</text>
    <text x="22" y="${Math.max(82, height * 0.36)}" fill="#807466" font-family="Arial, Helvetica, sans-serif" font-size="${Math.max(10, width * 0.036)}">${body}</text>
    ${visual}
  `, width, height);
}

async function frameSpecificComposites(id) {
  if (id === '02') {
    const desktop = await roundedImage(
      path.join(conceptDir, 'northline-desktop-animos-v1.png'),
      885,
      602,
      10,
      { fit: 'contain', background: '#090d10' },
    );
    const mobile = await roundedImage(
      path.join(conceptDir, 'northline-mobile-full-v1.png'),
      280,
      560,
      22,
      { fit: 'cover', position: 'top' },
    );
    return [
      { input: desktop, left: 598, top: 461 },
      { input: mobile, left: 1641, top: 482 },
    ];
  }

  if (id === '04') {
    const tablet = await sharp(portalTabletSvg())
      .rotate(6, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    const phone = await sharp(portalPhoneSvg())
      .rotate(3, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    return [
      { input: tablet, left: 1300, top: 332 },
      { input: phone, left: 1608, top: 535 },
    ];
  }

  if (id === '05') {
    return [
      { input: aiVoiceSvg(), left: 510, top: 500 },
      { input: aiPhoneSvg(), left: 1210, top: 510 },
      { input: aiHandoffSvg(), left: 1660, top: 500 },
    ];
  }

  if (id === '06') {
    return [
      {
        input: automationPanelSvg(168, 198, '01', 'FORM', 'Inquiry captured'),
        left: 262,
        top: 517,
      },
      {
        input: automationPanelSvg(222, 232, '02', 'CALENDAR', 'Time reserved', 'calendar'),
        left: 497,
        top: 505,
      },
      {
        input: automationPanelSvg(300, 286, '03', 'PAYMENT', 'Confirmed', 'payment'),
        left: 805,
        top: 470,
      },
      {
        input: automationPanelSvg(402, 342, '04', 'FOLLOW-UP', 'Sent automatically', 'email'),
        left: 1229,
        top: 440,
      },
      {
        input: automationPanelSvg(560, 438, '05', 'CRM HANDOFF', 'One organized record', 'crm'),
        left: 1829,
        top: 370,
      },
    ];
  }

  return [];
}

function overlayFor(id) {
  return {
    '01': brandOverlay,
    '02': websitesOverlay,
    '03': photographyOverlay,
    '04': portalsOverlay,
    '05': aiOverlay,
    '06': automationOverlay,
  }[id]();
}

async function build() {
  await fs.mkdir(outputDir, { recursive: true });
  const built = [];

  for (const frame of frames) {
    const base = path.join(sourceDir, frame.source);
    const output = path.join(outputDir, frame.output);
    const composites = await frameSpecificComposites(frame.id);
    composites.push({ input: overlayFor(frame.id), blend: 'over' });

    await sharp(base)
      .resize(W, H, { fit: 'cover', position: 'centre' })
      .composite(composites)
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(output);

    built.push(output);
    console.log(path.relative(root, output));
  }

  const contactComposites = [
    {
      input: svgBuffer(`
        <rect width="2560" height="1440" fill="#090908"/>
        <text x="70" y="92" fill="#d1a45f" font-family="'Courier New', monospace" font-size="25" letter-spacing="7">VELARI / SERVICES ORBIT V2</text>
        <text x="70" y="156" fill="#f4efe7" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="700">Six distinct creative directions. One connected studio story.</text>
      `),
      left: 0,
      top: 0,
    },
  ];

  for (let index = 0; index < built.length; index += 1) {
    const thumb = await sharp(built[index]).resize(800, 450, { fit: 'cover' }).png().toBuffer();
    contactComposites.push({
      input: thumb,
      left: 40 + (index % 3) * 840,
      top: 220 + Math.floor(index / 3) * 520,
    });
  }

  await sharp({
    create: {
      width: 2560,
      height: 1440,
      channels: 4,
      background: '#090908',
    },
  })
    .composite(contactComposites)
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(outputDir, 'contact-sheet.png'));
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
