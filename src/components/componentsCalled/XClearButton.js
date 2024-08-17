// src/components/componentsCalled/XClearButton.js
import React from "react";

const XClearButton = ({ onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`absolute right-2 top-1/2 transform translate-y-1 text-gray-600 hover:text-black ${className}`}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
  );
};

export default XClearButton;
