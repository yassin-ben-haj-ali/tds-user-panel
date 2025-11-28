import { useState } from "react";
import CustomToggle from "./CustomToggle";
import ManufacturerDetails from "@/ManufacturersPage/ViewManufacturer/ManufacturerDetails";
import UserDetails from "@/UsersPage/ViewUser/UserDetails";
import type { Order } from "@/OrdersPage/context/types";

type ToggleMenuOrderProps = {
  order: Order;
};

const ToggleMenuOrder: React.FC<ToggleMenuOrderProps> = ({ order }) => {
  const [selected, setSelected] = useState(1);
  const steps = [
    {
      stepNumber: 1,
      component: <UserDetails user={order.technicien} />,
      show: true,
      name: "technicien",
    },
    {
      stepNumber: 2,
      component: <ManufacturerDetails manufacturer={order.fabriquant} />,
      show: true,
      name: "fabriquant",
    },
  ];

  const visibleSteps = steps.filter((step) => step.show);

  const currentStepComponent =
    visibleSteps.find((step) => step.stepNumber === selected)?.component ||
    null;

  return (
    <div className="relative flex h-2/3 flex-col p-3">
      <div className="flex w-full grow flex-wrap items-center justify-center py-4 md:justify-start">
        <div className="flex gap-0 md:gap-5">
          <CustomToggle
            selected={selected}
            setSelected={setSelected}
            steps={steps}
          />
        </div>
      </div>
      <div className="flex grow flex-col justify-start h-140 max-h-152 overflow-auto">
        {currentStepComponent}
      </div>
    </div>
  );
};

export default ToggleMenuOrder;
