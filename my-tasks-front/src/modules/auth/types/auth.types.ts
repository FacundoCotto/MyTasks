export interface UserRegister {
    name: string;
    email: string;
    password: string;
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserVerify2FA {
    email: string;
    code: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
    isVerified?: boolean;
}

export interface AuthContextType {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  status: string | null;
  register: (payload: UserRegister) => Promise<void>;
  login: (credentials: UserLogin) => Promise<void>;
  verify2FA: (payload: UserVerify2FA) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface Verify2FAPayload {
  email: string;
  code: string;
}