import axios from "axios";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";

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
  try {
    const { data } = await axios.get(`${BASE_URL}/users/me`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    toast("Not Logged In. Access is restricted", {
      icon: "⚠️",
    });
  }
};

export const logoutUser = async () => {
  try {
    await axios.post(`${BASE_URL}/users/logout`, null, {
      withCredentials: true,
    });

    console.log("Logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
    throw new Error("Failed to log out");
  }
};
