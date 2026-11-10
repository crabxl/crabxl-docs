import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  const options = baseOptions();
  // The sidebar dropdown already switches between Rust and Python.
  const links = options.links?.filter((link) => !('url' in link && link.url?.startsWith('/docs/')));
  return (
    <DocsLayout tree={source.getPageTree()} {...options} links={links}>
      {children}
    </DocsLayout>
  );
}
