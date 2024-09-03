
In the following code, why does clicking the location button when its in browsing mode not bring back the locationmodal, it does nothing, and when I go back to one of the ClearLocationOnSpecificRoutes routes the selected browsing mode isnt cleared please analyse the following pasted and uploaded code and provid eme with the fix thank you:

import React, { createContext, useState, useContext, useEffect } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    const savedLocation = localStorage.getItem('userLocation');
    return savedLocation ? JSON.parse(savedLocation) : null;
  });

  const [isBrowsing, setIsBrowsing] = useState(() => {
    return localStorage.getItem('isBrowsing') === 'true';
  });

  useEffect(() => {
    if (location) {
      localStorage.setItem('userLocation', JSON.stringify(location));
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem('isBrowsing', isBrowsing);
  }, [isBrowsing]);

  const clearLocation = () => {
    setLocation(null);
    setIsBrowsing(false);
    localStorage.removeItem('userLocation');
    localStorage.removeItem('isBrowsing');
  };

  const setBrowsingMode = (value) => {
    setIsBrowsing(value);
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, clearLocation, isBrowsing, setBrowsingMode }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
import React from "react";
import { MapPin } from 'lucide-react';

const LocationButton = ({ onClick, location }) => {
  return (
    <button
      onClick={onClick}
      className="flex px-2 items-center space-x-2 rounded-2xl py-2 text-center  bg-[#ffaf5e4b] transition duration-500 hover:bg-[#ffaf5e9c] active:scale-95"
    >
      <MapPin size={20} className="text-orange-500" />
      <span className=" text z-50  items-center justify-center  font-semibold text-[#ee9613] transition duration-500">{location}</span>
    </button>
  );
};

export default LocationButton;
and note this is correct "  const handleLocationClick = useCallback(() => {     if (!isBrowsing) {       setState(prevState => ({ ...prevState, showLocationModal: true }));     }   }, [isBrowsing]);" but when the user themselves click on the location button, this should be overwritten or ignored or stoped whatever works best in terms of project development which then allows weth the user clcicks the modal should show up ChartNoAxesGanttIcon.