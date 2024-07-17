import React, { useState } from 'react';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    const sanitizedValue = sanitize(e.target.value);
    setLocation(sanitizedValue);
};


  const handleSearch = () => {
    console.log('Searching for:', searchValue);
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  return (
    <div className="flex items-center w-full p-4">
      <div className="flex items-center w-full relative">
        <input
          placeholder="Search in Etomart..."
          data-test-id="SearchInput"
          className="flex-grow w-full md:w-auto px-16 py-2 rounded-full border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={searchValue}
          onChange={handleInputChange}
        />
        <button
          disabled={!searchValue}
          data-test-id="SearchButton"
          className={`p-1 rounded-full focus:outline-none ${!searchValue ? 'text-gray-300' : 'text-gray-500 hover:text-black'}`}
          onClick={handleSearch}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-500">
            <path d="M23.384 21.6191L16.855 15.0901C19.8122 11.2028 19.2517 5.689 15.5728 2.47626C11.894 -0.736477 6.35493 -0.549369 2.90126 2.90431C-0.552421 6.35798 -0.739529 11.897 2.47321 15.5759C5.68595 19.2548 11.1997 19.8152 15.087 16.8581L21.616 23.3871C22.1078 23.8667 22.8923 23.8667 23.384 23.3871C23.8718 22.8987 23.8718 22.1075 23.384 21.6191ZM2.75002 9.50007C2.75002 5.77215 5.7721 2.75007 9.50002 2.75007C13.2279 2.75007 16.25 5.77215 16.25 9.50007C16.25 13.228 13.2279 16.2501 9.50002 16.2501C5.77393 16.2457 2.75443 13.2262 2.75002 9.50007Z"
            fill="#ee9613"></path>
          </svg>
        </button>
        {searchValue && (
          <>
            <div className="px-0"></div>
            <button
              data-test-id="ClearSearchButton"
              className="p-1 rounded-full focus:outline-none text-gray-500 hover:text-black"
              onClick={clearSearch}
            >
              <svg viewBox="0 0 24 24" className="Clear-search w-6 h-6">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 12C0 5.37258 5.37258 0 12 0C18.6242 0.00771476 23.9923 5.37578 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM16.782 5.96635C17.1137 5.96635 17.4317 6.09826 17.666 6.333C17.9004 6.56726 18.0321 6.88508 18.0321 7.2165C18.0321 7.54791 17.9004 7.86574 17.666 8.1L13.946 11.822C13.899 11.8689 13.8725 11.9326 13.8725 11.999C13.8725 12.0654 13.899 12.1291 13.946 12.176L17.668 15.898C18.1558 16.3864 18.1558 17.1776 17.668 17.666C17.175 18.1425 16.393 18.1425 15.9 17.666L12.176 13.946C12.1293 13.899 12.0657 13.8726 11.9995 13.8726C11.9332 13.8726 11.8697 13.899 11.823 13.946L8.101 17.668C7.60862 18.1461 6.82537 18.1461 6.333 17.668C5.84524 17.1796 5.84524 16.3884 6.333 15.9L10.055 12.176C10.102 12.1291 10.1284 12.0654 10.1284 11.999C10.1284 11.9326 10.102 11.8689 10.055 11.822L6.333 8.1C6.00166 7.78763 5.8664 7.31979 5.97994 6.87881C6.09347 6.43783 6.43783 6.09347 6.87881 5.97994C7.31979 5.8664 7.78763 6.00166 8.1 6.333L11.823 10.055C11.9206 10.1523 12.0784 10.1523 12.176 10.055L15.898 6.333C16.1323 6.09826 16.4503 5.96635 16.782 5.96635Z"
                ></path>
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
