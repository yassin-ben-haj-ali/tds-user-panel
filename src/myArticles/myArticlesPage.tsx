import { useEffect } from "react";
import EmptyPage from "./emptyPage";
import MyArticlesList from "./myArticlesList";
import { useUsersContext } from "@/UsersPage/context/useUsersContext";
import AddArticle from "./AddArticle/AddArticle";
import useGetInitialArticles from "./hooks/useGetInitialArticles";

const MyArticlesPage = () => {
  const getArticlesQuery = useGetInitialArticles();

  const { resetState } = useUsersContext();

  useEffect(() => {
    resetState();
  }, []);

  return (
    <div className="relative h-full w-full bg-white p-2">
      {getArticlesQuery.data && getArticlesQuery.data.totalCount > 0 ? (
        <MyArticlesList />
      ) : (
        <EmptyPage component={<AddArticle />} name="article" />
      )}
    </div>
  );
};

export default MyArticlesPage;
