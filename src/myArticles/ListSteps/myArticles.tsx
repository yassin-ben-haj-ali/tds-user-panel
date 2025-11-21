import type { Article } from "../context/types";
import { useRef } from "react";
import Loader from "@/components/ui/Loader/Loader";
import { EmptyPage } from "../emptyPage";
import NoResults from "@/components/ui/NoResults";
import { useArticlesContext } from "../context/useArticleContext";
import ArticleCard from "./ArticleCard";

type Status = {
  status: string;
};
const MyArticles = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { formStep } = useArticlesContext();
  const loading = false;
  const error = false;

  const statusMap: Record<number, Status> = {
    1: { status: "stock" },
    2: { status: "tous" },
    3: { status: "pending" },
    4: { status: "completed" },
  };
  const status = statusMap[formStep];

  console.log(status);

  const ListArticles: Article[] = [
    {
      id: "1",
      numero: "commande-1",
      date_export: "12-05-2025",
      status: "En stock",
      received_qty: 150,
    },
  ];

  if (loading) {
    return (
      <Loader className="flex h-full w-full items-center justify-center" />
    );
  }

  if (error) {
    return <EmptyPage />;
  }
  return ListArticles.length ? (
    <div
      ref={containerRef}
      className="h-full max-h-[400px] overflow-y-auto px-10"
    >
      {" "}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {ListArticles.map((article) => (
          <ArticleCard article={article} />
        ))}
      </div>
    </div>
  ) : (
    <NoResults />
  );
};

export default MyArticles;
