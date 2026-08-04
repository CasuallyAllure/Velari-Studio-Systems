# Release and rollback procedure

## Release principle

Each phase is independently deployable, backward-compatible at its boundary, and reversible without reconstructing deleted source. Migrations copy/add first, switch consumers second, observe, and remove only in a later approved release.

## Roles

- Engineering owner: build, tests, route/API behavior, data migration, rollback execution.
- Design/content owner: visual baseline, content ownership, concept/work truthfulness, responsive acceptance.
- Growth/SEO owner: metadata, redirects, sitemap, campaign attribution, search monitoring.
- Operations/conversion owner: inbox/CRM destination, submission receipt, privacy/retention, spam controls.
- Phase approver: named project owner accepts the gate. One person may hold multiple roles, but the checklist records names and timestamp.

## Pre-release gate

1. Freeze release scope and list intentional route/content/visual/data changes.
2. Preserve a deployable artifact and immutable commit for the current production version.
3. Back up any database/storage affected and test restoration in a safe environment.
4. Review migrations for forward/backward compatibility; deploy additive schema before dependent UI.
5. Verify environment-variable names and destination configuration without logging secrets.
6. Run clean install/build/typecheck/lint/tests. Current baseline: build passes; lint fails at `api/intake.ts:6`, so future gates must explicitly resolve or formally waive this known failure before requiring a clean lint delta.
7. Run route/direct-load matrix, API separation, fragments, redirects, and true 404 behavior on production-shaped hosting.
8. Run responsive visual comparisons against `screenshots/` and document accepted diffs.
9. Run accessibility automated scan plus manual keyboard/reduced-motion/form pass.
10. Test every conversion mode with authorized test data: success, validation, server rejection, network failure, retry, duplicate prevention, storage, delivery, and confirmation.
11. Verify analytics in a test/debug property: event names, payload privacy, single firing, campaign persistence, server-confirmed semantics.
12. Verify SEO: status codes, titles/descriptions, canonicals, robots, sitemap, structured data, share cards, redirects.
13. Check largest assets/payload/Lighthouse against the recorded baseline and investigate material regressions.

## Deployment sequence

1. Deploy additive backend/schema/config changes that remain compatible with current UI.
2. Smoke-test health, read/write paths, and rollback compatibility.
3. Deploy frontend/routes/content.
4. Activate redirects only after destinations return correct 200 responses.
5. Run production smoke suite from external network/device where practical.
6. Observe logs, real-user errors, conversion delivery, analytics, search status, and media delivery through the defined monitoring window.

## Rollback triggers

Immediate rollback or feature-disable for: inquiry loss/false success; API/page routing collision; current URL/query/fragment breakage; widespread blank/blocked render; database corruption or incompatible clients; privacy/PII leak; analytics duplicating conversion counts materially; critical accessibility regression; redirect loop/wrong destination; severe mobile navigation failure; or payload/runtime regression that prevents core use.

## Rollback procedure

1. Stop the rollout/redirect activation; record time, release ID, symptoms, and owner.
2. If feature flags exist, disable the smallest failing surface while keeping compatible backend changes.
3. Redeploy the previously preserved immutable application artifact. Do not attempt recovery from deleted working-tree files.
4. Reverse a database migration only when a tested down migration is data-safe. Otherwise leave additive schema in place and roll the client back.
5. Restore data from verified backup only for confirmed corruption/loss and with operations approval.
6. Restore previous redirect/routing configuration from its versioned manifest.
7. Re-run critical smoke tests: root, all concept legacy URLs, anchors, Start/contact, API, submission receipt, mobile, and analytics.
8. Communicate impact and reconcile potentially lost/duplicated inquiries from server logs and destination systems.
9. Open incident review with cause, detection gap, correction, and new regression test.

## Post-release monitoring

Monitor at least the highest-risk traffic cycle appropriate to the phase: 4xx/5xx and soft 404s; API latency/errors; submission attempts versus confirmations and destination receipts; duplicate records; email delivery; redirect hits/loops; Core Web Vitals/JS errors; asset 404s; campaign attribution; search crawling/indexing; and accessibility/user reports. Do not remove legacy implementations during this window.

## Phase gate record template

Record release/commit, environment, approvers, test artifact links, known waivers, database backup/restore evidence, prior deploy artifact, rollback command/runbook location, monitoring owner/window, and final go/no-go decision.

