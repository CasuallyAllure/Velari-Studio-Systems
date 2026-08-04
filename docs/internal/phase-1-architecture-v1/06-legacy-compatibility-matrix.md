# Legacy-to-canonical compatibility matrix

Status: required future behavior; no redirect or compatibility code is active from Phase 1.

## Page and query routes

Current live hosting automatically normalizes folder `index.html` URLs to trailing-slash forms. Both written and normalized forms must be covered.

| Current source | Current behavior | Future canonical | Compatibility mechanism | Activation phase | Removal condition |
|---|---|---|---|---|---|
| `/` | React homepage | `/` | Preserve | All | Never |
| `/concepts/property/index.html` | Live 308 → `/concepts/property/` | `/work/northline-property-concept` | Destination-first query-independent 301/308 from both legacy variants | Phase 4 | Redirect remains indefinitely |
| `/concepts/property/` | Property static HTML | Same | Same | Phase 4 | Indefinite |
| `/concepts/studio/index.html?scene=dental` | Live 308 → slash form | `/work/arc-dental-concept` | Query-aware edge redirect | Phase 4 | Indefinite |
| `/concepts/studio/?scene=dental` | Shared scene renderer | Same | Same | Phase 4 | Indefinite |
| Studio scene `restaurant` | Shared renderer | `/work/embers-restaurant-concept` | Query-aware edge redirect | Phase 4 | Indefinite |
| Studio scene `trades` | Shared renderer | `/work/copperline-trades-concept` | Query-aware edge redirect | Phase 4 | Indefinite |
| Studio scene `industrial` | Shared renderer | `/work/forgeworks-industrial-concept` | Query-aware edge redirect | Phase 4 | Indefinite |
| Studio scene `logistics` | Shared renderer | `/work/northbound-logistics-concept` | Query-aware edge redirect | Phase 4 | Indefinite |
| Studio scene `retail` | Shared renderer | `/work/atelier-retail-concept` | Query-aware edge redirect | Phase 4 | Indefinite |
| Studio scene `research` | Shared renderer | `/work/vanta-research-labs-concept` | Query-aware edge redirect | Phase 4 | Indefinite |
| Studio scene `construction` | Shared renderer | `/work/groundline-construction-concept` | Query-aware edge redirect | Phase 4 | Indefinite |
| Studio URL with missing/empty/invalid `scene` | Falls back client-side to Dental | Dental Work or `/work` index, owner to approve before activation | Temporary 302 while intent/traffic is assessed; then approved permanent rule | Phase 4 | Rule retained; invalid values tested |
| `/api/intake` | Local dev POST handler; live GET currently falls through to homepage HTML | `/api/intake` compatibility endpoint or versioned internal successor | Explicit edge/function route before page fallback; retain request/response adapter | Phase 2/3 | Only after every client is migrated and deprecation window closes |
| Unknown page path | Homepage HTTP 200 soft 404 | Real 404 | Top-level 404/static or edge status | Phase 2 | N/A |
| `/robots.txt` | Live text file points to wrong `casuallyallure.com` sitemap; local preview fell back to HTML | Correct Velari robots | Real static text response | Phase 2 | N/A |
| `/sitemap.xml` | No repository sitemap/current local fallback | Correct canonical route sitemap | Generated static XML | Phase 2 onward | N/A |
| `/privacy`, `/legal`, `/credits` | Current local/live fallback behavior, not real pages | Same paths as real utilities | Publish destinations; never redirect to homepage | Phase 2/3 | N/A |

Query-aware logic must explicitly preserve only approved attribution parameters. It must not forward arbitrary query data into canonical Work URLs or leak PII.

## Homepage fragments

Fragments are browser-only and cannot be handled by server redirects.

| Fragment | Current owner | Future meaning | Compatibility | Earliest reconsideration |
|---|---|---|---|---|
| `#hero` | Hero | Homepage hero | Keep target/alias | Never unless evidence supports removal |
| `#selected-systems` | Cinematic tunnel | Curated Work proof region | Keep alias at closest proof region | After Phase 6 monitoring |
| `#industry-concepts` | Nine-concept selector | Industry preview/link | Keep alias plus visible `/industries` path | After Phase 6 monitoring |
| `#what-we-build` | Services orbit | Capability preview/link | Keep alias plus visible `/services` path | After Phase 6 monitoring |
| `#packages` | Package tabs | Offer/Start preview | Keep alias until Offer migration and analytics parity | After Phase 6/5B |
| `#how-it-works` | Process + intake | Process/Start preview | Keep alias and package context handoff | After Phase 3/6 |
| `#contact` | Mailto form | Final Start invitation/direct contact | Keep alias through conversion parallel run | After Phase 3/6 monitoring |

Direct fragment tests must verify scroll position, fixed-header offset, focus behavior, and no layout jump after media loads.

## Concept internal links

| Current behavior | Required treatment |
|---|---|
| Property `#home`, `#residences`, `#management`, `#portal`, `#availability` | Preserve until canonical Work redirect activates; equivalent content/visual evidence exists in Work record |
| Property `#neighborhood` | Known broken baseline link; do not make it a redirect requirement. Resolve intentionally during Work migration. |
| Shared studio header/mobile/CTA links use `href="#"` | Known demonstration-only behavior. Preserve current pages until migration; canonical Work page must use real Velari/Start routes or non-interactive labels. |
| Concepts omit persistent Velari navigation | Known defect. Canonical Work pages must restore global navigation and Start/return path before redirect activation. |

## Conversion and contact compatibility

| Surface/contract | Current evidence | Preservation rule | Canonical migration |
|---|---|---|---|
| Header consult CTA | Scrolls to `#contact` | Keep until `/start` is verified; later route with fragment alias intact | `/start` |
| Hero CTA | Scrolls to `#packages` | Keep until homepage/Offer migration | Contextual `/start` or Work path |
| Package CTA | Emits package ID through in-memory `intakeBus`, scrolls to `#how-it-works` | Preserve IDs and context; do not remove event bus before durable replacement passes | `/start?offer=[offer_id]` |
| Guided live mode | POSTs `/api/intake` for generated turns | Keep separate workstream; endpoint isolation and errors must remain honest | Interface over canonical Qualification/Submission |
| Guided fallback | Local deterministic engine; done state does not submit | Preserve current behavior until replacement; never reinterpret done as confirmed | Same saved qualification plus explicit submit |
| Questionnaire | Four steps; mock DB/localStorage, mock email, mock analytics | Keep during parallel validation; map every field; do not claim external persistence | Canonical Start schema/backend |
| Final contact form | Encoded `mailto:` handoff | Keep as explicit fallback until verified Start; no silent removal | Start submission + direct email fallback |
| Footer email/phone | `mailto:` and `tel:` | Preserve globally | Footer/direct contact |
| Current contact facts | `info@velariss.co`, `(415) 988-0944` | Preserve via global settings | Organization record |

## Field and taxonomy compatibility

| Legacy source | Values/contract | Canonical destination |
|---|---|---|
| Showcase `concepts` | Property, Dental, Restaurant, Trades, Industrial, Logistics, Retail, Research Labs, Construction | Work IDs plus Industry relationships |
| Studio `scene` keys | `dental`, `restaurant`, `trades`, `industrial`, `logistics`, `retail`, `research`, `construction` | Explicit Work redirect map; never infer from display copy |
| Guided `INDUSTRY_CHIPS` | Restaurant/café, Salon/studio, Gym/fitness, Trades/home services, Real estate/property, Health/wellness, Shop/online store, Something else | Industry alias table; “other” remains qualification option, not Industry record |
| Questionnaire `industryOptions` | Property Management, Restaurant/Hospitality, Gym/Studio, Dental/Medical, Law Firm, Trades/Transport, E-commerce, Technology/SaaS, Professional Services, Other | Alias table; unmapped categories remain qualification classifications until full Industry pages exist |
| Services orbit chapters | Six current labels | Six Service IDs in schema registry |
| Contact inquiry types | Eight service-like reasons | Inquiry-reason/Service mapping, not copied Service taxonomy |
| Questionnaire goals | Twelve goals | Goal taxonomy mapped many-to-many to Services/capabilities |
| Guided systems/extras | Industry tools, AI options, brand/content needs | Qualification-option IDs mapped to Service/capability/integration records |
| Theme | Three themes; `velari-theme`; required DB field | Preserve stored values; future Start treats theme as optional metadata with backward default |

No legacy label is deleted when the canonical record is introduced. Store alias and source-system mappings so analytics/history and in-progress sessions remain interpretable.

## Offers and pricing

Preserve:

- `signature_landing` — Signature Landing — `$999` fixed.
- `business_platform` — Business Platform — from `$2,999`.
- `ai_integrated_platform` — AI-Integrated Platform — from `$4,999`.
- Current catalog item IDs, pricing modes, cadence distinctions, 25% estimated deposit, 14-day validity, and calculation rules.

Future commercial approval is pending. Any approved rename/reprice creates a new effective Offer version and alias/history; it does not overwrite old submitted estimates.

## Analytics compatibility

| Current event | Current meaning | Future mapping |
|---|---|---|
| `intake_submitted` | Questionnaire client flow completed after mock/local operations; not server-confirmed | Preserve historical label/definition. Do not merge with confirmed leads. Optionally emit a legacy-comparable client-complete event during a measured transition. |

New future events distinguish `intake_started`, `intake_submission_attempted`, `intake_submission_confirmed`, and `intake_submission_failed`. No event contains PII or free text.

## Assets, themes, and behavior

- Preserve every current referenced asset URL until a reference/caching/direct-load migration passes. The exhaustive source is Phase 0 `generated/asset-manifest.tsv`.
- Preserve desktop/mobile hero, tunnel, service, and concept media pairings and posters.
- Preserve OSM/USGS attribution and any newly discovered license requirements.
- Preserve all three theme IDs and `velari-theme` storage through the approved theme decision.
- Preserve reduced-motion behavior, then improve semantic completeness without removing the fallback.
- Preserve responsive concept layouts and current direct loading.
- Do not delete `DemoSection` or orphan-candidate assets based only on static searches.

## Compatibility test rule

Every record in this document receives an automated or manual regression case before its migration phase. A redirect or legacy implementation remains until the destination is deployed, correct, measured, monitored, and recoverable.

