import React from 'react';
import { Link } from 'react-router-dom';

function OPNavBar() {
  // console.log('Rendering OPNavBar');
    return (
        <nav className="bg-slate-100 text-black p-4">
        <ul className="flex space-x-4">
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
      </nav>
    );
}

export default OPNavBar;
//Other Pages Nav Bar