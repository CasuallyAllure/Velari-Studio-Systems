# Velari Phase 0 baseline package

Status: complete baseline, dated 2026-08-02 UTC. Scope: documentation, inventory, measurement, and release preparation only.

This directory is the non-public record of the current Velari production-shaped experience before architectural refactoring. Phase 0 introduced no public route, content, component, form, asset, analytics, or visual behavior changes.

## Package index

1. [Executive summary](./01-executive-summary.md)
2. [Current route inventory](./02-route-inventory.md)
3. [Homepage section inventory](./03-homepage-section-inventory.md)
4. [Conversion-system map](./04-conversion-system-map.md)
5. [Content-source inventory](./05-content-source-inventory.md)
6. [Component inventory](./06-component-inventory.md)
7. [Asset inventory](./07-asset-inventory.md)
8. [Visual baseline index](./08-visual-baseline-index.md)
9. [Performance baseline](./09-performance-baseline.md)
10. [Accessibility baseline](./10-accessibility-baseline.md)
11. [SEO baseline](./11-seo-baseline.md)
12. [Analytics event map](./12-analytics-event-map.md)
13. [Content ownership register](./13-content-ownership-register.md)
14. [Redirect manifest](./14-redirect-manifest.md)
15. [Naming and slug conventions](./15-naming-and-slug-conventions.md)
16. [Release and rollback procedure](./16-release-and-rollback.md)
17. [Regression checklist](./17-regression-checklist.md)
18. [Risk register](./18-risk-register.md)
19. [Phase 1 readiness assessment](./19-phase-1-readiness.md)

## Machine-readable evidence

- `generated/asset-manifest.tsv` and `.json`: exhaustive static asset inventory.
- `generated/asset-summary.json`: counts and byte totals.
- `generated/duplicate-assets.json`: byte-identical duplicate groups.
- `generated/responsive-metrics.json`: viewport and section measurements.
- `generated/concept-metrics.json`: concept-page responsive measurements.
- `generated/focusable-order-inventory.json`: DOM focusable candidates.
- `generated/keyboard-focus-desktop.json`: browser automation keyboard observation.
- `generated/scroll-runtime-observation.json`: cinematic scroll observation.
- `lighthouse/*.report.{json,html}`: repeatable desktop and mobile reports.
- `screenshots/*.png`: current visual-state captures.
- `tools/collect-baseline.mjs`: read-only asset collection tool.

## Interpretation boundaries

- “Orphan candidate” means no static source reference was found. It does **not** authorize deletion; dynamic, generated, experimental, source, and design-reference uses require manual review.
- Browser screenshots were captured from the local production build. API behavior on the deployed host may differ; the repository and preview behavior are both documented.
- Lighthouse mobile returned `NO_LCP`; the score is intentionally reported as unavailable rather than inferred.
- No real inquiry was submitted during baseline collection.

