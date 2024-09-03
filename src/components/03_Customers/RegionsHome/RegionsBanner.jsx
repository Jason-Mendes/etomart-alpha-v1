import React, { useEffect, useCallback } from "react";

const RegionsBanner = ({ isVisible, imageSrc, closeBanner, goBack }) => {
  const handleClose = useCallback(() => {
    closeBanner();
    // Check if the URL has changed and trigger navigation if necessary
    const currentPath = window.location.pathname;
    if (currentPath.startsWith('/LP/Region/') && currentPath !== '/LP/Regions') {
      window.history.pushState(null, '', '/LP/Regions');
    }
  }, [closeBanner]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(handleClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, handleClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 ease-in-out">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-lg shadow-xl">
        <button
          className="absolute left-4 top-4 text-orange-500 transition-colors duration-300 hover:text-black"
          onClick={goBack}
          aria-label="Go back"
        >
          <svg
            className="size-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <button
          className="absolute right-4 top-4 text-orange-500 transition-colors duration-300 hover:text-black"
          onClick={handleClose}
          aria-label="Close banner"
        >
          <svg
            className="size-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img
          src={imageSrc}
          alt="Region Banner"
          className="h-auto max-h-[85vh] w-full object-cover"
        />
      </div>
    </div>
  );
};

export default RegionsBanner;
