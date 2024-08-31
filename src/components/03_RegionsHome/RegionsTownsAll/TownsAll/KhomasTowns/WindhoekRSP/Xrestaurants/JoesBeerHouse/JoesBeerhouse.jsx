// Import necessary React hooks and components
import React, { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from "react";
import PropTypes from 'prop-types';
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Search, X } from 'lucide-react';
import mapboxgl from "mapbox-gl";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast } from "react-toastify";
import { useCards, useRestaurantCards, useRestaurants } from "./cardsDataJoesBeerhouse";
import KhomasOPNavBar from "../../../../../../02_OPNavBarRegions/KhomasOPNavBar/KhomasOPNavBar";
import 'react-lazy-load-image-component/src/effects/blur.css';

// Lazy-load the Footer component for better performance
const Footer = lazy(() => import("../../../../../../../04_Footer/Footer"));

// Custom hook for measuring component performance
const usePerformanceMeasure = (name) => {
  useEffect(() => {
    // Mark the start of the component's lifecycle
    performance.mark(`${name}-start`);
    return () => {
      // Mark the end of the component's lifecycle and measure the duration
      performance.mark(`${name}-end`);
      performance.measure(name, `${name}-start`, `${name}-end`);
      console.log(performance.getEntriesByName(name));
    };
  }, [name]);
};

// Constants
const VISIBLE_CATEGORIES_COUNT = 8;

// Main component for Joe's Beerhouse page
function JoesBeerhouse() {
  // Use the performance measurement hook
  usePerformanceMeasure('JoesBeerhouse');

  // State management using a single useState hook
  const [state, setState] = useState({
    isDelivery: false,
    stickyOffset: 0,
    searchTerm: "",
    currentIndex: 0,
    isPaused: false,
    isDropdownOpen: false,
    map: null,
    isFavorite: false,
    isSticky: false,
    selectedCategory: "",
    visibleCategories: [],
    hiddenCategories: [],
    isMoreDropdownOpen: false,
    isNavbarVisible: true,
    filteredProducts: [],
  });

  // Additional state hooks for specific functionalities
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isKhomasOPNavBarSticky, setIsKhomasOPNavBarSticky] = useState(false);
  const [isKhomasOPNavBarVisible, setIsKhomasOPNavBarVisible] = useState(true);
  const [sortCriteria, setSortCriteria] = useState('default');
  const [mapboxLoaded, setMapboxLoaded] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Refs for accessing DOM elements and storing values across renders
  const searchResultsRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const opCarouselRef = useRef(null);
  const opMoreInformationRef = useRef(null);
  const containerRef = useRef(null);
  const mapContainerRef = useRef(null);
  const restaurantsscroll = useRef(null);
  const productsSectionRef = useRef(null);
  const searchAndFilterRef = useRef(null);
  const moreButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Custom hooks for fetching and memoizing data
  const cards = useCards();
  const restaurantCards = useRestaurantCards();
  const restaurants = useRestaurants();

  // Memoized extended cards array for carousel
  const extendedCards = useMemo(() => [...cards, ...cards, ...cards], [cards]);

  // Memoized unique categories from restaurant cards
  const categories = useMemo(() => {
    const uniqueCategories = new Set(restaurantCards.map(card => card.cuisine));
    return Array.from(uniqueCategories);
  }, [restaurantCards]);

  // Mapbox configuration
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  console.log("Mapbox Token:", process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);

  // Marker coordinates for the map
  const MARKER_COORDINATES = [
    { lng: 17.090396711968985, lat: -22.450459904783143 }, // Joe's Beerhouse
    { lng: 17.073723364157306, lat: -22.561939983264068 }, // User's home
  ];

  // Function to fetch and display the route on the map
  const fetchAndDisplayRoute = useCallback(async (mapInstance) => {
    try {
      // Fetch route data from Mapbox API
      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${MARKER_COORDINATES[0].lng},${MARKER_COORDINATES[0].lat};${MARKER_COORDINATES[1].lng},${MARKER_COORDINATES[1].lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      );

      const routeLine = response.data.routes[0].geometry;

      // Add the route to the map
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
    } catch (error) {
      console.error("Error fetching route:", error);
      // TODO: Implement proper error handling and user feedback
    }
  }, []);

  // Function to initialize the map
  const initializeMap = useCallback((mapContainer) => {
    if (!mapContainer) return;

    console.log("Initializing map...");
    try {
      // Create a new Mapbox instance
      const mapInstance = new mapboxgl.Map({
        container: mapContainer,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [17.090396711968985, -22.450459904783143], // Center on Joe's Beerhouse
        zoom: 12,
      });

      console.log("Map instance created:", mapInstance);

      // Add navigation control to the map
      mapInstance.addControl(new mapboxgl.NavigationControl());

      // Add markers for the coordinates
      MARKER_COORDINATES.forEach((coord) => {
        new mapboxgl.Marker({ color: "#ee9613" })
          .setLngLat([coord.lng, coord.lat])
          .addTo(mapInstance);
      });

      // Fit the map to show all markers
      const bounds = new mapboxgl.LngLatBounds();
      MARKER_COORDINATES.forEach((coord) => bounds.extend([coord.lng, coord.lat]));

      mapInstance.fitBounds(bounds, {
        padding: { top: 30, bottom: 30, left: 20, right: 20 },
        maxZoom: 13,
        linear: true,
      });

      // Load the map and fetch the route
      mapInstance.on('load', () => {
        console.log("Map loaded successfully");
        fetchAndDisplayRoute(mapInstance);
      });

      // Handle map errors
      mapInstance.on('error', (e) => {
        console.error("Map error:", e);
      });

      // Update the state with the map instance
      setState(prevState => ({ ...prevState, map: mapInstance }));
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [fetchAndDisplayRoute]);

  // Function to sort products based on criteria
  const sortProducts = useCallback((products, criteria) => {
    switch (criteria) {
      case 'priceAsc':
        return [...products].sort((a, b) => a.priceRange.length - b.priceRange.length);
      case 'priceDesc':
        return [...products].sort((a, b) => b.priceRange.length - a.priceRange.length);
      case 'nameAsc':
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      case 'nameDesc':
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  }, []);

  // Function to scroll to the products section
  const scrollToProducts = useCallback(() => {
    if (productsSectionRef.current) {
      const yOffset = -100;
      const y = productsSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  // Function to handle search input changes
  const handleSearch = useCallback((event) => {
    const searchTerm = event.target.value;
    setState(prevState => ({ ...prevState, searchTerm }));
    scrollToProducts();
  }, [scrollToProducts]);

  // Function to handle search input focus
  const handleSearchClick = () => {
    setIsSearchFocused(true);
  };

  // Function to clear search input
  const handleClear = () => {
    setState(prevState => ({ ...prevState, searchTerm: '' }));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Combine visible and hidden categories for mobile view
  const allCategories = useMemo(() => [...state.visibleCategories, ...state.hiddenCategories], [state.visibleCategories, state.hiddenCategories]);


  // Function to handle category selection
  const handleCategorySelect = useCallback((category) => {
    setState(prevState => ({
      ...prevState,
      selectedCategory: category,
      isMoreDropdownOpen: false // Close the dropdown after selection
    }));
    scrollToProducts();
  }, [scrollToProducts]);

  const handleMobileCategorySelect = useCallback((category, event) => {
    event.preventDefault();
    event.stopPropagation();
    handleCategorySelect(category);
    // Use setTimeout to close the dropdown after the state has been updated
    setTimeout(() => {
      setState(prevState => ({ ...prevState, isMoreDropdownOpen: false }));
    }, 0);
  }, [handleCategorySelect]);
  // Functions to handle carousel scrolling
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

  // Functions to handle carousel navigation
  const handleNext = useCallback(() => {
    setState(prevState => ({ ...prevState, currentIndex: prevState.currentIndex + 1 }));
  }, []);

  const handlePrev = useCallback(() => {
    setState(prevState => ({ ...prevState, currentIndex: prevState.currentIndex - 1 }));
  }, []);

  // Function to handle carousel transition end
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

  // Function to pause carousel scrolling
  const pauseScroll = useCallback(() => {
    setState(prevState => ({ ...prevState, isPaused: true }));
    setTimeout(() => {
      setState(prevState => ({ ...prevState, isPaused: false }));
    }, 5000);
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

  //Function to handle touch start
  const handleTouchStart = () => {
    setShowControls(true);
    // Hide controls after 3 seconds
    setTimeout(() => setShowControls(false), 3000);
  };

  //Function Update the isHovering state to also set showControls
  const handleMouseEnter = () => {
    setIsHovering(true);
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setShowControls(false);
  };

  // Function to handle the infromation button click
  const handleSeeMoreInfo = useCallback(() => {
    smoothScroll('moreInformation', 1500); // Scroll duration of 1.5 seconds
  }, [smoothScroll]);

  // Function to toggle dropdown menu
  const toggleDropdown = useCallback(() => {
    setState(prevState => ({ ...prevState, isDropdownOpen: !prevState.isDropdownOpen }));
  }, []);

  // Function to handle dot click in carousel
  const handleDotClick = useCallback((index) => {
    setState(prevState => ({ ...prevState, currentIndex: index }));
    pauseScroll();
  }, [pauseScroll]);

  // Function to toggle favorite status
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

  // Function to toggle "More" dropdown
  const toggleMoreDropdown = useCallback(() => {
    setState(prevState => ({ ...prevState, isMoreDropdownOpen: !prevState.isMoreDropdownOpen }));
  }, []);

  // Effect for handling KhomasOPNavBar visibility
  useEffect(() => {
    let initialTopKhomasOPNavBar = null;

    const handleScrollKhomasOPNavBar = () => {
      const currentScrollY = window.pageYOffset;
      const opInformationRect = opCarouselRef.current?.getBoundingClientRect();
      const opMoreInformationRect = opMoreInformationRef.current?.getBoundingClientRect();

      if (opInformationRect && opMoreInformationRect) {
        if (initialTopKhomasOPNavBar === null) {
          initialTopKhomasOPNavBar = opInformationRect.top + currentScrollY;
        }

        const opInformationOffset = initialTopKhomasOPNavBar;
        const opMoreInformationOffset = opMoreInformationRect.bottom + currentScrollY;

        const isScrollingUp = currentScrollY < lastScrollYRef.current;
        const hasPassedOpMoreInformation = currentScrollY >= opMoreInformationOffset;

        setIsKhomasOPNavBarVisible(
          (currentScrollY <= opInformationOffset ||
            isScrollingUp ||
            hasPassedOpMoreInformation) &&
          !isSearchFocused
        );
        setIsKhomasOPNavBarSticky(currentScrollY > 0);

        lastScrollYRef.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScrollKhomasOPNavBar, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollKhomasOPNavBar);
  }, [isSearchFocused]);

  // Effect for handling navbar visibility and stickiness
  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    let initialTop = null;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const searchAndFilterRect = searchAndFilterRef.current?.getBoundingClientRect();
      const productsSectionRect = productsSectionRef.current?.getBoundingClientRect();

      if (searchAndFilterRect && productsSectionRect) {
        if (initialTop === null) {
          initialTop = searchAndFilterRect.top + currentScrollY;
        }

        const searchAndFilterOffset = initialTop;
        const productsSectionOffset = productsSectionRect.bottom + currentScrollY;

        setState(prevState => ({
          ...prevState,
          isNavbarVisible: currentScrollY <= lastScrollY || currentScrollY <= searchAndFilterOffset,
          isSticky: currentScrollY >= searchAndFilterOffset && currentScrollY < productsSectionOffset - searchAndFilterRect.height,
        }));

        lastScrollY = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect for initializing visible and hidden categories
  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      visibleCategories: categories.slice(0, VISIBLE_CATEGORIES_COUNT),
      hiddenCategories: categories.slice(VISIBLE_CATEGORIES_COUNT),
    }));
  }, [categories]);

  // Effect for handling clicks outside the "More" dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        moreButtonRef.current &&
        !moreButtonRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setState(prevState => ({ ...prevState, isMoreDropdownOpen: false }));
      }
    };

    if (state.isMoreDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [state.isMoreDropdownOpen]);
  // Effect for handling clicks outside the dropdown menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setState(prevState => ({ ...prevState, isDropdownOpen: false }));
      }
    };

    if (state.isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [state.isDropdownOpen]);

  // Effect for auto-scrolling the carousel
  useEffect(() => {
    let interval;
    if (!state.isPaused) {
      interval = setInterval(handleNext, 5000);
    }
    return () => clearInterval(interval);
  }, [state.isPaused, handleNext]);

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

  // Effect for filtering and sorting products
  useEffect(() => {
    const filteredProducts = restaurantCards.filter(product => {
      const lowerCaseSearchTerm = state.searchTerm.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.cuisine.toLowerCase().includes(lowerCaseSearchTerm);
      const matchesCategory =
        state.selectedCategory === "" ||
        product.cuisine === state.selectedCategory;
      const matchesDeliveryOption =
        !state.isDelivery || product.deliveryTime;
      return matchesSearch && matchesCategory && matchesDeliveryOption;
    });
    const sortedProducts = sortProducts(filteredProducts, sortCriteria);
    setState(prevState => ({ ...prevState, filteredProducts: sortedProducts }));
  }, [state.searchTerm, state.selectedCategory, state.isDelivery, restaurantCards, sortCriteria, sortProducts]);

  // Function to render the carousel
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
  const renderRestaurantCard = useCallback((restaurant, index) => (
    <div key={index} className="w-48 shrink-0 p-6 sm:w-56 md:w-64 lg:w-72">
      <a href={restaurant.href} className="block h-full rounded-lg bg-slate-50 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl">
        <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
          <LazyLoadImage
            src={restaurant.imgSrc}
            alt={restaurant.name}
            width="100%"
            height="100%"
            className="size-full object-fill"
            effect="opacity"
          />
        </div>
        <div className="p-3 sm:p-4">
          <p className="w-full truncate text-center text-sm font-bold sm:text-base">{restaurant.name}</p>
        </div>
      </a>
    </div>
  ), []);

  //Return statement
  return (
    <div className="">
      <Suspense fallback={<div>Loading...</div>}>

        <nav
          id="navbarKhomasOPNavBar"
          className={`relative bg-[#f9f9f9] mx-auto inset-x-0 top-0 z-50 shadow-md transition-transform duration-300 ${isKhomasOPNavBarVisible ? '' : '-translate-y-full'
            } ${isKhomasOPNavBarSticky ? 'sticky' : ''}`}
        >
          <KhomasOPNavBar />
        </nav>

        <main className="relative z-10 ">
          {/* Header section */}
          <header className="relative w-full h-80">
            {/* Restaurant image */}
            <div className="relative mx-auto max-w-xs p-4">
              <LazyLoadImage
                src="/images/restaurants/joesbeerhouse.png"
                alt="Joe's Beerhouse"
                effect="blur"
                className="h-auto w-full object-contain"
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            {/* Restaurant information */}
            <div className="absolute bottom-0 left-0 flex w-full items-center justify-between p-4">
              <div className="px-4">
                <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">Joe's Beerhouse</h1>
                <p className="text-sm text-white sm:text-base md:text-lg">Est 1991</p>
                {/* Favorite Button */}
                <button
                  data-test-id="venue-favorite"
                  aria-label={state.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  onClick={toggleFavorite}
                  className="mt-2 rounded-full p-2 text-white transition duration-200 hover:bg-white hover:text-black"
                >
                  {/* SVG for favorite icon */}
                  <svg viewBox="0 0 24 24" className="size-6 fill-current">
                    {state.isFavorite ? (
                      <path d="M23.305 5.07498C22.3508 3.21819 20.5724 1.92407 18.5121 1.58723C16.4518 1.25039 14.3539 1.91076 12.858 3.36698L12 4.14798L11.172 3.39398C9.67891 1.90936 7.56117 1.23646 5.48499 1.58698C3.42071 1.90968 1.63893 3.2085 0.699989 5.07498C-0.569125 7.56204 -0.0794272 10.5848 1.90999 12.544L11.283 22.2C11.4713 22.3936 11.7299 22.5029 12 22.5029C12.2701 22.5029 12.5287 22.3936 12.717 22.2L22.076 12.562C24.0755 10.6019 24.5729 7.57146 23.305 5.07498Z" />
                    ) : (
                      <path d="M23.305 5.07498C22.3508 3.21819 20.5724 1.92407 18.5121 1.58723C16.4518 1.25039 14.3539 1.91076 12.858 3.36698L12 4.14798L11.172 3.39398C9.67891 1.90936 7.56117 1.23646 5.48499 1.58698C3.42071 1.90968 1.63893 3.2085 0.699989 5.07498C-0.569125 7.56204 -0.0794272 10.5848 1.90999 12.544L11.283 22.2C11.4713 22.3936 11.7299 22.5029 12 22.5029C12.2701 22.5029 12.5287 22.3936 12.717 22.2L22.076 12.562C24.0755 10.6019 24.5729 7.57146 23.305 5.07498ZM20.657 11.151L12.357 19.696C12.2628 19.7928 12.1335 19.8474 11.9985 19.8474C11.8634 19.8474 11.7341 19.7928 11.64 19.696L3.32699 11.136C1.94998 9.78618 1.60717 7.69937 2.47999 5.97998C3.13326 4.68428 4.37197 3.78375 5.80599 3.56198C7.26664 3.31621 8.75572 3.79456 9.79999 4.84498L11.33 6.24498C11.7117 6.59273 12.2953 6.59273 12.677 6.24498L14.238 4.82198C15.278 3.7873 16.7534 3.3181 18.2 3.56198C19.6323 3.78494 20.869 4.68536 21.521 5.97998C22.3943 7.7072 22.0444 9.8015 20.657 11.151Z" />
                    )}
                  </svg>
                </button>
              </div>
              {/* More options dropdown */}
              <div ref={dropdownRef} className="relative px-4">
                {/* More options button */}
                <button
                  ref={dropdownRef}
                  aria-label="More options"
                  className="p-2 text-white"
                  onClick={toggleDropdown}
                >
                  {/* SVG for more options icon */}
                  <svg
                    viewBox="0 0 24 24"
                    className="size-8 rounded-full fill-current text-white transition duration-200 hover:bg-white hover:text-black"
                  >
                    <circle cx="12" cy="5" r="2"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                    <circle cx="12" cy="19" r="2"></circle>
                  </svg>
                  {/* Dropdown menu */}
                </button>
                {state.isDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    {/* Dropdown menu items */}
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <button
                        aria-label={state.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
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
          <section
            ref={opCarouselRef}
            className="my-8"
          >
            {/* Carousel implementation */}
            <div className="container mx-auto px-4">
              <div className="relative mt-8 overflow-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                isHovering={isHovering}>
                <div
                  ref={containerRef}
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(-${state.currentIndex * (window.innerWidth < 640 ? 350 : 550)}px)`,
                    width: `${extendedCards.length * (window.innerWidth < 640 ? 350 : 550)}px`,
                  }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {extendedCards.map((card, index) => (
                    <div
                      key={index}
                      className="shrink-0 p-2 cursor-pointer"
                      style={{ width: window.innerWidth < 640 ? "350px" : "550px", height: "276px" }}
                      onClick={handleTouchStart}
                    >
                      <div
                        className="relative w-full h-full overflow-hidden rounded-md"
                      >
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center bg-gray-900 bg-opacity-30">
                          <div className="w-full h-full flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-10">
                            <div className="w-[280px] mx-auto sm:w-full sm:mx-0 md:max-w-md lg:max-w-lg">
                              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white leading-tight mb-1 sm:mb-2 text-center sm:text-left">
                                {card.title}
                              </h2>
                              <p className="text-xs sm:text-sm text-gray-300 line-clamp-4 mb-2 sm:mb-3 text-center sm:text-left">
                                {card.description}
                              </p>
                              <div className="flex justify-center sm:justify-start">
                                <button className="inline-flex items-center text-xs sm:text-sm font-medium uppercase text-white hover:underline focus:outline-none">
                                  <span>Shop Now</span>
                                  <svg
                                    className="ml-1 sm:ml-2 w-4 h-4 sm:w-5 sm:h-5"
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
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className={`absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-black bg-white bg-opacity-70 hover:bg-opacity-85 active:bg-opacity-100 transition-all duration-150 ${showControls ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                  onClick={handlePrev}
                  aria-label="Previous slide"
                >
                  &lt;
                </button>
                <button
                  className={`absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-black bg-white bg-opacity-70 hover:bg-opacity-85 active:bg-opacity-100 transition-all duration-150 ${showControls ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                  onClick={handleNext}
                  aria-label="Next slide"
                >
                  &gt;
                </button>
                <div className="absolute bottom-4 flex w-full justify-center space-x-2">
                  {cards.map((_, index) => (
                    <button
                      key={index}
                      className={`size-2 rounded-full transition-colors duration-200 ${index === state.currentIndex % cards.length
                          ? "bg-white"
                          : "bg-gray-400 bg-opacity-50 hover:bg-opacity-75"
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
          <section id="information" className="container mx-auto mb-2 px-4">
            {/* Store information content */}
            <div className="flex flex-row items-start justify-between space-y-4 px-4 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
              <div className="flex flex-col items-start space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
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
                  <span>9.8 Store Rating </span>
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
            <div className="mt-4 px-4 text-gray-700">
              {state.isDelivery
                ? "The following Food is available for delivery to your location."
                : "All Food the Restaurant has to offer"}
            </div>
          </section>

          {/* Search and Filter Section */}
          <section
            ref={searchAndFilterRef}
            className={`p-4 transition-all duration-300 ease-in-out ${state.isSticky ? 'fixed inset-x-0 z-50 bg-white shadow-md' : ''}`}
            style={{ top: state.isSticky ? 0 : 'auto' }}
          >
            <div className="container mx-auto px-4">
              {/* Mobile layout (smaller than 760px) */}
              <div className="max-[760px]:block hidden">
                {/* Search Input */}
                <div className="relative mb-4 w-full">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search products..."
                    value={state.searchTerm}
                    onChange={handleSearch}
                    onFocus={() => {
                      setIsSearchFocused(true);
                      setIsKhomasOPNavBarVisible(false);
                    }}
                    onBlur={(e) => {
                      if (!searchResultsRef.current?.contains(e.relatedTarget)) {
                        setTimeout(() => {
                          setIsSearchFocused(false);
                          setState(prevState => ({ ...prevState, searchTerm: '' }));
                          // Restore navbar visibility based on scroll position
                          const currentScrollY = window.pageYOffset;
                          const opInformationOffset = opCarouselRef.current?.getBoundingClientRect().top + currentScrollY;
                          const opMoreInformationOffset = opMoreInformationRef.current?.getBoundingClientRect().bottom + currentScrollY;
                          setIsKhomasOPNavBarVisible(
                            currentScrollY <= opInformationOffset ||
                            currentScrollY < lastScrollYRef.current ||
                            currentScrollY >= opMoreInformationOffset
                          );
                        }, 200); // 200ms delay
                      }
                    }}
                    className={`w-full rounded-full border border-gray-300 px-10 py-2 transition-transform duration-200 hover:scale-105 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ee9613] ${isSearchFocused ? 'px-10' : 'pl-4 pr-10'
                      }`}
                  />
                  <Search
                    size={20}
                    className={`absolute ${isSearchFocused ? 'left-2' : 'right-6'
                      } top-1/2 -translate-y-1/2 text-orange-500`}
                  />
                  {state.searchTerm && (
                    <X
                      size={20}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-orange-500"
                      onClick={handleClear}
                    />
                  )}
                </div>
              </div>


              {/* Desktop layout (760px and above) */}

              <div className="flex  items-center justify-between space-x-2">
                {/* Category Buttons Container */}
                <div className="max-w-[750px] overflow-x-auto">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCategorySelect("")}
                      className={`w-auto max-w-[130px] whitespace-nowrap rounded-md px-4 py-2 transition-colors duration-300 ${state.selectedCategory === "" ? "bg-[#ee9613] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                    >
                      All
                    </button>
                    {state.visibleCategories.map((category) => (
                      <button
                        key={category}
                        data-category={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`w-auto max-w-[130px] whitespace-nowrap rounded-md px-4 py-2 transition-colors duration-300 ${state.selectedCategory === category ? "bg-[#ee9613] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* More Button Container */}
                <div className="w-[160px] relative pr-16">
                  {state.hiddenCategories.length > 0 && (
                    <div className="relative">
                      <button
                        ref={moreButtonRef}
                        onClick={toggleMoreDropdown}
                        className="flex w-auto max-w-[130px] items-center whitespace-nowrap rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                      >
                        More <ChevronDownIcon className="mx-2 size-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {state.isMoreDropdownOpen && (
                        <div
                          ref={dropdownRef}
                          className="absolute -left-36 z-50 mt-1 w-auto min-w-[200px] overflow-visible rounded-md bg-white shadow-lg"
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
                                className="whitespace-nowrap rounded px-3 py-2 text-left hover:bg-gray-100"
                              >
                                {category}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Search Input */}
                <div className="w-2/5 min-[760px]:block hidden">
                  <div className="relative w-auto ">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search products..."
                      value={state.searchTerm}
                      onChange={handleSearch}
                      onFocus={() => {
                        setIsSearchFocused(true);
                        setIsKhomasOPNavBarVisible(false);
                      }}
                      onBlur={(e) => {
                        if (!searchResultsRef.current?.contains(e.relatedTarget)) {
                          setTimeout(() => {
                            setIsSearchFocused(false);
                            setState(prevState => ({ ...prevState, searchTerm: '' }));
                            // Restore navbar visibility based on scroll position
                            const currentScrollY = window.pageYOffset;
                            const opInformationOffset = opCarouselRef.current?.getBoundingClientRect().top + currentScrollY;
                            const opMoreInformationOffset = opMoreInformationRef.current?.getBoundingClientRect().bottom + currentScrollY;
                            setIsKhomasOPNavBarVisible(
                              currentScrollY <= opInformationOffset ||
                              currentScrollY < lastScrollYRef.current ||
                              currentScrollY >= opMoreInformationOffset
                            );
                          }, 200); // 200ms delay
                        }
                      }}
                      className={`w-full rounded-full border border-gray-300 px-10 py-2 transition-transform duration-200 hover:scale-105 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ee9613] ${isSearchFocused ? 'px-10' : 'pl-4 pr-10'
                        }`}
                    />
                    <Search
                      size={20}
                      className={`absolute ${isSearchFocused ? 'left-2' : 'right-6'
                        } top-1/2 -translate-y-1/2 text-orange-500`}
                    />
                    {state.searchTerm && (
                      <X
                        size={20}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-orange-500"
                        onClick={handleClear}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Restaurant Products Section */}
          <section ref={productsSectionRef} className="container mx-auto px-4 pb-4" data-test-id="restaurant-products">
            {/* Restaurant products content */}
            <div className="border-b border-gray-200 py-4">
              <div data-testid="product-list-header" className="flex items-center px-4">
                <h2 className="text-lg font-bold">Restaurant Products</h2>
                <select
                  value={sortCriteria}
                  onChange={(e) => setSortCriteria(e.target.value)}
                  className="ml-auto rounded-md border px-4 py-2"
                >
                  <option value="recommended">Sort by: Recommended</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="nameAsc">Name: A to Z</option>
                  <option value="nameDesc">Name: Z to A</option>
                </select>
              </div>
              <div className="h-[450px] overflow-y-auto sm:h-[500px] md:h-[450px] lg:h-[600px]">
                <div className="grid grid-cols-1 gap-4 p-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {state.filteredProducts.map((product, index) => (
                    <a key={index}
                      href={product.href}
                      className="mx-auto flex min-h-[150px] w-full max-w-[450px] overflow-hidden rounded-lg bg-slate-50 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl relative group"
                      data-test-id="product-card-link"
                    >
                      <div className="relative w-1/3 overflow-hidden">
                        <LazyLoadImage
                          src={product.imgSrc}
                          alt={product.name}
                          className="absolute left-0 top-0 size-full object-cover"
                          effect="opacity"
                        />
                        {product.discount && (
                          <div
                            data-testid="product-discount-label"
                            className="absolute right-2 top-2 rounded-full bg-yellow-400 px-2 py-1 text-xs text-black"
                          >
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                      <div className="flex w-2/3 flex-col justify-between p-4">
                        <div>
                          <h3 data-testid="product-name" className="mb-1 truncate text-sm font-bold sm:text-base">
                            {product.name}
                          </h3>
                          <div className="mb-2 flex items-center text-xs text-gray-600 sm:text-sm">
                            <span className="font-semibold text-[#ee9613]">{product.priceRange}</span>
                            <span className="mx-2">•</span>
                            <span className="truncate">{product.cuisine}</span>
                          </div>
                          <p className="mb-2 line-clamp-2 text-xs text-gray-600">{product.description}</p>
                        </div>
                        <div className="text-xs text-gray-500">
                          Pickup: {product.pickupTime}
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
                      <div className="absolute right-2 top-2 flex h-8 w-12 items-center justify-center rounded bg-[#ee9613] text-lg text-white md:opacity-0 md:transition-opacity md:duration-200 md:group-hover:opacity-100">
                        +
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/*More Information Section */}
          <section ref={opMoreInformationRef} id="moreInformation" className="container mx-auto mt-8 px-4">
            {/* More information content */}
            <div className="flex flex-col md:flex-row space-y-4 p-4 md:space-x-8 ">
              <div className="flex flex-row  justify-between sm:flex-row items-center   md:w-1/3">
                <div className="flex flex-row items-start justify-between space-x-4 sm:space-y-0 ">

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-md font-semibold">Store Information</h3>
                      <p className="font-bold text-[#ee9613]">Joe's Beerhouse</p>
                      <p>German Cuisine</p>
                      <p>Steakhouse</p>
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

                  <div className="space-y-8 ">
                    <h3 className="text-md font-semibold">More information</h3>
                    <a href="tel:+972543131665" className="font-bold text-[#ee9613] hover:underline">
                      +972543131665
                    </a>
                    <div>
                      <h3 className="text-md font-semibold">Opening hours</h3>
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
                </div>
              </div>
              <div className="md:w-2/3 ">
                <div ref={mapContainerRef} className="h-[400px] w-full"></div>
              </div>
            </div>
          </section>

          {/* Similar Restaurants Section */}
          <section className="container mx-auto mt-8 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:px-8">
            <div
              className="border-white-A700 relative rounded-r-[50px] border border-solid bg-[#ee9613] p-4 shadow-xl sm:rounded-r-[100px] sm:p-6 md:rounded-r-[150px] md:p-10"
              style={{ width: "50%", maxWidth: "1000px" }}
            >
              <h2 className="text-left font-Agbalumo text-2xl font-bold text-black sm:text-3xl md:text-4xl lg:text-5xl">
                Similar Restaurants
              </h2>
            </div>
          </section>

          {/* Restaurants Carousel */}
          {renderCarousel(restaurants, restaurantsscroll, renderRestaurantCard)}
        </main>
        {/* Footer */}
        <Footer />
      </Suspense>
    </div>
  );
}
// PropTypes definition (if needed)
JoesBeerhouse.propTypes = {
  // Add prop types here if needed
};

export default JoesBeerhouse;