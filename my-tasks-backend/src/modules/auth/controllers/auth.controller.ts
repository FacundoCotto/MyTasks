import { NextFunction, Request, Response } from "express";
import {
  LoginInput,
  RegisterInput,
  Verify2FAInput,
} from "../schemas/auth.schema";
import { ResponseBody } from "../../../core/types/global.types";
import { AuthService } from "../services/auth.service";
import { sendByEmailJs } from "../../../core/service/email-js.service";
import { env } from "../../../config/env";

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  register = async (
    req: Request<{}, {}, RegisterInput>,
    res: Response<ResponseBody>,
    next: NextFunction
  ) => {
    try {
      const { email, name, password } = req.body;

      const result = await this.authService.register({ email, name, password });

      const { user } = result;

      await sendByEmailJs(email, { name }, env.EMAIL_JS_WELCOME_TEMPLATE_ID);

      res
        .status(201)
        .json({ message: "User registered successfully", data: user });
    } catch (error: any) {
      next(error);
    }
  };

  login = async (
    req: Request<{}, {}, LoginInput>,
    res: Response<ResponseBody>,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;

      const result = await this.authService.login({ email, password });

      if (!result.accessToken) {
         await sendByEmailJs(email, { name: result.user.name, code: result.user.FAcode }, env.EMAIL_JS_LOGIN_TEMPLATE_ID);
      }

      res.status(200).json({ message: result.message, data: result });
    } catch (error: any) {
      next(error);
    }
  };

  verify2FA = async (
    req: Request<{}, {}, Verify2FAInput>,
    res: Response<ResponseBody>,
    next: NextFunction
  ) => {
    try {
      const { email, code } = req.body;

      const result = await this.authService.verify2FA({ email, code });

      const { refreshToken, accessToken } = result;

      if (result) {
        res.status(200).json({
          message: "2FA verification successful",
          refreshToken,
          accessToken,
        });
      } else {
        res.status(400).json({ message: "Invalid 2FA code" });
      }
    } catch (error: any) {
      next(error);
    }
  };

  refreshToken = async (
    req: Request,
    res: Response<ResponseBody>,
    next: NextFunction
  ) => {
    try {
      const { refreshToken } = req.body;
      const result = await this.authService.refreshToken(refreshToken);

      res.status(200).json({
        message: "Token refreshed successfully",
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
    } catch (error) {
      next(error);
    }
  };
}
