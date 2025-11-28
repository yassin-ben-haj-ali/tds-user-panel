import axios from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

const verifyEmail = async (token: string) => {
  const response = await axios.get("/auth/verify", {
    params: { token },
  });
  return response.data;
};

const useVerifyEmail = (token?: string) => {
  return useQuery({
    queryKey: ["verify-email", token],
    queryFn: () => {
      if (!token) throw new Error("Token is required for email verification");
      return verifyEmail(token);
    },
    enabled: !!token,
    retry: false,
  });
};

export default useVerifyEmail;
