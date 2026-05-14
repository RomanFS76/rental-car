import Image from 'next/image';
import css from './CarDetailePage.module.css';

import { getDetaileCar } from '@/lib/api/api';
import RenatalForm from '@/components/Form/RentalForm/RentalForm';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const car = await getDetaileCar(id);

  return {
    title: `${car.brand} ${car.model} | Rental Cars`,
    description: car.description,

    openGraph: {
      title: `${car.brand} ${car.model} ${car.year}`,
      description: car.description,
      images: [
        {
          url: car.img,
          width: 1200,
          height: 630,
          alt: `${car.brand} ${car.model}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${car.brand} ${car.model} ${car.year}`,
      description: car.description,
      images: [car.img],
    },
  };
}

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
    accessories,
  } = await getDetaileCar(id);
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
                <ul className={css.featuresList}>
                  {accessories.map(item => {
                    return (
                      <li key={item} className={css.featuresItem}>
                        <svg width={16} height={16}>
                          <use href="/icons/sprite.svg#check" />
                        </svg>
                        <p>{item}</p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CarDetailePage;
