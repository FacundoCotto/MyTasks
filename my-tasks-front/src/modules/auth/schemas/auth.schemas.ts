import z from "zod";

export const userRegisterSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: "Name must be at least 3 characters long",
      })
      .max(100, {
        message: "Password must be at most 100 characters long",
      })
      .trim(),
    email: z
      .email({
        message: "Invalid email address",
      })
      .toLowerCase()
      .trim(),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters long",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      }),
  })
  .required();

export const loginSchema = z
  .object({
    email: z
      .email({
        message: "Invalid email address",
      })
      .toLowerCase()
      .trim(),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters long",
      }),
  })
  .required();

export const verify2FASchema = z
  .object({
    email: z
      .email({
        message: "Invalid email address",
      })
      .toLowerCase()
      .trim(),
    code: z
      .string()
      .length(6, {
        message: "The verification code must be 6 digits long",
      }),
  })
  .required();