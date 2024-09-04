import React from "react";
import { MapPin } from 'lucide-react';
import { useLocation } from './LocationContext';

const LocationButton = ({ onClick }) => {
  const { location, isBrowsing } = useLocation();

  return (
    <button
      onClick={onClick}
      className="flex px-2 items-center space-x-2 rounded-2xl py-2 text-center bg-[#ffaf5e4b] transition duration-500 hover:bg-[#ffaf5e9c] active:scale-95"
    >
      <MapPin size={20} className="text-orange-500" />
      <span className="text z-50 items-center justify-center font-semibold text-[#ee9613] transition duration-500">
        {isBrowsing ? "Browsing" : (location ? location.suburb : "Select Location")}
      </span>
    </button>
  );
};

export default LocationButton;