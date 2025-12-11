import { UserInformation } from "../../../core/types/user.types";
import { User, UserInterface } from "../models/user.model";
import { ObjectId } from "mongoose";

export class UserRepository {
  async findUserByEmail(email: string): Promise<UserInterface | null> {
    return await User.findOne({ email });
  }

  async findUserById(id: string | ObjectId): Promise<UserInterface | null> {
    return await User.findById(id);
  }

  async createNewUser(userData: UserInformation): Promise<UserInterface> {
    return await User.create(userData);
  }

  async updateUserByEmail(
    identifier: string,
    updateData: Partial<UserInterface>,
    resetData?: Partial<UserInterface>
  ): Promise<UserInterface | null> {
    const query = { email: identifier };

    const update: any = { $set: updateData };
    if (resetData && Object.keys(resetData).length > 0) {
      update.$unset = resetData;
    }

    return await User.findOneAndUpdate(query, update, { new: true });
  }
}
