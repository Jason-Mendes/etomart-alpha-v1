import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginSignupModal from './LoginSignupModal';

const LPNavBar = () => {
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsNavbarSticky(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <style>
        {`
          .sticky {
            position: fixed;
            z-index: 100;
            width: 100%;
          }

          .flex-container {
            display: flex;
            align-items: center;
            gap: 6px; /* Adjust the gap as needed */
          }
        `}
      </style>

      <nav
  id="lpnavbar"
  className={`bg-[#f9f9f9] px-4 ${isNavbarSticky ? 'sticky' : ''}`}
>

        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex items-center mt-6 mb-4">
            <h1 className="-mt-2 text-3xl font-shrikhand text-[#ee9613] whitespace-nowrap">
              <Link to="/LandingPage">Etomart</Link>
            </h1>
          </div>

          {/* Buttons container */}
          <div className="flex-container">
            {/* Render the modal component */}
            <LoginSignupModal>
              <button className=" hover:bg-black hover:text-white font-Agbalumo h-[35px] px-4  bg-[#ee9613] text-Black rounded">
                Login
              </button>
            </LoginSignupModal>
            <LoginSignupModal>
              <button className=" hover:bg-black hover:text-white  font-Agbalumo h-[35px] px-4  bg-[#ee9613] text-Black rounded">
                Sign Up
              </button>
            </LoginSignupModal>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LPNavBar;
