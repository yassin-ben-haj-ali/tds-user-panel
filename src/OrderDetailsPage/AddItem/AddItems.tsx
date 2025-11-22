import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { X } from "lucide-react";
import Loader from "@/components/ui/Loader/Loader";
import EditIcon from "@/assets/EditIcon";
import ItemsForm from "./ItemsForm";

type Items = {
  quantité: number;
  createdAt: string;
};

type AddItemsProps = {
  editMode?: boolean;
  items?: Items;
};

const AddItems: React.FC<AddItemsProps> = ({ editMode }) => {
  const isLoading = false;
  const [open, setOpen] = useState(false);

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
        <form className="space-y-3" noValidate>
          <ItemsForm />
          <DialogFooter className="flex items-center justify-center!">
            <Button className="w-4/5" type="submit">
              {isLoading ? (
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
