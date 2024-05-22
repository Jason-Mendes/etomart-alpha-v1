import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegionsBanner = ({ isVisible, imageSrc, closeBanner, nextPage }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        closeBanner();
        navigate(nextPage);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, closeBanner, navigate, nextPage]);

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity ${
          isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Banner background */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity ${
            isVisible ? 'ease-out duration-700' : 'ease-in duration-700'
          }`}
          onClick={closeBanner}
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 1, // Adjust the opacity of the background image here
          }}
        >
          {/* This overlay div is to make sure the background image has a certain opacity */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Banner content */}
        <div
          className={` rounded-lg p-0 z-50 fixed top-20 left-1/2 transform -translate-x-1/2 transition-all ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ width: '1200px', height: '520px', maxHeight: '85vh', overflow: 'auto' }}
        >
          <div className="flex justify-end">
            <button className="text-[#ffffff] hover:text-orange-500" onClick={closeBanner}>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="relative">
            <img
              src={imageSrc}
              alt="Region Banner"
              className="object-cover rounded-2xl"
              style={{ width: '1200px', height: '450px', maxHeight: '85vh', overflow: 'auto' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegionsBanner;
