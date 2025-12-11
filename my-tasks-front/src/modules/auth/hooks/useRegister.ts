import { useCallback, useState } from "react";
import { useAuth } from "./useAuth";
import type { UserRegister } from "../types/auth.types";
import { AxiosError } from "axios";
import { userRegisterSchema } from "../schemas/auth.schemas";
import { validateSchema } from "../../../utils/validateSchema";

export function useRegister() {
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = useCallback(
    async (payload: UserRegister) => {
      setIsSubmitting(true);
      setError(null);

      const validationErrors = validateSchema(payload, userRegisterSchema);

      if (Object.keys(validationErrors).length > 0) {
        setError(Object.values(validationErrors).join(", "));
        setIsSubmitting(false);
        return;
      }

      try {
        const response = await register(payload);
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
    [register]
  );

  return {
    register: handleRegister,
    isSubmitting,
    error,
    resetError: () => setError(null),
  };
}
