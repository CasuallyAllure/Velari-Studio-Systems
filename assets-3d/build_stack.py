"""Procedurally build the Velari system-stack centerpiece and render it.

Five rounded slabs floating in a plum void, joined by gold light threads.
Bottom -> top: control desk, gears + wind-up key, robot head, palette + brush,
storefront screen. Matches Higgsfield job 6fe13527 (the approved reference).

Palette is sampled from that reference. No blue tones anywhere, by construction.

Usage:
  blender --background --python build_stack.py -- --mode still --out out.png
  blender --background --python build_stack.py -- --mode orbit --out frames/ \
      --frames 96 --samples 48 --res 1920
"""
import argparse
import math
import random
import sys

import bpy
from mathutils import Vector

# --------------------------------------------------------------------------
# Palette. Hex is sRGB as sampled from the reference; Blender wants linear.
# --------------------------------------------------------------------------
VOID = "0A0710"        # near-black plum, per spec (ref reads #120A19)
GOLD_KEY = "F4D68C"    # warm gold key light (ref bloom #ECC889)
BONE = "F5EFE2"        # rim highlight
THREAD_CORE = "FFE3A0" # warm gold thread

TERRACOTTA = "A2563E"
SAGE = "6F6B42"
CREAM = "E8DCC4"
GOLD = "E3AC68"
DESK_BROWN = "A98653"
DEEP_RED = "9E3B2E"
MUSTARD = "D9A441"
OLIVE_DAB = "7C8A4A"
FACE_DARK = "4A2A22"

SLAB_COLORS = [TERRACOTTA, SAGE, TERRACOTTA, SAGE, TERRACOTTA]  # bottom -> top

SLAB_W = 2.0
SLAB_T = 0.34
PITCH = 1.16  # vertical distance between slab centers
PROP_SCALE = 1.24  # props fill their slab without hitting the one above


def srgb_to_linear(hex_str):
    """Blender colors are linear. Feeding sRGB hex directly washes everything out."""
    def chan(v):
        v /= 255.0
        return v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = (int(hex_str[i:i + 2], 16) for i in (0, 2, 4))
    return (chan(r), chan(g), chan(b), 1.0)


def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


# --------------------------------------------------------------------------
# Materials
# --------------------------------------------------------------------------
def _principled(mat):
    return mat.node_tree.nodes["Principled BSDF"]


def _set(node, name, value):
    """Principled socket names moved around across Blender versions."""
    if name in node.inputs:
        node.inputs[name].default_value = value


def matte_plastic(name, hex_color, roughness=0.55):
    """The reference look: soft matte plastic, no metal, gentle highlight."""
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    p = _principled(mat)
    _set(p, "Base Color", srgb_to_linear(hex_color))
    _set(p, "Roughness", roughness)
    _set(p, "Metallic", 0.0)
    _set(p, "Specular IOR Level", 0.35)
    return mat


def emissive(name, hex_color, strength):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    p = _principled(mat)
    _set(p, "Base Color", srgb_to_linear(hex_color))
    _set(p, "Emission Color", srgb_to_linear(hex_color))
    _set(p, "Emission Strength", strength)
    _set(p, "Roughness", 0.4)
    return mat


# --------------------------------------------------------------------------
# Mesh helpers
# --------------------------------------------------------------------------
def smooth(obj):
    try:
        bpy.context.view_layer.objects.active = obj
        bpy.ops.object.shade_auto_smooth(angle=math.radians(35))
    except Exception:
        for poly in obj.data.polygons:
            poly.use_smooth = True


def bevel(obj, width=0.04, segments=4):
    mod = obj.modifiers.new("Bevel", "BEVEL")
    mod.width = width
    mod.segments = segments
    mod.limit_method = "ANGLE"
    mod.angle_limit = math.radians(30)
    return mod


def new_cube(name, size, location, color, bevel_w=0.05, rotation=(0, 0, 0)):
    # primitive_cube_add(size=1) spans -0.5..0.5, i.e. edge length 1. To land on
    # edge length `size` the scale is `size`, NOT `size/2`.
    bpy.ops.mesh.primitive_cube_add(size=1, location=location, rotation=rotation)
    o = bpy.context.active_object
    o.name = name
    o.scale = Vector(size)
    bpy.ops.object.transform_apply(scale=True)
    bevel(o, bevel_w)
    smooth(o)
    o.data.materials.append(color)
    return o


def new_cyl(name, r, h, location, color, rotation=(0, 0, 0), verts=32):
    bpy.ops.mesh.primitive_cylinder_add(
        radius=r, depth=h, location=location, rotation=rotation, vertices=verts
    )
    o = bpy.context.active_object
    o.name = name
    bevel(o, min(0.012, r * 0.2), 2)
    smooth(o)
    o.data.materials.append(color)
    return o


def new_sphere(name, r, location, color, scale=(1, 1, 1)):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=r, location=location, segments=24, ring_count=16)
    o = bpy.context.active_object
    o.name = name
    o.scale = scale
    smooth(o)
    o.data.materials.append(color)
    return o


def boolean_cut(target, cutter):
    mod = target.modifiers.new("Cut", "BOOLEAN")
    mod.operation = "DIFFERENCE"
    mod.object = cutter
    bpy.context.view_layer.objects.active = target
    bpy.ops.object.modifier_apply(modifier=mod.name)
    bpy.data.objects.remove(cutter, do_unlink=True)


# --------------------------------------------------------------------------
# Props. Each returns the list of objects it created, so slabs stay separable.
# --------------------------------------------------------------------------
def prop_control_desk(z, mats):
    """Bottom layer: angled console with knobs and faders."""
    parts = []
    body = new_cube("desk_body", (1.15, 0.8, 0.16), (0, 0, z + 0.08), mats["desk"], 0.03)
    parts.append(body)
    # Angled front panel gives it the console silhouette.
    panel = new_cube(
        "desk_panel", (1.15, 0.42, 0.06), (0, -0.22, z + 0.20), mats["desk"], 0.02,
        rotation=(math.radians(-18), 0, 0),
    )
    parts.append(panel)

    knob_colors = [mats["deep_red"], mats["mustard"], mats["olive_dab"], mats["cream"]]
    for i, mc in enumerate(knob_colors):
        x = -0.42 + i * 0.28
        stem = new_cyl(f"knob_stem_{i}", 0.035, 0.05, (x, 0.22, z + 0.185), mats["cream"])
        cap = new_cyl(f"knob_cap_{i}", 0.05, 0.035, (x, 0.22, z + 0.22), mc)
        parts += [stem, cap]

    # Faders: recessed slots with a rider cap.
    for i in range(4):
        x = -0.40 + i * 0.26
        slot = new_cube(f"fader_slot_{i}", (0.03, 0.30, 0.012), (x, -0.10, z + 0.165), mats["face_dark"], 0.004)
        cap = new_cube(f"fader_cap_{i}", (0.075, 0.05, 0.03), (x, -0.16 + (i % 2) * 0.12, z + 0.185), mats["gold"], 0.008)
        parts += [slot, cap]
    return parts


def prop_gears(z, mats):
    """Fourth layer: three meshing cogs plus a wind-up key."""
    parts = []
    specs = [(-0.18, 0.05, 0.30, 20), (0.26, 0.10, 0.20, 14), (0.02, -0.30, 0.16, 12)]
    for gi, (gx, gy, radius, teeth) in enumerate(specs):
        disc = new_cyl(f"gear_disc_{gi}", radius, 0.07, (gx, gy, z + 0.06), mats["gold"])
        parts.append(disc)
        hub = new_cyl(f"gear_hub_{gi}", radius * 0.25, 0.09, (gx, gy, z + 0.065), mats["cream"])
        parts.append(hub)
        for t in range(teeth):
            a = (2 * math.pi / teeth) * t
            # Sit the tooth just proud of the rim, not centred on it, or the cog
            # reads as a flower rather than a gear.
            tx = gx + math.cos(a) * (radius + radius * 0.07)
            ty = gy + math.sin(a) * (radius + radius * 0.07)
            tooth = new_cube(
                f"gear_tooth_{gi}_{t}", (radius * 0.20, radius * 0.13, 0.072),
                (tx, ty, z + 0.06), mats["gold"], 0.006, rotation=(0, 0, a),
            )
            parts.append(tooth)

    shaft = new_cyl("key_shaft", 0.022, 0.36, (0.60, 0.24, z + 0.06), mats["terracotta"],
                    rotation=(0, math.radians(90), math.radians(20)))
    parts.append(shaft)
    bpy.ops.mesh.primitive_torus_add(
        location=(0.78, 0.31, z + 0.06), major_radius=0.09, minor_radius=0.022,
        rotation=(math.radians(90), 0, math.radians(20)),
    )
    loop = bpy.context.active_object
    loop.name = "key_loop"
    smooth(loop)
    loop.data.materials.append(mats["terracotta"])
    parts.append(loop)
    return parts


def prop_robot(z, mats):
    """Middle layer: the friendly robot head. The emotional centre of the piece.

    Face features are spheres/tori sitting PROUD of the face plate. Burying them
    and relying on a rounded head to clip them is what produced the earlier blob.
    """
    parts = []
    head = new_cube("robot_head", (0.66, 0.56, 0.52), (0, 0, z + 0.26), mats["cream"], 0.06)
    parts.append(head)

    face_y = -0.281  # front face of the head, before bevel
    face = new_cube("robot_face", (0.46, 0.02, 0.34), (0, face_y, z + 0.29), mats["face_dark"], 0.010)
    parts.append(face)

    for i, sx in enumerate((-0.115, 0.115)):
        eye = new_sphere(f"robot_eye_{i}", 0.038, (sx, face_y - 0.014, z + 0.36), mats["cream"],
                         scale=(1.0, 0.55, 1.0))
        parts.append(eye)

    # Smile: lower arc of a torus. A full ring centred on the face reads as a
    # camera lens, so cut the upper half away with a box.
    bpy.ops.mesh.primitive_torus_add(
        location=(0, face_y - 0.008, z + 0.255), major_radius=0.09, minor_radius=0.014,
        rotation=(math.radians(90), 0, 0), major_segments=40, minor_segments=12,
    )
    smile = bpy.context.active_object
    smile.name = "robot_smile"
    smile.scale = (1.0, 1.0, 0.62)
    bpy.ops.object.transform_apply(scale=True)
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, face_y - 0.008, z + 0.255 + 0.075))
    cutter = bpy.context.active_object
    cutter.scale = (0.4, 0.2, 0.15)
    bpy.ops.object.transform_apply(scale=True)
    boolean_cut(smile, cutter)
    smooth(smile)
    smile.data.materials.append(mats["cream"])
    parts.append(smile)

    for i, sx in enumerate((-0.345, 0.345)):
        ear = new_cyl(f"robot_ear_{i}", 0.055, 0.07, (sx, 0, z + 0.26), mats["terracotta"],
                      rotation=(0, math.radians(90), 0))
        parts.append(ear)

    # Back panel + cooling fins. Without these the 180 deg arc of the orbit shows
    # a blank cream cube for a quarter of the loop.
    back_y = 0.281
    plate = new_cube("robot_back_plate", (0.40, 0.02, 0.30), (0, back_y, z + 0.27),
                     mats["desk"], 0.010)
    parts.append(plate)
    for i in range(4):
        fin = new_cube(f"robot_fin_{i}", (0.30, 0.018, 0.022),
                       (0, back_y + 0.012, z + 0.16 + i * 0.072), mats["face_dark"], 0.005)
        parts.append(fin)
    for i, sx in enumerate((-0.13, 0.13)):
        bolt = new_sphere(f"robot_bolt_{i}", 0.020, (sx, back_y + 0.010, z + 0.40), mats["gold"])
        parts.append(bolt)

    ant = new_cyl("robot_antenna", 0.013, 0.18, (0.15, 0.05, z + 0.60), mats["cream"])
    bulb = new_sphere("robot_bulb", 0.044, (0.15, 0.05, z + 0.71), mats["gold_hot"])
    parts += [ant, bulb]
    return parts


def prop_palette(z, mats):
    """Second layer: paint palette with thumb hole, dabs, and a brush."""
    parts = []
    bpy.ops.mesh.primitive_cylinder_add(radius=0.42, depth=0.05, location=(-0.05, 0.02, z + 0.05), vertices=48)
    pal = bpy.context.active_object
    pal.name = "palette"
    pal.scale = (1.0, 0.82, 1.0)
    bpy.ops.object.transform_apply(scale=True)

    bpy.ops.mesh.primitive_cylinder_add(radius=0.09, depth=0.3, location=(0.14, -0.10, z + 0.05), vertices=24)
    boolean_cut(pal, bpy.context.active_object)
    bevel(pal, 0.012, 2)
    smooth(pal)
    pal.data.materials.append(mats["gold"])
    parts.append(pal)

    dabs = [(-0.26, 0.20, mats["deep_red"]), (-0.06, 0.26, mats["mustard"]),
            (0.16, 0.20, mats["olive_dab"]), (-0.30, -0.02, mats["cream"]),
            (0.22, -0.02, mats["terracotta"])]
    for i, (dx, dy, dm) in enumerate(dabs):
        dab = new_sphere(f"dab_{i}", 0.052, (dx - 0.05, dy + 0.02, z + 0.075), dm, scale=(1, 1, 0.45))
        parts.append(dab)

    handle = new_cyl("brush_handle", 0.021, 0.52, (0.30, -0.30, z + 0.10), mats["terracotta"],
                     rotation=(math.radians(84), 0, math.radians(-35)))
    parts.append(handle)
    bpy.ops.mesh.primitive_cone_add(radius1=0.035, radius2=0.0, depth=0.12,
                                    location=(0.12, -0.44, z + 0.09),
                                    rotation=(math.radians(-96), 0, math.radians(-35)))
    tip = bpy.context.active_object
    tip.name = "brush_tip"
    smooth(tip)
    tip.data.materials.append(mats["face_dark"])
    parts.append(tip)
    return parts


def prop_storefront(z, mats):
    """Top layer: the storefront screen — browser chrome plus a grid of product cards.

    Chrome bar is inset within the bezel, not flush with it, so nothing overhangs
    the screen edge when the camera swings round.
    """
    parts = []
    bezel = new_cube("screen_bezel", (1.34, 1.02, 0.045), (0, 0, z + 0.050), mats["terracotta"], 0.022)
    parts.append(bezel)
    glass = new_cube("screen_glass", (1.20, 0.88, 0.02), (0, 0, z + 0.080), mats["cream"], 0.012)
    parts.append(glass)

    bar = new_cube("screen_bar", (1.20, 0.12, 0.012), (0, 0.375, z + 0.093), mats["gold"], 0.005)
    parts.append(bar)
    for i, dx in enumerate((-0.52, -0.45, -0.38)):
        dot = new_sphere(f"screen_dot_{i}", 0.016, (dx, 0.375, z + 0.101), mats["cream"])
        parts.append(dot)

    card_mats = [mats["terracotta"], mats["olive_dab"], mats["mustard"],
                 mats["deep_red"], mats["gold"], mats["olive_dab"]]
    for i in range(6):
        cx = -0.345 + (i % 3) * 0.345
        cy = 0.155 - (i // 3) * 0.30
        plate = new_cube(f"card_{i}", (0.28, 0.22, 0.012), (cx, cy, z + 0.096), mats["cream"], 0.010)
        chip = new_cube(f"chip_{i}", (0.15, 0.10, 0.022), (cx, cy + 0.025, z + 0.110), card_mats[i], 0.007)
        parts += [plate, chip]
    return parts


# --------------------------------------------------------------------------
# Scene assembly
# --------------------------------------------------------------------------
def build_materials():
    return {
        "terracotta": matte_plastic("terracotta", TERRACOTTA),
        "sage": matte_plastic("sage", SAGE),
        "cream": matte_plastic("cream", CREAM, 0.6),
        "gold": matte_plastic("gold", GOLD, 0.45),
        "desk": matte_plastic("desk", DESK_BROWN, 0.6),
        "deep_red": matte_plastic("deep_red", DEEP_RED),
        "mustard": matte_plastic("mustard", MUSTARD),
        "olive_dab": matte_plastic("olive_dab", OLIVE_DAB),
        "face_dark": matte_plastic("face_dark", FACE_DARK, 0.5),
        "gold_hot": emissive("gold_hot", GOLD_KEY, 12.0),
        "thread": emissive("thread", THREAD_CORE, 11.0),
    }


def scale_props(parts, pivot_z, factor):
    """Grow props about the slab's top face so they keep sitting on it."""
    pivot = Vector((0.0, 0.0, pivot_z))
    for o in parts:
        o.scale = tuple(s * factor for s in o.scale)
        o.location = pivot + (o.location - pivot) * factor
    return parts


def build_stack(mats):
    """Slabs bottom -> top, each with its prop. Returns (all_objects, height).

    Slabs are turned 45 deg so a corner faces camera (the reference's isometric
    read) while the props stay square to -Y, so the robot still looks at you.
    """
    builders = [prop_control_desk, prop_gears, prop_robot, prop_palette, prop_storefront]
    objs = []
    base_z = -2 * PITCH
    for i, (hex_c, builder) in enumerate(zip(SLAB_COLORS, builders)):
        z = base_z + i * PITCH
        mat = mats["terracotta"] if hex_c == TERRACOTTA else mats["sage"]
        slab = new_cube(f"slab_{i}", (SLAB_W, SLAB_W, SLAB_T), (0, 0, z), mat, 0.075,
                        rotation=(0, 0, math.radians(45)))
        objs.append(slab)
        top = z + SLAB_T / 2
        objs += scale_props(builder(top, mats), top, PROP_SCALE)

    # Gold light threads. With the slabs turned 45 deg their left/right corners sit
    # at +/- half the diagonal, which is exactly where the reference's threads run.
    top_z = base_z + 4 * PITCH
    span = (top_z - base_z) + 0.10
    corner = (SLAB_W / 2) * math.sqrt(2) * 0.99
    for sx in (-corner, corner):
        t = new_cyl(f"thread_{sx:+.2f}", 0.005, span, (sx, 0.0, (top_z + base_z) / 2),
                    mats["thread"], verts=12)
        objs.append(t)

    # Warm spill between layers, as in the reference. Parented to the stack root so
    # the inter-layer glow turns with the slabs.
    spills = []
    for i in range(4):
        z = base_z + i * PITCH + PITCH / 2
        light = bpy.data.lights.new(f"spill_{i}", type="POINT")
        light.energy = 4.0
        light.color = srgb_to_linear(GOLD_KEY)[:3]
        light.shadow_soft_size = 0.28
        ob = bpy.data.objects.new(f"spill_{i}", light)
        ob.location = (0, 0, z)
        bpy.context.collection.objects.link(ob)
        spills.append(ob)

    # The STACK spins, not the camera. The live asset does this: world-fixed key,
    # bloom and dust stay anchored while the object turns. Orbiting the camera
    # instead drags the gold bloom and the dust across frame every loop.
    root = bpy.data.objects.new("stack_root", None)
    bpy.context.collection.objects.link(root)
    for o in objs + spills:
        o.parent = root

    return objs, (base_z, top_z), root


def build_world(bloom_x=0.06, bloom_y=0.97, bloom_radius=1.55, bloom_gain=0.52,
                aspect=16.0 / 9.0):
    """Plum void with a soft gold bloom anchored in the frame's upper-left.

    The live asset's corner glow is a screen-space radial falloff, not volumetric
    scatter -- a light-position sweep showed the haze produces a flat full-frame
    wash regardless of where the light sits. A `Window`-coordinate gradient places
    it exactly and costs nothing to render. Only valid because the camera is now
    static (the stack spins), so the glow stays put across the whole loop.

    Gated on Is Camera Ray: a lit background otherwise illuminates the whole scene
    and flattens the slabs. This makes it pure backdrop, contributing no light.
    """
    world = bpy.data.worlds.new("Void")
    bpy.context.scene.world = world
    world.use_nodes = True
    nt = world.node_tree
    bg = nt.nodes["Background"]

    texco = nt.nodes.new("ShaderNodeTexCoord")
    mapping = nt.nodes.new("ShaderNodeMapping")
    # Mapping applies SCALE before LOCATION, so the offset lives in scaled space:
    # to centre the bloom on (bloom_x, bloom_y) the location must be -centre*scale.
    # X is additionally scaled by the frame aspect, or the circle renders as an
    # ellipse (Window coords run 0..1 on both axes regardless of 16:9).
    sx = aspect / bloom_radius
    sy = 1.0 / bloom_radius
    mapping.inputs["Scale"].default_value = (sx, sy, 1.0)
    mapping.inputs["Location"].default_value = (-bloom_x * sx, -bloom_y * sy, 0.0)

    grad = nt.nodes.new("ShaderNodeTexGradient")
    grad.gradient_type = "SPHERICAL"

    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.interpolation = "EASE"
    ramp.color_ramp.elements[0].position = 0.46          # void by frame centre; falloff never terminates in-frame
    ramp.color_ramp.elements[0].color = srgb_to_linear(VOID)
    ramp.color_ramp.elements[1].position = 1.0           # gold at the centre
    ramp.color_ramp.elements[1].color = srgb_to_linear(GOLD_KEY)

    # Backdrop only: black to every non-camera ray.
    lp = nt.nodes.new("ShaderNodeLightPath")
    mix = nt.nodes.new("ShaderNodeMixRGB")
    mix.inputs["Color1"].default_value = (0.0, 0.0, 0.0, 1.0)

    nt.links.new(texco.outputs["Window"], mapping.inputs["Vector"])
    nt.links.new(mapping.outputs["Vector"], grad.inputs["Vector"])
    nt.links.new(grad.outputs["Fac"], ramp.inputs["Fac"])
    nt.links.new(ramp.outputs["Color"], mix.inputs["Color2"])
    nt.links.new(lp.outputs["Is Camera Ray"], mix.inputs["Fac"])
    nt.links.new(mix.outputs["Color"], bg.inputs["Color"])
    bg.inputs["Strength"].default_value = bloom_gain


def build_volume(density=0.0015):
    """Thin haze so the gold key throws a visible bloom.

    Bounded in a cube, not the world. A world volume is unbounded, so every camera
    ray marches forever -- measured at 13.7s of a 31.5s frame. HALF must exceed the
    frame's half-width at the stack (~6.2) so no edge is ever seen, and stay under
    the orbit radius (~15.5) so the camera never enters the volume.
    """
    HALF = 8.0
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0))
    vol = bpy.context.active_object
    vol.name = "haze"
    vol.scale = (HALF * 2, HALF * 2, HALF * 2)
    bpy.ops.object.transform_apply(scale=True)

    mat = bpy.data.materials.new("haze")
    mat.use_nodes = True
    nt = mat.node_tree
    for n in list(nt.nodes):
        if n.type != "OUTPUT_MATERIAL":
            nt.nodes.remove(n)  # surface must be empty, else the cube renders solid
    out = nt.nodes["Material Output"]
    scatter = nt.nodes.new("ShaderNodeVolumeScatter")
    scatter.inputs["Color"].default_value = srgb_to_linear(GOLD_KEY)
    scatter.inputs["Density"].default_value = density
    scatter.inputs["Anisotropy"].default_value = 0.45
    nt.links.new(scatter.outputs["Volume"], out.inputs["Volume"])
    vol.data.materials.append(mat)
    vol.visible_shadow = False
    # A 16-unit cube around everything reads as an opaque grey box in the solid
    # viewport. Draw it as bounds and hide it from viewports; it still renders.
    vol.display_type = "BOUNDS"
    vol.hide_viewport = True
    return vol


def build_dust(count=70, seed=7):
    """Gold dust motes suspended in the void, as in the live asset.

    Deterministic seed so the same frame renders identically on every run.
    Kept outside the stack's silhouette so they never read as surface noise.
    """
    rng = random.Random(seed)
    mat = emissive("dust", GOLD, 2.2)
    motes = []
    for i in range(count):
        angle = rng.uniform(0, 2 * math.pi)
        radius = rng.uniform(2.6, 7.2)          # outside the stack, inside the haze cube
        z = rng.uniform(-4.4, 4.4)
        r = rng.uniform(0.004, 0.010)
        bpy.ops.mesh.primitive_ico_sphere_add(
            radius=r, subdivisions=1,
            location=(math.cos(angle) * radius, math.sin(angle) * radius, z),
        )
        m = bpy.context.active_object
        m.name = f"dust_{i:03d}"
        m.data.materials.append(mat)
        m.visible_shadow = False
        motes.append(m)
    print(f"dust: {count} motes")
    return motes


def build_lights():
    """Warm gold key upper-left, bone-white rim behind, faint warm fill. No blue."""
    def area(name, loc, color, energy, size, target=(0, 0, 0)):
        d = bpy.data.lights.new(name, type="AREA")
        d.energy = energy
        d.size = size
        d.color = srgb_to_linear(color)[:3]
        ob = bpy.data.objects.new(name, d)
        ob.location = loc
        ob.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()
        bpy.context.collection.objects.link(ob)
        return ob

    area("key", (-6.0, -4.5, 5.5), GOLD_KEY, 1400, 6.0)
    area("rim_b", (-4.0, 5.5, -1.0), BONE, 170, 3.5)
    area("rim_a", (4.5, 5.0, 2.0), BONE, 380, 4.0)
    area("fill", (2.5, -5.0, -2.5), GOLD, 95, 5.0)


def scene_bbox():
    """World-space bbox of every mesh, so framing is measured, not guessed."""
    lo = Vector((1e9, 1e9, 1e9))
    hi = Vector((-1e9, -1e9, -1e9))
    for o in bpy.context.scene.objects:
        # Haze cube and dust motes must not drive framing: they are atmosphere,
        # not subject, and they would balloon the bbox and push the camera back.
        if o.type != "MESH" or o.name == "haze" or o.name.startswith("dust_"):
            continue
        for corner in o.bound_box:
            w = o.matrix_world @ Vector(corner)
            lo = Vector((min(lo[i], w[i]) for i in range(3)))
            hi = Vector((max(hi[i], w[i]) for i in range(3)))
    return lo, hi


def build_camera(mode, frames, root, lens=45.0, margin=1.03, elevation=22.0,
                 yaw=0.0, pivot_z=None):
    """Static camera; the STACK spins. Lights, haze and dust stay world-fixed.

    Distance is solved from the real bbox so the whole stack always fits.
    Elevation is what makes the slab tops and their props readable; a near-level
    camera renders the slabs as edge-on slivers and hides everything on them.
    """
    lo, hi = scene_bbox()
    ctr = (lo + hi) / 2
    height = (hi.z - lo.z)
    if pivot_z is not None:
        ctr = Vector((ctr.x, ctr.y, pivot_z))

    pivot = bpy.data.objects.new("pivot", None)
    pivot.location = ctr
    bpy.context.collection.objects.link(pivot)

    cam_data = bpy.data.cameras.new("Cam")
    cam_data.lens = lens
    sensor_h = cam_data.sensor_width * 9.0 / 16.0
    half_fov = math.atan(sensor_h / (2.0 * lens))
    # Tilting the camera up by `elevation` shrinks the vertical room the stack
    # projects into, so pay for it with a little extra distance.
    el = math.radians(elevation)
    dist = (height * margin / 2.0) / math.tan(half_fov) / max(math.cos(el), 0.35)

    cam = bpy.data.objects.new("Cam", cam_data)
    cam.location = (0.0, -dist * math.cos(el), dist * math.sin(el))
    bpy.context.collection.objects.link(cam)
    cam.parent = pivot
    bpy.context.scene.camera = cam
    print(f"framing: stack_h={height:.2f} lens={lens} elev={elevation} dist={dist:.2f}")

    track = cam.constraints.new("TRACK_TO")
    track.target = pivot
    track.track_axis = "TRACK_NEGATIVE_Z"
    track.up_axis = "UP_Y"

    pivot.rotation_euler = (0, 0, 0)  # camera never moves

    if mode == "still":
        # Props front onto -Y; yaw turns the STACK so the robot faces us.
        root.rotation_euler = (0, 0, math.radians(yaw))
    else:
        # Seamless loop: key 0 deg at frame 1, 360 deg at frame N+1, render 1..N.
        # Blender 4.4+ moved Action.fcurves under slotted actions, so set the
        # interpolation default up front rather than walking the curve data.
        bpy.context.preferences.edit.keyframe_new_interpolation_type = "LINEAR"
        root.rotation_euler = (0, 0, 0)
        root.keyframe_insert("rotation_euler", frame=1)
        root.rotation_euler = (0, 0, math.radians(360))
        root.keyframe_insert("rotation_euler", frame=frames + 1)
    return cam


def build_compositor():
    """Bloom on the gold threads and the robot's bulb, so light reads as light.

    Blender 5.x: `scene.use_nodes` / `scene.node_tree` are gone. The compositor is
    a node GROUP assigned to `scene.compositing_node_group`, with a NodeGroupOutput
    whose socket must be registered on the tree interface. The Glare node's type is
    now a menu INPUT SOCKET ("Type"), not a `glare_type` property.
    """
    tree = bpy.data.node_groups.new("comp", "CompositorNodeTree")
    tree.interface.new_socket(name="Image", in_out="OUTPUT", socket_type="NodeSocketColor")

    rl = tree.nodes.new("CompositorNodeRLayers")
    rl.location = (-400, 0)
    glare = tree.nodes.new("CompositorNodeGlare")
    glare.location = (-150, 0)
    glare.inputs["Type"].default_value = "Bloom"
    glare.inputs["Quality"].default_value = "High"
    glare.inputs["Threshold"].default_value = 0.85
    glare.inputs["Strength"].default_value = 0.22
    glare.inputs["Size"].default_value = 0.75

    out = tree.nodes.new("NodeGroupOutput")
    out.location = (120, 0)

    tree.links.new(rl.outputs["Image"], glare.inputs["Image"])
    tree.links.new(glare.outputs["Image"], out.inputs["Image"])
    bpy.context.scene.compositing_node_group = tree
    print("compositor: Glare/Bloom attached")


def configure_render(res_x, samples, out, mode, frames, fps):
    scene = bpy.context.scene
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
        print(f"cycles device: CPU ({exc})")

    scene.cycles.samples = samples
    # Adaptive sampling: spend samples where noise actually is. 0.01 production,
    # 0.05 for look-dev. Documented as 20-40% faster at no visible cost.
    scene.cycles.use_adaptive_sampling = True
    scene.cycles.adaptive_threshold = 0.01 if samples >= 128 else 0.05

    scene.cycles.use_denoising = True
    scene.cycles.denoising_input_passes = "RGB_ALBEDO_NORMAL"
    try:
        scene.cycles.denoising_use_gpu = True
    except Exception:
        pass

    # Geometry is static across the orbit; only the camera moves. Persistent data
    # keeps the BVH resident between frames instead of rebuilding it 96 times.
    scene.render.use_persistent_data = True

    scene.cycles.volume_bounces = 0
    scene.cycles.volume_step_rate = float(__import__("os").environ.get("VSTEP","8.0"))
    scene.cycles.volume_max_steps = int(__import__("os").environ.get("VMAX","24"))
    scene.cycles.max_bounces = 6
    scene.cycles.transmission_bounces = 2

    scene.render.resolution_x = res_x
    scene.render.resolution_y = int(res_x * 9 / 16)
    scene.render.resolution_percentage = 100
    scene.render.film_transparent = False
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.look = "AgX - Medium High Contrast"

    build_compositor()
    scene.render.image_settings.file_format = "PNG"
    if mode == "still":
        scene.render.filepath = out
    else:
        scene.render.fps = fps
        scene.frame_start = 1
        scene.frame_end = frames
        scene.render.filepath = out  # directory + prefix


def main():
    argv = sys.argv[sys.argv.index("--") + 1:]
    ap = argparse.ArgumentParser()
    ap.add_argument("--mode", choices=["still", "orbit"], default="still")
    ap.add_argument("--out", required=True)
    ap.add_argument("--frames", type=int, default=96)
    ap.add_argument("--samples", type=int, default=192)
    ap.add_argument("--res", type=int, default=1920)
    ap.add_argument("--fps", type=int, default=24)
    ap.add_argument("--lens", type=float, default=45.0)
    ap.add_argument("--elev", type=float, default=22.0)
    ap.add_argument("--dust", type=int, default=70)
    ap.add_argument("--blend", default=None, help="save the built scene to a .blend and exit")
    ap.add_argument("--haze", type=float, default=0.0)
    ap.add_argument("--yaw", type=float, default=0.0)
    ap.add_argument("--margin", type=float, default=1.03)
    ap.add_argument("--pivot-z", dest="pivot_z", type=float, default=None)
    a = ap.parse_args(argv)

    reset_scene()
    mats = build_materials()
    _, z_range, root = build_stack(mats)
    build_world()
    if a.haze > 0:
        build_volume(a.haze)
    build_lights()
    if a.dust > 0:
        build_dust(a.dust)
    build_camera(a.mode, a.frames, root, lens=a.lens, elevation=a.elev,
                 yaw=a.yaw, margin=a.margin, pivot_z=a.pivot_z)
    configure_render(a.res, a.samples, a.out, a.mode, a.frames, a.fps)

    if a.blend:
        bpy.ops.wm.save_as_mainfile(filepath=a.blend)
        print(f"SAVED BLEND -> {a.blend}")
        return

    if a.mode == "still":
        bpy.ops.render.render(write_still=True)
        print(f"RENDERED -> {a.out}")
    else:
        bpy.ops.render.render(animation=True)
        print(f"RENDERED {a.frames} frames -> {a.out}")


if __name__ == "__main__":
    main()
