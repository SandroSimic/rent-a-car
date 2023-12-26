/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { Route, Navigate, useNavigate } from "react-router-dom";
import { useUser } from "./Users/useUser";

export function AdminRoute({ element }) {
  const { user } = useUser();

  const isAdmin = user && user.isAdmin;

  const navigate = useNavigate();
  if (!isAdmin) {
    navigate("/");
    return null;
  }

  return element;
}
