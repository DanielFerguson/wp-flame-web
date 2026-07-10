import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const scanRoots = [join(root, 'src')];
const explicitFiles = [join(root, 'public', 'brand-kit.html')];
const extensions = new Set(['.astro', '.html', '.js', '.mjs', '.ts', '.tsx']);

const prohibited = [
  { label: 'dead placeholder link', pattern: /href\s*=\s*["']#["']/gi },
  { label: 'unsupported fixed overhead', pattern: /(?:under\s*5ms|<\s*5ms|zero overhead)/gi },
  { label: 'unsupported rating', pattern: /4\.9\s*\/\s*5/gi },
  { label: 'legacy AI pricing', pattern: /(?:AI insights? from|Ask Flame|\$29\s*\/\s*mo|\$79\s*\/\s*mo|\$199\s*\/\s*mo)/gi },
  { label: 'legacy full-profiler positioning', pattern: /(?:full APM|full request profiling|full profiler)/gi },
  { label: 'unsupported total capture claim', pattern: /every\s+(?:hook|callback|query|SQL query|plugin|function|millisecond|API call|operation)/gi },
  { label: 'unsupported automatic certainty', pattern: /(?:always identifies? the root cause|tells? you exactly what to fix)/gi },
  { label: 'unsupported compatibility breadth', pattern: /(?:works on every host|all major managed hosts|any other builder|all major WooCommerce payment gateways)/gi },
  { label: 'lifetime pricing promise', pattern: /(?:locked? in forever|pricing[^.\n]{0,30}forever)/gi },
  { label: 'client-side commerce secret pattern', pattern: /(?:lemonSqueezy\.apiKey|Authorization[`'":\s]+Bearer|audienceEndpoint)/gi },
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else if (extensions.has(extname(entry.name))) files.push(path);
  }

  return files;
}

const files = [
  ...(await Promise.all(scanRoots.map(walk))).flat(),
  ...explicitFiles,
];

const failures = [];

for (const file of files) {
  const contents = await readFile(file, 'utf8');
  const lines = contents.split('\n');

  for (const rule of prohibited) {
    rule.pattern.lastIndex = 0;
    let match;

    while ((match = rule.pattern.exec(contents)) !== null) {
      const line = contents.slice(0, match.index).split('\n').length;
      failures.push({
        file: relative(root, file),
        line,
        label: rule.label,
        excerpt: lines[line - 1]?.trim().slice(0, 180) ?? match[0],
      });

      if (match.index === rule.pattern.lastIndex) rule.pattern.lastIndex += 1;
    }
  }
}

if (failures.length > 0) {
  console.error('Commercial claim guard failed:\n');
  for (const failure of failures) {
    console.error(`- ${failure.file}:${failure.line} [${failure.label}] ${failure.excerpt}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Commercial claim guard passed across ${files.length} source files.`);
}
