import React, { useEffect, useState, useMemo } from "react";
import { Search, X } from 'lucide-react';
import { CgMenuRound, CgClose } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useStoresCards, useRestaurantsCards, useProductsCards } from "./KhomasDataOPNavBarSearch";
import CartIcon from "../../CartIcon";
import HomeIcon from "../../HomeIcon";
import LocationButton from "../../LocationButton";
import LocationModal from "../../LocationModal";
import UserProfileIcon from "../../UserProfileIcon";

const KhomasOPNavBar = ({ disableInternalScroll = false, isHidden = false }) => {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [nav, setNav] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({
    stores: [],
    food: []
  });

  // Use custom hooks to get data
  const storesCards = useStoresCards();
  const restaurantsCards = useRestaurantsCards();
  const productsCards = useProductsCards();

  function shuffleArray(array) {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
  

  useEffect(() => {
    if (searchQuery) {
      const storeResults = storesCards.filter(item =>
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.storetype && item.storetype.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      const foodResults = restaurantsCards.filter(item =>
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.cuisine && item.cuisine.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      const productResults = productsCards.filter(item =>
        (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults({ stores: storeResults, food: foodResults, product: productResults });
    } else {
      // Shuffle and set results when search query is empty
      setSearchResults({
        stores: shuffleArray(storesCards),
        food: shuffleArray(restaurantsCards),
        product: shuffleArray(productsCards)
      });
    }
  }, [searchQuery, storesCards, restaurantsCards, productsCards]);
  
  const handleCollapseNavbar = () => {
    setIsExpanded(false);
    setSearchQuery("");
    setSearchResults({
      stores: shuffleArray(storesCards),
      food: shuffleArray(restaurantsCards),
      product: shuffleArray(productsCards)
    });
  };
  

  const handleExpandNavbar = () => {
    setIsExpanded(true);
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

  const renderStoreCard = (store) => (
    <div className="h-[200px] w-[280px] shrink-0">
      <a href={store.href} className="block h-full rounded-lg bg-slate-50 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl">
        <div className="relative h-[120px] w-full overflow-hidden rounded-t-lg">
          <img src={store.imgSrc} alt={store.name} className="size-full object-cover" />
          <div data-testid="venue-storetype-label" className="absolute left-0 top-0 mr-2 mt-2 rounded-r-full bg-[#ee9613] p-2 text-xs text-black">{store.storetype}</div>
        </div>
        <div className="flex flex-col p-2">
          <p className="w-full truncate text-sm font-bold">{store.name}</p>
          <div className="mt-1 flex items-start text-xs">
            <span className="font-bold text-[#ee9613]">{store.priceRange}</span>
            <span className="mx-1">•</span>
            <span>{store.cuisine}</span>
          </div>
          <div className="mt-1 text-left text-xs text-gray-500">Pickup: {store.pickupTime}</div>
        </div>
      </a>
    </div>
  );

  const renderFoodCard = (food) => (
    <a href={food.href} className="flex h-[160px] w-full overflow-hidden rounded-lg bg-slate-50 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl" data-test-id="food-card-link">
      <div className="relative w-1/3 overflow-hidden">
        <img src={food.imgSrc} alt={food.name} className="absolute left-0 top-0 size-full object-cover" />
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
      <div className="absolute right-2 top-2 flex h-6 w-8 items-center justify-center rounded bg-[#ee9613] text-lg text-white">+</div>
    </a>
  );

  
  const renderPharmacyCard = (product) => (
    <a href={product.href} className="flex h-[160px] w-full overflow-hidden rounded-lg bg-slate-50 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl" data-test-id="product-card-link">
      <div className="relative w-1/3 overflow-hidden">
        <img src={product.imgSrc} alt={product.name} className="absolute left-0 top-0 size-full object-cover" />
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
      <div className="absolute right-2 top-2 flex h-6 w-8 items-center justify-center rounded bg-[#ee9613] text-lg text-white">+</div>
    </a>
  );

  
  return (
    <div className="font-josefin_sans">
      <nav
        id="KhomasOPNavBar"
        className={`bg-[#f9f9f9] px-4 text-[#ee9613] transition-all duration-300 ${isExpanded ? 'py-6' : 'py-4'} relative z-50`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center">
            <h1 className={`mr-4 whitespace-nowrap pt-1 font-shrikhand text-3xl text-[#ee9613]`}>
              <Link to="/LP">Etomart</Link>
            </h1>
            <div className={`${isExpanded ? 'hidden' : ''}`}>
              <LocationButton onClick={handleLocationClick} />
            </div>
          </div>
          <div className={`relative flex grow justify-center ${isExpanded ? 'w-full' : ''}`}>
            <div className={`relative ${isExpanded ? 'w-full max-w-[700px]' : 'w-[400px]'} transition-all duration-300`}>
              <input
                placeholder="Search in Etomart..."
                data-test-id="SearchInput"
                className="w-full rounded-full border border-gray-300 py-2 pl-12 pr-10 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                style={{ height: '40px' }}
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={handleExpandNavbar}
              />
              <Search
                size={20}
                className={`absolute right-4 top-1/2 -translate-y-1/2 text-orange-500${isExpanded ? 'hidden' : ''}`}
              />
              <Search
                size={20}
                className={`absolute left-4 top-1/2 -translate-y-1/2 text-orange-500${!isExpanded ? 'hidden' : ''}`} />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
            <div className="cursor-pointer xl:hidden" onClick={() => setNav(!nav)}>
              {nav ? <CgClose size={30} /> : <CgMenuRound size={30} />}
            </div>
          </div>
          {isExpanded && (
            <button
              className="ml-4 rounded-full p-1 text-gray-500 hover:text-black focus:outline-none"
              onClick={handleCollapseNavbar}
            >
              <X size={20} />
            </button>
          )}
        </div>
      </nav>
      {isExpanded && (
        <>
          <div className="relative z-40 bg-white shadow-md">
            <div className="mx-auto max-h-[calc(100vh-5rem)] max-w-7xl overflow-y-auto p-4">
              <div className="mb-8">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold">Stores, Restaurants and Pharmacies</h2>
                  <button className="text-[#ee9613] hover:underline">See all</button>
                </div>
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {searchResults.stores.slice(0, 4).map((store, index) => (
                    <div key={index}>{renderStoreCard(store)}</div>
                  ))}
                </div>
              </div>
              <div className="">
              <h2 className="py-2 text-xl font-bold">Found what you are looking for?</h2>
                <div className="mb-8">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Food</h2>
                    <button className="text-[#ee9613] hover:underline">See all</button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {searchResults.food.slice(0, 3).map((food, index) => (
                      <div key={index}>{renderFoodCard(food)}</div>
                    ))}
                  </div>
                </div>
                <div>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Products & Groceries</h2>
                    <button className="text-[#ee9613] hover:underline">See all</button>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {searchResults.product.slice(0, 3).map((product, index) => (
                      <div key={index}>{renderPharmacyCard(product)}</div>
                    ))}
                  </div>
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
          className="absolute right-0 top-24 z-20 w-56 rounded-lg bg-[#fdfdfd] shadow-lg transition-opacity duration-200"
          role="dialog"
          style={{ opacity: nav ? 1 : 0 }}
        >
          <div className="relative">
            <div className="absolute -top-2.5 right-3 z-20">
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