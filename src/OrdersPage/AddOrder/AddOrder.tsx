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
import OrderForm from "./OrderForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addOrderSchema, type FormValues } from "./AddOrderType";
import useCreateOrder from "../hooks/useCreateOrder";
import type { Order } from "../context/types";

type AddOrderProps = {
  editMode?: boolean;
  order?: Order;
};

const AddOrder: React.FC<AddOrderProps> = ({ editMode, order }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(addOrderSchema),
    defaultValues: {} as FormValues,
  });
  const { createOrderMutation, createOrderLoading } = useCreateOrder();
  const { handleSubmit, register, reset, formState, setValue, watch } = form;
  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    await createOrderMutation(data);
    setOpen(false);
  };
  useEffect(() => {
    if (open) {
      if (editMode && order) {
        reset(order);
      } else {
        reset();
      }
    }
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {editMode ? (
          <button className="rounded-md border p-1" type="button">
            <EditIcon />
          </button>
        ) : (
          <Button type="button" className="h-10">
            Créer un ordre
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
              <span>{editMode ? "Modifier" : "Ajouter"} ordre</span>
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
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.stopPropagation();
            handleSubmit(onSubmit)(e);
          }}
          noValidate
        >
          <OrderForm
            register={register}
            watch={watch}
            setValue={setValue}
            errors={errors}
          />
          <DialogFooter className="flex items-center justify-center!">
            <Button className="w-4/5" type="submit">
              {createOrderLoading ? (
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

export default AddOrder;
