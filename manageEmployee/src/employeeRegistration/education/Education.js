import React from 'react';
import Input from '../../components/input/Input';
import Select from '../../components/select/Select';
import '../employeeRegistrationStyle.css';
import { useLocation } from 'react-router-dom';
import useEducation from './useEducation';

const Education = () => {
  const location = useLocation();
  const { handleChange, submitEducationData, getQualificationType,data , qualifications,loading,goBack,qualificationType} = useEducation({state:location.state});
  console.log({state:location.state})
  return (
    <>
      <div className="register-employee-holder p-2 my-4">
        <div className="register-employee-title m-2">
          Education Qualification
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Select
              label="Qualification Type"
              text={data.qualficationType.qualification_type_name}
              id="qualification_type_name"
              getOptions={!location.state?getQualificationType:null}
              data={qualificationType}
              required
              handleSelect={(item) => handleChange(item, 'qualficationType')}
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="School Attended"
              text={data.schoolAttended}
              name="schoolAttended"
              handleChange={handleChange}
              required
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="Qualification Grade"
              required
              text={data.qualificationGrade}
              name="qualificationGrade"
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Input
              type="number"
              min="1900"
              max="9999"
              title="Admission Year"
              required
              text={data.admissionYear}
              name="admissionYear"
              handleChange={handleChange}
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="Graduation Year"
              type="number"
              min="1900"
              max="9999"
              required
              text={data.graduationYear}
              name="graduationYear"
              handleChange={handleChange}
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
          onClick={submitEducationData}
          className="btn employee-footer-proceed-btn"
        >
          {loading?'Loading...':'Save & Proceed'}
        </button>
      </div>
    </>
  );
};

export default Education;
