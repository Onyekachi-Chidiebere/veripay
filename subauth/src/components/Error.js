import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
const Error = ({ message, open, move }) => {
  console.log({ message });
  return (
    <SweetAlert
      danger
      title="Error"
      onConfirm={() => {
        open(false);
        if (move) move();
      }}
      onCancel={() => {
        open(false);
        if (move) move();
      }}
    >
      {message}
    </SweetAlert>
  );
};
export default Error;
