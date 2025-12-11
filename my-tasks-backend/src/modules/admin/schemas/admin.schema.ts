import z from "zod";

export const editUserSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(100, {
      message: "Name must be at most 100 characters long",
    })
    .trim()
    .optional(),
  email: z
    .email({
      message: "Invalid email address",
    })
    .toLowerCase()
    .trim()
    .optional(),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters long",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    })
    .optional(),
  role: z
    .enum(["user", "admin"], {
      message: "Role must be either 'user' or 'admin'",
    })
    .optional(),
});

export type EditUserInput = z.infer<typeof editUserSchema>;
