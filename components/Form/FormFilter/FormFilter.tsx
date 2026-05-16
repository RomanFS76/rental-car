'use client';

import Select from 'react-select';
import css from './FormFilter.module.css';
import { useState } from 'react';
import Button from '../../shared/Button/Button';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getFilters, GetFiltersResponse } from '@/lib/api/api';
import { formatMileage } from './utils';

const initialFilters = {
  brand: '',
  price: '',
  minMileage: '',
  maxMileage: '',
};

const FormFilter = () => {
  const router = useRouter();
  const [filters, setFilters] = useState(initialFilters);

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

  const handleSubmit = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, String(value));
      }
    });

    router.push(`/catalog?${params.toString()}`);
  };

  return (
    <div>
      <form className={css.form} action={handleSubmit}>
        <label className={css.field}>
          <span className={css.label}>Car brand</span>
          <Select
            instanceId="brand-select"
            classNamePrefix="filterSelect"
            options={brandOptions}
            placeholder="Choose a brand"
            isSearchable={false}
            value={
              brandOptions.find(option => option.value === filters.brand) ||
              null
            }
            onChange={option =>
              setFilters(prev => ({
                ...prev,
                brand: option?.value || '',
              }))
            }
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
            value={
              priceOptions.find(option => option.value === filters.price) ||
              null
            }
            onChange={option =>
              setFilters(prev => ({
                ...prev,
                price: option?.value || '',
              }))
            }
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
                inputMode="numeric"
                maxLength={5}
                value={formatMileage(filters.minMileage)}
                onChange={e =>
                  setFilters(prev => ({
                    ...prev,
                    minMileage: e.target.value.replace(/\D/g, ''),
                  }))
                }
              />
            </div>

            <div className={css.mileageInput}>
              <span className={css.mileageText}>To</span>

              <input
                className={css.input}
                type="text"
                inputMode="numeric"
                maxLength={5}
                value={formatMileage(filters.maxMileage)}
                onChange={e =>
                  setFilters(prev => ({
                    ...prev,
                    maxMileage: e.target.value.replace(/\D/g, ''),
                  }))
                }
              />
            </div>
          </div>
        </label>

        <div className={css.actions}>
          <Button type="submit" size="sm" className={css.formBtn}>
            Submit
          </Button>
          <button
            type="button"
            className={css.clearBtn}
            onClick={() => {
              setFilters(initialFilters);
              router.push('/catalog');
            }}
          >
            Clear filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormFilter;
