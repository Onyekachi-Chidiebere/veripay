import React from 'react';
import Input from '../../components/input/Input';
import Select from '../../components/select/Select';
import '../employeeRegistrationStyle.css';
import { useLocation } from 'react-router-dom';
import useEmployment from './useEmploymentInfo';

const EmploymentInformation = () => {
  const location = useLocation();
  const { data, handleChange, submitEmploymentData, loading,goBack,ministry,stepLists,appointmentStatus ,structures,designation,department} = useEmployment({state:location.state});
  return (
    <>
      <div className="register-employee-holder p-2 my-4">
        <div className="register-employee-title m-2">
          Employment Information
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Input
              title="First Appointment Date"
              text={data.firstAppointmentDate}
              name="firstAppointmentDate"
              handleChange={handleChange}
              required
              type="date"
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="Confirmation Date"
              required
              type="date"
              text={data.confirmationDate}
              name="confirmationDate"
              handleChange={handleChange}
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="Last Promotion Date"
              required
              type="date"
              text={data.lastPromommtmionDate}
              name="lastPromommtmionDate"
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Select
              label="Appointment Status"
              required
              text={data.appointmentStatus.data}
              id="data"
              handleSelect={(item) => handleChange(item, 'appointmentStatus')}
              data={appointmentStatus}
            />
          </div>
          <div className="w-100 m-2">
            <Select
              label="Entry Grade Level"
              required
              text={data.entryGradeLevel.id}
              id="id"
              handleSelect={(item) => handleChange(item, 'entryGradeLevel')}
              data={stepLists}
            />
          </div>
          <div className="w-100 m-2">
            <Select
              label="Entry Step"
              required
              text={data.entryStep.id}
              id="id"
              handleSelect={(item) => handleChange(item, 'entryStep')}
              data={stepLists}
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Input
              title="Entry Establishment"
              required
              text={data.entryEstablishment}
              name="entryEstablishment"
              handleChange={handleChange}
            />
          </div>
          <div className="w-100 m-2">
            <Select
              label="Salary Structure"
              required
              text={data.salaryStructure.data}
              id="data"
              handleSelect={(item) => handleChange(item, 'salaryStructure')}
              data={structures}
            />
          </div>
          <div className="w-100 m-2">
            <Select
              required
              label="Current Grade Level"
              text={data.currentGradeLevel.id}
              id="id"
              handleSelect={(item) => handleChange(item, 'currentGradeLevel')}
              data={stepLists}
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Select
              label="Current Step"
              required
              text={data.currentStep.id}
              id="id"
              handleSelect={(item) => handleChange(item, 'currentStep')}
              data={stepLists}
            />
          </div>
          <div className="w-100 m-2">
            <Select
              label="Current Designation"
              required
              text={data.currentDesignation.id}
              id="data"
              handleSelect={(item) => handleChange(item, 'currentDesignation')}
              data={designation}
            />
          </div>
          <div className="w-100 m-2">
            <Select
              label="Department"
              required
              text={data.department.data}
              id="data"
              handleSelect={(item) => handleChange(item, 'department')}
              data={department}
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Select
              label="Ministry"
              required
              text={data.ministry.data}
              id="data"
              handleSelect={(item) => handleChange(item, 'ministry')}
              data={ministry}
            />
          </div>
          <div className="w-100 m-2"></div>
          <div className="w-100 m-2"></div>
        </div>
      </div>
      <div className="d-flex  justify-content-end">
        <button onClick={goBack} className="btn employee-footer-prev-btn">
          Previous
        </button>
        <button disabled={loading}
          onClick={submitEmploymentData}
          className="btn employee-footer-proceed-btn"
        >
          {loading?'Loading...':'Save & Proceed'}
        </button>
      </div>
    </>
  );
};

export default EmploymentInformation;
