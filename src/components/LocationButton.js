import React from 'react';

const LocationButton = () => {
  return (
    <div className="pointer-events-auto opacity-100">
      <div className="flex justify-center items-center">
        <div className="flex items-center">
          <div style={{ opacity: 1 }}>
            <button
              data-test-id="header.address-select-button"
              aria-haspopup="dialog"
              className="flex items-center p-2 bg-white rounded-md "
              style={{ border: 'none', backgroundColor: 'transparent' }}
            >
              <div className="flex-shrink-0 bg-[#ffaf5e4b] rounded-full p-2">
  <svg viewBox="0 0 24 24" className="address-selector-icon w-6 h-5">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 9.5C6 12.813 8.687 15.5 12 15.5C15.312 15.497 17.997 12.813 18 9.5C18 6.187 15.313 3.5 12 3.5C8.687 3.5 6 6.187 6 9.5ZM2.5 9.5C2.506 4.256 6.756 0.006 12 0C17.244 0.006 21.493 4.255 21.5 9.499C21.5 16.044 14.958 21.987 12.958 23.653C12.402 24.114 11.597 24.114 11.041 23.653C9.037 21.987 2.5 16.044 2.5 9.5ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"
      fill="#ff6f00"
    />
  </svg>
</div>
              <div className="ml-2">
                <span
                  data-test-id="header.address-select-button.address-text"
                  className="text-lg  text-black  font-bold  font-josefin_sans hover:text-orange-500"
                >
                  Windhoek
                </span>
              </div>
             <svg viewBox="0 0 24 24" className="ml-2 w-6 h-6 ">
             <path
               fillRule="evenodd"
               clipRule="evenodd"
               d="M12.1768 13.409C12.0791 13.5066 11.9209 13.5066 11.8232 13.409L6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L12.1768 13.409Z"
               fill="#ff6f00"
               className="hover:fill-black "
             />
           </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationButton;
// import React from 'react';

// const LocationButton = () => {
//   return (
//     <div className="pointer-events-auto opacity-100">
//       <div className="flex justify-center items-center">
//         <div className="flex items-center">
//           <div style={{ opacity: 1 }}>
//             <button
//               data-test-id="header.address-select-button"
//               aria-haspopup="dialog"
//               className="flex items-center p-2 bg-white rounded-md shadow-md"
//             >
//               <div className="flex-shrink-0">
//                 <svg viewBox="0 0 24 24" className="address-selector-icon w-6 h-6">
//                   <path
//                     fillRule="evenodd"
//                     clipRule="evenodd"
//                     d="M6 9.5C6 12.813 8.687 15.5 12 15.5C15.312 15.497 17.997 12.813 18 9.5C18 6.187 15.313 3.5 12 3.5C8.687 3.5 6 6.187 6 9.5ZM2.5 9.5C2.506 4.256 6.756 0.006 12 0C17.244 0.006 21.493 4.255 21.5 9.499C21.5 16.044 14.958 21.987 12.958 23.653C12.402 24.114 11.597 24.114 11.041 23.653C9.037 21.987 2.5 16.044 2.5 9.5ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"
//                   ></path>
//                 </svg>
//               </div>
//               <div className="ml-2">
//                 <span
//                   data-test-id="header.address-select-button.address-text"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   Eilat
//                 </span>
//               </div>
//               <svg viewBox="0 0 24 24" className="ml-2 w-4 h-4">
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M12.1768 13.409C12.0791 13.5066 11.9209 13.5066 11.8232 13.409L6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L12.1768 13.409Z"
//                 ></path>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LocationButton;
