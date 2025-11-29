import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { FormValues } from "../AddManufacturer/AddManufacturerType";
import ToastMessage from "@/ToastMessage";

const createManufacturers = async (
  credentials: FormValues,
  axiosPrivate: AxiosInstance
) => {
  const response = await axiosPrivate.post("/fabriquant/", credentials);
  return response.data;
};

const usecreateManufacturers = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const {
    mutateAsync: createManufacturersMutation,
    isPending: createManufacturersLoading,
  } = useMutation({
    mutationFn: (data: FormValues) => createManufacturers(data, axiosPrivate),
    onSuccess: () => {
        ToastMessage({ type: "success", message: "Fabriquant créé !" });
        queryClient.invalidateQueries({
          queryKey: ["manufacturers"],
        });
      },
      onError: () => {
        ToastMessage({
          type: "error",
          message: "Erreur lors de la création de fabriquant.",
        });
      },
  });
  return {
    createManufacturersMutation,
    createManufacturersLoading,
  };
};
export default usecreateManufacturers;
