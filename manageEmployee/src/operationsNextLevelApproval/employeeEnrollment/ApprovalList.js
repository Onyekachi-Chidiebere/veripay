import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SortCaret from '../../components/table/SortCaret';
import Table from '../../components/table/Table';
import '../../styles/componentStyle.css';

const ApprovalList = () => {
  const navigate = useNavigate();
  function status(cell, row) {
    if (row.active_status) {
      return <span>Active</span>;
    }
    return <span>Not Active</span>;
  }
  function statusC(cell, row) {
    if (row.active) {
      return 'Active';
    }
    return 'Not Active';
  }

  const rows = [
    {
      _id: '621f449f17c420da2ae4e4e2',
      staff_type_name: 'SECURITY',
      institution_code: 'W6185',
      entered_by: '9b2b233117',
      staff_type_code: 'c535986b6b',
      entered_on: '2022-03-02T11:19:11.189000',
      active_status: true,
      entered_by_name: 'TESTER',
      institution: 'Itechfor',
    },
  ];
  const columns = [
    {
      text: 'Verification Number',
      dataField: 'regime',
      sortCaret: SortCaret,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { width: '150px', textAlign: 'start' };
      },
    },
    {
      text: 'Employee Name',
      sortCaret: SortCaret,
      dataField: 'tax_law',
      formatter: status,
      csvFormatter: statusC,
      sortCaret: SortCaret,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { width: '150px', textAlign: 'start' };
      },
    },
    {
      text: 'Employee Phone',
      dataField: 'amount',
      sort: true,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '100px', textAlign: 'start' };
      },
    },
    {
      text: 'Approver',
      dataField: 'level',
      sort: true,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '100px', textAlign: 'start' };
      },
    },
    {
      text: 'Approval Date',
      dataField: 'level',
      sort: true,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '150px', textAlign: 'start' };
      },
    },
    {
      text: 'Detail',
      dataField: 'level',
      sort: true,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '100px', textAlign: 'start' };
      },
    },
  ];

  return (
    <div>
      <h3 className="staff-type-title">Employee Approval</h3>
      <div className="staff-type-container">
        <div className="staffType-listing-title-container">
          <h4 className="staffType-listing-title">Employee Approval List by</h4>
          <button onClick={() => navigate(-1)} className="staff-type-btn">
            Back
          </button>
        </div>
        <Table
          columns={columns}
          rows={rows}
          csvTitle={'structureNames.csv'}
          search={true}
          exportPdf={() => console.log('clicked')}
        />
      </div>
    </div>
  );
};
export default ApprovalList;
