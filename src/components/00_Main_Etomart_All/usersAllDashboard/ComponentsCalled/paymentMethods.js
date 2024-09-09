import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, CreditCard, Plus, Trash2, XCircle } from 'lucide-react';
import React, { useState } from 'react';
import UnavailableFeatureOverlay from '../../../common/UnavailableFeatureOverlay';
const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [defaultMethod, setDefaultMethod] = useState(null);

  const handleAddPaymentMethod = (newMethod) => {
    const updatedMethods = [...paymentMethods, { ...newMethod, id: Date.now() }];
    setPaymentMethods(updatedMethods);
    setIsAddingNew(false);
    if (paymentMethods.length === 0) {
      setDefaultMethod(newMethod.id);
    }
  };

  const handleDeletePaymentMethod = (id) => {
    const updatedMethods = paymentMethods.filter(method => method.id !== id);
    setPaymentMethods(updatedMethods);
    if (defaultMethod === id && updatedMethods.length > 0) {
      setDefaultMethod(updatedMethods[0].id);
    } else if (updatedMethods.length === 0) {
      setDefaultMethod(null);
    }
  };

  const handleSetDefaultMethod = (id) => {
    setDefaultMethod(id);
  };

  return (
    <UnavailableFeatureOverlay>
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Payment Methods</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {paymentMethods.length === 0 ? (
          <p className="text-gray-600">No payment methods added yet.</p>
        ) : (
          <ul className="space-y-4">
            <AnimatePresence>
              {paymentMethods.map((method) => (
                <motion.li
                  key={method.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center justify-between border rounded-lg p-4 ${defaultMethod === method.id ? 'border-orange-500' : 'border-gray-200'}`}
                >
                  <div className="flex items-center">
                    <CreditCard className="text-orange-600 mr-4" size={24} />
                    <div>
                      <p className="font-medium">{method.type === 'credit' ? 'Credit Card' : 'Debit Card'}</p>
                      <p className="text-gray-600">**** **** **** {method.lastFour}</p>
                      <p className="text-gray-600 text-sm">Expires: {method.expiryDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {defaultMethod === method.id ? (
                      <span className="text-orange-600 text-sm flex items-center">
                        <CheckCircle size={16} className="mr-1" /> Default
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSetDefaultMethod(method.id)}
                        className="text-orange-600 text-sm font-medium hover:underline"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => handleDeletePaymentMethod(method.id)}
                      className="text-red-600 hover:text-red-700"
                      title="Delete payment method"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
        {isAddingNew ? (
          <NewPaymentMethodForm onAdd={handleAddPaymentMethod} onCancel={() => setIsAddingNew(false)} />
        ) : (
          <button
            onClick={() => setIsAddingNew(true)}
            className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-700 flex items-center"
          >
            <Plus size={18} className="mr-2" /> Add New Payment Method
          </button>
        )}
      </div>
    </div>
    </UnavailableFeatureOverlay>
  );
};

const NewPaymentMethodForm = ({ onAdd, onCancel }) => {
  const [type, setType] = useState('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState('');

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16) {
      setCardNumber(value.replace(/(\d{4})/g, '$1 ').trim());
      detectCardType(value);
    }
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setExpiryDate(value.replace(/(\d{2})(\d{0,2})/, '$1/$2').trim());
    }
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      setCvv(value);
    }
  };

  const detectCardType = (number) => {
    const re = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/
    };

    for (let [key, regex] of Object.entries(re)) {
      if (regex.test(number)) {
        setCardType(key);
        return;
      }
    }
    setCardType('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      type,
      lastFour: cardNumber.slice(-4),
      expiryDate,
      cardType
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="credit">Credit Card</option>
          <option value="debit">Debit Card</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
        <div className="relative">
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleCardNumberChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {cardType && (
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 capitalize">
              {cardType}
            </span>
          )}
        </div>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
          <input
            type="text"
            placeholder="123"
            value={cvv}
            onChange={handleCvvChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-700 flex items-center"
        >
          <CheckCircle size={18} className="mr-2" /> Add
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-300 flex items-center"
        >
          <XCircle size={18} className="mr-2" /> Cancel
        </button>
      </div>
    </form>
  );
};

export default PaymentMethods;