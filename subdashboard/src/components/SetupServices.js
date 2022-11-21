import React, {useEffect} from 'react';
import { Outlet } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import '../styles/setupServices.css';

const SetupServices = () => {
   useEffect(() => {
     localStorage.removeItem('@veripay_active_regime_code');
   }, [])
  return (   
          <Outlet />      
  );
};
export default SetupServices;
