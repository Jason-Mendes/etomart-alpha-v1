import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { CartProvider } from './context/CartContext';
import NavbarWrapper from './components/NavBarWrapper';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Products from './components/Products';
// import CartIcon from './components/CartIcon';
import UserProfile from './components/UserProfile';
// import KhomasLandingPage from './components/Regions/khomasLandingPage';
import RegionsHome from './components/Regions/RegionsHome';
import KhomasTowns from './components/Regions/Towns/KhomasTowns';
import ErongoTowns from './components/Regions/Towns/ErongoTowns';
import Stores from './components/Regions/Towns/Shops/Stores';
import Restaurants from './components/Regions/Towns/Shops/Restaurants';
import Storestest from './components/Regions/Towns/Shops/Xstores/Storestest';
import Pharmacies from './components/Regions/Towns/Shops/Pharmacies';
import Pannarotis from './components/Regions/Towns/Shops/Xrestaurants/Pannarotis';
import Checkers from './components/Regions/Towns/Shops/Xstores/Checkers';
import Clicks from './components/Regions/Towns/Shops/Xpharmacies/Clicks';
import JoesBeerhouse from './components/Regions/Towns/Shops/Xrestaurants/JoesBeerhouse';
function App() {
  return (
    <Router>
      <CartProvider>
        <div>
          {/* <NavbarWrapper /> */}
          <Routes>
            {/* Same Regions All Landinging Page just different routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/LP" element={<LandingPage />} />
            <Route path="/LandingPage" element={<LandingPage />} />
             {/* Same Regions All Landinging Page just different routes ends*/}
             {/* Towns Per Region All */}
            <Route path="/LP/Regions" element={<RegionsHome />} />
            {/* Towns Per Region All ends*/}
            {/* Town */}
            <Route path="/LP/Khomas/Towns" element={<KhomasTowns />} />
            <Route path="/LP/Erongo/Towns" element={<ErongoTowns />} />
            {/* Town ends*/}
            {/* All Stores and Specifics*/}
            <Route path="/LP/Khomas/Towns/Stores" element={<Stores />} />
            <Route path="/LP/Khomas/Towns/Store/Checkers" element={<Checkers />} />
            <Route path="/LP/Khomas/Towns/Store/Storestest" element={<Storestest />} />
            {/* All Stores and Specifics ends*/}
            {/* All Restaurants and Specifics*/}
            <Route path="/LP/Khomas/Towns/Restaurants" element={<Restaurants />} />
            <Route path="/LP/Khomas/Towns/Restaurant/Pannarotis" element={<Pannarotis />} />
            <Route path="/LP/Khomas/Towns/Restaurant/JoesBeerhouse" element={<JoesBeerhouse />} />
             {/* All Restaurants and Specifics ends*/}
              {/* All Pharmacies and Specifics*/}
            <Route path="/LP/Khomas/Towns/Pharmacies" element={<Pharmacies />} />
            <Route path="/LP/Khomas/Towns/Pharmacie/Clicks" element={<Clicks />} />
             {/* All Pharmacies and Specifics*/}
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;

// function App() {
//   return (
//     <Router>
//        <CartProvider>
//         <div>
//         <NavBar />
//         <Routes>
//           {/* Update these Route components once the corresponding components are ready} */}
//           {/* <Route path="/" exact element={<LandingPage />} /> */}
//           <Route path="/home" element={<Home />} />
//           <Route path="/profile" element={<UserProfile />} />
//         <Route path="/products" element={<Products />} />
//         <Route path="/cart" element={<Cart />} />
//         </Routes>
//       </div>
//       </CartProvider>
//     </Router>
//   );
// }

// export default App;





// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
