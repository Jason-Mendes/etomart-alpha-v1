import React, { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LPNavBar from "../../../../LPNavBar";
import Footer from "../../../../Footer";
import XClearButton from '../../../../componentsCalled/XClearButton';

const Test = () => {
  const [selectedTown, setSelectedTown] = useState(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userRegion, setUserRegion] = useState(null);
  const [confirmRegion, setConfirmRegion] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const showButtonLocation = useLocation();
  const selectedRegionButton = showButtonLocation.state?.selectedRegion;


  // Define the region data as a constant outside the component
  const townsData = {
    Khomas: [
      {
        code: "ALB",
        name: "Windhoek",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -22.559722,
        longitude: 17.083611
      },
      {
        code: "BUK",
        name: "Brakwater",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -22.580278,
        longitude: 17.122222
      },
      {
        code: "DOE",
        name: "Dordabis",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -22.870833,
        longitude: 17.405278
      },
      {
        code: "GBN",
        name: "Gobabis",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -22.442778,
        longitude: 18.980833
      },
      {
        code: "GRS",
        name: "Groendrift",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -22.764722,
        longitude: 17.069722
      },
      {
        code: "HCH",
        name: "Hochfeld",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -22.425278,
        longitude: 17.072222
      },
      {
        code: "KHR",
        name: "Khorixas",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -20.379722,
        longitude: 14.791111
      },
      {
        code: "OJO",
        name: "Ojozondjupa",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -21.263056,
        longitude: 16.806111
      },
      {
        code: "RHN",
        name: "Rehoboth",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -23.318056,
        longitude: 17.090278
      },
      {
        code: "WSN",
        name: "Witvlei",
        flagPath: "/images/regions/khomas2.jpeg",
        path: "/LP/Khomas/Towns",
        latitude: -22.809722,
        longitude: 18.423611
      }
    ],
    Erongo: [
      {
        code: "ARA",
        name: "Arandis",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
        latitude: -22.359722,
        longitude: 15.659722
      },
      {
        code: "HEN",
        name: "Henties Bay",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
        latitude: -22.119444,
        longitude: 14.280833
      },
      {
        code: "KAR",
        name: "Karibib",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
        latitude: -21.945833,
        longitude: 15.582222
      },
      {
        code: "OMA",
        name: "Omaruru",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
        latitude: -21.833056,
        longitude: 15.945833
      },
      {
        code: "SWA",
        name: "Swakopmund",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
        latitude: -22.680833,
        longitude: 14.532222
      },
      {
        code: "UIS",
        name: "Uis",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
        latitude: -21.2675,
        longitude: 14.9344
      },
      {
        code: "WAL",
        name: "Walvis Bay",
        flagPath: "/images/regions/erongo.jpeg",
        path: "/LP/Erongo/Towns",
        latitude: -22.957222,
        longitude: 14.5125
      }
    ],
    Oshana: [
      {
        code: "ONG",
        name: "Ongwediva",
        flagPath: "/images/regions/oshana.jpeg",
        path: "/LP/Oshana/Towns",
        latitude: -17.827778,
        longitude: 15.969444
      },
      {
        code: "OSH",
        name: "Oshakati",
        flagPath: "/images/regions/oshana.jpeg",
        path: "/LP/Oshana/Towns",
        latitude: -17.762222,
        longitude: 15.677222
      },
      {
        code: "OND",
        name: "Ondangwa",
        flagPath: "/images/regions/oshana.jpeg",
        path: "/LP/Oshana/Towns",
        latitude: -17.891111,
        longitude: 15.8525
      }
    ],
    Omusati: [
      {
        code: "OUT",
        name: "Outapi",
        flagPath: "/images/regions/omusati.jpeg",
        path: "/LP/Omusati/Towns",
        latitude: -17.531111,
        longitude: 14.968056
      },
      {
        code: "OKA",
        name: "Okahao",
        flagPath: "/images/regions/omusati.jpeg",
        path: "/LP/Omusati/Towns",
        latitude: -17.429444,
        longitude: 14.850833
      },
      {
        code: "OZO",
        name: "Oshifo",
        flagPath: "/images/regions/omusati.jpeg",
        path: "/LP/Omusati/Towns",
        latitude: -17.539444,
        longitude: 14.7725
      }
    ],
    Karas: [
      {
        code: "KHB",
        name: "Keetmanshoop",
        flagPath: "/images/regions/kharas2.jpeg",
        path: "/LP/Karas/Towns",
        latitude: -26.583056,
        longitude: 16.924444
      },
      {
        code: "LUD",
        name: "Luderitz",
        flagPath: "/images/regions/kharas2.jpeg",
        path: "/LP/Karas/Towns",
        latitude: -26.641944,
        longitude: 15.159444
      },
      {
        code: "RSH",
        name: "Rosh Pinah",
        flagPath: "/images/regions/kharas2.jpeg",
        path: "/LP/Karas/Towns",
        latitude: -27.488333,
        longitude: 16.370833
      },
      {
        code: "ORM",
        name: "Oranjemund",
        flagPath: "/images/regions/kharas2.jpeg",
        path: "/LP/Karas/Towns",
        latitude: -28.665278,
        longitude: 16.553611
      }
    ],
    Ohangwena: [
      {
        code: "ENH",
        name: "Eenhana",
        flagPath: "/images/regions/ohangwena.jpeg",
        path: "/LP/Ohangwena/Towns",
        latitude: -17.627222,
        longitude: 15.949444
      },
      {
        code: "HNM",
        name: "Helao Nafidi",
        flagPath: "/images/regions/ohangwena.jpeg",
        path: "/LP/Ohangwena/Towns",
        latitude: -17.5925,
        longitude: 15.8742
      },
      {
        code: "OHS",
        name: "Ohangwena",
        flagPath: "/images/regions/ohangwena.jpeg",
        path: "/LP/Ohangwena/Towns",
        latitude: -17.684722,
        longitude: 15.919444
      },
      {
        code: "OKG",
        name: "Okongo",
        flagPath: "/images/regions/ohangwena.jpeg",
        path: "/LP/Ohangwena/Towns",
        latitude: -17.368611,
        longitude: 15.601111
      }
    ],
    Zambezi: [
      {
        code: "KAT",
        name: "Katima Mulilo",
        flagPath: "/images/regions/zambezi.jpeg",
        path: "/LP/Zambezi/Towns",
        latitude: -17.498333,
        longitude: 24.315833
      },
      {
        code: "BUK",
        name: "Bukalo",
        flagPath: "/images/regions/zambezi.jpeg",
        path: "/LP/Zambezi/Towns",
        latitude: -17.571944,
        longitude: 24.291389
      }
    ],
    Oshikoto: [
      {
        code: "TSU",
        name: "Tsumeb",
        flagPath: "/images/regions/oshikoto.jpeg",
        path: "/LP/Oshikoto/Towns",
        latitude: -19.233333,
        longitude: 17.733333
      },
      {
        code: "ONK",
        name: "Onankali",
        flagPath: "/images/regions/oshikoto.jpeg",
        path: "/LP/Oshikoto/Towns",
        latitude: -18.755833,
        longitude: 17.685833
      },
      {
        code: "OMU",
        name: "Omuthiya",
        flagPath: "/images/regions/oshikoto.jpeg",
        path: "/LP/Oshikoto/Towns",
        latitude: -18.694444,
        longitude: 17.588056
      }
    ],
    Omaheke: [
      {
        code: "GOB",
        name: "Gobabis",
        flagPath: "/images/regions/omaheke.jpeg",
        path: "/LP/Omaheke/Towns",
        latitude: -22.442778,
        longitude: 18.980833
      },
      {
        code: "WIT",
        name: "Witvlei",
        flagPath: "/images/regions/omaheke.jpeg",
        path: "/LP/Omaheke/Towns",
        latitude: -22.809722,
        longitude: 18.423611
      },
      {
        code: "LEO",
        name: "Leonardville",
        flagPath: "/images/regions/omaheke.jpeg",
        path: "/LP/Omaheke/Towns",
        latitude: -22.591944,
        longitude: 19.134444
      }
    ],
    Hardap: [
      {
        code: "MAR",
        name: "Mariental",
        flagPath: "/images/regions/hardap.jpeg",
        path: "/LP/Hardap/Towns",
        latitude: -24.573611,
        longitude: 17.961389
      },
      {
        code: "REH",
        name: "Rehoboth",
        flagPath: "/images/regions/hardap.jpeg",
        path: "/LP/Hardap/Towns",
        latitude: -23.318056,
        longitude: 17.090278
      },
      {
        code: "GIB",
        name: "Gibeon",
        flagPath: "/images/regions/hardap.jpeg",
        path: "/LP/Hardap/Towns",
        latitude: -24.823333,
        longitude: 17.329722
      }
    ],
    Otjozondjupa: [
      {
        code: "OKA",
        name: "Okahandja",
        flagPath: "/images/regions/otjozondjupa.jpeg",
        path: "/LP/Otjozondjupa/Towns",
        latitude: -21.816944,
        longitude: 15.973611
      },
      {
        code: "GRD",
        name: "Grootfontein",
        flagPath: "/images/regions/otjozondjupa.jpeg",
        path: "/LP/Otjozondjupa/Towns",
        latitude: -19.550833,
        longitude: 17.082222
      },
      {
        code: "OTJ",
        name: "Otjiwarongo",
        flagPath: "/images/regions/otjozondjupa.jpeg",
        path: "/LP/Otjozondjupa/Towns",
        latitude: -20.4625,
        longitude: 16.645
      },
      {
        code: "OTV",
        name: "Otavi",
        flagPath: "/images/regions/otjozondjupa.jpeg",
        path: "/LP/Otjozondjupa/Towns",
        latitude: -19.666111,
        longitude: 17.400833
      }
    ],
    Kunene: [
      {
        code: "OPO",
        name: "Opuwo",
        flagPath: "/images/regions/kunene2.jpeg",
        path: "/LP/Kunene/Towns",
        latitude: -18.059722,
        longitude: 13.842222
      },
      {
        code: "KHX",
        name: "Khorixas",
        flagPath: "/images/regions/kunene2.jpeg",
        path: "/LP/Kunene/Towns",
        latitude: -20.379722,
        longitude: 14.791111
      },
      {
        code: "SES",
        name: "Sesfontein",
        flagPath: "/images/regions/kunene2.jpeg",
        path: "/LP/Kunene/Towns",
        latitude: -19.964167,
        longitude: 14.655833
      }
    ],
    KavangoEast: [
      {
        code: "RUN",
        name: "Rundu",
        flagPath: "/images/regions/kavango_east.jpeg",
        path: "/LP/KavangoEast/Towns",
        latitude: -17.930833,
        longitude: 19.774444
      },
      {
        code: "DIV",
        name: "Divundu",
        flagPath: "/images/regions/kavango_east.jpeg",
        path: "/LP/KavangoEast/Towns",
        latitude: -17.470833,
        longitude: 19.063611
      }
    ],
    KavangoWest: [
      {
        code: "NKU",
        name: "Nkurenkuru",
        flagPath: "/images/regions/kavango_west.jpeg",
        path: "/LP/KavangoWest/Towns",
        latitude: -17.8325,
        longitude: 19.0842
      },
      {
        code: "MPU",
        name: "Mpungu",
        flagPath: "/images/regions/kavango_west.jpeg",
        path: "/LP/KavangoWest/Towns",
        latitude: -17.8361,
        longitude: 19.0761
      }
    ]
    // Add other towns similarly...
  };
  
  const clearLocation = () => {
    setLocation("");
    setIsDropdownOpen(false);
    setIsEditing(false);
  };

  const handleSelect = (option) => {
    setSelectedTown(option);
    setLocation(option.name);
    setIsEditing(false);
    if (option) {
      navigate(option.path, { state: { selectedRegion: option.region, selectedTown: option.name } });
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          const { region, town } = determineRegionAndTown(latitude, longitude);
          setUserRegion(region);
          setLocation(town);
          setConfirmRegion(true);
          setIsLoading(false);
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Error getting location");
          setIsLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser");
    }
  };

  const determineRegionAndTown = (latitude, longitude) => {
    let closestRegion = null;
    let closestTown = null;
    let closestDistance = Infinity;

    Object.entries(townsData).forEach(([regionName, towns]) => {
      towns.forEach(town => {
        const distance = getDistance(latitude, longitude, town.latitude, town.longitude);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestRegion = regionName;
          closestTown = town.name;
        }
      });
    });

    return { region: closestRegion, town: closestTown };
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      0.5 - Math.cos(dLat) / 2 +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * (1 - Math.cos(dLon)) / 2;

    return R * 2 * Math.asin(Math.sqrt(a));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (value.length > 0) {
      const newSuggestions = [];
      Object.entries(townsData).forEach(([regionName, towns]) => {
        towns.forEach(town => {
          if (town.name.toLowerCase().includes(value.toLowerCase())) {
            newSuggestions.push({
              ...town,
              region: regionName
            });
          }
        });
      });
      setSuggestions(newSuggestions);
      setIsDropdownOpen(true);
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  const confirmRegionSelection = () => {
    if (userRegion) {
      const region = townsData[userRegion];
      navigate(region[0].path, { state: { selectedRegion: userRegion } });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest('#protected-div')
      ) {
        setIsDropdownOpen(false);
        setIsEditing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <LPNavBar />
      <div id="LP_location_buttons_container_2" className="flex relative m-8">
        <div id="button-group" className="flex flex-row items-center container justify-between w-auto">
          <div className="flex flex-col items-center pr-8">
            <div className="flex flex-col max-w-sm items-center space-y-4">
              <div 
                id="protected-div" 
                className="flex items-center bg-white text-gray-600 px-8 py-2 rounded-full shadow-md border border-gray-300 transition-transform transform hover:scale-105 relative"
                onClick={() => {
                  setIsEditing(true);
                  setIsDropdownOpen(true);
                }}
              >
                <img
                  className="h-7 mr-2"
                  src="/images/img_linkedin.svg"
                  alt="LinkedIn"
                  loading="lazy"
                />
                {isEditing ? (
                  <input
                    ref={inputRef}
                    className="text-md bg-transparent border-none focus:outline-none flex-grow"
                    type="text"
                    value={location}
                    placeholder="Search for a town"
                    autoFocus
                    onChange={handleInputChange}
                  />
                ) : (
                  <span className="text-md flex-grow">{location || "Search for a town"}</span>
                )}
                {location && (
                  <XClearButton
                    onClick={(e) => {
                      e.stopPropagation();
                      clearLocation();
                    }}
                    className="absolute right-2 top-2/2 transform -translate-y-2.5"
                  />
                )}
              </div>
              {isDropdownOpen && suggestions.length > 0 && (
                <div
                  ref={dropdownRef}
                  className="flex flex-col max-w-sm items-center space-y-2 bg-white border border-gray-300 shadow-md w-full max-h-60 overflow-y-auto z-10"
                >
                  {suggestions.map((town) => (
                    <div
                      key={`${town.region}-${town.name}`}
                      onClick={() => handleSelect(town)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full text-left"
                    >
                      {town.name} ({town.region})
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              className="flex items-center bg-white text-black px-4 py-2 rounded-full shadow-md border border-gray-300 transition-transform transform hover:scale-105 mt-4"
              onClick={handleUseCurrentLocation}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
              ) : (
                <img
                  className="h-5 mr-2"
                  src="/images/img_save.svg"
                  alt="save"
                  loading="lazy"
                />
              )}
              <p className="text-base font-bold">
                {isLoading ? "Getting Location..." : "Use Current Location"}
              </p>
            </button>
          </div>
          <div className="flex flex-col items-center">
            {!isLoading && confirmRegion && userRegion && (
              <div className="text-center">
                <p>Are you in <b>{location}</b>, from <b>{userRegion}</b> region?</p>
                <button
                  className="flex items-center justify-center m-2 hover:bg-black hover:text-white font-josefin_sans px-4 py-2 bg-[#ff9f10] text-black rounded-full"
                  onClick={confirmRegionSelection}
                >
                  Confirm Location
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Test;