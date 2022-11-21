import React, { useEffect, useState } from 'react';
import './selectStyle.css';
import SelectSearch, { fuzzySearch } from 'react-select-search';

const Select = ({
  label,
  text,
  data: mainData,
  handleSelect,
  id,
  disabled,
  getOptions,
  required,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!getOptions) setData(mainData);
  }, [mainData]);

  // const options = data.map((item)=>{return {name:item[id],value:item}});
  const options = data.map((item, index) => ({
    name: `${item[id]}`,
    value: `${item[id]}`,
  }));

  const handleGetOptions = async () => {
    try {
      if (!loading && data.length === 0) {
        setError(false);
        setLoading(true);
        let response = await getOptions();
        setLoading(false);
        if (response) {
          return setData(response);
        }
        setError('unable to get data');
      }
    } catch (error) {
      setError('unable to get data');
    }
  };
  const hs = (sel) => {
    let item = data.find((item) => item[id] == sel);
    handleSelect(item);
  };

  return (
    <>
      <div
        onClick={async () => {
          if (getOptions) await handleGetOptions();
        }}
        className={disabled ? 'select-holder-disabled ' : 'select-holder'}
      >
        <p className="input-select-label">
          {label} {required && <span>*</span>}
        </p>

        {disabled && (
          <p style={{ lineHeight: 0.5, marginLeft: 9, color: 'grey' }}>
            {text}
          </p>
        )}
        {!disabled && (
          <SelectSearch
            search
            filterOptions={fuzzySearch}
            onChange={(selected) => hs(selected)}
            options={options}
            value={text}
            // getOptions={getOptions}
            placeholder="Select Data"
            emptyMessage={loading ? 'Loading...' : 'No Available Data!'}
          />
        )}
      </div>
      {error && <p className="err">{error}</p>}
    </>
  );
};

export default Select;
