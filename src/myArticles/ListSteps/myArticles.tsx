import type { Article } from "../context/types";
import { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loader from "@/components/ui/Loader/Loader";
import EmptyPage from "../emptyPage";
import NoResults from "@/components/ui/NoResults";
import { useArticlesContext } from "../context/useArticleContext";
import ArticleCard from "./ArticleCard";
import AddArticle from "../AddArticle/AddArticle";
import useGetArticles from "../hooks/useGetArticles";

type Status = {
  status: string;
};
const MyArticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { formStep } = useArticlesContext();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const statusMap: Record<number, Status> = {
    1: { status: "tous" },
    2: { status: "STOCK" },
    3: { status: "PENDING" },
    4: { status: "COMPLETED" },
  };
  const { status } = statusMap[formStep];

  const getArticlesQuery = useGetArticles(status, {
    filters: {
      orderBy: {
        key: "createdAt",
        value: "desc",
      },
    },
  });
  const statusFetch = getArticlesQuery?.status;

  useEffect(() => {
    if (
      inView &&
      getArticlesQuery.hasNextPage &&
      !getArticlesQuery.isFetchingNextPage
    ) {
      getArticlesQuery.fetchNextPage();
    }
  }, [
    inView,
    getArticlesQuery.hasNextPage,
    getArticlesQuery.isFetchingNextPage,
  ]);

  const ListArticles: Article[] =
    getArticlesQuery.data?.pages.flatMap((page) => page.paginatedResult) || [];

  if (statusFetch === "pending") {
    return (
      <Loader className="flex h-full w-full items-center justify-center" />
    );
  }

  if (statusFetch === "error") {
    return <EmptyPage name="article" component={<AddArticle />} />;
  }
  return ListArticles.length > 0 ? (
    <div
      ref={containerRef}
      className="h-full max-h-[400px] overflow-y-auto px-10 my-5"
    >
      {" "}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {ListArticles.map((article) => (
          <ArticleCard article={article} />
        ))}
      </div>
      <div ref={ref} className="h-10 w-full" />
      {getArticlesQuery.isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loader />
        </div>
      )}
    </div>
  ) : (
    <NoResults />
  );
};

export default MyArticles;
