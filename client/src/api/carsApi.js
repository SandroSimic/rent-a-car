import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getCars = async () => {
  const { data } = await axios.get(`${BASE_URL}/cars`);
  console.log(data.cars);
  return data;
};

export const createCar = async (carData) => {
  const { data } = await axios.post(`${BASE_URL}/cars`, carData);
  return data;
};

export const getCar = async (carId) => {
  const { data } = await axios.get(`${BASE_URL}/cars/${carId}`);
  return data;
};
