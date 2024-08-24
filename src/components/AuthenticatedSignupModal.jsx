import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const AuthenticatedSignupModal = ({ showModal, closeModal }) => {
  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={closeModal}
        ></div>

        <span
          className="hidden sm:inline-block sm:h-screen sm:align-middle"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block overflow-hidden rounded-lg bg-[#ee9613] text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:align-middle">
          <div className="bg-[#ee9613] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="flex flex-col items-center justify-center">
              <h3
                className="mb-4 text-center font-Agbalumo text-3xl leading-6 text-black"
                id="modal-title"
              >
                Welcome to Etomart!
              </h3>
              <div className="mb-6 mt-2 text-center">
                <p className="text-sm text-gray-700">
                  Congratulations! Your account has been created successfully.
                  We're thrilled to have you join our community.
                </p>
              </div>
              <div className="mb-6 w-full max-w-md">
                <div className="h-[450px] w-full overflow-hidden rounded-lg bg-white p-2">
                  <LazyLoadImage
                    className="size-full rounded-lg object-cover"
                    src="/images/Mais_rdedeverse.jpg"
                    alt="Welcome to Etomart"
                    effect="blur"
                    wrapperClassName="w-full h-full"
                    placeholderSrc="/path/to/placeholder-image.jpg"
                  />
                </div>
              </div>
              <button
                type="button"
                className="inline-flex w-full max-w-xs justify-center rounded-md border border-transparent bg-black px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                onClick={closeModal}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedSignupModal;
