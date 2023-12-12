import { useQuery } from "@tanstack/react-query";
import { getCars } from "../../api/carsApi";

export function useCars() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: () => getCars(),
  });

  return { data, error, isLoading };
}
