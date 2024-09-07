import React, { useCallback, useState } from "react";
import { Formik, Form, Field } from "formik";
import { useAuth } from "../../../../../Authentication/context/AuthContext";
import { loginSchema } from "../../../../../Authentication/validation/authValidationSchemas";
import XClearButton from "../../../ComponentsCalled/XClearButton";
import { ChevronDownIcon, ChevronUpIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { AnimatePresence, motion } from "framer-motion";

const LoginModal = ({
  showModal,
  closeModal,
  openSignupModal,
  openForgotPasswordModal,
  openAuthenticatedLoginModal,
}) => {
  const { login, error } = useAuth();
  const [showEmailField, setShowEmailField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = useCallback(
    async (values, { setSubmitting }) => {
      try {
        // Update to use phone number for login
        await login(values.phoneNumber, values.password, values.email);
        openAuthenticatedLoginModal();
      } catch (error) {
        console.error("Login error:", error);
      } finally {
        setSubmitting(false);
      }
    },
    [login, openAuthenticatedLoginModal]
  );

  const handleModalTransition = useCallback(
    (action) => {
      closeModal();
      setTimeout(action, 300);
    },
    [closeModal]
  );

  const toggleEmailField = () => setShowEmailField(!showEmailField);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  if (!showModal) return null;

  const optionalFieldVariants = {
    hidden: { opacity: 0, height: 0, overflow: "hidden" },
    visible: { opacity: 1, height: "auto", overflow: "visible" },
  };

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
        {/* Close button */}
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
            Login
          </h3>
          <Formik
            initialValues={{ phoneNumber: "", email: "", password: "", rememberMe: false }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting, values, setFieldValue }) => (
              <Form className="space-y-6">
                {/* Phone Number Field */}
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-black"
                  >
                    Phone Number
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <Field
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      className={`block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                        errors.phoneNumber && touched.phoneNumber ? "border-red-500" : ""
                      }`}
                      placeholder="+1234567890"
                    />
                    {values.phoneNumber && (
                      <XClearButton
                        onClick={() => setFieldValue("phoneNumber", "")}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      />
                    )}
                  </div>
                  {errors.phoneNumber && touched.phoneNumber && (
                    <div className="mt-1 text-sm text-red-500">{errors.phoneNumber}</div>
                  )}
                </div>

                {/* Optional Email Field */}
                <div>
                  <div
                    className="flex cursor-pointer items-center"
                    onClick={toggleEmailField}
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-black"
                    >
                      Email (Optional)
                    </label>
                    {showEmailField ? (
                      <ChevronUpIcon className="ml-2 size-5" />
                    ) : (
                      <ChevronDownIcon className="ml-2 size-5" />
                    )}
                  </div>
                  <AnimatePresence>
                    {showEmailField && (
                      <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={optionalFieldVariants}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="relative mt-1 rounded-md shadow-sm">
                          <Field
                            type="email"
                            name="email"
                            id="email"
                            className={`block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                              errors.email && touched.email ? "border-red-500" : ""
                            }`}
                            placeholder="you@example.com"
                          />
                          {values.email && (
                            <XClearButton
                              onClick={() => setFieldValue("email", "")}
                              className="absolute inset-y-0 right-0 flex items-center pr-3"
                            />
                          )}
                        </div>
                        {errors.email && touched.email && (
                          <div className="mt-1 text-sm text-red-500">{errors.email}</div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-black"
                  >
                    Password
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className={`block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                        errors.password && touched.password ? "border-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="size-5 text-gray-400" aria-hidden="true" />
                      ) : (
                        <EyeIcon className="size-5 text-gray-400" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                  {errors.password && touched.password && (
                    <div className="mt-1 text-sm text-red-500">{errors.password}</div>
                  )}
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="rememberMe"
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

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>
                </div>

                {error && (
                  <div className="mt-2 text-center text-sm text-red-500">
                    {error}
                  </div>
                )}
              </Form>
            )}
          </Formik>

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

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm transition-colors duration-300 hover:bg-gray-50"
                >
                  <img
                    src="/images/google.svg"
                    alt="Google Logo"
                    className="size-5"
                  />
                  <span className="ml-2">Sign in with Google</span>
                </button>
              </div>

              <div>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 shadow-sm transition-colors duration-300 hover:bg-gray-50"
                >
                  <img
                    src="/images/apple.svg"
                    alt="Apple Logo"
                    className="size-5"
                  />
                  <span className="ml-2">Sign in with Apple</span>
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