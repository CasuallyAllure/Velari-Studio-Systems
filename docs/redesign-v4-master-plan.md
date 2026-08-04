# Velari Systems v4 — Master Scheme and Current Status

Date: 2026-07-14

## North star

Velari should feel like a premium cinematic digital studio that builds both the public
experience and the operating system behind a business. The page is a restrained,
scroll-directed title sequence with bold camera language, large fields of negative space,
collectible 3D characters, liquid-glass information cards, and a small number of decisive
motion beats.

This document consolidates the user's long-form prompt set. The detailed visual and
implementation rules remain in `redesign-v4-direction.md`.

## Story order

1. **Industry character hero** — one neutral Velari mascot expressed as three occupational
   variants: healthcare/laboratory, construction, and property management. Their studio
   environments immediately communicate premium web presence, 24/7 intake, and operational
   assistance.
2. **Capabilities bridge** — the service ladder: **Presence → Intake → Operations**.
3. **Selected work / build systems** — a liquid-glass, video-led grid for real websites,
   applications, brand systems, campaigns, and automations. Supplied example videos remain
   references/placeholders until ownership and project attribution are verified.
4. **Studio proof** — a high-end modular grid explaining what Velari builds, the software
   and methods used, genuine proof when available, and a direct intake CTA. Never invent
   testimonials, revenue, client names, or employment history.
5. **Pricing world** — a miniature 3D San Francisco environment emerging through restrained
   luminous bone-white fog, leading into editable packages: Signature Site, Growth System,
   and AI Operations.
6. **Final conversion** — clear consultation/intake CTA with a reduced-motion equivalent.

## Visual system

- Deep navy `#010828`, cool cream `#EFF4FF`, restrained neon lime `#6FFF00`, and softer
  confirmation lime `#B2D770`.
- Dramatic low angles, occasional top-down compositions, one-point perspective, long holds,
  hard directional keys, warm focal accents, and large gradient negative space.
- Original Japanese-influenced collectible design; no imitation of a copyrighted character
  or direct replication of a specific filmmaker's signature style.
- Fine analog grain/halation is a finishing layer, not a distressed filter.

## Technical architecture

- Build v4 in the existing Vite + React + TypeScript app under `src/`.
- Use one reusable rigged mascot GLB with costume/body-mask attachments, not separate
  unrelated character meshes.
- Use real-time GLB only where interaction matters; use optimized pre-rendered plates for
  expensive atmosphere and complex transitions.
- Reserve Higgsfield for approved camera plates or frame-locked cinematic transitions.
  Draft and validate locally first; preflight credits before every paid action.
- Lazy-load heavy assets, cap device pixel ratio, supply posters, and honor
  `prefers-reduced-motion`.

## Asset sequence

1. Neutral mascot v0.1 Blender prototype from approved front + provisional side.
2. Front/side/three-quarter renders for silhouette review.
3. Refined four-view turnaround, production mesh, rig, web GLB, and attachment points.
4. Healthcare, construction, and property-management costume kits and environments.
5. Miniature San Francisco pricing world.
6. Motion plates, posters, mobile encodes where approved, and final social preview.

## Current status

- [x] Repository and React implementation target identified.
- [x] Previous 3D/diorama assets marked sunset and excluded from v4.
- [x] Long-form prompt set consolidated into the v4 direction.
- [x] Neutral mascot front image locked.
- [x] Corrected convex side silhouette approved provisionally and saved in the repo.
- [x] Procedural Blender v0.1 model delivered and rejected: box-like head and synthetic surface.
- [x] Blender v0.2 capsule/felt correction rejected: exaggerated shaved-fuzz texture and overly robotic construction.
- [ ] Blender v0.3 simplified collectible-toy direction awaiting review.
- [ ] Final rear/right views and production four-view lock.
- [ ] Costume/environment key art.
- [ ] React page implementation and scroll choreography.
- [ ] Pricing-world asset and final motion pass.

## Decision gates

The next user review is the three-render v0.1 model proof. After that approval, build the
lab costume first. Do not spend Higgsfield credits, generate the full scroll-video chain,
or lock production topology before that review.
