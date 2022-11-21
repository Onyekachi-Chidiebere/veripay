import React from 'react';
import { Col } from 'react-bootstrap';
import Input from '../components/input/Input';
import { useOutletContext } from 'react-router-dom';

const DeactivateEmployee = () => {
  const [search, setSearch, getData, data] = useOutletContext();
  return (
    <div>
      <div className="staff-type-title">Employee Deactivation</div>
      <div className="d-flex justify-content-between m-3">
        <p className="staffType-listing-title mx-3">
          Search Employee For deactivation
        </p>
        <button className="staff-type-btn">Home</button>
      </div>
      <div className="d-flex flex-column align-items-center">
        <Col md={5}>
          <Input
            title="Search"
            text={search}
            name=""
            handleChange={(val, name) => setSearch(val)}
          />
        </Col>
        <button onClick={getData} className="btn update-employee-btn">
          Search
        </button>
      </div>
    </div>
  );
};

export default DeactivateEmployee;
