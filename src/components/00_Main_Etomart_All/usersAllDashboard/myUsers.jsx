import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    setActiveSection(path || 'personal-info');
  }, [location]);

  const handleNavigation = (section) => {
    setActiveSection(section);
    navigate(`/my/${section}`);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'personal-info':
        return <PersonalProfile />;
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
      case 'settings':
        return <Settings />;
      case 'feedback':
        return <Feedback />;
      default:
        return <PersonalProfile />;
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          <nav className="md:w-64 mb-8 md:mb-0">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {[
                  { id: 'personal-info', label: 'Personal Info' },
                  { id: 'payments', label: 'Payment Methods' },
                  { id: 'addresses', label: 'Addresses' },
                  { id: 'order-history', label: 'Order History' },
                  { id: 'earn-credits', label: 'Earn Credits' },
                  { id: 'redeem-code', label: 'Redeem Code' },
                  { id: 'settings', label: 'Settings' },
                  { id: 'feedback', label: 'Feedback' },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavigation(item.id)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 focus:outline-none ${
                        activeSection === item.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <main className="md:flex-1 md:ml-8">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {renderSection()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MyUsers;