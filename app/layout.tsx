import { Inter } from 'next/font/google';
import { Provider } from '@/components/provider';
import type { Metadata } from 'next';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? 'http://localhost:3000'),
  title: { template: '%s | CrabXL', default: 'CrabXL' },
  description: 'Read, write and edit XLSX files with a Rust core.',
};

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
