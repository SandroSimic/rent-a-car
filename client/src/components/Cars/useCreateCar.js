import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCar } from "../../api/carsApi";
import toast from "react-hot-toast";

export function useCreateCar() {
  const queryClient = useQueryClient();

  const { mutate: createCarQuery, isLoading: isCreating } = useMutation({
    mutationFn: createCar,
    onSuccess: () => {
      toast.success("New car successfully added");
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  return { isCreating, createCarQuery };
}
