import { quoteConfig } from './quote';

export const brand = {
  // ── COMPANY INFO ──
  company_name: quoteConfig.canonicalContact.companyName,
  tagline: "Cinematic digital worlds built to convert",
  website: quoteConfig.canonicalContact.website,
  
  // ── CONTACT ──
  email: quoteConfig.canonicalContact.email,
  phone: quoteConfig.canonicalContact.phone,
  timezone: quoteConfig.canonicalContact.timezone,
  
  // ── SOCIAL ──
  twitter: "@velariss",
  linkedin: "velari-systems",
  github: "CasuallyAllure",
  
  // ── DEFAULT THEME ──
  default_theme: "swedish_minimal" as const,
} as const;
