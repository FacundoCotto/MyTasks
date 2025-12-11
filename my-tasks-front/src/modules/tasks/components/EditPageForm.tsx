import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import type {
  UpdateTaskProps,
  Subject,
  Priority,
  UpdateTask,
} from "../types/tasks.types";
import { useEffect } from "react";
import { MultiSelect } from "../../../ui/components/MultiSelect";
import { subjects, priorities } from "../constants/tasks.constants";
import { EditTaskSchema, type EditTaskInput } from "../schema/tasks.schema";
import { Input } from "../../../ui/components/Input";
import { TextArea } from "../../../ui/components/TextArea";
import { Btn } from "../../../ui/components/Btn";
import { FormController } from "../../../ui/components/FormController";

export function EditPageForm({ onSubmit, initialValues }: UpdateTaskProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<EditTaskInput>({
    resolver: zodResolver(EditTaskSchema),
    defaultValues: {
      ...initialValues,
      dueDate: initialValues.dueDate
        ? new Date(initialValues.dueDate).toISOString().slice(0, 16)
        : "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
        dueDate: initialValues.dueDate
          ? new Date(initialValues.dueDate).toISOString().slice(0, 16)
          : "",
      });
    }
  }, [initialValues, reset]);

  const onFormSubmit = (data: EditTaskInput) => {
    const formattedData: UpdateTask = {
      ...initialValues,
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
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Task</h2>
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
              placeholder="Subject"
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
              placeholder="Priority"
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

        <div className="flex items-center">
          <input
            {...register("completed")}
            type="checkbox"
            id="completed"
            className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
          />
          <label
            htmlFor="completed"
            className="ml-2 block text-sm text-gray-900"
          >
            Completed
          </label>
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
            className="w-full flex justify-center bg-violet-600! text-white! !hover:bg-violet-700 !md:flex"
          >
            Update
          </Btn>
        </div>
      </form>
    </div>
  );
}
