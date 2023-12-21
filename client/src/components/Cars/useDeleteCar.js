import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCar } from "../../api/carsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteCar() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteCarQuery, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      toast.success("Car successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  return { isDeleting, deleteCarQuery };
}
