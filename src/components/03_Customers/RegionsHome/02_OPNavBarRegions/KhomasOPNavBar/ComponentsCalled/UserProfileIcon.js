import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../../Authentication/context/AuthContext";
const UserProfileIcon = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    if (user) {
      navigate('/my/personal-info');
    } else {
      // Implement login logic or navigation to login page
      navigate('/LP');
    }
  };

  return (
    <div onClick={handleClick}>
      
      <a  href="#"
        className="tab flex h-9 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#ffaf5e4b] p-3 transition-all duration-300 hover:bg-[#ffaf5e9c]"
      >
        <svg
          width="104"
          height="100"
          viewBox="0 0 104 100"
          fill="#ff6f00"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="21.5"
            y="3.5"
            width="60"
            height="60"
            rx="30"
            stroke="#ff6f00"
            strokeWidth="7"
          ></rect>
          <g clipPath="url(#clip0_41_27)">
            <mask
              id="mask0_41_27"
              style={{ maskType: "luminance" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="61"
              width="104"
              height="52"
            >
              <path
                d="M0 113C0 84.2812 23.4071 61 52.1259 61C80.706 61 104 84.4199 104 113H0Z"
                fill="white"
              ></path>
            </mask>
            <g mask="url(#mask0_41_27)">
              <path
                d="M-7 113C-7 80.4152 19.4152 54 52 54H52.2512C84.6973 54 111 80.3027 111 112.749H97C97 88.0347 76.9653 68 52.2512 68H52C27.1472 68 7 88.1472 7 113H-7ZM-7 113C-7 80.4152 19.4152 54 52 54V68C27.1472 68 7 88.1472 7 113H-7ZM52.2512 54C84.6973 54 111 80.3027 111 112.749V113H97V112.749C97 88.0347 76.9653 68 52.2512 68V54Z"
                fill="#ff6f00"
              ></path>
            </g>
          </g>
          <defs>
            <clipPath id="clip0_41_27">
              <rect
                width="104"
                height="39"
                fill="white"
                transform="translate(0 61)"
              ></rect>
            </clipPath>
          </defs>
        </svg>
      </a>
    </div>
  );
};

export default UserProfileIcon;
