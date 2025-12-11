import { NextFunction, Request, Response } from "express";
import { logger } from "./logger";
import { AppError } from "./AppError";

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  const status = err instanceof AppError ? err.statusCode : 500;
  const message = err.message ?? "An unexpected error has occurred";

  logger.error(`${message}`, { error: err }, status);

  return res.status(status).json({
    message,
  });
}
