import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../api/authApi";
import { useState } from "react";

export function useUser() {

  const [isUserFetched, setIsUserFetched] = useState(false);

  const {
    isLoading,
    data: user,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getCurrentUser(),
    enabled: !isUserFetched, 
    onSuccess: () => {
      setIsUserFetched(true); 
    },
  });

  return { isLoading, user, error, refetch };
}
