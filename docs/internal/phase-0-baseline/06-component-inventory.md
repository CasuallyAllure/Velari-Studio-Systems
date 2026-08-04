# Component inventory

## React public components

| Classification | Component / file | Consumers and dependencies | Current evidence | Future disposition |
|---|---|---|---|---|
| Root composition | `App` — `src/App.tsx` | `main.tsx`; ThemeProvider, Header, six homepage sections, Footer | Sole React page composition; no router | **Split later** only after route shell and compatibility tests exist |
| Shared layout | `Header` — `src/components/layout/Header.tsx` | `App`; `Container`, `ThemeSwitcher`; Tailwind utilities | Desktop fragment nav; mobile only logo/CTA | **Mature** into global route-aware navigation |
| Shared layout | `Footer` — `src/components/layout/Footer.tsx` | `App`; `Container`, `brand`; `studio-lower.css` | Global contact and geographic attribution | **Keep/mature**; separate credits ownership without losing attribution |
| Shared layout primitive | `Section`, `Container` — `src/components/layout/Section.tsx` | `DemoSection`, Header, Footer and potential shared layouts | Generic forwardRef wrappers; Tailwind/cn dependencies | **Keep/mature** as layout primitives if adopted consistently |
| Shared primitive | `Button` — `src/components/ui/Button.tsx` | `IntakeForm`, possibly legacy/demo consumers; CVA, `cn` | Reusable variants | **Keep/mature** after accessibility/style audit |
| Shared primitive | `Input`, `Textarea`, `Select` — `src/components/ui/Input.tsx` | `IntakeForm` | Tailwind/cn; error prop affects styling | **Keep/mature**; bind labels/descriptions/errors by ID |
| Shared primitive | `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` — `src/components/ui/Card.tsx` | `IntakeForm`, `DemoSection` | Generic presentational pieces | **Consolidate/mature** into restrained surface primitives |
| Theme domain | `ThemeProvider`, `ThemeSwitcher`, `ThemeContext` | App/Header/intake | `themes`, browser `localStorage`; no analytics | **Mature or retire later** after theme product intent is decided; preserve stored value compatibility |
| Homepage-specific | `HeroSection` | `App`; `index.css`; hero videos/posters; Lucide icons | Four-beat scroll-scrubbed experience | **Replace/condense after new proof baseline**, retain reduced-motion equivalent |
| Homepage-specific | `ShowcaseTunnelSection` | `App`; `index.css`; tunnel media + 18 concept preview images | Owns both tunnel and nine-item industry proof | **Split** cinematic preview from Industries/Work data consumers |
| Homepage-specific | `WhatWeBuildSection` | `App`; `index.css`, `studio-lower.css`; orbit videos/poster | Scroll-scrubbed six-service visual | **Split/condense**; consume canonical Service records |
| Homepage-specific | `PackagesSection` | `App`; `studio-lower.css`; `packages`, `intakeBus` | Three-state offer tabs | **Move/consolidate** into Offers/Start context after schema approval |
| Homepage/conversion | `HowItWorksSection` | `App`; `studio-lower.css`; AIChatDemo, IntakeForm, intakeBus, process icons | Combines process explanation and two conversion modes | **Split** Process from Start conversion after canonical workflow exists |
| Conversion | `AIChatDemo` | `HowItWorksSection`; `intakeApi`, `guidedIntake`, `intakeBus` context | Live generation plus deterministic fallback; no lead persistence | **Replace/mature** only with verified submission semantics |
| Conversion | `IntakeForm` | `HowItWorksSection`; UI primitives, validation, theme, submitIntake | Four-step form with mock persistence/email | **Consolidate** into canonical Start form, preserving mapped fields |
| Homepage/conversion | `ContactSection` | `App`; `brand`, Lucide; `studio-lower.css` | Browser `mailto:` composition | **Replace later** with verified form; retain explicit direct-contact fallback |
| Experimental/unused | `DemoSection` — `src/components/homepage/DemoSection.tsx` | No live import found; uses `Section`, `AIChatDemo` | Static search and App composition show no runtime consumer | **Archive/delete after migration gate**, never on static suspicion alone |

No component currently calls analytics directly. `IntakeForm` reaches analytics indirectly through `submitIntake`.

## Non-React concept components

| Classification | Files | Public consumer | Dependencies | Future disposition |
|---|---|---|---|---|
| Concept component | `public/concepts/property/index.html`, `property.css` | `/concepts/property/index.html` | Property imagery, fonts, CSS animations; hard-coded navigation and operations/residence views | **Replace after canonical Work renderer ships**, then redirect; preserve screenshot and URL |
| Concept component | `public/concepts/studio/index.html`, `studio.css`, `studio.js` | Eight `?scene=` destinations and dental fallback | `scenes` object, scene preview assets, DOM template strings, client title update | **Replace after all eight Work records match**, query-aware redirects required |

## Supporting public-domain modules

- Conversion state/contracts: `src/features/ai-demo/intakeBus.ts`, `src/lib/types/intake*.ts`, `src/features/intake/validation.ts`, `src/features/intake/api.ts`.
- External/client boundaries: `src/lib/clients/{intakeApi,db,email,analytics}.ts` and `src/lib/mocks/*`.
- Content/config boundaries: `src/config/{brand,packages,quote}.ts`, `src/features/theme/tokens.ts`, `server/intake/knowledge.ts`.
- Styling: `src/index.css` owns hero, tunnel, industry proof, service orbit, tokens/global behavior; `src/styles/studio-lower.css` owns package/process/contact/footer. Static concepts own their CSS. Tailwind utilities are embedded across layout, UI, and questionnaire components.

## Duplicate-component findings

- The two intake modes and the contact form are separate conversion systems rather than reusable views of one form/state machine.
- Contact fields are independently implemented in `IntakeForm`, `AIChatDemo`/guided intake, and `ContactSection`.
- Static concept headers, navigation, devices, cards, and mobile docks are repeated template strings/HTML and do not use the React design system.
- Homepage section shells mix `Container`, `velari-shell`, custom sticky layouts, and direct section markup. A future `PageSection`, `ContentMeasure`, `ProofStage`, and `StickySequence` primitive may reduce drift, but none should be extracted until the new IA determines actual shared behavior.

## Deletion gate for suspected unused code

`DemoSection` is the only public-facing component found unused by current App composition. It remains in place. Before future deletion require: repository reference search, dependency graph/build confirmation, direct route/runtime review, visual comparison, and a recoverable release artifact. The same gate applies to all source/generated assets flagged as orphan candidates.

