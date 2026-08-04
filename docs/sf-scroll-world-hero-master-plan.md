# Velari SF Scroll World — Hero Master Plan

> Historical v1 plan. The Golden Gate finale was superseded on July 22, 2026 by the geographically continuous Bay Bridge direction in `sf-scroll-world-photoreal-v2-plan.md`. The Golden Gate source assets remain preserved for reuse.

## Goal

Create a premium, scroll-scrubbed opening sequence that proves Velari can turn a
business into a cinematic digital world. The visitor begins above downtown San
Francisco, descends between buildings, passes through luminous coastal fog, and
emerges at the Golden Gate Bridge with the Pacific beyond it.

This is the opening proof of the site, not a decorative background. The rest of the
page explains the strategy, design, motion, development, and launch capability that
the hero has already demonstrated.

## Locked art direction

- Stylized architectural digital twin: materially rich and highly detailed, without
  attempting documentary photorealism.
- Deep navy atmosphere (`#010828`), cool cream architecture (`#EFF4FF`), restrained
  neon lime energy (`#6FFF00`), and soft lime accents (`#B2D770`).
- San Francisco fog interpreted as luminous bone-white powder: layered, glancingly
  lit, softly glowing, and filled with sparse fine particles.
- Large areas of cinematic negative space for copy.
- Fine grain, controlled bloom, subtle halation, and premium glass interface details.
- No text baked into rendered footage. Accessible HTML overlays remain crisp and
  editable.

## Continuous camera journey

The sequence is one perceived forward take. A full-frame fog passage provides a
frame-locked, invisible handoff between the downtown and bridge environments.

| Scroll | Camera beat | Visual purpose | Copy-safe area |
| --- | --- | --- | --- |
| 0–14% | High bird's-eye orbit over the Financial District; Transamerica Pyramid anchors the composition | Establish San Francisco and immediate premium scale | Upper-left / lower-left |
| 14–32% | Controlled crane descent toward the city grid | Convert the miniature city into a place the visitor can enter | Left third |
| 32–48% | Low forward flight through an architectural canyon; speed gradually rises | Demonstrate movement, depth, and craft | Minimal copy |
| 48–61% | City disappears into luminous bone-white fog and fine suspended particles | Hide the geographic relocation and create the emotional peak | Centered short statement only |
| 61–78% | Camera emerges over coastal water; the Golden Gate materializes through fog | Reveal the second landmark without a visible cut | Right third |
| 78–100% | Bridge settles left-to-right across the frame; camera drifts toward a wide Pacific-facing hold | Create a memorable landing composition and CTA stage | Upper-right / lower-right |

### Motion rules

- The camera always progresses forward; no pull-back connector.
- Acceleration is eased and intentional, with no sudden gimbal-like turns.
- The fog handoff reaches complete visual occlusion for at least eight source frames.
- Water, fog, particles, and bridge lights continue moving when the camera slows.
- Final Golden Gate view is side-on, with the bridge reading left-to-right and open
  water visible beyond it.

## Desktop and mobile compositions

Desktop and mobile are separately composed from the same master world.

- Desktop master: 3840×2160 source, framed for a 16:9 browser viewport.
- Desktop web encode: 2560×1440 and 1920×1080 fallbacks.
- Mobile master: dedicated 1080×1920 camera, not a center-cropped desktop render.
- Mobile keeps Transamerica, the downtown corridor, the fog portal, and one Golden
  Gate tower inside the central safe zone.
- Copy positions and timing may differ between desktop and mobile.
- Reduced-motion mode uses approved still keyframes and simple crossfades.

## From LiDAR to finished art

The LiDAR masters are measurement references, not final website geometry. Their tiny
points describe visible surfaces, which is why they look like boxes or dots in
Blender. They guide scale, silhouette, height, terrain, and landmark placement.

1. **Reference:** preserve the untouched USGS Financial District and Golden Gate
   point-cloud masters.
2. **Previsualization:** use reduced-density point clouds to approve camera path,
   pacing, framing, and the fog handoff cheaply.
3. **Clean geometry:** derive terrain, water, building massing, streets, Transamerica,
   and Golden Gate bridge components as proper polygonal surfaces.
4. **Art direction:** apply the cream/navy/lime material system, glass accents,
   architectural lights, and luminous fog.
5. **Final motion:** refine camera curves and independent environmental animation.
6. **Offline render:** render desktop and mobile image sequences in Blender.
7. **Web encoding:** create short-GOP MP4/WebM assets optimized for responsive
   scroll scrubbing.
8. **Integration:** wire the renders to the React page with the Scroll World engine,
   HTML copy overlays, lazy loading, and reduced-motion behavior.
9. **QA:** scrub forward and backward on desktop and mobile; verify no seam flashes,
   dropped frames, broken crops, or oversized downloads.

## Website narrative after the hero

The recovered six-scene studio story remains the page architecture beneath the city
flight:

1. Hero proof — San Francisco Scroll World.
2. Strategy Lab — positioning, audience, conversion.
3. Visual Forge — art direction, identity systems, and 3D.
4. Motion Studio — interaction, motion, and story.
5. Launch Room — development, performance, accessibility, and QA.
6. Your Site Next — conversion section and project intake.

Selected-work video cards, studio proof, service packages, and industry-specific
examples become supporting sections rather than competing hero concepts.

## Quality gates

No expensive final render or Higgsfield generation begins until the preceding gate is
approved:

1. Six-frame camera storyboard.
2. Low-resolution grayscale motion proof.
3. Clean-geometry look-dev stills.
4. Fog and lighting test.
5. Desktop final preview.
6. Mobile final preview.
7. Encoded web integration and device QA.

## Current status

- Financial District 0.5 m LiDAR master: complete.
- Golden Gate 0.5 m LiDAR master: complete.
- Creative direction and camera beats: locked in this plan.
- Next artifact: six-frame storyboard and low-resolution camera motion proof.
