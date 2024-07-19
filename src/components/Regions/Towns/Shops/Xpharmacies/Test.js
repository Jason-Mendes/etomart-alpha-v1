import React, { useState, useMemo } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import LPNavBar from "../../../../LPNavBar";
import Footer from "../../../../Footer";

const regionsData = {
  Khomas: { code: "ALB", name: "Khomas", flagPath: "/images/regions/khomas2.jpeg", path: "/LP/Region", latitude: -22.57, longitude: 17.08 },
  Erongo: { code: "HRV", name: "Erongo", flagPath: "/images/regions/erongo.jpeg", path: "/LP/Region", latitude: -22.55, longitude: 14.28 },
  Oshana: { code: "CYP", name: "Oshana", flagPath: "/images/regions/oshana.jpeg", path: "/LP/Region", latitude: -18.46, longitude: 15.99 },
  Omusati: { code: "ALB", name: "Omusati", flagPath: "/images/regions/omusati.jpeg", path: "/LP/Region", latitude: -18.28, longitude: 14.88 },
  Karas: { code: "HRV", name: "Karas", flagPath: "/images/regions/kharas2.jpeg", path: "/LP/Region", latitude: -27.00, longitude: 18.50 },
  Ohangwena: { code: "CYP", name: "Ohangwena", flagPath: "/images/regions/ohangwena.jpeg", path: "/LP/Region", latitude: -17.47, longitude: 16.47 },
  Zambezi: { code: "ALB", name: "Zambezi", flagPath: "/images/regions/zambezi.jpeg", path: "/LP/Region", latitude: -17.50, longitude: 24.27 },
  Oshikoto: { code: "HRV", name: "Oshikoto", flagPath: "/images/regions/oshikoto.jpeg", path: "/LP/Region", latitude: -18.60, longitude: 16.90 },
  Omaheke: { code: "CYP", name: "Omaheke", flagPath: "/images/regions/omaheke.jpeg", path: "/LP/Region", latitude: -21.43, longitude: 19.55 },
  Hardap: { code: "ALB", name: "Hardap", flagPath: "/images/regions/hardap.jpeg", path: "/LP/Region", latitude: -24.67, longitude: 17.93 },
  Otjozondjupa: { code: "HRV", name: "Otjozondjupa", flagPath: "/images/regions/otjozondjupa.jpeg", path: "/LP/Region", latitude: -20.58, longitude: 17.06 },
  Kunene: { code: "CYP", name: "Kunene", flagPath: "/images/regions/kunene2.jpeg", path: "/LP/Region", latitude: -19.50, longitude: 14.50 },
  KavangoEast: { code: "ALB", name: "Kavango East", flagPath: "/images/regions/kavango_east.jpeg", path: "/LP/Region", latitude: -18.00, longitude: 20.00 },
  KavangoWest: { code: "HRV", name: "Kavango West", flagPath: "/images/regions/kavango_west.jpeg", path: "/LP/Region", latitude: -18.28, longitude: 19.18 }
};

const Test = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userRegion, setUserRegion] = useState(null);
  const [confirmRegion, setConfirmRegion] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSelect = (selectedOption) => {
    setSelectedRegion(selectedOption);
    if (selectedOption) {
      const region = regionsData[selectedOption.value];
      if (region) {
        navigate(region.path, { state: { selectedRegion: selectedOption.value } });
      }
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          // Logic to determine the region based on coordinates
          const region = determineRegion(latitude, longitude);
          setUserRegion(region);
          setConfirmRegion(true);
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Error getting location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser");
    }
  };

  // Function to determine the region based on coordinates
  const determineRegion = (latitude, longitude) => {
    let closestRegion = null;
    let closestDistance = Infinity;

    Object.values(regionsData).forEach((region) => {
      const distance = getDistance(latitude, longitude, region.latitude, region.longitude);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestRegion = region.name;
      }
    });

    return closestRegion;
  };

  // Function to calculate the distance between two coordinates
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
    setLocation(e.target.value);
    // Update the suggestions logic based on input
  };

  const clearLocation = () => {
    setLocation("");
    setSuggestions([]);
  };

  const regionOptions = useMemo(() => (
    Object.keys(regionsData).map((key) => ({
      value: key,
      label: regionsData[key].name,
    }))
  ), []);

  const confirmRegionSelection = () => {
    if (userRegion) {
      const region = regionsData[userRegion];
      navigate(region.path, { state: { selectedRegion: userRegion } });
    }
  };

  return (
    <div>
      <LPNavBar />
      <div className="container mx-auto py-4">
        <div className="mb-4">
      
          <Select
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="What's your address?"
            options={regionOptions}
            onChange={handleSelect}
            value={selectedRegion}
          />
        </div>

        <div
          id="LP_location_buttons_container_2"
          className="flex items-center justify-center sm:justify-start md:justify-start lg:justify-start xl:justify-start 2xl:justify-start p-8 mx-auto sm:max-w-full md:max-w-screen lg:max-w-screen xl:max-w-screen 2xl:max-w-screen"
          style={{ maxWidth: '1800px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <div className="button-group flex items-start">
            <div className="button-row flex flex-col gap-4 items-center justify-center md:items-start lg:items-start xl:items-start 2xl:items-start mb-4">
              <button
                className="flex items-center bg-white text-black px-4 py-2 ml-0 rounded-[36px] shadow-lg pr-8 font-josefin_sans border border-slate-200"
                onClick={() => setIsEditing(!isEditing)}
              >
                <img
                  className="h-7 mr-2"
                  src="/images/img_linkedin.svg"
                  alt="linkedin"
                  loading="lazy"
                />
                <p
                  className={`text-center md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl sm:text-lg text-xl text-gray-700 font-bold ${isEditing ? 'hidden' : ''}`}
                >
                  What's your Address?
                </p>
                <div className={`relative ${!isEditing ? 'hidden' : ''}`}>
                  <input
                    className="text-center md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl sm:text-lg text-xl text-gray-700 font-bold focus:outline-none"
                    type="text"
                    value={location}
                    onChange={handleInputChange}
                  />
                  <button
                    className="absolute top-0 right-0 mt-2 mr-4"
                    onClick={clearLocation}
                  >
                    <img
                      className="h-5 w-5"
                      src="/images/img_clear_text.svg"
                      alt="clear"
                    />
                  </button>
                  {suggestions.length > 0 && (
                    <ul className="absolute bg-white border border-gray-300 w-full mt-1 max-h-60 overflow-y-auto z-10">
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          onClick={() => {
                            setLocation(suggestion);
                            setSuggestions([]);
                          }}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </button>

              <button
                className="flex items-center bg-white text-black px-4 py-2 ml-0 rounded-[36px] shadow-lg pr-8 font-josefin_sans border border-slate-200"
                onClick={handleUseCurrentLocation}
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
              </button>
            </div>
          </div>
        </div>

        {confirmRegion && userRegion && (
          <div className="text-center mt-4">
            <p>Your region: {userRegion}</p>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={confirmRegionSelection}
            >
              Confirm Region
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Test;
