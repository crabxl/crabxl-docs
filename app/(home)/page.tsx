import Link from 'next/link';
import { sources } from '@/lib/sources';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <h1 className="text-4xl font-bold">CrabXL</h1>
      <p className="max-w-xl text-fd-muted-foreground">
        Read, write and edit XLSX files. The Rust core does the work. Each language package uses the
        same core.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {sources.map((source) => (
          <Link
            key={source.id}
            href={`/docs/${source.id}`}
            className="rounded-lg border bg-fd-card px-5 py-3 font-medium transition-colors hover:bg-fd-accent"
          >
            {source.title}
          </Link>
        ))}
      </div>
      <Link href="/docs" className="text-sm underline">
        Read the documentation
      </Link>
    </main>
  );
}
