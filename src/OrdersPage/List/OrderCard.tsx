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
import ViewIcon from "@/assets/ViewIcon";
import { useNavigate } from "react-router-dom";
import type { Order } from "../context/types";
import useDeleteOrder from "../hooks/useDeleteOrder";

type OrderCardProps = {
  order: Order;
};

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const navigate = useNavigate();
  const { deleteOrderLoading, deleteOrderMutation } = useDeleteOrder();
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
          {order.article?.number}
        </CardTitle>
        <div className="flex gap-3 items-center justify-center">
          <button
            type="button"
            className="rounded-md border border-primary p-1 h-10 w-10 flex items-center justify-center cursor-pointer"
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            <ViewIcon />
          </button>
          <ConfirmModal
            type="delete"
            title="Supprimer ordre de fabrication"
            description="êtes vous sûr de vouloir supprimer l'ordre de fabrication!"
            handleConfirm={async (e) => {
              e.stopPropagation();
              await deleteOrderMutation(order.id);
            }}
            isLoading={deleteOrderLoading}
            buttonClassName="h-10 w-10 flex items-center justify-center border-primary"
          />
        </div>
      </CardHeader>
      <CardDescription className="font-medium text-primary text-lg px-6 space-y-3">
        <p>
          fabriquant:<strong>{order.fabriquant?.name}</strong>
        </p>
        <p>
          technicien:
          <strong>{`${order.technicien?.firstName} ${order.technicien?.lastName}`}</strong>
        </p>
      </CardDescription>
      <CardContent className="flex flex-col items-center gap-3 pt-3 lg:justify-between xl:flex-row">
        <span
          className={` bg-[#EFC3BE] text-[#b32e2e] ${badgeVariants({
            variant: "outline",
          })}`}
        >
          {`Clôturé depuis ${formatDate(order.article?.exportedAt)}`}
        </span>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
