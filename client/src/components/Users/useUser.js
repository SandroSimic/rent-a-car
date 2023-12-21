import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/authApi";

export function useUser() {
  const { isLoading, data: user, error } = useQuery({
    queryKey: "user",
    queryFn: getCurrentUser,
  });

  return { isLoading, user, error };
}
