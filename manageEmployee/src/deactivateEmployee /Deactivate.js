import React from 'react';
import { Outlet } from 'react-router-dom';
import useDeactivateEmployee from './useDeactivateEmployee';

const Deactivate = () => {
  const { search, setSearch, getData, data } = useDeactivateEmployee();
  return <Outlet context={[search, setSearch, getData, data]} />;
};

export default Deactivate;
