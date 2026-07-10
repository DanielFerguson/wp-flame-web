# WP Flame website claims register

This register keeps marketing language aligned with:

- `/Users/danielferguson/repositories/wp-flame/docs/COMMERCIAL-STRATEGY.md`
- `/Users/danielferguson/repositories/wp-flame/docs/ROADMAP.md`

The product roadmap and its evidence gates override this file. A capability being
present in development code does not make it a validated public claim.

## Current public phase

Status: paid, founder-led design-partner recruitment.

Current primary CTA: apply with a real eligible dynamic WordPress workflow.

Current secondary CTA: explore an explicitly illustrative sample trace.

The site must not present a WordPress.org download, self-service Pro checkout,
public trial, or general-availability pricing until the corresponding release gate
has passed and the destination is live.

## Claims permitted for the current site

These are descriptions of direction and boundaries, not evidence claims:

- WP Flame is a WordPress-native performance monitoring and diagnosis product.
- The intended category is a performance flight recorder for dynamic WordPress.
- It is being designed around bounded request capture and local-first storage.
- It does not require a server-level agent as a product dependency.
- It is not a cache, asset optimiser, browser-speed test, full PHP call-stack
  profiler, automatic repair tool, or generic infrastructure APM.
- Bundled website traces are synthetic and illustrative.
- The design-partner programme is founder-led and requires a real eligible incident.

## Claims permitted only after their v1 gate passes

These must be phrased using observed, supported, measured, likely, capability,
and confidence language:

- Helps identify where a WordPress request spends observed server-side time.
- Attributes supported spans to the best available WordPress owner.
- Records a bounded sample of eligible requests.
- Shows which capture capabilities were available for a trace.
- Compares compatible measured performance before and after a change.
- Continues in a visibly degraded mode when supported telemetry is unavailable.

Before publication, link each claim to the accepted roadmap gate and release note.

## Claims requiring dated public evidence

Every instance must include or link to methodology, environment, date, sample
size, comparison basis, and limitations:

- Overhead percentages or milliseconds.
- Production-safety language.
- Named host, plugin, theme, database, cache, or gateway compatibility.
- Accuracy comparisons against another profiler or APM.
- Time saved, performance improvement, capacity, or commercial outcome.
- Fastest, most accurate, lowest-overhead, or unique-market claims.
- Ratings, customer counts, trace counts, or adoption statistics.

## Packaging hypotheses

The current founding test is $99/year for up to five authorised production sites,
with direct onboarding. Staging and local environments do not consume that site
count. No lifetime entitlement is offered.

Community and Pro remain packaging hypotheses until the relevant roadmap and paid
validation gates pass:

- Community: a complete one-off diagnosis.
- Pro: recurring monitoring, longer history, compatible comparisons, reports,
  professional workflow, and support.

Fleet dashboards, remote alerts, team workflows, white-label reports, automated
change correlation, and hosted sharing are not current public commitments.

## Prohibited website language

- Every function, hook, callback, query, plugin, or millisecond.
- Zero overhead.
- Complete request timing from the web server.
- Always identifies the root cause.
- Automatically optimises or guarantees a faster site.
- Improves SEO, rankings, conversion, or revenue.
- Works on every host or replaces infrastructure APM products.
- Blanket legal-compliance promises.
- Lifetime or forever-price promises.

## Review workflow

1. Classify new copy as current, release-gated, evidence-gated, hypothesis, or
   post-v1.
2. Confirm the relevant roadmap status.
3. Add the evidence link before publishing a quantified or compatibility claim.
4. Run `npm run check:claims`.
5. Run the production build and `npm run check:links`.
6. Review structured data, metadata, screenshots, and campaign variants; hidden
   or machine-readable claims count as public claims too.
