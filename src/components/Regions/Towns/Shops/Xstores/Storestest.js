import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";


function Storestest() {
  const [isDelivery, setIsDelivery] = useState(true); // Initial value is set to true

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const navcategories = [
    {
      name: "Welcome to the invitation 💌",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/edaa5498-a37a-11ec-9fec-c6b54fe3d9ba_________________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
      name: "1,2,3 Get started!",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/beeff388-7075-11ed-bb5f-f2a40b70dde9___________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    }, {
      name: "Welcome to the invitation 💌",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/edaa5498-a37a-11ec-9fec-c6b54fe3d9ba_________________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
      name: "1,2,3 Get started!",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/beeff388-7075-11ed-bb5f-f2a40b70dde9___________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    }, {
      name: "Welcome to the invitation 💌",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/edaa5498-a37a-11ec-9fec-c6b54fe3d9ba_________________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
      name: "1,2,3 Get started!",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/beeff388-7075-11ed-bb5f-f2a40b70dde9___________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    }, {
      name: "Welcome to the invitation 💌",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/edaa5498-a37a-11ec-9fec-c6b54fe3d9ba_________________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
      name: "1,2,3 Get started!",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/beeff388-7075-11ed-bb5f-f2a40b70dde9___________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    }, {
      name: "Welcome to the invitation 💌",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/edaa5498-a37a-11ec-9fec-c6b54fe3d9ba_________________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
      name: "1,2,3 Get started!",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/beeff388-7075-11ed-bb5f-f2a40b70dde9___________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    }, {
      name: "Welcome to the invitation 💌",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/edaa5498-a37a-11ec-9fec-c6b54fe3d9ba_________________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
      name: "1,2,3 Get started!",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/beeff388-7075-11ed-bb5f-f2a40b70dde9___________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    }, {
      name: "Welcome to the invitation 💌",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/edaa5498-a37a-11ec-9fec-c6b54fe3d9ba_________________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
      name: "1,2,3 Get started!",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/beeff388-7075-11ed-bb5f-f2a40b70dde9___________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    }, {
      name: "Welcome to the invitation 💌",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/edaa5498-a37a-11ec-9fec-c6b54fe3d9ba_________________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
      name: "1,2,3 Get started!",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/beeff388-7075-11ed-bb5f-f2a40b70dde9___________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    }, {
      name: "Welcome to the invitation 💌",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/edaa5498-a37a-11ec-9fec-c6b54fe3d9ba_________________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
      name: "1,2,3 Get started!",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/beeff388-7075-11ed-bb5f-f2a40b70dde9___________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    }, {
      name: "Welcome to the invitation 💌",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/edaa5498-a37a-11ec-9fec-c6b54fe3d9ba_________________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
      name: "1,2,3 Get started!",
      imgSrc: "https://imageproxy.wolt.com/menu/menu-images/5e9819863b77a4c553fd9a48/beeff388-7075-11ed-bb5f-f2a40b70dde9___________.jpeg",
      href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    },
    // Add more categories as needed
  ];


  const filteredCategories = navcategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const storescards1 = [
    {
      name: "Vennes Cafe",
      imgSrc: "/images/supermarkets/woermannbrock.png",
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
      imgSrc: "/images/supermarkets/woermannbrock.png",
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
      imgSrc: "/images/supermarkets/woermannbrock.png",
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
      imgSrc: "/images/supermarkets/woermannbrock.png",
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
      name: "Nordic Food",
      imgSrc: "/images/supermarkets/woermannbrock.png",
      href: "/en/stores/nordic-food/?show_wolt_plus_offer=true",
      discount: 20,
      isEtomartStore: false,
      priceRange: "€€€",
      cuisine: "Nordic",
      description: "Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and Tasty burger with tomato cheese and onionsTasty burger with tomato cheese and onionsTasty burger with tomato cheese and onions",
      pickupTime: "20–40 min",
      deliveryTime: true
    },

    // Add more items as needed
  ];

  // Drop down menu

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);


  const addToFavorites = () => {
    alert('Store added to favorites');
  };

  const getMoreInfo = () => {
    alert('More information about the store');
  };


  const truncateText = (text, maxLines, maxCharsPerLine) => {
    const words = text.split(' ');
    let truncatedText = '';
    let lineCount = 0;
    let charCount = 0;

    for (const word of words) {
      if (lineCount < maxLines) {
        if (charCount + word.length + 1 <= maxCharsPerLine) {
          truncatedText += ' ' + word;
          charCount += word.length + 1;
        } else {
          truncatedText += '\n' + word;
          charCount = word.length + 1;
          lineCount++;
        }
      } else {
        break;
      }
    }

    if (lineCount >= maxLines) {
      truncatedText += '...';
    }

    return truncatedText;
  };

  // Load Mapbox script
  useEffect(() => {
    // Load Mapbox script
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXRvbWFydG5hIiwiYSI6ImNsd3VuN3k5ZTBmdTkybXIxbG04d2IzYzkifQ.l840oaKK2b0xmUNQ1RjUSQ';

    new mapboxgl.Map({
      container: 'map1',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [17.08074939986564, -22.566979439957436],  //wernhil coordinates (-22.566979439957436, 17.08074939986564)
      zoom: 9,
    });
  }, []);
  return (
    <div>
      <div lang="en">
        <div id="appsFlyerBanner" aria-hidden="true"></div>
        <div id="app">
          <div
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              top: 0,
              pointerEvents: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 100000,
            }}
          ></div>
          <div className="relative">
            <main
              id="mainContent"
              tabIndex="-1"
              className="flex flex-col items-center"
            >
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
                            srcSet="
https://imageproxy.wolt.com/venue/6122210d7489d8613f7d1880/915af130-149f-11ec-8f09-7abce278992e_karela_00189.jpg?w=200 200w,
https://imageproxy.wolt.com/venue/6122210d7489d8613f7d1880/915af130-149f-11ec-8f09-7abce278992e_karela_00189.jpg?w=300 300w,
https://imageproxy.wolt.com/venue/6122210d7489d8613f7d1880/915af130-149f-11ec-8f09-7abce278992e_karela_00189.jpg?w=600 600w,
https://imageproxy.wolt.com/venue/6122210d7489d8613f7d1880/915af130-149f-11ec-8f09-7abce278992e_karela_00189.jpg?w=960 960w,
https://imageproxy.wolt.com/venue/6122210d7489d8613f7d1880/915af130-149f-11ec-8f09-7abce278992e_karela_00189.jpg 1200w,
https://imageproxy.wolt.com/venue/6122210d7489d8613f7d1880/915af130-149f-11ec-8f09-7abce278992e_karela_00189.jpg?w=1600 1600w,
https://imageproxy.wolt.com/venue/6122210d7489d8613f7d1880/915af130-149f-11ec-8f09-7abce278992e_karela_00189.jpg?w=1920 1920w
"
                            src="https://imageproxy.wolt.com/venue/6122210d7489d8613f7d1880/915af130-149f-11ec-8f09-7abce278992e_karela_00189.jpg"
                            alt=""
                            className="w-full h-[510px] object-cover "
                          />
                          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-4 flex justify-between items-center w-full">
                          <div className="px-4">
                            <h1 className="text-white text-4xl font-bold">Burger Room</h1>
                            <p className="text-white text-lg">Burgers Restaurant</p>
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
                        <div className="flex flex-col  overflow-y-auto" style={{ height: '800px' }}
                        >
                          {filteredCategories.slice(0, 20).map((category, index) => (
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
                      <div className="flex items-center px-8">
                        <h2 className="text-2xl font-bold">All Products</h2>
                        <div className="ml-auto">
                          <button
                            className="flex items-center px-4 py-2 border rounded-md"
                          >
                            <div className="flex items-center">
                              Sorted by
                              <span className="ml-2 font-semibold">Recommended</span>
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

                      <div className="px-4 pb-4">
                        <div className="flex flex-wrap justify-start">
                          {storescards1.map((category, shopsindex) => (
                            <div
                              key={shopsindex}
                              className="flex-shrink-0 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 p-4"
                              style={{ height: '425px' }}
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
                                      <div
                                        className="absolute top-0 right-0 mt-2 mr-2 bg-[#ee9613] text-white text-xs px-2 py-1 rounded"
                                      >
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
                                        <h3 className="font-bold">{category.name}</h3>
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
                                            style={{ height: '50px' }}
                                          >
                                            {truncateText(category.description, 3, 30)}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="m-auto w-full">
                                      <div className="text-black text-xs py-1 rounded">
                                        <span className="text-black">Etomart </span>
                                        {category.deliveryTime ? (
                                          <span className="text-[#ee9613] font-bold"> Delivery Available</span>
                                        ) : (
                                          <span className="text-[#ee1313] font-bold"> Delivery Not Available</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </a>
                            </div>
                          ))}
                        </div>

                      </div> </div> </div>

                </div>
                {/* <div className="px-4 pb-4" data-test-id="discovery.venuesList">
<div className="py-4 border-b border-gray-200">
<div data-testid="venue-list-header" className="flex items-center">
<h2 className="text-lg font-bold">All venues</h2>
<button data-test-id="venue-list-header-sort" className="ml-auto text-blue-600">
Sort by
</button>
</div>
<div className="grid grid-cols-3 gap-4 py-2">
{storescards1.map((store, index) => (
<a
key={index}
href={store.href}
className="flex items-start"
data-test-id="merchant-container-link"
>
<div className="relative w-24">
<img
src={store.imgSrc}
alt={store.name}
className="object-cover w-full h-24 rounded-md"
decoding="async"
loading="lazy"
fetchPriority="high"
/>
{store.discount && (
<div
data-testid="venue-discount-label"
className="absolute top-0 right-0 mt-2 mr-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded"
>
-{store.discount}%
</div>
)}
</div>
<div className="ml-4">
<h3 data-testid="venue-name" className="font-bold">
{store.name}
</h3>
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
</div> */}
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



                {/*  */}
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


                {/*  */}

              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Storestest;
