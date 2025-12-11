import { UserInterface } from "../../modules/auth/models/user.model";

export interface ResponseBody {
  message: string;
  error?: string;
  data?: any;
  token?: string;
  success?: boolean;
  refreshToken?: string;
  accessToken?: string;
}

export interface RequestWithUserId extends Request {
  userId?: string;
}


declare global {
  namespace Express {
    interface Request {
      user?: UserInterface;
      userId?: string;
      userRole?: "admin" | "user";
    }
  }
}
