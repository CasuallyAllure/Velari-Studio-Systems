# Homepage section inventory

Rendered order is defined in `src/App.tsx`. “Planned action” follows the approved architecture: one job per page, progressive disclosure, show before explaining, and premium restraint. It is a future disposition only; Phase 0 makes no move.

| Order | Section / component / ID | Current purpose and source | CTA / interaction | Responsive, motion, analytics | Future owner / planned action |
|---:|---|---|---|---|---|
| 0 | Fixed `Header`; `src/components/layout/Header.tsx` | Brand, four section links from `NAV_ITEMS`, three-theme switcher, consult CTA | Four JS scroll buttons; logo `/`; theme buttons; consult → `#contact` | Full nav ≥ lg; theme ≥ xl; mobile/tablet logo + CTA only. No events. | Global shell. **Mature** into route-aware navigation; retain compatibility while routes ship. |
| 1 | Cinematic hero; `HeroSection`; `#hero` | Four persuasive beats over SF scroll-world video; `HERO_ASSETS`, `beats` | Final hero CTA → `#packages` | 6,912 px at 1920; 4,051 px at 390. Desktop/mobile videos. Reduced motion: 100svh, video hidden, last beat only. No events. | Homepage trust/positioning. **Condense/replace** with selective proposition and proof while preserving a non-motion equivalent. |
| 2 | Selected systems tunnel; `ShowcaseTunnelSection`; `#selected-systems` | Cinematic transition introducing nine concepts; local `concepts` | Scroll/passive video only | 1 viewport-ish, desktop/mobile video; IntersectionObserver play/pause. Reduced motion hides video/animation. No events. | Homepage proof preview. **Condense**; strongest visual remains, detail moves to Work/Industries. |
| 3 | Industry concepts; same component; `#industry-concepts` | Nine-tab industry-specific mockup and proof catalog; local `concepts` | Prev/next, 9 tabs or mobile select; “View concept” to static pages | Desktop tabs; mobile picker; desktop+mobile images. No analytics. | Industries hub + Work concept records. **Move/split**; homepage retains a small curated proof set. |
| 4 | Services orbit; `WhatWeBuildSection`; `#what-we-build` | Six capabilities presented via scroll-scrubbed video; local `chapters` | Six chapter buttons scroll within section | 5,832 px at 1920; 4,051 px at 390. Blob-fetched desktop/mobile video; reduced motion pins progress at start and shortens to 100svh. No events. | Services hub/page previews. **Condense/split**; homepage shows representative capability, service detail owns explanations. |
| 5 | Starting packages; `PackagesSection`; `#packages` | Three packaged starting points and features derived from `quoteConfig.tiers` via `packages` | Three tab buttons; “Shape this scope” sends package ID through `intakeBus` then scrolls to `#how-it-works` | Stacked/expanded on smaller screens; no dedicated reduced-motion behavior required beyond global smooth-scroll rules. No event. | Offers/pricing under Services and Start context. **Move/condense**; do not let offer UI define permanent product taxonomy. |
| 6 | Process; `HowItWorksSection`; `#how-it-works` | Four process steps plus intake | Step cards/accordion-like layout; guided/questionnaire mode tabs | Height 1,018 px desktop, 1,721 px mobile. No analytics. | Process content may live under About/Start; **split** process explanation from conversion experience. |
| 6a | Guided AI intake; `AIChatDemo` | Conversational qualification, live AI with deterministic fallback | Chips, textbox, send; consumes `intakeBus` package context | Theme-aware; live POST `/api/intake`; fallback local state. No intake-start/completion event. | `/start`. **Replace after verified backend exists**; retain current path during migration. |
| 6b | Questionnaire intake; `IntakeForm` | Four-step structured intake | Form fields, next/back/submit | Theme metadata required; mock DB/email current. Only `intake_submitted`. | `/start`. **Consolidate** into canonical inquiry workflow after field/data contract approval. |
| 7 | Final inquiry; `ContactSection`; `#contact` | Alternative inquiry form plus direct contact details | Inquiry type, name, email, company, phone, message → `mailto:`; direct mail/tel | Height 967 px desktop, 1,369 px mobile. Browser validation only; no analytics. | `/start` and global contact facts. **Replace after canonical submission is verified**; retain direct contact fallback. |
| 8 | Footer; `Footer` | Brand line, email, phone, geographic attribution | `/`, mailto, tel, OSM, USGS | Responsive layout; observed low-contrast text. No analytics. | Global shell + Credits utility owner. **Keep/mature**; preserve attribution. |

## Hero beat inventory

All four `h1` elements exist in the DOM and are revealed by scroll state. The content source is `beats` in `src/components/homepage/HeroSection.tsx`. Only the last beat remains in reduced-motion mode. Future action: consolidate the four-beat claim into one canonical homepage proposition plus one proof-oriented transition; archive the full current sequence as design evidence until the new baseline is approved.

## Industry presentation inventory

Nine records—Property, Dental, Restaurant, Trades, Industrial, Logistics, Retail, Research Labs, Construction—each own title, explanatory paragraph, four proof chips, desktop image, mobile image, and concept URL inside `ShowcaseTunnelSection.tsx`. The tunnel repeats all nine names before the interactive proof section repeats them again. Future action: the homepage should curate only a small selection; canonical industry copy belongs to Industry records, and visual concepts belong to Work/Concept records.

## Service presentation inventory

Six labels—Brand systems, Websites, Photography + creative, Portals + ordering, AI intake + reception, Automation + integrations—are embedded in `WhatWeBuildSection.tsx` and are also represented in media frames. The component provides labels but not durable service records or URLs. Future action: create canonical Service records before splitting the presentation, then allow the orbit to consume a curated subset.

## Floating and global controls

There is no separate floating widget. The persistent fixed header is the only global floating surface. It exposes nine focusable items at large desktop (logo, four navigation buttons, three theme buttons, consult CTA), two on tablet/mobile (logo, consult CTA). Theme selection uses `ThemeProvider`, `ThemeSwitcher`, `themes`, and browser key `velari-theme`; it changes presentation and is also stored on questionnaire submissions.

## Density baseline

| Viewport | Total height | Buttons | Links | Form controls | Headings | Horizontal overflow |
|---|---:|---:|---:|---:|---:|---|
| 1920×1080 | 18,460 px | 45 | 9 | 8 | 18 | None |
| 1440×900 | 15,666 px | 45 | 9 | 8 | 18 | None |
| 768×1024 | 16,852 px | 45 | 9 | 8 | 18 | None |
| 390×844 | 13,583 px | 45 | 9 | 8 | 18 | None |
| 320×568 | 11,257 px | 45 | 9 | 8 | 18 | None |

Counts represent rendered DOM candidates, not every simultaneously visible control. Detailed measurements are in `generated/responsive-metrics.json`.

