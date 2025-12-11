import { createContext } from "react";
import type { TasksContextType } from "../types/tasks.types";

export const TasksContext = createContext<TasksContextType | undefined>(undefined);
