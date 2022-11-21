import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import Input from '../../components/input/Input';
import Search from '../../components/search/Search';
import Select from '../../components/select/Select';
import '../../styles/addPopUpstyle.css';

const AddTaxRebirth = ({ close }) => {
  const [institution, setInstitution] = useState(false);
  return (
    <div className="add-staffType-background">
      <Col md={4}>
        <div className="add-staff-type-container">
          <div className="add-staff-type-title-holder">
            <h5 className="add-staff-type-title-holder-title">
              Manage Tax Rebirth
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
            <div className="my-3">
              <Select
                label="Salary Scale Regime"
                text="Regime"
                data={[]}
                id="name"
                required={true}
              />
            </div>
            <div className="my-3">
              <Select label="Tax Law" text="Regime" data={[]} id="name" />
            </div>
            <div className="my-3">
              <Select
                label="Deduction Type"
                text="Regime"
                data={[]}
                id="name"
                required={true}
              />
            </div>
            <div className="my-3">
              <Select
                label="Application Level"
                text="Regime"
                data={[]}
                id="name"
                required={true}
              />
            </div>

            {institution && (
              <div>
                <Select
                  label="Staff Type"
                  text="Staff Type"
                  data={[]}
                  id="name"
                />
                <div className=" mt-3">
                  <Search />
                </div>
                <div className=" mt-3">
                  <Input title="Start Date" type="date" required={true} />
                </div>

                <div className=" mt-3">
                  <Input title="End Date" type="date" required={true} />
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              if (!institution) return setInstitution(true);
              return close();
            }}
            className="add-staffType-submit-btn"
          >
            {institution ? 'Submit' : 'Add/Update'}
          </button>
        </div>
      </Col>
    </div>
  );
};

export default AddTaxRebirth;
