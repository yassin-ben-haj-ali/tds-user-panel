import { useRef } from "react";
import Loader from "@/components/ui/Loader/Loader";
import NoResults from "@/components/ui/NoResults";
import type { Order } from "./OrderCard";
import AddOrder from "../AddOrder/AddOrder";
import OrderCard from "./OrderCard";
import EmptyPage from "@/myArticles/emptyPage";

const Orders = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loading = false;
  const error = false;

  const ListOrders: Order[] = [
    {
      id: "1",
      article: {
        id: "1",
        number: "commande-1",
        exportedAt: "12-05-2025",
        status: "En stock",
        quantity: 150,
      },
      fabriquant: {
        id: "2",
        name: "usine2",
        mailAdress: "usine2@yopmail.com",
        adress: "rue d'independance - 4030",
        telephoneNumber: "+216 50889126",
        createdAt: "2025-09-15",
      },
      technicien: {
        id: "3",
        firstName: "admin",
        lastName: "super",
        mailAdress: "admin@yopmail.com",
        role: "Administrateur",
        telephoneNumber: "+216 50889123",
      },
      createdAt: "2025-11-21",
    },
  ];

  if (loading) {
    return (
      <Loader className="flex h-full w-full items-center justify-center" />
    );
  }

  if (error) {
    return <EmptyPage name="ordre" component={<AddOrder />} />;
  }
  return ListOrders.length ? (
    <div
      ref={containerRef}
      className="h-full max-h-[400px] overflow-y-auto"
    >
      {" "}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {ListOrders.map((order) => (
          <OrderCard order={order} />
        ))}
      </div>
    </div>
  ) : (
    <NoResults />
  );
};

export default Orders;
