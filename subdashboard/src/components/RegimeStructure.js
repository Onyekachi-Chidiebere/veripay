import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import DashboardEmpty from './DashboardEmpty';
import SortCaret from './table/SortCaret';
import Table from './table/Table';

const BasicScaleList = () => {
  const [warn, setWarn] = useState(true);
  function more(cell, row) {
    return (
      <div class="dropdown">
        <span>More</span>
        <div class="dropdown-content">
          <p>Edit Grade Scale</p>
          <p>View Grades</p>
          <p>Delete</p>
        </div>
      </div>
    );
  }
  const columns = [
    {
      text: 'Salary Structure',
      dataField: 'salary_structure',
      sort: true,
      sortCaret: SortCaret,
    },

    {
      text: 'Institution',
      dataField: 'institution',
      sort: true,
      sortCaret: SortCaret,
    },
    {
      text: 'Approval Status',
      dataField: 'approval_status',
      sort: true,
      sortCaret: SortCaret,
    },
    {
      text: 'Entered By',
      dataField: 'entered_by',
      sort: true,
      sortCaret: SortCaret,
    },
    {
      text: 'Entered On',
      dataField: 'entered_on',
      sort: true,
      sortCaret: SortCaret,
    },
    {
      headerStyle: (colum, colIndex) => {
        return { width: '50px', textAlign: 'center' };
      },
      formatter: more,
    },
  ];

  const rows = [];
  return (
    <div className="w-100 pt-4 dashboard-card">
      <div className="salary-regime-menu d-flex justify-content-between mt-4 mx-4 align-items-center">
        <span className="salary-regime-title mx-3 mb-3">
          Manage Regime Salary Structure
        </span>
        <NavLink
          to="/dashboard/setup/salary_structure/structure/add"
          className="btn dashboard-add-btn mx-3 mb-3"
        >
          {/* add icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 10.5C6 10.3011 6.07902 10.1103 6.21967 9.96967C6.36032 9.82902 6.55109 9.75 6.75 9.75H9.75V6.75C9.75 6.55109 9.82902 6.36032 9.96967 6.21967C10.1103 6.07902 10.3011 6 10.5 6C10.6989 6 10.8897 6.07902 11.0303 6.21967C11.171 6.36032 11.25 6.55109 11.25 6.75V9.75H14.25C14.4489 9.75 14.6397 9.82902 14.7803 9.96967C14.921 10.1103 15 10.3011 15 10.5C15 10.6989 14.921 10.8897 14.7803 11.0303C14.6397 11.171 14.4489 11.25 14.25 11.25H11.25V14.25C11.25 14.4489 11.171 14.6397 11.0303 14.7803C10.8897 14.921 10.6989 15 10.5 15C10.3011 15 10.1103 14.921 9.96967 14.7803C9.82902 14.6397 9.75 14.4489 9.75 14.25V11.25H6.75C6.55109 11.25 6.36032 11.171 6.21967 11.0303C6.07902 10.8897 6 10.6989 6 10.5ZM6 3C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6V15C3 15.7956 3.31607 16.5587 3.87868 17.1213C4.44129 17.6839 5.20435 18 6 18H15C15.7956 18 16.5587 17.6839 17.1213 17.1213C17.6839 16.5587 18 15.7956 18 15V6C18 5.20435 17.6839 4.44129 17.1213 3.87868C16.5587 3.31607 15.7956 3 15 3H6ZM4.5 6C4.5 5.60218 4.65804 5.22064 4.93934 4.93934C5.22064 4.65804 5.60218 4.5 6 4.5H15C15.3978 4.5 15.7794 4.65804 16.0607 4.93934C16.342 5.22064 16.5 5.60218 16.5 6V15C16.5 15.3978 16.342 15.7794 16.0607 16.0607C15.7794 16.342 15.3978 16.5 15 16.5H6C5.60218 16.5 5.22064 16.342 4.93934 16.0607C4.65804 15.7794 4.5 15.3978 4.5 15V6ZM15.75 19.5C16.7446 19.5 17.6984 19.1049 18.4017 18.4017C19.1049 17.6984 19.5 16.7446 19.5 15.75V4.902C19.956 5.1653 20.3348 5.544 20.5981 6.00004C20.8614 6.45609 21 6.9734 21 7.5V15.75C21 17.1424 20.4469 18.4777 19.4623 19.4623C18.4777 20.4469 17.1424 21 15.75 21H7.5C6.9734 21 6.45609 20.8614 6.00004 20.5981C5.544 20.3348 5.1653 19.956 4.902 19.5H15.75Z"
              fill="#17517E"
            />
          </svg>

          <span>Add New Salary Structure</span>
        </NavLink>
      </div>
      <div>
        <div className="d-flex justify-content-end mx-4 mt-2 aligm-items-center">
          <button className="btn ">
            {/* download icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.00001 10L10.6667 7.33333M8.00001 10V2V10ZM8.00001 10L5.33334 7.33333L8.00001 10Z"
                stroke="#17517E"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.33334 11.3334L1.74734 12.99C1.81945 13.2785 1.98589 13.5346 2.22023 13.7176C2.45457 13.9006 2.74335 14 3.04068 14H12.9593C13.2567 14 13.5455 13.9006 13.7798 13.7176C14.0141 13.5346 14.1806 13.2785 14.2527 12.99L14.6667 11.3334"
                stroke="#17517E"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <text className="regime-download-btn-text">Download</text>
          </button>
        </div>
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
              <p>Info! Only Approved Records Display Here.</p>
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
        <Table columns={columns} rows={rows} />
        {rows.length === 0 && (
          <DashboardEmpty
            title="Add New Salary Structure"
            text="No available Salary Structure"
            route="add"
          />
        )}
      </div>
    </div>
  );
};
export default BasicScaleList;
