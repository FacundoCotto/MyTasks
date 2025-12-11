import chalk from "chalk";
import { env } from "../../config/env";

class Logger {
  info(message: string, meta?: Record<string, any>): void {
    if (env.NODE_ENV !== "production") {
      console.log(chalk.blue("[INFO]"), message, meta);
    }
  }

  error(message: string, meta?: Record<string, any>, status?: number): void {
    const statusDisplay = status ? ` || [STATUS:${status}]` : "";
    console.error(chalk.red(`[ERROR]${statusDisplay}`), message, meta);
  }

  debug(message: string, meta?: Record<string, any>): void {
    if (env.NODE_ENV === "development") {
      console.log(chalk.magenta("[DEBUG]"), message, meta);
    }
  }
}

export const logger = new Logger();
