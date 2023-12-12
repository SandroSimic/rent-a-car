import { useQuery } from "@tanstack/react-query";
import { getCars } from "../../api/carsApi";

export function useCars(filters) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cars", filters],
    queryFn: () => getCars(filters),
  });

  return { data, error, isLoading };
}
