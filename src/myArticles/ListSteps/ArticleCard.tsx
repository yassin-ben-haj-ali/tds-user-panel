import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { badgeVariants } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import ConfirmModal from "@/layouts/ConfirmModal";
import type { Article } from "../context/types";
import ProgressBar from "./ProgressBar";
import useDeleteArticle from "../hooks/useDeleteArticle";

type ArticleCardProps = {
  article: Article;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { number, exportedAt, status, id } = article;
  const { deleteArticleMutation, deleteArticleLoading } = useDeleteArticle();

  const getStatusClasses = (status: string): string => {
    if (status === "En stock") {
      return "bg-[#EFC3BE] text-[#b32e2e]";
    } else if (status === "Pending") {
      return "bg-[#DEEDE5] text-[#427a5b]";
    } else {
      return "";
    }
  };

  const formatDate = (inputDate?: string): string => {
    if (!inputDate) return "25 juin 2023";
    const formattedDate = format(new Date(inputDate), "dd MMMM yyyy", {
      locale: fr,
    });
    return formattedDate;
  };

  return (
    <Card className="flex flex-col border-[#cac9c9] transition-all">
      <CardHeader className="w-full flex justify-between">
        <CardTitle className="text-lg capitalize">{number}</CardTitle>
        <div>
          <ConfirmModal
            type="delete"
            title="Supprimer article"
            description="La suppression du commande X entraîne la suppression de tous les ordres de fabrication qui lui sont associés."
            handleConfirm={async (e) => {
              e.stopPropagation();
              await deleteArticleMutation(id);
            }}
            isLoading={deleteArticleLoading}
            buttonClassName="h-10 w-10 flex items-center justify-center border-primary"
          />
        </div>
      </CardHeader>
      <CardDescription className="font-medium text-gray-400">
        <ProgressBar pourcentage={20} />
      </CardDescription>
      <CardContent className="flex flex-col items-center gap-3 pt-3 lg:justify-between xl:flex-row">
        <span
          className={`${badgeVariants({
            variant: "outline",
          })} ${getStatusClasses(status ?? "En Stock")}`}
        >
          {`Clôturé depuis ${formatDate(exportedAt)}`}
        </span>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
