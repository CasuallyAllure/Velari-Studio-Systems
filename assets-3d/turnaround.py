"""Headless Blender: render a 4-view turnaround (0/90/180/270) of a GLB into one contact sheet.

Reveals what a 360 orbit will expose on the unobserved back faces.

Usage:
  blender --background --python turnaround.py -- <glb_path> <out_dir> <tag>
"""
import math
import sys
import bpy
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1:]
GLB_PATH, OUT_DIR, TAG = argv[0], argv[1], argv[2]

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=GLB_PATH)

meshes = [o for o in bpy.context.scene.objects if o.type == "MESH"]
lo = Vector((1e9, 1e9, 1e9))
hi = Vector((-1e9, -1e9, -1e9))
for o in meshes:
    for corner in o.bound_box:
        w = o.matrix_world @ Vector(corner)
        lo = Vector((min(lo[i], w[i]) for i in range(3)))
        hi = Vector((max(hi[i], w[i]) for i in range(3)))
size, ctr = hi - lo, (hi + lo) / 2

world = bpy.data.worlds.new("W")
bpy.context.scene.world = world
world.use_nodes = True
world.node_tree.nodes["Background"].inputs[0].default_value = (0.05, 0.05, 0.05, 1)

# Backlight included so open/inverted shells read as blown-out or black gaps.
for name, loc, energy in (
    ("key", (4, -4, 6), 3.0),
    ("fill", (-5, -3, 2), 1.5),
    ("back", (0, 6, 4), 2.5),
):
    d = bpy.data.lights.new(name, type="SUN")
    d.energy = energy
    ob = bpy.data.objects.new(name, d)
    ob.location = loc
    ob.rotation_euler = (Vector(ctr) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
    bpy.context.collection.objects.link(ob)

cam_data = bpy.data.cameras.new("Cam")
cam = bpy.data.objects.new("Cam", cam_data)
bpy.context.collection.objects.link(cam)
bpy.context.scene.camera = cam

scene = bpy.context.scene
bpy.ops.preferences.addon_enable(module="cycles")
scene.render.engine = "CYCLES"
cprefs = bpy.context.preferences.addons["cycles"].preferences
cprefs.compute_device_type = "METAL"
cprefs.get_devices()
for d in cprefs.devices:
    d.use = True
scene.cycles.device = "GPU"
scene.cycles.samples = 48
scene.render.resolution_x = 960
scene.render.resolution_y = 1080
scene.render.image_settings.file_format = "PNG"

radius = max(size) * 1.5
for angle in (0, 90, 180, 270):
    rad = math.radians(angle)
    cam.location = ctr + Vector((math.sin(rad) * radius, -math.cos(rad) * radius, size.z * 0.25))
    cam.rotation_euler = (ctr - cam.location).to_track_quat("-Z", "Y").to_euler()
    scene.render.filepath = f"{OUT_DIR}/{TAG}_view_{angle:03d}.png"
    bpy.ops.render.render(write_still=True)
    print(f"VIEW {angle} -> {scene.render.filepath}")
