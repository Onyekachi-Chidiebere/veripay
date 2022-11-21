import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../styles/setupServices.css';

const SelectSetup = () => {
  return (
    <div className="w-100 dashboard-card">
      <Row className="justify-content-center">
        <Col md={11}>
          <div
            style={{ borderLeftColor: '#A9D8FD' }}
            className="select-service-item-holder d-flex align-items-center"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V22C0 22.5304 0.210714 23.0391 0.585786 23.4142C0.960859 23.7893 1.46957 24 2 24H22C22.5304 24 23.0391 23.7893 23.4142 23.4142C23.7893 23.0391 24 22.5304 24 22V2C24 1.46957 23.7893 0.960859 23.4142 0.585786C23.0391 0.210714 22.5304 0 22 0ZM10 17.5L5 12.543L6.59 11L10 14.346L17.409 7L19 8.577L10 17.5Z"
                fill="#17517E"
              />
            </svg>

            <p>Human Resources Service (HR)</p>
          </div>
          <div
            style={{ borderLeftColor: '#FFD865' }}
            className="select-service-item-holder d-flex align-items-center"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.801636 4.40005C0.801636 3.44527 1.18092 2.5296 1.85605 1.85446C2.53118 1.17933 3.44686 0.800049 4.40164 0.800049H19.6C20.5548 0.800049 21.4705 1.17933 22.1456 1.85446C22.8208 2.5296 23.2 3.44527 23.2 4.40005V19.6001C23.2 20.5548 22.8208 21.4705 22.1456 22.1456C21.4705 22.8208 20.5548 23.2001 19.6 23.2001H4.40164C3.44686 23.2001 2.53118 22.8208 1.85605 22.1456C1.18092 21.4705 0.801636 20.5548 0.801636 19.6001V4.40005ZM4.40164 3.20005C4.08338 3.20005 3.77815 3.32648 3.55311 3.55152C3.32806 3.77656 3.20164 4.08179 3.20164 4.40005V19.6001C3.20164 20.2625 3.73924 20.8001 4.40164 20.8001H19.6C19.9183 20.8001 20.2235 20.6736 20.4486 20.4486C20.6736 20.2235 20.8 19.9183 20.8 19.6001V4.40005C20.8 4.08179 20.6736 3.77656 20.4486 3.55152C20.2235 3.32648 19.9183 3.20005 19.6 3.20005H4.40164Z"
                fill="#9F9F9F"
              />
            </svg>

            <p>Payment Service</p>
          </div>
          <div
            style={{ borderLeftColor: '#FFB8B8' }}
            className="select-service-item-holder d-flex align-items-center"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.801636 4.40005C0.801636 3.44527 1.18092 2.5296 1.85605 1.85446C2.53118 1.17933 3.44686 0.800049 4.40164 0.800049H19.6C20.5548 0.800049 21.4705 1.17933 22.1456 1.85446C22.8208 2.5296 23.2 3.44527 23.2 4.40005V19.6001C23.2 20.5548 22.8208 21.4705 22.1456 22.1456C21.4705 22.8208 20.5548 23.2001 19.6 23.2001H4.40164C3.44686 23.2001 2.53118 22.8208 1.85605 22.1456C1.18092 21.4705 0.801636 20.5548 0.801636 19.6001V4.40005ZM4.40164 3.20005C4.08338 3.20005 3.77815 3.32648 3.55311 3.55152C3.32806 3.77656 3.20164 4.08179 3.20164 4.40005V19.6001C3.20164 20.2625 3.73924 20.8001 4.40164 20.8001H19.6C19.9183 20.8001 20.2235 20.6736 20.4486 20.4486C20.6736 20.2235 20.8 19.9183 20.8 19.6001V4.40005C20.8 4.08179 20.6736 3.77656 20.4486 3.55152C20.2235 3.32648 19.9183 3.20005 19.6 3.20005H4.40164Z"
                fill="#9F9F9F"
              />
            </svg>

            <p>Select Service</p>
          </div>
          <div
            style={{ borderLeftColor: '#A9D8FD' }}
            className="select-service-item-holder d-flex align-items-center"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.801636 4.40005C0.801636 3.44527 1.18092 2.5296 1.85605 1.85446C2.53118 1.17933 3.44686 0.800049 4.40164 0.800049H19.6C20.5548 0.800049 21.4705 1.17933 22.1456 1.85446C22.8208 2.5296 23.2 3.44527 23.2 4.40005V19.6001C23.2 20.5548 22.8208 21.4705 22.1456 22.1456C21.4705 22.8208 20.5548 23.2001 19.6 23.2001H4.40164C3.44686 23.2001 2.53118 22.8208 1.85605 22.1456C1.18092 21.4705 0.801636 20.5548 0.801636 19.6001V4.40005ZM4.40164 3.20005C4.08338 3.20005 3.77815 3.32648 3.55311 3.55152C3.32806 3.77656 3.20164 4.08179 3.20164 4.40005V19.6001C3.20164 20.2625 3.73924 20.8001 4.40164 20.8001H19.6C19.9183 20.8001 20.2235 20.6736 20.4486 20.4486C20.6736 20.2235 20.8 19.9183 20.8 19.6001V4.40005C20.8 4.08179 20.6736 3.77656 20.4486 3.55152C20.2235 3.32648 19.9183 3.20005 19.6 3.20005H4.40164Z"
                fill="#9F9F9F"
              />
            </svg>
            <p>Select Service</p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={4} className="d-flex justify-content-center">
          <NavLink className="btn service-setup-btn" to="service">
            <button className="btn ">Continue</button>
          </NavLink>
        </Col>
      </Row>
    </div>
  );
};
export default SelectSetup;