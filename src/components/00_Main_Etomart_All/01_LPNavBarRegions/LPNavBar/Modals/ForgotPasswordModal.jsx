import React, { useCallback, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup';
import { useAuth } from "../../../../../Authentication/context/AuthContext"; // Adjust path as needed
import XClearButton from "../../../ComponentsCalled/XClearButton";

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const ForgotPasswordModal = ({
  showModal,
  closeModal,
  openLoginModal,
  openSignupModal,
}) => {
  const { error, resetPassword } = useAuth(); // Assume resetPassword is implemented in AuthContext
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = useCallback(
    async (values, { setSubmitting }) => {
      try {
        await resetPassword(values.email);
        setResetSent(true);
      } catch (error) {
        console.error("Password reset error:", error);
      } finally {
        setSubmitting(false);
      }
    },
    [resetPassword]
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
          {resetSent ? (
            <div className="text-center">
              <p className="mb-4 text-lg text-black">
                Password reset instructions have been sent to your email.
              </p>
              <button
                className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
                onClick={() => handleModalTransition(openLoginModal)}
              >
                Back to Login
              </button>
            </div>
          ) : (
            <Formik
              initialValues={{ email: '' }}
              validationSchema={forgotPasswordSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting, values, setFieldValue }) => (
                <Form className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-black"
                    >
                      Email Address
                    </label>
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
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full justify-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {isSubmitting ? "Sending..." : "Send Reset Link"}
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
          )}
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