# Canonical content schemas, IDs, and relationships

Status: proposed schema contract. Phase 1 does not implement a CMS or move current arrays.

## Shared rules

- Machine IDs use immutable lowercase snake_case.
- Public slugs use stable lowercase kebab-case.
- IDs, slugs, and display labels are separate fields.
- Marketing copy never becomes an ID.
- Renames append aliases/redirect history; they do not mutate identity silently.
- References use IDs, not copied display labels or embedded duplicate records.
- Each record has one canonical owner and an explicit publication status.
- Concepts and illustrative metrics must be truth-labeled and cannot be promoted to client evidence.

## Shared record fields

| Field | Type | Requirement |
|---|---|---|
| `id` | immutable string | Required; globally unique within type |
| `slug` | stable string | Required when public |
| `display_name` | string | Required; editable independently of ID |
| `status` | `draft`, `review`, `published`, `archived` | Required |
| `summary` | short text | Required for listings/previews |
| `seo` | title, description, canonical override, social image | Required before publication |
| `aliases` | prior IDs/slugs/labels | Required when renamed/migrated |
| `owner` | accountable content/business owner | Required |
| `published_at`, `updated_at` | timestamps | Required when published |
| `revision` | integer/version | Required for auditability |

## Stable ID registries

### Industries

The registry supports both launch priorities and current concept preservation. Launch order remains an owner decision.

| ID | Preferred slug | Current/expected mapping |
|---|---|---|
| `fitness` | `fitness` | Gyms, fitness centers, studios |
| `medical_spas` | `medical-spas` | Medical spa campaign category |
| `contractors` | `contractors` | Construction and contractor businesses |
| `restaurants` | `restaurants` | Restaurant/café/hospitality |
| `automotive` | `automotive` | Automotive businesses; new proof required |
| `salons_barbers` | `salons-barbers` | Salons, barbers, beauty studios |
| `real_estate` | `real-estate` | Property, real estate professionals/property operations |
| `local_services` | `local-services` | Cross-trade local service businesses |
| `dental` | `dental` | Existing Dental concept; can relate to healthcare but remains distinct |
| `industrial` | `industrial` | Existing Industrial concept/future B2B vertical |
| `logistics` | `logistics` | Existing Logistics concept/future B2B vertical |
| `retail` | `retail` | Existing Retail/commerce concept |
| `research_labs` | `research-labs` | Existing Research Labs concept/future B2B vertical |

`construction` and `trades` remain legacy labels/Work subjects mapped primarily to `contractors` and optionally `local_services`; they are not destroyed. If owner strategy later requires standalone Industry records, create new stable IDs and relationship migrations rather than repurposing existing IDs.

### Services

| ID | Preferred slug | Scope |
|---|---|---|
| `web_design_development` | `web-design-development` | Strategy, UX/UI, frontend/backend web delivery |
| `brand_identity_creative_direction` | `brand-identity` | Identity systems and creative direction |
| `photography_content_production` | `photography-content` | Photography, imagery, campaign/content production |
| `portals_commerce` | `portals-commerce` | Accounts, portals, ordering, commerce, payments |
| `ai_intake_reception` | `ai-intake-reception` | Web/chat/phone intake and reception assistance |
| `automation_integrations` | `automation-integrations` | Routing, follow-up, integrations, internal workflows/tools |

These are service owners, not every questionnaire choice. Goals, integrations, and deliverables map to them separately.

### Existing Offers

| ID | Current display name | Current price compatibility | Commercial approval |
|---|---|---|---|
| `signature_landing` | Signature Landing | `$999` fixed | Pending future confirmation |
| `business_platform` | Business Platform | From `$2,999` | Pending future confirmation |
| `ai_integrated_platform` | AI-Integrated Platform | From `$4,999` | Pending future confirmation |

IDs, names, and price behavior remain intact until an approved commercial migration includes aliases, effective dates, analytics mapping, and visitor communication.

### Initial Work records

| ID | Proposed slug | Type | Source |
|---|---|---|---|
| `work_northline_property_concept` | `northline-property-concept` | `concept` | Property static concept |
| `work_arc_dental_concept` | `arc-dental-concept` | `concept` | Dental studio scene |
| `work_embers_restaurant_concept` | `embers-restaurant-concept` | `concept` | Restaurant studio scene |
| `work_copperline_trades_concept` | `copperline-trades-concept` | `concept` | Trades studio scene |
| `work_forgeworks_industrial_concept` | `forgeworks-industrial-concept` | `concept` | Industrial studio scene |
| `work_northbound_logistics_concept` | `northbound-logistics-concept` | `concept` | Logistics studio scene |
| `work_atelier_retail_concept` | `atelier-retail-concept` | `concept` | Retail studio scene |
| `work_vanta_research_labs_concept` | `vanta-research-labs-concept` | `concept` | Research studio scene |
| `work_groundline_construction_concept` | `groundline-construction-concept` | `concept` | Construction studio scene |

Names/slugs must be verified against the rendered concept copy before publication. IDs can be reserved now; publication still requires truth and asset review.

## Entity schemas

### Work

Required fields beyond shared record:

- `work_type`: `client`, `case_study`, `concept`, `internal`, or `product`.
- `truth_label` and `approval_state`.
- `client_name` only when public approval exists.
- `industry_ids[]`, `service_ids[]`, optional `product_ids[]`.
- `challenge`, `approach`, `solution`, `deliverables[]`.
- `workflow_steps[]` for show-before-explain demonstrations.
- `media[]`: role, desktop/mobile variants, poster, alt text, dimensions/duration, source/provenance, license, required credit.
- `outcomes[]`: metric, unit, baseline, result, period, evidence source, approval. Empty for unverified concepts.
- `testimonial_ids[]` only with public approval.
- `featured_rank` controlled by the presentation owner, not a global `show_everywhere` flag.
- `start_context` containing stable IDs only.

### Industry

- `industry_id` from registry.
- `audiences[]`, `problems[]`, `desired_outcomes[]`.
- `workflow_ids[]` or owned workflow steps.
- `service_ids[]`, `work_ids[]`, optional `product_ids[]`.
- `objections_faq[]`.
- `proof_policy`: client proof versus clearly labeled concept.
- `visual_direction` and approved media references.
- `qualification_defaults` mapped to Start IDs.
- `campaign_ids[]` as references, not copied page content.

### Service

- `service_id` from registry.
- `client_problem`, `desired_outcome`, `scope_boundary`.
- `deliverable_ids[]`, `capability_ids[]`, `integration_ids[]`.
- `industry_ids[]`, `work_ids[]`, optional `product_ids[]`.
- `offer_ids[]` for current starting points.
- `proof_ids[]` referencing Work/outcomes.
- `process_excerpt` only when service-specific; canonical general process remains About/Start.
- `start_context`.

### Product

- `product_id` prefixed `product_`.
- Independent `positioning`, `audience`, `problem`, `value`, `features[]`, `demonstrations[]`.
- `pricing_model` and product-owned pricing records.
- `documentation_root`, `support_model`, `conversion_path`.
- `service_ids[]`, `industry_ids[]`, `work_ids[]`, `resource_ids[]`.
- `brand_relationship`: Velari product, endorsed venture, or other approved type.
- `lifecycle_status`: discovery, beta, active, sunset.

Products cannot depend on agency package copy to make sense.

### Resource

- `resource_id` prefixed `resource_`.
- `resource_type`: article, guide, checklist, video, template, documentation, or approved type.
- `topic_ids[]`, `industry_ids[]`, `service_ids[]`, `product_ids[]`.
- `author`, `reviewer`, `published_at`, `updated_at`.
- `body_source`, `summary`, `media[]`.
- `educational_claim_sources[]` where factual claims require support.
- `conversion_context` optional and secondary.

### Offer

- `offer_id`, `display_name`, `version`, `effective_from`, optional `effective_to`.
- `commercial_approval`: pending, approved, retired.
- `pricing_mode`: fixed, starting_at, quoted.
- `currency`, one-time/monthly/yearly lines kept separate.
- `base_price`, `timeline`, `description`, `included_item_ids[]`, `feature_ids[]`.
- `care_plan_ids[]`, `eligibility`, `review_required_rules[]`.
- `deposit_rate`, `validity_days`, `catalog_version`.
- `service_ids[]` and Start qualification mapping.
- Historical versions remain resolvable for old estimates.

### Campaign

- `campaign_id` prefixed `campaign_`; internal ID may include channel/time while public slug remains readable.
- `channel`: Google Ads, Meta, Instagram, LinkedIn, local SEO, organic, referral, or approved type.
- `status`, `starts_at`, `ends_at`, `owner`.
- `audience`, `primary_industry_id`, optional `service_ids[]`, `work_ids[]`, `product_ids[]`, `offer_id`.
- `landing_composition`: approved module references plus campaign-only connective copy.
- `start_context` and analytics attribution mapping.
- `indexing_policy`, `canonical_policy`, `retirement_destination`.

Campaigns may tailor order and examples but cannot fork canonical service/industry/pricing facts.

### Start

Separate three related schemas:

1. `StartContext`: stable `industry_id`, `service_ids[]`, `offer_id`, `work_id`, `product_id`, `campaign_id`, source route/CTA.
2. `Qualification`: contact, business, goals, current situation, needs, budget, timeline, preferred contact, consent, optional approved transcript reference.
3. `SubmissionRecord`: immutable submission ID, schema version, Offer version, normalized answers, context, attribution, consent timestamp/version, attempted/confirmed/failed timestamps, delivery receipts, retry/idempotency state.

Rules:

- Contact PII and free text never enter analytics or URLs.
- Theme is optional presentation metadata with backward-compatible default; it does not determine inquiry validity.
- Chat and questionnaire are interfaces over one saved qualification, not separate lead systems.
- “Confirmed” requires trusted server persistence/delivery evidence.
- Current questionnaire fields and guided answers receive explicit mappings before cutover.

## Relationships

```text
Industry  <—many-to-many—> Service
Industry  <—many-to-many—> Work
Service   <—many-to-many—> Work
Product   <—many-to-many—> Industry / Service / Work / Resource
Offer     —many-to-many—> Service
Campaign  —references—> Industry / Service / Work / Product / Offer
Homepage  —curates IDs—> Work / Industry / Service / Product
StartContext —references—> Industry / Service / Work / Product / Offer / Campaign
Case Study —is a Work type or evidence extension of one Work record
```

Presentation ordering belongs to the page owner as an ordered list of IDs. Records do not contain global placement booleans.

## Storage implementation boundary

These schemas are content contracts, not a CMS selection. Phase 2 may implement typed local data modules first if they preserve the schema and can migrate losslessly to a CMS. Do not create a second permanent taxonomy beside existing arrays; new records must include legacy aliases/mappings, and consumers switch in migration slices.

