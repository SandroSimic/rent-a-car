import { useQuery } from "@tanstack/react-query";
import { getCar } from "../../api/carsApi";
import { useParams } from "react-router-dom";

export function useCar() {
  const { carId } = useParams();

  const {
    isLoading,
    data: car,
    error,
    refetch,
  } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => getCar(carId),
    retry: false,
  });

  return { isLoading, error, car, refetch };
}
