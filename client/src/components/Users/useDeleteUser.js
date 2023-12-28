import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../../api/authApi";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: deleteUserQuery,
    isLoading: isDeleting,
  } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("User successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  return { isDeleting, deleteUserQuery };
}
