import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../../api/carsApi";
import toast from "react-hot-toast";

export function useUpdateCar() {
  const queryClient = useQueryClient();

  const { mutate: updateCarQuery, isLoading: isUpdating } = useMutation({
    mutationFn: ({carId, newCarData}) => updateCar(carId, newCarData),
    onSuccess: () => {
      toast.success("Car successfully updated");
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  return { isUpdating, updateCarQuery };
}
