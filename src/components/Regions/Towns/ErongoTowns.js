import React, { useState, useEffect } from "react";
import { useRef } from 'react';
import OPNavBar from '../../OPNavBar'; //or import OPNavBar from '../../components/OPNavBar';



function ErongoTowns() {

  const iconscategories = [
    { name: "Grocery", imgSrc: "/images/websiteicons/grocery.png", href: "/en/discovery/category/grocery" },
    { name: "Bakery", imgSrc: "/images/websiteicons/bakery.png", href: "/en/discovery/category/grocery" },
    { name: "Healthy", imgSrc: "/images/websiteicons/healthy-food.png", href: "/en/discovery/category/grocery" },
    { name: "Desserts", imgSrc: "/images/websiteicons/desserts.png", href: "/en/discovery/category/grocery" },
    { name: "Fruits & Vegetables", imgSrc: "/images/websiteicons/fruit-and-vegetables.png", href: "/en/discovery/category/grocery" },
    { name: "Dairy & Eggs", imgSrc: "/images/websiteicons/dairy-and-eggs.png", href: "/en/discovery/category/grocery" },
    { name: "Meat", imgSrc: "/images/websiteicons/meat.png", href: "/en/discovery/category/grocery" },
    { name: "Seafood", imgSrc: "/images/websiteicons/seafood.png", href: "/en/discovery/category/grocery" },
    { name: "Beverages", imgSrc: "/images/websiteicons/beverages.png", href: "/en/discovery/category/grocery" },
    { name: "Snacks & Sweets", imgSrc: "/images/websiteicons/snacks-and-sweets.png", href: "/en/discovery/category/grocery" },
    { name: "Household Essentials", imgSrc: "/images/websiteicons/household-essentials.png", href: "/en/discovery/category/grocery" },
    { name: "Pharmaceuticals", imgSrc: "/images/websiteicons/pharmaceuticals.png", href: "/en/discovery/category/grocery" },
    { name: "Baby", imgSrc: "/images/websiteicons/baby.png", href: "/en/discovery/category/grocery" },
    { name: "Pet Supplies", imgSrc: "/images/websiteicons/pet-food.png", href: "/en/discovery/category/grocery" },
    { name: "Frozen Foods", imgSrc: "/images/websiteicons/frozen-food.png", href: "/en/discovery/category/grocery" },
    { name: "Fast Food", imgSrc: "/images/websiteicons/fast-food.png", href: "/en/discovery/category/grocery" },
    { name: "Restaurant", imgSrc: "/images/websiteicons/restaurant.png", href: "/en/discovery/category/grocery" },
    { name: "International Foods", imgSrc: "/images/websiteicons/international-food.png", href: "/en/discovery/category/grocery" },
    { name: "Alcohol", imgSrc: "/images/websiteicons/alcohol.png", href: "/en/discovery/category/grocery" }
  ];
  const truncateMiddle = (str, maxLength) => {
    if (str.length <= maxLength) return str;
    const middleIndex = Math.floor(maxLength / 2);
    const start = str.substring(0, middleIndex);
    const end = str.substring(str.length - middleIndex);
    return `${start}...${end}`;
  };


  const categoriescards = [
    { name: "Grocery", imgSrc: "/images/cardcategories/cardgrocery.png", href: "/en/discovery/category/grocery" },
    { name: "Bakery", imgSrc: "/images/cardcategories/cardbakery.png", href: "/en/discovery/category/bakery" },
    { name: "Healthy", imgSrc: "/images/cardcategories/card-healthy-food.png", href: "/en/discovery/category/healthy" },
    { name: "Desserts", imgSrc: "/images/cardcategories/carddesserts.png", href: "/en/discovery/category/desserts" },
    { name: "Fruits & Vegetables", imgSrc: "/images/cardcategories/card-fruits-and-vegetables.png", href: "/en/discovery/category/fruits-vegetables" },
    { name: "Dairy & Eggs", imgSrc: "/images/cardcategories/card-dairy-and-eggs.png", href: "/en/discovery/category/dairy-eggs" },
    { name: "Meat", imgSrc: "/images/cardcategories/cardmeat.png", href: "/en/discovery/category/meat" },
    { name: "Seafood", imgSrc: "/images/cardcategories/cardseafood.png", href: "/en/discovery/category/seafood" },
    { name: "Beverages", imgSrc: "/images/cardcategories/cardbeverages.png", href: "/en/discovery/category/beverages" },
    { name: "Snacks & Sweets", imgSrc: "/images/cardcategories/card-snacks-and-sweets.png", href: "/en/discovery/category/snacks-sweets" },
    { name: "Household Essentials", imgSrc: "/images/cardcategories/card-household-essentials.png", href: "/en/discovery/category/household-essentials" },
    { name: "Pharmaceuticals", imgSrc: "/images/cardcategories/cardpharmaceuticals.png" , href: "/en/discovery/category/household-essentials" },
    { name: "Baby", imgSrc: "/images/cardcategories/cardbaby.png", href: "/en/discovery/category/baby" },
    { name: "Pet Supplies", imgSrc: "/images/cardcategories/card-pet-food.png", href: "/en/discovery/category/pet-supplies" },
    { name: "Frozen Foods", imgSrc: "/images/cardcategories/card-frozen-food.png", href: "/en/discovery/category/frozen-foods" },
    { name: "Fast Food", imgSrc: "/images/cardcategories/card-fast-food.png", href: "/en/discovery/category/fast-food" },
    { name: "Restaurant", imgSrc: "/images/cardcategories/cardrestaurant.png", href: "/en/discovery/category/restaurant" },
    { name: "International Foods", imgSrc: "/images/cardcategories/card-international-food.png", href: "/en/discovery/category/international-foods" },
    { name: "Alcohol", imgSrc: "/images/cardcategories/cardalcohol.png", href: "/en/discovery/category/alcohol" }
  ];

  const storescards1 = [
    { name: "Checkers", imgSrc: "/images/supermarkets/checkers.png", href: "/en/discovery/category/checkers" },
    { name: "Shoprite", imgSrc: "/images/supermarkets/shoprite.png", href: "/en/discovery/category/shoprite" },
    { name: "Pick n Pay", imgSrc: "/images/supermarkets/picknpay.png", href: "/en/discovery/category/picknpay" },
    { name: "Spar", imgSrc: "/images/supermarkets/spar.png", href: "/en/discovery/category/spar" },
    { name: "Woermann Brock", imgSrc: "/images/supermarkets/woermannbrock.png", href: "/en/discovery/category/woermannbrock" },
    { name: "OK Foods", imgSrc: "/images/supermarkets/okfoods.png", href: "/en/discovery/category/okfoods" },
    { name: "Choppies", imgSrc: "/images/supermarkets/choppies.png", href: "/en/discovery/category/choppies" },
    { name: "Food Lover's Market", imgSrc: "/images/supermarkets/foodlovers.png", href: "/en/discovery/category/foodloversmarket" },
    { name: "Metro", imgSrc: "/images/supermarkets/metro.png", href: "/en/discovery/category/metro" },
    { name: "Joe's Beerhouse", imgSrc: "/images/restaurants/joesbeerhouse.png", href: "/en/discovery/category/joesbeerhouse" },
    { name: "The Stellenbosch Wine Bar", imgSrc: "/images/restaurants/stellenbosch.png", href: "/en/discovery/category/stellenbosch" },
    { name: "O Portuga", imgSrc: "/images/restaurants/oportuga.png", href: "/en/discovery/category/oportuga" },
    { name: "The Social", imgSrc: "/images/restaurants/thesocial.png", href: "/en/discovery/category/thesocial" },
    { name: "Sardinia Blue Olive", imgSrc: "/images/restaurants/sardiniablueolive.png", href: "/en/discovery/category/sardiniablueolive" },
    { name: "Slowtown Coffee Roasters", imgSrc: "/images/restaurants/slowtown.png", href: "/en/discovery/category/slowtown" },
    { name: "Dis-Chem", imgSrc: "/images/pharmacies/dischem.png", href: "/en/discovery/category/dischem" },
    { name: "Clicks Pharmacy", imgSrc: "/images/pharmacies/clicks.png", href: "/en/discovery/category/clicks" },
    { name: "Nampharm Pharmacy", imgSrc: "/images/pharmacies/nampharm.png", href: "/en/discovery/category/nampharm" },
    { name: "Alpha Pharm", imgSrc: "/images/pharmacies/alphapharm.png", href: "/en/discovery/category/alphapharm" },
    { name: "Medicine World", imgSrc: "/images/pharmacies/medicineworld.png", href: "/en/discovery/category/medicineworld" },
    { name: "City Pharmacy", imgSrc: "/images/pharmacies/citypharmacy.png", href: "/en/discovery/category/citypharmacy" }
  ];

  const storescards2 = [
    { name: "Dis-Chem", imgSrc: "/images/pharmacies/dischem.png", href: "/en/discovery/category/dischem" },
    { name: "Clicks Pharmacy", imgSrc: "/images/pharmacies/clicks.png", href: "/en/discovery/category/clicks" },
    { name: "Nampharm Pharmacy", imgSrc: "/images/pharmacies/nampharm.png", href: "/en/discovery/category/nampharm" },
    { name: "Alpha Pharm", imgSrc: "/images/pharmacies/alphapharm.png", href: "/en/discovery/category/alphapharm" },
    { name: "Medicine World", imgSrc: "/images/pharmacies/medicineworld.png", href: "/en/discovery/category/medicineworld" },
    { name: "City Pharmacy", imgSrc: "/images/pharmacies/citypharmacy.png", href: "/en/discovery/category/citypharmacy" },
    { name: "Joe's Beerhouse", imgSrc: "/images/restaurants/joesbeerhouse.png", href: "/en/discovery/category/joesbeerhouse" },
    { name: "The Stellenbosch Wine Bar", imgSrc: "/images/restaurants/stellenbosch.png", href: "/en/discovery/category/stellenbosch" },
    { name: "O Portuga", imgSrc: "/images/restaurants/oportuga.png", href: "/en/discovery/category/oportuga" },
    { name: "The Social", imgSrc: "/images/restaurants/thesocial.png", href: "/en/discovery/category/thesocial" },
    { name: "Sardinia Blue Olive", imgSrc: "/images/restaurants/sardiniablueolive.png", href: "/en/discovery/category/sardiniablueolive" },
    { name: "Slowtown Coffee Roasters", imgSrc: "/images/restaurants/slowtown.png", href: "/en/discovery/category/slowtown" },
    { name: "Checkers", imgSrc: "/images/supermarkets/checkers.png", href: "/en/discovery/category/checkers" },
    { name: "Shoprite", imgSrc: "/images/supermarkets/shoprite.png", href: "/en/discovery/category/shoprite" },
    { name: "Pick n Pay", imgSrc: "/images/supermarkets/picknpay.png", href: "/en/discovery/category/picknpay" },
    { name: "Spar", imgSrc: "/images/supermarkets/spar.png", href: "/en/discovery/category/spar" },
    { name: "Woermann Brock", imgSrc: "/images/supermarkets/woermannbrock.png", href: "/en/discovery/category/woermannbrock" },
    { name: "OK Foods", imgSrc: "/images/supermarkets/okfoods.png", href: "/en/discovery/category/okfoods" },
    { name: "Choppies", imgSrc: "/images/supermarkets/choppies.png", href: "/en/discovery/category/choppies" },
    { name: "Food Lover's Market", imgSrc: "/images/supermarkets/foodlovers.png", href: "/en/discovery/category/foodloversmarket" },
    { name: "Metro", imgSrc: "/images/supermarkets/metro.png", href: "/en/discovery/category/metro" }
  ];

  const supermarkets = [
    { name: "Checkers", imgSrc: "/images/supermarkets/checkers.png", href: "/en/discovery/category/checkers" },
    { name: "Shoprite", imgSrc: "/images/supermarkets/shoprite.png", href: "/en/discovery/category/shoprite" },
    { name: "Pick n Pay", imgSrc: "/images/supermarkets/picknpay.png", href: "/en/discovery/category/picknpay" },
    { name: "Spar", imgSrc: "/images/supermarkets/spar.png", href: "/en/discovery/category/spar" },
    { name: "Woermann Brock", imgSrc: "/images/supermarkets/woermannbrock.png", href: "/en/discovery/category/woermannbrock" },
    { name: "OK Foods", imgSrc: "/images/supermarkets/okfoods.png", href: "/en/discovery/category/okfoods" },
    { name: "Choppies", imgSrc: "/images/supermarkets/choppies.png", href: "/en/discovery/category/choppies" },
    { name: "Food Lover's Market", imgSrc: "/images/supermarkets/foodlovers.png", href: "/en/discovery/category/foodloversmarket" },
    { name: "Metro", imgSrc: "/images/supermarkets/metro.png", href: "/en/discovery/category/metro" }
  ];

  const restaurants = [
    { name: "Joe's Beerhouse", imgSrc: "/images/restaurants/joesbeerhouse.png", href: "/en/discovery/category/joesbeerhouse" },
    { name: "The Stellenbosch Wine Bar", imgSrc: "/images/restaurants/stellenbosch.png", href: "/en/discovery/category/stellenbosch" },
    { name: "O Portuga", imgSrc: "/images/restaurants/oportuga.png", href: "/en/discovery/category/oportuga" },
    { name: "The Social", imgSrc: "/images/restaurants/thesocial.png", href: "/en/discovery/category/thesocial" },
    { name: "Sardinia Blue Olive", imgSrc: "/images/restaurants/sardiniablueolive.png", href: "/en/discovery/category/sardiniablueolive" },
    { name: "Slowtown Coffee Roasters", imgSrc: "/images/restaurants/slowtown.png", href: "/en/discovery/category/slowtown" }
  ];

  const pharmacies = [
    { name: "Dis-Chem", imgSrc: "/images/pharmacies/dischem.png", href: "/en/discovery/category/dischem" },
    { name: "Clicks Pharmacy", imgSrc: "/images/pharmacies/clicks.png", href: "/en/discovery/category/clicks" },
    { name: "Nampharm Pharmacy", imgSrc: "/images/pharmacies/nampharm.png", href: "/en/discovery/category/nampharm" },
    { name: "Alpha Pharm", imgSrc: "/images/pharmacies/alphapharm.png", href: "/en/discovery/category/alphapharm" },
    { name: "Medicine World", imgSrc: "/images/pharmacies/medicineworld.png", href: "/en/discovery/category/medicineworld" },
    { name: "City Pharmacy", imgSrc: "/images/pharmacies/citypharmacy.png", href: "/en/discovery/category/citypharmacy" }
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

// carouselstorescards2

const iconscategoriescarouselscroll = useRef(null);
const  categoriescardsscroll = useRef(null);
const  storescards1scroll = useRef(null);
const  storescards2scroll = useRef(null);
const  supermarketsscroll = useRef(null);
const  restaurantsscroll = useRef(null);
const  pharmaciesscroll = useRef(null);

const scrollLeft = (carouselRef) => {
if (carouselRef.current) {
  carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
}
};

const scrollRight = (carouselRef) => {
if (carouselRef.current) {
  carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
}
};

  // 
  // const carouselRef = useRef(null);

  // const scrollLeft = () => {
  //   if (carouselRef.current) {
  //     carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  //   }
  // };

  // const scrollRight = () => {
  //   if (carouselRef.current) {
  //     carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  //   }
  // };


  //footer stuff

  const handleLanguageChange = () => {
    // Handle language change logic here
  };

  const handleAccessibilitySettingsOpen = () => {
    // Handle accessibility settings opening logic here
  };

  const cards = [
    {
      title: "Back Pack",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.",
      image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
    },
    {
      title: "Games",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.",
      image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    },
    {
      title: "Back Pack",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.",
      image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
    },
    {
      title: "Games",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.",
      image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
    },
    {
      title: "Back Pack",
      description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore facere provident molestias ipsam sint voluptatum pariatur.",
      image: "https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
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

  return (
    <div><div><div>
      <OPNavBar />
    </div>
      <div className="relative z-10">
        <div id="LP_section_5_orange" className="relative z-10 flex justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[150px] shadow-xl md:h-auto md:p-10 h-auto p-10" style={{ width: '65%', maxWidth: '100vw', margin: '0 auto' }}>
          <div className="relative z-10 flex items-center justify-center w-full mb-0">
            <div className="sc-6db52481-0 kZFPSm cb-elevated cb_elevation_elevationMedium_e16y">
              <div role="tablist" className=" flex space-x-2 gap-2">
                <a
                  role="tab"
                  aria-selected="false"
                  className=" flex items-center space-x-2 gap-2 px-4 py-2 rounded-full bg-white shadow-md    hover:bg-orange-300 transition duration-150"
                  href="/en/discovery"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-Black">
                    {/* Store SVG icon */}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M.646 0A.646.646 0 0 0 0 .646V4.5a3.5 3.5 0 0 0 6.25 2.165A3.494 3.494 0 0 0 9 8c1.116 0 2.11-.522 2.75-1.335a3.498 3.498 0 0 0 5.75-.362A3.5 3.5 0 0 0 24 4.5V.647A.646.646 0 0 0 23.354 0h-5.708a.647.647 0 0 0-.146.017.647.647 0 0 0-.146-.017H.646ZM2 2v2.5a1.5 1.5 0 1 0 3 0V2H2Zm17 0v2.5a1.5 1.5 0 0 0 3 0V2h-3Zm-6 2.5V2h3v2.5a1.5 1.5 0 0 1-3 0ZM7.5 2v2.5a1.5 1.5 0 1 0 3 0V2h-3Z" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1 22V8.45a3.491 3.491 0 0 0 2 1.015V22h8V12h7.5v10H21V9.465a3.49 3.49 0 0 0 2-1.016V22a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2Zm12 0h3.5v-8H13v8Z" />
                    <path d="M5.5 12a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3Z" />
                  </svg>
                  <span className="text-black">Stores</span>
                </a>
                <a
                  role="tab"
                  aria-selected="false"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md  transition-all   hover:bg-orange-300  duration-150"
                  href="/en/discovery/restaurants"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-black">
                    {/* Restaurant SVG icon */}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 1a1 1 0 112 0v5a4.009 4.009 0 01-2.667 3.772.5.5 0 00-.333.471V23a1 1 0 11-2 0V10.243a.5.5 0 00-.333-.471A4.009 4.009 0 014 6V1a1 1 0 112 0v5c0 .522.205 1.025.571 1.398A.251.251 0 007 7.223V1a1 1 0 112 0v6.225a.251.251 0 00.429.175c.367-.374.572-.877.571-1.4V1zM20.5.75a.75.75 0 00-.75-.75C17.418 0 15.064 6.055 15 13.243v.021c.004.686.563 1.24 1.25 1.236H18a.5.5 0 01.5.5v8a1 1 0 102 0V.75z" />
                  </svg>
                  <span className="text-black">Restaurants</span>
                </a>
              </div>
            </div>
          </div>



        </div>
        {/* Icon Carousel Buttons*/}    
        <div className="relative">
      {/* Left Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      
      {/* Right Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      {/* Left Button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] p-2 rounded-br-[150px] rounded-tr-[150px] z-20"
        onClick={() => scrollLeft(iconscategoriescarouselscroll)}
      >
        &#9664; {/* Left Arrow */}
      </button>
      
      {/* Icon Carousel Container */}
      <div ref={iconscategoriescarouselscroll} className="flex space-x-4 p-4 mb-6 overflow-hidden custom-scrollbar">
        {iconscategories.map((category, iconsindex) => (
          <div key={iconsindex} className="navigationrefrencelink">
            <a href={category.href}>
              <div className="min-w-[100px] flex-shrink-0 flex flex-col items-center">
                <div className="w-14 h-14 flex items-center justify-center">
                  {category.imgSrc ? (
                    <img
                      src={category.imgSrc}
                      alt={category.name}
                      className="w-14 h-14 object-cover"
                    />
                  ) : (
                    <span className="text-black">{category.name}</span>
                  )}
                </div>
                <div className="w-32 overflow-hidden">
                  <p className="text-center mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {truncateMiddle(category.name, 30)}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      
      {/* Right Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] rounded-bl-[150px] rounded-tl-[150px] p-2 z-20"
        onClick={() => scrollRight(iconscategoriescarouselscroll)}
      >
        &#9654; {/* Right Arrow */}
      </button>
    </div>
        {/* Carousel ends*/}

        <div id="another_section" className="flex-col sm:flex-col justify-center  bg-[#ee9613] border border-solid border-white-A700_19 rounded-[150px]  shadow-xl relative md:h-auto md:p-10 h-auto p-10" style={{ width: '70%', maxWidth: '100vw', margin: '0 auto' }}>
          <div className="flex  flex-col items-center justify-center px-2.5 py-[3px] w-auto">
            <p className="text-left md:text-5xl text-6xl text-black w-auto font-bold font-Agbalumo">
              What to shop For?
            </p>
          </div>
        </div>
      </div>
       {/* storescards1scroll Container */} 
    <div>
      <main className="my-8">
        <div className="container mx-auto">
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
      {/*categoriescards Carousel Buttons*/}    
      <div className="relative">
      {/* Left Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      
      {/* Right Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
{/*categoriescards Carousel Buttons*/}    
      {/* Left Button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] p-2 rounded-br-[150px] rounded-tr-[150px] z-20"
        onClick={() => scrollLeft(categoriescardsscroll)}
      >
        &#9664; {/* Left Arrow */}
      </button>
{/* categoriescards Container  */}
      <div ref={categoriescardsscroll} className="flex overflow-hidden custom-scrollbar space-x-4 m-4 p-10 ">
        {categoriescards.map((category, cardsindex) => (
          <div className="navigationrefrencelink">
            <a href={category.href}>

              <div
                key={cardsindex}
                href={category.href}
                className="flex-col  items-center justify-center rounded-t-lg bg-slate-50 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
              >
                <div className="w-52 h-28 overflow-hidden ">
                  {/* Adjust the width as needed */}
                  <img
                    href={category.href}
                    src={category.imgSrc}
                    alt={category.name}
                    loading="lazy"
                    decoding="async"

                    className="w-full h-auto object-cover rounded-t-lg" />
                </div>
                <p className="text-center text-lg mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis font-bold p-4">
                  {truncateMiddle(category.name, 20)}
                  {/* Adjust the maxLength as needed */}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] rounded-bl-[150px] rounded-tl-[150px] p-2 z-20"
        onClick={() => scrollRight(categoriescardsscroll)}
      >
        &#9654; {/* Right Arrow */}
      </button>
    </div>
        {/*  categoriescards Container  ends*/}

      <div id="another_section" className=" bg-[#ee9613] border border-solid border-white-A700 rounded-tr-[150px] rounded-br-[150px] shadow-xl relative md:h-auto md:p-10 h-auto p-10 " style={{ width: '100%', maxWidth: '1000px' }}>
        <p className="flex items-start justify-start text-left md:text-4xl text-5xl text-black w-auto font-bold font-Agbalumo ">
          Restaurants, Supermarkets and Pharmacies Near Me
        </p>
      </div>


{/*storescards1scroll Carousel Buttons*/}    
<div className="relative">
      {/* Left Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      
      {/* Right Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
{/*storescards1scroll Carousel Buttons*/}    
      {/* Left Button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] p-2 rounded-br-[150px] rounded-tr-[150px] z-20"
        onClick={() => scrollLeft(storescards1scroll)}
      >
        &#9664; {/* Left Arrow */}
      </button>
{/* storescards1scroll Container  */}
      <div  ref={storescards1scroll} className="flex overflow-hidden custom-scrollbar  space-x-4 m-4 p-10 ">
        {storescards1.map((category, shopsindex) => (
          <div className="navigationrefrencelink">
            <a href={category.href}>

              <div
                key={shopsindex}
                href={category.href}
                className="flex-col  items-center justify-center rounded-t-lg bg-slate-50 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
              >
                <div className="w-52 h-48 overflow-hidden ">
                  {/* Adjust the width as needed */}
                  <img
                    src={category.imgSrc}
                    alt={category.name}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1200px) 17vw, (min-width: 1000px) 20vw, (min-width: 640px) 25vw, (min-width: 0px) 30vw, 100vw"
                    className="w-full h-auto object-cover rounded-t-lg" />
                </div>
                <p className="text-center text-lg mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis font-bold p-4">
                  {truncateMiddle(category.name, 20)}
                  {/* Adjust the maxLength as needed */}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] rounded-bl-[150px] rounded-tl-[150px] p-2 z-20"
        onClick={() => scrollRight(storescards1scroll)}
      >
        &#9654; {/* Right Arrow */}
      </button>
    </div>
        {/*  storescards1scroll Container  ends*/}

      
{/*storescards2scroll Carousel Buttons*/}    
<div className="relative">
      {/* Left Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      
      {/* Right Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
{/*storescards2scroll Carousel Buttons*/} 
{/* Left Button */}
<button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] p-2 rounded-br-[150px] rounded-tr-[150px] z-20"
        onClick={() => scrollLeft(storescards2scroll)}
      >
        &#9664; {/* Left Arrow */}
      </button>   
     
{/* storescards2scroll Container  */}
      <div  ref={storescards2scroll} className="flex overflow-hidden custom-scrollbar  space-x-4 m-4 p-10 ">
        {storescards2.map((category, shopsindex) => (
          <div className="navigationrefrencelink">
            <a href={category.href}>

              <div
                key={shopsindex}
                href={category.href}
                className="flex-col  items-center justify-center rounded-t-lg bg-slate-50 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
              >
                <div className="w-52 h-48 overflow-hidden ">
                  {/* Adjust the width as needed */}
                  <img
                    src={category.imgSrc}
                    alt={category.name}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1200px) 17vw, (min-width: 1000px) 20vw, (min-width: 640px) 25vw, (min-width: 0px) 30vw, 100vw"
                    className="w-full h-auto object-cover rounded-t-lg" />
                </div>
                <p className="text-center text-lg mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis font-bold p-4">
                  {truncateMiddle(category.name, 20)}
                  {/* Adjust the maxLength as needed */}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] rounded-bl-[150px] rounded-tl-[150px] p-2 z-20"
        onClick={() => scrollRight(storescards2scroll)}
      >
        &#9654; {/* Right Arrow */}
      </button>
    </div>
        {/*  storescards2scroll Container  ends*/}

        <div id="another_section" className=" bg-[#ee9613] border border-solid border-white-A700 rounded-tr-[150px] rounded-br-[150px] shadow-xl relative md:h-auto md:p-10 h-auto p-10 " style={{ width: '35%', maxWidth: '1000px' }}>
        <p className="flex items-start justify-start text-left md:text-4xl text-5xl text-black w-auto font-bold font-Agbalumo ">
         Supermarkets Near Me
        </p>
      </div>
    
{/*supermarketsscroll Carousel Buttons*/}   
        <div className="relative">
      {/* Left Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      
      {/* Right Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
{/*supermarketsscroll Carousel Buttons*/} 
{/* Left Button */}
<button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] p-2 rounded-br-[150px] rounded-tr-[150px] z-20"
        onClick={() => scrollLeft(supermarketsscroll)}
      >
        &#9664; {/* Left Arrow */}
      </button>   
     
    {/* supermarketsscroll Container  */}
    <div  ref={supermarketsscroll} className="flex overflow-hidden custom-scrollbar  space-x-4 m-4 p-10 ">
        {supermarkets.map((category, shopsindex) => (
          <div className="navigationrefrencelink">
            <a href={category.href}>

              <div
                key={shopsindex}
                href={category.href}
                className="flex-col  items-center justify-center rounded-t-lg bg-slate-50 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
              >
                <div className="w-52 h-48  overflow-hidden ">
                  {/* Adjust the width as needed */}
                  <img
                    src={category.imgSrc}
                    alt={category.name}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1200px) 17vw, (min-width: 1000px) 20vw, (min-width: 640px) 25vw, (min-width: 0px) 30vw, 100vw"
                    className="w-52 h-48  object-fill rounded-t-lg" />
                </div>
                <p className="text-center text-lg mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis font-bold p-4">
                  {truncateMiddle(category.name, 20)}
                  {/* Adjust the maxLength as needed */}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] rounded-bl-[150px] rounded-tl-[150px] p-2 z-20"
        onClick={() => scrollRight(supermarketsscroll)}
      >
        &#9654; {/* Right Arrow */}
      </button>
      </div>
     {/*  supermarketsscroll Container  ends*/}

    
     <div id="another_section" className=" bg-[#ee9613] border border-solid border-white-A700 rounded-tr-[150px] rounded-br-[150px] shadow-xl relative md:h-auto md:p-10 h-auto p-10 " style={{ width: '35%', maxWidth: '1000px' }}>
        <p className="flex items-start justify-start text-left md:text-4xl text-5xl text-black w-auto font-bold font-Agbalumo ">
          Restaurants Near Me
        </p>
      </div>
{/*restaurantsscroll Carousel Buttons*/}   
<div className="relative">
      {/* Left Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      
      {/* Right Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
{/*restaurantsscroll Carousel Buttons*/} 
{/* Left Button */}
<button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] p-2 rounded-br-[150px] rounded-tr-[150px] z-20"
        onClick={() => scrollLeft(restaurantsscroll)}
      >
        &#9664; {/* Left Arrow */}
      </button>   
     
    {/* restaurantsscroll Container  */}
    <div  ref={restaurantsscroll} className="flex overflow-hidden custom-scrollbar  space-x-4 m-4 p-10 ">
        {restaurants.map((category, shopsindex) => (
          <div className="navigationrefrencelink">
            <a href={category.href}>

              <div
                key={shopsindex}
                href={category.href}
                className="flex-col  items-center justify-center rounded-t-lg bg-slate-50 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
              >
                <div className="w-52 h-48 overflow-hidden ">
                  {/* Adjust the width as needed */}
                  <img
                    src={category.imgSrc}
                    alt={category.name}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1200px) 17vw, (min-width: 1000px) 20vw, (min-width: 640px) 25vw, (min-width: 0px) 30vw, 100vw"
                    className="w-full h-auto object-cover rounded-t-lg" />
                </div>
                <p className="text-center text-lg mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis font-bold p-4">
                  {truncateMiddle(category.name, 20)}
                  {/* Adjust the maxLength as needed */}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] rounded-bl-[150px] rounded-tl-[150px] p-2 z-20"
        onClick={() => scrollRight(restaurantsscroll)}
      >
        &#9654; {/* Right Arrow */}
      </button>
      </div>
     {/*  restaurantsscroll Container  ends*/}

     <div id="another_section" className=" bg-[#ee9613] border border-solid border-white-A700 rounded-tr-[150px] rounded-br-[150px] shadow-xl relative md:h-auto md:p-10 h-auto p-10 " style={{ width: '35%', maxWidth: '1000px' }}>
        <p className="flex items-start justify-start text-left md:text-4xl text-5xl text-black w-auto font-bold font-Agbalumo ">
          Pharmacies Near Me
        </p>
      </div>
{/*pharmaciesscroll Carousel Buttons*/}   
<div className="relative">
      {/* Left Fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      
      {/* Right Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
{/*pharmaciesscroll Carousel Buttons*/} 
{/* Left Button */}
<button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] p-2 rounded-br-[150px] rounded-tr-[150px] z-20"
        onClick={() => scrollLeft(pharmaciesscroll)}
      >
        &#9664; {/* Left Arrow */}
      </button>   
     
    {/* pharmaciesscroll Container  */}
    <div  ref={pharmaciesscroll} className="flex overflow-hidden custom-scrollbar  space-x-4 m-4 p-10 ">
        {pharmacies.map((category, shopsindex) => (
          <div className="navigationrefrencelink">
            <a href={category.href}>

              <div
                key={shopsindex}
                href={category.href}
                className="flex-col  items-center justify-center rounded-t-lg bg-slate-50 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200"
              >
                <div className="w-52 h-48 overflow-hidden ">
                  {/* Adjust the width as needed */}
                  <img
                    src={category.imgSrc}
                    alt={category.name}
                    loading="lazy"
                    decoding="async"
                    sizes="(min-width: 1200px) 17vw, (min-width: 1000px) 20vw, (min-width: 640px) 25vw, (min-width: 0px) 30vw, 100vw"
                    className="w-full h-auto object-cover rounded-t-lg" />
                </div>
                <p className="text-center text-lg mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis font-bold p-4">
                  {truncateMiddle(category.name, 20)}
                  {/* Adjust the maxLength as needed */}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] rounded-bl-[150px] rounded-tl-[150px] p-2 z-20"
        onClick={() => scrollRight(pharmaciesscroll)}
      >
        &#9654; {/* Right Arrow */}
      </button>
      </div>
     {/*  pharmaciesscroll Container  ends*/}
    
    
      {/* footer */}
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
      </footer></div></div>
          
      
    
  );
}


export default ErongoTowns;



// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Img, Text } from '../components';

// function LandingPage() {
//   return (
//     <div className="font-montserrat">
//       {/* Hero Section */}
//       <div className="w-full">
//         <div className="flex flex-col justify-end pt-0 w-full">
//           <div className="flex-col relative w-full h-[696px] md:h-[600px] sm:h-[947px]">
//             <div className="flex justify-between items-center bg-yellow-400 border border-solid border-white-A700_19 rounded-bl-3xl rounded-br-3xl rounded-tr-3xl shadow-2xl h-full m-auto"
//               style={{ height: '570px' }}>
//               <div className="absolute top-5 my-4 ml-4 mr-4 mt-0 px-6">
//                 <div className="mt-0 flex items-center justify-between py-4 px-4 sm:mx-0 sm:mb-0 sm:px-0 md:px-0">
//                   <Text className="text-5xl text-black-900 w-96">
//                     Your Daily Food <br /> Delivered <br /> Hot & Fresh
//                   </Text>
//                   <div className="flex justify-end md:ml-5">
//                     <Img className="object-cover rounded-bl-3xl rounded-br-3xl" src="/images/img_istockphoto141.png" loading="lazy" style={{ width: '500px', height: '400px' }} />
                 
//                   <Text className="text-3xl text-white absolute top-[450px] left-[30px] md:left-[40px]">
//                     Groceries, Meals, Pharmacies, anything!
//                   </Text>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Location stuff */}
//       <div className="container flex items-center p-5 m-8">
//         <div className="button-group flex flex-col items-center">
//           <div className="button-row flex shadow">
//             <Button className="bg-slate-900 text-white px-4 py-2 ml-4 rounded-md ">Button 1</Button>
//           </div>
//           <div className="button-row flex mt-2">
//             <Button className="bg-amber-600 text-white px-4 py-2 rounded-md">Button 6</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;
















// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Img, Text } from '../components';

// function LandingPage() {
//   return (
//     <div className="font-montserrat">
//       {/* Hero Section */}
//       <div className="bg-white-A700 w-full">
//         <div className="flex flex-col justify-end pt-0 w-full">
//           <div className="flex-col relative w-full h-[696px] md:h-[703px] sm:h-[947px]">
//             <div className="flex justify-between items-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[200px] rounded-br-[200px] rounded-tr-[200px] shadow-bs h-full m-auto"
//             style={{ height: '570px' }}>
//               <div className="absolute top-[5%] w-[100%] my-4 ml-4 mr-4 mt-0 px-6">
//                 <div className="mt-0 mb-16 flex items-center justify-between py-4 px-4 sm:mx-0 sm:mb-0 sm:px-0 md:px-6">
//                   <Text className="text-5xl text-black-900" style={{ width: '900px', height: '170px' }}>
//                     Your Daily Food <br/> Delivered <br/> Hot & Fresh
//                   </Text>
//                   <div className="flex justify-end md:ml-5">
//                     <Img className="object-cover rounded-bl-[200px] rounded-br-[126px] rounded-tr-[200px]" src="/images/img_istockphoto141.png" loading="lazy" style={{ width: '1500px', height: '400px' }} />
//                   </div>
//                 </div>
//                 <Text className="text-3xl text-white absolute top-[450px] left-[30px] md:left-[40px]"
//                 style={{ width: '600px', height: '40px', marginLeft: '35rem' }}>
//                   Groceries, Meals, Pharmacies, anything!
//                 </Text>
//               </div>
//             </div>
//             <div className="flex flex-col justify-start w-[32%] md:w-full ml-14 md:ml-0">
//               <div className="flex flex-col justify-start w-full gap-[60px] md:gap-10">
//                 {/* Additional Components */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Hero Slider Section */}
//       <section className="hero-section">
//         {/* Hero Slider or Static Image */}
//       </section>
      
//       {/* Search Functionality Section */}
//       <section className="search-bar">
//         {/* Search Input */}
//       </section>
      
//       {/* Featured Products or Categories Section */}
//       <section className="featured-products">
//         {/* Dynamically list featured products or categories */}
//       </section>
      
//       {/* Testimonials or Reviews Section */}
//       <section className="testimonials">
//         {/* Display user testimonials */}
//       </section>
      
//       {/* Call to Action Section */}
//       <section className="cta">
//         <Link to="/products" className="btn btn-primary">Shop Now</Link>
//       </section>
      
//       {/* Footer Section */}
//       <footer className="site-footer">
//         {/* Footer Content */}
//       </footer>
//     </div>
//   );
// }

// export default LandingPage;


















// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Button, Img, List, Text } from '../components';
// // Additional imports for components like HeroSlider, FeaturedProducts, Testimonials

// function LandingPage() {
//   return (
//     <div className=''>
//      <div className="bg-white-A700 font-montserrat w-full">
//   <div className="flex flex-col justify-end pt-0 w-full">

//       <div className="flex-col relative w-full h-[696px] md:h-[703px] sm:h-[947px]">
//         <div className="flex justify-between items-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[200px] rounded-br-[200px] rounded-tr-[200px] shadow-bs h-full m-auto "
//          style={{ width: 'auto', height: '550px' }}>
//         <div className="absolute top-[5%] w-[100%] my-4 ml-4 mr-4  mt-0  px-6  ">
          
//           <div className="mt-0 mb-16 flex items-center justify-between py-4 px-4 sm:mx-0 sm:mb-0 sm:px-0 md:px-6">
//                 <Text className="w-full text-left text-5xl text-black-900 my-4 mr-0 "
//                 style={{ width: '00px', height: '170px' }}>
//                   Your Daily Food <br/> Delivered <br/> Hot & Fresh
//                 </Text>
//                 <div class="flex justify-content:flex-end md:ml-5">

//                 <Img
//                   className=" object-cover rounded-bl-[200px] rounded-br-[126px] rounded-tr-[200px] "
//                   src="/images/img_istockphoto141.png"
//                   loading="lazy"
//                   style={{ width: '1500px', height: '400px' }}
//                 />
//               </div>
//               </div>
//               <Text className="text-3xl md:text-[30px] sm:text-[30px] text-white absolute top-70 left-30 md:ml-40" 
//               style={{ width: '600px', height: '40px', marginLeft: '35rem' }}>           
//     Groceries, Meals, Pharmacies, anything!
// </Text>          
//         </div>
//       </div>
//       <div className="flex flex-col justify-start w-[32%] md:w-full ml-14 md:ml-0">
//         <div className="flex flex-col justify-start w-full gap-[60px] md:gap-10">
//           <div className="bg-white-A700 rounded-[36px] shadow-bs1 p-[9px] flex flex-col items-center justify-end w-full ">
//             <div className="flex items-center justify-start gap-[53px] mt-[7px] w-[88%] md:w-full">
//               <Img className="h-[67px]" src="/images/img_linkedin.svg" alt="LinkedIn"/>
//               <Text className="text-[32px] md:text-3xl text-zinc-950">
//                 What's your Address?
//               </Text>
//             </div>
//           </div>
//           <div className="relative w-[78%] sm:w-full h-[60px] md:h-[57px] ml-[37px] md:ml-0">
//             <div className="bg-white-A700 rounded-[30px] shadow-bs1 p-[7px] flex items-start justify-end w-full h-full">
//               <Img className="h-[41px] mt-0.5 w-[42px]" src="/images/img_save.svg" alt="Save"/>
//             </div>
//             <Text className="absolute top-[12%] right-[2%] text-[32px] md:text-3xl text-amber-700">
//               Use Current Location
//             </Text>
//           </div>
//         </div>
//       </div>
//     </div>

// </div>
// </div>

        
//       {/* Hero Section */}
//       <section className="hero-section">
//         {/* Hero Slider or Static Image */}
//       </section>
      
//       {/* Search Functionality */}
//       <section className="search-bar">
//         {/* Search Input */}
//       </section>
      
//       {/* Featured Products or Categories */}
//       <section className="featured-products">
//         {/* Dynamically list featured products or categories */}
//       </section>
      
//       {/* Testimonials or Reviews */}
//       <section className="testimonials">
//         {/* Display user testimonials */}
//       </section>
      
//       {/* Call to Action */}
//       <section className="cta">
//         <Link to="/products" className="btn btn-primary">Shop Now</Link>
//       </section>
      
//       {/* Footer */}
//       <footer className="site-footer">
//         {/* Footer Content */}
//       </footer>
//       </div>
//   );
// }

// export default LandingPage;

// {/* <section className="hero-section">
// {/* Hero Slider or Static Image */}
// </section></>
// {/* Search Functionality Section */}
// <section className="search-bar">
//   {/* Search Input */}
// </section>
// {/* Featured Products or Categories Section */}
// <section className="featured-products">
//   {/* Dynamically list featured products or categories */}
// </section>
// {/* Testimonials or Reviews Section */}
// <section className="testimonials">
//   {/* Display user testimonials */}
// </section>
// {/* Call to Action Section */}
// <section className="cta">
//   {/* <Link to="/products" className="btn btn-primary">Shop Now</Link> */}
// </section>
// {/* Footer Section */}
// <footer className="site-footer">
//   {/* Footer Content */}
// </footer>
// {/* Hero Slider Section */}
// <section className="hero-section">
//   {/* Hero Slider or Static Image */}
// </section>
// {/* Search Functionality Section */}
// <section className="search-bar">
//   {/* Search Input */}
// </section>
// {/* Featured Products or Categories Section */}
// <section className="featured-products">
//   {/* Dynamically list featured products or categories */}
// </section>
// {/* Testimonials or Reviews Section */}
// <section className="testimonials">
//   {/* Display user testimonials */}
// </section>
// {/* Call to Action Section */}
// <section className="cta">
//   {/* <Link to="/products" className="btn btn-primary">Shop Now</Link> */}
// </section>
// {/* Footer Section */}
// <footer className="site-footer">
//   {/* Footer Content */}
// </footer> */}