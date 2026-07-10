import { access, readdir, readFile } from 'node:fs/promises';
import { dirname, join, normalize, relative } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const dist = join(root, 'dist');

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
const failures = [];

const existing = new Set(files.map((file) => normalize(file)));
const idsByFile = new Map();

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  idsByFile.set(file, new Set([...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1])));
}

function routeCandidates(pathname) {
  const clean = pathname.replace(/^\//, '');
  if (!clean) return [join(dist, 'index.html')];
  if (/\.[a-z0-9]+$/i.test(clean)) return [join(dist, clean)];
  return [join(dist, clean, 'index.html'), join(dist, `${clean}.html`)];
}

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const hrefs = [...html.matchAll(/\shref=["']([^"']+)["']/g)].map((match) => match[1]);

  for (const href of hrefs) {
    if (!href || href === '#') {
      failures.push(`${relative(root, file)} contains an empty or # link`);
      continue;
    }
    if (/^(?:https?:|mailto:|tel:|data:)/i.test(href)) continue;

    const [rawPath, fragment] = href.split('#');
    let targetFile = file;

    if (rawPath) {
      const pathname = rawPath.startsWith('/')
        ? rawPath
        : `/${relative(dist, normalize(join(dirname(file), rawPath)))}`;
      const candidates = routeCandidates(pathname.split('?')[0]);
      targetFile = candidates.find((candidate) => existing.has(normalize(candidate)));
      if (!targetFile) {
        failures.push(`${relative(root, file)} links to missing ${href}`);
        continue;
      }
    }

    if (fragment && htmlFiles.includes(targetFile) && !idsByFile.get(targetFile)?.has(decodeURIComponent(fragment))) {
      failures.push(`${relative(root, file)} links to missing fragment ${href}`);
    }
  }
}

try {
  await access(join(dist, 'sitemap-index.xml'));
} catch {
  failures.push('dist/sitemap-index.xml was not generated');
}

if (failures.length > 0) {
  console.error('Built link guard failed:\n');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  console.log(`Built link guard passed across ${htmlFiles.length} HTML files.`);
}
