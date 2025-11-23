import EmptyPage from "@/myArticles/emptyPage";
import AddOrder from "./AddOrder/AddOrder";
import OrdersList from "./OrdersList";

const OrdersPage = () => {
  const orders = [
    {
      id: "1",
      article: {
        id: "1",
        numero: "commande-1",
        date_export: "12-05-2025",
        status: "En stock",
        received_qty: 150,
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
        civility: "Mr",
        mailAdress: "admin@yopmail.com",
        role: "Administrateur",
        telephoneNumber: "+216 50889123",
      },
      createdAt: "2025-11-21",
    },
  ];

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
      {orders.length > 0 ? (
        <OrdersList />
      ) : (
        <EmptyPage component={<AddOrder />} name="ordre" />
      )}
    </div>
  );
};

export default OrdersPage;
