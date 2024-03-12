import React, { useEffect, useState } from 'react';
import { CgMenuRound, CgClose } from "react-icons/cg";
import { Link } from 'react-router-dom';


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
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },
    []
  );

  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div>
      <style>
        {`
        .sticky {
          position: fixed;
          z-index: 100;
          width: 100%;
        }
        `}
      </style>
      <div className="font-josefin-sans">
        <nav id="opnavbar" className="bg-slate-100 text-orange-500 px-4">
          {/*  <div className="mt-0  flex items-center justify-between py-0 sm:mx-0 sm:mb-4 md:px-4"> */}
          {/* this or that ^ /*/}
          <div className="flex items-center justify-between mx-auto max-w-7xl">
            <div className="flex items-center mt-4 mb-4 ">
              <h1 className='-mt-2 text-3xl pt-1 font-shrikhand text-[#df7000] whitespace-nowrap'><Link to='/Home'>Etomart</Link></h1>
            </div>
            <ul className="hidden md:flex font-bold text-lg">
              <li className='px-4 whitespace-nowrap '>
                <Link to="/LandingPage" className="hover:text-black">LandingPage</Link>
              </li>
              <li className='px-4 whitespace-nowrap'>
                <Link to="/home" className="hover:text-black">Home</Link>
              </li>
              <li className='px-4 whitespace-nowrap'>
                <Link to="/products" className="hover:text-black">Products</Link>
              </li>
              <li className='px-4 whitespace-nowrap'>
                <Link to="/cart" className="hover:text-black">Cart</Link>
              </li>
              <li className='px-4 whitespace-nowrap'>
                <Link to="/user-profile" className="hover:text-black">User Profile</Link>
              </li>
            </ul>
            <div onClick={handleNav} className='block md:hidden'>
              {nav ? <CgClose size={30} /> : <CgMenuRound size={30} />}
            </div>
          </div>
        </nav>
        <div className={`flex justify-end md:hidden ${nav ? 'block' : 'hidden'} transition-all duration-500 ease-in-out`}>
          <div >
            <ul className='uppercase p-2'>
              <li className='p-2 whitespace-nowrap border-b'>
                <Link to="/LandingPage" className="hover:text-black">Landing Page</Link>
              </li>
              <li className='p-2 whitespace-nowrap border-b'>
                <Link to="/home" className="hover:text-black">Home</Link>
              </li>
              <li className='p-2 whitespace-nowrap border-b'>
                <Link to="/products" className="hover:text-black">Products</Link>
              </li>
              <li className='p-2 whitespace-nowrap border-b'>
                <Link to="/cart" className="hover:text-black">Cart</Link>
              </li>
              <li className='p-2 whitespace-nowrap'>
                <Link to="/user-profile" className="hover:text-black">User Profile</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OPNavBar;
