import React from "react";
import { MapPin } from 'lucide-react';

const LocationButton = ({ onClick, location }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 rounded-md bg-white px-3 py-2 text-gray-700 hover:bg-gray-100"
    >
      <MapPin size={20} className="text-orange-500" />
      <span className="font-medium">{location}</span>
    </button>
  );
};

export default LocationButton;