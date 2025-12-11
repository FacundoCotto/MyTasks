import { env } from "../../../ui/env/env";
import { apiClient } from "../../../ui/services/apiClient";
import type {
  UserLogin,
  UserRegister,
  UserVerify2FA,
} from "../types/auth.types";

export const authService = {
  getClientStorage: () => {
    if (typeof window === "undefined") return null;

    return window.localStorage;
  },

  readStoredAuth: () => {
    const storage = authService.getClientStorage();
    if (!storage) {
      return { token: null, refreshToken: null, user: null };
    }

    const token = storage.getItem(env.TOKEN_STORAGE_KEY);
    const refreshToken = storage.getItem(env.REFRESH_TOKEN_STORAGE_KEY);
    const rawUser = storage.getItem(env.USER_STORAGE_KEY);

    if (!token || !refreshToken || !rawUser) {
      return { token: null, refreshToken: null, user: null };
    }

    try {
      const user = JSON.parse(rawUser);
      return { token, refreshToken, user };
    } catch (error) {
      storage.removeItem(env.TOKEN_STORAGE_KEY);
      storage.removeItem(env.REFRESH_TOKEN_STORAGE_KEY);
      storage.removeItem(env.USER_STORAGE_KEY);
      console.error("Error parsing stored user:", error);
      return { token: null, refreshToken: null, user: null };
    }
  },

  register: async (user: UserRegister) => {
    const response = await apiClient.post("/auth/register", user);
    return response.data;
  },

  login: async (user: UserLogin) => {
    const response = await apiClient.post("/auth/login", user);
    return response.data;
  },

  verify2FA: async (payload: UserVerify2FA) => {
    const response = await apiClient.post("/auth/verify2FA", payload);
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await apiClient.post("/auth/refresh-token", {
      refreshToken,
    });
    return response.data;
  },
};
