import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UsersProvider } from "./UsersPage/context/UserContext.tsx";
import { HeroUIProvider } from "@heroui/react";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <HeroUIProvider>
      <UsersProvider>
        <App />
      </UsersProvider>
    </HeroUIProvider>
  </BrowserRouter>
);
