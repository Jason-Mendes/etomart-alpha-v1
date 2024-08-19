import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from "axios";
import mapboxgl from "mapbox-gl";
import { toast } from "react-toastify";
import Footer from "../../../../Footer";
import OPNavBar from "../../../../OPNavBar";
import 'react-lazy-load-image-component/src/effects/blur.css';
import PropTypes from 'prop-types';

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

function JoesBeerhouse() {
  usePerformanceMeasure('JoesBeerhouse');

  // Combined state
  const [state, setState] = useState({
    isDelivery: true,
    searchTerm: "",
    currentIndex: 0,
    isPaused: false,
    isDropdownOpen: false,
    map: null,
  });

  // Refs
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const mapContainerRef = useRef(null);

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

  const extendedCards = useMemo(() => [...cards, ...cards, ...cards], [cards]);

  const storescards1 = useMemo(() => [
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
      description:
        "Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and onionsTasty burger with tomato cheese and onions",
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
      cuisine: "Nordic",
      description:
        "Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and onionsTasty burger with tomato cheese and onions",
      pickupTime: "20–40 min",
      deliveryTime: true,
    },
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
      description:
        "Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and onionsTasty burger with tomato cheese and onions",
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
      cuisine: "Nordic",
      description:
        "Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and onionsTasty burger with tomato cheese and onions",
      pickupTime: "20–40 min",
      deliveryTime: true,
    },
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
      description:
        "Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and onionsTasty burger with tomato cheese and onions",
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
      cuisine: "Nordic",
      description:
        "Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and onionsTasty burger with tomato cheese and onions",
      pickupTime: "20–40 min",
      deliveryTime: true,
    },
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

    // Add more items as needed
  ], []);

  // Mapbox setup
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const MARKER_COORDINATES = [
    { lng: 17.090396711968985, lat: -22.550459904783143 }, // Joe's Beerhouse
    { lng: 17.073723364157306, lat: -22.561939983264068 }, // User's home
  ];

  // Callbacks
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

  const addToFavorites = useCallback(() => {
    toast.success("Store added to favorites");
  }, []);

  const getMoreInfo = useCallback(() => {
    alert("More information about the store");
  }, []);

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
      // TODO: Implement proper error handling and user feedback
    }
  }, []);

  // Effects
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

  // JSX
  return (
    <div className="bg-white">
      <OPNavBar />
      <main className="relative z-10">
        {/* Header section */}
        <header className="relative">
          <div className="relative">
            <LazyLoadImage
              src="/images/restaurants/joesbeerhouse.png"
              alt="Joe's Beerhouse"
              effect="blur"
              className="w-full h-[510px] object-scale-down"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          <div className="absolute bottom-0 left-0 p-4 flex justify-between items-center w-full">
            <div className="px-4">
              <h1 className="text-white text-4xl font-bold">Joe's Beerhouse</h1>
              <p className="text-white text-lg">Est 1991</p>
              <button
                data-test-id="venue-favorite"
                aria-label="Add to Favorites"
                onClick={addToFavorites}
                className="mt-2 text-white p-2 rounded-full hover:bg-white hover:text-black transition duration-200"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M23.305 5.07498C22.3508 3.21819 20.5724 1.92407 18.5121 1.58723C16.4518 1.25039 14.3539 1.91076 12.858 3.36698L12 4.14798L11.172 3.39398C9.67891 1.90936 7.56117 1.23646 5.48499 1.58698C3.42071 1.90968 1.63893 3.2085 0.699989 5.07498C-0.569125 7.56204 -0.0794272 10.5848 1.90999 12.544L11.283 22.2C11.4713 22.3936 11.7299 22.5029 12 22.5029C12.2701 22.5029 12.5287 22.3936 12.717 22.2L22.076 12.562C24.0755 10.6019 24.5729 7.57146 23.305 5.07498ZM20.657 11.151L12.357 19.696C12.2628 19.7928 12.1335 19.8474 11.9985 19.8474C11.8634 19.8474 11.7341 19.7928 11.64 19.696L3.32699 11.136C1.94998 9.78618 1.60717 7.69937 2.47999 5.97998C3.13326 4.68428 4.37197 3.78375 5.80599 3.56198C7.26664 3.31621 8.75572 3.79456 9.79999 4.84498L11.33 6.24498C11.7117 6.59273 12.2953 6.59273 12.677 6.24498L14.238 4.82198C15.278 3.7873 16.7534 3.3181 18.2 3.56198C19.6323 3.78494 20.869 4.68536 21.521 5.97998C22.3943 7.7072 22.0444 9.8015 20.657 11.151Z"></path>
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
                      onClick={addToFavorites}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                      role="menuitem"
                    >
                      Add to Favorites
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
              <button type="button" className="text-[#ee9613] flex items-center space-x-1">
                <svg viewBox="0 0 24 24" width="16">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.993 5.376 18.624.007 12 0zm.25 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75c0 .138.112.25.25.25h.75a1 1 0 010 2z"></path>
                </svg>
                <span>See more information</span>
              </button>
            </div>
            <div className="flex items-end justify-end border-solid p-1 space-x-2 bg-gray-200 rounded-full">
              <button
                className={`px-2 py-1 rounded-full border border-gray-300 text-gray-700 transition-colors duration-300 ${state.isDelivery ? "bg-white" : "bg-gray-200"}`}
                onClick={() => setState(prevState => ({ ...prevState, isDelivery: true }))}
              >
                Delivery
              </button>
              <button
                className={`px-2 py-1 rounded-full border border-gray-300 text-gray-700 transition-colors duration-300 ${state.isDelivery ? "bg-gray-200" : "bg-white"}`}
                onClick={() => setState(prevState => ({ ...prevState, isDelivery: false }))}
              >
                Pickup
              </button>
            </div>
          </div>
          <div className="text-gray-700 px-4">
            The store isn't delivering to your location, but you can still place an order for pickup.
          </div>
        </section>

        {/* Venues List */}
        <section className="container mx-auto px-4 pb-4" data-test-id="discovery.venuesList">
          <div className="py-4 border-b border-gray-200">
            <div data-testid="venue-list-header" className="flex items-center p-4">
              <h2 className="text-lg font-bold">All venues</h2>
              <button
                data-test-id="venue-list-header-sort"
                className="ml-auto text-blue-600 hover:underline"
              >
                Sort by
              </button>
            </div>
            <section className="my-8">
              <div className="container mx-auto px-4">
                <div className="overflow-y-auto h-[200px] md:h-[350px] ">
                  <div
                    className="grid gap-6 py-2"
                    style={{
                      '--img-width': '134px',  // Adjust this value to change image width
                      '--img-height': '134px', // Adjust this value to change image height
                      gridTemplateColumns: 'repeat(auto-fill, minmax(calc(var(--img-width) * 2.5), 1fr))'
                    }}
                  >
                    {storescards1.map((store, index) => (

                      <a key={index}
                        href={store.href}
                        className="flex bg-white rounded-lgshadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
                        data-test-id="merchant-container-link"
                        style={{
                          minHeight: 'var(--img-height)'
                        }}
                      >
                        <div
                          className="relative flex-shrink-0 rounded-l-lg overflow-hidden"
                          style={{
                            width: 'var(--img-width)',
                            height: 'var(--img-height)'
                          }}
                        >
                          <LazyLoadImage
                            src={store.imgSrc}
                            alt={store.name}
                            width="100%"
                            height="100%"
                            className="object-cover w-full h-full"
                            effect="blur"
                          />
                          {store.discount && (
                            <div
                              data-testid="venue-discount-label"
                              className="absolute top-1 right-1 bg-yellow-400 text-black text-xs px-1 py-0.5 rounded"
                            >
                              -{store.discount}%
                            </div>
                          )}
                        </div>
                        <div className="p-3 flex flex-col justify-between flex-grow min-w-0">
                          <div>
                            <h3 data-testid="venue-name" className="font-bold text-base mb-1 truncate">
                              {store.name}
                            </h3>
                            <div className="flex items-center text-sm mb-1 text-gray-600">
                              <span className="text-[#ee9613] font-semibold">{store.priceRange}</span>
                              <span className="mx-2">•</span>
                              <span className="truncate">{store.cuisine}</span>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2">{store.description}</p>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Pickup: {store.pickupTime}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
                </div>
                </section>
                </div>
            </section>


            {/* Information Section */}
            <section className="container mx-auto p-4 mt-8">
              <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="md:w-1/4 space-y-8">
                  <div>
                    <h3 className="text-lg font-bold">Joe's Beerhouse</h3>
                    <div>
                      <h4 className="text-md font-semibold">See similar restaurants</h4>
                      <ul className="list-none space-y-1">
                        <li>
                          <a href="/en/restaurants/steakhouse" className="text-[#ee9613] font-bold hover:underline">
                            Steakhouse
                          </a>
                        </li>
                        <li>
                          <a href="/en/restaurants/german" className="text-[#ee9613] font-bold hover:underline">
                            German Cuisine
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="md:w-1/4 space-y-4">
                  <div>
                    <h4 className="text-md font-semibold">Address</h4>
                    <p>Windhoek West</p>
                    <p>8850603 Windhoek</p>

                    <a href={`https://maps.google.com/?q=${MARKER_COORDINATES[0].lat},${MARKER_COORDINATES[0].lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ee9613] font-bold hover:underline"
                    >
                      See map
                    </a>
                  </div>
                </div>

                <div className="md:w-1/4 space-y-4">
                  <div>
                    <h4 className="text-md font-semibold">Opening hours</h4>
                    <table className="table-auto">
                      <tbody>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                          <tr key={day}>
                            <td className="pr-4">{day}</td>
                            <td>11:00–23:00</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="md:w-1/4 space-y-4">
                  <div>
                    <h4 className="text-md font-semibold">Contact</h4>
                    <a href="tel:+264061232457" className="text-[#ee9613] font-bold hover:underline">
                      +264 61 232 457
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Map Section */}
            <section className="container mx-auto p-4 mt-8">
              <div className="w-full h-96 relative">
                <div ref={mapContainerRef} className="absolute inset-0" />
              </div>
            </section>
          </main>
          <Footer />
        </div>
        );
}

        JoesBeerhouse.propTypes = {
          // Add prop types here if needed
        };

        export default JoesBeerhouse;