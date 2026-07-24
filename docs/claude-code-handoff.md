# Velari Systems — Homepage art-direction handoff to Claude Code (Fable 5)

**Role:** You are the lead. Draft a grand plan first, then spin up smaller sub-agents to
execute discrete workstreams in parallel. Do NOT start coding before the plan is approved.

---

## 1. The one-line vision

The Velari homepage should feel like a **cinematic title sequence you scroll through** —
not a website with a particle effect bolted on. Reference: high-end TV/film main-title
sequences where **gold/rose powder bursts bloom out of black**, camera drifting slowly
through volumetric dust. As you scroll, you travel *through* scenes — each scene is a
piece of real 3D/video craft that proves what Velari builds.

Think: BAFTA/HBO title card energy. Powder-explosion beats, lit from within, warm
gold → rose → bone-white against near-black plum. Slow, expensive, restrained. Never busy,
never "particle.js."

## 2. What is broken right now (be honest with yourself)

The current build (`Velari Home v3.dc.html`) has a hand-rolled 2D `<canvas>` dust system.
It reads as **tiny twinkly fairy specks**, not the dense luminous powder in the reference
frames. Gradient "zone" transitions between sections are so subtle they're invisible. The
whole thing lost the plot: it's a normal dark landing page with faint sparkles, not a
scroll-through film.

**Do not try to rescue the 2D speck system.** Replace the ambient/dust layer with something
that can actually look like the references.

## 3. Reference material (in this repo)

- `uploads/Screenshot 2026-07-08 at 8.49.35 PM.png` — powder burst, "RUTH WILSON" title card. Rose-gold spark explosion on plum-black.
- `uploads/Screenshot 2026-07-08 at 8.50.16 PM.png` — "ANNE-MARIE DUFF" — huge bone/gold galaxy-like powder bloom, lit from center.
- `uploads/Screenshot 2026-07-08 at 8.51.01 PM.png` — vertical gold dust streams falling/rising over a reflective floor. This is the texture density we want.
- `uploads/Screenshot 2026-07-08 at 8.57.57 PM.png` — "JAMES…" — a diagonal jet of glittering powder thrown across frame. Directional, kinetic.
- A **video reference** the client will supply (IMG_2408, on their desktop — ask for it if not yet attached). It shows the scroll-through-scenes motion and the exact color palette in motion. Watch it before planning.

**Palette pulled from the refs:** near-black plum `#0a0710`/`#181017`, warm gold
`#f4d68c`/`#ecbc6e`, rose-gold `#ecb29e`, bone highlight `#fcf4de`, deep ember `#dc9a5c`.
Everything glows additively out of darkness. No blues in the dust (current build wrongly
mixes cool tones).

## 4. The scroll-through-scenes concept (the big idea)

As the user scrolls, they move through a sequence of **volumetric scenes**, each one a
proof of a Velari capability. Powder/dust is the connective tissue *between* scenes — one
scene dissolves into powder, the powder reforms into the next.

Industry scenes to build (each is a "we can build for big business" proof):
- **Real estate** → a 3D model of a home (Blender/GLB) assembling out of dust, or a slow orbit through an architectural render.
- **Hospitals / healthcare** → a 3D hospital or medical facility forming from powder.
- **(client to confirm others)** → restaurants/venues, logistics, etc. Ask the client which industries matter most before building all of them.

Each scene: camera drifts, dust blooms, the 3D object resolves, a short line of copy lands,
then it dissolves forward into the next. Scroll position drives the timeline (scrubbable).

## 5. How to actually achieve the look (technical options — you decide, propose in plan)

The client mentioned **Higgsfield** (AI video/motion generation) — use it to generate the
hero powder-burst plates and scene-to-scene dust transitions as **looping video/image
sequences**, then composite them. This is the realistic path to the reference quality;
hand-coded canvas will not get there.

Recommended stack to evaluate:
- **Pre-rendered video plates** (Higgsfield / Runway / Blender) for the powder bursts and
  dissolves — full-bleed `<video>` or image-sequence layers, scroll-scrubbed.
- **Three.js / R3F or `<model-viewer>`** for the actual 3D industry models (home, hospital),
  so they can orbit and assemble on scroll. GLB assets from Blender.
- **GSAP ScrollTrigger** (or a scroll-timeline) to drive scene progression, dissolves, and
  copy reveals. Pin sections, cross-fade video plates, scrub 3D camera.
- Keep the existing type system: **Archivo** (thin uppercase display), **Instrument Sans**
  (italic accents + body), **Geist Mono** (labels/eyebrows), **Panchang** (available).
  Fonts live in `fonts/`. Hero photo `img/sfbay_hero_3840.webp` (SF Bay) — keep or replace.

## 6. Constraints / house rules

- This project builds as **Design Components (`.dc.html`)** in an internal HTML runtime.
  If you're taking the code fully into a Vite/Next/Three stack outside that runtime, say so
  explicitly in the plan and flag that the `.dc.html` version will be superseded — don't
  silently break the existing file.
- Performance: this must run at 60fps on a laptop. Pre-rendered video + one GLB per scene,
  lazy-loaded, is cheaper than heavy real-time particle sims. Budget it in the plan.
- Restraint over spectacle. Slow camera, few strong beats, lots of negative black space.
  The references are *minimal* — one bloom, one title, held. Don't fill every pixel.
- Accessibility: honor `prefers-reduced-motion` (swap scrubbed video for a static poster).

## 7. Deliverable structure (suggested sub-agent breakdown)

1. **Plan agent (you):** watch the video ref, write the scene-by-scene storyboard +
   technical architecture + asset list. Get client sign-off.
2. **Powder/plate agent:** generate & composite the Higgsfield/video dust plates (hero
   burst, 4–5 scene dissolves). Deliver looping, color-graded, seamless assets.
3. **3D-scene agent:** source/build the GLB models (home, hospital, …), set up the Three.js
   scroll-scrubbed camera + assemble-from-dust reveal per scene.
4. **Layout/copy agent:** section structure, type, copy beats per scene, nav, CTA, footer.
   Reuse existing Velari copy where it still fits (see current `Velari Home v3.dc.html`).
5. **Integration/perf agent:** wire scroll timeline, lazy-load assets, reduced-motion
   fallbacks, QA at 60fps.

## 8. First action

Before writing any code: (a) watch the client's video reference, (b) study the 4 screenshots,
(c) confirm the industry list, then (d) present the grand plan + storyboard for approval.
