import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import type {
  CreateTask,
  Priority,
  Subject,
  CreateTasksProps,
} from "../types/tasks.types";
import { MultiSelect } from "../../../ui/components/MultiSelect";
import { CreateTaskSchema } from "../schema/tasks.schema";
import type { CreateTaskInput } from "../schema/tasks.schema";
import { subjects, priorities } from "../constants/tasks.constants";
import { Input } from "../../../ui/components/Input";
import { TextArea } from "../../../ui/components/TextArea";
import { Btn } from "../../../ui/components/Btn";
import { FormController } from "../../../ui/components/FormController";

export function CreatePageForm({ onSubmit, isEdit = false }: CreateTasksProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      priority: ["medium"],
      subject: ["general"],
    },
  });

  const onFormSubmit = (data: CreateTaskInput) => {
    const formattedData: CreateTask = {
      ...data,
      dueDate: new Date(data.dueDate),
      subject: data.subject as Subject[],
      priority: data.priority as Priority[],
    };

    onSubmit(formattedData);
  };

  const subjectOptions = subjects.map((s) => ({
    value: s,
    label: s.charAt(0).toUpperCase() + s.slice(1).replace("_", " "),
  }));
  const priorityOptions = priorities.map((p) => ({
    value: p,
    label: p.charAt(0).toUpperCase() + p.slice(1),
  }));

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {isEdit ? "Edit Task" : "Create Task"}
      </h2>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <Input
            {...register("title")}
            variant="tasks_primary"
            placeholder="Task Title"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <TextArea
            {...register("description")}
            variant="tasks_primary"
            placeholder="Task Description"
            rows={3}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <FormController
          control={control}
          name="subject"
          label="Subject"
          error={errors.subject?.message}
          render={({ field }) => (
            <MultiSelect
              options={subjectOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select Subject"
            />
          )}
        />

        <FormController
          control={control}
          name="priority"
          label="Priority"
          error={errors.priority?.message}
          render={({ field }) => (
            <MultiSelect
              options={priorityOptions}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select Priority"
            />
          )}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <Input
            {...register("dueDate")}
            type="datetime-local"
            variant="tasks_primary"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.dueDate.message}
            </p>
          )}
        </div>

        <div className="flex gap-2 pt-4">
          <Btn
            type="button"
            variant="tasks_secondary"
            onClick={() => navigate(-1)}
            className="w-full flex justify-center !md:flex"
          >
            Cancel
          </Btn>
          <Btn
            type="submit"
            variant="tasks_primary"
            className="w-full flex justify-center bg-violet-600 text-white! !hover:bg-violet-700 !md:flex"
          >
            {isEdit ? "Update" : "Create"}
          </Btn>
        </div>
      </form>
    </div>
  );
}
