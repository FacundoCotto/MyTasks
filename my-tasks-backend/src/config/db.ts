import mongoose from "mongoose";
import { logger } from "../core/utils/logger";
import { env } from "./env";

class Database {
  private connection: null | typeof mongoose;

  constructor() {
    this.connection = null;
  }

  async connect() {
    if (this.connection) {
      return this.connection;
    }
    try {
      mongoose.set("strictQuery", true);
      this.connection = await mongoose.connect(env.MONGO_URI, {
        autoIndex: env.NODE_ENV === "development",
      });

      logger.info(`Connected to MongoDB`);
      return this.connection;
    } catch (error: any) {
      logger.error("Could not connect to database", { error: error.message });
      throw error;
    }
  }
}

export const database = new Database();
