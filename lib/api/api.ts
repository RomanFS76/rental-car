import axios from "axios";
import type {Car} from '@/types/car'

export interface CarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

axios.defaults.baseURL = "https://car-rental-api.goit.global/";

export const getCars = async () => {
  const res = await axios.get<CarsResponse>("/cars");
  return res.data;
};