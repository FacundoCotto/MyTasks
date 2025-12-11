import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./core/utils/logger";
import { database } from "./config/db";

const app = createApp();

async function startServer() {
  try {
    await database.connect();

    app.listen(env.PORT, () => {
      logger.info("Server is running", {
        url: `http://${env.DOMAIN}:${env.PORT}`,
        environment: env.NODE_ENV,
      });
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
