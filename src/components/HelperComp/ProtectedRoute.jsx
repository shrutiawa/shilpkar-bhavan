import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const customerId = localStorage.getItem("customer");

  if (!customerId) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
