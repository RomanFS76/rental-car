import React from 'react';
import CarList from '../CarList/CarList';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { CarsResponse, getCars } from '@/lib/api/api';

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

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['cars', params],
  
    queryFn: ({ pageParam }) =>
      getCars({
        ...params,
        page: Number(pageParam),
      }),
  
    initialPageParam: 1,
  
    getNextPageParam: (lastPage:CarsResponse) =>
      lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined
  },
);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
     <CarList params={params} />
    </HydrationBoundary>
  );
};

export default Catalog;
