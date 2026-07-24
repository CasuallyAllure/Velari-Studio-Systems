# Blueprint — Positioning section fixes (v1)

Author: Fable 5, 2026-07-10. Source: HANDOFF.md concerns §1–§5, all verified there.
Execution is delegated down-tier per handoff; Fable 5 reviews every diff before commit.

Order chosen: cheapest-risk, highest-consistency first. Steps A–C need no user input
and start immediately. Step D and E each carry a user decision (asked up front, work
proceeds meanwhile).

---

## Step A — Chopped liver: regenerate the 5 slab plates (§4)  [Sonnet]

Goal: the old AI-generated `img/plates/stack_slab_1..5.png` (RGBA ~1013px) are replaced
by renders from `build_stack.py`, so the fan-out visual matches the new stack video.

1. Inspect `build_stack.py` for a way to render one layer alone. Objects are named
   per-part (`slab_0`, `robot_head`, …) but there is likely no visibility flag.
   If absent, add `--layer N` (0–4): hide all objects not belonging to layer N
   (name-prefix map), enable `film_transparent`, skip world bloom (`--haze 0 --dust 0`).
2. Render 5 stills: `--mode still --layer N --res 2048 --samples 160 --margin <tight>`
   with `--pivot-z` centered per slab (use `scene_bbox` auto-framing per layer).
   Output to `assets-3d/renders/slab_N.png`.
3. Post: trim transparent padding to content + 2% (PIL), match the old plates'
   aspect (portrait-ish crop), save over `img/plates/stack_slab_{1..5}.png`
   with identical filenames — zero HTML edits. Back up originals to `assets-3d/backup/`.
4. Verify: preview at 949px pane AND full width; screenshot the fan-out beat;
   alpha edges clean over the gradient (no white fringe — premultiply check).

Blender API traps: read `assets-3d/README.md` "Hard-won facts" first. Detach renders
(`nohup … & disown`). Stills ≈ minutes each; report total ETA before starting.

## Step B — Fade-out pop: ease + widen the posDio ramp (§2)  [Haiku]

Exact edit in `Velari Home v3.dc.html` (line ~1269). Replace the linear ramp:

- find:    `const late = this.map(p, 0.87, 0.93);`
- replace: `const lr = this.map(p, 0.83, 0.96); const late = lr * lr * (3 - 2 * lr);`

(smoothstep, window widened 6% → 13%). No other changes. Verify: scroll the payoff
at both widths; opacity must glide, not snap; confirm no other consumer of `late`.

## Step C — The "box": CSS corner-feather stopgap (§1)  [Haiku]

Do NOT re-render (69 min) and do NOT switch to alpha video (HEVC/VP9-alpha is a
Safari/Chrome fragmentation trap). Feather the offending corner in CSS — the video
already screen-blends, so masking its top-left 12% to transparent removes the lifted
edge with zero render cost:

- On the `stackPlate` video element style, add:
  `-webkit-mask-image:radial-gradient(140% 140% at 78% 62%, black 55%, transparent 98%);`
  `mask-image:radial-gradient(140% 140% at 78% 62%, black 55%, transparent 98%);`
  (center biased away from the bloom corner; tune center/stops visually.)
- Verify: corner edge invisible against `#0a0710` at rest AND during the dock-shift
  transform; check the loop seam still invisible.

Real fix remains Step E (real-time GLB, no rectangle exists at all). If the mask
shows banding on the bloom, fall back to re-rendering with `bloom_x` moved inboard
(render-side vignette), detached, overnight.

## Step D — Copy + type for the statements (§3)  [Fable 5 + user]

Blocked on a user pick (asked in-session). Three directions drafted:

- **D1 "Declarative"** — "Websites that run the business." / "Not just pages —
  machinery." Archivo 300 (not hairline), tracking 0.18em, larger Instrument italic
  pivot words in gold.
- **D2 "Build narrative"** — "First, we build your website." → "Then, the machine
  behind it." — two beats staggered with the stack's assembly; italic on "machine."
- **D3 "Manifesto minimal"** — promote the act3 line: "Not just websites.
  **Operating layers.**" as the sole statement, huge, with the stack payoff as the
  second beat. (Removes one scroll beat; tightens the act.)

After the pick: implement type spec + reveal timing, review at both widths.

## Step E — Real-time 3D endgame (§5)  [Sonnet build, Fable 5 architecture]

Blocked on the front-end decision (asked in-session). Regardless of the answer,
one prerequisite is unblocked NOW:

- **E0 (start immediately, Sonnet):** add `--glb-mode layers` to `build_stack.py` —
  merge per layer (5 groups: slab+props+thread per level) instead of per material.
  Target ≤ 40 draw calls, Draco, keep ≤ 400 KB. Export `assets-3d/stack_layers.glb`
  and verify in `viewer.html` that the 5 groups exist as named nodes.
- **E1 (after decision):** mount three.js scene at the payoff slot: transparent
  canvas (kills the box permanently), scroll-driven orbit + layer fan-out synced to
  the five copy rows; `prefers-reduced-motion` → static GLB pose; DPR-capped renderer;
  IO-gated render loop (no rAF when offscreen). Video stays as fallback source.
- If the answer is "Vite/React": flag loudly that `v3.dc.html` becomes a design
  reference, not the product — port order: tokens → sections → cinematic JS.

## Verification gate (every step)

- Screenshot at 949px pane and ~1710px full width before/after.
- Console clean; 60fps scroll (no long tasks > 50ms in the section).
- `git commit` per step with the step letter in the message; tree clean between steps.

---

## DECISIONS (2026-07-10, user)

- **Front-end: stay in `.dc.html`.** three.js mounts directly in the design file;
  no port. The Vite app remains dormant — flag it for cleanup in a later session.
- **Statements: D3 Manifesto minimal.** One statement beat: "Not just websites.
  Operating layers." — huge. The act3 header line gets replaced (no duplication);
  freed scroll budget goes to the stack payoff arriving earlier.
