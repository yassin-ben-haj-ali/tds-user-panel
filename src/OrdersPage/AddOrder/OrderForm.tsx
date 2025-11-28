import CustomSelect from "@/components/ui/CustomSelect";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { FormValues } from "./AddOrderType";
import useGetArticles from "@/myArticles/hooks/useGetArticles";
import useGetUsers from "@/UsersPage/hooks/useGetUsers";
import useGetManufacturers from "@/ManufacturersPage/hooks/useGetManufacturers";

type Props = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
};

const OrderForm: React.FC<Props> = ({ register, errors, watch, setValue }) => {
  const getArticlesQuery = useGetArticles("STOCK", { enabled: true });
  const articleOptions =
    getArticlesQuery.data?.pages.flatMap((page) =>
      page.paginatedResult.map((article) => ({
        label: article.number, // or article.name or anything you want
        value: article.id,
      }))
    ) ?? [];

  const getUsersQuery = useGetUsers({ enabled: true });
  const technicienOptions =
    getUsersQuery.data?.pages.flatMap((page) =>
      page.paginatedResult
        .filter((user) => {
          return user.role === "TECHNICIEN";
        })
        .map((user) => ({
          label: `${user.firstName} ${user.lastName}`,
          value: user.id,
        }))
    ) ?? [];
  const getFabriquantsQuery = useGetManufacturers({ enabled: true });
  const fabriquantOptions =
    getFabriquantsQuery.data?.pages.flatMap((page) =>
      page.paginatedResult.map((fabriquant) => ({
        label: fabriquant.name,
        value: fabriquant.id,
      }))
    ) ?? [];

  return (
    <>
      <div className="space-y-3">
        <CustomSelect
          options={articleOptions}
          setValue={(role) => {
            setValue(`articleId`, role);
          }}
          value={watch(`articleId`)}
          required
          label="Commande"
          placeholder="Commande"
          error={errors.articleId?.message}
          {...register("articleId")}
        />
        <CustomSelect
          options={fabriquantOptions}
          required
          setValue={(role) => {
            setValue(`fabriquantId`, role);
          }}
          value={watch(`fabriquantId`)}
          label="Fabriquant"
          placeholder="Fabriquant"
          error={errors.fabriquantId?.message}
          {...register("fabriquantId")}
        />
        <CustomSelect
          options={technicienOptions}
          required
          setValue={(role) => {
            setValue(`technicienId`, role);
          }}
          value={watch(`technicienId`)}
          label="Technicien"
          placeholder="Technicien"
          error={errors.technicienId?.message}
          {...register("technicienId")}
        />
      </div>
    </>
  );
};

export default OrderForm;
