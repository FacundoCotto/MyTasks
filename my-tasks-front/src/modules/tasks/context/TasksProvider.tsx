import { useCallback, useEffect, useState, useMemo } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { tasksService } from "../services/tasks.service";
import type { CreateTask, UpdateTask, filters } from "../types/tasks.types";
import { TasksContext } from "./TasksContext";

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<UpdateTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<filters>({
    search: "",
    priority: [],
    subject: [],
    completed: "all",
  });

  const fetchTasks = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const response = await tasksService.getAllTasks(user.id, filters);

      let fetchedTasks: UpdateTask[] = [];

      if (response.data && Array.isArray(response.data.tasks)) {
        fetchedTasks = response.data.tasks;
      } else if (Array.isArray(response)) {
        fetchedTasks = response;
      } else if (response.tasks && Array.isArray(response.tasks)) {
        fetchedTasks = response.tasks;
      }

      setTasks(
        fetchedTasks.map((t) => ({
          ...t,
          dueDate: t.dueDate ? new Date(t.dueDate) : undefined,
        }))
      );
    } catch (error) {
      console.error("Failed to fetch tasks", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [user, filters]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTasks();
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [fetchTasks]);

  const createTask = useCallback(
    async (data: CreateTask) => {
      if (!user?.id) return;
      await tasksService.createTask({ ...data, userId: user.id } as CreateTask);
      fetchTasks();
    },
    [fetchTasks, user]
  );

  const updateTask = useCallback(async (data: UpdateTask) => {
    await tasksService.updateTask(data);
    setTasks((prev) =>
      prev.map((t) => (t.id === data.id ? { ...t, ...data } : t))
    );
  }, []);

  const deleteTask = useCallback(async (id: string) => {
    await tasksService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getTaskById = useCallback(
    async (id: string) => {
      const localTask = tasks.find((t) => t.id === id);
      if (localTask) return localTask;

      return await tasksService.getTaskById(id);
    },
    [tasks]
  );

  const value = useMemo(
    () => ({
      tasks,
      loading,
      filters,
      setFilters,
      fetchTasks,
      createTask,
      updateTask,
      deleteTask,
      getTaskById,
    }),
    [
      tasks,
      loading,
      filters,
      fetchTasks,
      createTask,
      updateTask,
      deleteTask,
      getTaskById,
    ]
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}
