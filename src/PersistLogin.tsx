import { Outlet } from "react-router-dom";
import Loader from "./components/ui/Loader/Loader";
import useGetUser from "./LoginPage/hooks/useGetUser";
import { useEffect, useState } from "react";

const PersistLogin = () => {
  const getUserMutation = useGetUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getActiveUser = async () => {
      try {
        await getUserMutation();
      } finally {
        setIsLoading(false);
      }
    };
    getActiveUser();
  }, [getUserMutation]);

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
