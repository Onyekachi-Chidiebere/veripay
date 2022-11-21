import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../src/styles/colors.css';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import { ProtectedLoadingRoute } from './components/ProtectedRoute';
import LoadingDashboard from './pages/LoadingDashbaord';
import 'axios-progress-bar/dist/nprogress.css';
import { loadProgressBar } from 'axios-progress-bar';
import EmailVerification from './pages/EmailVerification';
const Navigator = () => {
  loadProgressBar();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Login />} />
        <Route path="/create" exact={true} element={<CreateAccount />} />
        <Route
          path="/home"
          element={
            <ProtectedLoadingRoute>
              <LoadingDashboard />
            </ProtectedLoadingRoute>
          }
        />
        <Route path="/verify-email" exact={true} element={<EmailVerification />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Navigator;
