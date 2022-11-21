import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import '../styles/componentStyle.css';
import RegistrationMenu from './employeeRegistrationMenu/RegistrationMenu';
import { useLocation } from 'react-router-dom';

const EmployeeRegistration = () => {
  const location = useLocation();
  return (
    <div>
      <h3 className="staff-type-title">Employee Registration</h3>

      <div className="staff-type-container">
        <div className="staffType-listing-title-container">
          <h4 className="staffType-listing-title m-4">Employee Information</h4>
          <button className="staff-type-btn m-4">Setup Next Level Approval</button>
        </div>
        <RegistrationMenu state={location.state} />
        <Outlet />
      </div>
    </div>
  );
};
export default EmployeeRegistration;
