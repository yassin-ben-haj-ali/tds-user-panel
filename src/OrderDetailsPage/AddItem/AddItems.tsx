import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Loader from "@/components/ui/Loader/Loader";
import EditIcon from "@/assets/EditIcon";
import ItemsForm from "./ItemsForm";
import useCreateOrderItems from "../hooks/useCreateOrderItems";
import { useParams } from "react-router-dom";

type Items = {
  quantité: number;
  createdAt: string;
};

type AddItemsProps = {
  editMode?: boolean;
  items?: Items;
};

const AddItems: React.FC<AddItemsProps> = ({ editMode }) => {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState<number | null>(null);
  const { id } = useParams();
  const { createOrderItemsMutation, createOrderItemsLoading } =
    useCreateOrderItems();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;
    await createOrderItemsMutation({
      orderId: id,
      quantity: quantity ?? 0,
    });
    setOpen(false);
    setQuantity(null);
  };

  useEffect(() => {
    setQuantity(null);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {editMode ? (
          <button className="rounded-md border p-1" type="button">
            <EditIcon />
          </button>
        ) : (
          <Button type="button" className="h-10">
            Créer une liste
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="max-h-200 w-[400px] overflow-y-auto sm:w-[425px] sm:min-w-[500px]"
        style={{
          boxShadow: "0px 0px 10px 0px rgba(255, 255, 255, 0.80)",
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            <div className="flex w-full items-center justify-between">
              <span>{editMode ? "Modifier" : "Ajouter"} liste</span>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <X className="size-4 text-label" />
              </button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form className="space-y-3" noValidate onSubmit={handleSubmit}>
          <ItemsForm quantity={quantity} setQuantity={setQuantity} />
          <DialogFooter className="flex items-center justify-center!">
            <Button className="w-4/5" type="submit">
              {createOrderItemsLoading ? (
                <Loader fillColor="#FFFFFF" width="25" height="25" />
              ) : editMode ? (
                "Modifier"
              ) : (
                "Ajouter"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddItems;
