import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../api/authApi";

export function useMyCars() {
  const {
    isLoading,
    data: myCars,
    error,
  } = useQuery({
    queryKey: "cars",
    queryFn: getMe,
  });

  return { isLoading, myCars, error };
}
