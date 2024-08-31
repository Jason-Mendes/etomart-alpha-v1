import React, { useState, useCallback } from "react";
import XClearButton from "../../../02_ComponentsCalled/XClearButton";

const ForgotPasswordModal = ({
  showModal,
  closeModal,
  openLoginModal,
  openSignupModal,
}) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const clearEmail = useCallback(() => {
    setEmail("");
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      // Handle password reset logic here
      console.log("Password reset requested for:", email);
    },
    [email]
  );

  const handleModalTransition = useCallback(
    (action) => {
      closeModal();
      setTimeout(action, 300);
    },
    [closeModal]
  );

  if (!showModal) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity" 
      onClick={closeModal}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative z-50 w-full max-w-lg rounded-lg bg-[#ee9613] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <h3
            className="mb-4 font-Agbalumo text-3xl leading-6 text-black"
            id="modal-title"
          >
            Forgot Password
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email Address
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
                {email && (
                  <XClearButton
                    onClick={clearEmail}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  />
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        </div>

        <div className="bg-[#ee9613] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => handleModalTransition(openLoginModal)}
          >
            Back to Login
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={() => handleModalTransition(openSignupModal)}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;