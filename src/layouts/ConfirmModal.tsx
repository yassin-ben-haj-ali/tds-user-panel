import DeleteIcon from "@/assets/DeleteIcon";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { MouseEventHandler } from "react";
import Loader from "@/components/ui/Loader/Loader";
import TrashImage from "@/assets/TrashImage";

type Props = {
  name: string;
  type: "delete";
  title: string;
  description: string;
  handleConfirm?: MouseEventHandler<HTMLButtonElement>;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  disabledConfirmModal?: boolean;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean | null>>;
  buttonTitle?: string;
  buttonClassName?: string;
  iconColor?: string;
  saveClassName?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  handleClickCancel?: MouseEventHandler<HTMLButtonElement>;
};

const ConfirmModal = (props: Props) => {
  return (
    <div>
      <Dialog
        open={props?.isOpen}
        onOpenChange={props.setIsOpen}
        key={props.description}
      >
        <DialogTrigger asChild type="button">
          {props.name !== "User Modal" && props.name !== "Company Modal" && (
            <button
              type="button"
              className={`rounded-md border p-1 ${
                props?.buttonClassName ?? null
              } ${
                props?.disabledConfirmModal
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              disabled={props?.disabledConfirmModal}
              onClick={(e) => {
                e.stopPropagation();
                if (props?.onClick) {
                  props.onClick(e);
                }
              }}
            >
              {props.type === "delete" ? (
                <DeleteIcon color={props.iconColor} />
              ) : (
                <Button type="button" className="relative px-8 py-4 text-lg">
                  {props.buttonTitle}
                </Button>
              )}
            </button>
          )}
        </DialogTrigger>
        <DialogContent className="flex max-w-[300px] flex-wrap justify-center py-8 sm:max-w-[335px] lg:max-h-[650px] lg:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="flex justify-center">
              {props.type === "delete" && <TrashImage />}
            </DialogTitle>
            <DialogDescription className="flex flex-col items-center text-[#2C2C2C]">
              <span className="mb-4 text-center text-3xl font-semibold">
                {props.title}
              </span>
              <div className="text-center">{props.description}</div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="w-full justify-center gap-2">
            <DialogTrigger asChild>
              <Button
                type="button"
                className="w-1/2"
                variant="outline"
                onClick={(e) => {
                  if (props?.handleClickCancel) {
                    props.handleClickCancel(e);
                  } else {
                    e.stopPropagation();
                  }
                }}
              >
                {props.cancelButtonText || "annuler"}
              </Button>
            </DialogTrigger>
            <Button
              type="submit"
              disabled={
                (props.isLoading !== undefined && props.isLoading) ||
                (props?.disabled !== undefined && props?.disabled)
              }
              className={`w-1/2 ${
                props.disabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              } `}
              onClick={props.handleConfirm}
            >
              {props.isLoading !== undefined && props.isLoading ? (
                <Loader fillColor="#FFFFFF" width="25" height="25" />
              ) : (
                props.confirmButtonText || "confimer"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
