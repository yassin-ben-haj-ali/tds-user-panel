import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UsersProvider } from "./UsersPage/context/UserContext.tsx";
import { HeroUIProvider } from "@heroui/react";
import { ArticlesProvider } from "./myArticles/context/ArticleContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ManufacturersProvider } from "./ManufacturersPage/context/ManufacturerContext.tsx";
import { OrdersProvider } from "./OrdersPage/context/OrdersContext.tsx";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <UsersProvider>
          <ArticlesProvider>
            <ManufacturersProvider>
              <OrdersProvider>
                <App />
                <ToastContainer theme="colored" icon={false} />
              </OrdersProvider>
            </ManufacturersProvider>
          </ArticlesProvider>
        </UsersProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  </BrowserRouter>
);
