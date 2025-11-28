import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import useVerifyEmail from "./hooks/useVerifyEmail";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token") || undefined;

  const { data, isLoading, isError } = useVerifyEmail(token);

  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        navigate(`/auth/reset-password?token=${data.token}`);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [data, navigate]);

  return (
    <div className="flex flex-col items-center gap-6 sm:min-w-full mt-20">
      {isLoading && <p>Verifying your email...</p>}
      {isError && <p className="text-red-500">Failed to verify your email.</p>}
      {data && (
        <p className="text-green-500">
          Email verified successfully! Redirecting to login...
        </p>
      )}
    </div>
  );
};

export default VerifyEmailPage;
