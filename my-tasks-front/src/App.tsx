import { RouterProvider } from "react-router-dom"
import { AppRouter } from "./router/AppRouter"
import AuthProvider from "./modules/auth/contexts/AuthProvider"
import { TasksProvider } from "./modules/tasks/context/TasksProvider"
import { AdminProvider } from "./modules/admin/contexts/AdminProvider"

function App() {
  return (

    <AuthProvider>
      <TasksProvider>
        <AdminProvider>
          <RouterProvider router={AppRouter} />
        </AdminProvider>
      </TasksProvider>
    </AuthProvider>
  )
}

export default App