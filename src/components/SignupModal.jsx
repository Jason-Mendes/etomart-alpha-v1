import React, { useState } from 'react';
import XClearButton from './componentsCalled/XClearButton'; // Adjust the path as necessary

// SignupModal component definition
{/* modalPropMangement is done in the LPNavBar.jsx as well*/}
const SignupModal = ({
  showModal,
  closeModal,
  openLoginModal,
  openForgotPasswordModal,
  openAuthenticatedSignupModal,
}) => {
  // State hooks for input fields
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handler functions for clearing inputs
  const clearName = () => setName('');
  const clearSurname = () => setSurname('');
  const clearEmail = () => setEmail('');
  const clearPhoneNumber = () => setPhoneNumber('');
  const clearPassword = () => setPassword('');
  const clearConfirmPassword = () => setConfirmPassword('');

  // Handler for login link click
  const handleLoginLinkClick = () => {
  closeModal(); // Close the current modal
  setTimeout(() => {
    openLoginModal(); // Open the login modal after a short delay
  }, 300); // Adjust this delay as needed
};

  // Handler for forgot password link click
  const handleForgotPasswordLinkClick = () => {
  closeModal(); // Close the current modal
  setTimeout(() => {
    openForgotPasswordModal(); // Open the login modal after a short delay
  }, 300); // Adjust this delay as needed
};
  // Handler for authenticated signup link click
  const handleAuthenticatedSignupLinkClick = () => {
  closeModal(); // Close the current modal
  setTimeout(() => {
    openAuthenticatedSignupModal(); // Open the login modal after a short delay
  }, 300); // Adjust this delay as needed
};
  return (
    <>
      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          showModal ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Modal background */}
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity ${
            showModal ? "ease-out duration-700" : "ease-in duration-700"
          }`}
          onClick={closeModal}
        />

        {/* Modal content */}
        <div
          id="Orange_container"
          className={`bg-[#ee9613] rounded-lg m-6 p-6 z-50 fixed bottom-6 top-6 left-1/2 transform -translate-x-1/2 transition-all flex flex-col ${
            showModal ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ width: "90%", maxHeight: "90vh", overflow: "auto" }}
        >
          {/* Close button */}
          <div className="flex justify-end">
            <button
              className="text-[#000000] transition-all duration-300 ease-in-out hover:text-white"
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

          <div id="Image_and_Form_Container" className="flex flex-col md:flex-row items-start justify-center flex-grow">
            {/* Left side: Image */}
            <div className="flex flex-col justify-center md:w-1/2 order-2 md:order-1 mb-8 md:mb-0 w-full">
              <h2 className="text-center text-[#000000] text-2xl md:text-3xl lg:text-4xl font-Agbalumo font-bold m-6">
                Let's Have a Feast!
              </h2>
              <div className="w-full bg-[#ffffff] rounded-lg p-4 pt-8 z-50">
                <div className="relative">
                  <img
                    src="/images/Mais_rdedeverse.jpg"
                    alt="img"
                    className="w-full md:max-w-md lg:max-w-lg xl:max-w-xl max-h-[70vh] min-h-[50vh] rounded-r-2xl object-cover"
                    style={{ maxHeight: "70vh", minHeight: "70vh" }}
                  />
                </div>
              </div>
            </div>

            {/* Right side: Form */}
            <div className="flex flex-col justify-center md:ml-16 w-full md:w-1/2 order-1 md:order-2">
              <h2 className="text-center text-[#000000] text-2xl md:text-4xl lg:text-5xl font-Agbalumo font-bold mb-4">
                Sign Up
              </h2>
              <span className="text-center font-josefin_sans text-xl md:text-2xl font-semibold text-white mb-4">
                Please enter your details
              </span>

              {/* Name input */}
              <div className="py-4 relative">
                <span className="text-black text-lg md:text-2xl font-Agbalumo font-semibold mb-2">
                  Name
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 pr-10"
                />
                {name && <XClearButton onClick={clearName} className="text-gray-500" />}
              </div>

              {/* Surname input */}
              <div className="py-4 relative">
                <span className="text-black text-lg md:text-2xl font-Agbalumo font-semibold mb-2">
                  Surname
                </span>
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 pr-10"
                />
                {surname && <XClearButton onClick={clearSurname} className="text-gray-500" />}
              </div>

              {/* Email input */}
              <div className="py-4 relative">
                <span className="text-black text-lg md:text-2xl font-Agbalumo font-semibold mb-2">
                  Email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 pr-10"
                />
                {email && <XClearButton onClick={clearEmail} className="text-gray-500" />}
              </div>

              {/* Phone Number input */}
              <div className="py-4 relative">
                <span className="text-black text-lg md:text-2xl font-Agbalumo font-semibold mb-2">
                  Phone Number
                </span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 pr-10"
                />
                {phoneNumber && <XClearButton onClick={clearPhoneNumber} className="text-gray-500" />}
              </div>

              {/* Password input */}
              <div className="py-4 relative">
                <span className="font-Agbalumo text-lg md:text-xl font-semibold mb-2">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 pr-10"
                />
                {password && <XClearButton onClick={clearPassword} className="text-gray-500" />}
              </div>

              {/* Confirm Password input */}
              <div className="py-4 relative">
                <span className="font-Agbalumo text-lg md:text-xl font-semibold mb-2">
                  Re-Type Password
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 pr-10"
                />
                {confirmPassword && <XClearButton onClick={clearConfirmPassword} className="text-gray-500" />}
              </div>

              {/* Remember me and forgot password */}
              <div className="flex justify-between w-full py-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    className="h-5 w-5 mr-2"
                  />
                  <span className="font-semibold text-lg">
                    Remember for 30 days
                  </span>
                </div>
                <button
                  className="text-white transition-all duration-300 ease-in-out hover:text-black font-semibold text-lg underline"
                  onClick={handleForgotPasswordLinkClick}
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign Up buttons */}
              <button className="w-full bg-black text-white p-2 rounded-lg mb-6 hover:bg-white transition-all duration-300 ease-in-out hover:text-black "      onClick={handleAuthenticatedSignupLinkClick}>
         
               Sign Up
              </button>
              <button className="w-full  bg-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black transition-all duration-300 ease-in-out hover:text-white">
                <img
                  src="/images/google.svg"
                  alt="Google Logo"
                  className="w-6 h-6 inline mr-2"
                />
                Sign up with Google
              </button>
              <button className="w-full  bg-white border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black transition-all duration-300 ease-in-out hover:text-white">
                <img
                  src="/images/apple.svg"
                  alt="iCloud"
                  className="w-6 h-6 inline mr-4"
                />
                Sign up with iCloud
              </button>

              {/* Login link */}
              <div className="text-center text-black">
                <span className="text-white font-semibold text-lg mr-2">
                  Already have an account?
                </span>
                <button
                  className="text-black transition-all duration-300 ease-in-out hover:text-white font-semibold text-lg underline"
                  onClick={handleLoginLinkClick}
                >
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
