import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useRestaurantsStoresCards1, useRestaurants } from "./CardsDataWindhoekRSP/cardsDataRestaurants";
import Footer from "../../../../../04_Footer/Footer";
import KhomasOPNavBar from "../../../../02_OPNavBarRegions/KhomasOPNavBar/KhomasOPNavBar";
import { useIconsCategories } from "../cardsDataKhomasTowns/cardsDataKhomasTowns";
import 'react-lazy-load-image-component/src/effects/blur.css';

/**
 * Custom hook for measuring component performance
 * @param {string} name - The name of the component to measure
 */
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

/**
 * Restaurants component
 * @returns {JSX.Element} The Restaurants component
 */
function Restaurants() {
  usePerformanceMeasure('Restaurants');

  // State management
  const [state, setState] = useState({
    isLargeScreen: false,
    error: null,
    loading: true,
  });

  // Refs for carousel scrolling
  const iconsCategoriesCarouselRef = useRef(null);
  const restaurantsCarouselRef = useRef(null);

  // Use custom hooks to get data
  const iconCategories = useIconsCategories();
  const restaurantsStoresCards = useRestaurantsStoresCards1();
  const restaurants = useRestaurants();

  /**
   * Scroll the carousel to the left
   * @param {React.RefObject} carouselRef - Reference to the carousel element
   */
  const scrollLeft = useCallback((carouselRef) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  }, []);

  /**
   * Scroll the carousel to the right
   * @param {React.RefObject} carouselRef - Reference to the carousel element
   */
  const scrollRight = useCallback((carouselRef) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  }, []);

  /**
   * Truncate the middle of a string if it exceeds the maximum length
   * @param {string} str - The string to truncate
   * @param {number} maxLength - The maximum length of the string
   * @returns {string} The truncated string
   */
  const truncateMiddle = useCallback((str, maxLength) => {
    if (str.length <= maxLength) return str;
    const middleIndex = Math.floor(maxLength / 2);
    const start = str.substring(0, middleIndex);
    const end = str.substring(str.length - middleIndex);
    return `${start}...${end}`;
  }, []);

  // Effect for handling screen size changes
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

  // New implementation: Error handling and data loading simulation
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setState(prevState => ({ ...prevState, loading: false }));
      } catch (error) {
        setState(prevState => ({ ...prevState, error: 'Failed to load data', loading: false }));
      }
    };
    fetchData();
  }, []);

  /**
   * Render a carousel of items
   * @param {Array} items - The items to render in the carousel
   * @param {React.RefObject} scrollRef - Reference to the carousel element
   * @param {Function} itemRenderer - Function to render each item
   * @returns {JSX.Element} The rendered carousel
   */
  const renderCarousel = useCallback((items, scrollRef, itemRenderer) => (
    <div className="relative mt-8 sm:mt-12 md:mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent sm:w-12 md:w-16"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent sm:w-12 md:w-16"></div>
        <button
          className="absolute left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-[50px] bg-[#ee9613] p-1 sm:rounded-r-[100px] sm:p-2"
          onClick={() => scrollLeft(scrollRef)}
          aria-label="Scroll left"
        >
          &#9664;
        </button>
        <div
          ref={scrollRef}
          className="custom-scrollbar flex space-x-4 overflow-x-auto p-4 sm:p-6 md:p-8"
        >
          {items.map((item, index) => itemRenderer(item, index))}
        </div>
        <button
          className="absolute right-0 top-1/2 z-50 -translate-y-1/2 rounded-l-[50px] bg-[#ee9613] p-1 sm:rounded-l-[100px] sm:p-2"
          onClick={() => scrollRight(scrollRef)}
          aria-label="Scroll right"
        >
          &#9654;
        </button>
      </div>
    </div>
  ), [scrollLeft, scrollRight]);

  /**
   * Render a restaurant card
   * @param {Object} restaurant - The restaurant data
   * @param {number} index - The index of the restaurant
   * @returns {JSX.Element} The rendered restaurant card
   */
  const renderRestaurantCard = useCallback((restaurant, index) => (
    <div key={index} className="w-48 shrink-0 p-2 sm:w-56 md:w-64 lg:w-72">
      <a href={restaurant.href} className="block h-full rounded-lg bg-slate-50 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
          <LazyLoadImage
            src={restaurant.imgSrc}
            alt={restaurant.name}
            width="100%"
            height="100%"
            className="size-full object-cover"
            effect="opacity"
          />
        </div>
        <div className="p-3 sm:p-4">
          <p className="w-full truncate text-center text-sm font-bold sm:text-base">{restaurant.name}</p>
        </div>
      </a>
    </div>
  ), []);
  
  /**
   * Render a store card
   * @param {Object} category - The store category data
   * @param {number} index - The index of the store
   * @returns {JSX.Element} The rendered store card
   */
  const renderStoreCard = useCallback((category, index) => (
    <div
      key={index}
      className="xs:w-full flex w-full items-center justify-center p-2 sm:w-full md:w-1/2 lg:w-1/4"
    >
      <a href={category.href}
        className="xs:w-72 block w-64 rounded-lg bg-slate-50 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl sm:w-80 md:w-full lg:w-full"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
          <LazyLoadImage
            src={category.imgSrc}
            alt={category.name}
            width="100%"
            height="100%"
            className="size-full object-cover"
            effect="opacity"
          />
          {category.storetype && (
            <div className="absolute left-0 top-0 mr-2 mt-2 rounded-r-full bg-[#ee9613] px-2 py-1 text-xs text-black">
              {category.storetype}
            </div>
          )}
          {category.isEtomartStore && (
            <div className="absolute bottom-2 left-2 rounded bg-slate-100 px-2 py-1 text-xs text-black">
              <span className="text-black">Etomart</span>{" "}
              <span className="font-bold text-orange-500">'~'</span>
            </div>
          )}
        </div>
        <div className="xs:p-3 flex flex-col p-2 sm:p-4">
          <p className="w-full truncate text-center text-sm font-bold sm:text-base">{category.name}</p>
          <div className="mt-1 flex items-start text-xs sm:text-sm">
            <span className="font-bold text-[#ee9613]">{category.priceRange}</span>
            <span className="mx-1">•</span>
            <span>{category.cuisine}</span>
          </div>
          <div className="mt-1 text-left text-xs text-gray-500">{`Pickup: ${category.pickupTime}`}</div>
        </div>
      </a>
    </div>
  ), []);

  // Memoize the navigation tabs to prevent unnecessary re-renders
  const navigationTabs = useMemo(() => (
    <nav className="container mx-auto mt-4 px-4 sm:px-6 lg:px-8">
      <div
        className="border-white-A700_19 relative z-10 flex justify-center rounded-b-[50px] border border-solid bg-[#ee9613] p-4 shadow-xl sm:rounded-b-[100px] sm:p-6 md:rounded-b-[150px] md:p-10"
        style={{ width: "50%", maxWidth: "100vw", margin: "0 auto" }}
      >
        <div className="relative z-10 mb-0 flex w-full items-center justify-center">
          <div className="sc-6db52481-0 kZFPSm cb-elevated cb_elevation_elevationMedium_e16y">
            <div role="tablist" className="flex flex-wrap justify-center gap-2 space-x-2">
              
              <a  role="tab"
                aria-selected="false"
                className="mb-2 flex items-center gap-2 space-x-2 rounded-full bg-white px-3 py-2 text-sm shadow-md transition duration-150 hover:bg-orange-300 sm:mb-0 sm:px-4 sm:text-base"
                href="/LP/Khomas/Towns/Stores"
              >
                <svg viewBox="0 0 24 24" className="size-4 fill-current text-black sm:size-6">
                  <path fillRule="evenodd" clipRule="evenodd" d="M.646 0A.646.646 0 0 0 0 .646V4.5a3.5 3.5 0 0 0 6.25 2.165A3.494 3.494 0 0 0 9 8c1.116 0 2.11-.522 2.75-1.335a3.498 3.498 0 0 0 5.75-.362A3.5 3.5 0 0 0 24 4.5V.647A.646.646 0 0 0 23.354 0h-5.708a.647.647 0 0 0-.146.017.647.647 0 0 0-.146-.017H.646ZM2 2v2.5a1.5 1.5 0 1 0 3 0V2H2Zm17 0v2.5a1.5 1.5 0 0 0 3 0V2h-3Zm-6 2.5V2h3v2.5a1.5 1.5 0 0 1-3 0ZM7.5 2v2.5a1.5 1.5 0 1 0 3 0V2h-3Z" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M1 22V8.45a3.491 3.491 0 0 0 2 1.015V22h8V12h7.5v10H21V9.465a3.49 3.49 0 0 0 2-1.016V22a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2Zm12 0h3.5v-8H13v8Z" />
                  <path d="M5.5 12a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3Z" />
                </svg>
                <span className="text-black">Stores</span>
              </a>
              
              <a  role="tab"
                aria-selected="true"
                className="mb-2 flex items-center gap-2 space-x-2 rounded-full bg-orange-300 px-3 py-2 text-sm shadow-md transition duration-150 sm:mb-0 sm:px-4 sm:text-base"
                href="/LP/Khomas/Towns/Restaurants"
              >
              <svg viewBox="0 0 24 24" className="size-4 fill-current text-black sm:size-6">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10 1a1 1 0 112 0v5a4.009 4.009 0 01-2.667 3.772.5.5 0 00-.333.471V23a1 1 0 11-2 0V10.243a.5.5 0 00-.333-.471A4.009 4.009 0 014 6V1a1 1 0 112 0v5c0 .522.205 1.025.571 1.398A.251.251 0 007 7.223V1a1 1 0 112 0v6.225a.251.251 0 00.429.175c.367-.374.572-.877.571-1.4V1zM20.5.75a.75.75 0 00-.75-.75C17.418 0 15.064 6.055 15 13.243v.021c.004.686.563 1.24 1.25 1.236H18a.5.5 0 01.5.5v8a1 1 0 102 0V.75z" />
                </svg>
                <span className="text-black">Restaurants</span>
              </a>
              
              <a  role="tab"
                aria-selected="false"
                className="mb-2 flex items-center gap-2 space-x-2 rounded-full bg-white px-3 py-2 text-sm shadow-md transition duration-150 hover:bg-orange-300 sm:mb-0 sm:px-4 sm:text-base"
                href="/LP/Khomas/Towns/Pharmacies"
              >
                <svg viewBox="0 0 24 24" className="size-4 fill-current text-black sm:size-6">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9 2a1 1 0 0 0-1 1v1H4a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-4V3a1 1 0 0 0-1-1H9zm0 2h6v1H9V4zM4 7h16v12H4V7zm7 3a1 1 0 0 0-1 1v1H9a1 1 0 1 0 0 2h1v1a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1a1 1 0 0 0-1-1z" />
                </svg>
                <span className="text-black">Pharmacies</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  ), []);

  // New implementation: Loading and error states
  if (state.loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (state.error) {
    return <div className="flex h-screen items-center justify-center text-red-500">{state.error}</div>;
  }

  return (
    <div className="bg-white">
      <KhomasOPNavBar />
      <main className="relative z-10">
        {/* Navigation Tabs */}
        {navigationTabs}

        {/* Icon Categories Carousel */}
        {renderCarousel(iconCategories, iconsCategoriesCarouselRef, (category, index) => (
          <div key={index} className="shrink-0">
            <a href={category.href} className="block">
              <div className="flex w-16 flex-col items-center sm:w-20 md:w-24">
                <div className="flex size-10 items-center justify-center sm:size-12 md:size-14">
                  <LazyLoadImage
                    src={category.imgSrc}
                    alt={category.name}
                    className="h-full w-full object-cover"
                    effect="blur"
                  />
                </div>
                <p className="mt-1 w-full truncate text-center text-xs sm:text-sm">
                  {truncateMiddle(category.name, 20)}
                </p>
              </div>
            </a>
          </div>
        ))}

        {/* Restaurants Near Me Section */}
        <section className="container mx-auto mt-8 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:px-8">
          <div
            className="border-white-A700 relative rounded-r-[50px] border border-solid bg-[#ee9613] p-4 shadow-xl sm:rounded-r-[100px] sm:p-6 md:rounded-r-[150px] md:p-10"
            style={{ width: "50%", maxWidth: "1000px" }}
          >
            <h2 className="text-left font-Agbalumo text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl">
              Restaurants Near Me
            </h2>
          </div>
        </section>

        {/* Restaurants Carousel */}
        {renderCarousel(restaurants, restaurantsCarouselRef, renderRestaurantCard)}

        {/* All Restaurants Near Me Section */}
        <section className="container mx-auto mt-8 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:px-8">
          <div
            className="border-white-A700 relative rounded-r-[50px] border border-solid bg-[#ee9613] p-4 shadow-xl sm:rounded-r-[100px] sm:p-6 md:rounded-r-[150px] md:p-10"
            style={{ width: "60%", maxWidth: "1000px" }}
          >
            <h2 className="text-left font-Agbalumo text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl">
              All Restaurants Near Me
            </h2>
          </div>
        </section>

        {/* Restaurant Cards Container */}
<div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
  <div className="-mx-2 flex flex-wrap">
    {restaurantsStoresCards.map((category, index) => renderStoreCard(category, index))}
  </div>
</div>
      </main>
      
      <Footer />
    </div>
  );
}

Restaurants.propTypes = {
  // Add prop types here if needed
};

export default Restaurants;