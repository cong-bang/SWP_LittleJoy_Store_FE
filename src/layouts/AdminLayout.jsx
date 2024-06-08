import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ roles, layout: Layout, element: Component }) => {
  const { user } = useAuth();

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <Component />
    </Layout>
  );
};

export default ProtectedRoute;
