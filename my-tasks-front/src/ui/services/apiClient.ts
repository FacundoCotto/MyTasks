import axios from "axios";
import { env } from "../env/env";

export const apiClient = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;

  const token = window.localStorage.getItem(env.TOKEN_STORAGE_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const isAuthRequest =
        originalRequest.url?.includes("/auth/login") ||
        originalRequest.url?.includes("/auth/register") ||
        originalRequest.url?.includes("/auth/verify2FA");

      if (isAuthRequest) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = window.localStorage.getItem(
          env.REFRESH_TOKEN_STORAGE_KEY
        );

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const { data } = await apiClient.post("/auth/refresh-token", {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = data;

        window.localStorage.setItem(env.TOKEN_STORAGE_KEY, accessToken);
        window.localStorage.setItem(
          env.REFRESH_TOKEN_STORAGE_KEY,
          newRefreshToken
        );

        apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        processQueue(null, accessToken);

        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        window.localStorage.removeItem(env.TOKEN_STORAGE_KEY);
        window.localStorage.removeItem(env.REFRESH_TOKEN_STORAGE_KEY);
        window.localStorage.removeItem(env.USER_STORAGE_KEY);
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
