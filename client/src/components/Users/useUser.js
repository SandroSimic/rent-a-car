import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/authApi";

export function useUser() {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: "user",
    queryFn: getCurrentUser,
  });

  const refetch = async () => {
    await queryClient.invalidateQueries("user");
    await queryClient.refetchQueries("user");
  };

  return { isLoading, user, error, refetch };
}
