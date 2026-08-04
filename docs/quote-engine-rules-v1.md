# Velari Systems Quote Engine - Resolved Rules v1

Date: 2026-07-22

This document resolves the pricing ambiguities in
`Velari_Systems_Business_Proposal_1.pdf` and defines the source-of-truth rules for
the public estimate builder. The machine-readable catalog lives in
`src/config/quote.ts`.

## Customer-facing language

- The website produces a **budgetary estimate**, not a binding contract.
- The confirmation action is labeled **Request this scope**.
- A confirmed estimate triggers the client email, internal notification, PDF
  generation, lead record, and scheduling step.
- The final fixed proposal is reviewed and issued after a discovery call.
- Estimates are valid for 14 days and display a 25% estimated deposit.

## Canonical identity

- Brand: Velari Systems
- Website: `https://velariss.co`
- Email: `info@velariss.co`
- Phone: `(415) 988-0944`
- Time zone: Pacific Time

## Tier rules

### Signature Landing - $999

Includes up to five custom pages, responsive design, lead capture with bot
protection, standard booking/click-to-call/maps/review integrations, search
fundamentals, analytics, and 30 days of post-launch support.

### Business Platform - from $2,999

Includes Signature Landing plus secure accounts, an admin dashboard, records,
exports, payment records, and one primary operational workflow such as bookings,
orders, requests, or tickets. Multiple workflows, specialized compliance, data
migration, and advanced integrations increase the estimate or require review.

### AI-Integrated Platform - from $4,999

Includes Business Platform plus the AI website assistant, AI intake and lead
qualification, lead routing, standard follow-ups/reminders, and initial AI testing
and tuning. Those included features are never charged again as add-ons. AI voice
reception remains discovery-only because phone volume, providers, call flows, and
usage costs vary.

## Resolved pricing decisions

- Custom development remains $85/hour.
- A four-hour prepaid post-launch support block is $300 ($75/hour), providing a
  modest prepaid discount without contradicting the development rate.
- A full brand identity kit includes logo design; selecting it removes the
  standalone logo line item.
- Fixed-price Brand Studio services receive a 10% bundle discount when purchased
  with a website/platform build. Quoted video work and third-party costs are not
  discounted.
- Self-owned hosting is $0/month from Velari. Provider usage beyond free tiers is
  billed directly by the provider.
- Managed plans do not include undefined unlimited AI or telephony usage; those
  costs are passed through at cost.
- Formal accessibility auditing/remediation, rush work, voice reception, and brand
  video remain discovery-only.

## Follow-up workflow

1. Visitor completes the adaptive questionnaire.
2. The interface previews known one-time, monthly, and yearly amounts separately.
3. Discovery-only selections appear under **Requires scope review**.
4. Visitor supplies contact details and explicitly requests the scope.
5. The server validates bot protection, saves an immutable quote version, generates
   a customer PDF, and sends client and internal emails.
6. The success screen offers direct call booking with preferred callback windows as
   a fallback.
7. After discovery, Velari revises the scope and issues the final proposal for
   signature and deposit.

## Quote guardrails

- Never expose email, AI, database-service, PDF-generation, or Turnstile secret
  keys in browser-prefixed environment variables.
- Never silently convert a `starting_at` or `quoted` item into a fixed promise.
- Store the catalog version used for every generated estimate.
- Use idempotency keys so retries cannot create duplicate leads or emails.
- Display third-party domain, AI, telephony, and paid infrastructure costs
  separately from Velari project fees.
