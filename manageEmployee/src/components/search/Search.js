import React from 'react';
import './search.css';

const Search = () => {
  return (
    <div className='search-holder'>
      <div>
        <p className='search-holder-label'>
          Search <span>*</span>
        </p>
        <input placeholder="by Name, email, phone, verification_no,employment_no" />
      </div>
      <button>Search</button>
    </div>
  );
};

export default Search;
