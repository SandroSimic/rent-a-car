import { useQuery } from "@tanstack/react-query";
import { getAllCars } from "../../api/carsApi";

export function useGetAllCars() {
  const {
    data: cars,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["AllCars"],
    queryFn: () => getAllCars(),
  });

  return { cars, error, isLoading, refetch };
}
