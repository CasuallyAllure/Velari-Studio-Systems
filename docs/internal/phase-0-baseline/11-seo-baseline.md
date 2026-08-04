# SEO and metadata baseline

## Current rendering and request behavior

- `/` is a client-rendered React SPA from `index.html`; no router is configured.
- Concept pages are static HTML. Property content is present in HTML. Shared studio content is injected by `studio.js` based on `scene` query state.
- Vite production preview falls back to the homepage document for unknown paths with HTTP 200. This creates soft 404s.
- No redirect behavior is currently configured in the inspected application files.

## Metadata inventory

| Destination | Title/description | Canonical | Open Graph/social image | Structured data | Indexability risk |
|---|---|---|---|---|---|
| `/` | `Velari Systems \| Websites That Work Like Apps`; one meta description in `index.html` | None | None | None | Indexable but weak share/canonical control |
| Property concept | Unique title and description in property HTML | None | None | None | Separately indexable concept/demo; future Work duplication risk |
| Studio concept queries | Initial HTML title `Velari Industry Concept` and generic description; JS changes title after load | None | None | None | Eight query variants share server metadata and one document; duplicate/crawl ambiguity |
| Unknown/utility URLs | Homepage title/description due fallback | None | None | None | HTTP 200 soft-404 and duplicate homepage indexing |

No robots meta directive was found. `/robots.txt` and `/sitemap.xml` both returned homepage HTML with HTTP 200 in preview. No valid robots file, sitemap, canonical tags, `og:*`, Twitter Card tags, JSON-LD, social preview images, or real 404 page were found.

## Fragment and query limitations

- Homepage fragments are not separate indexable documents. They cannot carry unique metadata, canonical ownership, or search intent despite representing services, industries, packages, process, and contact.
- Shared studio queries are content variants, but their initial server HTML is generic. Crawlers and link unfurlers that do not execute JS receive indistinguishable metadata.
- An invalid or missing `scene` silently renders Dental client-side, adding duplicate URL variants.
- Property and studio paths include implementation filenames (`index.html`) that should remain compatible even after friendlier canonical routes exist.

## Direct probes

| Request | Observed preview result |
|---|---|
| `/` | 200 homepage HTML |
| `/concepts/property/index.html` | 200 property HTML |
| Each supported studio `?scene=` | 200 shared studio HTML |
| `/privacy`, `/legal`, `/credits` | 200 homepage HTML |
| `/robots.txt`, `/sitemap.xml` | 200 homepage HTML |
| Arbitrary unknown path | 200 homepage HTML |
| Direct referenced MP4 | 200 `video/mp4` |

## Requirements for later rendering decision

Phase 0 does not choose CSR, SSR, SSG, pre-rendering, or hybrid routing. The chosen system must support: unique server-visible metadata per canonical route; real status codes; query/legacy redirects; stable canonical tags; sitemap/robots; share images; structured organization/service/product/case-study data where truthful; campaign landing pages; direct refresh; and independent Product documentation/support surfaces.

Before deindexing or redirecting concepts, decide whether they are public portfolio proof, private demonstrations, or campaign assets. That classification controls canonical destination, metadata, sitemap inclusion, and robots policy.

