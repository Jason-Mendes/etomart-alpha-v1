import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import LandingPageTest from "./components/LandingPage Test";

// import CartIcon from './components/CartIcon';

// import KhomasLandingPage from './components/Regions/khomasLandingPage';
import RegionHome from "./components/Regions/RegionHome";
import ErongoTowns from "./components/Regions/Towns/ErongoTowns";
import KhomasTowns from "./components/Regions/Towns/KhomasTowns";
import Pharmacies from "./components/Regions/Towns/Shops/Pharmacies";
import Restaurants from "./components/Regions/Towns/Shops/Restaurants";
import Stores from "./components/Regions/Towns/Shops/Stores";
import Clicks from "./components/Regions/Towns/Shops/Xpharmacies/Clicks";
import Test from "./components/Regions/Towns/Shops/Xpharmacies/Test";
import JoesBeerhouse from "./components/Regions/Towns/Shops/Xrestaurants/JoesBeerhouse";
import Checkers from "./components/Regions/Towns/Shops/Xstores/Checkers";
import { CartProvider } from "./context/CartContext";


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
            <Route path="/LandingPageTest" element={<LandingPageTest />} />

            {/* Routes for Regions */}
            <Route path="/LP/Region" element={<RegionHome />} />

            {/* Routes for Towns per Region */}
            <Route path="/LP/Khomas/Towns" element={<KhomasTowns />} />
            <Route path="/LP/Erongo/Towns" element={<ErongoTowns />} />

            {/* Routes for Stores */}
            <Route path="/LP/Khomas/Towns/Stores" element={<Stores />} />
            <Route
              path="/LP/Khomas/Towns/Store/Checkers"
              element={<Checkers />}
            />

            {/* Routes for Restaurants */}
            <Route
              path="/LP/Khomas/Towns/Restaurants"
              element={<Restaurants />}
            />
            <Route
              path="/LP/Khomas/Towns/Restaurant/JoesBeerhouse"
              element={<JoesBeerhouse />}
            />

            {/* Routes for Pharmacies */}
            <Route
              path="/LP/Khomas/Towns/Pharmacies"
              element={<Pharmacies />}
            />
            <Route
              path="/LP/Khomas/Towns/Pharmacy/Clicks"
              element={<Clicks />}
            />

            <Route path="/tests" element={<Test />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;

// //creating authentucated profiles
// import React, { useState, createContext, useContext, useEffect } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';

// // Simulated auth service
// const authService = {
//   currentUser: null,
//   login: (email, password) => {
//     // Simulated login logic
//     if (email === 'user@example.com' && password === 'password') {
//       authService.currentUser = { email };
//       return Promise.resolve(authService.currentUser);
//     }
//     return Promise.reject('Invalid credentials');
//   },
//   signup: (email, password) => {
//     // Simulated signup logic
//     authService.currentUser = { email };
//     return Promise.resolve(authService.currentUser);
//   },
//   logout: () => {
//     authService.currentUser = null;
//     return Promise.resolve();
//   },
//   getCurrentUser: () => authService.currentUser,
// };

// // Auth context
// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     setUser(authService.getCurrentUser());
//   }, []);

//   const login = async (email, password) => {
//     const user = await authService.login(email, password);
//     setUser(user);
//   };

//   const signup = async (email, password) => {
//     const user = await authService.signup(email, password);
//     setUser(user);
//   };

//   const logout = async () => {
//     await authService.logout();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// // Components
// const NavBar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     await logout();
//     navigate('/');
//   };

//   return (
//     <nav className="bg-blue-500 p-4">
//       <ul className="flex justify-between">
//         <li><Link to="/" className="text-white">Home</Link></li>
//         <li><Link to="/products" className="text-white">Products</Link></li>
//         {user ? (
//           <>
//             <li><span className="text-white">{user.email}</span></li>
//             <li><button onClick={handleLogout} className="text-white">Logout</button></li>
//           </>
//         ) : (
//           <li><Link to="/auth" className="text-white">Login/Signup</Link></li>
//         )}
//       </ul>
//     </nav>
//   );
// };

// const Home = () => (
//   <div className="p-4">
//     <h1 className="text-2xl font-bold mb-4">Welcome to Our Grocery Delivery App</h1>
//     <p>Browse our products and get them delivered to your doorstep!</p>
//   </div>
// );

// const Products = () => {
//   const { user } = useAuth();
//   const products = [
//     { id: 1, name: 'Apples', price: 1.99 },
//     { id: 2, name: 'Bread', price: 2.49 },
//     { id: 3, name: 'Milk', price: 3.99 },
//   ];

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Our Products</h2>
//       <ul>
//         {products.map(product => (
//           <li key={product.id} className="mb-2">
//             {product.name} - ${product.price}
//             {user && (
//               <button className="ml-2 bg-green-500 text-white px-2 py-1 rounded">
//                 Add to Cart
//               </button>
//             )}
//           </li>
//         ))}
//       </ul>
//       {!user && (
//         <p className="mt-4 text-red-500">Please log in to add items to your cart.</p>
//       )}
//     </div>
//   );
// };

// const Auth = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { login, signup } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (isLogin) {
//         await login(email, password);
//       } else {
//         await signup(email, password);
//       }
//       navigate('/products');
//     } catch (error) {
//       alert(error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">{isLogin ? 'Login' : 'Signup'}</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//           {isLogin ? 'Login' : 'Signup'}
//         </button>
//       </form>
//       <button
//         onClick={() => setIsLogin(!isLogin)}
//         className="mt-4 text-blue-500"
//       >
//         {isLogin ? 'Need an account? Signup' : 'Have an account? Login'}
//       </button>
//     </div>
//   );
// };

// const PrivateRoute = ({ children }) => {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/auth" />;
// };

// const LandingPageTest = () => {
//   return (
//     <AuthProvider>
//       <div className="min-h-screen bg-gray-100">
//         <NavBar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/auth" element={<Auth />} />
//         </Routes>
//       </div>
//     </AuthProvider>
//   );
// };

// // New Conditional Router Wrapper
// const ConditionalRouterWrapper = ({ children }) => {
//   try {
//     useNavigate();
//     // If useNavigate doesn't throw an error, we're already inside a Router
//     return <>{children}</>;
//   } catch (error) {
//     // If useNavigate throws an error, we need to wrap children with Router
//     return <Router>{children}</Router>;
//   }
// };

// // Wrapped version of LandingPageTest
// const WrappedLandingPageTest = () => {
//   return (
//     <ConditionalRouterWrapper>
//       <LandingPageTest />
//     </ConditionalRouterWrapper>
//   );
// };

// export { WrappedLandingPageTest as default, LandingPageTest };