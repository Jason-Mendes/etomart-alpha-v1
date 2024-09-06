import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, CheckCircle, XCircle } from 'lucide-react';

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(null);

  const handleAddAddress = (newAddress) => {
    setAddresses([...addresses, { ...newAddress, id: Date.now() }]);
    setIsAddingNew(false);
    if (addresses.length === 0) {
      setDefaultAddress(newAddress.id);
    }
  };

  const handleUpdateAddress = (updatedAddress, index) => {
    const newAddresses = [...addresses];
    newAddresses[index] = { ...updatedAddress, id: addresses[index].id };
    setAddresses(newAddresses);
    setEditingIndex(null);
  };

  const handleDeleteAddress = (id) => {
    const updatedAddresses = addresses.filter((address) => address.id !== id);
    setAddresses(updatedAddresses);
    if (defaultAddress === id && updatedAddresses.length > 0) {
      setDefaultAddress(updatedAddresses[0].id);
    } else if (updatedAddresses.length === 0) {
      setDefaultAddress(null);
    }
  };

  const handleSetDefaultAddress = (id) => {
    setDefaultAddress(id);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Addresses</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {addresses.length === 0 ? (
          <p className="text-gray-500">No addresses added yet.</p>
        ) : (
          <ul className="space-y-4">
            <AnimatePresence>
              {addresses.map((address, index) => (
                <motion.li
                  key={address.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`border rounded-lg p-4 ${defaultAddress === address.id ? 'border-orange-500' : 'border-gray-200'}`}
                >
                  {editingIndex === index ? (
                    <AddressForm
                      initialAddress={address}
                      onSubmit={(updatedAddress) => handleUpdateAddress(updatedAddress, index)}
                      onCancel={() => setEditingIndex(null)}
                    />
                  ) : (
                    <>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{address.street}</p>
                          <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                          <p className="text-gray-600">{address.country}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingIndex(index)}
                            className="text-orange-600 hover:text-orange-700"
                            title="Edit address"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-red-600 hover:text-red-700"
                            title="Delete address"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center">
                        {defaultAddress === address.id ? (
                          <span className="text-orange-600 text-sm flex items-center">
                            <CheckCircle size={16} className="mr-1" /> Default Address
                          </span>
                        ) : (
                          <button
                            onClick={() => handleSetDefaultAddress(address.id)}
                            className="text-orange-600 text-sm font-medium hover:underline"
                          >
                            Set as Default
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
        {isAddingNew ? (
          <AddressForm onSubmit={handleAddAddress} onCancel={() => setIsAddingNew(false)} />
        ) : (
          <button
            onClick={() => setIsAddingNew(true)}
            className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-700 flex items-center"
          >
            <Plus size={18} className="mr-2" /> Add New Address
          </button>
        )}
      </div>
    </div>
  );
};

const AddressForm = ({ initialAddress = {}, onSubmit, onCancel }) => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    ...initialAddress
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="street"
        placeholder="Street Address"
        value={address.street}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <div className="flex space-x-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          required
          className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          name="state"
          placeholder="State/Province"
          value={address.state}
          onChange={handleChange}
          required
          className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      <div className="flex space-x-4">
        <input
          type="text"
          name="zipCode"
          placeholder="Zip/Postal Code"
          value={address.zipCode}
          onChange={handleChange}
          required
          className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={address.country}
          onChange={handleChange}
          required
          className="w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-orange-700 flex items-center"
        >
          <CheckCircle size={18} className="mr-2" /> {initialAddress.street ? 'Update' : 'Add'}
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

export default Addresses;