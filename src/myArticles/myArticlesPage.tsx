import { useEffect } from "react";
import { EmptyPage } from "./emptyPage";
import MyArticlesList from "./myArticlesList";
import { useUsersContext } from "@/UsersPage/context/useUsersContext";

const MyArticlesPage = () => {
  const myArticles = [];
  const { resetState } = useUsersContext();

  useEffect(() => {
    resetState();
  }, []);

  return (
    <div className="relative h-full w-full bg-white p-2">
      {myArticles.length > 0 ? <MyArticlesList /> : <EmptyPage />}
    </div>
  );
};

export default MyArticlesPage;
