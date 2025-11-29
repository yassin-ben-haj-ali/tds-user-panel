import useGetOrders from "@/OrdersPage/hooks/useGetOrders";
import AddItems from "./AddItem/AddItems";
import OrderDetailsPageLayout from "./OrderDetailsPageLayout";
import ToggleMenuOrder from "./ToggleMenu/ToggleMenuOrder";
import { useParams } from "react-router-dom";
import ItemsTable from "./ItemsList/ItemsList";
import { useUsersContext } from "@/UsersPage/context/useUsersContext";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { auth } = useUsersContext();
  const userRole = auth?.user.role;

  const isTechnicien = !["ADMIN", "GESTIONNAIRE"].includes(
    userRole ?? "TECHNICIEN"
  );
  const getOrderById = useGetOrders({
    enabled: !!id,
    filters: {
      where: {
        id: id ?? "",
      },
    },
  });
  const order = getOrderById.data?.pages?.[0]?.paginatedResult?.[0] ?? null;
  const totalWorkedQuantity =
    order?.orderItems?.reduce((sum, item) => sum + (item.quantity ?? 0), 0) ??
    0;

  const canCreate =
    isTechnicien && totalWorkedQuantity < (order?.article?.quantity ?? 0);
  return (
    <div className="flex h-full flex-col">
      <OrderDetailsPageLayout>
        <div>
          {canCreate && (
            <div className="flex items-end justify-end">
              <AddItems />
            </div>
          )}
          <ItemsTable quantityRequested={order?.article?.quantity ?? 0} />
        </div>
        {order && <ToggleMenuOrder order={order} />}
      </OrderDetailsPageLayout>
    </div>
  );
};

export default OrderDetailsPage;
