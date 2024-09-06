import React, { useState } from 'react';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddPaymentMethod = (newMethod) => {
    setPaymentMethods([...paymentMethods, newMethod]);
    setIsAddingNew(false);
  };

  const handleDeletePaymentMethod = (index) => {
    const updatedMethods = paymentMethods.filter((_, i) => i !== index);
    setPaymentMethods(updatedMethods);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Payment Methods</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {paymentMethods.length === 0 ? (
          <p className="text-gray-600">No payment methods added yet.</p>
        ) : (
          <ul className="space-y-4">
            {paymentMethods.map((method, index) => (
              <li key={index} className="flex items-center justify-between border-b pb-4 last:border-b-0">
                <div>
                  <p className="font-medium">{method.type === 'credit' ? 'Credit Card' : 'Debit Card'}</p>
                  <p className="text-gray-600">**** **** **** {method.lastFour}</p>
                  <p className="text-gray-600 text-sm">Expires: {method.expiryDate}</p>
                </div>
                <button
                  onClick={() => handleDeletePaymentMethod(index)}
                  className="text-red-600 text-sm font-medium hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        {isAddingNew ? (
          <NewPaymentMethodForm onAdd={handleAddPaymentMethod} onCancel={() => setIsAddingNew(false)} />
        ) : (
          <button
            onClick={() => setIsAddingNew(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700"
          >
            Add New Payment Method
          </button>
        )}
      </div>
    </div>
  );
};

const NewPaymentMethodForm = ({ onAdd, onCancel }) => {
  const [type, setType] = useState('credit');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      type,
      lastFour: cardNumber.slice(-4),
      expiryDate,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="credit">Credit Card</option>
          <option value="debit">Debit Card</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
        <input
          type="text"
          placeholder="MM/YY"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700"
        >
          Add
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default PaymentMethods;