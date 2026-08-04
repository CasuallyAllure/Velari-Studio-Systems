# Proposed route and navigation architecture

Status: proposed; no routes are implemented or redirected in Phase 1.

## Initial primary navigation

1. Work → `/work`
2. Industries → `/industries`
3. Services → `/services`
4. About → `/about`
5. Start → `/start` — the single emphasized action

Products and Resources are part of the permanent architecture but remain outside initial primary navigation until their publication gates pass. Campaigns never become primary navigation by default. Individual industries and services live below hubs rather than expanding the header.

The theme switcher remains unchanged through Phases 1–5. Homepage Reduction may propose removal, relocation, or a demonstration context, subject to owner review.

## Page-job map

| Route | One primary question | Canonical owner | Initial publication |
|---|---|---|---|
| `/` | Why should someone trust Velari? | Agency proposition + curated references | Existing; restructured in Phase 6 |
| `/work` | What has Velari designed or demonstrated? | Work collection | Phase 4 |
| `/work/[slug]` | What was built, why, and what proves its value? | Work record | Phase 4 |
| `/industries` | Which businesses does Velari understand? | Industry collection | Phase 5A |
| `/industries/[slug]` | Why does Velari understand this business? | Industry record | Phase 5A |
| `/services` | What does Velari provide? | Service collection | Phase 5B |
| `/services/[slug]` | What problem does this service solve and what is delivered? | Service record | Phase 5B |
| `/about` | How does Velari think and work? | Company/process | Phase 2 shell or Phase 7 full content |
| `/start` | How does a visitor begin the relationship? | Start/qualification | Phase 3 |
| `/products` | What standalone products does Velari offer? | Product collection | Withheld until product gate |
| `/products/[slug]` | What is this product, how does it work, and how is it adopted? | Product record | Per-product gate |
| `/products/[slug]/pricing` | What does this product cost? | Product pricing | Per-product gate |
| `/products/[slug]/docs/*` | How is this product used? | Product documentation | Per-product gate |
| `/products/[slug]/support` | How is product support obtained? | Product support | Per-product gate |
| `/resources` | What can visitors learn from Velari? | Resource collection | Withheld until resource gate |
| `/resources/[slug]` | What useful topic does this resource explain? | Resource record | Per-resource gate |
| `/campaigns/[slug]` | Why is this offer relevant to this audience now? | Campaign composition | Per-campaign; not primary nav |
| `/privacy` | How is personal data handled? | Legal/privacy | Required before verified Start launch |
| `/legal` or approved `/terms` | What terms govern site/service use? | Legal | Required as applicable |
| `/credits` | Which assets/data require credit? | Credits/provenance | Phase 2/asset migration |
| `/404` / unknown route | Where can a visitor recover from an invalid URL? | Global shell | Phase 2 |
| `/api/*` | Machine endpoint, never a page | Server/edge API | Phase 2 isolation; Phase 3 functionality |

## Route tree

```text
/
├── work/
│   └── [slug]
├── industries/
│   └── [slug]
├── services/
│   └── [slug]
├── about/
├── start/
├── products/                 future; not initial nav
│   └── [slug]/
│       ├── pricing
│       ├── docs/[...path]
│       ├── resources/[slug]  only if product-owned
│       └── support
├── resources/                future; not initial nav
│   └── [slug]
├── campaigns/                direct acquisition; not initial nav
│   └── [slug]
├── privacy
├── legal
├── credits
└── api/
    └── intake                compatibility contract; future canonical submission API may version internally
```

## Work route decision

Preferred canonical pattern: `/work/[slug]`.

Reasons:

- Work type is metadata, not a permanent URL hierarchy.
- A concept may later mature into a case study without changing its public URL.
- Client work, concepts, internal tools, and product work can share one premium presentation system while remaining explicitly labeled.
- It avoids creating both `/work/concepts/[slug]` and `/work/[slug]` as competing canonicals.

Concrete exception rule: introduce a nested route only if a future Work subtype requires a materially independent navigation or access model. No current concept does.

## Publication gates

### Product hub

Do not publish or add to navigation until at least one approved Product has independent positioning, demonstration, ownership, conversion, and support information. Do not create an empty “coming soon” hub.

### Resource hub

Do not publish or add to navigation until there is a credible initial collection, proposed minimum three substantive approved Resources across at least two topics. The owner may approve a different threshold.

### Campaigns

Campaign routes require an owner, active date/status, canonical composition references, Start context, analytics/consent review, and a retirement/redirect plan. They should normally be excluded from primary navigation and evaluated individually for indexing.

## Start context contract

Links to `/start` may carry stable, non-PII context:

```text
/start?industry=contractors
/start?service=ai_intake_reception
/start?offer=business_platform
/start?work=work_groundline_construction_concept
/start?campaign=campaign_contractors_google_search_2026q4
```

Rules:

- Values are immutable IDs, never display labels.
- Context preselects known answers and is not asked again unless confirmation is necessary.
- Free text, email, phone, names, sensitive details, and chat transcripts never enter URLs.
- Unknown IDs are ignored safely and logged only without PII.
- Canonical tags for `/start` exclude context queries.
- Back/refresh preserves approved non-sensitive state through URL/session; submitted PII remains server/client-storage controlled under the privacy policy.

## Homepage fragment compatibility

The following IDs remain available on `/` through their migration windows: `#hero`, `#selected-systems`, `#industry-concepts`, `#what-we-build`, `#packages`, `#how-it-works`, and `#contact`.

When their content moves deeper, retain a lightweight alias target at the closest meaningful homepage region. Do not automatically navigate a fragment visitor to another route; provide an intentional visible route link. Removal requires traffic/backlink evidence and owner approval.

## Global shell behavior

- Desktop and mobile expose the same five destinations.
- Start is the only globally emphasized CTA.
- Logo returns to `/`.
- Current direct email and phone remain available in the footer through conversion migration.
- Products/Resources appear in footer or secondary navigation only after publication gates.
- Credits/privacy/legal become compact footer utilities when those pages exist.
- Route links use anchors; state-changing controls use buttons.

