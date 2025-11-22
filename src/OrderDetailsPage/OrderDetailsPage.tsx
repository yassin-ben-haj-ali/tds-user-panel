import AddItems from "./AddItem/AddItems";
import ItemsTable from "./ItemsList/itemsList";
import OrderDetailsPageLayout from "./OrderDetailsPageLayout";
import ToggleMenuOrder from "./ToggleMenu/ToggleMenuOrder";

const OrderDetailsPage = () => {
  const order = {
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
  };
  return (
    <div className="flex h-full flex-col">
      <OrderDetailsPageLayout>
        <div>
          <div className="flex items-end justify-end">
            <AddItems />
          </div>
          <ItemsTable />
        </div>
        <ToggleMenuOrder order={order} />
      </OrderDetailsPageLayout>
    </div>
  );
};

export default OrderDetailsPage;
