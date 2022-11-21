import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  //get user token from localstorage to insure user is logged in
  let isAuthenticated = localStorage.getItem('@veripay_token');

  return isAuthenticated ? children : <Navigate to="/" replace />;
}
export function ProtectedLoadingRoute({ children }) {
  //get user institution_code from localstorage to insure user has initiated create account
  let isAuthenticated = localStorage.getItem('@institution_code');

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;
