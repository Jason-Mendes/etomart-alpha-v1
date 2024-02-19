import React from 'react';
import { Link } from 'react-router-dom';

function LPNavBar() {
  // console.log('Rendering LPNavBar');
    return (
        <nav className="bg-slate-100 text-orange-500 p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/LandingPage" className="hover:text-black">LandingPage</Link>
          </li>
          <li>
            <Link to="/home" className="hover:text-black">Home</Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-black">Products</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-black">Cart</Link>
          </li>
          <li>
            <Link to="/user-profile" className="hover:text-black">User Profile</Link>
          </li>
        </ul>
      </nav>
    );
}

export default LPNavBar;
//Landing Pages Nav Bar