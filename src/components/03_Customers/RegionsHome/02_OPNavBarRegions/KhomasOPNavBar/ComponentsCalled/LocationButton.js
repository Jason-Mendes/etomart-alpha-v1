import React from "react";
import { MapPin } from 'lucide-react';

const LocationButton = ({ onClick, location }) => {
  return (
    <button
      onClick={onClick}
      className="flex px-2 items-center space-x-2 rounded-md bg-white py-2 text-center text-[#000000] hover:bg-[#ffaf5e4b]"
    >
      <MapPin size={20} className="text-orange-500" />
      <span className="font-medium">{location}</span>
    </button>
  );
};

export default LocationButton;