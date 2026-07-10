# WP Flame marketing site

Astro site for the pre-release WP Flame design-partner programme and the later
Community/Pro launch journey.

The source of truth for public claims is:

- `/Users/danielferguson/repositories/wp-flame/docs/COMMERCIAL-STRATEGY.md`
- `/Users/danielferguson/repositories/wp-flame/docs/ROADMAP.md`

The website must never present a roadmap item, pricing hypothesis, benchmark, or
compatibility target as a released capability before its evidence gate passes.

## Current offer

WP Flame is currently recruiting paid, founder-led design partners who can bring
a real slow dynamic WordPress workflow. The public plugin and Pro checkout are
not yet available.

Primary conversion:

- `/design-partner/` — programme details and application
- `/sample-trace/` — illustrative, interactive product proof

## Development

```bash
npm install
npm run dev
npm run build
```

The production output is static and written to `dist/`.

## Information architecture

Core pages:

- `/` — paid-beta homepage
- `/product/`
- `/sample-trace/`
- `/design-partner/`
- `/community-vs-pro/`
- `/docs/quickstart/`
- `/benchmarks/`
- `/compatibility/`
- `/privacy/`
- `/terms/`
- `/support/`
- `/changelog/`

Use cases:

- `/use-cases/slow-wp-admin/`
- `/use-cases/woocommerce-checkout/`
- `/use-cases/external-api/`
- `/use-cases/plugin-regression/`
- `/use-cases/rest-ajax/`
- `/use-cases/cron-action-scheduler/`
- `/use-cases/client-performance-report/`

Balanced comparisons:

- `/compare/query-monitor/`
- `/compare/generic-apm/`
- `/compare/cache-plugin/`

Legacy campaign paths redirect to the most relevant use-case page. Paid traffic
should remain paused until the corresponding product evidence and conversion
measurement are live.

## Design-partner form

The form never embeds a secret and never displays a false success state.

By default it prepares a complete email application to `hello@wpflame.com`. To
use a server-side form service, configure a public endpoint that accepts JSON and
returns a 2xx response only after the application is durably accepted:

```bash
PUBLIC_DESIGN_PARTNER_FORM_ENDPOINT=https://example.com/forms/wp-flame
```

Do not place API keys, bearer tokens, or private credentials in a `PUBLIC_*`
variable. The endpoint is responsible for spam controls, validation, retention,
and any notification or CRM integration.

## Optional commercial-event analytics

Anonymous website events remain off unless an endpoint is configured and the
visitor explicitly opts in:

```bash
PUBLIC_COMMERCIAL_EVENTS_ENDPOINT=https://example.com/events/wp-flame
```

The browser sends only event names, page/destination paths, placement labels,
whitelisted UTM parameters, and timestamps. It does not send application fields
or trace data. Do Not Track prevents collection. Document the chosen provider,
retention, location, and access controls on the privacy page before activation.

## Claim rules

Use:

- observed server-side time
- supported spans
- largest measured contributor
- likely next action
- capture completeness
- compatible before/after samples
- where available

Avoid:

- every function, hook, or query
- zero overhead
- complete request timing
- definitive root cause
- automatic optimisation
- named compatibility without dated evidence
- quantified performance or commercial outcomes without methodology

All sample-trace data bundled with this site is illustrative and must remain
labelled as such. It is not a benchmark, testimonial, or compatibility claim.

## Release checks

Before publishing:

1. Run `npm run check:site` to execute the commercial-claim guard, production
   build, and built-link guard together.
2. Confirm redirect and `noindex` pages are absent from the generated sitemap.
3. Verify every primary CTA and the application fallback.
4. Review desktop and 390px layouts, keyboard navigation, reduced motion, and
   the interactive trace.
5. Confirm privacy, terms, compatibility, benchmarks, and changelog reflect the
   current product milestone.
