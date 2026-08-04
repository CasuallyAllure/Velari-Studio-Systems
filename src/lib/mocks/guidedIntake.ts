// Deterministic guided-intake engine. Speaks the exact same IntakeTurn
// contract as the live /api/intake endpoint so the chat UI never needs to
// know which one answered. Package-aware, with the same personality.
//
// Conversation principles (mirror knowledge.ts for the live assistant):
// - Open with the INDUSTRY, not a scoping question.
// - A beautiful website is the given; the conversation is about what it
//   should DO on top of that.
// - Chips speak plain customer language ("Online booking"), never internal
//   catalog jargon ("Booking workflow", "CMS").
// - We recommend a package from their answers — we never quiz them on tiers.

import type { IntakeContext, IntakeTurn } from '@/lib/types/intakeChat';
import { businessProfile } from '../../config/businessProfile';

type Step =
  | 'industry'
  | 'situation'
  | 'paidSystems'
  | 'extras'
  | 'timeline'
  | 'budget'
  | 'contact'
  | 'done';

const TIER_NAMES: Record<string, string> = {
  signature_landing: 'Signature Landing',
  business_platform: 'Business Platform',
  ai_integrated_platform: 'AI-Integrated Platform',
};

const INDUSTRY_CHIPS = [
  'Restaurant / café',
  'Salon / studio',
  'Gym / fitness',
  'Trades / home services',
  'Real estate / property',
  'Health / wellness',
  'Shop / online store',
  'Something else',
];

const INDUSTRY_QUESTION = 'What kind of business are we building for?';

const GREETINGS: Record<string, string> = {
  signature_landing: `Signature Landing — clean choice. One site that looks like a million and converts like it means it. ${INDUSTRY_QUESTION}`,
  business_platform: `Business Platform — good eye. That's the one most of our clients build on. ${INDUSTRY_QUESTION}`,
  ai_integrated_platform: `AI-Integrated Platform — you want the whole machine. Love it. ${INDUSTRY_QUESTION}`,
};

const DEFAULT_GREETING = `Hey — welcome to Velari. This'll be quick and painless, promise. ${INDUSTRY_QUESTION}`;

const SITUATION_CHIPS = ['Starting fresh', 'Upgrading an old site', 'Just exploring'];

/**
 * Industry intelligence: the services each industry typically pays for that
 * Velari can build into a site the business owns. The industry answer picks
 * which follow-up the visitor sees — this is where the intake gets smart.
 */
const NONE_SYSTEM = 'None of these yet';

const INDUSTRY_SYSTEMS: Record<string, { plural: string; options: string[] }> = {
  'restaurant / café': {
    plural: 'restaurants',
    options: [
      'Reservations (OpenTable, Resy…)',
      'Online ordering & delivery apps',
      'Gift cards',
      'Loyalty / rewards',
      'Catering inquiries',
      NONE_SYSTEM,
    ],
  },
  'gym / fitness': {
    plural: 'gyms and fitness studios',
    options: [
      'Class booking apps (Mindbody, ClassPass…)',
      'Memberships & recurring billing',
      'Class schedules & waitlists',
      'Personal training bookings',
      'Member check-in / member app',
      NONE_SYSTEM,
    ],
  },
  'salon / studio': {
    plural: 'salons and studios',
    options: [
      'Booking apps (StyleSeat, Vagaro…)',
      'Deposits & no-show protection',
      'Memberships / packages',
      'Selling products',
      'Client reminders',
      NONE_SYSTEM,
    ],
  },
  'trades / home services': {
    plural: 'service businesses',
    options: [
      'Lead sites (Angi, Thumbtack…)',
      'Quote requests & estimates',
      'Job scheduling / dispatch',
      'Invoices & payments',
      'Review collection',
      NONE_SYSTEM,
    ],
  },
  'real estate / property': {
    plural: 'property businesses',
    options: [
      'Listing platforms',
      'Tenant portal / rent collection',
      'Maintenance requests',
      'Tour & showing booking',
      'Owner statements',
      NONE_SYSTEM,
    ],
  },
  'health / wellness': {
    plural: 'practices',
    options: [
      'Appointment booking apps',
      'Intake forms & reminders',
      'Client portals',
      'Memberships / class packs',
      'After-hours phone answering',
      NONE_SYSTEM,
    ],
  },
  'shop / online store': {
    plural: 'shops',
    options: [
      'Marketplace fees (Etsy, Amazon…)',
      'Platform subscriptions (Shopify…)',
      'Abandoned cart recovery',
      'Loyalty / rewards',
      'Email & SMS follow-ups',
      NONE_SYSTEM,
    ],
  },
};

const GENERIC_SYSTEMS: { plural: string; options: string[] } = {
  plural: 'businesses like yours',
  options: [
    'Booking or scheduling tools',
    'Payments & invoicing tools',
    'Lead-generation platforms',
    'Marketing & follow-up tools',
    NONE_SYSTEM,
  ],
};

/** Paid systems that signal the AI tier (automation / follow-up work). */
const AI_SYSTEMS = [
  'After-hours phone answering',
  'Abandoned cart recovery',
  'Client reminders',
  'Email & SMS follow-ups',
  'Intake forms & reminders',
  'Marketing & follow-up tools',
];

// Plain-language extras. Booking/ordering live in the industry step now, so
// this list covers AI, accounts, brand, and content. "Just the website" lets
// people opt out gracefully (the multi-select confirm needs a selection).
const EXTRA_OPTIONS = [
  'AI that answers questions 24/7',
  'AI that captures leads & follows up',
  'Customer logins',
  'New logo or brand look',
  'Photos & visuals',
  'Easy-to-edit pages / blog',
  'Help writing the words',
  'Just the website, keep it clean',
];

const NONE_EXTRA = 'Just the website, keep it clean';

const AI_EXTRAS = ['AI that answers questions 24/7', 'AI that captures leads & follows up'];
const PLATFORM_EXTRAS = ['Customer logins'];

/**
 * Short lowercase restate of the visitor's words, max 6 words.
 * Strips leading first-person fillers ("I run a…", "we have the…") so the
 * echo reads like a noun phrase: "high-end dog grooming studio", not
 * "i run a high-end dog grooming".
 */
function shortRestate(text: string): string {
  const cleaned = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s'&/-]/gu, ' ')
    .replace(/^\s*(?:(?:i|we)(?:'m|'re|'ve)?|it's|its|hi|hey|hello)\s+/g, '')
    .replace(/^\s*(?:run|own|have|got|manage|operate|started|building)\s+/g, '')
    .replace(/^\s*(?:a|an|the|my|our)\s+/g, '')
    .trim();
  const words = cleaned.split(/\s+/).filter(Boolean).slice(0, 6);
  // Don't end on a dangling connector ("…studio in").
  while (
    words.length > 1 &&
    /^(?:in|at|of|on|for|with|and|to|the|a|an|my|our)$/.test(words[words.length - 1])
  ) {
    words.pop();
  }
  return words.join(' ');
}

export function createGuidedIntake(context?: IntakeContext) {
  const seededTierId =
    context?.packageId && TIER_NAMES[context.packageId] ? context.packageId : undefined;

  let step: Step = 'industry';
  const answers = {
    industry: '',
    industryEcho: '',
    situation: '',
    paidSystems: [] as string[],
    tierId: seededTierId ?? '',
    extras: [] as string[],
    timeline: '',
    budget: '',
    name: '',
    email: '',
  };

  function systemsForIndustry() {
    return INDUSTRY_SYSTEMS[answers.industry.toLowerCase()] ?? GENERIC_SYSTEMS;
  }

  function realPaidSystems(): string[] {
    return answers.paidSystems.filter((system) => system !== NONE_SYSTEM);
  }

  /** Recommend a tier from what they actually asked for — never a quiz. */
  function recommendTierId(): string {
    const paid = realPaidSystems();
    if (
      answers.extras.some((extra) => AI_EXTRAS.includes(extra)) ||
      paid.some((system) => AI_SYSTEMS.includes(system))
    ) {
      return 'ai_integrated_platform';
    }
    if (paid.length > 0 || answers.extras.some((extra) => PLATFORM_EXTRAS.includes(extra))) {
      return 'business_platform';
    }
    return 'signature_landing';
  }

  function recommendationLine(): string {
    const recId = recommendTierId();
    const paid = realPaidSystems();
    const tight = answers.budget === 'Under $1.5k';
    if (tight && recId !== 'signature_landing') {
      answers.tierId = 'signature_landing';
      return "Here's my honest read: start with the Signature Landing at $999 — it covers the beautiful site and the basics — and we phase the rest in as it starts paying for itself.";
    }
    answers.tierId = recId;
    if (recId === 'ai_integrated_platform') {
      return paid.some((system) => AI_SYSTEMS.includes(system))
        ? "Here's my honest read: you're already paying for things our AI-Integrated Platform does in-house — from $4,999, and it usually pays for itself."
        : "Here's my honest read: with AI in the mix, you're describing our AI-Integrated Platform — from $4,999, and it earns its keep.";
    }
    if (recId === 'business_platform') {
      return paid.length > 0
        ? "Here's my honest read: right now you're renting software you could own — that's exactly what the Business Platform replaces, from $2,999."
        : "Here's my honest read: that's real software working behind the site, which is our Business Platform — from $2,999.";
    }
    return "Here's my honest read: the Signature Landing at $999 is your move — one beautiful site, built to convert, no filler.";
  }

  function questionFor(current: Step): IntakeTurn {
    switch (current) {
      case 'industry':
        return {
          message: seededTierId ? GREETINGS[seededTierId] : DEFAULT_GREETING,
          quickReplies: INDUSTRY_CHIPS,
        };
      case 'situation':
        return {
          message: `Nice — ${answers.industryEcho}. And where are things today?`,
          quickReplies: SITUATION_CHIPS,
        };
      case 'paidSystems': {
        const systems = systemsForIndustry();
        return {
          message: `Good to know. Here's the thing — most ${systems.plural} are paying monthly for services we can build straight into a site you own. Any of these in your world?`,
          multiSelect: {
            options: systems.options,
            confirmLabel: 'Those are the ones',
          },
        };
      }
      case 'extras':
        return {
          message:
            "Noted. The beautiful website is a given here — that's just how we build. Want any of this working on top of it?",
          multiSelect: {
            options: EXTRA_OPTIONS,
            confirmLabel: "That's the list",
          },
        };
      case 'timeline':
        return {
          message: 'When would you love to be live?',
          quickReplies: ['ASAP', 'About a month', '1–3 months', 'No rush'],
        };
      case 'budget':
        return {
          message:
            'Rough comfort zone on budget? Nothing binding — it just helps me point you at the right starting point.',
          quickReplies: ['Under $1.5k', 'Around $3k', '$5k or more', 'Honestly, not sure'],
        };
      case 'contact': {
        const lead = seededTierId
          ? 'That rounds it out.'
          : recommendationLine();
        return {
          message: `${lead} Last thing — drop a name and the best email, and I'll put this in front of the team today.`,
        };
      }
      case 'done':
        return doneTurn();
    }
  }

  function doneTurn(): IntakeTurn {
    const realExtras = answers.extras.filter((extra) => extra !== NONE_EXTRA);
    const paid = realPaidSystems();
    const n = realExtras.length;
    const pkg = TIER_NAMES[answers.tierId] || 'the scope we shaped';
    const who = answers.industryEcho || 'the business';
    const extrasPhrase = n === 0 ? 'kept clean and simple' : `${n} extra${n === 1 ? '' : 's'} on top`;
    const replacePhrase =
      paid.length > 0
        ? `, plus notes on the ${paid.length} service${paid.length === 1 ? '' : 's'} you're paying for that we can fold into a site you own`
        : '';
    const timeline = answers.timeline || 'flexible';
    const notes = [
      [answers.industry, answers.situation].filter(Boolean).join(' · '),
      paid.length > 0 ? `Currently paying for: ${paid.join(', ')}` : '',
    ]
      .filter(Boolean)
      .join(' — ');
    return {
      message: `Perfect — here's what I'm sending in: ${pkg} for ${who}, ${extrasPhrase}${replacePhrase}, ${timeline.toLowerCase()} timeline. We'll come back with a considered scope, usually within one business day. Want to add anything, the Project Questionnaire tab is right there.${businessProfile.nextSteps.bookingUrl ? ` If you'd like, you can also grab a 15-minute call now: ${businessProfile.nextSteps.bookingUrl}` : ''}`,
      done: true,
      summary: {
        package: TIER_NAMES[answers.tierId] || undefined,
        addOns: realExtras,
        timeline: answers.timeline || undefined,
        budgetComfort: answers.budget || undefined,
        notes: notes || undefined,
        contact: {
          name: answers.name || undefined,
          email: answers.email || undefined,
        },
      },
    };
  }

  return {
    start(): IntakeTurn {
      return questionFor('industry');
    },

    next(userText: string): IntakeTurn {
      const text = userText.trim();

      // Visitor asked a question mid-flow instead of answering — one short
      // helpful line, then re-ask the current step's question with its chips.
      if (text.includes('?') && step !== 'done') {
        const reAsk = questionFor(step);
        return {
          ...reAsk,
          message: `Fair question — prices are on the packages panel above, and everything's a starting range we confirm together on a discovery call. Back to it: ${reAsk.message}`,
        };
      }

      switch (step) {
        case 'industry': {
          // "Something else" → invite them to say it in their own words.
          if (text.toLowerCase() === 'something else') {
            return { message: 'Go for it — what kind of business is it?' };
          }
          answers.industry = text;
          answers.industryEcho = shortRestate(text) || 'your world';
          step = 'situation';
          return questionFor('situation');
        }
        case 'situation': {
          answers.situation = text;
          step = 'paidSystems';
          return questionFor('paidSystems');
        }
        case 'paidSystems': {
          const systems = systemsForIndustry();
          // Split on '·' (the multi-select join) — option labels contain commas.
          answers.paidSystems = text
            .split('·')
            .map((part) => part.trim())
            .filter(Boolean)
            .map((part) => {
              const match = systems.options.find(
                (option) => option.toLowerCase() === part.toLowerCase(),
              );
              return match ?? part;
            });
          step = 'extras';
          return questionFor('extras');
        }
        case 'extras': {
          // Split on '·' (the multi-select join) — option labels contain commas.
          answers.extras = text
            .split('·')
            .map((part) => part.trim())
            .filter(Boolean)
            .map((part) => {
              const match = EXTRA_OPTIONS.find(
                (option) => option.toLowerCase() === part.toLowerCase(),
              );
              return match ?? part;
            });
          step = 'timeline';
          return questionFor('timeline');
        }
        case 'timeline': {
          answers.timeline = text;
          step = 'budget';
          return questionFor('budget');
        }
        case 'budget': {
          answers.budget = text;
          step = 'contact';
          return questionFor('contact');
        }
        case 'contact': {
          // Light parse: first email-looking token → email, remainder → name.
          const emailMatch = text.match(/\S+@\S+\.\S+/);
          answers.email = emailMatch ? emailMatch[0].replace(/[,;]+$/, '') : '';
          answers.name = text
            .replace(emailMatch ? emailMatch[0] : '', '')
            .replace(/[,;]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          step = 'done';
          return doneTurn();
        }
        case 'done':
          return doneTurn();
      }
    },
  };
}

export type GuidedIntake = ReturnType<typeof createGuidedIntake>;
