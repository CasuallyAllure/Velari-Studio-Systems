# Visual baseline index

## Capture set

Sixty-four PNG captures are stored in `screenshots/` (6.4 MB total). They were captured from the local production build with the in-app Chromium browser. Full-page captures are evidence artifacts; sectional captures are the preferred regression references because very tall stitched images may distort timing-dependent sticky states.

### Homepage viewport coverage

- Large desktop: `homepage-large-desktop-1920x1080-top.png`
- Standard desktop: `homepage-desktop-1440x900-top.png`, `homepage-desktop-fullpage.png`
- Tablet: `homepage-tablet-768x1024-top.png`
- Modern mobile: `homepage-mobile-390x844-top.png`, `homepage-mobile-fullpage.png`
- Narrow mobile: `homepage-narrow-mobile-320x568-top.png`

### Homepage section/state coverage

- Hero: desktop beats 1–4.
- Selected systems tunnel.
- Industry concepts with Property selected.
- Services orbit plus all six named service views.
- Packages: Signature Landing, Business Platform, AI-Integrated Platform.
- Process/intake: guided conversation and project questionnaire.
- Contact and footer.
- Themes: Velari Cinematic, Industrial Services, Modern Tech.
- Mobile: selected systems, industry concepts, services, packages, process, contact, and footer.

### Concept coverage

Property, Dental, Restaurant, Trades, Industrial, Logistics, Retail, Research, and Construction each have desktop, mobile viewport, and mobile full-page captures.

## Reachability limits

- Loading and fallback were observed during runtime/API testing; the durable visible guided fallback state is represented by the guided intake capture. Transient loading was too timing-sensitive for a reliable canonical still.
- Questionnaire error behavior and completion code were inspected, but no real submission was triggered. A confirmation screenshot would imply a delivery path that was not verified; it is intentionally absent.
- No true homepage empty state exists.
- `/api/intake` returned 404 in production preview, exercising the guided fallback path.
- Theme screenshots capture the three current UI choices, not a promise that all sections fully restyle.

## Responsive measurements

`generated/responsive-metrics.json` records total height, section bounds, DOM interactive counts, headings, header-visible controls, and overflow at 1920×1080, 1440×900, 768×1024, 390×844, and 320×568. `generated/concept-metrics.json` records desktop/mobile height, controls, headings, and overflow for all nine concepts.

Key observations:

- No horizontal overflow was measured at any tested homepage or concept viewport.
- Homepage height ranges from 11,257 px to 18,460 px.
- Header navigation collapses from nine visible focusable controls on large desktop to logo plus consult CTA on tablet/mobile; there is no mobile menu.
- The hero and service orbit dominate scroll length. At 1920 they account for 6,912 px and 5,832 px respectively; at 390 they each occupy 4,051 px.
- Static concept mobile pages are 1,020–1,047 px tall except Property at 1,141 px.

## Visual regression use

Compare like-for-like viewport, scroll position, active item, theme, reduced-motion setting, and media readiness. Approve intentional changes at section level. Do not accept a full-page pixel diff alone for scroll-scrubbed video; pair it with DOM/state and media-load checks.

