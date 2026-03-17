# Round 4: CRO Improvements

## Context

Rounds 1-3 built the complete marketing site: 9 pages, 10 components, SEO infrastructure, mobile nav, centralized CTA links, and legal pages. A CRO/CMO audit identified 6 high-priority conversion issues to fix before launch.

Product is pre-launch. Distribution: WordPress.org (free plugin) + Lemon Squeezy (paid AI tiers). Launching within days.

## Decisions

- **Social proof**: Remove fabricated "2,400+ sites" stat. Replace homepage TrustBar with honest credibility strip. Campaign page TrustBars keep 3 honest stats.
- **Hero CTAs**: Reduce from 3 to 2 on all pages (remove "See AI plans" from hero).
- **Lead capture**: Founding member email capture via Lemon Squeezy audience API. Two capture points: dedicated section + inline at pricing.
- **Urgency**: Founding member framing — current prices are founding member rates, prices increase ~25-30% post-launch.
- **Founding member pricing**: Spark $29→$39, Pro $79→$99, Agency $199→$249 post-launch. Founding members keep the lower rate forever.
- **Pricing guidance**: Use-case labels on each pricing card.
- **Demo interactivity**: Hover tooltips + click-to-expand on flame graph spans. Video placeholder shell for future walkthrough.
- **Not in scope (post-launch)**: Real video recording, testimonials, blog, analytics, A/B testing.

---

## 1. Replace Fake Social Proof

### Homepage

**Remove** the TrustBar from homepage. Replace with a credibility strip in the same position (between PostDemoCta and Data+Insights section).

**New component: `CredibilityStrip.astro`**

A centered text block, not a card. Subtle styling:

```
Built by an engineer who scaled WordPress for multinational businesses.
Self-hosted. Your data never leaves your server.
```

Styled with `font-size: 15px`, `color: var(--carbon-400)`, centered, `max-width: 640px`, with `.reveal` animation. No background card — just text with generous padding.

### Campaign Pages

Keep TrustBar but update the default stats. Remove the "2,400+ sites" stat. The 3 remaining defaults become:

```ts
stats = [
  { value: "4.9/5", label: "rating" },
  { value: "<5ms", label: "overhead" },
  { value: "30 sec", label: "to first graph" },
]
```

Pages that pass custom `stats` props (like agency-performance) also need their "2,400+ sites" entry removed.

### Affected files

- `src/components/CredibilityStrip.astro` (new)
- `src/pages/index.astro` — replace TrustBar with CredibilityStrip
- `src/components/TrustBar.astro` — update default stats to 3 items
- `src/pages/agency-performance.astro` — update custom stats prop

---

## 2. Hero CTA Reduction

### All pages with 3 hero CTAs

Remove the middle "See AI plans" / "See AI insights" button from the hero. Keep only:
- **Primary**: "Install free ↓" → `#download`
- **Secondary**: "See it in action" → `#demo`

### Homepage (`index.astro`)

Current:
```html
<a href="#download" class="btn-primary">Install free ↓</a>
<a href="#pricing" class="btn-ai">✨ See AI plans</a>
<a href="#demo" class="btn-secondary">See it in action</a>
```

After:
```html
<a href="#download" class="btn-primary">Install free ↓</a>
<a href="#demo" class="btn-secondary">See it in action</a>
```

### Campaign pages

All 6 campaign pages already have exactly 2 hero CTAs. No changes needed on campaign pages — this change only affects the homepage.

### Affected files

- `src/pages/index.astro` — remove AI plans button from hero

---

## 3. Founding Member Email Capture

### New component: `FoundingMemberCta.astro`

**Dedicated section** placed on the homepage between FAQ and Final CTA.

**Visual design:** Dark card with subtle flame-colored border (`rgba(240,122,24,0.15)`). Background `rgba(255,255,255,0.025)`. Rounded corners, generous padding.

**Content:**
- Label: "Early access"
- Headline: "Lock in founding member pricing — forever"
- Subtext: "Join before launch and keep your discounted rate for as long as you're a member. Founding member pricing won't be available after launch."
- Email input + submit button ("Claim my spot")
- Small print: "We'll email you once at launch. No spam."

**Form behavior:** The form collects the email and submits it via client-side JavaScript `fetch()`. The implementation works in two modes:

**Placeholder mode (pre-Lemon Squeezy setup):** When the API endpoint is not configured (empty string), the form shows the success state immediately on submit with no network request. The email is not stored — this lets the UI be tested before the backend is wired up.

**Live mode:** When the endpoint is configured, the form POSTs to the Lemon Squeezy API.

**Lemon Squeezy API shape:**
```
POST https://api.lemonsqueezy.com/v1/subscribers
Headers:
  Authorization: Bearer <API_KEY>
  Content-Type: application/vnd.api+json
  Accept: application/vnd.api+json
Body:
{
  "data": {
    "type": "subscribers",
    "attributes": {
      "email": "<user_email>"
    }
  }
}
```

**Configuration in `src/config/links.ts`:**
```ts
lemonSqueezy: {
  audienceEndpoint: '',  // LAUNCH: https://api.lemonsqueezy.com/v1/subscribers
  apiKey: '',            // LAUNCH: Lemon Squeezy API key
},
```

When both values are empty strings, the form operates in placeholder mode. When filled in, it makes the real API call.

**Success state:** After submission, replace the form with a confirmation message: "You're in. We'll email you at launch with your founding member pricing."

**Error state:** If submission fails, show: "Something went wrong. Try again or email hello@wpflame.com"

### Shared email state

Both the FoundingMemberCta and the inline pricing capture collect emails. They share state via `localStorage`:

- On successful submission, store `localStorage.setItem('wpflame-founding-member', 'true')`
- On page load, both forms check this key. If set, show the success state immediately instead of the form
- This prevents asking for the same email twice across the two capture points, and persists across page navigations

### Inline pricing capture

**Below the pricing cards** in the Pricing component, add a single-line email capture:

"Launching soon — founding members get these prices locked in forever."

Small inline form: email input + "Claim my spot" button, same Lemon Squeezy integration.

This is not a separate component — it's added directly to `Pricing.astro` below the `.pricing-note` paragraph.

### Affected files

- `src/components/FoundingMemberCta.astro` (new)
- `src/components/Pricing.astro` — add inline email capture below pricing note
- `src/config/links.ts` — add `lemonSqueezyAudience` config value
- `src/pages/index.astro` — import and place FoundingMemberCta between FAQ and Final CTA

---

## 4. Pricing Plan Labels + Founding Member Badge

Add a use-case identity label to each pricing card in `Pricing.astro`.

| Tier | Label |
|------|-------|
| Free | "For developers exploring performance" |
| Spark ($29) | "For solo site owners who want fixes" |
| Pro ($79) | "For freelancers and small agencies" |
| Agency ($199) | "For teams managing client portfolios" |

**Placement:** Below the tier name, above the price. Styled as a single line: `font-size: 13px`, `color: var(--carbon-400)`, `margin-bottom: 12px`. Similar style to `.pricing-desc` but shorter and positioned higher.

### Founding member price anchoring

Add a small line below the price on each paid card showing the post-launch price:

| Tier | Current | Display |
|------|---------|---------|
| Spark | $29/mo | Small text below: "Will be $39/mo after launch" |
| Pro | $79/mo | Small text below: "Will be $99/mo after launch" |
| Agency | $199/mo | Small text below: "Will be $249/mo after launch" |

Styled with `font-size: 12px`, `color: var(--carbon-500)`, with the future price in a subtle strikethrough or plain text. This makes the founding member value concrete rather than abstract.

**Post-launch:** These lines get removed and the prices update to the higher amounts. The FoundingMemberCta component gets replaced with a standard CTA. This is a manual change at launch time, not automated.

### Affected files

- `src/components/Pricing.astro` — add label text to each card

---

## 5. Interactive Demo Enhancement

### A) Hover tooltips on flame graph spans

The FlameDemo component renders spans as `.f-block` divs. Each span already has a text label. Add:

**Tooltip on hover:** When hovering a span, show a floating tooltip above the cursor with:
- Span name (already visible in the block)
- Duration (e.g., "68ms")
- % of total request
- Plugin attribution (e.g., "Elementor")

The tooltip data is already embedded in each span's rendering — it just needs to be exposed in a hover popover.

**Implementation:** Add `data-*` attributes to each `.f-block` for tooltip content (`data-duration`, `data-percent`, `data-plugin`). A small script creates a tooltip element on hover and positions it near the cursor.

### B) Click to expand detail panel

Clicking a span opens a detail panel below the flame graph. The panel shows:
- Span name and full path
- Duration and % of total
- Plugin/source attribution
- For AI-enabled demos (`showAi={true}`): a brief AI insight about this specific span

**Per-span AI text:** Each span in the demo's `spanData` array gets an optional `data-ai` attribute. For the 3-5 most significant spans per demo variant, add a one-line AI insight (e.g., `data-ai="This license check runs on every request — switch to wp-cron scheduling"`). Spans without `data-ai` show no AI section in the detail panel. Only render the AI line when `showAi={true}`.

**Implementation:** A hidden `.demo-detail-panel` div below the flame graph. Clicking a span populates it (reading from `data-*` attributes) and slides it open. Clicking another span updates it. Clicking the same span or an X button closes it.

### C) Video placeholder shell

**New component: `VideoEmbed.astro`**

A dark card container with 16:9 aspect ratio. Contains:
- A large centered play button icon (triangle in a circle)
- Overlay text: "Product walkthrough coming soon"
- Below the video container: "Install the free plugin to try it yourself" with a CTA button

**Props:** `src` (optional video URL), `poster` (optional thumbnail). When `src` is provided, renders as a real video player. When absent, shows the placeholder state.

**Placement:** On the homepage after PostDemoCta and before CredibilityStrip.

**Updated homepage section order:**
1. Hero (existing, minus AI plans CTA)
2. Demo (existing, with new tooltips + detail panel)
3. PostDemoCta (existing)
4. **VideoEmbed** (new)
5. **CredibilityStrip** (new, replaces TrustBar)
6. Data + Insights Split (existing)
7. Features (existing)
8. CompareTable (existing)
9. Pricing (existing, with plan labels + inline email capture)
10. FAQ (existing)
11. **FoundingMemberCta** (new)
12. Final CTA (existing)

### Affected files

- `src/components/FlameDemo.astro` — add data attributes to spans, tooltip script, click-to-expand detail panel
- `src/components/VideoEmbed.astro` (new)
- `src/pages/index.astro` — add VideoEmbed after PostDemoCta

---

## Files Summary

**New files (3):**
- `src/components/CredibilityStrip.astro`
- `src/components/FoundingMemberCta.astro`
- `src/components/VideoEmbed.astro`

**Modified files (6):**
- `src/config/links.ts` — add `lemonSqueezy` config object (endpoint + API key)
- `src/components/TrustBar.astro` — update default stats to 3 items (all campaign pages using `<TrustBar />` with no props are implicitly covered by this default change)
- `src/components/Pricing.astro` — add plan labels + inline email capture
- `src/components/FlameDemo.astro` — add data attributes to spans, hover tooltips, click-to-expand detail panel
- `src/pages/index.astro` — replace TrustBar with CredibilityStrip, remove AI CTA from hero, add VideoEmbed + FoundingMemberCta, reorder sections
- `src/pages/agency-performance.astro` — remove "2,400+ sites" from custom TrustBar stats prop

## Verification

1. `bun run build` — all 9 pages compile
2. Homepage: CredibilityStrip renders between VideoEmbed and Data+Insights, no "2,400+ sites" claim on any page
3. Homepage hero: exactly 2 CTA buttons (Install free + See it in action)
4. Homepage: FoundingMemberCta section renders with email form between FAQ and Final CTA
5. Homepage section order matches the spec (Hero → Demo → PostDemoCta → VideoEmbed → CredibilityStrip → Data+Insights → Features → CompareTable → Pricing → FAQ → FoundingMemberCta → Final CTA)
6. Pricing: each card shows use-case label below tier name, inline email capture below pricing note
7. FlameDemo: hovering spans shows tooltip with duration/attribution, clicking opens detail panel below
8. VideoEmbed: placeholder state renders with "coming soon" message and CTA
9. Campaign pages: all TrustBars show 3 stats (4.9/5, <5ms, 30 sec) — no "2,400+ sites"
10. Email form: in placeholder mode (empty config), shows success state on submit without network request
11. Pricing cards: each paid card shows "Will be $X/mo after launch" below the price
12. Email forms: submitting in one capture point sets localStorage, other shows success state on reload
