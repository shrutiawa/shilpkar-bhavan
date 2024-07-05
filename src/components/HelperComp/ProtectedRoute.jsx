import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import LocaleContext from "./localeContextProvider";

const ProtectedRoute = ({ children }) => {
  const customerId = localStorage.getItem("customer");
  // const { canAccessOrderConfirm } = useContext(LocaleContext);

  if (!customerId) {
    return <Navigate to="/signin" />;
  }
  // if (window.location.pathname === '/order-confirm' && !canAccessOrderConfirm) {
  //   return <Navigate to="/cart" />;
  // }
  return children;
};

export default ProtectedRoute;
