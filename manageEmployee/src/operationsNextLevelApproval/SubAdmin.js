import React, { useEffect, useState } from 'react';
import SortCaret from '../components/table/SortCaret';
import Table from '../components/table/Table';
import '../styles/componentStyle.css';

const EmployeeEnrollment = () => {
  const [showAdd, setShowAdd] = useState(false);

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
      text: 'User Type',
      dataField: 'regime',
      sortCaret: SortCaret,
      sort: true,
      headerStyle: (colum, colIndex) => {
        return { width: '150px', textAlign: 'start' };
      },
    },
    {
      text: 'Record Action',
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
      text: 'Category',
      dataField: 'amount',
      sort: true,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '100px', textAlign: 'start' };
      },
    },
    {
      text: 'Requested By',
      dataField: 'level',
      sort: true,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '120px', textAlign: 'start' };
      },
    },
    {
      text: 'Approval Count',
      dataField: 'level',
      sort: true,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '150px', textAlign: 'start' };
      },
    },
    {
      text: 'Remaining Approval',
      dataField: 'level',
      sort: true,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '150px', textAlign: 'start' };
      },
    },
    {
      text: 'Requested On',
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
        return { width: '150px', textAlign: 'start' };
      },
    },
    {
      text: 'Action',
      dataField: 'level',
      sort: true,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '170px', textAlign: 'start' };
      },
    },
  ];

  return (
    <div>
      <h3 className="staff-type-title">Next Level Approval Listing</h3>
      <div className="staff-type-container">
        <div className="staffType-listing-title-container">
          <h4 className="staffType-listing-title">
            Next Level Approval Listing for
          </h4>
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
export default EmployeeEnrollment;
