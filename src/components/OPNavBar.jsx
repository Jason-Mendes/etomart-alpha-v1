import React, { useEffect, useState } from 'react';
import { CgMenuRound, CgClose } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import LocationButton from './LocationButton';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';
import UserProfileIcon from './UserProfileIcon';
import HomeIcon from './HomeIcon';

function OPNavBar() {
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
    <div className='relative z-10'>
      <style>
        {`
          .sticky {
            position: fixed;
            z-index: 100;
            width: 100%;
          }
        `}
      </style>
      <div className='font-josefin_sans'>
        <nav id='opnavbar' className='bg-[#f9f9f9] text-orange-500 px-4'>
          <div className='flex items-center justify-between mx-auto max-w-7xl'>
            <div className='flex items-center mt-4 mb-4 '>
              <h1 className='-mt-2 text-3xl pt-1 font-shrikhand  text-orange-500 whitespace-nowrap'>
                <Link to='/Home'>Etomart</Link>
              </h1>
              <div className='ml-4'>
                <LocationButton />
              </div>
            </div>
            <div className='flex-grow md:flex-none mr-4'>
              <SearchBar />
            </div>
            <div className='hidden md:flex items-center justify-end space-x-4 font-bold text-lg'>
              <div className='ml-4'>
                <HomeIcon />
              </div>
              <div className='ml-4 mr-4'>
                <CartIcon />
              </div>
              <div className='mr-4'>
                <UserProfileIcon />
              </div>
            </div>
            <div onClick={handleNav} className='block md:hidden'>
              {nav ? <CgClose size={30} /> : <CgMenuRound size={30} />}
            </div>
          </div>
        </nav>
        <div
          className={`flex absolute z-20 justify-end md:hidden ${
            nav ? 'block' : 'hidden'
          } transition-all duration-500 ease-in-out`}
        >
          <ul className='uppercase p-2 space-y-2'>
            <li className='p-2 whitespace-nowrap border-b'>
              <Link to='/LandingPage' className='hover:text-black'>
                Landing Page
              </Link>
            </li>
            <li className='p-2 whitespace-nowrap border-b'>
              <Link to='/home' className='hover:text-black'>
                Home
              </Link>
            </li>
            <li className='p-2 whitespace-nowrap border-b'>
              <Link to='/products' className='hover:text-black'>
                Products
              </Link>
            </li>
            <li className='p-2 whitespace-nowrap'>
              <Link to='/user-profile' className='hover:text-black'>
                User Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
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
//                   <Link to="/LandingPage" className="hover:text-black">Landing Page</Link>
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
//                   <Link to="/LandingPage" className="hover:text-black">Landing Page</Link>
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
