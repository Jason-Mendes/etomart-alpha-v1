import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AuthenticatedLoginModal from "./Modals/AuthenticatedLoginModal";
import AuthenticatedSignupModal from "./Modals/AuthenticatedSignupModal";
import ForgotPasswordModal from "./Modals/ForgotPasswordModal";
import LoginModal from "./Modals/LoginModal";
import SignupModal from "./Modals/SignupModal";

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

  const openModal = useCallback(
    (modalName) => {
      closeModals();
      setActiveModal(modalName);
    },
    [closeModals]
  );

  const modalProps = {
    openLoginModal: () => openModal("login"),
    openSignupModal: () => openModal("signup"),
    openForgotPasswordModal: () => openModal("forgotPassword"),
    openAuthenticatedLoginModal: () => openModal("authenticatedLogin"),
    openAuthenticatedSignupModal: () => openModal("authenticatedSignup"),
    closeModal: closeModals,
  };

  return (
    <div>
      <nav
        id="lpnavbar"
        className={`bg-[#f9f9f9] px-4 transition-all duration-300 ${isNavbarSticky ? "sticky top-0 z-50 shadow-md" : ""
          }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between py-4">
          <Link
            to="/LP/Regions"
            className="whitespace-nowrap font-shrikhand text-3xl text-[#ee9613]"
          >
            Etomart
          </Link>

          <div className="flex space-x-4">
            <button
              onClick={() => openModal("login")}
              className="rounded bg-[#f7a832] px-4 py-2 font-josefin_sans text-black transition-colors duration-300 hover:bg-black hover:text-white"
              aria-label="Log in"
            >
              Log in
            </button>
            <button
              onClick={() => openModal("signup")}
              className="rounded bg-[#ff9f10] px-4 py-2 font-josefin_sans text-black transition-colors duration-300 hover:bg-black hover:text-white"
              aria-label="Sign up"
            >
              Sign up
            </button>
          </div>
        </div>
      </nav>

      {activeModal === "login" && (
        <LoginModal showModal={true} {...modalProps} />
      )}
      {activeModal === "signup" && (
        <SignupModal showModal={true} {...modalProps} />
      )}
      {activeModal === "forgotPassword" && (
        <ForgotPasswordModal showModal={true} {...modalProps} />
      )}
      {activeModal === "authenticatedLogin" && (
        <AuthenticatedLoginModal showModal={true} {...modalProps} />
      )}
      {activeModal === "authenticatedSignup" && (
        <AuthenticatedSignupModal showModal={true} {...modalProps} />
      )}
    </div>
  );
};

export default LPNavBar;
