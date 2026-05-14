import css from './PageCatalog.module.css';
import type { Metadata } from 'next';
import Catalog from '@/components/Catalog/Catalog';
import FormFilter from '@/components/Form/FormFilter/FormFilter';

export const metadata: Metadata = {
  title: 'Catalog | Rental Cars',
  description:
    'Browse available rental cars and filter by brand, price, and mileage.',

  openGraph: {
    title: 'Catalog | Rental Cars',
    description:
      'Browse available rental cars and filter by brand, price, and mileage.',
    url: 'https://rental-car-one-xi.vercel.app/catalog',
    siteName: 'Rental Cars',
    images: [
      {
        url: '/img/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Rental Cars Catalog',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Catalog | Rental Cars',
    description:
      'Browse available rental cars and filter by brand, price, and mileage.',
    images: ['/og-catalog.jpg'],
  },
};

type PropsPageCatalog = {
  searchParams: Promise<{
    brand?: string;
    rentalPrice?: string;
    minMileage?: string;
    maxMileage?: string;
  }>;
};

const PageCatalog = ({ searchParams }: PropsPageCatalog) => {
  return (
    <div className={`container ${css.page}`}>
      <FormFilter />
      <Catalog searchParams={searchParams} />
    </div>
  );
};

export default PageCatalog;
