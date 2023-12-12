import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getCars = async (filters) => {
  const queryParams = new URLSearchParams(filters).toString();

  const url = `${BASE_URL}/cars${queryParams ? `?${queryParams}` : ""}`;
  const { data } = await axios.get(url);
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
