import { useCallback, useState } from "react";
import { AxiosError } from "axios";
import { useAuth } from "./useAuth";
import { verify2FASchema } from "../schemas/auth.schemas";
import { validateSchema } from "../../../utils/validateSchema";
import type { Verify2FAPayload } from "../types/auth.types";



export function useVerify2FA() {
  const { verify2FA } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = useCallback(
    async (payload: Verify2FAPayload) => {
      setIsSubmitting(true);
      setError(null);

      const validationErrors = validateSchema(payload, verify2FASchema);
      if (Object.keys(validationErrors).length > 0) {
        setError(Object.values(validationErrors).join(", "));
        setIsSubmitting(false);
        return;
      }

      try {
        const response = await verify2FA(payload);
        return response;
      } catch (err) {
        setError(
          err instanceof AxiosError
            ? err.response?.data?.message ?? "Error verifying code"
            : "An unknown error occurred"
        );
        throw err;
      } finally {
        setIsSubmitting(false);
      }
    },
    [verify2FA]
  );

  return {
    verifyCode: handleVerify,
    isSubmitting,
    error,
    resetError: () => setError(null),
  };
}
