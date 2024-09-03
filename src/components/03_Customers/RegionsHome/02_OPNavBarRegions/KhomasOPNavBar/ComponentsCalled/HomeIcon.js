import React, { useState } from "react";

const HomeIcon = () => {
  return (
    <div>
      <a
        href="/LP/Khomas/Towns"
        className=" tab flex h-9  w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#ffaf5e4b] p-3 transition-all duration-300 hover:bg-[#ffaf5e9c] "
      >
        <svg
          class="svgIcon"
          viewBox="0 0 104 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100.5 40.75V96.5H66V68.5V65H62.5H43H39.5V68.5V96.5H3.5V40.75L52 4.375L100.5 40.75Z"
            fill="#ee9613"
            stroke-width="7"
          ></path>
        </svg>
      </a>
    </div>
  );
};

export default HomeIcon;
