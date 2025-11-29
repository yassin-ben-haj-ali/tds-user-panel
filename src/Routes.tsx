import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import LoginLayout from "./LoginPage/LoginLayout/LoginLayout";
import NotFound from "./components/ui/NotFound";
import Layout from "./Layout";
import UsersPage from "./UsersPage/UsersPage";
import MyArticlesPage from "./myArticles/myArticlesPage";
import ManufacturersPage from "./ManufacturersPage/ManufacturersPage";
import OrdersPage from "./OrdersPage/OrdersPage";
import OrderDetailsPage from "./OrderDetailsPage/OrderDetailsPage";
import RequireAuth from "./RequireAuth";
import PersistLogin from "./PersistLogin";
import VerifyEmailPage from "./LoginPage/VerifyEmailPage";
import ResetPasswordPage from "./LoginPage/ResetPasswordPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route
          path="login"
          element={
            <LoginLayout>
              <LoginPage />
            </LoginLayout>
          }
        ></Route>
      </Route>
      <Route
        path="auth/verify-email"
        element={
          <LoginLayout>
            <VerifyEmailPage />
          </LoginLayout>
        }
      />
      <Route
        path="auth/reset-password"
        element={
          <LoginLayout>
            <ResetPasswordPage />
          </LoginLayout>
        }
      />
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/commands" replace />} />
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<UsersPage />} />
            <Route path="/commands" element={<MyArticlesPage />} />
            <Route path="/fabricants" element={<ManufacturersPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/orders/:id" element={<OrderDetailsPage />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
