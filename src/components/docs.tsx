import { type SerializedPageTree, useFumadocsLoader } from 'fumadocs-core/source/client';
import type { TOCItemType } from 'fumadocs-core/toc';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import {
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from 'fumadocs-ui/layouts/docs/page';
import { Provider, type ProviderProps } from '@/components/provider';
import { baseOptions } from '@/lib/layout.shared';

export interface DocsProps extends ProviderProps {
  tree: SerializedPageTree;
  title: string;
  description?: string;
  toc: TOCItemType[];
  full?: boolean;
  markdownUrl: string;
  githubUrl: string;
}

/** The React island of docs pages. The page content is passed as children. */
export function Docs({
  tree,
  title,
  description,
  toc,
  full,
  markdownUrl,
  githubUrl,
  children,
  ...props
}: DocsProps) {
  const data = useFumadocsLoader({ tree });
  const options = baseOptions();
  // The sidebar dropdown already switches between Python and Rust.
  const links = options.links?.filter((link) => !('url' in link && link.url?.startsWith('/docs/')));

  return (
    <Provider {...props}>
      <DocsLayout {...options} links={links} tree={data.tree}>
        <DocsPage toc={toc} full={full}>
          <DocsTitle>{title}</DocsTitle>
          <DocsDescription className="mb-0">{description}</DocsDescription>
          <div className="flex flex-row items-center gap-2 border-b pb-6">
            <MarkdownCopyButton markdownUrl={markdownUrl} />
            <ViewOptionsPopover markdownUrl={markdownUrl} githubUrl={githubUrl} />
          </div>
          {children}
        </DocsPage>
      </DocsLayout>
    </Provider>
  );
}
