export interface ComparisonRow {
  dimension: string;
  alternative: string;
  wpFlame: string;
}

export interface Comparison {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  hero: string;
  framing: string;
  alternativeName: string;
  alternativeStrengths: string[];
  wpFlameRole: string[];
  chooseAlternativeWhen: string[];
  chooseWpFlameWhen: string[];
  together: string;
  rows: ComparisonRow[];
  caveat: string;
}

export const comparisons: Comparison[] = [
  {
    slug: 'query-monitor',
    title: 'WP Flame and Query Monitor',
    metaTitle: 'WP Flame vs Query Monitor: Different WordPress Workflows',
    description: 'A balanced comparison of Query Monitor’s current-request developer workflow and WP Flame’s intended retained diagnosis and verification workflow.',
    eyebrow: 'Comparison · Developer diagnostics',
    hero: 'Query Monitor is an excellent developer tool. WP Flame is being built for a different evidence workflow.',
    framing: 'This is not a winner-takes-all comparison. Query Monitor is mature, widely used, and highly effective when a developer is inspecting the current request. WP Flame’s intended public-v1 differentiation is bounded retained history, capability-aware guidance, compatible before/after comparison, and agency-ready evidence.',
    alternativeName: 'Query Monitor',
    alternativeStrengths: [
      'Fast inspection of the current WordPress request by a developer.',
      'Rich query, hook, HTTP, template, environment, and debugging context within its supported workflow.',
      'A familiar, established interface for technical troubleshooting.',
      'Useful alongside local development and targeted production debugging practices.',
    ],
    wpFlameRole: [
      'Capture a bounded eligible request and retain its supported evidence locally.',
      'Declare which capture capabilities were available, unavailable, or failed.',
      'Lead with the largest measured opportunities and safe next action before the full graph.',
      'Compare compatible workflow cohorts and create a redacted handoff when the v1 gates pass.',
    ],
    chooseAlternativeWhen: [
      'A developer is present and needs broad detail about the request currently on screen.',
      'The primary task is general WordPress debugging rather than retained performance evidence.',
      'You already have a trusted Query Monitor workflow and do not need comparison or report continuity.',
    ],
    chooseWpFlameWhen: [
      'The incident is intermittent or must be reproduced and reviewed after the request completes.',
      'You need visible capture limitations and a cautious, evidence-linked recommendation.',
      'You must repeat the same workflow after a change and reject incompatible comparisons.',
      'An agency needs a redacted technical or client handoff rather than only a live debug panel.',
    ],
    together: 'Use Query Monitor for broad current-request inspection and WP Flame for the controlled trace, retained evidence, and verification workflow. Agreement between independent tools can strengthen a diagnosis; disagreement should be investigated, not hidden.',
    rows: [
      { dimension: 'Primary moment', alternative: 'Inspect the request currently being viewed.', wpFlame: 'Capture and retain a bounded eligible request for diagnosis.' },
      { dimension: 'Audience', alternative: 'Developers and technical operators.', wpFlame: 'Agencies, developers, and capable operators needing a guided evidence trail.' },
      { dimension: 'Evidence model', alternative: 'Broad current-request debugging context.', wpFlame: 'Capability-labelled supported spans with completeness and confidence.' },
      { dimension: 'Comparison', alternative: 'Use external process or tools to establish before/after evidence.', wpFlame: 'Intended compatible cohort comparison after the roadmap gate passes.' },
      { dimension: 'Commercial status', alternative: 'Established public plugin.', wpFlame: 'Pre-release paid design-partner programme.' },
    ],
    caveat: 'Feature details can change in either product. This page deliberately compares workflows, not an exhaustive checkbox list. WP Flame claims remain limited by its published release evidence.',
  },
  {
    slug: 'generic-apm',
    title: 'WP Flame and generic APM',
    metaTitle: 'WP Flame vs Generic APM: WordPress Semantics or Broader Infrastructure',
    description: 'Understand where a generic application performance monitoring platform is stronger and where WP Flame’s WordPress-specific workflow is intended to fit.',
    eyebrow: 'Comparison · Application monitoring',
    hero: 'Broader infrastructure visibility and WordPress-native evidence solve different problems.',
    framing: 'A generic APM can provide deep runtime, service, database, host, and distributed-system visibility—often well beyond WP Flame’s intended scope. WP Flame is not trying to replace that. It focuses on low-friction WordPress semantics and a local-first diagnosis workflow where a server agent or specialist platform is unavailable or disproportionate.',
    alternativeName: 'Generic APM',
    alternativeStrengths: [
      'Broader visibility across infrastructure, services, queues, databases, and distributed calls.',
      'Potentially deeper PHP or runtime instrumentation when an agent and suitable access are available.',
      'Central monitoring, alerting, team operations, retention, and service-level workflows.',
      'Strong fit for engineering teams already operating an observability platform.',
    ],
    wpFlameRole: [
      'Use WordPress concepts such as plugins, themes, hooks, queries, HTTP calls, routes, and lifecycle phases.',
      'Work locally by default without requiring a particular host or server-level agent.',
      'Expose capture capability and degraded states rather than implying uniform telemetry.',
      'Support a focused diagnosis, handoff, and before/after workflow for eligible WordPress requests.',
    ],
    chooseAlternativeWhen: [
      'You need host, process, CPU, memory, database-server, queue, or distributed-service telemetry.',
      'Your team already has server access, APM expertise, dashboards, and incident practices.',
      'The performance problem crosses WordPress, infrastructure, and multiple services.',
      'You need continuous fleet observability today rather than a pre-release focused diagnostic tool.',
    ],
    chooseWpFlameWhen: [
      'The investigation needs a WordPress-specific owner and workflow explanation.',
      'A server agent is unavailable, undesirable, or controlled by the hosting provider.',
      'Trace data should remain on the WordPress installation by default.',
      'The goal is a bounded capture and defensible next action rather than full infrastructure observability.',
    ],
    together: 'A generic APM can establish wider system context while WP Flame explains supported WordPress ownership and creates a local trace handoff. Treat them as complementary evidence sources, especially for slow external services or database contention.',
    rows: [
      { dimension: 'Scope', alternative: 'Application and infrastructure observability.', wpFlame: 'Eligible WordPress server-side request diagnosis.' },
      { dimension: 'Installation', alternative: 'Often requires an agent, account, and infrastructure access.', wpFlame: 'Intended WordPress-native install with no required server agent.' },
      { dimension: 'Semantics', alternative: 'Runtime, transaction, service, and infrastructure concepts.', wpFlame: 'Plugins, themes, hooks, WordPress HTTP, compatible queries, routes, and lifecycle.' },
      { dimension: 'Data location', alternative: 'Commonly sent to a connected monitoring service.', wpFlame: 'Trace data local on the site by default; future external services require disclosure and consent.' },
      { dimension: 'Depth', alternative: 'May provide deeper PHP and system instrumentation.', wpFlame: 'Supported WordPress spans; not a complete PHP call-stack profiler.' },
    ],
    caveat: '“Generic APM” covers many products with different deployment and feature models. Evaluate the specific platform available to you. WP Flame has not yet published the compatibility and overhead evidence required for a general-release claim.',
  },
  {
    slug: 'cache-plugin',
    title: 'WP Flame and cache plugins',
    metaTitle: 'WP Flame vs Cache Plugins: Diagnosis and Optimization Are Different',
    description: 'Learn why a cache plugin and WP Flame address different parts of WordPress performance and can often be used together.',
    eyebrow: 'Comparison · Caching',
    hero: 'A cache can bypass eligible PHP requests. WP Flame investigates dynamic requests that still execute WordPress.',
    framing: 'Cache plugins are often one of the highest-value tools for public, cacheable WordPress pages. WP Flame is not a page cache, asset optimizer, or replacement for that work. Its intended role begins when checkout, wp-admin, logged-in pages, REST, AJAX, cron, or another dynamic workflow still executes WordPress and remains slow.',
    alternativeName: 'Cache plugin',
    alternativeStrengths: [
      'Serve eligible public pages without repeating the full PHP and database path.',
      'Often provide page caching, preload, browser caching, and related delivery optimizations.',
      'Improve the visitor experience for cacheable content without requiring a diagnosis of every request.',
      'Mature deployment and compatibility guidance across many WordPress environments.',
    ],
    wpFlameRole: [
      'Capture supported server-side work in dynamic requests that execute WordPress.',
      'Show the best-supported WordPress owner for measured contributors.',
      'Identify supported query, callback, external HTTP, and lifecycle evidence where available.',
      'Verify whether a targeted change improved the same eligible workflow.',
    ],
    chooseAlternativeWhen: [
      'The main problem is an uncached public page that can safely be served from page cache.',
      'You need image, CSS, JavaScript, preload, CDN, or browser-cache optimization.',
      'The request should be avoided entirely rather than analyzed repeatedly.',
    ],
    chooseWpFlameWhen: [
      'The slow workflow is checkout, wp-admin, logged-in, personalized, REST, AJAX, cron, or CLI.',
      'A cache is active but the request still executes PHP and remains slow.',
      'You need evidence about supported internal WordPress contributors before changing code or configuration.',
      'You must explain and verify a targeted performance change.',
    ],
    together: 'Use caching to avoid eligible work and WP Flame to understand the dynamic work that remains. A useful investigation may confirm that caching is the right action, but WP Flame does not enable or configure it automatically.',
    rows: [
      { dimension: 'Primary job', alternative: 'Avoid repeating eligible public-page work.', wpFlame: 'Measure and explain supported work that still executes.' },
      { dimension: 'Dynamic requests', alternative: 'Usually bypassed or excluded from page caching.', wpFlame: 'The intended focus: checkout, admin, logged-in, API, AJAX, cron, and similar workflows.' },
      { dimension: 'Frontend assets', alternative: 'May optimize CSS, JavaScript, images, or delivery.', wpFlame: 'Does not optimize browser assets or measure Core Web Vitals.' },
      { dimension: 'Automatic changes', alternative: 'Applies configured caching and optimization behavior.', wpFlame: 'Diagnoses and verifies; public v1 does not modify the site automatically.' },
      { dimension: 'Use together', alternative: 'Handles cacheable traffic.', wpFlame: 'Investigates eligible cache misses and intentionally dynamic traffic.' },
    ],
    caveat: 'Caching behavior varies by plugin, host, CDN, and site configuration. WP Flame cannot observe a request that is served entirely without running PHP.',
  },
];

export const comparisonBySlug = new Map(comparisons.map((comparison) => [comparison.slug, comparison]));
