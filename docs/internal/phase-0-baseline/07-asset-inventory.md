# Asset inventory

## Exhaustive manifest

The per-file source of truth is:

- `generated/asset-manifest.tsv` for review/filtering.
- `generated/asset-manifest.json` for tooling.
- `generated/duplicate-assets.json` for SHA-256 duplicate groups.
- `generated/asset-summary.json` for aggregate counts.

Every manifest row records path, public URL, type, bytes, dimensions, duration where detectable, static reference count and owners, duplicate-group size, attribution signal, orphan-candidate status, intended destination, deletion risk, and SHA-256. The inventory covers `public/`, root `img/`, and root `fonts/`. It does not authorize asset mutation.

## Totals

| Type | Count |
|---|---:|
| Images | 200 |
| Videos | 19 |
| Fonts | 12 |
| Archives | 7 |
| 3D | 3 |
| Blender files | 3 |
| Markdown/source notes | 4 |
| Python source files | 3 |
| HTML | 2 |
| CSS | 2 |
| JavaScript | 1 |
| Other files | 4 |
| **Total** | **260 files / 513,447,372 bytes** |

There are 19 byte-identical duplicate groups. Static search marked 207 orphan candidates; this high number is expected because public contains design source, generated variants, archives, look-development files, 3D assets, and media review artifacts. “Orphan” is evidence to investigate, never evidence to delete.

## Runtime-critical groups

| Group | Owners | Loading behavior | Migration destination | Deletion risk |
|---|---|---|---|---|
| SF hero desktop/mobile videos and posters | `HeroSection.tsx` | Video fetched to Blob after mount; breakpoint-specific; skipped for reduced motion | Homepage proof/hero media record or asset pipeline | Critical |
| Selected-systems tunnel desktop/mobile videos/poster | `ShowcaseTunnelSection.tsx` | Metadata preload; IntersectionObserver play/pause; responsive source | Homepage curated proof media | Critical |
| Services orbit desktop/mobile videos/poster | `WhatWeBuildSection.tsx` | Entire video fetched to Blob; `preload="auto"`; scroll seeking | Service showcase media | Critical |
| 9 desktop + 9 mobile concept previews | `ShowcaseTunnelSection.tsx` | Images render for active concept; browser behavior controls request timing | Linked Work/Concept media records | Critical |
| Property concept assets | Property HTML/CSS | Static page and CSS references | Property Work record/media | High |
| Studio scene assets | `studio.js`/CSS | Query-selected scene template | Eight Work records/media | Critical |
| Geist/Instrument and other fonts | Global and concept CSS | CSS font-face; Archivo also externally loaded | Shared design-system font assets | High |
| Maps/elevation/geometry and scroll-world source | Hero/footer/source assets | Some runtime media; source lineage may be unreferenced | Asset library with provenance metadata | Critical |
| Icons | Lucide package at runtime; glyphs/static symbols in concepts | Component/package or inline glyphs | Shared icon policy / concept templates | Medium |
| Archives, Blender, Python, Markdown, GLB, generated source | Public asset folders | Publicly deployable even when not linked | Move to private production-source storage in a later controlled phase | High |

## Largest observed transferred assets

Desktop Lighthouse loaded approximately 33.9 MB for the desktop hero video and 12.1 MB for the service video. Mobile loaded approximately 21.8 MB for the mobile hero and 4.3 MB for the mobile service video. Other notable transfers included a 1.22 MB property preview, 0.53 MB hero poster, 0.33 MB mobile property preview, and 0.19/0.17 MB tunnel/service posters. Exact URL-level transfer data is retained in the Lighthouse JSON.

## Licensing and attribution

The footer explicitly credits OpenStreetMap contributors and USGS 3DEP for San Francisco geometry/elevation reference. The manifest marks asset paths with map, geography, elevation, SF Bay, and scroll-world attribution signals for manual review. No consolidated license file was found for every generated/source asset. Future migration must preserve existing footer attribution until provenance owners confirm whether a dedicated Credits page and per-asset records are sufficient.

## Asset safety rules

1. Never delete based on static reference count alone.
2. Treat HTML, CSS, JavaScript, archives, 3D/source files, and dynamically selected media as public dependencies until runtime and deployment manifests prove otherwise.
3. Migrate by copying/versioning first; switch references; verify direct URLs, visuals, caching, reduced motion, and rollback; remove only in a later release.
4. Record content hash and old path for any future move. Keep a compatibility alias where external/direct traffic is plausible.
5. Preserve desktop/mobile pairing and poster relationships as structured metadata, not filename inference alone.
6. Store provenance, license, required credit text, source owner, and generation lineage before relocating geographic or generated media.

## Repeat command

From repository root:

```sh
node docs/internal/phase-0-baseline/tools/collect-baseline.mjs
```

The tool is read-only with respect to product assets and rewrites only the generated inventory artifacts in this audit directory.

