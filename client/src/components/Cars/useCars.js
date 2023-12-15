import { useQuery } from "@tanstack/react-query";
import { getCars } from "../../api/carsApi";

export function useCars(filters, keyword) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cars", filters],
    queryFn: () => getCars(filters, keyword),
  });

  return { data, error, isLoading };
}
