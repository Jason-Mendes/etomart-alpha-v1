import React from 'react';
import { Button, Img, List, Text } from '../components';
import { Link } from 'react-router-dom';

function LPNavBar() {
  // console.log('Rendering LPNavBar');
  return (
    //navbar container
    <nav className="bg-slate-100 text-orange-500 px-4">
    <div className="-mt-2 flex items-center justify-between -py-4 sm:mx-0 sm:mb-0 md:px-4">

      <div className="flex items-center mt-6 mb-4">
        <h1 className='-mt-2 text-3xl font-bold text-[#df7000] whitespace-nowrap'>Etomart</h1>
      </div>
      {/* Image Component */}
    <Img className="h-[40px] my-0 ml-2 mr-10 md:mr-20 lg:mr-40" src="images/img_group36.svg" alt="groupThirtySix" />
<ul className="flex space-x-4">
      <li>
        <Link to="/LandingPage" className="hover:text-white">LandingPage</Link>
      </li>
          {/*
          <li>
            <Link to="/home" className="hover:text-white">Home</Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-white">Products</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-white">Cart</Link>
          </li>
          <li>
            <Link to="/user-profile" className="hover:text-white">User Profile</Link>
          </li> 
             */}
             </ul>
       
          </div>
          
      </nav>
      //navbar container ends
    );
}

export default LPNavBar;
//Landing Pages Nav Bar