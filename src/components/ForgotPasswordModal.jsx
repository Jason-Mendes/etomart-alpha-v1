import React, { useState } from 'react';
import XClearButton from './componentsCalled/XClearButton';

// ForgotPasswordModal component definition
{/* modalPropMangement is done in the LPNavBar.jsx as well*/}
const ForgotPasswordModal = ({ showModal, closeModal, openLoginModal, openSignupModal }) => {
  const [email, setEmail] = useState('');

  const clearEmail = () => {
    setEmail('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Password reset requested for:', email);
  };

  const handleLoginLinkClick = () => {
    closeModal(); // Close the current modal
    setTimeout(() => {
      openLoginModal(); // Open the login modal after a short delay
    }, 300); // Adjust this delay as needed
  };

  const handleSignupLinkClick = () => {
    closeModal(); // Close the current modal
    setTimeout(() => {
      openSignupModal(); // Open the signup modal after a short delay
    }, 300); // Adjust this delay as needed
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity ${
          showModal ? 'ease-out duration-700' : 'ease-in duration-700'
        }`}
        onClick={closeModal}
      />
      <div
        id="Orange_container"
        className={`bg-[#ee9613] rounded-lg m-6 p-6 z-50 fixed bottom-6 top-6 left-1/2 transform -translate-x-1/2 transition-all flex flex-col ${
          showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ width: '40%', maxHeight: '45vh', overflow: 'auto' }}
      >
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

        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-Agbalumo font-bold mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="relative w-full mb-4">
            <label
              htmlFor="email"
              className="block text-black text-lg md:text-xl font-Agbalumo font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 pr-10"
              required
            />
            {email && <XClearButton onClick={clearEmail} />}
          </div>

          <button
  type="submit"
  className="w-full bg-black text-white p-2 rounded-lg mb-4 hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
>
  Send Reset Link
</button>

        </form>

        <div className="text-center text-black">
          <span className="text-white font-semibold text-lg mr-2">
            Remembered your password?
          </span>
          <button
            className="text-black transition-all duration-300 ease-in-out hover:text-white font-semibold text-lg underline"
            onClick={handleLoginLinkClick}
          >
            Log in Instead
          </button>
        </div>
        <div className="text-center text-black mt-4">
          <span className="text-white font-semibold text-lg mr-2">
            Need an account?
          </span>
          <button
            onClick={handleSignupLinkClick}
            className="text-black transition-all duration-300 ease-in-out hover:text-white font-semibold text-lg underline"
          >
            Sign up for free
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;