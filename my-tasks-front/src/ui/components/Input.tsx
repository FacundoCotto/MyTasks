import type { InputProps } from "../types/ui.types";

export function Input({ variant = "", className = "", ...props }: InputProps) {
  const variants: Record<string, string> = {
    primary:
      "px-6 py-3 border-[2px] border-black hover:border-violet-500 text-black rounded-lg w-full",
    tasks_primary:
      "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm p-2 border",
  };

  const variantClass = variants[variant] || "";

  return <input className={`${variantClass} ${className}`} {...props} />;
}
