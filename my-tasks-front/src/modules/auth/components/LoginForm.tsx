import { useState } from "react";
import type { UserLogin } from "../types/auth.types";
import { Input } from "../../../ui/components/Input";
import { Btn } from "../../../ui/components/Btn";
import { AxiosError } from "axios";
import { useLogin } from "../hooks/useLogin";

function LoginForm() {
  const { login, error, isSubmitting, resetError } = useLogin();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [user, setUser] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setStatusMessage(null);

    try {
      resetError();
      setStatusMessage(null);
      await login(user);
      setStatusMessage(
        "Login successful. We sent you a 6-digit code to your email"
      );
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
        Login
      </Btn>
    </form>
  );
}

export default LoginForm;
