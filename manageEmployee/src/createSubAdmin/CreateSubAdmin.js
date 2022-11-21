import React, { useEffect } from 'react';
import Input from '../components/input/Input';
import Select from '../components/select/Select';
import './createSubAdminStyle.css';
import useCreateSubAdmin from './useCreateSubAdmin'

const CreateSubAdmin = () => {
  const {
    adminInfo,
    handleChange,
    submitAdmininfo,
  } = useCreateSubAdmin();
 
  return (
    <>
      <h4 className='sub-admin-header mx-4 mt-4 pt-2'>create Users</h4>
      <div className="register-employee-holder p-4 my-4 mx-4 d-flex flex-column justify-content-center">
       <div className='d-flex justify-content-between'>
        <div className="register-employee-title m-2">Create New</div>
        <button className='btn sub-admin-listing-btn'>Listing</button>
       </div>
       <div className='mx-2 d-flex'>
        <p className='subAdminInstitutionWarn'>Is Employee of APPMART INTEGRATED LIMITED Institution<span>*</span></p>
        <label class="createSubAdminCheckbox">
        <input type="checkbox" />
        <span>Yes</span>
      </label>
      <label class="createSubAdminCheckbox">
        <input type="checkbox" />
        <span>No</span>
      </label>
       </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Input
              title="Username"
              type="text"
              text={adminInfo.username}
              name="username"
              handleChange={handleChange}
              disabled={true}
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="Email"
              handleChange={handleChange}
              text={adminInfo.email}
              type="text"
              name="email"
              required
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="Phone"
              required
              handleChange={handleChange}
              name="phone"
              text={adminInfo.phone}
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
          <Select
              text={adminInfo.institution.id}
              id="id"
              handleSelect={(item) => handleChange(item, 'institution')}
              data={[{ id: 'Mr.' }, { id: 'Mrs.' }, { id: 'Miss.' }]}
              label="Institution"
              required
            />
           
          </div>
          <div className="w-100 m-2">
          <Select
              text={adminInfo.module.id}
              id="id"
              handleSelect={(item) => handleChange(item, 'module')}
              data={[{ id: 'Module 1.' }, { id: 'Module 2.' }, { id: 'Module 3.' }]}
              label="Module"
              required
            />
          </div>
          <div className="w-100 m-2">
          <Select
              text={adminInfo.requireAuth.id}
              id="id"
              handleSelect={(item) => handleChange(item, 'requireAuth')}
              data={[{ id: 'Yes' }, { id: 'No' }]}
              label="Require Auth. for Payment Gateway"
              required
            />
          </div>
      
        </div>
        <button onClick={submitAdmininfo} className='btn createSubAdminBtn'>Submit</button>
      </div>
     
    </>
  );
};

export default CreateSubAdmin;
