export type Subject =
  | "general"
  | "math"
  | "physics"
  | "chemistry"
  | "biology"
  | "science"
  | "history"
  | "language"
  | "art"
  | "music"
  | "physical_education"
  | "computer_science"
  | "other";
export type Priority = "low" | "medium" | "high";

export interface CreateTask {
  title: string;
  description: string;
  dueDate?: Date | null;
  priority?: Priority[];
  subject?: Subject[];
}

export interface UpdateTask extends CreateTask {
  id: string;
  completed?: boolean;
}

export interface filters {
  search?: string;
  priority?: string[];
  subject?: string[];
  completed?: boolean | string;
}

export interface TaskData {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  dueDate: Date | null;
  priority: Priority[];
  subject: Subject[];
}

export interface CreateTasksProps {
  onSubmit: (data: CreateTask) => void;
  initialValues?: Partial<CreateTask>;
  isEdit?: boolean;
}

export interface TaskCardProps {
  task: UpdateTask;
  onClick?: () => void;
}

export interface UpdateTaskProps {
  onSubmit: (data: UpdateTask) => void;
  initialValues: UpdateTask;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: string;
  priority?: string;
  completed?: boolean;
}

export interface TasksContextType {
  tasks: UpdateTask[];
  loading: boolean;
  filters: filters;
  setFilters: (filters: filters) => void;
  fetchTasks: () => Promise<void>;
  createTask: (task: CreateTask) => Promise<void>;
  updateTask: (task: UpdateTask) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Promise<UpdateTask | undefined>;
}

export interface FilterTasksProps {
  filters: filters;
  updateFilter: (key: keyof filters, value: string | string[]) => void;
  handleStatusChange: (value: string) => void;
  setFilters: (filters: filters) => void;
  priorityOptions: { value: string; label: string }[];
  subjectOptions: { value: string; label: string }[];
  currentStatusValue: string;
}
