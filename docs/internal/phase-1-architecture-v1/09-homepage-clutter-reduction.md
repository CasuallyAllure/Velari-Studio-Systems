# Homepage clutter-reduction architecture

## Current problem

The homepage currently acts as a four-part manifesto, nine-industry portfolio, six-service presentation, pricing page, process page, AI demo, questionnaire, and contact page. Each module receives major visual emphasis.

Phase 0 measured:

- 15,666 px at 1440×900 and 13,583 px at 390×844.
- 45 buttons, nine links, eight form controls, and 18 headings in the rendered DOM.
- Hero: 5,760 px desktop; services orbit: 4,860 px desktop.
- No mobile/tablet section navigation beyond the logo and consult CTA.
- Three overlapping conversion mechanisms.

The future architecture reduces clutter by changing ownership before changing styling.

## Permanent homepage job

Answer only: **Why should someone trust Velari?**

The homepage may establish interest, confidence, selected proof, and a conversation path. It does not own the full service catalog, industry directory, commercial catalog, process documentation, Work archive, or qualification system.

## Target hierarchy

1. **Hero** — one proposition, one signature cinematic, one Start action, optional secondary Work path.
2. **Selected Work** — two or three strongest approved records, with concept truth labels where applicable.
3. **Capability signal** — concise relationship between brand, website, intake, and operations; links to Services.
4. **Industry signal** — a small strategic sample; links to Industries.
5. **Credibility** — real outcome, testimonial, process proof, or operational demonstration when approved.
6. **Final Start invitation** — one low-friction action plus explicit direct-contact fallback.
7. **Restrained footer** — global facts and compact utility links/credits.

## Current-section disposition

| Current surface | Future homepage treatment | Canonical destination | Timing |
|---|---|---|---|
| Header fragment navigation | Replace with five route destinations and accessible mobile navigation | Global shell | Phase 2 |
| Theme switcher | Preserve now; evaluate relocation/removal later | Presentation/demo setting | Phase 6 decision |
| Four-beat hero | Condense to one proposition and one signature sequence | Homepage; service detail moves deeper | Phase 6 |
| Selected-systems tunnel | Keep only if chosen as the one signature/transition; otherwise use a shorter proof treatment | Homepage curated Work | Phase 6 |
| Nine-industry selector | Remove complete directory from homepage; retain small sample | `/industries` and `/work/[slug]` | Phase 5A/6 |
| Six-view services orbit | Replace/condense into one short capability demonstration | `/services` | Phase 5B/6 |
| Three package tabs/features | Reduce to optional starting-range signal or link | Services/Start Offer content | Phase 5B/6 |
| Four process steps | Keep only a short trust expectation if needed | `/about` and `/start` | Phase 3/7/6 |
| Guided AI intake | Remove full interaction from homepage after verified Start | `/start` | Phase 3/6 |
| Questionnaire | Remove full form from homepage after verified Start | `/start` | Phase 3/6 |
| Mailto contact form | Replace with final Start invitation only after verified Start; preserve email/phone fallback | `/start`, footer | Phase 3/6 |
| Footer contact/technical credits | Compact contact; move detailed attribution to Credits while preserving visibility/legal requirements | `/credits`, global footer | Phase 2/8 |

## How clarity improves

- One long cinematic establishes authorship instead of two competing sequences.
- One primary action eliminates decisions among package, chat, questionnaire, contact form and mail client.
- Work, Industry and Service pages reveal detail only when visitors ask for it.
- Selected examples create curiosity instead of making visitors inspect nine equal concepts.
- Stable hub routes let mobile visitors navigate directly instead of scrolling sixteen viewports.
- Actual workflows/interfaces replace paragraphs and repeated proof chips.
- Different page types receive different visual rhythms; not every section needs glass cards, tabs, arrows, chips and oversized headings.
- Canonical records prevent the same idea from appearing with slightly different wording in six interfaces.

## Homepage acceptance measures

The Phase 6 design must demonstrate, relative to Phase 0:

- only one signature long scroll-controlled sequence;
- materially lower total page height and scroll-controlled travel at all five baseline viewports;
- materially fewer buttons, simultaneous CTAs, form controls, tabs and repeated labels;
- no complete intake or qualification form on the homepage;
- no full nine-industry or six-service catalog;
- one primary Start path and at most one secondary Work path in the hero;
- direct mobile navigation to all five primary destinations;
- every moved item has a live canonical destination before homepage removal;
- all seven legacy fragments remain functional during the compatibility window;
- reduced-motion users receive the same core proposition and proof, not hidden discarded chapters.

Exact pixel/control budgets are set during the Phase 6 storyboard so they reflect approved content and do not reward superficial shortening.

