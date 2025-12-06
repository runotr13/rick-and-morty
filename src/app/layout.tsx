import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { RootProviders } from './root-providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rick & Morty Characters',
  description: 'SSR + React Query + Zustand + nuqs demo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
