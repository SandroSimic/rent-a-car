import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReview } from "../../api/carsApi";
import toast from "react-hot-toast";

export function useAddReview() {
  const queryClient = useQueryClient();

  const { mutate: addReviewQuery, isLoading: isCreating } = useMutation({
    mutationFn: ({ carId, reviewData }) => addReview(carId, reviewData),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["car"] });
      toast.success("New review successfully added");
    },
    onError: (err) => {
      toast.error(err.response.data.message);
      console.log(err.response.data.error);
    },
  });

  return { isCreating, addReviewQuery };
}
