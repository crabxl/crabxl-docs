import { defineConfig } from 'vite-plus';

export default defineConfig({
  fmt: {
    singleQuote: true,
    ignorePatterns: [
      'content/**',
      '.content/**',
      'out/**',
      '.astro/**',
      '.codegraph/**',
      'pnpm-lock.yaml',
    ],
  },
  lint: {
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    ignorePatterns: ['content/**', '.content/**', 'out/**', '.astro/**'],
    options: { typeAware: true, typeCheck: true },
  },
});
