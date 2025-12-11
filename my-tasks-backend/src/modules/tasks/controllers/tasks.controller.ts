import { TaskService } from "./../services/tasks.service";
import { Request, Response, NextFunction } from "express";

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  createTask = async (req: Request, res: Response, next: NextFunction) => {
    const postData = req.body;
    const userId = req.userId as string;

    try {
      const newTask = await this.taskService.createTask(postData, userId);

      res.status(201).json({
        success: true,
        message: "Task created successfully",
        data: {
          task: newTask,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };
  
  getTaskByUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId as string;
    const filters = req.query;

    try {
      const tasks = await this.taskService.getTasksByUser(userId, filters);

      res.status(200).json({
        success: true,
        message: "Tasks retrieved successfully",
        data: {
          tasks,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };

  getTaskById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId as string;
    const _id = req.params.id;

    try {
      const task = await this.taskService.getTaskById(_id, userId);

      res.status(200).json({
        success: true,
        message: "Task retrieved successfully",
        data: {
          task,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };

  editTask = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId as string;
    const taskData = req.body;
    const _id = req.params.id;

    try {
      const editedTask = await this.taskService.editTask(userId, _id, taskData);

      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        data: {
          task: editedTask,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };

  deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.userId as string;
    const _id = req.params.id;

    try {
      const deletedTask = await this.taskService.deleteTask(_id, userId);

      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
        data: {
          task: deletedTask,
        },
      });
    } catch (error: any) {
      next(error);
    }
  };
}
