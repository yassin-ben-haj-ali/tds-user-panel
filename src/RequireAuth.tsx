import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useUsersContext } from "./UsersPage/context/useUsersContext";

const RequireAuth = () => {
  const location = useLocation();
  const { auth } = useUsersContext();
  const { authenticated } = auth;


  return authenticated ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
