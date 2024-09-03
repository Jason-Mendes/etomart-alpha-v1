
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