# Executive summary

## Current-state verdict

Velari is a single React homepage with two independently authored static concept experiences. It has a strong cinematic visual identity, but its public architecture is fragile: navigation is fragment-based, eight concept variants share one query-driven HTML page, mobile has no section navigation, and unknown URLs receive the homepage with HTTP 200. The homepage spans 11,257–18,460 CSS pixels depending on viewport and combines four hero beats, nine industry concepts, six service views, three package states, four process steps, two intake modes, and a separate mail-client contact form.

The conversion surface is the most important preservation risk. The guided AI flow does not submit an inquiry. The questionnaire currently writes through mock clients to browser `localStorage` and mock email behavior. The final contact form opens `mailto:`. The only tracked event, `intake_submitted`, fires after client-side mock success rather than server-confirmed persistence. A visitor can reasonably interpret some completion language as a completed submission despite no verified external delivery. Evidence: `src/features/ai-demo/AIChatDemo.tsx`, `src/lib/mocks/guidedIntake.ts`, `src/features/intake/api.ts`, `src/lib/clients/db.ts`, `src/lib/clients/email.ts`, and `src/components/homepage/ContactSection.tsx`.

The current production-shaped build succeeds. Lint does not: two `@typescript-eslint/no-explicit-any` errors exist in `api/intake.ts:6`. Desktop Lighthouse is strong computationally (performance 94) but the page transfers about 48.7 MB. Mobile transferred about 28.5 MB and did not produce an LCP value. Accessibility is 92 in Lighthouse, with contrast, accessible-name, form-label, navigation, motion, and scroll-controlled-content concerns. SEO is 92, but there is no canonical, Open Graph, structured data, valid robots file, sitemap, or true 404 behavior.

## Phase 0 outcome

Phase 0 is complete. It produced inventories, screenshots, repeatable measurement artifacts, governance rules, compatibility requirements, release controls, a regression plan, and a Phase 1 gate. No public behavior was changed.

Readiness status: **Ready with documented non-blocking risks**.

Phase 1 may begin only after its scope explicitly preserves the route and anchor compatibility manifest and treats conversion replacement as a later, separately verified migration. Decisions about the future rendering strategy, authoritative intake backend, privacy/legal owner, analytics provider, and final industry taxonomy remain open; none prevents information-architecture work if the compatibility boundary is honored.

## Highest-priority risks

1. **Lost or falsely perceived inquiries:** current guided, questionnaire, and mailto paths have different and partly non-persistent completion semantics.
2. **Direct-route and SEO failure:** SPA fallback returns homepage HTML with HTTP 200 for unknown, robots, sitemap, privacy, legal, and credits URLs.
3. **Concept compatibility:** eight public scene URLs depend on `?scene=` and client-side metadata; property uses a separate static implementation.
4. **Taxonomy divergence:** industries, services, packages, goals, and inquiry choices are hard-coded in multiple files with non-matching labels and coverage.
5. **Asset loss and delivery cost:** 260 inventoried files total 513.4 MB; many source/generated files are publicly deployable, while static orphan evidence is insufficient for deletion.
6. **Analytics discontinuity:** the sole event is mocked and its current meaning is not server-confirmed completion.
7. **Responsive navigation gap:** tablet and mobile expose only the logo and contact CTA; section navigation disappears.

## Baseline numbers

| Measure | Current value |
|---|---:|
| Reachable first-party page implementations | 3 (`/`, property static page, shared studio scene page) |
| Supported studio query scenes | 8 |
| Homepage major anchored sections | 7 |
| Homepage height | 11,257–18,460 px across tested viewports |
| DOM buttons | 45 |
| DOM links | 9 |
| Form controls | 8 |
| Public asset files | 260 |
| Public asset bytes | 513,447,372 |
| Byte-identical duplicate groups | 19 |
| Desktop transfer (Lighthouse) | 48,682,098 bytes |
| Mobile transfer (Lighthouse) | 28,510,471 bytes |
| Desktop Lighthouse | 94 performance / 92 accessibility / 96 best practices / 92 SEO |
| Current real analytics events | 0 verified; 1 mock abstraction call |

