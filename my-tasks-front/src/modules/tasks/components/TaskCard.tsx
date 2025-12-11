import { motion } from "framer-motion";
import { Tag, AlertCircle, CheckCircle2, Circle } from "lucide-react";
import type { TaskCardProps } from "../types/tasks.types";
import { formatDate } from "../../../utils/formatDate";
import { subjectColors, priorityColors } from "../constants/tasks.constants";

export function TaskCard({ task, onClick }: TaskCardProps) {
  const { title, description, priority, subject, dueDate, completed } = task;

  const isHighPriority = priority?.includes("high");

  return (
    <motion.article
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`
        group relative cursor-pointer overflow-hidden rounded-2xl border p-5 transition-all duration-300
        ${
          completed
            ? "bg-slate-50/50 border-slate-200/60 opacity-75 grayscale-[0.5]"
            : "bg-white/80 border-white/50 shadow-sm hover:shadow-md hover:border-violet-200/50 backdrop-blur-sm"
        }
      `}
    >
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-violet-50/0 via-violet-50/0 to-violet-100/0 transition-opacity duration-300 group-hover:from-violet-50/50 group-hover:to-violet-100/50 group-hover:opacity-100" />

      {isHighPriority && !completed && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500/80" />
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          {}
          <div className="flex items-start gap-3">
            <div
              className={`mt-1 transition-colors ${
                completed
                  ? "text-emerald-500"
                  : "text-slate-300 group-hover:text-violet-500"
              }`}
            >
              {completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </div>
            <div>
              <h3
                className={`text-lg font-bold leading-tight transition-colors ${
                  completed
                    ? "text-slate-500 line-through"
                    : "text-slate-800 group-hover:text-violet-700"
                }`}
              >
                {title}
              </h3>
              <p
                className={`mt-1 text-sm line-clamp-2 ${
                  completed ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            {subject?.map((s) => (
              <span
                key={s}
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${subjectColors[s]}`}
              >
                <Tag size={12} />
                <span className="capitalize">{s.replace("_", " ")}</span>
              </span>
            ))}

            {priority?.map((p) => (
              <span
                key={p}
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${priorityColors[p]}`}
              >
                <AlertCircle size={12} />
                <span className="capitalize">{p}</span>
              </span>
            ))}
          </div>
        </div>

        {dueDate && (
          <div
            className={`flex items-center justify-center rounded-xl border px-3 py-2 text-xs font-semibold tracking-wide
                ${
                  completed
                    ? "border-slate-200 bg-slate-100 text-slate-400"
                    : "border-slate-100 bg-slate-50 text-slate-500 group-hover:border-violet-100 group-hover:bg-violet-50 group-hover:text-violet-600"
                }
            `}
          >
            <span className="text-xs">{formatDate(dueDate)}</span>
          </div>
        )}
      </div>
    </motion.article>
  );
}
