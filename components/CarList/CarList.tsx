'use client';

import { getCars } from '@/lib/api/api';
import { useQuery } from '@tanstack/react-query';
import css from './CarList.module.css';
import CarCard from '../CarCard/CarCard';

const CarList = () => {
  const { data: cars } = useQuery({
    queryKey: ['cars'],
    queryFn: getCars,
  });

  console.log(cars?.length);

  return (
    <ul className={css.list}>
      {cars?.map(car => (
        <CarCard key={car.id} car={car} />
      ))}
    </ul>
  );
};

export default CarList;
