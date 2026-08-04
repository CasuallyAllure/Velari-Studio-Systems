# Analytics event map

## Current integration

`src/lib/clients/analytics.ts` defines a Plausible-shaped client abstraction, but the real provider call is commented out. The selected implementation delegates to `src/lib/mocks/analytics.mock.ts`, which logs events. No pageview initialization was found. No verified events are sent to an external analytics provider in the current repository behavior.

## Existing event

| Event | Trigger | Payload | Current semantic meaning | Comparable future event |
|---|---|---|---|---|
| `intake_submitted` | `src/features/intake/api.ts` after mock DB save and mock email calls resolve | `industry`, `budget_range`, `theme`, `goals_count` | Client-side questionnaire workflow reached success; **not** server-confirmed delivery | Retain as a legacy comparison alias only, or map to `intake_submission_client_completed`; introduce a distinct server-confirmed event |

The event can fire before any external persistence because current database/email clients are mocks. Dashboards must not reinterpret historical counts as verified leads.

## Missing interaction coverage

| Journey stage | Current event | Required future event family |
|---|---|---|
| Page/route view | None | `page_view` with canonical route, content ID, campaign/referral context |
| Navigation | None | `navigation_selected` with source/destination/menu context |
| Hero/header/contact CTA | None | `cta_selected` with stable CTA ID and destination |
| Industry/concept interaction | None | `industry_selected`, `work_preview_viewed`, `concept_opened` |
| Services orbit | None | `service_preview_viewed` based on intentional interaction, not scroll noise |
| Package state/select | None | `offer_viewed`, `offer_selected` with stable offer ID |
| Intake start/mode | None | `intake_started`, `intake_mode_selected` |
| Intake progress | None | Privacy-minimized step events; never raw message/PII |
| Live AI fallback/error | None | `intake_assistant_fallback`, `intake_error` with safe reason code |
| Submission attempt | None | `intake_submission_attempted` |
| Server confirmation | None | `intake_submission_confirmed` with server-generated submission ID, no PII |
| Submission failure | None | `intake_submission_failed` with safe reason/retry state |
| Mailto/tel | None | `contact_method_selected` (`email`, `phone`) |
| Theme | None | `theme_selected` only if product-relevant; avoid vanity noise |
| Campaign/referral | None | Persist approved UTM/referrer/campaign IDs through Start; privacy reviewed |

## Migration map and naming

1. Freeze the historical definition of `intake_submitted` in reporting documentation.
2. During conversion migration, dual-write a legacy-comparable event and the new state-specific events only if duplication is explicitly filtered in dashboards.
3. Make `intake_submission_confirmed` fire only from or after a trusted server response. Never fire it on button click, optimistic UI, mail-client open, chat completion, or localStorage write.
4. Use stable snake_case event names and stable ID payloads. Keep display copy out of identifiers.
5. Carry `source_route`, `source_component`, `cta_id`, `industry_id`, `service_id`, `offer_id`, `campaign_id`, and anonymous session context where applicable and privacy-approved.
6. Exclude names, email, phone, free-text messages, chat transcripts, URLs containing personal data, and sensitive health/business details from analytics.
7. Validate provider initialization, consent requirements, ad-platform rules, and development/test filtering before release.

## Continuity acceptance

The refactor must be able to answer: how many visitors began Start, selected a mode/offer, attempted submission, received server confirmation, experienced a failure, and chose direct email/phone—without counting the same lead twice. Historical `intake_submitted` remains labeled as mock/client-complete data and is never silently merged with confirmed leads.

