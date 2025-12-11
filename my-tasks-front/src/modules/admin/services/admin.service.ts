import { apiClient } from "../../../ui/services/apiClient";
import type { CreateUser, UpdateUser } from "../types/admin.types";

export const adminService = {
  getAllUsers: async () => {
    const response = await apiClient.get<{ data: any[] }>("/admin/users");
    const users = response.data.data;
    return users.map((u: any) => ({ ...u, id: u._id }));
  },

  createUser: async (user: CreateUser) => {
    const response = await apiClient.post("/admin", user);
    return response.data;
  },

  updateUser: async (data: UpdateUser) => {
    const { id, ...updateData } = data;
    const response = await apiClient.put(`/admin/${id}`, { updateData });
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await apiClient.delete(`/admin/${id}`);
    return response.data;
  },

  getUserById: async (id: string) => {
    const response = await apiClient.get<{ data: any }>(`/admin/${id}`);
    const user = response.data.data;
    return { ...user, id: user._id };
  },
};
