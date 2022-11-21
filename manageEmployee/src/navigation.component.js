import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'axios-progress-bar/dist/nprogress.css';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import { loadProgressBar } from 'axios-progress-bar';
import StaffType from './staffType/StaffType';
import RetirementPolicy from './retirementPolicy/RetirmentPolicy';
import ManageTax from './manageTax/ManageTax';
import UnitTax from './manageTax/unitTax/UnitTax';
import TableTax from './manageTax/tableTax/TableTax';
import RegimeStructureList from './manageTax/tableTax/RegimeStructureList';
import EditRegimeStructure from './manageTax/tableTax/EditRegimeStructure';
import TaxExemption from './manageTax/exemption/TaxExemption';
import TaxRebirth from './manageTax/rebirth/TaxRebirth';
import TaxLaw from './manageTax/taxLaw/TaxLaw';
import EmployeeRegistration from './employeeRegistration/EmployeeRegistration';
import CompleteInformation from './employeeRegistration/CompleteInformation';
import UpdateEmployee from './updateEmployee/UpdateEmployee';
import Update from './updateEmployee/Update';
import RegistrationSearch from './updateEmployee/RegistrationSearch';
import Deactivate from './deactivateEmployee /Deactivate';
import DeactivationSearch from './deactivateEmployee /DeactivationSearch';
import DeactivateEmployee from './deactivateEmployee /DeactivateEmployee';
import EmployeeEnrollment from './operationsNextLevelApproval/employeeEnrollment/EmployeeEnrollment';
import ApprovalList from './operationsNextLevelApproval/employeeEnrollment/ApprovalList';
import SubAdmin from './operationsNextLevelApproval/SubAdmin';
import ActivityUpdate from './operationsNextLevelApproval/activityUpdate/ActivityUpdate';
import ApprovalHistory from './operationsNextLevelApproval/activityUpdate/ApprovalHistory';
import DetailsActivity from './operationsNextLevelApproval/activityUpdate/DetailsActivity';
import PersonalInformation from './employeeRegistration/personalInformation/PersonalInformation';
import BankInformation from './employeeRegistration/bankInformation/BankInformation';
import NextOfKin from './employeeRegistration/nextOfKin/NextOfKin';
import Education from './employeeRegistration/education/Education';
import EmploymentInformation from './employeeRegistration/employmentInfo/EmploymentInformation';
import CreateSubAdmin from './createSubAdmin/CreateSubAdmin'
import NextLevelSetup from './nextLevelSetup/NextLevelSetup';

const Navigator = () => {
  loadProgressBar();
  const Error = () => {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <h2>Page does not exist yet !!!</h2>
      </div>
    );
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route
          path="/dashboard/setup/approval"
          element={<NextLevelSetup />}
        />
        <Route
          path="/dashboard/setup/hr/manage-employee-types"
          element={<StaffType />}
        />
        <Route
          path="/dashboard/setup/hr/manage-retirement-policy"
          element={<RetirementPolicy />}
        />
         <Route
          path="/dashboard/setup/hr/create-sub-admin"
          element={<CreateSubAdmin />}
        />
        <Route path="/dashboard/setup/hr/manage-tax" element={<ManageTax />}>
          <Route path="unit" element={<UnitTax />} />
          <Route path="table" element={<TableTax />} />
          <Route path="regime-list" element={<RegimeStructureList />} />
          <Route
            path="edit-regime-structure"
            element={<EditRegimeStructure />}
          />
          <Route path="exemption" element={<TaxExemption />} />
          <Route path="rebirth" element={<TaxRebirth />} />
          <Route path="law" element={<TaxLaw />} />
        </Route>
       
        <Route
          path="/dashboard/operations/hr/employee-registration"
          element={<EmployeeRegistration />}
        >
          <Route path="" element={<PersonalInformation />} />
          <Route path="next-of-kin" element={<NextOfKin />} />
          <Route path="education" element={<Education />} />
          <Route path="employment" element={<EmploymentInformation />} />
          <Route path="account" element={<BankInformation />} />
          <Route path="complete" element={<CompleteInformation />} />
        </Route>
        <Route
          path="/dashboard/operations/hr/employee-update"
          element={<Update />}
        >
          <Route path="" element={<UpdateEmployee />} />
          <Route path="search" element={<RegistrationSearch />} />
        </Route>
        <Route
          path="/dashboard/operations/hr/employee-deactivation"
          element={<Deactivate />}
        >
          <Route path="" element={<DeactivateEmployee />} />
          <Route path="search" element={<DeactivationSearch />} />
        </Route>
        <Route
          path="/dashboard/operations/next-level/enrollment"
          element={<EmployeeEnrollment />}
        />
        <Route
          path="/dashboard/operations/next-level/enrollment/approval-list"
          element={<ApprovalList />}
        />
        <Route
          path="/dashboard/operations/next-level/sub-admin"
          element={<SubAdmin />}
        />
        <Route
          path="/dashboard/operations/next-level/activity-updates"
          element={<ActivityUpdate />}
        />
        <Route
          path="/dashboard/operations/next-level/activity-updates/approval-history"
          element={<ApprovalHistory />}
        />
        <Route
          path="/dashboard/operations/next-level/activity-updates/approval-details"
          element={<DetailsActivity />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigator;
