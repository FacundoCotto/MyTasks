import type { CardProps } from "../types/ui.types";

export function Card({ title, subtitle, children, className = "" }: CardProps) {
  return (
    <section
      className={`relative rounded-3xl border border-white/50 bg-white/80 p-8 shadow-[0_0_50px_-12px_rgba(124,58,237,0.25)] backdrop-blur-md ${className}`}
    >
      <div className="absolute inset-0 -z-10 rounded-3xl bg-linear-to-br from-violet-100/50 via-white/50 to-violet-200/50 opacity-50" />
      <header className="mb-6">
        {title ? (
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-indigo-600 drop-shadow-sm">
            {title}
          </h2>
        ) : null}
        {subtitle && (
          <p className="mt-2 text-sm text-slate-500 font-medium">{subtitle}</p>
        )}
      </header>
      {children}
    </section>
  );
}
