'use client';

import Select from 'react-select';
import css from './FormFilter.module.css';
import { useState } from 'react';
import Button from '../../shared/Button/Button';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getFilters, GetFiltersResponse } from '@/lib/api/api';

const formatMileage = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const FormFilter = () => {
  const router = useRouter();
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');

  const { data: { brands = [], price: priceRange } = {} } =
    useQuery<GetFiltersResponse>({
      queryKey: ['brands'],
      queryFn: getFilters,
    });

  const min = priceRange?.min ?? 0;
  const max = priceRange?.max ?? 0;

  const priceOptions = Array.from(
    { length: (max - min) / 10 + 1 },
    (_, index) => {
      const value = String(min + index * 10);

      return {
        value,
        label: value,
      };
    }
  );

  const brandOptions =
    brands?.map(brand => ({
      value: brand,
      label: brand,
    })) ?? [];

  console.log(brandOptions);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (brand) {
      params.set('brand', brand);
    }

    if (price) {
      params.set('price', price);
    }

    if (minMileage) {
      params.set('minMileage', minMileage);
    }

    if (maxMileage) {
      params.set('maxMileage', maxMileage);
    }

    router.push(`/catalog?${params.toString()}`);

    console.log(price);

    setBrand('');
    setPrice('');
    setMinMileage('');
    setMaxMileage('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.field}>
        <span className={css.label}>Car brand</span>
        <Select
          instanceId="brand-select"
          classNamePrefix="filterSelect"
          options={brandOptions}
          placeholder="Choose a brand"
          isSearchable={false}
          value={brandOptions.find(option => option.value === brand) || null}
          onChange={option => setBrand(option?.value || '')}
        />
      </label>
      <label className={css.field}>
        <span className={css.label}>Price / 1 hour</span>
        <Select
          instanceId="price-select"
          classNamePrefix="filterSelect"
          options={priceOptions}
          placeholder="Choose a price"
          isSearchable={false}
          value={priceOptions.find(option => option.value === price) || null}
          onChange={option => setPrice(option?.value || '')}
        />
      </label>

      <label className={css.field}>
        <span className={css.label}>Car mileage / km</span>

        <div className={css.mileageWrapper}>
          <div className={css.mileageInput}>
            <span className={css.mileageText}>From</span>

            <input
              className={css.input}
              type="text"
              value={formatMileage(minMileage)}
              onChange={e => setMinMileage(e.target.value.replace(/\D/g, ''))}
            />
          </div>

          <div className={css.mileageInput}>
            <span className={css.mileageText}>To</span>

            <input
              className={css.input}
              type="text"
              value={formatMileage(maxMileage)}
              onChange={e => setMaxMileage(e.target.value.replace(/\D/g, ''))}
            />
          </div>
        </div>
      </label>

      <Button type="submit" size="sm" className={css.formBtn}>
        Submit
      </Button>
    </form>
  );
};

export default FormFilter;
