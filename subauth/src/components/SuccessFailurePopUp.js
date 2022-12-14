import React from 'react';
import '../styles/otp.css';
import '../styles/failureSuccess.css';
import { useNavigate } from 'react-router-dom';

import { Card, Form, InputGroup, FormControl, Col, Row } from 'react-bootstrap';

const SuccessFailure = ({ setShowSuccessFailure, success }) => {
  let navigate = useNavigate();
  const handleSuccess = () => {
    setShowSuccessFailure(false);
    navigate('/');
  };
  return (
    <Row className="justify-content-md-center align-items-center otp-background">
      <Col md={4} className="otp-container">
        {success ? (
          <svg
            width="170"
            height="170"
            viewBox="0 0 170 170"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M85 9.44434C70.0565 9.44434 55.4487 13.8756 43.0236 22.1777C30.5986 30.4799 20.9144 42.2801 15.1958 56.086C9.47716 69.892 7.98091 85.0837 10.8962 99.7401C13.8116 114.396 21.0075 127.859 31.5742 138.426C42.1408 148.992 55.6035 156.188 70.2599 159.104C84.9162 162.019 100.108 160.523 113.914 154.804C127.72 149.086 139.52 139.401 147.822 126.976C156.124 114.551 160.556 99.9434 160.556 84.9999C160.556 64.9613 152.595 45.7435 138.426 31.574C124.256 17.4046 105.039 9.44434 85 9.44434ZM85 151.111C71.9245 151.111 59.1426 147.234 48.2707 139.969C37.3987 132.705 28.9251 122.38 23.9213 110.3C18.9175 98.2193 17.6083 84.9266 20.1592 72.1023C22.7101 59.278 29.0066 47.4981 38.2524 38.2523C47.4982 29.0065 59.2781 22.71 72.1024 20.1591C84.9267 17.6082 98.2194 18.9174 110.3 23.9212C122.38 28.925 132.705 37.3986 139.969 48.2705C147.234 59.1424 151.111 71.9244 151.111 84.9999C151.111 102.534 144.146 119.349 131.748 131.748C119.349 144.146 102.534 151.111 85 151.111Z"
              fill="#6DCD99"
            />
            <path
              d="M132.222 57.1388C131.337 56.2593 130.14 55.7656 128.893 55.7656C127.645 55.7656 126.448 56.2593 125.564 57.1388L73.1469 109.319L44.8136 80.986C43.9494 80.053 42.75 79.5015 41.4792 79.4527C40.2084 79.404 38.9703 79.8622 38.0372 80.7263C37.1042 81.5905 36.5526 82.7899 36.5039 84.0607C36.4552 85.3315 36.9133 86.5697 37.7775 87.5027L73.1469 122.778L132.222 63.8444C132.665 63.4054 133.016 62.8831 133.256 62.3076C133.495 61.7322 133.619 61.115 133.619 60.4916C133.619 59.8682 133.495 59.251 133.256 58.6755C133.016 58.1001 132.665 57.5778 132.222 57.1388Z"
              fill="#6DCD99"
            />
          </svg>
        ) : (
          <svg
            width="170"
            height="170"
            viewBox="0 0 170 170"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M91.3762 10.625C108.376 11.6875 124.314 20.1875 136.001 31.875C149.814 46.75 157.251 64.8125 157.251 86.0624C157.251 103.062 150.876 119 140.251 132.812C129.626 145.562 114.751 155.125 97.7512 158.312C80.7512 161.5 63.7512 159.375 48.8762 150.875C34.0012 142.375 22.3137 129.625 15.9387 113.687C9.56371 97.7499 8.50121 79.6874 13.8137 63.7499C19.1262 46.7499 28.6887 32.9374 43.5637 23.375C57.3762 13.8125 74.3762 9.56245 91.3762 10.625ZM96.6887 147.687C110.501 144.5 123.251 137.062 132.814 125.375C141.314 113.687 146.626 99.8749 145.564 84.9999C145.564 67.9999 139.189 51 127.501 39.3125C116.876 28.6875 104.126 22.3125 89.2512 21.25C75.4387 20.1875 60.5637 23.375 48.8762 31.875C37.1887 40.375 28.6887 52.0624 24.4387 66.9374C20.1887 80.7499 20.1887 95.6249 26.5637 109.437C32.9387 123.25 42.5012 133.875 55.2512 141.312C68.0012 148.75 82.8762 150.875 96.6887 147.687ZM83.9387 79.6874L109.439 53.1249L116.876 60.5624L91.3762 87.1249L116.876 113.687L109.439 121.125L83.9387 94.5624L58.4387 121.125L51.0012 113.687L76.5012 87.1249L51.0012 60.5624L58.4387 53.1249L83.9387 79.6874Z"
              fill="#E36E6E"
            />
          </svg>
        )}
        <strong className="failure-success-status">
          {success ? 'Successful!' : 'Failed!'}
        </strong>
        <p className="failure-success-text">
          {success
            ? 'Your account creation was successful, check your email to validate your account'
            : 'Something went wrong, probably from our end or yours, please try again.'}
        </p>
        <button onClick={handleSuccess} className="otp-btn">
          Ok
        </button>
      </Col>
    </Row>
  );
};

export default SuccessFailure;
