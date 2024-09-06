import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, User } from 'lucide-react';
import PersonalProfile from './ComponentsCalled/personalProfile';
import PaymentMethods from './ComponentsCalled/paymentMethods';
import OrderHistory from './ComponentsCalled/orderHistory';
import EarnCredits from './ComponentsCalled/earnCredits';
import RedeemCode from './ComponentsCalled/redeemCode';
import Settings from './ComponentsCalled/settings';
import Feedback from './ComponentsCalled/feedback';
import Addresses from './ComponentsCalled/addresses';

const MyUsers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('personal-info');
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [user, setUser] = useState({
    name: 'J M',
    email: 'jaxmendes2@gmail.com',
    phoneNumber: '+264813138171',
    profileImage: null
  });

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    setActiveSection(path || 'personal-info');
  }, [location]);

  useEffect(() => {
    const checkScroll = () => {
      const container = scrollContainerRef.current;
      if (container) {
        setShowLeftArrow(container.scrollLeft > 0);
        setShowRightArrow(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

  const handleNavigation = (section) => {
    setActiveSection(section);
    navigate(`/my/${section}`);
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        left: direction * 200,
        behavior: 'smooth'
      });
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'personal-info':
        return <PersonalProfile user={user} setUser={setUser} />;
      case 'payments':
        return <PaymentMethods />;
      case 'addresses':
        return <Addresses />;
      case 'order-history':
        return <OrderHistory />;
      case 'earn-credits':
        return <EarnCredits />;
      case 'redeem-code':
        return <RedeemCode />;
      case 'feedback':
        return <Feedback />;
      case 'settings':
        return <Settings />;
      default:
        return <PersonalProfile user={user} setUser={setUser} />;
    }
  };

  const navItems = [
    { id: 'personal-info', label: 'Personal Info' },
    { id: 'payments', label: 'Payment Methods' },
    { id: 'addresses', label: 'Addresses' },
    { id: 'order-history', label: 'Order History' },
    { id: 'earn-credits', label: 'Earn Credits' },
    { id: 'redeem-code', label: 'Redeem Code' },
    { id: 'settings', label: 'Settings' },
    { id: 'feedback', label: 'Feedback' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-row items-center mb-6">
              <div className="w-20 h-20 bg-orange-200 rounded-full flex items-center justify-center mr-4">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-orange-600" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.name}!</h1>
                <p className="text-gray-600">Manage your account and preferences here.</p>
              </div>
            </div>
            <div className="mb-6 relative">
              {showLeftArrow && (
                <button
                  onClick={() => scroll(-1)}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-orange-600 text-white p-2 rounded-full shadow-md focus:outline-none z-10"
                  aria-label="Scroll left"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto whitespace-nowrap scrollbar-hide"
              >
                <nav className="inline-flex space-x-4 p-2">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavigation(item.id)}
                      className={`px-4 py-2 rounded-full transition-colors duration-200 ${activeSection === item.id
                          ? 'bg-orange-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-orange-100'
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>
              </div>
              {showRightArrow && (
                <button
                  onClick={() => scroll(1)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-orange-600 text-white p-2 rounded-full shadow-md focus:outline-none z-10"
                  aria-label="Scroll right"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>
          </div>
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MyUsers;