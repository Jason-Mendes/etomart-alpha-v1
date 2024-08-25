import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import mapboxgl from "mapbox-gl";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast } from "react-toastify";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Search, X } from 'lucide-react';
import { useNavcategories, useCards, useStoresCards, useSupermarkets } from "./cardsDataCheckers";
import Footer from "../../../../../../Footer";
import KhomasOPNavBar from "../../../../../../OPNavBarRegions/KhomasOPNavBar/KhomasOPNavBar";
import 'react-lazy-load-image-component/src/effects/blur.css';

const VISIBLE_CATEGORIES_COUNT = 8;

// Performance measurement hook
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

function Checkers() {
  usePerformanceMeasure('Checkers');

  // Combined state
  const [state, setState] = useState({
    isDelivery: false,
    searchTerm: "",
    currentIndex: 0,
    isPaused: false,
    isDropdownOpen: false,
    map: null,
    isFavorite: false,
    isExpanded: false,
    categorySearchTerm: "",
    productSearchTerm: "",
    isCategoryFocused: false,
    isProductFocused: false,
    selectedCategories: [],
    sortCriteria: 'recommended',
    visibleCategories: [],
    hiddenCategories: [],
    isMoreDropdownOpen: false,
  });

  const [mapboxLoaded, setMapboxLoaded] = useState(false);

  // Refs
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const mapContainerRef = useRef(null);
  const supermarketsscroll = useRef(null);
  const productSearchRef = useRef(null);
  const categoriesSearchRef = useRef(null);
  const inputCategoriesRef = useRef(null);
  const inputProductRef = useRef(null);
  const moreButtonRef = useRef(null);

  // Memoized data
  const navcategories = useNavcategories();
  const cards = useCards();
  const storecards = useStoresCards();
  const supermarkets = useSupermarkets();

  const extendedCards = useMemo(() => [...cards, ...cards, ...cards], [cards]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(storecards.map(card => card.cuisine));
    return Array.from(uniqueCategories);
  }, [storecards]);

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

  const handleExpandCategory = useCallback(() => {
    setState(prevState => ({ ...prevState, isExpanded: true }));
  }, []);

  const handleCollapseCategory = useCallback(() => {
    setState(prevState => ({ ...prevState, isExpanded: false, categorySearchTerm: "" }));
  }, []);

  const handleExpandProduct = useCallback(() => {
    setState(prevState => ({ ...prevState, isExpanded: true }));
  }, []);

  const handleCollapseProduct = useCallback(() => {
    setState(prevState => ({ ...prevState, isExpanded: false, productSearchTerm: "" }));
  }, []);

  const handleCategorySearch = useCallback((event) => {
    setState(prevState => ({ ...prevState, categorySearchTerm: event.target.value }));
  }, []);

  const handleProductSearch = useCallback((event) => {
    setState(prevState => ({ ...prevState, productSearchTerm: event.target.value }));
  }, []);

  const handleNext = useCallback(() => {
    setState(prevState => ({ ...prevState, currentIndex: prevState.currentIndex + 1 }));
  }, []);

  const handlePrev = useCallback(() => {
    setState(prevState => ({ ...prevState, currentIndex: prevState.currentIndex - 1 }));
  }, []);

  const handleTransitionEnd = useCallback(() => {
    setState(prevState => {
      let newIndex = prevState.currentIndex;
      if (newIndex >= extendedCards.length - cards.length) {
        newIndex = cards.length;
      } else if (newIndex <= 0) {
        newIndex = extendedCards.length - 2 * cards.length;
      }
      return { ...prevState, currentIndex: newIndex };
    });
  }, [extendedCards.length, cards.length]);

  const pauseScroll = useCallback(() => {
    setState(prevState => ({ ...prevState, isPaused: true }));
    setTimeout(() => {
      setState(prevState => ({ ...prevState, isPaused: false }));
    }, 5000);
  }, []);

  const handleDotClick = useCallback((index) => {
    setState(prevState => ({ ...prevState, currentIndex: index }));
    pauseScroll();
  }, [pauseScroll]);

  const toggleDropdown = useCallback(() => {
    setState(prevState => ({ ...prevState, isDropdownOpen: !prevState.isDropdownOpen }));
  }, []);

  const toggleFavorite = useCallback(() => {
    setState(prevState => {
      const newIsFavorite = !prevState.isFavorite;
      toast.success(newIsFavorite ? "Store added to favorites" : "Store removed from favorites");
      return { ...prevState, isFavorite: newIsFavorite };
    });
  }, []);

  // Function to show more information (placeholder)
  const getInfo = useCallback(() => {
    alert("Information about the store");
  }, []);

  const handleCategorySelect = useCallback((category) => {
    setState(prevState => {
      if (category === "") {
        // If "All" is selected, clear all other selections
        return { ...prevState, selectedCategories: [] };
      } else {
        const newSelectedCategories = prevState.selectedCategories.includes(category)
          ? prevState.selectedCategories.filter(c => c !== category)
          : [...prevState.selectedCategories, category];
        return { ...prevState, selectedCategories: newSelectedCategories };
      }
    });
  }, []);

  const handleSortChange = useCallback((event) => {
    setState(prevState => ({ ...prevState, sortCriteria: event.target.value }));
  }, []);

  const filteredCategories = useMemo(() =>
    navcategories.filter((category) =>
      category.name.toLowerCase().includes(state.categorySearchTerm.toLowerCase())
    ),
    [navcategories, state.categorySearchTerm]
  );

  const filteredAndSortedProducts = useMemo(() => {
    let result = storecards;

    // Filter by delivery/pickup
  result = result.filter(product => state.isDelivery ? product.deliveryTime : product.pickupTime);

  // Filter by selected categories
  if (state.selectedCategories.length > 0) {
    result = result.filter(product => state.selectedCategories.includes(product.cuisine));
  }

    // Filter by product search term
    if (state.productSearchTerm) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(state.productSearchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(state.productSearchTerm.toLowerCase())
      );
    }

    // Sort products
    switch (state.sortCriteria) {
      case 'priceAsc':
        return result.sort((a, b) => a.priceRange.length - b.priceRange.length);
      case 'priceDesc':
        return result.sort((a, b) => b.priceRange.length - a.priceRange.length);
      case 'nameAsc':
        return result.sort((a, b) => a.name.localeCompare(b.name));
      case 'nameDesc':
        return result.sort((a, b) => b.name.localeCompare(a.name));
      case 'recommended':
      default:
        // Implement your recommendation logic here
        return result;
    }
  }, [storecards, state.isDelivery, state.selectedCategories, state.productSearchTerm, state.sortCriteria]);

  // Mapbox setup
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const MARKER_COORDINATES = [
    { lng: 17.09449450474923, lat: -22.584210677171924 },
    { lng: 17.073723364157306, lat: -22.561939983264068 },
  ];

  const initializeMap = useCallback((mapContainer) => {
    if (!mapContainer) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: 12,
    });

    mapInstance.addControl(new mapboxgl.NavigationControl());

    MARKER_COORDINATES.forEach((coord) => {
      new mapboxgl.Marker({ color: "#ee9613" })
        .setLngLat([coord.lng, coord.lat])
        .addTo(mapInstance);
    });

    const bounds = new mapboxgl.LngLatBounds();
    MARKER_COORDINATES.forEach((coord) => bounds.extend([coord.lng, coord.lat]));

    mapInstance.fitBounds(bounds, {
      padding: { top: 30, bottom: 30, left: 20, right: 20 },
      maxZoom: 13,
      linear: true,
    });

    fetchAndDisplayRoute(mapInstance);

    setState(prevState => ({ ...prevState, map: mapInstance }));
  }, []);

  const fetchAndDisplayRoute = useCallback(async (mapInstance) => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${MARKER_COORDINATES[0].lng},${MARKER_COORDINATES[0].lat};${MARKER_COORDINATES[1].lng},${MARKER_COORDINATES[1].lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      );

      const routeLine = response.data.routes[0].geometry;

      mapInstance.on("load", () => {
        mapInstance.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: routeLine,
          },
        });

        mapInstance.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#ee9613",
            "line-width": 8,
          },
        });
      });
    } catch (error) {
      console.error("Error fetching route:", error);
      // TODO: Implement proper error handling and user feedback
    }
  }, []);

  // Effects
 // Effect for initializing the map
 useEffect(() => {
  console.log("Map container ref:", mapContainerRef.current);
  if (mapContainerRef.current && !state.map) {
    console.log("Calling initializeMap");
    initializeMap(mapContainerRef.current);
  }
}, [initializeMap, state.map]);

// Effect for checking Mapbox support and initializing the map
useEffect(() => {
  if (typeof mapboxgl !== 'undefined' && mapboxgl.supported() && mapContainerRef.current && !state.map) {
    console.log("Mapbox supported and container ready, initializing map");
    initializeMap(mapContainerRef.current);
  } else {
    console.log("Mapbox not ready or already initialized", {
      mapboxDefined: typeof mapboxgl !== 'undefined',
      mapboxSupported: typeof mapboxgl !== 'undefined' && mapboxgl.supported(),
      containerReady: !!mapContainerRef.current,
      mapAlreadyInitialized: !!state.map
    });
  }
}, [initializeMap, state.map]);

// Effect for loading Mapbox script
useEffect(() => {
  if (window.mapboxgl) {
    setMapboxLoaded(true);
  } else {
    const script = document.createElement('script');
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js';
    script.onload = () => setMapboxLoaded(true);
    document.body.appendChild(script);
  }
}, []);

// Effect for initializing map after Mapbox is loaded
useEffect(() => {
  if (mapboxLoaded && mapContainerRef.current) {
    initializeMap(mapContainerRef.current);
  }
}, [mapboxLoaded, initializeMap]);

  useEffect(() => {
    let interval;
    if (!state.isPaused) {
      interval = setInterval(handleNext, 5000);
    }
    return () => clearInterval(interval);
  }, [state.isPaused, handleNext]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setState(prevState => ({ ...prevState, isDropdownOpen: false }));
      }
      if (productSearchRef.current && !productSearchRef.current.contains(event.target)) {
        setState(prevState => ({ ...prevState, productSearchTerm: "" }));
      }
      if (categoriesSearchRef.current && !categoriesSearchRef.current.contains(event.target)) {
        setState(prevState => ({ ...prevState, categorySearchTerm: "" }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      visibleCategories: categories.slice(0, VISIBLE_CATEGORIES_COUNT),
      hiddenCategories: categories.slice(VISIBLE_CATEGORIES_COUNT),
    }));
  }, [categories]);

  const handleSearch = (field) => (event) => {
    setState(prevState => ({ ...prevState, [field]: event.target.value }));
  };

  const handleProductsFocus = (field) => () => {
    setState(prevState => ({ ...prevState, [field]: true }));
  };
  
  const handleCategoriesFocus = (field) => () => {
    setState(prevState => ({ ...prevState, [field]: true }));
  };

  const handleBlur = (field, term) => () => {
    if (!state[term]) {
      setState(prevState => ({ ...prevState, [field]: false }));
    }
  };

  const handleClearCategory = (field) => () => {
    setState(prevState => ({ ...prevState, [field]: "" }));
    if (inputCategoriesRef.current) {
      inputCategoriesRef.current.focus();
    }
  };
  
  const handleClearProduct = (field) => () => {
    setState(prevState => ({ ...prevState, [field]: "" }));
    if (inputProductRef.current) {
      inputProductRef.current.focus();
    }
  };

  const clearSelectedCategories = useCallback(() => {
    setState(prevState => ({ ...prevState, selectedCategories: [] }));
  }, []);

  const toggleMoreDropdown = useCallback(() => {
    setState(prevState => ({ ...prevState, isMoreDropdownOpen: !prevState.isMoreDropdownOpen }));
  }, []);

  // Function to handle smooth scrolling for information button to snap to more information section
  const smoothScroll = useCallback((target, duration = 1000) => {
    const targetElement = document.getElementById(target);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function
    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }, []);

    // Function to handle the infromation button click
    const handleSeeMoreInfo = useCallback(() => {
      smoothScroll('moreInformation', 1500); // Scroll duration of 1.5 seconds
    }, [smoothScroll]);

  // Render helpers
  const renderCarousel = useCallback((items, scrollRef, itemRenderer) => (
    <div className="relative mt-4 sm:mt-6 md:mt-8">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
         {/* Gradient overlays for scroll indicators */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-4 bg-gradient-to-r from-white to-transparent sm:w-8 md:w-12"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-4 bg-gradient-to-l from-white to-transparent sm:w-8 md:w-12"></div>
        {/* Left scroll button */}
        <button
          className="absolute left-0 top-1/2 z-50 -translate-y-1/2 rounded-r-[25px] bg-[#ee9613] p-1 sm:rounded-r-[50px]"
          onClick={() => scrollLeft(scrollRef)}
          aria-label="Scroll left"
        >
          &#9664;
        </button>
        {/* Carousel content */}
        <div
          ref={scrollRef}
          className="custom-scrollbar flex space-x-4 overflow-x-auto p-4 sm:p-6 md:p-8"
        >
          {items.map((item, index) => itemRenderer(item, index))}
        </div>
         {/* Right scroll button */}
        <button
          className="absolute right-0 top-1/2 z-50 -translate-y-1/2 rounded-l-[25px] bg-[#ee9613] p-1 sm:rounded-l-[50px]"
          onClick={() => scrollRight(scrollRef)}
          aria-label="Scroll right"
        >
          &#9654;
        </button>
      </div>
    </div>
  ), [scrollLeft, scrollRight]);

  // Function to render a restaurant card
  const renderSupermarketCard = useCallback((supermarket, index) => (
    <div key={index} className="w-48 shrink-0 p-6 sm:w-56 md:w-64 lg:w-72">
      <a href={supermarket.href} className="block h-full rounded-lg bg-slate-50 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl">
        <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
          <LazyLoadImage
            src={supermarket.imgSrc}
            alt={supermarket.name}
            width="100%"
            height="100%"
            className="size-full object-fill"
            effect="opacity"
          />
        </div>
        <div className="p-3 sm:p-4">
          <p className="w-full truncate text-center text-sm font-bold sm:text-base">{supermarket.name}</p>
        </div>
      </a>
    </div>
  ), []);

  // JSX
  return (
    <div className="bg-white">
      <KhomasOPNavBar />
      <main className="relative z-10">
        {/* Header section */}
        <header className="relative w-full h-80">
          <div className="relative mx-auto max-w-xs p-4">
            <LazyLoadImage
              src="/images/supermarkets/checkers.png"
              alt="Checkers supermarket"
              effect="blur"
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute bottom-0 left-0 flex w-full items-center justify-between p-4">
            <div className="px-4">
              <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">Checkers</h1>
              <p className="text-sm text-white sm:text-base md:text-lg">Better and Better</p>
              <button
                data-test-id="venue-favorite"
                aria-label={state.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                onClick={toggleFavorite}
                className="mt-2 rounded-full p-2 text-white transition duration-200 hover:bg-white hover:text-black"
              >
                <svg viewBox="0 0 24 24" className="size-6 fill-current">
                  {state.isFavorite ? (
                    <path d="M23.305 5.07498C22.3508 3.21819 20.5724 1.92407 18.5121 1.58723C16.4518 1.25039 14.3539 1.91076 12.858 3.36698L12 4.14798L11.172 3.39398C9.67891 1.90936 7.56117 1.23646 5.48499 1.58698C3.42071 1.90968 1.63893 3.2085 0.699989 5.07498C-0.569125 7.56204 -0.0794272 10.5848 1.90999 12.544L11.283 22.2C11.4713 22.3936 11.7299 22.5029 12 22.5029C12.2701 22.5029 12.5287 22.3936 12.717 22.2L22.076 12.562C24.0755 10.6019 24.5729 7.57146 23.305 5.07498Z" />
                  ) : (
                    <path d="M23.305 5.07498C22.3508 3.21819 20.5724 1.92407 18.5121 1.58723C16.4518 1.25039 14.3539 1.91076 12.858 3.36698L12 4.14798L11.172 3.39398C9.67891 1.90936 7.56117 1.23646 5.48499 1.58698C3.42071 1.90968 1.63893 3.2085 0.699989 5.07498C-0.569125 7.56204 -0.0794272 10.5848 1.90999 12.544L11.283 22.2C11.4713 22.3936 11.7299 22.5029 12 22.5029C12.2701 22.5029 12.5287 22.3936 12.717 22.2L22.076 12.562C24.0755 10.6019 24.5729 7.57146 23.305 5.07498ZM20.657 11.151L12.357 19.696C12.2628 19.7928 12.1335 19.8474 11.9985 19.8474C11.8634 19.8474 11.7341 19.7928 11.64 19.696L3.32699 11.136C1.94998 9.78618 1.60717 7.69937 2.47999 5.97998C3.13326 4.68428 4.37197 3.78375 5.80599 3.56198C7.26664 3.31621 8.75572 3.79456 9.79999 4.84498L11.33 6.24498C11.7117 6.59273 12.2953 6.59273 12.677 6.24498L14.238 4.82198C15.278 3.7873 16.7534 3.3181 18.2 3.56198C19.6323 3.78494 20.869 4.68536 21.521 5.97998C22.3943 7.7072 22.0444 9.8015 20.657 11.151Z" />
                  )}
                </svg>
              </button>
            </div>
            <div ref={dropdownRef} className="relative px-4">
              <button
                aria-label="More options"
                className="p-2 text-white"
                onClick={toggleDropdown}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-8 rounded-full fill-current text-white transition duration-200 hover:bg-white hover:text-black"
                >
                  <circle cx="12" cy="5" r="2"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                  <circle cx="12" cy="19" r="2"></circle>
                </svg>
              </button>
              {state.isDropdownOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button
                      onClick={toggleFavorite}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      {state.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                    </button>
                    <button
                        onClick={getInfo}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        Stores Information
                      </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Carousel section */}
        <section className="my-8">
          <div className="container mx-auto px-4">
            <div className="relative mt-8 overflow-hidden">
              <div
                ref={containerRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${state.currentIndex * 576}px)`,
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
                          <h2 className="text-2xl font-semibold text-white">
                            {card.title}
                          </h2>
                          <p className="mt-2 text-gray-400">{card.description}</p>
                          <button className="mt-4 flex items-center rounded text-sm font-medium uppercase text-white hover:underline focus:outline-none">
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
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md"
                onClick={handlePrev}
                aria-label="Previous slide"
              >
                &lt;
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md"
                onClick={handleNext}
                aria-label="Next slide"
              >
                &gt;
              </button>
              <div className="absolute bottom-4 flex w-full justify-center space-x-2">
                {cards.map((_, index) => (
                  <button
                    key={index}
                    className={`size-2 rounded-full ${index === state.currentIndex % cards.length
                        ? "bg-white"
                        : "bg-gray-400"
                      }`}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Store Information */}
        <section className="container mx-auto px-4">
          <div className="flex items-center justify-between space-x-28 px-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <svg viewBox="0 0 16 16" width="16" aria-hidden="true" className="text-primary">
                  <path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C15.9949 3.58385 12.4161 0.00514317 8 0ZM8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8C14.6626 11.6802 11.6802 14.6626 8 14.6667ZM11.4227 10.54L8.33333 7.70733V4.33333C8.33333 3.96514 8.03486 3.66667 7.66667 3.66667C7.29848 3.66667 7 3.96514 7 4.33333V8C6.99979 8.18704 7.07817 8.36556 7.216 8.492L10.522 11.522C10.7947 11.7672 11.2135 11.7492 11.464 11.4813C11.7123 11.2099 11.6938 10.7886 11.4227 10.54Z"></path>
                </svg>
                <span>Opens today at 10:00</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg viewBox="0 0 24 24" width="16" aria-hidden="true" className="text-[#ee9613]">
                  <circle cx="12" cy="12" r="12" fill="orange" />
                </svg>
                <span>9.8</span>
              </div>
              <button
                  type="button"
                  onClick={handleSeeMoreInfo}
                  className="flex items-center space-x-1 text-[#ee9613] hover:underline focus:outline-none focus:ring-2 focus:ring-[#ee9613] focus:ring-opacity-50 transition duration-300"
                >
                  <svg viewBox="0 0 24 24" width="16">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.993 5.376 18.624.007 12 0zm.25 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75c0 .138.112.25.25.25h.75a1 1 0 010 2z"></path>
                  </svg>
                  <span>See more information</span>
                </button>
            </div>
            <div className="flex items-center justify-end space-x-2 rounded-full border-solid bg-gray-200 p-1">
                <button
                  className={`rounded-full border border-gray-300 px-2 py-1 text-black transition-colors duration-300 ${state.isDelivery ? "bg-[#ee9613] text-white" : "bg-gray-200"}`}
                  onClick={() => setState(prevState => ({ ...prevState, isDelivery: true }))}
                >
                  Delivery
                </button>
                <button
                  className={`rounded-full border border-gray-300 px-2 py-1 text-black transition-colors duration-300 ${state.isDelivery ? "bg-gray-200" : "bg-[#ee9613] text-white"}`}
                  onClick={() => setState(prevState => ({ ...prevState, isDelivery: false }))}
                >
                  Pickup
                </button>
              </div>
            </div>
          <div className="px-4 text-gray-700">
            {state.isDelivery
              ? "The following products are available for delivery to your location."
              : "All products the Store has to offer"}
          </div>
        </section>

        {/* Categories and products section */}
        <section className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            {/* Mobile view (below md screens) */}
            <div className="md:hidden w-full">
              {/* Product search */}
              <div className="mb-4 w-full">
                <div className="relative">
                  <input
                    ref={inputProductRef}
                    type="text"
                    placeholder="Search products..."
                    value={state.productSearchTerm}
                    onChange={handleSearch('productSearchTerm')}
                    onFocus={handleProductsFocus('isProductFocused')}
                    onBlur={handleBlur('isProductFocused', 'productSearchTerm')}
                    className="w-full rounded-full border border-gray-300 px-10 py-2 transition-transform duration-200 hover:scale-105 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ee9613]"
                  />
                  {state.isProductFocused ? (
                    <>
                      <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ee9613]" />
                      {state.productSearchTerm && (
                        <X
                          size={20}
                          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#ee9613] hover:text-gray-400"
                          onClick={handleClearProduct('productSearchTerm')}
                        />
                      )}
                    </>
                  ) : (
                    <Search size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ee9613]" />
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-4">
                <div className="flex items-center space-x-4">
                  {/* Visible categories */}
                  <div className="flex-1 overflow-x-auto">
                    <div className="grid auto-cols-max grid-flow-col gap-2 pb-2">
                    <button
  onClick={() => handleCategorySelect("")}
  className={`w-auto max-w-[130px] whitespace-nowrap rounded-md px-4 py-2 transition-colors duration-300 ${
    state.selectedCategories.length === 0 ? "bg-[#ee9613] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
  }`}
>
  All
</button>

                      {state.visibleCategories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategorySelect(category)}
                          className={`w-auto max-w-[130px] whitespace-nowrap rounded-md px-4 py-2 transition-colors duration-300 ${
                            state.selectedCategories.includes(category) ? "bg-[#ee9613] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
    {/* More button */}
{state.hiddenCategories.length > 0 && (
  <div className="relative w-auto min-w-[80px] pr-6">
    <div className="relative">
      <button
        ref={moreButtonRef}
        onClick={toggleMoreDropdown}
        className="flex w-auto max-w-[130px] items-center whitespace-nowrap rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
      >
        More 
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          aria-hidden="true" 
          className="mx-2 size-4"
        >
          <path 
            fillRule="evenodd" 
            d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" 
            clipRule="evenodd"
          />
        </svg>
      </button>
      {/* Dropdown Menu */}
      {state.isMoreDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute left-0 z-50 mt-1 w-auto min-w-[200px] overflow-visible rounded-md bg-white shadow-lg"
          style={{ top: 'calc(100% + 2px)' }}
        >
          <div className="grid grid-cols-2 gap-2 p-2">
            {state.hiddenCategories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  handleCategorySelect(category);
                  setState(prevState => ({ ...prevState, isMoreDropdownOpen: false }));
                }}
                className="whitespace-normal rounded px-3 py-2 text-left hover:bg-gray-100"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
)}
                </div>
              </div>

              {/* All Products and Sort */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">All Products</h2>
                <select
                  value={state.sortCriteria}
                  onChange={handleSortChange}
                  className="rounded-md border px-4 py-2"
                >
                  <option value="recommended">Sort by: Recommended</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="nameAsc">Name: A to Z</option>
                  <option value="nameDesc">Name: Z to A</option>
                </select>
              </div>

              {/* Products grid */}
              <div className="grid grid-cols-2 gap-4">
                {filteredAndSortedProducts.map((product, index) => (
                  <div key={index} className="w-full">
                    <a
                      href={product.href}
                      className="block h-full overflow-hidden rounded-lg bg-slate-50 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl"
                    >
                      <div className="relative aspect-square w-full overflow-hidden">
                        <LazyLoadImage
                          src={product.imgSrc}
                          alt={product.name}
                          width="100%"
                          height="100%"
                          effect="blur"
                          className="size-full object-cover"
                        />
                        {product.discount && (
                          <div className="absolute right-0 top-0 mr-2 mt-2 rounded bg-[#ee9613] px-2 py-1 text-xs text-white">
                            {`-${product.discount}%`}
                          </div>
                        )}
                        <div className="absolute bottom-2 right-2 flex h-8 w-12 items-center justify-center rounded bg-[#ee9613] text-lg text-white">
                          +
                        </div>
                      </div>
                      <div className="flex w-full grow flex-col p-2">
                        <h3 className="truncate font-bold">{product.name}</h3>
                        <div className="mt-2 flex items-center text-sm">
                          <div className="text-sm font-bold text-[#ee9613]">
                            <span>{product.priceRange}</span>
                          </div>
                          <span className="mx-1">•</span>
                          <span className="truncate">{product.cuisine}</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          {state.isDelivery ? `Delivery: ${product.deliveryTime}` : `Pickup: ${product.pickupTime}`}
                        </div>
                        <div className="mt-1 line-clamp-2 text-xs text-gray-500">
                          {product.description}
                        </div>
                        <div className="mt-auto">
                          <div className="rounded py-1 text-xs text-black">
                            <span className="text-black">Etomart </span>
                            {product.deliveryTime ? (
                              <span className="font-bold text-[#ee9613]">Delivery Available</span>
                            ) : (
                              <span className="font-bold text-[#ee1313]">Delivery Not Available</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop view (md screens and above) */}
            <div className="hidden md:flex md:flex-row w-full">
              {/* Categories sidebar */}
              <aside className="w-1/5 p-4">
                <div className="flex flex-col">
                  <div className="mb-4 w-full">
                    <div className="relative">
                      <input
                        ref={categoriesSearchRef}
                        type="text"
                        placeholder="Search Categories..."
                        value={state.categorySearchTerm}
                        onChange={handleSearch('categorySearchTerm')}
                        onFocus={handleCategoriesFocus('isCategoryFocused')}
                        onBlur={handleBlur('isCategoryFocused', 'categorySearchTerm')}
                        className="w-full rounded-full border border-gray-300 px-10 py-2 transition-transform duration-200 hover:scale-105 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ee9613]"
                      />
                      {state.isCategoryFocused ? (
                        <>
                          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ee9613]" />
                          {state.categorySearchTerm && (
                            <X
                              size={20}
                              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#ee9613] hover:text-gray-400"
                              onClick={handleClearCategory('categorySearchTerm')}
                            />
                          )}
                        </>
                      ) : (
                        <Search size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ee9613]" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col overflow-y-auto" style={{ maxHeight: "calc(850px - 4rem)" }}>
                    {state.selectedCategories.length > 0 && (
                      <button
                        onClick={clearSelectedCategories}
                        className="mb-2 w-full rounded-lg bg-[#8f8575] p-2 text-white shadow hover:bg-[#ee9613]"
                      >
                        Clear Selected Categories
                      </button>
                    )}
                    {filteredCategories.map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleCategorySelect(category.name)}
                        className={`mb-4 flex items-center rounded-lg p-2 shadow hover:bg-[#ecbc73] ${
                          state.selectedCategories.includes(category.name) ? "bg-[#ee9613] text-white" : "bg-white"
                        }`}
                      >
                        <LazyLoadImage
                          src={category.imgSrc}
                          alt={category.name}
                          effect="blur"
                          className="mr-4 size-10 rounded-full hidden md:block"
                        />
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              {/* Products grid */}
              <section className="w-4/5">
                <div className="px-4">
                  <div className="flex items-center p-4">
                    <h2 className="mr-auto text-2xl font-bold">All Products</h2>
                    <div className="mx-auto flex items-center">
                      <div className="relative ">
                        <input
                          ref={productSearchRef}
                          type="text"
                          placeholder="Search products..."
                          value={state.productSearchTerm}
                          onChange={handleSearch('productSearchTerm')}
                          onFocus={handleProductsFocus('isProductFocused')}
                          onBlur={handleBlur('isProductFocused', 'productSearchTerm')}
                          className="w-full rounded-full border border-gray-300 px-28 py-2 transition-transform duration-200 hover:scale-105 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ee9613]"
                        />
                        {state.isProductFocused ? (
                          <>
                            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ee9613]" />
                            {state.productSearchTerm && (
                             <X
                             size={20}
                             className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#ee9613] hover:text-gray-400"
                             onClick={handleClearProduct('productSearchTerm')}
                           />
                         )}
                       </>
                     ) : (
                       <Search size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ee9613]" />
                     )}
                   </div>
                 </div>
                 <div className="ml-auto flex items-center">
                   <select
                     value={state.sortCriteria}
                     onChange={handleSortChange}
                     className="rounded-md border px-4 py-2"
                   >
                     <option value="recommended">Sort by: Recommended</option>
                     <option value="priceAsc">Price: Low to High</option>
                     <option value="priceDesc">Price: High to Low</option>
                     <option value="nameAsc">Name: A to Z</option>
                     <option value="nameDesc">Name: Z to A</option>
                   </select>
                 </div>
               </div>

               <div className="h-[600px] overflow-y-auto sm:h-[700px] md:h-[850px]">
                 <div className="px-2 pb-4">
                   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                     {filteredAndSortedProducts.map((product, index) => (
                       <div
                         key={index}
                         className="mx-auto w-full max-w-[180px] sm:mx-0 sm:max-w-[400px]"
                       >
                         <a href={product.href}
                           className="block size-full overflow-hidden rounded-lg bg-slate-50 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl"
                         >
                           <div className="flex h-full flex-col">
                             <div className="relative aspect-square w-full overflow-hidden">
                               <LazyLoadImage
                                 src={product.imgSrc}
                                 alt={product.name}
                                 width="100%"
                                 height="100%"
                                 effect="blur"
                                 className="size-full object-cover"
                               />
                               {product.discount && (
                                 <div className="absolute right-0 top-0 mr-2 mt-2 rounded bg-[#ee9613] px-2 py-1 text-xs text-white">
                                   {`-${product.discount}%`}
                                 </div>
                               )}
                               <div className="absolute bottom-2 right-2 flex h-8 w-12 items-center justify-center rounded bg-[#ee9613] text-lg text-white">
                                 +
                               </div>
                             </div>
                             <div className="flex w-full grow flex-col p-2">
                               <h3 className="truncate font-bold">{product.name}</h3>
                               <div className="mt-2 flex items-center text-sm">
                                 <div className="text-sm font-bold text-[#ee9613]">
                                   <span>{product.priceRange}</span>
                                 </div>
                                 <span className="mx-1">•</span>
                                 <span className="truncate">{product.cuisine}</span>
                               </div>
                               <div className="mt-1 text-xs text-gray-500">
                                 {state.isDelivery ? `Delivery: ${product.deliveryTime}` : `Pickup: ${product.pickupTime}`}
                               </div>
                               <div className="mt-1 line-clamp-2 text-xs text-gray-500">
                                 {product.description}
                               </div>
                               <div className="mt-auto">
                                 <div className="rounded py-1 text-xs text-black">
                                   <span className="text-black">Etomart </span>
                                   {product.deliveryTime ? (
                                     <span className="font-bold text-[#ee9613]">Delivery Available</span>
                                   ) : (
                                     <span className="font-bold text-[#ee1313]">Delivery Not Available</span>
                                   )}
                                 </div>
                               </div>
                             </div>
                           </div>
                         </a>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
             </div>
           </section>
         </div>
       </div>
     </section>

     {/*More Information Section */}
     <section  id="moreInformation" className="container mx-auto mt-8 p-4">
            {/* More information content */}
            <div className="flex flex-col p-4 md:flex-row md:space-x-8">
              <div className="space-y-8 md:w-1/3">
                <div className="space-y-8">
                  <div>
               <h3 className="text-md font-semibold">Store Information</h3>
               <p className="font-bold text-[#ee9613]">Checkers</p>
               <p>Better and Better</p>
             </div>
             <div>
               <h3 className="text-md font-semibold">Address</h3>
               <div>
                 <p>Windhoek West</p>
                 <p>8850603 Eilat</p>
                 <a href={`https://maps.google.com/?q=${MARKER_COORDINATES[0].lat},${MARKER_COORDINATES[0].lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold text-[#ee9613] hover:underline"
                      >
                   See map
                 </a>
               </div>
             </div>
           </div>
         </div>
         <div className="space-y-8 md:w-1/3">
           <h3 className="text-md font-semibold">More information</h3>
           <a href="tel:+972543131665" className="font-bold text-[#ee9613] hover:underline">
             +972543131665
           </a>
           <div>
             <h3 className="text-md font-semibold">Delivery times</h3>
             <table className="table-auto">
               <tbody>
                 {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                   <tr key={day}>
                     <td className="pr-4">{day}</td>
                     <td>09:00–22:30</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
         <div className="md:w-2/3">
                <div ref={mapContainerRef} className="h-[400px] w-full"></div>
              </div>
       </div>
     </section>

     {/* Similar Supermarkets Section */}
     <section className="container mx-auto mt-8 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:px-8">
       <div
         className="border-white-A700 relative rounded-r-[50px] border border-solid bg-[#ee9613] p-4 shadow-xl sm:rounded-r-[100px] sm:p-6 md:rounded-r-[150px] md:p-10"
         style={{ width: "50%", maxWidth: "1000px" }}
       >
         <h2 className="text-left font-Agbalumo text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl">
           Similar Supermarkets
         </h2>
       </div>
     </section>

     {/* Supermarkets Carousel */}
     {renderCarousel(supermarkets, supermarketsscroll, renderSupermarketCard)}
   </main>
   <Footer />
 </div>
);
}

Checkers.propTypes = {
// Add prop types here if needed
};

export default Checkers;