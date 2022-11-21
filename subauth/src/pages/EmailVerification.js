import React, { useState } from 'react';
import logo from '../images/logo.svg';
import warnImage from '../images/warnImage.png';
import '../styles/login.css';
import { Col, Row } from 'react-bootstrap';
import Error from '../components/Error';
import useLogin from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';


const EmailVerification = () => {
  const navigate=useNavigate();
  const {loading,verifyEmail}=useLogin()
  // let loading = false;
  
  const year = new Date().getFullYear();
  return (
    <Row className="justify-content-md-center align-items-center">
      <div className="login-body">
        <div className="login-first-part">
          <img src={warnImage} alt="img" className="login-image" />
        </div>
        <Col className="login-second-part">
          <Col xs={12} md={8} className="login-detail-holder">
            <div className="login-logo-container">
              <img src={logo} alt="Logo" className="login-logo" />
              <p className="login-logo-label">Veripay</p>
            </div>
            <strong className="login-text">Activation</strong>
            <p className="login-title">
              You are seeing this page because you have not activated your email address, click on the button below to resend an activation link.
            </p>
            <button
              disabled={loading}
              onClick={verifyEmail}
              className="validate-btn mb-3 w-100"
            >
              {loading ? 'Loading...' : ' Resend Activation Email'}
            </button>
            <p className='login-title'>Go back to<span 
                onClick={() => navigate('/')}
                className="login-register-link"
              >
                  &nbsp;Login 
              </span></p>
            {/* <Row className="create-input-margin-bottom">
              <Col>
               
                <p className="login-register-label mt-4">
                click here to login          
                <span 
                onClick={() => navigate('/')}
                className="login-register-link "
              >
                   &nbsp; Login 
              </span>
            </p>
              </Col>
            </Row> */}
          </Col>
          <p className="login-footer">
            © {year} Veripay Suite - All Rights Reserved
          </p>
        </Col>
      </div>
    </Row>
  );
};

export default EmailVerification;
