import React, { useState, useEffect } from "react";
import { X, Navigation } from 'lucide-react';
import { useLocation } from "../ComponentsCalled/LocationContext";

const LocationModal = ({ showModal, closeModal, onLocationSelect }) => {
  const [address, setAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [error, setError] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const { setIsBrowsing } = useLocation();

  const windhoekSuburbs = [
    "Windhoek Central", "Windhoek East", "Windhoek West", "Windhoek North",
    "Windhoek South", "Khomasdal", "Katutura", "Eros", "Ludwigsdorf",
    "Olympia", "Pioneers Park", "Klein Windhoek", "Hochland Park"
  ];

  useEffect(() => {
    if (useCurrentLocation) {
      getCurrentLocation();
    }
  }, [useCurrentLocation]);

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          // Here, you'd normally use a geocoding service to get the address
          // For this example, we'll just set a dummy address
          setAddress("123 Main St");
          setSuburb("Windhoek Central");
          setError("");
        },
        error => {
          setError("Unable to get your location. Please enter it manually.");
          setUseCurrentLocation(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setUseCurrentLocation(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address || !suburb) {
      setError("Please enter both address and suburb");
      return;
    }
    onLocationSelect(address, suburb);
    closeModal();
  };

  const handleClose = () => {
    setShowOptions(true);
  };

  const handleBrowse = () => {
    setIsBrowsing(true);
    closeModal();
  };

  const handleAddLocation = () => {
    setShowOptions(false);
  };

  if (showOptions) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeModal} />
        <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <h2 className="mb-4 text-2xl font-bold">Choose an Option</h2>
          <p className="mb-4 text-sm text-gray-600">Note: If you select browsing mode, you will not be able to order anything.</p>
          <button
            onClick={handleBrowse}
            className="mb-4 w-full rounded-md bg-gray-700 p-2 text-white hover:bg-gray-500"
          >
            Just browse Etomart
          </button>
          <button
            onClick={handleAddLocation}
            className="w-full rounded-md bg-orange-500 p-2 text-white hover:bg-orange-600"
          >
            Add location
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${showModal ? "opacity-100" : "pointer-events-none opacity-0"}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeModal} />
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <button onClick={handleClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
        <h2 className="mb-4 text-2xl font-bold">Choose Your Location</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-700">Street Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter your street address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="suburb" className="mb-2 block text-sm font-medium text-gray-700">Suburb</label>
            <select
              id="suburb"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
            >
              <option value="">Select a suburb</option>
              {windhoekSuburbs.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
          {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
          <button
            type="button"
            onClick={() => setUseCurrentLocation(true)}
            className="mb-4 flex w-full items-center justify-center rounded-md bg-gray-700 p-2 text-white hover:bg-gray-500"
          >
            <Navigation className="mr-2" size={20} />
            Use My Current Location
          </button>
          <button
            type="submit"
            className="w-full rounded-md bg-orange-500 p-2 text-white hover:bg-orange-600"
          >
            Confirm Location
          </button>
        </form>
      </div>
    </div>
  );
};

export default LocationModal;