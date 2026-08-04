# ADR-001: Rendering and hosting architecture

Status: proposed / conditional acceptance  
Date: 2026-08-02  
Decision owner: Velari owner + engineering  
Scope: future route/runtime output, not Phase 1 implementation.

## Decision

Adopt a **static-first hybrid architecture**:

- statically generate or pre-render canonical marketing routes;
- hydrate only interactions that need client state;
- use an isolated edge/server function boundary for `/api/*` and verified Start submission;
- do not introduce general request-time SSR unless a future product or authenticated surface proves it necessary;
- retain the existing Vite + React + TypeScript application unless the Phase 2 implementation spike demonstrates that a narrowly scoped build adapter cannot meet the static-route requirements;
- target Cloudflare Pages/Workers semantics conditionally, pending confirmation of the actual Cloudflare project/account and deployment method.

This chooses the output/runtime model. It does not authorize a framework migration, routing implementation, or hosting change in Phase 1.

## Confirmed repository evidence

- Product implementation is Vite + React + TypeScript with no router.
- `package.json` has build, lint, and preview scripts only; no SSG/SSR adapter or automated tests.
- No `vercel.json`, `netlify.toml`, `wrangler.toml`, Pages configuration, GitHub deployment workflow, `.vercel` link, or `.netlify` link is present.
- `DEPLOYMENT.md` is Vercel-first but also mentions Netlify/Cloudflare; its current edits assume Vercel serverless `api/intake.ts`.
- `api/intake.ts` is untracked and Vercel-shaped; `vite.config.ts` mounts a local development twin.
- GitHub Pages is not configured for the connected repository, and no GitHub deployment records were returned.

## Confirmed live observations

Read-only probes of `https://velariss.co` on 2026-08-02 found:

- Cloudflare authoritative nameservers and Cloudflare edge response headers.
- Root returns HTTP 200 with the current Velari title.
- `/concepts/property/index.html` returns 308 to `/concepts/property/`; studio `index.html?scene=dental` returns 308 to `/concepts/studio/?scene=dental`.
- Unknown routes return the homepage with HTTP 200.
- `/api/intake` GET returns homepage HTML with HTTP 200 rather than an API 405/JSON response.
- `/robots.txt` returns a real text file live, but its sitemap points to `https://casuallyallure.com/sitemap.xml`, not Velari.
- `www.velariss.co` did not resolve.

These behaviors closely match Cloudflare Pages static HTML normalization and default SPA fallback, but response/DNS evidence cannot reveal the private project, build command, origin, account, deployment integration, or whether a Worker sits in front. The control plane remains an owner-confirmation item.

Cloudflare documents that Pages redirects `folder/index.html` to the folder URL and, without a top-level `404.html`, treats the project as an SPA and routes unknown paths to `/`: [Serving Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/). This matches the observed behavior. Cloudflare also supports static Vite deployments and Pages Functions/Workers for server logic: [Pages overview](https://developers.cloudflare.com/pages/), [Pages Functions](https://developers.cloudflare.com/pages/functions/get-started/).

## Requirements driving the decision

- Unique, server-visible metadata and canonical URLs for Work, Industries, Services, Products, Resources, Campaigns, About, and Start.
- Correct 200/301/308/404/405 behavior on direct requests and refresh.
- Fast CDN delivery for mostly static premium marketing content and large media.
- Query-aware legacy concept migration.
- Isolated, secret-safe, rate-limited, idempotent Start submission.
- Independent product documentation/support trees in the future.
- Campaign and local-SEO landing pages without homepage duplication.
- Incremental deployment and rollback without maintaining two permanent content systems.

## Options considered

| Option | Strengths | Deficiencies | Decision |
|---|---|---|---|
| Keep client-only SPA | Least short-term code change; preserves current behavior | Soft 404s, weak direct metadata, query/canonical ambiguity, poor scalable campaign/SEO model | Rejected as final architecture |
| Pure SSG/static export | Excellent metadata, caching, direct routes, low operational load | Needs separate API/runtime and careful preview/rebuild workflow | Retained as marketing-route foundation |
| General SSR application | Dynamic control and per-request rendering | Higher runtime/maintenance surface; unnecessary for mostly static content; broad migration risk | Rejected initially; reconsider only for proven future need |
| Static-first hybrid | SSG benefits for marketing plus isolated dynamic Start/API | Requires build adapter, route manifest, and edge-function deployment discipline | **Recommended** |

## Proposed deployment shape

```text
Cloudflare edge
├── Static generated pages and assets
│   ├── /
│   ├── /work/*
│   ├── /industries/*
│   ├── /services/*
│   ├── /about
│   ├── /start initial document
│   └── future products/resources/campaigns/utilities
├── Explicit 404.html / status handling
├── Query-aware legacy Worker/Function for studio scene redirects
└── /api/* edge/server functions
    └── validated Start/intake services
```

If Pages Functions are used, restrict their invocation routes so static assets/pages remain static. Cloudflare documents `_routes.json` for controlling this boundary: [Functions routing](https://developers.cloudflare.com/pages/functions/routing/).

Cloudflare static `_redirects` does not support query-parameter matching, so the eight `?scene=` migrations require Worker/Function logic rather than a plain redirect file: [Pages redirects](https://developers.cloudflare.com/pages/configuration/redirects/).

## Consequences

Positive:

- Canonical pages arrive as useful HTML without waiting for client rendering.
- Most requests stay inexpensive/cacheable/static.
- Start secrets and persistence are separated from browser bundles.
- A true 404 disables the current default SPA soft-404 behavior.
- Products can later add server/runtime depth without forcing all marketing pages into SSR.

Costs/risks:

- Phase 2 must select and prove a Vite-compatible pre-render/SSG mechanism or justify a narrowly scoped framework change.
- Content publication triggers builds unless a later on-demand/revalidation layer is introduced.
- Query redirects and API routes require tested edge code.
- Cloudflare account/project ownership, deployment method, environment bindings, logs, rollback access, and domain configuration must be confirmed.
- `www` policy and the incorrect live robots sitemap require deliberate correction in Phase 2, not Phase 1.

## Phase 2 implementation spike

Before broad route work, prove on a non-production preview:

1. `/`, one parameterized Work route, one Industry route, `/start`, and `/404` generate distinct HTML and metadata.
2. Direct load/refresh/status codes are correct.
3. Existing `/concepts/*` pages remain directly reachable.
4. `/api/intake` never falls through to HTML.
5. A query-aware test redirect maps one `scene` without affecting unrelated query parameters/routes.
6. Rollback restores the prior static artifact.
7. Build time and local authoring remain practical.

## Conditions before ADR becomes accepted

- Owner identifies the Cloudflare account/project and deployment integration.
- Engineering confirms whether this is Cloudflare Pages, Workers Static Assets, another origin proxied by Cloudflare, or a managed hosting product.
- Preview deployment access, environment ownership, logs, and rollback controls are verified.
- The Phase 2 spike demonstrates the static-first hybrid output without public cutover.

