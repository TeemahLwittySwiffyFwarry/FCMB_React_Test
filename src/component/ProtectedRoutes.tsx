import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // If user not logged in, redirect to registration page
  if (!user) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;
