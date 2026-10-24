// Check a documentation folder against the content specification (CONTENT-SPEC.md).
//
// Usage: node scripts/check-content.mjs <folder> [<folder> ...]
// The script exits with status 1 if it finds a problem.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

// MDX components that every page can use. The site provides them.
export const allowedComponents = new Set([
  'Accordion',
  'Accordions',
  'Callout',
  'Card',
  'Cards',
  'File',
  'Files',
  'Folder',
  'Step',
  'Steps',
  'Tab',
  'Tabs',
]);
const pageExtensions = new Set(['.md', '.mdx']);
const assetExtensions = new Set(['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif']);
const namePattern = /^[a-z0-9][a-z0-9-]*$/;

const problems = [];
const report = (file, message) => problems.push(`${file}: ${message}`);

function walk(folder) {
  return readdirSync(folder).flatMap((name) => {
    const full = path.join(folder, name);
    return statSync(full).isDirectory() ? [full, ...walk(full)] : [full];
  });
}

function frontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(line);
    if (field) fields[field[1]] = field[2].replace(/^(['"])(.*)\1$/, '$2').trim();
  }
  return { fields, body: text.slice(match[0].length) };
}

function withoutCode(text) {
  return text.replace(/^(```|~~~)[\s\S]*?^\1/gm, '').replace(/`[^`\n]*`/g, '');
}

function resolvesToPage(folder, name) {
  return (
    existsSync(path.join(folder, `${name}.md`)) ||
    existsSync(path.join(folder, `${name}.mdx`)) ||
    existsSync(path.join(folder, name, 'meta.json')) ||
    existsSync(path.join(folder, name, 'index.md')) ||
    existsSync(path.join(folder, name, 'index.mdx'))
  );
}

function checkMeta(file, docsRoot) {
  let meta;
  try {
    meta = JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    report(file, `invalid JSON: ${error.message}`);
    return;
  }
  if (meta.root !== undefined && path.dirname(file) === docsRoot) {
    report(file, '"root" is set by the site. Remove it.');
  }
  if (meta.pages === undefined) return;
  if (!Array.isArray(meta.pages)) {
    report(file, '"pages" must be an array');
    return;
  }
  for (const entry of meta.pages) {
    if (typeof entry !== 'string') {
      report(file, `invalid entry in "pages": ${JSON.stringify(entry)}`);
      continue;
    }
    // Separators, links, rest markers and exclusions are Fumadocs syntax.
    if (/^(---.*---|\.\.\.|z\.\.\.a|!.*|\[.*\]\(.*\))$/.test(entry)) continue;
    if (!resolvesToPage(path.dirname(file), entry)) {
      report(file, `"pages" entry "${entry}" does not match a page or folder`);
    }
  }
}

function checkPage(file, docsRoot) {
  const text = readFileSync(file, 'utf8');
  const parsed = frontmatter(text);
  if (!parsed) {
    report(file, 'frontmatter is missing');
    return;
  }
  for (const key of ['title', 'description']) {
    if (!parsed.fields[key]) report(file, `frontmatter "${key}" is missing or empty`);
  }
  if (/^#\s/m.test(withoutCode(parsed.body))) {
    report(file, 'do not use a level-1 heading. The site shows the title.');
  }

  const body = withoutCode(parsed.body);
  for (const [, tag] of body.matchAll(/<([A-Z][A-Za-z0-9]*)/g)) {
    if (!allowedComponents.has(tag)) report(file, `component <${tag}> is not in the allowed list`);
  }
  if (path.extname(file) === '.md' && /<[A-Z]/.test(body)) {
    report(file, 'components need the .mdx extension');
  }
  if (/^\s*(import|export)\s/m.test(body)) {
    report(file, 'do not use import or export statements');
  }

  for (const [, rawTarget] of body.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    if (/^[a-z][a-z0-9+.-]*:/i.test(rawTarget) || rawTarget.startsWith('#')) continue;
    if (rawTarget.startsWith('/')) {
      report(file, `link "${rawTarget}" is absolute. Use a relative path or a full URL.`);
      continue;
    }
    const target = decodeURI(rawTarget.split('#')[0]);
    const resolved = path.resolve(path.dirname(file), target);
    if (path.relative(docsRoot, resolved).startsWith('..')) {
      report(file, `link "${rawTarget}" goes outside the docs folder. Use a full URL.`);
      continue;
    }
    const candidates = [resolved, `${resolved}.md`, `${resolved}.mdx`, path.join(resolved, 'index.md'), path.join(resolved, 'index.mdx')];
    if (!candidates.some((candidate) => existsSync(candidate))) {
      report(file, `link "${rawTarget}" does not resolve`);
    }
  }
}

export function checkFolder(folder) {
  const docsRoot = path.resolve(folder);
  if (!existsSync(docsRoot)) {
    report(folder, 'folder does not exist');
    return;
  }
  if (!existsSync(path.join(docsRoot, 'meta.json'))) report(folder, 'meta.json is missing');
  if (!existsSync(path.join(docsRoot, 'index.md')) && !existsSync(path.join(docsRoot, 'index.mdx'))) {
    report(folder, 'index.md or index.mdx is missing');
  }
  for (const file of walk(docsRoot)) {
    const name = path.basename(file);
    const extension = path.extname(name);
    const stem = name.slice(0, name.length - extension.length);
    if (statSync(file).isDirectory()) {
      if (!namePattern.test(name)) report(file, 'use lowercase letters, digits and hyphens in folder names');
      continue;
    }
    if (name === 'meta.json') {
      checkMeta(file, docsRoot);
    } else if (pageExtensions.has(extension)) {
      if (!namePattern.test(stem)) report(file, 'use lowercase letters, digits and hyphens in file names');
      checkPage(file, docsRoot);
    } else if (!assetExtensions.has(extension)) {
      report(file, `file type "${extension || name}" is not permitted`);
    }
  }
}

const folders = process.argv.slice(2);
if (folders.length === 0) {
  console.error('Usage: node scripts/check-content.mjs <folder> [<folder> ...]');
  process.exit(2);
}
for (const folder of folders) checkFolder(folder);
if (problems.length > 0) {
  console.error(problems.join('\n'));
  console.error(`\n${problems.length} problem(s) found.`);
  process.exit(1);
}
console.log(`Content check passed: ${folders.join(', ')}`);
