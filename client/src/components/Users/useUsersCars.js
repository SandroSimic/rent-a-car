import { useQuery } from "@tanstack/react-query";
import { getUsersCars } from "../../api/carsApi";
import { useParams } from "react-router-dom";

export function useUsersCars() {
  const { userId } = useParams();
  const {
    isLoading,
    data: cars,
    error,
    refetch,
  } = useQuery({
    queryKey: ["UsersCars"],
    queryFn: () => getUsersCars(userId),
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
  });

  return { isLoading, error, cars, refetch };
}
