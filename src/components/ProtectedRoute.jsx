import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  const token = sessionStorage.getItem("token");
  const isAuthenticated = token && token !== "null" && token.trim() !== "";

  if (!isAuthenticated) {
  
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}