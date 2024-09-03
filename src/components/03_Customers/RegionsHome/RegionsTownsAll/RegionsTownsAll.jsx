import React, { useState, useRef, useEffect, useCallback } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import XClearButton from "../../../00_Main_Etomart_All/01_LPNavBarRegions/KhomasLPNavBar/ComponentsCalled/XClearButton";
import Footer from "../../../04_Footer/Footer";
import LPNavBar from "../../../00_Main_Etomart_All/01_LPNavBarRegions/KhomasLPNavBar/LPNavBar";
import { useRegions, useTownsData, useTownsByRegion, useTestimonials } from "./regionsTownsAllData/regionsTownsAllData";
import "react-lazy-load-image-component/src/effects/blur.css";

/**
 * RegionHome component for displaying and managing region and town selection
 * @returns {JSX.Element} The RegionHome component
 */
function RegionHome() {
  const { regionName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const videoRef = useRef(null);

  // Decode the URL-encoded regionName
  const decodedRegionName = decodeURIComponent(regionName);

  // State management
  const [state, setState] = useState({
    isLargeScreen: false,
    isEditing: false,
    location: "",
    currentSlide: 0,
    isPaused: false,
    inputLocation: "",
    suggestions: [],
    userLocation: null,
    isLoading: false,
    userSelectedRegion: null,
    confirmRegion: false,
    isDropdownOpen: false,
    isVideoVisible: false,
    nextPage: "",
    selectedRegionLocation: null,
    selectedTown: null,
  });

  // Use the data hooks
  const regions = useRegions();
  const townsData = useTownsData();
  const testimonials = useTestimonials();

  // Memoized selected region button
  const selectedRegionButton = React.useMemo(() => {
    if (decodedRegionName) {
      return regions[decodedRegionName] ? regions[decodedRegionName][0] : {};
    }
    return location.state?.selectedRegion || {};
  }, [decodedRegionName, location.state, regions]);

  // Callbacks
  const getRegionDetails = useCallback(
    (regionName) => {
      if (!regionName) return null;
      return regions[regionName] ? regions[regionName][0] : null;
    },
    [regions]
  );

  const normalizeRegionName = useCallback((name) => {
    return name.replace(/\s+/g, "").toLowerCase();
  }, []);

  const getRegionTowns = useCallback(
    (regionName) => {
      if (!regionName) return [];
      const normalizedRegionName = normalizeRegionName(regionName);
      const matchingRegion = Object.keys(useTownsByRegion).find(
        (key) => normalizeRegionName(key) === normalizedRegionName
      );
      return matchingRegion ? useTownsByRegion[matchingRegion] : [];
    },
    [normalizeRegionName]
  );

  // Use the updated functions
  const regionDetails = getRegionDetails(selectedRegionButton.name) || {};
  const townsForSelectedRegion = getRegionTowns(selectedRegionButton.name);

  const clearLocation = useCallback(() => {
    setState((prev) => ({
      ...prev,
      location: "",
      isDropdownOpen: false,
      isEditing: false,
    }));
  }, []);

  const handleSelect = useCallback(
    (option) => {
      setState((prev) => ({
        ...prev,
        selectedTown: option,
        location: option.name,
        isEditing: false,
      }));
      if (option) {
        navigate(option.path, {
          state: { selectedRegion: option.region, selectedTown: option.name },
        });
      }
    },
    [navigate]
  );

  const handleUseCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      setState((prev) => ({ ...prev, isLoading: true }));
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const { region, town } = determineRegionAndTown(latitude, longitude);
          setState((prev) => ({
            ...prev,
            userLocation: { latitude, longitude },
            userSelectedRegion: region,
            location: town,
            confirmRegion: true,
            isLoading: false,
          }));
        },
        (error) => {
          console.error("Error getting location", error);
          alert(
            "Error getting location. Please try again or enter your location manually."
          );
          setState((prev) => ({ ...prev, isLoading: false }));
        },
        { timeout: 10000, maximumAge: 60000 }
      );
    } else {
      alert(
        "Geolocation is not supported by this browser. Please enter your location manually."
      );
    }
  }, []);

  const determineRegionAndTown = useCallback(
    (latitude, longitude) => {
      let closestRegion = null;
      let closestTown = null;
      let closestDistance = Infinity;
      Object.entries(townsData).forEach(([regionName, towns]) => {
        towns.forEach((town) => {
          const distance = getDistance(
            latitude,
            longitude,
            town.latitude,
            town.longitude
          );
          if (distance < closestDistance) {
            closestDistance = distance;
            closestRegion = regionName;
            closestTown = town.name;
          }
        });
      });
      return { region: closestRegion, town: closestTown };
    },
    [townsData]
  );

  const getDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      0.5 -
      Math.cos(dLat) / 2 +
      (Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        (1 - Math.cos(dLon))) /
      2;
    return R * 2 * Math.asin(Math.sqrt(a));
  }, []);

  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setState((prev) => ({
        ...prev,
        location: value,
        suggestions:
          value.length > 0
            ? Object.entries(townsData).flatMap(([regionName, towns]) =>
              towns
                .filter((town) =>
                  town.name.toLowerCase().includes(value.toLowerCase())
                )
                .map((town) => ({ ...town, region: regionName }))
            )
            : [],
        isDropdownOpen: value.length > 0,
      }));
    },
    [townsData]
  );

  const confirmRegionSelection = useCallback(() => {
    if (state.userSelectedRegion) {
      const region = townsData[state.userSelectedRegion];
      if (region) {
        navigate(region[0].path, {
          state: { selectedRegion: state.userSelectedRegion },
        });
      }
    }
  }, [state.userSelectedRegion, townsData, navigate]);

  // Video-related callbacks
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

  // Testimonial-related callbacks
  const handleSlideChange = useCallback((direction) => {
    setState((prev) => {
      const newSlide =
        direction === "next"
          ? (prev.currentSlide - 1 + testimonials.length) % testimonials.length
          : (prev.currentSlide + 1) % testimonials.length;
      return {
        ...prev,
        currentSlide: newSlide,
        isPaused: true,
      };
    });

    // Resume auto-scroll after 5 seconds
    setTimeout(() => {
      setState((prev) => ({ ...prev, isPaused: false }));
    }, 8000);
  }, [testimonials.length]);

  const handlePrevSlide = useCallback(
    () => handleSlideChange("prev"),
    [handleSlideChange]
  );
  const handleNextSlide = useCallback(
    () => handleSlideChange("next"),
    [handleSlideChange]
  );

  // Effects
  useEffect(() => {
    const handleResize = () => {
      setState((prev) => ({
        ...prev,
        isLargeScreen: window.innerWidth >= 640,
      }));
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
        !event.target.closest("#protected-div")
      ) {
        setState((prev) => ({
          ...prev,
          isDropdownOpen: false,
          isEditing: false,
        }));
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    let timer;
    if (!state.isPaused) {
      timer = setInterval(() => {
        setState((prev) => ({
          ...prev,
          currentSlide:
            (prev.currentSlide - 1 + testimonials.length) % testimonials.length,
        }));
      }, 6000); // Change slide every 6 seconds
    }
    return () => clearInterval(timer);
  }, [state.isPaused, testimonials.length]);

  // Render functions
  const renderHeroSection = () => (
    <div className="border-white-A700_19 relative w-full overflow-auto rounded-r-[150px] rounded-bl-[150px] border border-solid bg-[#ee9613] p-4 shadow-xl">
      <div id="text_1_image_container" className="relative">
        <div className="container mx-auto flex flex-row items-center rounded-b-[150px] px-10 md:flex-row">
          <div
            id="text_1_container"
            className="relative flex items-center justify-between p-2 pb-14 md:pb-20"
            style={{ width: "100%", margin: "0 auto" }}
          >
            <p className="text-black-900 relative text-nowrap font-Agbalumo font-bold sm:text-3xl md:text-4xl lg:ml-24 lg:text-5xl xl:text-5xl 2xl:text-6xl">
              Your Daily Food <br /> Delivered <br /> Hot & Fresh
            </p>
          </div>
          <div
            id="text_1_image_container"
            className="mr-2 flex flex-row items-center justify-evenly md:mr-2 md:flex-row md:gap-0 md:p-2 lg:gap-16 xl:gap-20 2xl:gap-72"
            style={{ width: "100%", maxWidth: "100vw", margin: "0 auto" }}
          >
            <div id="image_container" className="relative m-2 px-10">
              <img
                className="relative h-auto w-96 rounded-bl-[200px] rounded-br-[126px] rounded-tr-[200px] object-cover md:h-60 md:w-screen lg:h-64 lg:w-screen xl:h-72 xl:w-screen 2xl:h-80 2xl:w-screen"
                src="/images/Main_groceries_reverse.jpg"
                loading="lazy"
                alt="Groceries"
              />
              <div
                id="text_2_container"
                className="relative flex w-auto flex-col items-center justify-center p-2"
              >
                <p
                  className="whitespace-nowrap text-center font-josefin_sans text-xs font-bold text-white sm:text-base md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-5xl"
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
  );

  const renderLocationButtons = () => (
    <div className="container mx-auto px-4">
      <section className="relative m-8 flex">
        <div id="LP_location_buttons_container_2" className="relative m-8 flex">
          <div id="button-group" className="container flex w-auto flex-row items-center justify-between">
            <div className="flex flex-col items-center pr-8">
              <div className="flex max-w-sm flex-col items-center space-y-4">
                <div
                  id="protected-div"
                  className="relative flex w-full items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-600 shadow-md transition-transform hover:scale-105"
                  onClick={() => {
                    setState((prev) => ({
                      ...prev,
                      isEditing: true,
                      isDropdownOpen: true,
                    }));
                  }}
                >
                  <img
                    className="mr-2 h-6"
                    src="/images/img_linkedin.svg"
                    alt=""
                    aria-hidden="true"
                  />
                  {state.isEditing ? (
                    <input
                      ref={inputRef}
                      className="text-md grow border-none bg-transparent focus:outline-none"
                      type="text"
                      value={state.location}
                      placeholder="Search for a town"
                      onChange={handleInputChange}
                      aria-label="Search for a town"
                    />
                  ) : (
                    <span className="text-md grow">
                      {state.location || "Search for a town"}
                    </span>
                  )}
                  {state.location && (
                    <XClearButton
                      onClick={(e) => {
                        e.stopPropagation();
                        clearLocation();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      aria-label="Clear location"
                    />
                  )}
                </div>
                {state.isDropdownOpen && state.suggestions.length > 0 && (
                  <ul
                    ref={dropdownRef}
                    className="z-10 flex max-h-60 w-full max-w-sm flex-col items-center space-y-2 overflow-y-auto border border-gray-300 bg-white shadow-md"
                    role="listbox"
                  >
                    {state.suggestions.map((town) => (
                      <li
                        key={`${town.region}-${town.name}`}
                        onClick={() => handleSelect(town)}
                        className="w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100"
                        role="option"
                      >
                        {town.name} ({town.region})
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                className="mt-4 flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-black shadow-md transition-transform hover:scale-105"
                onClick={handleUseCurrentLocation}
                disabled={state.isLoading}
                aria-label={
                  state.isLoading
                    ? "Getting location..."
                    : "Use current location"
                }
              >
                {state.isLoading ? (
                  <div
                    className="mr-2 size-5 animate-spin rounded-full border-b-2 border-gray-900"
                    aria-hidden="true"
                  ></div>
                ) : (
                  <img
                    className="mr-2 h-5"
                    src="/images/img_save.svg"
                    alt=""
                    aria-hidden="true"
                  />
                )}
                <p className="text-base font-bold">
                  {state.isLoading
                    ? "Getting Location..."
                    : "Use Current Location"}
                </p>
              </button>
            </div>
          </div>
          {!state.isLoading &&
            state.confirmRegion &&
            state.userSelectedRegion && (
              <div className="mt-4 text-center md:mt-0">
                <p>
                  Are you in <b>{state.location}</b>, from{" "}
                  <b>{state.userSelectedRegion}</b> region?
                </p>
                <button
                  className="m-2 flex items-center justify-center rounded-full bg-[#ff9f10] px-4 py-2 font-josefin_sans text-black hover:bg-black hover:text-white"
                  onClick={confirmRegionSelection}
                  aria-label={`Confirm ${state.userSelectedRegion} region`}
                >
                  Confirm Location
                </button>
              </div>
            )}
        </div>
      </section>
    </div>
  );

  const renderExploreEtomartTowns = () => (
    <section
      aria-labelledby="what-is-etomart-title"
      className="rounded-b-[150px] bg-[#ee9613] py-16"
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 flex w-full flex-col md:flex-row">
          <div className="mb-6 md:mb-0 md:w-1/2 md:pr-4">
            <h2 className="text-black-900 text-center font-Agbalumo text-3xl md:text-left md:text-5xl">
              Explore Etomart Towns
            </h2>
            <p className="mt-4 text-center font-josefin_sans text-base text-white md:text-left md:text-2xl">
              Delivered to you at your convenience!
            </p>
          </div>
          <div className="flex items-center justify-center md:w-1/2 md:justify-end md:pl-4">
            <div className="flex flex-row gap-4">
              <button className="flex h-14 max-w-[240px] items-center justify-center overflow-hidden rounded-[36px] bg-orange-300 px-4 py-2 font-josefin_sans text-black shadow-lg">
                <div className="flex items-center">
                  <LazyLoadImage
                    className="mr-2 h-8 rounded-[36px]"
                    src={selectedRegionButton.flagPath}
                    alt={`${selectedRegionButton.name || "Selected Region"
                      } flag`}
                    effect="blur"
                  />
                  <p className="text-center text-sm font-bold text-gray-700 md:text-base lg:text-lg xl:text-xl 2xl:text-xl">
                    {selectedRegionButton.name || "Selected Region"}
                  </p>
                </div>
              </button>

              <a href="/LP/Regions"
                className="flex h-14 min-w-[150px] items-center justify-center overflow-hidden rounded-[36px] bg-white px-6 py-2 font-josefin_sans text-black shadow-lg hover:bg-orange-300"
                aria-label="View all regions"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-center text-sm font-bold text-gray-700 md:text-sm lg:text-base xl:text-lg 2xl:text-xl">
                    All Regions
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-4 -mr-4 h-8 w-6 rotate-180 fill-current text-zinc-950"
                    aria-hidden="true"
                  >
                    <path
                      d="M16.5 18a.498.498 0 01-.37-.836L20.824 12 16.13 6.836a.499.499 0 11.74-.672l5 5.5a.5.5 0 010 .672l-5 5.5a.498.498 0 01-.37.164"
                      fill="#202125"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {townsData[selectedRegionButton.name]?.map((town) => (
            <div key={town.code} className="flex w-full justify-center">

              <a href={town.path}
                className="flex h-[55px] w-[280px] items-center justify-between overflow-hidden rounded-[36px] bg-white px-4 font-josefin_sans text-black shadow-lg transition-transform hover:scale-105 hover:bg-orange-300"
                aria-label={`Select ${town.name}`}
              >
                <span className="truncate text-left text-sm font-bold text-gray-700 md:text-base lg:text-lg">
                  {town.name}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-8 w-6 shrink-0 fill-current text-zinc-950"
                  aria-hidden="true"
                >
                  <path
                    d="M16.5 18a.498.498 0 01-.37-.836L20.824 12 16.13 6.836a.499.499 0 11.74-.672l5 5.5a.5.5 0 010 .672l-5 5.5a.498.498 0 01-.37.164"
                    fill="#202125"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderDidYouKnowSection = () => (
    <section aria-labelledby="did-you-know-title" className="py-16">
      <div className="container mx-auto px-4">
        <h2
          id="did-you-know-title"
          className="mb-8 text-center font-Agbalumo text-5xl font-bold"
        >
          Did you Know?
        </h2>
        <p className="mx-auto max-w-2xl text-center font-josefin_sans text-xl font-semibold">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non
          et elit. Dolor turpis molestie dui magnis facilisis at fringilla
          quam.
        </p>
      </div>
    </section>
  );

  const renderWhatIsEtomartSection = () => (
    <section
      aria-labelledby="what-is-etomart-title"
      className="rounded-b-[150px] bg-[#ee9613] py-16"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="md:w-1/2 md:p-6">
            <h2
              id="what-is-etomart-title"
              className="mb-4 text-center font-Agbalumo text-4xl font-bold text-black md:text-left md:text-5xl"
            >
              What is Etomart?
            </h2>
            <p className="mb-8 text-center text-xl font-medium text-white md:text-left">
              Etomart makes it incredibly easy for you to discover and get
              what you want. Delivered to you – quickly, reliably and
              affordably.
            </p>
            <div className="hidden md:flex md:w-2/3 md:justify-center">
              <button
                className="rounded-full bg-white px-8 py-3 font-semibold text-black shadow-md transition-all duration-300 hover:bg-orange-300"
                onClick={handleWatchVideo}
                aria-label="Watch video about Etomart"
              >
                Watch Video
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center md:w-1/2">
            <div className="w-full max-w-md rounded-lg bg-white p-1 shadow-md md:p-4">
              <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                <LazyLoadImage
                  className="size-full object-cover"
                  src="/images/website_intro/video-cover-image-4.jpg"
                  alt="Etomart introduction"
                  effect="blur"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center md:hidden">
          <button
            className="rounded-full bg-white px-8 py-3 font-semibold text-black shadow-md transition-all duration-300 hover:bg-orange-300"
            onClick={handleWatchVideo}
            aria-label="Watch video about Etomart"
          >
            Watch Video
          </button>
        </div>
      </div>
    </section>
  );

  const renderVideoModal = () => (
    state.isVideoVisible && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        onClick={handleOverlayClick}
      >
        <div
          className="w-full max-w-3xl rounded-lg bg-white p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 text-center">
            <h3 className="text-2xl text-black font-bold font-Agbalumo">This is Etomart!</h3>
          </div>
          <div className="aspect-w-16 aspect-h-9 relative">
            <video
              ref={videoRef}
              className="size-full rounded-lg object-cover"
              controls
              autoPlay
              onEnded={handleVideoEnded}
            >
              <source
                src="/videos/website_intro/etomart_Brand_Intro.mp4"
                type="video/mp4"
              />
              <source
                src="/videos/website_intro/etomart_Brand_Intro.webm"
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="mt-4 flex justify-center">
            <button
              className="rounded-full bg-orange-500 px-6 py-2 text-white font-bold transition-colors duration-300 hover:bg-orange-600"
              onClick={handleGoBack}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );

  const renderTestimonialsSection = () => (
    <section
      aria-labelledby="testimonials-title"
      className="py-8 md:py-16"
    >
      <div className="container mx-auto flex flex-col items-center px-4">
        <h2
          id="testimonials-title"
          className="mb-2 text-center font-shrikhand text-3xl font-bold text-orange-500 md:mb-4 md:text-4xl"
        >
          Testimonials
        </h2>
        <h3 className="mb-4 text-center font-Agbalumo text-4xl font-bold md:mb-8 md:text-5xl">
          What Others Are Saying
        </h3>
        <p className="mx-auto mb-8 max-w-2xl text-center font-josefin_sans text-lg font-semibold md:mb-12 md:text-xl">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non
          et elit. Dolor turpis molestie dui magnis facilisis at fringilla
          quam.
        </p>
        <div className="relative w-full overflow-hidden p-4 md:max-w-[745px] md:p-6">
          <div className="flex h-[400px] w-full md:h-[580px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-x-4 top-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-md transition-all duration-500 ease-in-out md:rounded-[200px] md:p-6 ${state.currentSlide === index
                    ? "translate-x-0 opacity-100"
                    : state.currentSlide ===
                      (index + 1) % testimonials.length
                      ? "translate-x-full opacity-0"
                      : "-translate-x-full opacity-0"
                  }`}
              >
                <div className="flex w-auto flex-col items-center justify-center px-2 py-4 md:px-6 md:py-10">
                  <LazyLoadImage
                    className="size-20 rounded-full md:size-[117px]"
                    src={testimonial.imageSrc}
                    alt={`${testimonial.testimonialAuthor}'s avatar`}
                    effect="blur"
                  />
                </div>
                <div className="flex w-full flex-wrap items-center justify-center gap-2 p-2 md:gap-4">
                  <div className="flex w-full flex-col items-center justify-center md:w-auto">
                    <div className="flex h-20 w-full items-center justify-center overflow-hidden md:h-[100px] md:w-[550px]">
                      <p className="line-clamp-3 text-center font-josefin_sans text-sm font-semibold md:text-lg lg:text-2xl">
                        {testimonial.textBelowImage}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-4 md:gap-6">
                  <div className="flex w-auto flex-col items-center justify-center px-2 pb-2 md:px-6 md:pb-4">
                    <div className="md:shadow-bs3 flex w-full flex-wrap items-center justify-center gap-2 rounded-3xl border border-slate-200 p-2 shadow-md md:mb-4 md:gap-4 md:rounded-[200px] md:p-2">
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <div
                          key={starIndex}
                          className={`flex size-6 items-center justify-center md:size-10 ${starIndex < testimonial.numStars
                              ? "text-orange-400"
                              : "text-gray-300"
                            }`}
                        >
                          <svg
                            fill="currentColor"
                            viewBox="0 0 40 40"
                            className="size-full"
                          >
                            <path d="M9.70801 36.6667L12.4163 24.9583L3.33301 17.0833L15.333 16.0417L19.9997 5L24.6663 16.0417L36.6663 17.0833L27.583 24.9583L30.2913 36.6667L19.9997 30.4583L9.70801 36.6667Z" />
                          </svg>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 flex w-auto flex-col items-center justify-center p-2">
                      <p className="w-auto text-center font-josefin_sans text-lg font-semibold text-gray-500 md:text-xl lg:text-3xl">
                        {testimonial.testimonialAuthor}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handlePrevSlide}
            className="absolute left-0 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white p-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 md:left-8 md:size-10 md:p-4"
            aria-label="Previous testimonial"
          >
            &lt;
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute right-0 top-1/2 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 md:right-8 md:size-10"
            aria-label="Next testimonial"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );

  const renderHowItWorksSection = () => (
    <section
      aria-labelledby="how-it-works-title"
      className="rounded-b-[150px] bg-[#ee9613] py-16"
    >
      <div className="container mx-auto px-4">
        <h2
          id="how-it-works-title"
          className="mb-8 text-center font-Agbalumo text-5xl font-bold text-black"
        >
          How it Works?
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center font-josefin_sans text-xl font-semibold text-white">
          Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non
          et elit. Dolor turpis molestie dui magnis facilisis at fringilla
          quam.
        </p>
        <div className="grid gap-8 p-6 md:grid-cols-3">
          {[
            {
              icon: "/images/img_materialsymbol.svg",
              title: "Order at Your convenience",
              description:
                "Browse through a wide selection of restaurants and shops, and order your favorite meals, groceries, or other essentials.",
            },
            {
              icon: "/images/img_mdicursorpointer.svg",
              title: "Fast Delivery",
              description:
                "Etomart's fleet of delivery partners ensures your order arrives quickly, so you can enjoy your meals or items wherever and whenever.",
            },
            {
              icon: "/images/img_mditruckdelivery.svg",
              title: "Convenient Tracking",
              description:
                "Track your order in real-time through the Etomart site, so you always know when your delivery is on its way.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-[20px] bg-white p-8 text-center"
            >
              <LazyLoadImage
                src={item.icon}
                alt={item.title}
                className="mx-auto mb-4 size-24"
                effect="blur"
              />
              <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderHungryForMoreSection = () => (
    <section aria-labelledby="hungry-for-more-title" className="py-16">
      <div className="container mx-auto px-4">
        <h2
          id="hungry-for-more-title"
          className="mb-12 text-center font-Agbalumo text-5xl font-bold"
        >
          Hungry for more than food?
        </h2>
        <div className="grid gap-8 p-6 md:grid-cols-3">
          {[
            {
              image:
                "https://consumer-static-assets.wolt.com/frontpage-assets/courier-card-image.jpg",
              title: "Get paid as a courier partner.",
              cta: "Apply now",
              link: "https://careers.wolt.com",
            },
            {
              image:
                "https://consumer-static-assets.wolt.com/frontpage-assets/restaurant-card-image.jpg",
              title: "Serve more people as a restaurant partner",
              cta: "Apply now",
              link: "https://careers.wolt.com",
            },
            {
              image:
                "https://consumer-static-assets.wolt.com/frontpage-assets/jobs-card-image.jpg",
              title: "Enter a new chapter and find a job at Etomart",
              cta: "Apply now",
              link: "https://careers.wolt.com",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg bg-white shadow-md"
            >
              <div className="h-80 bg-cover bg-center">
                <LazyLoadImage
                  src={item.image}
                  alt={item.title}
                  effect="blur"
                  className="size-full object-cover"
                  wrapperClassName="w-full h-full"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="mb-4 h-16 text-xl font-bold">
                  {item.title}
                </h3>

                <a href={item.link}
                  className="inline-block rounded bg-orange-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-orange-600"
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
  );

  return (
    <div>
      <LPNavBar />
      <div id="Landing_Page_Main_Body" className="content-wrapper">
        <div className="overflow-auto bg-[#fafafa]">
          {renderHeroSection()}
          {renderLocationButtons()}
          {renderExploreEtomartTowns()}
          {renderDidYouKnowSection()}
          {renderWhatIsEtomartSection()}
          {renderVideoModal()}
          {renderTestimonialsSection()}
          {renderHowItWorksSection()}
          {renderHungryForMoreSection()}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default RegionHome;