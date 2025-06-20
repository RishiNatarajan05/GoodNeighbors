import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  userType: 'volunteer' | 'organization' | 'any';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, userType }) => {
  const { currentUser, currentOrganization, userType: authUserType } = useAuth();
  const location = useLocation();

  const isAuthenticated = currentUser || currentOrganization;

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to. This allows us to send them along to that page after they login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the route is for 'any' authenticated user, just let them through.
  if (userType === 'any') {
    return children;
  }

  // If the route requires a specific user type, check if the authenticated user matches.
  if (userType === authUserType) {
    return children;
  }

  // If user type does not match, redirect to a safe page (e.g., home or a dashboard)
  // to prevent unauthorized access.
  return <Navigate to="/" replace />;
};

export default ProtectedRoute; 