import React, { useEffect, useState } from 'react';
import PinInput from 'react-pin-input';
import '../styles/otp.css';
import { Card, Form, InputGroup, FormControl, Col, Row } from 'react-bootstrap';
// function OTP() {

const OTP = ({ handleResendOtp, loading, handleChange }) => {
  const [countDown, setCountDown] = useState(0);
  const [runTimer, setRunTimer] = useState(false);
  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);
  const togglerTimer = () => setRunTimer((t) => !t);

  useEffect(() => {
    let timerId;

    if (runTimer) {
      setCountDown(60 * 5);
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  useEffect(() => {
    if (countDown < 0 && runTimer) {
      setRunTimer(false);
      setCountDown(0);
    }
  }, [countDown, runTimer]);

  useEffect(() => {
    togglerTimer();
  }, []);

  const handleResend = async () => {
    if (!loading) {
      let sent = await handleResendOtp();
      if (sent) await togglerTimer();
    }
  };
  return (
    <Row className="justify-content-md-center align-items-center otp-background">
      <Col md={4} className="otp-container">
        <strong className="otp-enter">ENTER OTP</strong>
        <p className="otp-code-sent">
          We sent a six digit code to your phone and email
        </p>
        <Row className="justify-content-md-center">
          <PinInput
            length={6}
            initialValue=""
            onChange={(value, index) => {
              handleChange(value, 'otp_code');
            }}
            type="numeric"
            inputMode="number"
            style={{ padding: '5px', textAlign: 'center' }}
            inputStyle={{
              borderColor: '#d1d5df',
              width: '12%',
              height: '74px',
              borderRadius: '5px',
              margin: '5px',
            }}
            inputFocusStyle={{ borderColor: 'blue' }}
            onComplete={(value, index) => {}}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          />
        </Row>
        {loading && <button className="otp-btn">Loading...</button>}

        <p className="otp-not-code">Didn't receive a code?</p>
        <p className="otp-timer">
          {minutes}:{seconds}
        </p>
        {countDown < 1 && (
          <p onClick={handleResend} className="otp-resend">
            Resend OTP
          </p>
        )}
      </Col>
    </Row>
  );
};

export default OTP;
