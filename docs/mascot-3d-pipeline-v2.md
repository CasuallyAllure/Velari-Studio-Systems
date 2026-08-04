# Mascot v2 — Credit-Conscious 3D Pipeline

## Hard gate

Do not build, upload, rig, or generate a 3D asset from Mascot v1. Start only after both
items below are approved:

1. The cylindrical-head `base-v2` canonical image.
2. Four separate, consistent v2 images: front, left, rear, and right.

The old stack/diorama pipeline is sunset and excluded.

### Provisional local-build exception

On 2026-07-14 the user approved the corrected left-side silhouette as good enough to use
temporarily and asked to begin the real 3D model. A clearly labeled **v0.1 prototype** may
therefore be built procedurally in local Blender from the locked front image and approved
provisional side image. This exception does not permit a paid image-to-3D job, final
topology lock, or production rig approval. Those remain gated on the four-view set.

## Tool budget

- Use local/image tools and Claude for concepts, prompt work, costumes, copy, shot planning,
  and iteration.
- Use Blender for cleanup, topology, materials, rigging, costume attachments, animation,
  rendering, and web exports.
- Use Higgsfield only when it provides a unique advantage. The first planned use is one
  approved multi-image-to-3D reconstruction.
- Every paid Higgsfield action must be cost-preflighted. No automatic retry, texture rerun,
  rig, or animation generation.

## Input acceptance

- Same neutral mascot and proportions in all four views.
- Full body, uncropped, consistent scale/camera/lighting.
- Arms slightly away from the body; feet and hands separated.
- Plain background with minimal shadow.
- Side views clearly show the compact cylindrical head depth without making it wide or fat.
- Hash every approved source image and record a simple proportion sheet.

## One planned Higgsfield generation

Use `multi_image_to_3d` with four views, one result, textures and PBR enabled, quad remesh,
symmetry on, approximately 60k target polygons, and a fixed recorded seed. Disable automatic
rigging and animation. Preflight this exact request first and report the quoted credits and
remaining balance before submission.

## Blender finish

Preserve the raw generated GLB, then clean a copy in Blender:

- correct the head silhouette first;
- remove floaters, hidden shells, holes, and self-intersections;
- separate lenses, head, antenna, torso, limbs, joints, feet, and foot dots;
- create stable felt, lens-glass, graphite, and brushed-metal materials;
- manually rig the short stylized body;
- add costume attachment points and body-mask groups;
- test a neutral coat proxy for shoulder, neck, torso, and arm clearance;
- export an editable master and a lighter web GLB.

## Release gate

The model must match the approved four-view silhouette, remain plain and costume-ready,
retain its cylindrical head, survive a basic pose suite without clipping, render cleanly in
Blender and a glTF viewer, and meet a practical web target of roughly 25–40k triangles,
eight or fewer material draw calls, and a compressed size near 5–8 MB.
