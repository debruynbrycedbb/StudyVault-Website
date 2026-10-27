# Web Analytics — Session 1: Introduction to Technology

**Session date:** 22 October 2026 · **Lecturer:** Prof. Arturo Martínez · MX013 · 5 ECTS

## Session overview

The format is **“questions, not answers”**: each block opens with a debate question, then a real case, then the theory.

- **Agenda:** technology in the digital context · AI-powered web analytics · technology as a competitive advantage · AI use cases · ethics and future trends.
- **Assessment:** final quiz 30%, coursework 70%. Coursework is graded by TFM tutors, partly on fit with your TFM case and strategy.
- **AI use: Level 4.** AI is allowed for specific parts of a task, but you must critically evaluate its output and cite it transparently.
- **Deadlines:** submit through eStudy only. Late work, even by seconds, gets 0.

*Cases, figures and dates are as presented in the slides.*

## 01 · Technology in the digital context

AI moves analytics from describing the past to recommending, and now executing, actions. The analyst's job shifts to interpreting, adding context and supervising the AI.

| Level | Question | How it works |
|---|---|---|
| Descriptive (traditional) | What happened? | Manual data, monthly reports |
| Predictive | What will happen? | Patterns found automatically |
| Prescriptive | What should we do? | The system recommends the action |

### Case: AI agent trading desks (Aug–Sep 2026)

Third-party setups built on xAI's Grok Bot (launched 11 Aug 2026), such as the open-source HyperGrok, run up to 7 agents that gather data, analyse, decide and execute trades.

- A dedicated **sceptic agent** is told to explain why the others might be wrong. Without it, the agents just agree with each other.
- They trade real money, but in most setups a person still approves every trade.
- These are not xAI products, and no profits have been verified.

> **The point:** AI has gone from recommending to acting, which makes human oversight the analyst's core value.

## 02 · AI-powered web analytics

AI analyses only what it is given: one stale post produced a confident wrong audit, while the full data produced a correct one.

### Case: the Euromon PLV audit

A senior manager from Google Cloud Nordics used AI to prepare “How to improve your website” for Euromon PLV.

1. The AI stated, with total confidence: you're on Wix; your main language is locked to English; your sitemaps leave out the Spanish and French pages.
2. Its only source was the professor's own (since deleted) Reddit post on r/WIX from July 2024.
3. By the time of the meeting, the site was no longer on Wix. The AI repeated what it had read rather than diagnosing anything.

### Using it in your favour: GEO (generative engine optimisation)

The professor published content on aipopdisplays.com. By October 2026, ChatGPT listed Euromon PLV first when asked in Spanish for the best POP display manufacturers.

The timing matches (lecture slide “Did it work?”, Jan–13 Oct 2026), but it is a short window and **correlation, not proof**. Debate: is this manipulation, or just the new SEO?

### Case: the Search Console drop

On 8 October, the post on aipopdisplays.com fell to 0 impressions. The same AI, asked the same question, gave opposite answers depending on the input.

| Input given to the AI | Its conclusion |
|---|---|
| Two screenshots | “It's the whole site”; blamed a Google anti-spam update and suggested pausing daily posts |
| Search Console export, two weeks compared | Not the whole site: 3 pages account for 97% of the loss, the rest is stable, clicks went from 7 to 8 |

### Theory: what AI-powered analytics adds

- **Automates:** alerts when traffic drops, automatic data checks, self-building reports.
- **Goes deeper:** micro-segments; churn and customer value predicted in advance.
- **Explains:** moves from correlation to what actually drives results.

> **The catch:** it is only as good as what it has read. Always check the source.

## 03 · Technology as a competitive advantage

Technology is now a strategic asset, not a support function. If everyone can use the same AI, the edge comes from your own data: the more you learn from it, the harder you are to copy.

- **Netflix:** about 80% of what people watch comes from recommendations (Gomez-Uribe & Hunt, 2015).
- **Amazon:** AI across the whole value chain: dynamic pricing, fraud detection, logistics.
- **Zara:** reads trends and sales data to get a design into stores in weeks, not months.

### Live demo: Higgsfield's pricing

The same person viewing the same Plus plan saw five prices in about 15 minutes.

| Step | Billing | Plus price / month | What triggered it |
|---|---|---|---|
| 1 | Yearly | €35 | “Personal” 55% off offer at sign-up, 3-hour countdown |
| 2 | Monthly | €59 | Switched to monthly; discount vanished at the Stripe checkout |
| 3 | Yearly | €32 | Left the checkout: “extra” 62% off, 10-minute countdown; a cheaper Starter plan (€19) appears |
| 4 | Monthly | €56 | Same exit offer, now with a monthly discount |
| 5 | Yearly | €35 | Timer ran out; a new €3 trial offer with a 3-minute countdown |

The banners claimed 55% and 62% off, but Plus actually got **40% and 46%**. Tactics: countdown timers, “personal” framing, exit-intent offers and inflated percentages. Debate: smart growth or dark pattern?

## 04 · AI use cases in marketing & web analytics

The same personalisation that helps users can be turned against them.

### Case: Block Blast, reverse-engineered

A video creator took the app apart; these are his claims, not independently verified.

1. **It puts a price on you.** Phone model, country, past ad earnings, even whether vibration is off, feed an on-device AI model (XGBoost) that predicts your ad value.
2. **It rigs the game.**
   - “Boost then kill”: the game feels easy until your usual game length, then gets hard.
   - Difficulty spikes when an expensive ad is ready to show.
   - Habitual ad-watchers are helped to beat their record, then a “death algorithm” rigs the next turn.
   - After losing, the first offer is a revive for watching that same ad.
   - Reviving secretly adds 10% to your high score, so you keep coming back.
   - They test the exact minute to make you lose, to see which timing gets you to watch.

**Verdict on the slide:** not a puzzle game, but an ad harvester with a rigged game loop.

### Theory: four families of AI use cases

| Family | Examples |
|---|---|
| Productivity | A/B tests analysed automatically, chatbots, automated flows |
| Personalisation | Different images, headlines and offers for each visitor |
| Visibility | Programmatic ads, AI-driven SEO, predictive audiences |
| Creativity & UX | Generative design and copy; spotting where users get stuck |

## 05 · Strategic guardrails: ethics & future trends

AI systems are not neutral: they reflect the data they learn from. The closing question is not whether we *can* use these technologies, but whether we *should*.

### Case: Amazon's CV-scoring AI, 2014–2017 (Reuters, 10 Oct 2018)

It rated CVs from 1 to 5 stars.

- **2014:** trained on ten years of CVs sent to Amazon, mostly from men.
- **2015:** found to mark down CVs containing the word “women's”.
- **2017:** scrapped, because Amazon couldn't guarantee it wouldn't discriminate in other ways.

### Theory: three guardrails

| Risk | The problem | The response |
|---|---|---|
| Bias | Models can amplify the bias in their data | Regular audits, diverse data |
| Privacy | Personalisation needs data; GDPR demands consent | Privacy by design |
| Transparency | Black-box models are hard to explain | A human in the loop |

### Future trends

- **Conversational analytics:** ask your data in plain language, e.g. “Why did conversions drop last Tuesday?”
- **Privacy-first analytics:** insights without exposing anyone's individual data.
- **Connected martech:** AI linking CRM, analytics, ads and content in one system.

### Case: AI reverse engineering and ownership

A video by Jaden Williams (“The Scariest AI Breakthrough”) shows an AI that worked out how an entire video game runs without its code. That difficulty used to be a form of security. His escalation: games get remixed, paid services become free, old systems (governments, banks, telecoms, satellites) are exposed, and trust breaks down.

- **PlayStation:** physical discs end for new games in January 2028 (announced 1 Jul 2026); 85% of games are already bought digitally. Its terms say games are “licensed to you, not sold”, and in a US lawsuit (Aug 2026) Sony called buyers' belief that they owned digital games “not plausible”.
- **AnyPS5:** 37,000 GitHub stars (14 Oct 2026) for a tool that ports PS5 games to PC; part of its code is co-signed by Claude and Codex. Similar projects (KytyPS5, SharpEmu, RPCSX) already boot games, with glitches.
- **rea:** 238,600 GitHub stars for a tool that plugs into Claude Code, Codex, Cursor, Gemini or Grok to reverse-engineer apps, programs, websites, games and firmware in plain language. It says to use it only on software you own or may examine.
- **Public reaction:** slogans such as “If buying isn't owning, piracy isn't stealing”, and former PlayStation executive Shawn Layden asking what you're buying if you don't own it. The open question: why stop at games?

## Debate questions

Prepare a view on each before class (you can write your answers in **Study tools → Debate prep**).

| Section | Question |
|---|---|
| 01 | If AI already tells you what happened, what will happen and what to do, what are you for? |
| 02 | Would you trust an AI-generated audit of your website? |
| 02 | If one post can fool an AI, can you use that in your favour? |
| 02 | Is that manipulation, or just the new SEO? |
| 02 | Analysing with AI: yes or no? |
| 03 | If every company can use the same AI, can AI still be a competitive advantage? How do we stand out? |
| 03 | Is it fair that two people pay different prices for the same thing? |
| 03 | Smart growth or dark pattern? |
| 04 | Where does personalisation end and creepy begin? |
| 05 | Can we build an AI model that isn't biased? |
| 05 | Do you love it, or are we heading for disaster? |
