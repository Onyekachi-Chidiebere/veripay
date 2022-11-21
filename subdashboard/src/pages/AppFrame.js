import React, { useState } from 'react';
import '../styles/dashboard.css';
import { Outlet } from 'react-router-dom';
// import App from '../components/collapsingTable/CollapsingTable';

const AppFrame = ({ Child }) => {

  const year = new Date().getFullYear();
  // return <App/>
  return   <main className="w-100 pt-3 ps-4 pe-4 pb-3 mb-4 d-flex flex-column justify-content-between main">
          <Outlet />
          <footer className="bottom-5 text-center w-100 fs-6 mb-4 ">
            {year} Veripay Suite - All Rights Reserved
          </footer>
        </main>
  
};

export default AppFrame;
