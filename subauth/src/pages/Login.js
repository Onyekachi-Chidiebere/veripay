import React, { useState } from 'react';
import useLogin from '../hooks/useLogin';
import logo from '../images/logo.svg';
import loginImage from '../images/loginImage.png';
import '../styles/login.css';
import { Col, Row } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Error from '../components/Error';


const Login = () => {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    handleChange,
    verifiedEmail,
    handleSubmit,
    setError,
    loading,
    loginData,
    moveTo,
    setMoveTo,
    error,
  } = useLogin();
  useState(() => {
    let successCode = searchParams.get("code");
    console.log({ successCode })
    if (successCode === '00') {
        Swal.fire({
        title: 'Success!',
        text:'Activation Successful',
        icon: 'success',
        confirmButtonText: 'Ok',
        customClass: {
          confirmButton:'swal-confirm'
        }
    })
    }
    if (successCode === 'E301') {
      Swal.fire({
        title: 'Error!',
        text: 'Activation link broken',
        icon: 'question',
        confirmButtonText: 'Ok',
        customClass: {
          confirmButton: 'swal-confirm'
        }
      }).then(() => navigate('/verify-email'))
    }
     if (successCode === 'E302') {
      Swal.fire({
        title: 'Error!',
        text: 'Activation link expired',
        icon: 'error',
        confirmButtonText: 'Ok',
        customClass: {
          confirmButton: 'swal-confirm'
        }
      }).then(() => navigate('/verify-email'))
     }
    //remove recovery mode if any
    localStorage.removeItem('@recovered_institution_code')
    localStorage.removeItem('@recovered_otp_code')
  }, [])
    const move = () => {
    if (moveTo) {
      navigate(moveTo)
    }
    }
  const year = new Date().getFullYear();
  return (
    <Row className="justify-content-md-center align-items-center">
      {error && <Error message={error} open={setError} move={move} />}
      <div className="login-body">
        <div className="login-first-part">
          <img src={loginImage} alt="img" className="login-image" />
        </div>
        <Col className="login-second-part">
          <Col xs={12} md={8} className="login-detail-holder">
            <div className="login-logo-container">
              <img src={logo} alt="Logo" className="login-logo" />
              <p className="login-logo-label">Veripay</p>
            </div>
            <strong className="login-text">Log In</strong>
            <p className="login-title">
              Solution for Human Resource, Payroll & e-payment
            </p>
            {!verifiedEmail ? (
              <input
                onPaste={(e)=>e.preventDefault()}
                className="login-input"
                value={loginData.email}
                onChange={(value) => handleChange(value.target.value, 'email')}
                placeholder="Email address"
              />
            ) : (
                <div className='w-100 d-flex align-items-center login-input'>

                        <input
                          onChange={(value) =>
                            handleChange(value.target.value, 'password')
                          }
                          onPaste={(e)=>e.preventDefault()}
                          autocomplete="off"
                          value={loginData.password}
                          className="loading-closed-password "
                          placeholder="Password"
                          type={showPassword ? 'text' : 'password'}
                        />
                        {showPassword ? (
                          <svg
                            onClick={() => setShowPassword(false)}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M24 12C24 12 19.5 3.75 12 3.75C4.5 3.75 0 12 0 12C0 12 4.5 20.25 12 20.25C19.5 20.25 24 12 24 12ZM1.7595 12C2.48477 10.8977 3.31896 9.87103 4.2495 8.9355C6.18 7.002 8.82 5.25 12 5.25C15.18 5.25 17.8185 7.002 19.752 8.9355C20.6825 9.87103 21.5167 10.8977 22.242 12C22.155 12.1305 22.059 12.2745 21.9495 12.432C21.447 13.152 20.7045 14.112 19.752 15.0645C17.8185 16.998 15.1785 18.75 12 18.75C8.82 18.75 6.1815 16.998 4.248 15.0645C3.31747 14.129 2.48328 13.1023 1.758 12H1.7595Z"
                              fill="#B4B4B4"
                            />
                            <path
                              d="M12 8.25C11.0054 8.25 10.0516 8.64509 9.34835 9.34835C8.64509 10.0516 8.25 11.0054 8.25 12C8.25 12.9946 8.64509 13.9484 9.34835 14.6517C10.0516 15.3549 11.0054 15.75 12 15.75C12.9946 15.75 13.9484 15.3549 14.6517 14.6517C15.3549 13.9484 15.75 12.9946 15.75 12C15.75 11.0054 15.3549 10.0516 14.6517 9.34835C13.9484 8.64509 12.9946 8.25 12 8.25ZM6.75 12C6.75 10.6076 7.30312 9.27226 8.28769 8.28769C9.27226 7.30312 10.6076 6.75 12 6.75C13.3924 6.75 14.7277 7.30312 15.7123 8.28769C16.6969 9.27226 17.25 10.6076 17.25 12C17.25 13.3924 16.6969 14.7277 15.7123 15.7123C14.7277 16.6969 13.3924 17.25 12 17.25C10.6076 17.25 9.27226 16.6969 8.28769 15.7123C7.30312 14.7277 6.75 13.3924 6.75 12Z"
                              fill="#B4B4B4"
                            />
                          </svg>
                        ) : (
                          <svg
                            onClick={() => setShowPassword(true)}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.93017 16.8825L5.00267 15.8175C3.82833 14.7631 2.90565 13.4585 2.30267 12C3.82517 8.1975 8.02517 5.25 12.0002 5.25C13.0231 5.2635 14.0367 5.44596 15.0002 5.79L16.1627 4.62C14.8447 4.06299 13.4309 3.76751 12.0002 3.75C9.55556 3.84193 7.19146 4.64817 5.20007 6.06906C3.20868 7.48996 1.67729 9.46324 0.795169 11.745C0.735595 11.9098 0.735595 12.0902 0.795169 12.255C1.46135 14.0228 2.53549 15.6083 3.93017 16.8825Z"
                              fill="#B4B4B4"
                            />
                            <path
                              d="M9.00014 11.7976C9.0523 11.0789 9.36141 10.403 9.87095 9.89341C10.3805 9.38387 11.0564 9.07476 11.7751 9.0226L13.1326 7.6576C12.372 7.45731 11.5721 7.45991 10.8127 7.66515C10.0533 7.87038 9.36105 8.27108 8.80484 8.8273C8.24862 9.38351 7.84792 10.0758 7.64269 10.8352C7.43745 11.5945 7.43485 12.3944 7.63514 13.1551L9.00014 11.7976Z"
                              fill="#B4B4B4"
                            />
                            <path
                              d="M23.205 11.745C22.345 9.5049 20.8486 7.56527 18.9 6.165L22.5 2.5575L21.4425 1.5L1.5 21.4425L2.5575 22.5L6.3825 18.675C8.08791 19.6755 10.023 20.2181 12 20.25C14.4446 20.1581 16.8087 19.3518 18.8001 17.9309C20.7915 16.51 22.3229 14.5368 23.205 12.255C23.2646 12.0902 23.2646 11.9098 23.205 11.745ZM15 12C14.9968 12.5251 14.8559 13.0401 14.5913 13.4937C14.3267 13.9472 13.9477 14.3234 13.4922 14.5845C13.0367 14.8457 12.5206 14.9827 11.9955 14.982C11.4704 14.9812 10.9547 14.8426 10.5 14.58L14.58 10.5C14.8496 10.9543 14.9945 11.4717 15 12ZM12 18.75C10.4265 18.7225 8.88292 18.316 7.5 17.565L9.405 15.66C10.2715 16.2612 11.3217 16.539 12.3721 16.4449C13.4225 16.3507 14.4065 15.8906 15.1523 15.1448C15.8981 14.399 16.3582 13.415 16.4524 12.3646C16.5465 11.3142 16.2687 10.264 15.6675 9.3975L17.82 7.245C19.5409 8.42624 20.8867 10.0766 21.6975 12C20.175 15.8025 15.975 18.75 12 18.75Z"
                              fill="#B4B4B4"
                            />
                          </svg>
                        )}
                        </div>
            )}
            <button
              disabled={loading}
              onClick={() => handleSubmit(loginData)}
              className="login-btn"
            >
              {loading ? 'Loading...' : ' Submit'}
            </button>
            <p className="login-register-label ">
              Dont have an account yet?{' '}
              <span
                onClick={() => navigate('/create')}
                className="login-register-link"
              >
                Create Account
              </span>
            </p>
          </Col>
          <p className="login-footer">
            © {year} Veripay - All Rights Reserved
          </p>
        </Col>
      </div>
    </Row>
  );
};

export default Login;
