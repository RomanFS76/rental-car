import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/types/car';
import css from './CarCard.module.css';
import Button from '../shared/Button/Button';

type Props = {
  car: Car;
};

const CarCard = ({ car }: Props) => {
  const addressParts = car.address.split(', ');
  const city = addressParts[1];
  const country = addressParts[2];

  return (
    <li className={css.card}>
      <Image
        className={css.image}
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        width={276}
        height={268}
      />

      <div className={css.titleWrapper}>
        <h2 className={css.title}>
          {car.brand} <span>{car.model}</span>, {car.year}
        </h2>
        <p className={css.price}>${car.rentalPrice}</p>
      </div>

      <div className={css.overlayInfo}>
        <p className={css.info}>
          {city}
          <span>|</span>
          {country}
          <span>|</span>
          {car.rentalCompany}
        </p>
        <p className={css.info}>
          {car.type}
          <span>|</span>
          {car.mileage} km
        </p>
      </div>

      <div className={css.btnWrapper}>
        <Button
          as={Link}
          href={`/catalog/${car.id}`}
          size="md"
          className={css.btn}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more
        </Button>
      </div>
    </li>
  );
};

export default CarCard;
