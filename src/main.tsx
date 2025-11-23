import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UsersProvider } from "./UsersPage/context/UserContext.tsx";
import { HeroUIProvider } from "@heroui/react";
import { ArticlesProvider } from "./myArticles/context/ArticleContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <HeroUIProvider>
      <QueryClientProvider client={queryClient}>
        <UsersProvider>
          <ArticlesProvider>
            <App />
          </ArticlesProvider>
        </UsersProvider>
      </QueryClientProvider>
    </HeroUIProvider>
  </BrowserRouter>
);
