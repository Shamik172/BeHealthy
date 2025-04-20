import React from 'react';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  // Temporary: Set this to true for development
  const isAdmin = true;  // DEVELOPMENT ONLY! Change this later
  
  // Later, implement proper authentication check:
  // const isAdmin = localStorage.getItem('role') === 'admin';
  
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AdminRoute;