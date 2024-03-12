import React, { useEffect } from 'react';
import { Button, Img, List, Text } from '../components';
import { Link } from 'react-router-dom';

function LPNavBar() {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('lpnavbar');
      const scrollPosition = window.scrollY;

      if (scrollPosition > 0) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
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
  `}
</style>
      <nav id="lpnavbar" className="bg-slate-100 text-orange-500 px-4">
      {/* <div className="-mt-2 pt-1 flex items-center justify-between -py-4 sm:mx-0 sm:mb-0 md:px-4"> */}
      {/* this or that ^ /*/}
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex items-center mt-6 mb-4">
            <h1 className="-mt-2 text-3xl font-shrikhand text-[#df7000] whitespace-nowrap">
              <Link to="/LandingPage">Etomart</Link>
            </h1>
          </div>
          <Img
            className="h-[40px] my-0 ml-0 mr-0 md:mr-0 lg:mr-0"
            src="images/img_group36.svg"
            alt="groupThirtySix"
          />
        </div>
      </nav>
    </div>
  );
}

export default LPNavBar;