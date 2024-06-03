import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import OPNavBar from '../../../../OPNavBar'; //or import OPNavBar from '../../components/OPNavBar';

function Checkers () {
    
  const [isDelivery, setIsDelivery] = useState(true); // Initial value is set to true

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const navcategories = [
    {
        name: "Fruits & Vegetables",
        imgSrc: "/images/1.webp",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
        name: "Dairy & Eggs",
        imgSrc: "/images/2.webp",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    },
    {
        name: "Meat & Seafood",
        imgSrc: "/images/meat.png",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
        name: "Bakery",
        imgSrc: "/images/bread.png",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    },
    {
        name: "Frozen Foods",
        imgSrc: "/images/frozen.png",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
        name: "Snacks & Sweets",
        imgSrc: "/images/sweets.png",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    },
    {
        name: "Beverages",
        imgSrc: "/images/beverages.png",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
        name: "Pantry Staples",
        imgSrc: "/images/pantry.png",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    },
    {
        name: "Household Supplies",
        imgSrc: "/images/hh.png",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
        name: "Personal Care",
        imgSrc: "/images/pc.png",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    },
    {
        name: "Health & Wellness",
        imgSrc: "/images/hw.png",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
        name: "Pet Supplies",
        imgSrc: "/images/ps.png",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    },
    {
        name: "Baby Products",
        imgSrc: "/images/bp.png",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
        name: "Cleaning Supplies",
        imgSrc: "/images/CS.PNG",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    },
    {
        name: "Paper Goods",
        imgSrc: "/images/pg.png",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
        name: "International Foods",
        imgSrc: "/images/if.png",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    },
    {
        name: "Organic & Natural",
        imgSrc: "/images/on.png",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
        name: "Alcohol & Wine",
        imgSrc: "/images/aw.png",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    },
    {
        name: "Baking Supplies",
        imgSrc: "/images/bs.png",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-0"
    },
    {
        name: "Canned & Jarred Goods",
        imgSrc: "/images/cjg.png",
        href: "/en/isr/eilat/venue/123-alcohol-wine-eilat/items/menucategory-1"
    },
];

  const cards = [
    {
        title: "Fresh Produce",
        description: "Get farm-fresh fruits and vegetables delivered to your doorstep. Quality you can trust, convenience you will love.",
        image: "/images/1.webp"
    },
    {
        title: "Dairy Products",
        description: "Order fresh milk, cheese, yogurt, and more. Fast delivery and reliable service at your fingertips.",
        image: "/images/2.webp"
    },
    {
        title: "Bakery Goods",
        description: "Craving fresh bread and pastries? Get delicious bakery items delivered from local bakers. Quick and easy.",
        image: "/images/3.webp"
    },
    {
        title: "Pantry Staples",
        description: "Stock up on pantry essentials with our fast and convenient delivery service. Everything you need in one place.",
        image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
    },
    {
        title: "Beverages",
        description: "Shop a wide range of beverages, from juices to sodas. Refresh your day with our top selections.",
        image: "/images/4.webp"
    },
    // Add more cards as needed
];

const [currentIndex, setCurrentIndex] = useState(0);
const containerRef = useRef(null);
const extendedCards = [...cards, ...cards, ...cards];
const [isPaused, setIsPaused] = useState(false);

useEffect(() => {
  if (!isPaused) {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }
}, [isPaused, currentIndex]);

const handleNext = () => {
  setCurrentIndex((prevIndex) => prevIndex + 1);
};

const handlePrev = () => {
  setCurrentIndex((prevIndex) => prevIndex - 1);
};

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

const pauseScroll = () => {
  setIsPaused(true);
  setTimeout(() => {
    setIsPaused(false);
  }, 5000);
};

const handleDotClick = (index) => {
  setCurrentIndex(index);
  pauseScroll();
};

  const filteredCategories = navcategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const storescards1 = [
    {
        name: "Bread",
        imgSrc: "/images/supermarkets/bread.png",
        href: "/en/stores/bread/",
        discount: null,
        isEtomartStore: false,
        priceRange: "€",
        cuisine: "Bakery",
        description: "Freshly baked bread loaf",
        pickupTime: "10–30 min",
        deliveryTime: true
    },
    {
        name: "Milk",
        imgSrc: "/images/supermarkets/milk.png",
        href: "/en/stores/milk/",
        discount: null,
        isEtomartStore: false,
        priceRange: "€",
        cuisine: "Dairy",
        description: "1 liter of whole milk",
        pickupTime: "20–40 min",
        deliveryTime: true
    },
    {
        name: "Eggs",
        imgSrc: "/images/supermarkets/eggs.png",
        href: "/en/stores/eggs/",
        discount: null,
        isEtomartStore: false,
        priceRange: "€",
        cuisine: "Dairy",
        description: "A dozen large eggs",
        pickupTime: "15–35 min",
        deliveryTime: false
    },
    {
        name: "Chicken Breast",
        imgSrc: "/images/supermarkets/chicken-breast.png",
        href: "/en/stores/chicken-breast/",
        discount: 20,
        isEtomartStore: false,
        priceRange: "€€",
        cuisine: "Meat",
        description: "1 kg of fresh chicken breast",
        pickupTime: "20–40 min",
        deliveryTime: true
    },
    {
        name: "Apples",
        imgSrc: "/images/supermarkets/apples.png",
        href: "/en/stores/apples/",
        discount: 10,
        isEtomartStore: false,
        priceRange: "€",
        cuisine: "Produce",
        description: "A bag of fresh apples",
        pickupTime: "10–30 min",
        deliveryTime: true
    },
    {
        name: "Butter",
        imgSrc: "/images/supermarkets/butter.png",
        href: "/en/stores/butter/",
        discount: null,
        isEtomartStore: false,
        priceRange: "€",
        cuisine: "Dairy",
        description: "250g of unsalted butter",
        pickupTime: "15–35 min",
        deliveryTime: true
    },
    {
        name: "Orange Juice",
        imgSrc: "/images/supermarkets/orange-juice.png",
        href: "/en/stores/orange-juice/",
        discount: null,
        isEtomartStore: false,
        priceRange: "€",
        cuisine: "Beverages",
        description: "1 liter of fresh orange juice",
        pickupTime: "10–30 min",
        deliveryTime: true
    },
    {
        name: "Cereal",
        imgSrc: "/images/supermarkets/cereal.png",
        href: "/en/stores/cereal/",
        discount: null,
        isEtomartStore: false,
        priceRange: "€",
        cuisine: "Grocery",
        description: "500g box of breakfast cereal",
        pickupTime: "10–30 min",
        deliveryTime: true
    },
    {
        name: "Rice",
        imgSrc: "/images/supermarkets/rice.png",
        href: "/en/stores/rice/",
        discount: null,
        isEtomartStore: false,
        priceRange: "€",
        cuisine: "Grocery",
        description: "1 kg of long grain rice",
        pickupTime: "15–35 min",
        deliveryTime: true
    },
    {
        name: "Tomatoes",
        imgSrc: "/images/supermarkets/tomatoes.png",
        href: "/en/stores/tomatoes/",
        discount: null,
        isEtomartStore: false,
        priceRange: "€",
        cuisine: "Produce",
        description: "A bag of fresh tomatoes",
        pickupTime: "10–30 min",
        deliveryTime: true
    },
    {
        name: "Pasta",
        imgSrc: "/images/supermarkets/pasta.png",
        href: "/en/stores/pasta/",
        discount: null,
        isEtomartStore: false,
        priceRange: "€",
        cuisine: "Grocery",
        description: "500g pack of spaghetti",
        pickupTime: "15–35 min",
        deliveryTime: true
    },
    {
        name: "Cheese",
        imgSrc: "/images/supermarkets/cheese.png",
        href: "/en/stores/cheese/",
        discount: null,
        isEtomartStore: false,
        priceRange: "€€",
        cuisine: "Dairy",
        description: "200g of cheddar cheese",
        pickupTime: "10–30 min",
        deliveryTime: true
    },
    {
        name: "Bananas",
        imgSrc: "/images/supermarkets/bananas.png",
        href: "/en/stores/bananas/",
        discount: null,
        isEtomartStore: false,
        priceRange: "€",
        cuisine: "Produce",
        description: "A bunch of ripe bananas",
        pickupTime: "10–30 min",
        deliveryTime: true
    },
    {
        name: "Yogurt",
        imgSrc: "/images/supermarkets/yogurt.png",
        href: "/en/stores/yogurt/",
        discount: null,
        isEtomartStore: false,
        priceRange: "€",
        cuisine: "Dairy",
        description: "500g tub of plain yogurt",
        pickupTime: "10–30 min",
        deliveryTime: true
    },
    {
        name: "Potatoes",
        imgSrc: "/images/supermarkets/potatoes.png",
        href: "/en/stores/potatoes/",
        discount: null,
        isEtomartStore: false,
        priceRange: "€",
        cuisine: "Produce",
        description: "A bag of fresh potatoes",
        pickupTime: "10–30 min",
        deliveryTime: true
    },
];


        //Footer stuff
        const companyLinks = [
            { label: 'Jobs', url: 'https://careers.wolt.com' },
            { label: 'Security', url: '/en/alb/security' },
            { label: 'Investors', url: 'https://ir.doordash.com/overview/default.aspx', target: '_blank' },
            { label: 'Wolt Market', url: '/en/alb/wolt-market' },
            { label: 'Developers', url: 'https://developer.wolt.com' },
        ];
    
        const GetToKnowUs = [
            { label: 'About us', url: '/en/alb/about' },
            { label: 'What we stand for', url: '/en/alb/about/wolt-values' },
            { label: 'Support', url: 'https://wolt.com/help' },
            { label: 'Contact', url: '/en/alb/contact' },
            { label: 'Sustainability', url: '/en/alb/about/better-cities' },
        ];
    
        const usefulLinks = [
            { label: "For couriers", url: "/en/alb/couriers" },
            { label: "For merchants", url: "/en/alb/merchant" },
            { label: "For affiliates", url: "/en/alb/affiliates" },
            { label: 'Promo codes', url: 'https://life.wolt.com/en/alb/howto/wolt-promo-codes' },
            { label: 'Wolt Ads', url: '/en/alb/wolt-ads' },
        ];
    
        const followLinks = [
            { label: 'Blog', url: 'https://blog.wolt.com/' },
            { label: 'Instagram', url: 'https://instagram.com/woltapp', target: '_blank' },
            { label: 'Facebook', url: 'https://www.facebook.com/woltapp/', target: '_blank' },
            { label: 'Twitter', url: 'https://twitter.com/woltapp', target: '_blank' },
            { label: 'LinkedIn', url: 'https://www.linkedin.com/company/wolt-oy/', target: '_blank' },
        ];
    
    
        //footer stuff
    
        const handleLanguageChange = () => {
            // Handle language change logic here
        };
    
        const handleAccessibilitySettingsOpen = () => {
            // Handle accessibility settings opening logic here
        };

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
    <div><div><div>
    <OPNavBar />
</div>
   
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
                            srcSet="/images/supermarkets/checkers.png"
                            src="https://imageproxy.wolt.com/venue/6122210d7489d8613f7d1880/915af130-149f-11ec-8f09-7abce278992e_karela_00189.jpg"
                            alt=""
                            className="w-full h-[510px] object-full"
                          />
                          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-4 flex justify-between items-center w-full">
                          
                          
                          
                          <div className="px-4">
                            <h1 className="text-white text-4xl font-bold">Checkers</h1>
                            <p className="text-white text-lg">Better and Better</p>
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
                      <p className="text-lg font-bold">Checkers</p>
                      <div>
                        <h3 className="text-md font-semibold">See similar stores</h3>
                        <ul className="list-none space-y-1">
                          <li>
                            <a href="/en/isr/eilat/category/alcohol" className="text-[#ee9613] font-bold hover:underline">
                              Supermarket
                            </a>
                          </li>
                          <li>
                            <a href="/en/isr/eilat/brand/123-alcohol" className="text-[#ee9613] font-bold hover:underline">
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
                      <a href="tel:+972543131665" className="text-[#ee9613] font-bold hover:underline">
                        +(061)4684654654
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
      </div>    {/* footer */}
                    <footer>
                        <div
                            id="Footer_section_orange"
                            className="bg-[#ee9613] border border-solid border-white-A700_19 rounded-tl-[150px] rounded-tr-[150px] shadow-xl relative"
                            style={{ width: '100%', maxWidth: '100vw', margin: '0 auto' }}
                        >
                            <div className=" flex items-center justify-center mx-16 p-2 flex-col md:flex-row  ">
                                <div className="flex items-center justify-center  ">
    
                                    <div className="flex justify-start items-center  m-2  ">
                                        <h1 className="text-3xl font-shrikhand text-[#000000] whitespace-nowrap ">
                                            <a href="/LP">Etomart</a>
                                        </h1>
                                    </div>
                                </div>
    
                            </div>
                            <div className="container mx-auto py-0 flex flex-col md:flex-row justify-between items-center">
                                <div className="flex flex-col items-center justify-between">
    
                                    <div className="flex  items-center justify-between flex-col md:flex-col gap-2 m-2 ">
                                        <a
                                            href="https://wolt.onelink.me/Uy67?af_adset=not-available-web-to-app&af_keywords=not-available-web-to-app&af_r=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.wolt.android&af_sub1=https%3A%2F%2Fwww.google.com%2F&af_sub2=%2Fen&c=not-available-web-to-app&pid=not-available-web-to-app"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            aria-label="Download the Wolt Android app on Google Play"
                                            title="Download the Wolt iOS app on the App Store"
                                            data-test-id="platform-badge-consumer-android"
                                            className="wpt-ui-AppLink_Link_l1ld7axn"
                                            style={{ width: "120px", height: "50px" }}
                                        >
                                            <img
                                                src="https://images.ctfassets.net/23u853certza/7xaqvusYmbDlca5umD9bZo/a0fa3e1c7ca41a70c6285d6c7b18c92b/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
                                                loading="lazy"
                                                className="wpt-ui-AppLink_StyledImage_s1lunxia"
                                                alt="Download the Wolt iOS app on the App Store" />
                                        </a>
                                        <a
                                            href="https://wolt.onelink.me/Uy67?af_adset=not-available-web-to-app&af_keywords=not-available-web-to-app&af_r=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.wolt.android&af_sub1=https%3A%2F%2Fwww.google.com%2F&af_sub2=%2Fen&c=not-available-web-to-app&pid=not-available-web-to-app"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                            aria-label="Download the Wolt Android app on Google Play"
                                            title="Download the Wolt iOS app on the App Store"
                                            data-test-id="platform-badge-consumer-android"
                                            className="wpt-ui-AppLink_Link_l1ld7axn"
                                            style={{ width: "120px", height: "50px" }}
                                        >
                                            <img
                                                src="https://images.ctfassets.net/23u853certza/1Djo4jOj0doR5PfWVzj9O6/d52acac7f94db66263f5ad9e01c41c82/google-play-badge.png"
                                                loading="lazy"
                                                className="wpt-ui-AppLink_StyledImage_s1lunxia"
                                                alt="Download the Wolt Android app on Google Play" />
                                        </a>
                                    </div>
                                </div>
    
                                <div className="flex  items-end gap-4 md:gap-40 ">
                                    <div className="flex flex-col items-center">
                                        <nav>
                                            <div className="flex text-center p-2 mb-0">
                                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl  max-w-xl  font-Agbalumo text-black ">
                                                    Company Links
                                                </p>
                                            </div>
                                            <div className="p-2 wpt-ui-FooterLinkColumn_LinkRegion_lrl0tag">
                                                <ul className="wpt-ui-FooterLinkColumn_Links_ln8lzpy space-y-0">
                                                    {companyLinks.map((link, index) => (
                                                        <li key={index.label}>
                                                            <a
                                                                href={link.url}
                                                                target={link.target}
                                                                className="text-white text-sm sm:text-base md:text-lg lg:text-xl  max-w-xl  font-josefin_sans hover:text-black transition duration-150 ease-in-out"
                                                            >
                                                                {link.label}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <nav>
                                            <div className="flex text-center p-2 mb-0">
                                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl  max-w-xl  font-Agbalumo text-black ">
                                                    Useful Links
                                                </p>
                                            </div>
                                            <div className="p-2 wpt-ui-FooterLinkColumn_LinkRegion_lrl0tag">
                                                <ul className="wpt-ui-FooterLinkColumn_Links_ln8lzpy space-y-0">
                                                    {usefulLinks.map((link, index) => (
                                                        <li key={index.label}>
                                                            <a
                                                                href={link.url}
                                                                target={link.target}
                                                                className="text-white text-sm sm:text-base md:text-lg lg:text-xl  max-w-xl  font-josefin_sans hover:text-black transition duration-150 ease-in-out"
                                                            >
                                                                {link.label}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <nav>
                                            <div className="flex text-center p-2 mb-0">
                                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl  max-w-xl  font-Agbalumo text-black ">
                                                    Get to Know US
                                                </p>
                                            </div>
                                            <div className="p-2 wpt-ui-FooterLinkColumn_LinkRegion_lrl0tag">
                                                <ul className="wpt-ui-FooterLinkColumn_Links_ln8lzpy space-y-0">
                                                    {GetToKnowUs.map((link, index) => (
                                                        <li key={index.label}>
                                                            <a
                                                                href={link.url}
                                                                target={link.target}
                                                                className="text-white text-sm sm:text-base md:text-lg lg:text-xl  max-w-xl  font-josefin_sans hover:text-black transition duration-150 ease-in-out"
                                                            >
                                                                {link.label}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <nav>
                                            <div className="flex text-center p-2 mb-0">
                                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl  max-w-xl  font-Agbalumo text-black ">
                                                    Follow Links
                                                </p>
                                            </div>
                                            <div className="p-2 wpt-ui-FooterLinkColumn_LinkRegion_lrl0tag">
                                                <ul className="wpt-ui-FooterLinkColumn_Links_ln8lzpy space-y-0">
                                                    {followLinks.map((link, index) => (
                                                        <li key={index.label}>
                                                            <a
                                                                href={link.url}
                                                                target={link.target}
                                                                className="text-white text-sm sm:text-base md:text-lg lg:text-xl  max-w-xl  font-josefin_sans hover:text-black transition duration-150 ease-in-out"
                                                            >
                                                                {link.label}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                            <div className="container mx-auto  flex flex-col md:flex-row justify-between items-center bg-[#ee9613] py-4">
                                <div className="flex flex-row md:flex-row items-center md:items-start space-x-4 md:space-x-8">
                                    <button
                                        aria-label="Change language"
                                        data-test-id="Footer.OpenLanguageSelectionDialogButton"
                                        className="text-sm sm:text-base md:text-lg lg:text-xl  max-w-xl  flex font-Agbalumo items-center text-zinc-950 hover:text-zinc-50 transition-colors"
                                        onClick={handleLanguageChange}
                                    >
                                        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><g fill="currentColor"><path d="M21 21.53c0-.29.24-.53.53-.53c.29 0 .53.23.53.53v1.06c0 .29-.24.53-.53.53c-.29 0-.53-.24-.53-.53z" /><path fill-rule="evenodd" d="M16 1C7.716 1 1 7.716 1 16c0 8.284 6.716 15 15 15c8.284 0 15-6.716 15-15c0-8.284-6.716-15-15-15m-3.975 2.619C6.79 5.299 3 10.207 3 16c0 7.18 5.82 13 13 13s13-5.82 13-13c0-1-.113-1.975-.327-2.911L27.32 15.12c-.12.18-.32.29-.54.29h-.34c-.17 0-.31-.14-.31-.31v-.54c0-1.2-.8-3.15-2-3.15h-1.55c-.53 0-.73.66-.42.93l.23.19c.44.37.35 1.06-.16 1.32l-1.15.58h-.35c-.36 0-.66-.3-.66-.66v-.85c0-.27-.22-.5-.5-.5h-.006c-.29 0-1.434 0-1.434 1.4v.5c0 1.01 1.74 1.82 2.73 1.98c.16.02.29.16.29.32v.36c0 .22-.05.44-.15.64l-1.91 2.85h-.34c-.33 0-.6.26-.61.59l-.06 2.42l-1.7 1.7c-.2.21-.47.32-.76.32h-.49c-.6 0-1.08-.49-1.08-1.08v-2.25c0-.56-.29-.7-.5-.7h-.35c-.36 0-.66-.3-.66-.66v-1.72c0-.93-.75-1.68-1.68-1.68H8c-.89 0-2-1.69-2-2.58v-.71c0-.45.17-.88.47-1.2l1.07-1.13c.24-.25.58-.39.93-.38h1.06c.31 0 .6-.12.82-.34l.32-.32c.22-.22.52-.34.83-.34h1.04c.23 0 .49.12.48.39v.28c-.03.58 1.1.32 1.1.32s.96-.87 1.4-.97c.45-.11 1.35.14 1.88.46c.29.17.65-.03.65-.36c0-.63-.52-1.14-1.15-1.14h-.37a.49.49 0 0 1-.49-.49v-.72a.29.29 0 0 0-.29-.29h-.37c-.21 0-.41.1-.53.28l-.62.92c-.12.19-.33.3-.56.3h-.14c-.32 0-.62-.12-.85-.35l-.44-.34c-.36-.3-.82-.31-.91-.31h-.97c-.2 0-.35.16-.35.35l-.04.3c0 .36-.25.85-.61.85h-.58c-.36 0-.65-.29-.65-.64v-1.2c0-.37.3-.66.66-.66c.2 0 .35-.16.35-.35v-.31c0-.79.57-.91.99-.81c.179.047.365.126.553.207c.297.127.6.257.887.263h1.58c.59 0 .98-.4.98-.98c0-.145.007-.296.014-.445c.031-.663.06-1.287-.544-1.165l-.28.28c-.18.19-.29.44-.29.71v.14c0 .25-.2.47-.45.49c-.24.01-.55-.03-.55-.34c0-.26-.008-.41-.015-.547c-.01-.21-.02-.383.005-.863a.546.546 0 0 1 .005-.051m6.21-.428a13.033 13.033 0 0 0-1.537-.173l.352.352h1.01z" clip-rule="evenodd" /></g></svg>
                                        <span>English</span>
                                    </button>
                                    <button
                                        aria-label="Open accessibility settings"
                                        className="text-sm sm:text-base md:text-lg lg:text-xl  max-w-xl flex font-Agbalumo items-center space-x-2 text-zinc-950 hover:text-zinc-50 transition-colors"
                                        onClick={handleAccessibilitySettingsOpen}
                                    >
    
                                        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z" clip-rule="evenodd" />
                                            <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                                        </svg>
                                        <span>Accessibility</span>
                                    </button>
                                </div>
                                <div className="flex  items-center space-x-4 text-zinc-950 font-Agbalumo mt-4 md:mt-0">
                                    <div className="flex  items-center space-x-4">
                                        <button
                                            aria-label="Open accessibility settings"
                                            className="text-sm sm:text-base md:text-lg lg:text-xl  max-w-xl  flex font-Agbalumo items-center space-x-2 text-zinc-950 hover:text-zinc-50 transition-colors"
                                            onClick={handleAccessibilitySettingsOpen}
                                        >
                                            <svg viewBox="0 0 24 24" className="h-5 w-5">
                                                {/* SVG icon path */}
                                            </svg>
                                            <span>Privacy Statement</span>
                                        </button>
                                        <button
                                            aria-label="Open accessibility settings"
                                            className="text-sm sm:text-base md:text-lg lg:text-xl  max-w-xl  flex font-Agbalumo items-center space-x-2 text-zinc-950 hover:text-zinc-50 transition-colors"
                                            onClick={handleAccessibilitySettingsOpen}
                                        >
                                            <svg viewBox="0 0 24 24" className="h-5 w-5">
                                                {/* SVG icon path */}
                                            </svg>
                                            <span>User Terms of Service</span>
                                        </button>
                                    </div>
                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl  max-w-xl ">
                                        ©️ Etomart 2024
                                    </p>
                                </div>
    
                            </div>
                        </div>
    
                    </footer> </div>
  );
}


export default Checkers;
