import { quoteConfig } from './quote';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: quoteConfig.currency,
  maximumFractionDigits: 0,
});

export const packages = quoteConfig.tiers.map((tier) => ({
  id: tier.id,
  name: tier.name,
  price: `${tier.pricingMode === 'starting_at' ? 'From ' : ''}${usd.format(tier.price)}`,
  description: tier.description,
  features: tier.features,
  popular: tier.id === 'business_platform',
}));
