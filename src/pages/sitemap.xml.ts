import type { APIRoute } from 'astro';
import { source } from '@/lib/source';
import { siteUrl } from '@/lib/shared';

export const prerender = true;

export const GET: APIRoute = () => {
  const urls = ['/', ...source.getPages().map((page) => page.url)]
    .map((url) => `  <url><loc>${new URL(url, siteUrl).href}</loc></url>`)
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
};
