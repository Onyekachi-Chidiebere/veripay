import React, { useState } from 'react';
import BasicScaleTable from './basicScaleTable/BasicTable';
import { useNavigate } from 'react-router-dom';
const BasicScaleAddTable = ({
  setConfirmDel,
  updateMyData,
  data,
  updateValue,
  finish,
  openSelectLevel,
  structure,
}) => {
  const navigate = useNavigate();
  const [warn, setWarn] = useState(true);
  const rows = [...data.sort((a, b) => a.grade_level.localeCompare(b.grade_level)), { grade_level: '--' }];

  return (
    <>
      <div className="salary-regime-menu d-flex justify-content-between mt-4 mx-4 align-items-center">
        <span className="basic-scale-add-title mx-3 mb-3">
          Basic Salary Scale For {structure}
        </span>
        <button onClick={() => navigate(-1)} className="edit-grade-scale-btn ">
          <span>Back</span>
        </button>
      </div>
      <div className="pt-4 pb-4"></div>
      {warn && (
        <div className="d-flex justify-content-between mx-4 mt-2 mb-4 align-items-center structure-warn-container">
          {/* warn svg */}

          <div className="d-flex align-items-center">
            <svg
              className="mx-2 "
              width="22"
              height="23"
              viewBox="0 0 22 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.543 2.5979C13.3129 2.11874 12.9522 1.71433 12.5022 1.43128C12.0523 1.14823 11.5316 0.998047 11 0.998047C10.4685 0.998047 9.94776 1.14823 9.49785 1.43128C9.04793 1.71433 8.68714 2.11874 8.45704 2.5979L0.341043 18.5629C-0.629957 20.4689 0.597043 22.9999 2.88304 22.9999H19.116C21.403 22.9999 22.628 20.4699 21.659 18.5629L13.543 2.5979ZM11 7.9999C11.2653 7.9999 11.5196 8.10526 11.7071 8.2928C11.8947 8.48033 12 8.73469 12 8.9999V13.9999C12 14.2651 11.8947 14.5195 11.7071 14.707C11.5196 14.8945 11.2653 14.9999 11 14.9999C10.7348 14.9999 10.4805 14.8945 10.2929 14.707C10.1054 14.5195 10 14.2651 10 13.9999V8.9999C10 8.73469 10.1054 8.48033 10.2929 8.2928C10.4805 8.10526 10.7348 7.9999 11 7.9999ZM11 16.4999C11.2653 16.4999 11.5196 16.6053 11.7071 16.7928C11.8947 16.9803 12 17.2347 12 17.4999V17.9999C12 18.2651 11.8947 18.5195 11.7071 18.707C11.5196 18.8945 11.2653 18.9999 11 18.9999C10.7348 18.9999 10.4805 18.8945 10.2929 18.707C10.1054 18.5195 10 18.2651 10 17.9999V17.4999C10 17.2347 10.1054 16.9803 10.2929 16.7928C10.4805 16.6053 10.7348 16.4999 11 16.4999Z"
                fill="#DD5F5F"
              />
            </svg>
            <p>
              Save/Update button helps you save the records as you are entering the figures. Please
              note that only annual figures should be entered
            </p>
          </div>

          {/* cancel svg */}
          <svg
            onClick={() => setWarn(false)}
            style={{ cursor: 'pointer' }}
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.8799 16.0001L23.6132 10.2801C23.8643 10.029 24.0054 9.68849 24.0054 9.33342C24.0054 8.97835 23.8643 8.63782 23.6132 8.38675C23.3622 8.13568 23.0217 7.99463 22.6666 7.99463C22.3115 7.99463 21.971 8.13568 21.7199 8.38675L15.9999 14.1201L10.2799 8.38675C10.0288 8.13568 9.68832 7.99463 9.33325 7.99463C8.97818 7.99463 8.63766 8.13568 8.38659 8.38675C8.13551 8.63782 7.99446 8.97835 7.99446 9.33342C7.99446 9.68849 8.13551 10.029 8.38659 10.2801L14.1199 16.0001L8.38659 21.7201C8.26161 21.844 8.16242 21.9915 8.09473 22.154C8.02704 22.3165 7.99219 22.4907 7.99219 22.6668C7.99219 22.8428 8.02704 23.017 8.09473 23.1795C8.16242 23.342 8.26161 23.4895 8.38659 23.6134C8.51054 23.7384 8.658 23.8376 8.82048 23.9053C8.98296 23.973 9.15724 24.0078 9.33325 24.0078C9.50927 24.0078 9.68354 23.973 9.84602 23.9053C10.0085 23.8376 10.156 23.7384 10.2799 23.6134L15.9999 17.8801L21.7199 23.6134C21.8439 23.7384 21.9913 23.8376 22.1538 23.9053C22.3163 23.973 22.4906 24.0078 22.6666 24.0078C22.8426 24.0078 23.0169 23.973 23.1794 23.9053C23.3418 23.8376 23.4893 23.7384 23.6132 23.6134C23.7382 23.4895 23.8374 23.342 23.9051 23.1795C23.9728 23.017 24.0076 22.8428 24.0076 22.6668C24.0076 22.4907 23.9728 22.3165 23.9051 22.154C23.8374 21.9915 23.7382 21.844 23.6132 21.7201L17.8799 16.0001Z"
              fill="#DD5F5F"
            />
          </svg>
        </div>
      )}
      <BasicScaleTable
        updateMyData={updateMyData}
        data={rows}
        setConfirmDel={setConfirmDel}
        openSelectLevel={openSelectLevel}
      />
      <div className="basic-scale-btn-holder">
        <button className="basic-scale-save-btn" onClick={() => updateValue()}>
          Save/Update
        </button>
        <button onClick={() => finish()} className="basic-scale-finish-btn">
          Finish
        </button>
      </div>
    </>
  );
};
export default BasicScaleAddTable;
