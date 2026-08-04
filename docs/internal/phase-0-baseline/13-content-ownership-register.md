# Content ownership register

This register applies the approved architecture: Work, Industries, Services, Products, About, Start, and Resources are durable hubs; the homepage is selective; campaign pages are acquisition entrances rather than duplicate content owners; products can mature independently within the Velari brand.

| Category | Canonical future owner | Permitted reuse | Current duplicate locations | Migration destination | Phase |
|---|---|---|---|---|---|
| Agency proposition | Homepage + organization settings for immutable facts | Short contextual excerpts; no parallel full positioning | Hero beats, footer tagline, brand tagline, process/contact prose | `/` and global organization record | Homepage phase |
| Services | Service records and `/services/[service]` | Curated cards/previews on homepage, industries, campaigns, Work references | Services orbit, inquiry types, goals, guided extras/systems, quote items, AI knowledge | `/services`, `/services/[service]` | Services architecture |
| Industries | Industry records and `/industries/[industry]` | Industry labels/relationships in Work, campaigns, intake | Showcase concepts, guided industries, questionnaire industries, studio scenes | `/industries`, `/industries/[industry]` | Industries architecture |
| Work | Work records and `/work/[work]` | Curated previews on homepage/industry/service pages | Showcase previews, concept pages | `/work`, `/work/[work]` | Work architecture |
| Case studies | Case Study subtype/related record under Work | Metrics/proof excerpts with source link | None currently; concept demo metrics must not be promoted | `/work/[case-study]` or approved nested pattern | Work/Case Studies |
| Concepts | Work type `concept`, clearly labeled | Industry proof previews and campaigns | Property static page, studio scene queries, homepage concept gallery | Canonical Work concept records | Work migration |
| Products | Product records and independent product route trees | Company/product previews; service relationships | Some quote items and service language may foreshadow products but none are current products | `/products`, `/products/[product]` plus product-owned pricing/docs/support children | Products phase |
| Resources | Resource records | Contextual links from services/industries/products | None current | `/resources`, `/resources/[resource]` | Resources phase |
| Packages/offers | Versioned Offer records owned by commercial operations/Start | Service pages and campaigns may reference current offer ID/price | `quoteConfig`, `packages`, guided tier names, server knowledge | Service/Start presentation; not a top-level business-unit substitute | Services + Start |
| Pricing | Versioned Offer/Pricing records | Product pricing may be independently owned; approved snippets carry effective date | `quoteConfig`, guided/server phrasing | Offer pricing; Product pricing inside product owner | Data-model prerequisite |
| Process | About/Start process content | Short reassurance where context requires | Homepage process cards and surrounding prose | `/about` and/or `/start`, one canonical long version | About + Start |
| Inquiry/qualification | Start workflow and versioned qualification schema | Campaigns may pre-seed context, never fork schemas | Guided engine, questionnaire, contact form | `/start` and server submission contract | Start funnel |
| Contact details | Global organization settings | Header/footer/contact/metadata/schema | `quoteConfig.canonicalContact`, `brand`, hard-coded location copy | Global settings | Data-model prerequisite |
| Campaigns | Campaign records and `/campaigns/[campaign]` or approved non-nav landing namespace | May compose approved Industry/Service/Work/Offer modules | No formal records; future ad pages | Campaign routes, excluded from primary nav unless strategically promoted | Campaign readiness |
| Educational content | Resource records with type/topic/author/date | Industry/service/product contextual links | No current collection | `/resources/[resource]` | Resources phase |
| Product documentation | Each Product’s independent docs owner | Search/resource index references | None current | `/products/[product]/docs/...` or product subdomain when justified | Product phase |
| Credits | Credits utility page + asset provenance metadata | Required concise footer attribution | Footer only; asset paths/source notes | `/credits` plus per-asset provenance | Utility/SEO phase |
| Privacy/legal | Legal-owned versioned utility documents | Footer/form links only; never copied into campaign prose | Missing | `/privacy`, `/legal` (or `/terms` after legal decision) | Pre-conversion release gate |

## Permanent-home test

Every new item must have exactly one canonical record and owner before publication. Surfaces may reference or excerpt it by ID. If the item cannot be classified as Work, Industry, Service, Product, About/company, Start/qualification, Resource, Campaign, Offer, or utility/legal content, architecture review is required.

## Content lifecycle

Campaign-specific claims should enter through a Campaign record and link to canonical proof. Successful campaign work can mature into a Case Study, become referenced by an Industry and relevant Services, and—only if educational—produce a Resource. The lifecycle creates relationships, not copied permanent paragraphs.

## Ten-times acceptance test

The ownership model remains viable with ten times more industries, services, products, work, and resources because growth adds records beneath stable hubs, not homepage sections or primary-navigation items. Product routes retain independent positioning, demos, pricing, docs, resources, support, and conversion while inheriting Velari organization credibility.

