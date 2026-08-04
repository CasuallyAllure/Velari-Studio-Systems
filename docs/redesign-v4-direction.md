# Velari Systems Redesign v4 — Direction

Date: 2026-07-14

## Source-of-truth decision

The v4 redesign will be built in the existing Vite + React + TypeScript app under `src/`.
The older `Velari Home*.dc.html` files remain design and copy references; they are not the
implementation target for v4.

The current user brief supersedes the older handoff decision to keep the `.dc.html` file as
the primary frontend.

## Asset retirement rule

All existing 3D and diorama work is sunset for this redesign, including:

- `assets-3d/`
- `img/dioramas/`
- `img/plates/stack_*`
- existing stack GLBs, slab renders, orbit renders, and related derived media

These files remain intact for reference and rollback, but the v4 site must not import or
display them. New 3D assets will live under a clearly versioned v4 asset directory.

## Business position

Velari is not only a web-design studio. It designs the public-facing brand experience and
the operating systems behind it:

- premium websites and custom applications;
- brand identity and high-end campaign creative;
- intelligent intake across web, chat, and phone;
- customer-service and scheduling assistants;
- personal and business assistants that complete approved operational tasks;
- integrations, portals, automation, and custom internal systems.

The value proposition should be framed as expanding a team's capacity and responsiveness,
not replacing people. Cost comparisons may show avoided overhead or the difference between
software operations and a full-time salary, but the tone must remain human and constructive.

## Page architecture

### 1. Industry character hero

A full-viewport, dark-navy 3D studio world introduces three priority industries through
original Japanese-influenced character figures:

1. **Healthcare** — a friendly laboratory/clinical professional in a precise healthcare
   environment.
2. **Construction** — a construction professional in a miniature active-site environment.
3. **Property management** — a property operator in a miniature building-management
   environment.

The characters are original Velari assets, not variants of existing third-party mascots.
Each industry card should communicate outcomes rather than generic labels:

- premium website and conversion-ready intake;
- 24/7 AI-supported web/phone response;
- scheduling, service routing, and operational assistance.

### 2. Capabilities bridge

A concise visual transition establishes the service ladder:

**Presence → Intake → Operations**

- Presence: website, brand, content, and campaigns.
- Intake: forms, chat, phone, routing, and CRM capture.
- Operations: portals, scheduling, follow-up, assistants, and custom workflows.

### 3. Selected work / build systems

Use the supplied liquid-glass video-grid direction, adapted from “space objects” into a
Velari portfolio system. It should show real builds and clearly label each artifact as a
website, application, brand system, campaign, or automation.

Reference videos supplied in the brief may be used only as temporary design references or
clearly marked placeholders. They must not be represented as Velari client work.

### 4. Studio proof

Adapt the supplied full-viewport portfolio grid into proof categories rather than invented
career history or fundraising claims:

- what Velari builds;
- client/process proof when real testimonials are available;
- software and platforms used;
- direct contact and intake CTA.

No fabricated client names, testimonials, revenue, or performance claims.

### 5. Pricing / engagement models

The supplied cinematic pricing-card layout becomes a set of honest packages:

1. **Signature Site** — premium website, strategy, responsive build, and structured intake.
2. **Growth System** — site plus branding/campaign assets, CRM integration, and automated
   follow-up.
3. **AI Operations** — omnichannel intake, scheduling, customer-service assistance,
   business-assistant workflows, portals, and custom integrations.

The background direction is a newly created miniature 3D San Francisco scene with luminous
bone-white volumetric fog, ethereal but restrained, matching the high-end navy/lime visual
system. It replaces the supplied moss reference video.

Pricing remains editable until scope and support terms are finalized. Do not ship the
reference `$3,180` or `+$520` values as Velari pricing without explicit approval.

## Visual system

- Background: deep space navy `#010828` with near-black depth.
- Primary text: cool cream `#EFF4FF`.
- Action/accent: neon lime `#6FFF00`, used sparingly.
- Secondary accent: softer botanical lime `#B2D770` for pricing and confirmation states.
- Surfaces: dark liquid glass with thin luminous edge gradients.
- Display typography: bold, condensed, geometric uppercase paired with a restrained script
  accent; body text stays highly readable.
- Motion: cinematic depth, slow confident camera movement, selective character animation,
  and clear scroll pacing. Avoid constant motion and decorative particle noise.

## Cinematic visual grammar

Use an original visual system built from recognizable cinematic techniques rather than
reproducing any one filmmaker or film:

- **Camera:** dramatic floor-level hero angles, occasional straight-down table compositions,
  wide-lens foreground exaggeration, precise symmetrical holds, and one-point perspectives.
- **Framing:** characters occupy only a controlled portion of the viewport. Reserve large
  fields of empty gradient space for typography, navigation, and the feeling of scale.
- **Palette:** deep navy and near-black foundations with selective mustard-gold, oxblood,
  warm cream, cobalt, and neon-lime accents. Saturation appears in focal objects, not across
  every surface.
- **Light:** hard directional key light, soft colored falloff, long graphic shadows, and
  luminous gradient atmosphere. Keep faces and occupational identifiers immediately clear.
- **Texture:** polished 3D materials with a restrained analog finish—fine film grain, gentle
  halation, and slight color separation—never a distressed retro filter over the whole page.
- **Editing rhythm:** long confident holds interrupted by a few decisive motion beats. Avoid
  constant floating, bouncing, or decorative animation.
- **Graphic design:** minimal interface chrome, large condensed headlines, tiny mono labels,
  and liquid-glass data cards positioned like title-sequence typography.

The target feeling is playful Japanese collectible design photographed with bold crime-cinema
camera language inside a contemporary premium digital studio.

## New asset set

1. Three character key art images with consistent proportions and material language.
2. Three character 3D GLBs or, if quality requires, pre-rendered transparent video turns.
3. One miniature San Francisco pricing-world plate/GLB.
4. Posters and reduced-motion stills for every animated hero/pricing asset.
5. A project-specific social preview image after the final visual direction is stable.

## Implementation guardrails

- Preserve the existing connector/intake architecture unless the redesign requires a
  targeted change.
- Never expose browser-side secret API keys.
- Retain honest placeholder labels until real portfolio/testimonial material is provided.
- Honor `prefers-reduced-motion` and provide readable static posters.
- Lazy-load heavy video and 3D assets; keep the first viewport responsive before they load.
- Test keyboard navigation, mobile layouts, and text contrast before release.
