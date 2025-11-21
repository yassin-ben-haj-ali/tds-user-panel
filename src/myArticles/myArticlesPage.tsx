import { useEffect } from "react";
import EmptyPage from "./emptyPage";
import MyArticlesList from "./myArticlesList";
import { useUsersContext } from "@/UsersPage/context/useUsersContext";
import AddArticle from "./AddArticle/AddArticle";

const MyArticlesPage = () => {
  const myArticles = [
    {
      id: "1",
      numero: "commande-1",
      date_export: "12-05-2025",
      status: "En stock",
      received_qty: 150,
    },
  ];
  const { resetState } = useUsersContext();

  useEffect(() => {
    resetState();
  }, []);

  return (
    <div className="relative h-full w-full bg-white p-2">
      {myArticles.length > 0 ? (
        <MyArticlesList />
      ) : (
        <EmptyPage component={<AddArticle />} name="article" />
      )}
    </div>
  );
};

export default MyArticlesPage;
