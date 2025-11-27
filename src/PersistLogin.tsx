import { Outlet } from "react-router-dom";
import useRefreshToken from "@/LoginPage/hooks/useRefreshToken";
import Loader from "./components/ui/Loader/Loader";
import { useEffect, useState } from "react";

const PersistLogin = () => {
  const getNewAccessToken = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        await getNewAccessToken();
      } finally {
        setIsLoading(false);
      }
    };

    refreshToken();
  }, [getNewAccessToken]);
  return (
    <>
      {isLoading ? (
        <Loader className="flex h-full w-full items-center justify-center" />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
