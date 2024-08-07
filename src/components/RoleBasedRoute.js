import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleBasedRoute = ({ element, requiredRoles }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles && !requiredRoles.includes(userRole)) {
    return <Navigate to="/" />; // ou une page d'erreur / accès refusé
  }

  return element;
};

export default RoleBasedRoute;
