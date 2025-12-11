import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "../home/HomePage";
import AuthPage from "../modules/auth/pages/AuthPage";
import MainLayout from "../layout/MainLayout";
import TasksRoute from "./TasksRoute";
import TasksPage from "../modules/tasks/pages/TasksPage.tsx";
import AuthRoute from "./AuthRoute.tsx";
import CalendarPage from "../modules/tasks/pages/CalendarPage.tsx";
import CreateTaskPage from "../modules/tasks/pages/CreateTaskPage";
import TaskDetailPage from "../modules/tasks/pages/TaskDetailPage";
import AdminRoute from "./AdminRoute.tsx";
import UserDetailPage from "../modules/admin/pages/UserDetailPage.tsx";
import UsersPage from "../modules/admin/pages/UsersPage.tsx";
import CreateUserPage from "../modules/admin/pages/CreateUserPage.tsx";

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    element: <AuthRoute />,
    children: [
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },
  {
    element: <TasksRoute />,
    children: [
      {
        path: "/mytasks",
        element: <MainLayout />,
        children: [
          { index: true, element: <TasksPage /> },
          { path: "create-task", element: <CreateTaskPage /> },
          { path: ":id", element: <TaskDetailPage /> },
          { path: "calendar", element: <CalendarPage /> },
          {
            path: "admin",
            element: <AdminRoute />,
            children: [
              { index: true, element: <UsersPage /> },
              { path: "create", element: <CreateUserPage /> },
              { path: ":id", element: <UserDetailPage /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
