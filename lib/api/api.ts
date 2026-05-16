import axios from 'axios';
import type { Car } from '@/types/car';

const CarAPI = axios.create({
  baseURL: 'https://car-rental-api.goit.study/',
  headers: {
    accept: 'application/json',
  },
});

export interface GetCarsParams {
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
  perPage?: number;
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
    params: {
      perPage: 12,
      ...params,
    },
  });
  return res.data;
};

export const getDetaileCar = async (id: string) => {
  const res = await CarAPI.get<Car>(`/cars/${id}`);
  return res.data;
};

export interface GetFiltersResponse {
  brands: string[];
  price: {
    min: number;
    max: number;
  };
}

export const getFilters = async (): Promise<GetFiltersResponse> => {
  const res = await CarAPI.get<GetFiltersResponse>('/cars/filters');
  return res.data;
};

export const constbookeingCar = async (): Promise<string[]> => {
  const res = await CarAPI.get<string[]>('/brands');
  return res.data;
};

export interface BookingPayload {
  name: string;
  email: string;
  comment: string;
}

type BookingResponse = {
  message: string;
};

export const createBooking = async (
  id: string,
  payload: BookingPayload
): Promise<BookingResponse> => {
  const { data } = await CarAPI.post<BookingResponse>(
    `/cars/${id}/booking-requests`,
    payload
  );

  return data;
};
