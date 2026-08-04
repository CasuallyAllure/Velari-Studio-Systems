# Authority and supersession table

## Governing hierarchy

When documents conflict, use this order:

1. Current explicit owner decisions dated 2026-08-02.
2. Approved luxury content/IA audit and architectural/business-evolution constraints.
3. Phase 0 baseline for factual current-state evidence.
4. Approved master roadmap v1 and Phase 1 package for future execution.
5. Domain-specific plans only within their retained scope.
6. Historical handoffs, prototypes, and asset experiments as reference only.

No lower-level asset plan can add a homepage section, change canonical ownership, or override conversion/route compatibility.

## Plan register

| Document | Original purpose | Current authority | Decision |
|---|---|---|---|
| Approved luxury content/IA audit (attachment; findings reflected in Phase 0) | Diagnose clutter, premium experience, navigation, conversion, scalable IA | Governing architectural intent | **Authoritative** |
| Phase 0 package, `docs/internal/phase-0-baseline/*` | Current routes, content, components, assets, conversion, visual/performance/a11y/SEO/analytics evidence | Governing current-state evidence and safety constraints | **Authoritative** |
| `docs/velari-master-roadmap-v1.md` | Versioned multi-phase execution program | Governing future sequence after owner approval | **Proposed authoritative** |
| Phase 1 package | ADR, routes, schemas, compatibility, migration gates | Governing architecture after owner approval | **Proposed authoritative** |
| `docs/quote-engine-rules-v1.md` | Resolved quote identities, prices, calculation and backend rules | Canonical compatibility source for current Offer IDs/rules | **Retained with caveat:** future commercial approval pending; no homepage-placement authority |
| `docs/velariss-site-implementation-plan-v1.md` | Cinematic site plus eight-part estimate builder and backend | Reference for future Start/estimate requirements | **Partially retained:** backend/estimate concepts only; homepage prominence/order superseded |
| `docs/industry-showcase-production-plan.md` | Nine concept briefs and asset quality gates | Provenance/reference for current concepts and future Work migration | **Partially retained:** concept facts/assets; full homepage directory superseded |
| `docs/sf-scroll-world-photoreal-v2-plan.md` | Current Bay Bridge hero asset plan and generation record | Current hero provenance and asset-production evidence | **Retained within hero asset scope**; no IA authority |
| `docs/sf-scroll-world-hero-master-plan.md` | Earlier Golden Gate hero direction | Historical source; explicitly superseded by photoreal v2 | **Historical** |
| `docs/redesign-v4-master-plan.md` | Mascot-led navy/lime main-site direction | Conflicts with current site and approved audit | **Superseded for main website**; mascot artifacts preserved |
| `docs/redesign-v4-direction.md` | Detailed mascot-led v4 page/visual architecture | Same conflict | **Superseded for main website**; asset ideas historical/experimental |
| `docs/mascot-3d-pipeline-v2.md` | Credit-conscious mascot generation/rigging gate | Mascot production history | **Preserved experimental workstream**; no main-site roadmap authority |
| `docs/claude-code-handoff.md` | Earlier `.dc.html` powder/3D art-direction plan | Frontend choice and page direction superseded | **Historical** |
| `docs/blueprint-positioning-v1.md` | Repair old `.dc.html` positioning/stack section | Targets a non-production design reference | **Historical** |
| `HANDOFF.md` | July 10 old `.dc.html` stack handoff | Contains obsolete claims about no upstream/live URL and unresolved frontend | **Historical; factually superseded** |
| `assets-3d/README.md` | Old stack pipeline documentation | Technical history for those assets | **Retained reference only** |
| `design-reference/README.md` | Clarify `.dc.html` files as design prototypes | Consistent with current React target | **Retained operational reference**, staged move still awaits disposition approval |
| `README.md` | Repository usage/development overview | Operational documentation; currently modified | **Evidence, not architecture authority**; hosting claims require reconciliation |
| `DEPLOYMENT.md` | Multi-provider deployment notes | Operational proposal; currently modified, Vercel-first | **Not authoritative for actual hosting** until control plane is confirmed |

## Resolved conflicts

- **Main-site hero:** current SF cinematic may remain as the one signature experience; the mascot-led occupational hero is not the current redesign direction.
- **Frontend:** Vite + React + TypeScript under `src/` is the product target; `.dc.html` files are historical design references.
- **Homepage estimator:** detailed qualification belongs on `/start`, not permanently on the homepage.
- **Concepts:** preserved as Work/Industry proof, not nine equal unframed portfolio sites.
- **Offer data:** current names/prices/IDs remain compatible; prominence and future commercial approval are separate decisions.
- **Products/Resources:** architected as durable hubs, withheld from initial navigation until sufficient content exists.

