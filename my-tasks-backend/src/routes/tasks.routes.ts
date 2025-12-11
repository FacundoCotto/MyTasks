import { TaskController } from "../modules/tasks/controllers/tasks.controller";
import { requireAuth } from "../core/middlewares/auth.middleware";
import { validate, validateId } from "../core/middlewares/validate.middleware";
import {
  createTaskSchema,
  editTaskSchema,
  taskIdValidations,
  userIdValidations,
} from "../modules/tasks/schemas/tasks.schema";
import { TaskService } from "../modules/tasks/services/tasks.service";
import { TaskRepository } from "../modules/tasks/repositories/tasks.repository";
import { Router } from "express";
import { TASK_ROUTES } from "../config/paths";

const router = Router();

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

router.post(
  TASK_ROUTES.create,
  requireAuth,
  validate(createTaskSchema),
  taskController.createTask
);

router.put(
  TASK_ROUTES.update,
  requireAuth,
  validate(editTaskSchema),
  validateId(taskIdValidations),
  taskController.editTask
);

router.delete(
  TASK_ROUTES.delete,
  requireAuth,
  validateId(taskIdValidations),
  taskController.deleteTask
);


router.get(
  TASK_ROUTES.list,
  requireAuth,
  validateId(userIdValidations),
  taskController.getTaskByUser
);

router.get(
  TASK_ROUTES.details,
  requireAuth,
  validateId(taskIdValidations),
  taskController.getTaskById
);

export default router;
