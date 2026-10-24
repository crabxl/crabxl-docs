import Link from 'next/link';
import { sources } from '@/lib/sources';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <h1 className="text-4xl font-bold">CrabXL</h1>
      <p className="max-w-xl text-fd-muted-foreground">XLSX library for Rust and Python.</p>
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
    </main>
  );
}
