import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { UserManagement } from "./pages/UserManagement";
import CategoryManagement from "./pages/CategoryManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/users",
    element: <UserManagement />,
  },
  {
    path: "/categories",
    element: <CategoryManagement />,
  },
]);
