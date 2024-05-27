import React, { useState, useEffect } from "react";
import { Button, Img, Text } from "..";
import { useNavigate, useLocation } from 'react-router-dom';
import LPNavBar from "../LPNavBar";
function RegionsHome() {

  const [isLargeScreen, setIsLargeScreen] = useState(false);
  //Location buttons stuff
  const [isEditing, setIsEditing] = useState(false);

  const [inputLocation, setInputLocation] = useState("");

  const [numStars] = useState(5); // State for the number of stars
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // JavaScript
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  // Region stuff

  const showButtonLocation = useLocation();
  const selectedRegionButton = showButtonLocation.state?.selectedRegion;

  const regionsData = {
    Khomas: [
      {
        code: "ALB",
        name: "Khomas",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Regions"
      }
    ],
    Erongo: [
      {
        code: "HRV",
        name: "Erongo",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Regions"
      }
    ],
    Oshana: [
      {
        code: "CYP",
        name: "Oshana",
        flagPath: "/images/regions/oshana.jpeg",
        path: "/LP/Regions"
      }
    ],
    Omusati: [
      {
        code: "ALB",
        name: "Omusati",
        flagPath: "/images/regions/omusati.jpeg",
        path: "/LP/Regions"
      }
    ],
    Karas: [
      {
        code: "HRV",
        name: "Karas",
        flagPath: "/images/regions/kharas2.jpeg",
        path: "/LP/Regions"
      }
    ],
    Ohangwena: [
      {
        code: "CYP",
        name: "Ohangwena",
        flagPath: "/images/regions/ohangwena.jpeg",
        path: "/LP/Regions"
      }
    ],
    Zambezi: [
      {
        code: "ALB",
        name: "Zambezi",
        flagPath: "/images/regions/zambezi.jpeg",
        path: "/LP/Regions"
      }
    ],
    Oshikoto: [
      {
        code: "HRV",
        name: "Oshikoto",
        flagPath: "/images/regions/oshikoto.jpeg",
        path: "/LP/Regions"
      }
    ],
    Omaheke: [
      {
        code: "CYP",
        name: "Omaheke",
        flagPath: "/images/regions/omaheke.jpeg",
        path: "/LP/Regions"
      }
    ],
    Hardap: [
      {
        code: "ALB",
        name: "Hardap",
        flagPath: "/images/regions/hardap.jpeg",
        path: "/LP/Regions"
      }
    ],
    Otjozondjupa: [
      {
        code: "HRV",
        name: "Otjozondjupa",
        flagPath: "/images/regions/otjozondjupa.jpeg",
        path: "/LP/Regions"
      }
    ],
    Kunene: [
      {
        code: "CYP",
        name: "Kunene",
        flagPath: "/images/regions/kunene2.jpeg",
        path: "/LP/Regions"
      }
    ],
    KavangoEast: [
      {
        code: "ALB",
        name: "Kavango East",
        flagPath: "/images/regions/kavango_east.jpeg",
        path: "/LP/Regions"
      }
    ],
    KavangoWest: [
      {
        code: "HRV",
        name: "Kavango West",
        flagPath: "/images/regions/kavango_west.jpeg",
        path: "/LP/Regions"
      }
    ]
  };
  
  const buttonForSelectedRegion = regionsData[selectedRegionButton.name] || [];
  const regionDetails = buttonForSelectedRegion[0];

  //Region for Town stuff
  //Towns Stuff
  const routerLocation = useLocation();
  const selectedRegion = routerLocation.state?.selectedRegion;

  const townsKhomas = [
    { code: "ALB", name: "Windhoek", flagPath: "/images/regions/khomas2.jpeg", path: "/LP/Khomas/Towns" },
    { code: "BUK", name: "Brakwater", flagPath: "/images/regions/khomas2.jpeg", path: "/LP/Khomas/Towns" },
    { code: "DOE", name: "Dordabis", flagPath: "/images/regions/khomas2.jpeg", path: "/LP/Khomas/Towns" },
    { code: "GBN", name: "Gobabis", flagPath: "/images/regions/khomas2.jpeg", path: "/LP/Khomas/Towns" },
    { code: "GRS", name: "Groendrift", flagPath: "/images/regions/khomas2.jpeg", path: "/LP/Khomas/Towns" },
    { code: "HCH", name: "Hochfeld", flagPath: "/images/regions/khomas2.jpeg", path: "/LP/Khomas/Towns" },
    { code: "KHR", name: "Khorixas", flagPath: "/images/regions/khomas2.jpeg", path: "/LP/Khomas/Towns" },
    // { code: "KLN", name: "Klein Windhoek", flagPath: "/images/regions/khomas2.jpeg", path: "/LP/Khomas/Towns" },
    { code: "OJO", name: "Ojozondjupa", flagPath: "/images/regions/khomas2.jpeg", path: "/LP/Khomas/Towns" },
    { code: "RHN", name: "Rehoboth", flagPath: "/images/regions/khomas2.jpeg", path: "/LP/Khomas/Towns" },
    { code: "WSN", name: "Witvlei", flagPath: "/images/regions/khomas2.jpeg", path: "/LP/Khomas/Towns" }
  ];

  //Towns Stuff for Erongo

  const townsErongo = [
    { code: "ARA", name: "Arandis", flagPath: "/images/regions/erongo.jpeg", path: "/LP/Erongo/Towns" },
    { code: "HEN", name: "Henties Bay", flagPath: "/images/regions/erongo.jpeg", path: "/LP/Erongo/Towns" },
    { code: "KAR", name: "Karibib", flagPath: "/images/regions/erongo.jpeg", path: "/LP/Erongo/Towns" },
    { code: "OMA", name: "Omaruru", flagPath: "/images/regions/erongo.jpeg", path: "/LP/Erongo/Towns" },
    { code: "SWA", name: "Swakopmund", flagPath: "/images/regions/erongo.jpeg", path: "/LP/Erongo/Towns" },
    { code: "UIS", name: "Uis", flagPath: "/images/regions/erongo.jpeg", path: "/LP/Erongo/Towns" },
    { code: "WAL", name: "Walvis Bay", flagPath: "/images/regions/erongo.jpeg", path: "/LP/Erongo/Towns" }
  ];

  //Towns Stuff for Oshana
  const townsOshana = [
    { code: "ONG", name: "Ongwediva", flagPath: "/images/regions/oshana.jpeg", path: "/LP/Oshana/Towns" },
    { code: "OSH", name: "Oshakati", flagPath: "/images/regions/oshana.jpeg", path: "/LP/Oshana/Towns" },
    { code: "OND", name: "Ondangwa", flagPath: "/images/regions/oshana.jpeg", path: "/LP/Oshana/Towns" }
  ];

  //Towns Stuff for Omusati
  const townsOmusati = [
    { code: "OUT", name: "Outapi", flagPath: "/images/regions/omusati.jpeg", path: "/LP/Omusati/Towns" },
    { code: "OKA", name: "Okahao", flagPath: "/images/regions/omusati.jpeg", path: "/LP/Omusati/Towns" },
    { code: "OZO", name: "Oshifo", flagPath: "/images/regions/omusati.jpeg", path: "/LP/Omusati/Towns" }
  ];

  //Towns Stuff for Karas
  const townsKaras = [
    { code: "KHB", name: "Keetmanshoop", flagPath: "/images/regions/kharas2.jpeg", path: "/LP/Karas/Towns" },
    { code: "LUD", name: "Luderitz", flagPath: "/images/regions/kharas2.jpeg", path: "/LP/Karas/Towns" },
    { code: "RSH", name: "Rosh Pinah", flagPath: "/images/regions/kharas2.jpeg", path: "/LP/Karas/Towns" },
    { code: "ORM", name: "Oranjemund", flagPath: "/images/regions/kharas2.jpeg", path: "/LP/Karas/Towns" }
  ];

  //Towns Stuff for Ohangwena
  const townsOhangwena = [
    { code: "ENH", name: "Eenhana", flagPath: "/images/regions/ohangwena.jpeg", path: "/LP/Ohangwena/Towns" },
    { code: "HNM", name: "Helao Nafidi", flagPath: "/images/regions/ohangwena.jpeg", path: "/LP/Ohangwena/Towns" },
    { code: "OHS", name: "Ohangwena", flagPath: "/images/regions/ohangwena.jpeg", path: "/LP/Ohangwena/Towns" },
    { code: "OKG", name: "Okongo", flagPath: "/images/regions/ohangwena.jpeg", path: "/LP/Ohangwena/Towns" }
  ];

  //Towns Stuff for Zambezi
  const townsZambezi = [
    { code: "KAT", name: "Katima Mulilo", flagPath: "/images/regions/zambezi.jpeg", path: "/LP/Zambezi/Towns" },
    { code: "BUK", name: "Bukalo", flagPath: "/images/regions/zambezi.jpeg", path: "/LP/Zambezi/Towns" }
  ];

  //Towns Stuff for Oshikoto
  const townsOshikoto = [
    { code: "TSU", name: "Tsumeb", flagPath: "/images/regions/oshikoto.jpeg", path: "/LP/Oshikoto/Towns" },
    { code: "ONK", name: "Onankali", flagPath: "/images/regions/oshikoto.jpeg", path: "/LP/Oshikoto/Towns" },
    { code: "OMU", name: "Omuthiya", flagPath: "/images/regions/oshikoto.jpeg", path: "/LP/Oshikoto/Towns" }
  ];

  //Towns Stuff for Omaheke
  const townsOmaheke = [
    { code: "GOB", name: "Gobabis", flagPath: "/images/regions/omaheke.jpeg", path: "/LP/Omaheke/Towns" },
    { code: "WIT", name: "Witvlei", flagPath: "/images/regions/omaheke.jpeg", path: "/LP/Omaheke/Towns" },
    { code: "LEO", name: "Leonardville", flagPath: "/images/regions/omaheke.jpeg", path: "/LP/Omaheke/Towns" }
  ];

  //Towns Stuff for Hardap
  const townsHardap = [
    { code: "MAR", name: "Mariental", flagPath: "/images/regions/hardap.jpeg", path: "/LP/Hardap/Towns" },
    { code: "REH", name: "Rehoboth", flagPath: "/images/regions/hardap.jpeg", path: "/LP/Hardap/Towns" },
    { code: "GIB", name: "Gibeon", flagPath: "/images/regions/hardap.jpeg", path: "/LP/Hardap/Towns" }
  ];

  //Towns Stuff for Otjozondjupa
  const townsOtjozondjupa = [
    { code: "OKA", name: "Okahandja", flagPath: "/images/regions/otjozondjupa.jpeg", path: "/LP/Otjozondjupa/Towns" },
    { code: "GRD", name: "Grootfontein", flagPath: "/images/regions/otjozondjupa.jpeg", path: "/LP/Otjozondjupa/Towns" },
    { code: "OTJ", name: "Otjiwarongo", flagPath: "/images/regions/otjozondjupa.jpeg", path: "/LP/Otjozondjupa/Towns" },
    { code: "OTV", name: "Otavi", flagPath: "/images/regions/otjozondjupa.jpeg", path: "/LP/Otjozondjupa/Towns" }
  ];

  //Towns Stuff for Kunene
  const townsKunene = [
    { code: "OPO", name: "Opuwo", flagPath: "/images/regions/kunene2.jpeg", path: "/LP/Kunene/Towns" },
    { code: "KHX", name: "Khorixas", flagPath: "/images/regions/kunene2.jpeg", path: "/LP/Kunene/Towns" },
    { code: "SES", name: "Sesfontein", flagPath: "/images/regions/kunene2.jpeg", path: "/LP/Kunene/Towns" }
  ];

  //Towns Stuff for Kavango East
  const townsKavangoEast = [
    { code: "RUN", name: "Rundu", flagPath: "/images/regions/kavango_east.jpeg", path: "/LP/KavangoEast/Towns" },
    { code: "DIV", name: "Divundu", flagPath: "/images/regions/kavango_east.jpeg", path: "/LP/KavangoEast/Towns" }
  ];

  //Towns Stuff for Kavango West
  const townsKavangoWest = [
    { code: "NKU", name: "Nkurenkuru", flagPath: "/images/regions/kavango_west.jpeg", path: "/LP/KavangoWest/Towns" },
    { code: "MPU", name: "Mpungu", flagPath: "/images/regions/kavango_west.jpeg", path: "/LP/KavangoWest/Towns" }
  ];


  const townsByRegion = {
    'Khomas': townsKhomas,
    'Erongo': townsErongo,
    'Oshana': townsOshana,
    'Omusati': townsOmusati,
    'Karas': townsKaras,
    'Ohangwena': townsOhangwena,
    'Zambezi': townsZambezi,
    'Oshikoto': townsOshikoto,
    'Omaheke': townsOmaheke,
    'Hardap': townsHardap,
    'Otjozondjupa': townsOtjozondjupa,
    'Kunene': townsKunene,
    'Kavango East': townsKavangoEast,
    'Kavango West': townsKavangoWest
  };

  const townsForSelectedRegion = townsByRegion[selectedRegion.name] || [];

  const handleTownsClick = (path) => {
    if (path === "src/components/Regions/Towns/KhomasTowns.js") {
      navigate("/LP/Khomas/Towns"); // Replace '/Regions' with the appropriate route path
    } else {
      navigate(path);
    }
  };






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

  const testimonials = [
    {
      imageSrc: "/images/img_ellipse1.png",
      textBelowImage: "Lorem ipsum dolor sit amet consectetur.",
      numStars: 1,
      testimonialAuthor: "John Doe",
    },
    {
      imageSrc: "/images/img_ellipse1.png",
      textBelowImage:
        "Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non et elit. Dolor turpis molestie dui magnis facilisis at fringilla quam.",
      numStars: 5,
      testimonialAuthor: "John Doe",
    },
    {
      imageSrc: "/images/img_ellipse1.png",
      textBelowImage:
        "Dolor at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil Dolor at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil at fringilla quam. Dolor turpis molestie dui magnis facilisis at fringil",
      numStars: 3,
      testimonialAuthor: "John Doe",
    },
    // Add more testimonials as needed
  ];

  const handleClick = (url) => {
    // Handle the click event here
    // You can navigate to the URL or perform any other action
    console.log("Clicked URL:", url);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640);
    };

    // Initial call to set screen size
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //Location buttons stuff
  const handleInputChange = (e) => {
    setInputLocation(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Save the location data here
    setIsEditing(false);
  };

  // // render stars testimonials container
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? testimonials.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === testimonials.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handleLanguageChange = () => {
    // Handle language change logic here
  };

  const handleAccessibilitySettingsOpen = () => {
    // Handle accessibility settings opening logic here
  };

  const handleWatchVideo = () => {
    setIsVideoVisible(true);
  };

  const handleVideoEnded = () => {
    setIsVideoVisible(false);
  };

  return (
    <div><div>
      <LPNavBar />
    </div>
      <div id="Landing_Page_Main_Body" className="content-wrapper ">
        <div className="overflow-auto bg-[#fafafa]">
          {/* Hero Section */}
          {/* Orange Section */}
          <div className="bg-[#ee9613] border border-solid border-white-A700_19 rounded-tr-[150px] rounded-bl-[150px] rounded-br-[150px] shadow-xl relative p-4 w-full overflow-auto">
            <div id="text_1_image_container" className="relative">
              <div className="container mx-auto rounded-bl-[150px] rounded-br-[150px] flex flex-row md:flex-row items-center px-10">
                <div
                  id="text_1_container"
                  className="relative flex justify-between items-center p-2 md:pb-20 pb-14"
                  style={{ width: "100%", margin: "0 auto" }}
                >
                  <p className="relative  sm:text-3xl text-nowrap md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl text-black-900 font-Agbalumo font-bold lg:ml-24">
                    Your Daily Food <br /> Delivered <br /> Hot & Fresh
                  </p>
                </div>
                <div
                  id="text_1_image_container"
                  className="flex  flex-row md:flex-row items-center justify-evenly md:gap-0 lg:gap-16 xl:gap-20 2xl:gap-72 md:mr-2 mr-2 md:p-2"
                  style={{ width: "100%", maxWidth: "100vw", margin: "0 auto" }}
                >
                  <div id="image_container" className="relative px-10 m-2">
                    {/* p-10 controls the stuff scrolling left to right when the screen is smaller  */}
                    <img
                      className="relative object-cover rounded-bl-[200px] rounded-br-[126px] rounded-tr-[200px] w-96 h-auto md:w-screen md:h-60 lg:w-screen lg:h-64 xl:w-screen xl:h-72 2xl:w-screen 2xl:h-80"
                      src="/images/Main_groceries_reverse.jpg"
                      loading="lazy"
                      alt="Groceries" />
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
          {/* Location stuff */}
          <div
            id="LP_location_buttons_container_2"
            className="flex items-center justify-center sm:justify-start md:justify-start lg:justify-start xl:justify-start 2xl:justify-start p-8 mx-auto sm:max-w-full md:max-w-screen lg:max-w-screen xl:max-w-screen 2xl:max-w-screen"
            style={{
              maxWidth: "1800px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {/* different styling method to make it start at the end of the page<div  id="location_buttons_container" className=" bg-white flex items-center p-5 m-8" style={{ width: '100%', maxWidth: '1260px', margin: '0 auto' }}>*/}
            <div className="button-group flex items-start ">
              <div className="button-row flex flex-col gap-4 items-center justify-center md:items-start lg:items-start xl:items-start 2xl:items-start mb-4">
                {/* Button 1 */}
                <Button
                  className="flex items-center bg-white text-black px-4 py-2 ml-0 rounded-[36px] shadow-lg pr-8 font-josefin_sans border border-slate-200"
                  onClick={handleEditClick}
                >
                  <img
                    className="h-7 mr-2"
                    src="/images/img_linkedin.svg"
                    alt="linkedin"
                    loading="lazy"
                  />
                  <p
                    className={`text-center md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl sm:text-lg text-xl text-gray-700 font-bold ${isEditing ? "hidden" : ""
                      }`}
                  >
                    What's your Address?
                  </p>
                  <input
                    className={`text-center md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl sm:text-lg text-xl text-gray-700 font-bold focus:outline-none ${!isEditing ? "hidden" : ""
                      }`}
                    type="text"
                    value={inputLocation}
                    onChange={handleInputChange}
                  />
                </Button>

                {/* Button 2 */}
                <Button
                  className="flex items-center bg-white text-black px-4 py-2 ml-0 rounded-[36px] shadow-lg pr-8 font-josefin_sans border border-slate-200"
                  onClick={handleSaveClick}
                >
                  <img
                    className="h-5 mr-2"
                    src="/images/img_save.svg"
                    alt="save"
                    loading="lazy"
                  />
                  <p className="text-left md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl sm:text-sm text-base text-zinc-950 font-bold">
                    Use Current Location
                  </p>
                </Button>
              </div>
            </div>
          </div>

          {/* Location stuff ends */}

          {/* Location stuff*/}
          {/* <div  id="location_buttons_container" className=" bg-white flex items-center p-5 m-8" style={{ width: '100%', maxWidth: '1260px', margin: '0 auto' }}>
          <div className="button-group flex flex-col items-start">
            <div id="location_buttons_1_container" className="button-row flex items-center mb-6">
              <Button className="flex items-center bg-white text-black px-4 py-2 ml-4 rounded-[36px] shadow-lg pr-8 font-montserrat border border-slate-100">
                <img className="h-7 mr-2" src="/images/img_linkedin.svg" alt="linkedin" loading="lazy"></img>
                <p className="text-left md:text-3xl sm:text-[28px] text-[32px] text-gray-700 font-bold">What's your Address?</p>
              </Button>
            </div>
            {/* current Location stuff
            <div id="location_buttons_1_container" className="button-row flex mt-2">
              <Button className="flex items-center bg-white text-black px-4 py-2 ml-4 rounded-[36px] shadow-lg pr-8 font-montserrat border border-slate-100">
                <img className="h-5 mr-2" src="/images/img_save.svg" alt="save" loading="lazy" />
                <p className="text-left md:text-lg sm:text-[28px] text-[32px] text-zinc-950 font-bold">Use Current Location</p>
              </Button>
            </div>
          </div>
        </div> */}
          {/* Locations */}
          {/* Conditional Rendering based on Screen Size */}
          <div
            id="LP_section_3_orange"
            className="flex-col sm:flex-col md:flex-row items-center justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[150px] shadow-xl relative md:h-auto md:p-10 h-auto p-10">
            {/* Your content goes here */}

            <div className="flex flex-col md:flex-row w-full">
              <div className="md:w-1/2 md:pr-4 md:mb-6">
                <div className="text-container md:flex md:items-end md:justify-end whitespace-nowrap sm:whitespace-wrap md:whitespace-wrap lg:whitespace-wrap xl:whitespace-wrap sd:mt-2 ">
                  {isLargeScreen ? (
                    <Text className="sm:text-3xl md:text-2xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-black-900 font-Agbalumo sm:ml-16 sm:mr-0 md:mr-0 md:ml-0 md:py-0 lg:mt-0 lg:my-0">
                      Explore Etomart Towns
                    </Text>
                  ) : (
                    <Text className="flex justify-center text-xl text-black-900 font-Agbalumo font-bold">
                      Explore Etomart Towns
                    </Text>
                  )}
                </div>
                <div className="text-container md:flex md:items-end md:justify-end whitespace-nowrap sm:whitespace-wrap md:whitespace-wrap lg:whitespace-wrap xl:whitespace-wrap sd:mt-2 mt-0 md:mt-4">
                  {isLargeScreen ? (
                    <Text className="text-base sm:text-base md:text-base lg:text-2xl xl:text-3xl 2xl:text-4xl text-white font-josefin_sans mt-0 mb-4 sm:ml-16 sm:mr-0 md:mr-0 md:ml-0">
                      Delivered to you at your convenience!
                    </Text>
                  ) : (
                    <Text className="flex justify-center text-base text-white font-josefin_sans">
                      Delivered to you at your convenience!
                    </Text>
                  )}
                </div>
              </div>
              {/* Region selected from Landing Page*/}
              <div className="md:w-1/2 md:pl-4 mt-6 md:mt-0">
  <div className="flex items-center justify-center">
    <div className="flex flex-wrap justify-center gap-4 pb-6 pt-6">
      <div className="flex justify-center w-full">
        <div className="flex flex-row gap-4 w-full">
        <Button className="flex justify-center items-center bg-orange-300 text-black px-4 py-2 rounded-[36px] shadow-lg font-josefin_sans max-w-[240px] h-14 overflow-hidden">
        <div className="flex items-center">
          <img className="rounded-[36px] h-8 mr-2" src={regionDetails.flagPath} alt={`${regionDetails.name} flag`} loading="lazy" />
          <p className="text-center text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl text-gray-700 font-bold">{regionDetails.name}</p>
        </div>
      </Button>
          <Button className="flex justify-center items-center bg-white text-black px-4 py-2 rounded-[36px] shadow-lg font-josefin_sans hover:bg-orange-300 min-w-[150px] h-14 overflow-hidden">
            <div className="flex items-center justify-between w-full">
              <a href="/LP" className="text-center text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl text-gray-700 font-bold">All Regions</a>
              <div className="flex items-center justify-end -mr-2">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-4 h-6 fill-current text-zinc-950 transform rotate-180">
                  <g fill="none" fillRule="evenodd">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M16.5 18a.498.498 0 01-.37-.836L20.824 12 16.13 6.836a.499.499 0 11.74-.672l5 5.5a.5.5 0 010 .672l-5 5.5a.498.498 0 01-.37.164" fill="#202125" />
                  </g>
                </svg>
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  </div>

                {/* Region Buttons end*/}
              </div>

            </div> {/* Towns Buttons based on the region selected in the landing page */}
          <div id="button-sizing" className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-44 py-0 px-16">
          {townsForSelectedRegion.map((town) => (
  <div key={town.code} className="flex justify-center w-full">
    <div className="button-row flex flex-col gap-4 mb-4">
      <Button
        className="flex flex-shrink-0 justify-between items-center bg-white hover:bg-orange-300 text-black px-4 py-2 ml-0 rounded-[36px] shadow-lg font-josefin_sans min-w-[220px] overflow-hidden"
        onClick={() => handleTownsClick(town.path)}
      >
         <div className="flex items-center flex-grow">
            
          <p className="text-left text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-gray-700 font-bold flex-shrink-0">
            {town.name}
          </p>
        </div>
        <div className="ml-auto pr-2 flex-shrink-0">
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-6 fill-current text-zinc-950"
          >
            <g fill="none" fillRule="evenodd">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M16.5 18a.498.498 0 01-.37-.836L20.824 12 16.13 6.836a.499.499 0 11.74-.672l5 5.5a.5.5 0 010 .672l-5 5.5a.498.498 0 01-.37.164"
                fill="#202125"
              />
            </g>
          </svg>
        </div>
      </Button>
    </div>
  </div>
))}

          </div>
          {/* Towns Buttons ends */} </div>
         
        </div>
        <div
          id="LP_location_buttons_container_2"
          className="flex items-center justify-center  p-8 mx-auto sm:max-w-full md:max-w-screen lg:max-w-screen xl:max-w-screen 2xl:max-w-screen"
          style={{
            maxWidth: "1800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div
            id="LP_Did_you_know_container_4"
            class="flex flex-col gap-[35px] items-center justify-start w-auto md:w-full pt-16 pb-6"
          >
            <div class="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
              <p class="text-left md:text-5xl text-6xl text-black w-auto font-bold font-Agbalumo">
                Did you Know?
              </p>
            </div>
            <div class="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
              <p class="text-center sm:text-[21px] md:text-[23px] text-[25px] max-w-xl text-zinc-950_01 font-josefin_sans font-semibold">
                Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non
                et elit. Dolor turpis molestie dui magnis facilisis at fringilla
                quam.
              </p>
            </div>
          </div>
        </div>

        <div
          id="LP_section_3_orange"
          className="flex flex-col items-center justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[150px] shadow-xl relative md:p-10 p-5"
          style={{ width: '100%', maxWidth: '100vw', margin: '0 auto' }}
        >
          {/* Text, Image, and Button */}
          <div className={`flex flex-col md:flex-row justify-center items-center gap-8 p-4 transition-all duration-500 relative z-10 mb-16 ${isVideoVisible ? 'opacity-0 pointer-events-none' : ''}`}>
            {/* Text and Button */}
            <div id="What_is_Etomart" className="flex items-center justify-center w-full md:w-1/2 px-4 md:px-0 z-10">
              <div id="text" className="relative max-w-3xl p-4 md:p-16 text-center">
                <h2 className="text-2xl md:text-5xl font-Agbalumo font-bold text-black mb-4">
                  What is Etomart?
                </h2>
                <p className="text-base md:text-xl text-white font-medium mb-8">
                  Etomart makes it incredibly easy for you to discover and get what you want. Delivered to you – quickly,
                  reliably and affordably.
                </p>
                <button
                  className="bg-white text-black px-6 py-2 md:px-8 md:py-3 rounded-full font-semibold shadow-md  transition-all duration-300  hover:bg-orange-300"
                  onClick={handleWatchVideo}
                  style={{ position: 'relative', zIndex: '999' }}>
                  <span>Watch Video</span>
                </button>
              </div>
            </div>
            {/* Video */}
            <div id="card" className="flex flex-wrap justify-center gap-6 w-full md:w-1/2 p-4 md:px-0 z-10">
              <div className="bg-white w-full md:w-auto h-full bg-cover bg-center rounded-lg flex flex-col items-center py-4 md:py-[21px] px-4 md:px-[21px] max-w-[200px] sm:max-w-[300px] md:max-w-[400px] max-h-[200px] sm:max-h-[300px] md:max-h-[450px] shadow-md relative">
                <div className="w-full max-w-[200px] sm:max-w-[300px] md:max-w-none max-h-[200px] sm:max-h-[300px] md:max-h-[400px] flex items-center justify-center">
                  <img
                    className="w-full h-auto rounded-xl"
                    src="/images/website_intro/video-cover-image-4.jpg"
                    alt="web_intro"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Video Container */}
          <div
            id="video-container"
            className={`flex flex-col  justify-center items-center transition-all duration-500 ${isVideoVisible ? '' : 'opacity-0 pointer-events-none'}`}
            style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '1' }}>
            <div id="description" className="mb-10  relative max-w-3xl p-4 text-center">
              <h2 className="text-2xl md:text-5xl font-Agbalumo font-bold text-black ">
                This is Etomart!
              </h2>
            </div>
            <div id="video" className=" mb-10 relative flex align-items-center  md:w-[600px] md:h-[350px]">
              <video
                className="absolute rounded-3xl inset-0 w-full h-full object-fill"

                poster="/images/website_intro/video-cover-image-4.jpg"
                controls
                volume={0.5}
                onEnded={handleVideoEnded}
              >
                <source src="Videos/website_intro/etomart_Brand_Intro.mp4" type="video/mp4" />
                <source src="Videos/website_intro/etomart_Brand_Intro.webm" type="video/webm" />

              </video>
            </div>
          </div>
        </div>



        <div
          id="LP_location_Testimonials_container_2"
          className="flex items-center justify-center  p-16 mx-auto sm:max-w-full md:max-w-screen lg:max-w-screen xl:max-w-screen 2xl:max-w-screen"
          style={{
            maxWidth: "1800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}>
          <div id="Testimonials Card" className="flex flex-col items-center justify-center w-full -mt-16">
            <div
              id="LP_testimonials_container_4"
              className="flex flex-col items-center gap-[35px] justify-start w-full pt-16 pb-16 px-4 md:px-10"
            >
              <div className="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
                <p className="text-center sm:text-[28px] md:text-[38px] text-[38px] text-orange-500 w-auto font-bold font-shrikhand">
                  Testimonials
                </p>
              </div>
              <div className="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
                <p className="text-center md:text-5xl text-6xl text-black w-auto font-bold font-Agbalumo">
                  What Others Are Saying
                </p>
              </div>
              <div className="flex flex-col items-center justify-center px-2.5 py-[3px] w-auto">
                <p className="text-center sm:text-[21px] md:text-[23px] text-[25px] max-w-xl text-zinc-950_01 font-josefin_sans font-semibold">
                  Lorem ipsum dolor sit amet consectetur. Non tincidunt magna
                  non et elit. Dolor turpis molestie dui magnis facilisis at
                  fringilla quam.
                </p>
              </div>

              {/* Slideshow */}
              <div
                className="flex transition-transform duration-500 ease-in-out transform"
                key={currentSlide}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className={`bg-white border border-slate-200   rounded-bl-[200px] rounded-br-[200px] rounded-tl-[200px] rounded-tr-[200px] shadow-md max-w-full md:max-w-[928px] p-6 ${currentSlide === index
                      ? "opacity-100"
                      : "opacity-0 absolute"
                      }`}
                  >
                    <div className="flex flex-col items-center justify-center px-6 py-6 w-auto">
                      <img
                        className="flex items-center justify-center h-[117px] md:h-auto rounded-[50%] w-[117px]"
                        src={testimonial.imageSrc}
                        alt={`Testimonial ${index + 1}`}
                      />
                    </div>
                    <div
                      id="text part"
                      className="flex flex-wrap justify-center gap-4 items-center g-white-A700 flex-row p-2 shadow-bs3 w-full"
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
                            {/* Text container with fixed width and height */}
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
                        <div className="flex flex-wrap justify-center gap-6 items-center g-white-A700 flex-col p-3 shadow-bs3 w-full pb-4">
                          <div className="flex flex-wrap justify-center gap-4 items-center g-white-A700 flex-row pb-8 shadow-bs3 w-full">
                            {Array.from(
                              { length: testimonial.numStars },
                              (_, starIndex) => (
                                <div
                                  key={starIndex}
                                  className="flex flex-wrap justify-center items-center w-10 h-10"
                                >
                                  <svg>
                                    <g>
                                      <path
                                        d="M9.70801 36.6667L12.4163 24.9583L3.33301 17.0833L15.333 16.0417L19.9997 5L24.6663 16.0417L36.6663 17.0833L27.583 24.9583L30.2913 36.6667L19.9997 30.4583L9.70801 36.6667Z"
                                        fill="#FE9E0D"
                                      />
                                    </g>
                                  </svg>
                                </div>
                              )
                            )}
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
          </div>
        </div>

        <div
          id="LP_section_5_orange_How_it_Works"
          className="flex-col sm:flex-col justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[150px] shadow-xl relative p-16 h-auto"
          style={{ width: "100%", maxWidth: "100vw", margin: "0 auto" }}
        >
          <div className="flex flex-col items-center justify-center w-full -mt-6">
            <div
              id="how-it-works"
              className="flex flex-col items-center justify-center  p-2 w-auto"
            >
              <p className="text-center md:text-5xl text-6xl text-black w-auto font-bold font-Agbalumo">
                How it Works?
              </p>
            </div>
            <div
              id="how-it-works-text"
              className="flex flex-col items-center justify-center  p-6 w-auto"
            >
              <p className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl  max-w-xl text-white font-josefin_sans font-semibold">
                Lorem ipsum dolor sit amet consectetur. Non tincidunt magna non
                et elit. Dolor turpis molestie dui magnis facilisis at fringilla
                quam.
              </p>
            </div>
          </div>
          <div id="cards" className="flex flex-wrap justify-center gap-6">
            <div className="bg-white flex flex-col items-center py-[21px] rounded-[20px] shadow-md w-[480px] h-[350px]">
              <img
                className="h-[96px] w-[96px] mb-4"
                src="/images/img_materialsymbol.svg"
                alt="materialsymbol"
              />
              <div className="text-center p-2">
                <p
                  id="title"
                  className=" text-black text-lg sm:text-xl md:text-2xl lg:text-3xl  max-w-xl font-bold mb-2"
                >
                  Order at Your convenience
                </p>
                <div className="text-center p-2">
                  <p
                    id="body"
                    className="text-sm sm:text-base md:text-lg lg:text-xl  max-w-xl text-black font-semibold"
                  >
                    Browse through a wide selection of restaurants and shops,
                    and order your favorite meals, groceries, or other
                    essentials.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white flex flex-col items-center py-[21px] rounded-[20px] shadow-md w-[480px] h-[350px]">
              <img
                className="h-[96px] w-[96px] mb-4"
                src="/images/img_mdicursorpointer.svg"
                alt="mdicursorpointe"
              />
              <div className="text-center p-2">
                <p
                  id="title"
                  className=" text-black text-lg sm:text-xl md:text-2xl lg:text-3xl  max-w-xl font-bold mb-2"
                >
                  Fast Delivery
                </p>
                <div className="text-center p-2">
                  <p
                    id="body"
                    className="text-sm sm:text-base md:text-lg lg:text-xl  max-w-xl text-black font-semibold"
                  >
                    Etomart's fleet of delivery partners ensures your order
                    arrives quickly, so you can enjoy your meals or items
                    wherever and whenever
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white flex flex-col items-center py-[21px] rounded-[20px] shadow-md w-[480px] h-[350px]">
              <img
                className="h-[96px] w-[96px] mb-4"
                src="/images/img_mditruckdelivery.svg"
                alt="mditruckdeliver"
              />
              <div className="text-center p-2">
                <p
                  id="title"
                  className=" text-black text-lg sm:text-xl md:text-2xl lg:text-3xl  max-w-xl font-bold mb-2"
                >
                  Convenient Tracking
                </p>
                <div className="text-center p-2">
                  <p
                    id="body"
                    className="text-sm sm:text-base md:text-lg lg:text-xl  max-w-xl text-black font-semibold"
                  >
                    Track your order in real-time through the Etomart site, so
                    you always know when your delivery is on its way.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="LP_Hungry_for_more_than_food_buttons_container_2"
          className="flex items-center justify-center  p-8 mx-auto sm:max-w-full md:max-w-screen lg:max-w-screen xl:max-w-screen 2xl:max-w-screen"
          style={{
            maxWidth: "1800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="flex flex-col items-center justify-center px-2.5 py-20  w-auto">
            <h2 className="text-5xl font-Agbalumo font-bold mb-8">
              Hungry for more than food?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
              <div className="p-0 m-2 bg-white shadow-md rounded-lg overflow-hidden border border-solid border-slate-100">
                <div className="p-0 m-2">
                  <div className="p-0 m-4">
                    <div
                      className="h-96 bg-cover bg-center border border-solid rounded-2xl"
                      style={{
                        backgroundImage:
                          "url(https://consumer-static-assets.wolt.com/frontpage-assets/courier-card-image.jpg)",
                      }}
                    ></div>
                    <div className="text-center p-8">
                      <p
                        id="body"
                        className="text-center text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl font-josefin_sans font-bold text-black mt-4 -mb-6 line-clamp-2"
                        style={{ minHeight: "60px", maxHeight: "60px", overflow: "hidden" }}
                      >
                        Get paid as a courier partner.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center p-4 m-2">
                  <a
                    href="https://careers.wolt.com"
                    className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl inline-block bg-orange-500 hover:bg-orange-800 text-white font-semibold py-2 px-4 rounded"
                  >
                    Apply now
                  </a>
                </div>
              </div>

              <div className="p-0 m-2 bg-white shadow-md rounded-lg overflow-hidden border border-solid border-slate-100">
                <div className="p-0 m-2">
                  <div className="p-0 m-4">
                    <div
                      className="h-96 bg-cover bg-center border border-solid rounded-2xl"
                      style={{
                        backgroundImage:
                          "url(https://consumer-static-assets.wolt.com/frontpage-assets/restaurant-card-image.jpg)",
                      }}
                    ></div>
                    <div className="text-center p-8">
                      <p
                        id="body"
                        className="text-center text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl font-josefin_sans font-bold text-black mt-4 -mb-6 line-clamp-2"
                        style={{ minHeight: "60px", maxHeight: "60px", overflow: "hidden" }}
                      >
                        Serve more people as a restaurant partner
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center p-4 m-2">
                  <a
                    href="https://careers.wolt.com"
                    className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl inline-block bg-orange-500 hover:bg-orange-800 text-white font-semibold py-2 px-4 rounded"
                  >
                    Apply now
                  </a>
                </div>
              </div>

              <div className="p-0 m-2 bg-white shadow-md rounded-lg overflow-hidden border border-solid border-slate-100">
                <div className="p-0 m-2">
                  <div className="p-0 m-4">
                    <div
                      className="h-96 bg-cover bg-center border border-solid rounded-2xl"
                      style={{
                        backgroundImage:
                          "url(https://consumer-static-assets.wolt.com/frontpage-assets/jobs-card-image.jpg)",
                      }}
                    ></div>
                    <div className="text-center p-8 ">
                      <p
                        id="body"
                        className="text-center text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl font-josefin_sans font-bold text-black mt-4 -mb-6 line-clamp-2"
                        style={{ minHeight: "60px", maxHeight: "60px", overflow: "hidden" }}
                      >
                        Enter a new chapter and find a job at Etomart
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center p-4 m-2">
                  <a
                    href="https://careers.wolt.com"
                    className="text-sm sm:text-base md:text-lg lg:text-xl max-w-xl inline-block bg-orange-500 hover:bg-orange-800 text-white font-semibold py-2 px-4 rounded"
                  >
                    Apply now
                  </a>
                </div>


              </div></div>
          </div>
        </div>


        <footer>
          <div
            id="LP_section_3_orange"
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
            {/* <div
          id="LP_section_3_orange"
          className="flex flex-col items-center justify-center bg-[#ee9613] border border-solid border-white-A700_19 rounded-bl-[150px] rounded-br-[150px] shadow-xl relative md:p-10 p-5"
          style={{ width: '100%', maxWidth: '100vw', margin: '0 auto' }}
        > */}
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
                      alt="Download the Wolt iOS app on the App Store"
                    />
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
                      alt="Download the Wolt Android app on Google Play"
                    />
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

                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
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
        </footer>
      </div>
    </div>

  );
}


export default RegionsHome;
