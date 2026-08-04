# Phase 1 readiness assessment

## Status

**Ready with documented non-blocking risks**

Phase 0 acceptance criteria are satisfied: current public implementations, supported queries, fragments, CTAs, forms, conversion behavior, content collections, public components, assets, responsive states, themes, major interaction states, performance, accessibility, SEO, analytics, ownership, redirect requirements, release controls, regression checks, and risks have documented evidence. No public architecture, route, content, component, form, asset, or visual behavior was changed, and nothing was deleted.

## Phase 1 boundary

Phase 1 may define and prepare the information architecture/content model while keeping the current application functional. It must not silently begin a routing, homepage, concept, or conversion cutover. New canonical records should be additive and map every legacy ID/label/URL before consumers switch.

## Required entry conditions

1. Use this package and the approved architectural audit/roadmap as governing sources.
2. Preserve `/`, both static concept implementations, all eight supported scene queries, seven current fragments, `/api/intake` separation, and direct contact behavior until their documented replacement gates pass.
3. Begin with stable content IDs and explicit relationships for Work, Industries, Services, Products, Resources, Offers, Campaigns, and Start qualification; do not copy homepage arrays into a second permanent system.
4. Treat the existing working tree as user-owned. Establish an isolated commit/release baseline and ownership of existing uncommitted/untracked work before broad implementation.
5. Carry forward the visual, route, conversion, analytics, asset, accessibility, performance, and SEO regression evidence.

## Decisions that can proceed in parallel but gate later implementation

- Rendering/hosting strategy for unique metadata, direct loading, true 404s, API routing, products/docs, campaigns, and redirects.
- Authoritative inquiry backend/destination, idempotency, delivery/confirmation, spam controls, retention, and privacy/legal ownership.
- Analytics provider, consent mode, event dictionary, and historical `intake_submitted` treatment.
- Approved Industry/Service taxonomy mapping, particularly trades/transport, health/dental, property/real estate, research, industrial, logistics, construction, gym, salon, and future local-service categories.
- Work route shape (`/work/[slug]` versus `/work/concepts/[slug]`) before redirect activation.
- Public/private classification and provenance owner for concepts, geographic media, source archives, and generated files.

## Minimum blockers before specific cutovers

| Cutover | Must be resolved first |
|---|---|
| Public routing | Rendering ADR, route map, API exclusion, redirect tests, 404/metadata policy |
| Homepage restructure | Canonical content records, fragment compatibility, approved visual/semantic baseline |
| Concepts → Work | Work truth classification, nine records, unique metadata, query redirects, asset mapping |
| Conversion → Start | Verified backend/delivery, privacy/legal, spam controls, schema/theme migration, analytics semantics, fallback and rollback |
| Asset removal | Runtime/deployment/provenance review, owner sign-off, observation window, recoverable prior artifact |

## Phase 0 changed files

Only files below `docs/internal/phase-0-baseline/` were added for audit documentation, generated measurements, screenshots, Lighthouse reports, and the read-only inventory tool. No existing product file was modified by Phase 0.

