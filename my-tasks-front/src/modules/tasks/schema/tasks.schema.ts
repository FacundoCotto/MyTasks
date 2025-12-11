import { z } from "zod";

export const CreateTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  subject: z.array(z.string()).min(1, "Select at least one subject"),
  priority: z.array(z.string()).min(1, "Select at least one priority"),
  dueDate: z.string().min(1, "Due date is required"),
});

export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;

export const EditTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  subject: z.array(z.string()).min(1, "Select at least one subject"),
  priority: z.array(z.string()).min(1, "Select at least one priority"),
  dueDate: z.string().min(1, "Due date is required"),
  completed: z.boolean().optional(),
});

export type EditTaskInput = z.infer<typeof EditTaskSchema>;
