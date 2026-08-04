# Reusable regression checklist

Mark each item Pass / Fail / Not applicable, with environment, viewport/browser, evidence, and owner. Items tagged **Automate** should enter the route/e2e/contract suite when implementation begins.

## Build and shell

- [ ] Dependency install and production build succeed. **Automate**
- [ ] Typecheck, lint, unit, integration, and security checks meet gate policy. **Automate**
- [ ] `/` direct load and refresh render the intended homepage with no console/network failures. **Automate**
- [ ] Header, main, footer, logo, contact facts, credits, and external links render.
- [ ] Browser back/forward restores route, fragment, selected state, and scroll reasonably.
- [ ] Unknown routes return the approved 404 status/page, not homepage 200. **Automate after routing phase**

## Responsive and visual

- [ ] Compare 1920×1080, 1440×900, 768×1024, 390×844, 320×568 to baseline states.
- [ ] No horizontal overflow, clipped focus, unreadable text, overlapping fixed header, or unexpected layout shift. **Automate overflow/screenshot checks**
- [ ] Desktop and mobile media/poster variants load; failed/slow media leaves readable content.
- [ ] Theme variants retain legibility, focus visibility, and intended state.
- [ ] Reduced motion removes nonessential motion while preserving all essential content and controls.

## Current homepage compatibility

- [ ] `#hero` resolves.
- [ ] `#selected-systems` resolves.
- [ ] `#industry-concepts` resolves.
- [ ] `#what-we-build` resolves.
- [ ] `#packages` resolves.
- [ ] `#how-it-works` resolves.
- [ ] `#contact` resolves. **Automate all fragment cases**
- [ ] Header Studio, Starting Points, Process + Intake, Inquiries, and consult CTA reach intended destinations.
- [ ] Hero CTA reaches packages/current replacement.
- [ ] All nine industry controls, previous/next, mobile selector, device previews, and concept links match selection.
- [ ] All six service states and progress controls are operable.
- [ ] All three package states render correct names/prices/features.
- [ ] Package CTA carries the selected package into intake and survives the approved navigation/state contract.

## Legacy concept URLs

- [ ] `/concepts/property/index.html` direct load/refresh/redirect contract. **Automate**
- [ ] Property `#home`, `#residences`, `#management`, `#portal`, `#availability`; record known `#neighborhood` baseline defect.
- [ ] Studio direct load for `scene=dental`, `restaurant`, `trades`, `industrial`, `logistics`, `retail`, `research`, `construction`. **Automate matrix**
- [ ] Each scene resolves to the correct future Work record after redirects; no loop/multi-hop.
- [ ] Missing, empty, invalid, encoded, duplicate, and case-variant `scene` behavior matches manifest.
- [ ] Desktop/mobile concept layout, titles, assets, controls, and attribution/labels are correct.

## Conversion

- [ ] Header, hero, package, process, contact, footer email, and footer phone entry paths work.
- [ ] Guided conversation live mode handles success, timeout, server rejection, malformed response, and retry without losing answers. **Automate API contract/error cases**
- [ ] Fallback mode is clearly labeled, completes qualification without implying unverified delivery, and can transition to canonical submit.
- [ ] Questionnaire validates each step, preserves values/back navigation, associates errors, and prevents duplicate submits.
- [ ] Submission loading, confirmed, failed, retry, and duplicate-idempotency states use authorized test records. **Automate**
- [ ] Server record, inbox/CRM delivery, and confirmation channel agree on one submission ID.
- [ ] Mailto/tel fallbacks are explicit and functional; form does not silently rely on them.
- [ ] Campaign/referral/industry/service/offer context persists to confirmed submission without PII leakage.
- [ ] Spam protection, rate limiting, consent/privacy links, and retention disclosure behave as approved.
- [ ] Theme absence/legacy values do not reject a valid inquiry.

## Accessibility

- [ ] Skip link, landmarks, one clear `h1`, heading sequence, and page title are correct.
- [ ] Full keyboard pass: visible focus, logical order, no traps, all actions operable.
- [ ] Mobile navigation opens/closes, traps/restores focus only as appropriate, and responds to Escape.
- [ ] Tabs/carousels follow selected semantics and keyboard behavior; dynamic updates are announced appropriately.
- [ ] Inputs have explicit labels; hints/errors/status are associated and announced; focus moves to actionable error/confirmation.
- [ ] Accessible names contain visible labels; icons/decorative media are hidden or named appropriately.
- [ ] All theme/state text and controls meet contrast requirements. **Automate contrast where feasible**
- [ ] Screen-reader smoke pass for homepage, each route template, concept, and Start success/failure.

## SEO, redirects, analytics, and assets

- [ ] Every canonical route direct-loads with unique server-visible title/description/canonical and approved social metadata. **Automate**
- [ ] Robots/sitemap return correct content types/status; canonical routes included, legacy/utility policy correct. **Automate**
- [ ] Structured data validates and contains only truthful visible facts.
- [ ] Redirect matrix returns intended status, one hop, correct query mapping, no chain/loop. **Automate**
- [ ] API requests never receive page fallback. **Automate**
- [ ] Page views, CTAs, offer selection, intake start/attempt/confirmation/failure, direct contact, concept/work, and campaigns emit exactly once with safe payloads.
- [ ] Historical `intake_submitted` comparison is labeled/mapped without inflating confirmed leads.
- [ ] Runtime-critical images, video, posters, fonts, concept CSS/JS load without 404 and with correct cache/content type. **Automate URL manifest sampling**
- [ ] OSM/USGS and any additional required attribution remains visible/correct.

