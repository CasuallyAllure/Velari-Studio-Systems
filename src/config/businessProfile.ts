// Business knowledge for the Vela intake assistant.
// NOTE: relative imports only (no `@` alias) — this module is read by
// server/intake/knowledge.ts, which is compiled by esbuild via vite.config and
// by Vercel's api builder, where the alias does not resolve. Keep it pure data:
// no server imports, no secrets, safe to ship to the client.
//
// TODO_RAY fields are intentionally empty. The prompt builder MUST omit any
// empty string / empty array so placeholder text can never reach a visitor.

export const businessProfile = {
  positioning: {
    studio: 'Velari Systems',
    region: 'San Francisco Bay Area',
    tagline: 'Cinematic digital worlds built to convert',
    summary:
      'A boutique Bay Area studio building premium, app-like websites and the software behind them — brand, photography, portals, ordering, AI intake, and automation.',
    ownershipAngle:
      'Most businesses rent their operations from monthly SaaS — booking apps, delivery platforms, membership software. Velari builds those same services into a site the client owns outright.',
    engagementModel:
      'Inquiry-based. Every estimate is a budgetary starting range, confirmed together on a short discovery call. No checkout, no payment collected on the site, ever.',
    differentiators: [
      'A beautiful, cinematic site is the baseline, not the upsell — the conversation is about what works on top of it.',
      'Design, build, brand, and media come from one studio, so nothing gets handed between vendors.',
      'The software is the client’s: their code, their data, their domain, no per-seat or per-booking fees to Velari.',
      'Original photography and brand work instead of stock and templates.',
    ],
  },

  idealClients: {
    profile:
      'Owner-operated Bay Area businesses whose website is doing real work — bringing in bookings, orders, quotes, or members — not just sitting there.',
    industries: [
      'Restaurant / café',
      'Salon / studio',
      'Gym / fitness',
      'Trades / home services',
      'Real estate / property',
      'Health / wellness',
      'Shop / online store',
    ],
    budgetComfort:
      'Best fit at the Business Platform tier ($2,999+) and up, where the site replaces monthly software rather than just presenting the business.',
    belowBudget:
      'If their budget is tighter than what they described, start with the Signature Landing ($999) and phase the platform work in later — same foundation, built to grow.',
    // TODO_RAY: service-area specifics (cities/counties covered, remote clients, on-site availability).
    serviceArea: '',
  },

  faqs: [
    {
      question: 'How long does it take?',
      answer:
        'Typically 2–8 weeks: 2–3 for a Signature Landing, 4–6 for a Business Platform, 5–8 when an AI layer is included.',
    },
    {
      question: 'Do I own the site?',
      answer:
        'Yes — you own the site, the code, the content, and the domain, and nothing here charges you per booking or per user.',
    },
    {
      question: 'What does the process look like?',
      answer:
        'Four steps: discovery, direction, build, launch — with clear review points and you in the room at each one.',
    },
    {
      question: 'What happens after I finish this conversation?',
      answer:
        'We come back with a considered scope, usually within one business day, then confirm the details together on a short discovery call.',
    },
    {
      question: 'Who handles hosting and updates after launch?',
      answer:
        'Optional monthly care plans cover hosting, SSL and domain, monitoring, backups, priority support, and a set block of monthly changes — Signature Care $79, Platform Care $149, AI Platform Care $249.',
    },
    {
      question: 'Who actually builds it?',
      answer:
        'The same small studio that scopes it — no subcontracting, no handoff to a junior team after the sale.',
    },
    {
      question: 'Is any of this locked in today?',
      answer:
        'No — nothing is binding and no payment is taken on the site; engagements start with a 25% deposit only after the scope is agreed.',
    },
  ],

  objections: [
    {
      objection: 'Why not just use Squarespace or Wix?',
      response:
        'Templates are great until the business needs something they don’t do — bookings, accounts, ordering, automation — which is exactly where Velari starts.',
    },
    {
      objection: 'Why not hire a freelancer?',
      response:
        'Velari is the design, the build, the brand, and the media in one studio, with a care plan behind it, so the site keeps working after launch day.',
    },
    {
      objection: 'Can I see work you’ve done?',
      response:
        'Yes — the site shows nine industry website concepts you can open and click through, and we can walk through anything relevant on the call.',
    },
    {
      objection: 'Is this site written by AI?',
      response:
        'I’m Velari’s intake assistant, and the design, code, and words are the studio’s — AI is something we build into client sites, not something we hide behind.',
    },
  ],

  nextSteps: {
    steps: [
      'A tight recap of the scope we shaped together, so you can see what we heard.',
      'A considered scope and budgetary range back from the studio, usually within one business day.',
      'A short discovery call to confirm the details before anything is agreed.',
    ],
    responseTime: 'usually within one business day',
    alternative:
      'The Project Questionnaire tab is there if they want to add detail in their own words.',
    bookingUrl: 'https://calendly.com/velariss-info/intro-discovery',
  },

  // TODO_RAY: notable clients, case studies, and any social proof Vela may cite.
  // Leave empty until each one is approved for public use.
  socialProof: {
    notableClients: [] as string[],
    caseStudies: [] as Array<{ client: string; industry: string; outcome: string }>,
    testimonials: [] as Array<{ quote: string; attribution: string }>,
  },

  // TODO_RAY: founder framing and years in operation.
  founder: {
    name: '',
    framing: '',
    yearsInOperation: '',
  },
} as const;

export type BusinessProfile = typeof businessProfile;
