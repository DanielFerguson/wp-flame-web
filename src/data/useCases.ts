export interface UseCase {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  hero: string;
  problem: string;
  whyTypicalToolsMissIt: string;
  capturePlan: string[];
  evidence: Array<{ title: string; body: string }>;
  limitations: string[];
  handoff: string[];
  related: string[];
}

export const useCases: UseCase[] = [
  {
    slug: 'slow-wp-admin',
    title: 'Diagnose slow wp-admin',
    metaTitle: 'Diagnose Slow wp-admin With Measured WordPress Evidence — WP Flame',
    description: 'A capability-aware workflow for investigating slow WordPress admin screens without pretending a browser score explains server-side work.',
    eyebrow: 'Use case · wp-admin',
    hero: 'Turn a slow admin complaint into a reproducible, bounded investigation.',
    problem: 'Editors often report that publishing, saving, searching, or opening a plugin screen feels slow. Those requests are authenticated and dynamic, so page-cache changes and public-page speed tests usually do not explain the delay.',
    whyTypicalToolsMissIt: 'A browser test can show that the response was late, while a current-request debug panel can expose useful detail to a developer. The intended WP Flame workflow adds a retained, capability-labelled trace and a repeatable path for comparing the same admin action after a change.',
    capturePlan: [
      'Name one exact action, such as opening the post list or saving a known post.',
      'Record the route, user role, relevant filters, and expected result before capturing.',
      'Run a bounded Standard capture; use one-shot Deep only when callback detail is required and the operator accepts the additional work.',
      'Check the capture report before interpreting database, callback, or early-lifecycle gaps.',
      'Repeat the identical action enough times to build a compatible baseline before making a change.',
    ],
    evidence: [
      { title: 'Largest measured contributor', body: 'A supported plugin, theme, database, HTTP, or lifecycle span with duration and ownership evidence.' },
      { title: 'Capability report', body: 'Which instrumentors were requested, captured, unavailable, or failed for this trace.' },
      { title: 'Repeatable route context', body: 'The normalized admin route, request type, environment snapshot, and capture mode needed for a defensible comparison.' },
    ],
    limitations: [
      'WP Flame does not measure browser rendering or the user’s network connection.',
      'A trace starts at the earliest WP Flame bootstrap point available, not at the web server’s absolute request start.',
      'Standard mode cannot promise database detail on every custom database layer.',
      'The largest measured contributor is evidence for the next investigation, not automatic proof of the definitive root cause.',
    ],
    handoff: [
      'The exact admin action and affected role.',
      'A redacted trace or report with capability and completeness information.',
      'The measured contributor, supporting samples, and confidence.',
      'The proposed change and instructions for repeating the same workflow.',
    ],
    related: ['plugin-regression', 'external-api', 'client-performance-report'],
  },
  {
    slug: 'woocommerce-checkout',
    title: 'Diagnose slow WooCommerce checkout',
    metaTitle: 'Diagnose Slow WooCommerce Checkout Requests — WP Flame',
    description: 'Investigate dynamic WooCommerce checkout work with bounded request evidence, explicit limitations, and a before-and-after verification plan.',
    eyebrow: 'Use case · WooCommerce',
    hero: 'Inspect the dynamic checkout work a page cache cannot bypass.',
    problem: 'Cart and checkout requests can combine session work, database queries, payment or shipping APIs, plugin callbacks, and theme rendering. A public homepage score is a poor proxy for this revenue-critical authenticated workflow.',
    whyTypicalToolsMissIt: 'Cache plugins are valuable for eligible public pages, and generic APM can provide broader infrastructure visibility. The intended WP Flame role is narrower: attribute supported WordPress spans in a controlled checkout reproduction and preserve the evidence for verification or handoff.',
    capturePlan: [
      'Use a staging or explicitly authorized test order flow whenever possible.',
      'Define the exact step: cart update, checkout load, shipping refresh, payment-method refresh, or order submission.',
      'Avoid capturing real customer identifiers or payment data; use test accounts and redaction-safe values.',
      'Capture a bounded Standard trace and confirm HTTP and database capability status before drawing conclusions.',
      'Compare compatible samples after changing one plugin, setting, API behavior, or query path.',
    ],
    evidence: [
      { title: 'WordPress HTTP activity', body: 'Supported outbound WordPress HTTP API calls, including bounded host, method, status, error, and measured duration where captured.' },
      { title: 'Database evidence', body: 'Compatible query fingerprints, repetition, duration, and best-supported WordPress ownership when database capture succeeds.' },
      { title: 'Workflow comparison', body: 'Compatible baseline and after cohorts using the same checkout step, mode, route, capabilities, and relevant environment.' },
    ],
    limitations: [
      'WP Flame does not measure the customer’s full browser experience or Core Web Vitals.',
      'It does not observe requests served without executing PHP.',
      'It does not automatically disable extensions, rewrite checkout code, or change payment settings.',
      'External calls made outside supported WordPress instrumentation may not appear.',
    ],
    handoff: [
      'Test environment and synthetic checkout scenario.',
      'Affected checkout step and normalized request identity.',
      'Redacted query or external-service evidence.',
      'Before/after sample counts and any environment changes between cohorts.',
    ],
    related: ['external-api', 'plugin-regression', 'client-performance-report'],
  },
  {
    slug: 'external-api',
    title: 'Find external APIs slowing WordPress',
    metaTitle: 'Find Supported External API Calls Slowing WordPress — WP Flame',
    description: 'A focused workflow for identifying slow or failed WordPress HTTP API calls and preparing useful vendor or developer evidence.',
    eyebrow: 'Use case · External services',
    hero: 'Separate time spent inside WordPress from supported outbound HTTP waits.',
    problem: 'Licensing, payments, shipping, CRM, search, email, media, and other integrations can place remote calls on a request path. When an external service is slow or called too often, the symptom can look like a generally slow plugin or host.',
    whyTypicalToolsMissIt: 'Server logs and generic APM may provide deeper network or infrastructure context. WP Flame’s intended contribution is WordPress-specific request context: where a supported WordPress HTTP call occurred, the best-supported owner, and how it relates to the observed request timeline.',
    capturePlan: [
      'Reproduce one route where the delay is observable and note whether it is intermittent.',
      'Use conservative redaction; do not capture authorization headers, secrets, or full sensitive URLs.',
      'Confirm the HTTP capability was captured and whether the trace is complete enough for the conclusion.',
      'Look for slow, repeated, failed, or early-phase calls rather than assuming every remote call is harmful.',
      'Verify any scheduling, caching, timeout, or integration change using the same workflow.',
    ],
    evidence: [
      { title: 'Bounded request metadata', body: 'Host, method, status or error, duration, and source context where the supported instrumentor provides them.' },
      { title: 'Placement in the request', body: 'Whether the call was observed during early lifecycle, rendering, shutdown, or another supported phase.' },
      { title: 'Repetition across samples', body: 'Evidence that distinguishes a one-off network event from a recurring workflow pattern.' },
    ],
    limitations: [
      'WP Flame does not inspect arbitrary network calls made outside the WordPress HTTP API instrumentation path.',
      'It cannot prove whether delay originates in DNS, transport, the remote service, or local contention without additional evidence.',
      'Sensitive request and response bodies should remain excluded by default.',
      'A remote service appearing in a slow trace does not by itself establish fault.',
    ],
    handoff: [
      'Redacted host and operation context.',
      'Status/error, measured duration, frequency, and request phase.',
      'Owning plugin or theme evidence where available.',
      'A reproducible timestamped workflow for the vendor or developer.',
    ],
    related: ['woocommerce-checkout', 'rest-ajax', 'slow-wp-admin'],
  },
  {
    slug: 'plugin-regression',
    title: 'Investigate a plugin-update regression',
    metaTitle: 'Investigate a WordPress Plugin Update Regression — WP Flame',
    description: 'Build a compatible baseline and after comparison around a suspected WordPress plugin regression without overstating causation.',
    eyebrow: 'Use case · Change investigation',
    hero: 'Replace “the update made it slow” with a controlled comparison.',
    problem: 'A slowdown noticed after a plugin, theme, core, configuration, or deployment change is correlated with that change, but correlation is not enough to name the cause. Environment drift and incompatible request samples can easily create a false conclusion.',
    whyTypicalToolsMissIt: 'A single before screenshot and a single after screenshot are not a verification workflow. WP Flame’s intended v1 comparison requires compatible route, request type, mode, capability set, score version, and relevant environment context before it labels an improvement verified.',
    capturePlan: [
      'Choose one deterministic workflow affected by the suspected regression.',
      'Capture a compatible baseline cohort before changing the environment when that is still possible.',
      'Record WordPress, PHP, plugin, theme, and relevant configuration versions.',
      'Change one variable and repeat the same bounded capture policy.',
      'Treat small or incompatible cohorts as directional evidence, not proof.',
    ],
    evidence: [
      { title: 'Environment snapshots', body: 'Versioned context that makes hidden plugin, theme, WordPress, PHP, or configuration drift visible.' },
      { title: 'Comparable distributions', body: 'Sample count, p50, and appropriate distribution evidence rather than a single convenient request.' },
      { title: 'Contributor movement', body: 'Which measured source, query, callback, HTTP call, or lifecycle phase changed between compatible cohorts.' },
    ],
    limitations: [
      'The public comparison workflow is not release-ready until its roadmap acceptance gate passes.',
      'A single baseline and after request must not be described as verified improvement.',
      'Unobserved work remains unknown, and capability differences can invalidate a comparison.',
      'WP Flame does not roll back updates or modify the site automatically.',
    ],
    handoff: [
      'Exact versions and change timestamp.',
      'Compatible baseline and after cohort definitions.',
      'Measured contributor changes and confidence.',
      'Rollback or remediation result, followed by a repeated verification capture.',
    ],
    related: ['slow-wp-admin', 'woocommerce-checkout', 'client-performance-report'],
  },
  {
    slug: 'rest-ajax',
    title: 'Diagnose REST and AJAX latency',
    metaTitle: 'Diagnose WordPress REST and AJAX Latency — WP Flame',
    description: 'Trace a named REST or AJAX operation using normalized request identity, capability reporting, and bounded server-side evidence.',
    eyebrow: 'Use case · REST and AJAX',
    hero: 'Give background and interactive requests a useful WordPress identity.',
    problem: 'REST and admin-ajax requests power editors, filters, search, dashboards, carts, integrations, and headless applications. Their generic URLs can hide very different operations unless the route or action is normalized.',
    whyTypicalToolsMissIt: 'Browser tooling shows the client-visible wait and generic APM can show broader backend execution. The intended WP Flame workflow adds WordPress route/action context and supported ownership so repeated operations can be grouped without mixing unrelated request populations.',
    capturePlan: [
      'Name the REST route or AJAX action and the user-visible behavior that triggers it.',
      'Use a test account and redact request values that may include personal data.',
      'Capture a bounded set of the same operation and confirm its normalized identity.',
      'Inspect supported database, callback, and HTTP evidence only where the capability report permits.',
      'Repeat the same operation after one change and reject incompatible samples.',
    ],
    evidence: [
      { title: 'Normalized operation', body: 'A route or action key that separates this request population from unrelated REST and AJAX traffic.' },
      { title: 'Server-side contributors', body: 'Supported lifecycle, plugin, theme, database, callback, and external-service work observed for the operation.' },
      { title: 'Failure context', body: 'HTTP status, incomplete-trace reasons, and instrumentor failures that affect interpretation.' },
    ],
    limitations: [
      'WP Flame does not measure frontend state updates, JavaScript rendering, or client network quality.',
      'Authentication and sensitive parameters must not be placed in shared reports.',
      'Different REST routes or AJAX actions must not be combined into one performance conclusion.',
      'Supported GraphQL operations remain a separate compatibility gate.',
    ],
    handoff: [
      'Route/action and reproduction steps.',
      'Authentication context without credentials.',
      'Redacted trace evidence and capability report.',
      'Compatible sample definition for verifying the proposed fix.',
    ],
    related: ['external-api', 'cron-action-scheduler', 'plugin-regression'],
  },
  {
    slug: 'cron-action-scheduler',
    title: 'Diagnose cron and Action Scheduler work',
    metaTitle: 'Diagnose WordPress Cron and Action Scheduler Performance — WP Flame',
    description: 'Investigate supported background WordPress work without mixing it into frontend performance conclusions.',
    eyebrow: 'Use case · Background work',
    hero: 'Treat background jobs as their own request population.',
    problem: 'Cron and Action Scheduler workloads can delay queues, hold locks, call remote services, or consume resources without appearing as a normal page request. They need their own identity, capture policy, and safety limits.',
    whyTypicalToolsMissIt: 'Host-level metrics are often the best view of total resource pressure. WP Flame’s narrower intended role is to expose supported WordPress spans inside a specific eligible job and retain evidence that can be handed to the owning plugin developer.',
    capturePlan: [
      'Identify the hook, action, queue, or CLI invocation and confirm it is safe to reproduce.',
      'Avoid running destructive or customer-facing jobs solely for profiling.',
      'Use a bounded capture with a clear expiry and keep Deep diagnostics one-shot.',
      'Separate cron, CLI, and frontend request populations in every conclusion.',
      'Verify batching, scheduling, query, or external-call changes with the same job type and data scale.',
    ],
    evidence: [
      { title: 'Job identity', body: 'Supported cron, CLI, or Action Scheduler context rather than a generic background-request label.' },
      { title: 'Measured work', body: 'Supported callbacks, queries, HTTP calls, lifecycle activity, and ownership within the captured job.' },
      { title: 'Operational bounds', body: 'Capture expiry, dropped spans, trace truncation, and persistence state needed to judge whether evidence is complete.' },
    ],
    limitations: [
      'WP Flame is not a queue manager and does not retry, cancel, or reschedule jobs automatically.',
      'It does not replace host CPU, memory, process, database-server, or queue telemetry.',
      'Long-running or high-volume jobs require conservative capture and storage limits.',
      'An observed callback may own measured time without being the only source of system pressure.',
    ],
    handoff: [
      'Hook/action name and scheduled frequency.',
      'Data volume and environment context.',
      'Supported measured contributors and failure state.',
      'A safe, repeatable verification job.',
    ],
    related: ['external-api', 'rest-ajax', 'plugin-regression'],
  },
  {
    slug: 'client-performance-report',
    title: 'Create a client performance report',
    metaTitle: 'Create Defensible WordPress Client Performance Evidence — WP Flame',
    description: 'Turn a vague performance complaint into a redacted, capability-aware handoff without presenting weak evidence as certainty.',
    eyebrow: 'Use case · Agency evidence',
    hero: 'Explain what was measured, what was not, and what should happen next.',
    problem: 'Clients need an understandable reason to approve work, while developers need enough technical evidence to act. A wall of raw spans or an unsupported “performance score” serves neither audience.',
    whyTypicalToolsMissIt: 'Developer tools can provide excellent technical detail and monitoring platforms can provide broader operations reporting. WP Flame’s intended agency workflow is a local-first bridge: plain-language opportunities linked to redacted supporting evidence and compatible before/after verification.',
    capturePlan: [
      'Obtain written authorization for every client production site and separate consent for trace review or case-study use.',
      'Define the client-visible workflow and a concrete success criterion.',
      'Capture conservatively and review the capability/completeness report before writing conclusions.',
      'Separate measured impact from estimated business impact; do not promise revenue, SEO, or conversion gains.',
      'Export only redacted evidence and repeat compatible samples after the work.',
    ],
    evidence: [
      { title: 'Executive summary', body: 'The affected workflow, largest supported measured opportunity, confidence, and recommended next action.' },
      { title: 'Technical appendix', body: 'Capability report, sample definition, supporting spans, ownership, and known limitations.' },
      { title: 'Verification section', body: 'Compatible baseline and after cohorts, environment changes, sample counts, and a cautious conclusion.' },
    ],
    limitations: [
      'Client-ready and white-label reporting remain hypotheses until design-partner evidence validates their value.',
      'A report must not turn an unavailable capability into a zero or a passing score.',
      'Trace data may contain personal or commercially sensitive context and must be redacted before sharing.',
      'WP Flame evidence does not replace a broader security, capacity, frontend, or infrastructure assessment.',
    ],
    handoff: [
      'Problem statement and agreed workflow.',
      'Measured contributor with confidence and limitations.',
      'Action owner, expected technical effect, and risk.',
      'Verification method and client-safe before/after conclusion.',
    ],
    related: ['slow-wp-admin', 'woocommerce-checkout', 'plugin-regression'],
  },
];

export const useCaseBySlug = new Map(useCases.map((useCase) => [useCase.slug, useCase]));
