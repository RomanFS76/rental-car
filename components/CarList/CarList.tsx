'use client';

import { getCars } from '@/lib/api/api';
import { useQuery } from '@tanstack/react-query';
import css from './CarList.module.css';
import CarCard from '../CarCard/CarCard';

type PropsCarList = {
  params: {
    brand?: string;
    rentalPrice?: string;
    minMileage?: string;
    maxMileage?: string;
  };
};

const CarList = ({ params }: PropsCarList) => {
  const { data: cars } = useQuery({
    queryKey: ['cars', params],
    queryFn: () => getCars(params),
  });

  return (
    <ul className={css.list}>
      {cars?.map(car => (
        <CarCard key={car.id} car={car} />
      ))}
    </ul>
  );
};

export default CarList;
