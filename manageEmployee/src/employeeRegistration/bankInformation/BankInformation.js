import React from 'react';
import Input from '../../components/input/Input';
import Select from '../../components/select/Select';
import '../employeeRegistrationStyle.css';
import { useLocation } from 'react-router-dom';
import useBankInfo from './useBankInfo';

const BankInformation = () => {
  const location = useLocation();
  const { data,accountTypes,banks, handleChange, submitBankInfo, loading,goBack } = useBankInfo({state:location.state});

  return (
    <>
      <div className="register-employee-holder p-2 my-4">
        <div className="register-employee-title m-2">Bank Account Detail</div>

        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
          <Select
              label="Account Type"
              text={data.accountType.name}
              id="name"
              data={accountTypes}
              required
              handleSelect={(item) => handleChange(item, 'accountType')}
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="Account Number"
              required
              name="number"
              text={data.number}
              handleChange={handleChange}
              type="number"
            />
          </div>
          <div className="w-100 m-2">
          <Select
              label="Bank Name"
              text={data.bankName.name}
              id="name"
              data={banks}
              required
              handleSelect={(item) => handleChange(item, 'bankName')}
            />
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row">
          <div className="w-100 m-2">
            <Input
              title="Nuban Account Name"
              name="nubanName"
              text={data.nubanName}
              handleChange={handleChange}
              disabled={true}
            />
          </div>
          <div className="w-100 m-2">
            <Input
              title="BVN"
              name="bvn"
              text={data.bvn}
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
          onClick={submitBankInfo}
          className="btn employee-footer-proceed-btn"
        >
          {loading?'Loading...':'Save & Proceed'}
        </button>
      </div>
    </>
  );
};

export default BankInformation;
