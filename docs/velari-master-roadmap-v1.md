# Velari master implementation roadmap v1

Version: 1.0  
Status: proposed for owner approval  
Prepared: 2026-08-02  
Governing inputs: approved content/IA audit, architectural principles, business-evolution constraints, and the Phase 0 baseline package.

## North star

Velari becomes a cohesive digital operating system for the company: a premium agency presence today, with durable homes for future industries, services, Work, products, resources, campaigns, automations, and ventures. Growth adds depth beneath stable hubs; it does not add permanent homepage sections or primary-navigation clutter.

The homepage has one job: establish why Velari should be trusted. It remains selective as the company grows.

## Non-negotiable principles

1. One primary job per page.
2. Interest → confidence → proof → conversation → project.
3. Demonstrate before explaining.
4. Write for client outcomes rather than internal capability inventories.
5. Every durable item has one canonical owner.
6. Campaign pages compose canonical records rather than copy them.
7. Premium experience comes from restraint, hierarchy, and evidence.
8. Published IDs and URLs remain stable or receive explicit compatibility treatment.
9. Each phase is independently deployable and reversible.
10. No removal occurs in the same release that first introduces a replacement.
11. If a decision would fail with ten times more content, choose a more scalable decision.

## Program status

| Phase | Name | Status |
|---|---|---|
| 0 | Baseline, Governance, and Release Safety | Complete |
| 1 | Architecture and Repository Reconciliation | Complete; awaiting owner approval gate |
| 2 | Hosting Foundation, Routing, Global Navigation, and SEO Shell | Not started |
| 3 | Canonical Start and Verified Conversion | Not started |
| 4 | Work and Case Studies | Not started |
| 5A | Industries | Not started |
| 5B | Services and Offers | Not started |
| 6 | Homepage Reduction | Not started |
| 7 | About, Products, Resources, and Campaign Readiness | Not started |
| 8 | Content Migration, Component Consolidation, and Asset Governance | Not started |
| 9 | Premium Polish and Quality Hardening | Not started |
| 10 | Controlled Rollout and Legacy Retirement | Not started |

## Phase 0 — Baseline, Governance, and Release Safety

Objective: preserve a complete record of the current production-shaped experience before structural work.

Delivered: route, section, conversion, content, component, and asset inventories; 64 screenshots; responsive measurements; Lighthouse reports; accessibility/SEO/analytics baselines; ownership register; redirect manifest; naming conventions; release/rollback process; regression checklist; risk register; and Phase 1 readiness.

Gate result: **Ready with documented non-blocking risks**. Phase 0 changed no public behavior.

## Phase 1 — Architecture and Repository Reconciliation

Objective: make the future architecture and the current repository state unambiguous without changing the website.

Deliverables:

- This versioned roadmap.
- Authority and supersession table.
- Complete grouped worktree disposition matrix.
- Rendering and hosting ADR.
- Final proposed route and initial navigation map.
- Canonical schemas, stable IDs, and entity relationships.
- Legacy-to-canonical compatibility matrix.
- Migration slices and acceptance gates.
- Phase 2 entry criteria.
- Homepage clutter-reduction ownership blueprint.
- Five-question owner questionnaire.

Release effect: documentation only. No public code, route, content, form, theme, asset, or behavior changes.

## Phase 2 — Hosting Foundation, Routing, Global Navigation, and SEO Shell

Objective: establish the deployment/runtime foundation on which future routes can be safely added.

Scope:

- Confirm the Cloudflare control plane and production deployment path.
- Introduce the approved static-first hybrid rendering output.
- Isolate `/api/*` from page fallback.
- Add route-aware metadata, real status codes, a real 404, correct robots/sitemap foundations, and redirect infrastructure.
- Add the focused global shell and accessible mobile navigation: Work, Industries, Services, About, Start.
- Retain current homepage fragments and concept URLs.
- Do not publish empty Products or Resources hubs.

Gate: direct-load, refresh, history, 404, API separation, mobile navigation, metadata, legacy URLs, fragments, reduced motion, and rollback all pass in production-shaped hosting.

## Phase 3 — Canonical Start and Verified Conversion

Objective: create one trustworthy conversion destination before removing any legacy contact mechanism.

Scope:

- `/start` accepts stable industry, service, offer, Work, and campaign context.
- One versioned qualification schema supports guided and form interfaces.
- Server validation, idempotent persistence, verified notification/delivery, abuse protection, consent, privacy links, safe error recovery, and confirmation.
- Explicit state semantics: started, qualified, attempted, confirmed, failed.
- Analytics distinguishes confirmed inquiries from current mock/client completion.
- Preserve AI/guided rewrite as a separate input workstream; reuse only after contract and quality review.
- Keep current chat, questionnaire, mailto, phone, and fragments until parallel verification is complete.

Gate: test submissions reach the authoritative destination exactly once; failures never claim success; legacy paths continue to work; rollback does not lose inquiries.

## Phase 4 — Work and Case Studies

Objective: replace unframed concept destinations with truthful, premium proof inside Velari.

Scope:

- `/work` and `/work/[slug]`.
- Work types: client, case study, concept, internal, product.
- Persistent Velari shell, proof, service/industry relationships, media, workflows, attribution, and Start context.
- Migrate Property and the eight shared studio scenes only after individual parity.
- Activate query-aware redirects only after all destinations pass.

Gate: every legacy concept URL lands on the correct canonical Work record in one hop; concepts are clearly labeled; no fabricated client/outcome claims; all media and mobile states remain intact.

## Phase 5A — Industries

Objective: create campaign-ready destinations that prove Velari understands specific businesses.

Scope:

- `/industries` and `/industries/[slug]`.
- Each page owns one industry outcome, tailored problems, two or three workflows, relevant Services, selected Work, objections/FAQ, and one contextual Start action.
- Priority industries are determined by the owner questionnaire.
- Campaign pages reuse these records rather than fork the messaging.

Gate: launch industries contain distinct proof and workflows, not reskinned templates; Start context is preserved; labels map to canonical IDs.

## Phase 5B — Services and Offers

Objective: give the complete capability and commercial inventory one permanent home.

Scope:

- `/services` and `/services/[slug]`.
- Canonical Service records with outcomes, scope, deliverables, proof, relevant industries, and Work.
- Versioned Offer/Pricing records retain current IDs, names, and prices for compatibility while future commercial approval remains pending.
- Detailed package comparisons and qualifications move to Services/Start, not the homepage.

Gate: all current service/goal/intake/quote labels map to stable IDs; no duplicated pricing rules; current offers remain backward-compatible.

Phases 5A and 5B may proceed in parallel after Work relationships and Phase 1 taxonomies are available.

## Phase 6 — Homepage Reduction

Objective: turn the homepage from a complete catalog into a selective, confident introduction.

Target hierarchy:

1. One cinematic hero, one proposition, one primary Start action, and at most one secondary Work path.
2. Two or three selected Work records.
3. A concise capability signal leading to Services.
4. A brief industry signal leading to Industries.
5. Genuine credibility proof when available.
6. One final Start invitation and restrained footer.

Move deeper: full industry directory, six-service inventory, package comparison, full process, AI assistant, questionnaire, qualification form, and detailed concept experiences.

Gate: every removed homepage detail has a canonical destination; all legacy fragments remain compatible; only one signature long cinematic remains; mobile has direct navigation; conversion parity is preserved.

## Phase 7 — About, Products, Resources, and Campaign Readiness

Objective: prepare future business growth without expanding initial navigation.

Scope:

- `/about` owns company/process depth.
- Product and Resource schemas/routes become publishable when minimum-content gates are met.
- Products support independent positioning, pricing, demonstrations, documentation, resources, support, and conversion.
- Campaign destinations compose canonical Industry, Service, Work, Product, and Offer records and seed Start context.
- Products and Resources remain outside initial primary navigation until sufficient content exists.

Gate: no thin/empty public hub; product independence test passes; campaigns introduce no duplicate canonical claims.

## Phase 8 — Content Migration, Component Consolidation, and Asset Governance

Objective: remove maintenance duplication only after all consumers have migrated.

Scope:

- Retire component-level content arrays in favor of canonical records/projections.
- Consolidate actual shared primitives; do not abstract merely similar visuals.
- Resolve design-reference, recovery, source, generated, and runtime asset ownership.
- Move source archives out of public delivery roots only through copy-switch-observe-remove releases.
- Preserve licenses, hashes, old paths, and rollback artifacts.

Gate: reference/build/runtime searches, route/conversion regressions, asset 404 checks, provenance review, and observation window pass before any deletion.

## Phase 9 — Premium Polish and Quality Hardening

Objective: refine restraint and quality after structural ownership is stable.

Scope:

- Reduce repeated cards, tabs, chips, arrows, micro-labels, glass surfaces, and competing headings.
- Accessibility remediation across keyboard, focus, labels/errors, names, contrast, tabs/carousels, screen readers, and reduced motion.
- Performance budgets for JS/CSS/media, mobile LCP, decoded-media memory, and cinematic CPU cost.
- Final metadata, structured data, analytics QA, campaign attribution, and responsive visual regression.

Gate: release checklist passes with no critical accessibility, conversion, routing, SEO, analytics, or performance regression.

## Phase 10 — Controlled Rollout and Legacy Retirement

Objective: activate canonical ownership and retire compatibility systems safely.

Scope:

- Destination-first redirects and sitemap transition.
- Production monitoring for errors, soft 404s, conversions, delivery, analytics, asset failures, search crawling, and performance.
- Reconcile inquiries and analytics during parallel operation.
- Retire legacy code/assets only in later releases after owner approval and evidence-defined removal conditions.

Gate: monitoring window closes without material regressions; rollback artifact and redirect history remain available.

## Permanent sequencing constraints

- Phase 2 cannot begin until Phase 1 is approved and the worktree disposition is decided.
- Phase 3 cannot replace current conversion paths without the inquiry, privacy/legal, and analytics decisions.
- Phase 4 redirects cannot activate until every canonical Work destination exists.
- Phase 6 cannot remove homepage content until Work, Industries, Services, and Start own it.
- No asset deletion is authorized by this roadmap.
- No phase may absorb the unfinished AI/guided-intake rewrite without explicit scope approval.
