import { Router } from "express";
import authRoutes from "./auth.routes";
import taskRoutes from "./tasks.routes";
import adminRoutes from "./admin.routes";
import { requireAuth } from "../core/middlewares/auth.middleware";

const router = Router();

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/admin", requireAuth , adminRoutes);

export default router;
