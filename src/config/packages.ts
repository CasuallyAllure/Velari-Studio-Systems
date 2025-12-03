// ============================================================
// MULTI-CLIENT REUSE: Packages Configuration
// ============================================================
// Change these values for each client deployment
// ============================================================

export const packages = [
  {
    id: "starter",
    name: "Starter Site",
    price: "$2,500",
    description: "Simple brochure site with basic intake form",
    features: [
      "5-page responsive website",
      "Mobile-first design",
      "Contact form with email notifications",
      "Basic SEO setup",
      "1 month support",
    ],
    popular: false,
  },
  {
    id: "studio",
    name: "Studio System",
    price: "$7,500",
    description: "Full site + customer portal + automations",
    features: [
      "Everything in Starter",
      "Customer portal with login",
      "AI-powered intake routing",
      "Email automation sequences",
      "CRM integration",
      "Analytics dashboard",
      "3 months support",
    ],
    popular: true,
  },
  {
    id: "custom",
    name: "Custom Build",
    price: "Custom",
    description: "Advanced apps and workflows",
    features: [
      "Everything in Studio System",
      "Custom integrations (Stripe, Twilio, etc.)",
      "AI phone agents",
      "Advanced automation workflows",
      "Multi-user permissions",
      "Dedicated support",
    ],
    popular: false,
  },
];

// ── EXAMPLE: For Plumber Client ──
// packages[0].name = "Basic Website"
// packages[1].name = "Dispatch System"
// packages[1].features = [
//   "Online booking calendar",
//   "SMS notifications",
//   "Customer portal",
//   "Invoice automation",
//   "Service area mapping",
// ]

// ── EXAMPLE: For SaaS Client ──
// packages[0].name = "Landing Page"
// packages[1].name = "Full Platform"
// packages[1].features = [
//   "User dashboard",
//   "API access",
//   "Webhooks",
//   "Team collaboration",
//   "Advanced analytics",
// ]
