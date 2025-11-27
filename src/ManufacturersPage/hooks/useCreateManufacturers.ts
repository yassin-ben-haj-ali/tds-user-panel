import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosInstance } from "axios";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import type { FormValues } from "../AddManufacturer/AddManufacturerType";

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
      queryClient.invalidateQueries({
        queryKey: ["manufacturers"],
      });
    },
  });
  return {
    createManufacturersMutation,
    createManufacturersLoading,
  };
};
export default usecreateManufacturers;
