import React, { useEffect, useState } from 'react';
import { CgMenuRound, CgClose } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import LocationButton from './LocationButton';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';
import UserProfileIcon from './UserProfileIcon';
import HomeIcon from './HomeIcon';
import LocationModal from './LocationModal'
function OPNavBar() {

  const [showLocationModal, setShowLocationModal] = useState(false);
  
  const handleLocationClick = () => {
    setShowLocationModal(true);
  };

  
  const closeModals = () => {
    setShowLocationModal(false);
  
  };

  
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('opnavbar');
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="relative z-10">
      <style>
        {`.sticky {
          position: fixed;
          z-index: 100;
          width: 100%;
          top: 0;
        }`}
      </style>
      <div className="font-josefin_sans">
        <nav id="opnavbar" className="bg-[#f9f9f9] text-[#ee9613] px-4">
          <div className="flex items-center justify-between mx-auto max-w-7xl">
            <div className="flex items-center mt-4 mb-4">
              <h1 className="-mt-2 text-3xl pt-1 font-shrikhand text-[#ee9613] whitespace-nowrap">
                <Link to="/LP">Etomart</Link>
              </h1>
              <div className="ml-4">
  <LocationButton onClick={handleLocationClick} />
</div>
            </div>
            <div className="hidden md:flex flex-grow md:flex-none md:w-auto mr-4 w-full">
              <SearchBar />
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="md:block">
                <HomeIcon />
              </div>
              <div className="hidden lg:block">
                <CartIcon />
              </div>
              <div className="hidden xl:block">
                <UserProfileIcon />
              </div>
            </div>
            <div className="xl:hidden cursor-pointer" onClick={handleNav}>
              {nav ? <CgClose size={30} /> : <CgMenuRound size={30} />}
            </div>
          </div>
        </nav>


         {/* Render modals */}
      <LocationModal
        showModal={showLocationModal}
        closeModal={closeModals}
        openNewLocationModal={() => {
          closeModals();
        }}
      />
      
     
    </div>


        <div
          className={`absolute z-20 w-full bg-[#f9f9f9] xl:hidden ${
            nav ? 'block' : 'hidden'
          } transition-all duration-500 ease-in-out`}
        >
         </div>
        {nav && (
          <div
            className="absolute top-24 right-0 z-20 w-56 bg-[#fdfdfd] rounded-lg shadow-lg transition-opacity duration-200"
            role="dialog"
            style={{ opacity: nav ? 1 : 0 }}
          >
            <div className="relative">
              <div className="absolute -top-2.5 right-3 z-20">
                <svg viewBox="0 0 32 16" className="w- h-4 text-white">
                  <path className="fill-white "  d="M 16,0 L32,16 H0 Z"></path>
                  <path 
                  fill= '#fdfdfd' d="M 16,1 L31,16 H1 Z"></path>
                </svg>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-center mb-2">
                <HomeIcon />
              </div>
                <div className="flex items-center justify-center mb-2">
                <CartIcon />
              </div>
              <div className="mb-2">
                  <button className="w-full  py-2 text-center text-[#ee9613] hover:bg-[#ffaf5e4b] rounded-md">
                    Login or register
                  </button>
                </div>
                <hr className="border-gray-200" />
                <div className="mt-2 w-full  py-2 text-center">
                 
                    <select
                      id="language-selector"
                      className="w-full mt-1 block py-2 px-3 border bg-[#ffaf5e4b] bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500  sm:text-sm"
                    >
                      <option value="en">English</option>
                      <option value="de">Deutsch</option>
                      <option value="fr">Français</option>
                      <option value="es">Español</option>
                      <option value="ru">Русский</option>
                      <option value="zh">中文</option>
                      {/* Add more options as needed */}
                    </select>
                 
                </div>
                <div className="mt-2">
                  <button className="w-full px-4 py-2 text-left text-[#ee9613] hover:bg-[#ffaf5e4b]  rounded-md">
                    Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

  );
}

export default OPNavBar;



// import React, { useEffect, useState } from 'react';
// import { CgMenuRound, CgClose } from "react-icons/cg";
// import { Link } from 'react-router-dom';
// import LocationButton from './LocationButton'; // Import the LocationButton component
// import SearchBar from './SearchBar'; // Import the SearchBar component
// import CartIcon from './CartIcon';
// import UserProfileIcon from './UserProfileIcon';
// import HomeIcon from './HomeIcon';
// function OPNavBar() {
//   useEffect(() => {
//     const handleScroll = () => {
//       const navbar = document.getElementById('opnavbar');
//       const scrollPosition = window.scrollY;
//       if (scrollPosition > 0) {
//         navbar.classList.add('sticky');
//       } else {
//         navbar.classList.remove('sticky');
//       }
//     };
//     window.addEventListener('scroll', handleScroll);
//     // Clean up the event listener when the component unmounts
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const [nav, setNav] = useState(false);
//   const handleNav = () => {
//     setNav(!nav);
//   };

//   return (
//     <div className='relative z-10'>
//       <div>
//         <style>
//           {`
//             .sticky {
//               position: fixed;
//               z-index: 100;
//               width: 100%;
//             }
//           `}
//         </style>
//         <div className="font-josefin_sans">
//           <nav id="opnavbar" className="bg-[#f9f9f9] text-orange-500 px-4">
//             <div className="flex items-center justify-between mx-auto max-w-7xl">
//               <div className="flex items-center mt-4 mb-4 ">
//                 <h1 className='-mt-2 text-3xl pt-1 font-shrikhand  text-orange-500 whitespace-nowrap'>
//                   <Link to='/Home'>Etomart</Link>
//                 </h1>
//                 {/* Add the LocationButton component next to the Etomart link */}
//                 <div className="ml-4">
//                   <LocationButton />
//                 </div>
//               </div>
//               {/* Add the SearchBar component here */}
//               <div className="mr-28 ml-28 flex-grow">
//                 <SearchBar />
//               </div>
//               <ul className="hidden md:flex font-bold text-lg">
//                 {/* <li className='px-4 whitespace-nowrap'>
//                   <Link to="/LP" className="hover:text-black">Landing Page</Link>
//                 </li> */}
//                 {/* <li className='flex items-center justify-center whitespace-nowrap'>
//                   <Link to="/home" className="hover:text-black">Home</Link>
//                 </li> */}
//                 <div className="ml-4">
//                   <HomeIcon />
//                 </div> 
//                 {/* <li className='px-4 whitespace-nowrap'>
//                   <Link to="/products" className="hover:text-black">Products</Link>
//                 </li> */}
//                 <div className="ml-4 mr-4">
//                   <CartIcon />
//                 </div> 
//                 <div className="mr-4">
//                   <UserProfileIcon />
//                 </div>
              
//                 {/* <li className='px-4 whitespace-nowrap'>
//                   <Link to="/user-profile" className="hover:text-black">User Profile</Link>
//                 </li> */}
//               </ul>
//               <div onClick={handleNav} className='block md:hidden'>
//                 {nav ? <CgClose size={30} /> : <CgMenuRound size={30} />}
//               </div>
//             </div>
//           </nav>
//           <div className={`flex absolute z-20 justify-end md:hidden ${nav ? 'block' : 'hidden'} transition-all duration-500 ease-in-out`}>
//             <div>
//               <ul className='uppercase p-2'>
//                 <li className='p-2 whitespace-nowrap border-b'>
//                   <Link to="/LP" className="hover:text-black">Landing Page</Link>
//                 </li>
//                 <li className='p-2 whitespace-nowrap border-b'>
//                   <Link to="/home" className="hover:text-black">Home</Link>
//                 </li>
//                 <li className='p-2 whitespace-nowrap border-b'>
//                   <Link to="/products" className="hover:text-black">Products</Link>
//                 </li>
//                 <div className="ml-4">
//                   <LocationButton />
//                 </div>
//                 <li className='p-2 whitespace-nowrap'>
//                   <Link to="/user-profile" className="hover:text-black">User Profile</Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OPNavBar;
