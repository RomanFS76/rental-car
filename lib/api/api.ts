import axios from "axios";
import type {Car} from '@/types/car'

export interface CarsResponse {
  cars: Car[];
  // totalCars: number;
  // page: number;
  // totalPages: number;
}

axios.defaults.baseURL = "https://car-rental-api.goit.global/";

export const getCars = async (params: { brand?: string; rentalPrice?: string; minMileage?: string; maxMileage?: string; }) => {
   const res = await axios.get<CarsResponse>('/cars', {
    params,
  });

  return res.data.cars;
};