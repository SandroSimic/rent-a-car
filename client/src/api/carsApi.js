import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getCars = async (filters, keyword, pageNumber) => {
  const queryParams = new URLSearchParams(filters).toString();
  const keywordParam = new URLSearchParams(keyword).toString();
  const pageNumberParam = new URLSearchParams(pageNumber);

  const isPageNumber = pageNumberParam ? `${pageNumberParam}` : "";
  const isQuery = queryParams ? `?${queryParams}` : "";
  const isKeyword = keywordParam ? `?${keywordParam}` : "";

  const url = `${BASE_URL}/cars${isQuery}${
    isQuery ? "&" : "?"
  }${isPageNumber}${isKeyword}`;

  const { data } = await axios.get(url);
  return data;
};

export const getAllCars = async () => {
  const url = `${BASE_URL}/cars/all-cars`;

  const { data } = await axios.get(url);
  return data;
};

export const createCar = async (carData) => {
  const { data } = await axios.post(`${BASE_URL}/cars`, carData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  console.log(data);
  return data;
};

export const getCar = async (carId) => {
  const { data } = await axios.get(`${BASE_URL}/cars/${carId}`);
  return data;
};

export const deleteCar = async (carId) => {
  const { data } = await axios.delete(`${BASE_URL}/cars/${carId}`);
  return data;
};

export const updateCar = async (carId, carData) => {
  const { data } = await axios.patch(`${BASE_URL}/cars/${carId}`, carData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  return data;
};

export const getUsersCars = async (userId) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/cars/usersCars/${userId}`, {
      withCredentials: true,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw new Error("Failed to load users cars");
  }
};

export const addReview = async (carId, reviewData) => {
  const { data } = await axios.post(
    `${BASE_URL}/cars/${carId}/reviews`,
    reviewData,

    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
  console.log(data);
  return data;
};
