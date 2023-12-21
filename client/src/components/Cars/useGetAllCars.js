import { useQuery } from "@tanstack/react-query";
import { getAllCars } from "../../api/carsApi";

export function useGetAllCars() {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["allCars"],
    queryFn: () => getAllCars(),
  });

  return { data, error, isLoading, refetch };
}
