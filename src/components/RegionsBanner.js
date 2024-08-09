import React, { useEffect, useCallback } from "react";

const RegionsBanner = ({ isVisible, imageSrc, closeBanner }) => {
  const handleClose = useCallback(() => {
    closeBanner();
  }, [closeBanner]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(handleClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, handleClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-700 ease-in-out">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onClick={handleClose}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl">
        <button
          className="absolute top-4 right-4 text-white hover:text-orange-500 transition-colors duration-300"
          onClick={handleClose}
          aria-label="Close banner"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          src={imageSrc}
          alt="Region Banner"
          className="w-full h-auto max-h-[85vh] object-cover"
        />
      </div>
    </div>
  );
};

export default RegionsBanner;