import React, { useState, useEffect, useRef } from "react";
import OPNavBar from '../../../OPNavBar';
import Footer from "../../../Footer";

const Restaurants = () => {
    // Icon categories for carousel
    const iconscategories = [
        { name: "Grocery", imgSrc: "/images/websiteicons/grocery.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "Bakery", imgSrc: "/images/websiteicons/bakery.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "Healthy", imgSrc: "/images/websiteicons/healthy-food.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "Desserts", imgSrc: "/images/websiteicons/desserts.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "Fruits & Vegetables", imgSrc: "/images/websiteicons/fruit-and-vegetables.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "Dairy & Eggs", imgSrc: "/images/websiteicons/dairy-and-eggs.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "Meat", imgSrc: "/images/websiteicons/meat.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "Seafood", imgSrc: "/images/websiteicons/seafood.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "Beverages", imgSrc: "/images/websiteicons/beverages.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "Snacks & Sweets", imgSrc: "/images/websiteicons/snacks-and-sweets.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "Household Essentials", imgSrc: "/images/websiteicons/household-essentials.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "Pharmaceuticals", imgSrc: "/images/websiteicons/pharmaceuticals.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "Baby", imgSrc: "/images/websiteicons/baby.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "Pet Supplies", imgSrc: "/images/websiteicons/pet-food.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "Frozen Foods", imgSrc: "/images/websiteicons/frozen-food.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "Fast Food", imgSrc: "/images/websiteicons/fast-food.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "Restaurant", imgSrc: "/images/websiteicons/restaurant.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "International Foods", imgSrc: "/images/websiteicons/international-food.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" },
        { name: "Alcohol", imgSrc: "/images/websiteicons/alcohol.png", href: "/LP/Khomas/Towns/Restaurant/JoesBeerhouse" }
    ];

    // Truncate string in the middle
    const truncateMiddle = (str, maxLength) => {
        if (str.length <= maxLength) return str;
        const middleIndex = Math.floor(maxLength / 2);
        const start = str.substring(0, middleIndex);
        const end = str.substring(str.length - middleIndex);
        return `${start}...${end}`;
    };

    // Stores cards for restaurants
    const storescards1 = [
        {
            name: "The Stellenbosch Wine Bar",
            imgSrc: "/images/restaurants/stellenbosch.png",
            href: "/en/discovery/category/stellenbosch",
            discount: 15, 
            isEtomartStore: true, 
            priceRange: "N$$",
            cuisine: "Wine Bar",
            pickupTime: "25–45 min"
        },
        {
            name: "O Portuga",
            imgSrc: "/images/restaurants/oportuga.png",
            href: "/en/discovery/category/oportuga",
            storetype: "Restaurant",
            isEtomartStore: false,
            priceRange: "N$$$",
            cuisine: "Portuguese",
            pickupTime: "20–40 min"
        },
        {
            name: "The Social",
            imgSrc: "/images/restaurants/thesocial.png",
            href: "/en/discovery/category/thesocial",
            storetype: "Restaurant",
            isEtomartStore: true,
            priceRange: "N$$$",
            cuisine: "Bar & Grill",
            pickupTime: "20–40 min"
        },
        {
            name: "Sardinia Blue Olive",
            imgSrc: "/images/restaurants/sardiniablueolive.png",
            href: "/en/discovery/category/sardiniablueolive",
            storetype: "Restaurant",
            isEtomartStore: false,
            priceRange: "N$$$",
            cuisine: "Mediterranean",
            pickupTime: "20–40 min"
        },
        {
            name: "Slowtown Coffee Roasters",
            imgSrc: "/images/restaurants/slowtown.png",
            href: "/en/discovery/category/slowtown",
            storetype: "Café",
            isEtomartStore: false,
            priceRange: "N$$",
            cuisine: "Coffee",
            pickupTime: "10–20 min"
        },
    ];

    const restaurants = [
        { name: "Joe's Beerhouse", imgSrc: "/images/restaurants/joesbeerhouse.png", href: "/en/discovery/category/joesbeerhouse" },
        { name: "The Stellenbosch Wine Bar", imgSrc: "/images/restaurants/stellenbosch.png", href: "/en/discovery/category/stellenbosch" },
        { name: "O Portuga", imgSrc: "/images/restaurants/oportuga.png", href: "/en/discovery/category/oportuga" },
        { name: "The Social", imgSrc: "/images/restaurants/thesocial.png", href: "/en/discovery/category/thesocial" },
        { name: "Sardinia Blue Olive", imgSrc: "/images/restaurants/sardiniablueolive.png", href: "/en/discovery/category/sardiniablueolive" },
        { name: "Slowtown Coffee Roasters", imgSrc: "/images/restaurants/slowtown.png", href: "/en/discovery/category/slowtown" }
    ];

    // References for carousel scrolling
    const iconscategoriescarouselscroll = useRef(null);
    const restaurantsscroll = useRef(null);

    // Scroll functions
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

    // Footer functions
    const handleLanguageChange = () => {
        // Handle language change logic here
    };

    const handleAccessibilitySettingsOpen = () => {
        // Handle accessibility settings opening logic here
    };

    return (
        <div>
            <OPNavBar />
            <div className="relative z-10">
                {/* Main Section */}
                <div id="LP_section_5_orange" className="relative z-10 flex justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[150px] shadow-xl md:h-auto md:p-10 h-auto p-10" style={{ width: '65%', maxWidth: '100vw', margin: '0 auto' }}>
                    <div className="relative z-10 flex items-center justify-center w-full mb-0">
                        <div className="sc-6db52481-0 kZFPSm cb-elevated cb_elevation_elevationMedium_e16y">
                            <div role="tablist" className="flex space-x-2 gap-2">
                                <a role="tab" aria-selected="false" className="flex items-center space-x-2 gap-2 px-4 py-2 rounded-full bg-white shadow-md hover:bg-orange-300 transition duration-150" href="/LP/Khomas/Towns/Stores">
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-black">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M.646 0A.646.646 0 0 0 0 .646V4.5a3.5 3.5 0 0 0 6.25 2.165A3.494 3.494 0 0 0 9 8c1.116 0 2.11-.522 2.75-1.335a3.498 3.498 0 0 0 5.75-.362A3.5 3.5 0 0 0 24 4.5V.647A.646.646 0 0 0 23.354 0h-5.708a.647.647 0 0 0-.146.017.647.647 0 0 0-.146-.017H.646ZM2 2v2.5a1.5 1.5 0 1 0 3 0V2H2Zm17 0v2.5a1.5 1.5 0 0 0 3 0V2h-3Zm-6 2.5V2h3v2.5a1.5 1.5 0 0 1-3 0ZM7.5 2v2.5a1.5 1.5 0 1 0 3 0V2h-3Z" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1 22V8.45a3.491 3.491 0 0 0 2 1.015V22h8V12h7.5v10H21V9.465a3.49 3.49 0 0 0 2-1.016V22a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2Zm12 0h3.5v-8H13v8Z" />
                                        <path d="M5.5 12a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3Z" />
                                    </svg>
                                    <span className="text-black">Stores</span>
                                </a>
                                <a role="tab" aria-selected="false" className="flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-all bg-orange-300 duration-150" href="/LP/Khomas/Towns/Restaurants">
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-black">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10 1a1 1 0 112 0v5a4.009 4.009 0 01-2.667 3.772.5.5 0 00-.333.471V23a1 1 0 11-2 0V10.243a.5.5 0 00-.333-.471A4.009 4.009 0 014 6V1a1 1 0 112 0v5c0 .522.205 1.025.571 1.398A.251.251 0 007 7.223V1a1 1 0 112 0v6.225a.251.251 0 00.429.175c.367-.374.572-.877.571-1.4V1zM20.5.75a.75.75 0 00-.75-.75C17.418 0 15.064 6.055 15 13.243v.021c.004.686.563 1.24 1.25 1.236H18a.5.5 0 01.5.5v8a1 1 0 102 0V.75z" />
                                    </svg>
                                    <span className="text-black">Restaurants</span>
                                </a>
                                <a role="tab" aria-selected="false" className="flex items-center space-x-2 gap-2 px-4 py-2 rounded-full shadow-md bg-white hover:bg-orange-300 transition duration-150" href="/LP/Khomas/Towns/Pharmacies">
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-black">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M9 2a1 1 0 0 0-1 1v1H4a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3h-4V3a1 1 0 0 0-1-1H9zm0 2h6v1H9V4zM4 7h16v12H4V7zm7 3a1 1 0 0 0-1 1v1H9a1 1 0 1 0 0 2h1v1a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1a1 1 0 0 0-1-1z" />
                                    </svg>
                                    <span className="text-black">Pharmacies</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Icon Carousel */}
                <div className="relative">
                    {/* Left Fade */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                    {/* Right Fade */}
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                    {/* Left Button */}
                    <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] p-2 rounded-br-[150px] rounded-tr-[150px] z-20" onClick={() => scrollLeft(iconscategoriescarouselscroll)}>
                        &#9664; {/* Left Arrow */}
                    </button>
                    {/* Icon Carousel Container */}
                    <div ref={iconscategoriescarouselscroll} className="flex space-x-4 p-4 mb-6 overflow-hidden custom-scrollbar">
                        {iconscategories.map((category, iconsindex) => (
                            <div key={iconsindex} className="navigationrefrencelink">
                                <a href={category.href}>
                                    <div className="min-w-[100px] flex-shrink-0 flex flex-col items-center">
                                        <div className="w-14 h-14 flex items-center justify-center">
                                            <img src={category.imgSrc} alt={category.name} className="w-14 h-14 object-cover" />
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
                    <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] rounded-bl-[150px] rounded-tl-[150px] p-2 z-20" onClick={() => scrollRight(iconscategoriescarouselscroll)}>
                        &#9654; {/* Right Arrow */}
                    </button>
                </div>
                {/* Carousel ends*/}

                {/* Restaurants Near Me Section */}
                <div id="another_section" className="bg-[#ee9613] border border-solid border-white-A700 rounded-tr-[150px] rounded-br-[150px] shadow-xl relative md:h-auto md:p-10 h-auto p-10" style={{ width: '35%', maxWidth: '1000px' }}>
                    <p className="flex items-start justify-start text-left md:text-4xl text-5xl text-black w-auto font-bold font-Agbalumo ">
                        Restaurants Near Me
                    </p>
                </div>

                {/* Restaurants Carousel */}
                <div className="relative">
                    {/* Left Fade */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                    {/* Right Fade */}
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                    {/* Left Button */}
                    <button className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] p-2 rounded-br-[150px] rounded-tr-[150px] z-20" onClick={() => scrollLeft(restaurantsscroll)}>
                        &#9664; {/* Left Arrow */}
                    </button>
                    {/* Restaurants Carousel Container */}
                    <div ref={restaurantsscroll} className="flex overflow-hidden custom-scrollbar space-x-4 m-4 p-10">
                        {restaurants.map((category, shopsindex) => (
                            <div key={shopsindex} className="navigationrefrencelink">
                                <a href={category.href}>
                                    <div className="flex-col items-center justify-center rounded-t-lg bg-slate-50 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200">
                                        <div className="w-52 h-48 overflow-hidden">
                                            <img src={category.imgSrc} alt={category.name} loading="lazy" decoding="async" sizes="(min-width: 1200px) 17vw, (min-width: 1000px) 20vw, (min-width: 640px) 25vw, (min-width: 0px) 30vw, 100vw" className="w-52 h-48 object-fill rounded-t-lg" />
                                        </div>
                                        <p className="text-center text-lg mt-2 whitespace-nowrap overflow-hidden overflow-ellipsis font-bold p-4">
                                            {truncateMiddle(category.name, 20)}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                    {/* Right Button */}
                    <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#ee9613] rounded-bl-[150px] rounded-tl-[150px] p-2 z-20" onClick={() => scrollRight(restaurantsscroll)}>
                        &#9654; {/* Right Arrow */}
                    </button>
                </div>
                {/* Restaurants Carousel ends*/}

                {/* Restaurants All Near Me Section */}
                <div id="another_section" className="bg-[#ee9613] border border-solid border-white-A700 rounded-tr-[150px] rounded-br-[150px] shadow-xl relative md:h-auto md:p-10 h-auto p-10" style={{ width: '100%', maxWidth: '1000px' }}>
                    <p className="flex items-start justify-start text-left md:text-4xl text-5xl text-black w-auto font-bold font-Agbalumo ">
                        Restaurants All Near Me
                    </p>
                </div>

                {/* Stores Cards */}
                <div ref={storescards1} className="flex flex-wrap justify-start">
                    {storescards1.map((category, shopsindex) => (
                        <div key={shopsindex} className="navigationrefrencelink flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                            <a href={category.href} className="block w-full h-full rounded-lg bg-slate-50 shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-200">
                                <div className="flex flex-col items-start justify-start h-full">
                                    <div className="relative w-full h-full">
                                        <img src={category.imgSrc} alt={category.name} loading="lazy" decoding="async" className="object-fill w-full h-full rounded-t-lg" fetchPriority="high" />
                                        {category.storetype && (
                                            <div data-testid="venue-storetype-label" className="absolute top-0 left-0 mt-2 mr-2 bg-[#ee9613] text-black text-xs px-2 py-2 rounded-tr-full rounded-br-full">
                                                {category.storetype}
                                            </div>
                                        )}
                                        {category.isEtomartStore && (
                                            <div data-test-id="venue-badges" className="absolute bottom-0 left-0 ml-2 mb-2 bg-slate-100 text-black text-xs px-2 py-1 rounded">
                                                <span className="text-black">Etomart</span> <span className="text-orange-500 font-bold">'~'</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-2 w-full">
                                        <h3 data-testid="venue-name" className="font-bold">
                                            {category.name}
                                        </h3>
                                        <div className="flex items-center text-sm">
                                            <div className="text-[#ee9613] text-sm font-bold">
                                                <span>{category.priceRange}</span>
                                            </div>
                                            <span className="mx-1">•</span>
                                            <span>{category.cuisine}</span>
                                        </div>
                                        <div className="text-xs text-gray-500">{`Pickup: ${category.pickupTime}`}</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
                {/* Stores Cards ends*/}

                {/* Footer */}
                <footer>
                    <Footer />
                </footer>
            </div>
        </div>
    );
}

export default Restaurants;
