import { useNavigate } from "react-router-dom";
import { Btn } from "../../../ui/components/Btn";
import { useState } from "react";
import { useVerify2FA } from "../hooks/useVerify2FA";

import { AxiosError } from "axios";

import { CodeInput } from "../../../ui/components/CodeInput";
import { authService } from "../services/auth.service";
import { env } from "../../../ui/env/env";

export default function VerifyCodeForm() {
  const { verifyCode, isSubmitting, error, resetError } = useVerify2FA();
  const navigate = useNavigate();

  const [code, setCode] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setSuccessMessage(null);
    setLocalError(null);
    try {
      const storage = authService.getClientStorage();
      const user = storage?.getItem(env.USER_STORAGE_KEY);
      const { email } = JSON.parse(user ?? "");

      resetError();
      await verifyCode({ code, email });
      setSuccessMessage("Code verified successfully");
      navigate("/mytasks");
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.message) {
        setLocalError(err.response.data.message);
      } else {
        setLocalError("An unknown error occurred");
      }
    }
  };

  const handleCodeComplete = (code: string) => {
    setCode(code);
  };

  const displayError = error || localError;

  return (
    <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
      <CodeInput length={6} onComplete={handleCodeComplete} />

      {displayError && !successMessage && (
        <p className="rounded-lg border border-red-500/20 bg-red-50 px-4 py-3 text-sm text-red-600 font-medium">
          {displayError}
        </p>
      )}

      {successMessage && !displayError && (
        <p className="rounded-lg border border-emerald-500/20 bg-emerald-50 px-4 py-3 text-sm text-emerald-600 font-medium">
          {successMessage}
        </p>
      )}
      <Btn variant="auth" {...{ disabled: isSubmitting }}>
        {isSubmitting ? "Verifying..." : "Verify code"}
      </Btn>
    </form>
  );
}
