import axios from 'axios';
import type { Car } from '@/types/car';

axios.defaults.baseURL = 'https://car-rental-api.goit.global/';

export interface GetCarsParams {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  page?: string;
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export const getCars = async (params: GetCarsParams): Promise<CarsResponse> => {
  const res = await axios.get<CarsResponse>('/cars', {
    params,
  });

  return res.data;
};

export const getBrands = async (): Promise<string[]> => {
  const res = await axios.get<string[]>('/brands');
  return res.data;
};
