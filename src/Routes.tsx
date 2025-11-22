import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import LoginLayout from "./LoginPage/LoginLayout/LoginLayout";
import NotFound from "./components/ui/NotFound";
import Layout from "./Layout";
import UsersPage from "./UsersPage/UsersPage";
import MyArticlesPage from "./myArticles/myArticlesPage";
import ManufacturersPage from "./ManufacturersPage/ManufacturersPage";
import OrdersPage from "./OrdersPage/OrdersPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="login"
        element={
          <LoginLayout>
            <LoginPage />
          </LoginLayout>
        }
      ></Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<UsersPage />} />
        <Route path="/commands" element={<MyArticlesPage />} />
        <Route path="/fabricants" element={<ManufacturersPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:id" element={<h1>order numéro</h1>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
