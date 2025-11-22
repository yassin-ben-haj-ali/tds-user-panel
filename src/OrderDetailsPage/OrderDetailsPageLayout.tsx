import BackButton from "@/components/ui/BackButton";

type OrderDetailsPageLayoutProps = {
  children: React.ReactNode;
};

const OrderDetailsPageLayout: React.FC<OrderDetailsPageLayoutProps> = ({
  children,
}) => {
  return (
    <div className="mr-6 h-full max-h-[calc(100%-300px)] min-h-124 space-y-7">
      <div className="w-full space-y-2">
        <div className="mb-6 mt-6">
          <BackButton
            text="Retour"
            className="text-xl text-primary"
            route={-1}
          />
          <h1 className="mx-3 my-4 text-2xl font-semibold text-[#4C4C4C]">
            Détails d'ordre de fabrication
          </h1>
          <h1 className="mx-3 my-4 text-2xl font-semibold text-[#4C4C4C]"></h1>
          <div className="h-full flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPageLayout;
