import { useQuery } from "@tanstack/react-query";
import { getCars } from "../../api/carsApi";

export function useCars(filters, keyword, pageNumber) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["cars", filters],
    queryFn: () => getCars(filters, keyword, pageNumber),
  });

  return { data, error, isLoading, refetch };
}
