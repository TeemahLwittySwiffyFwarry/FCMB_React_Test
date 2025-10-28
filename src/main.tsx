import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import RegistrationPage from "./pages/RegistrationPage";
import PaginatedList from "./pages/PaginatedList";

// ✅ Protected Route Component (typed)
interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = localStorage.getItem("user");
  if (!user) {
    // redirect if not logged in
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

// ✅ Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RegistrationPage />,
      },
      {
        path: "/list",
        element: (
          <ProtectedRoute>
            <PaginatedList />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

// ✅ Render
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
