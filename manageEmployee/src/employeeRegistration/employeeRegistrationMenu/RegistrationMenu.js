import React, { useState } from 'react';
import './registrationMenuStyle.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const RegistrationMenu = ({state}) => {
  const location = useLocation();
  let linkClass = 'nav-item salary-structure-nave-item d-block f-menu w-100';
  const [showNav, setShowNav] = useState('');
  const toggleNav = () => {
    if (showNav) {
      setShowNav('');
      setTimeout(() => {
        document
          .querySelector('#navbarSupportedContent')
          .classList.remove('show');
      }, 400);
    } else {
      setShowNav('show');
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light mt-4 mb-0 py-0">
        <div className="d-flex flex-column justify-content-end align-items-end w-100 px-0 mx-0 mb-0">
          {/* <a className="navbar-brand d-md-none" href="#" /> */}
          <div className="">
            <button
              onClick={toggleNav}
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent1"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>

          <div
            className={`w-100 collapse navbar-collapse ${showNav}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ul-nav w-100 d-flex justify-content-between mb-2 mb-lg-0 fs-6">
              <li className=" w-100">
                <NavLink
                  end
                  to="/dashboard/operations/hr/employee-registration"
                  state={state}
                  className={() =>
                    location.pathname ==
                    '/dashboard/operations/hr/employee-registration'
                      ? linkClass + ' current'
                      : linkClass
                  }
                >
                  <div>
                    <h4>Personal Information</h4>
                    <h5>Register Employee Information</h5>
                  </div>
                </NavLink>
              </li>

              <li className=" w-100">
                <NavLink
                  to="next-of-kin"
                  state={state}
                  className={() =>
                    location.pathname ==
                    '/dashboard/operations/hr/employee-registration/next-of-kin'
                      ? linkClass + ' current'
                      : linkClass
                  }
                  end
                >
                  <div>
                    <h4>Next of Kin</h4>
                    <h5>Next of Kin Information</h5>
                  </div>
                </NavLink>
              </li>

              <li className=" w-100">
                <NavLink
                  className={() =>
                    location.pathname ==
                    '/dashboard/operations/hr/employee-registration/education'
                      ? linkClass + ' current'
                      : linkClass
                  }
                  to="education"
                  state={state}
                  activeclassname="current"
                  end
                >
                  <div>
                    <h4>Education</h4>
                    <h5>Employee Education Qualification</h5>
                  </div>
                </NavLink>
              </li>

              <li className=" w-100">
                <NavLink
                  to="employment"
                  state={state}
                  className={() =>
                    location.pathname ==
                    '/dashboard/operations/hr/employee-registration/employment'
                      ? linkClass + ' current'
                      : linkClass
                  }
                  end
                >
                  <div>
                    <h4>Employment Status</h4>
                    <h5>Employment Details</h5>
                  </div>
                </NavLink>
              </li>
              <li className="w-100">
                <NavLink
                  state={state}
                  to="account"
                  className={() =>
                    location.pathname ==
                    '/dashboard/operations/hr/employee-registration/account'
                      ? linkClass + ' current'
                      : linkClass
                  }
                  end
                >
                  <div>
                    <h4>Employee bank Information</h4>
                    <h5>Employee Fund Details</h5>
                  </div>
                </NavLink>
              </li>

              <li className="w-100">
                <NavLink
                  to="complete"
                  state={state}
                  className={() =>
                    location.pathname ==
                    '/dashboard/operations/hr/employee-registration/complete'
                      ? linkClass + ' current'
                      : linkClass
                  }
                  end
                >
                  <div>
                    <h4>Registration Complete</h4>
                    <h5>Completed</h5>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default RegistrationMenu;
