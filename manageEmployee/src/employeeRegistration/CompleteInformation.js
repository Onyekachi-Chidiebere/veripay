import React from 'react';
import '../styles/componentStyle.css';
import { useNavigate } from "react-router-dom";

const CompleteInformation = () => {
  const navigate = useNavigate();
  return (
    <div className="employee-complete-background">
      <h2 className="employee-complete-title">Registration Completed</h2>
      <p className="employee-complete-text">
        Any further changes to this registrant’s datapossibly awaitsnext level
        approval.
        <br /> Activation awaits which confirms this registrant an employee
      </p>
      <div className="d-flex justify-content-center">
        <button onClick={()=>navigate('/dashboard')} className="btn">Proceed to Dashboard</button>
      </div>
    </div>
  );
};

export default CompleteInformation;
