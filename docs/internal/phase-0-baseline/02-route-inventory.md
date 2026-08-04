# Current route and URL inventory

## Rendering model

`src/main.tsx` mounts one React application from `src/App.tsx`; no client router is installed or configured. Vite serves `public/` verbatim. The concept experiences are independent static documents. The production-preview server uses SPA fallback for unmatched URLs, so nonexistent paths return the homepage HTML with HTTP 200.

## First-party destinations

| Current URL/pattern | Owner | Visitor entry | Direct load | Indexability / metadata | Active | Intended future canonical | Compatibility | Risk |
|---|---|---|---|---|---|---|---|---|
| `/` | `src/App.tsx` | Logo, root request | Yes | 200; unique title/description; no canonical/OG/schema | Yes | `/` | Preserve | High |
| `/concepts/property/index.html` | `public/concepts/property/index.html` + `property.css` | Property “View concept” | Yes | 200; unique title/description; no canonical/OG | Yes | `/work/concepts/property` or approved Work record | Later 301 after canonical launch | High |
| `/concepts/studio/index.html?scene=dental` | `public/concepts/studio/*` | Dental “View concept” | Yes | 200; generic initial metadata; JS changes title | Yes | `/work/concepts/dental` | Query-aware 301 later | High |
| Same pattern, `scene=restaurant` | Same | Restaurant concept | Yes | Same duplicate-indexing risk | Yes | `/work/concepts/restaurant` | Query-aware 301 later | High |
| Same pattern, `scene=trades` | Same | Trades concept | Yes | Same | Yes | `/work/concepts/trades` | Query-aware 301 later | High |
| Same pattern, `scene=industrial` | Same | Industrial concept | Yes | Same | Yes | `/work/concepts/industrial` | Query-aware 301 later | High |
| Same pattern, `scene=logistics` | Same | Logistics concept | Yes | Same | Yes | `/work/concepts/logistics` | Query-aware 301 later | High |
| Same pattern, `scene=retail` | Same | Retail concept | Yes | Same | Yes | `/work/concepts/retail` | Query-aware 301 later | High |
| Same pattern, `scene=research` | Same | Research Labs concept | Yes | Same | Yes | `/work/concepts/research-labs` | Query-aware 301 later | High |
| Same pattern, `scene=construction` | Same | Construction concept | Yes | Same | Yes | `/work/concepts/construction` | Query-aware 301 later | High |
| Same pattern without/invalid `scene` | `studio.js:164-165` | Unlinked/manual | Yes; falls back to dental | Generic server metadata; ambiguous duplicate | Deployable | Dental concept canonical | Query-aware canonical/redirect | High |
| `/api/intake` | `api/intake.ts`, `server/intake/handler.ts` | AI chat POST | Host-dependent; 404 on Vite preview | Non-page | Active code path | Stable internal API or versioned successor | Preserve contract until migrated | Critical |
| Any unknown path, including `/privacy`, `/legal`, `/credits` | SPA fallback | Manual/external link | Yes, but returns homepage | 200 soft 404 with homepage metadata | Misleading fallback | Real page or real 404 | Server behavior must change later | High |
| `/robots.txt` | SPA fallback; no file | Crawler | Returns homepage HTML | Invalid robots response | Missing | `/robots.txt` | Add in SEO phase | High |
| `/sitemap.xml` | SPA fallback; no file | Crawler | Returns homepage HTML | Invalid sitemap response | Missing | `/sitemap.xml` | Add in SEO phase | High |

There are no current first-party Privacy, Legal, Credits, About, Work, Industries, Services, Products, Resources, Start, or Case Study page implementations. The map/elevation credit exists only in the footer. No hidden HTML page beyond the two concept documents was found in deployable sources.

## Homepage fragments and internal targets

| Fragment | DOM owner | Reached from | Direct fragment load | Future owner | Requirement | Risk |
|---|---|---|---|---|---|---|
| `#hero` | `HeroSection.tsx` | Initial page | Yes | Homepage | Preserve during homepage migration | Medium |
| `#selected-systems` | `ShowcaseTunnelSection.tsx` | Scroll only | Yes | Homepage proof preview | Preserve alias until traffic/log review | Medium |
| `#industry-concepts` | `ShowcaseTunnelSection.tsx` | Scroll only | Yes | `/industries` or homepage proof | Preserve alias; later map intentionally | High |
| `#what-we-build` | `WhatWeBuildSection.tsx` | Header “Studio” | Yes | `/services` | Preserve fragment until route rollout | High |
| `#packages` | `PackagesSection.tsx` | Header “Starting Points”; hero CTA | Yes | Services/offers or Start context | Preserve until offer architecture ships | High |
| `#how-it-works` | `HowItWorksSection.tsx` | Header “Process + Intake”; package CTA | Yes | `/start` and/or process content | Preserve package-context handoff | Critical |
| `#contact` | `ContactSection.tsx` | Header “Inquiries”; “Book a Consult” | Yes | `/start` | Preserve until conversion migration verified | Critical |
| `#demo` | `DemoSection.tsx` | No current consumer | No rendered target | Archive/legacy decision | Do not delete until runtime/reference gate | Low |

The header scroll helper subtracts an 80 px offset. The mobile/tablet header hides the four navigation controls but retains the consult CTA.

## Static concept fragments

Property page: `#home`, `#residences`, `#management`, `#portal`, and `#availability` resolve. `#neighborhood` is linked but no matching element was found. Shared studio concept links all use `href="#"`, including Overview, Services, About, Sign in, primary/secondary calls to action, and the three-item mobile dock; they return to document top and are demonstration-only.

## Public direct asset destinations

All files below Vite `public/` support direct URL access by path, including images, video, fonts, `.glb`, `.blend`, `.py`, `.md`, `.zip`, static HTML/CSS/JS, and generated source artifacts. The exhaustive mapping is `generated/asset-manifest.tsv`. Publicly referenced examples include:

- `/assets/scrollworld/sf-scrollworld-{desktop,mobile}.mp4` and posters — hero.
- `/assets/showcase/animos/animo-totem-wall-nine-{web,mobile}.mp4` and poster — selected systems.
- `/assets/services-orbit/video/orbit-carousel-scroll-{1080,mobile}.mp4` and poster — services orbit.
- `/assets/showcase/animos-final-v2/*.png` and `/assets/showcase/mobile-previews-v2/*.png` — concept previews.
- `/concepts/property/property.css`, `/concepts/studio/studio.css`, and `/concepts/studio/studio.js` — concept implementation dependencies.

Direct asset URLs are active dependencies, not route candidates. Preserve their paths until all references, CSS URLs, preload behavior, static HTML, and deployed caching have been migrated.

## External and action destinations

| Destination | Owner / trigger | Behavior | Risk |
|---|---|---|---|
| `mailto:info@velariss.co` | Footer, Contact link | Opens configured mail client | High |
| `mailto:info@velariss.co?subject=…&body=…` | Contact form | Serializes form into mail client; no server submission | Critical |
| `tel:+14159880944` | Footer, Contact link | Opens dialer where available | Low |
| `https://www.openstreetmap.org/copyright` | Footer credit | New tab | Low; required attribution |
| `https://www.usgs.gov/3d-elevation-program` | Footer credit | New tab | Low; attribution/provenance |
| `https://fonts.googleapis.com` / `fonts.gstatic.com` | `index.html` | Archivo font stylesheet/font connection | Medium; external availability/privacy |
| `https://api.anthropic.com/v1/messages` | server intake handler | Server-side live chat generation | High; credential, availability, and vendor dependency |

## Route probe result

Local production preview confirmed HTTP 200 for `/`, both static concept pages, every supported scene query, and the asset URL tested. It also confirmed homepage HTML with HTTP 200 for `/privacy`, `/legal`, `/credits`, `/robots.txt`, `/sitemap.xml`, and an arbitrary unknown path. `/api/intake` returned 404 under Vite preview because preview does not mount the development/API handler.

