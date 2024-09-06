import React, { useState } from 'react';

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleAddAddress = (newAddress) => {
    setAddresses([...addresses, newAddress]);
    setIsAddingNew(false);
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Addresses</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {addresses.length === 0 ? (
          <p className="text-gray-500">No addresses added yet.</p>
        ) : (
          <ul className="space-y-4">
            {addresses.map((address, index) => (
              <li key={index} className="border-b pb-4 last:border-b-0">
                <p className="font-medium">{address.street}</p>
                <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                <p className="text-gray-600">{address.country}</p>
                <button
                  onClick={() => handleDeleteAddress(index)}
                  className="mt-2 text-red-600 text-sm font-medium"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
        {isAddingNew ? (
          <NewAddressForm onAdd={handleAddAddress} onCancel={() => setIsAddingNew(false)} />
        ) : (
          <button
            onClick={() => setIsAddingNew(true)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700"
          >
            Add New Address
          </button>
        )}
      </div>
    </div>
  );
};

const NewAddressForm = ({ onAdd, onCancel }) => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(address);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <input
        type="text"
        name="street"
        placeholder="Street Address"
        value={address.street}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded-md"
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        value={address.city}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded-md"
      />
      <input
        type="text"
        name="state"
        placeholder="State/Province"
        value={address.state}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded-md"
      />
      <input
        type="text"
        name="zipCode"
        placeholder="Zip/Postal Code"
        value={address.zipCode}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded-md"
      />
      <input
        type="text"
        name="country"
        placeholder="Country"
        value={address.country}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded-md"
      />
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

export default Addresses;