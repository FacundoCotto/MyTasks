import { TaskInterface } from "../models/tasks.model";
import { TaskRepository } from "../repositories/tasks.repository";
import {
  TaskFilter,
  TaskInput,
  TaskResponse,
} from "../../../core/types/tasks.types";
import { AppError } from "../../../core/utils/AppError";

export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async createTask(
    taskData: TaskInput,
    userId: string
  ): Promise<TaskResponse | null> {
    await this._duplicateTasks(taskData, userId);

    const newTask = await this.taskRepository.createTask({
      ...taskData,
      userId,
    });

    return await this.getTaskById(newTask._id.toString(), userId);
  }

  async getTaskById(
    taskId: string,
    userId: string
  ): Promise<TaskResponse | null> {
    const task = await this.taskRepository.getTaskById(taskId, userId);
    if (!task) {
      throw new AppError("Task not found", 404);
    }

    return {
      _id: task._id.toString(),
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      subject: task.subject,
      completed: task.completed,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  async getTasksByUser(
    userId: string,
    filters: TaskFilter
  ): Promise<TaskResponse[] | []> {
    const tasks = await this.taskRepository.getTasksByUser(userId, filters);

    if (!tasks || tasks.length === 0) throw new AppError("No tasks found", 404);

    return tasks.map((post) => ({
      _id: post._id.toString(),
      title: post.title,
      description: post.description,
      dueDate: post.dueDate,
      priority: post.priority,
      subject: post.subject,
      completed: post.completed,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));
  }

  async editTask(
    userId: string,
    taskId: string,
    taskData: Partial<TaskInput>
  ): Promise<TaskInterface | null> {
    await this._foundTask(taskId, userId);

    return await this.taskRepository.editTask(taskId, taskData);
  }

  async deleteTask(
    taskId: string,
    userId: string
  ): Promise<TaskInterface | null> {
    await this._foundTask(taskId, userId);

    return await this.taskRepository.deleteTask(taskId);
  }

  private async _foundTask(taskId: string, userId: string) {
    const getTask = await this.getTaskById(taskId, userId);
    if (!getTask) throw new AppError("Task not found", 404);
  }

  private async _duplicateTasks(taskData: TaskInput, userId: string) {
    const { title } = taskData;

    const duplicateTask = await this.taskRepository.getTaskByTitleAndUser(
      title,
      userId
    );

    if (duplicateTask) {
      throw new AppError(
        "Task with the same title already exists for this user",
        409
      );
    }
  }
}
