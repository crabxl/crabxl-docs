import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const contentDir = path.join(root, 'content', 'docs');

/** Read and validate sources.json. */
export function readSources() {
  const { sources } = JSON.parse(readFileSync(path.join(root, 'sources.json'), 'utf8'));
  const ids = new Set();
  for (const source of sources) {
    for (const key of ['id', 'title', 'repository', 'ref', 'path']) {
      if (typeof source[key] !== 'string' || source[key] === '') {
        throw new Error(`sources.json: "${key}" is missing in ${JSON.stringify(source)}`);
      }
    }
    if (!/^[a-z][a-z0-9-]*$/.test(source.id)) throw new Error(`sources.json: invalid id "${source.id}"`);
    if (ids.has(source.id)) throw new Error(`sources.json: duplicate id "${source.id}"`);
    ids.add(source.id);
  }
  return sources;
}
