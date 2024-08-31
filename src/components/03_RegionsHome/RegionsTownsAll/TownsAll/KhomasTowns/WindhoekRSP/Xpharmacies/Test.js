import React, { useEffect, useState } from "react";
import { CgMenuRound, CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
import CartIcon from "../../../../../../00_Main_Etomart_All/01_LPNavBarRegions/KhomasLPNavBar/CartIcon";
import HomeIcon from "../../../../../../00_Main_Etomart_All/01_LPNavBarRegions/KhomasLPNavBar/HomeIcon";
import LocationButton from "../../../../LocationButton";
import LocationModal from "../../../../LocationModal";
import UserProfileIcon from "../../../../../../00_Main_Etomart_All/01_LPNavBarRegions/KhomasLPNavBar/UserProfileIcon";

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
        className={`bg-[#f9f9f9] px-4 text-[#ee9613] transition-all duration-300 ${isExpanded ? 'py-6' : 'py-4'} relative z-50`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="mb-2 mt-4 flex items-center">
            <h1 className="-mt-2 whitespace-nowrap pt-1 font-shrikhand text-3xl text-[#ee9613]">
              <Link to="/LP">Etomart</Link>
            </h1>
            <div className="ml-4">
              <LocationButton onClick={handleLocationClick} />
            </div>
          </div>
          <div className="mr-4 hidden w-full grow md:flex md:w-auto md:flex-none">
            <div
              className={`flex items-center rounded-full bg-white bg-opacity-20 p-2 transition-all duration-300 ${
                isExpanded ? 'w-96' : 'w-72'
              }`}
            >
              <input
                type="text"
                placeholder="Search..."
                id="searchInput"
                className="mr-2 w-full border-none bg-transparent text-[#ee9613] placeholder-[#ee9613] placeholder-opacity-80"
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
          <div className="hidden items-center space-x-4 md:flex">
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
          <div className="cursor-pointer xl:hidden" onClick={() => setNav(!nav)}>
            {nav ? <CgClose size={30} /> : <CgMenuRound size={30} />}
          </div>
        </div>
      </nav>

      {isExpanded && (
        <>
          <div className="relative z-40 bg-white shadow-md">
            <div className="mx-auto max-h-[calc(100vh-5rem)] max-w-7xl overflow-y-auto p-4">
              <div className="mb-8">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Stores, restaurants and pharmacies</h2>
                  <button className="text-[#ee9613] hover:underline">See all</button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {searchResults.stores.slice(0, 4).map((item, index) => (
                    <div key={index} className="rounded-lg bg-gray-100 p-4">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p>{item.type}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Food products and groceries</h2>
                  <button className="text-[#ee9613] hover:underline">See all</button>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {searchResults.food.slice(0, 9).map((item, index) => (
                    <div key={index} className="rounded-lg bg-gray-100 p-4">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p>{item.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-30 mt-[calc(5rem+1px)] bg-black bg-opacity-50" onClick={handleOverlayClick}></div>
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
          className="absolute right-0 top-24 z-50 w-56 rounded-lg bg-[#fdfdfd] shadow-lg transition-opacity duration-200"
          role="dialog"
          style={{ opacity: nav ? 1 : 0 }}
        >
          <div className="relative">
            <div className="absolute -top-2.5 right-3 z-50">
              <svg viewBox="0 0 32 16" className="size-4 text-white">
                <path className="fill-white" d="M 16,0 L32,16 H0 Z"></path>
                <path fill="#fdfdfd" d="M 16,1 L31,16 H1 Z"></path>
              </svg>
            </div>
            <div className="p-4">
              <div className="mb-2 flex items-center justify-center">
                <HomeIcon />
              </div>
              <div className="mb-2 flex items-center justify-center">
                <CartIcon />
              </div>
              <div className="mb-2">
                <button className="w-full rounded-md py-2 text-center text-[#ee9613] hover:bg-[#ffaf5e4b]">
                  Login or register
                </button>
              </div>
              <hr className="border-gray-200" />
              <div className="mt-2 w-full py-2 text-center">
                <select
                  id="language-selector"
                  className="mt-1 block w-full rounded-md border bg-[#ffaf5e4b] bg-white px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
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
                <button className="w-full rounded-md px-4 py-2 text-left text-[#ee9613] hover:bg-[#ffaf5e4b]">
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