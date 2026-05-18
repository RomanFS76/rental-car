import './globals.css';
import { Manrope } from 'next/font/google';
import type { Metadata } from 'next';
import 'modern-normalize/modern-normalize.css';

import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '../components/Header/Header';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  metadataBase: new URL('https://rental-car-one-xi.vercel.app'),
  title: 'Rental Cars',
  description: 'Find and rent premium cars quickly and easily.',

  openGraph: {
    title: 'Rental Cars',
    description: 'Find and rent premium cars quickly and easily.',
    url: 'https://rental-car-one-xi.vercel.app',
    siteName: 'Rental Cars',
    images: [
      {
        url: '/img/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Rental Cars',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Rental Cars',
    description: 'Find and rent premium cars quickly and easily.',
    images: ['/img/hero.webp'],
  },
};

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.variable}`}>
        <TanStackProvider>
          <Header />
          {children}
        </TanStackProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
