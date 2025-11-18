import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage/LoginPage";
import LoginLayout from "./LoginPage/LoginLayout/LoginLayout";
import NotFound from "./components/ui/NotFound";

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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
