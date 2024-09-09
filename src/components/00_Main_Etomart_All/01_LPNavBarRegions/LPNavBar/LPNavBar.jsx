import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Authentication/context/AuthContext";
import { ChevronUp, ChevronDown, ChevronRight, User } from 'lucide-react';
import AuthenticatedLoginModal from "./Modals/AuthenticatedLoginModal";
import AuthenticatedSignupModal from "./Modals/AuthenticatedSignupModal";
import ForgotPasswordModal from "./Modals/ForgotPasswordModal";
import LoginModal from "./Modals/LoginModal";
import SignupModal from "./Modals/SignupModal";

const LPNavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isNavbarSticky, setIsNavbarSticky] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("English");

  const handleProfileClick = () => {
    if (user) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      openModal('login');
    }
  };

  const handleEditProfile = () => {
    navigate('/my/personal-info');
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/LP');
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

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

  const getInitials = (name, surname) => {
    return `${name?.[0] || ''}${surname?.[0] || ''}`.toUpperCase();
  };

  return (
    <div>
      <nav
        id="lpnavbar"
        className={`bg-[#f9f9f9] px-4 transition-all duration-300 ${isNavbarSticky ? "sticky top-0 z-50 shadow-md" : ""}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between py-4">
          <Link
            to="/LP/Regions"
            className="whitespace-nowrap font-shrikhand text-3xl text-[#ee9613]"
          >
            Etomart
          </Link>

          <div className="flex space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 rounded bg-[#f7a832] px-4 py-2 font-josefin_sans text-black transition-colors duration-300 hover:bg-black hover:text-white"
                  aria-label="Profile"
                >
                  <User size={24} />
                  {isDropdownOpen ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
                </button>
                {isDropdownOpen && (
                  <div className="absolute z-50 right-0 mt-2 w-56 rounded-lg bg-white shadow-lg">
                    <div className="p-4">
                      <button
                        onClick={handleEditProfile}
                        className="mb-2 w-full rounded-md py-2 text-left text-[#ee9613] hover:bg-[#ffaf5e4b] flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div className="flex w-8 h-8 bg-orange-200 rounded-full items-center justify-center mr-2 overflow-hidden">
                            <span className="text-sm font-bold text-orange-600">
                              {getInitials(user.name, user.surname)}
                            </span>
                          </div>
                          <span>Edit Profile</span>
                        </div>
                        <ChevronRight size={16} className="mr-12" />
                      </button>
                      <hr className="border-gray-200" />
                <div className=" w-full py-2 text-center">
                  <select
                    id="language-selector"
                    value={currentLanguage}
                    onChange={(e) => setCurrentLanguage(e.target.value)}
                    className="mt-1 block w-full rounded-md border bg-[#ffaf5e4b] bg-white px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm"
                    aria-label="Select language"
                  >
                    <option value="English">English</option>
                    <option value="Deutsch">Deutsch</option>
                    <option value="Français">Français</option>
                    <option value="Español">Español</option>
                    <option value="Русский">Русский</option>
                    <option value="中文">中文</option>
                  </select>
                </div>
                      <button
                        className="mb-2 w-full rounded-md py-2 text-left text-[#ee9613] hover:bg-[#ffaf5e4b]"
                      >
                        Get Help
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full rounded-md py-2 text-left text-[#ee9613] hover:bg-[#ffaf5e4b]"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
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