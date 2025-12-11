import { useState, useEffect } from "react";
import { Input } from "../../../ui/components/Input";
import { Btn } from "../../../ui/components/Btn";
import type { UserFormProps, CreateUser } from "../types/admin.types";

export function UserForm({
  onSubmit,
  initialValues,
  isEdit,
  isLoading,
}: UserFormProps) {
  const [formData, setFormData] = useState<CreateUser>({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        variant="tasks_primary"
        label="Full Name"
      />

      <Input
        id="email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        variant="tasks_primary"
        label="Email Address"
      />

      <div className="space-y-2">
        <label htmlFor="role" className="text-sm font-medium text-slate-700">
          Role
        </label>
        <div className="relative">
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-xl border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-600 outline-none transition-all focus:border-violet-200 focus:bg-white focus:ring-4 focus:ring-violet-100/50"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>

      {!isEdit && (
        <>
          <Input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required={!isEdit}
            variant="tasks_primary"
            label="Password"
          />
          <p className="mt-1 text-xs text-slate-500">
            At least 6 characters, 1 uppercase, 1 lowercase, 1 number.
          </p>
        </>
      )}

      <div className="pt-4">
        <Btn
          type="submit"
          variant="tasks_primary"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Saving..." : isEdit ? "Update User" : "Create User"}
        </Btn>
      </div>
    </form>
  );
}
