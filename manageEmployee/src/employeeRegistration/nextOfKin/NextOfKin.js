import React from 'react';
import Input from '../../components/input/Input';
import Select from '../../components/select/Select';
import '../employeeRegistrationStyle.css';
import useNextOfKin from './useNextOfKin';
import { useLocation } from 'react-router-dom';

const NextOfKin = () => {
  const location = useLocation();
  const { handleChange, submitNextOfKinData, data,relationship,gender, loading,goBack } = useNextOfKin({state:location.state});
  console.log({ooo:location.state})
  return (
    <>
      <div className="register-employee-holder p-2 my-4">
        <div className="register-employee-title m-2">
          Next of Kin Information
        </div>

        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Input
              title="Next of Kin Surname"
              required
              name="surname"
              text={data.surname}
              handleChange={handleChange}
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="Next of Kin First Name"
              required
              name="firstname"
              text={data.firstname}
              handleChange={handleChange}
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="Next of Kin Middle Name"
              name="middlename"
              text={data.middlename}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Select
              text={data.relationship.id}
              required
              label="Relationship"
              id="id"
              data={relationship}
              handleSelect={(item) => handleChange(item, 'relationship')}
            />
          </div>
          <div className="w-100 m-2">
            <Select
              label="Gender"
              text={data.gender.id}
              id="id"
              required
              data={gender}
              handleSelect={(item) => handleChange(item, 'gender')}
            />
          </div>
          <div className="w-100 m-2"></div>
        </div>
      </div>
      <div className="d-flex  justify-content-end">
        <button onClick={goBack} className="btn employee-footer-prev-btn">
          Previous
        </button>
        <button
          disabled={loading}
          onClick={submitNextOfKinData}
          className="btn employee-footer-proceed-btn"
        >
         {loading?'Loading...':'Save & Proceed'}
        </button>
      </div>
    </>
  );
};

export default NextOfKin;
