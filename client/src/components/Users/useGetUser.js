import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/authApi";
import { useParams } from "react-router-dom";

export function useGetUser() {
  const { userId } = useParams();

  const {
    isLoading,
    data: user,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    retry: false,
  });

  return { isLoading, user, error, refetch };
}
