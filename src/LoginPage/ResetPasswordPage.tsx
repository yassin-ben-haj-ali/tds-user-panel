import { CustomInput } from "@/components/ui/CustomInput";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "@/components/ui/Loader/Loader";
import { resetPasswordSchema, type ResetPasswordFormValues } from "./types";
import useResetPassword from "./hooks/useResetPassword";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();

  const { register, handleSubmit, formState } =
    useForm<ResetPasswordFormValues>({
      resolver: zodResolver(resetPasswordSchema),
    });
  const { errors } = formState;
  const { resetPasswordLoading, resetPasswordMutation } = useResetPassword();

  const onSubmit = async (formData: ResetPasswordFormValues) => {
    const token = searchParams.get("token");
    if (!token) return;
    await resetPasswordMutation({ token, password: formData.password });
  };

  return (
    <form
      className="flex flex-col gap-4 sm:min-w-full"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Définir votre mot de passe</h2>
        <p className="text-sm text-gray-600">
          Créez un mot de passe sécurisé pour votre compte
        </p>
      </div>

      <CustomInput
        type="password"
        id="password"
        required={true}
        placeholder="Mot de passe"
        label="Nouveau mot de passe"
        width="w-full"
        className="bg-white"
        error={errors.password?.message}
        passwordinput={true}
        {...register("password")}
      />

      <CustomInput
        type="password"
        id="confirmPassword"
        required={true}
        placeholder="Confirmer le mot de passe"
        label="Confirmer le mot de passe"
        width="w-full"
        className="bg-white"
        error={errors.confirmPassword?.message}
        passwordinput={true}
        {...register("confirmPassword")}
      />

      <div className="mt-6 flex w-full flex-col">
        <Button
          type="submit"
          className="w-full whitespace-nowrap rounded py-2 font-semibold text-white"
          disabled={resetPasswordLoading}
        >
          {resetPasswordLoading ? (
            <Loader fillColor="#FFFFFF" width="25" height="25" />
          ) : (
            "Définir le mot de passe"
          )}
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordPage;
