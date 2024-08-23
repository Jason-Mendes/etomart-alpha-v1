import React, { useEffect, useState } from "react";
import { CgMenuRound, CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";

import CartIcon from "../../../../../CartIcon";
import HomeIcon from "../../../../../HomeIcon";
import LocationButton from "../../../../../LocationButton";
import LocationModal from "../../../../../LocationModal";
import UserProfileIcon from "../../../../../UserProfileIcon";

const KhomasOPNavBar = ({ disableInternalScroll = false, isHidden = false }) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [nav, setNav] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    stores: [],
    food: []
  });

  const items = {
    stores: [
      { name: "Burger King", type: "Fast Food Restaurant" },
      { name: "Pizza Hut", type: "Pizza Restaurant" },
      { name: "Subway", type: "Sandwich Shop" },
      { name: "CVS Pharmacy", type: "Pharmacy" },
      { name: "Walgreens", type: "Pharmacy" },
      { name: "7-Eleven", type: "Convenience Store" }
    ],
    food: [
      { name: "Burger", type: "Fast Food" },
      { name: "Pizza", type: "Italian" },
      { name: "Salad", type: "Healthy" },
      { name: "Pasta", type: "Italian" },
      { name: "Steak", type: "American" },
      { name: "Sushi", type: "Japanese" },
      { name: "Tacos", type: "Mexican" },
      { name: "Ice Cream", type: "Dessert" },
      { name: "Fried Chicken", type: "Fast Food" }
    ]
  };

  useEffect(() => {
    if (searchQuery) {
      const storeResults = items.stores.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const foodResults = items.food.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults({ stores: storeResults, food: foodResults });
    } else {
      setSearchResults({ stores: [], food: [] });
    }
  }, [searchQuery]);

  const handleExpandNavbar = () => {
    setIsExpanded(true);
  };

  const handleCollapseNavbar = () => {
    setIsExpanded(false);
    setSearchQuery("");
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCollapseNavbar();
    }
  };

  const handleLocationClick = () => setShowLocationModal(true);

  const closeModals = () => setShowLocationModal(false);

  return (
    <div className="font-josefin_sans">
      <nav
        id="KhomasOPNavBar"
        className={`bg-[#f9f9f9] text-[#ee9613] px-4 transition-all duration-300 ${isExpanded ? 'py-6' : 'py-4'} relative z-50`}
      >
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex items-center mt-4 mb-2">
            <h1 className="-mt-2 text-3xl pt-1 font-shrikhand text-[#ee9613] whitespace-nowrap">
              <Link to="/LP">Etomart</Link>
            </h1>
            <div className="ml-4">
              <LocationButton onClick={handleLocationClick} />
            </div>
          </div>
          <div className="hidden md:flex flex-grow md:flex-none md:w-auto mr-4 w-full">
            <div
              className={`flex items-center bg-white bg-opacity-20 rounded-full p-2 transition-all duration-300 ${
                isExpanded ? 'w-96' : 'w-72'
              }`}
            >
              <input
                type="text"
                placeholder="Search..."
                id="searchInput"
                className="bg-transparent border-none text-[#ee9613] placeholder-[#ee9613] placeholder-opacity-80 w-full mr-2"
                onFocus={handleExpandNavbar}
                onChange={handleSearchInputChange}
                value={searchQuery}
              />
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path
                  fill="#ee9613"
                  d="M23.384 21.619l-6.529-6.529c2.957-3.887 2.397-9.408-1.321-12.62-4.243-3.213-9.781-3.026-14.235.418-4.453 3.444-4.64 8.983-1.429 12.662 3.213 3.679 8.726 4.239 12.613 1.282l6.529 6.529c.492.48 1.276.48 1.768 0 .488-.488.488-1.28 0-1.768zm-20.634-12.119c0-3.728 3.022-6.75 6.75-6.75s6.75 3.022 6.75 6.75-3.022 6.75-6.75 6.75-6.75-3.022-6.75-6.75z"
                />
              </svg>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="md:block">
              <HomeIcon />
            </div>
            <div className="hidden lg:block">
              <CartIcon />
            </div>
            <div className="hidden xl:block">
              <UserProfileIcon />
            </div>
          </div>
          <div className="xl:hidden cursor-pointer" onClick={() => setNav(!nav)}>
            {nav ? <CgClose size={30} /> : <CgMenuRound size={30} />}
          </div>
        </div>
      </nav>

      {isExpanded && (
        <>
          <div className="bg-white shadow-md z-40 relative">
            <div className="mx-auto max-w-7xl p-4 overflow-y-auto max-h-[calc(100vh-5rem)]">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Stores, restaurants and pharmacies</h2>
                  <button className="text-[#ee9613] hover:underline">See all</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {searchResults.stores.slice(0, 4).map((item, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-4">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p>{item.type}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Food products and groceries</h2>
                  <button className="text-[#ee9613] hover:underline">See all</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {searchResults.food.slice(0, 9).map((item, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-4">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p>{item.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30 mt-[calc(5rem+1px)]" onClick={handleOverlayClick}></div>
        </>
      )}

      {showLocationModal && (
        <LocationModal
          showModal={showLocationModal}
          closeModal={closeModals}
        />
      )}

{nav && (
        <div
          className="absolute top-24 right-0 z-20 w-56 bg-[#fdfdfd] rounded-lg shadow-lg transition-opacity duration-200"
          role="dialog"
          style={{ opacity: nav ? 1 : 0 }}
        >
          <div className="relative">
            <div className="absolute -top-2.5 right-3 z-20">
              <svg viewBox="0 0 32 16" className="w-4 h-4 text-white">
                <path className="fill-white" d="M 16,0 L32,16 H0 Z"></path>
                <path fill="#fdfdfd" d="M 16,1 L31,16 H1 Z"></path>
              </svg>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-center mb-2">
                <HomeIcon />
              </div>
              <div className="flex items-center justify-center mb-2">
                <CartIcon />
              </div>
              <div className="mb-2">
                <button className="w-full py-2 text-center text-[#ee9613] hover:bg-[#ffaf5e4b] rounded-md">
                  Login or register
                </button>
              </div>
              <hr className="border-gray-200" />
              <div className="mt-2 w-full py-2 text-center">
                <select
                  id="language-selector"
                  className="w-full mt-1 block py-2 px-3 border bg-[#ffaf5e4b] bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                >
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                  <option value="fr">Français</option>
                  <option value="es">Español</option>
                  <option value="ru">Русский</option>
                  <option value="zh">中文</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <div className="mt-2">
                <button className="w-full px-4 py-2 text-left text-[#ee9613] hover:bg-[#ffaf5e4b] rounded-md">
                  Support
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KhomasOPNavBar;