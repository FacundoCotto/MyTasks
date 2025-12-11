import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface FormControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  render: (props: { field: any }) => React.ReactElement;
  label?: string;
  error?: string;
}

export function FormController<T extends FieldValues>({
  control,
  name,
  render,
  label,
  error,
}: FormControllerProps<T>) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Controller control={control} name={name} render={render} />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
