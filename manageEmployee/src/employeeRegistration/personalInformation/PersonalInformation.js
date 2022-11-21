import React, { useEffect } from 'react';
import Input from '../../components/input/Input';
import Select from '../../components/select/Select';
import '../employeeRegistrationStyle.css';
import usePersonalInformation from './usePersonalInformation';
import { useLocation } from 'react-router-dom';
const PersonalInformation = () => {
  const location = useLocation();
  console.log({ location: location.state });
  const {
    personalInfo,
    handleChange,
    states,
    staffType,
    loading,
    getStaffType,
    generateEmployeeCode,
    submitPersonalinfo,
  } = usePersonalInformation({ state: location.state });
  let lgas = () => {
    //get lga list for lga of origin when editing
    if (location.state) {
      for (let i = 0; i < states.length; i++) {
        if (
          states[i].state.toLowerCase() ==
          location.state.state_of_origin.toLowerCase()
        )
          return states[i].lgas.map((lga) => {
            return { id: lga };
          });
      }
    }
  };
  let residentialLgas = () => {
    //get lga list for residential lgas when editing
    if (location.state) {
      for (let i = 0; i < states.length; i++) {
        if (
          states[i].state.toLowerCase() ==
          location.state.residential_state.toLowerCase()
        )
          return states[i].lgas.map((lga) => {
            return { id: lga };
          });
      }
    }
  };
  useEffect(()=>{
    generateEmployeeCode();
  },[])
  return (
    <>
      <div className="register-employee-holder p-2 my-4">
        <div className="register-employee-title m-2">Personal Information</div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Input
              title="Verification No."
              type="numner"
              text={personalInfo.employmentNo}
              name="verificationNo"
              handleChange={handleChange}
              disabled={true}
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="Employment No."
              handleChange={handleChange}
              text={personalInfo.verificationNo}
              type="numner"
              name="verificationNo"
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Input
              title="Surname"
              required
              handleChange={handleChange}
              name="surname"
              text={personalInfo.surname}
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="First Name"
              required
              handleChange={handleChange}
              name="firstname"
              text={personalInfo.firstname}
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="Middle Name"
              handleChange={handleChange}
              name="middlename"
              text={personalInfo.middlename}
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Select
              text={personalInfo.title.id}
              id="id"
              handleSelect={(item) => handleChange(item, 'title')}
              data={[{ id: 'Mr.' }, { id: 'Mrs.' }, { id: 'Miss.' }]}
              label="Title"
              required
            />
          </div>
          <div className="w-100 m-2">
            <Select
              text={personalInfo.staffType.staff_type_name}
              id="staff_type_name"
              label="Staff Type"
              getOptions={!location.state?getStaffType:null}
              handleSelect={(item) => handleChange(item, 'staffType')}
              data={staffType}
              required
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="Date of Birth"
              handleChange={handleChange}
              name="dob"
              text={personalInfo.dob}
              required
              type="date"
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Select
              id="id"
              required
              text={personalInfo.maritalStatus.id}
              handleSelect={(item) => handleChange(item, 'maritalStatus')}
              label="Marital Status"
              data={[{ id: 'Married' }, { id: 'Single' }]}
            />
          </div>
          <div className="w-100 m-2">
            <Select
              label="Gender"
              text={personalInfo.gender.id}
              handleSelect={(item) => handleChange(item, 'gender')}
              data={[{ id: 'Male' }, { id: 'Female' }]}
              id="id"
              required
            />
          </div>
          <div className="w-100 m-2">
            <Select
              label="Nationality"
              text={personalInfo.nationality.id}
              handleSelect={(item) => handleChange(item, 'nationality')}
              data={[{ id: 'Nigerian' }]}
              id="id"
              required
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Select
              handleSelect={(item) => handleChange(item, 'stateOfOrigin')}
              text={personalInfo.stateOfOrigin.state}
              label="State Of Origin"
              id="state"
              required
              data={states}
            />
          </div>
          <div className="w-100 m-2">
            <Select
              label="LGA of Origin"
              id="id"
              text={personalInfo.lga.id}
              handleSelect={(item) => handleChange(item, 'lga')}
              getOptions={
                location.state
                  ? null
                  : () =>
                      personalInfo.stateOfOrigin.lgas.map((lga) => {
                        return { id: lga };
                      })
              }
              data={lgas()}
              required
            />
          </div>
          <div className="w-100 m-2">
            <Select
              text={personalInfo.townOfOrigin.id}
              label="City/Town of Origin"
              handleSelect={(item) => handleChange(item, 'townOfOrigin')}
              data={[{ id: 'town 1' }, { id: 'town 2' }, { id: 'town 3' }]}
              id="id"
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Select
              label="Residential State"
              text={personalInfo.residentialState.state}
              handleSelect={(item) => handleChange(item, 'residentialState')}
              id="state"
              data={states}
              required
            />
          </div>
          <div className="w-100 m-2">
            <Select
              label="Residential LGA"
              text={personalInfo.residentialLga.id}
              handleSelect={(item) => handleChange(item, 'residentialLga')}
              data={residentialLgas()}
              getOptions={location.state?null:() =>
                personalInfo.residentialState.lgas.map((lga) => {
                  return { id: lga };
                })
              }
              id="id"
              required
            />
          </div>
          <div className="w-100 m-2">
            <Select
              text={personalInfo.residentialTown.id}
              label="Residential City/Town"
              handleSelect={(item) => handleChange(item, 'residentialTown')}
              data={[{ id: 'town 1' }, { id: 'town 2' }, { id: 'town 3' }]}
              id="id"
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Input
              title="Mobile Number"
              handleChange={handleChange}
              name="number"
              text={personalInfo.number}
              required
              type="number"
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="Email"
              required
              type="email"
              handleChange={handleChange}
              name="email"
              text={personalInfo.email}
            />
          </div>
          <div className="w-100 m-2">
            <Select
              label="Pension Fund Adminstrator"
              text={personalInfo.pensionFund.id}
              handleSelect={(item) => handleChange(item, 'pensionFund')}
              required
              data={[{ id: 'pension 1' }, { id: 'pension 2' }]}
              id="id"
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Input
              title="RSA Number"
              type="number"
              handleChange={handleChange}
              name="rsaNumber"
              text={personalInfo.rsaNumber}
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="Driver's License Number"
              handleChange={handleChange}
              name="licenseNumber"
              text={personalInfo.licenseNumber}
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="Driver's License Expiry Date"
              handleChange={handleChange}
              name="licenseExpiryDate"
              text={personalInfo.licenseExpiryDate}
              type="date"
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Input
              title="National Identification Number(NIN)"
              handleChange={handleChange}
              name="nin"
              text={personalInfo.nin}
              type="number"
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="International Passport Number"
              handleChange={handleChange}
              name="internationalPassportNumber"
              text={personalInfo.internationalPassportNumber}
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="International Passport Expiry Date"
              handleChange={handleChange}
              name="internationalPassportExpiryDate"
              text={personalInfo.internationalPassportExpiryDate}
              type="date"
            />
          </div>
        </div>
      </div>
      <div className="d-flex  justify-content-end">
        <button
          disabled={loading}
          onClick={submitPersonalinfo}
          className="btn employee-footer-proceed-btn"
        >
         {loading?'Loading...': 'Save & Proceed'}
        </button>
      </div>
    </>
  );
};

export default PersonalInformation;
