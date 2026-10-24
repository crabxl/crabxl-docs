import manifest from '@/sources.json';
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

/** GitHub URL of the file that a page comes from. `pagePath` is relative to content/docs. */
export function getEditUrl(pagePath: string): string {
  const [first, ...rest] = pagePath.split('/');
  const source = sources.find((item) => item.id === first);
  if (source && rest.length > 0) {
    return `https://github.com/${source.repository}/blob/${source.ref}/${source.path}/${rest.join('/')}`;
  }
  return `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${pagePath}`;
}
