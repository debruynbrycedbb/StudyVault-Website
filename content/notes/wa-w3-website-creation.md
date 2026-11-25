# Website Creation: Traditional vs AI (theory)

**Lecturer:** Prof. Arturo Martínez · **Course:** Web Analytics · MX013 · Session 3 (theoretical part)

Contents: 01 Web basics · 02 Types of website · 03 The investment · 04 The players · 05 The strategy · 06 Building a website · 07 Publishing a website · 08 Maintenance with workflows and AI · 09 The future of websites.

## 01 · Web basics

> A website is the set of one or more web pages published under a common domain name, served from a web server. (Wikipedia)

| Language | Role |
|---|---|
| **HTML** | The skeleton: structure and content with tags (headings, paragraphs, images, links). |
| **CSS** | The style: how it looks (colours, sizes, fonts, margins, layouts). |
| **JavaScript (JS)** | The brain in the browser: behaviour and interaction. |

- HTML, CSS and JS don't have to be three separate files: all in one, two files, or three, and they can be mixed.
- Today a site is more than HTML/CSS/JS. The browser still receives those, but behind them there are **frameworks** (React, Next.js, Vue), a **server/backend** (Node.js, Python, Java, PHP) and a **database** (PostgreSQL, MySQL, DynamoDB). Examples from the slides: ChatGPT runs on PostgreSQL on Azure; Amazon uses Java in thousands of services; Netflix uses React + Node.js; Instagram uses Python with Django.
- The lecturer's own projects (aipopdisplays.com, bellto.ai) use Next.js + React in TypeScript, Node.js on Vercel, Supabase (PostgreSQL), Gemini/OpenAI and Stripe.

### How a website works

1. You type a URL.
2. The browser sends a **request** to the server using **HTTP(S)**.
3. The server answers with **files** (HTML, CSS, JS, images, fonts).
4. The browser draws the page on screen.

The **W3C** defines the technical standards websites are built on.

## 02 · Types of website

The right type depends on what the project needs (goal, strategy, resources) and the experience it wants to offer.

| Type | Main goal | Example stack | SEO-friendly | Complexity |
|---|---|---|---|---|
| Landing page | Immediate conversion | Framer / Webflow | High (if light) | Low |
| Corporate website | Branding / corporate presence | WordPress / Wix | High | Medium |
| Blog or magazine | Content and rankings | Ghost / WordPress | Very high | Medium |
| E-commerce | Direct sales | Shopify / WooCommerce | Medium | High |
| Web app / PWA | App-like interaction | React / Next.js / Vue | Low | High |
| Microsite / campaign | One-off action / promotion | Webflow / static HTML | Medium | Low |
| Portfolio / personal site | Showing work or a profile | Cargo / Notion / Webflow | Medium | Low |
| Platform / SaaS | Offering a service online | Next.js / Django / Node | Low | Very high |
| Portal / intranet | Private access / internal tools | Drupal / Liferay / Odoo | Low | High |

## 03 · The investment

Budget for a company's corporate website (Home, About, Services/Products, Portfolio, Blog, Contact, Legal; +1 language, domain and hosting, basic SEO, maybe CRM):

| Item | Traditional model | Current model (builder + AI) |
|---|---|---|
| Initial concept | Marketing/communication – €1,500 | Templates + AI prompts → €0–200 |
| Copywriting | Copywriter – €1,500 | ChatGPT / Jasper / Notion AI → €0–50 |
| Translation | Translator – €1,000 | DeepL / GPT → €0–30 |
| Visual content | Photographer/designer – €1,500 | Stock + AI (Midjourney, Canva) → €0–50 |
| Design and wireframes | Web designer – €2,000 | Visual builder (Wix, Framer, Webflow) → included |
| Development | Developer – €3,000 | No-code / AI (T2W, I2W, Cursor) → €0–200 |
| Testing and optimisation | QA – €1,000 | Automated tests, prompts → €0–50 |
| Domain and hosting | Sysadmin – €500 | Built-in → about €100/year |
| **Total** | **≈ €12,000 / 4 months** | **≈ builder subscription + €50–400; days to months** |

Cases in the slides: landonorris.com (agency Off Brand: branding, Webflow, WebGL, 3D, Rive motion — a six-figure budget); **Euromon PLV** on Wix (≈ €158.49/year + staff time, 160 initial hours + 3 h/week) with a minimum viable SEO strategy: **ROI ≈ €69 for every €1** in the first year; another project that ended up costing almost €300,000.

## 04 · The players

**Tech team roles** (they vary with project size; with fewer resources roles merge; in Agile there is also a Product Owner):

| Role | Does |
|---|---|
| UI/UX designer | User experience and interface: structure, usability, navigation flow. |
| Web designer / layout developer | Turns the visual design into HTML and CSS; owns layout and responsiveness. |
| Frontend developer | The visible part users interact with; client-side logic in HTML, CSS, JS. |
| Backend developer | Server logic, databases, API integrations, authentication, data processing. |
| Database administrator (DBA) | In large projects, runs and optimises the databases. |
| QA / tester | Tests for errors, bugs and usability problems before launch. |
| Cloud architect / DevOps | Infrastructure and deployment: stability, scalability, performance. |
| Business analyst / project manager | Goals, team coordination, deadlines, resources; links client and tech team. |
| SEO consultant / digital marketing specialist | Search optimisation and visibility/traffic strategy. |

**Players in the ecosystem:** client/company, end users, external suppliers, agency or digital partner, community and social media, regulators/regulations.

## 05 · The strategy

There is **no one-size-fits-all web strategy, only one that fits the business model.** Four questions:

- **Purpose:** service, product, information or data?
- **Website goals:** what should visitors do? Inform, sell, offer a service?
- **Target audience:** demographics, purchasing power, tastes, education.
- **Content:** what information they look for, and on which device.

*AI tip: answer with your team first, then ask an AI the same questions to find angles you missed.*

| Business | Goal | Web strategy | Website |
|---|---|---|---|
| Local business (café in Barcelona) | Neighbourhood customers and nearby tourists | Local SEO, optimised Google Maps listing, reviews, hours, photos | Simple landing page: menu, location, quick contact |
| E-commerce (sustainable fashion) | Turn visits into sales, build loyalty | SEO by category, email, lifestyle content, influencers, reviews, loyalty points | Optimised store, clear checkout, user segmentation |
| International B2B (tech consultancy) | Qualified leads in key markets | International SEO, multilingual blog, white papers, CRM, LinkedIn Ads | Professional, authoritative content, trust signals |

## 06 · Building a website

Three phases: **structure and planning → design and content → development and technical setup.**

### Structure and planning

- **Usability** = how easy a product is to use. Maximise it: a good structure reduces frustration and increases conversions.
- **1. Navigation tree / sitemap:** which pages exist and how they connect; matters a lot for SEO. (AI can then generate the XML sitemap.)
- **2. Wireframes:** sketches of each page's basic structure before design = **low-fidelity design**.

### Design and development

- **Design:** visual design, SEO-friendly copywriting, optimised images and media, mobile and accessibility.
- **Development:** choosing the platform; basic integrations (forms/CRM, chat, newsletter, e-commerce, analytics and cookies); technical optimisation (speed, metadata, compression, SSL).

### 10 keys to good design

1. Clarity first · 2. Visual hierarchy · 3. Consistency · 4. Simple navigation · 5. Speed and performance · 6. Responsive design · 7. Accessibility · 8. Visual feedback · 9. Readable content · 10. User testing ("UX isn't guessed, it's validated").

**Professional rules:** F- and Z-pattern reading; spacing in **multiples of 8 px**; **two typefaces at most**; main **CTA visible without scrolling**; above all, **responsive and mobile-first**.

### Development methods

| Method | What it is | Best for (with AI) |
|---|---|---|
| **Code** | By hand or with frameworks (React, Next.js) | Code + AI → complex web apps, custom portals, dashboards, digital products |
| **CMS** (Content Management System) | WordPress, Drupal: templates + plugins | CMS + AI → content sites with editorial workflow, several languages, blog, catalogues |
| **Visual builders** | Webflow, Wix: drag and drop, fast for marketing, limited customisation | Builders + AI → local businesses, simple corporate sites, portfolios, landing pages, campaign microsites |
| **AI-First** | Structure, design and development from a single prompt: **T2W** (text to website), **F2W** (Figma to website), **I2W** (image to website) | Micro-campaigns, landing-page A/B tests, validating ideas, MVPs |

- **2025 conclusion:** AI website builders are not here to replace the other methods; AI significantly boosts every method.
- **2026 conclusion:** you can now build professional sites where 99–100% is done by AI, **but** it's better done by an experienced developer who can guide the AI and understands the code and architecture.

## 07 · Publishing a website

| Step | Meaning |
|---|---|
| **1. Domain** | The web address users type (e.g. www.yourbrand.com). |
| **2. Hosting** | The service that stores the site's files and makes them available online. |
| **3. Deploy** | Putting the site online so anyone can see it. |
| **4. Measurement** | Tracking results with analytics tools (visits, clicks, conversions). |

Some AI builders (e.g. v0.app) do all four in a couple of clicks.

### Domain

- Relevant, short and easy to remember, with the right extension (.com = most standard internationally; country extensions for local markets, e.g. .fr, .es).
- **Brand** domain (reebok.com), **keyword** domain (VuelosBaratos.com) or **combined** (PuroMarketing.com).
- Length: **under 8 characters is ideal** (average 11–12).
- Avoid: letters hard to spell out, special characters like ñ, **hyphens**, doubled letters, **numbers**, confusion with existing domains.
- **Registering:** you pay a **registrar** (Ionos, Namecheap, GoDaddy…), which acts as a go-between with **ICANN** (global) or a national body (.es → Red.es). You buy the **right to use the name for a period** (usually a year) — forget to renew and someone else can buy it (google.com was once bought for $12 in 2015 and bought back for $6,006.13).

### Hosting

Besides storing files, hosts often offer: company email, domain registration/DNS, **SSL certificates (HTTPS)**, automatic backups, security and DDoS protection, FTP/cPanel access, basic traffic stats.

### Deploy

- Upload the files to the server or connect the CMS/builder to the domain.
- By hand (FTP, GitHub, own server) or automatically (Wix, Webflow, WordPress).
- Usually includes setting up DNS, turning on HTTPS and checking everything works.
- **Every update to content or code is a new deploy.**

### Measurement

Goal: understand how users arrive, browse and interact, to know whether the site is doing its job (what works, what to improve).

| Tool | Measures |
|---|---|
| Google Analytics (GA4) | Visits, traffic sources, behaviour |
| Google Search Console | SEO performance, keywords, indexing |
| Hotjar | Heatmaps and session recordings |

## 08 · Maintenance with workflows and AI

- An AI automation (interface built in v0.app, connected to **Make.com**) creates blog content for Euromon PLV.
- **Claude routines:** a routine is a **prompt with a schedule** that runs on its own with access to the site's code, the internet and given tools: takes the next approved topic → researches primary sources → writes → checks → publishes or opens a PR → pings search engines (IndexNow) and reports.
- Good practice shown in the prompts: one task per run; never invent a topic; no claims from memory without sources; check the post adds value beyond what an AI could give; human review via Pull Request before going live (Euromon); budget caps for AI images and dropping renders that alter the brand.

## 09 · The future of websites

- **Ads in ChatGPT** are a reality (labelled and kept apart from answers; only on Free and Go plans; in the US since Feb 2026, in 31 European countries incl. Spain since late August).
- **Websites that adapt to each user:** today the same site for everyone; next, AI builds the page for each visitor (Google's "Generative UI" in Gemini and AI Mode).
- **Agents that browse and buy for you:** ChatGPT's own browser; buying in Google AI Mode with Google Pay without opening the store's site. **Design your site for people and for agents.**
- The web will stop being just "pages": a living product, different for each person, and ready for agents.
