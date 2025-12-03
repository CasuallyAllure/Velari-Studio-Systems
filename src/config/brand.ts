// ============================================================
// MULTI-CLIENT REUSE: Brand Configuration
// ============================================================
// Change these values for each client deployment
// ============================================================

export const brand = {
  // ── COMPANY INFO ──
  company_name: "Velari Studio Systems",
  tagline: "Swedish-minimalist websites with built-in AI intake",
  
  // ── CONTACT ──
  email: "hello@velaristudiosystems.com",
  phone: "+1 (555) 123-4567",
  
  // ── SOCIAL ──
  twitter: "@velaristudios",
  linkedin: "velari-studio-systems",
  github: "CasuallyAllure",
  
  // ── DEFAULT THEME ──
  default_theme: "swedish_minimal" as const,
} as const;

// ── EXAMPLE: For Plumber Client ──
// company_name: "Joe's Plumbing & Heating"
// tagline: "24/7 emergency service with instant booking"
// email: "service@joesplumbing.com"
// default_theme: "industrial_services"

// ── EXAMPLE: For SaaS Client ──
// company_name: "Acme Software"
// tagline: "API-first platform for modern teams"
// email: "hello@acmesoftware.com"
// default_theme: "modern_tech"
