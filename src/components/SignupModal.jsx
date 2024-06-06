import React from 'react';

// SignupModal component definition
const SignupModal = ({ showModal, closeModal, openLoginModal, openForgotPasswordModal, openAuthenticatedSignupModal }) => {
  // Handler for login link click
  const handleLoginLinkClick = () => {
    openLoginModal();
  };

  // Handler for forgot password link click
  const handleForgotPasswordLinkClick = () => {
    openForgotPasswordModal();
  };

  // Handler for authenticated signup link click
  const handleAuthenticatedSignupLinkClick = () => {
    openAuthenticatedSignupModal();
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
          {/* Close button */}
          <div className="flex justify-end">
            <button className="text-[#000000] hover:text-white" onClick={closeModal}>
              <svg className="mb-4 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div id="Image_and_Form_Container" className="flex flex-col md:flex-row items-center justify-center flex-grow">
            {/* Left side: Image */}
            <div className="flex flex-col justify-center mb-8 md:mb-0">
              <h2 className="text-center text-[#000000] text-2xl md:text-4xl lg:text-5xl font-Agbalumo font-bold mb-4">Sign Up</h2>
              <div className="w-full md:w-10/12 bg-[#ffffff] rounded-lg p-4 pt-8 z-50">
                <div className="relative">
                  <img
                    src="/images/Mais_rdedeverse.jpg"
                    alt="img"
                    className="w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl max-h-[70vh] min-h-[50vh] rounded-r-2xl object-cover"
                    style={{ maxHeight: '70vh', minHeight: '70vh' }}
                  />
                </div>
              </div>
            </div>

            {/* Right side: Form */}
            <div className="flex flex-col justify-center md:ml-16 w-full md:w-1/2">
              <h2 className="text-center text-[#000000] text-2xl md:text-3xl lg:text-4xl font-Agbalumo font-bold mb-6">Let's Have a Feast!</h2>
              <span className="text-center font-josefin_sans text-xl md:text-2xl font-semibold text-white mb-4">Please enter your details</span>

              {/* Name input */}
              <div className="py-4">
                <span className="text-black text-lg md:text-2xl font-Agbalumo font-semibold mb-2">Name</span>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="name"
                  id="name"
                />
              </div>

              {/* Surname input */}
              <div className="py-4">
                <span className="text-black text-lg md:text-2xl font-Agbalumo font-semibold mb-2">Surname</span>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="surname"
                  id="surname"
                />
              </div>

              {/* Phone number input */}
              <div className="py-4">
                <span className="text-black text-lg md:text-2xl font-Agbalumo font-semibold mb-2">Phone Number</span>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="phoneNumber"
                  id="phoneNumber"
                />
              </div>

              {/* Email input */}
              <div className="py-4">
                <span className="text-black text-lg md:text-2xl font-Agbalumo font-semibold mb-2">Email</span>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                  name="email"
                  id="email"
                />
              </div>

              {/* Password input */}
              <div className="py-4">
                <span className="font-Agbalumo text-lg md:text-xl font-semibold mb-2">Password</span>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                />
              </div>

              {/* Confirm password input */}
              <div className="py-4">
                <span className="font-Agbalumo text-lg md:text-xl font-semibold mb-2">Re-Type Password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                />
              </div>

              {/* Remember me and forgot password */}
              <div className="flex justify-between w-full py-4">
                <div className="flex items-center">
                  <input type="checkbox" name="rememberMe" id="rememberMe" className="h-5 w-5 mr-2" />
                  <span className="font-semibold text-lg">Remember for 30 days</span>
                </div>
                <button onClick={handleForgotPasswordLinkClick} className="text-white hover:text-black font-semibold text-lg underline">
                  Forgot password?
                </button>
              </div>

              {/* Signup buttons */}
              <button onClick={handleAuthenticatedSignupLinkClick} className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white hover:text-black hover:border hover:border-gray-300">
                Sign Up
              </button>
              <button className="w-full border bg-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white">
                <img src="/images/google.svg" alt="Google Logo" className="w-6 h-6 inline mr-2" />
                Sign up with Google
              </button>
              <button className="w-full border bg-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white">
                <img src="/images/apple.svg" alt="iCloud" className="w-6 h-6 inline mr-4" />
                Sign up with iCloud
              </button>

              {/* Login link */}
              <div className="text-center text-black">
                <span className="text-white font-semibold text-lg mr-2">Already have an account?</span>
                <button onClick={handleLoginLinkClick} className="text-white hover:text-black font-semibold text-lg underline">
                  Log in Instead
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupModal;
