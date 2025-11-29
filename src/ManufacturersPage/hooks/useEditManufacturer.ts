import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import ToastMessage from "@/ToastMessage";

type ManufacturerEditType = {
  name?: string;
  adress?: string;
  mailAdress?: string;
  telephoneNumber?: string;
  countryCode?: string;
};

const editManufacturer = async (
  credentials: ManufacturerEditType,
  manufacturerId: string,
  axiosPrivate: AxiosInstance
) => {
  const response = await axiosPrivate.patch(
    `/fabriquant/${manufacturerId}`,
    credentials
  );
  return response.data;
};

const useEditManufacturer = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const {
    mutateAsync: editManufacturerMutation,
    isPending: editManufacturersLoading,
  } = useMutation({
    mutationFn: ({ data, id }: { data: ManufacturerEditType; id: string }) =>
      editManufacturer(data, id, axiosPrivate),
    onSuccess: () => {
      ToastMessage({
        type: "success",
        message: "Fabriquant mis à jour !",
      });
      queryClient.invalidateQueries({
        queryKey: ["manufacturers"],
      });
    },
    onError: () => {
      ToastMessage({
        type: "error",
        message: "Une erreur est survenue lors de la mise à jour.",
      });
    },
  });
  return {
    editManufacturerMutation,
    editManufacturersLoading,
  };
};
export default useEditManufacturer;
