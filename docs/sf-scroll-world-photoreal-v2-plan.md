# VELARISS.co San Francisco Scroll World — Photoreal v2 Plan

## Decision

Rebuild the hero as a grounded, continuous-forward architectural flight from the Financial District to the western span of the San Francisco–Oakland Bay Bridge. The existing Financial District LiDAR, OSM building footprints, Blender cameras, and React scrub integration remain useful. The current gray massing render becomes previsualization only. The Golden Gate master is preserved as a reusable asset but is no longer the ending of this hero.

Higgsfield should not be treated as a one-click “colorize this video” filter. The controlled workflow is:

1. use the real measurement data to lock geography, proportions, landmarks, and camera blocking;
2. use real photographic references to define facades, windows, materials, lighting, Embarcadero waterfront detail, the Bay Bridge, haze, and water;
3. use Higgsfield for approved photoreal look-development tests and frame-chained camera legs;
4. keep Blender as the fallback/fidelity layer wherever Higgsfield makes buildings morph or loses San Francisco specificity.

## What is wrong with v1

- The desktop and mobile videos are only 10 seconds / 240 frames at 24 fps, so the downtown flight has too little time to feel inhabited.
- Buildings are clean gray massing with minimal facade information. There are no convincing windows, street-level materials, interior lights, signs, roof equipment, traffic, or atmospheric reflections.
- Full-occlusion fog is active through much of the middle transition. At frame 136 the camera also relocates from downtown to the Golden Gate environment, which makes the white field feel like an obvious teleport.
- The old route travels away from the direction established by the Financial District flight. A Bay Bridge ending follows the camera naturally toward the eastern waterfront and removes the need for that relocation.
- Copy and visual beats change faster than the camera can establish scale.

## Target art direction

**Real San Francisco after blue hour, not generic AI cyber-city.**

- recognizable Financial District massing led by the Transamerica Pyramid
- believable glass, concrete, brick, metal, rooftop equipment, and varied window grids
- warm selective office lights against a deep navy atmosphere
- realistic street and facade reflections without turning the city into neon science fiction
- low coastal fog with visible depth, silhouettes, and light scatter—never a flat white card
- recognizable steel-gray Bay Bridge western suspension span, warm roadway lights, dark water, Yerba Buena context, and restrained marine haze
- champagne-gold/acid-lime UI accents remain in HTML; they should not recolor the whole city
- no text, logos, or signage generated into the footage

## Reference pack

Before generation, assemble a licensed or user-approved reference board of approximately 20–30 images:

- 6–8 Financial District aerial and elevated views
- 8–10 street-canyon/facade references around the Transamerica Pyramid, Montgomery Street, Columbus Avenue, and adjacent blocks
- 3–5 night-window, street-reflection, and rooftop-detail references
- 5–7 Bay Bridge western-span views from the Embarcadero and elevated downtown approaches, showing both suspension towers, Yerba Buena Island, roadway lights, water, and skyline context

References control material and architectural character. The LiDAR/OSM masters control placement and silhouette. We should not rely on an AI model to invent which San Francisco buildings belong where.

## Revised camera journey

Target: approximately 22–28 seconds of source motion mapped across 550–700 viewport-heights of scroll. Scroll scrubbing can linger without requiring the camera to stop unnaturally.

| Beat | Approx. source time | Camera and scene | Quality requirement |
| --- | ---: | --- | --- |
| 1. Establish | 0–4 s | Elevated three-quarter view of the Financial District; Transamerica anchors the first composition | City immediately reads as San Francisco, not a block model |
| 2. Descend | 4–9 s | Controlled crane down toward the grid with roof details and window parallax | At least three depth layers pass the lens |
| 3. Enter the canyon | 9–16 s | Long forward glide between buildings, closer to facade and window level | This is the main added dwell; no early escape into empty space |
| 4. Embarcadero approach | 16–20 s | Continue down the existing street canyon toward the eastern waterfront; foreground buildings part to reveal water and bridge lights | No white occlusion or geographic teleport; forward velocity never reverses |
| 5. Bay Bridge reveal | 20–24 s | Cross the waterfront edge and crane upward into a three-quarter view of the western suspension span | Both western-span towers become visible before the final hold |
| 6. Full-span finish | 24–28 s | Wide composition of the western span, Yerba Buena Island, water, and receding downtown context | The full western suspension span and both towers remain legible behind CTA copy |

The route is now geographically continuous: Financial District to street canyon to Embarcadero to the Bay Bridge western span. Low marine haze can add depth, but there is no full-frame fog portal and no hidden camera relocation.

## Camera architecture

Use Scroll World architecture A: sequential continuous-forward legs with no pull-back connectors.

- Generate the full draft chain in `seedance_2_0` Fast at 720p, matching the approved feasibility test.
- Re-render the fully approved chain in `seedance_2_0` Standard at 1080p; do not mix Fast and Standard clips inside one delivered chain.
- The first leg starts from the approved opening keyframe.
- Every later leg starts from the actual final frame of the previous rendered leg.
- Never use a separately regenerated still at a seam.
- Each leg must finish with approximately one second of calm forward drift so velocity matches the next leg.
- A short crossfade is insurance, not a substitute for identical handoff frames.

Recommended leg split:

1. aerial establish → descent;
2. descent → sustained building-canyon flight;
3. canyon → Embarcadero/waterfront approach;
4. waterfront → complete Bay Bridge western-span reveal and final hold.

## Two-look feasibility gate

Before rebuilding the full flight, produce a single five-to-eight-second city-canyon test in two forms:

### Test A — Higgsfield-forward

- input: approved photoreal opening keyframe derived from the Blender/LiDAR view
- movement: slow forward architectural glide with strong foreground parallax
- goal: determine whether window grids, facades, and landmark geometry remain stable enough while scrubbing forward and backward

### Test B — Blender-forward

- input: the same camera move
- treatment: procedural facade/window system, PBR materials, real-photo-assisted texture references, atmospheric lighting, and motion detail
- goal: establish the higher-geographic-fidelity fallback

Choose the final route after viewing both tests at real website size. If Higgsfield produces melting windows, duplicated facades, impossible building transitions, or identity loss around Transamerica, use it for look development and selected enhancement—not as the final motion renderer.

## Blender work retained

The current production assets already provide substantial value:

- 12.5M-point Financial District LiDAR master
- OSM Financial District building footprints
- working city geometry and separate desktop/mobile cameras
- rebuild and encoding scripts
- working React scroll-scrub implementation
- 11.3M-point Golden Gate LiDAR master and clean bridge geometry retained for later reuse

The Bay Bridge is not yet a dedicated controlled asset. The western-span endpoint requires a new geometry/reference package before final generation.

Required upgrades:

- facade classification and varied material families
- procedural window grids with selective emissive occupancy
- roof equipment, setbacks, street planes, and foreground occluders
- Bay Bridge western-span deck, suspension towers, main cables, hangers, roadway lights, Yerba Buena silhouette, and water context
- an approved wide Bay Bridge endpoint keyframe derived from real references and controlled geometry
- longer city path continuing through the Embarcadero instead of a relocation interval
- low marine haze with textured density; no opaque transition volume

## Production gates

No full-credit final chain begins until each gate is approved.

1. **Reference gate** — approved Financial District, Embarcadero, and Bay Bridge reference board with usage rights recorded.
2. **Storyboard gate** — eight keyframes: opening, descent, canyon entry, deep canyon, Embarcadero approach, waterfront emergence, both-tower reveal, complete western-span hold.
3. **Motion gate** — grayscale Blender previz proves the longer city flight and wide bridge framing.
4. **Look gate** — Higgsfield-forward canyon test passed; Blender remains the fidelity fallback for unstable geometry.
5. **Draft-chain gate** — complete frame-chained `seedance_2_0` Fast journey with no seam or velocity reversal.
6. **Final-chain gate** — full-resolution `seedance_2_0` or approved Blender hybrid.
7. **Web gate** — native-resolution H.264, short GOP, muted, fast-start, poster images, reduced-motion stills.
8. **QA gate** — slow/fast scrub, reverse scrub, seam screenshots, desktop and phone testing, and no console errors.

## Web integration changes

- Replace the single 10-second file with a config-driven chain of shorter seekable clips.
- Load clips as blobs so seeking works consistently even if hosting byte-range behavior changes.
- Increase scroll distance and give the building-canyon beat the longest dwell.
- Keep copy sparse during the close building flight.
- Place the final CTA only after both western-span suspension towers are visible.
- Retain a dedicated mobile treatment rather than center-cropping the desktop master.
- Reduced motion receives selected stills and dissolves, not a blank video frame.

## Parallel website track after the hero

### “What we build”

Replace generic icon cards with three or four designed product moments:

- a real payment/checkout flow
- a client portal/account experience
- an operations dashboard/workflow
- an AI intake and routing sequence

Each moment should show an interface artifact, the business result, and one credible implementation detail. Motion should reveal how the system behaves rather than make cards float for decoration.

### Estimate-builder transition

Each package’s **Build My Estimate** button opens the estimator with that tier preselected.

Interaction:

1. the current page softens, blurs, and dissolves over roughly 400 ms;
2. a full-viewport estimate workspace emerges—visually modal, but large enough to feel like a dedicated product;
3. the chosen package appears at the top with included features locked and clearly labeled;
4. adaptive questions add only relevant options and update the estimate summary;
5. the final step shows one-time, monthly, annual, review-required, deposit, and timeline information;
6. **Request this scope** creates the submission and then offers scheduling.

Accessibility requirements:

- native dialog semantics or equivalent focus management
- Escape/back closes without losing answers
- focus returns to the package button
- URL/deep-link state permits refresh and back-button recovery
- reduced-motion swaps the dissolve for an immediate opacity change
- mobile uses a full-screen sheet, never a cramped centered modal

This estimate-builder track should begin after the hero art direction and clip architecture are locked, so the highest-risk visual work does not compete with form engineering.

## Generation access and current cost check

The authenticated Higgsfield MCP connection is live. `ffmpeg` and `ffprobe` are also installed locally.

No-charge cost preflight on July 22, 2026:

- `nano_banana_pro`, one 2K 16:9 photoreal keyframe: 2 credits
- `gpt_image_2`, one high-quality 2K 16:9 keyframe: 7 credits
- `seedance_2_0_mini`, one silent 8-second 720p draft leg: 20 credits
- `seedance_2_0`, one silent 8-second 1080p final leg: 72 credits

The initial approval gate was one 2K keyframe plus one eight-second city-canyon leg. The completed result is recorded below; later legs remain gated on review of this test and confirmation of the desktop/mobile scope.

## Feasibility result — July 22, 2026

The first controlled test was approved and rendered using Seedance 2.0 Fast rather than Mini:

- photoreal reference: `renders/photoreal-v2/city-canyon-keyframe-v1.png`
- eight-second motion test: `renders/photoreal-v2/city-canyon-seedance2-fast-v1.mp4`
- extracted handoff frame: `renders/photoreal-v2/city-canyon-seedance2-fast-v1-last.png`
- image generation: 2 credits
- Seedance 2.0 Fast generation: 28 credits
- total test spend: 30 credits

Result: the camera descends from the elevated Financial District view into a convincing street canyon with strong facade parallax, credible windows and rooftop detail, no white-space escape, and a usable forward-facing final frame. The model preserves San Francisco character and the Transamerica anchor, but individual surrounding buildings are visually reconstructed rather than a documentary pixel-perfect digital twin. The raw 720p test is 18.4 MB and must be web-encoded before integration.

## Bay Bridge pivot result — July 22, 2026

The approved Bay Bridge draft stage used the exact final frame of the city-canyon test as its handoff and a licensed real-photo-derived endpoint for the western suspension span.

- approved endpoint: `renders/photoreal-v2/bay-bridge-endpoint-v1.png`
- rejected exploratory transition: `renders/photoreal-v2/embarcadero-seedance2-fast-v1.mp4`
- accepted constrained transition: `renders/photoreal-v2/bay-bridge-transition-seedance2-fast-v1.mp4`
- joined review draft: `renders/photoreal-v2/sf-bay-bridge-draft-v1.mp4`
- endpoint generation: 2 credits
- rejected unconstrained transition: 28 credits
- accepted start-and-end-constrained transition: 28 credits
- Bay Bridge stage spend: 58 credits
- cumulative controlled-test spend: 88 credits

The unconstrained transition was rejected because it substituted an International Orange, Golden Gate-style bridge. No part of that clip belongs in the website. The accepted pass remains steel-gray, continues through the Financial District handoff without a visible seam, emerges at the Embarcadero without an opaque fog portal, and finishes on a legible wide Bay Bridge composition. The joined draft is 16.04 seconds, 1280×720 at 24 fps, H.264, silent, short-GOP, and fast-start encoded for scroll testing.

This is an approved draft-chain candidate, not the final-resolution master. It is shorter than the 22–28 second target and compresses the dedicated waterfront beat into the second clip. Review the scroll feel at website size before authorizing any additional generation or the all-1080p Standard rerender. The desktop draft should not be treated as the mobile deliverable; mobile still requires its own framing and lighter encodes.
