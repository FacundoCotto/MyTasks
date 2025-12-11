import { NextFunction, Request, Response } from "express";
import { AdminService } from "../services/admin.service";

export class AdminController {
  constructor(private adminService: AdminService) {}

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, password } = req.body;

      const result = await this.adminService.createUser({
        email,
        name,
        password,
      });

      const user = result;

      res
        .status(201)
        .json({ message: "User created successfully", data: user });
    } catch (error: any) {
      next(error);
    }
  };

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    const filters = req.query;

    try {
      const users = await this.adminService.getAllUsers(filters);

      res.status(200).json({
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (error: any) {
      next(error);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    try {
      const user = await this.adminService.getUserById(userId);
      res.status(200).json({
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error: any) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const updateData = req.body.updateData;
    const resetData = req.body.resetData;

    try {
      const updatedUser = await this.adminService.updateUser(
        userId,
        updateData,
        resetData
      );
      res.status(200).json({
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error: any) {
      next(error);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    try {
      const deletedUser = await this.adminService.deleteUser(userId);
      res.status(200).json({
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (error: any) {
      next(error);
    }
  };
}
