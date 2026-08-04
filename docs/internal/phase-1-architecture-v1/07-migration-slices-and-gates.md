# Migration slices and acceptance gates

Every slice is additive first, independently deployable, and reversible. “Remove” is never part of the release that first introduces a replacement.

## Phase 2 — Hosting, routes, navigation, and SEO shell

Dependencies: approved Phase 1; worktree disposition; confirmed deployment control plane; accepted ADR.

Slices:

1. Non-production rendering spike: generated `/`, one Work sample, one Industry sample, `/start`, and 404.
2. API/page boundary: `/api/*` cannot fall through to HTML.
3. Metadata/status infrastructure and correct robots/sitemap preview.
4. Global shell and accessible mobile navigation behind preview/feature gate.
5. Legacy static pages/fragments remain untouched.

Parallel work: route contract tests, metadata templates, navigation accessibility, hosting runbook.

Acceptance:

- Direct requests return correct document/status/content type.
- Initial navigation contains only Work, Industries, Services, About, Start.
- No empty hub is linked publicly.
- Current root, concepts, queries, fragments, assets, themes, and contact paths pass regression.
- `/api/intake` is isolated even if its feature remains unfinished.
- Production rollback artifact and deployment owner are recorded.

Rollback: redeploy prior static artifact and disable new edge/function routing; no content/assets deleted.

## Phase 3 — Start and verified conversion

Dependencies: real destination/backend, privacy/legal ownership, spam/retention/consent decisions, analytics semantics, Phase 2 API boundary.

Slices:

1. Versioned StartContext/Qualification/Submission contracts.
2. Server validation, idempotent test persistence, delivery logging, and safe API errors.
3. `/start` minimum form using test environment.
4. Context adapters for Offer, Industry, Service, Work, Campaign.
5. Optional guided interface adapter after separate AI-workstream review.
6. Parallel-run analytics and authorized end-to-end test submissions.
7. CTA cutover only after parity; legacy direct methods remain.

Acceptance:

- One authorized submission produces one durable record and one verified internal delivery.
- Confirmed UI appears only after trusted response.
- Network/server/email failures preserve user data and give a usable retry/fallback.
- No PII appears in URLs, logs intended for analytics, or analytics payloads.
- Package/industry/service/campaign context is not re-asked unnecessarily.
- Keyboard, screen-reader, reduced-motion, mobile, spam, rate-limit, duplicate and privacy tests pass.

Rollback: route CTAs back to current mechanisms; leave backward-compatible server schema; reconcile test/production records.

## Phase 4 — Work and concept migration

Dependencies: Work schema, approved truth classifications/assets, route infrastructure, Start context.

Slices:

1. Work index and reusable Work renderer using canonical records.
2. Migrate one representative concept without redirect; compare visual/content parity.
3. Migrate remaining eight records in small batches.
4. Add persistent Velari shell and functional Start/return paths.
5. Approve metadata and asset/provenance mapping per record.
6. Activate query-aware redirects after all destinations exist.

Acceptance:

- Every Work page states concept/client/case-study truth clearly.
- All nine desktop/mobile visuals and meaningful workflows are preserved.
- Legacy URLs map one hop to the correct Work page; invalid/missing scene behavior is approved.
- No fake metrics/testimonials/client claims.
- Direct loading, refresh, navigation, metadata, images/video, reduced motion, and Start context pass.

Rollback: disable redirects and continue serving legacy pages; canonical Work pages may remain unlinked.

## Phase 5A — Industries

Dependencies: owner launch-priority answers, Industry schema/aliases, relevant Work, Start.

Slices:

1. Industries hub and reusable industry composition.
2. Highest-priority industry with real or clearly labeled concept proof.
3. Remaining approved launch industries individually.
4. Campaign composition/context test for one industry.

Acceptance:

- Each page is distinct in problems, outcomes, workflows, visuals, proof, objections and relevant Services.
- No generic page with only labels/images swapped.
- No duplicate canonical Service/Offer claims.
- Contextual Start preselection and campaign/referral behavior pass.

Rollback: unpublish affected industry record; hub omits it; canonical Work remains.

## Phase 5B — Services and Offers

Dependencies: Service/Offer registries, current quote rules, commercial compatibility, Work proof.

Slices:

1. Services hub and one Service renderer.
2. Six canonical Service records and alias mappings.
3. Versioned Offer projection from existing `quoteConfig` rules.
4. Detailed package comparison/qualification in Services/Start.
5. Replace duplicated service-label consumers one at a time later, not in the first publication.

Acceptance:

- Each Service answers one client problem/outcome and shows evidence.
- Offer IDs/names/prices remain compatible and clearly marked according to approval status.
- No double charging or catalog divergence.
- Current package UI and event bus remain until their replacement passes.

Rollback: unlink new service/offer pages; current homepage packages remain.

## Phase 6 — Homepage reduction

Dependencies: published Work, Industries, Services, verified Start; approved content selection; fragment map.

Slices:

1. Approve target content outline and visual storyboard using canonical references.
2. Build new homepage in parallel preview, not by deleting current sections.
3. Validate one signature cinematic and reduced-motion equivalent.
4. Validate curated proof/capability/industry modules and Start actions.
5. Map all seven legacy fragments.
6. Cut over homepage composition; observe before retiring old components.

Acceptance:

- Homepage owns proposition, curated proof, brief range signals, credibility, and conversion only.
- Full industry/service/offer/process/intake inventories are absent from homepage.
- Exactly one signature long cinematic sequence.
- Start is the only primary conversion path; Work may be secondary.
- Mobile navigation prevents forced traversal of the full page.
- Page length, interactive count, CTA count, media transfer, headings, and scroll cost are materially lower than Phase 0 and recorded.
- No canonical content is orphaned; fragments remain compatible.

Rollback: restore prior `App` composition; new hub routes remain valid.

## Phase 7 — About, Products, Resources, Campaign readiness

Dependencies: schemas, navigation policy, sufficient approved content.

Slices:

1. About/process canonical content.
2. Product renderer and one product only when independence gate passes.
3. Resource renderer and hub only when collection threshold passes.
4. Campaign composition using canonical references and Start context.

Acceptance:

- Products/Resources stay outside primary nav until their gates pass.
- Product works independently of agency narrative.
- Resources are substantive, owned, dated, and related without duplicated content.
- Campaigns have indexing, analytics, retirement, and no-duplicate ownership policies.

Rollback: unpublish individual records/routes; core navigation remains unchanged.

## Phase 8 — Migration, components, and assets

Dependencies: all canonical consumers live; approved worktree/asset disposition; observation evidence.

Slices:

1. Replace one hard-coded taxonomy consumer with canonical projection and compare output.
2. Migrate remaining consumers by domain.
3. Extract only proven shared layout primitives.
4. Separate runtime assets from source/generated/archive assets.
5. Copy/version asset destinations; switch references; observe.
6. Propose later removals individually.

Acceptance:

- No duplicate ownership remains.
- Build/reference/runtime/direct-URL tests pass.
- Asset hashes, provenance, licenses and redirects/aliases are recorded.
- No deployment includes unnecessary source archives.
- No component/asset is deleted without an approved removal record and recoverable prior artifact.

Rollback: switch consumers/references back; source remains untouched.

## Phase 9 — Premium polish and quality hardening

Dependencies: stable architecture and content.

Slices: visual restraint; accessibility; media/performance; SEO/schema; analytics; cross-browser/device QA.

Acceptance:

- Zero critical accessibility/conversion/route issues.
- Contrast, names, labels/errors, focus, navigation, reduced motion and screen-reader paths pass.
- Performance budgets improve materially from Phase 0; mobile produces measurable LCP.
- Metadata/canonicals/schema/sitemap/robots/404/redirects validate.
- Analytics fires once with correct privacy-safe semantics.

Rollback: revert isolated polish slice; architecture/content remains.

## Phase 10 — Rollout and retirement

Dependencies: release checklist, monitoring owners, rollback artifact, approved removals.

Slices: canary/preview; production cutover; redirect activation; monitoring; legacy retirement in separate releases.

Acceptance:

- No inquiry loss, redirect loop, soft-404 spike, asset failure, analytics inflation, or critical device/accessibility regression.
- Legacy removal conditions and owner approvals are documented.
- Previous artifact and data restoration process remain usable.

