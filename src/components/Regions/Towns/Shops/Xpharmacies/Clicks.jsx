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

function Clicks() {
  usePerformanceMeasure('Clicks');

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
  const pharmaciesscroll = useRef(null);

  // Memoized data
  const navcategories = useMemo(() => [
    {
      name: "Prescription Medications",
      imgSrc: "/images/pharmacies/pm.png",
      href: "/pharmacy/prescription-medications",
    },
    {
      name: "Over-the-Counter Medications",
      imgSrc: "/images/pharmacies/ocm.png",
      href: "/pharmacy/over-the-counter-medications",
    },
    {
      name: "Vitamins & Supplements",
      imgSrc: "/images/pharmacies/vs.png",
      href: "/pharmacy/vitamins-supplements",
    },
    {
      name: "Personal Care",
      imgSrc: "/images/pharmacies/pc.png",
      href: "/pharmacy/personal-care",
    },
    {
      name: "Health & Wellness",
      imgSrc: "/images/pharmacies/hw.png",
      href: "/pharmacy/health-wellness",
    },
    {
      name: "Baby & Child Care",
      imgSrc: "/images/pharmacies/bcc.png",
      href: "/pharmacy/baby-child-care",
    },
    {
      name: "Medical Equipment",
      imgSrc: "/images/pharmacies/me.png",
      href: "/pharmacy/medical-equipment",
    },
    {
      name: "First Aid",
      imgSrc: "/images/pharmacies/fa.png",
      href: "/pharmacy/first-aid",
    },
    {
      name: "Skincare",
      imgSrc: "/images/pharmacies/sc.png",
      href: "/pharmacy/skincare",
    },
    {
      name: "Oral Care",
      imgSrc: "/images/pharmacies/oc.png",
      href: "/pharmacy/oral-care",
    },
    {
      name: "Hair Care",
      imgSrc: "/images/pharmacies/hc.png",
      href: "/pharmacy/hair-care",
    },
    {
      name: "Foot Care",
      imgSrc: "/images/pharmacies/fc.png",
      href: "/pharmacy/foot-care",
    },
    {
      name: "Allergy & Sinus",
      imgSrc: "/images/pharmacies/as.png",
      href: "/pharmacy/allergy-sinus",
    },
    //   {
    //     name: "Eye Care",
    //     imgSrc: "/images/pharmacies/",
    //     href: "/pharmacy/eye-care"
    //  },
    {
      name: "Pain Relief",
      imgSrc: "/images/pharmacies/pr.png",
      href: "/pharmacy/pain-relief",
    },
    {
      name: "Digestive Health",
      imgSrc: "/images/pharmacies/dh.png",
      href: "/pharmacy/digestive-health",
    },
    {
      name: "Cold & Flu",
      imgSrc: "/images/pharmacies/cf.png",
      href: "/pharmacy/cold-flu",
    },
    {
      name: "Diabetes Care",
      imgSrc: "/images/pharmacies/dc.png",
      href: "/pharmacy/diabetes-care",
    },
    {
      name: "Women's Health",
      imgSrc: "/images/pharmacies/wh.png",
      href: "/pharmacy/womens-health",
    },
    {
      name: "Men's Health",
      imgSrc: "/images/pharmacies/mh.png",
      href: "/pharmacy/mens-health",
    },
    // Add more categories as needed
  ], []);

  const cards = useMemo(() => [
    {
      title: "Aspirin",
      description:
        "Effective pain reliever for headaches, muscle pain, and minor arthritis. Trusted relief you can count on.",
      image: "/images/pharmacies/alphapharm.png",
    },
    {
      title: "Ibuprofen",
      description:
        "Powerful anti-inflammatory medication for reducing pain and swelling. Ideal for back pain, toothaches, and menstrual cramps.",
      image: "/images/pharmacies/Ibuprofen.png",
    },
    {
      title: "Acetaminophen",
      description:
        "Safe and effective pain reliever and fever reducer. Perfect for all ages and common ailments.",
      image: "/images/pharmacies/Acetaminophen.png",
    },
    {
      title: "Antihistamines",
      description:
        "Relieve allergy symptoms such as runny nose, sneezing, and itchy eyes. Fast-acting and long-lasting.",
      image: "/images/pharmacies/Antihistamines.png",
    },
    {
      title: "Cough Syrup",
      description:
        "Soothe your throat and ease your cough with our effective cough syrups. Available for both adults and children.",
      image: "/images/pharmacies/CoughSyrup.png",
    },
    // Add more cards as needed
  ], []);

  const pharmacycards = useMemo(() => [
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
    {
      name: "Cough Syrup",
      imgSrc: "/images/pharmacies/CoughSyrup.png",
      href: "/en/stores/cough-syrup/",
      discount: null,
      isEtomartStore: false,
      priceRange: "€",
      category: "Cough Relief",
      description:
        "Soothe your throat and ease your cough with our effective cough syrups. Available for both adults and children.",
      pickupTime: "10–30 min",
      deliveryTime: true,
    },
    // Add more cards as needed
  ], []);

  const pharmacies = useMemo(() => [
    {
    name: "Dis-Chem",
    imgSrc: "/images/pharmacies/dischem.png",
    href: "/en/discovery/category/dischem",
  },
  {
    name: "Clicks Pharmacy",
    imgSrc: "/images/pharmacies/clicks.png",
    href: "/LP/Khomas/Towns/Pharmacy/Clicks",
  },
  {
    name: "Nampharm Pharmacy",
    imgSrc: "/images/pharmacies/nampharm.png",
    href: "/en/discovery/category/nampharm",
  },
  {
    name: "Alpha Pharm",
    imgSrc: "/images/pharmacies/alphapharm.png",
    href: "/en/discovery/category/alphapharm",
  },
  {
    name: "Medicine World",
    imgSrc: "/images/pharmacies/medicineworld.png",
    href: "/en/discovery/category/medicineworld",
  },
  {
    name: "City Pharmacy",
    imgSrc: "/images/pharmacies/citypharmacy.png",
    href: "/en/discovery/category/citypharmacy",
  },
], []);

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
    { lng: 17.094332562419833, lat: -22.583743666790397 },
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
      padding: { top: 40, bottom: 30, left: 20, right: 20 },
      maxZoom: 13, // Limit maximum zoom level
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

  const renderStoreCard = useCallback((category, index) => (
    <div key={index} className="flex-shrink-0 w-48 sm:w-56 md:w-64 lg:w-72 p-6">
      <a href={category.href} className="block h-full rounded-lg bg-slate-50 shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200">
        <div className="relative w-full aspect-square overflow-hidden rounded-t-lg">
          <LazyLoadImage
            src={category.imgSrc}
            alt={category.name}
            width="100%"
            height="100%"
            className="w-full h-full object-fill"
            effect="opacity"
          />
        </div>
        <div className="p-3 sm:p-4">
          <p className="text-center font-bold truncate w-full text-sm sm:text-base">{category.name}</p>
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
      <OPNavBar />
      <main className="relative z-10">
        {/* Header section */}
        <header className="relative">
          <div className="relative">
            <LazyLoadImage
              src="/images/pharmacies/clicks.png"
              alt="Clicks Pharmacy"
              effect="blur"
              className="w-full h-[510px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          <div className="absolute bottom-0 left-0 p-4 flex justify-between items-center w-full">
            <div className="px-4">
              <h1 className="text-white text-4xl font-bold">Clicks</h1>
              <p className="text-white text-lg">Feel Good Pay Less</p>
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

        {/* Categories and products section */}
        <section className="container mx-auto px-4">
          <div className="flex flex-row">
            {/* Categories sidebar */}
            <aside className="w-1/4 p-4">
              <div className="flex flex-col">
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={state.searchTerm}
                    onChange={handleSearch}
                    className="p-2 rounded-full shadow bg-gray-200 border-solid w-full"
                  />
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-6 h-16 ml-2 text-gray-500">
                    <path d="M23.384 21.6191L16.855 15.0901C19.8122 11.2028 19.2517 5.689 15.5728 2.47626C11.894 -0.736477 6.35493 -0.549369 2.90126 2.90431C-0.552421 6.35798 -0.739529 11.897 2.47321 15.5759C5.68595 19.2548 11.1997 19.8152 15.087 16.8581L21.616 23.3871C22.1078 23.8667 22.8923 23.8667 23.384 23.3871C23.8718 22.8987 23.8718 22.1075 23.384 21.6191ZM2.75002 9.50007C2.75002 5.77215 5.7721 2.75007 9.50002 2.75007C13.2279 2.75007 16.25 5.77215 16.25 9.50007C16.25 13.228 13.2279 16.2501 9.50002 16.2501C5.77393 16.2457 2.75443 13.2262 2.75002 9.50007Z"></path>
                  </svg>
                </div>
                <div className="flex flex-col overflow-y-auto" style={{ height: "800px" }}>
                  {filteredCategories.slice(0, 20).map((category, index) => (

                    <a key={index}
                      href={category.href}
                      className="flex items-center p-2 mb-4 bg-white rounded-lg shadow hover:bg-gray-100"
                    >
                      <LazyLoadImage
                        src={category.imgSrc}
                        alt={category.name}
                        effect="blur"
                        className="w-10 h-10 mr-4 rounded-full"
                      />
                      <span>{category.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </aside>
            <section className="w-full md:w-3/4">
      <div className="px-4">
        <div className="flex items-center p-4">
          <h2 className="text-2xl font-bold">All Products</h2>
          <div className="ml-auto">
            <button className="flex items-center px-4 py-2 border rounded-md">
              <div className="flex items-center">
                Sorted by
                <span className="ml-2 font-semibold">Recommended</span>
              </div>
              <div className="ml-2">
                <svg viewBox="0 0 20 21" className="w-5 h-5">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.41703 10.7133V17.085C5.41703 17.306 5.50483 17.5179 5.66111 17.6742C5.81739 17.8305 6.02935 17.9183 6.25037 17.9183C6.47138 17.9183 6.68334 17.8305 6.83962 17.6742C6.9959 17.5179 7.0837 17.306 7.0837 17.085L7.0837 10.7133C7.68556 10.5338 8.2134 10.1648 8.58871 9.66122C8.96402 9.15763 9.16675 8.54635 9.16675 7.91829C9.16675 7.29024 8.96402 6.67896 8.58871 6.17537C8.2134 5.67179 7.68556 5.3028 7.0837 5.12329V2.91829C7.0837 2.69728 6.9959 2.48532 6.83962 2.32904C6.68334 2.17276 6.47138 2.08496 6.25037 2.08496C6.02935 2.08496 5.81739 2.17276 5.66111 2.32904C5.50483 2.48532 5.41703 2.69728 5.41703 2.91829V5.12329C4.81518 5.3028 4.28734 5.67179 3.91203 6.17537C3.53672 6.67896 3.33398 7.29024 3.33398 7.91829C3.33398 8.54635 3.53672 9.15763 3.91203 9.66122C4.28734 10.1648 4.81518 10.5338 5.41703 10.7133Z" fill="#121E28"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>

        <div className="overflow-y-auto h-[600px] sm:h-[700px] md:h-[850px]">
          <div className="px-2 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
  {pharmacycards.map((category, shopsindex) => (
    <div
      key={shopsindex}
      className="w-full max-w-[180px] sm:max-w-[400px] mx-auto sm:mx-0"
    >
                  <a href={category.href}
                    className="block w-full h-full rounded-lg bg-slate-50 shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200 overflow-hidden"
                  >
                    <div className="flex flex-col h-full">
                      <div className="relative w-full aspect-square overflow-hidden">
                        <LazyLoadImage
                          src={category.imgSrc}
                          alt={category.name}
                          width="100%"
                          height="100%"
                          effect="blur"
                          className="object-cover w-full h-full"
                        />
                        {category.discount && (
                          <div className="absolute top-0 right-0 mt-2 mr-2 bg-[#ee9613] text-white text-xs px-2 py-1 rounded">
                            {`-${category.discount}%`}
                          </div>
                        )}
                       <div className="absolute bottom-2 right-2 bg-[#ee9613] text-white text-lg w-12 h-8 flex items-center justify-center rounded">
                          +
                        </div>
                      </div>
                      <div className="flex flex-col w-full p-2 flex-grow">
                        <h3 className="font-bold truncate">{category.name}</h3>
                        <div className="flex items-center text-sm mt-2">
                          <div className="text-[#ee9613] text-sm font-bold">
                            <span>{category.priceRange}</span>
                          </div>
                          <span className="mx-1">•</span>
                          <span className="truncate">{category.category}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">{`Pickup: ${category.pickupTime}`}</div>
                        <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {category.description}
                        </div>
                        <div className="mt-auto">
                          <div className="text-black text-xs py-1 rounded">
                            <span className="text-black">Etomart </span>
                            {category.deliveryTime ? (
                              <span className="text-[#ee9613] font-bold">Delivery Available</span>
                            ) : (
                              <span className="text-[#ee1313] font-bold">Delivery Not Available</span>
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

        <section className="container mx-auto p-4 mt-8">
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="md:w-1/3 space-y-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-md font-semibold">Store Information</h3>
                  <p className="text-[#ee9613] font-bold">Clicks</p>
                  <p>Feel Good Pay Less</p>
                </div>
                <div>
                  <h3 className="text-md font-semibold">Address</h3>
                  <div>
                    <p>Windhoek West</p>
                    <p>8850603 Eilat</p>

                    <a href="https://maps.google.com/?q=29.56134350459979,34.95609347009179"
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
            <div className="w-full h-64 md:h-96 relative">
              <div ref={mapContainerRef} className="absolute inset-0" />
            </div>
          </div>
        </section>
        {/* Supermarkets Near Me Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 md:mt-16">
          <div
            className="bg-[#ee9613] border border-solid border-white-A700 rounded-tr-[50px] rounded-br-[50px] sm:rounded-tr-[100px] sm:rounded-br-[100px] md:rounded-tr-[150px] md:rounded-br-[150px] shadow-xl relative p-4 sm:p-6 md:p-10"
            style={{ width: "50%", maxWidth: "1000px" }}
          >
            <h2 className="text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black font-bold font-Agbalumo">
              Similar Pharmacies
            </h2>
          </div>
        </section>

        {/* Supermarkets Carousel */}
        {renderCarousel(pharmacies, pharmaciesscroll, renderStoreCard)}
      </main>
      <Footer />
    </div>
  );
}

Clicks.propTypes = {
  // Add prop types here if needed
};

export default Clicks;