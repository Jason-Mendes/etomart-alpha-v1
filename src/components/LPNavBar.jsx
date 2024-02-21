import React from 'react';
import { Button, Img, List, Text } from '../components';
import { Link } from 'react-router-dom';

function LPNavBar() {
  // console.log('Rendering LPNavBar');
  return (
    //navbar container
    <nav className="bg-slate-100 text-black px-4 ">
      
        {/* Text and Image Container */}
        <div className=" flex justify-between mt-0  px-4 items-center max-w-[1850px]  ">
          {/* Text Component */}
          <Text
            className="text-[25px] sm:text-[25px] md:text-[25px] text-orange-500 my-4 ml-4 mr-4"
            size="txtShrikhandRegular45 " 
          >
            Etomart
          </Text>
          {/* Image Component */}
          <Img
            className="h-[40px] my-4 ml-4 mr-4" // Adjust margin as needed
            src="images/img_group36.svg"
            alt="groupThirtySix"
          />
          {/* <ul className="flex space-x-4"> 
          <li>
            <Link to="/LandingPage" className="hover:text-white">LandingPage</Link>
          </li>
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
             </ul>
          */}
          </div>
          
      </nav>
      //navbar container ends
    );
}

export default LPNavBar;
//Landing Pages Nav Bar