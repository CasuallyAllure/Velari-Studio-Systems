# Redirect and compatibility manifest

No redirect in this manifest is active. Destinations are architectural targets and must exist, render correctly, carry approved metadata, and pass direct-load tests before activation.

## Page and query compatibility

| Source | Future destination | Type / handler | Query-aware | Canonical transition | Phase | Removal condition | Required test |
|---|---|---|---|---|---|---|---|
| `/concepts/property/index.html` | `/work/concepts/property` | Server 301 | No | New page self-canonical; legacy excluded from sitemap | Work migration | Keep redirect indefinitely | Old URL → one hop → 200 correct Work record |
| `/concepts/studio/index.html?scene=dental` | `/work/concepts/dental` | Server/edge 301 | Yes | Same | Work migration | Indefinite | Query maps to Dental, preserves no unrelated params by default |
| Same, `restaurant` | `/work/concepts/restaurant` | 301 | Yes | Same | Work migration | Indefinite | Correct record |
| Same, `trades` | `/work/concepts/trades` | 301 | Yes | Same | Work migration | Indefinite | Correct record |
| Same, `industrial` | `/work/concepts/industrial` | 301 | Yes | Same | Work migration | Indefinite | Correct record |
| Same, `logistics` | `/work/concepts/logistics` | 301 | Yes | Same | Work migration | Indefinite | Correct record |
| Same, `retail` | `/work/concepts/retail` | 301 | Yes | Same | Work migration | Indefinite | Correct record |
| Same, `research` | `/work/concepts/research-labs` | 301 | Yes | Same | Work migration | Indefinite | Correct record and explicit old→new slug map |
| Same, `construction` | `/work/concepts/construction` | 301 | Yes | Same | Work migration | Indefinite | Correct record |
| `/concepts/studio/index.html` with missing/unknown scene | `/work/concepts/dental` **pending owner decision** or a concept index | 302 until intent validated, then 301 | Yes | Avoid canonicalizing invalid variants silently before classification | Work migration | After traffic/log and intent review | Missing, empty, case variants, encoded values, unknown values |

The route format `/work/concepts/[slug]` is the working target from the approved audit. If the final Work model uses `/work/[slug]`, update destinations before activation; never introduce both as competing canonicals.

## Fragment compatibility

Fragments cannot be server-redirected because they are not sent in HTTP requests. Compatibility must be implemented by keeping alias elements or a minimal client fragment mapper on `/` during the transition.

| Legacy fragment | Future canonical experience | Compatibility behavior | Deployment | Removal condition | Test |
|---|---|---|---|---|---|
| `#hero` | Homepage top | Retain target/alias | Homepage migration | Indefinite or evidence of no external use | Direct load focuses/positions expected region |
| `#selected-systems` | Homepage curated Work proof | Retain alias | Homepage migration | Traffic and backlink review | No double scroll/layout jump |
| `#industry-concepts` | `/industries` | On legacy root, retain alias and visible path to Industries; do not force fragment navigation across routes without consent | Industries/homepage rollout | Stable route adoption and traffic review | Root fragment still resolves; canonical route works |
| `#what-we-build` | `/services` | Retain alias on root during route rollout | Services rollout | Same | Header/old links remain functional |
| `#packages` | Offers/Start context | Retain alias until offer destination approved | Services/Start | Offer migration and analytics verified | Hero legacy CTA and direct fragment |
| `#how-it-works` | `/start` and/or About process | Preserve package-context intake landing until canonical Start works | Start rollout | Verified conversion parity | Package selection retains context |
| `#contact` | `/start` | Retain contact alias/direct methods during conversion migration | Start rollout | Confirmed Start + fallback contact verified | Header CTA, direct fragment, mail/tel |

Property concept internal fragments `#home`, `#residences`, `#management`, `#portal`, and `#availability` must remain operable until the page redirects. The broken `#neighborhood` link is a baseline defect, not a redirect target. Shared studio `href="#"` demo links do not express meaningful destinations; preserve page behavior until concept replacement, then make each action deliberately functional or non-interactive.

## Utility and error routing

- `/privacy`, `/legal`, and `/credits` currently soft-404 to the homepage. They are future canonical utility routes, not legacy redirects.
- `/robots.txt` and `/sitemap.xml` require correct files/responses, not redirects.
- Unknown paths require a real 404 status/page after rendering strategy selection.
- Preserve `/api/intake` separately from page routing. Page fallback must never consume API requests.

## Activation gate

For each record: destination deployed first; approved canonical metadata; source/destination status tested in production-shaped hosting; one-hop response; query and fragment cases automated; analytics attribution preserved; search console/sitemap updated; rollback can disable the redirect without deleting either implementation.

