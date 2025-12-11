import { useState } from "react";
import { Plus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { User } from "../types/admin.types";
import { Btn } from "../../../ui/components/Btn";
import { Input } from "../../../ui/components/Input";
import { ConfirmModal } from "../../../ui/components/ConfirmModal";
import { Toast } from "../../../ui/components/Toast";
import { AxiosError } from "axios";
import { useAdmin } from "../hooks/useAdmin";
import UserGrid from "../components/UserGrid";

export default function UsersPage() {
  const { users, loading, deleteUser } = useAdmin();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: any;
    isVisible: boolean;
  }>({
    message: "",
    type: "info",
    isVisible: false,
  });

  const openDeleteModal = (id: string) => {
    setUserToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete);
      showToast("User deleted successfully", "success");
    } catch (error) {
      console.error("Failed to delete user", error);
      showToast(
        error instanceof AxiosError
          ? error.response?.data?.message
          : "Failed to delete user",
        "error"
      );
    }
  };

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type, isVisible: true });
  };

  const filteredUsers = users.filter(
    (user: User) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Users</h1>
          <p className="mt-1 text-slate-500">
            Manage system users and their roles
          </p>
        </div>

        <Link to="/mytasks/admin/create">
          <Btn variant="tasks_primary" className="w-full sm:w-auto">
            <Plus size={20} className="mr-2" />
            Create User
          </Btn>
        </Link>
      </div>

      <div className="mb-8 grid gap-4">
        <Input
          id="search-users"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name or email..."
          variant="tasks_primary"
          label="Search"
        />
      </div>

      <UserGrid
        loading={loading}
        filteredUsers={filteredUsers}
        navigate={navigate}
        openDeleteModal={openDeleteModal}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        isDanger
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}
