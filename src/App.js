import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import LandingPage from './components/LandingPage';


// import CartIcon from './components/CartIcon';

// import KhomasLandingPage from './components/Regions/khomasLandingPage';
import RegionHome from './components/Regions/RegionHome';
import KhomasTowns from './components/Regions/Towns/KhomasTowns';
import ErongoTowns from './components/Regions/Towns/ErongoTowns';
import Stores from './components/Regions/Towns/Shops/Stores';
import Restaurants from './components/Regions/Towns/Shops/Restaurants';
import Pharmacies from './components/Regions/Towns/Shops/Pharmacies';
import Checkers from './components/Regions/Towns/Shops/Xstores/Checkers';
import Clicks from './components/Regions/Towns/Shops/Xpharmacies/Clicks';
import JoesBeerhouse from './components/Regions/Towns/Shops/Xrestaurants/JoesBeerhouse';


function App() {
  return (
    <Router>
      <CartProvider>
        <div>
          {/* Uncomment NavBarWrapper if it is needed */}
          {/* <NavbarWrapper /> */}
          <Routes>
            {/* Routes for LandingPage */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/LP" element={<LandingPage />} />
            <Route path="/LandingPage" element={<LandingPage />} />

            {/* Routes for Regions */}
            <Route path="/LP/Region" element={<RegionHome />} />

            {/* Routes for Towns per Region */}
            <Route path="/LP/Khomas/Towns" element={<KhomasTowns />} />
            <Route path="/LP/Erongo/Towns" element={<ErongoTowns />} />

            {/* Routes for Stores */}
            <Route path="/LP/Khomas/Towns/Stores" element={<Stores />} />
            <Route path="/LP/Khomas/Towns/Store/Checkers" element={<Checkers />} />


            {/* Routes for Restaurants */}
            <Route path="/LP/Khomas/Towns/Restaurants" element={<Restaurants />} />
            <Route path="/LP/Khomas/Towns/Restaurant/JoesBeerhouse" element={<JoesBeerhouse />} />

            {/* Routes for Pharmacies */}
            <Route path="/LP/Khomas/Towns/Pharmacies" element={<Pharmacies />} />
            <Route path="/LP/Khomas/Towns/Pharmacy/Clicks" element={<Clicks />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
