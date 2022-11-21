import React, { useState } from 'react';
import { Col } from 'react-bootstrap';
import Input from '../../components/input/Input';
import Search from '../../components/search/Search';
import Select from '../../components/select/Select';
import '../../styles/addPopUpstyle.css';

const AddTaxLaw = ({ close }) => {
  return (
    <div className="add-staffType-background">
      <Col md={4}>
        <div className="add-staff-type-container">
          <div className="add-staff-type-title-holder">
            <h5 className="add-staff-type-title-holder-title">
              Manage Tax Law
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
                label="Extend statutory tax law or add new"
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
          </div>
          <div className="mx-3 ">
            <Input title="Tax Law" />
          </div>
          <button
            onClick={() => {
              return close();
            }}
            className="add-staffType-submit-btn"
          >
            Submit
          </button>
        </div>
      </Col>
    </div>
  );
};

export default AddTaxLaw;
