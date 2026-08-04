# Worktree disposition matrix

Snapshot basis: branch `redesign-v3`, commit `1c9a7b0`, captured 2026-08-02 immediately before Phase 1 documents were created. Existing index/worktree state was not changed.

## Safety verdict

The worktree is not safe for a broad commit or deployment. Before Phase 1, Git reported 12 tracked unstaged modifications/deletions, four staged renames, and 504 untracked non-ignored files totaling approximately 1.66 GB. Additional ignored LiDAR, Blender, render, and source data makes the on-disk tree substantially larger.

Some untracked source files are required by the current modified TypeScript files. Some untracked files live under `public/` and would be included in a deployment from the dirty tree even when no component references them. Therefore:

- do not deploy from this worktree;
- do not blanket-stage untracked files;
- do not accept tracked deletions without their replacement files;
- do not clean/reset/move/delete anything until this matrix is approved;
- isolate later commits by workstream and verify each against Phase 0.

## Tracked changes

| State | Paths | Workstream | Evidence / dependency | Proposed disposition | Approval required |
|---|---|---|---|---|---|
| Modified, unstaged | `.claude/launch.json` | Local developer tooling | Removes old `.dc.html` live-server entry; makes Vite port automatic | Review as a small local-tooling commit; exclude if workspace-specific | Yes |
| Modified, unstaged | `.env.example`, `DEPLOYMENT.md`, `README.md` | Hosting/intake/domain documentation | Changes to `velariss.co`, server-only secrets, Anthropic, Vercel API assumptions, SF hero docs | Reconcile after hosting ADR/control-plane confirmation; commit separately from code | Yes |
| Modified, unstaged | `.gitignore` | SF asset-pipeline hygiene | Ignores raw LAZ/OSM/PLY/Blend/render outputs | Review against asset-storage decision; isolated tooling commit if accepted | Yes |
| Modified, unstaged | `src/components/homepage/HowItWorksSection.tsx`, `src/components/homepage/PackagesSection.tsx`, `src/features/ai-demo/AIChatDemo.tsx`, `vite.config.ts` | Unfinished AI/guided-intake rewrite | Depends on new untracked event bus, API client, guided engine, chat types, server handler | Preserve untouched as separate workstream; do not merge into Phase 1 or call finished | Yes, in a later intake review |
| Deleted, unstaged | `src/lib/clients/ai.ts`, `src/lib/mocks/ai.mock.ts`, `src/lib/types/conversation.ts` | Same intake rewrite | Replaced conceptually by untracked files; accepting only deletions breaks the feature | Treat atomically with the intake rewrite; neither reverse nor accept separately | Yes |
| Renamed, staged R100 | `Velari Home.dc.html`, `Velari Home v2.dc.html`, `Velari Home v3.dc.html`, `support.js` → `design-reference/` | Historical design-reference organization | Content unchanged; Vite app is product target | Preserve existing index state; later approve a dedicated reference-organization commit or explicitly decline | Yes |

## Untracked groups

Counts and bytes use `git ls-files --others --exclude-standard`; ignored files are not included.

| Group / paths | Files | Approx. size | Workstream/classification | Runtime/public status | Proposed disposition |
|---|---:|---:|---|---|---|
| `docs/internal/phase-0-baseline/` | 98 | 10.0 MB | Completed Phase 0 evidence | Non-public docs; no runtime consumer | Approve as a dedicated baseline commit; owner may choose artifact storage for PNG/Lighthouse HTML, but do not split evidence silently |
| `api/intake.ts`, `server/intake/*`, `src/features/ai-demo/intakeBus.ts`, `src/lib/clients/intakeApi.ts`, `src/lib/mocks/guidedIntake.ts`, `src/lib/types/intakeChat.ts` | 7 | 33 KB | Unfinished AI/guided-intake rewrite | Imported by modified worktree; Vercel-shaped API not confirmed live | Preserve as one separate intake workstream; review contracts/security/hosting before any commit or deployment |
| Eight untracked `docs/*.md` plans | 8 | 55 KB | Historical/domain plans | Non-public source docs | Apply authority table; later commit retained plans with status banners or archive externally only after approval |
| `design-reference/README.md` | 1 | <1 KB | Design-reference organization | Non-runtime | Include only with approved staged renames |
| `.agents/skills/mascot-animate/SKILL.md`, `.claude/skills/mascot-animate/SKILL.md` | 2 | 31 KB | Mascot developer tooling | Non-runtime | Preserve; decide canonical skill location and whether both integrations are required |
| `.recovery/2026-07-23-velari-restore/*` | 7 | 377 KB | Recovery snapshots | Non-runtime; sensitive to cleanup | Preserve until clean baseline and rollback artifacts are approved; likely external/internal archive, never public |
| `scripts/*showcase*`, `scripts/*services-orbit*` | 7 | 102 KB | Asset-generation tooling | Build-time/manual only | Preserve; review reproducibility and input ownership; later tooling commit separate from generated output |
| `assets-3d/animos-grid-zoom/` | 2 | 48.0 MB | Original/grid motion source | Not current runtime | Preserve as experimental source; external asset store candidate |
| `assets-3d/animos-tunnel/` | 4 | 40.5 MB | Original tunnel source/review | Not current runtime | Preserve as experimental source; external asset store candidate |
| `assets-3d/mascot-v2/` | 170 | 413.4 MB | Historical/experimental mascot modeling, rigging, animation | Not imported by current site | Preserve; no deletion; likely dedicated asset archive/repository after approval |
| `assets-3d/sf-scroll-world/` | 38 Git-visible | 885.5 MB | Current hero provenance/source pipeline; many ignored raw files | Current committed runtime media derives from this program; raw source is not browser-required | Preserve; separate reproducible scripts/docs from heavy raw/generated media; decide external storage before Git inclusion |
| `public/assets/scrollworld/` untracked alternatives | 6 | 25.9 MB | Draft/alternate hero encodes | Publicly deployable from dirty tree; current `HeroSection` uses committed `sf-bay-bridge-*-hq` assets instead | Do not deploy; retain pending visual/source review; externalize or archive only after hash/reference gate |
| `public/assets/services-orbit/` untracked frames/source/v2/review | 23 | 89.0 MB | Alternate/generated services assets | Publicly deployable; current component uses committed files under `video/` | Preserve pending asset review; do not commit/source-control indiscriminately |
| `public/assets/showcase/` untracked panels/source/zips/alternative video | 104 | 126.1 MB | Concept/tunnel generation history | Publicly deployable; current component uses committed final-v2/mobile/totem-wall assets | Preserve; classify source versus final versus rejected; external asset storage likely for archives |
| `public/assets/v4/` | 27 | 24.4 MB | Mascot/v4 experimental outputs | Publicly deployable; no current runtime reference found | Preserve historical/experimental; keep out of main-site migration unless separately approved |

## Phase 1 additions

The only authorized new files in this phase are `docs/velari-master-roadmap-v1.md` and `docs/internal/phase-1-architecture-v1/*`. Proposed disposition: review as one documentation-only Phase 1 commit after owner approval. Do not combine them with any pre-existing staged, modified, deleted, or untracked work.

## Recommended future commit boundaries

1. Phase 0 evidence package.
2. Phase 1 architecture package.
3. Design-reference R100 moves plus README, if approved.
4. Local launcher change, if not machine-specific.
5. Asset-pipeline ignore rules and reproducible scripts.
6. Hosting/documentation corrections after provider confirmation.
7. AI/guided-intake rewrite only after its own technical/product review.
8. Runtime assets only when a referenced, approved deliverable requires them.
9. Historical/experimental source assets only under an explicit large-file/archive policy.

This is a proposed disposition only. No Git index or file state has been changed.

