import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import OPNavBar from '../../../../OPNavBar';
import Footer from "../../../../Footer";
import { toast } from 'react-toastify';
// The main component for the Location Modal
function LocationModal() {
  const [isDelivery, setIsDelivery] = useState(true); // Initial value is set to true
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null); // State for the map instance

  // Marker coordinates
  const MARKER_COORDINATES = [
    { lng: 17.090396711968985, lat: -22.550459904783143 }, // Location 1
    { lng: 17.073723364157306, lat: -22.561939983264068 } // Location 2
  ];

  // Mapbox access token
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  // Function to initialize the map
  const initializeMap = (mapContainer) => {
    if (!mapContainer) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [17.08074939986564, -22.566979439957436], // Center point coordinates
      zoom: 12,
    });

    // Add navigation control to the map
    mapInstance.addControl(new mapboxgl.NavigationControl());

    // Add markers to the map
    MARKER_COORDINATES.forEach(coord => {
      new mapboxgl.Marker({ color: '#ee9613' })
        .setLngLat([coord.lng, coord.lat])
        .addTo(mapInstance);
    });

    // Define bounds to include both markers
    const bounds = new mapboxgl.LngLatBounds();
    MARKER_COORDINATES.forEach(coord => bounds.extend([coord.lng, coord.lat]));

    // Fit the map to the bounds
    mapInstance.fitBounds(bounds, {
      padding: { top: 20, bottom: 300, left: 20, right: 20 },
      maxZoom: 13,
      linear: true
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

      mapInstance.on('load', () => {
        mapInstance.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: routeLine,
          },
        });

        mapInstance.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#ee9613',
            'line-width': 8,
          },
        });
      });
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  // Initialize map on component mount
  useEffect(() => {
    if (mapContainerRef.current) {
      initializeMap(mapContainerRef.current);
    }
  }, []);

  // Cards array for the carousel
  const cards = [
    {
      title: "Fine Dining",
      description: "Experience exquisite gourmet meals from top-rated fine dining restaurants. Indulge in luxury and sophistication.",
      image: "/images/restaurants/fine-dining.webp"
    },
    // Add more cards as needed
  ];
  const extendedCards = [...cards, ...cards, ...cards];

  // Auto-scroll effect for the carousel
  useEffect(() => {
    let interval;
    if (!isPaused) {
        interval = setInterval(() => {
            handleNext();
        }, 5000);
    }
    return () => clearInterval(interval);
}, [isPaused, currentIndex]);

  // Handler for carousel navigation (next)
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Handler for carousel navigation (previous)
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Handle transition end for infinite scrolling effect
  const handleTransitionEnd = () => {
    if (currentIndex >= extendedCards.length - cards.length) {
      setCurrentIndex(cards.length);
      if (containerRef.current) {
        containerRef.current.style.transition = 'none';
        containerRef.current.style.transform = `translateX(-${cards.length * 576}px)`;
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = 'transform 0.5s ease-in-out';
          }
        }, 50);
      }
    }
    if (currentIndex <= 0) {
      setCurrentIndex(extendedCards.length - 2 * cards.length);
      if (containerRef.current) {
        containerRef.current.style.transition = 'none';
        containerRef.current.style.transform = `translateX(-${(extendedCards.length - 2 * cards.length) * 576}px)`;
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = 'transform 0.5s ease-in-out';
          }
        }, 50);
      }
    }
  };

  // Pause and resume auto-scroll for the carousel
  const pauseScroll = () => {
    setIsPaused(true);
    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  // Toggle dropdown menu visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  // Handle dot click for carousel navigation
  const handleDotClick = (index) => {
    setCurrentIndex(index);
    pauseScroll();
  };

  // Add store to favorites (dummy functionality for now)
  const addToFavorites = () => {
    toast.success('Store added to favorites');
};

  // Get more information about the store (dummy functionality for now)
  const getMoreInfo = () => {
    alert('More information about the store');
  };

  // Render the component
  return (
    <div>
      <OPNavBar />
      <div lang="en">
        <div id="appsFlyerBanner" aria-hidden="true"></div>
        <div id="app">
          <div className="relative">
            <main id="mainContent" tabIndex="-1" className="flex flex-col items-center">
              <div style={{ height: '0px' }}></div>
              <div>
                <div className="rtl" data-test-id="MainDiscoveryContent">
                  <div className="flex flex-col space-y-2">
                    <div data-test-id="venue-content-header.root" className="relative">
                      <header className="relative">
                        <div className="relative">
                          <img
                            loading="eager"
                            decoding="auto"
                            fetchpriority="high"
                            sizes="100vw"
                            srcSet="/images/restaurants/joesbeerhouse.png"
                            src="https://imageproxy.wolt.com/venue/6122210d7489d8613f7d1880/915af130-149f-11ec-8f09-7abce278992e_karela_00189.jpg"
                            alt="Joe's Beerhouse"
                            className="w-full h-[510px] object-scale-down"
                          />
                          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-4 flex justify-between items-center w-full">
                          <div className="px-4">
                            <h1 className="text-white text-4xl font-bold">Joe's Beerhouse</h1>
                            <p className="text-white text-lg">Est 1991</p>
                            <div className="mt-2 flex items-center">
                              <button
                                data-test-id="venue-favorite"
                                aria-label="Favorite"
                                className="text-white p-2 rounded-full hover:bg-white hover:text-black transition duration-200"
                              >
                                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
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
                              <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current rounded-full hover:bg-white hover:text-black transition duration-200">
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
                            className={`${isDropdownOpen ? 'block' : 'hidden'} absolute -top-48 right-4 z-20 w-56 bg-[#fdfdfd] rounded-lg shadow-lg transition-opacity duration-200`}
                            role="dialog"
                          >
                            <div className="relative">
                              <div className="absolute top-28 right-3 z-20">
                                <svg viewBox="0 0 32 32" className="w-5 h-5 text-white">
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
                  </div>
                </div>
                <div className="flex flex-row p-4 space-x-56">
                  <div className="flex flex-col space-y-4">
                    <div>
                      <p className="text-lg font-bold">Liquor Store</p>
                      <div>
                        <h3 className="text-md font-semibold">See similar stores</h3>
                        <ul className="list-none space-y-1">
                          <li><a href="/en/isr/eilat/category/alcohol" className="text-[#ee9613] font-bold hover:underline">Alcohol</a></li>
                          <li><a href="/en/isr/eilat/brand/123-alcohol" className="text-[#ee9613] font-bold hover:underline">123 Alcohol</a></li>
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
                        <a href="https://maps.google.com/?q=29.56134350459979,34.95609347009179" target="_blank" rel="noopener noreferrer" className="text-[#ee9613] font-bold hover:underline">See map</a>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div>
                      <h3 className="text-md font-semibold">Delivery times</h3>
                      <table className="table-auto">
                        <tbody>
                          <tr><td className="pr-4">Monday</td><td>13:00–22:30</td></tr>
                          <tr><td className="pr-4">Tuesday</td><td>13:00–22:30</td></tr>
                          <tr><td className="pr-4">Wednesday</td><td>11:00–22:30</td></tr>
                          <tr><td className="pr-4">Thursday</td><td>11:00–22:30</td></tr>
                          <tr><td className="pr-4">Friday</td><td>10:00–22:30</td></tr>
                          <tr><td className="pr-4">Saturday</td><td>12:00–22:30</td></tr>
                          <tr><td className="pr-4">Sunday</td><td>13:00–22:30</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <div>
                      <h3 className="text-md font-semibold">More information</h3>
                      <a href="tel:+972543131665" className="text-[#ee9613] font-bold hover:underline">+972543131665</a>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="relative overflow-hidden border-4 p-4">
                  <div className="w-full h-48">
                    <div className="hidden"></div>
                    <div className="mapboxgl-canvas-container mapboxgl-interactive mapboxgl-touch-drag-pan">
                      <div ref={mapContainerRef} className="w-full h-48 mapboxgl-map" style={{ width: '100%', height: '500px' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default LocationModal;
