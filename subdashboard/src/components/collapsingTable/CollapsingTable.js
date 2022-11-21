// import React from 'react';
// import ReactCollapsingTable from 'react-collapsing-table';
// const rows = [
//   { id: 1, firstName: 'Paul', lastName: 'Darragh',middleName:'Mike', age:'22', color:'yellow' }
// ]
// const columns = [
//   { accessor: 'firstName', label: 'First Name', priorityLevel: 1, position: 1, minWidth: 150, },
//   { accessor: 'lastName', label: 'Last Name', priorityLevel: 2, position: 2, minWidth: 150, },
//   { accessor: 'middleName', label: 'Middle Name', priorityLevel: 3, position: 3, minWidth: 150, },
//   { accessor: 'age', label: 'Age', priorityLevel: 4, position: 4, minWidth: 150, },
//   { accessor: 'color', label: 'Color', priorityLevel: 5, position: 5, minWidth: 150, },
// ]
// const CollapsingTable = ({rows, columns}) => {
//     return <div>
//         <h1>My Cool Collapsing Table!</h1>
//         <ReactCollapsingTable style={{width: '100%'}} rows={rows} columns={columns} />
//     </div>
// };
// export default CollapsingTable;


import React from "react";
import ReactCollapsingTable from "react-collapsing-table";
import { Row, Col } from 'react-bootstrap';

const columns = [
  {
    accessor: "from_account_number",
    label: "From Account",
    priorityLevel: 1,
    position: 1,
    minWidth: 150
  },
  {
    accessor: "to_account_number",
    label: "To Account",
    priorityLevel: 2,
    position: 2,
    minWidth: 150
  },
  {
    accessor: "amount",
    label: "Amount",
    priorityLevel: 3,
    position: 3,
    minWidth: 150
  },
  {
    accessor: "remarks",
    label: "Remarks",
    priorityLevel: 4,
    position: 4,
    minWidth: 150
  },
  {
    accessor: "schedule_scheme",
    label: "Payment Scheme",
    priorityLevel: 5,
    position: 5,
    minWidth: 150
  }
];

const rows = [
  {
    id: 230,
    transaction_id: "5de0908e-19b7-44eb-a152-b0561d11c23f",
    transaction_table: "intra_fund_transfer_transaction",
    schedule_scheme: "ONETIME",
    schedule_frequency: null,
    schedule_start_date: 1580494500000,
    created_date: 1579777535498,
    status: "RUNNING",
    code: "SCHEDULE-FUNDT",
    next_transaction_date: 1579777535530,
    deleted_date: null,
    user_id: 7,
    amount: 12,
    calculated_amount: 12,
    credit_amount: 12,
    debit_amount: 12,
    from_account_number: "0112010000089",
    to_account_number: "0112010011974",
    to_account_name: "Syam Bahadur",
    to_bank_name: "1901",
    remarks: "test",
    transaction_attributes:
      '{"toAccountName":"Syam Bahadur","toAccountNumber":"0112010011974","amount":"12","remarks":"test","scheduleScheme":"ONETIME","scheduleStartDate":"02/01/2020","fromAccountNumber":"0112010000089","toBankName":"1901"}',
    is_scheduled: 1
  },
  {
    id: 231,
    transaction_id: "3be4a413-22b0-4d18-96a9-303472448048",
    transaction_table: "intra_fund_transfer_transaction",
    schedule_scheme: "ONETIME",
    schedule_frequency: null,
    schedule_start_date: 1580494500000,
    created_date: 1579777949818,
    status: "RUNNING",
    code: "SCHEDULE-FUNDT",
    next_transaction_date: 1579777949831,
    deleted_date: null,
    user_id: 7,
    amount: 12,
    calculated_amount: 12,
    credit_amount: 12,
    debit_amount: 12,
    from_account_number: "0112010000089",
    to_account_number: "0112010011974",
    to_account_name: "Syam Bahadur",
    to_bank_name: "1901",
    remarks: "test",
    transaction_attributes:
      '{"toAccountName":"Syam Bahadur","toAccountNumber":"0112010011974","amount":"12","remarks":"test","scheduleScheme":"ONETIME","scheduleStartDate":"02/01/2020","fromAccountNumber":"0112010000089","toBankName":"1901"}',
    is_scheduled: 1
  },
  {
    id: 232,
    transaction_id: "464dd363-be4d-48dc-a064-4eb9b739faf7",
    transaction_table: "intra_fund_transfer_transaction",
    schedule_scheme: "ONETIME",
    schedule_frequency: null,
    schedule_start_date: 1580494500000,
    created_date: 1579778046374,
    status: "RUNNING",
    code: "SCHEDULE-FUNDT",
    next_transaction_date: 1579778046386,
    deleted_date: null,
    user_id: 7,
    amount: 12,
    calculated_amount: 12,
    credit_amount: 12,
    debit_amount: 12,
    from_account_number: "0112010000089",
    to_account_number: "0112010011974",
    to_account_name: "Syam Bahadur",
    to_bank_name: "1901",
    remarks: "test",
    transaction_attributes:
      '{"toAccountName":"Syam Bahadur","toAccountNumber":"0112010011974","amount":"12","remarks":"test","scheduleScheme":"ONETIME","scheduleStartDate":"02/01/2020","fromAccountNumber":"0112010000089","toBankName":"1901"}',
    is_scheduled: 1
  },
  {
    id: 239,
    transaction_id: "4bd75fe8-de3d-451b-aed4-9675a6155a3c",
    transaction_table: "intra_fund_transfer_transaction",
    schedule_scheme: "ONETIME",
    schedule_frequency: null,
    schedule_start_date: 1580494500000,
    created_date: 1579865950408,
    status: "STOPPED",
    code: "SCHEDULE-FUNDT",
    next_transaction_date: 1579865950421,
    deleted_date: null,
    user_id: 7,
    amount: 12,
    calculated_amount: 12,
    credit_amount: 12,
    debit_amount: 12,
    from_account_number: "0112010000089",
    to_account_number: "0112010011974",
    to_account_name: "Syam Bahadur",
    to_bank_name: "1901",
    remarks: "test",
    transaction_attributes:
      '{"toAccountName":"Syam Bahadur","toAccountNumber":"0112010011974","amount":"12","remarks":"test","scheduleScheme":"ONETIME","scheduleStartDate":"02/01/2020","fromAccountNumber":"0112010000089","toBankName":"1901"}',
    is_scheduled: 1
  },
  {
    id: 240,
    transaction_id: "b2161a68-f12e-48ac-97cc-237bcf9e0959",
    transaction_table: "intra_fund_transfer_transaction",
    schedule_scheme: "ONETIME",
    schedule_frequency: null,
    schedule_start_date: 1580494500000,
    created_date: 1579866139993,
    status: "RUNNING",
    code: "SCHEDULE-FUNDT",
    next_transaction_date: 1579866140008,
    deleted_date: null,
    user_id: 7,
    amount: 12,
    calculated_amount: 12,
    credit_amount: 12,
    debit_amount: 12,
    from_account_number: "0112010000089",
    to_account_number: "0112010011974",
    to_account_name: "Syam Bahadur",
    to_bank_name: "1901",
    remarks: "test",
    transaction_attributes:
      '{"toAccountName":"Syam Bahadur","toAccountNumber":"0112010011974","amount":"12","remarks":"test","scheduleScheme":"ONETIME","scheduleStartDate":"02/01/2020","fromAccountNumber":"0112010000089","toBankName":"1901"}',
    is_scheduled: 1
  },
  {
    id: 241,
    transaction_id: "96e18a4d-b355-4307-b53c-357e5b679741",
    transaction_table: "intra_fund_transfer_transaction",
    schedule_scheme: "ONETIME",
    schedule_frequency: null,
    schedule_start_date: 1580494500000,
    created_date: 1579866905315,
    status: "RUNNING",
    code: "SCHEDULE-FUNDT",
    next_transaction_date: 1579866905347,
    deleted_date: null,
    user_id: 7,
    amount: 12,
    calculated_amount: 12,
    credit_amount: 12,
    debit_amount: 12,
    from_account_number: "0112010000089",
    to_account_number: "0112010011974",
    to_account_name: "Syam Bahadur",
    to_bank_name: "1901",
    remarks: "test",
    transaction_attributes:
      '{"toAccountName":"Syam Bahadur","toAccountNumber":"0112010011974","amount":"12","remarks":"test","scheduleScheme":"ONETIME","scheduleStartDate":"02/01/2020","fromAccountNumber":"0112010000089","toBankName":"1901"}',
    is_scheduled: 1
  },
  {
    id: 242,
    transaction_id: "5d52036b-0396-43c4-95e3-ff113e7072a6",
    transaction_table: "intra_fund_transfer_transaction",
    schedule_scheme: "ONETIME",
    schedule_frequency: null,
    schedule_start_date: 1580494500000,
    created_date: 1579867002717,
    status: "RUNNING",
    code: "SCHEDULE-FUNDT",
    next_transaction_date: 1579867002731,
    deleted_date: null,
    user_id: 7,
    amount: 12,
    calculated_amount: 12,
    credit_amount: 12,
    debit_amount: 12,
    from_account_number: "0112010000089",
    to_account_number: "0112010000079",
    to_account_name: "test",
    to_bank_name: "1901",
    remarks: "test",
    transaction_attributes:
      '{"toAccountName":"test","toAccountNumber":"0112010000079","amount":"12","remarks":"test","scheduleScheme":"ONETIME","scheduleStartDate":"02/01/2020","fromAccountNumber":"0112010000089","toBankName":"1901"}',
    is_scheduled: 1
  },
  {
    id: 249,
    transaction_id: "bc8ccb34-0eb8-4252-8869-605881f6a968",
    transaction_table: "intra_fund_transfer_transaction",
    schedule_scheme: "ONETIME",
    schedule_frequency: null,
    schedule_start_date: 1580408100000,
    created_date: 1579879196903,
    status: "RUNNING",
    code: "SCHEDULE-FUNDT",
    next_transaction_date: 1579879196916,
    deleted_date: null,
    user_id: 7,
    amount: 1,
    calculated_amount: 1,
    credit_amount: 1,
    debit_amount: 1,
    from_account_number: "0112010000089",
    to_account_number: "0112010011974",
    to_account_name: "Syam Bahadur",
    to_bank_name: "1901",
    remarks: "test rent",
    transaction_attributes:
      '{"toAccountName":"Syam Bahadur","toAccountNumber":"0112010011974","amount":"1","remarks":"test rent","scheduleScheme":"ONETIME","scheduleStartDate":"01/31/2020","fromAccountNumber":"0112010000089","toBankName":"1901"}',
    is_scheduled: 1
  },
  {
    id: 250,
    transaction_id: "3bb74f9f-4d18-4e72-9879-757e706411c2",
    transaction_table: "intra_fund_transfer_transaction",
    schedule_scheme: "MULTITIME",
    schedule_frequency: "MONTHLY",
    schedule_start_date: 1580494500000,
    created_date: 1579879412184,
    status: "STOPPED",
    code: "SCHEDULE-FUNDT",
    next_transaction_date: 1579879412197,
    deleted_date: null,
    user_id: 7,
    amount: 10,
    calculated_amount: 10,
    credit_amount: 10,
    debit_amount: 10,
    from_account_number: "0112010000089",
    to_account_number: "0112010011975asd",
    to_account_name: "Subash Basnet",
    to_bank_name: "1901",
    remarks: "rent payment",
    transaction_attributes:
      '{"toAccountName":"Subash Basnet","toAccountNumber":"0112010011975asd","amount":"10","remarks":"rent payment","scheduleScheme":"MULTITIME","scheduleStartDate":"02/01/2020","fromAccountNumber":"0112010000089","scheduleFrequency":"MONTHLY","toBankName":"1901"}',
    is_scheduled: 1
  },
  {
    id: 251,
    transaction_id: "264e2237-27c6-419b-954f-150e65f3378f",
    transaction_table: "intra_fund_transfer_transaction",
    schedule_scheme: "ONETIME",
    schedule_frequency: null,
    schedule_start_date: 1580321700000,
    created_date: 1580029782778,
    status: "RUNNING",
    code: "SCHEDULE-FUNDT",
    next_transaction_date: 1580029782792,
    deleted_date: null,
    user_id: 7,
    amount: 33,
    calculated_amount: 33,
    credit_amount: 33,
    debit_amount: 33,
    from_account_number: "0112010000089",
    to_account_number: "3434443434",
    to_account_name: "dfds",
    to_bank_name: "1901",
    remarks: "fdsf",
    transaction_attributes:
      '{"toAccountName":"dfds","toAccountNumber":"3434443434","amount":"33","remarks":"fdsf","scheduleScheme":"ONETIME","scheduleStartDate":"01/30/2020","fromAccountNumber":"0112010000089","toBankName":"1901"}',
    is_scheduled: 1
  }
];

export default function App() {
  return (
    <Row md={8}>
      <Col md={4}>

      <ReactCollapsingTable rows={rows} columns={columns} />
    </Col></Row>
  );
}
