# SEO II — Ranking factors, algorithm updates, information architecture and content

**Lecturer:** Jose Comerma · **Course:** Digital Marketing and Advertising · MX002 · Slides: Search Engine Optimisation 2

Previous session: introduction to SEO, how page ranking works, on-page elements, keyword research tools and methodology.
Today: **1** SERP ranking factors · **2** Google algorithm and updates · **3** Information architecture · **4** Content.

## 1. Ranking factors

Once Google's bots have crawled and indexed a page for a keyword, Google ranks it. **The ranking is not permanent.** A page fluctuates because of:

1. **Re-indexing of changes:** changes to the page content or site (on-site), or more social references and/or links (off-site).
2. **Changes in competitors** (the same things on their sites).
3. **Changes in search engine algorithms.**

**Moz ranking factors study** — two approaches: (1) analytic: a dataset of 22 categories with 17,600 queries from the Google Ads tool, analysing the first 50 results for patterns and correlations; (2) a survey of 150+ leading SEOs. Semrush and Ahrefs publish ranking-factor studies too.

| Factor | Key points |
|---|---|
| **Backlinks** (relevant links from other sites) | Not all backlinks are equal; nobody knows the perfect backlink. Google suggests building backlinks from prominent websites on the subject. |
| **Relevance and fit (RankBrain)** | Google's system for understanding what searchers want. Understand the search intent of a keyword to rank. Example: "air fryer" returns informational results (people still researching) → use it in a **blog post**, not an e-commerce product page. |
| **Content freshness** | Depends on the topic. If freshness matters for the keyword, update the page often or publish new posts. Example: "best restaurants in Barcelona 202X". |
| **HTTPS** | The SSL/TLS certificate is an extremely important ranking factor; it improves user security. |
| **Mobile-friendliness** | A ranking factor since **2015**. In **2019** Google moved to a mobile-first index, which also became a ranking factor for desktop searches. |
| **Page experience / Core Web Vitals** | Real-world user experience metrics: **LCP** (Largest Contentful Paint) = loading performance; **INP** (Interaction to Next Paint) = interactivity; **CLS** (Cumulative Layout Shift) = visual stability. |
| **Intrusive interstitials** | Overlays (usually pop-ups) that block the content for promotion. Poor UX; Google penalises sites that overuse them. |

**Current top factors (Search Engine Journal):** 1. High-quality content · 2. Page experience · 3. Links. New factors appear every year (e.g. Mobile-First Index), but the basis is still **quality content, which helps earn links**.

## 2. Google's algorithm and updates

Google updates its algorithms constantly to give the most relevant results. Three focus areas:

1. Cleaning irrelevant results and spammy links out of the SERP (value to the user, avoiding **pogo-sticking**).
2. Adapting to user needs and the current landscape (e.g. mobile browsing).
3. Getting closer to a **semantic search engine** (AI).

| Update | Year | What it targets |
|---|---|---|
| **Panda** | 2011 | Black-hat SEO and web spam: low-quality content, duplicate content, malware. |
| **Penguin** | — | Links and content that don't look natural: too many **reciprocal links**; excessive **keyword-rich anchor text**; **over-optimised** content (keyword stuffing); **buying links / link schemes**. Google spots unnatural link growth (e.g. a competitor building links to harm you). |
| **Mobile-First Index** | Launched Oct 2017, fully rolled out 2021 | Google now indexes the mobile version. Rewards good mobile experience; content that differs between mobile and desktop can hurt rankings. |
| **BERT** | — | One of Google's most important updates. NLP-based: understands the **intent and context** behind queries (15% of queries are new). Individual words matter less, search intent more → write for users, not the algorithm. |
| **Helpful Content Update (HCU)** | Oct 2023 (as stated in class) | Prioritises content made **for people, not algorithms**: based on your own expertise, unique and authentic, valuable. |

**Natural link profile (Penguin):** about **70%** of backlinks use the brand name or non-descriptive anchor text; the rest are exact-match or phrase-match.

### BERT consequences: YMYL and E-E-A-T

- **YMYL — Your Money or Your Life:** health, financial, legal, safety information, and content that can influence users' lives. Held to a higher standard.
- **E-E-A-T — Experience, Expertise, Authority, Trustworthiness:**
  - Experience: provide an excellent user experience
  - Expertise: demonstrate knowledge of the topic
  - Authority: earned through links, mentions…
  - Trustworthiness: built through reputation, CV, guests…

## 3. Information architecture

### What we don't want Google to see

Some pages are better left unindexed: **sites in development, private areas, duplicate content**. Three ways to tell Google:

| Method | How it works |
|---|---|
| **noindex** tag (HTML) | Pages with it won't appear in Google's index; can also de-index pages already indexed. |
| **robots.txt** | A file in the **root of the domain** telling bots which pages/files not to crawl. Upload via FTP or an SEO plugin (Rank Math, Yoast). Can block specific bots (e.g. Google's image bot). Example: salleurl.edu/robots.txt |
| **Canonical** tag | Tells Google which version of similar content to prioritise. |

### Sitemap

- A file giving crawlers information about the site's pages, videos, images and how they relate; helps crawlers discover URLs.
- In WordPress, plugins create `sitemap.xml` and usually add new pages automatically: **Yoast SEO**, **Rank Math**, **Google XML Sitemaps**.
- Having a sitemap doesn't mean Google knows about it: **submit the sitemap URL in Google Search Console** so it's crawled more often.

### Good website structure

- Helps users navigate and helps search engines crawl. Google also uses **human raters**.
- Well-structured sites are more likely to attract links from relevant sites.
- Good practice: **the fewer clicks the better**, **fewer than 100 links per page**, **logical, semantic links**. (Filing-cabinet analogy, *The Art of SEO*.)

### 301 redirects

A 301 tells search engines content has **moved permanently** and transfers the old page's visibility and authority (**link equity**) to the new URL. When changing domain or URL structure, a 301 is the only way to transfer rankings and authority.

### Canonical pages

Google dislikes duplicate content (common in e-commerce and blog "tags"). The **canonical URL** is the "master" version of a set of duplicate or near-duplicate pages — the one indexed and shown in results. Class question: similar URLs with the same information except for different localised keywords — is that a good strategy?

### Flat vs deep architecture

- **Crawl depth / click depth:** how many clicks it takes to reach a page. Pages with large crawl depth are seen as less relevant.
- A **flat** structure is the recommended best practice.
- Link internally **vertically, horizontally and diagonally**: breadcrumbs, related products, interesting articles, most purchased, new arrivals, other categories…

### Rich snippets (structured data)

- **Schema markup** added to a page's code (schema.org). In the SERP it shows users what they'll find and improves UX; it also helps search engines understand the content.
- Types: review, recipe, music, product, movie, event, author, organisation…
- Formats: **JSON-LD (recommended by Google)**, Microdata, RDFa.
- Tools: Google's Structured Data Markup Helper; test with the **Rich Results Test** (search.google.com/test/rich-results). Paste the code in the `<head>` or just before the footer (to avoid Core Web Vitals load delay).

### Halo effect

A cognitive bias that search engines also show: when a site ranks for many **long-tail keywords with the same root**, it becomes easier to rank for the more competitive **short-head** keyword with that root, or synonyms.

### On-page keyword targeting

**Golden rule: 1 keyword → 1 landing page** (along with its synonyms). Understand "keyword" as **search intent**.

Place the main keyword in: (a) page title, (b) H1, (c) Hx, (d) body text, (e) URL, (f) images — file name and `alt` attribute, (g) meta description. Further reading: Moz, *A Visual Guide to Keyword Targeting*.

## 4. Content

- **Content is the most important element for SEO.** Uniqueness, value and authenticity are key.
- Natural backlinks and social virality are the **result** of high-quality content.
- Consistent quality content lets us: avoid duplicate content; get more keyword diversity (long-tail and semantic terms); generate more backlinks; drive more interaction on the site and social media.
- Matt Cutts (former Google) stressed quality content; with the Helpful Content Update, user-centric content is the key.
- Content marketing maps to the **Consumer Decision Journey** (McKinsey) connection moments: need → information → selection → decision → action → experience → use → recommendation → buybacks.

## Tasks

1. Develop the most appropriate **information architecture for a website selling sleeping bags**, with SEO and usability in mind.
2. Detail the necessary conditions for proper search engine indexing in a **new web project with a domain migration**.
