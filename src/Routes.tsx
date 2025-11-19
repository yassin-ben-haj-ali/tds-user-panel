import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import LoginLayout from "./LoginPage/LoginLayout/LoginLayout";
import NotFound from "./components/ui/NotFound";
import Layout from "./Layout";

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
        <Route path="/home" element={<div>users page</div>} />
        <Route path="/commands" element={<div>commands page</div>} />
        <Route path="/fabricants" element={<div>fabriquants page</div>} />
        <Route path="/orders" element={<div>orders page</div>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
