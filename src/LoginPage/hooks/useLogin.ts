import axios from "@/api/axios";
import ToastMessage from "@/ToastMessage";
import type { User } from "@/UsersPage/context/types";
import { useUsersContext } from "@/UsersPage/context/useUsersContext";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type loginCredentials = {
  mailAdress: string;
  password: string;
};

type loginResponse = {
  message: string;
  user: User;
  token: string;
};

const login = async (credentials: loginCredentials): Promise<loginResponse> => {
  const response = await axios.post("/auth/login", credentials);
  return response.data;
};

const useLogin = () => {
  const { setUser } = useUsersContext();
  const navigate = useNavigate();
  const { mutateAsync: loginMutation, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      ToastMessage({ type: "success", message: "Connexion réussie !" });
      const { user, token } = data;
      localStorage.setItem("access-token", data.token);
      setUser({
        AccessToken: token,
        user,
      });
      navigate("/");
    },
    onError: () => {
      ToastMessage({
        type: "error",
        message: "Une erreur est survenue, veuillez réessayer.",
      });
    },
  });

  return {
    loginMutation,
    loginLoading: isPending,
  };
};

export default useLogin;
