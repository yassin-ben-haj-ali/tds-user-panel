import EmptyPage from "@/myArticles/emptyPage";
import AddOrder from "./AddOrder/AddOrder";
import OrdersList from "./OrdersList";
import useGetInitialOrders from "./hooks/useGetInitialOrders";
import { useUsersContext } from "@/UsersPage/context/useUsersContext";
import { useEffect } from "react";

const OrdersPage = () => {
  const getOrdersQuery = useGetInitialOrders();
  const { resetState } = useUsersContext();

  useEffect(() => {
    resetState();
  }, []);
  return (
    <div className="relative h-full w-full bg-white space-y-7">
      <div className="w-full space-y-3">
        <h2 className="text-2xl font-semibold">
          Gestion des ordres de fabrication
        </h2>
        <p className="text-justify text-text">
          Trouvez, filtrez et gérez rapidement les ordres de fabrication
          enregistrés dans la plateforme.
        </p>
      </div>
      {getOrdersQuery.data && getOrdersQuery.data.totalCount > 0 ? (
        <OrdersList />
      ) : (
        <EmptyPage component={<AddOrder />} name="ordre" />
      )}
    </div>
  );
};

export default OrdersPage;
