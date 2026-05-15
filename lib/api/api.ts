import axios from 'axios';
import type { Car } from '@/types/car';

const CarAPI = axios.create({
  baseURL: 'https://car-rental-api.goit.global/',
  headers: {
    accept: 'application/json',
  },
});

export interface GetCarsParams {
  brand?: string;
  rentalPrice?: string;
  minMileage?: string;
  maxMileage?: string;
  page?: number;
}

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export const getCars = async (params: GetCarsParams): Promise<CarsResponse> => {
  const res = await CarAPI.get<CarsResponse>('/cars', {
    params,
  });
  return res.data;
};

export const getDetaileCar = async (id: string) => {
  const res = await CarAPI.get<Car>(`/cars/${id}`);
  return res.data;
};

export const getBrands = async (): Promise<string[]> => {
  const res = await CarAPI.get<string[]>('/brands');
  return res.data;
};

// axios.defaults.baseURL = 'https://car-rental-api.goit.global/';
