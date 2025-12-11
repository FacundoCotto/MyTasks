import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../modules/auth/hooks/useAuth";

export default function AuthRoute({ redirectTo = "/mytasks" }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return <Outlet />;
}
