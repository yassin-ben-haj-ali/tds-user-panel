import { CustomInput } from "@/components/ui/CustomInput";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type FormValues } from "./types";

const LoginPage = () => {
  const from = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });
  const { register, handleSubmit, formState } = from;
  const { errors } = formState;
  const onSubmit = (formData: FormValues) => {
    console.log(formData);
  };

  return (
    <form
      className="flex flex-col gap-4 sm:min-w-full"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <CustomInput
        type="text"
        id="email"
        placeholder="nomcomplet@email.com"
        label={"Adresse e-mail"}
        width="w-full"
        className={"bg-white"}
        passwordinput={false}
        required={true}
        error={errors.email?.message}
        {...register("email")}
      />
      <CustomInput
        type="password"
        id="password"
        required={true}
        placeholder={"Mot de passe"}
        label={"Mot de passe"}
        width="w-full"
        className="bg-white"
        error={errors.password?.message}
        passwordinput={true}
        {...register("password")}
      />
      <div className="flex">
        <Link
          to="/forgot-password"
          className="form-label w-fit cursor-pointer text-xs text-forgetPassword underline"
        >
          Mot de passe oublié ?
        </Link>
      </div>

      <div className="mt-8 flex w-full flex-col gap-11">
        <Button
          type="submit"
          data-mdb-button-init
          data-mdb-ripple-init
          className="w-full whitespace-nowrap rounded py-2 font-semibold text-white lg:px-40"
          disabled={false}
        >
          Se connecter
        </Button>
      </div>
    </form>
  );
};

export default LoginPage;
