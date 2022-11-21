import React, { useState } from 'react';
import './inputStyle.css';

const Input = ({
  type,
  title,
  required,
  handleChange,
  name,
  text,
  remote,
  getData,
  disabled,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="input-holder">
      <p>
        {title}
        {required && <span>*</span>}
      </p>
      <input
        value={text}
        onChange={({ target }) => handleChange(target.value, name)}
        type={type}
        placeholder={title}
        disabled={disabled}
        {...props}
      />
      {remote && (
        <button
          onClick={async () => {
            if (!text && !loading) {
              setLoading(true);
              let value = await getData();
              setLoading(false);
              if (value) handleChange(value, name);
            }
          }}
        >
          {loading ? 'loading...' : remote}
        </button>
      )}
    </div>
  );
};

export default Input;
