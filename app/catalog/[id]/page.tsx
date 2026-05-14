import Image from 'next/image';
import css from './CarDetailePage.module.css';

import { getDetailCar } from '@/lib/api/api';
import RenatalForm from '@/components/Form/RentalForm/RentalForm';

type CarDetailePageProps = {
  params: Promise<{ id: string }>;
};

const CarDetailePage = async ({ params }: CarDetailePageProps) => {
  const { id } = await params;

  const {
    img,
    brand,
    model,
    year,
    address,
    mileage,
    rentalPrice,
    description,
    rentalConditions,
    fuelConsumption,
    engineSize,
    type,
  } = await getDetailCar(id);
  const [, city, country] = address.split(', ');

  const imageId = img.split('/').pop()?.split('-')[0];

  const specifications = [
    {
      icon: 'calendar',
      label: 'Year',
      value: year,
    },
    {
      icon: 'car',
      label: 'Type',
      value: type,
    },
    {
      icon: 'fuel-pump',
      label: 'Fuel Consumption',
      value: fuelConsumption,
    },
    {
      icon: 'gear',
      label: 'Engine Size',
      value: engineSize,
    },
  ];

  console.log(imageId);

  return (
    <main className={css.main}>
      <div className="container">
        <section className={css.section}>
          <div className={css.leftSide}>
            <Image
              src={img}
              alt={brand}
              width={640}
              height={512}
              className={css.carImg}
            />
            <RenatalForm />
          </div>

          <div className={css.rightSide}>
            <section className={css.details}>
              <div className={css.modelBrand}>
                <h2 className={css.carTitle}>
                  {brand} {model}, {year}
                </h2>
                <span className={css.imageId}>id: {imageId}</span>
              </div>

              <div className={css.locationMileage}>
                <p className={css.location}>
                  <svg width={16} height={16}>
                    <use href={`/icons/sprite.svg#location`} />
                  </svg>
                  {city}, {country}
                </p>

                <p className={css.mileage}>
                  Mileage: {mileage.toLocaleString('en-US')} km
                </p>
              </div>
              <p className={css.price}>${rentalPrice}</p>
              <p>{description}</p>
            </section>

            <div className={css.carInfo}>
              <section className={css.conditions}>
                <h3 className={css.carInfoTitle}>Rental Conditions: </h3>
                <ul className={css.conditionsList}>
                  {rentalConditions.map(item => (
                    <li key={item} className={css.conditionsItem}>
                      <svg className={css.iconCheck} width={16} height={16}>
                        <use href={`/icons/sprite.svg#check`} />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className={css.specifications}>
                <h3 className={css.carInfoTitle}>Car Specifications: </h3>

                <ul className={css.specList}>
                  {specifications.map(({ icon, label, value }) => (
                    <li key={label} className={css.specItem}>
                      <svg width={16} height={16}>
                        <use href={`/icons/sprite.svg#${icon}`} />
                      </svg>

                      <p>
                        <span>{label}:</span> {value}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              <section className={css.features}>
                <h3 className={css.carInfoTitle}>
                  Accessories and functionalities:
                </h3>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CarDetailePage;
