import {
  TokenPayload,
  TwoFAInformation,
  UserInformation,
} from "../../../core/types/user.types";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import { UserInterface } from "../models/user.model";
import {
  generate2FACode,
  get2FAExpirationTime,
  verify2FACode,
} from "./twoFactor.service";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "./jwt.service";
import { AppError } from "../../../core/utils/AppError";

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  async register(userData: UserInformation) {
    const { email, name, password } = userData;

    const existingUser = await this.userRepository.findUserByEmail(email);

    if (existingUser) {
      throw new AppError("User already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.createNewUser({
      email,
      name,
      password: hashedPassword,
    });

    return {
      user: {
        id: newUser._id.toString(),
        email: newUser.email,
        name: newUser.name,
        role: newUser.role || "user", 
      },
    };
  }
  
  async login(userData: UserInformation) {
    const { email, password } = userData;

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    this._isAccountLocked(user);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    await this._loginAttempts(user, isPasswordValid);

    if (user.isVerified) {
      const tokenPayload: TokenPayload = {
        userId: user._id.toString(),
        email: user.email,
        name: user.name,
      };
      const accessToken = generateAccessToken(tokenPayload);
      const refreshToken = generateRefreshToken(tokenPayload);

      await this.userRepository.updateUserByEmail(user.email, {
        updatedAt: new Date(),
        loginAttempts: 0,
        lockUntil: null,
      });

      return {
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role || "user",
          isVerified: true,
        },
        accessToken,
        refreshToken,
        message: "Login successful",
      };
    }

    const { twoFactorCode, twoFactorExpires } = await this._generate2FACode(
      user
    );

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role || "user", 
        FAcode: twoFactorCode,
        FAexpires: twoFactorExpires,
      },
      message: "2FA code sent to email",
    };
  }

  async verify2FA(userData: TwoFAInformation) {
    const { email, code } = userData;

    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    this._verifyUser(user, code);

    await this.userRepository.updateUserByEmail(
      user.email,
      {
        isVerified: true,
        updatedAt: new Date(),
      },
      {
        twoFactorCode: "",
        twoFactorExpires: new Date(0),
      }
    );

    const tokenPayload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        isVerified: true,
        createdAt: user.createdAt,
      },
      refreshToken,
      accessToken,
    };
  }

  async refreshToken(token: string) {
    const payload = verifyRefreshToken(token);
    const user = await this.userRepository.findUserById(payload.userId);

    if (!user) {
      throw new AppError("User not found", 401);
    }

    const tokenPayload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    };

    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    return {
      accessToken,
      refreshToken,
    };
  }

  private _verifyUser(user: UserInterface, code: string) {
    if (!user.twoFactorCode || !user.twoFactorExpires) {
      throw new AppError("2FA not enabled", 400);
    }

    const validation = verify2FACode(
      code,
      user.twoFactorCode,
      user.twoFactorExpires
    );

    if (!validation.isValid) {
      throw new AppError(validation.message, 400);
    }
  }

  private _isAccountLocked(user: UserInterface) {
    if (user.lockUntil && user.lockUntil > new Date()) {
      throw new AppError(
        "Account is locked due to multiple failed login attempts. Please try again in 15 minutes.",
        423
      );
    } else {
      return "Account is not locked.";
    }
  }

  private async _loginAttempts(user: UserInterface, isPasswordValid: boolean) {
    if (isPasswordValid === false) {
      const loginAttempts = (user.loginAttempts || 0) + 1;
      const updateData = {
        loginAttempts,
        updateAt: new Date(),
        lockUntil: user.lockUntil,
      };
      if (loginAttempts >= 3) {
        updateData.lockUntil = new Date(Date.now() + 15 * 60 * 1000); 
        updateData.loginAttempts = 0;
      }
      await this.userRepository.updateUserByEmail(user.email, updateData);

      throw new AppError("Invalid credentials", 401);
    } else {
      return `Login successful for user: ${user.email}`;
    }
  }

  private async _generate2FACode(user: UserInterface) {
    {
      const twoFactorCode = generate2FACode();
      const twoFactorExpires = get2FAExpirationTime(15);

      await this.userRepository.updateUserByEmail(user.email, {
        twoFactorCode: twoFactorCode,
        twoFactorExpires: twoFactorExpires,
        loginAttempts: 0,
        lockUntil: null,
        updatedAt: new Date(),
      });
      return { twoFactorCode, twoFactorExpires };
    }
  }
}
