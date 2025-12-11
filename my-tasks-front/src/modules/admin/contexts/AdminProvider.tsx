import { useState, useEffect, useCallback, useMemo } from "react";
import { adminService } from "../services/admin.service";
import type { User, CreateUser, UpdateUser } from "../types/admin.types";
import { AdminContext } from "./AdminContext";

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await adminService.getAllUsers();
      if (
        response &&
        (response as any).data &&
        Array.isArray((response as any).data)
      ) {
        setUsers((response as any).data);
      } else if (Array.isArray(response)) {
        setUsers(response);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const createUser = useCallback(
    async (data: CreateUser) => {
      await adminService.createUser(data);
      await fetchUsers();
    },
    [fetchUsers]
  );

  const updateUser = useCallback(async (data: UpdateUser) => {
    await adminService.updateUser(data);
    setUsers((prev) =>
      prev.map((u) => (u.id === data.id ? { ...u, ...data } : u))
    );
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    await adminService.deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }, []);

  const getUserById = useCallback(
    async (id: string) => {
      const existing = users.find((u) => u.id === id);
      if (existing) return existing;
      return await adminService.getUserById(id);
    },
    [users]
  );

  const value = useMemo(
    () => ({
      users,
      loading,
      fetchUsers,
      createUser,
      updateUser,
      deleteUser,
      getUserById,
    }),
    [
      users,
      loading,
      fetchUsers,
      createUser,
      updateUser,
      deleteUser,
      getUserById,
    ]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}
