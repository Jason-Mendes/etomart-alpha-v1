import React from 'react';
import { useLocation } from 'react-router-dom';
import LPNavBar from './LPNavBar';  // Ensure this path is correct
import OPNavBar from './OPNavBar'; // Ensure this path is correct

const NavbarWrapper = () => {
  const location = useLocation();
  
  // Determine which navbar to render based on the current path
  const isLandingPage = location.pathname === '/' || location.pathname === '/LandingPage';
  
  return isLandingPage ? <LPNavBar /> : <OPNavBar />;
};

export default NavbarWrapper;
