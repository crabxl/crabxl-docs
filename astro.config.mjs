// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import fumadocs from '@fumadocs/astro';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://docs.crabxl.com',
  // Cloudflare Pages serves this folder
  outDir: './out',
  // docs/python.html, so /docs/python answers without a redirect, as before
  build: { format: 'file' },
  trailingSlash: 'never',
  integrations: [
    fumadocs({
      components: './src/components/mdx.tsx',
      includeProcessedMarkdown: true,
      // scripts/prepare-content.mjs writes this folder from content/docs
      collections: { docs: { dir: '.content/docs' } },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
