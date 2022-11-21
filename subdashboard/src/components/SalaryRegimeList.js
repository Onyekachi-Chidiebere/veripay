import React, { useEffect, useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { NavLink } from 'react-router-dom';
import useSalary from '../hooks/useSalary';
import DashboardEmpty from './DashboardEmpty';
import DeleteDialog from './deleteDialog/DeleteDialog';
import EditSalaryRegime from './EditSalaryRegime';
import SortCaret from './table/SortCaret';
import Table from './table/Table';
import jsPDF from "jspdf";
import "jspdf-autotable";
import AddSalaryRegime from './AddSalaryRegime';


let months = {
  "1":"January",
  "2":"February",
  "3":"March",
  "4":"April",
  "5":"May",
  "6":"June",
  "7":"July",
  "8":"August",
  "9":"September",
  "10":"October",
  "11":"November",
  "12":"December",
}
const SalaryRegimeList = (props) => {
  const [edit, setEdit]=useState(false)
  const [editIndex, setEditIndex]=useState(false)
  const [success, setSuccess]=useState(false)
  const [data, setData] = useState(false)
  const [showAdd, setShowAdd]=useState(false)
  

  
  //exported to regime list route
  const { setSalaryRegimeList,salaryRegimeList,deleteRegime,confirmDel,setConfirmDel, delSuccess, setDelSuccess, error, setError,activateRegime,getRegimeList, loading } = props;
  // const { getRegimeList, salaryRegimeList, loading } = useSalary();

  const handleUpdate = () => {
    getRegimeList();
    // setSalaryRegimeList([...salaryRegimeList, data])
  }
  useEffect(()=>{
    if(success){
      let newlist=[...salaryRegimeList];
      newlist[editIndex]=data
      setSalaryRegimeList(newlist);
    }
  },[success])
  
  function date(cell, row) {
    return (
      <p>{row.date.substring(0,10)}</p>
    );
  }
  function dateC(cell, row) {
    return row.date.substring(0, 10) ;
  }
  function month(cell, row) {
    return (
      <p>{months[row.regime_month]}</p>
    );
  }
  function monthC(cell, row) {
    return months[row.regime_month];
  }
  function status(cell, row) {
    if (row.active) {
      return (
        <span>
          <strong style={{ color: '#418E65' }}>Active</strong>
        </span>
      );
    }
    return (
      <span>
        <strong style={{ color: '#CA6262' }}>Inactive</strong>
      </span>
    );
  }
  function statusC(cell, row) {
    if (row.status) {
      return 'Active'
    }
    return 'Inactive'
  }
  function activateFormaterC(cell, row, index) {
    return '...';
  }
  function activateFormater(cell, row, index) {
    return (
      <p title='Activate'>
        <svg
        onClick={()=>{
         activateRegime(row.regime_code)
        }}
        style={{ cursor: 'pointer' }}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 13C12.2652 13 12.5196 12.8946 12.7071 12.7071C12.8946 12.5196 13 12.2652 13 12V2C13 1.73478 12.8946 1.48043 12.7071 1.29289C12.5196 1.10536 12.2652 1 12 1C11.7348 1 11.4804 1.10536 11.2929 1.29289C11.1054 1.48043 11 1.73478 11 2V12C11 12.2652 11.1054 12.5196 11.2929 12.7071C11.4804 12.8946 11.7348 13 12 13Z" fill="#BCBFC0"/>
        <path d="M16.59 3.1099C16.354 2.9879 16.0791 2.96466 15.826 3.0453C15.5728 3.12594 15.362 3.30385 15.24 3.5399C15.118 3.77594 15.0948 4.05078 15.1754 4.30395C15.2561 4.55713 15.434 4.7679 15.67 4.8899C17.2635 5.71257 18.5343 7.04676 19.2785 8.67831C20.0228 10.3099 20.1972 12.1442 19.7739 13.8868C19.3506 15.6294 18.3541 17.1792 16.9444 18.2876C15.5346 19.3959 13.7933 19.9984 12 19.9984C10.2067 19.9984 8.46544 19.3959 7.05566 18.2876C5.64588 17.1792 4.64937 15.6294 4.22607 13.8868C3.80277 12.1442 3.97725 10.3099 4.72148 8.67831C5.46572 7.04676 6.73656 5.71257 8.33001 4.8899C8.44688 4.82949 8.55072 4.74665 8.63558 4.64611C8.72044 4.54558 8.78467 4.42931 8.8246 4.30395C8.86453 4.17859 8.87938 4.0466 8.86829 3.9155C8.85721 3.7844 8.82042 3.65677 8.76001 3.5399C8.6996 3.42302 8.61676 3.31919 8.51623 3.23432C8.41569 3.14946 8.29942 3.08523 8.17406 3.0453C8.0487 3.00537 7.91671 2.99053 7.78561 3.00161C7.65451 3.01269 7.52688 3.04949 7.41001 3.1099C5.4187 4.13868 3.83074 5.80662 2.90098 7.84605C1.97121 9.88547 1.75355 12.1781 2.28292 14.3561C2.81229 16.534 4.058 18.471 5.82013 19.8561C7.58226 21.2413 9.75864 21.9943 12 21.9943C14.2414 21.9943 16.4178 21.2413 18.1799 19.8561C19.942 18.471 21.1877 16.534 21.7171 14.3561C22.2465 12.1781 22.0288 9.88547 21.099 7.84605C20.1693 5.80662 18.5813 4.13868 16.59 3.1099Z" fill="#BCBFC0"/>
      </svg>
      </p>
    );
  }
  function editFormaterC(cell, row, index) {
    return '...';
  }
  function editFormater(cell, row, index) {
    return (
      <p title='Edit'>
        <svg
        onClick={()=>{
        setEdit(row)
        setEditIndex(index)}}
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
    );
  }
function _delete(cell, row) {
    return (
      <p title='Delete'>
         <svg
        // onClick={()=>deleteGradeLevel(row.grade_level_code)}
        onClick={()=>setConfirmDel(row)}
        style={{ cursor: 'pointer' }}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.99935 1.45825C10.6911 1.45821 11.3567 1.72288 11.8595 2.19798C12.3624 2.67308 12.6644 3.32258 12.7035 4.01325L12.7077 4.16659H17.0827C17.241 4.16663 17.3935 4.22679 17.5092 4.3349C17.6249 4.443 17.6952 4.591 17.706 4.74899C17.7168 4.90697 17.6673 5.06316 17.5673 5.186C17.4674 5.30884 17.3246 5.38917 17.1677 5.41075L17.0827 5.41659H16.4193L15.3527 16.2666C15.2992 16.8075 15.0553 17.3118 14.6643 17.6895C14.2734 18.0671 13.761 18.2935 13.2185 18.3283L13.0718 18.3333H6.92685C6.38307 18.3332 5.85701 18.1399 5.44269 17.7877C5.02837 17.4355 4.75278 16.9474 4.66518 16.4108L4.64602 16.2658L3.57852 5.41659H2.91602C2.76498 5.41658 2.61906 5.36188 2.50524 5.26261C2.39142 5.16334 2.31739 5.02621 2.29685 4.87659L2.29102 4.79159C2.29102 4.64055 2.34572 4.49463 2.44499 4.38081C2.54426 4.26699 2.68139 4.19296 2.83102 4.17242L2.91602 4.16659H7.29102C7.29102 3.44829 7.57636 2.75942 8.08427 2.2515C8.59218 1.74359 9.28105 1.45825 9.99935 1.45825ZM15.1635 5.41659H4.83435L5.89018 16.1433C5.91356 16.3826 6.01904 16.6065 6.1887 16.7769C6.35837 16.9473 6.58178 17.0538 6.82102 17.0783L6.92685 17.0833H13.0718C13.5718 17.0833 13.996 16.7291 14.0927 16.2483L14.1093 16.1433L15.1627 5.41659H15.1635ZM11.4577 7.70825C11.6087 7.70826 11.7546 7.76295 11.8685 7.86222C11.9823 7.96149 12.0563 8.09862 12.0768 8.24825L12.0827 8.33325V14.1666C12.0826 14.3249 12.0225 14.4774 11.9144 14.5931C11.8063 14.7088 11.6583 14.7791 11.5003 14.7899C11.3423 14.8007 11.1861 14.7512 11.0633 14.6512C10.9404 14.5513 10.8601 14.4085 10.8385 14.2516L10.8327 14.1666V8.33325C10.8327 8.16749 10.8985 8.00852 11.0157 7.89131C11.133 7.7741 11.2919 7.70825 11.4577 7.70825ZM8.54102 7.70825C8.69205 7.70826 8.83797 7.76295 8.95179 7.86222C9.06562 7.96149 9.13964 8.09862 9.16018 8.24825L9.16602 8.33325V14.1666C9.16597 14.3249 9.10581 14.4774 8.9977 14.5931C8.8896 14.7088 8.7416 14.7791 8.58362 14.7899C8.42563 14.8007 8.26944 14.7512 8.1466 14.6512C8.02376 14.5513 7.94343 14.4085 7.92185 14.2516L7.91602 14.1666V8.33325C7.91602 8.16749 7.98186 8.00852 8.09907 7.89131C8.21628 7.7741 8.37526 7.70825 8.54102 7.70825ZM9.99935 2.70825C9.63336 2.70827 9.28075 2.84589 9.01152 3.09382C8.7423 3.34174 8.57613 3.68183 8.54602 4.04659L8.54102 4.16659H11.4577C11.4577 3.77981 11.304 3.40888 11.0305 3.13539C10.7571 2.8619 10.3861 2.70825 9.99935 2.70825Z"
          fill="#BCBFC0"
        />
      </svg>
     </p>
    );
  }
  function _deleteC(cell, row) {
    return '...';
  }

  const columns = [
    {
      formatter: _delete,
      csvFormatter: _deleteC,
      headerStyle: (colum, colIndex) => {
        return { width: '30px', textAlign: 'center' };
      },
    },
     {
      formatter: editFormater,
      csvFormatter: editFormaterC,
      headerStyle: (colum, colIndex) => {
        return { width: '30px', textAlign: 'center' };
      },
    },
      {
      formatter: activateFormater,
      csvFormatter: activateFormaterC,
      headerStyle: (colum, colIndex) => {
        return { width: '30px', textAlign: 'center' };
      },
    },
    {
      text: ' Regime',
      dataField: 'regime_name',
      sort: true,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '100px', textAlign: 'start' };
      },
    },
    {
      text: 'Year',
      dataField: 'regime_year',
      sort: true,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '70px', textAlign: 'start' };
      },
    },
    {
      text: 'Month',
      sort: true,
      formatter: month,
      csvFormatter:monthC,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '90px', textAlign: 'start' };
      },
    },
    {
      text: 'Institution',
      dataField: 'institution',
      sort: true,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '120px', textAlign: 'start' };
      },
    },
    {
      text: 'Entered By',
      dataField: 'entered_by',
      sort: true,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '120px', textAlign: 'start' };
      },
    },
    {
      text: 'Entered On',
      sort: true,
      formatter: date,
      csvFormatter:dateC,
      sortCaret: SortCaret,
      headerStyle: (colum, colIndex) => {
        return { width: '120px', textAlign: 'start' };
      },
    },
    {
      text: 'Status',
      sort: true,
      formatter: status,
      csvFormatter:statusC,
      headerStyle: (colum, colIndex) => {
        return { width: '70px', textAlign: 'start' };
      },
    },
    
  ];
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Salary regime List";
    const headers = [["Regime", "Year", "Month","Institution", "Entered On", "Entered By", "Status"]];

    const data = salaryRegimeList.map(regime => [
      regime.regime_name,
      regime.regime_year,
      months[regime.regime_month],
      regime.institution,
      regime.entered_by,
      regime.date.substring(0,10),
      regime.entered_by,
      regime.status ? 'Active' : 'Inactive',
      '...'

    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("regime list.pdf")
  }
  
  return (
    <div className="w-100  dashboard-main-card">
      {confirmDel && <DeleteDialog name={confirmDel.regime_name} _delete={() => {
        console.log({confirmDel})
        if (confirmDel.active)
        { return setError('Please Deactivate Regime Before Deleting'); }
        deleteRegime(confirmDel.regime_code)
      }} closeDialog={() => setConfirmDel(false)} />}
      {edit&&
      <EditSalaryRegime setData={setData} data={edit}  setEdit={setEdit} setSuccess={setSuccess}
      />
      } 
      {showAdd && <AddSalaryRegime close={() => setShowAdd(false)} handleUpdate={handleUpdate}/>}
    <div className="w-100 pt-4 dashboard-card">
   
       {delSuccess && (
        <SweetAlert
          success
          title="Success"
          onConfirm={() => {
            setDelSuccess(false)
          }}
          onCancel={() => {
            setDelSuccess(false)
          }}
        >
          {delSuccess}
        </SweetAlert>
      )}
      {error && (
        <SweetAlert
          danger
          title="Error"
          onConfirm={() => {
            setError(false)
          }}
          onCancel={() => {
            setError(false)
          }}
        >
          {error}
        </SweetAlert>
      )}
        {success&& (
        <SweetAlert
          success
          title="Success"
          onConfirm={() => {
            setSuccess(false);
            setEdit(false)
          }}
          onCancel={() => {
            setEdit(false)
            setSuccess(false)
          }}
        >
          {success}
        </SweetAlert>
      )}
      <div className="salary-regime-menu d-flex justify-content-between mt-4 mx-4 align-items-center">
        <text className="salary-regime-title fs-6 mx-3 mb-3">
          Add a Salary Scale Regime
        </text>
          <NavLink to="" onClick={(e) => { e.preventDefault();setShowAdd(true) }}className="btn dashboard-add-btn fs-7 mx-3 mb-3">
          {/* add icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 10.5C6 10.3011 6.07902 10.1103 6.21967 9.96967C6.36032 9.82902 6.55109 9.75 6.75 9.75H9.75V6.75C9.75 6.55109 9.82902 6.36032 9.96967 6.21967C10.1103 6.07902 10.3011 6 10.5 6C10.6989 6 10.8897 6.07902 11.0303 6.21967C11.171 6.36032 11.25 6.55109 11.25 6.75V9.75H14.25C14.4489 9.75 14.6397 9.82902 14.7803 9.96967C14.921 10.1103 15 10.3011 15 10.5C15 10.6989 14.921 10.8897 14.7803 11.0303C14.6397 11.171 14.4489 11.25 14.25 11.25H11.25V14.25C11.25 14.4489 11.171 14.6397 11.0303 14.7803C10.8897 14.921 10.6989 15 10.5 15C10.3011 15 10.1103 14.921 9.96967 14.7803C9.82902 14.6397 9.75 14.4489 9.75 14.25V11.25H6.75C6.55109 11.25 6.36032 11.171 6.21967 11.0303C6.07902 10.8897 6 10.6989 6 10.5ZM6 3C5.20435 3 4.44129 3.31607 3.87868 3.87868C3.31607 4.44129 3 5.20435 3 6V15C3 15.7956 3.31607 16.5587 3.87868 17.1213C4.44129 17.6839 5.20435 18 6 18H15C15.7956 18 16.5587 17.6839 17.1213 17.1213C17.6839 16.5587 18 15.7956 18 15V6C18 5.20435 17.6839 4.44129 17.1213 3.87868C16.5587 3.31607 15.7956 3 15 3H6ZM4.5 6C4.5 5.60218 4.65804 5.22064 4.93934 4.93934C5.22064 4.65804 5.60218 4.5 6 4.5H15C15.3978 4.5 15.7794 4.65804 16.0607 4.93934C16.342 5.22064 16.5 5.60218 16.5 6V15C16.5 15.3978 16.342 15.7794 16.0607 16.0607C15.7794 16.342 15.3978 16.5 15 16.5H6C5.60218 16.5 5.22064 16.342 4.93934 16.0607C4.65804 15.7794 4.5 15.3978 4.5 15V6ZM15.75 19.5C16.7446 19.5 17.6984 19.1049 18.4017 18.4017C19.1049 17.6984 19.5 16.7446 19.5 15.75V4.902C19.956 5.1653 20.3348 5.544 20.5981 6.00004C20.8614 6.45609 21 6.9734 21 7.5V15.75C21 17.1424 20.4469 18.4777 19.4623 19.4623C18.4777 20.4469 17.1424 21 15.75 21H7.5C6.9734 21 6.45609 20.8614 6.00004 20.5981C5.544 20.3348 5.1653 19.956 4.902 19.5H15.75Z"
              fill="#17517E"
            />
          </svg>

          <span className='fs-7'>Add New Regime</span>
        </NavLink>
      </div>

      {/* <button onClick={() => exportPDF()}>Generate Report</button> */}

      <div>
        <div className="d-flex justify-content-end mx-4 mt-2 aligm-items-center">
         
        </div>
          <Table columns={columns} rows={salaryRegimeList} csvTitle={'regimes.csv'} search={true} exportPdf={exportPDF} next={{route:'/dashboard/setup/salary_structure/structure/category',title:'Proceed to  Structure Category'} }/>
        {salaryRegimeList.length === 0 && !loading &&(
          <DashboardEmpty
            title="Add New Regime"
            text="No available Salary Scale Regime"
            open={()=>setShowAdd(true)}
          />
        )}
        {loading && <p>Loading...</p>}
        </div>
       
    </div>
    </div>
  );
};
export default SalaryRegimeList;
