import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import mapboxgl from "mapbox-gl";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast } from "react-toastify";
import { useNavcategories, useCards, useStoresCards, useSupermarkets  } from "./cardsDataCheckers";
import Footer from "../../../../../../Footer";
import KhomasOPNavBar from "../../../../../../OPNavBarRegions/KhomasOPNavBar/KhomasOPNavBar";
import 'react-lazy-load-image-component/src/effects/blur.css';


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
    isDelivery: true,
    searchTerm: "",
    currentIndex: 0,
    isPaused: false,
    isDropdownOpen: false,
    map: null,
    isFavorite: false,
  });

  // Refs
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const mapContainerRef = useRef(null);
  const supermarketsscroll = useRef(null);

  // Memoized data

    // Use custom hooks to get data
    const navcategories = useNavcategories();
    const cards = useCards();
    const storecards = useStoresCards();
    const supermarkets = useSupermarkets();

  const extendedCards = useMemo(() => [...cards, ...cards, ...cards], [cards]);

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

  const handleSearch = useCallback((event) => {
    setState(prevState => ({ ...prevState, searchTerm: event.target.value }));
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

  const getMoreInfo = useCallback(() => {
    alert("More information about the store");
  }, []);

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
  useEffect(() => {
    if (mapContainerRef.current) {
      initializeMap(mapContainerRef.current);
    }
  }, [initializeMap]);

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
  // Render helpers
  const renderCarousel = useCallback((items, scrollRef, itemRenderer) => (
    <div className="relative mt-4 sm:mt-6 md:mt-8">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-4 bg-gradient-to-r from-white to-transparent sm:w-8 md:w-12"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-4 bg-gradient-to-l from-white to-transparent sm:w-8 md:w-12"></div>
        <button
          className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-r-[25px] bg-[#ee9613] p-1 sm:rounded-r-[50px]"
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
          className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-l-[25px] bg-[#ee9613] p-1 sm:rounded-l-[50px]"
          onClick={() => scrollRight(scrollRef)}
          aria-label="Scroll right"
        >
          &#9654;
        </button>
      </div>
    </div>
  ), [scrollLeft, scrollRight]);

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

  const truncateText = useCallback((text, maxLines, maxCharsPerLine) => {
    const words = text.split(" ");
    let truncatedText = "";
    let lineCount = 2;
    let charCount = 3;

    for (const word of words) {
      if (lineCount < maxLines) {
        if (charCount + word.length + 1 <= maxCharsPerLine) {
          truncatedText += " " + word;
          charCount += word.length + 1;
        } else {
          truncatedText += "\n" + word;
          charCount = word.length + 1;
          lineCount++;
        }
      } else {
        break;
      }
    }

    if (lineCount >= maxLines) {
      truncatedText += "...";
    }

    return truncatedText;
  }, []);

  const filteredCategories = useMemo(() =>
    navcategories.filter((category) =>
      category.name.toLowerCase().includes(state.searchTerm.toLowerCase())
    ),
    [navcategories, state.searchTerm]
  );

  // JSX
  return (
    <div className="bg-white">
      <KhomasOPNavBar />
      <main className="relative z-10">
        {/* Header section */}
        <header className="relative">
          <div className="relative">
            <LazyLoadImage
              src="/images/supermarkets/checkers.png"
              alt="Checkers supermarket"
              effect="blur"
              className="h-[510px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          <div className="absolute bottom-0 left-0 flex w-full items-center justify-between p-4">
            <div className="px-4">
              <h1 className="text-4xl font-bold text-white">Checkers</h1>
              <p className="text-lg text-white">Better and Better</p>
              {/* Favorite Button */}
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
            <div className="px-4">
              <button
                aria-label="More options"
                className="p-2 text-white"
                onClick={toggleDropdown}
              >
                <svg
                  ref={dropdownRef}
                  viewBox="0 0 24 24"
                  className="size-8 rounded-full fill-current text-white transition duration-200 hover:bg-white hover:text-black"
                >
                  <circle cx="12" cy="5" r="2"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                  <circle cx="12" cy="19" r="2"></circle>
                </svg>
              </button>
              {state.isDropdownOpen && (
                <div className="absolute right-4 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
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
                      onClick={getMoreInfo}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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
              <button type="button" className="flex items-center space-x-1 text-[#ee9613]">
                <svg viewBox="0 0 24 24" width="16">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.993 5.376 18.624.007 12 0zm.25 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75c0 .138.112.25.25.25h.75a1 1 0 010 2z"></path>
                </svg>
                <span>See more information</span>
              </button>
            </div>
            <div className="flex items-end justify-end space-x-2 rounded-full border-solid bg-gray-200 p-1">
              <button
                className={`rounded-full border border-gray-300 px-2 py-1 text-gray-700 transition-colors duration-300 ${state.isDelivery ? "bg-white" : "bg-gray-200"}`}
                onClick={() => setState(prevState => ({ ...prevState, isDelivery: true }))}
              >
                Delivery
              </button>
              <button
                className={`rounded-full border border-gray-300 px-2 py-1 text-gray-700 transition-colors duration-300 ${state.isDelivery ? "bg-gray-200" : "bg-white"}`}
                onClick={() => setState(prevState => ({ ...prevState, isDelivery: false }))}
              >
                Pickup
              </button>
            </div>
          </div>
          <div className="px-4 text-gray-700">
            The store isn't delivering to your location, but you can still place an order for pickup.
          </div>
        </section>

        {/* Categories and products section */}
        <section className="container mx-auto px-4">
          <div className="flex flex-row">
            {/* Categories sidebar */}
            <aside className="w-1/4 p-4">
              <div className="flex flex-col">
                <div className="mb-4 flex items-center">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={state.searchTerm}
                    onChange={handleSearch}
                    className="w-full rounded-full border-solid bg-gray-200 p-2 shadow"
                  />
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-2 h-16 w-6 text-gray-500">
                    <path d="M23.384 21.6191L16.855 15.0901C19.8122 11.2028 19.2517 5.689 15.5728 2.47626C11.894 -0.736477 6.35493 -0.549369 2.90126 2.90431C-0.552421 6.35798 -0.739529 11.897 2.47321 15.5759C5.68595 19.2548 11.1997 19.8152 15.087 16.8581L21.616 23.3871C22.1078 23.8667 22.8923 23.8667 23.384 23.3871C23.8718 22.8987 23.8718 22.1075 23.384 21.6191ZM2.75002 9.50007C2.75002 5.77215 5.7721 2.75007 9.50002 2.75007C13.2279 2.75007 16.25 5.77215 16.25 9.50007C16.25 13.228 13.2279 16.2501 9.50002 16.2501C5.77393 16.2457 2.75443 13.2262 2.75002 9.50007Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col overflow-y-auto" style={{ height: "800px" }}>
                  {filteredCategories.slice(0, 20).map((category, index) => (
                    <a key={index}
                      href={category.href}
                      className="mb-4 flex items-center rounded-lg bg-white p-2 shadow hover:bg-gray-100"
                    >
                      <LazyLoadImage
                        src={category.imgSrc}
                        alt={category.name}
                        effect="blur"
                        className="mr-4 size-10 rounded-full"
                      />
                      <span>{category.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>

           
              {/* Products grid */}
              <section className="w-full md:w-3/4">
      <div className="px-4">
        <div className="flex items-center p-4">
          <h2 className="text-2xl font-bold">All Products</h2>
          <div className="ml-auto">
            <button className="flex items-center rounded-md border px-4 py-2">
              <div className="flex items-center">
                Sorted by
                <span className="ml-2 font-semibold">Recommended</span>
              </div>
              <div className="ml-2">
                <svg viewBox="0 0 20 21" className="size-5">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.41703 10.7133V17.085C5.41703 17.306 5.50483 17.5179 5.66111 17.6742C5.81739 17.8305 6.02935 17.9183 6.25037 17.9183C6.47138 17.9183 6.68334 17.8305 6.83962 17.6742C6.9959 17.5179 7.0837 17.306 7.0837 17.085L7.0837 10.7133C7.68556 10.5338 8.2134 10.1648 8.58871 9.66122C8.96402 9.15763 9.16675 8.54635 9.16675 7.91829C9.16675 7.29024 8.96402 6.67896 8.58871 6.17537C8.2134 5.67179 7.68556 5.3028 7.0837 5.12329V2.91829C7.0837 2.69728 6.9959 2.48532 6.83962 2.32904C6.68334 2.17276 6.47138 2.08496 6.25037 2.08496C6.02935 2.08496 5.81739 2.17276 5.66111 2.32904C5.50483 2.48532 5.41703 2.69728 5.41703 2.91829V5.12329C4.81518 5.3028 4.28734 5.67179 3.91203 6.17537C3.53672 6.67896 3.33398 7.29024 3.33398 7.91829C3.33398 8.54635 3.53672 9.15763 3.91203 9.66122C4.28734 10.1648 4.81518 10.5338 5.41703 10.7133Z" fill="#121E28"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>

        <div className="h-[600px] overflow-y-auto sm:h-[700px] md:h-[850px]">
          <div className="px-2 pb-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
  {storecards.map((category, shopsindex) => (
    <div
      key={shopsindex}
      className="mx-auto w-full max-w-[180px] sm:mx-0 sm:max-w-[400px]"
    >
                  <a href={category.href}
                    className="block size-full overflow-hidden rounded-lg bg-slate-50 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-xl"
                  >
                    <div className="flex h-full flex-col">
                      <div className="relative aspect-square w-full overflow-hidden">
                        <LazyLoadImage
                          src={category.imgSrc}
                          alt={category.name}
                          width="100%"
                          height="100%"
                          effect="blur"
                          className="size-full object-cover"
                        />
                        {category.discount && (
                          <div className="absolute right-0 top-0 mr-2 mt-2 rounded bg-[#ee9613] px-2 py-1 text-xs text-white">
                            {`-${category.discount}%`}
                          </div>
                        )}
                       <div className="absolute bottom-2 right-2 flex h-8 w-12 items-center justify-center rounded bg-[#ee9613] text-lg text-white">
                          +
                        </div>
                      </div>
                      <div className="flex w-full grow flex-col p-2">
                        <h3 className="truncate font-bold">{category.name}</h3>
                        <div className="mt-2 flex items-center text-sm">
                          <div className="text-sm font-bold text-[#ee9613]">
                            <span>{category.priceRange}</span>
                          </div>
                          <span className="mx-1">•</span>
                          <span className="truncate">{category.category}</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">{`Pickup: ${category.pickupTime}`}</div>
                        <div className="mt-1 line-clamp-2 text-xs text-gray-500">
                          {category.description}
                        </div>
                        <div className="mt-auto">
                          <div className="rounded py-1 text-xs text-black">
                            <span className="text-black">Etomart </span>
                            {category.deliveryTime ? (
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
        </section>

        <section className="container mx-auto mt-8 p-4">
          <div className="flex flex-col md:flex-row md:space-x-8">
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

                    <a href="https://maps.google.com/?q=29.56134350459979,34.95609347009179"
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
            <div className="relative h-64 w-full md:h-96">
              <div ref={mapContainerRef} className="absolute inset-0" />
            </div>
          </div>
        </section>

        {/* Supermarkets Near Me Section */}
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