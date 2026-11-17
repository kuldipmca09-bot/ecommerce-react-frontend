import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function ProtectedRoute({ roles }) {
  const { isAuthenticated, hasRole } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace/>;
  if (roles?.length && !hasRole(...roles)) return <Navigate to="/unauthorized" replace/>;
  return <Outlet/>;
}
