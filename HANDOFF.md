# Handoff — Positioning section (the new 3D stack)

Written 2026-07-10 on branch `redesign-v3`. Picking this up in the Claude Code app.

## How to run this hand-off (READ FIRST)

- **Fable 5 owns the game plan.** Before editing anything, Fable 5 writes the blueprint:
  what changes, in what order, with what verification. Do not start with edits.
- **Delegate execution to cheaper tokens.** Fable 5 plans and reviews; hand the
  mechanical work down the tier (Haiku for grunt/one-liners, Sonnet for the build).
  Reserve the top model for architecture and the final review. This matches the
  project's existing model-tiering note in memory.
- **Everything is local, nothing is deployed.** `redesign-v3` has no upstream; there is
  no live URL. Serve locally with the no-cache server (below) or the browser shows
  stale HTML — that already bit us once this session.
- The 3D pipeline and its hard-won facts are documented in `assets-3d/README.md`.
  Read it before touching Blender; it lists the API traps that cost hours.

```bash
# no-cache local server (python http.server sends NO Cache-Control -> stale tabs)
cd ~/Documents/GitHub/Velari-Systems
python3 - <<'PY'
import http.server, socketserver
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control","no-store"); super().end_headers()
socketserver.TCPServer.allow_reuse_address=True
socketserver.TCPServer(("127.0.0.1",8090),H).serve_forever()
PY
# then open http://127.0.0.1:8090/Velari%20Home%20v3.dc.html  (hard-reload)
```

---

## STATUS — what's done

- New procedural 3D stack **shipped** into the Positioning payoff: `stack_orbit_1440.mp4`
  (2560×1440, 210f @30fps = 7.000s), colour-matched to the old asset within ~1–3/255.
  Source is `assets-3d/build_stack.py` — fully re-renderable at any res/angle/duration.
- 184 KB web GLB exported (`assets-3d/stack.glb`, 11 draw calls, 0 textures) + a
  three.js viewer at `assets-3d/viewer.html`.
- Design file `Velari Home v3.dc.html` had exactly ONE edit: the `<source src>` on
  line ~96, `stack_orbit_1080.mp4` -> `stack_orbit_1440.mp4`.
- Originals backed up in `assets-3d/backup/`; every step revertible via git.

The user likes the new 3D image. It "will do for now." The section AROUND it is the problem.

---

## CONCERNS TO TACKLE (user's words, verified in code)

### 1. Hero → stack transition is ugly; the video shows a "funky background box"
**Verified.** The `<video>` uses `mix-blend-mode:screen` over the page's `#0a0710`
gradient. Screen blend means *any non-black pixel adds light*, so the bright gold
bloom in the frame's upper-left corner reads as a glowing **rectangle edge** — a box.
Measured: video top-left corner ≈ rgb(209,187,147) vs page bg rgb(10,7,16); that lift
is the box. The other three corners are near-black (correctly invisible).
- The bloom I added makes the top-left corner *more* visible than the old asset did.
- Options for the next session to weigh:
  - **Feather the video edges** — vignette the top-left in the render so the bloom
    fades to black before the frame boundary (change `bloom_x/bloom_radius` in
    `build_world`, keep it away from the corner), OR
  - **Switch off screen-blend** and give the video a transparent (alpha) background —
    render with `film_transparent=True` and encode to a codec with alpha (VP9/HEVC),
    or use a WebM. Removes the box entirely but changes how it composites, OR
  - **Best: replace the video with the real-time GLB** (see §5) so there is no box,
    ever — it renders directly onto the page with a true transparent background.

### 2. The fade-out is not gradual (abrupt pop)
**Verified.** `Velari Home v3.dc.html` line ~1269: `posDio` opacity is driven by
`map(p, 0.87, 0.93)` where `map(v,a,b) = clamp01((v-a)/(b-a))` — a **pure linear ramp
over a 6% scroll window**. No easing. That's why it snaps.
- Fix: ease the ramp (smoothstep) and/or widen the window. Cheap, isolated JS edit:
  `const late = smooth(map(p,0.83,0.96))` with a smoothstep helper. One-liner class of change.

### 3. The copy + fonts are weak: "we build websites / and the systems behind them"
**Verified.** Lines ~100–101. `Archivo` weight 100 (hairline) + `Instrument Sans`
italic, `letter-spacing:0.3em`, uppercase. Fonts ARE loaded (`@font-face`, 41 Archivo
refs). User finds it uncreative and ugly.
- This is a copy + type-design task, not a bug. Wants stronger wording and a more
  characterful type treatment. Bring a design skill; propose 2–3 directions before editing.

### 4. THE "CHOPPED LIVER" — a SECOND, OLD stack asset still on the page
**Found it — this is the real surprise.** Further down there is a *separate* stack
visual, `stackStill` / `plane0..4` (line ~118), built from FIVE old AI-generated PNGs:
`img/plates/stack_slab_1.png` … `stack_slab_5.png` (RGBA, ~1013px wide each). These are
the pre-render look. So the user scrolls: NEW cool stack (video) → words → OLD ugly
stack (slab PNGs). "one shitty one cool."
- These five slabs are exactly the five layers `build_stack.py` already models. The
  pipeline can regenerate matching plates: render each slab alone (transparent bg) via
  `--yaw/--pivot-z/--margin` framing + `film_transparent`, export 5 PNGs, drop them in.
- This is the highest-value quick win: it makes the whole section consistent.

---

## §5 — The real fix (bigger, user is picking this up in the app)

User: *"we're gonna have to put some work in to fully realize this… I have tons of ideas
for websites and ads."* The endgame is **real-time 3D**, not video:
- The 184 KB GLB + three.js means the stack rotates/reacts on scroll, layers fan out
  when the copy names them, no background box, no fade artifacts. This kills concerns
  #1, #2, and #4 at once.
- **BLOCKER (decide first):** this repo has TWO unrelated front-ends — the `.dc.html`
  design export (what's live) and a Vite/React app behind `index.html`. Real-time 3D
  must live in one. Nobody has chosen. Fable 5's blueprint should resolve this before
  any three.js work.
- Caveat in `assets-3d/README.md`: `export_glb` merges by material (11 draw calls) but
  destroys per-slab separability. Scroll-driven layer separation needs a per-LAYER
  export mode (5 groups) added to `build_stack.py` first.

---

## Suggested order (for the blueprint)
1. **§4 chopped-liver** — regenerate the 5 slab plates from the pipeline (consistency, quick).
2. **§2 fade easing** — smoothstep the opacity ramp (one-liner, immediate polish).
3. **§1 the box** — feather the render's corner bloom as a stopgap; real fix is §5.
4. **§3 copy + type** — design pass, needs user input on wording/direction.
5. **§5 real-time 3D** — after the front-end decision. The big one.
