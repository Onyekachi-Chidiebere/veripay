import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useSalary from '../hooks/useSalary';
import Swal from 'sweetalert2'

const navigationMap = {
  "1":'/dashboard/setup/salary_structure',
  "2":'/dashboard/setup/salary_structure/structure/category',
  "3":'/dashboard/setup/salary_structure/structure',
  "4":'/dashboard/setup/salary_structure/grade-level',
}
const errMsg = {
  "1":'Please Add Regime !',
  "2":'Please Add Category !',
  "3":'Please Add Structure !',
  "4":'Please Add Grade Level !',
}
function ProtectedRoute({ children, Element }) {
 

  //get user token from localstorage to insure user is logged in
  let isAuthenticated = localStorage.getItem('@veripay_token');

  return isAuthenticated ? <Element /> : <Navigate to="/" replace />;
}

export function ProtectedLoadingRoute({ children }) {
 
  //get user institution_code from localstorage to insure user has initiated create account
  let isAuthenticated = localStorage.getItem('@institution_code');

  return isAuthenticated ? children : <Navigate to="/" replace />;
}

export const RegimeListRoute = ({ Element }) => {
  const { getRegimeList, salaryRegimeList,deleteRegime,setSuccess, success, loading,setSalaryRegimeList,confirmDel,setConfirmDel, error, setError ,activateRegime } = useSalary();
  const get = async () => await getRegimeList();
  useEffect(() => {
    (async () => await getRegimeList())();
  }, []);
  // console.log({ get: get() });
  return <Element getRegimeList={getRegimeList} salaryRegimeList={salaryRegimeList} setSalaryRegimeList={setSalaryRegimeList} deleteRegime={deleteRegime} error={error} setError={setError} setDelSuccess={setSuccess} delSuccess={success} activateRegime={activateRegime} loading={loading} confirmDel={confirmDel} setConfirmDel={setConfirmDel}  />;
};

export const CategoryRoute = ({ Element }) => {
let setup_stage = localStorage.getItem('@setup_stage')
  console.log({setup_stage})
  if (setup_stage < 2) {
     Swal.fire({
        title: 'Error!',
        text: errMsg[setup_stage],
        icon: 'question',
        confirmButtonText: 'Ok',
        customClass: {
          confirmButton:'swal-confirm'
        }
    })
    
    return <Navigate to={navigationMap[setup_stage]} replace />
  }
  return <Element/>
  
}

export const StructureRoute = ({ Element }) => {
let setup_stage = localStorage.getItem('@setup_stage')
  if (setup_stage < 3) {
     Swal.fire({
        title: 'Error!',
        text: errMsg[setup_stage],
        icon: 'question',
        confirmButtonText: 'Ok',
        customClass: {
          confirmButton:'swal-confirm'
        }
    })
    return <Navigate to={navigationMap[setup_stage]} replace />
  }
  return <Element/>
  
}
export const GradeRoute = ({ Element }) => {
let setup_stage = localStorage.getItem('@setup_stage')
  if (setup_stage < 4) {
    Swal.fire({
        title: 'Error!',
        text: errMsg[setup_stage],
        icon: 'question',
        confirmButtonText: 'Ok',
        customClass: {
          confirmButton:'swal-confirm'
        }
    })
    return <Navigate to={navigationMap[setup_stage]} replace />
  }
  return <Element/>
  
}
export const BasicRoute = ({ Element }) => {
let setup_stage = localStorage.getItem('@setup_stage')
  if (setup_stage < 5) {
    Swal.fire({
        title: 'Error!',
        text: errMsg[setup_stage],
        icon: 'question',
        confirmButtonText: 'Ok',
        customClass: {
          confirmButton:'swal-confirm'
        }
    })
    return <Navigate to={navigationMap[setup_stage]} replace />
  }
  return <Element/>
  
}
export default ProtectedRoute;
