import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../api/authApi";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updateUserQuery, isLoading: isUpdating } = useMutation({
    mutationFn: ({ userId, userData }) => updateUser(userId, userData),
    onSuccess: () => {
      toast.success("User successfully updated");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
      console.log(err);
    },
  });

  return { isUpdating, updateUserQuery };
}
