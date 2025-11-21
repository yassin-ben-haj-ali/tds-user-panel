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
import type { User } from "@/UsersPage/context/types";
import type { Manufacturer } from "@/ManufacturersPage/ViewManufacturer/ViewManufacturer";
import type { Article } from "@/myArticles/context/types";

export type Order = {
  id: string;
  fabriquant: Manufacturer;
  technicien: User;
  article: Article;
  createdAt: string;
};

type OrderCardProps = {
  order: Order;
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
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
        <CardTitle className="text-lg capitalize">
          {order.article.numero}
        </CardTitle>
        <div>
          <ConfirmModal
            name="ordre"
            type="delete"
            title="Supprimer ordre de fabrication"
            description="êtes vous sûr de vouloir supprimer l'ordre de fabrication!"
            handleConfirm={(e) => {
              e.stopPropagation();
            }}
            isLoading={false}
            buttonClassName="flex h-10 w-10 items-center justify-center border border-[#4D2EB2] p-1"
          />
        </div>
      </CardHeader>
      <CardDescription className="font-medium text-primary text-lg px-6 space-y-3">
        <p>
          fabriquant:<strong>{order.fabriquant.name}</strong>
        </p>
        <p>
          technicien:
          <strong>{`${order.technicien.firstName} ${order.technicien.lastName}`}</strong>
        </p>
      </CardDescription>
      <CardContent className="flex flex-col items-center gap-3 pt-3 lg:justify-between xl:flex-row">
        <span
          className={` bg-[#EFC3BE] text-[#b32e2e] ${badgeVariants({
            variant: "outline",
          })}`}
        >
          {`Clôturé depuis ${formatDate(order.article.date_export)}`}
        </span>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
