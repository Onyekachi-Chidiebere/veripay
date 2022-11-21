import React from 'react';
import { Col } from 'react-bootstrap';
import Input from '../components/input/Input';
import Select from '../components/select/Select';
import RegistrationSearch from './RegistrationSearch';
import { useLocation } from 'react-router-dom';
import useEmployeeUpdate from './useUpdateEmployee';

const UpdateEmployee = () => {
  const location = useLocation();
  const { search, setSearch, getData, searchQuery ,changeSearchQuery,data} = useEmployeeUpdate();

  return (
    <div>
      <div className="staff-type-title">Employee Listing</div>
      <div className='staff-type-white-card mx-4 py-4'>
      <div className="d-flex justify-content-between mx-3">
        <p className="staffType-listing-title">
          Search Employee For Info
        </p>
        <button className="staff-type-btn">Home</button>
      </div>
      <div className="d-flex flex-column align-items-center">
        <Col md={5}>
          <div className='mt-3'>
          <Input
            title="Search"
            text={search}
            name=""
            handleChange={(val, name) => setSearch(val)}
          />
          </div>
          <div className="w-100 mt-3">
          <Select
              text={searchQuery.retirementStatus.id}
              id="id"
              handleSelect={(item) => changeSearchQuery(item, 'retirementStatus')}
              data={[{ id: 'Retired' }, { id: 'Not Retired' }]}
              label="Search by Retirement Status"
            />
          </div>
          <div className="w-100 mt-3">
          <Select
              text={searchQuery.activeStatus.id}
              id="id"
              handleSelect={(item) => changeSearchQuery(item, 'activeStatus')}
              data={[{ id: 'Active' }, { id: 'Not Active' }]}
              label="Search by Active Status"
            />
          </div>
          
          <div className='d-flex mt-3 justify-content-between align-items-center'>
         <div className='w-100'>
         <Input
            title="Start Date"
            text={searchQuery.startDate}
            name="startDate"
            type={'date'}
            handleChange={changeSearchQuery}
          />
         </div>
          <span className='mx-2'>To</span>
         <div className='w-100'>
          <Input
            title="End Date"
            text={searchQuery.endDate}
            name="endDate"
            handleChange={changeSearchQuery}
            type={'date'}
          />
          </div>
          </div>
          <button onClick={getData} className="btn mt-3 update-employee-btn w-100">
          Search
        </button>
        </Col>
        </div>
       
      </div>
      {data&&<div className='staff-type-white-card m-4 py-4'>
          <RegistrationSearch data={data}/>
        </div>}
    </div>
  );
};

export default UpdateEmployee;
