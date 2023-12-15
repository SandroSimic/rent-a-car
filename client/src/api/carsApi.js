import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getCars = async (filters, keyword) => {
  const queryParams = new URLSearchParams(filters).toString();
  const keywordParam = new URLSearchParams(keyword).toString();

  const isQuery = queryParams ? `?${queryParams}` : "";
  const isKeyword = keywordParam ? `?${keywordParam}` : "";

  const url = `${BASE_URL}/cars${isQuery}${isKeyword}`;
  const { data } = await axios.get(url);
  console.log(data.cars);
  return data;
};

export const createCar = async (carData) => {
  const { data } = await axios.post(`${BASE_URL}/cars`, carData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const getCar = async (carId) => {
  const { data } = await axios.get(`${BASE_URL}/cars/${carId}`);
  return data;
};
