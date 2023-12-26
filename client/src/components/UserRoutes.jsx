/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { Route, Navigate, useNavigate } from "react-router-dom";
import { useUser } from "./Users/useUser";

export function UserRoutes({ element }) {
  const { user } = useUser();

  const isUser = user;

  const navigate = useNavigate();
  if (!isUser) {
    navigate("/login");
    return null;
  }

  return element;
}
