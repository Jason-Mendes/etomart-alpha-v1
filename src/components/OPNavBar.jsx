import React, { useState } from 'react';
import { CgMenuRound, CgMenuOreos, CgMenuCake, CgClose } from "react-icons/cg";
import { Link } from 'react-router-dom';


function OPNavBar() {
  // console.log('Rendering OPNaxvBar');
  
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };


  return (
      <nav className="bg-slate-100 text-orange-500 p-2">
      <div className="flex justify-between items-center max-w-[1350px] mx-auto px-4">

        <div className="flex items-center">
          <h1 className='text-3xl font-bold text-[#df7000] whitespace-nowrap'>Etomart</h1>
        </div>

        <ul className="hidden md:flex">
          <li className='p-4 whitespace-nowrap'>
            <Link to="/LandingPage" className="hover:text-black">LandingPage</Link>
          </li>
          <li className='p-4 whitespace-nowrap'>
            <Link to="/home" className="hover:text-black">Home</Link>
          </li>
          <li className='p-4 whitespace-nowrap'>
            <Link to="/products" className="hover:text-black">Products</Link>
          </li>
          <li className='p-4 whitespace-nowrap'>
            <Link to="/cart" className="hover:text-black">Cart</Link>
          </li>
          <li className='p-4 whitespace-nowrap'>
            <Link to="/user-profile" className="hover:text-black">User Profile</Link>
          </li>
        </ul>

        <div onClick={handleNav} className='block md:hidden'>
          {nav ? <CgClose size={30}/> : <CgMenuRound size={30}/>}
        </div>
          <div className={nav ? 'text-[#ffffff] fixed left-0 top-0 w-[60%] h-full border-r uppercase bg-orange-500 ease-in-out duration-500' : 'fixed left-[-100%] ease-in-out duration-500'}>
        <h1 className='text-3xl font-bold text-[#ffffff] whitespace-nowrap mx-4 mt-4 mb-2'>Etomart</h1>

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
    </nav>
    );
}

export default OPNavBar;

//Other Pages Nav Bar