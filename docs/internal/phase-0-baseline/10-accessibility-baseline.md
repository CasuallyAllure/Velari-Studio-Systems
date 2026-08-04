# Accessibility baseline

Lighthouse accessibility score: 92 on desktop and mobile. Automated checks cover only part of accessibility; the code, DOM, responsive states, reduced-motion CSS, and concept pages were also inspected. No issues were fixed in Phase 0.

## Findings

| Severity | Page/component | Finding and evidence | Later acceptance requirement |
|---|---|---|---|
| Critical | Questionnaire confirmation | `IntakeForm` announces “received” and an email confirmation after mock-only persistence/email. This is materially misleading to assistive and non-assistive users alike. | Confirmation must be tied to server-confirmed submission; failure must preserve data and be announced. |
| High | Mobile/tablet Header | Four section-navigation controls are hidden below `lg`; no mobile menu or alternate section navigation exists. | Provide operable mobile navigation with focus management and current-location semantics. |
| High | Guided chat send | Lighthouse found the disabled send button without an accessible name. | Button must retain a programmatic name in all states and expose busy/disabled meaning. |
| High | Accessible-name matching | Lighthouse found visible “View concept” text mismatched with its accessible name, and six service buttons whose accessible names do not contain the visible label in expected form. | Visible text must be included consistently in computed accessible names. |
| High | Color contrast | Measured failures: service labels ~2.92:1, footer tagline ~3.84:1, footer/credit text ~2.17:1. | Meet WCAG AA for text and relevant UI states across all themes. |
| High | Scroll-controlled content | Four hero `h1`s and changing service content depend on scroll/video state; screen-reader users receive all DOM content without the visual timing/context. Service video has a verbal label but no equivalent structured detail. | Provide one coherent reading order and a non-cinematic equivalent; decorative media hidden, meaningful proof described. |
| High | Motion | Hero, tunnel, and services are long cinematic sequences. Hero/tunnel/services have reduced-motion handling, but the shared studio concept CSS showed no explicit reduced-motion rule. | Every animation/scroll sequence and concept renderer must honor reduced motion without hiding essential content. |
| High | Forms | Questionnaire labels are visually adjacent but inputs/selects do not receive matching `id`/`htmlFor` relationships. Errors are text but not programmatically associated or announced. | Explicit labels, descriptions, `aria-invalid`, error association/live announcement, and focus-to-error behavior. |
| Medium | Skip navigation | No skip link is present; fixed header precedes a very long page. | Provide skip-to-main and logical landmark targets. |
| Medium | Heading hierarchy | Four hero `h1`s coexist in DOM, plus section headings and concept headings. Static concepts have their own hierarchy. | One clear page-level heading and sequential section hierarchy in every rendered route. |
| Medium | Keyboard/focus | DOM inventory contains 62 focusable candidates (3 hidden). Browser automation could not reliably advance focus beyond `BODY`, so visible focus behavior remains incompletely verified. Static order places 9 header controls before hero and dense carousel/service controls. | Manual keyboard matrix on supported browsers; visible focus, no traps, correct order, operable controls. |
| Medium | Tabs | Industry and intake use tab roles; industry panel ownership exists, but intake tabs do not expose associated `tabpanel` relationships/IDs or arrow-key tab behavior. | Implement WAI-ARIA tab keyboard and relationship patterns or use simpler buttons/disclosure semantics. |
| Medium | Industry carousel | Prev/next, nine tabs, mobile select, dynamic panel and changing images create a dense control set; panel updates are not announced as a cohesive result. | Keyboard and screen-reader announcement strategy, predictable focus, no duplicate controls at a breakpoint. |
| Medium | Link/button semantics | Header fragment destinations are buttons, concept demo navigation uses `href="#"`, and property navigation includes nonexistent `#neighborhood`. | Routes/fragments use links; state-only actions use buttons; all destinations resolve. |
| Medium | Theme switcher | Three visual themes can change contrast and appearance; no analytics and no documented announcement behavior. | Each theme must pass contrast/focus testing and expose pressed/selected state and label. |
| Medium | Contact mailto | Browser handoff has no in-page status; success/failure is outside site. | Explain handoff before action and provide a verified accessible fallback. |
| Low | Landmarks | Root has header/main/footer and sections, which is positive; individual long sections could use more descriptive labeling consistency. | Retain landmarks and unique accessible section names after routing. |
| Low | Concept demos | Shared concept links are nonfunctional `#` demonstrations; mobile dock icons are text glyphs. | Clearly label demos, disable fake destinations, or make actions real in future concept templates. |

## Reduced-motion baseline

- `src/index.css`: hero becomes `100svh`, video is hidden, and only the last beat displays; tunnel animation/video are suppressed; industry animation is disabled.
- `src/styles/studio-lower.css`: services orbit becomes `100svh` and cue animation is disabled.
- `public/concepts/property/property.css`: smooth scrolling and residence image animation are disabled.
- `public/concepts/studio/studio.css`: no explicit reduced-motion media query was found.

Reduced motion avoids much of the cinematic travel but also changes content exposure (only the last hero beat survives). Later work must intentionally choose the canonical semantic content rather than relying on CSS-hidden duplicates.

## Keyboard evidence boundary

`generated/focusable-order-inventory.json` is the DOM-order baseline. `generated/keyboard-focus-desktop.json` records the automation limitation. Before a user-facing refactor ships, complete a manual keyboard pass in Chromium, Safari/WebKit, and Firefox for header, all tabs/carousels, package selection, both intakes, validation, contact handoff, and concepts.

