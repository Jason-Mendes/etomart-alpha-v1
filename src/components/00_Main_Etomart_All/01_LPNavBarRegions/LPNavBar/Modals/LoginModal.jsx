import React, { useState, useCallback } from "react";
import XClearButton from "../../../ComponentsCalled/XClearButton";

const LoginModal = ({
  showModal,
  closeModal,
  openSignupModal,
  openForgotPasswordModal,
  openAuthenticatedLoginModal,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const clearInput = useCallback((field) => {
    setFormData((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      openAuthenticatedLoginModal();
      // Add your login logic here
    },
    [openAuthenticatedLoginModal]
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
    >
      <div
        className="relative z-50 w-full max-w-lg rounded-lg bg-[#ee9613] shadow-xl"
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute right-0 top-0 pr-4 pt-4">
          <button
            type="button"
            className="rounded-md bg-transparent text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={closeModal}
          >
            <span className="sr-only">Close</span>
            <svg
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <h3
            className="mb-4 font-Agbalumo text-3xl leading-6 text-black"
            id="modal-title"
          >
            Login / Sign Up
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {formData.email && (
                  <XClearButton
                    onClick={() => clearInput("email")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  />
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black"
              >
                Password
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                {formData.password && (
                  <XClearButton
                    onClick={() => clearInput("password")}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-black"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => handleModalTransition(openForgotPasswordModal)}
                  className="font-medium text-white hover:text-black"
                >
                  Forgot your password?
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#ee9613] px-2 text-black">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm transition-colors duration-300 hover:bg-gray-50 md:justify-start"
                >
                  <img
                    src="/images/google.svg"
                    alt="Google Logo"
                    className="size-5"
                  />
                  <span className="sr-only md:not-sr-only md:inline-block md:px-2">
                    Sign in with Google
                  </span>
                </button>
              </div>

              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm transition-colors duration-300 hover:bg-gray-50 md:justify-start"
                >
                  <img
                    src="/images/apple.svg"
                    alt="Apple Logo"
                    className="size-5"
                  />
                  <span className="sr-only md:not-sr-only md:inline-block md:px-2">
                    Sign in with Apple
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#ee9613] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <p className="mt-2 text-center text-sm text-black">
            Don't have an account yet?{" "}
            <button
              onClick={() => handleModalTransition(openSignupModal)}
              className="font-medium text-white transition-colors duration-300 hover:text-black"
            >
              Sign up for free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;