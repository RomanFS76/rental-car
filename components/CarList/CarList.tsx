'use client';

import { getCars } from '@/lib/api/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import css from './CarList.module.css';
import CarCard from '../CarCard/CarCard';
import Button from '../shared/Button/Button';

type PropsCarList = {
  params: {
    brand?: string;
    rentalPrice?: string;
    minMileage?: string;
    maxMileage?: string;
  };
};

const CarList = ({ params }: PropsCarList) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
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
  console.log(data);
  const cars = data?.pages.flatMap(page => page.cars) ?? [];

  return (
    <>
      <ul className={css.list}>
        {cars?.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </ul>
      {hasNextPage && (
        <Button
          size="sm"
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          Load more
        </Button>
      )}
    </>
  );
};

export default CarList;
