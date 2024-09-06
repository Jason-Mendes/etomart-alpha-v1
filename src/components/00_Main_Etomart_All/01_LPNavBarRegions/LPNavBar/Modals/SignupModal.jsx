import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import XClearButton from "../../../ComponentsCalled/XClearButton";
import { ChevronDownIcon, ChevronUpIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

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
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    namibianId: "",
    rememberMe: false,
  });

  const [showOptionalFields, setShowOptionalFields] = useState({
    email: false,
    namibianId: false,
  });

  const [autoOpenedFields, setAutoOpenedFields] = useState({
    email: false,
    namibianId: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Check for password mismatch
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordMismatch(false);
      setErrors((prev) => ({ ...prev, confirmPassword: null }));
    }
    // Auto-open the next optional field only if it hasn't been toggled before
    if (name === "phoneNumber" && value && !autoOpenedFields.email) {
      setShowOptionalFields((prev) => ({ ...prev, email: true }));
      setAutoOpenedFields((prev) => ({ ...prev, email: true }));
    } else if (name === "confirmPassword" && value && !autoOpenedFields.namibianId) {
      setShowOptionalFields((prev) => ({ ...prev, namibianId: true }));
      setAutoOpenedFields((prev) => ({ ...prev, namibianId: true }));
    }
  }, [autoOpenedFields]);

  const clearInput = useCallback((field) => {
    setFormData((prev) => ({ ...prev, [field]: "" }));
  }, []);

  const toggleOptionalField = useCallback((field) => {
    setShowOptionalFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
    // Reset the auto-opened state when manually toggled
    setAutoOpenedFields((prev) => ({
      ...prev,
      [field]: false,
    }));
  }, []);

  const togglePasswordVisibility = useCallback((field) => {
    if (field === 'password') {
      setShowPassword((prev) => !prev);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword((prev) => !prev);
    }
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    // Validate required fields
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.surname) newErrors.surname = "Surname is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Validate optional fields if they're filled
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (formData.namibianId && !/^\d{11}$/.test(formData.namibianId)) {
      newErrors.namibianId = "Invalid Namibian ID (must be 11 digits)";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      setPasswordMismatch(true);
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (validateForm()) {
        if (formData.password === formData.confirmPassword) {
          openAuthenticatedSignupModal();
          // Add your signup logic here
        }
      }
    },
    [validateForm, formData.password, formData.confirmPassword, openAuthenticatedSignupModal]
  );

  const handleModalTransition = useCallback(
    (action) => {
      closeModal();
      setTimeout(action, 300);
    },
    [closeModal]
  );

  if (!showModal) return null;

  const optionalFieldVariants = {
    hidden: { opacity: 0, height: 0, overflow: "hidden" },
    visible: { opacity: 1, height: "auto", overflow: "visible" },
  };

  const renderPasswordField = (field) => {
    const isVisible = field === 'password' ? showPassword : showConfirmPassword;
    return (
      <div key={field}>
        <label
          htmlFor={field}
          className="block text-sm font-medium capitalize text-black"
        >
          {field === "confirmPassword" ? "Confirm Password" : field}
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            type={isVisible ? "text" : "password"}
            name={field}
            id={field}
            className={`block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors[field] || (field === 'confirmPassword' && passwordMismatch) ? "border-red-500" : ""
            }`}
            value={formData[field]}
            onChange={handleInputChange}
            required
          />
          <button
            type="button"
            onClick={() => togglePasswordVisibility(field)}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            {isVisible ? (
              <EyeSlashIcon className="size-5 text-gray-400" aria-hidden="true" />
            ) : (
              <EyeIcon className="size-5 text-gray-400" aria-hidden="true" />
            )}
          </button>
        </div>
       <div className="flex">
         {(errors[field] || (field === 'confirmPassword' && passwordMismatch)) && (
           <p className="mt-2 px-2 text-sm text-red-600 bg-white">
             {errors[field] || "Passwords do not match"}
           </p>
         )}
       </div>
      </div>
    );
  };

  const renderOptionalField = (field, label) => (
    <div>
      <div
        className="flex cursor-pointer items-center"
        onClick={() => toggleOptionalField(field)}
      >
        <label
          htmlFor={field}
          className="block text-sm font-medium text-black"
        >
          {label}
        </label>
        {showOptionalFields[field] ? (
          <ChevronUpIcon className="ml-2 size-5" />
        ) : (
          <ChevronDownIcon className="ml-2 size-5" />
        )}
      </div>
      <AnimatePresence>
        {showOptionalFields[field] && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={optionalFieldVariants}
            transition={{ duration: 0.3 }}
          >
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                id={field}
                className={`block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                  errors[field] ? "border-red-500" : ""
                }`}
                value={formData[field]}
                onChange={handleInputChange}
              />
              {formData[field] && (
                <XClearButton
                  onClick={() => clearInput(field)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                />
              )}
            </div>
            {errors[field] && (
              <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

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
        {/* Modal content */}
        <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <h3
            className="mb-4 font-Agbalumo text-3xl leading-6 text-black"
            id="modal-title"
          >
            Sign Up
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Required fields */}
            {["name", "surname", "phoneNumber"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-sm font-medium capitalize text-black"
                >
                  {field}
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type={field === "phoneNumber" ? "tel" : "text"}
                    name={field}
                    id={field}
                    className={`block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                      errors[field] ? "border-red-500" : ""
                    }`}
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
                {errors[field] && (
                  <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
                )}
              </div>
            ))}

            {/* Email field (optional but placed after phone number) */}
            {renderOptionalField("email", "Email (Optional)")}

            {/* Password fields with visibility toggles */}
            {renderPasswordField("password")}
            {renderPasswordField("confirmPassword")}

            {/* Optional Namibian ID field */}
            {renderOptionalField("namibianId", "Namibian ID (Optional)")}

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