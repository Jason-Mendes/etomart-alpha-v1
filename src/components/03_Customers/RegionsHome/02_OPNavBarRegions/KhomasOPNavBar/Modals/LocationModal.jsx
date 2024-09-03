import React, { useState, useEffect } from "react";
import { X, MapPin, Navigation } from 'lucide-react';

const LocationModal = ({ showModal, closeModal, onLocationSelect }) => {
  const [address, setAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${showModal ? "opacity-100" : "pointer-events-none opacity-0"}`}>
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeModal} />
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <button onClick={closeModal} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
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
            className="mb-4 flex w-full items-center justify-center rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
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