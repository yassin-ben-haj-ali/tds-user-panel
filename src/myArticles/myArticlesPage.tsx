import { useEffect } from "react";
import EmptyPage from "./emptyPage";
import MyArticlesList from "./myArticlesList";
import { useUsersContext } from "@/UsersPage/context/useUsersContext";
import AddArticle from "./AddArticle/AddArticle";
import useGetInitialArticles from "./hooks/useGetInitialArticles";
import { useNavigate } from "react-router-dom";

const MyArticlesPage = () => {
  const getArticlesQuery = useGetInitialArticles();
  const navigate = useNavigate();
  const { resetState, auth } = useUsersContext();
  const userRole = auth?.user.role;

  useEffect(() => {
    resetState();
  }, []);

  useEffect(() => {
    if (!["ADMIN", "GESTIONNAIRE"].includes(userRole ?? "TECHNICIEN"))
      navigate("/fabricants");
  }, [auth]);

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
