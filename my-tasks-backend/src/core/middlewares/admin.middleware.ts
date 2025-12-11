import { Request, Response, NextFunction } from "express";
import { requireAuth } from "./auth.middleware";
import { AppError } from "../utils/AppError";

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = req.userRole;
    if (role && role !== "admin") {
      throw new AppError("Forbidden: Admins only", 403);
    }
    next();
  } catch (error: any) {
    next(error);
  }
};