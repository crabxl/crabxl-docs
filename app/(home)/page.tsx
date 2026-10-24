import Link from 'next/link';
import { Card, Cards } from 'fumadocs-ui/components/card';
import { BookOpenIcon, GlobeIcon, HistoryIcon, PackageIcon } from 'lucide-react';
import { source } from '@/lib/source';
import { sources } from '@/lib/sources';

const resources = [
  {
    title: 'Rust API reference',
    description: 'Types and functions of the crabxl crate on docs.rs.',
    href: 'https://docs.rs/crabxl',
    icon: <BookOpenIcon />,
  },
  {
    title: 'Rust changelog',
    description: 'Changes in each release of the crabxl crate.',
    href: 'https://github.com/crabxl/crabxl/blob/main/CHANGELOG.md',
    icon: <HistoryIcon />,
  },
  {
    title: 'Python changelog',
    description: 'Changes in each release of the crabxl package.',
    href: 'https://github.com/crabxl/crabxl-python/blob/main/CHANGELOG.md',
    icon: <HistoryIcon />,
  },
  {
    title: 'crabxl.com',
    description: 'Installation, features and benchmarks.',
    href: 'https://crabxl.com',
    icon: <GlobeIcon />,
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-(--fd-layout-width) px-4 py-16 md:px-6 md:py-24">
      <section className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">CrabXL documentation</h1>
        <p className="mt-4 text-lg text-fd-muted-foreground">
          Guides for the CrabXL XLSX library in Rust and Python.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">Languages</h2>
        <Cards>
          {sources.map((item) => (
            <Card
              key={item.id}
              icon={<PackageIcon />}
              title={item.title}
              description={source.getPage([item.id])?.data.description ?? item.description}
              href={`/docs/${item.id}`}
            />
          ))}
        </Cards>
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-semibold">Resources</h2>
        <Cards>
          {resources.map((item) => (
            <Card key={item.href} {...item} external />
          ))}
        </Cards>
      </section>
    </main>
  );
}
