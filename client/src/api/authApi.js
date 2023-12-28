import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const loginUser = async (userData) => {
  const { data } = await axios.post(`${BASE_URL}/users/login`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return data;
};

export const registerUser = async (userData) => {
  const { data } = await axios.post(`${BASE_URL}/users/register`, userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await axios.get(`${BASE_URL}/users/me`, {
    withCredentials: true,
  });

  return data;
};

export const logoutUser = async () => {
  await axios.post(`${BASE_URL}/users/logout`, null, {
    withCredentials: true,
  });
};

export const getMe = async () => {
  const { data } = await axios.get(`${BASE_URL}/cars/me`, {
    withCredentials: true,
  });
  return data;
};

export const getUser = async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/users/${userId}`, {
    withCredentials: true,
  });
  return data;
};

export const getAllUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`, {
    withCredentials: true,
  });
  return data;
};

export const deleteUser = async (userId) => {
  const { data } = await axios.delete(`${BASE_URL}/users/${userId}`, {
    withCredentials: true,
  });
  return data;
};

export const updateUser = async (userId, userData) => {
  const { data } = await axios.patch(`${BASE_URL}/users/${userId}`, userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  return data;
};
