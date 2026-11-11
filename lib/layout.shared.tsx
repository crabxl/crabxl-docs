import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { CrabMark } from '@/components/crab-mark';
import { gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <CrabMark className="size-6 text-[#d2432c] dark:text-[#f0654c]" />
          <span className="font-semibold">
            Crab<span className="text-[#d2432c] dark:text-[#f0654c]">XL</span>
          </span>
        </>
      ),
    },
    links: [
      { text: 'Rust', url: '/docs/rust', active: 'nested-url' },
      { text: 'Python', url: '/docs/python', active: 'nested-url' },
      { text: 'crabxl.com', url: 'https://crabxl.com', external: true },
    ],
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
