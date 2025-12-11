import express, { Request } from "express";
import cors from "cors";
import morgan from "morgan";
import { debugMorgan } from "./core/utils/debugger";
import { env } from "./config/env";
import { errorHandler } from "./core/utils/errorHandler";
import router from "./routes";


export function createApp() {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.get("/health", (req, res) => {
    res.status(200).json({ message: "OK" });
  });

  morgan.token("body", (req: Request) => {
    return JSON.stringify(req.body);
  });

  if (env.NODE_ENV === "development") {
    app.use(morgan(debugMorgan));
  }

  app.use("/api/v1", router);

  app.use(errorHandler);

  return app;
}
