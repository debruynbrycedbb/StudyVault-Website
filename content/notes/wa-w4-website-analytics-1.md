# Strategic Website Analytics (Website Analytics I)

**Lecturer:** Enric Garcia (AI Lead at Etailers) · **Course:** Web Analytics · MX013

Agenda: 01 Website analytics: first steps · 02 Analytic techniques · 03 Web analytics and strategy · 04 Google Analytics introduction.

## 01 · Website analytics: first steps

### What is website analytics?

Starting question: an e-commerce has extra budget — ads, new products or optimising the website? The information needed to decide is what website analytics provides.

- **Website analytics tracks and measures all the relevant data from users' behaviour on our website.**
- Avinash Kaushik's definition: *the analysis of qualitative and quantitative online business data, and the competition, to drive continuous improvement of the online experience of customers and potential customers, so it translates into the desired results (online and offline).*
- What we can collect: users and sessions, traffic sources, device and browser, popular pages, purchases, session time, popular products, registrations…

### Website analytics as a job

What analysts do: understand measurement needs and translate them into business → identify goals and KPIs → define the measurement architecture (tools) and its implementation → set up the tools → extract data → get insight → give recommendations → apply them to the business; plan and build dashboards of relevant KPIs.

| Profile | Work | Knowledge |
|---|---|---|
| Business / digital analyst | Data analysis, creating dashboards | Digital marketing, Google Analytics, communication, SQL |
| Technician analyst | Creating measurement tools, data engineering | GTM and GA code (JavaScript, SQL), web/app development |
| Viz analyst | Dashboard creation and maintenance | Graphic design, BI tools (Power BI, Tableau, Looker Studio) |

### Why do we analyse?

- To analyse = examine something in detail, considering its parts separately, to know its characteristics or state and **draw conclusions**.
- *"Without data, you're just another person with an opinion."* (W. Edwards Deming)
- Advantages: it lets you make **the best decision possible**, and **measure how the chosen solution improves** the issue.
- **A good decision doesn't always mean a good outcome.** Decision quality vs outcome quality: good decision + good outcome = success; good decision + bad outcome = tough luck; bad decision + good outcome = dumb luck; bad decision + bad outcome = failure (example: taking a taxi vs driving drunk).
- **From data to conclusions:** we acquire data and, with experience, turn it into wisdom.

### Obstacles

- Data availability is usually not the problem: data arrives **raw**, and **processing it is our job** — that's what gives value to decisions.
- Analytics is not about having lots of data but **meaningful insights**: data → information → analytics → insights.
- **New obstacle — AI is already a traffic source:** more users discover brands by asking an AI assistant.
  - GA4 measures: the default **AI Assistant channel** (visits from ChatGPT, Gemini, Perplexity, Claude) in Reports › Acquisition › Traffic acquisition.
  - GA4 can't see: Google AI Overviews and AI Mode (they arrive as google / organic) and AI answers with **no click**. So the real impact of AI is **underestimated**.

## 02 · Analytic techniques

- **What we get from analytics is knowledge, which leads to decisions.**
- **Analytics maturity model:** depending on needs, available data and how defined the analytics processes are, a company is at a different maturity step (source: *El Arte de Medir*). Example of moving from describing to recommending: 80% of users come from mobile → because the site is optimised only for mobile → it will keep rising → optimise for laptop too.

### Quantitative vs qualitative

| | Quantitative | Qualitative |
|---|---|---|
| Measures | **What** happened on the website | **Why** it happened |
| Data | Numbers, quantities, percentages, metrics | Opinions, observed behaviour |
| Ease | Usually easy to measure | Harder: can't relate data 100% to outcomes |
| Examples | Clicks, sessions, purchases | Questionnaires, usability studies, focus groups, heatmaps |

- **The fable of the blind men:** we always need context and the big picture. "I sold 100 shoes last month" — good or bad? Without context you can't tell.

### Qualitative tools compared

| Tool | Time | Cost | People | Periodicity | Note |
|---|---|---|---|---|---|
| Content rating | Low | Low | Thousands | Continuous | Always start here |
| User feedback | Low | Low | Hundreds | Continuous | Insights we didn't notice |
| Online survey | Moderate | Low | Hundreds | Continuous | Must have |
| Offline survey | High | Moderate | 100–500 | Recurring | For people who didn't buy |
| Usability test | Moderate | Moderate | About 20 | Recurring | When releasing new products |
| Heuristic exam | Low | Low | 1 or 2 | Recurring | We should be the first to do it |
| Interviews | High | Moderate | About 10 | One shot | Specific scenarios |
| Group events | High | Moderate | 2–3 groups of ~8 | One shot | Specific scenarios |

## 03 · Web analytics and strategy

The digital analyst's value: **Where were we? Where should we be? How do we get there?**

Before implementing tools and reports we need an **action plan**, which depends on our **maturity model** and **business model**: what to measure, how, and with what goal.

### The website analytics plan: 8 steps to success

| # | Step | Type | Key idea |
|---|---|---|---|
| 1 | Business model know-how | Business | Internal processes: which tools, who is responsible for data, how data flows. |
| 2 | Know the business | Business | **Internally** (culture, politics, allies, experts, blockers — e.g. a Business Model Canvas) and **externally** (clients, target, competitors, stakeholders, SWOT). |
| 3 | Goals | Business | Goals follow the **SMART** rule. Business goals → website goals → measurable **micro-goals**. |
| 4 | Metrics and KPIs | Business | A **KPI** is a metric that tells us whether the website's objectives are being met; each area needs its own KPIs. |
| 5 | Tools | Technical | Choose the tools to measure it (GA4, plus GTM for what GA4 can't measure directly). |
| 6 | Reporting | Technical | List of metrics, conversions and KPIs that shows the business evolution and drives decisions. Automate it as far as possible; think about the report's audience. |
| 7 | Optimisation | Business | Act on the decisions — having reports and not acting on them is common (and pointless). |
| 8 | Learning | Business | Actions lead to new needs and goals: start the process again. |

### Metrics, KPIs and conversions

- **Metrics:** relevant business data that leads to decisions. Two types: **quantitative metrics** (sessions, page views, users, clicks, purchases) and **qualitative metrics**, as the slide calls them (average time, bounce %, conversion %, % sessions with site search, average order amount).
- **Conversion:** a user action with a positive impact on company goals (purchase, registration, PDF download).
- **Micro-conversion:** an action that brings the user closer to the main conversion (registering in a checkout, requesting a quote).
- Example: business goal "increase revenue" → website goal "online purchases" → micro-goals (users see products, use search, add to cart, purchase) → KPIs (product page views, "search" clicks, number of carts, number of purchases).

### Reporting example

| Goal | Measurement | KPI | Report | In charge | Action |
|---|---|---|---|---|---|
| User registration | Visits to "Register" URL | % register conversion | Weekly | Online marketing manager | New campaign |
| Sales | E-commerce GA tag | Purchase rate | Daily | Product manager | Review funnel |
| PDF download | E-commerce GA tag | Goal conversion rate | Weekly | Sales manager | A/B test download button |
| Customer satisfaction | NPS | Satisfaction % | Weekly | Customer manager | New services / improvements |

### AI as your sparring partner

1. Build the plan (yourself or with the session's GPT). 2. Ask AI to **critique** it — not redo it — to find weak spots (KPIs GA4 can't measure, goals not linked to the business, **vanity metrics**). 3. **You decide:** only accept changes you can justify. *AI reviews your plan; it doesn't write it for you.*

### New KPI: AI visibility

- **SEO:** do I show up in Google's results? **GEO (Generative Engine Optimisation):** do ChatGPT, Gemini or Perplexity recommend me for my category?
- Measure it with: **mentions** (brand appears in answers), **citations** (they link to our site as a source), **traffic** (AI Assistant channel in GA4), **share of voice** (% of answers where we appear vs competitors).

## 04 · Google Analytics introduction

- **GA4:** a data collection and analytics tool that measures website or app users' behaviour through customisable reports. The only analytics tool available for free accounts within Google's environment; combines data from all online sources.
- **Google Tag Manager (GTM):** most KPIs can be measured in GA4 directly, but some relevant information needs GTM.
- **Main characteristics of GA4:** based on interactions (**events**), depends on **cookies**, **cross-device and cross-platform**.

### Events

*"An event is a unique action that occurs at a specific time and is associated with a user"* (page views, product clicks, add to cart…).

| Type | Description | Examples |
|---|---|---|
| Automatically collected | Registered by GA4 itself | first_open, first_visit, session_start |
| Recommended | Predefined by Google, with a prescribed name and parameters | view_search_results |
| Custom (personalised) | Defined by us: name and parameters | — |

### Parameters

- An **event** is a counter: **how many times** does something happen? (How many internal searches? → `view_search_results`.)
- A **parameter** adds information about the event to answer more specific questions. (What do people search for? → `view_search_results` + `search_term`.)

### Designing events with AI

Measurement plan (goals, micro-goals, KPIs) → prompt the AI for GA4 events and parameters → an event table ready to validate:

| Event | Parameters | KPI it feeds |
|---|---|---|
| add_to_cart | item_id, item_name, value | Products added to cart |
| view_search_results | search_term | On-site searches |
| generate_lead | form_name | Sign-ups / leads |
| purchase | transaction_id, value, currency | Revenue and average order value |

**Always validate:** use GA4's recommended events first and check every event in **DebugView** before publishing.

Practice account: the **Google Merch Shop** GA4 demo account.
