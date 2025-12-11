import type { ZodSchema } from "zod";

export const validateSchema = <T>(values: unknown, schema: ZodSchema<T>): Record<string, string> => {
    const result = schema.safeParse(values);
    if (result.success) {
      return {}
    }
  
    const fieldErrors = result.error.flatten().fieldErrors;
    return Object.entries(fieldErrors).reduce((acc, [key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        acc[key] = value[0];
      }
      return acc;
    }, {} as Record<string, string>)
  }