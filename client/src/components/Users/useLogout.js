import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries();
      console.log(logout)
      navigate("/", { replace: true });

    },
  });

  return { logout, isLoading };
}
