import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email" }),
    message: z.string().min(1, { message: "Message is required" }).max(500, { message: "Message must be less than 500 characters" }),
}).required();