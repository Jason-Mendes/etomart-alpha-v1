import React, { createContext, useState, useContext, useEffect } from 'react';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    const savedLocation = localStorage.getItem('userLocation');
    return savedLocation ? JSON.parse(savedLocation) : null;
  });

  useEffect(() => {
    if (location) {
      localStorage.setItem('userLocation', JSON.stringify(location));
    }
  }, [location]);

  const clearLocation = () => {
    setLocation(null);
    localStorage.removeItem('userLocation');
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, clearLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);