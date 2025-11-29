import { CustomInput } from "@/components/ui/CustomInput";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import type { FormValues } from "./AddArticleType";
import { CustomDatePicker } from "@/components/ui/CustomDatePicker";
import { CalendarDate } from "@internationalized/date";

type Props = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  watch: UseFormWatch<FormValues>;
};

function dateToDateValue(date: Date) {
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  );
}

const ArticleForm = ({ register, errors, setValue, watch }: Props) => {
  return (
    <>
      <div className="space-y-3">
        <CustomInput
          required
          label="Numéro d'article"
          placeholder="Numéro d'article"
          error={errors.number?.message}
          {...register("number")}
        />
        <CustomInput
          required
          label="Quantité réçu"
          placeholder="Quantité réçu"
          type="number"
          error={errors.quantity?.message}
          {...register("quantity", { valueAsNumber: true })}
        />
        <CustomDatePicker
          id="date"
          label="date d'export"
          className="pointer-events-auto flex w-full items-center justify-center rounded-md border border-[#E6E6E6] bg-[#FAFAFA] text-[#4c4c4c] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
          required={true}
          value={
            watch("exportedAt") ? dateToDateValue(watch("exportedAt")) : null
          }
          error={errors.exportedAt?.message}
          onChange={(dateValue) => {
            if (dateValue) {
              const { year, month, day } = dateValue;
              // Obtenir l'heure actuelle
              const now = new Date();
              const hours = now.getHours();
              const minutes = now.getMinutes();
              const seconds = now.getSeconds();
              const milliseconds = now.getMilliseconds();
              // Créer la date avec l'année, le mois, et le jour sélectionnés, plus l'heure actuelle
              const formattedDate = new Date(
                year,
                month - 1,
                day,
                hours,
                minutes,
                seconds,
                milliseconds
              );
              setValue("exportedAt", formattedDate);
            }
          }}
        />
      </div>
    </>
  );
};

export default ArticleForm;
