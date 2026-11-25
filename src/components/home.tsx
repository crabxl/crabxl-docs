import { Card, Cards } from 'fumadocs-ui/components/card';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { DefaultNotFound } from 'fumadocs-ui/layouts/home/not-found';
import { Provider, type ProviderProps } from '@/components/provider';
import { languageIcons } from '@/components/language-icons';
import { baseOptions } from '@/lib/layout.shared';

/** The React island of pages in the home layout. The content is passed as children. */
export function Home({ children, ...props }: ProviderProps) {
  return (
    <Provider {...props}>
      <HomeLayout {...baseOptions()}>{children}</HomeLayout>
    </Provider>
  );
}

export function NotFound(props: ProviderProps) {
  return (
    <Home {...props}>
      <DefaultNotFound />
    </Home>
  );
}

export interface LinkItem {
  title: string;
  description: string;
  href: string;
  id?: string;
}

/** The home page: one card per language, then the references outside this site. */
export function HomePage({
  languages,
  resources,
  ...props
}: ProviderProps & { languages: LinkItem[]; resources: LinkItem[] }) {
  return (
    <Home {...props}>
      <main className="mx-auto w-full max-w-(--fd-layout-width) px-4 py-16 md:px-6 md:py-24">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">CrabXL documentation</h1>
        <p className="mt-4 max-w-2xl text-lg text-fd-muted-foreground">
          Guides for the CrabXL XLSX library in Python and Rust.
        </p>

        <h2 className="mt-12 mb-4 text-xl font-semibold">Languages</h2>
        <Cards>
          {languages.map((item) => (
            <Card
              key={item.href}
              icon={item.id ? languageIcons[item.id] : undefined}
              title={item.title}
              description={item.description}
              href={item.href}
            />
          ))}
        </Cards>

        <h2 className="mt-12 mb-4 text-xl font-semibold">References</h2>
        <Cards>
          {resources.map((item) => (
            <Card key={item.href} {...item} external />
          ))}
        </Cards>
      </main>
    </Home>
  );
}
