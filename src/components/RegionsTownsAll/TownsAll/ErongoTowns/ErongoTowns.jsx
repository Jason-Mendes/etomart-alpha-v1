import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PropTypes from 'prop-types';
import { useIconsCategories, useCategoriesCards, useStoresCards1, useStoresCards2, useSupermarkets, useRestaurants, usePharmacies, useCards, useAboutUs } from "./cardsDataErongoTowns/cardsDataErongoTowns";
import Footer from "../../../Footer";
import KhomasOPNavBar from "../../../OPNavBarRegions/KhomasOPNavBar/KhomasOPNavBar";

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

function ErongoTowns() {
  usePerformanceMeasure('ErongoTowns');

  // Combined state
  const [state, setState] = useState({
    currentIndex: 0,
    isPaused: false,
    currentIndexau: 0,
    isPausedau: false,
    isLargeScreen: false,
  });

  // Refs for carousels
  const iconscategoriescarouselscroll = useRef(null);
  const categoriescardsscroll = useRef(null);
  const storescards1scroll = useRef(null);
  const storescards2scroll = useRef(null);
  const supermarketsscroll = useRef(null);
  const restaurantsscroll = useRef(null);
  const pharmaciesscroll = useRef(null);
  const containerRefau = useRef(null);
  const containerRef = useRef(null);


  // Use custom hooks to get data
  const iconscategories = useIconsCategories();
  const categoriescards = useCategoriesCards();
  const storescards1 = useStoresCards1();
  const storescards2 = useStoresCards2();
  const supermarkets = useSupermarkets();
  const restaurants = useRestaurants();
  const pharmacies = usePharmacies();
  const cards = useCards();
  const aboutus = useAboutUs();

  // Create extended arrays
  const extendedCards = useMemo(() => [...cards, ...cards, ...cards], [cards]);
  const extendedAboutus = useMemo(() => [...aboutus, ...aboutus, ...aboutus], [aboutus]);

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

  const handleNext = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      currentIndex: (prevState.currentIndex + 1) % extendedCards.length,
    }));
  }, [extendedCards.length]);

  const handlePrev = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      currentIndex: (prevState.currentIndex - 1 + extendedCards.length) % extendedCards.length,
    }));
  }, [extendedCards.length]);
  
  const pauseScroll = useCallback(() => {
    setState((prevState) => ({ ...prevState, isPaused: true }));
    setTimeout(() => {
      setState((prevState) => ({ ...prevState, isPaused: false }));
    }, 5000);
  }, []);


  //both about and cards carousel
  const handleTransitionEnd = useCallback(() => {
    setState((prevState) => {
      let newState = { ...prevState };
  
      if (prevState.currentIndex >= extendedCards.length - cards.length) {
        newState.currentIndex = cards.length;
      } else if (prevState.currentIndex <= 0) {
        newState.currentIndex = extendedCards.length - 2 * cards.length;
      }
  
      if (prevState.currentIndexau >= extendedAboutus.length - aboutus.length) {
        newState.currentIndexau = aboutus.length;
      } else if (prevState.currentIndexau <= 0) {
        newState.currentIndexau = extendedAboutus.length - 2 * aboutus.length;
      }
  
      return newState;
    });
  }, [cards.length, extendedCards.length, aboutus.length, extendedAboutus.length]);

  const handleDotClick = useCallback((index) => {
    setState((prevState) => {
      const currentPosition = prevState.currentIndex % cards.length;
      const targetPosition = index;
      const diff = targetPosition - currentPosition;
      const newIndex = diff < 0 ? prevState.currentIndex + diff + cards.length : prevState.currentIndex + diff;
      return { ...prevState, currentIndex: newIndex };
    });
  }, [cards.length]);


  //about us

  const handleNextau = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      currentIndexau: (prevState.currentIndexau + 1) % extendedAboutus.length,
    }));
  }, [extendedAboutus.length]);
  
  const handlePrevau = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      currentIndexau: (prevState.currentIndexau - 1 + extendedAboutus.length) % extendedAboutus.length,
    }));
  }, [extendedAboutus.length]);
  
  const handleDotClickau = useCallback((index) => {
    setState((prevState) => {
      const currentPosition = prevState.currentIndexau % aboutus.length;
      const targetPosition = index;
      const diff = targetPosition - currentPosition;
      const newIndex = diff < 0 ? prevState.currentIndexau + diff + aboutus.length : prevState.currentIndexau + diff;
      return { ...prevState, currentIndexau: newIndex };
    });
  }, [aboutus.length]);

  // Effects
  useEffect(() => {
    let interval;
    if (!state.isPausedau) {
      interval = setInterval(handleNextau, 5000);
    }
    return () => clearInterval(interval);
  }, [state.isPausedau, handleNextau]);

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

  // Render functions
  const renderCarousel = useCallback((items, scrollRef, itemRenderer) => (
    <div className="relative mt-8 sm:mt-12 md:mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent sm:w-12 md:w-16"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent sm:w-12 md:w-16"></div>
        <button
          className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-r-[50px] bg-[#ee9613] p-1 sm:rounded-r-[100px] sm:p-2"
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
          className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-l-[50px] bg-[#ee9613] p-1 sm:rounded-l-[100px] sm:p-2"
          onClick={() => scrollRight(scrollRef)}
          aria-label="Scroll right"
        >
          &#9654;
        </button>
      </div>
    </div>
  ), [scrollLeft, scrollRight]);

  const renderStoreCard = useCallback((category, index) => (
    
    <div
    key={index}
    className="h-72 w-48 shrink-0 sm:h-80 sm:w-56 md:h-96 md:w-64"
  >
    <a href={category.href}
      className="block h-full rounded-lg bg-slate-50 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl"
    >
      <div className="relative h-40 w-full overflow-hidden rounded-t-lg sm:h-52 md:h-64 lg:h-64">
  
          <img
            src={category.imgSrc}
            alt={category.name}
            className="size-full object-fill" // Ensure image fits the card properly
          />
          {category.storetype && (
            <div data-testid="venue-storetype-label" className="absolute left-0 top-0 mr-2 mt-2 rounded-r-full bg-[#ee9613] p-2 text-xs text-black">
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
        <div className="flex flex-col p-3">
          <p className="w-full truncate text-center font-bold">{category.name}</p>
          <div className="mt-1 flex items-start text-sm">
            <span className="font-bold text-[#ee9613]">{category.priceRange}</span>
            <span className="mx-1">•</span>
            <span>{category.cuisine}</span>
          </div>
          <div className="mt-1 text-left text-xs text-gray-500">{`Pickup: ${category.pickupTime}`}</div>
          <div className="mt-1 text-left text-xs">
            <span className="text-black">Etomart </span>
            {category.deliveryTime ? (
              <span className="font-bold text-[#ee9613]">Delivery Available</span>
            ) : (
              <span className="font-bold text-[#ee1313]">Delivery Not Available</span>
            )}
          </div>
        </div>
      </a>
    </div>
  ), [truncateMiddle]);


  return (
    <div className="bg-white">
      <KhomasOPNavBar />
      <main className="relative z-10">
        {/* Navigation Tabs */}
        <nav className="container mx-auto mt-4 px-4 sm:px-6 lg:px-8">
          <div
            className="border-white-A700_19 relative z-10 flex justify-center rounded-b-[50px] border border-solid bg-[#ee9613] p-4 shadow-xl sm:rounded-b-[100px] sm:p-6 md:rounded-b-[150px] md:p-10"
            style={{ width: "50%", maxWidth: "100vw", margin: "0 auto" }}
          >
            <div className="relative z-10 mb-0 flex w-full items-center justify-center">
              <div className="sc-6db52481-0 kZFPSm cb-elevated cb_elevation_elevationMedium_e16y">
                <div role="tablist" className="flex flex-wrap justify-center gap-2 space-x-2">
                  
                   <a role="tab"
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
                  <a
                  
                    role="tab"
                    aria-selected="false"
                    className="mb-2 flex items-center gap-2 space-x-2 rounded-full bg-white px-3 py-2 text-sm shadow-md transition duration-150 hover:bg-orange-300 sm:mb-0 sm:px-4 sm:text-base"
                    href="/LP/Khomas/Towns/Restaurants"
                  >
                    <svg viewBox="0 0 24 24" className="size-4 fill-current text-black sm:size-6">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 1a1 1 0 112 0v5a4.009 4.009 0 01-2.667 3.772.5.5 0 00-.333.471V23a1 1 0 11-2 0V10.243a.5.5 0 00-.333-.471A4.009 4.009 0 014 6V1a1 1 0 112 0v5c0 .522.205 1.025.571 1.398A.251.251 0 007 7.223V1a1 1 0 112 0v6.225a.251.251 0 00.429.175c.367-.374.572-.877.571-1.4V1zM20.5.75a.75.75 0 00-.75-.75C17.418 0 15.064 6.055 15 13.243v.021c.004.686.563 1.24 1.25 1.236H18a.5.5 0 01.5.5v8a1 1 0 102 0V.75z" />
                    </svg>
                    <span className="text-black">Restaurants</span>
                    </a>
                  <a
                  
                    role="tab"
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

        {/* Icon Categories Carousel */}
        {renderCarousel(iconscategories, iconscategoriescarouselscroll, (category, index) => (
          <div key={index} className="shrink-0">
            <a href={category.href} className="block">
              <div className="flex w-16 flex-col items-center sm:w-20 md:w-24">
                <div className="flex size-10 items-center justify-center sm:size-12 md:size-14">
                  {category.imgSrc ? (
                    <LazyLoadImage
                      src={category.imgSrc}
                      alt={category.name}
                      className="size-full object-cover"
                      effect="blur"
                    />
                  ) : (
                    <span className="text-xs text-black sm:text-sm">{category.name}</span>
                  )}
                </div>
                <div className="mt-1 w-full sm:mt-2">
                  <p className="truncate text-center text-xs sm:text-sm">
                    {truncateMiddle(category.name, 20)}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}

        {/* What to shop For? section */}
        <section className="container mx-auto mt-8 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:px-8">
          <div
            className="border-white-A700_19 relative flex-col justify-center rounded-[50px] border border-solid bg-[#ee9613] p-4 shadow-xl sm:flex-col sm:rounded-[100px] sm:p-6 md:rounded-[150px] md:p-10"
            style={{ width: "100%", maxWidth: "100vw", margin: "0 auto" }}
          >
            <h2 className="text-center font-Agbalumo text-3xl font-bold text-black sm:text-4xl md:text-5xl lg:text-6xl">
              What to shop For?
            </h2>
          </div>
        </section>

        {/* What to shop For? Carousel */}
        <section className="my-8 sm:my-12 md:my-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative mt-8 overflow-hidden">
              <div
                ref={containerRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${(state.currentIndex % extendedCards.length) * 576}px)`,
                  width: `${extendedCards.length * 576}px`,
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedCards.map((card, index) => (
                  <div
                    key={index}
                    className="shrink-0 p-2"
                    style={{ width: "576px", height: "276px" }}
                  >
                    <div
                      className="size-full overflow-hidden rounded-md bg-cover bg-center"
                      style={{ backgroundImage: `url(${card.image})` }}
                    >
                      <div className="flex h-full items-center bg-gray-900 bg-opacity-50">
                        <div className="max-w-xl px-10">
                          <h3 className="text-2xl font-semibold text-white">
                            {card.title}
                          </h3>
                          <p className="mt-2 text-gray-400">
                            {card.description}
                          </p>
                          <button className="mt-4 flex items-center rounded text-sm font-medium uppercase text-white hover:text-orange-500 hover:underline focus:outline-none">
                            <span>Shop Now</span>
                            <svg
                              className="ml-2 size-5"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="absolute right-16 top-2 rounded-full bg-white p-2 shadow-md"
                onClick={handlePrev}
                aria-label="Previous slide"
              >
                &lt;
              </button>
              <button
                className="absolute right-4 top-2 rounded-full bg-white p-2 shadow-md"
                onClick={handleNext}
                aria-label="Next slide"
              >
                &gt;
              </button>
              <div className="absolute bottom-4 flex w-full justify-center space-x-2">
                {cards.map((_, index) => (
                  <button
                    key={index}
                    className={`size-2 cursor-pointer rounded-full ${
                      index === state.currentIndex % cards.length ? "bg-white" : "bg-gray-400"
                    }`}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories cards Carousel */}
        {renderCarousel(categoriescards, categoriescardsscroll, (category, index) => (
          <div key={index} className="w-40 shrink-0 sm:w-48 md:w-56">
            <a href={category.href} className="block">
              <div className="rounded-lg bg-slate-50 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl">
                <div className="h-24 overflow-hidden rounded-t-lg sm:h-28 md:h-32">
                  <LazyLoadImage
                    src={category.imgSrc}
                    alt={category.name}
                    className="size-full object-cover"
                    effect="blur"
                    decoding="async"
                  />
                </div>
                <div className="p-2 sm:p-3">
                  <p className="truncate text-center text-sm font-bold sm:text-base">
                    {truncateMiddle(category.name, 20)}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}

        {/* Restaurants, Supermarkets and Pharmacies Near Me */}
        <section className="container mx-auto mt-8 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:px-8">
          <div
            className="border-white-A700 relative rounded-r-[50px] border border-solid bg-[#ee9613] p-4 shadow-xl sm:rounded-r-[100px] sm:p-6 md:rounded-r-[150px] md:p-10"
            style={{ width: "100%", maxWidth: "1100px" }}
          >
            <h2 className="text-left font-Agbalumo text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl">
              Restaurants, Supermarkets and Pharmacies Near Me
            </h2>
          </div>
        </section>

        {/* Store cards carousels */}
        {renderCarousel(storescards1, storescards1scroll, renderStoreCard)}
        {renderCarousel(storescards2, storescards2scroll, renderStoreCard)}

        {/* Supermarkets Near Me */}
        <section className="container mx-auto mt-8 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:px-8">
          <div
            className="border-white-A700 relative rounded-r-[50px] border border-solid bg-[#ee9613] p-4 shadow-xl sm:rounded-r-[100px] sm:p-6 md:rounded-r-[150px] md:p-10"
            style={{ width: "50%", maxWidth: "1000px" }}
          >
            <h2 className="text-left font-Agbalumo text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl">
              Supermarkets Near Me
            </h2>
          </div>
        </section>

        {/* Supermarkets Carousel */}
        {renderCarousel(supermarkets, supermarketsscroll, renderStoreCard)}

        {/* Restaurants Near Me */}
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
        {renderCarousel(restaurants, restaurantsscroll, renderStoreCard)}

        {/* Pharmacies Near Me */}
        <section className="container mx-auto mt-8 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:px-8">
          <div
            className="border-white-A700 relative rounded-r-[50px] border border-solid bg-[#ee9613] p-4 shadow-xl sm:rounded-r-[100px] sm:p-6 md:rounded-r-[150px] md:p-10"
            style={{ width: "50%", maxWidth: "1000px" }}
          >
            <h2 className="text-left font-Agbalumo text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl">
              Pharmacies Near Me
            </h2>
          </div>
        </section>

        {/* Pharmacies Carousel */}
        {renderCarousel(pharmacies, pharmaciesscroll, renderStoreCard)}

        {/* About Us section */}
        <section className="container mx-auto mt-8 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:px-8">
          <div
            className="border-white-A700_19 relative flex-col justify-center rounded-[50px] border border-solid bg-[#ee9613] p-4 shadow-xl sm:flex-col sm:rounded-[100px] sm:p-6 md:rounded-[150px] md:p-10"
            style={{ width: "70%", maxWidth: "100vw", margin: "0 auto" }}
          >
            <h2 className="text-center font-Agbalumo text-3xl font-bold text-black sm:text-4xl md:text-5xl lg:text-6xl">
              About Us
            </h2>
          </div>
        </section>

        {/* About Us Carousel */}
        <section className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
          <div className="relative mt-8 overflow-hidden">
            <div
              ref={containerRefau}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${(state.currentIndexau % extendedAboutus.length) * 576}px)`,
              width: `${extendedAboutus.length * 576}px`,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedAboutus.map((aboutus, index) => (
              <div
                key={index}
                className="shrink-0 p-2"
                style={{ width: "576px", height: "276px" }}
              >
                <div
                  className="size-full overflow-hidden rounded-md bg-cover bg-center"
                  style={{ backgroundImage: `url(${aboutus.image})` }}
                >
                  <div className="flex h-full items-center bg-gray-900 bg-opacity-50">
                    <div className="max-w-xl px-10">
                      <h3 className="text-2xl font-semibold text-white">
                        {aboutus.title}
                      </h3>
                      <p className="mt-2 text-gray-400">
                        {aboutus.description}
                      </p>
                      <button className="mt-4 flex items-center rounded text-sm font-medium uppercase text-white hover:text-orange-500 hover:underline focus:outline-none">
                        <span>Learn More</span>
                        <svg
                          className="ml-2 size-5"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="absolute right-16 top-2 rounded-full bg-white p-2 shadow-md"
            onClick={handlePrevau}
            aria-label="Previous slide"
          >
            &lt;
          </button>
          <button
            className="absolute right-4 top-2 rounded-full bg-white p-2 shadow-md"
            onClick={handleNextau}
            aria-label="Next slide"
          >
            &gt;
          </button>
          <div className="absolute bottom-4 flex w-full justify-center space-x-2">
            {aboutus.map((_, index) => (
              <button
                key={index}
                className={`size-2 cursor-pointer rounded-full ${
                  index === state.currentIndexau % aboutus.length ? "bg-white" : "bg-gray-400"
                }`}
                onClick={() => handleDotClickau(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>
    </main>
    
    {/* Footer */}
    <Footer />
  </div>
);
}

ErongoTowns.propTypes = {
// Add prop types here if needed
};

export default ErongoTowns;