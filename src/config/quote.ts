export type TierId = 'signature_landing' | 'business_platform' | 'ai_integrated_platform';
export type PricingMode = 'fixed' | 'starting_at' | 'quoted';
export type BillingCadence = 'one_time' | 'monthly' | 'yearly';

export interface QuoteCatalogItem {
  id: string;
  name: string;
  description: string;
  price: number | null;
  pricingMode: PricingMode;
  cadence: BillingCadence;
  unitLabel?: string;
  includedIn?: TierId[];
  category: 'website' | 'platform' | 'ai' | 'brand' | 'care' | 'support' | 'third_party';
}

export interface QuoteTier {
  id: TierId;
  name: string;
  price: number;
  pricingMode: Exclude<PricingMode, 'quoted'>;
  timeline: string;
  description: string;
  features: string[];
}

export interface QuoteSelection {
  tier: TierId;
  addOns?: Array<{ id: string; quantity?: number }>;
  carePlanId?: string;
}

export interface QuoteLineItem {
  id: string;
  name: string;
  amount: number;
  quantity: number;
  cadence: BillingCadence;
  pricingMode: PricingMode;
}

export interface QuoteEstimate {
  tier: QuoteTier;
  oneTimeLineItems: QuoteLineItem[];
  recurringLineItems: QuoteLineItem[];
  reviewRequired: QuoteCatalogItem[];
  oneTimeSubtotal: number;
  recurringMonthly: number;
  recurringYearly: number;
  estimatedDeposit: number;
  appliedCreativeBundleDiscount: number;
}

export const quoteConfig = {
  currency: 'USD',
  proposalValidityDays: 14,
  depositRate: 0.25,
  customDevelopmentHourlyRate: 85,
  creativeBundleDiscountRate: 0.1,
  canonicalContact: {
    companyName: 'Velari Systems',
    website: 'https://velariss.co',
    email: 'info@velariss.co',
    phone: '(415) 988-0944',
    timezone: 'Pacific Time',
  },
  tiers: [
    {
      id: 'signature_landing',
      name: 'Signature Landing',
      price: 999,
      pricingMode: 'fixed',
      timeline: '2-3 weeks',
      description: 'A premium, app-like website built to convert.',
      features: [
        'Up to 5 custom pages',
        'Responsive design for desktop, tablet, and mobile',
        'Lead capture with bot protection',
        'Booking, click-to-call, maps, and review integrations',
        'Search fundamentals and analytics',
        '30 days of post-launch support',
      ],
    },
    {
      id: 'business_platform',
      name: 'Business Platform',
      price: 2999,
      pricingMode: 'starting_at',
      timeline: '4-6 weeks',
      description: 'The Signature Landing plus real software behind the business.',
      features: [
        'Everything in Signature Landing',
        'Secure customer accounts and role-based access',
        'Admin dashboard and business records',
        'One primary workflow for bookings, orders, requests, or tickets',
        'Payment records, invoices, receipts, and exports',
        '30 days of post-launch support',
      ],
    },
    {
      id: 'ai_integrated_platform',
      name: 'AI-Integrated Platform',
      price: 4999,
      pricingMode: 'starting_at',
      timeline: '5-8 weeks',
      description: 'The Business Platform plus a trained AI layer and standard automation.',
      features: [
        'Everything in Business Platform',
        'AI website assistant trained on approved business material',
        'AI intake and lead qualification',
        'Lead routing, follow-ups, and standard reminders',
        'AI configuration, testing, and launch tuning',
        'Voice reception scoped separately',
      ],
    },
  ] satisfies QuoteTier[],
  items: [
    {
      id: 'extra_page', name: 'Additional custom page',
      description: 'A standard content page beyond the five included pages.',
      price: 125, pricingMode: 'fixed', cadence: 'one_time', unitLabel: 'page', category: 'website',
    },
    {
      id: 'cms_blog', name: 'CMS or blog setup',
      description: 'Editable publishing workflow and initial content model.',
      price: 349, pricingMode: 'fixed', cadence: 'one_time', category: 'website',
    },
    {
      id: 'content_migration', name: 'Content migration',
      description: 'Migration of up to 10 standard pages; larger migrations require review.',
      price: 250, pricingMode: 'starting_at', cadence: 'one_time', category: 'website',
    },
    {
      id: 'copywriting', name: 'Website copywriting',
      description: 'Structured conversion copy for one standard page.',
      price: 95, pricingMode: 'fixed', cadence: 'one_time', unitLabel: 'page', category: 'website',
    },
    {
      id: 'additional_language', name: 'Additional language setup',
      description: 'Technical multilingual setup per additional language; translation is supplied or quoted separately.',
      price: 399, pricingMode: 'starting_at', cadence: 'one_time', unitLabel: 'language', category: 'website',
    },
    {
      id: 'ecommerce', name: 'E-commerce or direct ordering',
      description: 'Product catalog, checkout, orders, and basic administration.',
      price: 999, pricingMode: 'starting_at', cadence: 'one_time', category: 'platform',
    },
    {
      id: 'payment_processor', name: 'Payment processor integration',
      description: 'Stripe, Square, or another approved merchant integration.',
      price: 125, pricingMode: 'fixed', cadence: 'one_time', unitLabel: 'merchant', category: 'platform',
    },
    {
      id: 'custom_integration', name: 'Custom third-party integration',
      description: 'A scoped connection to an approved external platform or API.',
      price: 350, pricingMode: 'starting_at', cadence: 'one_time', unitLabel: 'integration', category: 'platform',
    },
    {
      id: 'ai_website_assistant', name: 'AI website assistant',
      description: 'A trained assistant that answers approved customer questions.',
      price: 749, pricingMode: 'starting_at', cadence: 'one_time', category: 'ai',
      includedIn: ['ai_integrated_platform'],
    },
    {
      id: 'ai_intake', name: 'AI intake and lead qualification',
      description: 'Collects, qualifies, and routes inquiries automatically.',
      price: 999, pricingMode: 'starting_at', cadence: 'one_time', category: 'ai',
      includedIn: ['ai_integrated_platform'],
    },
    {
      id: 'ai_voice', name: 'AI voice reception',
      description: 'Answers calls, books appointments, and takes messages; scope and usage vary.',
      price: null, pricingMode: 'quoted', cadence: 'one_time', category: 'ai',
    },
    {
      id: 'custom_automation', name: 'Custom automation workflow',
      description: 'A workflow beyond the standard reminders and follow-ups included in the AI tier.',
      price: 500, pricingMode: 'starting_at', cadence: 'one_time', unitLabel: 'workflow', category: 'ai',
    },
    {
      id: 'logo_design', name: 'Logo design',
      description: 'Three concepts, two revision rounds, and final web, print, and vector formats.',
      price: 299, pricingMode: 'fixed', cadence: 'one_time', category: 'brand',
    },
    {
      id: 'brand_identity', name: 'Full brand identity kit',
      description: 'Logo, color palette, typography, and brand usage guide; replaces standalone logo design.',
      price: 499, pricingMode: 'fixed', cadence: 'one_time', category: 'brand',
    },
    {
      id: 'marketing_image', name: 'Custom marketing imagery',
      description: 'Cinematic, studio-quality branded imagery.',
      price: 49, pricingMode: 'starting_at', cadence: 'one_time', unitLabel: 'image', category: 'brand',
    },
    {
      id: 'social_launch_kit', name: 'Social media launch kit',
      description: 'Branded profile assets and nine post templates.',
      price: 249, pricingMode: 'fixed', cadence: 'one_time', category: 'brand',
    },
    {
      id: 'brand_video', name: 'Brand intro or anthem video',
      description: 'A cinematic short-form video for the site and social channels.',
      price: null, pricingMode: 'quoted', cadence: 'one_time', category: 'brand',
    },
    {
      id: 'signature_care', name: 'Signature Care',
      description: 'Hosting, SSL/domain management, monitoring, backups, priority support, and 30 minutes of monthly updates.',
      price: 79, pricingMode: 'fixed', cadence: 'monthly', category: 'care',
    },
    {
      id: 'platform_care', name: 'Platform Care',
      description: 'Signature Care plus database backups, uptime monitoring, and one hour of monthly changes.',
      price: 149, pricingMode: 'fixed', cadence: 'monthly', category: 'care',
    },
    {
      id: 'ai_platform_care', name: 'AI Platform Care',
      description: 'Platform Care plus AI monitoring, monthly tuning, and 1.5 hours of monthly changes.',
      price: 249, pricingMode: 'fixed', cadence: 'monthly', category: 'care',
    },
    {
      id: 'support_block', name: 'Post-launch support block',
      description: 'Four prepaid hours after the included 30-day support period.',
      price: 300, pricingMode: 'fixed', cadence: 'one_time', unitLabel: '4-hour block', category: 'support',
    },
    {
      id: 'additional_training', name: 'Additional training',
      description: 'Training beyond the included one-hour handoff session.',
      price: 50, pricingMode: 'fixed', cadence: 'one_time', unitLabel: 'hour', category: 'support',
    },
    {
      id: 'rush_timeline', name: 'Expedited timeline',
      description: 'Subject to availability and final scope.',
      price: null, pricingMode: 'quoted', cadence: 'one_time', category: 'support',
    },
    {
      id: 'accessibility_audit', name: 'Formal accessibility audit or remediation',
      description: 'Formal WCAG auditing, reporting, certification support, or remediation.',
      price: null, pricingMode: 'quoted', cadence: 'one_time', category: 'support',
    },
    {
      id: 'domain_registration', name: 'Domain registration estimate',
      description: 'Billed directly by the registrar and subject to availability.',
      price: 10, pricingMode: 'starting_at', cadence: 'yearly', category: 'third_party',
    },
  ] satisfies QuoteCatalogItem[],
  followUp: {
    mode: 'direct_booking_with_callback_fallback',
    confirmationButtonLabel: 'Request this scope',
    confirmationIsBindingContract: false,
  },
} as const;

const catalogById = new Map<string, QuoteCatalogItem>(
  quoteConfig.items.map((item) => [item.id, item]),
);

export function calculateEstimate(selection: QuoteSelection): QuoteEstimate {
  const tier = quoteConfig.tiers.find((candidate) => candidate.id === selection.tier);
  if (!tier) throw new Error(`Unknown quote tier: ${selection.tier}`);

  const requestedAddOns = new Map<string, number>();
  for (const requested of selection.addOns ?? []) {
    requestedAddOns.set(requested.id, Math.max(1, Math.floor(requested.quantity ?? 1)));
  }

  // A full identity already includes logo design, so never charge for both.
  if (requestedAddOns.has('brand_identity')) requestedAddOns.delete('logo_design');

  const oneTimeLineItems: QuoteLineItem[] = [{
    id: tier.id,
    name: tier.name,
    amount: tier.price,
    quantity: 1,
    cadence: 'one_time',
    pricingMode: tier.pricingMode,
  }];
  const recurringLineItems: QuoteLineItem[] = [];
  const reviewRequired: QuoteCatalogItem[] = [];

  for (const [id, quantity] of requestedAddOns) {
    const item = catalogById.get(id);
    if (!item || item.includedIn?.includes(tier.id)) continue;
    if (item.pricingMode === 'quoted' || item.price === null) {
      reviewRequired.push(item);
      continue;
    }
    const lineItem: QuoteLineItem = {
      id: item.id,
      name: item.name,
      amount: item.price * quantity,
      quantity,
      cadence: item.cadence,
      pricingMode: item.pricingMode,
    };
    if (item.cadence === 'one_time') oneTimeLineItems.push(lineItem);
    else recurringLineItems.push(lineItem);
  }

  if (selection.carePlanId) {
    const carePlan = catalogById.get(selection.carePlanId);
    if (carePlan?.category === 'care' && carePlan.price !== null) {
      recurringLineItems.push({
        id: carePlan.id,
        name: carePlan.name,
        amount: carePlan.price,
        quantity: 1,
        cadence: carePlan.cadence,
        pricingMode: carePlan.pricingMode,
      });
    }
  }

  const creativeSubtotal = oneTimeLineItems
    .filter((lineItem) => {
      const catalogItem = catalogById.get(lineItem.id);
      return catalogItem?.category === 'brand' && catalogItem.pricingMode === 'fixed';
    })
    .reduce((total, lineItem) => total + lineItem.amount, 0);
  const appliedCreativeBundleDiscount = Math.round(
    creativeSubtotal * quoteConfig.creativeBundleDiscountRate,
  );
  const oneTimeSubtotal = oneTimeLineItems.reduce((total, lineItem) => total + lineItem.amount, 0)
    - appliedCreativeBundleDiscount;

  return {
    tier,
    oneTimeLineItems,
    recurringLineItems,
    reviewRequired,
    oneTimeSubtotal,
    recurringMonthly: recurringLineItems
      .filter((item) => item.cadence === 'monthly')
      .reduce((total, item) => total + item.amount, 0),
    recurringYearly: recurringLineItems
      .filter((item) => item.cadence === 'yearly')
      .reduce((total, item) => total + item.amount, 0),
    estimatedDeposit: Math.round(oneTimeSubtotal * quoteConfig.depositRate),
    appliedCreativeBundleDiscount,
  };
}
