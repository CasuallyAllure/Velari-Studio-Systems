# Velari Phase 1 architecture and repository reconciliation package

Version: 1.0  
Status: complete; awaiting owner approval  
Prepared: 2026-08-02  
Scope: documentation and architecture only.

## Decision summary

- The approved audit and Phase 0 architecture supersede the mascot-led v4 plans for the main website.
- Mascot work remains preserved as historical/experimental material.
- The unfinished AI/guided-intake rewrite remains a separate workstream.
- Preferred Work route: `/work/[slug]`.
- Initial navigation: Work, Industries, Services, About, Start.
- Products and Resources are architected now but withheld from initial navigation until content gates pass.
- Current offer IDs, names, and prices remain compatible; future commercial approval is pending.
- The theme switcher remains unchanged until the Homepage Reduction phase.
- Recommended rendering model: static-first hybrid, conditionally targeted to the observed Cloudflare Pages/Workers environment after control-plane confirmation.
- No public implementation or existing worktree state was changed in Phase 1.

## Package index

- [Master roadmap v1](../../velari-master-roadmap-v1.md)
- [Authority and supersession](./01-authority-and-supersession.md)
- [Worktree disposition matrix](./02-worktree-disposition-matrix.md)
- [Rendering and hosting ADR](./03-rendering-and-hosting-adr.md)
- [Route and navigation map](./04-route-and-navigation-map.md)
- [Canonical content schemas](./05-canonical-content-schemas.md)
- [Legacy compatibility matrix](./06-legacy-compatibility-matrix.md)
- [Migration slices and acceptance gates](./07-migration-slices-and-gates.md)
- [Phase 2 entry criteria](./08-phase-2-entry-criteria.md)
- [Homepage clutter-reduction architecture](./09-homepage-clutter-reduction.md)
- [Owner questionnaire](./10-owner-questionnaire.md)
- [Owner approval brief](./11-owner-approval-brief.md)

## Authority

After owner approval, this package and the master roadmap govern execution. Phase 0 remains the authoritative current-state evidence. Earlier plans remain evidence or domain-specific references only to the extent documented in the authority table.

## Explicit exclusions

Phase 1 does not add routing, activate redirects, restructure the homepage, change navigation, move content, change forms, modify `/api/intake`, remove the theme switcher, edit public assets, alter metadata, or change deployment configuration.
