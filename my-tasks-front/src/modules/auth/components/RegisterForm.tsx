import { useState } from "react";
import type { UserRegister } from "../types/auth.types";
import { Input } from "../../../ui/components/Input";
import { Btn } from "../../../ui/components/Btn";
import { useRegister } from "../hooks/useRegister";
import { AxiosError } from "axios";

function RegisterForm() {
  const { register, isSubmitting, error, resetError } = useRegister();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [user, setUser] = useState<UserRegister>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);

    try {
      resetError();
      setStatusMessage(null);
      await register(user);
      setStatusMessage("Account created successfully");
    } catch (error) {
      if (error instanceof AxiosError) {
        setStatusMessage(error.response?.data.message);
        console.error(error.response?.data.message);
      } else {
        setStatusMessage("An unknown error occurred");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Input
        id="name"
        type="text"
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Name"
        autoComplete="name"
        variant="primary"
        required={true}
      />
      <Input
        id="email"
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
        autoComplete="email"
        variant="primary"
        required={true}
      />
      <Input
        id="password"
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Password"
        autoComplete="password"
        variant="primary"
        required={true}
      />
      {error ? (
        <p className="rounded-lg border border-red-500/20 bg-red-50 px-4 py-3 text-sm text-red-600 font-medium">
          {error}
        </p>
      ) : null}

      {statusMessage && !error && (
        <p className="rounded-lg border border-emerald-500/20 bg-emerald-50 px-4 py-3 text-sm text-emerald-600 font-medium">
          {statusMessage}
        </p>
      )}

      <Btn variant="auth" {...{ disabled: isSubmitting }}>
        Register
      </Btn>
    </form>
  );
}

export default RegisterForm;
