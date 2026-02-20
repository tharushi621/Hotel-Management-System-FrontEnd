import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  // sessionStorage clears when the browser tab/window closes,
  // so every new session requires a fresh login
  const token = sessionStorage.getItem("token");
  const isAuthenticated = token && token !== "null" && token.trim() !== "";

  if (!isAuthenticated) {
    // Redirect to login, passing current path so we can return after login
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}