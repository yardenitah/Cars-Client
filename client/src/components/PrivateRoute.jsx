import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  if (status === 'loading') {
    return <div>Loading...</div>; // Show loading state while authentication status is being determined
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/welcome" />;
};

export default PrivateRoute;