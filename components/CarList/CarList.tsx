'use client';

import { getCars } from '@/lib/api/api';
import toast from 'react-hot-toast';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import css from './CarList.module.css';
import CarCard from '../CarCard/CarCard';
import Button from '../shared/Button/Button';
import { useEffect } from 'react';
import Loader from '../Loader/Loader';

type PropsCarList = {
  params: {
    brand?: string;
    price?: number;
    minMileage?: number;
    maxMileage?: number;
    perPage?: number;
    page?: number;
  };
};

const CarList = ({ params }: PropsCarList) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ['cars'],
      });
    };
  }, [queryClient]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['cars', params],

      queryFn: ({ pageParam }) =>
        getCars({
          ...params,
          page: pageParam,
        }),
      initialPageParam: 1,

      getNextPageParam: lastPage => {
        const currentPage = Number(lastPage.page);
        return currentPage < lastPage.totalPages ? currentPage + 1 : undefined;
      },
    });

  const cars = data?.pages.flatMap(page => page.cars) ?? [];

  const hasFilters = Object.values(params).some(Boolean);

  useEffect(() => {
    if (!isLoading && data && hasFilters && cars.length === 0) {
      toast.error('No cars found for your filters');
    }
  }, [isLoading, data, hasFilters, cars.length]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ul className={css.list}>
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul>
      {hasNextPage && (
        <Button
          size="sm"
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className={css.loadBtn}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </Button>
      )}
    </>
  );
};

export default CarList;
