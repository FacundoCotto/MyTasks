import { useCallback, useState } from "react";
import { useAuth } from "./useAuth";
import type { UserLogin } from "../types/auth.types";
import { loginSchema } from "../schemas/auth.schemas";
import { AxiosError } from "axios";
import { validateSchema } from "../../../utils/validateSchema";

export function useLogin() {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(
    async (payload: UserLogin) => {
      setIsSubmitting(true);
      setError(null);

      const validationErrors = validateSchema(payload, loginSchema);
      if (Object.keys(validationErrors).length > 0) {
        setError(Object.values(validationErrors).join(", "));
        setIsSubmitting(false);
        return;
      }

      try {
        const response = await login(payload);
        return response;
      } catch (error) {
        setError(
          error instanceof AxiosError
            ? error.response?.data.message
            : "An unknown error occurred"
        );
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    },
    [login]
  );

  return {
    login: handleLogin,
    isSubmitting,
    error,
    resetError: () => setError(null),
  };
}
