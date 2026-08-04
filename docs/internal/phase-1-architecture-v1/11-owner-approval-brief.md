# Phase 1 owner approval brief

Version: 1.0  
Prepared: 2026-08-02  
Audience: Velari business owner  
Status: proposed approval brief; no Phase 2 authorization is implied.

## Executive recommendation

Approve the Phase 1 architecture with the amendments in this brief, but authorize Phase 2 only after Cloudflare ownership, repository isolation, rollback, and test ownership are confirmed. The architecture gives every major type of content one permanent home, keeps the initial navigation to five choices, and makes the future homepage a selective trust-and-proof page instead of a directory of everything Velari can do.

Approval of this brief does **not** approve any blanket Git action, client claim, testimonial, logo, result, price, legal text, production credential, deployment, or later phase.

## Approval gates

### 1. Master roadmap

- **Decision:** Whether [the versioned roadmap](../../velari-master-roadmap-v1.md) becomes the governing execution sequence.
- **Recommended choice:** Approve version 1, subject to the Phase 2 boundary and owner-only decisions in this brief.
- **Why:** It separates infrastructure, conversion, proof, industries, services, homepage reduction, and polish into independently testable releases. That prevents the homepage cleanup from becoming a risky all-at-once redesign.
- **Other reasonable options:** Amend a phase boundary before approval; defer the entire program while keeping Phase 0 as the safety baseline. Reordering homepage reduction ahead of canonical Work/Industry/Service destinations is not recommended because moved content would have nowhere stable to go.
- **Practical website effect:** No immediate public change. Later work gains a fixed sequence and acceptance gate after every deployable phase.
- **Risk of approving:** The sequence may feel slower because it requires proof and rollback gates before visible reduction.
- **Risk of delaying:** New work may continue accumulating in the homepage or dirty worktree without a shared destination or release order.
- **Can it change later?** Yes, by issuing a new roadmap version and recording why; do not silently edit approved history.
- **Support:** `docs/velari-master-roadmap-v1.md` — **Program status**, **Phase 0–10**, and **Permanent sequencing constraints**; `07-migration-slices-and-gates.md` — all phase sections.

### 2. Authority and supersession rules

- **Decision:** Which plans control the main website when earlier directions conflict.
- **Recommended choice:** Approve the stated hierarchy: current owner decisions and the luxury/IA audit govern; Phase 0 governs facts; the approved roadmap and Phase 1 govern future execution; mascot/v4 work remains preserved but does not control the main-site architecture; guided intake remains separate and unfinished.
- **Why:** One source of authority prevents an asset experiment or older redesign plan from reintroducing homepage sections or conflicting routes.
- **Other reasonable options:** Promote an older plan only for a clearly bounded future experiment. Restoring mascot-v4 as main-site authority would require a new owner decision and roadmap version.
- **Practical website effect:** Future contributors know which decisions to follow without deleting historical work.
- **Risk of approving:** Useful ideas from older plans could be overlooked if contributors fail to consult their retained domain scope.
- **Risk of delaying:** Competing plans can create duplicate systems, contradictory designs, and accidental reversals.
- **Can it change later?** Yes, through an explicit dated supersession decision.
- **Support:** `01-authority-and-supersession.md` — **Governing hierarchy**, **Plan register**, and **Resolved conflicts**.

### 3. Worktree disposition

- **Decision:** The eventual treatment of each existing workstream—not permission to act on it now.
- **Recommended choice:** Approve or amend each row in the separate matrix below. Do not grant blanket approval.
- **Why:** The dirty tree mixes current code, intake work, historical plans, recovery files, production-ready media, and large experimental sources. Treating them as one change could break the site or publish private/rejected assets.
- **Other reasonable options:** Keep a stream pending where ownership or provenance is unclear. No stream needs deletion to begin architecture work.
- **Practical website effect:** None now. Later commits and archives will be reviewable, reversible, and isolated from public releases.
- **Risk of approving:** A mistaken classification could put a file in an inconvenient storage location; execution still requires a separate action approval.
- **Risk of delaying:** Phase 2 cannot safely establish a clean baseline, and accidental bulk staging/deployment remains a material risk.
- **Can it change later?** Yes. Every execution action remains separately reviewable; deletion always requires separate approval.
- **Support:** `02-worktree-disposition-matrix.md` — **Safety verdict**, **Tracked changes**, **Untracked groups**, and **Recommended future commit boundaries**.

### 4. Static-first hybrid rendering

- **Decision:** Whether canonical marketing pages should be delivered as pre-rendered/static HTML with isolated server/edge functions for `/api/*`, rather than remain a client-only SPA or become a general SSR application.
- **Recommended choice:** Conditionally approve static-first hybrid and retain Vite + React + TypeScript unless the Phase 2 preview spike proves a narrowly scoped adapter insufficient.
- **Why:** It supports fast marketing pages, real per-route metadata, correct 404/API behavior, and future campaign SEO without paying the complexity cost of general SSR.
- **Other reasonable options:** Pure static export plus a separate API is viable; general SSR should wait for a proven authenticated or per-request need; the current client-only SPA is acceptable only as a temporary legacy state.
- **Practical website effect:** After a later approved cutover, direct route loads become useful HTML, unknown URLs can return a real 404, and `/api/*` can no longer fall through to the homepage.
- **Risk of approving:** The spike may reveal adapter or Cloudflare deployment complexity and require a bounded ADR amendment.
- **Risk of delaying:** Route, SEO, campaign, 404, and secure Start foundations remain blocked.
- **Can it change later?** Yes. The marketing foundation can remain static while a future product adopts SSR independently.
- **Support:** `03-rendering-and-hosting-adr.md` — **Decision**, **Options considered**, **Proposed deployment shape**, **Phase 2 implementation spike**, and **Conditions before ADR becomes accepted**.

### 5. Route structure

- **Decision:** Whether the permanent route families and `/work/[slug]` canonical pattern should be adopted.
- **Recommended choice:** Approve `/`, `/work`, `/work/[slug]`, `/industries/[slug]`, `/services/[slug]`, `/about`, and `/start`; reserve Products, Resources, Campaigns, legal/utility, and product-owned subroutes behind publication gates.
- **Why:** Each page answers one primary question, Work type remains metadata, and a concept can mature into a case study without changing its URL.
- **Other reasonable options:** A nested Work subtype may be introduced later only when it has a genuinely independent navigation or access model. No current content justifies it.
- **Practical website effect:** Future pages gain predictable homes and the homepage can link to depth instead of duplicating it.
- **Risk of approving:** Reserved slugs and identifiers create a compatibility commitment once published.
- **Risk of delaying:** Content migration and canonical URL/redirect work cannot be designed safely.
- **Can it change later?** Yes before publication; after publication, old paths require aliases and redirects.
- **Support:** `04-route-and-navigation-map.md` — **Page-job map**, **Route tree**, **Work route decision**, and **Publication gates**.

### 6. Initial navigation

- **Decision:** Whether the first primary header should contain only Work, Industries, Services, About, and Start.
- **Recommended choice:** Approve those five items, with Start as the only emphasized global action. Keep Products and Resources out until their content gates pass; keep Campaigns out by default.
- **Why:** Five destinations expose the company’s core story without presenting the future operating system as a crowded directory.
- **Other reasonable options:** Products or Resources may enter secondary navigation after their gates; adding them to the primary header now is not recommended.
- **Practical website effect:** Later visitors face fewer choices and can distinguish proof, industry understanding, services, company credibility, and conversion.
- **Risk of approving:** A future product may temporarily rely on direct or footer links before earning primary-nav status.
- **Risk of delaying:** Header design and route-shell testing remain ambiguous, and duplicate CTAs may persist.
- **Can it change later?** Yes, through content thresholds and a navigation review.
- **Support:** `04-route-and-navigation-map.md` — **Initial primary navigation**, **Publication gates**, and **Global shell behavior**.

### 7. Canonical content schemas

- **Decision:** Whether Work, Industries, Services, Products, Resources, Offers, Campaigns, and Start should use the proposed stable IDs, slugs, ownership, publication states, and explicit relationships.
- **Recommended choice:** Approve the schema contract and current registries as version 1. Keep the storage/CMS provider undecided until implementation needs justify it. Mark launch order, proof approval, and commercial pricing as separate owner gates.
- **Why:** References by stable ID prevent copied facts, duplicate taxonomies, and label changes from breaking routes, campaigns, analytics, or Start context.
- **Other reasonable options:** Amend an ID before it is published. A CMS can be selected later; typed local records are acceptable first if they remain losslessly portable.
- **Practical website effect:** A service, price, work item, or industry fact can have one owner and be reused by reference rather than copied across pages.
- **Risk of approving:** Poorly chosen IDs become long-lived compatibility obligations after publication.
- **Risk of delaying:** New pages may create parallel arrays and inconsistent labels, making later migration harder.
- **Can it change later?** Yes through aliases/versioned migrations; published IDs should remain immutable.
- **Support:** `05-canonical-content-schemas.md` — **Shared rules**, **Stable ID registries**, **Entity schemas**, **Relationships**, and **Storage implementation boundary**.

### 8. Legacy compatibility

- **Decision:** Whether all recorded public routes, query scenes, fragments, forms, links, analytics, assets, themes, and contact behavior must remain functional until canonical replacements pass their gates.
- **Recommended choice:** Approve the complete no-removal and redirect-first contract. Treat known broken/fake links as defects to repair, not behaviors to preserve forever.
- **Why:** The redesign should reduce clutter without breaking bookmarks, campaigns, referrals, direct contact, or concept demonstrations.
- **Other reasonable options:** Retire an individual legacy behavior only after measured usage/backlink review, replacement parity, owner approval, and a tested redirect or recovery path.
- **Practical website effect:** Existing visitors keep working routes while new canonicals are introduced in slices.
- **Risk of approving:** Compatibility code and aliases temporarily add maintenance work.
- **Risk of delaying:** Any route or homepage change risks SEO loss, broken links, lost inquiries, and regression disputes.
- **Can it change later?** Yes through the Phase 10 retirement gate, never by silent removal.
- **Support:** `06-legacy-compatibility-matrix.md` — **Page and query routes**, **Conversion and contact compatibility**, **Offers and pricing**, **Analytics compatibility**, **Assets, themes, and behavior**, and **Compatibility test rule**.

### 9. Cloudflare project and production ownership

- **Decision:** Who owns the Cloudflare account/project serving `velariss.co`, who may deploy, and who can inspect logs and roll back production.
- **Recommended choice:** The Velari owner/company controls the account and billing; at least two trusted owner-controlled identities can recover administration; engineering receives the minimum scoped Pages/Workers/DNS access needed; production branch, build settings, secrets, preview domain, logs, and rollback owner are recorded before Phase 2. Do not share a single login.
- **Why:** Live evidence points to Cloudflare behavior but does not identify the private project, origin, deployment integration, or recovery authority. Cloudflare supports role- and resource-scoped access, including limiting a contributor to staging, which reduces accidental production changes ([Cloudflare members and permissions](https://developers.cloudflare.com/fundamentals/manage-members/), [Cloudflare roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/)).
- **Other reasonable options:** Another confirmed host behind Cloudflare can remain the origin if ownership, previews, statuses, API isolation, logs, and rollback satisfy the ADR. Migrating hosts before discovering the current control plane is not recommended.
- **Practical website effect:** No design change; it makes preview testing, deployment, rollback, DNS, and incident response accountable.
- **Risk of approving:** Broader-than-needed access could expose production controls; mitigate with least privilege and named owners.
- **Risk of delaying:** Phase 2 cannot safely recommend or implement the rendering target, correct the live sitemap/404/API fallback, or guarantee rollback.
- **Can it change later?** Roles and providers can change; moving account/domain ownership later is materially harder than establishing it correctly now.
- **Support:** `03-rendering-and-hosting-adr.md` — **Confirmed live observations** and **Conditions before ADR becomes accepted**; `08-phase-2-entry-criteria.md` — **Required hosting confirmation**.

### 10. Phase 2 scope and acceptance criteria

- **Decision:** Whether to authorize only the hosting/routing/navigation/SEO foundation after all entry criteria are met.
- **Recommended choice:** Approve the boundary now, but issue implementation authorization only after the owner approves this package and the Cloudflare, baseline, owner, test, preview, and rollback checklists are complete.
- **Why:** Phase 2 should create safe destinations and release mechanics before moving content or changing conversion behavior.
- **Other reasonable options:** Authorize only the non-production rendering spike first, then separately authorize the rest of Phase 2. This is the safest option if Cloudflare ownership is still unclear.
- **Practical website effect:** The first work occurs in an isolated preview. A production cutover, if later accepted, is limited to route/status/metadata/404/API isolation and the five-item global shell; it does not migrate the homepage or Start system.
- **Risk of approving:** Incorrect redirects, status handling, or global navigation could affect every visitor if acceptance gates are bypassed.
- **Risk of delaying:** The site retains soft 404s, incorrect live sitemap ownership, SPA fallback on `/api/intake`, and no scalable route shell.
- **Can it change later?** Yes through an ADR/roadmap amendment before public cutover.
- **Support:** `07-migration-slices-and-gates.md` — **Phase 2 — Hosting, routes, navigation, and SEO shell**; `08-phase-2-entry-criteria.md` — all sections; roadmap — **Phase 2**.

## Worktree dispositions requiring separate decisions

Approving a row approves only its classification and eventual treatment. It does not authorize staging, committing, moving, archiving, uploading, resetting, cleaning, or deleting.

| Workstream | Recommended eventual treatment | Why and practical effect | Risk if approved | Risk if delayed | Change later? | Phase 1 support |
|---|---|---|---|---|---|---|
| Phase 0 evidence, `docs/internal/phase-0-baseline/` | **Committed separately** as a complete internal baseline; consider artifact storage later without silently splitting evidence | Preserves the factual release/regression reference | Adds about 10 MB and generated evidence to history | Safety evidence remains easy to lose and unavailable to collaborators | Yes; artifact policy can migrate with manifests | `02-worktree-disposition-matrix.md` — **Untracked groups**; `01-authority-and-supersession.md` — **Plan register** |
| Phase 1 roadmap/package | **Committed separately** after final approval | Establishes one reviewable architecture record without mixing old changes | Locks a version that later needs amendments rather than silent edits | Execution continues without a shared authority | Yes, by versioning | `02-worktree-disposition-matrix.md` — **Phase 1 additions** and **Recommended future commit boundaries** |
| Historical `.dc.html` and `support.js` staged R100 moves plus `design-reference/README.md` | **Committed separately** if the owner accepts repository organization | Keeps prototypes without implying they are the product site | Current references could need path updates | Staged state keeps contaminating unrelated commits | Yes; no deletion proposed | `02-worktree-disposition-matrix.md` — **Tracked changes** and **Untracked groups** |
| `.claude/launch.json` | **Reviewed later**, then **committed separately** only if portable | Could simplify local launch without affecting the site | Machine-specific settings may inconvenience other developers | Minor; local tooling remains inconsistent | Yes | `02-worktree-disposition-matrix.md` — **Tracked changes** |
| `.env.example`, `DEPLOYMENT.md`, `README.md` | **Reviewed later** after hosting is confirmed; then **committed separately** | Prevents Vercel assumptions from becoming false production instructions | Publishing wrong provider/secrets guidance creates operational risk | Documentation remains stale and confusing | Yes | `02-worktree-disposition-matrix.md` — **Tracked changes**; `03-rendering-and-hosting-adr.md` — **Confirmed repository evidence** |
| `.gitignore` SF pipeline rules | **Committed separately** only after source/archive policy approval | Keeps large raw/render outputs out of normal Git history | Overbroad rules could hide a required source file | More accidental bulk files remain Git-visible | Yes | `02-worktree-disposition-matrix.md` — **Tracked changes** |
| Guided-intake code: tracked edits/deletions plus seven untracked replacement/API files | **Kept as an experiment**, **reviewed later**, and eligible for a dedicated commit only as one atomic workstream | Preserves the unfinished rewrite without merging it into Phase 1 or calling it production-ready | Later review may find security, hosting, UX, or contract rework | It remains fragile and unavailable as a trusted conversion path | Yes; no reversal or merge is approved | `02-worktree-disposition-matrix.md` — **Tracked changes** and **Untracked groups**; `01-authority-and-supersession.md` — **Resolved conflicts** |
| Eight historical/domain `docs/*.md` plans | **Preserved in Git** with their authority/status made clear; **committed separately** from runtime work | Retains useful provenance without allowing old plans to govern the homepage | Readers may still misapply them if status is missed | Plans remain unshared and vulnerable to loss | Yes; external archive only after separate approval | `01-authority-and-supersession.md` — **Plan register**; `02-worktree-disposition-matrix.md` — **Untracked groups** |
| Mascot skill copies under `.agents/` and `.claude/skills/` | **Kept as an experiment** and **reviewed later** for one canonical maintained location | Retains proven production knowledge without adding main-site authority | Duplicate instructions may drift | Knowledge can be lost or diverge further | Yes; delete a duplicate only after separate approval | `02-worktree-disposition-matrix.md` — **Untracked groups** |
| `.recovery/2026-07-23-velari-restore/` | **Archived outside Git** after a clean baseline and rollback artifact exist; **eligible for deletion only after separate approval** | Protects recovery material without normal repository/public exposure | Archive may contain sensitive/stale material and needs access control | Premature loss would weaken recovery | Yes; preserve now | `02-worktree-disposition-matrix.md` — **Untracked groups** |
| Asset-generation scripts for showcase/services-orbit | **Preserved in Git** and **committed separately** after reproducibility, dependency, and input-rights review | Keeps repeatable methods separate from generated output | Unverified scripts may depend on local paths or unlicensed inputs | Regeneration knowledge can decay | Yes | `02-worktree-disposition-matrix.md` — **Untracked groups** and **Recommended future commit boundaries** |
| `assets-3d/animos-grid-zoom/` | **Kept as an experiment**; heavy source **archived outside Git** with a manifest | Preserves the optional grid-motion work without bloating the application repository | External archive can become disconnected without hashes/owners | Local-only assets remain fragile and inflate the dirty tree | Yes; deletion separately approved only | `02-worktree-disposition-matrix.md` — **Untracked groups** |
| `assets-3d/animos-tunnel/` | **Kept as an experiment**; heavy source/review files **archived outside Git** with a manifest | Preserves the optional tunnel work without treating it as current runtime | External archive can become disconnected without hashes/owners | Local-only assets remain fragile and inflate the dirty tree | Yes; deletion separately approved only | `02-worktree-disposition-matrix.md` — **Untracked groups** |
| `assets-3d/mascot-v2/` | **Kept as an experiment** and **archived outside Git** or in a dedicated asset repository after review | Honors the decision to preserve mascot work without returning it to the main-site roadmap | Storage/provenance management is required | A 413 MB local-only workstream remains vulnerable | Yes; not eligible for deletion under this approval | `01-authority-and-supersession.md` — **Plan register**; `02-worktree-disposition-matrix.md` — **Untracked groups** |
| `assets-3d/sf-scroll-world/` including ignored raw sources | Reproducible scripts/docs **preserved in Git**; heavy provenance/source **archived outside Git** with manifests | Keeps the current hero reproducible while preventing raw geospatial/render data from overwhelming Git | A split archive can break provenance if manifests are incomplete | The largest workstream remains unsafe for bulk staging and local-only | Yes; deletion separately approved only | `02-worktree-disposition-matrix.md` — **Untracked groups**; `01-authority-and-supersession.md` — hero plan entries in **Plan register** |
| `public/assets/scrollworld/` draft/alternate encodes | **Reviewed later**; approved final runtime files may be committed separately, alternatives **archived outside Git**; **eligible for deletion only after separate approval** | Prevents unreferenced drafts from shipping merely because they sit under `public/` | A mistaken “final” selection could change quality/performance | Dirty-tree deployment continues to risk accidental publication | Yes | `02-worktree-disposition-matrix.md` — **Untracked groups** |
| `public/assets/services-orbit/` source/v2/review | **Reviewed later**; only referenced approved finals committed, source/history archived outside Git | Separates production media from generation history | Wrong variants could ship or duplicate existing assets | Public directory remains noisy and deployment-unsafe | Yes; deletion separately approved only | `02-worktree-disposition-matrix.md` — **Untracked groups** |
| `public/assets/showcase/` panels/source/zips/alternate media | **Reviewed later**; approved finals committed, archives/source stored outside Git | Preserves Work provenance while avoiding browser-deployable archives and ZIP clutter | Misclassification may publish rejected or heavy assets | Accidental deployment and maintenance burden persist | Yes; deletion separately approved only | `02-worktree-disposition-matrix.md` — **Untracked groups** |
| `public/assets/v4/` | **Kept as an experiment**; archive outside Git after provenance review; **eligible for deletion only after separate approval** | Preserves mascot-v4 history while keeping it out of the main-site migration | Public-path placement makes accidental shipping possible | Dirty tree remains larger and ambiguous | Yes | `01-authority-and-supersession.md` — v4 entries in **Plan register**; `02-worktree-disposition-matrix.md` — **Untracked groups** |

## Owner questionnaire with recommendations

### Priority launch industries

**Recommendation:** Use two explicit rankings instead of pretending readiness and commercial priority are the same.

1. **Contractors** — first. Two existing concepts (Trades and Construction) provide the strongest reusable visual starting point, and the visitor journey naturally connects to estimates, quote requests, service areas, scheduling, and follow-up.
2. **Real estate** — second. The Property concept provides a strong visual/workflow starting point, and high-value local inquiries support a tailored conversion story.
3. **Medical spas** — third commercial priority, but only after new, clearly industry-specific proof is created. Do not present the Dental concept as medical-spa proof.
4. **Restaurants** — the fastest asset-ready follow-up because a concept exists; use as a validation page, not necessarily the first paid-campaign investment.
5. **Salons/barbers**, then **fitness**, then **automotive** — all have credible local acquisition/use cases, but need stronger Velari-specific demonstrations first.
6. **Local services** remains an umbrella hub/taxonomy, not a generic launch page that duplicates contractor pages. Industrial, Logistics, Retail, Research Labs, and Dental remain Work proof or later specialized industries until strategy and proof support campaigns.

This ordering is a business inference, not a guarantee of demand. Google currently supports lead-oriented Local Services categories across general contractors, real estate, beauty, wellness, and automotive, reinforcing the value of industry-specific landing and conversion paths ([Google Local Services Ads](https://ads.google.com/intl/en_us/home/local-services-ads/)). Restaurants are more geographically constrained in that program, which is one reason not to make them the first paid-campaign priority ([Google LSA eligibility](https://support.google.com/localservices/answer/6224841)).

**OWNER-ONLY DECISION:** Approve the ordered launch list and any industry Velari does not want to pursue. If deferred, schemas remain ready but no Industry page should be treated as campaign-ready.

### Inquiry database, inbox/CRM, and scheduling

**Recommendation for the first verified Start release:**

- **Database of record:** a small Supabase Postgres project owned by Velari. The server/edge function writes the submission; secrets never enter the browser. Supabase provides a managed Postgres database and dashboard, with backup options; its security guidance supports keeping privileged access behind server/edge functions ([database overview](https://supabase.com/docs/guides/database/overview), [secure server-side access](https://supabase.com/docs/guides/database/secure-data), [backups](https://supabase.com/docs/guides/platform/backups)).
- **Inbox:** keep the owner-controlled `info@velariss.co` inbox as the operational notification/reply destination. Use a transactional sender such as Resend from a dedicated verified subdomain for confirmation and internal alerts; Resend recommends a sending subdomain and SPF/DKIM verification ([domain guidance](https://resend.com/docs/dashboard/domains/introduction)).
- **Scheduling:** link successful submissions to one owner-controlled Calendly event. Add routing only when Velari has multiple qualified destinations; Calendly can later route by form answers ([routing guidance](https://help.calendly.com/hc/en-us/articles/4418606043927-Getting-started-with-Routing-Forms)).
- **CRM:** do not introduce a second lead database on day one. Add HubSpot when lead volume or multiple sales owners justify pipeline stages, task ownership, and reporting. HubSpot’s free CRM is a reasonable alternative if the owner wants a visible pipeline immediately ([HubSpot CRM](https://www.hubspot.com/products/crm)).

This stack keeps three distinct jobs clear: Supabase proves the inquiry was stored, the inbox drives a human response, and Calendly books time. The website must not claim success merely because an email send was attempted.

**OWNER-ONLY DECISION:** Name the real recipient(s), operational response owner, scheduling calendar owner, retention owner, and account/billing owner for each provider. If deferred, keep current contact behavior and do not cut over Phase 3.

### Practical privacy/legal path

**Recommendation:** Before collecting through a verified Start backend, the owner appoints one internal privacy/data owner; engineering prepares a plain-language data map (fields, purpose, vendors, access, retention, deletion, analytics, and incident contact); a California-qualified small-business/privacy attorney reviews the actual privacy policy, notice at collection, consent language, terms, retention/deletion process, marketing follow-up, and vendor agreements. Use a policy generator only as a drafting aid, not final legal approval.

Collect only what the current qualification needs, keep PII out of URLs and analytics, restrict provider access, and adopt a provisional maximum of 12 months for unconverted inquiry data unless counsel/operations approves another period. California’s Attorney General explains that applicable businesses may need a notice at or before collection identifying categories and purposes and linking to the privacy policy; applicability and wording require fact-specific counsel review ([California CCPA guidance](https://oag.ca.gov/privacy/ccpa)).

**OWNER-ONLY DECISION:** Identify the legal entity, jurisdiction(s), privacy/legal owner, counsel, approved retention period, deletion contact/process, and whether marketing follow-up is allowed. If deferred, do not launch production data collection in Phase 3.

### Safe public proof

**Recommendation:** Treat material as public proof only when all applicable checks pass:

- written client/rights-holder permission covers the name, logo, screenshots, testimonial, and channel;
- the work and attribution are accurate and confidentiality restrictions are recorded;
- a testimonial is the person’s genuine approved statement with approved name/title and any required relationship disclosure;
- every result has a source, baseline, measurement period, method, and client approval;
- imagery, fonts, data, and third-party marks have recorded usage rights;
- the content owner and approval date are stored with the Work record.

Anything else is **concept material**: fictional brand, illustrative dashboard, mockup, invented workflow, speculative metric, unlabeled redesign, unapproved client reference, or third-party inspiration. Concepts may be public only when prominently and consistently truth-labeled and must not imply a client relationship or measured result. The FTC requires endorsements and testimonials to be truthful and not misleading; fake or false testimonials can create liability for the business publishing them ([FTC testimonials Q&A](https://www.ftc.gov/business-guidance/resources/consumer-reviews-testimonials-rule-questions-answers), [FTC endorsement guidance](https://www.ftc.gov/business-guidance/advertising-marketing/endorsements-influencers-reviews)).

**OWNER-ONLY DECISION:** Client permissions, names, logos, testimonials, screenshots, and results. If deferred, publish only truth-labeled concepts with no outcomes or implied client endorsement.

### Current packages and prices

**Recommendation:** Keep the current three names and prices temporarily visible and compatible while commercial review happens:

- Signature Landing — `$999`
- Business Platform — from `$2,999`
- AI-Integrated Platform — from `$4,999`

Do not increase their prominence or build new campaigns around them until the owner confirms scope, margin, exclusions, payment terms, and whether each price is fixed, starting, or illustrative. Later homepage reduction should move detailed commercial explanation to the canonical Service/Offer/Start context rather than removing compatibility abruptly.

**OWNER-ONLY DECISION:** Final names, prices, price mode, included scope, commercial terms, and approval date. If deferred, leave the current public presentation unchanged, label the records internally as commercial approval pending, and make no new pricing claims.

## Repository-state verification

Verified against the Phase 0/Phase 1 snapshot on 2026-08-02:

- **Confirmed:** Phase 1 has added only `docs/velari-master-roadmap-v1.md` and `docs/internal/phase-1-architecture-v1/*`, including this brief and its package-index entry.
- **Confirmed:** No pre-existing tracked file was modified by Phase 1. The same 12 pre-existing tracked paths remain unstaged with the same aggregate diff: 387 insertions and 328 deletions.
- **Confirmed:** No existing staged change was altered. The index still contains the same four R100 design-reference renames with zero content changes.
- **Confirmed:** No public/runtime source, route, asset, form, API, deployment configuration, or behavior was changed by Phase 1.
- **Confirmed:** The dirty worktree remains intact: its pre-existing tracked changes, staged renames, unfinished intake work, untracked plans, recovery material, and asset workstreams remain present and unprocessed.
- **Important limit:** Git cannot independently prove when an untracked byte was created. This verification compares the recorded pre-Phase 1 inventory and diff statistics with the current repository state; it does not claim that unrelated untracked work is clean or deployable.

Support: `02-worktree-disposition-matrix.md` — snapshot statement, **Safety verdict**, **Tracked changes**, **Untracked groups**, and **Phase 1 additions**; Phase 0 `19-phase-1-readiness.md`.

## Approval closeout

### Recommended approvals

- Approve roadmap v1 and the authority hierarchy.
- Approve the five-item navigation, `/work/[slug]`, route families, schemas/IDs, and legacy no-removal contract.
- Conditionally approve static-first hybrid, subject to the preview spike and confirmed Cloudflare control plane.
- Approve each worktree classification individually as proposed, with no action authorization.
- Approve the exact Phase 2 boundary below, with implementation held until all entry criteria pass.

### Recommended amendments

- Treat Cloudflare account/project identification, least-privilege access, preview, logs, and rollback as a hard Phase 2 prerequisite.
- Separate Industry commercial priority from current asset readiness; use Contractors, Real Estate, and Medical Spas as the strategic first three, with Restaurants as the asset-ready follow-up.
- Use Supabase + owner inbox + Calendly as the provisional Phase 3 operating stack; defer a CRM until operational need is proven.
- Keep current Offer names/prices compatible and visible without increasing prominence while commercial review is pending.
- Require truth labels and written approval records before any concept becomes client proof.

### Decisions only the owner can make

- Final launch-industry order and exclusions.
- Cloudflare/company account ownership, administrators, billing, deploy authority, and production approval owner.
- Inquiry recipients, operational response owner, scheduling calendar, provider accounts, and CRM timing.
- Legal entity, counsel, privacy/legal owner, consent/retention/deletion decisions, and policy approval.
- Every client permission, logo, testimonial, screenshot, attribution, metric, and result claim.
- Final package names, prices, scope, terms, and commercial approval date.
- Named engineering, content/design, SEO/growth, conversion/operations, and phase-approval owners.

### Safe defaults if a decision is deferred

- Make no public change and do not start the affected migration.
- Keep the dirty worktree, current routes, queries, fragments, concept implementations, `/api/intake` separation, assets, themes, analytics, direct contact behavior, and packages unchanged.
- Keep Products and Resources unpublished and outside primary navigation.
- Treat all unapproved work as a concept with no client/result claim.
- Do not activate a new form backend until persistence, recipients, privacy, security, failure handling, and ownership are approved.
- Do not stage, commit, move, archive, upload, clean, reset, or delete any worktree group.

### Exact proposed Phase 2 boundary

**Included only after entry approval:** an owner-approved isolated implementation baseline; discovery/documentation of the real Cloudflare project; a non-production static-first rendering spike; canonical route shell; correct direct-load/status/content-type behavior; explicit 404; `/api/*` exclusion from page fallback; query-aware legacy redirect mechanism; five-item desktop/mobile navigation; per-route metadata/canonicals; corrected robots/sitemap and apex/`www` policy in preview; accessibility/route/SEO/legacy tests; preview, rollback, and stop-condition evidence; controlled Phase 2 cutover only after its acceptance gate.

**Excluded:** Phase 3 Start backend or intake completion; Work/case-study migration; Industry or Service page content publication; homepage reduction; Offer/pricing changes; Products/Resources publication; mascot/v4 adoption; bulk asset migration; visual redesign/polish; legacy retirement; any Phase 3–10 work.

### Copyable Phase 2 approval statement

**YES:** “Yes — I approve the Phase 1 Architecture and Repository Reconciliation Package as amended by the Phase 1 Owner Approval Brief. I approve the individual worktree classifications but authorize no Git, file, archive, deletion, or deployment action through that approval. I authorize Phase 2 only within the exact boundary stated in the brief and only after every Phase 2 entry criterion, including Cloudflare ownership, isolated baseline, preview, test, and rollback requirements, is confirmed. I do not authorize Phase 3 or any homepage, conversion, content, pricing, asset, or legacy-retirement work.”

**NO / DEFER:** “No — I do not authorize Phase 2 yet. Keep Phase 1 in awaiting-approval status, preserve the current website and dirty worktree unchanged, and return only the specific amendments or evidence I request.”
