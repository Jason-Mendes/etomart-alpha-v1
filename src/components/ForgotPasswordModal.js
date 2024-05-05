import React from 'react';

const ForgotPasswordModal = ({ showModal, closeModal }) => {
  return (
    <>
      {/* Modal */}
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity ${
            showModal ? 'ease-out duration-700' : 'ease-in duration-700'
          }`}
          onClick={closeModal}
        />
        <div
          id="Orange_container"
          className={`bg-[#ee9613] rounded-lg m-6 p-6 z-50 fixed bottom-6 top-6 left-1/2 transform -translate-x-1/2 transition-all flex flex-col ${
            showModal ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{ width: '90%', maxHeight: '90vh', overflow: 'auto' }}
        >
          {/* Your content for the ForgotPassword modal goes here */}
          <div className="flex justify-end">
            <button
              className="text-[#000000] hover:text-white"
              onClick={closeModal}
            >
              <svg
                className="mb-4 h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <h2 className="text-center text-2xl font-bold mb-4">
            Forgot Password
          </h2>
          {/* Add your form fields and logic here */}
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordModal;