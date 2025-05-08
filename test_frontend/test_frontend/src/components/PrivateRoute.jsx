import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();  // Now you can use 'user' directly

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
