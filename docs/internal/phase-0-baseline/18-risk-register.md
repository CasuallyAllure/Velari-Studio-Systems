# Risk register

| ID | Risk / evidence | Likelihood | Impact | Affected phase | Mitigation | Blocking now? |
|---|---|---|---|---|---|---|
| R01 | Lost/fake inquiries: guided done has no persistence; questionnaire uses mock DB/email; contact uses mailto | High | Critical | Start/conversion | Verified server submission, idempotency, destination receipt, honest states, parallel validation before cutover | No for Phase 1 IA; **blocks conversion replacement** |
| R02 | API routing mismatch: `/api/intake` 404 in Vite preview while dev/server code exists | High | Critical | Hosting/Start | Production-shaped API contract tests; separate API/page fallback; environment runbook | No for IA; blocks live AI release |
| R03 | Direct-route soft 404: unknown/utility/robots/sitemap return homepage 200 | High | High | Routing/SEO | Rendering decision, true status handling, automated direct-request matrix | No; must be resolved with routing |
| R04 | Duplicate indexing: eight query scenes share initial metadata; invalid scenes fall back Dental | High | High | Work/SEO | Canonical Work records, query-aware redirects, unique metadata, sitemap policy | No if legacy URLs preserved |
| R05 | Broken concept URLs during migration | Medium | Critical | Work/routes | Destination-first rollout, manifest, one-hop automated tests, indefinite redirects | No |
| R06 | Theme-schema coupling: theme required in `schema.sql` and attached to submissions | High | High | CMS/data/Start | Add safe default/nullable migration before UI decoupling; contract tests with old/new clients | No; blocks schema cutover without migration |
| R07 | Mailto dependency fails for users without configured client | High | High | Start | Verified form plus explicit email/phone fallback; track method selection | No for IA; blocks removing alternate intake |
| R08 | Missing mobile navigation hides four primary destinations | High | High | Navigation | Accessible responsive navigation, direct route links, keyboard tests | No; Phase 1 target |
| R09 | Hard-coded taxonomy divergence across industries/services/goals/offers | High | High | Data model, all hubs | Stable IDs and mapping tables before content migration; generated projections | No; Phase 1 prerequisite work |
| R10 | Asset deletion based on 207 static orphan candidates breaks dynamic/design/source flows | Medium | Critical | Asset cleanup | Hash manifest, owner/provenance review, copy-switch-observe-remove releases; no Phase 0 deletion | No |
| R11 | 513 MB public inventory and 28–49 MB page transfer impede mobile experience | High | High | Visual/performance | Budgets, responsive media delivery, poster/readable fallback, measure per phase | No; prioritize after structure baseline |
| R12 | Analytics discontinuity: only mock `intake_submitted`, semantically not confirmed | High | High | Analytics/Start | Historical definition freeze, migration dictionary, server-confirmed event, dual-run with de-duplication | No; blocks conversion analytics claims |
| R13 | Unclear truth status: concept metrics/interfaces could be mistaken for client results | Medium | High | Work/Case studies | Required `work_type`/truth label/provenance; review before publication | No |
| R14 | Rendering strategy unresolved for scalable SEO/direct routes/products/docs | High | High | Routing/CMS | Architecture decision record against requirements before route implementation | **Decision gate before routing implementation** |
| R15 | Accessibility regressions in cinematic and form refactors | Medium | High | Homepage/Start/components | Current baselines, reduced-motion semantic source, keyboard/screen-reader gates | No |
| R16 | Current contrast/name/form-label defects persist unnoticed because Lighthouse score is 92 | High | Medium | Visual/components/Start | Severity checklist; manual + automated gate, test all themes | No |
| R17 | Public source/archives/Blender/scripts expose unnecessary IP and complicate delivery | High | Medium | Asset/storage | Inventory provenance, private source store, runtime allowlist in later controlled migration | No |
| R18 | Lint baseline already fails in API code | High | Medium | Release safety | Decide zero-warning gate; fix in authorized implementation phase; prevent new violations | No for documentation; release waiver needed until fixed |
| R19 | Working tree contains broad pre-existing changes and untracked production assets | High | High | Every implementation phase | Confirm ownership/scope, isolate commits, never reset/delete, snapshot deploy artifact | **Operational decision before broad refactor commits** |
| R20 | Privacy/legal/consent content and owner are missing | High | High | Start/campaigns/SEO | Name legal/operations owner, publish approved utilities before collecting verified leads/ads | No for IA; blocks mature conversion/campaign launch |
| R21 | Content ownership could drift as products/resources/campaigns grow | Medium | High | CMS/business evolution | Enforce ownership register and ten-times acceptance test in content workflow | No |
| R22 | Cinematic Blob fetch/seeking may consume decoded-media memory not captured by JS heap | Medium | Medium | Homepage/performance | Device profiling, media memory/CPU tests, non-motion/static path, performance budget | No |

## Blocking interpretation

“Not blocking now” means the risk does not prevent Phase 1 information-architecture work under the compatibility boundary. It does not mean the risk is acceptable for final release. R14 must be decided before implementing public routing. R19 requires explicit repository/release hygiene before broad code changes. R01/R02/R06/R07/R12/R20 block replacement or promotion of the conversion system.

