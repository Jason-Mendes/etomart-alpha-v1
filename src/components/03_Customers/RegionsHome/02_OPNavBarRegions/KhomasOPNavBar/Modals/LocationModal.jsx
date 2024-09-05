import { Navigation, X } from 'lucide-react';
import React, { useEffect, useState } from "react";
import XClearButton from '../../../../../00_Main_Etomart_All/ComponentsCalled/XClearButton';
import { useLocation } from "../ComponentsCalled/LocationContext";

const LocationModal = ({ showModal, closeModal, onLocationSelect }) => {
  const [address, setAddress] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [suburb, setSuburb] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [error, setError] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsBrowsing } = useLocation();

  const windhoekSuburbs = [
    "Windhoek Central", "Windhoek East", "Windhoek West", "Windhoek North",
    "Windhoek South", "Khomasdal", "Katutura", "Eros", "Ludwigsdorf",
    "Olympia", "Pioneers Park", "Klein Windhoek", "Hochland Park"
  ];
  
  useEffect(() => {
    if (showModal) {
      // Load saved location from localStorage when modal opens
      const savedLocation = JSON.parse(localStorage.getItem('savedLocation'));
      if (savedLocation) {
        setHouseNumber(savedLocation.houseNumber || "");
        setAddress(savedLocation.address || "");
        setSuburb(savedLocation.suburb || "");
      }
    }
  }, [showModal]);

  useEffect(() => {
    const getCurrentLocation = () => {
      if ("geolocation" in navigator) {
        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
              
              const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
              console.log(`Google Maps API URL: ${url}`);
  
              const response = await fetch(url);
              const data = await response.json();
              
              console.log('Google Maps API Response:', data);
  
              if (data.results && data.results.length > 0) {
                const result = data.results[0];
                console.log('First result:', result);
  
                let streetNumber = '';
                let route = '';
                let suburbName = '';
  
                result.address_components.forEach(component => {
                  if (component.types.includes('street_number')) {
                    streetNumber = component.long_name;
                  } else if (component.types.includes('route')) {
                    route = component.long_name;
                  } else if (component.types.includes('sublocality') || component.types.includes('neighborhood')) {
                    suburbName = component.long_name;
                  }
                });
  
                setHouseNumber(streetNumber);
                setAddress(route);
                setSuburb(suburbName || 'Unknown');
                setError("");
  
                // Save location to localStorage
                saveLocation(streetNumber, route, suburbName || 'Unknown');
              } else {
                throw new Error("No results found in Location tagging response");
              }
            } catch (error) {
              console.error("Detailed Geocoding error:", error);
              console.error("Error stack:", error.stack);
              setError(`Unable to get your exact address: ${error.message}. Please enter it manually.`);
            } finally {
              setIsLoading(false);
              setUseCurrentLocation(false);
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
            console.error("Geolocation error code:", error.code);
            console.error("Geolocation error message:", error.message);
            setError(`Unable to get your location: ${error.message}. Please enter it manually.`);
            setIsLoading(false);
            setUseCurrentLocation(false);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      } else {
        setError("Geolocation is not supported by your browser");
        setUseCurrentLocation(false);
      }
    };
  
    if (useCurrentLocation) {
      getCurrentLocation();
    }
  }, [useCurrentLocation]);

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
            console.log(`Google Maps API URL: ${url}`);

            const response = await fetch(url);
            const data = await response.json();
            
            console.log('Google Maps API Response:', data);

            if (data.results && data.results.length > 0) {
              const result = data.results[0];
              console.log('First result:', result);

              let streetNumber = '';
              let route = '';
              let suburbName = '';

              result.address_components.forEach(component => {
                if (component.types.includes('street_number')) {
                  streetNumber = component.long_name;
                } else if (component.types.includes('route')) {
                  route = component.long_name;
                } else if (component.types.includes('sublocality') || component.types.includes('neighborhood')) {
                  suburbName = component.long_name;
                }
              });

              setHouseNumber(streetNumber);
              setAddress(route);
              setSuburb(suburbName || 'Unknown');
              setError("");

              // Save location to localStorage
              saveLocation(streetNumber, route, suburbName || 'Unknown');
            } else {
              throw new Error("No results found in Location tagging response");
            }
          } catch (error) {
            console.error("Detailed Geocoding error:", error);
            console.error("Error stack:", error.stack);
            setError(`Unable to get your exact address: ${error.message}. Please enter it manually.`);
          } finally {
            setIsLoading(false);
            setUseCurrentLocation(false);
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          console.error("Geolocation error code:", error.code);
          console.error("Geolocation error message:", error.message);
          setError(`Unable to get your location: ${error.message}. Please enter it manually.`);
          setIsLoading(false);
          setUseCurrentLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setUseCurrentLocation(false);
    }
  };

  const saveLocation = (houseNumber, address, suburb) => {
    localStorage.setItem('savedLocation', JSON.stringify({ houseNumber, address, suburb }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address || !suburb) {
      setError("Please enter both address and suburb");
      return;
    }
    saveLocation(houseNumber, address, suburb);
    onLocationSelect(houseNumber, address, suburb);
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

  const clearLocation = () => {
    setHouseNumber("");
    setAddress("");
    setSuburb("");
    localStorage.removeItem('savedLocation');
  };

  const hasLocationInfo = houseNumber || address || suburb;

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
            Browse Etomart Instead
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

  const clearInput = (setter) => {
    setter("");
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
            Browse Etomart Instead
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
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity ${showModal ? "opacity-100" : "pointer-events-none opacity-0"}`}>
      <div className="absolute inset-0" onClick={closeModal} />
      <div className="relative z-50 w-full max-w-lg rounded-lg bg-[#ee9613] shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="absolute right-0 top-0 pr-4 pt-4">
          <button
            onClick={handleClose}
            className="rounded-md bg-transparent text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span className="sr-only">Close</span>
            <X size={24} />
          </button>
        </div>
        <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <h2 className="mb-4 font-Agbalumo text-3xl leading-6 text-black">Choose Your Location</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="houseNumber" className="block text-sm font-medium text-black">
                House Number (optional)
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  id="houseNumber"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                  className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your house number"
                />
                {houseNumber && (
                  <XClearButton
                    onClick={() => clearInput(setHouseNumber)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  />
                )}
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-black">
                Street Address
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter your street address"
                  required
                />
                {address && (
                  <XClearButton
                    onClick={() => clearInput(setAddress)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  />
                )}
              </div>
            </div>
            <div>
              <label htmlFor="suburb" className="block text-sm font-medium text-black">
                Suburb
              </label>
              <select
                id="suburb"
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select a suburb</option>
                {windhoekSuburbs.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="button"
              onClick={() => setUseCurrentLocation(true)}
              className="flex w-full items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
              ) : (
                <Navigation className="mr-2" size={20} />
              )}
              {isLoading ? "Getting Location..." : "Use My Current Location"}
            </button>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-black hover:text-white shadow-sm transition-colors duration-300 hover:bg-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Confirm Location
            </button>
            {(houseNumber || address || suburb) && (
              <button
                type="button"
                onClick={clearLocation}
                className="flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Clear Location
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;