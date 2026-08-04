# Naming and slug conventions

These rules apply to future records and routes. They do not rename current production files.

## Universal ID rules

- Store immutable machine IDs separately from display labels, headlines, and slugs.
- Use lowercase ASCII snake_case for taxonomy/entity IDs: `medical_spas`, `ai_automation`, `signature_landing`.
- IDs must describe identity, not current marketing copy, price, position, or route.
- Published IDs are immutable. Merge/deprecation uses aliases and a migration table.
- Every record stores `id`, `slug`, `display_name`, `status`, `published_at`, and redirect/alias history as applicable.

## Routes and slugs

- Public route segments use lowercase kebab-case: `/industries/medical-spas`.
- Prefer nouns and durable identities; avoid dates, prices, “new,” “best,” version numbers, or campaign slogans in canonical slugs.
- Stable hubs: `/work`, `/industries`, `/services`, `/products`, `/about`, `/start`, `/resources`.
- Child canonicals: `/work/[slug]`, `/industries/[slug]`, `/services/[slug]`, `/products/[slug]`, `/resources/[slug]` unless a product has an approved independent route tree.
- Campaigns use `/campaigns/[campaign-slug]` or an approved hidden landing namespace. Ads point directly to the campaign/industry landing experience, not a query-parameter copy of the homepage.
- Once published, a changed slug creates a permanent redirect record; never silently reuse an old slug for a different entity.

## Entity prefixes and examples

| Type | ID example | Slug example | Notes |
|---|---|---|---|
| Industry | `medical_spas` | `medical-spas` | Broad industry; specialties can relate hierarchically |
| Service | `ai_automation` | `ai-automation` | Do not encode “service” in ID |
| Product | `product_client_portal` | `client-portal` | Prefix helps distinguish product from service/internal tool |
| Work | `work_northline_property_concept` | `northline-property-concept` | Store work type separately |
| Campaign | `campaign_medspa_google_search_2026q3` | `medspa-growth` | Internal ID may include channel/time; public slug stays durable for campaign lifetime |
| Offer | `signature_landing` | `signature-landing` | Existing stable tier IDs should be retained |
| Resource | `resource_medspa_booking_guide` | `medspa-booking-guide` | Store resource type/topic separately |
| Redirect | `redirect_concept_dental_legacy` | N/A | Record source, destination, status, dates, owner |

## Work classification

Every Work record has a controlled `work_type`: `client`, `case_study`, `concept`, `internal`, `product`, or another architecture-approved value. `client_name` is optional but truth status is not. Concepts and fictional metrics must be clearly labeled and must never appear as delivered client work.

## Components and files

- React components: PascalCase noun or noun phrase; route/page composition ends `Page`; shared layout ends only with a meaningful role (`SiteHeader`, `PageSection`), not `Common` or `Generic`.
- Hooks/functions: camelCase; hooks start `use`.
- Content/data modules: kebab-case filenames or repository-standard TypeScript naming, one clear owner; avoid `data2`, `new`, `final`, `v2` in canonical runtime paths.
- Assets: `[entity-id]--[role]--[breakpoint-or-variant].[ext]`, for example `work_northline_property_concept--hero--mobile.webp`. Retain a content hash/build manifest outside the display filename when the pipeline supports it.
- Generated/source assets must live outside public delivery roots unless required at runtime.

## Analytics

- Event names are lowercase snake_case, past-tense for completed facts and explicit state for attempts: `offer_selected`, `intake_submission_attempted`, `intake_submission_confirmed`.
- Payload keys use stable IDs: `industry_id`, not `industry_name`; `source_route`, `source_component`, `cta_id`.
- Never put PII, raw free text, price copy, or visual labels in event identifiers.
- Maintain an event dictionary with owner, trigger, payload schema, privacy classification, version, and historical mapping.

## CMS readiness

Use explicit relationships rather than copied arrays: Work↔Industries, Work↔Services, Campaign→Industry/Service/Offer, Case Study→Work/metrics, Product→docs/resources/support/pricing. Store ordered curated references on presentation owners (such as homepage), never global booleans like `show_everywhere`.

