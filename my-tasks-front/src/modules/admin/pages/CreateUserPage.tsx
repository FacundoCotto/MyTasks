import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { UserForm } from "../components/UserForm";
import { Card } from "../../../ui/components/Card";
import { Toast } from "../../../ui/components/Toast";
import type { CreateUser } from "../types/admin.types";
import { AxiosError } from "axios";
import { useAdmin } from "../hooks/useAdmin";

export default function CreateUserPage() {
  const navigate = useNavigate();
  const { createUser } = useAdmin();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: any;
    isVisible: boolean;
  }>({
    message: "",
    type: "info",
    isVisible: false,
  });

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type, isVisible: true });
  };

  const handleSubmit = async (data: CreateUser) => {
    setLoading(true);
    try {
      await createUser(data);
      showToast("User created successfully", "success");
      setTimeout(() => {
        navigate("/mytasks/admin");
      }, 1500);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.message) {
        showToast(err.response.data.message, "error");
      } else {
        showToast("Failed to create user. Please try again.", "error");
      }
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link
        to="/mytasks/admin"
        className="inline-flex items-center text-slate-500 hover:text-violet-600 mb-6 transition-colors"
      >
        <ChevronLeft size={20} className="mr-1" />
        Back to Users
      </Link>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Create User</h1>
          <p className="mt-1 text-slate-500">Add a new user to the system.</p>
        </div>

        <Card className="p-6">
          <UserForm onSubmit={handleSubmit} isLoading={loading} />
        </Card>

        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
        />
      </div>
    </div>
  );
}
