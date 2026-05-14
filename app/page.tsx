import Button from '../components/shared/Button/Button';
import type { Metadata } from 'next';
import css from './page.module.css';
import Link from 'next/link';

export const metadata: Metadata = {
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

export default function Home() {
  return (
    <main className={css.main}>
      <section className={css.hero}>
        <div className={css.content}>
          <h1 className={css.title}>Find your perfect rental car</h1>

          <p className={css.text}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <Button as={Link} href="/catalog" size="md">
            View Catalog
          </Button>
        </div>
      </section>
    </main>
  );
}
