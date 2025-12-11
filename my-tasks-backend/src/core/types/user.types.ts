export interface UserInformation {
  email: string;
  name?: string; 
  password: string;
}

export interface TwoFAInformation {
  email: string;
  code: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
}

export interface UserFilter {
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
  limit?: number;
  page?: number;
  search?: string;
}
