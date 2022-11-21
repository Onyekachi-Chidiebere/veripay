import { TextField } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  underline: {
    '&&&:before': {
      borderBottom: 'none',
    },
    '&&:after': {
      borderBottom: 'none',
    },
  },
});

const TextInput = ({ placeholder, value, onChange, field, disabled, type }) => {
  const classes = useStyles();
  return (
    <div className="create-account-input">
      <TextField
        fullWidth={true}
        value={value}
        InputProps={{ classes }}
        id="filled-basic"
        label={placeholder}
        disabled={disabled}
        size="small"
        type={type}
        onChange={({ target }) => onChange(target.value, field)}
      />
    </div>
  );
};
export default TextInput;
