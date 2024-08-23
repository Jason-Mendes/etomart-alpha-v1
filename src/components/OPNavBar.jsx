import React, { useEffect, useState, useMemo } from "react";
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

  const storesCards = useMemo(
    () => [
      {
        name: "Checkers",
        imgSrc: "/images/supermarkets/checkers.png",
        href: "/LP/Khomas/Towns/Store/Checkers",
        storetype: "Supermarket",
        isEtomartStore: false,
        priceRange: "N$$",
        cuisine: "Supermarket",
        pickupTime: "15–30 min",
        deliveryTime: false,
      },
      {
        name: "Shoprite",
        imgSrc: "/images/supermarkets/shoprite.png",
        href: "/en/discovery/category/shoprite",
        storetype: "Supermarket",
        isEtomartStore: false,
        priceRange: "N$$",
        cuisine: "Supermarket",
        pickupTime: "15–30 min",
        deliveryTime: false,
      },
      {
        name: "Pick n Pay",
        imgSrc: "/images/supermarkets/picknpay.png",
        href: "/en/discovery/category/picknpay",
        storetype: "Supermarket",
        isEtomartStore: true,
        priceRange: "N$$",
        cuisine: "Supermarket",
        pickupTime: "15–30 min",
        deliveryTime: false,
      },
      {
        name: "Spar",
        imgSrc: "/images/supermarkets/spar.png",
        href: "/en/discovery/category/spar",
        storetype: "Supermarket",
        isEtomartStore: true,
        priceRange: "N$$",
        cuisine: "Supermarket",
        pickupTime: "15–30 min",
        deliveryTime: false,
      },
    ],
    []
  );

  const restaurantCards = useMemo(() => [
    {
      name: "Vennes",
      imgSrc: "/images/restaurants/v.png",
      href: "/en/stores/vennes-cafe/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€€€",
      cuisine: "Cafe",
      description: "Tasty burger with tomato cheese and onions",
      pickupTime: "10–30 min",
      deliveryTime: true,
    },
    {
      name: "Istanbul Kebab House",
      imgSrc: "/images/restaurants/i.png",
      href: "/en/stores/istanbul-kebab-house/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€€€",
      cuisine: "Kebab",
      description: "Tasty burger with tomato cheese and onions",
      pickupTime: "20–40 min",
      deliveryTime: true,
    },
    {
      name: "Teater Kvarteret Barista",
      imgSrc: "/images/restaurants/t.png",
      href: "/en/stores/teater-kvarteret-barista/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€€€",
      cuisine: "Coffee",
      description: "Tasty burger with tomato cheese and onions",
      pickupTime: "15–35 min",
      deliveryTime: false,
    },
    {
      name: "Istanbul Kebab House",
      imgSrc: "/images/restaurants/i.png",
      href: "/en/stores/istanbul-kebab-house/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€€€",
      cuisine: "Kebab",
      description: "Tasty burger with tomato cheese and onions",
      pickupTime: "20–40 min",
      deliveryTime: true,
    },
    {
      name: "Teater Kvarteret Barista",
      imgSrc: "/images/restaurants/t.png",
      href: "/en/stores/teater-kvarteret-barista/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€€€",
      cuisine: "Coffee",
      description: "Tasty burger with tomato cheese and onions",
      pickupTime: "15–35 min",
      deliveryTime: false,
    }
  ], []);

  const productCards = useMemo(() => [
    {
      name: "Aspirin",
      imgSrc: "/images/pharmacies/a.png",
      href: "/en/stores/aspirin/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€",
      category: "Pain Relief",
      description:
        "Effective pain reliever for headaches, muscle pain, and minor arthritis. Trusted relief you can count on.",
      pickupTime: "10–30 min",
      deliveryTime: true,
    },
    {
      name: "Tomatoes",
      imgSrc: "/images/supermarkets/tomatoes.png",
      href: "/en/stores/tomatoes/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€",
      cuisine: "Produce",
      description: "A bag of fresh tomatoes",
      pickupTime: "10–30 min",
      deliveryTime: true,
    },
    {
      name: "Ibuprofen",
      imgSrc: "/images/pharmacies/Ibuprofen.png",
      href: "/en/stores/ibuprofen/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€",
      category: "Anti-inflammatory",
      description:
        "Powerful anti-inflammatory medication for reducing pain and swelling. Ideal for back pain, toothaches, and menstrual cramps.",
      pickupTime: "20–40 min",
      deliveryTime: true,
    },
    {
      name: "Acetaminophen",
      imgSrc: "/images/pharmacies/Acetaminophen.png",
      href: "/en/stores/acetaminophen/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€",
      category: "Pain Relief",
      description:
        "Safe and effective pain reliever and fever reducer. Perfect for all ages and common ailments.",
      pickupTime: "15–35 min",
      deliveryTime: false,
    },
    {
      name: "Milk",
      imgSrc: "/images/supermarkets/milk.png",
      href: "/en/stores/milk/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€",
      cuisine: "Dairy",
      description: "1 liter of whole milk",
      pickupTime: "20–40 min",
      deliveryTime: true,
    },
    {
      name: "Eggs",
      imgSrc: "/images/supermarkets/eggs.png",
      href: "/en/stores/eggs/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€",
      cuisine: "Dairy",
      description: "A dozen large eggs",
      pickupTime: "15–35 min",
      deliveryTime: false,
    },
    {
      name: "Chicken Breast",
      imgSrc: "/images/supermarkets/chicken-breast.png",
      href: "/en/stores/chicken-breast/",
      discount: 20,
      isEtomartStore: false,
      priceRange: "€€",
      cuisine: "Meat",
      description: "1 kg of fresh chicken breast",
      pickupTime: "20–40 min",
      deliveryTime: true,
    },
    {
      name: "Apples",
      imgSrc: "/images/supermarkets/apples.png",
      href: "/en/stores/apples/",
      discount: 10,
      isEtomartStore: false,
      priceRange: "€",
      cuisine: "Produce",
      description: "A bag of fresh apples",
      pickupTime: "10–30 min",
      deliveryTime: true,
    },
    {
      name: "Butter",
      imgSrc: "/images/supermarkets/butter.png",
      href: "/en/stores/butter/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€",
      cuisine: "Dairy",
      description: "250g of unsalted butter",
      pickupTime: "15–35 min",
      deliveryTime: true,
    },
    {
      name: "Orange Juice",
      imgSrc: "/images/supermarkets/orange-juice.png",
      href: "/en/stores/orange-juice/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€",
      cuisine: "Beverages",
      description: "1 liter of fresh orange juice",
      pickupTime: "10–30 min",
      deliveryTime: true,
    },
    {
      name: "Cereal",
      imgSrc: "/images/supermarkets/cereal.png",
      href: "/en/stores/cereal/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€",
      cuisine: "Grocery",
      description: "500g box of breakfast cereal",
      pickupTime: "10–30 min",
      deliveryTime: true,
    },
    {
      name: "Rice",
      imgSrc: "/images/supermarkets/rice.png",
      href: "/en/stores/rice/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€",
      cuisine: "Grocery",
      description: "1 kg of long grain rice",
      pickupTime: "15–35 min",
      deliveryTime: true,
    },
    {
      name: "Tomatoes",
      imgSrc: "/images/supermarkets/tomatoes.png",
      href: "/en/stores/tomatoes/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€",
      cuisine: "Produce",
      description: "A bag of fresh tomatoes",
      pickupTime: "10–30 min",
      deliveryTime: true,
    },
    {
      name: "Antihistamines",
      imgSrc: "/images/pharmacies/Antihistamines.png",
      href: "/en/stores/antihistamines/",
      discount: 20,
      isEtomartStore: false,
      priceRange: "€",
      category: "Allergy Relief",
      description:
        "Relieve allergy symptoms such as runny nose, sneezing, and itchy eyes. Fast-acting and long-lasting.",
      pickupTime: "20–40 min",
      deliveryTime: true,
    },
  ], []);

  useEffect(() => {
    if (searchQuery) {
      const storeResults = storesCards.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.storetype.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const foodResults = restaurantCards.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const productResults = productCards.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults({ stores: storeResults, food: foodResults, product: productResults });
    } else {
      setSearchResults({ stores: [], food: [], product: [] });
    }
  }, [searchQuery, storesCards, restaurantCards, productCards]);
  

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

  const renderStoreCard = (store) => (
    <div className="flex-shrink-0 w-[230px] h-[160px]">
      <a href={store.href} className="block h-full rounded-lg bg-slate-50 shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200">
        <div className="relative h-[100px] w-full overflow-hidden rounded-t-lg">
          <img src={store.imgSrc} alt={store.name} className="w-full h-full object-cover" />
          <div data-testid="venue-storetype-label" className="absolute top-0 left-0 mt-2 mr-2 bg-[#ee9613] text-black text-xs px-2 py-2 rounded-tr-full rounded-br-full">{store.storetype}</div>
        </div>
        <div className="p-2 flex flex-col">
          <p className="text-sm font-bold truncate w-full">{store.name}</p>
          <div className="flex items-start mt-1 text-xs">
            <span className="text-[#ee9613] font-bold">{store.priceRange}</span>
            <span className="mx-1">•</span>
            <span>{store.cuisine}</span>
          </div>
          <div className="text-xs text-gray-500 text-left mt-1">Pickup: {store.pickupTime}</div>
        </div>
      </a>
    </div>
  );

  const renderFoodCard = (food) => (
    <a href={food.href} className="flex w-full h-[160px] rounded-lg bg-slate-50 shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200 overflow-hidden" data-test-id="food-card-link">
      <div className="relative w-1/3 overflow-hidden">
        <img src={food.imgSrc} alt={food.name} className="absolute top-0 left-0 w-full h-full object-cover" />
      </div>
      <div className="w-2/3 p-3 flex flex-col justify-between">
        <div>
          <h3 data-testid="food-name" className="font-bold text-sm mb-1 truncate">{food.name}</h3>
          <div className="flex items-center text-xs mb-1 text-gray-600">
            <span className="text-[#ee9613] font-semibold">{food.priceRange}</span>
            <span className="mx-2">•</span>
            <span className="truncate">{food.cuisine}</span>
          </div>
          <p className="text-xs text-gray-600 mb-1 line-clamp-2">{food.description}</p>
        </div>
        <div className="text-xs text-gray-500">Pickup: {food.pickupTime}</div>
        <div className="mt-auto">
          <div className="text-black text-xs py-1 rounded">
            <span className="text-black">Etomart </span>
            <span className={`text-[#${food.deliveryTime ? 'ee9613' : 'ee1313'}] font-bold`}>
              {food.deliveryTime ? 'Delivery Available' : 'Delivery Not Available'}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-2 bg-[#ee9613] text-white text-lg w-8 h-6 flex items-center justify-center rounded">+</div>
    </a>
  );

  
  const renderPharmacyCard = (product) => (
    <a href={product.href} className="flex w-full h-[160px] rounded-lg bg-slate-50 shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200 overflow-hidden" data-test-id="product-card-link">
      <div className="relative w-1/3 overflow-hidden">
        <img src={product.imgSrc} alt={product.name} className="absolute top-0 left-0 w-full h-full object-cover" />
      </div>
      <div className="w-2/3 p-3 flex flex-col justify-between">
        <div>
          <h3 data-testid="product-name" className="font-bold text-sm mb-1 truncate">{product.name}</h3>
          <div className="flex items-center text-xs mb-1 text-gray-600">
            <span className="text-[#ee9613] font-semibold">{product.priceRange}</span>
            <span className="mx-2">•</span>
            <span className="truncate">{product.category}</span>
          </div>
          <p className="text-xs text-gray-600 mb-1 line-clamp-2">{product.description}</p>
        </div>
        <div className="text-xs text-gray-500">Pickup: {product.pickupTime}</div>
        <div className="mt-auto">
          <div className="text-black text-xs py-1 rounded">
            <span className="text-black">Etomart </span>
            <span className={`text-[#${product.deliveryTime ? 'ee9613' : 'ee1313'}] font-bold`}>
              {product.deliveryTime ? 'Delivery Available' : 'Delivery Not Available'}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute top-2 right-2 bg-[#ee9613] text-white text-lg w-8 h-6 flex items-center justify-center rounded">+</div>
    </a>
  );

  
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
            <div className={`relative ${isExpanded ? 'w-full max-w-[700px]' : 'w-[400px]'} transition-all duration-300`}>
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
                  <h2 className="text-xl font-bold">Stores, Restaurants and Pharmacies</h2>
                  <button className="text-[#ee9613] hover:underline">See all</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {searchResults.stores.slice(0, 4).map((store, index) => (
                    <div key={index}>{renderStoreCard(store)}</div>
                  ))}
                </div>
              </div>
              <div className="">
              <h2 className="text-xl font-bold py-2">Found what you are looking for?</h2>
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Food</h2>
                    <button className="text-[#ee9613] hover:underline">See all</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    {searchResults.food.slice(0, 3).map((food, index) => (
                      <div key={index}>{renderFoodCard(food)}</div>
                    ))}
                  </div>
                </div>
                <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Products & Groceries</h2>
                    <button className="text-[#ee9613] hover:underline">See all</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    {searchResults.product.slice(0, 3).map((product, index) => (
                      <div key={index}>{renderPharmacyCard(product)}</div>
                    ))}
                  </div>
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