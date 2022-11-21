import { useEffect, useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import down from '../../../images/arrowdown.svg';
import del from '../../../images/delete.svg';
import './basicTableStyle.css';

const levelMap = {
  NoStep: 0,
  Step1: 1,
  Step2: 2,
  Step3: 3,
  Step4: 4,
  Step5: 5,
  Step6: 6,
  Step7: 7,
  Step8: 8,
  Step9: 9,
  Step10: 10,
  Step11: 11,
  Step12: 12,
  Step13: 13,
  Step14: 14,
  Step15: 15,
};

function Table({ columns, data, updateMyData, deleteMyData }) {
  const { getTableProps, headerGroups, getTableBodyProps, prepareRow, rows } =
    useTable(
      {
        columns,
        data,
        updateMyData,
        deleteMyData,
      },
      useSortBy
    );

  return (
    <div className="basic-table-body">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th className="table-header" {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const BasicScaleTable = ({
  // data,
  updateMyData,
  setConfirmDel,
  openSelectLevel,
}) => {
  //check and remove data
  const data = [{ Step1: 12, grade_level: '01-ADC' }];
  const DeleteCell = ({
    value: initialValue,
    row,
    column: { id },
    updateMyData,
  }) => {
    const onClick = () => {
      setConfirmDel(row.original);
    };
    if (row.original.grade_level === '--') return <p />;
    return (
      <img
        onClick={onClick}
        style={{ cursor: 'pointer', marginLeft: '10px' }}
        src={del}
        alt="delete"
        height={15}
      />
    );
  };

  const EditableNumberCell = ({
    value: initialValue,
    row,
    column: { id },
    updateMyData,
  }) => {
    const onBlur = () => {
      updateMyData(row.index, id, parseInt(value, 10));
    };
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => {
      setValue(e.target.value);
    };
    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
    if (row.original.grade_level === '--')
      return (
        <input
          disabled={true}
          className="basic-scale-input"
          style={{
            borderRadius: '3px',
            width: '70px',
            marginLeft: '5px',
            marginRight: '5px',
            height: '25px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#fff',
            padding: '5px',
            fontSize: '10px',
            outline: 'none',
          }}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          type="number"
        />
      );
    if (row.original.maximum_step === levelMap[id] && levelMap[id] === 0) {
      return (
        <input
          className="basic-scale-input"
          style={{
            borderRadius: '3px',
            width: '70px',
            marginLeft: '5px',
            marginRight: '5px',
            height: '25px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#6C6C64',
            padding: '5px',
            fontSize: '10px',
            outline: 'none',
          }}
          value={value}
          onBlur={onBlur}
          onChange={onChange}
          type="number"
        />
      );
    }
    if (row.original.maximum_step < levelMap[id] || levelMap[id] === 0)
      return <p style={{ width: '70px' }} />;
    return (
      <input
        className="basic-scale-input"
        style={{
          borderRadius: '3px',
          width: '70px',
          marginLeft: '5px',
          marginRight: '5px',
          height: '25px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#6C6C64',
          padding: '5px',
          fontSize: '10px',
          outline: 'none',
        }}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        type="number"
      />
    );
  };
  const StringCell = ({ value: initialValue }) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);
    if (value === '--')
      return (
        <span onClick={() => openSelectLevel()}>
          <p
            style={{
              width: '110px',
              height: '25px',
              borderRadius: '3px',
              cursor: 'pointer',
              paddingTop: '5px',
              paddingBottom: '5px',
            }}
          >
            <p
              style={{
                width: '220px',
                borderRadius: '3px',
                height: '25px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '#6C6C64',
                padding: '1px',
                paddingTop: '5px',
                paddingLeft: '5px',
                fontSize: '10px',
                textDecoration: 'underline',
                cursor: 'pointer',
                position: 'absolute',
                top: '10px',
                zIndex: '2',
              }}
            >
              Select grade level to enter annual figures
              <img
                src={down}
                alt="sort"
                style={{ marginLeft: '5px' }}
                height={10}
              />
            </p>
          </p>
        </span>
      );

    return (
      <span>
        <p
          style={{
            borderRadius: '3px',
            width: '130px',
            margin: '5px',
            padding: '5px',
            fontSize: '10px',
          }}
        >
          {value}
        </p>
      </span>
    );
  };
  const columns = [
    { Cell: DeleteCell, Header: 'Delete' },
    { Cell: StringCell, Header: 'Grade Level', accessor: 'grade_level' },
    { Cell: EditableNumberCell, Header: 'no step', accessor: 'NoStep' },
    { Cell: EditableNumberCell, Header: 'step 1', accessor: 'Step1' },
    { Cell: EditableNumberCell, Header: 'step 2', accessor: 'Step2' },
    { Cell: EditableNumberCell, Header: 'step 3', accessor: 'Step3' },
    { Cell: EditableNumberCell, Header: 'step 4', accessor: 'Step4' },
    { Cell: EditableNumberCell, Header: 'step 5', accessor: 'Step5' },
    { Cell: EditableNumberCell, Header: 'step 6', accessor: 'Step6' },
    { Cell: EditableNumberCell, Header: 'step 7', accessor: 'Step7' },
    { Cell: EditableNumberCell, Header: 'step 8', accessor: 'Step8' },
    { Cell: EditableNumberCell, Header: 'step 9', accessor: 'Step9' },
    { Cell: EditableNumberCell, Header: 'step 10', accessor: 'Step10' },
    { Cell: EditableNumberCell, Header: 'step 11', accessor: 'Step11' },
    { Cell: EditableNumberCell, Header: 'step 12', accessor: 'Step12' },
    { Cell: EditableNumberCell, Header: 'step 13', accessor: 'Step13' },
    { Cell: EditableNumberCell, Header: 'step 14', accessor: 'Step14' },
    { Cell: EditableNumberCell, Header: 'step 15', accessor: 'Step15' },
  ];
  return <Table columns={columns} data={data} updateMyData={updateMyData} />;
};
export default BasicScaleTable;
