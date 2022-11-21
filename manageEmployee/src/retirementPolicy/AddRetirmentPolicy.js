import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import Input from '../components/input/Input';
import Select from '../components/select/Select';
import '../styles/addPopUpstyle.css';
import useRetirementPolicy from './useRetirementPolicy';

const AddRetirmentPolicy = ({
  close,
  createRetirementPolicy,
  staffData,
  showAddPolicy,
  selectStaffType,
  handleChange,
  updateRetirementPolicy,
  selectInstitution,
  loading,
}) => {
  const [institution, setInstitution] = useState(false);
  const { staffTypes, getStaffType, institutions, getInstitutions } =
    useRetirementPolicy();

  useEffect(() => {
    getStaffType();
    getInstitutions();
    if (showAddPolicy.retirement_policy_code) {
      //this ensures that this is an edit;
      setInstitution(true);
      for (let i = 0; i < staffTypes.length; i++) {
        if (staffTypes[i].staff_type_code == showAddPolicy.staff_type_code) {
          handleChange(staffTypes[i], 'staffType');
        }
      }
      selectInstitution({ institution_code: showAddPolicy.institution_code });
      handleChange(showAddPolicy.max_retirement_age, 'max_age');
      handleChange(showAddPolicy.active_service_years, 'service_years');
      handleChange(
        showAddPolicy.retirement_policy_code,
        'retirement_policy_code'
      );
    }
  }, []);
  useEffect(() => {
    if (showAddPolicy.retirement_policy_code) {
      //this ensures that this is an edit;
      for (let i = 0; i < staffTypes.length; i++) {
        console.log('checking staff type');
        if (staffTypes[i].staff_type_code == showAddPolicy.staff_type_code) {
          handleChange(staffTypes[i], 'staffType');
        }
      }
    }
  }, [staffTypes]);
  return (
    <div className="add-staffType-background">
      <Col md={4}>
        <div className="add-staff-type-container">
          <div className="add-staff-type-title-holder">
            <h5 className="add-staff-type-title-holder-title">
              {showAddPolicy.retirement_policy_code
                ? 'Edit Retirement Policy'
                : !institution
                ? 'Select Institution'
                : 'Add Retirement Policy'}
            </h5>
            <svg
              onClick={close}
              className="add-staffType-close-btn"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 13.0605L17.469 18.531L18.531 17.4705L13.0605 12L18.531 6.53099L17.4705 5.46899L12 10.9395L6.53096 5.46899L5.47046 6.53099L10.9395 12L5.47046 17.469L6.53096 18.531L12 13.0605Z"
                fill="#222222"
              />
            </svg>
          </div>
          <div className="mx-3">
            {!institution ? (
              <div className="my-3">
                <Select
                  label="institution"
                  text={staffData.institution.business_name}
                  data={institutions}
                  handleSelect={selectInstitution}
                  id="business_name"
                />
              </div>
            ) : (
              <div className="my-3">
                <Select
                  label="Staff Type"
                  text={staffData.staffType.staff_type_name}
                  handleSelect={selectStaffType}
                  id="staff_type_name"
                  data={staffTypes}
                  required={true}
                />
              </div>
            )}
            {institution && (
              <div className="my-3">
                <Input
                  title="Active service years"
                  text={staffData.service_years}
                  name="service_years"
                  type="number"
                  handleChange={handleChange}
                  required={true}
                />
              </div>
            )}
            {institution && (
              <div className="my-3">
                <Input
                  title="Max. Retirement Age"
                  text={staffData.max_age}
                  name="max_age"
                  type="number"
                  handleChange={handleChange}
                  required={true}
                />
              </div>
            )}
          </div>
          <button
            onClick={() => {
              if (staffData.retirement_policy_code)
                return updateRetirementPolicy();
              if (!institution) return setInstitution(true);
              return createRetirementPolicy();
            }}
            className="add-staffType-submit-btn"
          >
            {loading
              ? 'Loadimg...'
              : staffData.retirement_policy_code
              ? 'Update'
              : !institution
              ? 'Submit'
              : 'Add/Update'}
          </button>
        </div>
      </Col>
    </div>
  );
};

export default AddRetirmentPolicy;
