import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { API_URL } from '../helper/appConstants';
const useDeactivateEmployee = (employeeData) => {
  const jwt = localStorage.getItem('@veripay_token');
  const company = JSON.parse(localStorage.getItem('@veripay_user'));
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([])
  const handleChange = (value, employee_code) => {
    //this hadndles all update in input fields
    setEmployees((old)=>old.map((employee)=>{
      if(employee_code==employee.employee_code)
      return {...employee,reason:value}
      return employee
    }))
  };

  useEffect(()=>{
    setEmployees(employeeData)
  },[])

  const getData = async () => {
    //fetch data to be updated;
    try {
      if (!search.trim()) {
        return Swal.fire({
          title: 'Error!',
          text: 'Please fill the search field',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
      const response = await axios.get(
        `${API_URL}/employee_info_operation?institution_code=${
          company.institution_code
        }&search=${false}&value=${search}`,
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (response.data.response.code == '00') {
        setData(response.data.response.message.data);
        return navigate(
          '/dashboard/operations/hr/employee-deactivation/search'
        );
      }
      return Swal.fire({
        title: 'Error!',
        text: 'Unable to get employee',
        icon: 'error',
        confirmButtonText: 'Ok',
      });

      
    } catch (error) {
      console.log({ error });
      return Swal.fire({
        title: 'Error!',
        text: 'Unable to get employee',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  const deactivateEmployee =async({employee_code,reason})=>{
    try {
      //ensure the required fields are provided;
      console.log({bbb:reason})
      if(!employee_code) return Swal.fire({
        titel:'Error!',
        text:'Please provide employee code',
        icon:'error',
        confirmButtonText:'Ok',
      });
      if(!reason) return Swal.fire({
        title:'Error!',
        text:'Please provide deactivation reason',
        icon:'error',
        confirmButtonText:'Ok',
      });
      const response = await axios.put(
        `${API_URL}/employee_info_operation`,
        {
          institution_code: company.institution_code,
          employee_code,
          deactivation_reason:reason,
          active:false,
          entered_by: company.admin_code,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (response.data.response.code == '00') {
        Swal.fire({
          title:'Success!',
          text:'Employee deactivated successfully',
          icon:'success',
          confirmButtonText:'Ok',
        });

        setEmployees((old)=>old.map((employee)=>{
          if(employee.employee_code==employee_code)
          return {...employee,active:false,reason:''}
          return employee
        }))

        return true;
      }
      Swal.fire({
        title:'Error!',
        text:'Unable to deactivate employee',
        icon:'error',
        confirmButtonText:'Ok',

      });
      return false;
      
    } catch (error) {
      console.log({error});
       Swal.fire({
        title:'Error!',
        text:'Unable to deactivate employee',
        icon:'error',
        confirmButtonText:'Ok',

      });
      return false;
    }
  }

  const activateEmpolyee =async({employee_code,reason})=>{
    try {
      //ensure the required fields are provided;
      console.log({bbb:reason})

      if(!employee_code) return Swal.fire({
        title:'Error!',
        text:'Please provide employee code',
        icon:'error',
        confirmButtonText:'Ok',
      });
      if(!reason) return Swal.fire({
        title:'Error!',
        text:'Please provide activation reason',
        icon:'error',
        confirmButtonText:'Ok',
      });
      const response = await axios.put(
        `${API_URL}/employee_info_operation`,
        {
          institution_code: company.institution_code,
          employee_code,
          activation_reason:reason,
          active:true,
          entered_by: company.admin_code,
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (response.data.response.code == '00') {
        Swal.fire({
          title:'Success!',
          text:'Employee activated successfully',
          icon:'success',
          confirmButtonText:'Ok',
        });
        //update teh edited 
        setEmployees((old)=>old.map((employee)=>{
          if(employee.employee_code==employee_code)
          return {...employee,active:true, reason:''}
          return employee
        }))
        return true;
      }
      Swal.fire({
        title:'Error!',
        text:'Unable to activate employee',
        icon:'error',
        confirmButtonText:'Ok',

      });
      return false;
      
    } catch (error) {
      console.log({error});
       Swal.fire({
        title:'Error!',
        text:'Unable toeactivate employee',
        icon:'error',
        confirmButtonText:'Ok',

      });
      return false;
    }
  }
  return {
    data,
    search,
    employees,
    handleChange,
    getData,
    setSearch,
    activateEmpolyee,
    deactivateEmployee,
  };
};

export default useDeactivateEmployee;
