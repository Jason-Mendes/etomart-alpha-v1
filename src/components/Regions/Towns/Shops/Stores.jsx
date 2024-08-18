import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import PropTypes from 'prop-types';
import Footer from "../../../Footer";
import OPNavBar from "../../../OPNavBar";
import 'react-lazy-load-image-component/src/effects/blur.css';

// Performance benchmarking
const usePerformanceMeasure = (name) => {
  useEffect(() => {
    performance.mark(`${name}-start`);
    return () => {
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      console.log(performance.getEntriesByName(name));
    };
  }, [name]);
};

function Stores() {
  usePerformanceMeasure('Stores');

  // Combined state
  const [state, setState] = useState({
    isLargeScreen: false,
  });

  // Refs for carousels
  const iconscategoriescarouselscroll = useRef(null);
  const storescards1scroll = useRef(null);
  const supermarketsscroll = useRef(null);

  // Icon categories with their respective links and images
  const iconscategories = useMemo(() => [
    {
      name: "Grocery",
      imgSrc: "/images/websiteicons/grocery.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "Bakery",
      imgSrc: "/images/websiteicons/bakery.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "Healthy",
      imgSrc: "/images/websiteicons/healthy-food.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "Desserts",
      imgSrc: "/images/websiteicons/desserts.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "Fruits & Vegetables",
      imgSrc: "/images/websiteicons/fruit-and-vegetables.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "Dairy & Eggs",
      imgSrc: "/images/websiteicons/dairy-and-eggs.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "Meat",
      imgSrc: "/images/websiteicons/meat.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "Seafood",
      imgSrc: "/images/websiteicons/seafood.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "Beverages",
      imgSrc: "/images/websiteicons/beverages.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "Snacks & Sweets",
      imgSrc: "/images/websiteicons/snacks-and-sweets.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "Household Essentials",
      imgSrc: "/images/websiteicons/household-essentials.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "Pharmaceuticals",
      imgSrc: "/images/websiteicons/pharmaceuticals.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "Baby",
      imgSrc: "/images/websiteicons/baby.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "Pet Supplies",
      imgSrc: "/images/websiteicons/pet-food.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "Frozen Foods",
      imgSrc: "/images/websiteicons/frozen-food.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "Fast Food",
      imgSrc: "/images/websiteicons/fast-food.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "Restaurant",
      imgSrc: "/images/websiteicons/restaurant.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "International Foods",
      imgSrc: "/images/websiteicons/international-food.png",
      href: "/en/discovery/category/grocery",
    },
    {
      name: "Alcohol",
      imgSrc: "/images/websiteicons/alcohol.png",
      href: "/en/discovery/category/grocery",
    },
  ], []);

  // List of store cards with details
  const storescards1 = useMemo(() => [
    {
      name: "Checkers",
      imgSrc: "/images/supermarkets/checkers.png",
      href: "/en/discovery/category/checkers",
      discount: 10,
      isEtomartStore: false,
      priceRange: "N$$",
      cuisine: "Supermarket",
      pickupTime: "15–30 min",
    },
    {
      name: "Shoprite",
      imgSrc: "/images/supermarkets/shoprite.png",
      href: "/en/discovery/category/shoprite",
      discount: 5,
      isEtomartStore: false,
      priceRange: "N$",
      cuisine: "Supermarket",
      pickupTime: "10–25 min",
    },
    {
      name: "Pick n Pay",
      imgSrc: "/images/supermarkets/picknpay.png",
      href: "/en/discovery/category/picknpay",
      discount: 15,
      isEtomartStore: true,
      priceRange: "N$$",
      cuisine: "Supermarket",
      pickupTime: "20–35 min",
    },
    {
      name: "Spar",
      imgSrc: "/images/supermarkets/spar.png",
      href: "/en/discovery/category/spar",
      discount: 10,
      isEtomartStore: false,
      priceRange: "N$$",
      cuisine: "Supermarket",
      pickupTime: "15–30 min",
    },
    {
      name: "Woermann Brock",
      imgSrc: "/images/supermarkets/woermannbrock.png",
      href: "/en/discovery/category/woermannbrock",
      discount: 5,
      isEtomartStore: false,
      priceRange: "N$",
      cuisine: "Supermarket",
      pickupTime: "10–25 min",
    },
    {
      name: "OK Foods",
      imgSrc: "/images/supermarkets/okfoods.png",
      href: "/en/discovery/category/okfoods",
      discount: 10,
      isEtomartStore: false,
      priceRange: "N$$",
      cuisine: "Supermarket",
      pickupTime: "15–30 min",
    },
    {
      name: "Choppies",
      imgSrc: "/images/supermarkets/choppies.png",
      href: "/en/discovery/category/choppies",
      discount: 5,
      isEtomartStore: false,
      priceRange: "N$",
      cuisine: "Supermarket",
      pickupTime: "10–25 min",
    },
    {
      name: "Food Lover's Market",
      imgSrc: "/images/supermarkets/foodlovers.png",
      href: "/en/discovery/category/foodloversmarket",
      discount: 15,
      isEtomartStore: true,
      priceRange: "N$$",
      cuisine: "Supermarket",
      pickupTime: "20–35 min",
    },
    {
      name: "Metro",
      imgSrc: "/images/supermarkets/metro.png",
      href: "/en/discovery/category/metro",
      discount: 10,
      isEtomartStore: false,
      priceRange: "N$$",
      cuisine: "Supermarket",
      pickupTime: "15–30 min",
    },
  ], []);

  // List of supermarkets
  const supermarkets = useMemo(() => [
    {
      name: "Checkers",
      imgSrc: "/images/supermarkets/checkers.png",
      href: "/en/discovery/category/checkers",
    },
    {
      name: "Shoprite",
      imgSrc: "/images/supermarkets/shoprite.png",
      href: "/en/discovery/category/shoprite",
    },
    {
      name: "Pick n Pay",
      imgSrc: "/images/supermarkets/picknpay.png",
      href: "/en/discovery/category/picknpay",
    },
    {
      name: "Spar",
      imgSrc: "/images/supermarkets/spar.png",
      href: "/en/discovery/category/spar",
    },
    {
      name: "Woermann Brock",
      imgSrc: "/images/supermarkets/woermannbrock.png",
      href: "/en/discovery/category/woermannbrock",
    },
    {
      name: "OK Foods",
      imgSrc: "/images/supermarkets/okfoods.png",
      href: "/en/discovery/category/okfoods",
    },
    {
      name: "Choppies",
      imgSrc: "/images/supermarkets/choppies.png",
      href: "/en/discovery/category/choppies",
    },
    {
      name: "Food Lover's Market",
      imgSrc: "/images/supermarkets/foodlovers.png",
      href: "/en/discovery/category/foodloversmarket",
    },
    {
      name: "Metro",
      imgSrc: "/images/supermarkets/metro.png",
      href: "/en/discovery/category/metro",
    },
  ], []);

  // Callbacks
  const scrollLeft = useCallback((carouselRef) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  }, []);

  const scrollRight = useCallback((carouselRef) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  }, []);

  const truncateMiddle = useCallback((str, maxLength) => {
    if (str.length <= maxLength) return str;
    const middleIndex = Math.floor(maxLength / 2);
    const start = str.substring(0, middleIndex);
    const end = str.substring(str.length - middleIndex);
    return `${start}...${end}`;
  }, []);

  // Effects
  useEffect(() => {
    const handleResize = () => {
      setState((prevState) => ({
        ...prevState,
        isLargeScreen: window.innerWidth >= 640,
      }));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Carousel Component
const renderCarousel = useCallback((items, scrollRef, scrollLeft, scrollRight) => (
  <div className="relative mt-4 sm:mt-6 md:mt-8">
    <div className="container mx-auto px-2 sm:px-4 lg:px-6">
      <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-8 md:w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-8 md:w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] p-1 rounded-br-[25px] rounded-tr-[25px] sm:rounded-br-[50px] sm:rounded-tr-[50px] z-20"
        onClick={() => scrollLeft(scrollRef)}
        aria-label="Scroll left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div
        ref={scrollRef}
        className="flex overflow-x-auto custom-scrollbar space-x-2 sm:space-x-4 p-2 sm:p-4"
      >
        {items.map((item, index) => (
          <div key={index} className="flex-shrink-0 w-48 xs:w-56 sm:w-64 md:w-72 lg:w-80 p-1 sm:p-2">
            <a href={item.href} className="block h-full w-full rounded-lg bg-slate-50 shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200">
              <div className="relative h-28 xs:h-32 sm:h-36 md:h-40 lg:h-44 w-full overflow-hidden rounded-t-lg">
                <LazyLoadImage
                  src={item.imgSrc}
                  alt={item.name}
                  className="w-full h-full object-fill"
                />
              </div>
              <div className="p-2 sm:p-3 flex flex-col">
                <p className="text-center font-bold truncate w-full text-sm sm:text-base">{item.name}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] p-1 rounded-bl-[25px] rounded-tl-[25px] sm:rounded-bl-[50px] sm:rounded-tl-[50px] z-20"
        onClick={() => scrollRight(scrollRef)}
        aria-label="Scroll right"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6 text-white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
), []);

// Store Card Component
const renderStoreCard = useCallback((category, index) => (
  <div
    key={index}
    className="flex items-center justify-center w-full xs:w-full sm:w-full md:w-1/2 lg:w-1/4 p-2"
  >
    <a
      href={category.href}
      className="block w-64 xs:w-72 sm:w-80 md:w-full lg:w-full rounded-lg bg-slate-50 shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
    >
      <div className="relative h-32 xs:h-36 sm:h-40 md:h-48 lg:h-56 w-full overflow-hidden rounded-t-lg">
        <LazyLoadImage
          src={category.imgSrc}
          alt={category.name}
          className="w-full h-full object-fill"
        />
        {category.isEtomartStore && (
          <div className="absolute bottom-2 left-2 bg-slate-100 text-black text-xs px-2 py-1 rounded">
            <span className="text-black">Etomart</span>{" "}
            <span className="text-orange-500 font-bold">'~'</span>
          </div>
        )}
      </div>
      <div className="p-2 xs:p-3 sm:p-4 flex flex-col">
        <p className="text-center font-bold truncate w-full text-sm sm:text-base">{category.name}</p>
        <div className="flex items-start mt-1 text-xs sm:text-sm">
          <span className="text-[#ee9613] font-bold">{category.priceRange}</span>
          <span className="mx-1">•</span>
          <span>{category.cuisine}</span>
        </div>
        <div className="text-xs text-gray-500 text-left mt-1">{`Pickup: ${category.pickupTime}`}</div>
        <div className="text-xs text-left mt-1">
          <span className="text-black">Etomart </span>
          {category.deliveryTime ? (
            <span className="text-[#ee9613] font-bold">Delivery Available</span>
          ) : (
            <span className="text-[#ee1313] font-bold">Delivery Not Available</span>
          )}
        </div>
      </div>
    </a>
  </div>
), []);
  return (
    <div className="bg-white">
      <OPNavBar />
      <main className="relative z-10">
        {/* Navigation Tabs */}
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div
            className="relative z-10 flex justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[50px] sm:rounded-bl-[100px] md:rounded-bl-[150px] rounded-br-[50px] sm:rounded-br-[100px] md:rounded-br-[150px] shadow-xl p-4 sm:p-6 md:p-10"
            style={{ width: "50%", maxWidth: "100vw", margin: "0 auto" }}
          >
            <div className="relative z-10 flex items-center justify-center w-full mb-0">
              <div className="sc-6db52481-0 kZFPSm cb-elevated cb_elevation_elevationMedium_e16y">
                <div role="tablist" className="flex space-x-2 gap-2">
                  
                  <a  role="tab"
                    aria-selected="true"
                    className="flex items-center space-x-2 gap-2 px-4 py-2 rounded-full shadow-md bg-orange-300 transition duration-150"
                    href="/LP/Khomas/Towns/Stores"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 fill-current text-Black"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M.646 0A.646.646 0 0 0 0 .646V4.5a3.5 3.5 0 0 0 6.25 2.165A3.494 3.494 0 0 0 9 8c1.116 0 2.11-.522 2.75-1.335a3.498 3.498 0 0 0 5.75-.362A3.5 3.5 0 0 0 24 4.5V.647A.646.646 0 0 0 23.354 0h-5.708a.647.647 0 0 0-.146.017.647.647 0 0 0-.146-.017H.646ZM2 2v2.5a1.5 1.5 0 1 0 3 0V2H2Zm17 0v2.5a1.5 1.5 0 0 0 3 0V2h-3Zm-6 2.5V2h3v2.5a1.5 1.5 0 0 1-3 0ZM7.5 2v2.5a1.5 1.5 0 1 0 3 0V2h-3Z"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1 22V8.45a3.491 3.491 0 0 0 2 1.015V22h8V12h7.5v10H21V9.465a3.49 3.49 0 0 0 2-1.016V22a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2Zm12 0h3.5v-8H13v8Z"
                      />
                      <path d="M5.5 12a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3Z" />
                    </svg>
                    <span className="text-black">Stores</span>
                  </a>
                  
                  <a  role="tab"
                    aria-selected="false"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md transition-all hover:bg-orange-300 duration-150"
                    href="/LP/Khomas/Towns/Restaurants"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 fill-current text-black"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 1a1 1 0 112 0v5a4.009 4.009 0 01-2.667 3.772.5.5 0 00-.333.471V23a1 1 0 11-2 0V10.243a.5.5 0 00-.333-.471A4.009 4.009 0 014 6V1a1 1 0 112 0v5c0 .522.205 1.025.571 1.398A.251.251 0 007 7.223V1a1 1 0 112 0v6.225a.251.251 0 00.429.175c.367-.374.572-.877.571-1.4V1zM20.5.75a.75.75 0 00-.75-.75C17.418 0 15.064 6.055 15 13.243v.021c.004.686.563 1.24 1.25 1.236H18a.5.5 0 01.5.5v8a1 1 0 102 0V.75z"
                      />
                    </svg>
                    <span className="text-black">Restaurants</span>
                  </a>
                  
                  <a  role="tab"
                    aria-selected="false"
                    className="flex items-center space-x-2 gap-2 px-4 py-2 rounded-full shadow-md bg-white hover:bg-orange-300 transition duration-150"
                    href="/LP/Khomas/Towns/Pharmacies"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 fill-current text-black"
                    >
                       <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 2a1 1 0 0 0-1 1v1H4a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-4V3a1 1 0 0 0-1-1H9zm0 2h6v1H9V4zM4 7h16v12H4V7zm7 3a1 1 0 0 0-1 1v1H9a1 1 0 1 0 0 2h1v1a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1a1 1 0 0 0-1-1z"
                      />
                    </svg>
                    <span className="text-black">Pharmacies</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Icon Categories Carousel */}
        <div className="relative mt-8 sm:mt-12 md:mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] p-1 sm:p-2 rounded-br-[50px] rounded-tr-[50px] sm:rounded-br-[100px] sm:rounded-tr-[100px] z-20"
              onClick={() => scrollLeft(iconscategoriescarouselscroll)}
              aria-label="Scroll left"
            >
              &#9664;
            </button>
            <div
              ref={iconscategoriescarouselscroll}
              className="flex overflow-x-auto custom-scrollbar space-x-4 p-4 sm:p-6 md:p-8"
            >
              {iconscategories.map((category, index) => (
                <div key={index} className="flex-shrink-0">
                  <a href={category.href} className="block">
                    <div className="flex flex-col items-center w-16 sm:w-20 md:w-24">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center">
                        <img
                          src={category.imgSrc}
                          alt={category.name}
                          className="w-full h-full object-fill"
                        />
                      </div>
                      <p className="text-center text-xs sm:text-sm mt-1 truncate w-full">
                        {category.name}
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] p-1 sm:p-2 rounded-bl-[50px] rounded-tl-[50px] sm:rounded-bl-[100px] sm:rounded-tl-[100px] z-20"
              onClick={() => scrollRight(iconscategoriescarouselscroll)}
              aria-label="Scroll right"
            >
              &#9654;
            </button>
          </div>
        </div>

        {/* Supermarkets Near Me Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 md:mt-16">
          <div
            className="bg-[#ee9613] border border-solid border-white-A700 rounded-tr-[50px] rounded-br-[50px] sm:rounded-tr-[100px] sm:rounded-br-[100px] md:rounded-tr-[150px] md:rounded-br-[150px] shadow-xl relative p-4 sm:p-6 md:p-10"
            style={{ width: "50%", maxWidth: "1000px" }}
          >
            <h2 className="text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black font-bold font-Agbalumo">
              Supermarkets Near Me
            </h2>
          </div>
        </section>

        {/* Supermarkets Carousel */}
        
        {renderCarousel(supermarkets, supermarketsscroll, renderStoreCard)}

        {/* Supermarkets All Near Me Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 md:mt-16">
          <div
            className="bg-[#ee9613] border border-solid border-white-A700 rounded-tr-[50px] rounded-br-[50px] sm:rounded-tr-[100px] sm:rounded-br-[100px] md:rounded-tr-[150px] md:rounded-br-[150px] shadow-xl relative p-4 sm:p-6 md:p-10"
            style={{ width: "60%", maxWidth: "1000px" }}
          >
            <h2 className="text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black font-bold font-Agbalumo">
              Supermarkets All Near Me
            </h2>
          </div>
        </section>

        {/* Store Cards Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex flex-wrap -mx-2">
            {storescards1.map((category, index) => renderStoreCard(category, index))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

Stores.propTypes = {
  // Add prop types here if needed
};

export default Stores;
