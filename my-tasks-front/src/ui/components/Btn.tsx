import type { BtnProps } from "../types/ui.types";

export function Btn({
  children,
  variant = "primary",
  className = "",
  ...props
}: BtnProps) {
  const variants: Record<string, string> = {
    primary:
      "bg-black hover:bg-violet-600 hover:text-white text-white px-10 py-3 rounded-full font-semibold transform hover:scale=105 transition-transform duration-300 cursor-pointer md:flex hidden italic",
    auth: "bg-black hover:bg-violet-600 hover:text-white text-white px-10 py-3 rounded-full font-semibold transform hover:scale=105 transition-transform duration-300 cursor-pointer md:flex italic",
    motion:
      "bg-black hover:bg-violet-600 hover:text-white text-white px-10 py-3 rounded-full font-semibold transform hover:scale=105 transition-transform duration-300 cursor-pointer md:flex italic",
    tasks_primary: `bg-violet-600 text-white px-10 py-3 rounded-full font-semibold transform hover:scale-105 transition-transform duration-300 cursor-pointer md:flex italic shadow-lg shadow-violet-500/30 hover:bg-violet-700`,
    tasks_secondary:
      "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 px-10 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 cursor-pointer md:flex italic",
  };

  const variantClass = variants[variant] || variants.primary;

  return (
    <button className={`${className} ${variantClass}`} {...props}>
      {children}
    </button>
  );
}
