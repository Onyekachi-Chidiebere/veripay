import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Menu from './menus/Menu';
import pics from './profile.jpg';
import './style.css'
import './colors.css'

export const AppRoot = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('@veripay_user'));
  const [searchQuerry, setSearchQuerry] = useState('');
  const handleLogout = () => {
    localStorage.removeItem('@veripay_token');
    navigate('/');
  };

  return (
    <div id="sideNav" className="dashboard-side-nav">
      <div className="sideNav">
        <div className="dashboard-profile-holder">
          <img src={pics} alt="picture" className="dashboard-profile-picture" />
          <div className="dashboard-name-holder">
            <p className="dashboard-name">{user.business_name}</p>
            <p className="dashboard-email">{user.email}</p>
          </div>
        </div>
        <div className="dashbord-sidebar-search-holder">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.25776 2.24442C8.22048 2.24354 9.16184 2.52822 9.96274 3.06244C10.7636 3.59667 11.3881 4.35643 11.7571 5.24562C12.1262 6.13481 12.2232 7.11347 12.0359 8.0578C11.8486 9.00214 11.3855 9.86971 10.705 10.5508C10.0246 11.2318 9.15744 11.6958 8.21328 11.8839C7.26912 12.0721 6.29037 11.9759 5.40084 11.6077C4.51131 11.2395 3.75098 10.6157 3.21603 9.81533C2.68108 9.01491 2.39554 8.07382 2.39554 7.11109C2.40137 5.82294 2.91538 4.58914 3.82583 3.67785C4.73629 2.76657 5.96961 2.25144 7.25776 2.24442ZM7.25776 1.33331C6.11502 1.33331 4.99795 1.67217 4.0478 2.30704C3.09765 2.94191 2.3571 3.84428 1.91979 4.90003C1.48248 5.95578 1.36806 7.1175 1.591 8.23828C1.81394 9.35906 2.36422 10.3886 3.17225 11.1966C3.98029 12.0046 5.00979 12.5549 6.13057 12.7779C7.25135 13.0008 8.41307 12.8864 9.46882 12.4491C10.5246 12.0118 11.4269 11.2712 12.0618 10.3211C12.6967 9.3709 13.0355 8.25383 13.0355 7.11109C13.0355 5.57873 12.4268 4.10913 11.3433 3.02558C10.2597 1.94204 8.79012 1.33331 7.25776 1.33331Z"
              fill="#818181"
            />
            <path
              d="M15.5556 14.7956L12.28 11.4978L11.6489 12.1245L14.9245 15.4222C14.9656 15.4637 15.0145 15.4966 15.0684 15.5192C15.1223 15.5417 15.1801 15.5534 15.2385 15.5536C15.2969 15.5538 15.3547 15.5425 15.4088 15.5204C15.4628 15.4982 15.5119 15.4656 15.5534 15.4245C15.5948 15.3833 15.6277 15.3344 15.6503 15.2805C15.6728 15.2267 15.6845 15.1689 15.6847 15.1105C15.6849 15.0521 15.6736 14.9942 15.6515 14.9402C15.6293 14.8862 15.5967 14.837 15.5556 14.7956Z"
              fill="#818181"
            />
          </svg>

          <input
            placeholder="Search"
            className="dashboard-sidebar-search-input"
            value={searchQuerry}
            onChange={({ target }) => setSearchQuerry(target.value)}
          />
        </div>

        <Menu
          title={'SERVICE SETUP'}
          searchQuerry={searchQuerry}
          rootLink="/dashboard/setup"
          padding={20}
          links={[
            { name: 'Setup', link: 'setup', child: [] },
            {
              name: 'HR/Payroll',
              rootLink: 'setup/hr',
              child: [
                {
                  name: 'Create Sub Admin',
                  link: 'setup/hr/create-sub-admin',
                  child: [],
                },
                {
                  name: 'Allowance',
                  rootLink: 'setup/hr/manage-allowance',
                  child: [
                    {
                      name: 'Manage Allowance Name',
                      link: 'setup/hr/manage-allowance/name',
                      child: [],
                    },
                    {
                      name: 'Manage Allowance',
                      link: 'setup/hr/manage-allowance',
                      child: [],
                    },
                  ],
                },
                {
                  name: 'Designation  ',
                  link: 'setup/hr/designation',
                  child: [],
                },
                {
                  name: 'MDA Branch',
                  rootLink: 'setup/hr/mda',
                  child: [
                    {
                      name: 'Manage MDA Branch',
                      link: 'setup/hr/mda',
                      child: [],
                    },
                    {
                      name: 'Department',
                      link: 'setup/hr/mda/department',
                      child: [],
                    },
                  ],
                },
                {
                  name: 'Deduction',
                  rootLink: 'setup/hr/deductions',
                  child: [
                    {
                      name: 'Manage Deduction Name',
                      link: 'setup/hr/deductions/name',
                      child: [],
                    },
                    {
                      name: 'Manage Deduction',
                      link: 'setup/hr/deductions',
                      child: [],
                    },
                  ],
                },
                {
                  name: 'Manage Qualifications  ',
                  link: 'setup/hr/manage-qualifications',
                  child: [],
                },
                {
                  name: 'Manage Employee Types  ',
                  link: 'setup/hr/manage-employee-types ',
                  child: [],
                },
                {
                  name: 'Manage Retirement Policy',
                  link: 'setup/hr/manage-retirement-policy',
                  child: [],
                },
                {
                  name: 'Manage Tax',
                  rootLink: 'setup/hr/manage-tax',
                  child: [
                    {
                      name: 'Unit Tax',
                      link: 'setup/hr/manage-tax/unit',
                      child: [],
                    },
                    {
                      name: 'Table Tax',
                      link: 'setup/hr/manage-tax/table',
                      child: [],
                    },
                    {
                      name: 'Tax Exemption',
                      link: 'setup/hr/manage-tax/exemption',
                      child: [],
                    },
                    {
                      name: 'Tax Rebirth',
                      link: 'setup/hr/manage-tax/rebirth',
                      child: [],
                    },
                    {
                      name: 'Tax Law',
                      link: 'setup/hr/manage-tax/law',
                      child: [],
                    },
                  ],
                },
              ],
            },
            {
              name: 'Next level Approval setup',
              link: 'setup/approval',
              child: [
               
              ],
            },
          ]}
        />
        <Menu
          title={'OPERATIONS'}
          searchQuerry={searchQuerry}
          padding={20}
          rootLink="/dashboard/operations"
          links={[
            {
              name: 'HR/Payroll',
              rootLink: '/dashboard/operations/hr',
              child: [
                {
                  name: 'Employee Registration',
                  link: 'operations/hr/employee-registration',
                  child: [],
                },
                {
                  name: 'Employee Profile Updates',
                  link: 'operations/hr/employee-update',
                  child: [],
                },
                // {
                //   name: 'Employee Deactivation',
                //   link: 'operations/hr/employee-deactivation',
                //   child: [],
                // },
              ],
            },
            {
              name: 'Next Level Approvals',
              rootLink: '/dashboard/operations/next-level',
              child: [
                {
                  name: 'Employee Enrollment',
                  link: 'operations/next-level/enrollment',
                  child: [],
                },
                {
                  name: 'New Sub Admin',
                  link: 'operations/next-level/sub-admin',
                  child: [],
                },
                {
                  name: 'Activity Updates',
                  link: 'operations/next-level/activity-updates',
                  child: [],
                },
              ],
            },
          ]}
        />
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

function ProtectedRoute({ children, Element }) {
  //get user token from localstorage to insure user is logged in
  let isAuthenticated = localStorage.getItem('@veripay_token');

  return isAuthenticated ? <Element /> : <Navigate to="/" replace />;
}

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/dashboard/*"
                    element={<ProtectedRoute Element={AppRoot}/>}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;