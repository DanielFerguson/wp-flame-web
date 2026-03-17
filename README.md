# WP Flame — Marketing Site

Astro-based single-page marketing site with campaign-specific landing pages for Google Ads and Facebook/Instagram campaigns.

## Quick start

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # Static output in dist/
```

## Site structure

```
src/
├── layouts/
│   ├── Base.astro          # Shared HTML shell (meta, fonts, OG tags)
│   └── Campaign.astro      # Campaign page layout (noindex, tracking data attrs, conversion-focused styles)
├── components/
│   ├── Nav.astro           # Sticky nav with configurable CTA text
│   ├── Footer.astro        # Site footer
│   ├── FlameDemo.astro     # Interactive flame graph with variant data (default/woocommerce/elementor/agency)
│   ├── AiInsight.astro     # AI recommendation card (severity, title, body, action)
│   └── Pricing.astro       # 4-tier pricing grid with configurable highlight
├── pages/
│   ├── index.astro         # Main homepage
│   └── campaigns/
│       ├── woocommerce-speed.astro    # WooCommerce + Google Ads
│       ├── slow-store.astro           # WooCommerce + Facebook
│       ├── agency-performance.astro   # Agency + Google Ads
│       ├── client-reporting.astro     # Agency + Facebook
│       ├── elementor-slow.astro       # Page builder + Google Ads
│       └── page-builder-bloat.astro   # Page builder + Facebook
└── styles/
    └── global.css          # Brand tokens, reset, shared utilities
```

## URL map

| URL | Audience | Source | UTM Campaign |
|-----|----------|--------|-------------|
| `/` | General | Organic / direct | — |
| `/campaigns/woocommerce-speed/` | WooCommerce store owners | Google Ads | `woo-google` |
| `/campaigns/slow-store/` | WooCommerce store owners | Facebook/Instagram | `woo-facebook` |
| `/campaigns/agency-performance/` | WordPress agencies | Google Ads | `agency-google` |
| `/campaigns/client-reporting/` | WordPress agencies | Facebook/Instagram | `agency-facebook` |
| `/campaigns/elementor-slow/` | Page builder users | Google Ads | `elementor-google` |
| `/campaigns/page-builder-bloat/` | Page builder users | Facebook/Instagram | `pagebuilder-facebook` |

All campaign pages are `noindex` by default to avoid cannibalising the homepage.

## Campaign strategy

### Google Ads pages (search intent)

These pages target people actively searching for solutions. The copy matches search keywords directly:

- **WooCommerce**: "why is my woocommerce store slow" → H1 matches the query, flame graph demo uses WooCommerce-specific data, pain points cite revenue impact stats
- **Agency**: "wordpress performance reporting" → H1 addresses the reporting need, demo uses multi-plugin agency data, value props focus on client communication
- **Elementor**: "why is elementor slow" → H1 matches query exactly, demo shows Elementor-specific spans, includes visual timeline breakdown of Elementor operations

Structure: Hero with keyword-matching H1 → live flame graph demo → audience-specific pain points → pricing (with relevant tier highlighted) → CTA

### Facebook/Instagram pages (pattern interrupt)

These pages stop the scroll with a specific, surprising claim and build urgency:

- **WooCommerce**: "Your WooCommerce store loads in 1.2 seconds. Here's what's eating them." → Opens with revenue loss stats, emotional urgency
- **Agency**: "Your client's site is slow. Can you show them exactly why?" → Before/after story grid, frames the tool as a sales aid
- **Elementor**: "Your page builder is loading 847KB of JSON on every page." → Visual bar chart of bloat, visceral data presentation

Structure: Pattern-interrupt H1 → emotional/visual proof section → flame graph demo → simple value prop → CTA

### Key differences by source

| | Google Ads | Facebook |
|---|---|---|
| H1 | Matches search query | Pattern interrupt / surprising claim |
| CTA primary | "Install free" (direct action) | "See a live flame graph" (soft engagement) |
| Page length | Longer — includes pricing, comparison | Shorter — one story, one CTA |
| Tone | Informational, solution-focused | Emotional, urgency-focused |
| noindex | Yes | Yes |

## Component architecture

### FlameDemo

The `FlameDemo` component accepts a `variant` prop that configures the demo data:

- `default` — generic WordPress site (847ms, 47 queries)
- `woocommerce` — WooCommerce product page (1240ms, 83 queries, Stripe/payment spans)
- `elementor` — Elementor landing page (962ms, heavy CSS/JSON spans)
- `agency` — Multi-plugin client site (1480ms, WPML/ACF/WooCommerce/Elementor combined)

Each variant renders a different flame graph with audience-specific span data. The AI insights panel is populated via the `insights` slot using `AiInsight` components.

### Pricing

The `Pricing` component accepts a `highlight` prop (`spark` | `pro` | `agency`) to control which tier gets the "Most popular" badge. Campaign pages highlight the tier most relevant to their audience:

- WooCommerce → `spark` (single site, $29)
- Agency → `agency` ($199, unlimited sites)
- Elementor → `spark` (single site, $29)

## Ad copy suggestions

### Google Ads

**WooCommerce campaign:**
```
Headline: Why Is WooCommerce Slow? See the Answer Free
Description: Install WP Flame. Load any product page. See a visual flame graph
showing exactly which plugins and queries are costing you load time. Free.
URL: wpflame.com/campaigns/woocommerce-speed/?utm_source=google&utm_medium=cpc&utm_campaign=woo-google
Keywords: woocommerce slow, woocommerce performance, woocommerce speed, slow woocommerce store
```

**Agency campaign:**
```
Headline: WordPress Performance Reports for Agencies
Description: Show clients exactly why their site is slow with interactive flame
graphs. AI generates fix recommendations. Free APM, agency plans from $199/mo.
URL: wpflame.com/campaigns/agency-performance/?utm_source=google&utm_medium=cpc&utm_campaign=agency-google
Keywords: wordpress performance audit, wordpress speed report, agency wordpress performance
```

**Elementor campaign:**
```
Headline: Why Is Elementor Slow? Free Visual Breakdown
Description: See exactly what Elementor does during page load — JSON parsing, CSS
compilation, widget rendering. Free flame graph shows the full timeline.
URL: wpflame.com/campaigns/elementor-slow/?utm_source=google&utm_medium=cpc&utm_campaign=elementor-google
Keywords: elementor slow, why is elementor slow, elementor performance, elementor speed
```

### Facebook/Instagram

**WooCommerce campaign:**
```
Primary text: Your WooCommerce store takes 1.2 seconds to load. Here's what's eating them.
We ran WP Flame on a real WooCommerce store and found: a payment gateway loading on every page
(not just checkout), 83 database queries for one product page, and a license check that blocks
for 60ms on every request. The free version shows you everything. AI tells you what to fix.
Headline: See Your Store's Flame Graph (Free)
CTA: Learn More → wpflame.com/campaigns/slow-store/?utm_source=facebook&utm_medium=paid&utm_campaign=woo-facebook
```

**Agency campaign:**
```
Primary text: "We think your site needs performance work." vs "Here's a flame graph. These 3
plugins add 400ms. Here's the fix." Which one sells the project? WP Flame turns WordPress
performance into a visual story your clients understand. The APM is free. AI insights and
client reports start at $199/mo for unlimited sites.
Headline: Performance Work That Sells Itself
CTA: Learn More → wpflame.com/campaigns/client-reporting/?utm_source=facebook&utm_medium=paid&utm_campaign=agency-facebook
```

**Page builder campaign:**
```
Primary text: Your page builder is loading 847KB of JSON metadata on every single page view.
That's not a guess — that's what WP Flame found on a real Elementor site. 30 CSS files. 12 JS
files. 540ms of your load time is just the page builder. Most of it is fixable with settings
changes you probably don't know about. Install WP Flame (free) and see what it finds on yours.
Headline: 847KB of JSON. Every Page. Really.
CTA: Learn More → wpflame.com/campaigns/page-builder-bloat/?utm_source=facebook&utm_medium=paid&utm_campaign=pagebuilder-facebook
```

## Deployment

Static site — deploy anywhere:

```bash
npm run build
# Output in dist/ — upload to Netlify, Vercel, Cloudflare Pages, S3, etc.
```

For Vercel:
```bash
npx vercel
```

For Netlify:
```bash
npx netlify deploy --prod --dir=dist
```

## Brand assets

Brand kit (logos, icons, colour palette, typography) is in the separate `wp-flame-brand/` directory.
