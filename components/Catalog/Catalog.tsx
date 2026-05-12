import React from 'react';
import CarList from '../CarList/CarList';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { getCars } from '@/lib/api/api';

const Catalog = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['cars'],
    queryFn: getCars,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarList />
    </HydrationBoundary>
  );
};

export default Catalog;
