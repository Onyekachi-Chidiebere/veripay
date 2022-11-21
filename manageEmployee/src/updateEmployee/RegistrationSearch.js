import React from 'react';
import { NavLink } from 'react-router-dom';
import SortCaret from '../components/table/SortCaret';
import Table from '../components/table/Table';
import '../styles/componentStyle.css';
import { Link } from 'react-router-dom';
import useEmployeeUpdate from './useUpdateEmployee';

const RegistrationSearch = ({data}) => {
  const {deactivateEmployee,
    activateEmpolyee,
    handleChange,employees,} =useEmployeeUpdate(data)
  
  function action(cell, row, index){
    if(row.active){
      return <button onClick={()=>deactivateEmployee({employee_code:row.employee_code, reason:row.reason})} style={{color:'white',backgroundColor:'red', padding:'5px', fontSize:'10px', border:'none', borderRadius:'4px'}}>Deactivate</button>
    }
    return <button onClick={()=>activateEmpolyee({employee_code:row.employee_code, reason:row.reason})}  style={{color:'white',backgroundColor:'green', padding:'5px', fontSize:'10px', border:'none', borderRadius:'4px'}}>Activate</button>
  }
  
 
  function editFormaterC(cell, row, index) {
    return '...';
  }
  function nameFormaterC(cell, row, index) {
    return (
      <p>
        {row.surname} {row.firstname} {row.middlename}
      </p>
    );
  }
  function minFormaterC(cell, row, index) {
    return (
      <p>
        {row.employment_status_data.ministry}/
        {row.employment_status_data.department}
      </p>
    );
  }
  function editFormater(cell, row, index) {
    return (
      <Link to="/dashboard/operations/hr/employee-registration" state={row}>
        <p title="Edit">
          <svg
            style={{ cursor: 'pointer' }}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.7296 4.50677L15.4946 6.27093L13.7296 4.50677ZM14.8646 2.9526L10.0921 7.7251C9.84554 7.97135 9.67737 8.28509 9.6088 8.62677L9.16797 10.8334L11.3746 10.3918C11.7163 10.3234 12.0296 10.1559 12.2763 9.90927L17.0488 5.13677C17.1922 4.99335 17.306 4.82309 17.3836 4.63571C17.4612 4.44833 17.5012 4.2475 17.5012 4.04468C17.5012 3.84186 17.4612 3.64103 17.3836 3.45365C17.306 3.26627 17.1922 3.09601 17.0488 2.9526C16.9054 2.80919 16.7351 2.69542 16.5477 2.61781C16.3604 2.54019 16.1595 2.50024 15.9567 2.50024C15.7539 2.50024 15.5531 2.54019 15.3657 2.61781C15.1783 2.69542 15.008 2.80919 14.8646 2.9526V2.9526Z"
              stroke="#BCBFC0"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.834 12.5001V15.0001C15.834 15.4421 15.6584 15.866 15.3458 16.1786C15.0333 16.4912 14.6093 16.6667 14.1673 16.6667H5.00065C4.55862 16.6667 4.1347 16.4912 3.82214 16.1786C3.50958 15.866 3.33398 15.4421 3.33398 15.0001V5.83341C3.33398 5.39139 3.50958 4.96746 3.82214 4.6549C4.1347 4.34234 4.55862 4.16675 5.00065 4.16675H7.50065"
              stroke="#BCBFC0"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </p>
      </Link>
    );
  }
  function  reasonFormatter(cell, row, index) {
    return (
      <input onChange={({ target }) => handleChange(target.value, row.employee_code)}
      value={row.reason} style={{borderRadius:'4px',borderColor:'#d9d9d9',borderWidth:'1px',padding:'10px'}} placeholder='Reason'/>
    )
  }
  
  const columns = [
   
    {
      formatter: editFormater,
      csvFormatter: editFormaterC,
      headerStyle: (colum, colIndex) => {
        return { width: '25px', textAlign: 'center' };
      },
    },
    {
      text: 'Institution',
      dataField: 'institution_code',
      sortCaret: SortCaret,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { width: '150px', textAlign: 'start' };
      },
    },
    {
      text: 'Verification Number',
      sortCaret: SortCaret,
      dataField: 'employee_code',
      sortCaret: SortCaret,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { width: '150px', textAlign: 'start' };
      },
    },
    {
      text: 'Provide Reason',
      dataField: 'amount',
      sort: true,
      formatter: reasonFormatter,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '170px', textAlign: 'start' };
      },
    },
    {
      text: 'Employee Name',
      dataField: 'amount',
      sort: true,
      formatter: nameFormaterC,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '150px', textAlign: 'start' };
      },
    },
    {
      text: 'Phone',
      dataField: 'mobile_number',
      sort: true,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '100px', textAlign: 'start' };
      },
    },
    {
      text: 'Bank',
      dataField: 'employment_bank_data.bank_name',
      sort: true,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '120px', textAlign: 'start' };
      },
    },
    {
      text: 'Account Number',
      dataField: 'employment_bank_data.account_number',
      sort: true,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '150px', textAlign: 'start' };
      },
    },
    {
      text: 'Ministry/Department',
      dataField: 'level',
      sort: true,
      formatter: minFormaterC,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '170px', textAlign: 'start' };
      },
    },
    {
      text: 'Action',
      dataField: 'level',
      sort: true,
      formatter: action,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '70px', textAlign: 'start' };
      },
    },
  ];

  return (
    <div>
      <div className="staff-type-container">
        <Table
          columns={columns}
          rows={employees}
          csvTitle={'structureNames.csv'}
          search={true}
          exportPdf={() => console.log('clicked')}
        />
       {employees.length===0&& <div className="staff-type-lisitng-empty-table">
          <p className="staff-type-lisitng-empty-title">No available listing</p>
          <NavLink to="/dashboard/operations/hr/employee-registration">
            <button className="staff-type-btn">Add New</button>
          </NavLink>
        </div>}
      </div>
    </div>
  );
};
export default RegistrationSearch;
