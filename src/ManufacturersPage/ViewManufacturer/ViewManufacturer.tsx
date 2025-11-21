import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type ReactElement, useState } from "react";
import { X } from "lucide-react";
import Loader from "@/components/ui/Loader/Loader";
import ManufacturerDetails from "./ManufacturerDetails";

export type Manufacturer = {
  id: string;
  name: string;
  adress: string;
  mailAdress: string;
  telephoneNumber: string;
  createdAt: string;
};

type Props = {
  id?: string;
  showingComponent: ReactElement;
  manufacturerData?: {
    data?: Manufacturer;
    isLoading?: boolean;
  };
};

const ViewManufacturerInfo = ({
  showingComponent,
  manufacturerData,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{showingComponent}</DialogTrigger>
      <DialogContent
        className="max-h-200 w-[400px] overflow-y-auto sm:w-[425px] sm:min-w-[500px]"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(255, 255, 255, 0.80)",
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-text">
            <div className="flex w-full items-center justify-between">
              <span>{manufacturerData?.data?.name}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close dialog"
              >
                <X className="size-4 text-label" />
              </button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {manufacturerData?.isLoading && (
            <Loader className="flex h-20 w-full items-center justify-center" />
          )}
          {manufacturerData?.data && (
            <ManufacturerDetails manufacturer={manufacturerData.data} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewManufacturerInfo;
