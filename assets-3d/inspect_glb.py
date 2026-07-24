"""Headless Blender: import a GLB, report mesh integrity, render one neutral 1080p still.

Usage:
  blender --background --python inspect_glb.py -- <glb_path> <out_png>
"""
import sys
import bpy
import bmesh
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1:]
GLB_PATH, OUT_PNG = argv[0], argv[1]

# Start from a truly empty scene so nothing from the default cube skews the report.
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=GLB_PATH)

meshes = [o for o in bpy.context.scene.objects if o.type == "MESH"]
print("\n=== GLB STRUCTURE ===")
print(f"objects total   : {len(bpy.context.scene.objects)}")
print(f"mesh objects    : {len(meshes)}")
print(f"materials       : {len(bpy.data.materials)}")
print(f"images/textures : {len(bpy.data.images)}")

for img in bpy.data.images:
    if img.size[0]:
        print(f"  texture: {img.name:32s} {img.size[0]}x{img.size[1]} ch={img.channels}")

# Scene-wide bounds, so we can frame the camera without guessing.
lo = Vector((1e9, 1e9, 1e9))
hi = Vector((-1e9, -1e9, -1e9))

print("\n=== PER-MESH INTEGRITY ===")
total_tris = total_verts = 0
for o in meshes:
    bm = bmesh.new()
    bm.from_mesh(o.data)

    # Non-manifold + boundary edges are how holes and mangled shells show up.
    boundary = [e for e in bm.edges if len(e.link_faces) == 1]
    nonmanifold = [e for e in bm.edges if len(e.link_faces) > 2]
    loose_verts = [v for v in bm.verts if not v.link_edges]

    tris = sum(len(p.verts) - 2 for p in bm.faces)
    total_tris += tris
    total_verts += len(bm.verts)

    for corner in o.bound_box:
        w = o.matrix_world @ Vector(corner)
        lo = Vector((min(lo[i], w[i]) for i in range(3)))
        hi = Vector((max(hi[i], w[i]) for i in range(3)))

    print(
        f"  {o.name:28s} verts={len(bm.verts):7d} tris={tris:7d} "
        f"boundary_edges={len(boundary):6d} nonmanifold={len(nonmanifold):5d} "
        f"loose_verts={len(loose_verts):4d} uv={'Y' if o.data.uv_layers else 'N'}"
    )
    bm.free()

size = hi - lo
ctr = (hi + lo) / 2
print(f"\ntotals: verts={total_verts} tris={total_tris}")
print(f"bounds min={tuple(round(v,3) for v in lo)} max={tuple(round(v,3) for v in hi)}")
print(f"size={tuple(round(v,3) for v in size)} center={tuple(round(v,3) for v in ctr)}")

# --- Neutral inspection lighting: flat, even, no creative grading. ---
# The point is to see the geometry honestly, not to make it look good.
world = bpy.data.worlds.new("W")
bpy.context.scene.world = world
world.use_nodes = True
world.node_tree.nodes["Background"].inputs[0].default_value = (0.05, 0.05, 0.05, 1)
world.node_tree.nodes["Background"].inputs[1].default_value = 1.0

def add_sun(name, loc, rot, energy):
    d = bpy.data.lights.new(name, type="SUN")
    d.energy = energy
    ob = bpy.data.objects.new(name, d)
    ob.location, ob.rotation_euler = loc, rot
    bpy.context.collection.objects.link(ob)

add_sun("key", (4, -4, 6), (0.9, 0, 0.8), 3.0)
add_sun("fill", (-5, -3, 2), (1.2, 0, -0.9), 1.5)
add_sun("back", (0, 5, 4), (-1.0, 0, 0), 2.0)

# Frame the whole stack from a 3/4 angle similar to the reference.
cam_data = bpy.data.cameras.new("Cam")
cam = bpy.data.objects.new("Cam", cam_data)
bpy.context.collection.objects.link(cam)
bpy.context.scene.camera = cam

radius = max(size) * 2.2 if max(size) > 0 else 5.0
cam.location = ctr + Vector((radius * 0.75, -radius * 0.75, radius * 0.55))
direction = ctr - cam.location
cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()

scene = bpy.context.scene

# Cycles + Metal: EEVEE's identifier varies across builds and it is fragile headless.
bpy.ops.preferences.addon_enable(module="cycles")
scene.render.engine = "CYCLES"
cprefs = bpy.context.preferences.addons["cycles"].preferences
try:
    cprefs.compute_device_type = "METAL"
    cprefs.get_devices()
    for d in cprefs.devices:
        d.use = True
    scene.cycles.device = "GPU"
    print("cycles device: GPU/METAL")
except Exception as exc:
    scene.cycles.device = "CPU"
    print(f"cycles device: CPU (metal unavailable: {exc})")

scene.cycles.samples = 64
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = OUT_PNG

bpy.ops.render.render(write_still=True)
print(f"\nRENDERED -> {OUT_PNG}")
