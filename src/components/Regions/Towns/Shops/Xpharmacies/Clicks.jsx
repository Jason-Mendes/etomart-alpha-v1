import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import mapboxgl from "mapbox-gl";
import { toast } from "react-toastify";

import Footer from "../../../../Footer"; // Import Footer component
import OPNavBar from "../../../../OPNavBar"; // Import OPNavBar component
// The Clicks component
function Clicks() {
  const [isDelivery, setIsDelivery] = useState(true); // State for delivery option
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  const [currentIndex, setCurrentIndex] = useState(0); // State for current card index
  const containerRef = useRef(null); // Reference to the card container

  const [isPaused, setIsPaused] = useState(false); // State for scroll pause

  const [map, setMap] = useState(null); // New state for the map instance
  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Navigation categories
  const navcategories = [
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
  ];

  // Cards for display

  const cards = [
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
  ];
  const extendedCards = [...cards, ...cards, ...cards]; // Extend cards array for smooth scrolling

  // Auto-scroll functionality
  useEffect(() => {
    let interval;
    if (!isPaused) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  // Handle next card
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Handle previous card
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Handle transition end for infinite scrolling effect
  const handleTransitionEnd = () => {
    if (currentIndex >= extendedCards.length - cards.length) {
      setCurrentIndex(cards.length);
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateX(-${
        cards.length * 576
      }px)`;
      setTimeout(() => {
        containerRef.current.style.transition = "transform 0.5s ease-in-out";
      }, 50);
    }
    if (currentIndex <= 0) {
      setCurrentIndex(extendedCards.length - 2 * cards.length);
      containerRef.current.style.transition = "none";
      containerRef.current.style.transform = `translateX(-${
        (extendedCards.length - 2 * cards.length) * 576
      }px)`;
      setTimeout(() => {
        containerRef.current.style.transition = "transform 0.5s ease-in-out";
      }, 50);
    }
  };

  // Pause scrolling when dot is clicked
  const pauseScroll = () => {
    setIsPaused(true);
    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  // Handle dot click
  const handleDotClick = (index) => {
    setCurrentIndex(index);
    pauseScroll();
  };

  const filteredCategories = navcategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Store cards array
  const storescards1 = [
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
  ];

  // Dropdown menu state and ref
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Handle click outside of dropdown to close it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  // Add/remove event listener for outside click
  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Add to favorites alert
  const addToFavorites = () => {
    toast.success("Store added to favorites");
  };

  // Get more info alert
  const getMoreInfo = () => {
    alert("More information about the store");
  };

  // Truncate text to fit within the given limits
  const truncateText = (text, maxLines, maxCharsPerLine) => {
    const words = text.split(" ");
    let truncatedText = "";
    let lineCount = 0;
    let charCount = 0;

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
  };

  // Mapbox access token
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  // Marker coordinates
  const MARKER_COORDINATES = [
    { lng: 17.094332562419833, lat: -22.583743666790397 }, // Clicks Maerua
    { lng: 17.073723364157306, lat: -22.561939983264068 }, // User's home
  ];

  // Function to initialize the map
  const initializeMap = (mapContainer) => {
    if (!mapContainer) return; // Check if the map container exists

    const mapInstance = new mapboxgl.Map({
      container: mapContainer, // Use the provided map container
      style: "mapbox://styles/mapbox/streets-v11",

      zoom: 12, // Initial zoom level
    });

    // Add navigation control to the map
    mapInstance.addControl(new mapboxgl.NavigationControl());

    // Add markers to the map
    MARKER_COORDINATES.forEach((coord) => {
      new mapboxgl.Marker({ color: "#ee9613" }) // Marker color
        .setLngLat([coord.lng, coord.lat])
        .addTo(mapInstance);
    });

    // Define the bounds to include both markers
    const bounds = new mapboxgl.LngLatBounds();
    MARKER_COORDINATES.forEach((coord) =>
      bounds.extend([coord.lng, coord.lat])
    );

    // Fit the map to the bounds with padding
    mapInstance.fitBounds(bounds, {
      padding: { top: 40, bottom: 300, left: 20, right: 20 },
      maxZoom: 13, // Limit maximum zoom level
      linear: true,
    });

    // Fetch and display the route
    fetchAndDisplayRoute(mapInstance);

    // Save the map instance
    setMap(mapInstance);
  };

  // Function to fetch and display the route
  const fetchAndDisplayRoute = async (mapInstance) => {
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
            "line-color": "#ee9613", // Route color
            "line-width": 8,
          },
        });
      });
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const mapContainerRef = useRef(null);

  // Initialize map on component mount
  useEffect(() => {
    if (mapContainerRef.current) {
      initializeMap(mapContainerRef.current);
    }
  }, []);

  return (
    <div>
      <OPNavBar />

      <div
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          pointerEvents: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100000,
        }}
      ></div>
      <div className="relative">
        <div
          id="mainContent"
          tabIndex="-1"
          className="flex flex-col items-center"
        >
          <div style={{ height: "0px" }}></div>
          <div>
            <div className="rtl" data-test-id="MainDiscoveryContent">
              <div className="flex flex-col space-y-2">
                <div
                  data-test-id="venue-content-header.root"
                  className="relative"
                >
                  <header className="relative">
                    <div className="relative">
                      <img
                        loading="eager"
                        decoding="auto"
                        fetchPriority="high"
                        sizes="100vw"
                        srcSet="/images/pharmacies/clicks.png"
                        src="https://imageproxy.wolt.com/venue/6122210d7489d8613f7d1880/915af130-149f-11ec-8f09-7abce278992e_karela_00189.jpg"
                        alt=""
                        className="w-full h-[510px] object-cover"
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 flex justify-between items-center w-full">
                      <div className="px-4">
                        <h1 className="text-white text-4xl font-bold">
                          Clicks
                        </h1>
                        <p className="text-white text-lg">Feel Good Pay Less</p>
                        <div className="mt-2 flex items-center">
                          <button
                            data-test-id="venue-favorite"
                            aria-label="Favorite"
                            className="text-white p-2 rounded-full hover:bg-white hover:text-black transition duration-200"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="w-6 h-6 fill-current"
                            >
                              <path d="M23.305 5.07498C22.3508 3.21819 20.5724 1.92407 18.5121 1.58723C16.4518 1.25039 14.3539 1.91076 12.858 3.36698L12 4.14798L11.172 3.39398C9.67891 1.90936 7.56117 1.23646 5.48499 1.58698C3.42071 1.90968 1.63893 3.2085 0.699989 5.07498C-0.569125 7.56204 -0.0794272 10.5848 1.90999 12.544L11.283 22.2C11.4713 22.3936 11.7299 22.5029 12 22.5029C12.2701 22.5029 12.5287 22.3936 12.717 22.2L22.076 12.562C24.0755 10.6019 24.5729 7.57146 23.305 5.07498ZM20.657 11.151L12.357 19.696C12.2628 19.7928 12.1335 19.8474 11.9985 19.8474C11.8634 19.8474 11.7341 19.7928 11.64 19.696L3.32699 11.136C1.94998 9.78618 1.60717 7.69937 2.47999 5.97998C3.13326 4.68428 4.37197 3.78375 5.80599 3.56198C7.26664 3.31621 8.75572 3.79456 9.79999 4.84498L11.33 6.24498C11.7117 6.59273 12.2953 6.59273 12.677 6.24498L14.238 4.82198C15.278 3.7873 16.7534 3.3181 18.2 3.56198C19.6323 3.78494 20.869 4.68536 21.521 5.97998C22.3943 7.7072 22.0444 9.8015 20.657 11.151Z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="absolute bottom-6 right-4 px-4">
                        <button
                          aria-label="More options"
                          className="text-white p-2"
                          onClick={toggleDropdown}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="w-8 h-8 text-white fill-current rounded-full hover:bg-white hover:text-black transition duration-200"
                          >
                            <circle cx="12" cy="5" r="2"></circle>
                            <circle cx="12" cy="12" r="2"></circle>
                            <circle cx="12" cy="19" r="2"></circle>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="relative" ref={dropdownRef}>
                      <div
                        id="dropdown-menu"
                        className={`${
                          isDropdownOpen ? "block" : "hidden"
                        } absolute -top-48 right-4 z-20 w-56 bg-[#fdfdfd] rounded-lg shadow-lg transition-opacity duration-200`}
                        role="dialog"
                      >
                        <div className="relative">
                          <div className="absolute top-28 right-3 z-20">
                            <svg
                              viewBox="0 0 32 32"
                              className="w-5 h-5 text-white"
                            >
                              <path
                                className="fill-white"
                                d="M16,16 L0,0 H32 Z"
                              ></path>
                              <path fill="#fdfdfd" d="M16,15 L1,0 H31 Z"></path>
                            </svg>
                          </div>
                          <div className="p-4">
                            <button
                              className="w-full py-2 text-left text-[#ee9613] hover:bg-[#ffaf5e4b] rounded-md"
                              onClick={addToFavorites}
                            >
                              Add to Favorites
                            </button>
                            <button
                              className="w-full py-2 text-left text-[#ee9613] hover:bg-[#ffaf5e4b] rounded-md"
                              onClick={getMoreInfo}
                            >
                              More Information
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </header>
                </div>
                {/* storescards1scroll Container */}
                <div>
                  <main className="my-2">
                    <div className="container mx-auto px-4">
                      {/* Carousel Container */}
                      <div className="relative mt-8 overflow-hidden">
                        <div
                          ref={containerRef}
                          className="flex transition-transform duration-500 ease-in-out"
                          style={{
                            transform: `translateX(-${currentIndex * 576}px)`,
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
                                style={{
                                  backgroundImage: `url(${card.image})`,
                                }}
                              >
                                <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                                  <div className="px-10 max-w-xl">
                                    <h2 className="text-2xl text-white font-semibold">
                                      {card.title}
                                    </h2>
                                    <p className="mt-2 text-gray-400">
                                      {card.description}
                                    </p>
                                    <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                                      <span>Shop Now</span>
                                      <svg
                                        className="h-5 w-5 mx-2"
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
                          className="absolute top-2 right-16 bg-white rounded-full p-2 shadow-md"
                          onClick={handlePrev}
                        >
                          &lt;
                        </button>
                        <button
                          className="absolute top-2 right-4 bg-white rounded-full p-2 shadow-md"
                          onClick={handleNext}
                        >
                          &gt;
                        </button>
                        <div className="absolute bottom-4 w-full flex justify-center space-x-2">
                          {cards.map((_, index) => (
                            <div
                              key={index}
                              className={`h-2 w-2 rounded-full cursor-pointer ${
                                index === currentIndex
                                  ? "bg-white"
                                  : "bg-gray-400"
                              }`}
                              onClick={() => handleDotClick(index)}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
                {/* storescards1scroll Container */}
                <div className="px-4">
                  <div className="flex items-center justify-between space-x-28 px-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <svg
                          viewBox="0 0 16 16"
                          width="16"
                          aria-hidden="true"
                          className="text-primary"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C15.9949 3.58385 12.4161 0.00514317 8 0ZM8 14.6667C4.3181 14.6667 1.33333 11.6819 1.33333 8C1.33333 4.3181 4.3181 1.33333 8 1.33333C11.6819 1.33333 14.6667 4.3181 14.6667 8C14.6626 11.6802 11.6802 14.6626 8 14.6667ZM11.4227 10.54L8.33333 7.70733V4.33333C8.33333 3.96514 8.03486 3.66667 7.66667 3.66667C7.29848 3.66667 7 3.96514 7 4.33333V8C6.99979 8.18704 7.07817 8.36556 7.216 8.492L10.522 11.522C10.7947 11.7672 11.2135 11.7492 11.464 11.4813C11.7123 11.2099 11.6938 10.7886 11.4227 10.54Z"
                          ></path>
                        </svg>
                        <span>Opens today at 10:00</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          aria-hidden="true"
                          className="text-[#ee9613]"
                        >
                          <circle cx="12" cy="12" r="12" fill="orange" />
                        </svg>
                        <span>9.8</span>
                      </div>
                      <button
                        type="button"
                        className="text-[#ee9613] flex items-center space-x-1"
                      >
                        <svg viewBox="0 0 24 24" width="16">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.993 5.376 18.624.007 12 0zm.25 5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75c0 .138.112.25.25.25h.75a1 1 0 010 2z"></path>
                        </svg>
                        <span>See more information</span>
                      </button>
                    </div>
                    <div className="flex items-end justify-end border-solid p-1 space-x-2 bg-gray-200 rounded-full">
                      <button
                        className={`px-2 py-1 rounded-full border border-gray-300 text-gray-700 transition-colors duration-300 ${
                          isDelivery ? "bg-white" : "bg-gray-200"
                        }`}
                        onClick={() => setIsDelivery(true)}
                      >
                        Delivery
                      </button>
                      <button
                        className={`px-2 py-1 rounded-full border border-gray-300 text-gray-700 transition-colors duration-300 ${
                          isDelivery ? "bg-gray-200" : "bg-white"
                        }`}
                        onClick={() => setIsDelivery(false)}
                      >
                        Pickup
                      </button>
                    </div>
                  </div>
                  <div className="text-gray-700 px-4">
                    The store isn't delivering to your location, but you can
                    still place an order for pickup.
                  </div>
                </div>
              </div>
            </div>
            {/* categories List here */}
            <div className="categories and all products all">
              <div className="flex flex-row">
                {/* Left Sidebar - Categories */}
                <div className="w-1/4 p-4">
                  <div className="flex flex-col">
                    <div className="flex items-center mb-4">
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="p-2 rounded-full shadow bg-gray-200 border-solid w-full"
                      />
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="w-6 h-6 ml-2 text-gray-500"
                      >
                        <path d="M23.384 21.6191L16.855 15.0901C19.8122 11.2028 19.2517 5.689 15.5728 2.47626C11.894 -0.736477 6.35493 -0.549369 2.90126 2.90431C-0.552421 6.35798 -0.739529 11.897 2.47321 15.5759C5.68595 19.2548 11.1997 19.8152 15.087 16.8581L21.616 23.3871C22.1078 23.8667 22.8923 23.8667 23.384 23.3871C23.8718 22.8987 23.8718 22.1075 23.384 21.6191ZM2.75002 9.50007C2.75002 5.77215 5.7721 2.75007 9.50002 2.75007C13.2279 2.75007 16.25 5.77215 16.25 9.50007C16.25 13.228 13.2279 16.2501 9.50002 16.2501C5.77393 16.2457 2.75443 13.2262 2.75002 9.50007Z"></path>
                      </svg>
                    </div>
                    <div
                      className="flex flex-col overflow-y-auto"
                      style={{ height: "800px" }}
                    >
                      {filteredCategories
                        .slice(0, 20)
                        .map((category, index) => (
                          <a
                            key={index}
                            href={category.href}
                            className="flex items-center p-2 mb-4 bg-white rounded-lg shadow hover:bg-gray-100"
                          >
                            <img
                              src={category.imgSrc}
                              alt={category.name}
                              className="w-10 h-10 mr-4 rounded-full"
                            />
                            <span>{category.name}</span>
                          </a>
                        ))}
                    </div>
                  </div>
                </div>
                {/* Main Content - Products */}
                <div className="w-3/4 px-4">
                  <div className="flex items-center p-4">
                    <h2 className="text-2xl font-bold">All Products</h2>
                    <div className="ml-auto">
                      <button className="flex items-center px-4 py-2 border rounded-md">
                        <div className="flex items-center">
                          Sorted by
                          <span className="ml-2 font-semibold">
                            Recommended
                          </span>
                        </div>
                        <div className="ml-2">
                          <svg viewBox="0 0 20 21" className="w-5 h-5">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.41703 10.7133V17.085C5.41703 17.306 5.50483 17.5179 5.66111 17.6742C5.81739 17.8305 6.02935 17.9183 6.25037 17.9183C6.47138 17.9183 6.68334 17.8305 6.83962 17.6742C6.9959 17.5179 7.0837 17.306 7.0837 17.085L7.0837 10.7133C7.68556 10.5338 8.2134 10.1648 8.58871 9.66122C8.96402 9.15763 9.16675 8.54635 9.16675 7.91829C9.16675 7.29024 8.96402 6.67896 8.58871 6.17537C8.2134 5.67179 7.68556 5.3028 7.0837 5.12329V2.91829C7.0837 2.69728 6.9959 2.48532 6.83962 2.32904C6.68334 2.17276 6.47138 2.08496 6.25037 2.08496C6.02935 2.08496 5.81739 2.17276 5.66111 2.32904C5.50483 2.48532 5.41703 2.69728 5.41703 2.91829V5.12329C4.81518 5.3028 4.28734 5.67179 3.91203 6.17537C3.53672 6.67896 3.33398 7.29024 3.33398 7.91829C3.33398 8.54635 3.53672 9.15763 3.91203 9.66122C4.28734 10.1648 4.81518 10.5338 5.41703 10.7133ZM7.2897 7.22383C7.42706 7.42939 7.50037 7.67107 7.50037 7.91829C7.50037 8.24981 7.36867 8.56776 7.13425 8.80218C6.89983 9.0366 6.58189 9.16829 6.25037 9.16829C6.00314 9.16829 5.76147 9.09498 5.5559 8.95763C5.35034 8.82028 5.19013 8.62506 5.09552 8.39665C5.00091 8.16824 4.97615 7.91691 5.02439 7.67443C5.07262 7.43195 5.19167 7.20923 5.36648 7.03441C5.5413 6.85959 5.76403 6.74054 6.0065 6.69231C6.24898 6.64408 6.50031 6.66884 6.72872 6.76344C6.95713 6.85805 7.15235 7.01827 7.2897 7.22383ZM12.917 15.2966L12.917 17.085C12.917 17.306 13.0048 17.5179 13.1611 17.6742C13.3174 17.8305 13.5294 17.9183 13.7504 17.9183C13.9714 17.9183 14.1833 17.8305 14.3396 17.6742C14.4959 17.5179 14.5837 17.306 14.5837 17.085V15.2966C15.1856 15.1171 15.7134 14.7481 16.0887 14.2445C16.464 13.741 16.6667 13.1297 16.6667 12.5016C16.6667 11.8736 16.464 11.2623 16.0887 10.7587C15.7134 10.2551 15.1856 9.88613 14.5837 9.70663V2.91829C14.5837 2.69728 14.4959 2.48532 14.3396 2.32904C14.1833 2.17276 13.9714 2.08496 13.7504 2.08496C13.5294 2.08496 13.3174 2.17276 13.1611 2.32904C13.0048 2.48532 12.917 2.69728 12.917 2.91829V9.70663C12.3152 9.88613 11.7873 10.2551 11.412 10.7587C11.0367 11.2623 10.834 11.8736 10.834 12.5016C10.834 13.1297 11.0367 13.741 11.412 14.2445C11.7873 14.7481 12.3152 15.1171 12.917 15.2966ZM14.7897 11.8072C14.9271 12.0127 15.0004 12.2544 15.0004 12.5016C15.0004 12.8331 14.8687 13.1511 14.6342 13.3855C14.3998 13.6199 14.0819 13.7516 13.7504 13.7516C13.5031 13.7516 13.2615 13.6783 13.0559 13.541C12.8503 13.4036 12.6901 13.2084 12.5955 12.98C12.5009 12.7516 12.4762 12.5002 12.5244 12.2578C12.5726 12.0153 12.6917 11.7926 12.8665 11.6177C13.0413 11.4429 13.264 11.3239 13.5065 11.2756C13.749 11.2274 14.0003 11.2522 14.2287 11.3468C14.4571 11.4414 14.6523 11.6016 14.7897 11.8072ZM10.2754 3.58829C10.4964 3.58829 10.7084 3.67609 10.8646 3.83237C11.0209 3.98865 11.1087 4.20061 11.1087 4.42163C11.1087 4.64264 11.0209 4.8546 10.8646 5.01088C10.7084 5.16716 10.4964 5.25496 10.2754 5.25496C10.0544 5.25496 9.84242 5.16716 9.68614 5.01088C9.52986 4.8546 9.44206 4.64264 9.44206 4.42163C9.44206 4.20061 9.52986 3.98865 9.68614 3.83237C9.84242 3.67609 10.0544 3.58829 10.2754 3.58829Z"
                              fill="#121E28"
                            ></path>
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col overflow-y-auto h-[600px] md:h-[850px]">
                    <div className="px-4 pb-4">
                      <div className="flex flex-wrap justify-start">
                        {storescards1.map((category, shopsindex) => (
                          <div
                            key={shopsindex}
                            className="flex-shrink-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-4"
                            style={{ height: "425px" }}
                          >
                            <a
                              href={category.href}
                              className="block w-full h-full rounded-lg bg-slate-50 shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
                            >
                              <div className="flex flex-col h-full">
                                <div className="relative w-full h-52">
                                  <img
                                    src={category.imgSrc}
                                    alt={category.name}
                                    loading="lazy"
                                    decoding="async"
                                    className="object-cover w-full h-full rounded-t-lg"
                                    fetchPriority="high"
                                  />
                                  {category.discount && (
                                    <div className="absolute top-0 right-0 mt-2 mr-2 bg-[#ee9613] text-white text-xs px-2 py-1 rounded">
                                      {`-${category.discount}%`}
                                    </div>
                                  )}
                                  <div className="absolute bottom-2 right-0 mt-2 mr-2 bg-[#ee9613] text-white text-lg px-5 py-0 rounded">
                                    +
                                  </div>
                                </div>
                                <div className="flex flex-col w-full p-2">
                                  <div className="flex flex-col w-full p-0 mb-4">
                                    <div className="flex flex-col w-full">
                                      <h3 className="font-bold">
                                        {category.name}
                                      </h3>
                                      <div className="flex items-center text-sm mt-4 mb-2">
                                        <div className="text-[#ee9613] text-sm font-bold">
                                          <span>{category.priceRange}</span>
                                        </div>
                                        <span className="mx-1">•</span>
                                        <span>{category.cuisine}</span>
                                      </div>
                                      <div className="flex flex-row h-full">
                                        <div className="text-xs text-gray-500 mb-2">{`Pickup: ${category.pickupTime}`}</div>
                                        <div
                                          className="text-xs text-gray-500 flex-grow -mb-4"
                                          style={{ height: "50px" }}
                                        >
                                          {truncateText(
                                            category.description,
                                            3,
                                            30
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="m-auto w-full">
                                    <div className="text-black text-xs py-1 rounded">
                                      <span className="text-black">
                                        Etomart{" "}
                                      </span>
                                      {category.deliveryTime ? (
                                        <span className="text-[#ee9613] font-bold">
                                          {" "}
                                          Delivery Available
                                        </span>
                                      ) : (
                                        <span className="text-[#ee1313] font-bold">
                                          {" "}
                                          Delivery Not Available
                                        </span>
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
              </div>
            </div>
            <div className="flex flex-row p-4 space-x-56">
              <div className="flex flex-col space-y-4">
                <div>
                  <p className="text-lg font-bold">Checkers</p>
                  <div>
                    <h3 className="text-md font-semibold">
                      See similar stores
                    </h3>
                    <ul className="list-none space-y-1">
                      <li>
                        <a
                          href="/en/isr/eilat/category/alcohol"
                          className="text-[#ee9613] font-bold hover:underline"
                        >
                          Supermarket
                        </a>
                      </li>
                      <li>
                        <a
                          href="/en/isr/eilat/brand/123-alcohol"
                          className="text-[#ee9613] font-bold hover:underline"
                        >
                          Store
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div>
                  <h3 className="text-md font-semibold">Address</h3>
                  <div>
                    <p>Windhoek West</p>
                    <p>8850603 Eilat</p>
                    <a
                      href="https://maps.google.com/?q=29.56134350459979,34.95609347009179"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ee9613] font-bold hover:underline"
                    >
                      See map
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-4 ">
                <div>
                  <h3 className="text-md font-semibold">Delivery times</h3>
                  <table className="table-auto">
                    <tbody>
                      <tr>
                        <td className="pr-4">Monday</td>
                        <td>09:00–22:30</td>
                      </tr>
                      <tr>
                        <td className="pr-4">Tuesday</td>
                        <td>09:00–22:30</td>
                      </tr>
                      <tr>
                        <td className="pr-4">Wednesday</td>
                        <td>09:00–22:30</td>
                      </tr>
                      <tr>
                        <td className="pr-4">Thursday</td>
                        <td>09:00–22:30</td>
                      </tr>
                      <tr>
                        <td className="pr-4">Friday</td>
                        <td>09:00–22:30</td>
                      </tr>
                      <tr>
                        <td className="pr-4">Saturday</td>
                        <td>09:00–22:30</td>
                      </tr>
                      <tr>
                        <td className="pr-4">Sunday</td>
                        <td>09:00–22:30</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div>
                  <h3 className="text-md font-semibold">More information</h3>
                  <a
                    href="tel:+972543131665"
                    className="text-[#ee9613] font-bold hover:underline"
                  >
                    +972543131665
                  </a>
                </div>
              </div>
            </div>
            <div
              aria-hidden="true"
              className="relative overflow-hidden border-4 p-4"
            >
              <div className="w-full h-48">
                <div className="hidden"></div>
                <div className="mapboxgl-canvas-container mapboxgl-interactive mapboxgl-touch-drag-pan">
                  <div
                    ref={mapContainerRef}
                    className="w-full h-48 mapboxgl-map"
                    style={{ width: "100%", height: "500px" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* footer */}
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default Clicks;
