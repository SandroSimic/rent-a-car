import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/authApi";

export function useGetAllUsers() {
  const {
    isLoading,
    data: users,
    error,
    refetch,
  } = useQuery({
    queryKey: "users",
    queryFn: getAllUsers,
  });

  return { isLoading, users, error, refetch };
}
