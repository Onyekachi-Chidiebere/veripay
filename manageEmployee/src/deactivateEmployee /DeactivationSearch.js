import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';
import SortCaret from '../components/table/SortCaret';
import Table from '../components/table/Table';
import '../styles/componentStyle.css';
import useDeactivateEmployee from './useDeactivateEmployee';

const DeactivationSearch = () => {
  const [search, setSearch, getData, data] = useOutletContext();
  const {deactivateEmployee,
    activateEmpolyee,
    handleChange,employees,} =useDeactivateEmployee(data)

  function nameFormaterC(cell, row, index) {
    return (
      <p>
        {row.surname} {row.firstname} {row.middlename}
      </p>
    );
  }
  function serialNumberFormater(cell, row, index) {
    return (
      <p>
        {index+1}
      </p>
    );
  }
  function  reasonFormatter(cell, row, index) {
    return (
      <input onChange={({ target }) => handleChange(target.value, row.employee_code)}
      value={row.reason} style={{borderRadius:'4px',borderColor:'#d9d9d9',borderWidth:'1px',padding:'10px'}} placeholder='Reason'/>
    )
  }
  function status(cell, row) {
    if (row.active) {
      return <span>Active</span>;
    }
    return <span>Not Active</span>;
  }
  function action(cell, row, index){
    if(row.active){
      return <button onClick={()=>deactivateEmployee({employee_code:row.employee_code, reason:row.reason})} style={{color:'white',backgroundColor:'red', padding:'5px', fontSize:'10px', border:'none', borderRadius:'4px'}}>Deactivate</button>
    }
    return <button onClick={()=>activateEmpolyee({employee_code:row.employee_code, reason:row.reason})}  style={{color:'white',backgroundColor:'green', padding:'5px', fontSize:'10px', border:'none', borderRadius:'4px'}}>Activate</button>
  }
  
  const columns = [
   
    {
      text: 'S/N',
      dataField: 'institution_code',
      sortCaret: SortCaret,
      formatter: serialNumberFormater,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { width: '50px', textAlign: 'start' };
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
      text: 'email',
      dataField: 'email',
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
      text: 'Status',
      dataField: 'level',
      sort: true,
      formatter: status,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '100px', textAlign: 'start' };
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
      <h3 className="staff-type-title">Employee Deactivation</h3>
      <div className="staff-type-container">
        <div className="staffType-listing-title-container">
          <h4 className="staffType-listing-title">Employee Search Result</h4>
          <button  className="staff-type-btn">
            Home
          </button>
        </div>
        <Table
          columns={columns}
          rows={employees}
          csvTitle={'structureNames.csv'}
          search={true}
          exportPdf={() => console.log('clicked')}
        />
        {data.length===0&&<div className="staff-type-lisitng-empty-table">
          <p className="staff-type-lisitng-empty-title">No available listing</p>
          <NavLink to="/dashboard/operations/hr/employee-registration">
            <button className="staff-type-btn">Add New</button>
          </NavLink>
        </div>}
      </div>
    </div>
  );
};
export default DeactivationSearch;
