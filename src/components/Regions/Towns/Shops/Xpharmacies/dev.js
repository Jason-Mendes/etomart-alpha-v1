import React, { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from "axios";
import mapboxgl from "mapbox-gl";
import { toast } from "react-toastify";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import PropTypes from 'prop-types';
import OPNavBar from "../../../../OPNavBar";

import 'react-lazy-load-image-component/src/effects/blur.css';

// Lazy-loaded components
const Footer = lazy(() => import("../../../../Footer"));


// Custom hook for performance measurement
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

// Constants
const VISIBLE_CATEGORIES_COUNT = 8;
const MARKER_COORDINATES = [
  { lng: 17.090396711968985, lat: -22.550459904783143 }, // Joe's Beerhouse
  { lng: 17.073723364157306, lat: -22.561939983264068 }, // User's home
];

function JoesBeerhouse() {
  usePerformanceMeasure('JoesBeerhouse');

  // Combined state
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

  const [isOPNavbarSticky, setIsOPNavbarSticky] = useState(false);
  const [isOPNavbarVisible, setIsOPNavbarVisible] = useState(true);

  const opInformationRef = useRef(null);
  const opMoreInformationRef = useRef(null);


  const productsRef = useRef(null);


  // Refs
  const containerRef = useRef(null);
  const mapContainerRef = useRef(null);
  const restaurantsscroll = useRef(null);
  const productsSectionRef = useRef(null);
  const searchAndFilterRef = useRef(null);
  const moreButtonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Memoized data
  const cards = useMemo(() => [
    {
      title: "Fine Dining",
      description:
        "Experience exquisite gourmet meals from top-rated fine dining restaurants. Indulge in luxury and sophistication.",
      image: "/images/restaurants/fine-dining.webp",
    },
    {
      title: "Fast Food",
      description:
        "Get your favorite fast food delivered hot and fresh. Burgers, fries, pizza, and more, just a click away.",
      image: "/images/restaurants/fast-food.webp",
    },
    {
      title: "Cafes & Coffee Shops",
      description:
        "Enjoy a cozy cafe atmosphere with freshly brewed coffee and delicious pastries. Perfect for a relaxing break.",
      image: "/images/restaurants/cafe-coffee.webp",
    },
    {
      title: "Seafood",
      description:
        "Savor the taste of the ocean with fresh seafood dishes from top seafood restaurants. Delivered right to your door.",
      image: "/images/restaurants/seafood.webp",
    },
    // {
    //     title: "Asian Cuisine",
    //     description: "Explore the flavors of Asia with a variety of dishes from Chinese, Japanese, Thai, and more. Authentic and delicious.",
    //     image: "/images/restaurants/asian-cuisine.webp"
    // },
    //   {
    //     title: "Italian Cuisine",
    //     description: "Delight in classic Italian dishes, from pasta to pizza. Enjoy the rich and hearty flavors of Italy.",
    //     image: "/images/restaurants/italian-cuisine.webp"
    // },
    // {
    //     title: "Mexican Cuisine",
    //     description: "Spice up your meal with vibrant and flavorful Mexican cuisine. Tacos, burritos, and more, delivered fast.",
    //     image: "/images/restaurants/mexican-cuisine.webp"
    // },
    // {
    //     title: "Vegetarian & Vegan",
    //     description: "Discover delicious vegetarian and vegan options that will satisfy your cravings. Healthy and tasty.",
    //     image: "/images/restaurants/vegetarian-vegan.webp"
    // },
    // {
    //     title: "Desserts",
    //     description: "Indulge in sweet treats and desserts from local bakeries and dessert shops. Perfect for any occasion.",
    //     image: "/images/restaurants/desserts.webp"
    // },
    // {
    //     title: "Healthy Options",
    //     description: "Choose from a variety of healthy meal options that cater to your dietary needs. Fresh, nutritious, and delicious.",
    //     image: "/images/restaurants/healthy-options.webp"
    // },

    // Add more cards as needed
  ], []);

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
      name: "Nordic Food",
      imgSrc: "/images/restaurants/n.png",
      href: "/en/stores/nordic-food/?show_wolt_plus_offer=true",
      discount: 20,
      isEtomartStore: false,
      priceRange: "€€€",
      cuisine: "Nordic",
      description: "Tasty burger with tomato cheese and onions",
      pickupTime: "20–40 min",
      deliveryTime: true,
    },
    {
      name: "Italian Cuisine",
      imgSrc: "/images/restaurants/ic.png",
      href: "/en/stores/nordic-food/?show_wolt_plus_offer=true",
      discount: 20,
      isEtomartStore: false,
      priceRange: "€€€",
      cuisine: "Italian",
      description: "Delicious pasta with tomato sauce and fresh basil",
      pickupTime: "20–40 min",
      deliveryTime: true,
    },
    {
      name: "Sushi Delight",
      imgSrc: "/images/restaurants/i.png", // Reusing image
      href: "/en/stores/sushi-delight/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€€€",
      cuisine: "Sushi",
      description: "Fresh sushi rolls with wasabi and soy sauce",
      pickupTime: "25–45 min",
      deliveryTime: true,
    },
    {
      name: "Taco Fiesta",
      imgSrc: "/images/restaurants/n.png", // Reusing image
      href: "/en/stores/taco-fiesta/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€€",
      cuisine: "Mexican",
      description: "Spicy tacos with beef, cheese, and guacamole",
      pickupTime: "15–30 min",
      deliveryTime: true,
    },
    {
      name: "Curry Corner",
      imgSrc: "/images/restaurants/v.png", // Reusing image
      href: "/en/stores/curry-corner/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€€€",
      cuisine: "Indian",
      description: "Flavorful chicken curry with basmati rice",
      pickupTime: "20–35 min",
      deliveryTime: true,
    },
    {
      name: "Peking Duck",
      imgSrc: "/images/restaurants/t.png", // Reusing image
      href: "/en/stores/peking-duck/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€€€",
      cuisine: "Chinese",
      description: "Crispy Peking duck with hoisin sauce",
      pickupTime: "30–50 min",
      deliveryTime: true,
    },
    {
      name: "BBQ Nation",
      imgSrc: "/images/restaurants/n.png", // Reusing image
      href: "/en/stores/bbq-nation/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€€€",
      cuisine: "Barbecue",
      description: "Smoked ribs with a tangy barbecue sauce",
      pickupTime: "20–40 min",
      deliveryTime: true,
    }
  ], []);

  const restaurants = useMemo(() => [
    {
      name: "Joe's Beerhouse",
      imgSrc: "/images/restaurants/joesbeerhouse.png",
      href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse",
    },
    {
      name: "The Stellenbosch Wine Bar",
      imgSrc: "/images/restaurants/stellenbosch.png",
      href: "/en/discovery/category/stellenbosch",
    },
    {
      name: "O Portuga",
      imgSrc: "/images/restaurants/oportuga.png",
      href: "/en/discovery/category/oportuga",
    },
    {
      name: "The Social",
      imgSrc: "/images/restaurants/thesocial.png",
      href: "/en/discovery/category/thesocial",
    },
    {
      name: "Sardinia Blue Olive",
      imgSrc: "/images/restaurants/sardiniablueolive.png",
      href: "/en/discovery/category/sardiniablueolive",
    },
    {
      name: "Slowtown Coffee Roasters",
      imgSrc: "/images/restaurants/slowtown.png",
      href: "/en/discovery/category/slowtown",
    },
  ], []);

  const extendedCards = useMemo(() => [...cards, ...cards, ...cards], [cards]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(restaurantCards.map(card => card.cuisine));
    return Array.from(uniqueCategories);
  }, [restaurantCards]);

  // Mapbox setup
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

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
      padding: { top: 20, bottom: 30, left: 20, right: 20 },
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
      toast.error("Failed to fetch route. Please try again later.");
    }
  }, []);

  const scrollToProducts = useCallback(() => {
    if (productsSectionRef.current) {
      const yOffset = -100;
      const y = productsSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  const handleSearch = useCallback((event) => {
    const searchTerm = event.target.value;
    setState(prevState => ({ ...prevState, searchTerm }));
    scrollToProducts();
  }, [scrollToProducts]);

  const handleCategorySelect = useCallback((category) => {
    setState(prevState => ({ ...prevState, selectedCategory: category }));
    scrollToProducts();
  }, [scrollToProducts]);

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

  const toggleDropdown = useCallback(() => {
    setState(prevState => ({ ...prevState, isDropdownOpen: !prevState.isDropdownOpen }));
  }, []);

  const handleDotClick = useCallback((index) => {
    setState(prevState => ({ ...prevState, currentIndex: index }));
    pauseScroll();
  }, [pauseScroll]);

  const toggleFavorite = useCallback(() => {
    setState(prevState => {
      const newIsFavorite = !prevState.isFavorite;
      toast.success(newIsFavorite ? "Store added to favorites" : "Store removed from favorites");
      return { ...prevState, isFavorite: newIsFavorite };
    });
  }, []);

  const getMoreInfo = useCallback(() => {
    alert("More information about the store");
  }, []);

  const toggleMoreDropdown = useCallback(() => {
    setState(prevState => ({ ...prevState, isMoreDropdownOpen: !prevState.isMoreDropdownOpen }));
  }, []);

  // Effects
  //OPNavbar scroll effect
  useEffect(() => {
    let lastScrollYOPNavbar = window.pageYOffset;
    let initialTopOPNavbar = null;

    const handleScrollOPNavbar = () => {
      const currentScrollYOPNavbar = window.pageYOffset;
      const opInformationRect = opInformationRef.current?.getBoundingClientRect();
      const opMoreInformationRect = opMoreInformationRef.current?.getBoundingClientRect();

      if (opInformationRect && opMoreInformationRect) {
        if (initialTopOPNavbar === null) {
          initialTopOPNavbar = opInformationRect.top + currentScrollYOPNavbar;
        }

        const opInformationOffset = initialTopOPNavbar;
        const opMoreInformationOffset = opMoreInformationRect.bottom + currentScrollYOPNavbar;

        setIsOPNavbarVisible(currentScrollYOPNavbar <= lastScrollYOPNavbar || currentScrollYOPNavbar <= opInformationOffset);
        setIsOPNavbarSticky(currentScrollYOPNavbar >= opInformationOffset && currentScrollYOPNavbar < opMoreInformationOffset - opInformationRect.height);

        lastScrollYOPNavbar = currentScrollYOPNavbar;
      }
    };

    window.addEventListener('scroll', handleScrollOPNavbar, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollOPNavbar);
  }, []);

  //scroll effect
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

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      visibleCategories: categories.slice(0, VISIBLE_CATEGORIES_COUNT),
      hiddenCategories: categories.slice(VISIBLE_CATEGORIES_COUNT),
    }));
  }, [categories]);

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

    const handleScroll = () => {
      setState(prevState => ({ ...prevState, isMoreDropdownOpen: false }));
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

  useEffect(() => {
    let interval;
    if (!state.isPaused) {
      interval = setInterval(handleNext, 5000);
    }
    return () => clearInterval(interval);
  }, [state.isPaused, handleNext]);

  useEffect(() => {
    if (mapContainerRef.current) {
      initializeMap(mapContainerRef.current);
    }
  }, [initializeMap]);

  // Filter products based on search term and selected category
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
    setState(prevState => ({ ...prevState, filteredProducts }));
  }, [state.searchTerm, state.selectedCategory, state.isDelivery, restaurantCards]);

  // Render functions
  const renderCarousel = useCallback((items, scrollRef, itemRenderer) => (
    <div className="relative mt-4 sm:mt-6 md:mt-8">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-8 md:w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-8 md:w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] p-1 rounded-br-[25px] rounded-tr-[25px] sm:rounded-br-[50px] sm:rounded-tr-[50px] z-20"
          onClick={() => scrollLeft(scrollRef)}
          aria-label="Scroll left"
        >
          &#9664;
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto custom-scrollbar space-x-4 p-4 sm:p-6 md:p-8"
        >
          {items.map((item, index) => itemRenderer(item, index))}
        </div>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] p-1 rounded-bl-[25px] rounded-tl-[25px] sm:rounded-bl-[50px] sm:rounded-tl-[50px] z-20"
          onClick={() => scrollRight(scrollRef)}
          aria-label="Scroll right"
        >
          &#9654;
        </button>
      </div>
    </div>
  ), [scrollLeft, scrollRight]);

  const renderRestaurantCard = useCallback((restaurant, index) => (
    <div key={index} className="flex-shrink-0 w-full max-w-[300px]">
      <a href={restaurant.href} className="block h-full rounded-lg bg-slate-50 shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200">
        <div className="relative w-full pb-[100%] overflow-hidden rounded-t-lg">
          <LazyLoadImage
            src={restaurant.imgSrc}
            alt={restaurant.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
            effect="opacity"
          />
        </div>
        <div className="p-3 sm:p-4">
          <p className="text-center font-bold truncate w-full text-sm sm:text-base">{restaurant.name}</p>
        </div>
      </a>
    </div>
  ), []);

  return (
    <div className="bg-white">
      <Suspense fallback={<div>Loading...</div>}>
        <nav
          id="navbarOPNavbar"
          className={`hidden fixed top-0 left-0 right-0 z-40 bg-blue-500 shadow-md transition-transform duration-300 ${isOPNavbarVisible ? '' : '-translate-y-full'} ${isOPNavbarSticky ? 'sticky' : ''}`}
        >
          <OPNavBar />
        </nav>

        <main className="relative z-10 pt-20"> {/* Add pt-16 to account for the fixed navbar */}
          {/* Header section */}
          <header className="relative w-full h-[510px]">
            <div className="relative w-full h-full">
              <LazyLoadImage
                src="/images/restaurants/joesbeerhouse.png"
                alt="Joe's Beerhouse"
                effect="blur"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-4 flex justify-between items-center w-full">
              <div className="px-4">
                <h1 className="text-white text-4xl font-bold">Joe's Beerhouse</h1>
                <p className="text-white text-lg">Est 1991</p>
                {/* Favorite Button */}
                <button
                  data-test-id="venue-favorite"
                  aria-label={state.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                  onClick={toggleFavorite}
                  className="mt-2 text-white p-2 rounded-full hover:bg-white hover:text-black transition duration-200"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    {state.isFavorite ? (
                      <path d="M23.305 5.07498C22.3508 3.21819 20.5724 1.92407 18.5121 1.58723C16.4518 1.25039 14.3539 1.91076 12.858 3.36698L12 4.14798L11.172 3.39398C9.67891 1.90936 7.56117 1.23646 5.48499 1.58698C3.42071 1.90968 1.63893 3.2085 0.699989 5.07498C-0.569125 7.56204 -0.0794272 10.5848 1.90999 12.544L11.283 22.2C11.4713 22.3936 11.7299 22.5029 12 22.5029C12.2701 22.5029 12.5287 22.3936 12.717 22.2L22.076 12.562C24.0755 10.6019 24.5729 7.57146 23.305 5.07498Z" />
                    ) : (
                      <path d="M23.305 5.07498C22.3508 3.21819 20.5724 1.92407 18.5121 1.58723C16.4518 1.25039 14.3539 1.91076 12.858 3.36698L12 4.14798L11.172 3.39398C9.67891 1.90936 7.56117 1.23646 5.48499 1.58698C3.42071 1.90968 1.63893 3.2085 0.699989 5.07498C-0.569125 7.56204 -0.0794272 10.5848 1.90999 12.544L11.283 22.2C11.4713 22.3936 11.7299 22.5029 12 22.5029C12.2701 22.5029 12.5287 22.3936 12.717 22.2L22.076 12.562C24.0755 10.6019 24.5729 7.57146 23.305 5.07498ZM20.657 11.151L12.357 19.696C12.2628 19.7928 12.1335 19.8474 11.9985 19.8474C11.8634 19.8474 11.7341 19.7928 11.64 19.696L3.32699 11.136C1.94998 9.78618 1.60717 7.69937 2.47999 5.97998C3.13326 4.68428 4.37197 3.78375 5.80599 3.56198C7.26664 3.31621 8.75572 3.79456 9.79999 4.84498L11.33 6.24498C11.7117 6.59273 12.2953 6.59273 12.677 6.24498L14.238 4.82198C15.278 3.7873 16.7534 3.3181 18.2 3.56198C19.6323 3.78494 20.869 4.68536 21.521 5.97998C22.3943 7.7072 22.0444 9.8015 20.657 11.151Z" />
                    )}
                  </svg>
                </button>
              </div>
              <div className="px-4">
                <button
                  aria-label="More options"
                  className="text-white p-2"
                  onClick={toggleDropdown}
                >
                  <svg
                    ref={dropdownRef}
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-white fill-current rounded-full hover:bg-white hover:text-black transition duration-200"
                  >
                    <circle cx="12" cy="5" r="2"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                    <circle cx="12" cy="19" r="2"></circle>
                  </svg>
                </button>
                {state.isDropdownOpen && (
                  <div className="absolute right-4 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                      <button
                        aria-label={state.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                        onClick={toggleFavorite}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                        role="menuitem"
                      >
                        {state.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                      </button>
                      <button
                        onClick={getMoreInfo}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                        role="menuitem"
                      >
                        More Information
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
                      className="p-2 flex-shrink-0"
                      style={{ width: "576px", height: "276px" }}
                    >
                      <div
                        className="h-full w-full rounded-md overflow-hidden bg-cover bg-center"
                        style={{ backgroundImage: `url(${card.image})` }}
                      >
                        <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                          <div className="px-10 max-w-xl">
                            <h2 className="text-2xl text-white font-semibold">
                              {card.title}
                            </h2>
                            <p className="mt-2 text-gray-400">{card.description}</p>
                            <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                              <span>Shop Now</span>
                              <svg
                                className="h-5 w-5 ml-2"
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
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                  onClick={handlePrev}
                  aria-label="Previous slide"
                >
                  &lt;
                </button>
                <button
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                  onClick={handleNext}
                  aria-label="Next slide"
                >
                  &gt;
                </button>
                <div className="absolute bottom-4 w-full flex justify-center space-x-2">
                  {cards.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 w-2 rounded-full ${index === state.currentIndex % cards.length ? "bg-white" : "bg-gray-400"
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
          <section ref={opInformationRef} id="information" className="container mx-auto px-4 mb-2">
            {/* <section id="products" ref={productsRef} className="container mx-auto px-4 pb-4" data-test-id="restaurant-products"> */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 px-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
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
                <button type="button" className="text-[#ee9613] flex items-center space-x-1">
                  <svg viewBox="0 0 24 24" width="16">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.993 5.376 18.624.007 12 0zm.25 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75c0 .138.112.25.25.25h.75a1 1 0 010 2z"></path>
                  </svg>
                  <span>See more information</span>
                </button>
              </div>
              <div className="flex items-center justify-end border-solid p-1 space-x-2 bg-gray-200 rounded-full">
                <button
                  className={`px-2 py-1 rounded-full border border-gray-300 text-black transition-colors duration-300 ${state.isDelivery ? "bg-[#ee9613] text-white" : "bg-gray-200"}`}
                  onClick={() => setState(prevState => ({ ...prevState, isDelivery: true }))}
                >
                  Delivery
                </button>
                <button
                  className={`px-2 py-1 rounded-full border border-gray-300 text-black transition-colors duration-300 ${state.isDelivery ? "bg-gray-200" : "bg-[#ee9613] text-white"}`}
                  onClick={() => setState(prevState => ({ ...prevState, isDelivery: false }))}
                >
                  Pickup
                </button>
              </div>
            </div>
            <div className="text-gray-700 px-4 mt-4">
              The store isn't delivering to your location, but you can still place an order for pickup.
            </div>
          </section>

          {/* Search and Filter Section */}
          <section
            ref={searchAndFilterRef}
            className={`p-4 transition-all duration-300 ease-in-out ${state.isSticky ? 'fixed left-0 right-0 z-50 bg-white shadow-md' : ''}`}
            style={{ top: state.isSticky ? 0 : 'auto' }}
          >
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
                {/* Category Buttons Container */}
                <div className="w-full md:w-2/3 overflow-x-auto">
                  <div className="flex items-center space-x-2 pb-2 md:pb-0">
                    <button
                      onClick={() => handleCategorySelect("")}
                      className={`px-4 py-2 rounded-md transition-colors duration-300 whitespace-nowrap ${state.selectedCategory === "" ? "bg-[#ee9613] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    >
                      All
                    </button>
                    {state.visibleCategories.map((category) => (
                      <button
                        key={category}
                        data-category={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`px-4 py-2 rounded-md transition-colors duration-300 whitespace-nowrap ${state.selectedCategory === category ? "bg-[#ee9613] text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* More Button Container */}
                <div className="relative w-full md:w-auto min-w-[150px] md:min-w-[150px] lg:min-w-[150px]">
                  {state.hiddenCategories.length > 0 && (
                    <div className="relative">
                      <button
                        ref={moreButtonRef}
                        onClick={toggleMoreDropdown}
                        className="px-8 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center whitespace-nowrap"
                      >
                        More <ChevronDownIcon className="w-4 h-4 ml-6" />
                      </button>

                      {/* Dropdown Menu */}
                      {state.isMoreDropdownOpen && (
                        <div
                          ref={dropdownRef}
                          className="absolute left-0 mt-1 bg-white shadow-lg rounded-md z-50 w-auto min-w-[200px] overflow-visible"
                          style={{ top: 'calc(100% + 2px)' }}
                        >
                          <div className="p-2 grid grid-cols-2 gap-2">
                            {state.hiddenCategories.map((category) => (
                              <button
                                key={category}
                                onClick={() => {
                                  handleCategorySelect(category);
                                  setState(prevState => ({ ...prevState, isMoreDropdownOpen: false }));
                                }}
                                className="px-3 py-2 text-left hover:bg-gray-100 rounded whitespace-nowrap"
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
                <div className="relative w-full md:w-1/3">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={state.searchTerm}
                    onChange={handleSearch}
                    className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#ee9613] transform hover:bg-gray-200 hover:scale-105 transition-transform duration-200"
                  />
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <path
                      d="M23.384 21.6191L16.855 15.0901C19.8122 11.2028 19.2517 5.689 15.5728 2.47626C11.894 -0.736477 6.35493 -0.549369 2.90126 2.90431C-0.552421 6.35798 -0.739529 11.897 2.47321 15.5759C5.68595 19.2548 11.1997 19.8152 15.087 16.8581L21.616 23.3871C22.1078 23.8667 22.8923 23.8667 23.384 23.3871C23.8718 22.8987 23.8718 22.1075 23.384 21.6191ZM2.75002 9.50007C2.75002 5.77215 5.7721 2.75007 9.50002 2.75007C13.2279 2.75007 16.25 5.77215 16.25 9.50007C16.25 13.228 13.2279 16.2501 9.50002 16.2501C5.77393 16.2457 2.75443 13.2262 2.75002 9.50007Z"
                      fill="#ee9613"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* Restaurant Products Section */}
          <section ref={productsSectionRef} className="container mx-auto px-4 pb-4" data-test-id="restaurant-products">
            <div className="py-4 border-b border-gray-200">
              <div data-testid="product-list-header" className="flex items-center px-4">
                <h2 className="text-lg font-bold">Restaurant Products</h2>
                <button
                  data-test-id="product-list-header-sort"
                  className="ml-auto text-blue-600 hover:underline"
                >
                  Sort by
                </button>
              </div>
              <div className="overflow-y-auto h-[450px] sm:h-[500px] md:h-[550px] lg:h-[600px]">
                <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
                  {state.filteredProducts.map((product, index) => (
                    <a key={index}
                      href={product.href}
                      className="flex w-full max-w-[550px] min-h-[150px] mx-auto rounded-lg bg-slate-50 shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200 overflow-hidden"
                      data-test-id="product-card-link"
                    >
                      <div className="relative w-1/3 overflow-hidden">
                        <LazyLoadImage
                          src={product.imgSrc}
                          alt={product.name}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                          effect="opacity"
                        />
                        {product.discount && (
                          <div
                            data-testid="product-discount-label"
                            className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full"
                          >
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                      <div className="w-2/3 p-4 flex flex-col justify-between">
                        <div>
                          <h3 data-testid="product-name" className="font-bold text-sm sm:text-base mb-1 truncate">
                            {product.name}
                          </h3>
                          <div className="flex items-center text-xs sm:text-sm mb-2 text-gray-600">
                            <span className="text-[#ee9613] font-semibold">{product.priceRange}</span>
                            <span className="mx-2">•</span>
                            <span className="truncate">{product.cuisine}</span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                        </div>
                        <div className="text-xs text-gray-500">
                          Pickup: {product.pickupTime}
                        </div>
                        <div className="mt-auto">
                          <div className="text-black text-xs py-1 rounded">
                            <span className="text-black">Etomart </span>
                            {product.deliveryTime ? (
                              <span className="text-[#ee9613] font-bold">Delivery Available</span>
                            ) : (
                              <span className="text-[#ee1313] font-bold">Delivery Not Available</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 bg-[#ee9613] text-white text-lg w-12 h-8 flex items-center justify-center rounded">
                        +
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/*More Information Section */}
          <section ref={opMoreInformationRef} id="moreInformation" className="container mx-auto p-4 mt-8">
            <div className="flex flex-col md:flex-row md:space-x-8">
              <div className="md:w-1/3 space-y-8">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-md font-semibold">Store Information</h3>
                    <p className="text-[#ee9613] font-bold">Joe's Beerhouse</p>
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
                        className="text-[#ee9613] font-bold hover:underline"
                      >
                        See map
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 space-y-8">
                <h3 className="text-md font-semibold">More information</h3>
                <a href="tel:+972543131665" className="text-[#ee9613] font-bold hover:underline">
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
              <div className="w-full md:w-2/3 h-64 md:h-96 relative">
                <div ref={mapContainerRef} className="absolute inset-0" />
              </div>
            </div>
          </section>

          {/* Similar Restaurants Section */}
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 md:mt-16">
            <div
              className="bg-[#ee9613] border border-solid border-white-A700 rounded-tr-[50px] rounded-br-[50px] sm:rounded-tr-[100px] sm:rounded-br-[100px] md:rounded-tr-[150px] md:rounded-br-[150px] shadow-xl relative p-4 sm:p-6 md:p-10"
              style={{ width: "50%", maxWidth: "1000px" }}
            >
              <h2 className="text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black font-bold font-Agbalumo">
                Similar Restaurants
              </h2>
            </div>
          </section>

          {/* Restaurants Carousel */}
          {renderCarousel(restaurants, restaurantsscroll, renderRestaurantCard)}
        </main>
        <Footer />
      </Suspense>
    </div>
  );
}

JoesBeerhouse.propTypes = {
  // Add prop types here if needed
};

export default JoesBeerhouse;