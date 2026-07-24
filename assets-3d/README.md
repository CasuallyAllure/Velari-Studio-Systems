# assets-3d — procedural 3D pipeline

`build_stack.py` is the source of truth. Everything else in this folder is generated
from it. The `.blend` files, the mp4s, the GLB, the stills — all outputs. Edit the
script, never the `.blend`.

Requires Blender 5.x at `/Applications/Blender.app` and `ffmpeg`.

---

## Commands

```bash
BLENDER=/Applications/Blender.app/Contents/MacOS/Blender

# a still (look-dev; ~25s at 1280/128)
$BLENDER --background --python build_stack.py -- \
  --mode still --out renders/look.png --samples 128 --res 1280

# the shipped loop: 2560x1440, 210 frames, 30fps  (~69 min on an M4)
$BLENDER --background --python build_stack.py -- \
  --mode orbit --out frames/retina/r_ --frames 210 --samples 160 --res 2560 --fps 30

# a .blend you can open and scrub
$BLENDER --background --python build_stack.py -- \
  --mode orbit --frames 210 --out /dev/null --blend stack_orbit.blend

# web-ready GLB: merges by material, Draco-compressed (184 KB, 11 draw calls)
$BLENDER --background --python build_stack.py -- \
  --mode still --out /dev/null --dust 0 --haze 0 --glb stack.glb
```

Useful flags: `--yaw` (turn the stack), `--elev`, `--lens`, `--margin`,
`--pivot-z` + small `--margin` to frame one slab for a close-up, `--dust`, `--haze`.

### Encode (matches the other plates in `img/plates/`)

```bash
ffmpeg -y -framerate 30 -i frames/retina/r_%04d.png \
  -c:v libx264 -profile:v high -level 5.0 -preset slow -crf 16 \
  -pix_fmt yuv420p -movflags +faststart -an renders/stack_orbit_1440.mp4
```

Long renders should be detached from the Claude session or they die with it:
`nohup … &> render.log & disown`

### View the GLB

`viewer.html` is a self-contained three.js viewer. Serve the repo and open it:

```bash
python3 -m http.server 8080     # then open /assets-3d/viewer.html
```

---

## How it plugs into the page

`Velari Home v3.dc.html` line ~96 — the Positioning act's payoff. The `<video>` is
`mix-blend-mode: screen` over a `#0a0710` gradient, so **black in the video becomes
transparent**. Keep the void near-black. It loops and autoplays on intersection.

Every plate is 210 frames @ 30fps = 7.000s. Match that or the loop seams.

The `<video>` renders ~1120 CSS px wide → 2240 device px on retina. 1920 is
under-resolved; 2560 is the right master.

---

## Hard-won facts (do not relearn these)

**Blender 5.x API.** `scene.node_tree` was removed — the compositor is a node *group*
on `scene.compositing_node_group` with a registered interface socket. The Glare node's
type is a menu **input socket** named `Type`, not a `glare_type` property.
`Action.fcurves` is gone (slotted actions, 4.4+) — set
`preferences.edit.keyframe_new_interpolation_type` before inserting keyframes.
The engine enum here is `BLENDER_EEVEE`, not `BLENDER_EEVEE_NEXT`.

**`primitive_cube_add(size=1)` spans −0.5…0.5.** To get edge length `size`, scale by
`size`, *not* `size/2`. Getting this wrong halves every box in the scene, which reads
as props floating above their slab.

**The stack spins; the camera does not.** The live asset anchors its gold bloom and
dust to the frame. Orbiting the camera drags both across the screen every loop.

**The corner bloom is not volumetric.** A light-position sweep showed haze produces a
flat full-frame wash wherever the light sits. It's a screen-space `Window`-coordinate
gradient, gated on `Is Camera Ray` so the backdrop lights nothing. Volumetric haze cost
~19s/frame (light sampling through the volume × 9 lights) and bought only a softer
bloom rim, which a wider falloff gives for free.

**Mapping applies SCALE before LOCATION.** The bloom offset must be pre-multiplied by
the scale, and X scaled by the 16:9 aspect or the circle renders as an ellipse.

**Light falls off inverse-square.** A `ColorRamp` is spatially linear and yields either
a visible disc rim or a flat wash. Use a POWER curve (exponent ~8).

**Colour-match by measuring, not by eye.** Sample regions from both images and correct
against the deltas. The green cast was a *symptom* of a crushed void (`rgb(1,1,3)` vs
the live asset's `rgb(17,10,26)`), not a hue error.

**Cycles.** `use_persistent_data` (geometry is static), adaptive sampling, GPU
OpenImageDenoise with albedo+normal. Metal on the M4.

**Photogrammetry failed here, twice.** `generate_3d` on the approved render (2K and 4K)
destroyed the robot's face and the palette both times — a prop ~40px in the source
can't be recovered from one viewpoint, and it fuses everything into one shell. 60
credits. Don't retry it; model procedurally.

---

## Reusing this for other scenes

The pattern, not the stack, is the asset: a parameterised Blender scene emitting
video + GLB + stills from one command. Copy `build_stack.py`, keep `srgb_to_linear`,
`scene_bbox` auto-framing, `build_world`, `export_glb`, and the render config; replace
the `prop_*` builders.

Objects are named per-part (`slab_0`, `robot_head`, `gear_disc_0`, `thread_+1.40`) so
layers can be animated independently. **`export_glb` merges by material**, which
collapses 121 objects to 11 draw calls but destroys per-slab separability. For
scroll-driven layer separation, add an export mode that merges per *layer* (5 groups)
instead.

## Open

Real-time 3D (GLB + three.js, layers fanning out on scroll) needs a home. This repo has
two unrelated front-ends: the `.dc.html` design export and the Vite/React app behind
`index.html`. Nothing can be wired until one is chosen.
