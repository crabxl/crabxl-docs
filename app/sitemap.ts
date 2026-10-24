import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export const dynamic = 'force-static';

const siteUrl = process.env.SITE_URL ?? 'http://localhost:3000';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['/', ...source.getPages().map((page) => page.url)];
  return pages.map((url) => ({ url: new URL(url, siteUrl).href }));
}
