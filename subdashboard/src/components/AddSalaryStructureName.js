import { TextField } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import { NavLink } from 'react-router-dom';
import useSalaryStructure from '../hooks/useSalaryStructure';
import Select from './Select';
import TextInput from './TextInput';
import { useNavigate } from 'react-router-dom';

const AddSalaryStructureName = ({close, handleUpdate}) => {
  let setup_stage = localStorage.getItem('@setup_stage');
  const navigate = useNavigate()
  const {
    getRegmes,
    handleChange,
    regimes,
    loading,
    categoryData,
    error,
    success,
    handleSubmitStructureName,
    selectRegime,
    selectCategory,
    updateRegime,
    setError,
    setSuccess,
  } = useSalaryStructure();
  useEffect(() => {
    updateRegime();
  }, []);
  return (
    <div className="w-100 pt-4 edit-card">
      {success && (
        <SweetAlert
          success
          title="success"
          onConfirm={() => {
            setSuccess(false);
            close()
           
          }}
          onCancel={() => {
            setSuccess(false);
            close();
          }}
        >
          {success}
        </SweetAlert>
      )}
      {error && (
        <SweetAlert
          danger
          title="Error"
          onConfirm={() => setError(false)}
          onCancel={() => setError(false)}
        >
          {error}
        </SweetAlert>
      )}
      
      <Row className="justify-content-md-center align-items-center  h-100">
        <Col md={4} className='edit-container'>
           <div className='d-flex justify-content-end align-items-center mx-3'>
          <svg
            onClick={()=>close()}
            className="select-close-button"
            id="close"
            width="170"
            height="170"
            viewBox="0 0 170 170"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M91.3762 10.625C108.376 11.6875 124.314 20.1875 136.001 31.875C149.814 46.75 157.251 64.8125 157.251 86.0624C157.251 103.062 150.876 119 140.251 132.812C129.626 145.562 114.751 155.125 97.7512 158.312C80.7512 161.5 63.7512 159.375 48.8762 150.875C34.0012 142.375 22.3137 129.625 15.9387 113.687C9.56371 97.7499 8.50121 79.6874 13.8137 63.7499C19.1262 46.7499 28.6887 32.9374 43.5637 23.375C57.3762 13.8125 74.3762 9.56245 91.3762 10.625ZM96.6887 147.687C110.501 144.5 123.251 137.062 132.814 125.375C141.314 113.687 146.626 99.8749 145.564 84.9999C145.564 67.9999 139.189 51 127.501 39.3125C116.876 28.6875 104.126 22.3125 89.2512 21.25C75.4387 20.1875 60.5637 23.375 48.8762 31.875C37.1887 40.375 28.6887 52.0624 24.4387 66.9374C20.1887 80.7499 20.1887 95.6249 26.5637 109.437C32.9387 123.25 42.5012 133.875 55.2512 141.312C68.0012 148.75 82.8762 150.875 96.6887 147.687ZM83.9387 79.6874L109.439 53.1249L116.876 60.5624L91.3762 87.1249L116.876 113.687L109.439 121.125L83.9387 94.5624L58.4387 121.125L51.0012 113.687L76.5012 87.1249L51.0012 60.5624L58.4387 53.1249L83.9387 79.6874Z"
              fill="#E36E6E"
            />
          </svg>
          </div>
         <p className='text-center'>Add a Salary Structure</p>
          <Select
            label="Salary Scale Regime "
            text={categoryData.regime.regime_name}
            data={regimes}
            handleSelect={selectRegime}
            id="regime_name"
          />
         
          <Select
            label="Salary Structure Category "
            text={categoryData.category.category_name}
            data={categoryData.regime.categories}
            id="category_name"
            handleSelect={selectCategory}
          />
          <div className="mt-4 mx-3">
            <TextInput
              placeholder="Salary Structure"
              value={categoryData.structure_name}
              field="structure_name"
              onChange={handleChange}
            />
          </div>
          <div className="mt-4 mx-3">
            <TextInput
              placeholder="Salary Structure Abbreviation"
              value={categoryData.structure_abbreviation}
              field="structure_abbreviation"
              onChange={handleChange}
            />
          </div>
          <div className="mt-4 mx-3">
          <button
              onClick={async () => {
                let data = await handleSubmitStructureName();
                if(data) handleUpdate()
              }}
            className="create-account-btn"
          >
            <p>{loading ? 'Loading...' : 'Submit'}</p>
          </button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default AddSalaryStructureName;
