import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Loader from "@/components/ui/Loader/Loader";
import UserForm from "./ManufacturerForm";
import { addManufacturerSchema, type FormValues } from "./AddManufacturerType";
import EditIcon from "@/assets/EditIcon";
import usecreateManufacturers from "../hooks/useCreateManufacturers";
import type { Manufacturer } from "../context/types";
import useEditManufacturer from "../hooks/useEditManufacturer";

type AddManufacturerProps = {
  editMode?: boolean;
  manufacturer?: Manufacturer;
};

const AddManufacturer: React.FC<AddManufacturerProps> = ({
  editMode,
  manufacturer,
}) => {
  const [open, setOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(addManufacturerSchema),
  });
  const { handleSubmit, register, reset, formState, setValue, watch } = form;
  const { errors } = formState;

  const { createManufacturersMutation, createManufacturersLoading } =
    usecreateManufacturers();
  const { editManufacturerMutation, editManufacturersLoading } =
    useEditManufacturer();

  const onSubmit = async (data: FormValues) => {
    if (editMode && manufacturer) {
      await editManufacturerMutation({ data, id: manufacturer.id });
    } else {
      await createManufacturersMutation(data);
    }
    setOpen(false);
  };
  useEffect(() => {
    if (open) {
      if (editMode && manufacturer) {
        reset(manufacturer);
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
          <Button type="button">Ajouter un fabriquant</Button>
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
              <span>{editMode ? "Modifier" : "Ajouter"} fabriquant</span>
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
          <UserForm
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
          <DialogFooter className="flex items-center justify-center!">
            <Button className="w-4/5" type="submit">
              {createManufacturersLoading || editManufacturersLoading ? (
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

export default AddManufacturer;
