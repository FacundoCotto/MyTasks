import { Link, useLocation } from "react-router-dom";
import { FaCalendar, FaTasks } from "react-icons/fa";
import { LogOut } from "lucide-react";
import { useAuth } from "../../modules/auth/hooks/useAuth";

export function NavBar() {
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-center gap-8">
        {user?.role === "admin" && (
          <Link
            to="/mytasks/admin"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              location.pathname.includes("/admin")
                ? "bg-violet-100 text-violet-700 font-medium"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <FaTasks className="text-lg" />
            <span>Users</span>
          </Link>
        )}
        <Link
          to="/mytasks"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            location.pathname === "/mytasks"
              ? "bg-violet-100 text-violet-700 font-medium"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <FaTasks className="text-lg" />
          <span>My Tasks</span>
        </Link>

        <div className="w-[50%] flex bg-white justify-center items-center py-4 sticky top-0 z-50 border-b border-gray-200">
          <h1 className="text-violet-500 md:text-4xl text-3xl font-bold font-rubik italic text-center">
            My Tasks
          </h1>
        </div>

        <Link
          to="/mytasks/calendar"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            location.pathname.includes("/calendar")
              ? "bg-violet-100 text-violet-700 font-medium"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <FaCalendar className="text-lg" />
          <span>Calendar</span>
        </Link>
          <button
            onClick={logout}
            className="p-4 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 absolute right-2 top-5"
          >
            <LogOut size={30} />
          </button>
      </div>
    </nav>
  );
}
