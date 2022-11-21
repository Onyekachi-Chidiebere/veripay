import './table.css';
// import React from 'react';
// import { MDBDataTable } from 'mdbreact';

// const Table = ({ columns, rows }) => {
//   return <MDBDataTable small sortable fixed data={{ rows, columns }} />;
// };

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport  } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import cellEditFactory from 'react-bootstrap-table2-editor';
const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;
import { useNavigate } from 'react-router-dom';




const Table = ({ rows, columns, search, editable, csvTitle, exportPdf, next, prev }) => {
  const navigate = useNavigate();

  return <div className='table-responsive' >
    <ToolkitProvider
      keyField="id"
      data={rows}
      columns={columns}
      exportCSV={{
        fileName: csvTitle,
        separator: ',',
        ignoreHeader: false,
        noAutoBOM: false
      }}
      search>
      {(props) => (
        <div className='veripay-table-holder' >
          <div className='table-search-download-holder'>
            {search && <SearchBar {...props.searchProps} />}
            {search && <button className="btn table-download-holder">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00001 10L10.6667 7.33333M8.00001 10V2V10ZM8.00001 10L5.33334 7.33333L8.00001 10Z"
                  stroke="#17517E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M1.33334 11.3334L1.74734 12.99C1.81945 13.2785 1.98589 13.5346 2.22023 13.7176C2.45457 13.9006 2.74335 14 3.04068 14H12.9593C13.2567 14 13.5455 13.9006 13.7798 13.7176C14.0141 13.5346 14.1806 13.2785 14.2527 12.99L14.6667 11.3334"
                  stroke="#17517E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <text className="regime-download-btn-text">Download</text>
              <div className='table-download-options'>
                <ExportCSVButton {...props.csvProps}>
                  <span className='download-option'>CSV</span>
                </ExportCSVButton>
                <p onClick={exportPdf}>PDF</p>
              </div>
            </button>}
          </div>
         
          {search && <div style={{ height: '50px' }} />}
          <BootstrapTable
            striped
            bordered={false}
            headerClasses="table-header"
            // classes='table-borderless'
            cellEdit={
              editable ? cellEditFactory({ mode: 'click', blurToSave: true }) : ''
            }
            {...props.baseProps}
          />
        </div>
      )}
      
    </ToolkitProvider>
    {rows.length !== 0 && <div className='col d-flex w-100 mt-4 justify-content-end table-nav-bottom'>
      {prev && <span  onClick={() => navigate(`${prev.route}`)} className='prev-btn fs-7'>{prev.title}</span>}
      {next && <span  onClick={() => navigate(`${next.route}`)} className='next-btn fs-7'>{next.title}</span>}
    </div>}
   
  </div>
};
export default Table;
