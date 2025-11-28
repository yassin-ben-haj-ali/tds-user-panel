import useGetOrders from "@/OrdersPage/hooks/useGetOrders";
import AddItems from "./AddItem/AddItems";
import OrderDetailsPageLayout from "./OrderDetailsPageLayout";
import ToggleMenuOrder from "./ToggleMenu/ToggleMenuOrder";
import { useParams } from "react-router-dom";
import ItemsTable from "./ItemsList/ItemsList";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const getOrderById = useGetOrders({
    enabled: !!id,
    filters: {
      where: {
        id: id ?? "",
      },
    },
  });
  const order = getOrderById.data?.pages?.[0]?.paginatedResult?.[0] ?? null;
  return (
    <div className="flex h-full flex-col">
      <OrderDetailsPageLayout>
        <div>
          <div className="flex items-end justify-end">
            <AddItems />
          </div>
          <ItemsTable />
        </div>
        {order && <ToggleMenuOrder order={order} />}
      </OrderDetailsPageLayout>
    </div>
  );
};

export default OrderDetailsPage;
