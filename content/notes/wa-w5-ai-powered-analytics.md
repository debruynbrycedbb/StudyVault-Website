# AI-powered Website Analytics

**Lecturer:** Enric Garcia · **Course:** Web Analytics · MX013

Scenario: we are digital analysts at the **Google Merch Shop**. Executives want to know which parts of the website (or outside it) to improve for a better experience, and whether traffic and engagement are improving.

Agenda: 01 Quick reminder · 02 How does GA4 work? · 03 GA4 installation · 04 Analysis in Google Analytics · 05 AI-powered analysis.

## 01 · Quick reminder

- Website analytics tracks and measures the relevant data on users' behaviour on our website.
- Analysing lets us make the best possible decision and measure how the solution improves the issue ("Without data, you're just another person with an opinion").
- Data availability isn't the problem; **processing** it is the job. With experience, data becomes wisdom.
- The analytics plan's 8 steps: business model know-how, know the business, goals, metrics and KPIs, tools, reporting, optimisation, learning.
- **GA4:** free data collection and analytics tool with customisable reports; **based on events, depends on cookies, cross-device and cross-platform.**

## 02 · How does Google Analytics 4 work?

**Data acquisition:**

1. The user lets us get data by **accepting cookies**.
2. A **JavaScript layer** collects data on our website.
3. We collect the data in GA4 directly, or via queries and scripts.
4. We analyse and plot the data in GA4.

This process can be done through **Google Tag Manager (GTM)**.

**Extra rules:**

- Analytics requires **cookies and JavaScript** to work.
- Data **isn't exact — it's an approximation**.
- If cookies are rejected, that traffic is **not counted**.
- By default it measures **browsers, not people**.

**Cookies** are pieces of text that identify **unique browsers, not unique users**. If the same person arrives from several devices/accounts, GA4 can be configured to identify them as one user.

| Cookie | Used for |
|---|---|
| 1st-party | User experience on the website |
| 3rd-party | Analytics, retargeting and marketing |

## 03 · GA4 installation

- How it connects: device → browser → network → server, each making a request and returning a response.
- Install GA4 **directly or through GTM** — the lecturer recommends **GTM**.

### Google Tag Manager

- A **tag management tool** that lets us configure measurement **without going through IT**, especially for difficult measurement.
- What it can measure: user interactions (page views, events, transactions), **attribution pixels** (Ads, Facebook, Twitter…), and other tools (Hotjar, Crazy Egg, A/B testing…).
- Its **6 fundamental elements:** accounts, containers, tags, triggers, variables, data layers.

## 04 · Analysis in Google Analytics

### Report structure

- **Date range:** every chart is filtered by an adjustable date range; you can **compare** date ranges.
- **Comparisons:** every metric and KPI needs **context** to be understood; comparisons add it.
- **Filters:** every table has a search bar and extra filters.

### Main reports

| Report | Shows |
|---|---|
| Reports snapshot | Summary of users, demographics, behaviour and technology |
| Realtime overview / pages | Activity in the **last 30 minutes** |
| Acquisition: overview, user acquisition, traffic acquisition, user acquisition cohorts | Where users come from |
| Engagement: overview, events, pages and screens, landing page | What users do |
| Monetisation: overview, e-commerce purchases, purchase journey, checkout journey, promotions, transactions | Sales and revenue |
| Retention | Whether users come back |
| Search Console: queries, Google organic search traffic | Organic search performance (linked GSC) |
| User attributes: overview, demographic details, audiences | Who the users are |
| Tech: overview, details | Devices, browsers, platforms |

### Events and parameters

- An **event** is a differentiated action at a specific time associated with a user. Types: **automatically collected** (first_open, first_visit, session_start), **recommended** (predefined name and parameters), **custom** (our own name and parameters).
- An **event** answers "how many times does something happen?"; a **parameter** expands it to answer more specific questions (`view_search_results` + `search_term`).
- Game example: the same parameters (player_name, player_status, stage, world, lives) travel with different events (level_start, jump, change_status, throw_fire); a parameter's value changes as the state changes (status normal → hyped).

### Attribution models in GA4

Customer journey example: sees a YouTube ad (1 week before) → sees an Instagram post and clicks (2 days) → clicks a Google display ad (1 day) → searches the company name and buys.

| Model | Credit |
|---|---|
| **Last click** | 100% to the last touchpoint (the brand search). |
| **Last click on Google paid channels** | 100% to the last Google paid touchpoint (the display ad). |
| **Data-driven** | Credit split across touchpoints according to their measured contribution. |

### Explore

An **Explore** analysis has one or more tabs, each using an analysis technique:

| Technique | Use |
|---|---|
| Blank | Uses tables to display the data |
| Conversion funnel exploration | The journey users have taken through the website or app |
| Path exploration | User journeys as a tree chart |
| Segment overlay | Venn diagrams of how user segments relate to each other |
| User explorer | The users in the segments you create or import, broken down by each user's actions |
| Cohort exploration | Behaviour of groups over time |
| User lifetime | Listed in the slides (not described) |

Explore layout: **configuration area** (variables: dates, segments, dimensions, metrics; settings: technique, visualisation, segments, rows, columns, values, filters) and **visualisation area**. Rows and columns take **dimensions**; values take **metrics**.

## 05 · AI-powered analysis

### Analytics Advisor: ask GA4

- A **conversational assistant powered by Gemini inside GA4**, free in standard properties.
- Answers in natural language, **spots anomalies** and **summarises performance** ("Why did purchases drop last week?", "Which channel brings the users with the highest revenue?").
- Availability depends on language and property (check the property language is English).

### Insights and alerts: let GA4 watch for you

- **Automated insights:** GA4 spots unusual changes and summarises them.
- **Custom alerts:** you set the condition and GA4 emails you when it's met. Four steps: pick the metric (e.g. key events) → set the condition (e.g. drops more than 20% vs previous week) → choose the frequency (daily or weekly) → add recipients.
- The shift: **from checking reports to letting the data warn us.**

### AI makes mistakes too: verify

Treat every AI answer as **a junior analyst's first draft**. Before trusting a number:

1. Compare it with the **standard report**.
2. Check the **date range and filters** it applied.
3. Ask **how it was calculated** (which metric and dimension).
4. Be wary of causes: **AI finds correlations; it doesn't always explain why.**

Exercise: ask Analytics Advisor a question and validate the answer in Reports or Explore.
