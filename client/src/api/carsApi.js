import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getCars = async (filters, keyword, pageNumber) => {
  const queryParams = new URLSearchParams(filters).toString();
  const keywordParam = new URLSearchParams(keyword).toString();
  const pageNumberParam = new URLSearchParams(pageNumber);
  console.log(pageNumberParam);

  const isPageNumber = pageNumberParam ? `${pageNumberParam}` : "";
  const isQuery = queryParams ? `?${queryParams}` : "";
  const isKeyword = keywordParam ? `?${keywordParam}` : "";

  const url = `${BASE_URL}/cars${isQuery}${
    isQuery ? "&" : "?"
  }${isPageNumber}${isKeyword}`;
  console.log(url);

  const { data } = await axios.get(url);
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
