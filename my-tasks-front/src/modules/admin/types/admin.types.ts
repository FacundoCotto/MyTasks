import type { NavigateFunction } from "react-router-dom";

export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  createdAt?: string;
}

export interface CreateUser {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}

export interface UpdateUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AdminContextType {
  users: User[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
  createUser: (user: CreateUser) => Promise<void>;
  updateUser: (user: UpdateUser) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  getUserById: (id: string) => Promise<User | undefined>;
}

export interface UserCardProps {
  user: User;
  onClick?: () => void;
  onEdit?: (user: User) => void;
  onDelete?: (id: string) => void;
}

export interface UserFormProps {
  onSubmit: (data: CreateUser) => void;
  initialValues?: CreateUser;
  isEdit?: boolean;
  isLoading?: boolean;
}

export interface UserGridProps {
  loading: boolean;
  filteredUsers: User[];
  navigate: NavigateFunction;
  openDeleteModal: (id: string) => void;
}