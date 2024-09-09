import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Authentication/context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/LP" replace />;
  }

  return children;
};

export default PrivateRoute;