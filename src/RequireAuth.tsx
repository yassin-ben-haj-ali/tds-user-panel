import { useLocation, Navigate, Outlet } from "react-router-dom";
import Loader from "./components/ui/Loader/Loader";
import { useUsersContext } from "./UsersPage/context/useUsersContext";
import useGetUser from "./LoginPage/hooks/useGetUser";

const RequireAuth = () => {
  const auth = useUsersContext();
  const location = useLocation();
  const getUserQuery = useGetUser();

  if (getUserQuery.isLoading) {
    return (
      <Loader className="flex h-full w-full items-center justify-center" />
    );
  }

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
