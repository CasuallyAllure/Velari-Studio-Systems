# Phase 2 entry criteria and approval gate

Phase 2 must not begin automatically when this package is delivered.

## Required owner approvals

- [ ] Approve `docs/velari-master-roadmap-v1.md` as the governing roadmap.
- [ ] Approve the authority/supersession table.
- [ ] Approve or amend every worktree disposition group.
- [ ] Approve the static-first hybrid ADR direction.
- [ ] Approve `/work/[slug]` and the initial navigation.
- [ ] Approve the schema/ID registries or identify required changes.
- [ ] Approve the legacy compatibility matrix and no-removal sequencing.

## Required repository/release controls

- [ ] Decide how Phase 0 and Phase 1 documentation will be stored/committed without combining pre-existing work.
- [ ] Create an owner-approved clean implementation baseline or isolated worktree/branch only after the disposition matrix is approved.
- [ ] Preserve a deployable artifact of commit `1c9a7b0` plus the current production configuration.
- [ ] Confirm no Phase 2 commit includes the unfinished intake workstream or bulk asset directories unintentionally.
- [ ] Name engineering, design/content, SEO/growth, conversion/operations, and phase-approval owners.

## Required hosting confirmation

- [ ] Identify the Cloudflare account/project serving `velariss.co`.
- [ ] Confirm Pages vs Workers Static Assets vs another Cloudflare-proxied origin.
- [ ] Confirm Git integration or upload process, production branch, build command/output directory, environment bindings, preview domains, logs, and rollback permissions.
- [ ] Decide the canonical host policy for apex and `www`.
- [ ] Confirm ownership of current live `robots.txt` and why it references `casuallyallure.com`.
- [ ] Approve a non-production preview/spike environment.

## Required Phase 2 test design

- [ ] Route/status/content-type/direct-refresh matrix exists.
- [ ] Legacy concept/query/fragment tests are ready.
- [ ] `/api/*` page-fallback exclusion test is ready.
- [ ] Mobile navigation keyboard/focus/screen-reader acceptance is defined.
- [ ] Metadata/canonical/robots/sitemap/404 tests are defined.
- [ ] Visual comparison uses Phase 0 captures.
- [ ] Rollback procedure and stop conditions have named owners.

## Decisions that may remain pending until later gates

The five owner-questionnaire answers should be collected now, but some do not block the narrow Phase 2 infrastructure spike:

- Priority industries block Phase 5A publication, not the Phase 2 spike.
- Real inquiry destination/backend blocks Phase 3 cutover.
- Privacy/legal ownership blocks Phase 3 production collection.
- Public proof approval blocks Phase 4 client/case-study publication.
- Package commercial approval blocks a future commercial change, not compatibility preservation.

## Phase 2 authorization statement

Phase 2 begins only after the owner explicitly approves this package and authorizes implementation. Approval of Phase 1 documentation is not implicit permission to stage, commit, clean, deploy, add routing, or alter the current website.

