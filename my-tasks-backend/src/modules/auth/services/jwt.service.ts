import { TokenPayload } from "../../../core/types/user.types";
import jwt, { Secret } from "jsonwebtoken";
import { env } from "../../../config/env";
import { StringValue } from "ms";
import { AppError } from "../../../core/utils/AppError";

const jwtSecret: Secret = env.JWT_SECRET as Secret;
const jwtRefreshSecret: Secret = env.JWT_REFRESH_SECRET as Secret;
const jwtExpiresIn: StringValue = env.JWT_EXPIRES_IN as StringValue;
const jwtRefreshExpiresIn: StringValue =
  env.JWT_REFRESH_EXPIRES_IN as StringValue;

export const generateAccessToken = (payload: TokenPayload) => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiresIn,
    issuer: "mytasks-api",
    audience: "mytasks-users",
  });
};

export const generateRefreshToken = (payload: TokenPayload) => {
  return jwt.sign({ userId: payload.userId }, jwtRefreshSecret, {
    expiresIn: jwtRefreshExpiresIn,
    issuer: "mytasks-api",
    audience: "mytasks-users",
  });
};

export const extractTokenFromHeader = (
  authHeader: string | undefined
): string | null => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

  return authHeader.split(" ")[1];
};

export const verifyAccessToken = (token: string): TokenPayload => {
  const bodyToken = {
    issuer: "mytasks-api",
    audience: "mytasks-users",
  };

  try {
      return jwt.verify(token, jwtSecret, bodyToken) as TokenPayload;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Token expired", 401);
    } else if (error.name === "JsonWebTokenError") {
      throw new AppError("Invalid token", 401);
    } else {
      throw new AppError("Token verification failed", 401);
    }
  }
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  const bodyToken = {
      issuer: "mytasks-api",
      audience: "mytasks-users",
    };
  
    try {
        return jwt.verify(token, jwtRefreshSecret, bodyToken) as TokenPayload;
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new AppError("Refresh token expired", 401);
      } else if (error.name === "JsonWebTokenError") {
        throw new AppError("Invalid refresh token", 401);
      } else {
        throw new AppError("Refresh token verification failed", 401);
      }
    }
}
