import React, { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { Search, X, Menu } from 'lucide-react';
import { Link } from "react-router-dom";
import { useStoresCards, useRestaurantsCards, useProductsCards } from "./KhomasDataOPNavBarSearch";
import CartIcon from "./ComponentsCalled/CartIcon";
import HomeIcon from "./ComponentsCalled/HomeIcon";
import LocationButton from "./ComponentsCalled/LocationButton";
import LocationModal from "./Modals/LocationModal";
import UserProfileIcon from "./ComponentsCalled/UserProfileIcon";
import PropTypes from 'prop-types';
import { useLocation } from './ComponentsCalled/LocationContext';

/** 
 * KhomasOPNavBar component
 * @param {Object} props - Component props
 * @param {boolean} props.disableInternalScroll - Flag to disable internal scrolling
 * @param {boolean} props.isHidden - Flag to hide the navbar
 */
const KhomasOPNavBar = ({ disableInternalScroll = false, isHidden = false }) => {
  const { location, setLocation, isBrowsing, setBrowsingMode } = useLocation();
  const [state, setState] = useState({
    showLocationModal: false,
    nav: false,
    isExpanded: false,
    searchQuery: "",
    searchResults: {
      stores: [],
      food: [],
      product: []
    },
    isMobile: false,
    isSearchFocused: false,
  });

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Use custom hooks to get data
  const storesCards = useStoresCards();
  const restaurantsCards = useRestaurantsCards();
  const productsCards = useProductsCards();

  /**
   * Shuffle array items randomly
   * @param {Array} array - Array to be shuffled
   * @returns {Array} Shuffled array
   */
  const shuffleArray = useCallback((array) => {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }, []);

  // Memoized search results
  const memoizedSearchResults = useMemo(() => {
    if (state.searchQuery) {
      const storeResults = storesCards.filter(item =>
        (item.name && item.name.toLowerCase().includes(state.searchQuery.toLowerCase())) ||
        (item.storetype && item.storetype.toLowerCase().includes(state.searchQuery.toLowerCase()))
      );
      const foodResults = restaurantsCards.filter(item =>
        (item.name && item.name.toLowerCase().includes(state.searchQuery.toLowerCase())) ||
        (item.cuisine && item.cuisine.toLowerCase().includes(state.searchQuery.toLowerCase()))
      );
      const productResults = productsCards.filter(item =>
        (item.name && item.name.toLowerCase().includes(state.searchQuery.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(state.searchQuery.toLowerCase()))
      );
      return { stores: storeResults, food: foodResults, product: productResults };
    } else {
      return {
        stores: shuffleArray(storesCards),
        food: shuffleArray(restaurantsCards),
        product: shuffleArray(productsCards)
      };
    }
  }, [state.searchQuery, storesCards, restaurantsCards, productsCards, shuffleArray]);

  useEffect(() => {
    const handleResize = () => {
      setState(prevState => ({ ...prevState, isMobile: window.innerWidth <= 1100 }));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  //Dropdown visibility
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 1090;
      setState(prevState => ({
        ...prevState,
        isMobile: newIsMobile,
        nav: newIsMobile ? prevState.nav : false // Close dropdown if screen becomes larger than 1090px
      }));
    };
    handleResize(); // Call once to set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setState(prevState => ({ ...prevState, nav: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchFocus = useCallback(() => {
    setState(prevState => ({ ...prevState, isSearchFocused: true, isExpanded: true }));
  }, []);

  const handleSearchBlur = useCallback(() => {
    setState(prevState => ({ ...prevState, isSearchFocused: false }));
  }, []);

  useEffect(() => {
    setState(prevState => ({ ...prevState, searchResults: memoizedSearchResults }));
  }, [memoizedSearchResults]);

  // Event handlers
  const handleCollapseNavbar = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      isExpanded: false,
      searchQuery: "",
      searchResults: {
        stores: shuffleArray(storesCards),
        food: shuffleArray(restaurantsCards),
        product: shuffleArray(productsCards)
      }
    }));
  }, [storesCards, restaurantsCards, productsCards, shuffleArray]);

  const handleSearchInputChange = useCallback((e) => {
    setState(prevState => ({ ...prevState, searchQuery: e.target.value }));
  }, []);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleCollapseNavbar();
    }
  }, [handleCollapseNavbar]);

  const handleLocationClick = useCallback(() => {
    if (!isBrowsing) {
      setState(prevState => ({ ...prevState, showLocationModal: true }));
    }
  }, [isBrowsing]);

  useEffect(() => {
    if (!location && !isBrowsing) {
      setState(prevState => ({ ...prevState, showLocationModal: true }));
    }
  }, [location, isBrowsing]);

  const handleLocationSelect = useCallback((address, suburb) => {
    setLocation({ address, suburb });
    setBrowsingMode(false);
    setState(prevState => ({ ...prevState, showLocationModal: false }));
  }, [setLocation, setBrowsingMode]);

  const closeLocationModal = useCallback(() => {
    setState(prevState => ({ ...prevState, showLocationModal: false }));
  }, []);





  const toggleNav = useCallback(() => {
    setState(prevState => ({ ...prevState, nav: !prevState.nav }));
  }, []);

  // Render functions
  const renderStoreCard = useCallback((store) => (
    <div className="h-40 w-full sm:h-48 sm:w-64 md:h-52 md:w-72 lg:h-56 lg:w-80 xl:h-60 xl:w-96 shrink-0 p-2" key={store.name}>
      <Link to={store.href} className="flex h-full flex-col rounded-lg bg-slate-50 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl">
        <div className="relative h-3/5 w-full overflow-hidden rounded-t-lg">
          <img src={store.imgSrc} alt={store.name} className="h-full w-full object-cover" loading="lazy" />
          <div data-testid="venue-storetype-label" className="absolute left-0 top-0 mr-2 mt-2 rounded-r-full bg-[#ee9613] p-2 text-xs text-black">{store.storetype}</div>
        </div>
        <div className="flex flex-col justify-between p-2 h-2/5">
          <p className="w-full truncate text-sm font-bold">{store.name}</p>
          <div className="mt-1 flex items-start text-xs">
            <span className="font-bold text-[#ee9613]">{store.priceRange}</span>
            <span className="mx-1">•</span>
            <span>{store.cuisine}</span>
          </div>
          <div className="mt-1 text-left text-xs text-gray-500">Pickup: {store.pickupTime}</div>
        </div>
      </Link>
    </div>
  ), []);

  const renderFoodCard = useCallback((food) => (
    <Link to={food.href} className="group relative flex h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 w-full overflow-hidden rounded-lg bg-slate-50 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl" data-test-id="food-card-link" key={food.name}>
      <div className="relative w-1/3 overflow-hidden">
        <img src={food.imgSrc} alt={food.name} className="absolute left-0 top-0 h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="flex w-2/3 flex-col justify-between p-3">
        <div>
          <h3 data-testid="food-name" className="mb-1 truncate text-sm font-bold">{food.name}</h3>
          <div className="mb-1 flex items-center text-xs text-gray-600">
            <span className="font-semibold text-[#ee9613]">{food.priceRange}</span>
            <span className="mx-2">•</span>
            <span className="truncate">{food.cuisine}</span>
          </div>
          <p className="mb-1 line-clamp-2 text-xs text-gray-600">{food.description}</p>
        </div>
        <div className="text-xs text-gray-500">Pickup: {food.pickupTime}</div>
        <div className="mt-auto">
          <div className="rounded py-1 text-xs text-black">
            <span className="text-black">Etomart </span>
            <span className={`text-[#${food.deliveryTime ? 'ee9613' : 'ee1313'}] font-bold`}>
              {food.deliveryTime ? 'Delivery Available' : 'Delivery Not Available'}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute right-2 top-2 flex h-6 w-8 items-center justify-center rounded bg-[#ee9613] text-lg text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        +
      </div>
    </Link>
  ), []);

  const renderPharmacyCard = useCallback((product) => (
    <Link to={product.href} className="group relative flex h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 w-full overflow-hidden rounded-lg bg-slate-50 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl" data-test-id="product-card-link" key={product.name}>
      <div className="relative w-1/3 overflow-hidden">
        <img src={product.imgSrc} alt={product.name} className="absolute left-0 top-0 h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="flex w-2/3 flex-col justify-between p-3">
        <div>
          <h3 data-testid="product-name" className="mb-1 truncate text-sm font-bold">{product.name}</h3>
          <div className="mb-1 flex items-center text-xs text-gray-600">
            <span className="font-semibold text-[#ee9613]">{product.priceRange}</span>
            <span className="mx-2">•</span>
            <span className="truncate">{product.category}</span>
          </div>
          <p className="mb-1 line-clamp-2 text-xs text-gray-600">{product.description}</p>
        </div>
        <div className="text-xs text-gray-500">Pickup: {product.pickupTime}</div>
        <div className="mt-auto">
          <div className="rounded py-1 text-xs text-black">
            <span className="text-black">Etomart </span>
            <span className={`text-[#${product.deliveryTime ? 'ee9613' : 'ee1313'}] font-bold`}>
              {product.deliveryTime ? 'Delivery Available' : 'Delivery Not Available'}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute right-2 top-2 flex h-6 w-8 items-center justify-center rounded bg-[#ee9613] text-lg text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        +
      </div>
    </Link>
  ), []);

  return (
    <div className={`mx-auto max-w-screen-2xl px-4 overflow-hidden ${isHidden ? 'hidden' : ''}`}>
    <div className="font-josefin_sans">
      <nav id="KhomasOPNavBar" className={`bg-[#f9f9f9] px-2 sm:px-4 text-[#ee9613] transition-all duration-300 ${state.isExpanded ? 'py-2 sm:py-6' : 'py-2 sm:py-4'} relative z-50`}>
          <div className="mx-auto flex items-center justify-between">
            <h1 className="mr-2 whitespace-nowrap pt-1 font-shrikhand text-xl sm:text-2xl md:text-3xl text-[#ee9613]">
              <Link to="/LP/Regions">Etomart</Link>
            </h1>
             {/* Show the LocationButton only on larger screens */}
             {!state.isMobile && (
            <div className="hidden sm:flex items-center space-x-4">
              <LocationButton
                onClick={handleLocationClick}
                location={isBrowsing ? "Browsing" : (location ? location.suburb : "Select Location")}
              />
            </div>
          )}
            <div className="flex-grow mx-4">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  placeholder="Search in Etomart..."
                  data-test-id="SearchInput"
                  className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-10 text-sm text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={state.searchQuery}
                  onChange={handleSearchInputChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  aria-label="Search in Etomart"
                />
                {state.isSearchFocused ? (
                  <Search
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500"
                    aria-hidden="true"
                  />
                ) : (
                  <Search
                    size={20}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-500"
                    aria-hidden="true"
                  />
                )}
                {state.searchQuery && (
                  <button
                    onClick={() => setState(prevState => ({ ...prevState, searchQuery: '' }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    aria-label="Clear search"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            {state.isMobile ? (
              <button
                className="p-2"
                onClick={toggleNav}
                aria-label="Toggle navigation menu"
              >
                {state.nav ? (
                  <X size={32} className="text-[#ee9613]" strokeWidth={1} />
                ) : (
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <Menu size={18} className="text-[#ee9613] z-10" />
                    <div className="absolute inset-0 border-2 border-[#ee9613] rounded-full"></div>
                  </div>
                )}
              </button>
            ) : (
              <div className="hidden sm:flex items-center space-x-4">
                <HomeIcon />
                <CartIcon />
                <UserProfileIcon />
              </div>
            )}
          </div>
        </nav>
        {state.showLocationModal && !isBrowsing && (
          <LocationModal
            showModal={state.showLocationModal}
            closeModal={closeLocationModal}
            onLocationSelect={handleLocationSelect}
          />
        )}
        {state.isExpanded && (
          <>
            <div className="relative z-40 bg-white shadow-md">
              <div className="mx-auto max-h-[calc(100vh-5rem)] overflow-y-auto p-2 sm:p-4">
                <div className="mb-4 sm:mb-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-bold">Stores, Restaurants and Pharmacies</h2>
                    <button className="text-[#ee9613] hover:underline">See all</button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {state.searchResults.stores.slice(0, 4).map(renderStoreCard)}
                  </div>
                </div>
                <div>
                  <h2 className="py-2 text-lg sm:text-xl font-bold">Found what you are looking for?</h2>
                  <div className="mb-4 sm:mb-8">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg sm:text-xl font-bold">Food</h2>
                      <button className="text-[#ee9613] hover:underline">See all</button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {state.searchResults.food.slice(0, 3).map(renderFoodCard)}
                    </div>
                  </div>
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-lg sm:text-xl font-bold">Products & Groceries</h2>
                      <button className="text-[#ee9613] hover:underline">See all</button>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {state.searchResults.product.slice(0, 3).map(renderPharmacyCard)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed inset-0 z-30 mt-[calc(5rem+1px)] bg-black bg-opacity-50" onClick={handleOverlayClick}></div>
          </>
        )}
        {state.nav && (
          <div
            ref={dropdownRef}
            className="absolute right-0 top-16 z-50 w-56 rounded-lg bg-[#fdfdfd] shadow-lg transition-opacity duration-200"
            role="dialog"
            aria-label="Navigation menu"
          >
            <div className="relative">
              <div className="absolute -top-2.5 right-3 z-50">
                <svg viewBox="0 0 32 16" className="size-4 text-white" aria-hidden="true">
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
                 {/* Mobile toggle button for menu */}
                 {state.isMobile && (
                <div className="mb-2 flex items-center justify-center">
                  <LocationButton
                    onClick={handleLocationClick}
                    location={location ? location.suburb : "Select Location"}
                  /></div>
                )}
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
                    aria-label="Select language"
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
                  <button className="w-full rounded-md px-4 py-2 text-left text-[#ee9613] hover:bg-[#ffaf5e4b]">
                    Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

KhomasOPNavBar.propTypes = {
  disableInternalScroll: PropTypes.bool,
  isHidden: PropTypes.bool
};

export default KhomasOPNavBar;