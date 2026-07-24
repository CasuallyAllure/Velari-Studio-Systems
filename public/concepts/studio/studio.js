const scenes = {
  dental: {
    brand: 'Arc Dental Atelier',
    mark: 'A',
    eyebrow: 'Private dentistry · Union Square',
    title: 'Exceptional care,',
    emphasis: 'beautifully considered.',
    body: 'Advanced restorative and cosmetic dentistry in a private studio designed around comfort, precision, and time.',
    primary: 'Request a consultation',
    secondary: 'Tour the atelier',
    section: 'Concierge patient care',
    sectionNote: 'Private practice · Today',
    image: '/assets/showcase/concepts/dental/arc-dental-office-v2.png',
    stats: [['4.9', 'Patient rating'], ['48m', 'Private appointment'], ['98%', 'Treatment acceptance']],
    cards: [
      ['Patient profile', 'Ready', 'Medical history complete', 'Identity verified', 'Preferences noted'],
      ['Consultation', '11:30', 'Dr. Lin · Suite 02', 'Private arrival', 'Confirmed'],
      ['Coverage', 'Verified', 'Benefits reviewed', 'Estimate prepared', 'Concierge follow-up'],
      ['Treatment preview', '$6,480', 'Three proposed phases', 'Financing available', 'Review ready'],
    ],
  },
  restaurant: {
    brand: 'Ember & Grain',
    mark: 'E',
    eyebrow: 'Seasonal cooking · Hayes Valley',
    title: 'Tonight, paced',
    emphasis: 'beautifully.',
    body: 'A neighborhood dining room shaped by the farms, coast, and people of Northern California.',
    primary: 'Reserve a table',
    secondary: 'View tonight’s menu',
    section: 'Tonight’s service',
    sectionNote: 'Friday · 5:00–10:30',
    image: '/assets/showcase/concepts/restaurant/embers-hero-v1.png',
    stats: [['46', 'Covers seated'], ['18', 'Arriving next'], ['4.8', 'Guest score']],
    cards: [
      ['Reservations', '7:30', '2 guests · Window', 'Anniversary noted', 'Confirmed'],
      ['Dining room', '82%', '14 of 17 tables', 'Next turn 8:15', 'On pace'],
      ['Kitchen handoff', '04', 'Orders firing', 'No allergy conflicts', 'Avg. 14m'],
      ['Guest profile', '6 visits', 'Prefers bar seating', 'Pinot noir', 'Welcome back'],
    ],
  },
  trades: {
    brand: 'Copperline',
    mark: 'C',
    eyebrow: 'Plumbing · Electrical · HVAC',
    title: 'Every call gets',
    emphasis: 'a clear next step.',
    body: 'Fast answers, prepared technicians, and service updates that never leave the customer guessing.',
    primary: 'Get a fast estimate',
    secondary: 'Emergency service',
    section: 'Field operations',
    sectionNote: 'Bay Area · Live dispatch',
    image: '/assets/showcase/concepts/trades/copperline-hero-v1.png',
    stats: [['22m', 'First response'], ['4.9', 'Local rating'], ['24/7', 'Dispatch']],
    cards: [
      ['AI lead intake', 'Qualified', 'Water heater issue', 'Photos received', 'Urgency: today'],
      ['Dispatch', '10:30', 'Jordan R. · Van 04', '12 minutes away', 'Customer notified'],
      ['Estimate', '$860', 'Parts and labor', 'Digital approval', 'Awaiting signature'],
      ['Payment', 'Ready', 'Invoice CL-2048', 'Card or ACH', 'Receipt automated'],
    ],
  },
  industrial: {
    brand: 'Forgeworks',
    mark: 'F',
    eyebrow: 'Precision machining · Since 1987',
    title: 'The floor tells you',
    emphasis: 'what comes next.',
    body: 'Machining capacity, quality records, and delivery confidence—visible from quote to packout.',
    primary: 'Start an RFQ',
    secondary: 'View capabilities',
    section: 'Production control',
    sectionNote: 'Plant 01 · Shift B',
    image: '/assets/showcase/concepts/industrial/forgeworks-hero-v1.png',
    stats: [['99.2%', 'First-pass yield'], ['14', 'Cells active'], ['2.1d', 'RFQ response']],
    cards: [
      ['RFQ 3186', 'Quoted', '7075 aluminum', '1,200 units', 'Delivery Sep 18'],
      ['Cell M-04', 'Running', 'Spindle load 71%', 'Cycle 04:18', 'On target'],
      ['Quality', '99.2%', '48 checks passed', 'Cpk 1.67', 'No holds'],
      ['Packout', 'Thu', '840 units ready', 'Dock 03', 'Carrier booked'],
    ],
  },
  logistics: {
    brand: 'Northbound Freight',
    mark: 'N',
    eyebrow: 'Western regional freight · Oakland',
    title: 'Freight,',
    emphasis: 'without blind spots.',
    body: 'Regional capacity, live shipment visibility, and experienced dispatch—built for the loads that cannot drift.',
    primary: 'Track a load',
    secondary: 'Request capacity',
    section: 'Live operations',
    sectionNote: 'West network · 38 active loads',
    image: '/assets/showcase/concepts/logistics/northbound-freight-v2.png',
    stats: [['96%', 'On time'], ['38', 'Active loads'], ['11m', 'Alert response']],
    cards: [
      ['Load NB-2049', 'In transit', 'Oakland → Reno', 'ETA 4:42 PM', 'Weather clear'],
      ['Driver', 'M. Torres', 'Vehicle 214', 'Hours compliant', 'Contact ready'],
      ['Exception', 'Resolved', 'Dock reassigned', 'Customer updated', 'Delay: 12m'],
      ['Proof of delivery', 'Signed', '2 pallets · 1,840 lb', 'Photo attached', '4:36 PM'],
    ],
  },
  retail: {
    brand: 'Alder & Form',
    mark: 'A',
    eyebrow: 'Permanent collection · Edition 04',
    title: 'Fewer pieces.',
    emphasis: 'More ways to live.',
    body: 'Considered essentials in natural fibers, made in small runs and designed to stay in rotation.',
    primary: 'Shop the collection',
    secondary: 'Our materials',
    section: 'Commerce flow',
    sectionNote: 'Live store · 126 orders today',
    image: '/assets/showcase/concepts/retail/atelier-hero-v1.png',
    stats: [['2.8%', 'Conversion'], ['126', 'Orders today'], ['41%', 'Returning']],
    cards: [
      ['Your bag', '$465', 'Camel coat · Size 4', 'Merino knit · S', 'Express checkout'],
      ['Inventory', '12 left', 'Camel coat · Size 4', 'Restock Oct 02', 'Notify list: 38'],
      ['Fulfillment', 'Picking', 'Order AF-2841', 'Ships today', 'Carbon-neutral'],
      ['Client profile', 'Returning', '3 prior orders', 'Prefers neutrals', 'Early access'],
    ],
  },
  research: {
    brand: 'Vanta Research',
    mark: 'V',
    eyebrow: 'Bay Area research supply',
    title: 'Research-grade access,',
    emphasis: 'without the friction.',
    body: 'Open product dossiers, verified inventory, member terms, and fast regional fulfillment for qualified research teams.',
    primary: 'Begin inquiry',
    secondary: 'View research',
    section: 'Member operations',
    sectionNote: 'Research use only · Live inventory',
    image: '/assets/showcase/concepts/research-labs/vanta-labs-hero-v1.png',
    stats: [['24h', 'Regional delivery'], ['96%', 'In-stock rate'], ['38', 'Open dossiers']],
    cards: [
      ['Member access', 'Verified', 'Research institution', 'Terms on file', 'Ordering enabled'],
      ['Inventory', 'In stock', 'Lot VSR-2407', 'Dossier attached', 'Cold-chain ready'],
      ['Order record', '$1,840', 'Invoice V-3184', 'Net 15 terms', 'Packing now'],
      ['Research dossier', 'Open', 'Mechanism summary', 'Published references', 'PDF available'],
    ],
  },
  construction: {
    brand: 'Groundline',
    mark: 'G',
    eyebrow: 'Commercial builders · San Francisco',
    title: 'Every phase,',
    emphasis: 'accounted for.',
    body: 'A clear project experience for owners, field teams, and trade partners—from preconstruction through closeout.',
    primary: 'Start a project',
    secondary: 'View our work',
    section: 'Project control',
    sectionNote: 'Pier 70 · Week 24 of 38',
    image: '/assets/showcase/concepts/construction/groundline-hero-v1.png',
    stats: [['84%', 'Schedule complete'], ['12', 'Trades active'], ['0', 'Safety incidents']],
    cards: [
      ['Master schedule', 'On plan', 'Steel complete', 'Envelope: 68%', 'Turnover Nov 14'],
      ['RFI 048', 'Answered', 'Level 04 framing', 'Architect response', 'Field notified'],
      ['Change order', '$18.4k', 'CO-017 · Electrical', 'Owner review', 'Allowance tracked'],
      ['Pay application', 'Approved', 'Draw 06 · $428k', 'Lien waivers received', 'Release Friday'],
    ],
  },
};

const sceneKey = new URLSearchParams(window.location.search).get('scene') || 'dental';
const scene = scenes[sceneKey] || scenes.dental;
document.body.dataset.scene = sceneKey in scenes ? sceneKey : 'dental';
document.title = `${scene.brand} — Velari Concept`;

const renderCard = ([label, value, ...rows], index) => `
  <article class="system-card system-card--${index + 1}">
    <div class="card-head"><span>${label}</span><i>${index === 0 ? 'Live' : String(index + 1).padStart(2, '0')}</i></div>
    <strong>${value}</strong>
    <div class="card-rows">${rows.map((row, rowIndex) => `<p><span>${row}</span><b>${rowIndex === rows.length - 1 ? '↗' : '✓'}</b></p>`).join('')}</div>
    <div class="card-meter"><span style="width:${[68, 84, 58, 93][index]}%"></span></div>
  </article>
`;

const specialVisual = {
  research: '<div class="molecule" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><span></span></div>',
}[document.body.dataset.scene] || '';

document.querySelector('#concept').innerHTML = `
  <main class="concept">
    <header class="concept-header">
      <a class="concept-brand" href="#"><span>${scene.mark}</span><b>${scene.brand}</b></a>
      <nav><a href="#">Overview</a><a href="#">Services</a><a href="#">About</a></nav>
      <div class="header-utility"><a href="#">Sign in</a><a class="header-cta" href="#">${scene.primary}</a></div>
    </header>

    <div class="concept-stage">
      <section class="landing">
        ${scene.image ? `<img src="${scene.image}" alt="" />` : ''}
        <div class="landing-wash"></div>
        ${specialVisual}
        <div class="landing-copy">
          <p>${scene.eyebrow}</p>
          <h1>${scene.title}<em>${scene.emphasis}</em></h1>
          <div class="landing-bottom">
            <p>${scene.body}</p>
            <div class="landing-actions"><a href="#">${scene.primary} <span>↗</span></a><a href="#">${scene.secondary}</a></div>
          </div>
        </div>
        <div class="stat-row">${scene.stats.map(([value, label]) => `<span><b>${value}</b><small>${label}</small></span>`).join('')}</div>
      </section>

      <aside class="system">
        <div class="system-heading"><div><p>${scene.section}</p><h2>The system behind the experience.</h2></div><span>${scene.sectionNote}</span></div>
        <div class="system-grid">${scene.cards.map(renderCard).join('')}</div>
        <div class="system-footer"><span>Website</span><span>Intake</span><span>Operations</span><span>Reporting</span></div>
      </aside>
    </div>

    <nav class="mobile-dock" aria-label="Mobile concept navigation">
      <a href="#"><span>⌂</span> Home</a><a href="#"><span>◫</span> ${sceneKey === 'retail' ? 'Shop' : 'Start'}</a><a href="#"><span>◌</span> Account</a>
    </nav>
  </main>
`;
