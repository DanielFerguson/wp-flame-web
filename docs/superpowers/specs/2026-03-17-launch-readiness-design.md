# Round 3: Launch Readiness

## Context

Rounds 1-2 built out campaign pages, homepage parity, SEO infrastructure, and comparison tables. The site is functionally complete but has four launch-blocking gaps: broken social share previews, placeholder CTA links, no mobile navigation, and missing legal pages.

Product is launching within days. Distribution: free plugin via WordPress.org, paid AI tiers via Lemon Squeezy.

## Decisions

- **CTA links centralized** in `src/config/links.ts` — one file to update at launch
- **Mobile nav**: Hamburger icon with slide-down panel (not full-screen overlay)
- **OG image**: Generated from existing brand assets, static PNG at `public/og-default.png`
- **Legal pages**: Minimal placeholders with noindex — real copy added later
- **Deferred to post-launch**: Custom 404, blog, email capture, accessibility audit, analytics

---

## 1. CTA Link Centralization

### Problem

16+ CTA buttons across 7 pages use `href="#"`. At launch, these need real WordPress.org and Lemon Squeezy URLs. Currently they're scattered inline across page files.

### Design

**New file:** `src/config/links.ts`

```ts
export const links = {
  wordpressOrg: '#',    // LAUNCH: WordPress.org plugin URL when listed
  sparkTrial: '#',      // LAUNCH: Lemon Squeezy checkout URL — Spark tier ($29/mo)
  proTrial: '#',        // LAUNCH: Lemon Squeezy checkout URL — Pro tier ($79/mo)
  agencyTrial: '#',     // LAUNCH: Lemon Squeezy checkout URL — Agency tier ($199/mo)
  github: 'https://github.com/flavor/flavor',
};
```

**CTA mapping** (which buttons get which link):

| Link key | Button text patterns | Pages/Components |
|----------|---------------------|------------------|
| `wordpressOrg` | "Install free ↓", "Download from WordPress.org ↓", "Install free" (in final CTAs and mid-sections) | All 7 pages, Footer |
| `sparkTrial` | "Start free trial", "Try AI insights", "Try AI insights free", "Start with Spark" | index, woocommerce-speed, elementor-slow, slow-store, page-builder-bloat, Pricing |
| `proTrial` | "Start with Pro" | Pricing |
| `agencyTrial` | "Start Agency trial", "Try Agency plan", "Start with Agency" | agency-performance, client-reporting, Pricing |
| `github` | "GitHub" | Footer (all pages) |

**Important distinction:** Hero CTAs and mid-page CTAs that use `#download` or `#pricing` are internal page anchors — leave these as-is. Only the final CTA sections and mid-sections that currently use `href="#"` get updated.

**Footer:** Import `links` and use `links.wordpressOrg` and `links.github` instead of hardcoded URLs. Remove the TODO comments.

### Affected files

- `src/config/links.ts` (new)
- `src/pages/index.astro`
- `src/pages/agency-performance.astro`
- `src/pages/woocommerce-speed.astro`
- `src/pages/elementor-slow.astro`
- `src/pages/client-reporting.astro`
- `src/pages/slow-store.astro`
- `src/pages/page-builder-bloat.astro`
- `src/components/Footer.astro`
- `src/components/Pricing.astro`

---

## 2. Mobile Navigation

### Problem

On screens under 900px, Nav.astro hides all links except the CTA button via `display: none`. Visitors on mobile can't reach Features, Pricing, or Compare.

### Design

**Hamburger icon:** A `<button>` with three horizontal lines, displayed only under 900px. Replaces the hidden nav links.

**Slide-down panel:** When hamburger is tapped, a panel slides down below the nav bar with the links stacked vertically. The panel:
- Sits below the fixed nav bar (not overlaid on content)
- Has the same backdrop blur and dark background as the nav
- Links are full-width, stacked, with 1px separator lines
- Includes the CTA button at the bottom of the panel
- Closes when a link is clicked (smooth scroll still works)
- Closes when hamburger is tapped again (toggle)
- Animates with `max-height` transition for smooth open/close

**Hamburger transforms to X** when panel is open using CSS rotation on the middle line.

**Accessibility:** Button has `aria-label="Toggle menu"` and `aria-expanded` attribute toggled by JS.

### Affected files

- `src/components/Nav.astro` (modify)

---

## 3. OG Image

### Problem

`/og-default.png` is referenced in Base.astro's `<meta property="og:image">` but the file doesn't exist. Social shares show broken previews.

### Design

Generate a 1200x630 PNG with:
- Background: `#0E0D12` (carbon-900)
- Flame logo SVG centered, sized ~120px
- "WP Flame" text below logo in DM Sans bold, white
- Tagline "See exactly where your WordPress request spends its time" below in carbon-300
- Subtle radial gradient glow behind the logo (same as hero section)

**Approach:** Create a temporary HTML file styled to 1200x630, use Playwright to screenshot it, save as `public/og-default.png`, delete the HTML file.

### Affected files

- `public/og-default.png` (new — generated asset)

---

## 4. Privacy & Terms Pages

### Problem

Footer links to `/privacy` and `/terms` return 404.

### Design

Two new minimal pages using Base layout with Nav and Footer. Each contains:
- Page title ("Privacy Policy" / "Terms of Service")
- A short paragraph stating the policy is being prepared
- Contact email for questions (placeholder)
- `noindex={true}` — these are placeholders, not for indexing

Import `global.css` for consistent styling. Wrap content in `.container` with `.section` padding.

These pages use Base layout directly (not Campaign layout) since they're informational, not campaign pages.

### Sitemap exclusion

Add `/privacy/` and `/terms/` to the sitemap filter in `astro.config.mjs` alongside the existing campaign page exclusions. Placeholder pages shouldn't appear in the sitemap.

### Affected files

- `src/pages/privacy.astro` (new)
- `src/pages/terms.astro` (new)
- `astro.config.mjs` — add `/privacy/` and `/terms/` to sitemap filter

---

## Files Summary

**New files (4):**
- `src/config/links.ts`
- `public/og-default.png`
- `src/pages/privacy.astro`
- `src/pages/terms.astro`

**Modified files (11):**
- `astro.config.mjs` — add privacy/terms to sitemap filter
- `src/components/Nav.astro` — hamburger menu + slide-down panel
- `src/components/Footer.astro` — import links config, remove TODO comments
- `src/components/Pricing.astro` — import links config, wire 3 paid tier buttons
- `src/pages/index.astro` — import links, wire final CTA
- `src/pages/agency-performance.astro` — import links, wire final CTA
- `src/pages/woocommerce-speed.astro` — import links, wire final CTA
- `src/pages/elementor-slow.astro` — import links, wire final CTA
- `src/pages/client-reporting.astro` — import links, wire final CTA + mid-section
- `src/pages/slow-store.astro` — import links, wire final CTA + mid-section
- `src/pages/page-builder-bloat.astro` — import links, wire final CTA + mid-section

## Verification

1. `bun run build` — all pages compile, no errors
2. Social preview: `public/og-default.png` exists and is 1200x630
3. Mobile nav: at 640px viewport, hamburger visible, panel opens/closes, links work
4. CTAs: grep for inline `href="#"` across all `.astro` files returns zero matches — all CTA links now reference `links.*` config values
5. Footer: no remaining TODO comments, links use imported config values
6. `/privacy` and `/terms` routes render correctly with noindex meta tag
7. Sitemap: `dist/sitemap-0.xml` excludes `/privacy/` and `/terms/` (along with the 3 Facebook campaign pages)
