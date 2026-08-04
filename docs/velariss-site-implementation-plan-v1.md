# VELARISS.co Website Implementation Plan v1

## Goal

Build a cinematic lead-generation website for Velari Systems that demonstrates the quality of the work, helps a prospect assemble a realistic scope, produces a branded estimate PDF, notifies both parties, and moves the qualified lead into a discovery meeting.

## Confirmed brand direction

- Public domain: `VELARISS.co`
- Public company name: Velari Systems
- Primary email: `info@velariss.co`
- Phone: `(415) 988-0944`
- Visual direction: charcoal and black foundation, champagne-gold accents, warm editorial serif headlines, smoked-glass interface cards, dimensional imagery, and restrained cinematic motion
- Positioning: web strategy, design, development, business systems, integrations, and practical AI automation

## Site story

### 1. Cinematic landing

The existing San Francisco scroll-scrub video becomes the opening world. Copy appears in four story beats: strategy, structure, purposeful motion, and conversion. The final beat leads to either selected work or the estimate builder.

### 2. What Velari builds

Animated cards reveal recognizable product surfaces rather than abstract feature lists:

- payment and checkout flow
- client or member portal
- intake and booking workflow
- admin and operations dashboard
- AI website assistant
- lead routing and automation

Each card should show a concise business outcome, a short technical proof point, and a lightweight interactive preview.

### 3. Selected work and proof

Use two to four strong examples. Each should include the business problem, the system designed, a polished visual, the outcome, and the services involved. Until client case studies are approved, label exploratory work honestly as a concept rather than implying a real client engagement.

### 4. Starting packages

- Signature Landing — `$999`, typically 2–3 weeks
- Business Platform — from `$2,999`, typically 4–6 weeks
- AI-Integrated Platform — from `$4,999`, typically 5–8 weeks

Packages are starting points. The estimate builder adds only the requested scope and clearly separates one-time, monthly, annual, and review-required items.

### 5. Eight-part estimate builder

The public questionnaire should feel like a guided conversation, not a tax form. It should save progress locally, show a compact live summary, and only reveal follow-up questions when they matter.

1. **About you** — name, work email, phone, preferred contact method.
2. **About the business** — company, industry, location/service area, current URL, new build or redesign.
3. **What are we building?** — select a starting package or choose “help me choose”; identify the primary goal and required launch pages.
4. **Systems and functionality** — portal, booking, payments, e-commerce, CMS/blog, dashboard, integrations, languages, accessibility needs.
5. **AI and automation** — assistant, intake/routing, custom automation, or voice. Included AI-tier features must not be charged twice; voice always requires review.
6. **Brand and content** — existing brand assets, logo, full identity, copywriting, migration, marketing imagery, social kit, or video. Full identity replaces the separate logo charge.
7. **Hosting and ongoing care** — Velari-hosted care plan, self-owned deployment, domain help, support block, and training.
8. **Timeline and handoff** — desired launch date, budget comfort, decision-makers, notes, consent, and a final review of the calculated scope.

## Estimate behavior

- Call the result a “starting estimate” or “budgetary estimate,” never an accepted contract.
- Show the calculated one-time subtotal, any monthly/annual costs, review-required items, estimated 25% deposit, estimated schedule, and 14-day validity.
- Use one clear action: **Request this scope**.
- The action saves the submission, creates a versioned PDF, emails the prospect, emails Velari, and opens scheduling.
- The discovery call confirms requirements, content, integrations, access, and timing. Velari then issues the final proposal for signature and deposit.

## Pricing corrections applied

- Full identity includes the logo; never charge both.
- The 10% creative bundle reduction applies only to fixed-price creative items. “From” and quoted services are reviewed manually.
- The post-launch block is `$300` for four hours (`$75/hour`), avoiding the earlier conflict with the `$85/hour` custom-development rate.
- Self-owned hosting is `$0/month`; domain registration is estimated separately.
- AI voice, rush work, advanced accessibility, brand video, and materially custom systems require review.

## Delivery architecture

### Browser

- React/Vite presentation and questionnaire
- shared versioned pricing catalog
- live estimate calculations with no secret credentials
- responsive, reduced-motion, keyboard, and screen-reader behavior

### Protected server endpoint

- validate and normalize every submission again
- recalculate pricing from the server-owned catalog
- rate-limit and bot-protect the form
- save lead, answers, estimate version, consent time, and source
- generate a branded PDF from a stable HTML template
- send prospect and internal emails through the verified `velariss.co` domain
- return only a success state and safe scheduling link

### Recommended production services

- data: Supabase/Postgres with row-level security
- email: Resend
- PDF: server-rendered HTML-to-PDF
- scheduling: direct booking link with callback fallback
- bot protection: Turnstile or equivalent
- analytics: privacy-conscious event tracking for CTA, estimate start, completion, and booked meeting

## Build order

1. Lock the content inventory, real work examples, and final logo assets.
2. Finish the scroll narrative and capability-card motion system.
3. Build the adaptive eight-part estimate UI against the shared pricing engine.
4. Create the estimate summary and PDF/email templates.
5. Add the protected submission endpoint, database, bot protection, idempotency, and delivery logging.
6. Connect scheduling and lifecycle emails.
7. Test pricing combinations, accessibility, mobile performance, email delivery, and failure recovery.
8. Configure DNS and production environment variables, deploy `VELARISS.co`, and monitor the first submissions.

## Content still needed before launch

- two to four approved portfolio projects or clearly labeled concepts
- final logo files and any alternate lockups
- scheduling URL and working hours
- legal business/footer details and privacy policy
- preferred hosting/care wording and cancellation terms
- final sender mailbox, ideally `estimates@velariss.co`, after domain verification
- photography, product captures, or source files for each capability card

## Launch definition

The site is launch-ready when a prospect can complete the flow on mobile, receive a correct branded PDF and email, appear once in the lead database, book a meeting, and the same submission reaches Velari with enough structured information to conduct discovery without asking the prospect to repeat the form.
