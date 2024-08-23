import React, { useEffect, useState } from "react";
import { CgMenuRound, CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
import { Search, X } from 'lucide-react';

import CartIcon from "./CartIcon";
import HomeIcon from "./HomeIcon";
import LocationButton from "./LocationButton";
import LocationModal from "./LocationModal";
import UserProfileIcon from "./UserProfileIcon";

const OPNavBar = ({ disableInternalScroll = false, isHidden = false }) => {
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
        id="opnavbar"
        className={`bg-[#f9f9f9] text-[#ee9613] px-4 transition-all duration-300 ${isExpanded ? 'py-6' : 'py-4'} relative z-50`}
      >
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex items-center">
            <h1 className={`text-3xl pt-1 font-shrikhand text-[#ee9613] whitespace-nowrap mr-4`}>
              <Link to="/LP">Etomart</Link>
            </h1>
            <div className={`${isExpanded ? 'hidden' : ''}`}>
              <LocationButton onClick={handleLocationClick} />
            </div>
          </div>
          <div className={`flex-grow flex justify-center relative ${isExpanded ? 'w-full' : ''}`}>
            <div className={`relative ${isExpanded ? 'w-full max-w-[700px]' : 'w-[300px]'} transition-all duration-300`}>
              <input
                placeholder="Search in Etomart..."
                data-test-id="SearchInput"
                className="w-full pl-12 pr-10 py-2 rounded-full border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                style={{ height: '40px' }}
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={handleExpandNavbar}
              />
              <Search
                size={20}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-500 ${isExpanded ? 'hidden' : ''}`}
              />
              <Search
                size={20}
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-500 ${!isExpanded ? 'hidden' : ''}`} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>
          <div className={`flex items-center space-x-4 ${isExpanded ? 'hidden' : ''}`}>
            <div className="hidden md:block">
              <HomeIcon />
            </div>
            <div className="hidden lg:block">
              <CartIcon />
            </div>
            <div className="hidden xl:block">
              <UserProfileIcon />
            </div>
            <div className="xl:hidden cursor-pointer" onClick={() => setNav(!nav)}>
              {nav ? <CgClose size={30} /> : <CgMenuRound size={30} />}
            </div>
          </div>
          {isExpanded && (
            <button
              className="ml-4 p-1 rounded-full focus:outline-none text-gray-500 hover:text-black"
              onClick={handleCollapseNavbar}
            >
              <X size={20} />
            </button>
          )}
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

export default OPNavBar;