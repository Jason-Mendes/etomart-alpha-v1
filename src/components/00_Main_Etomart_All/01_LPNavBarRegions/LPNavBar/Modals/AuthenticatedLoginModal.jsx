import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useAuth } from "../../../../../Authentication/context/AuthContext";

const AuthenticatedLoginModal = ({ showModal, closeModal }) => {
  const { user } = useAuth();

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
        className="relative z-50 w-full max-w-xl rounded-lg bg-[#ee9613] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="flex flex-col items-center justify-center">
            <h3
              className="mb-4 text-center font-Agbalumo text-3xl leading-6 text-black"
              id="modal-title"
            >
              Welcome Back, {user?.name || 'Valued Customer'}!
            </h3>
            <div className="mb-6 mt-2 text-center">
              <p className="text-sm text-gray-700">
                You have successfully logged in. We're excited to have you
                back!
              </p>
            </div>
            <div className="mb-6 w-full max-w-md">
              <div className="h-[450px] w-full overflow-hidden rounded-lg bg-white p-2">
                <LazyLoadImage
                  className="size-full rounded-lg object-cover"
                  src="/images/Mais_reverse.jpg"
                  alt="Welcome back"
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
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedLoginModal;