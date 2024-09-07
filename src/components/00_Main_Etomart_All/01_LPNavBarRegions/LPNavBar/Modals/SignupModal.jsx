import { ChevronDownIcon, ChevronUpIcon, EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { Field, Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { useAuth } from "../../../../../Authentication/context/AuthContext";
import { signupSchema } from "../../../../../Authentication/validation/authValidationSchemas";
import XClearButton from "../../../ComponentsCalled/XClearButton";

const SignupModal = ({
  showModal,
  closeModal,
  openLoginModal,
  openForgotPasswordModal,
  openAuthenticatedSignupModal,
}) => {
  const { signup, error } = useAuth();
  const [showOptionalFields, setShowOptionalFields] = useState({
    email: false,
    namibianId: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = useCallback(
    async (values, { setSubmitting }) => {
      try {
        await signup(values.name, values.surname, values.phoneNumber, values.password, values.email, values.namibianId);
        openAuthenticatedSignupModal();
      } catch (error) {
        console.error("Signup error:", error);
      } finally {
        setSubmitting(false);
      }
    },
    [signup, openAuthenticatedSignupModal]
  );

  const handleModalTransition = useCallback(
    (action) => {
      closeModal();
      setTimeout(action, 300);
    },
    [closeModal]
  );

  const toggleOptionalField = useCallback((field) => {
    setShowOptionalFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  const togglePasswordVisibility = useCallback((field) => {
    if (field === 'password') {
      setShowPassword((prev) => !prev);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword((prev) => !prev);
    }
  }, []);

  if (!showModal) return null;

  const optionalFieldVariants = {
    hidden: { opacity: 0, height: 0, overflow: "hidden" },
    visible: { opacity: 1, height: "auto", overflow: "visible" },
  };

  const renderPasswordField = (field, values, errors, touched, setFieldValue) => {
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
          <Field
            type={isVisible ? "text" : "password"}
            name={field}
            id={field}
            className={`block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors[field] && touched[field] ? "border-red-500" : ""
            }`}
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
        {errors[field] && touched[field] && (
          <p className="mt-2 text-sm text-red-600 bg-white">
            {errors[field]}
          </p>
        )}
      </div>
    );
  };

  const renderOptionalField = (field, label, values, errors, touched, setFieldValue) => (
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
              <Field
                type={field === "email" ? "email" : "text"}
                name={field}
                id={field}
                className={`block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                  errors[field] && touched[field] ? "border-red-500" : ""
                }`}
              />
              {values[field] && (
                <XClearButton
                  onClick={() => setFieldValue(field, "")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                />
              )}
            </div>
            {errors[field] && touched[field] && (
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
        <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <h3
            className="mb-4 font-Agbalumo text-3xl leading-6 text-black"
            id="modal-title"
          >
            Sign Up
          </h3>
          <Formik
            initialValues={{
              name: "",
              surname: "",
              phoneNumber: "",
              email: "",
              password: "",
              confirmPassword: "",
              namibianId: "",
              rememberMe: false,
            }}
            validationSchema={signupSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting, values, setFieldValue }) => (
              <Form className="space-y-4">
                {/* Required Fields */}
                {["name", "surname", "phoneNumber"].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block text-sm font-medium capitalize text-black"
                    >
                      {field}
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <Field
                        type={field === "phoneNumber" ? "tel" : "text"}
                        name={field}
                        id={field}
                        className={`block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                          errors[field] && touched[field] ? "border-red-500" : ""
                        }`}
                      />
                      {values[field] && (
                        <XClearButton
                          onClick={() => setFieldValue(field, "")}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        />
                      )}
                    </div>
                    {errors[field] && touched[field] && (
                      <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
                    )}
                  </div>
                ))}

                {/* Optional Fields */}
                {renderOptionalField("email", "Email (Optional)", values, errors, touched, setFieldValue)}
                {renderPasswordField("password", values, errors, touched, setFieldValue)}
                {renderPasswordField("confirmPassword", values, errors, touched, setFieldValue)}
                {renderOptionalField("namibianId", "Namibian ID (Optional)", values, errors, touched, setFieldValue)}

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

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {isSubmitting ? "Signing up..." : "Sign Up"}
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
                  <span className="ml-2">Sign up with Google</span>
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
                  <span className="ml-2">Sign up with Apple</span>
                </button>
              </div>
            </div>
          </div>
        </div>

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