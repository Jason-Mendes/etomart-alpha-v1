import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import LPNavBar from "./LPNavBar";
import RegionsBanner from "./RegionsBanner";
import XClearButton from './componentsCalled/XClearButton';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


/**
 * LandingPage Component
 * This component represents the main landing page of the application.
 */

// Moved outside component to avoid recreation on each render

// Define regions data
const regionsData = [
  { code: "ALB", name: "Khomas", flagPath: "/images/regions/khomas2.jpeg", path: "/LP/Region", latitude: -22.57, longitude: 17.08 },
  { code: "HRV", name: "Erongo", flagPath: "/images/regions/erongo.jpeg", path: "/LP/Region", latitude: -22.55, longitude: 14.28 },
  { code: "CYP", name: "Oshana", flagPath: "/images/regions/oshana.jpeg", path: "/LP/Region", latitude: -18.46, longitude: 15.64 },
  { code: "ALB", name: "Omusati", flagPath: "/images/regions/omusati.jpeg", path: "/LP/Region", latitude: -18.13, longitude: 15.37 },
  { code: "HRV", name: "Karas", flagPath: "/images/regions/kharas2.jpeg", path: "/LP/Region", latitude: -27.38, longitude: 17.92 },
  { code: "CYP", name: "Ohangwena", flagPath: "/images/regions/ohangwena.jpeg", path: "/LP/Region", latitude: -17.60, longitude: 16.06 },
  { code: "ALB", name: "Zambezi", flagPath: "/images/regions/zambezi.jpeg", path: "/LP/Region", latitude: -17.50, longitude: 24.27 },
  { code: "HRV", name: "Oshikoto", flagPath: "/images/regions/oshikoto.jpeg", path: "/LP/Region", latitude: -18.81, longitude: 16.92 },
  { code: "CYP", name: "Omaheke", flagPath: "/images/regions/omaheke.jpeg", path: "/LP/Region", latitude: -21.76, longitude: 19.59 },
  { code: "ALB", name: "Hardap", flagPath: "/images/regions/hardap.jpeg", path: "/LP/Region", latitude: -24.43, longitude: 18.29 },
  { code: "HRV", name: "Otjozondjupa", flagPath: "/images/regions/otjozondjupa.jpeg", path: "/LP/Region", latitude: -20.45, longitude: 17.23 },
  { code: "CYP", name: "Kunene", flagPath: "/images/regions/kunene2.jpeg", path: "/LP/Region", latitude: -19.58, longitude: 13.41 },
  { code: "ALB", name: "Kavango East", flagPath: "/images/regions/kavango_east.jpeg", path: "/LP/Region", latitude: -18.03, longitude: 20.78 },
  { code: "HRV", name: "Kavango West", flagPath: "/images/regions/kavango_west.jpeg", path: "/LP/Region", latitude: -18.12, longitude: 19.79 },
];

// Testimonials data
const testimonials = [
  {
    imageSrc: "/images/img_ellipse1.png",
    textBelowImage: "Lorem ipsum dolor sit amet consectetur.",
    numStars: 1,
    testimonialAuthor: "John Doe",
  },
  {
    imageSrc: "/images/img_ellipse1.png",
    textBelowImage: "Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.",
    numStars: 5,
    testimonialAuthor: "John Doe",
  },
  {
    imageSrc: "/images/img_ellipse1.png",
    textBelowImage: "Dolor at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil Dolor at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil",
    numStars: 3,
    testimonialAuthor: "John Doe",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const videoRef = useRef(null);

  // State management
  const [state, setState] = useState({
    isLargeScreen: false,
    isEditing: false,
    location: "",
    currentSlide: 0,
    inputLocation: "",
    suggestions: [],
    userLocation: null,
    isLoading: false,
    userSelectedRegion: null,
    confirmRegion: false,
    isDropdownOpen: false,
    isVideoVisible: false,
    isBannerVisible: false,
    nextPage: "",
    selectedRegion: null,
    bannerImage: "",
  });

// Memoized regions data
  const regions = useMemo(() => regionsData.map(({ code, name, flagPath, path }) => ({
    code,
    name,
    flagPath,
    path: path.replace(' ', '') // Remove spaces from path
  })), []);

  // Callbacks
  // Update the closeBanner function
  // Helper functions
  const closeBanner = useCallback(() => {
    setState(prev => ({ ...prev, isBannerVisible: false }));
  }, []);

  const handleSelect = useCallback((option) => {
    setState(prev => ({
      ...prev,
      selectedRegion: option,
      bannerImage: option.flagPath,
      isBannerVisible: true,
      nextPage: `/LP/Region/`
    }));
    console.log("Selected Region:", option);
  }, []);

  const clearLocation = useCallback(() => {
    setState(prev => ({
      ...prev,
      location: "",
      inputLocation: "",
      isEditing: false,
      selectedRegion: null
    }));
  }, []);

  const handleUseCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      setState(prev => ({ ...prev, isLoading: true }));
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const region = determineRegion(latitude, longitude);
          setState(prev => ({
            ...prev,
            userLocation: { latitude, longitude },
            userSelectedRegion: region.name,
            confirmRegion: true,
            isLoading: false
          }));
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Error getting location. Please try again or enter your location manually.");
          setState(prev => ({ ...prev, isLoading: false }));
        },
        { timeout: 10000, maximumAge: 60000 }
      );
    } else {
      alert("Geolocation is not supported by this browser. Please enter your location manually.");
    }
  }, []);

  const determineRegion = useCallback((latitude, longitude) => {
    return regionsData.reduce((closest, region) => {
      const distance = getDistance(latitude, longitude, region.latitude, region.longitude);
      return distance < closest.distance ? { ...region, distance } : closest;
    }, { distance: Infinity });
  }, []);

  const getDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      0.5 - Math.cos(dLat) / 2 +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * (1 - Math.cos(dLon)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
  }, []);

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setState(prev => ({
      ...prev,
      inputLocation: value,
      location: value,
      suggestions: value.length > 0
        ? regionsData
          .filter(region => region.name.toLowerCase().includes(value.toLowerCase()))
          .map(({ code, name, flagPath, path }) => ({ value: code, label: name, code, name, flagPath, path }))
        : [],
      isDropdownOpen: value.length > 0
    }));
  }, []);

  // In your handleRegionClick function
  const handleRegionClick = useCallback((region) => {
    const formattedRegion = {
      ...region,
      formattedName: region.name  // Add this line
    };
    setState(prev => ({
      ...prev,
      selectedRegion: formattedRegion,
      bannerImage: formattedRegion.flagPath,
      isBannerVisible: true,
      nextPage: `/LP/Region/`
    }));
    console.log("Selected Region:", formattedRegion);
  }, []);


  // In your confirmRegionSelection function
  const confirmRegionSelection = useCallback(() => {
    if (state.userSelectedRegion) {
      const selectedRegionObject = regionsData.find(region => region.name === state.userSelectedRegion);
      if (selectedRegionObject) {
        const formattedRegion = {
          ...selectedRegionObject,
          formattedName: selectedRegionObject.name.replace(' ', '')  // Add this line
        };
        setState(prev => ({
          ...prev,
          selectedRegion: formattedRegion,
          bannerImage: formattedRegion.flagPath,
          isBannerVisible: true,
          nextPage: `/LP/Region/`
        }));
        console.log("Selected Region:", formattedRegion);
      }
    }
  }, [state.userSelectedRegion]);



  const goBack = useCallback(() => {
    setState(prev => ({
      ...prev,
      isBannerVisible: false,
      selectedRegion: null,
      nextPage: "",
      bannerImage: ""
    }));
  }, []);

  const handlePrevSlide = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentSlide: prev.currentSlide === 0 ? testimonials.length - 1 : prev.currentSlide - 1
    }));
  }, []);

  const handleNextSlide = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentSlide: prev.currentSlide === testimonials.length - 1 ? 0 : prev.currentSlide + 1
    }));
  }, []);

  const handleWatchVideo = useCallback(() => {
    setState((prev) => ({ ...prev, isVideoVisible: true }));
  }, []);

  const handleVideoEnded = useCallback(() => {
    setState((prev) => ({ ...prev, isVideoVisible: false }));
  }, []);

  const handleGoBack = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setState((prev) => ({ ...prev, isVideoVisible: false }));
  }, []);

  const handleOverlayClick = useCallback(() => {
    handleGoBack();
  }, [handleGoBack]);


  // Effect hooks
  useEffect(() => {
    if (!state.isBannerVisible && state.selectedRegion && state.nextPage) {
      navigate(state.nextPage, { state: { selectedRegion: state.selectedRegion } });
    }
  }, [state.isBannerVisible, state.selectedRegion, state.nextPage, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setState(prev => ({ ...prev, isLargeScreen: window.innerWidth >= 640 }));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest('#protected-div')
      ) {
        setState(prev => ({ ...prev, isDropdownOpen: false, isEditing: false }));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        currentSlide: prev.currentSlide === testimonials.length - 1 ? 0 : prev.currentSlide + 1
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Render
  return (
    <div>
        <RegionsBanner
        isVisible={state.isBannerVisible}
        imageSrc={state.bannerImage}
        closeBanner={closeBanner}
        goBack={goBack}
      />
      <LPNavBar />
      <div id="Landing_Page_Main_Body" className="content-wrapper">
        <div className="overflow-auto bg-[#fafafa]">
          {/* Hero Section */}
          <div className="bg-[#ee9613] border border-solid border-white-A700_19 rounded-tr-[150px] rounded-bl-[150px] rounded-br-[150px] shadow-xl relative p-4 w-full overflow-auto">
            <div id="text_1_image_container" className="relative">
              <div className="container mx-auto rounded-bl-[150px] rounded-br-[150px] flex flex-row md:flex-row items-center px-10">
                <div
                  id="text_1_container"
                  className="relative flex justify-between items-center p-2 md:pb-20 pb-14"
                  style={{ width: "100%", margin: "0 auto" }}
                >
                  <p className="relative sm:text-3xl text-nowrap md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl text-black-900 font-Agbalumo font-bold lg:ml-24">
                    Your Daily Food<br />Delivered<br />Hot & Fresh
                  </p>
                </div>
                <div
                  id="text_1_image_container"
                  className="flex flex-row md:flex-row items-center justify-evenly md:gap-0 lg:gap-16 xl:gap-20 2xl:gap-72 md:mr-2 mr-2 md:p-2"
                  style={{ width: "100%", maxWidth: "100vw", margin: "0 auto" }}
                >
                  <div id="image_container" className="relative px-10 m-2">
                    <img
                      className="relative object-cover rounded-bl-[200px] rounded-br-[126px] rounded-tr-[200px] w-96 h-auto md:w-screen md:h-60 lg:w-screen lg:h-64 xl:w-screen xl:h-72 2xl:w-screen 2xl:h-80"
                      src="/images/Main_groceries_reverse.jpg"
                      loading="lazy"
                      alt="Groceries"
                    />
                    <div
                      id="text_2_container"
                      className="relative flex flex-col items-center justify-center p-2 w-auto"
                    >
                      <p
                        className="text-xs sm:text-base md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-5xl text-white font-josefin_sans font-bold text-center whitespace-nowrap"
                        style={{ width: "100%", margin: "0 auto" }}
                      >
                        Groceries, Meals, Pharmacies, anything!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location Buttons Section */}
          <div className="container mx-auto px-4">
            <section className="flex relative m-8">
              <div id="LP_location_buttons_container_2" className="flex relative m-8">
                <div id="button-group" className="flex flex-row items-center container justify-between w-auto">
                  <div className="flex flex-col items-center pr-8">
                    <div className="flex flex-col max-w-sm items-center space-y-4">
                      <div
                        id="protected-div"
                        className="flex items-center bg-white text-gray-600 px-8 py-2 rounded-full shadow-md border border-gray-300 transition-transform transform hover:scale-105 relative"
                        onClick={() => setState(prev => ({ ...prev, isEditing: true, isDropdownOpen: true }))}
                        role="button"
                        aria-haspopup="listbox"
                        aria-expanded={state.isDropdownOpen}
                      >
                        <img className="h-7 mr-2" src="/images/img_linkedin.svg" alt="Location icon" loading="lazy" />
                        {state.isEditing ? (
                          <input
                            ref={inputRef}
                            className="text-md bg-transparent border-none focus:outline-none flex-grow"
                            type="text"
                            value={state.location}
                            placeholder="Search for a town"
                            autoFocus
                            onChange={handleInputChange}
                            aria-label="Search for a town"
                          />
                        ) : (
                          <span className="text-md flex-grow">{state.location || "What's Your Region?"}</span>
                        )}
                        {state.location && (
                          <XClearButton
                            onClick={(e) => {
                              e.stopPropagation();
                              clearLocation();
                            }}
                            className="absolute right-2 top-1/2 transform -translate-y-2.5"
                            aria-label="Clear location"
                          />
                        )}
                      </div>
                      {state.isDropdownOpen && state.suggestions.length > 0 && (
                        <div
                          ref={dropdownRef}
                          className="flex flex-col max-w-sm items-center space-y-2 bg-white border border-gray-300 shadow-md w-full max-h-60 overflow-y-auto z-10"
                          role="listbox"
                        >
                          {state.suggestions.map((option) => (
                            <div
                              key={`${option.region}-${option.name}`}
                              onClick={() => handleSelect(option)}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full text-left"
                              role="option"
                              aria-selected={state.selectedRegion?.code === option.code}
                            >
                              {option.label}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      className="flex items-center bg-white text-black px-4 py-2 rounded-full shadow-md border border-gray-300 transition-transform transform hover:scale-105 mt-4"
                      onClick={handleUseCurrentLocation}
                      disabled={state.isLoading}
                      aria-label="Use current location"
                    >
                      {state.isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2" aria-hidden="true"></div>
                      ) : (
                        <img className="h-5 mr-2" src="/images/img_save.svg" alt="Location icon" loading="lazy" />
                      )}
                      <p className="text-base font-bold">{state.isLoading ? "Getting Location..." : "Use Current Location"}</p>
                    </button>
                  </div>
                </div>
                {!state.isLoading && state.confirmRegion && state.userSelectedRegion && (
                  <div className="text-center">
                    <p>Are you in <b>{state.userSelectedRegion}</b> region?</p>
                    <button
                      className="flex items-center justify-center m-2 hover:bg-black hover:text-white font-josefin_sans px-4 py-2 bg-[#ff9f10] text-black rounded-full"
                      onClick={confirmRegionSelection}
                      aria-label={`Confirm ${state.userSelectedRegion} region`}
                    >
                      Confirm Region
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Regions Buttons */}
      <section aria-labelledby="what-is-etomart-title" className="bg-[#ee9613] py-16 rounded-bl-[150px] rounded-br-[150px]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black-900 font-Agbalumo mb-4">
              Explore Etomart Regions
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-josefin_sans">
              Delivered to you at your convenience!
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 justify-items-center">
            {regions.map((region) => (
              <div key={region.code} className="w-full flex justify-center">
                <button
                  onClick={() => handleRegionClick(region)}
                  className="w-[280px] h-[55px] flex justify-between items-center bg-white hover:bg-orange-300 text-black px-4 rounded-[36px] shadow-lg font-josefin_sans transition-transform transform hover:scale-105 overflow-hidden"
                  aria-label={`Select ${region.name} region`}
                >
                  <div className="flex items-center flex-grow">
                    <LazyLoadImage
                      className="rounded-full h-10 w-10 mr-2 flex-shrink-0 object-cover"
                      src={region.flagPath}
                      alt={`${region.name} flag`}
                      effect="blur"
                    />
                    <p className="text-left text-sm sm:text-base lg:text-lg text-gray-700 font-bold truncate">
                      {region.name}
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-6 fill-current text-zinc-950"
                      aria-hidden="true"
                    >
                      <path
                        d="M16.518a.498.498 0 0 1-.37-.836L20.824 12 16.136.836a.499.499 0 1 1 .74-.672l5 5.5a.5.5 0 0 1 0 .672l-5 5.5a.498.498 0 0 1-.37.164"
                        fill="#202125"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Did You Know Section */}
      <section aria-labelledby="did-you-know-title" className="py-16">
        <div className="container mx-auto px-4">
          <h2 id="did-you-know-title" className="text-center text-5xl font-bold font-Agbalumo mb-8">
            Did you Know?
          </h2>
          <p className="text-center text-xl max-w-2xl mx-auto font-josefin_sans font-semibold">
            Lorem ipsum dolor sit amet consectetur. Non tincidunt magna
            non et elit. Dolor turpis molestie dui magnis facilisis at
            fringilla quam.
          </p>
        </div>
      </section>

      {/* What is Etomart Section */}
      <section aria-labelledby="what-is-etomart-title" className="bg-[#ee9613] py-16 rounded-bl-[150px] rounded-br-[150px]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 id="what-is-etomart-title" className="text-4xl md:text-5xl font-bold font-Agbalumo text-black mb-4 text-center md:text-left">
                What is Etomart?
              </h2>
              <p className="text-xl text-white font-medium mb-8 text-center md:text-left">
                Etomart makes it incredibly easy for you to discover and get
                what you want. Delivered to you – quickly, reliably and
                affordably.
              </p>
              <div className="hidden md:block">
                <button
                  className="bg-white text-black px-8 py-3 rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-orange-300"
                  onClick={handleWatchVideo}
                  aria-label="Watch video about Etomart"
                >
                  Watch Video
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              <div className="bg-white rounded-lg shadow-md p-1 md:p-4 w-full max-w-md">
                <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    src="/images/website_intro/video-cover-image-4.jpg"
                    alt="Etomart introduction"
                    effect="blur"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 md:hidden flex justify-center">
          <button
            className="bg-white text-black px-8 py-3 rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-orange-300"
            onClick={handleWatchVideo}
            aria-label="Watch video about Etomart"
          >
            Watch Video
          </button>
        </div>
      </section>

      {/* Video Modal */}
      {state.isVideoVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleOverlayClick}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()} // Prevents the overlay click event
          >
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold">This is Etomart!</h3>
            </div>
            <div className="relative aspect-w-16 aspect-h-9">
              <video
                ref={videoRef}
                className="w-full h-full object-cover rounded-lg"
                controls
                autoPlay
                onEnded={handleVideoEnded}
              >
                <source src="/videos/website_intro/etomart_Brand_Intro.mp4" type="video/mp4" />
                <source src="/videos/website_intro/etomart_Brand_Intro.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors duration-300"
                onClick={handleGoBack}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      <section aria-labelledby="testimonials-title" className="py-16">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h2 id="testimonials-title" className="text-center text-4xl font-bold font-shrikhand text-orange-500 mb-4">
            Testimonials
          </h2>
          <h3 className="text-center text-5xl font-bold font-Agbalumo mb-8">
            What Others Are Saying
          </h3>
          <p className="text-center text-xl max-w-2xl mx-auto mb-12 font-josefin_sans font-semibold">
            Lorem ipsum dolor sit amet consectetur. Non tincidunt magna
            non et elit. Dolor turpis molestie dui magnis facilisis at
            fringilla quam.
          </p>
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white border border-slate-200 rounded-[200px] shadow-md max-w-full md:max-w-[928px] p-6 transition-opacity duration-500 ease-in-out ${
                  state.currentSlide === index ? 'opacity-100' : 'opacity-0 absolute'
                }`}
              >
                <div className="flex flex-col items-center justify-center px-6 py-6 w-auto">
                  <LazyLoadImage
                    className="h-[117px] md:h-auto rounded-full w-[117px]"
                    src={testimonial.imageSrc}
                    alt={`${testimonial.testimonialAuthor}'s avatar`}
                    effect="blur"
                  />
                </div>
                <div
                  id="text-part"
                  className="flex flex-wrap justify-center gap-4 items-center bg-white p-2 shadow-bs3 w-full"
                >
                  <div className="flex flex-row items-center justify-center w-auto">
                    <div className="flex items-center justify-center p-2">
                      {/* Controls */}
                      <button
                        onClick={handlePrevSlide}
                        className="p-4 bg-white border border-slate-200 shadow-lg w-8 h-8 flex items-center justify-center focus:outline-none z-10 rounded-full"
                      >
                        &lt;
                      </button>
                      <div className="flex flex-col items-center justify-center px-6 w-auto">
                        <div className="flex items-center justify-center overflow-hidden md:w-[550px] md:h-[100px] w-full h-auto">
                          <p className="text-center text-lg md:text-2xl font-josefin_sans font-semibold line-clamp-3">
                            {testimonial.textBelowImage}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleNextSlide}
                        className="bg-white border border-slate-200 shadow-lg w-8 h-8 flex items-center justify-center focus:outline-none z-10 rounded-full"
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-6 items-center w-full">
                  <div className="flex flex-col items-center justify-center px-6 pb-4 w-auto">
                    <div className="flex flex-wrap justify-center gap-6 items-center bg-white p-3 shadow-bs3 w-full pb-4">
                      <div className="flex flex-wrap justify-center gap-4 items-center bg-white flex-row pb-8 shadow-bs3 w-full">
                        {Array.from({ length: 5 }, (_, starIndex) => (
                          <div
                            key={starIndex}
                            className={`flex justify-center items-center w-10 h-10 ${
                              starIndex < testimonial.numStars ? 'text-orange-400' : 'text-gray-300'
                            }`}
                          >
                            <svg fill="currentColor" viewBox="0 0 40 40">
                              <g>
                                <path d="M9.7080136.6667L12.416324.9583L3.3330117.0833L15.33316.0417L19.99975L24.666316.0417L36.666317.0833L27.58324.9583L30.291336.6667L19.999730.4583L9.7080136.6667Z" />
                              </g>
                            </svg>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
                      <p className="text-xl md:text-3xl text-center text-gray-500 w-auto font-josefin_sans font-semibold">
                        {testimonial.testimonialAuthor}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section aria-labelledby="how-it-works-title" className="bg-[#ee9613] py-16 rounded-bl-[150px] rounded-br-[150px]">
        <div className="container mx-auto px-4">
          <h2 id="how-it-works-title" className="text-center text-5xl font-bold font-Agbalumo text-black mb-8">
            How it Works?
          </h2>
          <p className="text-center text-xl max-w-2xl mx-auto mb-12 text-white font-josefin_sans font-semibold">
            Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non
            et elit. Dolor turpis molestie dui magnis facilisis at fringilla
            quam.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "/images/img_materialsymbol.svg",
                title: "Order at Your convenience",
                description: "Browse through a wide selection of restaurants and shops, and order your favorite meals, groceries, or other essentials."
              },
              {
                icon: "/images/img_mdicursorpointer.svg",
                title: "Fast Delivery",
                description: "Etomart's fleet of delivery partners ensures your order arrives quickly, so you can enjoy your meals or items wherever and whenever."
              },
              {
                icon: "/images/img_mditruckdelivery.svg",
                title: "Convenient Tracking",
                description: "Track your order in real-time through the Etomart site, so you always know when your delivery is on its way."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-[20px] p-8 text-center">
                <LazyLoadImage
                  src={item.icon}
                  alt={item.title}
                  className="w-24 h-24 mx-auto mb-4"
                  effect="blur"
                />
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hungry for More Section */}
      <section aria-labelledby="hungry-for-more-title" className="py-16">
        <div className="container mx-auto px-4">
          <h2 id="hungry-for-more-title" className="text-center text-5xl font-bold font-Agbalumo mb-12">
            Hungry for more than food?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: "https://consumer-static-assets.wolt.com/frontpage-assets/courier-card-image.jpg",
                title: "Get paid as a courier partner.",
                cta: "Apply now",
                link: "https://careers.wolt.com"
              },
              {
                image: "https://consumer-static-assets.wolt.com/frontpage-assets/restaurant-card-image.jpg",
                title: "Serve more people as a restaurant partner",
                cta: "Apply now",
                link: "https://careers.wolt.com"
              },
              {
                image: "https://consumer-static-assets.wolt.com/frontpage-assets/jobs-card-image.jpg",
                title: "Enter a new chapter and find a job at Etomart",
                cta: "Apply now",
                link: "https://careers.wolt.com"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }}></div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-4 h-16">{item.title}</h3>
                  <a
                    href={item.link}
                    className="inline-block bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Apply now for ${item.title}`}
                  >
                    {item.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;