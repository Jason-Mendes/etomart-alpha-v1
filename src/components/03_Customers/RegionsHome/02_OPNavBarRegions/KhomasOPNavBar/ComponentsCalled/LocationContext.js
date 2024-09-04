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
    localStorage.setItem('isBrowsing', isBrowsing);
  }, [location, isBrowsing]);

  const clearLocation = () => {
    setLocation(null);
    localStorage.removeItem('userLocation');
  };

  const toggleBrowsingMode = () => {
    setIsBrowsing(prev => !prev);
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, clearLocation, isBrowsing, setIsBrowsing, toggleBrowsingMode }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);