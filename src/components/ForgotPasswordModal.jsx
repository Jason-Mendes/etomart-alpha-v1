import React, { useState, useCallback } from "react";

import XClearButton from "./componentsCalled/XClearButton";

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
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={closeModal}
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-[#ee9613] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-[#ee9613] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  className="text-3xl leading-6 font-Agbalumo text-black mb-4"
                  id="modal-title"
                >
                  Forgot Password
                </h3>
                <div className="mt-2">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-black"
                      >
                        Email Address
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                          placeholder="you@example.com"
                          value={email}
                          onChange={handleEmailChange}
                          required
                        />
                        {email && (
                          <XClearButton
                            onClick={clearEmail}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Send Reset Link
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#ee9613] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => handleModalTransition(openLoginModal)}
            >
              Back to Login
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => handleModalTransition(openSignupModal)}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
