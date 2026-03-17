# Round 3: Launch Readiness Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 4 launch-blocking gaps: broken social share previews, placeholder CTA links, no mobile navigation, and missing legal pages.

**Architecture:** Create a centralized link config that all pages import for CTA URLs. Add a hamburger menu to the Nav component for mobile. Generate an OG image from brand assets using Playwright screenshot. Create placeholder legal pages and exclude them from the sitemap.

**Tech Stack:** Astro, TypeScript, CSS (no frameworks), Playwright (for OG image generation)

**Spec:** `docs/superpowers/specs/2026-03-17-launch-readiness-design.md`

---

## Chunk 1: Links Config, CTA Wiring, Legal Pages, Sitemap

### Task 1: Create links config

**Files:**
- Create: `src/config/links.ts`

- [ ] **Step 1: Create the config directory and file**

```ts
// src/config/links.ts
export const links = {
  wordpressOrg: '#',    // LAUNCH: WordPress.org plugin URL when listed
  sparkTrial: '#',      // LAUNCH: Lemon Squeezy checkout URL — Spark tier ($29/mo)
  proTrial: '#',        // LAUNCH: Lemon Squeezy checkout URL — Pro tier ($79/mo)
  agencyTrial: '#',     // LAUNCH: Lemon Squeezy checkout URL — Agency tier ($199/mo)
  github: 'https://github.com/flavor/flavor',
};
```

- [ ] **Step 2: Verify build still passes**

Run: `bun run build`
Expected: Build completes successfully (new file doesn't break anything since nothing imports it yet)

---

### Task 2: Wire CTA links across all pages

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/agency-performance.astro`
- Modify: `src/pages/woocommerce-speed.astro`
- Modify: `src/pages/elementor-slow.astro`
- Modify: `src/pages/client-reporting.astro`
- Modify: `src/pages/slow-store.astro`
- Modify: `src/pages/page-builder-bloat.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/Pricing.astro`

**Important:** Only replace `href="#"` on CTA buttons that should point to external URLs. Do NOT change internal anchors like `href="#download"`, `href="#pricing"`, `href="#demo"`.

- [ ] **Step 1: Wire index.astro**

Add import in frontmatter:
```ts
import { links } from '../config/links';
```

In the Final CTA section (`id="download"`), replace the two `href="#"` links:
```html
<!-- BEFORE -->
<a href="#" class="btn-primary">Download from WordPress.org ↓</a>
<a href="#" class="btn-ai">✨ Start free trial</a>

<!-- AFTER -->
<a href={links.wordpressOrg} class="btn-primary">Download from WordPress.org ↓</a>
<a href={links.sparkTrial} class="btn-ai">✨ Start free trial</a>
```

- [ ] **Step 2: Wire agency-performance.astro**

Add import in frontmatter:
```ts
import { links } from '../config/links';
```

In the Final CTA section (`id="download"`), replace:
```html
<!-- BEFORE -->
<a href="#" class="btn-primary btn-large">Install free ↓</a>
<a href="#" class="btn-ai btn-large">✨ Start Agency trial</a>

<!-- AFTER -->
<a href={links.wordpressOrg} class="btn-primary btn-large">Install free ↓</a>
<a href={links.agencyTrial} class="btn-ai btn-large">✨ Start Agency trial</a>
```

- [ ] **Step 3: Wire woocommerce-speed.astro**

Add import in frontmatter:
```ts
import { links } from '../config/links';
```

In the Final CTA section (`id="download"`), replace:
```html
<!-- BEFORE -->
<a href="#" class="btn-primary btn-large">Install free ↓</a>
<a href="#" class="btn-ai btn-large">✨ Try AI insights free</a>

<!-- AFTER -->
<a href={links.wordpressOrg} class="btn-primary btn-large">Install free ↓</a>
<a href={links.sparkTrial} class="btn-ai btn-large">✨ Try AI insights free</a>
```

- [ ] **Step 4: Wire elementor-slow.astro**

Add import in frontmatter:
```ts
import { links } from '../config/links';
```

In the Final CTA section (`id="download"`), replace:
```html
<!-- BEFORE -->
<a href="#" class="btn-primary btn-large">Install free ↓</a>
<a href="#" class="btn-ai btn-large">✨ Try AI insights free</a>

<!-- AFTER -->
<a href={links.wordpressOrg} class="btn-primary btn-large">Install free ↓</a>
<a href={links.sparkTrial} class="btn-ai btn-large">✨ Try AI insights free</a>
```

- [ ] **Step 5: Wire client-reporting.astro**

Add import in frontmatter:
```ts
import { links } from '../config/links';
```

In the Final CTA section (`id="download"`), replace:
```html
<!-- BEFORE -->
<a href="#" class="btn-primary btn-large">Install free</a>
<a href="#" class="btn-ai btn-large">✨ Try Agency plan</a>

<!-- AFTER -->
<a href={links.wordpressOrg} class="btn-primary btn-large">Install free</a>
<a href={links.agencyTrial} class="btn-ai btn-large">✨ Try Agency plan</a>
```

- [ ] **Step 6: Wire slow-store.astro**

Add import in frontmatter:
```ts
import { links } from '../config/links';
```

This page has TWO sections with `href="#"` — the "How it works" mid-section AND the Final CTA:

In the "How it works" `bg-raised` section (around line 114):
```html
<!-- BEFORE -->
<a href="#" class="btn-primary">Install free</a>
<a href="#" class="btn-ai">✨ Try AI insights</a>

<!-- AFTER -->
<a href={links.wordpressOrg} class="btn-primary">Install free</a>
<a href={links.sparkTrial} class="btn-ai">✨ Try AI insights</a>
```

In the Final CTA section (`id="download"`):
```html
<!-- BEFORE -->
<a href="#" class="btn-primary btn-large">Install free ↓</a>
<a href="#" class="btn-ai btn-large">✨ Try AI insights free</a>

<!-- AFTER -->
<a href={links.wordpressOrg} class="btn-primary btn-large">Install free ↓</a>
<a href={links.sparkTrial} class="btn-ai btn-large">✨ Try AI insights free</a>
```

- [ ] **Step 7: Wire page-builder-bloat.astro**

Add import in frontmatter:
```ts
import { links } from '../config/links';
```

This page has TWO sections with `href="#"` — the "Simple CTA" mid-section AND the Final CTA:

In the `bg-raised` section (around line 139):
```html
<!-- BEFORE -->
<a href="#" class="btn-primary">Install free</a>
<a href="#" class="btn-ai">✨ Try AI insights</a>

<!-- AFTER -->
<a href={links.wordpressOrg} class="btn-primary">Install free</a>
<a href={links.sparkTrial} class="btn-ai">✨ Try AI insights</a>
```

In the Final CTA section (`id="download"`):
```html
<!-- BEFORE -->
<a href="#" class="btn-primary btn-large">Install free ↓</a>
<a href="#" class="btn-ai btn-large">✨ Try AI insights</a>

<!-- AFTER -->
<a href={links.wordpressOrg} class="btn-primary btn-large">Install free ↓</a>
<a href={links.sparkTrial} class="btn-ai btn-large">✨ Try AI insights</a>
```

- [ ] **Step 8: Wire Footer.astro**

Add import in frontmatter:
```ts
import { links } from '../config/links';
```

Replace the footer links section:
```html
<!-- BEFORE -->
<div class="footer-links">
    <a href="https://github.com/flavor/flavor">GitHub</a>
    <!-- TODO: update when plugin is listed -->
    <a href="https://wordpress.org/plugins/flavor/">WordPress.org</a>
    <!-- TODO: create privacy and terms pages -->
    <a href="/privacy">Privacy</a><a href="/terms">Terms</a>
</div>

<!-- AFTER -->
<div class="footer-links">
    <a href={links.github}>GitHub</a>
    <a href={links.wordpressOrg}>WordPress.org</a>
    <a href="/privacy">Privacy</a><a href="/terms">Terms</a>
</div>
```

Note: `/privacy` and `/terms` stay as relative paths — those are internal routes, not external links.

- [ ] **Step 9: Wire Pricing.astro**

Add import in frontmatter:
```ts
import { links } from '../config/links';
```

Replace the 3 `href="#"` links on the paid tier cards:

```html
<!-- BEFORE -->
<a href="#" class="pricing-btn btn-paid">Start with Spark</a>
...
<a href="#" class="pricing-btn btn-paid">Start with Pro</a>
...
<a href="#" class="pricing-btn btn-paid">Start with Agency</a>

<!-- AFTER -->
<a href={links.sparkTrial} class="pricing-btn btn-paid">Start with Spark</a>
...
<a href={links.proTrial} class="pricing-btn btn-paid">Start with Pro</a>
...
<a href={links.agencyTrial} class="pricing-btn btn-paid">Start with Agency</a>
```

The Free tier button (`<a href="#download" ...>Install free</a>`) is an internal anchor — leave it as-is.

- [ ] **Step 10: Verify no inline href="#" remains**

Run: `grep -rn 'href="#"' src/pages/ src/components/`
Expected: Zero matches. All `href="#"` links have been replaced with either `links.*` config values or were already internal anchors like `href="#download"`.

Note: `href="#download"`, `href="#pricing"`, `href="#demo"`, `href="#features"`, `href="#compare"` are internal page anchors and should NOT be matched by this grep (the pattern is `href="#"` with nothing after the `#`).

- [ ] **Step 11: Build and verify**

Run: `bun run build`
Expected: All 7 pages compile successfully.

---

### Task 3: Privacy & Terms pages + Sitemap update

**Files:**
- Create: `src/pages/privacy.astro`
- Create: `src/pages/terms.astro`
- Modify: `astro.config.mjs`

- [ ] **Step 1: Create privacy.astro**

```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';
---
<Base title="Privacy Policy — WP Flame" noindex={true}>
  <Nav />
  <section class="section" style="min-height:60vh;">
    <div class="container">
      <h1 style="font-size:clamp(28px,3.5vw,40px);font-weight:700;color:white;letter-spacing:-0.02em;margin-bottom:20px;">Privacy Policy</h1>
      <p style="font-size:17px;color:var(--carbon-300);line-height:1.7;max-width:640px;">
        Our privacy policy is being prepared and will be published here before launch. WP Flame is self-hosted — your performance data stays on your own server and is never sent to us unless you opt into AI Insights.
      </p>
      <p style="font-size:15px;color:var(--carbon-400);margin-top:24px;">
        Questions? Contact us at <a href="mailto:hello@wpflame.com" style="color:var(--flame-400);">hello@wpflame.com</a>
      </p>
    </div>
  </section>
  <Footer />
</Base>
```

- [ ] **Step 2: Create terms.astro**

```astro
---
import Base from '../layouts/Base.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import '../styles/global.css';
---
<Base title="Terms of Service — WP Flame" noindex={true}>
  <Nav />
  <section class="section" style="min-height:60vh;">
    <div class="container">
      <h1 style="font-size:clamp(28px,3.5vw,40px);font-weight:700;color:white;letter-spacing:-0.02em;margin-bottom:20px;">Terms of Service</h1>
      <p style="font-size:17px;color:var(--carbon-300);line-height:1.7;max-width:640px;">
        Our terms of service are being prepared and will be published here before launch. The free WP Flame plugin is open-source software. AI Insights is a paid subscription service with separate terms.
      </p>
      <p style="font-size:15px;color:var(--carbon-400);margin-top:24px;">
        Questions? Contact us at <a href="mailto:hello@wpflame.com" style="color:var(--flame-400);">hello@wpflame.com</a>
      </p>
    </div>
  </section>
  <Footer />
</Base>
```

- [ ] **Step 3: Update sitemap filter in astro.config.mjs**

Current filter excludes 3 Facebook campaign pages. Add `/privacy/` and `/terms/`:

```js
// BEFORE
filter: (page) => !['/client-reporting/', '/slow-store/', '/page-builder-bloat/']
  .some(p => page.endsWith(p))

// AFTER
filter: (page) => !['/client-reporting/', '/slow-store/', '/page-builder-bloat/', '/privacy/', '/terms/']
  .some(p => page.endsWith(p))
```

- [ ] **Step 4: Build and verify**

Run: `bun run build`
Expected: 9 pages built (7 existing + privacy + terms). Sitemap excludes privacy and terms.

Verify sitemap: `cat dist/sitemap-0.xml` — should contain `/`, `/agency-performance/`, `/elementor-slow/`, `/woocommerce-speed/` only. Should NOT contain `/privacy/` or `/terms/`.

Verify noindex: `grep 'robots' dist/privacy/index.html` — should contain `noindex, follow`.

---

### Task 4: Mobile Navigation

**Files:**
- Modify: `src/components/Nav.astro`

- [ ] **Step 1: Add hamburger button to HTML**

After the existing `.nav-links` div, add the hamburger button. The button is only visible on mobile (CSS handles this).

Add inside the `<nav>` element, after `.nav-links`:

```html
<button class="nav-hamburger" aria-label="Toggle menu" aria-expanded="false">
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
</button>
```

- [ ] **Step 2: Add mobile panel HTML**

Add the slide-down panel immediately after the closing `</nav>` tag:

```html
<div class="nav-mobile-panel">
  <a href="/#features">Features</a>
  <a href="/#pricing">Pricing</a>
  <a href="/#compare">Compare</a>
  <a href={ctaHref} class="nav-mobile-cta">{cta}</a>
</div>
```

- [ ] **Step 3: Add hamburger + panel CSS**

Add to the existing `<style>` block:

```css
/* Hamburger - hidden on desktop */
.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 101;
}
.hamburger-line {
  display: block;
  width: 20px;
  height: 2px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 1px;
  transition: transform 0.3s, opacity 0.3s;
}

/* Hamburger → X animation */
.nav-hamburger.open .hamburger-line:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}
.nav-hamburger.open .hamburger-line:nth-child(2) {
  opacity: 0;
}
.nav-hamburger.open .hamburger-line:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

/* Mobile panel - hidden by default */
.nav-mobile-panel {
  position: fixed;
  top: 57px;
  left: 0;
  right: 0;
  z-index: 99;
  background: rgba(14, 13, 18, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: none;
  flex-direction: column;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}
.nav-mobile-panel.open {
  max-height: 300px;
}
.nav-mobile-panel a {
  padding: 16px 20px;
  font-size: 15px;
  font-weight: 500;
  color: var(--carbon-300);
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  transition: color 0.2s;
}
.nav-mobile-panel a:hover {
  color: white;
}
.nav-mobile-cta {
  background: var(--flame-500) !important;
  color: white !important;
  margin: 12px 20px;
  padding: 12px 20px !important;
  border-radius: 8px;
  text-align: center;
  font-weight: 600 !important;
  border-bottom: none !important;
}

@media (max-width: 900px) {
  .nav-hamburger {
    display: flex;
  }
  .nav-mobile-panel {
    display: flex;
  }
}
```

- [ ] **Step 4: Update existing mobile CSS**

In the existing `@media (max-width: 900px)` block, the current rule hides non-CTA nav links. Update it to also hide the desktop CTA (the mobile panel provides its own):

```css
/* BEFORE */
@media (max-width: 900px) {
  .nav {
    padding: 14px 20px;
  }
  .nav-links a:not(.nav-cta) {
    display: none;
  }
}

/* AFTER */
@media (max-width: 900px) {
  .nav {
    padding: 14px 20px;
  }
  .nav-links {
    display: none;
  }
}
```

- [ ] **Step 5: Add toggle JavaScript**

Replace the existing `<script>` section (scroll listener) with one that includes both the scroll behavior and the hamburger toggle:

```html
<script>
  // Scroll effect
  window.addEventListener("scroll", () => {
    const nav = document.querySelector(".nav") as HTMLElement;
    if (nav)
      nav.style.background =
        window.scrollY > 80 ? "rgba(14,13,18,0.95)" : "rgba(14,13,18,0.8)";
  });

  // Mobile menu toggle
  const hamburger = document.querySelector(".nav-hamburger");
  const panel = document.querySelector(".nav-mobile-panel");

  if (hamburger && panel) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.toggle("open");
      panel.classList.toggle("open");
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    // Close panel when a link is clicked
    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        panel.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }
</script>
```

- [ ] **Step 6: Build and verify**

Run: `bun run build`
Expected: All pages compile. No errors.

Manual check: Run `bun run dev`, open browser at mobile width (under 900px). Hamburger icon should appear. Clicking it should slide down the panel with Features, Pricing, Compare links and a CTA button. Clicking a link should close the panel.

---

### Task 5: OG Image Generation

**Files:**
- Create: `public/og-default.png` (generated)

- [ ] **Step 1: Create temporary HTML file for OG image**

Create `public/og-template.html` (temporary — will be deleted after screenshot):

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px;
    height: 630px;
    background: #0E0D12;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans', sans-serif;
    position: relative;
    overflow: hidden;
  }
  .glow {
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(ellipse at center, rgba(240,122,24,0.12) 0%, rgba(232,77,48,0.05) 30%, transparent 60%);
    pointer-events: none;
  }
  .logo {
    position: relative;
    z-index: 1;
    margin-bottom: 32px;
  }
  .brand {
    position: relative;
    z-index: 1;
    font-size: 48px;
    font-weight: 700;
    color: white;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
  }
  .brand em {
    font-style: normal;
    color: #FF9632;
  }
  .tagline {
    position: relative;
    z-index: 1;
    font-size: 22px;
    color: #9E9D99;
    max-width: 600px;
    text-align: center;
    line-height: 1.5;
  }
</style>
</head>
<body>
  <div class="glow"></div>
  <div class="logo">
    <svg viewBox="0 0 56 62" fill="none" width="100" height="100">
      <rect x="0" y="48" width="56" height="11" rx="3.5" fill="#FF9632"/>
      <rect x="5" y="35" width="46" height="11" rx="3.5" fill="#F07A18"/>
      <rect x="10" y="22" width="36" height="11" rx="3.5" fill="#E84D30"/>
      <rect x="16" y="9" width="24" height="11" rx="3.5" fill="#C23520"/>
    </svg>
  </div>
  <div class="brand">WP <em>Flame</em></div>
  <div class="tagline">See exactly where your WordPress request spends its time</div>
</body>
</html>
```

- [ ] **Step 2: Screenshot the HTML at 1200x630 using Playwright**

Use the Playwright MCP tools to:
1. Navigate to the local HTML file: `file:///Users/danielferguson/repositories/wp-flame/public/og-template.html`
2. Set viewport to 1200x630
3. Take a screenshot and save to `public/og-default.png`

Alternatively, use the CLI approach:
```bash
npx playwright screenshot --viewport-size=1200,630 file:///Users/danielferguson/repositories/wp-flame/public/og-template.html public/og-default.png
```

If Playwright CLI isn't available, use the Playwright MCP `browser_navigate`, `browser_resize`, and `browser_take_screenshot` tools in sequence.

- [ ] **Step 3: Delete the template file**

```bash
rm public/og-template.html
```

- [ ] **Step 4: Verify the image**

Verify the file exists and has reasonable dimensions:
```bash
file public/og-default.png
```
Expected: PNG image data, 1200 x 630

- [ ] **Step 5: Build and verify**

Run: `bun run build`
Expected: Build succeeds. `dist/og-default.png` exists in the output.

---

## Final Verification

After all 5 tasks are complete, run these checks:

- [ ] **V1: Full build passes**
Run: `bun run build`
Expected: 9 pages built successfully.

- [ ] **V2: OG image exists**
Run: `file public/og-default.png`
Expected: PNG image data, 1200 x 630

- [ ] **V3: No inline href="#" remains**
Run: `grep -rn 'href="#"' src/pages/ src/components/`
Expected: Zero matches.

- [ ] **V4: Footer has no TODO comments**
Run: `grep -n 'TODO' src/components/Footer.astro`
Expected: Zero matches.

- [ ] **V5: Legal pages render with noindex**
Run: `grep 'robots' dist/privacy/index.html`
Expected: Contains `noindex, follow`

- [ ] **V6: Sitemap excludes legal pages**
Run: `cat dist/sitemap-0.xml`
Expected: Contains `/`, `/agency-performance/`, `/elementor-slow/`, `/woocommerce-speed/`. Does NOT contain `/privacy/` or `/terms/`.

- [ ] **V7: Mobile nav works**
Run `bun run dev`, open browser at < 900px width. Hamburger appears, panel slides down on click, links navigate correctly, panel closes on link click.
