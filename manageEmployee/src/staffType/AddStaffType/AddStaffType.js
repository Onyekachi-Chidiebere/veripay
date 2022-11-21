import React, { useState } from 'react';
import { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import Input from '../../components/input/Input';
import Select from '../../components/select/Select';
import '../../styles/addPopUpstyle.css';
import useStaffType from '../useStaffType';
// import useStaffType from '../useStaffType';

const AddStaffType = ({
  close,
  setShowAdd,
  showAdd,
  getInstitutions,
  updateStaffType,
  createStaffType,
  staffData,
  loading,
  handleChange,
  selectInstitution,
  institutions,
}) => {
  const [institution, setInstitution] = useState(false);

  console.log({ showAdd });
  useEffect(() => {
    getInstitutions();
    if (showAdd.staff_type_code) {
      (async () => {
        await setInstitution(true);
        await selectInstitution({ institution_code: showAdd.institution_code });
        await handleChange(showAdd.staff_type_name, 'staff_type_name');
        await handleChange(showAdd.staff_type_code, 'staff_type_code');
      })();
    }
  }, []);
  return (
    <div className="add-staffType-background">
      <Col md={4}>
        <div className="add-staff-type-container">
          <div className="add-staff-type-title-holder">
            <h5 className="add-staff-type-title-holder-title">
              {showAdd.staff_type_code
                ? 'Edit Staff Type'
                : !institution
                ? 'Select Institution'
                : 'Add Staff Type'}
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
              <Select
                label="institution"
                text={staffData.institution.business_name}
                data={institutions}
                handleSelect={selectInstitution}
                id="business_name"
              />
            ) : (
              <Input
                title="Staff Type"
                text={staffData.staff_type_name}
                name="staff_type_name"
                id="staff_type_name"
                handleChange={handleChange}
                required={true}
              />
            )}
          </div>
          <button
            onClick={() => {
              if (showAdd.staff_type_code) {
                return updateStaffType();
              }
              if (!institution) return setInstitution(true);
              return createStaffType();
            }}
            className="add-staffType-submit-btn"
          >
            {loading ? 'Loading...' : !institution ? 'Submit' : 'Add/Update'}
          </button>
        </div>
      </Col>
    </div>
  );
};

export default AddStaffType;
