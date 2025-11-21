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

type ArticleCardProps = {
  article: Article;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const { numero, date_export, status } = article;

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
        <CardTitle className="text-lg capitalize">{numero}</CardTitle>
        <div>
          <ConfirmModal
            name="chantier/site"
            type="delete"
            title="Supprimer article"
            description="La suppression du commande X entraîne la suppression de tous les ordres de fabrication qui lui sont associés."
            handleConfirm={(e) => {
              e.stopPropagation();
            }}
            isLoading={false}
            buttonClassName="flex h-10 w-10 items-center justify-center border border-[#4D2EB2] p-1"
          />
        </div>
      </CardHeader>
      <CardDescription className="font-medium text-gray-400">
        <div className="flex items-center justify-center">
          <div className="w-[80%] bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{
                width: `${20}%`,
              }}
            ></div>
          </div>
          <div className="flex  items-center justify-between">
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#545454] whitespace-nowrap">
              {20}%
            </span>
          </div>
        </div>
      </CardDescription>
      <CardContent className="flex flex-col items-center gap-3 pt-3 lg:justify-between xl:flex-row">
        <span
          className={`${badgeVariants({
            variant: "outline",
          })} ${getStatusClasses(status ?? "En Stock")}`}
        >
          {`Clôturé depuis ${formatDate(date_export)}`}
        </span>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
