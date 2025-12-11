import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth";

export default function AdminRoute({ redirectTo = "/mytasks" }) {
  const location = useLocation();
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
