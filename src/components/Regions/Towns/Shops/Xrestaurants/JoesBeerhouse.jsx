import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import OPNavBar from '../../../../OPNavBar';
import Footer from "../../../../Footer";

// The main component for Joe's Beerhouse
function JoesBeerhouse() {
  const [isDelivery, setIsDelivery] = useState(true); // Initial value is set to true
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  // Cards array for the carousel
  
  const cards = [
    {
        title: "Fine Dining",
        description: "Experience exquisite gourmet meals from top-rated fine dining restaurants. Indulge in luxury and sophistication.",
        image: "/images/restaurants/fine-dining.webp"
    },
    {
        title: "Fast Food",
        description: "Get your favorite fast food delivered hot and fresh. Burgers, fries, pizza, and more, just a click away.",
        image: "/images/restaurants/fast-food.webp"
    },
    {
        title: "Cafes & Coffee Shops",
        description: "Enjoy a cozy cafe atmosphere with freshly brewed coffee and delicious pastries. Perfect for a relaxing break.",
        image: "/images/restaurants/cafe-coffee.webp"
    },
    {
        title: "Seafood",
        description: "Savor the taste of the ocean with fresh seafood dishes from top seafood restaurants. Delivered right to your door.",
        image: "/images/restaurants/seafood.webp"
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
];
  const extendedCards = [...cards, ...cards, ...cards];

  // Effect to handle auto-scrolling
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, currentIndex]);

  // Handlers for carousel navigation
  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Handle end of transition for infinite scrolling effect
  const handleTransitionEnd = () => {
    if (currentIndex >= extendedCards.length - cards.length) {
      setCurrentIndex(cards.length);
      containerRef.current.style.transition = 'none';
      containerRef.current.style.transform = `translateX(-${cards.length * 576}px)`;
      setTimeout(() => {
        containerRef.current.style.transition = 'transform 0.5s ease-in-out';
      }, 50);
    }
    if (currentIndex <= 0) {
      setCurrentIndex(extendedCards.length - 2 * cards.length);
      containerRef.current.style.transition = 'none';
      containerRef.current.style.transform = `translateX(-${(extendedCards.length - 2 * cards.length) * 576}px)`;
      setTimeout(() => {
        containerRef.current.style.transition = 'transform 0.5s ease-in-out';
      }, 50);
    }
  };

  const storescards1 = [
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
      deliveryTime: true
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
      deliveryTime: true
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
      deliveryTime: false
    },
    {
      name: "Nordic Food",
      imgSrc: "/images/restaurants/n.png",
      href: "/en/stores/nordic-food/?show_wolt_plus_offer=true",
      discount: 20,
      isEtomartStore: false,
      priceRange: "€€€",
      cuisine: "Nordic",
      description: "Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and onionsTasty burger with tomato cheese and onions",
      pickupTime: "20–40 min",
      deliveryTime: true
    },
    {
      name: "Italian Cuisine",
      imgSrc: "/images/restaurants/ic.png",
      href: "/en/stores/nordic-food/?show_wolt_plus_offer=true",
      discount: 20,
      isEtomartStore: false,
      priceRange: "€€€",
      cuisine: "Nordic",
      description: "Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and onionsTasty burger with tomato cheese and onions",
      pickupTime: "20–40 min",
      deliveryTime: true
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
      deliveryTime: true
    },

    // Add more items as needed
  ];


  // Pause and resume auto-scroll
  const pauseScroll = () => {
    setIsPaused(true);
    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
    pauseScroll();
  };
  
  const addToFavorites = () => {
    alert('Store added to favorites');
  };

  const getMoreInfo = () => {
    alert('More information about the store');
  };

  // Effect to initialize Mapbox
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXRvbWFydG5hIiwiYSI6ImNsd3VuN3k5ZTBmdTkybXIxbG04d2IzYzkifQ.l840oaKK2b0xmUNQ1RjUSQ';

    new mapboxgl.Map({
      container: 'map1',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [17.08074939986564, -22.566979439957436],
      zoom: 9,
    });
  }, []);

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
                            fetchPriority="high"
                            sizes="100vw"
                            srcSet="/images/restaurants/joesbeerhouse.png"
                            src="https://imageproxy.wolt.com/venue/6122210d7489d8613f7d1880/915af130-149f-11ec-8f09-7abce278992e_karela_00189.jpg"
                            alt=""
                            className="w-full h-[510px] object-scale-down "
                          />
                          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-4 flex justify-between items-center w-full">
                          <div className="px-4">
                            <h1 className="text-white text-4xl font-bold">Joes Beer House</h1>
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
                          <div className="absolute bottom-6 right-4 px-4" >
                            <button
                              aria-label="More options"
                              className="text-white p-2"
                              onClick={toggleDropdown}
                            >
                              <svg ref={dropdownRef}
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
                            className={`${isDropdownOpen ? 'block' : 'hidden'
                              } absolute -top-48 right-4 z-20 w-56 bg-[#fdfdfd] rounded-lg shadow-lg transition-opacity duration-200`}
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
                                width: `${extendedCards.length * 576}px`
                              }}
                              onTransitionEnd={handleTransitionEnd}
                            >
                              {extendedCards.map((card, index) => (
                                <div key={index} className="p-2 flex-shrink-0" style={{ width: '576px', height: '276px' }}>
                                  <div className="h-full w-full rounded-md overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${card.image})` }}>
                                    <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                                      <div className="px-10 max-w-xl">
                                        <h2 className="text-2xl text-white font-semibold">{card.title}</h2>
                                        <p className="mt-2 text-gray-400">{card.description}</p>
                                        <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                                          <span>Shop Now</span>
                                          <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                          </svg>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <button className="absolute top-2 right-16 bg-white rounded-full p-2 shadow-md" onClick={handlePrev}>
                              &lt;
                            </button>
                            <button className="absolute top-2 right-4 bg-white rounded-full p-2 shadow-md" onClick={handleNext}>
                              &gt;
                            </button>

                            <div className="absolute bottom-4 w-full flex justify-center space-x-2">
                              {cards.map((_, index) => (
                                <div
                                  key={index}
                                  className={`h-2 w-2 rounded-full cursor-pointer ${index === currentIndex ? 'bg-white' : 'bg-gray-400'}`}
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
                            className={`px-2 py-1 rounded-full border border-gray-300 text-gray-700 transition-colors duration-300 ${isDelivery ? 'bg-white' : 'bg-gray-200'
                              }`}
                            onClick={() => setIsDelivery(true)}
                          >
                            Delivery
                          </button>
                          <button
                            className={`px-2 py-1 rounded-full border border-gray-300 text-gray-700 transition-colors duration-300 ${isDelivery ? 'bg-gray-200' : 'bg-white'
                              }`}
                            onClick={() => setIsDelivery(false)}
                          >
                            Pickup
                          </button>
                        </div>
                      </div>
                      <div className="text-gray-700 px-4">
                        The store isn't delivering to your location, but you can still place an order for pickup.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4" data-test-id="discovery.venuesList">
                  <div className="py-4 border-b border-gray-200">
                    <div data-testid="venue-list-header" className="flex items-center">
                      <h2 className="text-lg font-bold">All venues</h2>
                      <button data-test-id="venue-list-header-sort" className="ml-auto text-blue-600">
                        Sort by
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 py-2">
                      {storescards1.map((store, index) => (
                        <a key={index} href={store.href} className="flex items-start" data-test-id="merchant-container-link">
                          <div className="relative w-24">
                            <img src={store.imgSrc} alt={store.name} className="object-cover w-full h-24 rounded-md" decoding="async" loading="lazy" fetchPriority="high" />
                            {store.discount && (
                              <div data-testid="venue-discount-label" className="absolute top-0 right-0 mt-2 mr-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded">
                                -{store.discount}%
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <h3 data-testid="venue-name" className="font-bold">{store.name}</h3>
                            <div className="flex items-center text-sm">
                              <span>{store.priceRange}</span>
                              <span className="mx-1">•</span>
                              <span>{store.cuisine}</span>
                            </div>
                            <div className="text-xs text-gray-500">
                              Pickup: {store.pickupTime}
                            </div>
                          </div>
                        </a>
                      ))}
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
                          <li>
                            <a href="/en/isr/eilat/category/alcohol" className="text-[#ee9613] font-bold hover:underline">
                              Alcohol
                            </a>
                          </li>
                          <li>
                            <a href="/en/isr/eilat/brand/123-alcohol" className="text-[#ee9613] font-bold hover:underline">
                              123 Alcohol
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
                            <td>13:00–22:30</td>
                          </tr>
                          <tr>
                            <td className="pr-4">Tuesday</td>
                            <td>13:00–22:30</td>
                          </tr>
                          <tr>
                            <td className="pr-4">Wednesday</td>
                            <td>11:00–22:30</td>
                          </tr>
                          <tr>
                            <td className="pr-4">Thursday</td>
                            <td>11:00–22:30</td>
                          </tr>
                          <tr>
                            <td className="pr-4">Friday</td>
                            <td>10:00–22:30</td>
                          </tr>
                          <tr>
                            <td className="pr-4">Saturday</td>
                            <td>12:00–22:30</td>
                          </tr>
                          <tr>
                            <td className="pr-4">Sunday</td>
                            <td>13:00–22:30</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <div>
                      <h3 className="text-md font-semibold">More information</h3>
                      <a href="tel:+972543131665" className="text-[#ee9613] font-bold hover:underline">
                        +972543131665
                      </a>
                    </div>
                  </div>
                </div>

                <div aria-hidden="true" className="relative overflow-hidden border-4 p-4">
                  <div className="w-full h-48">
                    <div className="hidden"></div>
                    <div className="mapboxgl-canvas-container mapboxgl-interactive mapboxgl-touch-drag-pan">
                      <div id="map1" className="w-full h-48"></div>
                    </div>
                    <div className="mapboxgl-control-container">
                      <div className="mapboxgl-ctrl-top-left"></div>
                      <div className="mapboxgl-ctrl-top-right"></div>
                      <div className="mapboxgl-ctrl-bottom-left"></div>
                      <div className="mapboxgl-ctrl-bottom-right">
                        <div className="mapboxgl-ctrl block">
                          <a
                            className="mapboxgl-ctrl-logo"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.mapbox.com/"
                            aria-label="Mapbox logo"
                          ></a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="mapboxgl-marker"
                      style={{ zIndex: 0, height: '40px', transform: 'translate(1000%, 110%)' }}
                      data-lng="17.0832"
                      data-lat="-22.5700"
                    >
                      <svg viewBox="0 0 56 56" fill="rgba(31, 199, 10, 1)" width="56">
                        <ellipse cx="28" cy="48" rx="4" ry="1" fill="rgba(32, 33, 37, 1)" fillOpacity="0.24"></ellipse>
                        <g filter="url(#VenueMarkerRestaurant_svg__a)">
                          <path
                            d="M28.002 7a15.992 15.992 0 0 0-6.734 30.502 4.224 4.224 0 0 1 2.05 2.057l3.152 6.861a1.683 1.683 0 0 0 3.059 0l3.158-6.866a4.209 4.209 0 0 1 2.049-2.054A15.992 15.992 0 0 0 28.002 7Z"
                          ></path>
                        </g>
                        <path
                          d="M21.48 37.048h-.002A15.493 15.493 0 0 1 28.003 7.5a15.492 15.492 0 0 1 6.523 29.547 4.71 4.71 0 0 0-2.292 2.297l-3.159 6.867a1.184 1.184 0 0 1-2.15 0l-3.151-6.86v-.002a4.724 4.724 0 0 0-2.294-2.3Z"
                          fill="url(#VenueMarkerRestaurant_svg__b)"
                          stroke="url(#VenueMarkerRestaurant_svg__c)"
                        ></path>
                        <svg viewBox="0 0 24 24" fill="rgba(255, 255, 255, 1)" xmlns="http://www.w3.org/2000/svg" width="20" x="18" y="-5">
                          <path d="M7.5 2.79H10a.25.25 0 0 0 .25-.25v-1a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1a.25.25 0 0 0 .25.25Zm5.04 17.62a.3.3 0 0 0 .21-.261v-.415a.487.487 0 0 0-.174-.361 5.168 5.168 0 0 1-1.826-3.943v-2.39a2.5 2.5 0 0 1 1.7-2.364.365.365 0 0 0 .066-.413l-2.034-2.444a1 1 0 0 1-.232-.64V4.54a.25.25 0 0 0-.25-.25H7.5a.25.25 0 0 0-.25.25v2.638a1 1 0 0 1-.232.64l-2.036 2.444a1 1 0 0 0-.232.64V22.54a1 1 0 0 0 1 1h5.064a.29.29 0 0 0 .287-.354A2.156 2.156 0 0 1 11 22.54a2.249 2.249 0 0 1 1.54-2.13Zm6.047-2.867a3.594 3.594 0 0 1-1.672 1.286.242.242 0 0 0-.165.227v2.235a.25.25 0 0 0 .25.25h1.25a1 1 0 1 1 0 2h-5a1 1 0 0 1 0-2h1.25a.25.25 0 0 0 .25-.25v-2.233a.243.243 0 0 0-.166-.228 3.58 3.58 0 0 1-2.334-3.4v-2.39a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v2.5a3.594 3.594 0 0 1-.663 2.003Zm-2.69-.149a.5.5 0 0 0 .353.147 2 2 0 0 0 2-2 .5.5 0 0 0-1 0 1 1 0 0 1-1 1 .5.5 0 0 0-.354.853Z"></path>
                        </svg>
                        <defs>
                          <linearGradient id="VenueMarkerRestaurant_svg__b" x1="28" y1="7" x2="28" y2="47.4" gradientUnits="userSpaceOnUse">
                            <stop stopColor="rgba(255, 255, 255, 1)" stopOpacity="0.24"></stop>
                            <stop offset="1" stopColor="rgba(255, 255, 255, 1)" stopOpacity="0"></stop>
                          </linearGradient>
                          <linearGradient id="VenueMarkerRestaurant_svg__c" x1="28" y1="7" x2="28" y2="47.4" gradientUnits="userSpaceOnUse">
                            <stop stopColor="rgba(255, 255, 255, 1)" stopOpacity="0.24"></stop>
                            <stop offset="1" stopColor="rgba(255, 255, 255, 1)" stopOpacity="0"></stop>
                          </linearGradient>
                          <filter id="VenueMarkerRestaurant_svg__a" x="10" y="5" width="36" height="46.4" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                            <feOffset dy="2"></feOffset>
                            <feGaussianBlur stdDeviation="1"></feGaussianBlur>
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"></feColorMatrix>
                            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_16297_127485"></feBlend>
                            <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                            <feOffset></feOffset>
                            <feGaussianBlur stdDeviation="1"></feGaussianBlur>
                            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"></feColorMatrix>
                            <feBlend in2="effect1_dropShadow_16297_127485" result="effect2_dropShadow_16297_127485"></feBlend>
                            <feBlend in="SourceGraphic" in2="effect2_dropShadow_16297_127485" result="shape"></feBlend>
                          </filter>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-black">
                      <div>
                        <button
                          draggable="false"
                          aria-label="Keyboard shortcuts"
                          title="Keyboard shortcuts"
                          type="button"
                          className="absolute bottom-0 right-0 cursor-pointer outline-offset-3"
                          style={{ transform: 'translateX(100%)' }}
                        ></button>
                      </div>
                      <div
                        tabIndex="0"
                        aria-label="Map"
                        aria-roledescription="map"
                        role="region"
                        aria-describedby="E412F4FB-D385-4728-87CA-CBE3AEC5BB43"
                        className="absolute top-0 left-0 w-full h-full"
                      >
                        <div id="E412F4FB-D385-4728-87CA-CBE3AEC5BB43" className="hidden">
                          <div className="LGLeeN-keyboard-shortcuts-view">
                            <table>
                              <tbody>
                                <tr>
                                  <td>
                                    <kbd aria-label="Left arrow">←</kbd>
                                  </td>
                                  <td aria-label="Move left.">Move left</td>
                                </tr>
                                <tr>
                                  <td>
                                    <kbd aria-label="Right arrow">→</kbd>
                                  </td>
                                  <td aria-label="Move right.">Move right</td>
                                </tr>
                                <tr>
                                  <td>
                                    <kbd aria-label="Up arrow">↑</kbd>
                                  </td>
                                  <td aria-label="Move up.">Move up</td>
                                </tr>
                                <tr>
                                  <td>
                                    <kbd aria-label="Down arrow">↓</kbd>
                                  </td>
                                  <td aria-label="Move down.">Move down</td>
                                </tr>
                                <tr>
                                  <td>
                                    <kbd>+</kbd>
                                  </td>
                                  <td aria-label="Zoom in.">Zoom in</td>
                                </tr>
                                <tr>
                                  <td>
                                    <kbd>-</kbd>
                                  </td>
                                  <td aria-label="Zoom out.">Zoom out</td>
                                </tr>
                                <tr>
                                  <td>
                                    <kbd>Home</kbd>
                                  </td>
                                  <td aria-label="Jump left by 75%.">Jump left by 75%</td>
                                </tr>
                                <tr>
                                  <td>
                                    <kbd>End</kbd>
                                  </td>
                                  <td aria-label="Jump right by 75%.">Jump right by 75%</td>
                                </tr>
                                <tr>
                                  <td>
                                    <kbd>Page Up</kbd>
                                  </td>
                                  <td aria-label="Jump up by 75%.">Jump up by 75%</td>
                                </tr>
                                <tr>
                                  <td>
                                    <kbd>Page Down</kbd>
                                  </td>
                                  <td aria-label="Jump down by 75%.">Jump down by 75%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
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

export default JoesBeerhouse;
