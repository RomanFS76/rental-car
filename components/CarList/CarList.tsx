'use client';

import { getCars } from '@/lib/api/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './CarList.module.css';
import CarCard from '../CarCard/CarCard';



const CarList = () => {
  const { data: cars } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,
    placeholderData: keepPreviousData,
  });

  console.log(cars);

  return (
  <ul className={css.list}>
    {cars?.map(car => (
      <CarCard key={car.id} car={car} />
    ))}
  </ul>
  );
};

export default CarList;
