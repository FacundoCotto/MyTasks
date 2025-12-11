import { apiClient } from "../../../ui/services/apiClient";
import type {
  CreateTask,
  filters,
  TaskData,
  UpdateTask,
} from "../types/tasks.types";

export const tasksService = {
  getAllTasks: async (userId: string, filters?: filters) => {
    const params = new URLSearchParams();

    if (filters) {
      if (filters.search) params.append("search", filters.search);
      if (filters.completed !== undefined)
        params.append("completed", String(filters.completed));

      if (filters.priority) {
        filters.priority.forEach((p) => params.append("priority", p));
      }

      if (filters.subject) {
        filters.subject.forEach((s) => params.append("subject", s));
      }
    }

    try {
      const response = await apiClient.get(`/tasks/user/${userId}`, { params });
      const data = response.data;
      const mapTask = (task: TaskData) => ({ ...task, id: task._id });

      if (data.data && Array.isArray(data.data.tasks)) {
        return {
          ...data,
          data: {
            ...data.data,
            tasks: data.data.tasks.map(mapTask),
          },
        };
      } else if (Array.isArray(data)) {
        return data.map(mapTask);
      }
      return data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return [];
      }
      throw error;
    }
  },
  getTaskById: async (id: string) => {
    const response = await apiClient.get(`/tasks/${id}`);
    const task = response.data.data ? response.data.data.task : response.data;
    return { ...task, id: task._id };
  },
  createTask: async (task: CreateTask) => {
    const response = await apiClient.post("/tasks", task);
    const data = response.data.data ? response.data.data.task : response.data;
    return { ...data, id: data._id };
  },
  updateTask: async (task: UpdateTask) => {
    const response = await apiClient.put(`/tasks/${task.id}`, task);
    const data = response.data.data ? response.data.data.task : response.data;
    return { ...data, id: data._id };
  },
  deleteTask: async (id: string) => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  },
};
