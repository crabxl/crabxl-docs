import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'CrabXL';
export const siteUrl = 'https://docs.crabxl.com';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';

export const gitConfig = {
  user: 'crabxl',
  repo: 'crabxl-docs',
  branch: 'main',
};

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.webp'];

  return { segments, url: getImageUrl(segments, page.locale) };
}
