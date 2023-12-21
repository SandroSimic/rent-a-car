import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginUserQuery, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      toast.success("Logged In Successfully");
      queryClient.setQueryData(["user"], user);
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(err.response.data.message);
      console.log(err);
    },
  });

  return { isLoading, loginUserQuery };
}
