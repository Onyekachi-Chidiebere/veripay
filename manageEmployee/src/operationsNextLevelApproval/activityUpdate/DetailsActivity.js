import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../styles/componentStyle.css';

const DetailsActivity = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h3 className="staff-type-title">Next level Approval</h3>

      <div className="staff-type-container">
        <div className="staffType-listing-title-container">
          <h4 className="staffType-listing-title">
            Next Level Approval - Detail
          </h4>
          <div>
            <button className="staff-type-btn mx-3">
              <svg
                className="me-2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.875 4C16.2901 3.99997 16.6894 4.15878 16.9911 4.44384C17.2928 4.72889 17.474 5.1186 17.4975 5.533L17.5 5.625V7H18.375C19.825 7 21 8.175 21 9.625V16.375C21 16.806 20.8288 17.2193 20.524 17.524C20.2193 17.8288 19.806 18 19.375 18H17.5V18.875C17.5 19.306 17.3288 19.7193 17.024 20.024C16.7193 20.3288 16.306 20.5 15.875 20.5H8.125C7.69402 20.5 7.2807 20.3288 6.97595 20.024C6.67121 19.7193 6.5 19.306 6.5 18.875V18H4.625C4.19402 18 3.7807 17.8288 3.47595 17.524C3.1712 17.2193 3 16.806 3 16.375V9.625C3 8.175 4.175 7 5.625 7H6.5V5.625C6.49997 5.20993 6.65878 4.81059 6.94384 4.50888C7.22889 4.20718 7.6186 4.026 8.033 4.0025L8.125 4H15.875ZM7.75 18.875C7.75 19.082 7.918 19.25 8.125 19.25H15.875C15.9745 19.25 16.0698 19.2105 16.1402 19.1402C16.2105 19.0698 16.25 18.9745 16.25 18.875V14.625C16.25 14.5255 16.2105 14.4302 16.1402 14.3598C16.0698 14.2895 15.9745 14.25 15.875 14.25H8.125C8.02554 14.25 7.93016 14.2895 7.85984 14.3598C7.78951 14.4302 7.75 14.5255 7.75 14.625V18.875ZM15.875 5.25H8.125C8.03438 5.25 7.94683 5.28282 7.87853 5.34238C7.81024 5.40195 7.76582 5.48422 7.7535 5.574L7.75 5.625V7H16.25V5.625C16.25 5.53438 16.2172 5.44683 16.1576 5.37853C16.0981 5.31024 16.0158 5.26582 15.926 5.2535L15.875 5.25Z"
                  fill="#17517E"
                />
              </svg>
              Print
            </button>
            <button onClick={() => navigate(-1)} className="staff-type-btn">
              Back
            </button>
          </div>
        </div>
        <table className="approval-detail-table">
          <tr>
            <td className="approval-detail-table-title">User Type</td>
            <td>Staff</td>
          </tr>
          <tr>
            <td className="approval-detail-table-title">Record Action</td>
            <td>Add Allowance Name</td>
          </tr>
          <tr>
            <td className="approval-detail-table-title">Category</td>
            <td>INSER_ALLOWANCE_NAME</td>
          </tr>
          <tr>
            <td className="approval-detail-table-title">Requested By</td>
            <td>MBAEBIE COLLINS</td>
          </tr>
          <tr>
            <td className="approval-detail-table-title">Requested On</td>
            <td>2021-12-16, 15:12:12</td>
          </tr>
          <tr>
            <td className="approval-detail-table-title">Current Record</td>
            <tr>
              <td>Staff_type_id</td>
              <td>8</td>
            </tr>
          </tr>
          <tr>
            <td className="approval-detail-table-title">Requested Update</td>
            <td></td>
          </tr>
          <tr>
            <td className="approval-detail-table-title">First Approver:</td>
            <td>On</td>
          </tr>
          <tr>
            <td className="approval-detail-table-title">Second Approver:</td>
            <td>On</td>
          </tr>
          <tr>
            <td className="approval-detail-table-title">Third Approver:</td>
            <td>On</td>
          </tr>
        </table>
        <div className="d-flex justify-content-end my-4">
          <button className="btn blue-btn">Approve</button>
        </div>
      </div>
    </div>
  );
};
export default DetailsActivity;
