# Content-source inventory

## Public collections and configuration

| Business concept | Source / symbol | Consumers | Duplicate or divergence | Future canonical type | Risk |
|---|---|---|---|---|---|
| Agency proposition | `src/components/homepage/HeroSection.tsx` / `beats`; `src/config/brand.ts` / `brand.tagline`; Footer tagline | Hero, footer, brand consumers | Multiple claims describe websites, brand, imagery, and systems at different breadth | Global company positioning record with channel-specific excerpts | High |
| Header navigation | `src/components/layout/Header.tsx` / `NAV_ITEMS` | Header only | IDs mirror fragments, not future information architecture; mobile hides collection | Global navigation configuration | High |
| Industries and concept proof | `ShowcaseTunnelSection.tsx` / `concepts` | Tunnel rail, industry tabs, mockups, links | Nine records; overlaps intake taxonomies and studio scenes | `Industry` records + linked `Work`/`Concept` records | Critical |
| Studio concept scenes | `public/concepts/studio/studio.js` / `scenes` | Eight query scenes | Labels/content repeat eight Showcase concepts; data lives outside React and metadata | `Work` records with industry relationship and presentation payload | Critical |
| Property concept | Hard-coded `public/concepts/property/index.html` | Property static page | Property exists in Showcase and standalone markup, not shared scene data | `Work` record, rendered through canonical concept template | High |
| Industry proof chips | `ShowcaseTunnelSection.tsx` / `concepts[].proofs` | Industry proof panel | Service-like terms overlap goals, quote items, systems | Work evidence/capability references, linked to service IDs | High |
| Services presentation | `WhatWeBuildSection.tsx` / `chapters` | Services orbit | Six display strings only; overlaps inquiry types, goals, quote categories, server knowledge | `Service` records | Critical |
| Offers/packages | `src/config/quote.ts` / `quoteConfig.tiers`; `src/config/packages.ts` / `packages` | Packages UI, quote engine | `packages` is a view projection (good); tier names repeated in guided engine/server knowledge | `Offer` records referencing Service/Product capabilities | High |
| Pricing/catalog | `quoteConfig.items`, tier features, care plans | Quote calculations; package copy | Server knowledge and guided recommendations repeat names/prices; current UI exposes only tiers | Versioned Offer/Pricing records with effective dates | Critical |
| Process steps | `HowItWorksSection.tsx` / `steps` | Homepage process | No second structured collection; prose repeats general discovery/direction/build/launch narrative | Process content owned by About/Start, not homepage | Medium |
| Inquiry types | `ContactSection.tsx` / `inquiryTypes` | Mailto form | Service-like taxonomy not mapped to service IDs | Inquiry reason taxonomy | High |
| Questionnaire industries | `IntakeForm.tsx` / `industryOptions` | Questionnaire | 10 choices differ from Showcase 9 and guided 8 | Stable `Industry` IDs plus `other` | Critical |
| Guided industries | `guidedIntake.ts` / `INDUSTRY_CHIPS`, `INDUSTRY_SYSTEMS`, `GENERIC_SYSTEMS` | Guided intake | 8 choices; custom per-industry system labels; differs from questionnaire and Showcase | Industry qualification configuration related to canonical Industry IDs | Critical |
| Guided service/automation choices | `guidedIntake.ts` / `INDUSTRY_SYSTEMS`, `AI_SYSTEMS`, `EXTRA_OPTIONS` | Guided recommendation engine | Free-text labels double as rule keys; overlaps quote catalog and services | Qualification-option records mapped to Service/Offer IDs | Critical |
| Goals | `IntakeForm.tsx` / `goalOptions` | Questionnaire | 12 labels overlap services, quote items, and inquiry types | Project-goal taxonomy | High |
| Budgets/timelines | `IntakeForm.tsx` / `budgetOptions`, `timelineOptions`; guided engine step choices | Both intakes | Ranges and wording differ; guided logic contains budget-dependent tier rules | Versioned qualification taxonomy | High |
| Contact facts | `quoteConfig.canonicalContact`; `brand` projection | Header/footer/contact/quote behavior | Canonical projection is mostly controlled; location copy is hard-coded elsewhere | Global organization settings | Medium |
| Theme options | `src/features/theme/tokens.ts` / `themes`, `defaultTheme`; `brand.default_theme` | Provider, switcher, intake theme metadata | Default repeated; theme is also required business-data field | Presentation theme configuration; remove as required inquiry taxonomy | High |
| Testimonials | None found | None | Missing rather than duplicated | Testimonial/endorsement records under proof/Work if added | Low |
| Metrics | No agency outcomes collection found; static concept UI contains fictional/demo metrics | Concept HTML/JS | Must not be mistaken for Velari or client proof | Case-study metrics with provenance and unit definitions | High |
| Footer/credits | `Footer.tsx`, `brand` | Footer | OSM/USGS provenance only exists in component prose | Credits utility content + asset provenance records | Medium |
| AI knowledge | `server/intake/knowledge.ts` / `catalog` | Live AI handler | Repeats offer/service/industry logic from quote and guided intake | Generated server projection from canonical taxonomies | Critical |

## Material duplicate-maintenance clusters

### Industry identity

Five independent representations currently define “industry”: homepage concepts, studio scene keys, guided intake chips/systems, questionnaire options, and industry-like contact choices. Examples of semantic mismatches include `Trades`, `Trades / home services`, and `Trades or Transport`; `Dental`, `Dental or Medical`, and `Health / wellness`; `Property`, `Property Management`, and `Real estate / property`. Construction, logistics, industrial, and research appear in Showcase but not as direct questionnaire choices. Gym, salon, law, SaaS, and professional services appear in intake but not Showcase.

Future migration requirement: create stable Industry IDs first, then map each current label and scene key to one ID without changing current display strings during the compatibility period.

### Services and project needs

The six services-orbit chapter labels, eight contact inquiry types, twelve questionnaire goals, dozens of guided systems/extras, quote catalog categories/items, and AI server catalog all describe overlapping capabilities. They differ because some are services, some outcomes, some integrations, and some offers. They must not be merged into one flat “services” array. Future records should distinguish Service, Project Goal, Integration Capability, Product, and Offer, with explicit relationships.

### Packages and pricing

`quoteConfig` is the closest current canonical source. `packages.ts` correctly projects tiers for display. `guidedIntake.ts` and `server/intake/knowledge.ts` duplicate tier names, price language, and decision rules. Later work should generate chat knowledge and display projections from versioned offer data while retaining historical IDs and analytics mappings.

### Contact and completion promises

Contact SLA language appears in the Contact form, questionnaire confirmation, and likely conversational completion. The questionnaire promises receipt and confirmation email even though current clients are mocked. Treat all completion claims as conversion-state content owned by the canonical Start system, not reusable marketing copy.

## Migration rule

No current source should be removed because a future canonical type is named here. A source can be retired only when: every consumer is mapped; old IDs/labels are preserved where required; static and runtime reference searches pass; route/visual/conversion regression passes; and rollback does not rely on reconstructing deleted data.

