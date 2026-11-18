# SEO III — Link building, Google Images, measurement and SEO tools

**Lecturer:** Jose Comerma · **Course:** Digital Marketing and Advertising · MX002 · Slides: Search Engine Optimisation 3

Previous session: ranking factors (Moz, Semrush, Ahrefs, Search Engine Journal); Google algorithm and updates (Panda, Penguin, Helpful Content); information architecture (robots.txt, sitemap.xml, redirects, depth); content.
Today: **1** Link building · **2** Vertical search optimisation: Google Images · **3** Tools: Search Console, Yoast SEO, Screaming Frog (plus measurement).

## 1. Link building

### Backlink analysis

Backlinks are very important for ranking: this is **off-page SEO**. Quality standards:

- **IP variety:** variety of IPs among incoming links.
- **Link source:** if all links come from blogs, the pattern isn't natural. Mix forums, blogs, websites, social…
- **Link variety:** 100 links from one website are worth less than 100 links from different websites.
- **Temporal factors:** Google expects link growth to be consistent and coherent.

Example tool: **Majestic SEO**.

### Link evaluation

- **Context:** the linking page and site must make sense (no point getting a link from a haircut site if you sell translation services).
- **Link quality:** links from low-quality or spammy, unrelated sites hurt you.
- **Link placement:** `<main>` content (most important — the closer to the start the better) > sidebars > footer (least important).

### What search engines value

| Criterion | Meaning |
|---|---|
| Relevance | Links from important sites in the same industry; page context and overall site context are analysed. |
| Authority | A site that receives many links from others in its sector has more authority. |
| Trustworthiness | Measured with **trust rank**: quantity and quality of links received. |
| Spam | How many spammy pages link to you — avoid them. |
| Freshness | Freshness of content and links. |

### Domain Authority (DA)

- **Moz's** score predicting how likely a site is to rank in the SERPs. Range **1–100**; higher = more likely to rank.
- **Not a Google ranking factor** and not used by Google — a helpful metric to analyse a site's potential.
- Created by Moz around 2010; based on linking root domains and total links; machine-learning based, so it fluctuates.
- Use DA to prioritise links (higher DA = more relevant link), but also check **traffic** (will it convert?) and the linking site's own **link quality**.
- Tools: Moz Link Explorer, Domain Authority checker.

### Types of links

| Type | Description |
|---|---|
| Reciprocal links | A links to B and B links to A. Not bad in itself, but overuse hurts. |
| Link scheme / **Private Blog Network (PBN)** | B → A, A → C, C → B. Violates Google's link spam policy — **black-hat SEO**, harms rankings. |
| Link directories | Business profiles on high-quality listing sites — good exposure. |
| Blogroll, footer, body text | Other link placements. |

### Anchor text

- The clickable text that leads to the destination page; anchors "mask" URLs.
- Years ago, lots of keyword-optimised anchors were key — then **Penguin** penalised over-optimised backlinks.
- Backlinks should look natural ("click here", "read more", "+info"), with coherence between keyword, brand name and domain.

### How to get backlinks

| Tactic | How |
|---|---|
| Guest post | Write great articles for relevant sites, linking back. |
| Skyscraper | Improve outdated popular content and tell those who linked to the old version. |
| Resource pages | Get listed on relevant resource pages (no spammy tactics). |
| Broken links | Recreate content behind broken links others point to, then notify the linkers. |
| Image credit | Find sites using your images without a link and ask for one. |
| Journalists | Be a source for journalists. |
| Unlinked mentions | Ask sites that mention your brand to add a link. |
| PR | Get news coverage. |

Competitor backlink tools: **Link Explorer (Moz, incl. Link Intersect)**, **Ahrefs** (backlink audit), **Majestic SEO**, **SE Ranking**, **Semrush**. Use them, but **differentiate rather than imitate** competitors.

### Examples: astonishing products, fake products, newsworthy content

- **"Ugly sneakers" (July 2020):** trend in Nordic countries; scarcity (lower availability → higher price) and **Veblen goods** (demand rises as price rises, due to status). Media buzz generated many backlinks.
- **Ricky.com:** opened a job for a sex-toy tester → **96 top-level backlinks, 43,000 visits, 10,000 emails**.
- **Online casino Canada ("Future gamer")**: awareness campaign on the impact of online gambling → **400 backlinks, 1,000,000 social engagements**, headlines and reference pages, media in **41 countries**.
- **Café Metro St. James, "Pay with a Kiss":** a free coffee for a kiss and a Facebook share ("We don't want your money; we want your kisses"). **1,016 kisses in 2 months, 500,000 YouTube views in 2 weeks, coverage in 29 countries, 140 media outlets, earned media value $2.4M AUD**, full venue for 2 months.

## 2. Vertical search: Google Images

Best practices:

- **File name:** descriptive, with the target keyword (e.g. `nike-red-sneakers.jpg`).
- **Image size:** light — aim for **under 100 KB**; use **.webp** where possible.
- **Alt text:** include the target keyword; descriptive phrase of **no more than 8 words**; consider words like "photo" or "image" (common in image searches).
- Descriptive titles and descriptions; surround images with relevant text; use a sitemap for images; implement schema markup.

## 3. Measurement

Goal: track target keywords' progress, see the impact of content changes, watch competitors. Tools: **Semrush, SE Ranking, Google Search Console**.

**SEO metrics:**

1. Organic traffic
2. Bounce rate
3. Conversions/leads (from organic traffic)
4. Domain Authority
5. Total linking domains
6. Page loading speed
7. Average position: Top 3 / Top 10 / Top 20 / Top 50 / Top 100
8. Click-through rate (CTR) in the SERP
9. Indexation

**Semrush:** covers SEO, PPC, content marketing, social media marketing and competitive research. Features: keyword research, backlink analysis, competitive research, rank tracking, reporting; SEO audits and ranking forecasts.

## 4. Google Search Console (GSC)

Free Google tool to monitor and improve a site's SEO (**if we own it**). Helps with: how Google sees the site, visibility, fixing technical SEO issues, monitoring performance, verifying a site, submitting a sitemap.

**Verification methods:** HTML file upload (root directory) · HTML meta tag on the home page · DNS TXT record · Google Analytics · Google Tag Manager.

| Report | What it shows |
|---|---|
| Performance | Average position, impressions, CTR and clicks by criteria and date range (**max 16 months**), filterable trends. |
| URL Inspection | Whether a URL is in the sitemap, last crawl date, indexing status, canonicals. |
| Pages | How many URLs are indexed / excluded, with reasons (robots.txt, noindex…). |
| Links | Which sites link to you, which pages, and anchor texts; internal links too. |
| Core Web Vitals | Real-world loading speed, interactivity and visual stability. |
| Sitemaps | Where the site's sitemaps are (sitemap URLs); helps Google crawl and index efficiently. |

## 5. Yoast SEO (WordPress)

- Creates sitemaps: **SEO → General → Features → XML Sitemaps** (general link, user sitemap, content types, excluded entries, taxonomies).
- One of the most complete SEO modules for WordPress: titles and tags, permalinks (slug); edit per page or globally by rules.
- **Audits each page's content** against the main keyword defined for it.

## 6. Screaming Frog

An **SEO spider**: crawls websites and gathers each page's meta titles, headers, meta keywords and meta descriptions. Useful for keyword ideas and auditing your own or competitors' sites.
