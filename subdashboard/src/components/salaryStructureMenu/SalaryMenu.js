import React, { useState } from 'react';
import './salaryStructureMenuStyle.css';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const SalaryMenu = () => {
  const location = useLocation();
  const setup_stage = Number(localStorage.getItem('@setup_stage'));
  let linkClass = 'nav-item salary-structure-nave-item d-block f-menu w-100';
  const [showNav, setShowNav] = useState("")

  const toggleNav = () => {
    if (showNav) {
      setShowNav("")
      setTimeout(() => {
        document.querySelector("#navbarSupportedContent").classList.remove("show")
      }, 400);
    } else {
      setShowNav("show")
    }
  }
  let maxSetUp = 6;
  const regimeRoute = (e) => {
    if(setup_stage!==1&&setup_stage!==maxSetUp)
    // e.preventDefault()
      console.log('hi')
  }
  const categoryRoute = (e) => {
    if(setup_stage!==2&&setup_stage!==maxSetUp)
    // e.preventDefault()
      console.log('hi')
  }
  const nameRoute = (e) => {
    if(setup_stage!==3&&setup_stage!==maxSetUp)
      console.log('hi')
    // e.preventDefault()
  }
  const levelRoute = (e) => {
    console.log({setup_stage})
    if(setup_stage!==4&&setup_stage!==maxSetUp)
      console.log('hi')
    // e.preventDefault()
  }
  const scaleRoute = (e) => {
    console.log({setup_stage})
    if(setup_stage!==maxSetUp)
      console.log('hi')
    // e.preventDefault()
  }
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light mt-4 mb-0 py-0">
        <div className="d-flex flex-column justify-content-end align-items-end w-100 px-0 mx-0 mb-0">
          {/* <a className="navbar-brand d-md-none" href="#" /> */}
          <div className=''>
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

          <div className={`w-100 collapse navbar-collapse ${showNav}`} id="navbarSupportedContent">
            <ul className="navbar-nav ul-nav w-100 d-flex justify-content-between mb-2 mb-lg-0 fs-6">
              <li className="me-1 w-100">
                <NavLink
                  onClick={regimeRoute}
                  end
                  to="/dashboard/setup/salary_structure"
                  className={() =>
                    location.pathname == '/dashboard/setup/salary_structure' ||
                    location.pathname == '/dashboard/setup/salary_structure/add-regime'
                      ? linkClass + ' current'
                      : linkClass
                  }
                >
                  Salary Regime
                </NavLink>
              </li>

              <li className="mx-1 w-100">
                <NavLink
                  onClick={categoryRoute}
                  to="structure/category"
                  className={() => {
                    return location.pathname ==
                      '/dashboard/setup/salary_structure/structure/category'
                      ? linkClass + ' current'
                      : linkClass;
                  }}
                  end
                >
                  Salary Category
                </NavLink>
              </li>

              <li className="mx-1 w-100">
                <NavLink
                  onClick={nameRoute}
                  className={() => {
                    return location.pathname == '/dashboard/setup/salary_structure/structure' ||
                      location.pathname == '/dashboard/setup/salary_structure/structure/add'
                      ? linkClass + ' current'
                      : linkClass;
                  }}
                  to="structure"
                  activeclassname="current"
                  end
                >
                  Salary Structure
                </NavLink>
              </li>

              {/* <li className="mx-1 w-100">
                <NavLink
                  to="grade/name"
                  className={({ isActive }) =>
                    isActive ? linkClass + ' current' : linkClass
                  }
                  end
                >
                  Grade Name
                </NavLink>
              </li> */}

              <li className="mx-1 w-100">
                <NavLink
                  onClick={levelRoute}
                  to="grade-level"
                  className={() => {
                    return location.pathname ==
                      '/dashboard/setup/salary_structure/grade-level' ||
                      location.pathname == '/dashboard/setup/salary_structure/grade-level/add'
                      ? linkClass + ' current'
                      : linkClass;
                  }}
                  end
                >
                  Grade Level
                </NavLink>
              </li>

              <li className="ms-1 w-100">
                <NavLink
                  onClick={scaleRoute}
                  to="basic-scale"
                  className={() => {
                    return location.pathname ==
                      '/dashboard/setup/salary_structure/basic-scale' ||
                      location.pathname ==
                        '/dashboard/setup/salary_structure/basic-scale/regime-structure'
                      ? linkClass + ' current'
                      : linkClass;
                  }}
                  end
                >
                  Basic Scale
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default SalaryMenu;
