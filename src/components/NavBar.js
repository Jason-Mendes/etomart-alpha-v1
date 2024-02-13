import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="bg-gray-800 text-white p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/home" className="hover:text-gray-300">Home</Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-gray-300">Products</Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-gray-300">Cart</Link>
          </li>
          <li>
            <Link to="/user-profile" className="hover:text-gray-300">User Profile</Link>
          </li>
        </ul>
      </nav>
    );
}

export default NavBar;