import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthenticatedLoginModal from "./AuthenticatedLoginModal";
import AuthenticatedSignupModal from "./AuthenticatedSignupModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const LPNavBar = () => {
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showAuthenticatedLoginModal, setShowAuthenticatedLoginModal] = useState(false);
  const [showAuthenticatedSignupModal, setShowAuthenticatedSignupModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsNavbarSticky(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeModals = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
    setShowForgotPasswordModal(false);
    setShowAuthenticatedLoginModal(false);
    setShowAuthenticatedSignupModal(false);
  };

  const openModal = (modalSetter) => {
    closeModals();
    modalSetter(true);
  };

  const modalProps = {
    openLoginModal: () => openModal(setShowLoginModal),
    openSignupModal: () => openModal(setShowSignupModal),
    openForgotPasswordModal: () => openModal(setShowForgotPasswordModal),
    openAuthenticatedLoginModal: () => openModal(setShowAuthenticatedLoginModal),
    openAuthenticatedSignupModal: () => openModal(setShowAuthenticatedSignupModal),
    closeModal: closeModals,
  };

  return (
    <div>
      <style>
        {`
          .sticky {
            position: fixed;
            z-index: 20;
            width: 100%;
          }
        `}
      </style>

      <nav
        id="lpnavbar"
        className={`bg-[#f9f9f9] px-4 ${isNavbarSticky ? "sticky" : ""}`}
      >
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <div className="flex items-center mt-6 mb-4">
            <h1 className="-mt-2 text-3xl font-shrikhand text-[#ee9613] whitespace-nowrap">
              <Link to="/LP">Etomart</Link>
            </h1>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => openModal(setShowLoginModal)}
              className="hover:bg-black hover:text-white font-josefin_sans py-2 px-4 bg-[#f7a832] text-black rounded"
            >
              Log in
            </button>
            <button
              onClick={() => openModal(setShowSignupModal)}
              className="hover:bg-black hover:text-white font-josefin_sans py-2 px-4 bg-[#ff9f10] text-black rounded"
            >
              Sign up
            </button>
          </div>
        </div>
      </nav>
{/* modalPropMangement */}
      {showLoginModal && <LoginModal showModal={showLoginModal} {...modalProps} />}
      {showSignupModal && <SignupModal showModal={showSignupModal} {...modalProps} />}
      {showForgotPasswordModal && <ForgotPasswordModal showModal={showForgotPasswordModal} {...modalProps} />}
      {showAuthenticatedLoginModal && <AuthenticatedLoginModal showModal={showAuthenticatedLoginModal} {...modalProps} />}
      {showAuthenticatedSignupModal && <AuthenticatedSignupModal showModal={showAuthenticatedSignupModal} {...modalProps} />}
    </div>
  );
};

export default LPNavBar;