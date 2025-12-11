import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { UserForm } from "../components/UserForm";
import { Card } from "../../../ui/components/Card";
import { Toast } from "../../../ui/components/Toast";
import type { User } from "../types/admin.types";
import { AxiosError } from "axios";
import { useAdmin } from "../hooks/useAdmin";

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getUserById, updateUser } = useAdmin();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: any;
    isVisible: boolean;
  }>({
    message: "",
    type: "info",
    isVisible: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const foundUser = await getUserById(id);
        if (foundUser) {
          setUser(foundUser);
        } else {
          setError("User not found");
        }
      } catch (err) {
        setError("Failed to fetch user details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, getUserById]);

  const showToast = (message: string, type: "success" | "error" | "info") => {
    setToast({ message, type, isVisible: true });
  };

  const handleSubmit = async (data: any) => {
    if (!id) return;
    setSaving(true);
    setError(null);
    try {
      const updatePayload = { ...data, id };
      if (!updatePayload.password) {
        delete updatePayload.password;
      }

      await updateUser(updatePayload);
      showToast("User updated successfully", "success");

      setTimeout(() => {
        navigate("/mytasks/admin");
      }, 1500);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.data?.message) {
        showToast(err.response.data.message, "error");
      } else {
        showToast("Failed to update user. Please try again.", "error");
      }
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500">
        Loading user details...
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-red-500/20 bg-red-50 px-4 py-3 text-red-600 font-medium mb-4">
          {error}
        </div>
        <Link to="/mytasks/admin" className="text-violet-600 hover:underline">
          Go back to Users List
        </Link>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-slate-800">Edit User</h1>
          <p className="mt-1 text-slate-500">
            Update user information and roles.
          </p>
        </div>

        <Card className="p-6">
          {user && (
            <UserForm
              onSubmit={handleSubmit}
              isLoading={saving}
              isEdit={true}
              initialValues={{
                name: user.name,
                email: user.email,
                role: user.role,
                password: "",
              }}
            />
          )}
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
