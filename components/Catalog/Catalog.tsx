import React from 'react';
import CarList from '../CarList/CarList';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getCars } from '@/lib/api/api';

type PropsCatalog = {
  searchParams: Promise<{
    brand?: string;
    rentalPrice?: string;
    minMileage?: string;
    maxMileage?: string;
  }>;
};

const Catalog = async ({ searchParams }: PropsCatalog) => {
  const params = await searchParams;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['cars', params],
    queryFn: () => getCars(params),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
     <CarList params={params} />
    </HydrationBoundary>
  );
};

export default Catalog;
