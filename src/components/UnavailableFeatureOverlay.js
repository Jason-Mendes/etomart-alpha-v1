import React from 'react';

const UnavailableFeatureOverlay = ({ children }) => {
  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
        <div className="bg-orange-600 text-white font-bold py-2 px-4 rounded-full shadow-lg">
          Functionality/Feature not available & still in development
        </div>
      </div>
    </div>
  );
};

export default UnavailableFeatureOverlay;