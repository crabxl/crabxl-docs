// Copy content/docs to .content/docs in the form that Fumadocs on Astro reads.
//
// Fumadocs on Astro processes only .mdx files, and it does not resolve links to
// other files. The source repositories write plain .md pages that link to each
// other by file name (CONTENT-SPEC.md). This script renames .md to .mdx and
// changes each relative link to a page into the URL of that page. The checker
// runs on content/docs, so the sources keep their own form.
//
// Usage: node scripts/prepare-content.mjs
import {
  cpSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const from = path.join(root, 'content', 'docs');
const to = path.join(root, '.content', 'docs');

/** The URL of a page file, relative to the docs folder: python/index.md -> /docs/python */
export function pageUrl(relative) {
  const parts = relative.replace(/\.mdx?$/, '').split('/');
  if (parts.at(-1) === 'index') parts.pop();
  return ['/docs', ...parts].join('/');
}

/** Rewrite the relative page links of one page. `file` is relative to the docs folder. */
export function rewriteLinks(text, file) {
  const dir = path.posix.dirname(file);
  const resolve = (target) => {
    const match = /^([^#?\s]+\.mdx?)(#[^\s]*)?$/.exec(target);
    if (!match || /^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith('/')) return target;
    const joined = path.posix.normalize(path.posix.join(dir, match[1]));
    if (joined.startsWith('..')) return target;
    return pageUrl(joined) + (match[2] ?? '');
  };
  let fenced = false;
  return text
    .split('\n')
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
      if (fenced) return line;
      return line
        .replace(
          /\]\(([^)\s]+)((?:\s+"[^"]*")?)\)/g,
          (_, target, title) => `](${resolve(target)}${title})`,
        )
        .replace(/^(\s*\[[^\]]+\]:\s*)(\S+)/, (_, head, target) => head + resolve(target));
    })
    .join('\n');
}

function walk(folder) {
  return readdirSync(folder).flatMap((name) => {
    const full = path.join(folder, name);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  rmSync(to, { recursive: true, force: true });
  cpSync(from, to, { recursive: true });
  let pages = 0;
  for (const full of walk(to)) {
    if (!/\.mdx?$/.test(full)) continue;
    const relative = path.relative(to, full).replaceAll(path.sep, '/');
    writeFileSync(full, rewriteLinks(readFileSync(full, 'utf8'), relative));
    if (full.endsWith('.md')) renameSync(full, `${full}x`);
    pages++;
  }
  console.log(`Prepared ${pages} pages in .content/docs`);
}
