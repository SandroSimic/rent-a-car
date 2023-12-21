import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../../api/authApi";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isLoading, data } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries("user");
      navigate("/", { replace: true });
    },
  });

  return { logout, isLoading, data };
}
