import { Navigate } from "react-router-dom";
import { useStore } from "../store/store";
import React from "react";

const ProtectedRoute = ({ children }: any) => {
  const { userStore } = useStore();
  if (userStore.user === null || userStore.user?.role !== "ADMIN") {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default ProtectedRoute;
