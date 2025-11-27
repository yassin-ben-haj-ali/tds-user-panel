import axios from "@/api/axios";
import { useUsersContext } from "@/UsersPage/context/useUsersContext";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useRefreshToken = () => {
  const accessToken = localStorage.getItem("access-token");
  const navigate = useNavigate();
  const { setUser } = useUsersContext();

  const { mutateAsync: getNewAccessToken } = useMutation({
    mutationFn: async () => {
      if (!accessToken) return null;
      try {
        const response = await axios.get("/auth/refresh");
        const { user, token } = response.data;
        setUser({
          AccessToken: token,
          user,
        });
        return response.data;
      } catch (error: unknown) {
        setUser(null);
        localStorage.removeItem("RefreshToken");
        navigate("/login");
        throw error;
      }
    },
  });

  return getNewAccessToken;
};

export default useRefreshToken;
