import React, { useEffect, useState } from 'react';
import '../styles/select.css';
import '../styles/selectStyle.css';
import { Col, Row } from 'react-bootstrap';
import DataListInput from "react-datalist-input";
import SelectSearch, { fuzzySearch } from 'react-select-search';
// import "react-select-search/style.css";

export const SelectPopUp = ({ items, handleSelect,handleClose, id, param1, param2 }) => {
  const [querry, setQuerry] = useState('');

  return (
    <Row className="justify-content-md-center align-items-center select-background">
      <Col md={4} className="select-container">
        <div className="select-close" onClick={()=>{
          if(handleClose)handleClose()
        }}>
          <svg
            className="select-close-button"
            id="close"
            width="170"
            height="170"
            viewBox="0 0 170 170"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M91.3762 10.625C108.376 11.6875 124.314 20.1875 136.001 31.875C149.814 46.75 157.251 64.8125 157.251 86.0624C157.251 103.062 150.876 119 140.251 132.812C129.626 145.562 114.751 155.125 97.7512 158.312C80.7512 161.5 63.7512 159.375 48.8762 150.875C34.0012 142.375 22.3137 129.625 15.9387 113.687C9.56371 97.7499 8.50121 79.6874 13.8137 63.7499C19.1262 46.7499 28.6887 32.9374 43.5637 23.375C57.3762 13.8125 74.3762 9.56245 91.3762 10.625ZM96.6887 147.687C110.501 144.5 123.251 137.062 132.814 125.375C141.314 113.687 146.626 99.8749 145.564 84.9999C145.564 67.9999 139.189 51 127.501 39.3125C116.876 28.6875 104.126 22.3125 89.2512 21.25C75.4387 20.1875 60.5637 23.375 48.8762 31.875C37.1887 40.375 28.6887 52.0624 24.4387 66.9374C20.1887 80.7499 20.1887 95.6249 26.5637 109.437C32.9387 123.25 42.5012 133.875 55.2512 141.312C68.0012 148.75 82.8762 150.875 96.6887 147.687ZM83.9387 79.6874L109.439 53.1249L116.876 60.5624L91.3762 87.1249L116.876 113.687L109.439 121.125L83.9387 94.5624L58.4387 121.125L51.0012 113.687L76.5012 87.1249L51.0012 60.5624L58.4387 53.1249L83.9387 79.6874Z"
              fill="#E36E6E"
            />
          </svg>
        </div>
        <input
          className="select-popup-search"
          placeholder="Search"
          onChange={({ target }) => setQuerry(target.value)}
        />
        {items.length === 0 ? (
          <div className="select-popup-item-holder">
            <p className="empty-select">Not Available!</p>
          </div>
        ) : (
          <div className="select-popup-item-holder">
            {items.map((item, index) => {
              if (
                item[id].toString().toLowerCase().includes(querry.toLowerCase())
              )
                return (
                  <div
                    onClick={() =>handleSelect(item)}
                    id="close"
                    className="select-popup-item"
                    key={index}
                  >
                    {param1 && (
                      <p   id="close"  className="select-item-one">+{item[param1]}</p>
                    )}
                    {param2 && <p>{item[param2]}</p>}
                    <p   id="close" className="select-item-two">{item[id]}</p>
                  </div>
                );
            })}
          </div>
        )}
      </Col>
    </Row>
  );
};

const Select = ({ label, text, data, handleSelect, id, param1, param2, disabled }) => {
  const [showData, setShowData] = useState(false);

  // const options = data.map((item)=>{return {name:item[id],value:item}});
  const options = data.map((item, index) => ({
    name: `${item[id]}`,
    value: `${item[id]}`,
  }));
 
  const hs = (sel) => {
    console.log({ sel });
    let item = data.find((item) => item[id] == sel)
    console.log({item})
    handleSelect(item)
  }

  return (
    <div
      className={disabled ? 'select-holder-disabled mx-3' : 'select-holder mx-3'}
      // onClick={(e) => {
      //   setShowData(true);
      //   if (e.target.id === 'close') setShowData(false);
      // }}
      // className="input-select-holder mt-4"
    >
      {/* {showData && (
        <SelectPopUp items={data} id={id} handleSelect={handleSelect} />
      )} */}
      {/* <div> */}
        <p className="input-select-label">{label}</p>
        {/* <p className="input-select-value">
          {text}
        </p> */}
        
      {disabled && <p style={{ lineHeight: .5, marginLeft: 9, color:'grey' }}>{text}</p>} 
        {!disabled&& <SelectSearch search filterOptions={fuzzySearch} onChange={(selected) => hs(selected)} options={options} value={text} placeholder="Select Data" emptyMessage='No Available Data!' /> }
        
      {/* </div> */}
      {/* <svg
        width="12"
        height="7"
        viewBox="0 0 12 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.691281 0.891231C0.826282 0.756398 1.00928 0.680664 1.20008 0.680664C1.39088 0.680664 1.57388 0.756398 1.70889 0.891231L6.00011 5.18243L10.2913 0.891231C10.4278 0.76405 10.6083 0.694811 10.7949 0.698103C10.9814 0.701394 11.1594 0.776957 11.2913 0.908874C11.4232 1.04079 11.4988 1.21876 11.5021 1.40529C11.5054 1.59182 11.4361 1.77234 11.3089 1.90883L6.50891 6.70883C6.37391 6.84366 6.19091 6.9194 6.00011 6.9194C5.80931 6.9194 5.62631 6.84366 5.49131 6.70883L0.691281 1.90883C0.556448 1.77383 0.480713 1.59083 0.480713 1.40003C0.480713 1.20923 0.556448 1.02623 0.691281 0.891231Z"
          fill="#535461"
        />
      </svg> */}
    </div>
  );
};

export default Select;
