import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { LocationProvider, useLocation as useLocationContext } from "./components/03_Customers/RegionsHome/02_OPNavBarRegions/KhomasOPNavBar/ComponentsCalled/LocationContext"

import LandingPage from "./components/00_Main_Etomart_All/LandingPage";
import LandingPageTest from "./components/00_Main_Etomart_All/LandingPageTest";
import RegionHome from "./components/03_Customers/RegionsHome/RegionsTownsAll/RegionsTownsAll";
import ErongoTowns from "./components/03_Customers/RegionsHome/RegionsTownsAll/TownsAll/ErongoTowns/ErongoTowns";
import KhomasTowns from "./components/03_Customers/RegionsHome/RegionsTownsAll/TownsAll/KhomasTowns/Windhoek";
import Pharmacies from "./components/03_Customers/RegionsHome/RegionsTownsAll/TownsAll/KhomasTowns/WindhoekRSP/Pharmacies";
import Restaurants from "./components/03_Customers/RegionsHome/RegionsTownsAll/TownsAll/KhomasTowns/WindhoekRSP/Restaurants";
import Stores from "./components/03_Customers/RegionsHome/RegionsTownsAll/TownsAll/KhomasTowns/WindhoekRSP/Stores";
import Clicks from "./components/03_Customers/RegionsHome/RegionsTownsAll/TownsAll/KhomasTowns/WindhoekRSP/Xpharmacies/Clicks/Clicks";
import Test from "./components/03_Customers/RegionsHome/RegionsTownsAll/TownsAll/KhomasTowns/WindhoekRSP/Xpharmacies/Test";
import JoesBeerhouse from "./components/03_Customers/RegionsHome/RegionsTownsAll/TownsAll/KhomasTowns/WindhoekRSP/Xrestaurants/JoesBeerHouse/JoesBeerhouse";
import Checkers from "./components/03_Customers/RegionsHome/RegionsTownsAll/TownsAll/KhomasTowns/WindhoekRSP/Xstores/Checkers/Checkers";
// Import your components here

//Clear Selected Location from "/LP/Khomas/Towns" and further when navigating to specific Routes
const ClearLocationOnSpecificRoutes = () => {
  const location = useLocation();
  const { clearLocation } = useLocationContext();

  useEffect(() => {
    const routesToClearLocation = ['/LP', '/LP/Regions', '/LP/Region'];
    
    if (routesToClearLocation.includes(location.pathname)) {
      clearLocation();
    }
  }, [location, clearLocation]);

  return null;
};

//Your react App function goes here
function AppRoutes() {
  return (
    <CartProvider>
      <ClearLocationOnSpecificRoutes />
      <div>
        <Routes>
          {/* Routes for LandingPage */}
          <Route path="" element={<LandingPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/LP" element={<LandingPage />} />
          <Route path="/LP/Regions" element={<LandingPage />} />
          <Route path="/LandingPageTest" element={<LandingPageTest />} />
          {/* Routes for Regions */}
          <Route path="/LP/Region" element={<RegionHome />} />
          <Route path="/LP/Region/:regionName" element={<RegionHome />} />
          {/* Routes for Towns per Region */}
          <Route path="/LP/Khomas/Towns" element={<KhomasTowns />} />
          <Route path="/LP/Erongo/Towns" element={<ErongoTowns />} />

          {/* Routes for Stores */}
          <Route path="/LP/Khomas/Towns/Stores" element={<Stores />} />
          <Route
            path="/LP/Khomas/Towns/Store/Checkers" element={<Checkers />} />

          {/* Routes for Restaurants */}
          <Route
            path="/LP/Khomas/Towns/Restaurants" element={<Restaurants />} />
          <Route
            path="/LP/Khomas/Towns/Restaurant/JoesBeerhouse" element={<JoesBeerhouse />} />

          {/* Routes for Pharmacies */}
          <Route
            path="/LP/Khomas/Towns/Pharmacies" element={<Pharmacies />} />
          <Route
            path="/LP/Khomas/Towns/Pharmacy/Clicks" element={<Clicks />} />

          <Route path="/tests" element={<Test />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

function App() {
  return (
    <LocationProvider>
      <Router>
        <AppRoutes />
      </Router>
    </LocationProvider>
  );
}

export default App;