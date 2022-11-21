import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
const Error = ({ message, open }) => {
  console.log({ message });
  return (
    <SweetAlert
      danger
      title="Error"
      onConfirm={() => open(false)}
      onCancel={() => open(false)}
    >
      {message}
    </SweetAlert>
  );
};
export default Error;
