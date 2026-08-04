# Performance baseline

## Test environment

- Date: 2026-08-02 UTC.
- Machine/browser: local macOS host, Chromium through the in-app browser; Lighthouse 12.8.2.
- Application: Vite production build served at `http://127.0.0.1:4173`.
- Build and Lighthouse were run against the current dirty working tree without modifying product files.
- Lighthouse mobile uses simulated mobile throttling; desktop uses Lighthouse desktop settings. Results are laboratory observations, not field data.

## Repeat commands

```sh
npm run build
npm run preview -- --host 127.0.0.1
npx --yes lighthouse@12.8.2 http://127.0.0.1:4173/ --output=json --output-path=docs/internal/phase-0-baseline/lighthouse/homepage-mobile.report.json --chrome-path="/path/to/Chromium"
npx --yes lighthouse@12.8.2 http://127.0.0.1:4173/ --output=html --output-path=docs/internal/phase-0-baseline/lighthouse/homepage-mobile.report.html --chrome-path="/path/to/Chromium"
npx --yes lighthouse@12.8.2 http://127.0.0.1:4173/ --preset=desktop --output=json --output-path=docs/internal/phase-0-baseline/lighthouse/homepage-desktop.report.json --chrome-path="/path/to/Chromium"
npx --yes lighthouse@12.8.2 http://127.0.0.1:4173/ --preset=desktop --output=html --output-path=docs/internal/phase-0-baseline/lighthouse/homepage-desktop.report.html --chrome-path="/path/to/Chromium"
```

When repeating, use a resolved local Chromium path and retain both JSON and HTML. For a strict numeric comparison, generate JSON first and render an HTML viewer from the same JSON/tooling if available; separate HTML runs can vary slightly. Clear origin storage only when the comparison protocol calls for a cold load, and record that choice.

## Build output

`npm run build` passed in 5.50 seconds (1,794 transformed modules).

| Artifact | Raw | Gzip |
|---|---:|---:|
| `dist/index.html` | 0.85 kB | 0.46 kB |
| Main CSS | 86.32 kB | 16.78 kB |
| Main JavaScript | 341.14 kB | 105.38 kB |

Browserslist reported that its data was eight months old. `npm run lint` failed with two `@typescript-eslint/no-explicit-any` errors at `api/intake.ts:6`; this is a release-baseline failure, not a Phase 0 correction.

## Lighthouse summary

| Metric | Desktop | Mobile |
|---|---:|---:|
| Performance score | 94 | Unavailable (`NO_LCP`) |
| Accessibility | 92 | 92 |
| Best practices | 96 | 96 |
| SEO | 92 | 92 |
| First Contentful Paint | 837 ms | 2,655 ms |
| Largest Contentful Paint | 1,529 ms | Unavailable |
| Speed Index | 845 ms | 4,674 ms |
| Total Blocking Time | 0 ms | Unavailable in failed perf run |
| Cumulative Layout Shift | 0.00457 | 0 |
| Time to Interactive | 1,573 ms | Unavailable |
| Transfer size | 48,682,098 B | 28,510,471 B |
| Main-thread work | 268 ms | 1,081 ms |
| Script boot-up | 1.4 ms | 175 ms |
| INP | N/A | N/A |

INP is unavailable because this lab run did not collect field interaction data and the page lacks a controlled interaction benchmark. Do not substitute TBT for INP in later comparisons.

## Largest network payloads

### Desktop

1. Hero video: 33,921,228 B.
2. Services-orbit video: 12,087,151 B.
3. Property concept image: 1,223,304 B.
4. Hero poster: 530,865 B.
5. Property mobile preview: 329,876 B.
6. Tunnel poster: 194,213 B.
7. Service poster: 168,210 B.
8. Main JS transfer: 105,822 B.

### Mobile

1. Hero video: 21,817,626 B.
2. Services-orbit mobile video: 4,262,827 B.
3. Property concept image: 1,223,304 B.

Exact request records remain in `lighthouse/homepage-*.report.json`.

## Load and runtime behavior

- The root and static concepts direct-load successfully in Vite preview. The API does not; `/api/intake` is a separate deployment concern.
- Hero and services video are fetched as complete Blob responses in component effects before being assigned to the video elements. This supports seeking but creates large transfers and memory pressure.
- The tunnel video uses a URL directly with `preload="metadata"` and IntersectionObserver playback control.
- The active concept’s device images are DOM-selected; media and browser caching behavior determine actual request timing.
- A 1440×900 automated scroll from top to bottom took 2,336 ms wall-clock, including automation overhead. This is **not** a CPU benchmark. The observation found three ready video elements. JS heap measurement was unavailable and would not include decoded media memory anyway.
- Hero and services sections attach scroll listeners and use animation frames/video seeking. The service section can queue seeks; long-section decoded video and repeated seeking are the primary runtime concern even though measured JS main-thread cost was modest.
- Mobile Lighthouse’s `NO_LCP` is itself a regression signal: the cinematic/visibility sequence can prevent Lighthouse from identifying a stable LCP candidate under throttling.
- Slow-network evidence is the simulated mobile report: FCP 2.655 s, Speed Index 4.674 s, and no measurable LCP. No separate packet-loss or offline test was performed.

## Comparison protocol

For every phase gate, repeat build sizes and Lighthouse with the same version, viewport preset, cold/warm-cache policy, host behavior, and API availability. Compare payload and media requests separately from visual quality. Treat any route or conversion failure as a release blocker even if performance scores improve.
