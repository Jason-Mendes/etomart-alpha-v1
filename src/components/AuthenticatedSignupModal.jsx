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
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
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

        <div className="inline-block align-bottom bg-[#ee9613] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
          <div className="bg-[#ee9613] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex flex-col items-center justify-center">
              <h3
                className="text-3xl leading-6 font-Agbalumo text-black mb-4 text-center"
                id="modal-title"
              >
                Welcome to Etomart!
              </h3>
              <div className="mt-2 mb-6 text-center">
                <p className="text-sm text-gray-700">
                  Congratulations! Your account has been created successfully.
                  We're thrilled to have you join our community.
                </p>
              </div>
              <div className="w-full max-w-md mb-6">
                <div className="bg-white rounded-lg p-2 h-[450px] w-full overflow-hidden">
                  <LazyLoadImage
                    className="w-full h-full rounded-lg object-cover"
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
                className="w-full max-w-xs inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
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
