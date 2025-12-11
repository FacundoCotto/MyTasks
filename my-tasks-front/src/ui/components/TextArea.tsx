import type { TextAreaProps } from "../types/ui.types";

export function TextArea({
  variant = "",
  className = "",
  rows = 4,
  ...props
}: TextAreaProps) {
  const variants: Record<string, string> = {
    primary: "px-6 py-4 border-[2px] border-black text-black rounded-lg w-full",
    tasks_primary:
      "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm p-2 border",
  };

  const variantClass = variants[variant] || "";

  return (
    <textarea
      rows={rows}
      className={`${variantClass} ${className}`}
      {...props}
    />
  );
}
