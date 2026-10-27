# AI Applied to Digital Marketing — Session 1

**Session date:** 21 October 2026 · **Lecturer:** Lluís Campderrós Reyes

## Session at a glance

Students leave able to brief an AI assistant well and to judge its output before it reaches a client.

**The case: LOOP**, a fictional Barcelona bottle brand. 750 ml steel bottle, €29. Proposed audience: students and commuters. Goal: first purchases through the website. Pilot data are synthetic.

> The thread for the whole session: AI produces drafts. Every claim needs a source or a visible uncertainty. The marketer makes the decision.

| # | Section | Slides | Time |
|---|---|---|---|
| — | Welcome and warm-up | 1–3 | 10 min |
| 01 | AI Game of Thrones | 4–6 | 10 min |
| 02 | The marketer's role and strategy | 7–10 | 15 min |
| 03 | Language models and their limits | 11–15 | 15 min |
| 04 | Prompting and working context | 16–23 | 20 min |
| 05 | Break | 24 | 10 min |
| 06 | The LOOP workflow in ChatGPT Work | 25–34 | 30 min |
| 07 | Human judgment and your next task | 35–39 | 10 min |
| | **Total** | | **120 min** |

## Welcome and warm-up (slides 1–3)

Open with experience, then plant the trust question the whole session answers.

- **Slide 2 — AI in your world.** Where have you used AI? What helped, what disappointed? Disappointments usually trace to missing context or unchecked facts.
- **Slide 3 — A launch on the screen.** Brief, recommendation or concept: which would you trust first? The bottle image is AI-generated and LOOP is fictional.
- **Answer revealed by the end:** trust depends less on the output type than on whether its inputs and claims can be checked.

## 01 · AI Game of Thrones (slides 4–6)

Choosing an AI tool is a strategic decision, not a matter of taste.

- **Slide 5 — The houses.** People shape the companies, companies shape the tools — their priorities show up in pricing, privacy terms and integrations.
- **Slide 6 — Which house fits your work?** Scenario: an agency needs reliable client research. Pick the one criterion that decides it.
- **Criteria:** evidence (does it cite sources?), access (does it connect to our files?), cost, privacy (can client data go in?), fit with the team's workflow. No single right answer; the reasoning counts.

## 02 · The marketer's role and strategy (slides 7–10)

AI widens the options; the marketer frames the problem and picks what to test.

- **Predictive vs generative.** Predictive estimates an outcome (likelihood of purchase). Generative creates an output (a first ad draft). Real workflows mix both, e.g. a model scores leads, then copy is drafted per segment.
- **The marketer's role — four verbs:** define the problem, explore alternatives (AI helps), choose what to test, decide on evidence.
- **Strategy before production (LOOP):** goal = first website purchases; audience = a hypothesis, not a fact; product facts = only what we can support; message = something testable; success = a decision backed by evidence.
- **Our marketing workflow:** each reviewed output becomes input for the next task.

| Stage | Working output | Human review question |
|---|---|---|
| 1 Brief | Audience, goal and facts | What could change the decision? |
| 2 Research | Sources and positioning hypothesis | Does the source support the claim? |
| 3 Analysis | Metrics and a proposed test | Can we reproduce the calculation? |
| 4 Creative | Two concepts with a rationale | Which audience assumption do we test? |
| 5 Launch | Draft page and measurement plan | Can we defend the recommendation? |

## 03 · Language models and their limits (slides 11–15)

A model predicts plausible text from its context, so fluent output is not the same as correct output.

- **How a model generates text.** Context is split into tokens; the model generates the next token from learned patterns, one at a time. **Plausible ≠ true.**
- **Attention and working context.** Attention links pieces of information within the input. Uploading a product sheet gives the model working information for this task; **it does not retrain the model.**
- **Model, assistant, workflow — five layers:** the *model* drafts and reasons; the *assistant* adds interface and instructions; *context* supplies the brief and sources; *tools* read files, search or build artifacts; the *workflow* chains steps toward an agreed outcome. When output is wrong, ask which layer failed.
- **Useful draft, unverified claim.** “LOOP keeps drinks cold for 24 hours” is not in the product sheet. The assistant should flag it as unsupported, ask for test data, and propose wording limited to known facts (750 ml, steel).
- **Evidence before generalization.** Noy & Zhang, *Science*, July 2023: 453 college-educated professionals on writing tasks (press releases, short reports). With ChatGPT, time fell about 40% and graded quality rose about 18%. Limits: specific tasks, an older model, and graders did not fact-check the content.

## 04 · Prompting and working context (slides 16–23)

Write a prompt the way you would brief a new colleague.

**A prompt is a working brief — five parts:**

1. The outcome
2. The audience and situation
3. The material the assistant should use
4. The limits it should respect
5. The form of a useful result

- **A vague request:** “Make a great campaign for my bottle brand.” Map what's missing to the five parts.
- **A useful request:** “Using our product sheet, propose two Instagram concepts for Barcelona students and commuters. Aim for first purchases. Keep the tone practical. Support product claims with the supplied facts. Include copy and a test hypothesis.”
- **Context beyond one message.** Project files hold material; instructions set recurring expectations; reusable guidance covers repeated tasks; connected tools add actions. Every task still needs reviewed inputs.
- **One revision that matters** — good revisions:
  - Language: Catalan, Spanish or English for a Barcelona audience?
  - Sharper audience: which students, which commute (metro, bike)?
  - Measurable success: a target purchase conversion rate or CPA.
  - Format: feed post, carousel or Reel; caption length.
  - Explicit no-go claims, e.g. insulation time.
- **Demo route:** research → analysis → creative → launch, each producing one reviewed output.

### Checkpoint before the break

| Question | Answer |
|---|---|
| What can context change? | The relevance and accuracy of the answer, not the model itself. |
| What makes a claim credible? | A source that actually supports it. |
| Who approves the marketing decision? | The marketer, always. |

## 06 · The LOOP workflow in ChatGPT Work (slides 25–34)

Four live demos, each producing one artifact that feeds the next. A task can produce an artifact (sheet, deck, brief); files and connected tools supply context; you steer and review.

### Demo 1 — Competitor brief (slides 26–27)

- **Prompt:** three reusable bottle brands; compare price, product facts, positioning; short brief with sources and dates; uncertainties visible.
- **Review:** open one row's source live. Verify prices first — they change and vary by market. What would change the recommendation? (e.g. a competitor at the same price with a proven insulation claim.)

### Demo 2 — Campaign data (slides 28–29)

- **CTR** = clicks ÷ impressions
- **Conversion rate** = purchases ÷ clicks
- **CPA** = spend ÷ purchases
- **ROAS** = revenue ÷ spend
- Purchases and revenue share one attribution window.

| Channel | Spend | Purchases | CPA | ROAS | Revenue | Revenue / purchase |
|---|---|---|---|---|---|---|
| Social prospecting | €800 | 40 | €20.00 | 1.45 | €1,160 | €29 |
| Search | €600 | 60 | €10.00 | 2.90 | €1,740 | €29 |
| Retargeting | €300 | 45 | €6.67 | 4.35 | €1,305 | €29 |
| **Total** | **€1,700** | **145** | **€11.72** | **2.47** | **€4,205** | **€29** |

- **Verify the AI's headline:** every purchase is exactly one €29 bottle, so ROAS ranks the channels exactly as CPA does. Revenue doesn't change the channel story.
- **Discussion:** retargeting looks best but mostly reaches people already interested, so attribution flatters it — and it depends on prospecting to fill its audience. At €29, a €20 CPA likely loses money once product cost is counted.

### Demo 3 — Creative options (slide 30)

- Line: **“Ready for your next refill.”** Does it fit students and commuters? Audience assumption: refilling during the day, not buying bottled water.
- Push for a second concept that tests a *different* assumption, so the A/B test teaches something.

### Demo 4 — Launch package (slides 31–33)

- **Inputs reused:** reviewed research (positioning), product facts (creative limits), checked pilot data (next test).
- **Output:** one positioning recommendation, two ad concepts, a landing page draft, a measurement plan. Each claim has a source or a stated uncertainty.
- **Twist — “copy too generic”:** the creative stage and audience insight change; the facts stay fixed (750 ml, steel, €29, no unverified insulation or sustainability claims).

### Recurring report (slide 34)

A weekly campaign review needs: a schedule and data source, a comparison period (e.g. vs the prior week), a threshold for “meaningful” change (e.g. CPA moves more than 20%), and a named reviewer.

## 07 · Human judgment and your next task (slides 35–39)

- **Publication decisions — five checks:** evidence, privacy, representation, rights, brand. (Rights → the AI-generated bottle image.)
- **A claim under review:** “The most sustainable bottle in Europe” has no comparative evidence. Since **27 September 2026, EU Directive 2024/825 (EmpCo)** bars generic environmental claims unless the trader can show recognised excellent environmental performance; it covers Spain. Approvable alternative: a specific, verifiable fact, e.g. “Reusable 750 ml steel bottle”.
- **Your responsibility:** one task you'd delegate (first drafts, data formatting) and one decision you'd keep (which claim to publish, which channel to fund).
- **Your next task:** one real marketing task; a brief with an explicit success criterion; only shareable material; save one useful result, one weakness and the revision made.
- **Exit question:** one capability you'd now use, one claim you'd still verify, one question for session 2.

## Key takeaways

1. A prompt is a brief: outcome, audience, material, limits, format.
2. Fluent is not true: every claim needs a source or a stated uncertainty.
3. AI drafts; the marketer reviews and decides.

## Sources

- Study finds ChatGPT boosts worker productivity for some writing tasks — MIT Economics
- Experimental evidence on the productivity effects of generative AI — Stanford SCALE
- Spain: EU green claims rules apply from 27 September — Baker McKenzie
- New EU directive on environmental advertising — Bird & Bird
