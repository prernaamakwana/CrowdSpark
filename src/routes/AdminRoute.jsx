import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token") || "";
  const role = localStorage.getItem("role") || "";

  const isAdmin = token && role === "admin";

  return isAdmin ? children : <Navigate to="/login" replace />;
}