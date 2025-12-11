import { UserInterface } from "../../auth/models/user.model";
import { UserFilter, UserInformation } from "../../../core/types/user.types";
import bcrypt from "bcryptjs";
import { AdminRepository } from "../repositories/admin.repository";
import { AppError } from "../../../core/utils/AppError";

export class AdminService {
  constructor(private adminRepository: AdminRepository) {}

  async createUser(userData: UserInformation) {
    const { email, name, password } = userData;

    await this._existingUser(email);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.adminRepository.createNewUser({
      email,
      name,
      password: hashedPassword,
    });

    return {
      id: newUser._id.toString(),
      email: newUser.email,
      name: newUser.name,
      role: newUser.role || "user",
    };
  }

  async getAllUsers(filters: UserFilter): Promise<UserInterface[]> {
    const users = await this.adminRepository.getUserList(filters);

    if (!users || users.length === 0) {
      throw new AppError("No users found", 404);
    }

    return users;
  }

  async getUserById(id: string): Promise<UserInterface> {
    const user = await this.adminRepository.findUserById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  async updateUser(
    id: string,
    updateData?: Partial<UserInformation>,
    resetData?: Partial<UserInformation>
  ): Promise<UserInterface | null> {
    await this._notFoundUser(id);

    await this._isAdmin(id);

    if (updateData?.email) {
      await this._existingUser(updateData.email);
    }

    const updatedUser = await this.adminRepository.updateUserById(
      id,
      updateData || {},
      resetData || {}
    );

    return updatedUser;
  }

  async deleteUser(id: string): Promise<UserInterface | null> {
    await this._isAdmin(id);

    return await this.adminRepository.deleteUser(id);
  }

  private async _existingUser(email: string) {
    const existingUser = await this.adminRepository.findUserByEmail(email);

    if (existingUser) {
      throw new AppError("User already exists", 409);
    }
  }

  private async _notFoundUser(id: string) {
    const user = await this.adminRepository.findUserById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }
  }

  private async _isAdmin(id: string) {
    const user = await this.adminRepository.findUserById(id);

    await this._notFoundUser(id);

    if (user && user.role === "admin") {
      throw new AppError("Cannot delete/edit admin users", 403);
    }
  }

}
