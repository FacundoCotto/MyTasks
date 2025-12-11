import type { Priority, Subject } from "../types/tasks.types";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import { dateFnsLocalizer } from "react-big-calendar";

export const subjects: Subject[] = [
  "general",
  "math",
  "physics",
  "chemistry",
  "biology",
  "science",
  "history",
  "language",
  "art",
  "music",
  "physical_education",
  "computer_science",
  "other",
];

export const priorities: Priority[] = ["low", "medium", "high"];

export const priorityColors: Record<Priority, string> = {
  low: "bg-emerald-100/50 text-emerald-700 border-emerald-200/50",
  medium: "bg-amber-100/50 text-amber-700 border-amber-200/50",
  high: "bg-rose-100/50 text-rose-700 border-rose-200/50",
};

export const subjectColors: Record<Subject, string> = {
  general: "bg-slate-100 text-slate-700 border-slate-200",
  math: "bg-blue-100 text-blue-700 border-blue-200",
  physics: "bg-violet-100 text-violet-700 border-violet-200",
  chemistry: "bg-teal-100 text-teal-700 border-teal-200",
  biology: "bg-green-100 text-green-700 border-green-200",
  science: "bg-indigo-100 text-indigo-700 border-indigo-200",
  history: "bg-orange-100 text-orange-700 border-orange-200",
  language: "bg-pink-100 text-pink-700 border-pink-200",
  art: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
  music: "bg-cyan-100 text-cyan-700 border-cyan-200",
  physical_education: "bg-red-100 text-red-700 border-red-200",
  computer_science: "bg-sky-100 text-sky-700 border-sky-200",
  other: "bg-gray-100 text-gray-700 border-gray-200",
};

const locales = {
  "en-US": enUS,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const subjectOptions = subjects.map((s) => ({
  value: s,
  label: s.charAt(0).toUpperCase() + s.slice(1).replace("_", " "),
}));
export const priorityOptions = priorities.map((p) => ({
  value: p,
  label: p.charAt(0).toUpperCase() + p.slice(1),
}));
