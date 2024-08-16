import React, { useState, useCallback } from 'react';
import XClearButton from './componentsCalled/XClearButton';

const SignupModal = ({
  showModal,
  closeModal,
  openLoginModal,
  openForgotPasswordModal,
  openAuthenticatedSignupModal,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    rememberMe: false
  });

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const clearInput = useCallback((field) => {
    setFormData(prev => ({ ...prev, [field]: "" }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    openAuthenticatedSignupModal();
    // Add your signup logic here
  }, [openAuthenticatedSignupModal]);

  const handleModalTransition = useCallback((action) => {
    closeModal();
    setTimeout(action, 300);
  }, [closeModal]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeModal}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-[#ee9613] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-transparent rounded-md text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={closeModal}
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="bg-[#ee9613] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-3xl leading-6 font-Agbalumo text-black mb-4" id="modal-title">
                  Sign Up
                </h3>
                <div className="mt-2">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {['name', 'surname', 'email', 'phoneNumber', 'password', 'confirmPassword'].map((field) => (
                      <div key={field}>
                        <label htmlFor={field} className="block text-sm font-medium text-black capitalize">
                          {field === 'confirmPassword' ? 'Confirm Password' : field}
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
                            name={field}
                            id={field}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                            value={formData[field]}
                            onChange={handleInputChange}
                            required
                          />
                          {formData[field] && (
                            <XClearButton onClick={() => clearInput(field)} className="absolute inset-y-0 right-0 pr-3 flex items-center" />
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="rememberMe"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          checked={formData.rememberMe}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-black">
                          Remember for 30 days
                        </label>
                      </div>

                      <div className="text-sm">
                        <button
                          type="button"
                          onClick={() => handleModalTransition(openForgotPasswordModal)}
                          className="font-medium text-white hover:text-black transition-colors duration-300"
                        >
                          Forgot password?
                        </button>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-[#ee9613] text-black">Or continue with</span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div>
                        <button
                          type="button"
                          className="w-full inline-flex items-center justify-center md:justify-start py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-300"
                        >
                         <img
                            src="/images/google.svg"
                            alt="Google Logo"
                            className="w-5 h-5"
                          />
                          <span className="sr-only md:not-sr-only md:inline-block md:px-2">Sign up with Google</span>
                          
                        </button>
                      </div>

                      <div>
                        <button
                          type="button"
                          className="w-full inline-flex items-center justify-center md:justify-start py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-300"
                        >
                          <img
                            src="/images/apple.svg"
                            alt="Apple Logo"
                            className="w-5 h-5"
                          />
                          <span className="sr-only md:not-sr-only md:inline-block md:px-2">Sign up with Apple</span>
                         
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#ee9613] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <p className="text-center text-sm text-black mt-2">
              Already have an account?{' '}
              <button
                onClick={() => handleModalTransition(openLoginModal)}
                className="font-medium text-white hover:text-black transition-colors duration-300"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;