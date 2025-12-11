import { Router } from "express";
import { validate } from "../core/middlewares/validate.middleware";
import {
  loginSchema,
  registerSchema,
  verify2FASchema,
} from "../modules/auth/schemas/auth.schema";
import { AuthController } from "../modules/auth/controllers/auth.controller";
import { UserRepository } from "../modules/auth/repositories/user.repository";
import { AuthService } from "../modules/auth/services/auth.service"
import { AUTH_ROUTES } from "../config/paths";

const router = Router();

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post(AUTH_ROUTES.register, validate(registerSchema), authController.register);
router.post(AUTH_ROUTES.login, validate(loginSchema), authController.login);
router.post(AUTH_ROUTES.verify2FA, validate(verify2FASchema), authController.verify2FA);
router.post(AUTH_ROUTES.refreshToken, authController.refreshToken);

export default router;



