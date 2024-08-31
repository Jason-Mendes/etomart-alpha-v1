import React, { useState, useCallback } from "react";
import XClearButton from "./02_ComponentsCalled/XClearButton";

const SignupModal = ({
  showModal,
  closeModal,
  openLoginModal,
  openForgotPasswordModal,
  openAuthenticatedSignupModal,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
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
      openAuthenticatedSignupModal();
      // Add your signup logic here
    },
    [openAuthenticatedSignupModal]
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
            Sign Up
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields remain the same */}
            {["name", "surname", "email", "phoneNumber", "password", "confirmPassword"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium capitalize text-black"
                >
                  {field === "confirmPassword" ? "Confirm Password" : field}
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type={
                      field.includes("password")
                        ? "password"
                        : field === "email"
                        ? "email"
                        : "text"
                    }
                    name={field}
                    id={field}
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={formData[field]}
                    onChange={handleInputChange}
                    required
                  />
                  {formData[field] && (
                    <XClearButton
                      onClick={() => clearInput(field)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    />
                  )}
                </div>
              </div>
            ))}

            {/* Remember me and Forgot password section */}
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
                  Remember for 30 days
                </label>
              </div>

              <div className="text-sm">
                <button
                  type="button"
                  onClick={() => handleModalTransition(openForgotPasswordModal)}
                  className="font-medium text-white transition-colors duration-300 hover:text-black"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {/* Sign Up button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Social login section */}
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
                    Sign up with Google
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
                    Sign up with Apple
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Login link */}
        <div className="bg-[#ee9613] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <p className="mt-2 text-center text-sm text-black">
            Already have an account?{" "}
            <button
              onClick={() => handleModalTransition(openLoginModal)}
              className="font-medium text-white transition-colors duration-300 hover:text-black"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;