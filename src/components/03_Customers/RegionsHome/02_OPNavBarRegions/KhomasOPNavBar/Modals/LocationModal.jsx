import { Navigation, X } from 'lucide-react';
import React, { useEffect, useState } from "react";
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
            <label htmlFor="houseNumber" className="mb-2 block text-sm font-medium text-gray-700">House Number (optional)</label>
            <input
              type="text"
              id="houseNumber"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter your house number"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-700">Street Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter your street address"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="suburb" className="mb-2 block text-sm font-medium text-gray-700">Suburb</label>
            <select
              id="suburb"
              value={suburb}
              onChange={(e) => setSuburb(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
              required
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
            className="mb-4 w-full rounded-md bg-orange-500 p-2 text-white hover:bg-orange-600"
          >
            Confirm Location
          </button>
          {hasLocationInfo && (
            <button
              type="button"
              onClick={clearLocation}
              className="w-full rounded-md bg-red-500 p-2 text-white hover:bg-red-600"
            >
              Clear Location
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default LocationModal;