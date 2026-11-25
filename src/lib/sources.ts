import { existsSync } from 'node:fs';
import manifest from '../../sources.json';
import { gitConfig } from './shared';

export interface DocsSource {
  id: string;
  title: string;
  description?: string;
  repository: string;
  ref: string;
  path: string;
}

export const sources: DocsSource[] = manifest.sources;

/**
 * GitHub URL of the file that a page comes from. `pagePath` is relative to the
 * docs folder. The site reads .mdx copies, so find the extension of the source file.
 */
export function getEditUrl(pagePath: string): string {
  const md = pagePath.replace(/\.mdx$/, '.md');
  const file = existsSync(`content/docs/${md}`) ? md : pagePath;
  const [first, ...rest] = file.split('/');
  const source = sources.find((item) => item.id === first);
  if (source && rest.length > 0) {
    return `https://github.com/${source.repository}/blob/${source.ref}/${source.path}/${rest.join('/')}`;
  }
  return `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${file}`;
}
