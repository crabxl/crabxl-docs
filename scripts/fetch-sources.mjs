// Copy the docs/ folder of each repository in sources.json to content/docs/<id>.
//
// Usage:
//   node scripts/fetch-sources.mjs                    fetch all sources from GitHub
//   node scripts/fetch-sources.mjs --local rust=../crabxl/docs
//                                                     use a local folder for one source
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { contentDir, readSources } from './sources.mjs';

const local = new Map();
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] !== '--local') throw new Error(`Unknown argument: ${args[i]}`);
  const [id, folder] = (args[++i] ?? '').split('=');
  if (!id || !folder) throw new Error('Use --local <id>=<folder>');
  local.set(id, path.resolve(folder));
}

const sources = readSources();
for (const id of local.keys()) {
  if (!sources.some((source) => source.id === id)) throw new Error(`Unknown source id: ${id}`);
}

const revisions = {};
for (const source of sources) {
  const target = path.join(contentDir, source.id);
  rmSync(target, { recursive: true, force: true });

  if (local.has(source.id)) {
    const folder = local.get(source.id);
    if (!existsSync(folder)) throw new Error(`${source.id}: ${folder} does not exist`);
    cpSync(folder, target, { recursive: true });
    revisions[source.id] = { ...source, revision: 'local' };
  } else {
    const checkout = mkdtempSync(path.join(tmpdir(), `crabxl-docs-${source.id}-`));
    const url = `https://github.com/${source.repository}.git`;
    const git = (...gitArgs) => execFileSync('git', gitArgs, { cwd: checkout, stdio: ['ignore', 'pipe', 'inherit'] }).toString().trim();
    try {
      git('init', '--quiet');
      git('remote', 'add', 'origin', url);
      git('sparse-checkout', 'set', '--no-cone', `/${source.path}/`);
      git('fetch', '--quiet', '--depth=1', '--filter=blob:none', 'origin', source.ref);
      git('checkout', '--quiet', 'FETCH_HEAD');
      const folder = path.join(checkout, source.path);
      if (!existsSync(folder)) throw new Error(`${source.id}: ${source.path}/ does not exist in ${source.repository}@${source.ref}`);
      cpSync(folder, target, { recursive: true });
      revisions[source.id] = { ...source, revision: git('rev-parse', 'HEAD') };
    } finally {
      rmSync(checkout, { recursive: true, force: true });
    }
  }

  // Each source is a sidebar tab. The site owns the tab title and icon.
  const metaPath = path.join(target, 'meta.json');
  if (!existsSync(metaPath)) throw new Error(`${source.id}: meta.json is missing`);
  const meta = JSON.parse(readFileSync(metaPath, 'utf8'));
  writeFileSync(
    metaPath,
    JSON.stringify({ ...meta, title: source.title, description: source.description, root: true }, null, 2) + '\n',
  );
  console.log(`${source.id}: ${source.repository}@${revisions[source.id].revision}`);
}
