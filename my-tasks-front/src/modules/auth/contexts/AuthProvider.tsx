import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import type {
  User,
  UserLogin,
  UserRegister,
  UserVerify2FA,
} from "../types/auth.types";
import { authService } from "../services/auth.service";
import { env } from "../../../ui/env/env";

function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const initialAuth = authService.readStoredAuth();
  const [token, setToken] = useState<string | null>(initialAuth.token);
  const [refreshToken, setRefreshToken] = useState<string | null>(
    initialAuth.refreshToken
  );
  const [user, setUser] = useState<User | null>(initialAuth.user);
  const [status, setStatus] = useState<string | null>(null);

  const setUserEmail = useCallback((nextUser: User | null) => {
    const storage = authService.getClientStorage();
    setUser(nextUser);
    if (!storage) {
      return;
    }

    if (nextUser) {
      storage.setItem(env.USER_STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      storage.removeItem(env.USER_STORAGE_KEY);
    }
  }, []);

  const persistAuth = useCallback(
    (
      nextToken: string | null,
      nextRefreshToken: string | null,
      nextUser: User | null
    ) => {
      const storage = authService.getClientStorage();
      setToken(nextToken);
      setRefreshToken(nextRefreshToken);
      setUser(nextUser);

      if (!storage) {
        return;
      }

      if (nextToken && nextRefreshToken && nextUser) {
        storage.setItem(env.TOKEN_STORAGE_KEY, nextToken);
        storage.setItem(env.REFRESH_TOKEN_STORAGE_KEY, nextRefreshToken);
        storage.setItem(env.USER_STORAGE_KEY, JSON.stringify(nextUser));
      } else {
        storage.removeItem(env.TOKEN_STORAGE_KEY);
        storage.removeItem(env.REFRESH_TOKEN_STORAGE_KEY);
        storage.removeItem(env.USER_STORAGE_KEY);
      }
    },
    []
  );

  const register = useCallback(async (payload: UserRegister) => {
    setStatus("loading");
    try {
      const data = await authService.register(payload);
      setStatus("registered");
      return data;
    } catch (error) {
      setStatus("error");
      throw error;
    }
  }, []);

  const login = useCallback(
    async (credentials: UserLogin) => {
      setStatus("loading");
      try {
        const response = await authService.login(credentials);
        const {
          user: apiUser,
          accessToken,
          refreshToken: apiRefreshToken,
        } = response.data;

        const newUser: User = {
          id: apiUser.id || apiUser._id,
          name: apiUser.name,
          email: apiUser.email,
          role: apiUser.role,
          isVerified: Boolean(accessToken), 
        };

        if (accessToken && apiRefreshToken) {
          persistAuth(accessToken, apiRefreshToken, newUser);
          setStatus("authenticated");
        } else {
          setUserEmail(newUser);
          setStatus("verifying");
        }

        return response;
      } catch (error) {

        setStatus("error");
        throw error;
      }
    },
    [setUserEmail]
  );

  const verify2FA = useCallback(
    async (payload: UserVerify2FA) => {
      setStatus("loading");
      try {
        const response = await authService.verify2FA(payload);
        const { accessToken, refreshToken: apiRefreshToken } = response;

        if (!accessToken || !apiRefreshToken) {
          throw new Error("Tokens not received from verify2FA endpoint");
        }

        if (!user) {
          throw new Error("User not found");
        }

        const nextUser: User = {
          ...user,
          isVerified: true,
        };

        persistAuth(accessToken, apiRefreshToken, nextUser);

        setStatus("authenticated");

        return response;
      } catch (error) {

        setStatus("error");
        throw error;
      }
    },
    [persistAuth, user]
  );

  const logout = useCallback(() => {
    const storage = authService.getClientStorage();
    setToken(null);
    setUser(null);
    if (storage) {
      storage.removeItem(env.TOKEN_STORAGE_KEY);
      storage.removeItem(env.USER_STORAGE_KEY);
      storage.removeItem(env.REFRESH_TOKEN_STORAGE_KEY);
    }
    setStatus("idle");
  }, []);

  const value = useMemo(
    () => ({
      token,
      refreshToken,
      user,
      status,
      login,
      register,
      verify2FA,
      logout,
      isAuthenticated: Boolean(token),
    }),
    [token, refreshToken, user, status, login, register, verify2FA, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
