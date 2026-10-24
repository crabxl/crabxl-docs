import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      // JSX supported
      title: appName,
    },
    links: [
      { text: 'Rust', url: '/docs/rust', active: 'nested-url' },
      { text: 'Python', url: '/docs/python', active: 'nested-url' },
      { text: 'crabxl.com', url: 'https://crabxl.com', external: true },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
