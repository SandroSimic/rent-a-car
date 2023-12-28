import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const navigate = useNavigate();

  const { mutate: registerQuery, isLoading } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Account successfully created");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(err.response.data.message);
    },
  });

  return { registerQuery, isLoading };
}
