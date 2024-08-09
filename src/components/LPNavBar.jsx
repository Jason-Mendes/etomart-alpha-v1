import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AuthenticatedLoginModal from "./AuthenticatedLoginModal";
import AuthenticatedSignupModal from "./AuthenticatedSignupModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const LPNavBar = () => {
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const handleScroll = useCallback(() => {
    setIsNavbarSticky(window.scrollY > 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const closeModals = useCallback(() => {
    setActiveModal(null);
  }, []);

  const openModal = useCallback((modalName) => {
    closeModals();
    setActiveModal(modalName);
  }, [closeModals]);

  const modalProps = {
    openLoginModal: () => openModal('login'),
    openSignupModal: () => openModal('signup'),
    openForgotPasswordModal: () => openModal('forgotPassword'),
    openAuthenticatedLoginModal: () => openModal('authenticatedLogin'),
    openAuthenticatedSignupModal: () => openModal('authenticatedSignup'),
    closeModal: closeModals,
  };

  return (
    <div>
      <nav
        id="lpnavbar"
        className={`bg-[#f9f9f9] px-4 transition-all duration-300 ${isNavbarSticky ? "sticky top-0 z-20 shadow-md" : ""}`}
      >
        <div className="flex items-center justify-between mx-auto max-w-7xl py-4">
          <Link to="/LP" className="text-3xl font-shrikhand text-[#ee9613] whitespace-nowrap">
            Etomart
          </Link>

          <div className="flex space-x-4">
            <button
              onClick={() => openModal('login')}
              className="hover:bg-black hover:text-white font-josefin_sans py-2 px-4 bg-[#f7a832] text-black rounded transition-colors duration-300"
              aria-label="Log in"
            >
              Log in
            </button>
            <button
              onClick={() => openModal('signup')}
              className="hover:bg-black hover:text-white font-josefin_sans py-2 px-4 bg-[#ff9f10] text-black rounded transition-colors duration-300"
              aria-label="Sign up"
            >
              Sign up
            </button>
          </div>
        </div>
      </nav>

      {activeModal === 'login' && <LoginModal showModal={true} {...modalProps} />}
      {activeModal === 'signup' && <SignupModal showModal={true} {...modalProps} />}
      {activeModal === 'forgotPassword' && <ForgotPasswordModal showModal={true} {...modalProps} />}
      {activeModal === 'authenticatedLogin' && <AuthenticatedLoginModal showModal={true} {...modalProps} />}
      {activeModal === 'authenticatedSignup' && <AuthenticatedSignupModal showModal={true} {...modalProps} />}
    </div>
  );
};

export default LPNavBar;