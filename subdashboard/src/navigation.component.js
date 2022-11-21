import React from 'react';
import { BrowserRouter,HashRouter, Route, Routes, } from 'react-router-dom';
import '../src/styles/colors.css';
import AppFrame from './pages/AppFrame';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import ProtectedRoute, { BasicRoute, CategoryRoute, GradeRoute, RegimeListRoute, StructureRoute } from './components/ProtectedRoute';
import SalaryStructure from './components/SalaryStructure';
import AddSalaryRegime from './components/AddSalaryRegime';
import SalaryRegime from './components/SalaryRegime';
import AddSalaryStructureName from './components/AddSalaryStructureName';
import AddGradeName from './components/AddSalaryGradeName';
import AddGradeLevel from './components/AddSalaryGradeLevel';
import AddBasicLevel from './components/AddBasicScale';
import SetupServices from './components/SetupServices';
import SelectSetup from './components/SelectSetup';
import SelectService from './components/SelectService';
import SalaryRegimeList from './components/SalaryRegimeList';
import SalaryStructureNameList from './components/SalaryStructureNameList';
import Salary from './components/Salary';
import SalaryGradeLevel from './components/SalaryGradeLevel';
import SalaryGradeLevelList from './components/SalaryGradeLevelList';
import SalaryBasicScale from './components/SalaryBasicScale';
import BasicScaleList from './components/RegimeStructure';
import Dashboard from './components/Dashboard';
import 'axios-progress-bar/dist/nprogress.css';
import { loadProgressBar } from 'axios-progress-bar';
import SalaryStructureCategoryList from './components/SalaryStructureCategoryList';

const Navigator = () => {
  const Error = () => {
    return <div style={{width:'100%', height:'100%'}}>
      <h2>
      Page does not exist yet
      </h2>
    </div>
  }

  loadProgressBar();
  return (
    <BrowserRouter>
      <Routes>
        {/* please remove this route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute Element={AppFrame} />
            //   <AppFrame />
            // </ProtectedRoute>
          }
        >
          <Route path="*" element={<Error />} />
          <Route path="" element={<Dashboard />} />

          <Route path="setup" element={<SetupServices />}>
            <Route path="*" element={<Error />} />
            <Route path="" element={<SelectSetup />} />
            <Route path="service" element={<SelectService />} />
            <Route path="salary_structure" element={<Salary />}>
              <Route path="" element={<SalaryRegime />}>
                <Route path="*" element={<Error />} />
                <Route
                  path=""
                  element={<RegimeListRoute Element={SalaryRegimeList} />}
                />
                {/* <Route path="add-regime" element={<AddSalaryRegime />} /> */}
              </Route>

              <Route
                path="structure"
                element={<StructureRoute Element={SalaryStructure} />}
              >
                <Route path="*" element={<Error />} />
                <Route path="" element={<SalaryStructureNameList />} />
                {/* <Route path="add" element={<AddSalaryStructureName />} /> */}
              </Route>

              <Route
                path="structure/category"
                element={
                  <CategoryRoute Element={SalaryStructureCategoryList} />
                }
              />
              {/* <Route path="grade/name" element={<AddGradeName />} /> */}
              <Route
                path="grade-level"
                element={<GradeRoute Element={SalaryGradeLevel} />}
              >
                <Route path="*" element={<Error />} />
                <Route path="" element={<SalaryGradeLevelList />} />
                {/* <Route path="add" element={<AddGradeLevel />} /> */}
              </Route>

              <Route
                path="basic-scale"
                element={<BasicRoute Element={SalaryBasicScale} />}
              >
                <Route path="*" element={<Error />} />
                <Route path="" element={<AddBasicLevel />} />
                <Route path="regime-structure" element={<BasicScaleList />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Error />} />
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};
export default Navigator;
