import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedRoute component for protecting routes based on authentication.
 * Redirects unauthenticated users to the login page.
 * 
 * @returns {JSX.Element}
 */
const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('access_token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;