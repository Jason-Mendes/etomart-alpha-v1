import React from 'react';

const LoginModal = ({ showModal, closeModal, openSignupModal,  openForgotPasswordModal, openAuthenticatedLoginModal }) => {
  const handleSignupLinkClick = () => {
    openSignupModal();
  };

  const handleForgotPasswordLinkClick = () => {
    openForgotPasswordModal();
  };
  const handleAuthenticatedLoginLinkClick = () => {
    openAuthenticatedLoginModal();
  };


  return (
    <>
      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Modal background */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity ${
            showModal ? 'ease-out duration-700' : 'ease-in duration-700'
          }`}
          onClick={closeModal}
        />

        {/* Modal content */}
        <div
          id="Orange_container"
          className={`bg-[#ee9613] rounded-lg m-6 p-6 z-50 fixed bottom-6 top-6 left-1/2 transform -translate-x-1/2 transition-all flex flex-col ${
            showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ width: '90%', maxHeight: '90vh', overflow: 'auto' }}
        >
          {/* Your content goes here */}

          <div className="flex justify-end">
            <button
              className="text-[#000000] hover:text-white"
              onClick={closeModal}
            >
              <svg
                className="mb-4 h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div id="Image_and_Form_Container" className="flex items-start justify-center flex-grow">
            {/* Added flex-grow */}
            {/* Login/Sign Up Form */}

            {/*<!-- left side -->*/}
            <div className="flex flex-col justify-center ">
              <h2 className="flex item-center justify-center mr-8 text-center text-[#000000] md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl text-black-900 font-Agbalumo font-bold mb-4 ">
                Login / Sign Up
              </h2>
              <div className={`w-10/12 bg-[#ffffff] rounded-lg p-4 pt-8 m-8 z-50`}>
                <div className="relative">
                  <img
                    src="/images/Mais_reverse.jpg"
                    alt="img"
                    className="w-full  md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl max-h-[70vh] min-h-[50vh] rounded-r-2xl md:block object-cover" // Increased max-h and min-h
                    style={{ maxHeight: '70vh', minHeight: '70vh' }} // Increased max-height and min-height
                  />
                </div>
              </div>
            </div>
            {/*<!-- Right side -->*/}
            <div className="flex flex-col justify-center mr-16 w-1/2 "> {/* Adjusted width and added padding */}
              <h2 className="flex item-center justify-center text-center text-[#000000] md:text-3xl lg:text-4xl xl:text-4xl 2xl:text-5xl text-black-900 font-Agbalumo font-bold mb-6">
                Welcome Back!
              </h2>
              <span className="flex item-center justify-center text-center font-josefin_sans text-2xl font-semibold text-white mb-4">
                Please enter your details
              </span>

              <div className="py-4">
                <span className="flex text-black text-2xl font-Agbalumo font-semibold mb-2">
                  Email
                </span>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="email"
                  id="email"
                />
              </div>
              <div className="py-4">
                <span className="flex  font-Agbalumo text-xl font-semibold mb-2">
                  Password
                </span>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                />
              </div>
              <div className="flex justify-between w-full py-4">
                <div className="mr-16">
                  <input
                    type="checkbox"
                    name="ch"
                    id="ch"
                    className="h-5 w-6 mr-2"
                  />
                  <span className="font-semibold text-lg">
                    Remember for 30 days
                  </span>
                </div>
                <div>
                <button
                  onClick={handleForgotPasswordLinkClick}
                  className="text-center text-white hover:text-black font-semibold text-lg underline"
                >
                   Forgot password?
                </button>
                   
                </div>
              </div>
              <button onClick={handleAuthenticatedLoginLinkClick} className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">
                Log in
              </button>
              <button className="w-full border bg-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white">
                <img
                  src="/images/google.svg"
                  alt="Google Logo"
                  className="w-6 h-6 inline mr-2"
                />
                Log in with Google
              </button>
              <button className="w-full border bg-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white">
                <img
                  src="/images/apple.svg"
                  alt="iCloud"
                  className="w-6 h-6 inline mr-4"
                />
                Log in with iCloud
              </button>

              <div className="text-center text-black">
                <span className="text-center textwhite font-semibold text-lg mr-2">
                  Don't have an account?
                </span>
                <button
                  onClick={handleSignupLinkClick}
                  className="text-center text-white hover:text-black font-semibold text-lg underline"
                >
                  Sign up for free
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;